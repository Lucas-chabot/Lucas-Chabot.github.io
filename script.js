let timer;
let remainingTime = 0;
let totalTime = 0;
let isRunning = false;

const timeInput = document.getElementById('timeInput');
const display = document.getElementById('display');
const progressBar = document.querySelector('.progress-bar::after');
const progress = document.querySelector('.progress-bar');

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateDisplay() {
  display.textContent = formatTime(remainingTime);
  display.classList.add('changed');
  setTimeout(() => display.classList.remove('changed'), 200);
}

function updateProgress() {
  const bar = progress.querySelector("::after");
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    if (remainingTime === 0) {
      remainingTime = parseInt(timeInput.value) || 0;
      totalTime = remainingTime;
    }
    if (remainingTime > 0) {
      isRunning = true;
      timer = setInterval(() => {
        remainingTime--;
        updateDisplay();

        let percentage = (remainingTime / totalTime) * 100;
        progress.style.setProperty("--w", percentage + "%");
        progress.style.position = "relative";
        progress.innerHTML = `<div style="height:100%;width:${percentage}%;background:linear-gradient(90deg,#4caf50,#f44336);transition:width 1s linear;"></div>`;

        if (remainingTime <= 0) {
          clearInterval(timer);
          isRunning = false;
          display.textContent = "00:00";
          progress.innerHTML = `<div style="height:100%;width:0%;background:linear-gradient(90deg,#4caf50,#f44336);"></div>`;
          alert("Time’s up!");
        }
      }, 1000);
    }
  }
});

stopBtn.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  isRunning = false;
  remainingTime = 0;
  totalTime = 0;
  timeInput.value = '';
  updateDisplay();
  progress.innerHTML = `<div style="height:100%;width:100%;background:linear-gradient(90deg,#4caf50,#f44336);"></div>`;
});

// Preset buttons
function setTime(sec) {
  remainingTime = sec;
  totalTime = sec;
  timeInput.value = sec;
  updateDisplay();

  progress.innerHTML = `<div style="height:100%;width:100%;background:linear-gradient(90deg,#4caf50,#f44336);"></div>`;
}
