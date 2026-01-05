let col;
let interval;
function setup() {
  createCanvas(windowWidth, windowHeight);
  interval = setInterval(tick, 1000);
  setTimeout(timeIsUp, 10100);
  col = color(random(255), 100, 100);
}

function draw() {
  background(col);
}

function tick(id) {
  console.log("tick ");
  col = color(random(70, 120), random(70, 120), random(70, 120));
}

function timeIsUp() {
  console.log("time is up");
  clearInterval(interval);
}
