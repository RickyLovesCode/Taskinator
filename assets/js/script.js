var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");


// TASKFORMHANDLER FUNC
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

    var isEdit = formEl.hasAttribute("data-task-id");

    //HAS DATA ATTRIBUTE, SO GET TASK ID AND CALL FUNC TO COMPLETE EDIT PROCESS
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //NO DATA ATTR, SO CREATE OBJ AS 'NORMAL' AND PASS TO createTaskEl FUNC
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
        createTaskEl(taskDataObj);
    }
    // //PACKEGE UP DATA AS AN 'OBJECT'
    // var taskDataObj = {
    //     name: taskNameInput,
    //     type: taskTypeInput
    // };
    // //SEND AS A 'ARGUMENT' TO => 'creatTaskEl'
    // createTaskEl(taskDataObj);
};

var completeEditTask = function (taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //SET NEW VALUES
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

//CREATE TASK FUNC
var createTaskEl = function (taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // ADD DATA ID AS A CUSTOM ATTRIBUTE
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //INCREASE TASK COUNTER FOR NEXT UNIQUE ID
    taskIdCounter++;
};

var createTaskActions = function (taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //THE 'EDIT' BUTTON
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //THE 'DELETE BUTTON'
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;

}

var taskButtonHandler = function (event) {
    var targetEl = event.target;

    //EDIT BUTTON 'CLICKED'
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //DELETE BUTTON 'CLICKED'
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
    // if (event.target.matches(".delete-btn")) {
    //     //  GET THE ELEMENTS TASK ID
    //     var taskId = event.target.getAttribute("data-task-id");
    //     deleteTask(taskId);
    // }
};

var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

var editTask = function (taskId) {
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //GET CONTENT FROM 'TASK NAME & TYPE'
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
};

var taskStatusChangeHandler = function (event) {
    //THIS GET'S THE TASK ITEM'S [I.D]
    var taskId = event.target.getAttribute("data-task-id");
    //GET THE 'CURRENT' SELECTED OPTION'S VALUE & CONVERT TO LOWERCASE
    var statusValue = event.target.value.toLowerCase();
    //FIND THE PARENT 'TASK ITEM' ELEMENT FROM THE [I.D]
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.append(taskSelected);
    }
};

pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
formEl.addEventListener("submit", taskFormHandler);
