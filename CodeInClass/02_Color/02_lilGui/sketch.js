let params = {
  hue: 165,
  saturation: 34,
  brightness: 93,
  debug: false,
};

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  gui = new lil.GUI();
  gui.add(params, "hue", 0, 360).step(1);
  gui.add(params, "saturation", 0, 100).step(1);
  gui.add(params, "brightness", 0, 100).step(1);
  gui.add(params, "debug");
  gui.hide();
}

function draw() {
  background(params.hue, params.saturation, params.brightness);
  if (params.debug == true) {
    push();
    fill(0, 50, 50);
    ellipse(width / 2, height / 2, 20);
    pop();
  }
}

function keyPressed() {
  if (key == "g") {
    gui.show();
  }
  if (key == "G") {
    gui.hide();
  }
}
