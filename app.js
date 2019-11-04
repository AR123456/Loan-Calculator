const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// function to load all event listioners
loadEventListeners();

// load all event listieners function
function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // add task event
  form.addEventListener("submit", addTask);
  //Remove task event
  taskList.addEventListener("click", removeTask);
  // clear all tasks
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks
  filter.addEventListener("keyup", filterTasks);
}
// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task) {
    // create li element
    const li = document.createElement("li");
    // add class to the element
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
  });
}

///////////addTask Function
function addTask(e) {
  // make sure there is a task to add
  if (taskInput.value === "") {
    alert("Add a task ");
  }

  // create li element
  const li = document.createElement("li");
  // add class to the element
  li.className = "collection-item";
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement("a");
  //add class
  link.className = "delete-item secondary-content";
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);
  // Store the list in local storage
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = "";

  // prevent default submit of form
  e.preventDefault();
}

///Store Task in local storage function
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/////////removeTask function
function removeTask(e) {
  // target the red x
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      //Remove from DOM
      e.target.parentElement.parentElement.remove();
      // Call Remove from local storage function
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
// Remove from Local storage function
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
/// clear tasks
function clearTasks() {
  // one way to do this
  // taskList.innerHTML = "";
  /// better more effecient way to do this
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // https://jsperf.com/innerhtml-vs-removechild/47

  // Clear tasks from Local Storage
  clearTasksFromLocalStorage();
}
// clear Tasks fuction
function clearTasksFromLocalStorage(tasks) {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // querySelectoryAll returns a node list so we can do this without having to handle array
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
