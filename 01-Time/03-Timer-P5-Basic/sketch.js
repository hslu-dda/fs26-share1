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

  // Tick every second
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
