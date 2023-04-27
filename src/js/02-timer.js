import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const btn = document.querySelector("button");

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure("Please choose a date in the future");
      btn.disabled = true;
    } else {
      btn.disabled = false;
      timer.deadline = selectedDates[0];
    }
  },
};

flatpickr("#datetime-picker", options);

const timer = {
  deadline: new Date(),
  intervalId: null,
  rootSelector: document.querySelector(".timer"),

  start() {
    this.intervalId = setInterval(() => {
      const diff = this.deadline - Date.now();
      if (diff <= 0) {
        this.stop();

        return;
      }

      let { days, hours, minutes, seconds } = this.convertMs(diff);

      this.rootSelector.querySelector(".value[data-days]").textContent =
        this.addLeadingZero(days);
      this.rootSelector.querySelector(".value[data-hours]").textContent =
        this.addLeadingZero(hours);
      this.rootSelector.querySelector(".value[data-minutes]").textContent =
        this.addLeadingZero(minutes);
      this.rootSelector.querySelector(".value[data-seconds]").textContent =
        this.addLeadingZero(seconds);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },
  addLeadingZero(value) {
    return String(value).padStart(2, "0");
  },
};

const startClickHandler = () => {
  timer.start();
  btn.disabled = true;
};

btn.addEventListener("click", startClickHandler);
