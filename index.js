// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

// functions

function createToDoList(inputValue) {
  //   todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = inputValue;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // attach it to the ul
  todoList.appendChild(todoDiv);
}

function addToDo(event) {
  // prevents form from submitting
  event.preventDefault();
  createToDoList(todoInput.value);
  // save todo to local storage
  saveLocalTodos(todoInput.value);

  // resetting the input
  todoInput.value = "";
  todoInput.focus();
}

function deleteCheck(event) {
  // DELETE the todo
  const item = event.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    deleteLocalTodo(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    item.parentElement.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    console.log(event.target.value);
    switch (event.target.value) {
      case "all":
        // console.log("inside all");
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function checkIfAlreadyExistInLocalStorage() {
  // check if we already have a todo
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function saveLocalTodos(todo) {
  let todos = checkIfAlreadyExistInLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // getting todos from local storage
  let todos = checkIfAlreadyExistInLocalStorage();
  todos.forEach((todo) => {
    createToDoList(todo);
  });
}

function deleteLocalTodo(todo) {
  let todos = checkIfAlreadyExistInLocalStorage();
  const todoText = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
