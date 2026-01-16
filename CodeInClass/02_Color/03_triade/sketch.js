let colorWheel;

let params = {
  hue: 0,
  saturation: 100,
  brightness: 100,
};

let color1;

function setup() {
  createCanvas(400, 400);
  colorWheel = createGraphics(width, height);
  colorWheel.colorMode(HSB);
  colorWheel.background(255, 0, 0);
  colorWheel.angleMode(DEGREES);
  colorWheel.noStroke();

  for (let angle = 0; angle < 360; angle++) {
    for (let distanceFromCenter = 0; distanceFromCenter < height / 2; distanceFromCenter++) {
      colorWheel.push();
      colorWheel.translate(colorWheel.width / 2, colorWheel.height / 2);
      colorWheel.rotate(angle);
      let saturation = map(distanceFromCenter, 0, height / 2, 0, 100);
      colorWheel.fill(angle, saturation, 100);
      colorWheel.ellipse(distanceFromCenter, 0, 10, 10);
      colorWheel.pop();
    }
  }

  colorMode(HSB);
  angleMode(DEGREES);
  gui = new lil.GUI();
  gui.add(params, "hue", 0, 360).step(1);
  gui.add(params, "saturation", 0, 100).step(1);
  gui.add(params, "brightness", 0, 100).step(1);
}

function draw() {
  background(0, 0, 90);
  image(colorWheel, 0, 0);

  let distFromCenter = map(params.saturation, 0, 100, 0, height / 2);

  let angle2 = wrapAroundAngle(params.hue + 360 / 3);
  let angle3 = wrapAroundAngle(params.hue + (360 / 3) * 2);

  color1 = color(params.hue, params.saturation, params.brightness);
  color2 = color(angle2, params.saturation, params.brightness);
  color3 = color(angle3, params.saturation, params.brightness);

  push();
  translate(width / 2, height / 2);
  rotate(params.hue);
  fill(color1);
  ellipse(distFromCenter, 0, 30);
  pop();

  push();
  translate(width / 2, height / 2);
  rotate(angle2);
  fill(color2);
  ellipse(distFromCenter, 0, 30);
  pop();

  push();
  translate(width / 2, height / 2);
  rotate(angle3);
  fill(color3);
  ellipse(distFromCenter, 0, 30);
  pop();
}

function wrapAroundAngle(angle) {
  if (angle > 360) {
    angle -= 360;
  }
  return angle;
}
