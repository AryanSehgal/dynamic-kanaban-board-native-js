// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.
        filter(task => task.id !== taskId);
    updateLocalStorage();
    renderTasks();
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.
        setData("text/plain", event.target.id);
}

function drop(event, columnId) {
    event.preventDefault();
    console.log(columnId)
    const data = event.
        dataTransfer.getData("text/plain");
    const draggedElement =
        document.getElementById(data);
    console.log(draggedElement)
    if (draggedElement) {
        const taskStatus = columnId;
        updateTaskStatus(data, taskStatus);
        event.target.querySelector('.task-container').
            appendChild(draggedElement);
    }
}


function addTask(columnId) {
    const taskTitleInput =
        document.getElementById('taskTitleInput');
    const taskDescriptionInput =
        document.getElementById('taskDescriptionInput');

    const title = taskTitleInput.value?.trim() ?? '';
    const description = taskDescriptionInput.value?.trim() ?? '';

    if (title !== "" && description !== "") {
        const newTask = {
            id: "task-" + Date.now(),
            title,
            description,
            status: columnId
        };
        tasks.push(newTask);
        updateLocalStorage();
        renderTasks();
        taskTitleInput.value = "";
        taskDescriptionInput.value = "";
    }
}

// Function to update task status 
// when moved to another column
function updateTaskStatus(taskId, newStatus) {
    console.log(newStatus)
    tasks = tasks.map(task => {
        console.log(task)
        console.log(taskId)
        if (task.id === taskId) {
            console.log("inside if")
            return { ...task, status: newStatus };
        }
        return task;
    });
    updateLocalStorage();
}

// Function to update local 
// storage with current tasks
function updateLocalStorage() {
    console.log("task update")
    localStorage.setItem
        ('tasks', JSON.stringify(tasks));
}