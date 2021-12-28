// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// event listeners
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);

// functions
function addToDo(event) {
  // prevents form from submitting
  event.preventDefault();
  //   todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
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
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    item.parentElement.classList.toggle("completed");
  }
}
