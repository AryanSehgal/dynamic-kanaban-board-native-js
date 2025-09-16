let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//global contants for columns
const columns = ['todo', 'in-progress', 'done'];

// Load tasks on initial mount
document.addEventListener("DOMContentLoaded", function () {
    renderTasks();
});

// Function to render tasks on the board
function renderTasks() {
    columns.forEach(columnId => {
        const column =
            document.getElementById(columnId);
        column.querySelector('.task-container').
            innerHTML = '';

        tasks.forEach(task => {
            if (task.status === columnId) {
                const taskElement =
                    createTaskElement(task.title, task.description, task.id);
                column.querySelector('.task-container').
                    appendChild(taskElement);
            }
        });
    });
}

// Function to create task elements
function createTaskElement(title, description, id) {
    const taskId = id
    const task = document.createElement("div");
    task.id = taskId;
    task.className = "task";
    task.draggable = true;
    task.innerHTML =
    `<div class="relative w-full">
        <h4>${title}</h4>
        <p>${description}</p>
        <span class="delete-btn" onclick="deleteTask('${taskId}')">
            X
        </span>
    </div>`;
    task.addEventListener("dragstart", drag);
    return task;
}


