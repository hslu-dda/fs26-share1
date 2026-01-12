let rectW = 20;
let rectH = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(220);
  let amt = 40;
  for (let i = 0; i < amt; i++) {
    push();
    translate(width / 2, height / 2);
    let angle = (360 / amt) * i;
    rotate(angle);
    fill(angle, 100, 100);
    rect(100, 0, rectW, rectH);
    fill(angle, 80, 100);
    rect(80, 0, rectW, rectH);
    fill(angle, 60, 100);
    rect(60, 0, rectW, rectH);
    fill(angle, 40, 100);
    rect(40, 0, rectW, rectH);
    fill(angle, 100, 80);
    rect(120, 0, rectW, rectH);
    fill(angle, 100, 60);
    rect(140, 0, rectW, rectH);
    fill(angle, 100, 40);
    rect(160, 0, rectW, rectH);
    pop();
  }

  noFill();
  ellipse(width / 2, height / 2, 200);
  ellipse(width / 2, height / 2, 240);
}
