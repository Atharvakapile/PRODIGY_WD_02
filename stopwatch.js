let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// Get DOM elements
const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

// Function to format time in hh:mm:ss:ms
function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function print(txt) {
  display.innerHTML = txt;
}

// Start or stop the stopwatch
function startStop() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
      elapsedTime = Date.now() - startTime;
      print(timeToString(elapsedTime));
    }, 10);
    startStopBtn.innerText = "Pause";
    startStopBtn.classList.add("running");
  } else {
    isRunning = false;
    clearInterval(timerInterval);
    startStopBtn.innerText = "Start";
    startStopBtn.classList.remove("running");
  }
}

// Reset the stopwatch
function reset() {
  clearInterval(timerInterval);
  print("00:00:00.00");
  elapsedTime = 0;
  startStopBtn.innerText = "Start";
  startStopBtn.classList.remove("running");
  laps.innerHTML = "";
  isRunning = false;
}

// Record the lap
function recordLap() {
  if (isRunning) {
    let lapTime = timeToString(elapsedTime);
    let lapItem = document.createElement("li");
    lapItem.innerText = `Lap: ${lapTime}`;
    laps.appendChild(lapItem);
  }
}

// Event listeners
startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);
