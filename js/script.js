document.addEventListener("DOMContentLoaded", function() {
    loadTodos();
});

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const todoItem = createTodoElement(todo, index);
        todoList.appendChild(todoItem);
    });
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoElement(todo, index) {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item' + (todo.completed ? ' completed' : '');

    const todoText = document.createElement('span');
    todoText.textContent = todo.text;
    todoItem.appendChild(todoText);

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = todo.text;
    editInput.style.display = 'none';
    todoItem.appendChild(editInput);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editButton = document.createElement('button');
    editButton.className = 'icon-btn';
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.onclick = () => {
        editInput.style.display = 'block';
        todoText.style.display = 'none';
        editButton.style.display = 'none';
        saveButton.style.display = 'inline';
    };
    actions.appendChild(editButton);

    const saveButton = document.createElement('button');
    saveButton.className = 'icon-btn';
    saveButton.innerHTML = '<i class="fas fa-save"></i>';
    saveButton.style.display = 'none';
    saveButton.onclick = () => {
        const newText = editInput.value;
        todoText.textContent = newText;
        todoText.style.display = 'block';
        editInput.style.display = 'none';
        editButton.style.display = 'inline';
        saveButton.style.display = 'none';
        updateTodoText(index, newText);
    };
    actions.appendChild(saveButton);

    const completeButton = document.createElement('button');
    completeButton.className = 'icon-btn';
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.onclick = () => {
        todo.completed = !todo.completed;
        todoItem.classList.toggle('completed');
        updateTodoStatus(index, todo.completed);
    };
    actions.appendChild(completeButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'icon-btn';
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.onclick = () => {
        deleteTodoItem(index);
    };
    actions.appendChild(deleteButton);

    todoItem.appendChild(actions);

    return todoItem;
}

function addTodo() {
    const newTodoInput = document.getElementById('new-todo');
    const newText = newTodoInput.value.trim();
    if (newText !== '') {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text: newText, completed: false });
        saveTodos(todos);
        newTodoInput.value = '';
        loadTodos();
    }
}

function updateTodoText(index, newTodo){
const todos = JSON.parse(localStorage.getItem('todos'))||[];
todos[index].text = newText;
saveTodos(todos);
}

function updateTodoStatus(index, completed){
    const todos = JSON.parse(localStorage.getItem('todos'))||[];
    todos[index].completed = completed;
    saveTodos(todos);
}

function deleteTodoItem(index){
    const todos = JSON.parse(localStorage.getItem('todos'))||[];
    todos.splice(index, 1);
    saveTodos(todos);
    loadTodos();
}