//https://lil-gui.georgealways.com
//https://www.canva.com/colors/color-wheel/

let params = {
  colorFrom: "#2776c4ff",
  colorTo: "#e74c3c",
  num: 20,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  gui = new lil.GUI();
  gui.addColor(params, "colorFrom").name("Color From");
  gui.addColor(params, "colorTo").name("Color To");
  gui.add(params, "num", 2, 100, 1);
}

function draw() {
  background(255);

  let colorFrom = color(params.colorFrom);
  let colorTo = color(params.colorTo);
  let num = params.num;
  let rectWidth = width / num;

  for (let i = 0; i < num; i++) {
    let x = map(i, 0, num - 1, 0, width - rectWidth);
    // amt goes from 0 to 1 across the screen
    let amt = map(i, 0, num - 1, 0, 1);
    let lerpedColor = lerpColor(colorFrom, colorTo, amt);
    fill(lerpedColor);
    rect(x, 0, rectWidth, height);
  }
}
