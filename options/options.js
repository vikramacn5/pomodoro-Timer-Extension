const timeOption = document.querySelector("#time-option");
timeOption.addEventListener("change", (event) => {
  const val = event.target.value;
  if (val < 1 || val > 60) {
    timeOption.value = 25;
  }
});

const saveBtn = document.querySelector("#save-btn");
saveBtn.addEventListener("click", function () {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
      timeOption: Number(timeOption.value),
    },
    () => {
      chrome.storage.local.get(["timeOption"], (res) => console.log(res));
    }
  );
});

chrome.storage.local.get(["timeOption"], (res) => {
  timeOption.value = res.timeOption;
});
