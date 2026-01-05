// State variables
let duration = 60000;
let startTime = 0;
let lastSecond = duration / 1000;
let isRunning = true;
let remainingSeconds = duration / 1000;

let cellW = 100;
let spacing = 10;
let cols;

function setup() {
  createCanvas(windowWidth, windowHeight);
  startTime = millis();

  cols = floor(width / cellW); // -> 400/100 = 4
}

function draw() {
  if (!isRunning) return;
  background(220);
  let remaining = startTime + duration - millis();
  remainingSeconds = ceil(remaining / 1000);
  let posX = cellW;
  let posY = cellW;
  for (let i = 0; i < remainingSeconds; i++) {
    ellipse(posX, posY, cellW);
    posX += cellW + spacing;
    if (posX + cellW / 2 > width) {
      posX = cellW;
      posY += cellW + spacing;
    }
  }
  // Tick every second
  if (remainingSeconds !== lastSecond) {
    tick();
    lastSecond = remainingSeconds;
  }

  // Check if timer finished
  if (remaining <= 0) {
    console.log("Timer finished");
    isRunning = false;
  }
}

function tick() {
  // do something
}
