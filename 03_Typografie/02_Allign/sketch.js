let fontSize = 40;
let myText = "This is some Text";

function setup() {
  createCanvas(800, 800);
  textFont("Baskerville");
}

function draw() {
  background(220);
  fill("red");
  ellipse(width / 2, height / 2, 5);

  textSize(fontSize);

  textAlign(CENTER, CENTER);
  fill(0);
  text("Hello World", width / 2, height / 2);

  stroke("#d85555ff");
  line(width / 2 - 200, height / 2, 700, height / 2); // baseline
}
