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

    undoTask() {
        if (this.completedTasks.length > 0) {
            this.tasks.push(this.completedTasks.pop());
        }
    }

    clearAllTasks() {
        this.tasks = [];
        this.completedTasks = [];
    }

    // New method to calculate progress
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

// Rest of the JavaScript functions...
const planner = new StudyPlanner();

// Add a function to show progress on the front end
function showProgress() {
    const progress = planner.getProgress();
    const progressDisplay = document.getElementById('progressDisplay');
    progressDisplay.innerHTML = `
        <p>Completed Tasks: ${progress.completedPercentage}%</p>
        <p>Pending Tasks: ${progress.pendingPercentage}%</p>
    `;
    progressDisplay.style.display = 'block';
}
