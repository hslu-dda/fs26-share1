let duration = 60000;
let startTime = 0;
let lastSecond = duration / 1000 + 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  let remaining = startTime + duration - millis();
  let remainingSeconds = ceil(remaining / 1000);

  //noStroke();
  fill(255, 0, 0);
  let secondsAngle = map(remainingSeconds, 0, duration / 1000, 0, 2 * PI);
  arc(width / 2, height / 2, height, height, -HALF_PI, secondsAngle - HALF_PI, PIE);

  //noStroke();
  fill(100, 200, 200);
  let angle = map(remaining, 0, duration, 0, 2 * PI);
  arc(width / 2, height / 2, height, height, -HALF_PI, angle - HALF_PI, PIE);

  if (remaining <= 0) {
    startTime = millis();
    duration = random(1000, 50000);
  }
}
