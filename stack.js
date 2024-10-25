const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

class Task {
    constructor(description, deadline) {
        this.description = description;
        this.deadline = deadline;
        this.completed = false;
        this.next = null;
    }
}

class StudyPlanner {
    constructor() {
        this.top = null;
        this.completedTop = null;
    }

    isEmpty() {
        return this.top === null;
    }

    topDeadline() {
        return this.isEmpty() ? "zzzz" : this.top.deadline;
    }

    addTask(desc, dl) {
        const newTask = new Task(desc, dl);
        if (this.isEmpty() || this.topDeadline() >= dl) {
            newTask.next = this.top;
            this.top = newTask;
            return;
        }

        let temp = this.top.next;
        let prev = this.top;
        while (temp && temp.deadline < dl) {
            prev = temp;
            temp = temp.next;
        }

        prev.next = newTask;
        newTask.next = temp;
    }

    displayStack() {
        if (this.isEmpty()) {
            console.log("No tasks planned!");
            return;
        }
        let temp = this.top;
        while (temp) {
            console.log(`${temp.description}\t${temp.deadline}`);
            temp = temp.next;
        }
    }

    displayCompletedStack() {
        if (!this.completedTop) {
            console.log("No tasks completed yet!");
            return;
        }
        let temp = this.completedTop;
        while (temp) {
            console.log(`${temp.description}\t${temp.deadline}`);
            temp = temp.next;
        }
    }

    completeTask(taskDesc) {
        let temp = this.top, prev = null;

        while (temp) {
            if (temp.description === taskDesc) {
                if (temp === this.top) {
                    this.top = this.top.next;
                } else {
                    prev.next = temp.next;
                }
                this.compStackPush(temp.description, temp.deadline);
                console.log(`Task completed: ${taskDesc}`);
                return;
            }
            prev = temp;
            temp = temp.next;
        }
        console.log("Task not found!");
    }

    compStackPush(desc, dl) {
        const newTask = new Task(desc, dl);
        newTask.completed = true;
        newTask.next = this.completedTop;
        this.completedTop = newTask;
    }

    undoCompletedTask() {
        if (!this.completedTop) {
            console.log("No tasks completed yet!");
            return;
        }
        const del = this.completedTop;
        this.addTask(del.description, del.deadline);
        this.completedTop = this.completedTop.next;
        console.log(`Task undone: ${del.description}`);
    }

    deleteFromPlanner(desc) {
        if (this.isEmpty()) {
            console.log("No tasks planned!");
            return;
        }
        let temp = this.top, prev = null;
        while (temp) {
            if (temp.description === desc) {
                if (temp === this.top) {
                    this.top = this.top.next;
                } else {
                    prev.next = temp.next;
                }
                console.log(`Task ${desc} deleted.`);
                return;
            }
            prev = temp;
            temp = temp.next;
        }
        console.log(`Task "${desc}" not found.`);
    }

    clear() {
        this.top = null;
        console.log("All tasks cleared!");
    }
}

// Main function for interactive prompt-based control
function main() {
    const planner = new StudyPlanner();

    function askForTask() {
        readline.question("Enter task description (or 'done' to finish): ", (desc) => {
            if (desc.toLowerCase() === "done") return showMenu();
            readline.question("Enter deadline (YYYY-MM-DD): ", (dl) => {
                planner.addTask(desc, dl);
                askForTask();
            });
        });
    }

    function showMenu() {
        console.log("\nChoose an option:");
        console.log("1. Display planned tasks");
        console.log("2. Complete a task");
        console.log("3. Display completed tasks");
        console.log("4. Undo the recently completed task");
        console.log("5. Delete a specific task");
        console.log("6. Clear all tasks");
        console.log("7. Exit");

        readline.question("Enter your choice: ", (choice) => {
            switch (choice) {
                case "1":
                    planner.displayStack();
                    break;
                case "2":
                    readline.question("Enter the description of the task to complete: ", (desc) => {
                        planner.completeTask(desc);
                        showMenu();
                    });
                    return;
                case "3":
                    planner.displayCompletedStack();
                    break;
                case "4":
                    planner.undoCompletedTask();
                    break;
                case "5":
                    readline.question("Enter the description of the task to delete: ", (desc) => {
                        planner.deleteFromPlanner(desc);
                        showMenu();
                    });
                    return;
                case "6":
                    planner.clear();
                    break;
                case "7":
                    console.log("Exiting...");
                    readline.close();
                    return;
                default:
                    console.log("Invalid choice, please try again.");
            }
            showMenu();
        });
    }

    askForTask(); // Start with taking task input from the user
}

main();
