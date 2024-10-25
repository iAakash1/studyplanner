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

    addTask(desc, dl) {
        const newTask = new Task(desc, dl);
        if (this.isEmpty() || this.top.deadline >= dl) {
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

    displayTasks() {
        let tasks = [];
        let temp = this.top;
        while (temp) {
            tasks.push(temp);
            temp = temp.next;
        }
        return tasks;
    }

    completeTask(desc) {
        let temp = this.top, prev = null;
        while (temp) {
            if (temp.description === desc) {
                if (temp === this.top) {
                    this.top = this.top.next;
                } else {
                    prev.next = temp.next;
                }
                this.completedTop = { ...temp, next: this.completedTop };
                return;
            }
            prev = temp;
            temp = temp.next;
        }
    }

    undoCompletedTask() {
        if (this.completedTop) {
            const lastCompleted = this.completedTop;
            this.completedTop = this.completedTop.next;
            this.addTask(lastCompleted.description, lastCompleted.deadline);
        }
    }

    displayCompletedTasks() {
        let completed = [];
        let temp = this.completedTop;
        while (temp) {
            completed.push(temp);
            temp = temp.next;
        }
        return completed;
    }

    clearTasks() {
        this.top = null;
        this.completedTop = null;
    }
}

const planner = new StudyPlanner();

function addTask() {
    const desc = document.getElementById('taskDesc').value;
    const dl = document.getElementById('taskDeadline').value;
    if (desc && dl) {
        planner.addTask(desc, dl);
        document.getElementById('taskDesc').value = '';
        document.getElementById('taskDeadline').value = '';
        displayTasks();
    } else {
        alert('Please enter task description and deadline.');
    }
}

function displayTasks() {
    const plannedTasks = planner.displayTasks();
    const plannedList = document.getElementById('plannedTasks');
    plannedList.innerHTML = '';
    plannedTasks.forEach(task => {
        plannedList.innerHTML += `<li>${task.description} - ${task.deadline} <button onclick="completeTask('${task.description}')">Complete</button></li>`;
    });
}

function completeTask(desc) {
    planner.completeTask(desc);
    displayTasks();
    displayCompletedTasks();
}

function displayCompletedTasks() {
    const completedTasks = planner.displayCompletedTasks();
    const completedList = document.getElementById('completedTasks');
    completedList.innerHTML = '';
    completedTasks.forEach(task => {
        completedList.innerHTML += `<li>${task.description} - ${task.deadline}</li>`;
    });
}

function undoCompletedTask() {
    planner.undoCompletedTask();
    displayTasks();
    displayCompletedTasks();
}

function clearTasks() {
    planner.clearTasks();
    displayTasks();
    displayCompletedTasks();
}
