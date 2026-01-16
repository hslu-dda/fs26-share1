let fontSize = 100;
let font2;

function preload() {
  font2 = loadFont("fonts/HennyPenny-Regular.ttf");
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);
  textFont("Grenze Gotisch");
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Hello World", width / 2, height / 2);

  textFont(font2);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Hello World", width / 2, height / 2 - 100);
}
