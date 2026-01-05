let duration = 60000;
let startTime = 0;
let lastSecond = duration / 1000 + 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0);
  let remaining = startTime + duration - millis();
  let remainingSeconds = ceil(remaining / 1000);
  let elapsed = millis() - startTime;
  let elapsedSeconds = floor(elapsed / 1000);

  let w = map(elapsed, 0, duration, width, 0);
  rect(0, height / 2 - 50, w, 100);

  let w2 = map(elapsed, 0, duration, 0, width);
  rect(0, 0, w2, height / 2 - 50);
  rect(0, height / 2 + 50, w2, height / 2 - 50);

  if (remainingSeconds !== lastSecond) {
    console.log(elapsedSeconds, remainingSeconds);
    tick();
    lastSecond = remainingSeconds;
  }

  if (remaining <= 0) {
    startTime = millis();
    duration = random(1000, 50000);
  }
}

function tick() {
  // do stuff
}
