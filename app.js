// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', displayTodo);

// Functions
function addTodo(event) {
    // Prevent from submitting
    event.preventDefault();
    // Add todo to localStorage
    saveLocalTodos(todoInput.value);
    // Display todo list
    displayTodo();
    // Clear Todo input value
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    // Delete item
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
         // Animation
        todo.classList.add('fall');
        console.log('getting check from local storage');
        let todos = JSON.parse(localStorage.getItem('todos'));
        console.log(todo.getAttribute('id'));
        console.log('deleting');
        todos.splice(todo.getAttribute('id'),1);
        todos.forEach(function(todoItem, index){
            todoItem.id = index;
        })
        console.log(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
        // Display todo list
        setTimeout(() => {
            displayTodo();
            filterOption.click();
        }, 700);
    }
    // Check finished item
    if(item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
        let todos = JSON.parse(localStorage.getItem('todos'));
        console.log(todos);
        console.log(todo.getAttribute('iscompleted'));
        todos[todo.getAttribute('id')].isCompleted = todos[todo.getAttribute('id')].isCompleted ? false : true;
        localStorage.setItem('todos', JSON.stringify(todos));
        // Display todo list
        displayTodo();
        filterOption.click();
    }
}

// To filter todo
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.getAttribute('iscompleted') === "true"){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(todo.getAttribute('iscompleted') === "false"){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

// Display todo
function displayTodo() {
    todoList.innerHTML = '';
    console.log('Calling displayTodo')
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function( { item, isCompleted }, index ){
        // Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        if(isCompleted) {
            todoDiv.classList.add('completed');
        }
        todoDiv.setAttribute('id', index);
        todoDiv.setAttribute('isCompleted', isCompleted);
        // Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // Creating li
        const newTodo = document.createElement('li');
        newTodo.innerHTML = item;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("completed-btn");
        todoDiv.appendChild(completedButton);
        // Append to list
        todoList.appendChild(todoDiv);
    })
}

// To save it in local storage
function saveLocalTodos(todo) {
    console.log('Saving to local storage');
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push({ id: todos.length, item: todo, isCompleted: false });
    localStorage.setItem('todos', JSON.stringify(todos));
}