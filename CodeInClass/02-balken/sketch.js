let myInterval;
let rectSize = 500;
let myRed;

let num = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myInterval = setInterval(tick, 1000);
  rectSize = width;
  myRed = 255;
}

function draw() {
  // background(220);
  fill(myRed, 0, 0);
  rect(0, 0, rectSize, height);
}

function tick() {
  console.log("tick");
  rectSize = map(num, 10, 0, width, 0);
  myRed = map(num, 10, 0, 255, 100);

  num--;

  //myRed = myRed - 255 / 20;
  //  rectSize = rectSize - width / 20;
}
