let duration = 60000;
let startTime = 0;
let lastSecond = duration / 1000 + 1;

let startTimeColor = 200;
let lastSecondColor = duration / 1000 + 1;

let wdth = 0;
let delta = 10;

let col1, col2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  startTime = millis();
  startTimeColor = startTime + 200;
  col1 = color(255);
  col2 = color(0);
}

function updateTimer() {
  let remaining = startTime + duration - millis();
  let remainingSeconds = ceil(remaining / 1000);

  let elapsed = millis() - startTime;
  let elapsedSeconds = floor(elapsed / 1000);

  if (elapsedSeconds !== lastSecond) {
    console.log(elapsedSeconds, remainingSeconds);
    tick(elapsedSeconds);
    lastSecond = elapsedSeconds;
  }
  if (remaining <= 0) {
    resetTimer();
  }
}

function updateColorTimer() {
  let remaining = startTimeColor + duration - millis();
  let remainingSeconds = ceil(remaining / 1000);

  let elapsed = millis() - startTimeColor;
  let elapsedSeconds = floor(elapsed / 1000);

  if (elapsedSeconds !== lastSecondColor) {
    console.log("colorTick", elapsedSeconds, remainingSeconds);
    colorTick(elapsedSeconds);
    lastSecondColor = elapsedSeconds;
  }
  if (remaining <= 0) {
    resetColorTimer();
  }
}

function draw() {
  background(col1);
  updateTimer();
  if (millis() >= startTimeColor) updateColorTimer();

  // fill(0);
  // if (elapsedSeconds % 2 == 0) {
  //   fill(255);
  // }

  // rect(0, 0, width, height);
  // fill(255);
  // if (elapsedSeconds % 2 == 0) {
  //   fill(0);
  // }
  fill(col2);
  rect(width / 2 - wdth / 2, height / 2 - wdth / 2, wdth);
}

function tick(elapsedSeconds) {
  let totalSeconds = duration / 1000;
  let progress = elapsedSeconds / totalSeconds;
  wdth = lerp(0, width, progress);
}

function colorTick(elapsedSeconds) {
  let colTemp = col1;
  col1 = col2;
  col2 = colTemp;
}

function resetTimer() {
  startTime = millis();
  duration = random(1000, 50000);
  wdth = 0;
}

function resetColorTimer() {
  startTimeColor = millis();
  lastSecondColor = -1;
}
