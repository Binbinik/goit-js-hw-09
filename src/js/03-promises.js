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

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const form = event.target;
  const delay = Number(form.elements['delay'].value);
  const step = Number(form.elements['step'].value);
  const amount = Number(form.elements['amount'].value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + step * (i - 1))
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
