class Task {
    constructor(description, deadline) {
        this.description = description;
        this.deadline = deadline;
        this.completed = false;
    }
}

class StudyPlanner {
    constructor() {
        this.tasks = [];
        this.completedTasks = [];
    }

    addTask(description, deadline) {
        this.tasks.push(new Task(description, deadline));
    }

    deleteTask(description) {
        this.tasks = this.tasks.filter(task => task.description !== description);
    }

    editTask(oldDescription, newDescription, newDeadline) {
        const task = this.tasks.find(task => task.description === oldDescription);
        if (task) {
            task.description = newDescription;
            task.deadline = newDeadline;
        }
    }

    getPlannedTasks() {
        return this.tasks;
    }

    completeTask(description) {
        const index = this.tasks.findIndex(task => task.description === description);
        if (index !== -1) {
            const completedTask = this.tasks.splice(index, 1)[0];
            completedTask.completed = true;
            this.completedTasks.push(completedTask);
        }
    }

    undoCompleteTask() {
        if (this.completedTasks.length > 0) {
            const lastCompletedTask = this.completedTasks.pop();
            lastCompletedTask.completed = false;
            this.tasks.push(lastCompletedTask);
        }
    }

    clearAllTasks() {
        this.tasks = [];
        this.completedTasks = [];
    }

    getProgress() {
        const totalTasks = this.tasks.length + this.completedTasks.length;
        const completedPercentage = totalTasks === 0 ? 0 : (this.completedTasks.length / totalTasks) * 100;
        return completedPercentage.toFixed(2);
    }
}

const planner = new StudyPlanner();

function addTask() {
    const description = document.getElementById('description').value;
    const deadline = document.getElementById('deadline').value;
    if (description && deadline) {
        planner.addTask(description, deadline);
        document.getElementById('description').value = '';
        document.getElementById('deadline').value = '';
        alert("Task Added!");
    }
}

function deleteTask(description) {
    planner.deleteTask(description);
    displayTasks();
}

function editTask(oldDescription) {
    const newDescription = prompt("Enter new task description:", oldDescription);
    const newDeadline = prompt("Enter new deadline:");
    if (newDescription && newDeadline) {
        planner.editTask(oldDescription, newDescription, newDeadline);
        displayTasks();
    }
}

function displayTasks() {
    const tasks = planner.getPlannedTasks();
    const taskList = document.getElementById('plannedTasks');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${task.description} - ${task.deadline}
            <button onclick="deleteTask('${task.description}')">Delete</button>
            <button onclick="editTask('${task.description}')">Edit</button>
            <button onclick="markAsComplete('${task.description}')">Mark as Complete</button>
        `;
        taskList.appendChild(listItem);
    });

    document.getElementById('taskDisplay').style.display = 'block';
}

function markAsComplete(description) {
    planner.completeTask(description);
    displayTasks();
    displayCompletedTasks();
}

function undoCompleteTask() {
    planner.undoCompleteTask();
    displayTasks();
    displayCompletedTasks();
}

function displayCompletedTasks() {
    const completedTasks = planner.completedTasks;
    const completedTaskList = document.getElementById('completedTasks');
    completedTaskList.innerHTML = '';

    completedTasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = `${task.description} - ${task.deadline}`;
        completedTaskList.appendChild(listItem);
    });

    document.getElementById('completedTasksDisplay').style.display = 'block';
}

function showProgress() {
    const progress = planner.getProgress();
    document.getElementById('progressData').innerText = `Completed: ${progress}%`;
    document.getElementById('progressDisplay').style.display = 'block';
}

function clearAllTasks() {
    planner.clearAllTasks();
    displayTasks();
    displayCompletedTasks();
    document.getElementById('progressDisplay').style.display = 'none';
}
