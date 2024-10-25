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

    getProgress() {
        const totalTasks = this.tasks.length + this.completedTasks.length;
        const completedPercentage = totalTasks === 0 ? 0 : (this.completedTasks.length / totalTasks) * 100;
        const pendingPercentage = 100 - completedPercentage;
        return {
            completedPercentage: completedPercentage.toFixed(2),
            pendingPercentage: pendingPercentage.toFixed(2)
        };
    }
}

// JavaScript functions for frontend interaction
const planner = new StudyPlanner();

function addTask() {
    const description = document.getElementById('description').value;
    const deadline = document.getElementById('deadline').value;
    planner.addTask(description, deadline);
    document.getElementById('description').value = '';
    document.getElementById('deadline').value = '';
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
        listItem.innerHTML = `${task.description} - ${task.deadline} 
            <button onclick="deleteTask('${task.description}')">Delete</button>
            <button onclick="editTask('${task.description}')">Edit</button>`;
        taskList.appendChild(listItem);
    });

    document.getElementById('taskDisplay').style.display = 'block';
}

function showProgress() {
    const progress = planner.getProgress();
    const progressDisplay = document.getElementById('progressDisplay');
    progressDisplay.innerHTML = `
        <p>Completed Tasks: ${progress.completedPercentage}%</p>
        <p>Pending Tasks: ${progress.pendingPercentage}%</p>
    `;
    progressDisplay.style.display = 'block';
}
