// params object holds all our adjustable values
//https://www.canva.com/colors/color-wheel/
let params = {
  hue: 0,
  saturation: 100,
  brightness: 100,
  mode: "spaced",
  num: 3,
  spread: 60,
};

let margin = 150;
let colorWheel;
let radius;
let myColorScheme = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);

  radius = height / 2 - margin;

  // Create a separate graphics buffer for the color wheel
  colorWheel = createGraphics(width, height);
  colorWheel.colorMode(HSB, 360, 100, 100);
  colorWheel.angleMode(DEGREES);
  colorWheel.translate(colorWheel.width / 2, colorWheel.height / 2);
  colorWheel.noStroke();

  // Draw color wheel: 360 wedges, each with gradient from center to edge
  for (let angle = 0; angle < 360; angle++) {
    for (let r = 0; r < radius; r++) {
      // Saturation increases from center to edge
      let sat = map(r, 0, radius, 0, 100);
      colorWheel.fill(angle, sat, 100);
      colorWheel.rect(r, 0, 10, 50);
    }
    colorWheel.rotate(1);
  }

  // lil-gui creates interactive controls for your parameters
  gui = new lil.GUI();
  gui.domElement.style.width = "500px";

  // Folders group related controls together
  const generator = gui.addFolder("Generator");
  generator.add(params, "hue", 0, 360).step(1);
  generator.add(params, "saturation", 0, 100).step(1);
  generator.add(params, "brightness", 0, 100).step(1);
  generator.add(params, "num", 0, 10).step(1);
  generator.add(params, "spread", 0, 180).step(1);

  // Dropdown menu for selecting color harmony mode
  gui.add(params, "mode", ["spaced", "monochrome", "analogous"]).name("Color Mode");
}

function draw() {
  background(255);

  generateColors();

  // Display the pre-rendered color wheel
  image(colorWheel, width / 2 - colorWheel.width / 2, height / 2 - colorWheel.height / 2);

  // Show color swatches at top
  let rW = 100;
  for (let i = 0; i < myColorScheme.length; i++) {
    fill(myColorScheme[i]);
    rect(i * rW, 0, rW, rW);
  }

  // Draw circles on the wheel to show where colors are located
  push();
  translate(width / 2, height / 2);

  for (let i = 0; i < myColorScheme.length; i++) {
    let h = hue(myColorScheme[i]);
    let s = saturation(myColorScheme[i]);
    let b = brightness(myColorScheme[i]);

    // Calculate how far from center based on saturation
    let distance = map(s, 0, 100, 0, radius);

    push();
    rotate(h);
    stroke(255);
    strokeWeight(5);

    // For monochrome mode, show brightness variations as stacked circles
    if (params.mode == "monochrome") {
      let numCircles = round(map(b, 100, 0, 1, 11));
      for (let j = 0; j < numCircles; j++) {
        let circleBrightness = map(j, 0, numCircles, 100, b);
        fill(h, s, circleBrightness);
        ellipse(distance, -j * 20, 40, 40);
      }
    }

    // Draw the actual color
    fill(myColorScheme[i]);
    ellipse(distance, 0, 40, 40);
    pop();
  }
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

function generateColors() {
  myColorScheme = [];

  switch (params.mode) {
    case "spaced":
      // Complementary/triadic: evenly divides the color wheel
      for (let i = 0; i < params.num; i++) {
        let h = wrapAngle(params.hue + (360 / params.num) * i);
        myColorScheme.push(color(h, params.saturation, params.brightness));
      }
      break;

    case "monochrome":
      // Single hue with variations in saturation and brightness
      for (let i = 0; i < params.num; i++) {
        let sat = map(i, 0, params.num - 1, params.saturation, params.saturation * 0.3);
        let bri = map(i, 0, params.num - 1, params.brightness * 0.5, params.brightness);
        myColorScheme.push(color(params.hue, sat, bri));
      }
      break;

    case "analogous":
      // Adjacent colors on the wheel within the spread range
      let startHue = params.hue - params.spread / 2;
      let endHue = params.hue + params.spread / 2;
      for (let i = 0; i < params.num; i++) {
        let h = map(i, 0, params.num - 1, startHue, endHue);
        h = wrapAngle(h);
        myColorScheme.push(color(h, params.saturation, params.brightness));
      }
      break;
  }
}
