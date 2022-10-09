const tasks = [];

const renderTasks = function () {
  const taskContainer = document.querySelector("#task-container");
  taskContainer.textContent = "";
  tasks.forEach((task, taskNum) => {
    renderTask(taskNum);
  });
};

const deleteTask = function (taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
};

const renderTask = function (taskNum) {
  const taskRow = document.createElement("div");
  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task";
  text.value = tasks[taskNum];
  text.addEventListener("change", function () {
    tasks[taskNum] = text.value;
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.addEventListener("click", function () {
    chrome.storage.local.set({ local: "deleted" });
    chrome.storage.sync.set({ sync: "deleted" });
    deleteTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.querySelector("#task-container");
  taskContainer.appendChild(taskRow);
};

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", function () {
  const taskNum = tasks.length;
  tasks[taskNum] = "";
  renderTask(taskNum);
});

chrome.storage.local.get(["local"], (res) => {
  console.log(res);
});
chrome.storage.sync.get(["sync"], (res) => {
  console.log(res);
});
