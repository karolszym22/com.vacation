let currentNumber = 0;
const targetNumber = 66;
const duration = 1000; 
const frameRate = 60;

const counterElement = document.getElementById('counter');

const updateCounter = (timestamp: number) => {
  if (!startTimestamp) startTimestamp = timestamp;

  const progress = Math.min(1, (timestamp - startTimestamp) / duration);

  const value = Math.floor(progress * targetNumber);
  currentNumber = value;

  if (counterElement) {
    counterElement.innerText = currentNumber.toString();
  }

  if (progress < 1) {
    requestAnimationFrame(updateCounter);
  }
};

let startTimestamp: number | null = null;

const startAnimation = () => {
  startTimestamp = null;
  requestAnimationFrame(updateCounter);
};

export default startAnimation();