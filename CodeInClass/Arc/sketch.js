let startTime = 0;
let duration = 10000;

let lastSecond = duration / 1000;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(0);

  let now = millis();
  let elapsed = millis() - startTime;
  let remaining = startTime + duration - millis();
  let remainingSeconds = ceil(remaining / 1000);

  if (remainingSeconds != lastSecond) {
    console.log("tick", remainingSeconds);
  }

  fill(255, 0, 0);

  let angleSeconds = map(remainingSeconds, duration / 1000, 0, 360, 0);
  console.log(remainingSeconds, duration / 1000);
  arc(width / 2, height / 2, 400, 400, 0, angleSeconds, PIE);

  fill(100, 100, 255);
  let angle = map(remaining, duration, 0, 360, 0);
  arc(width / 2, height / 2, 400, 400, 0, angle, PIE);

  if (elapsed >= duration) {
    // time is up
  }

  if (remaining <= 0) {
    console.log("time is up");
    startTime = millis();
    duration = floor(random(5000, 10000));
    lastSecond = -1;
  }

  lastSecond = remainingSeconds;
}
