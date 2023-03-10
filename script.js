const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase-stroke-size");
const decreaseBtn = document.getElementById("decrease-stroke-size");
const sizeEL = document.getElementById("stroke-size");
const colorEl = document.getElementById("color");
const clearBtn = document.getElementById("clear");

const ctx = canvas.getContext("2d");

let size = 5;
let isPressed = false;
let color = "black";
let x;
let y;

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function updateSizeOnScreen() {
  sizeEL.innerText = size;
}

increaseBtn.addEventListener("click", () => {
  size += 1;

  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
  size -= 1;

  if (size < 1) {
    size = 1;
  }

  updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => (color = e.target.value));

clearBtn.addEventListener("click", () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);

// Fetch tip of the day
const adviceDisplay = document.querySelector('#advice');

async function getAdvice() {
  const response = await fetch('https://api.adviceslip.com/advice');
  const data = await response.json();
  const { advice } = data.slip;

  adviceDisplay.innerText = advice;
}

getAdvice();
