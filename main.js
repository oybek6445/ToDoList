const inputField = document.querySelector('.todo-input input');
const addButton = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function addTask(taskText, completed = false){
    if(taskText.trim() === '') return
    const taskItem = document.createElement('li');
    taskItem.classList.add('todo-item');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    if (completed) {
        taskSpan.classList.add('completed');
    }
    taskSpan.onclick = () => toggleTaskCompletion(taskSpan);

    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.textContent = '✏️';
    editButton.onclick = () => editTask(taskSpan);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = '🗑️';
    deleteButton.onclick = () => deleteTask(taskItem);


    taskItem.appendChild(taskSpan);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    todoList.appendChild(taskItem);

    const tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, completed });
    saveTasksToLocalStorage(tasks);

    inputField.value = '';
}

function editTask(taskSpan) {
    const newText = prompt('Vazifani tahrirlash:', taskSpan.textContent);
    if (newText !== null && newText.trim() !== '') {
        const tasks = getTasksFromLocalStorage();
        const taskIndex = Array.from(todoList.children).findIndex(
            (item) => item.querySelector('span') === taskSpan
        );
        tasks[taskIndex].text = newText.trim();
        saveTasksToLocalStorage(tasks);

        taskSpan.textContent = newText.trim();
    }
}
