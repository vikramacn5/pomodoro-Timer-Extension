let tasks = [];

const updateTime = function () {
  chrome.storage.local.get(["timer", "timeOption"], (res) => {
    const timeEl = document.querySelector("#time");
    const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(
      2,
      "0"
    );
    let seconds = "00";
    if (res.timer % 60 !== 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }
    timeEl.textContent = `${minutes}:${seconds}`;
  });
};

updateTime();
setInterval(updateTime, 1000);

const startTimerBtn = document.querySelector("#start-timer-btn");
startTimerBtn.addEventListener("click", function () {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set({ isRunning: !res.isRunning }, () => {
      console.log(res);
      startTimerBtn.textContent = !res.isRunning
        ? "Pause Timer"
        : "Start Timer";
    });
  });
});

const resetTimerBtn = document.querySelector("#reset-timer-btn");
resetTimerBtn.addEventListener("click", function () {
  chrome.storage.local.set({ timer: 0, isRunning: false }, () => {
    startTimerBtn.textContent = "Start Timer";
  });
});

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ?? [];
  renderTasks();
});

const saveTasks = function () {
  chrome.storage.sync.set({ tasks });
};

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
  saveTasks();
};

const renderTask = function (taskNum) {
  const taskRow = document.createElement("div");
  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task";
  text.value = tasks[taskNum];
  text.addEventListener("change", function () {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.addEventListener("click", function () {
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
  saveTasks();
});
