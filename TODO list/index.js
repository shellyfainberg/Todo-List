//Selectors - find HTML elements
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos); //page loaded
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

//Functions
function addTodo(event) {
    //prevent from from sudmitting - Do ont refresh tha page
    event.preventDefault();

    //TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo"); // classList - DOM property for css

    //create li
    const newTodo = document.createElement("li");

    //check if input is null
    if (todoInput.value == "") {
        return;
    }
    else {  //not null
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo); //add new TODO to DIV

        //add TODO to local storage
        saveLocalTodos(todoInput.value);
    }

    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>'; //check icon
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button 
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append todoDiv to list
    todoList.appendChild(todoDiv);

    //clear TOTO input values  
    todoInput.value = "";

}

function deleteCheck(event) {
    const item = event.target;

    //delete TODO
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall"); // fall animation
        removeLocaTodos(todo); //remove todo from storage
        todo.addEventListener("transitionend", function () { //waiting for the animation to finish
            todo.remove();
        });
    }

    //check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");

    }

}

function filterTodo(event) {
 
    const todos = todoList.childNodes;  
    todos.forEach(function (todo) {
        
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }

    });
}

function saveLocalTodos(todo) {
    //check if todos exists
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(params) { // get TODOS from storage and create them on UI

    //check if todos exists
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class= "fas fa-check"></i>';
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton);

        //check trash button 
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //append to list 
        todoList.appendChild(todoDiv);


    });
}

function removeLocaTodos(todo) {
    //check if todos roemove list exists
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));


}

setInterval(showTime, 1000);
function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";

    if (hour > 12) {
        hour -= 12;
        am_pm = "PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = "AM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = hour + ":"
        + min + ":" + sec + am_pm;

    document.getElementById("clock")
        .innerHTML = currentTime;
}
showTime();
