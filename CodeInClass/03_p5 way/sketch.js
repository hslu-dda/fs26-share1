let startTime = 0;
let duration = 10000;

let rectSize = 0;
let rectSize2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(millis());
  rectSize2 = width;
}

function draw() {
  background(255);

  let now = millis();
  //console.log(now, startTime, duration);
  if (startTime + duration < now) {
    console.log("time is up");
  }

  let elapsed = millis() - startTime;
  rectSize = map(elapsed, 0, duration, 0, width);
  fill(0);
  rect(0, 0, rectSize, height / 2);

  rectSize2 = map(elapsed, 0, duration, width, 0);
  fill(255);
  rect(0, height / 2, rectSize2, height / 2);

  //console.log(millis());
}

function mousePressed() {
  startTime = millis();
}
