document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Add task
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const desc = document.getElementById('task-desc').value;
        const dueDate = document.getElementById('task-due-date').value;
        const priority = document.getElementById('task-priority').value;

        const task = { title, desc, dueDate, priority, completed: false };
        addTaskToDOM(task);
        saveTaskToLocalStorage(task);
        taskForm.reset();
    });

    // Function to add task to the DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title} - ${task.priority} - ${task.dueDate} ${task.completed ? '(Completed)' : ''}</span>
            <button class="complete" onclick="toggleComplete('${task.title}')">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="edit" onclick="editTask('${task.title}')">Edit</button>
            <button class="delete" onclick="deleteTask('${task.title}')">Delete</button>
        `;
        taskList.appendChild(li);
    }

    // Function to save task to local storage
    function saveTaskToLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }

    // Toggle task completion status
    window.toggleComplete = function (title) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            if (task.title === title) {
                task.completed = !task.completed;
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        location.reload(); // Reload to show updated task status
    }

    // Edit task
    window.editTask = function (title) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskToEdit = tasks.find(task => task.title === title);
        document.getElementById('task-title').value = taskToEdit.title;
        document.getElementById('task-desc').value = taskToEdit.desc;
        document.getElementById('task-due-date').value = taskToEdit.dueDate;
        document.getElementById('task-priority').value = taskToEdit.priority;
        deleteTask(title); // Remove the task to be edited
    }

    // Delete task
    window.deleteTask = function (title) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.title !== title);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        location.reload(); // Reload to update the displayed list
    }
});
