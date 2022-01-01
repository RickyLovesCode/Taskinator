var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // CHECK IF INPUT VALUES ARE EMPTY STRINGS 
    if (!taskNameInput || !taskTypeInput) {
        alert("you need to fill out the task form!");
        return false;

    }

    formEl.reset();


    //PACKEGE UP DATA AS AN 'OBJECT'
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //SEND AS A 'ARGUMENT' TO => 'creatTaskEl'
    createTaskEl(taskDataObj);

};


var createTaskEl = function (taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
};

console.log(taskFormHandler);

formEl.addEventListener("submit", taskFormHandler);
// #these notes go under "event.preventDefault();"
    // //CREATE LIST ITEM
    // var listItemEl = document.createElement("li");
    // listItemEl.className = "task-item";
    // //CREATE 'DIV' TO HOLD 'TASK INFO' & ADD TO 'LIST ITEM'
    // var taskInfoEl = document.createElement("div");
    // taskInfoEl.className = "task-info";
    // //ATTACH HTML TO 'DIV'
    // taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    // listItemEl.appendChild(taskInfoEl);

    // //ADD ENTIRE 'LIST ITEM' TO LIST
    // tasksToDoEl.appendChild(listItemEl);