const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// function to load all event listioners
loadEventListeners();

// load all event listieners function
function loadEventListeners() {
  // add task event
  form.addEventListener("submit", addTask);
  //Remove task event
  taskList.addEventListener("click", removeTask);
  // clear all tasks
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks
  filter.addEventListener("keyup", filterTasks);
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
  //clear input
  taskInput.value = "";

  // prevent default submit of form
  e.preventDefault();
}
/////////removeTask function
function removeTask(e) {
  // target the red x
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}
function clearTasks() {
  // one way to do this
  // taskList.innerHTML = "";
  /// better more effecient way to do this
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}
// https://jsperf.com/innerhtml-vs-removechild/47
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
