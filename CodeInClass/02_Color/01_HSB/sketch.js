function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 100);

  let amt = 50;
  for (let i = 0; i < amt; i++) {
    push();
    translate(width / 2, height / 2);

    let angle = (360 / amt) * i;
    // let mappedAngle = map(i, 0, amt, 0, 360);

    rotate(angle);
    fill(angle, 100, 100);
    rect(200, 0, 50, 20);

    fill(angle, 60, 100);
    rect(130, 0, 80, 20);

    fill(angle, 40, 100);
    rect(100, 0, 80, 20);

    fill(angle, 100, 80);
    rect(255, 0, 50, 20);

    fill(angle, 100, 60);
    rect(305, 0, 50, 20);

    pop();
  }
}
