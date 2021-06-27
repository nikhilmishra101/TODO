//SELECTORS
const todoList = document.querySelector(".todo-list");
const todobutton = document.querySelector("#submit");
const todoInput = document.querySelector("#todo-input");
const filterOption = document.querySelector(".filter-todo");

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
todobutton.addEventListener("click", addItem);
todobutton.addEventListener("keydown", addItem);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//FUNCTIONS
function addItem(e) {
  //Prevent form from submission
  e.preventDefault();
  //Todo div
  const todoDiv = document.createElement("div");
  //add class
  todoDiv.classList.add("todo");
  //create Li
  const newItem = document.createElement("li");
  //add class
  newItem.classList.add("todo-item");
  //adding text
  newItem.innerText = todoInput.value;
  //adding it into todo div
  todoDiv.appendChild(newItem);
  //add todo to local storage
  saveLocalTodos(todoInput.value);
  //check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //adding it into todo list
  todoList.appendChild(todoDiv);
  //clear the input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //Delete TODO
  if (item.classList[0] == "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "todo-left":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //check -- if todo already exists
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Todo div
    const todoDiv = document.createElement("div");
    //add class
    todoDiv.classList.add("todo");
    //create Li
    const newItem = document.createElement("li");
    newItem.innerText = todo;
    //add class
    newItem.classList.add("todo-item");
    //adding it into todo div
    todoDiv.appendChild(newItem);
    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //adding it into todo list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //check -- if todo already exists
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
