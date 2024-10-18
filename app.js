// DOM elements
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const successMessage = document.getElementById('success-message');

// Save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

// Add task function
function addTask(taskText, completed = false) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    const taskTextSpan = document.createElement('span');
    taskTextSpan.classList.add('task-text');
    taskTextSpan.textContent = taskText;

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');

    // Task Completion Button
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.innerHTML = '✔'; // Tick icon
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
        successMessage.textContent = li.classList.contains('completed')
            ? "Task marked as completed!"
            : "Task marked as incomplete!";
        setTimeout(() => successMessage.textContent = '', 2000);
    });

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '✖'; // X icon
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
        successMessage.textContent = "Task deleted successfully!";
        setTimeout(() => successMessage.textContent = '', 2000);
    });

    taskActions.appendChild(completeBtn);
    taskActions.appendChild(deleteBtn);
    li.appendChild(taskTextSpan);
    li.appendChild(taskActions);
    taskList.appendChild(li);
    saveTasks();
}

// Load tasks when the document is ready
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task button event listener
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = '';
        successMessage.textContent = "Task added successfully!";
        setTimeout(() => successMessage.textContent = '', 2000);
    } else {
        alert("Please enter a task.");
    }
});
