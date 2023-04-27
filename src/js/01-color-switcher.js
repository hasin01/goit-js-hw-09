function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
let colorGereratorId = null;

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

const btnGenerateColorClickHandler = () => {
  colorGereratorId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
  }, 1000);
};
const stopColorGeneratorHandler = () => {
  clearInterval(colorGereratorId);
  startBtn.disabled = false;
};
startBtn.addEventListener('click', btnGenerateColorClickHandler);
stopBtn.addEventListener('click', stopColorGeneratorHandler);
