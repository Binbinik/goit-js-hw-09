import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let countdownId = null;
let targetDate = null;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0];
    if (targetDate <= new Date()) {
      alert('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', startCountdown);

function startCountdown() {
  if (countdownId) {
    clearInterval(countdownId);
  }

  countdownId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = targetDate - currentTime;
    const timeComponents = convertMs(deltaTime);
    updateClockface(timeComponents);

    if (deltaTime <= 0) {
      clearInterval(countdownId);
      updateClockface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      refs.startBtn.disabled = true;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
