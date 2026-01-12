let diameter = 50;

let startTime = 0;
let duration = 60000;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  let now = millis();
  let remaining = startTime + duration - now;

  let num = ceil(remaining / 1000);
  let posX = diameter / 2;
  let posY = diameter / 2;
  for (let i = 0; i < num; i++) {
    ellipse(posX, posY, diameter, diameter);
    posX = posX + diameter;
    if (posX > width - diameter / 2) {
      posX = diameter / 2;
      posY += diameter;
    }
  }
}
