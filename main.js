const inputField = document.querySelector('.todo-input input');
const addButton = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}