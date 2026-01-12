// params object holds all our adjustable values
//https://lil-gui.georgealways.com
//https://www.canva.com/colors/color-wheel/
let params = {
  hue: 0,
  saturation: 100,
  brightness: 100,
  hue_bkg: 360,
  saturation_bkg: 100,
  brightness_bkg: 100,
};

let margin = 150;
let color1, color2, color3;
let colorWheel;
let radius;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);

  radius = height / 2 - margin;

  // Pre-render the color wheel once for performance
  colorWheel = createGraphics(width, height);
  colorWheel.colorMode(HSB, 360, 100, 100);
  colorWheel.angleMode(DEGREES);
  colorWheel.translate(colorWheel.width / 2, colorWheel.height / 2);
  colorWheel.noStroke();

  // Draw 360 wedges, each rotated 1 degree
  for (let angle = 0; angle < 360; angle++) {
    for (let r = 0; r < radius; r++) {
      let sat = map(r, 0, radius, 0, 100);
      colorWheel.fill(angle, sat, 100);
      colorWheel.rect(r, 0, 10, 10);
    }
    colorWheel.rotate(1);
  }

  // lil-gui creates sliders/controls that update the params object
  gui = new lil.GUI();
  gui.domElement.style.width = "500px";

  // Folders organize controls into collapsible sections
  const foreground = gui.addFolder("Foreground");
  // .add() links a slider to params.hue (min 0, max 360, step 1)
  foreground.add(params, "hue", 0, 360).step(1);
  foreground.add(params, "saturation", 0, 100).step(1);
  foreground.add(params, "brightness", 0, 100).step(1);
}

function draw() {
  background(255);

  image(colorWheel, width / 2 - colorWheel.width / 2, height / 2 - colorWheel.height / 2);

  // Calculate distance from center based on saturation
  let distFromCenter = map(params.saturation, 0, 100, 0, radius);

  // Create triadic color scheme (3 colors equally spaced)
  let angle2 = wrapAngle(params.hue + 360 / 3);
  let angle3 = wrapAngle(params.hue + (360 / 3) * 2);

  color1 = color(params.hue, params.saturation, params.brightness);
  color2 = color(angle2, params.saturation, params.brightness);
  color3 = color(angle3, params.saturation, params.brightness);

  stroke(255);
  strokeWeight(5);

  // Draw first color marker on wheel
  push();
  translate(width / 2, height / 2);
  rotate(params.hue);
  fill(color1);
  circle(distFromCenter, 0, 20);
  pop();

  // Draw second color marker
  push();
  translate(width / 2, height / 2);
  rotate(angle2);
  fill(color2);
  circle(distFromCenter, 0, 20);
  pop();

  // Draw third color marker
  push();
  translate(width / 2, height / 2);
  rotate(angle3);
  fill(color3, params.saturation, params.brightness);
  circle(distFromCenter, 0, 20);
  pop();

  // Display triadic color swatches at bottom
  push();
  translate(width / 2 - 150, height - 100);
  fill(color1);
  rect(0, 0, 100, 100);
  fill(color2);
  rect(100, 0, 100, 100);
  fill(color3);
  rect(200, 0, 100, 100);
  pop();
}

// Keeps angles within 0-360 range
function wrapAngle(angle) {
  if (angle < 0) {
    angle += 360;
  }
  if (angle >= 360) {
    angle -= 360;
  }
  return angle;
}
