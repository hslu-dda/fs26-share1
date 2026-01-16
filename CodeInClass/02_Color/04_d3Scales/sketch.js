function setup() {
  createCanvas(windowWidth, 400);

  let num = 50;
  let colorScale = d3.scaleLinear().domain([0, 0.25, 0.5, 0.75, 1]).range(["#09b0a2", "#FFBB00", "#45458a", "#e91bd1"]);

  for (let i = 0; i < num; i++) {
    let rW = width / num;
    let x = rW * i;
    let colIndex = map(i, 0, num, 0, 1);
    let c = colorScale(colIndex);
    fill(c);
    rect(x, 0, 50, 50);
  }

  let scaleSequential = d3.scaleSequential().domain([0, num]).interpolator(d3.interpolateRainbow);
  for (let i = 0; i < num; i++) {
    let rW = width / num;
    let x = rW * i;
    let c = scaleSequential(i);
    fill(c);
    rect(x, 100, 50, 50);
  }
}

// function draw() {
//   background(220);
// }
