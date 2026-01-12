// params object holds all our adjustable values
//https://lil-gui.georgealways.com
let params = {
  hue: 360,
  saturation: 100,
  brightness: 100,
  hue_bkg: 360,
  saturation_bkg: 100,
  brightness_bkg: 100,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);

  // lil-gui creates an interactive control panel
  // It automatically updates the params object when you move sliders
  gui = new lil.GUI();
  gui.domElement.style.width = "500px";

  // Folders group related controls together
  const foreground = gui.addFolder("Foreground");
  // .add(object, property, min, max).step(increment)
  foreground.add(params, "hue", 0, 360).step(1);
  foreground.add(params, "saturation", 0, 100).step(1);
  foreground.add(params, "brightness", 0, 100).step(1);

  const background = gui.addFolder("Background");
  background.add(params, "hue_bkg", 0, 360).step(1).listen();
  // .listen() updates the GUI when the value changes in code
  background.add(params, "saturation_bkg", 0, 100).step(1);
  background.add(params, "brightness_bkg", 0, 100).step(1);
}

function draw() {
  // Automatically set background hue 90 degrees from foreground
  params.hue_bkg = params.hue - 90;
  if (params.hue_bkg < 0) {
    params.hue_bkg += 360;
  }

  background(params.hue_bkg, params.saturation_bkg, params.brightness_bkg);
  fill(params.hue, params.saturation, params.brightness);
  circle(width / 2, height / 2, height);
}

/* 
=== LIL-GUI EXAMPLES ===

// Numbers with range
gui.add(params, 'speed', 0, 10);          // slider from 0-10
gui.add(params, 'count', 1, 100).step(1);  // whole numbers only

// Numbers without range  
gui.add(params, 'x');                      // text input for any number

// Booleans (checkbox)
gui.add(params, 'showGrid');               // true/false toggle

// Dropdown menu
gui.add(params, 'shape', ['circle', 'square', 'triangle']);

// Color picker
gui.addColor(params, 'fillColor');         // hex color picker

// Button
gui.add(params, 'reset');                  // calls params.reset() function

// Custom label
gui.add(params, 'lineWidth', 1, 20).name('Line Thickness');

// Listen for changes in code
gui.add(params, 'autoValue').listen();

// Nested folders
const shapes = gui.addFolder('Shapes');
shapes.add(params, 'numCircles', 1, 50);
shapes.add(params, 'circleSize', 10, 100);

const colors = gui.addFolder('Colors');
colors.addColor(params, 'primary');
colors.addColor(params, 'secondary');
*/
