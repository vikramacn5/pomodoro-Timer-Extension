chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["isRunning", "timer", "timeOption"], (res) => {
      if (res.isRunning) {
        let isRunning = true;
        let timer = res.timer + 1;
        if (timer === 60 * res.timeOption) {
          isRunning = false;
          timer = 0;
          this.registration.showNotification("Pomodoro Timer", {
            body: `${res.timeOption} minutes has passed`,
            icon: "./icon.png",
          });
        }
        chrome.storage.local.set({ timer, isRunning });
      }
    });
  }
});

chrome.storage.local.get(["isRunning", "timer", "timeOption"], (res) => {
  const isRunning = res.isRunning ?? false;
  const timer = res.timer ?? 0;
  const timeOption = res.timeOption ?? 25;

  chrome.storage.local.set({ isRunning, timer, timeOption });
});
