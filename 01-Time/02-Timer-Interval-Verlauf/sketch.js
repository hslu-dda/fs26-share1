let col;
let interval;

let size = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  interval = setInterval(tick, 1000);
  setTimeout(timeIsUp, 10100);
  col = color(random(255), 100, 100);
}

function draw() {
  //background(col);
}

function tick(id) {
  console.log("tick ");
  col = color(map(size, 10, 0, 50, 255), 0, 0);
  let w = map(size, 0, 10, 0, width);
  size--;
  fill(col);
  rect(0, 0, w, height);
}

function timeIsUp() {
  console.log("time is up");
  clearInterval(interval);
}
