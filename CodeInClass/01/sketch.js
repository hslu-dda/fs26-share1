let myBackgroundColor;
let myInterval;

function setup() {
  createCanvas(400, 400);
  myInterval = setInterval(tick, 1000);
  setTimeout(timeIsUp, 10000);

  myBackgroundColor = color(255, 0, 0);
}

function draw() {
  background(myBackgroundColor);
  ellipse(mouseX, mouseY, 30);
}

function tick() {
  console.log("tick");
  //background(random(255), random(255), random(255));
  myBackgroundColor = color(random(255), random(255), random(255));
}

function timeIsUp() {
  console.log("----- time is up!----");
  clearInterval(myInterval);
}
