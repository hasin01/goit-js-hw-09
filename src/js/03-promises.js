import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const promiseSubmit = e => {
  e.preventDefault();

  const {
    elements: { amount, delay, step },
  } = e.currentTarget;

  const amountValue = +amount.value;
  let delayValue = +delay.value;
  const stepValue = +step.value;

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, delayValue)
      .then(result => {
        Notify.success(
          `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
        );
      })
      .catch(error => {
        Notify.failure(
          `❌ Rejected promise ${error.position} in ${error.delay}ms`
        );
      });

    delayValue += stepValue;
  }
};

form.addEventListener('submit', promiseSubmit);