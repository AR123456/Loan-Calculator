const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// function to load all event listioners
loadEventListeners();

// load all event listioners function
function loadEventListeners() {
  // add task event
  form.addEventListener("submit", addTask);
}

//addTask Function
function addTask(e) {
  // make sure there is a task to add
  if (taskInput.value === "") alert("Add a task");

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
  //clear input
  taskInput.value = "";

  // prevent default submit of form
  e.preventDefault();
}
