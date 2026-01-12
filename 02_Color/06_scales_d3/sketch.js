function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Three color stops: red → yellow → teal
  let colorScale = d3.scaleLinear().domain([0, 0.5, 1]).range(["#FF6B6B", "#FEE440", "#4ECDC4"]);

  let num = 50;
  let rHeight = 100;
  let margin = 40;
  let yPos = margin;

  // Creates evenly spaced bands with gaps
  let xBand = d3
    .scaleBand()
    .domain(d3.range(num))
    .range([margin, width - margin])
    .padding(0.1);

  for (let i = 0; i < num; i++) {
    let t = map(i, 0, num - 1, 0, 1);
    fill(colorScale(t));
    rect(xBand(i), yPos, xBand.bandwidth(), rHeight);
  }

  let usableWidth = width - margin * 2;
  let rW = usableWidth / num;
  yPos += rHeight + margin;

  // Five color stops create more complex gradients
  let multiscale = d3
    .scaleLinear()
    .domain([0, 0.25, 0.5, 0.75, 1])
    .range(["#db9393ff", "#1b263b", "#197ceeff", "#f68a8aff", "#b7f207ff"]);

  for (let i = 0; i < num; i++) {
    let t = map(i, 0, num - 1, 0, 1);
    let c = multiscale(t);
    let x = margin + i * rW;
    fill(c);
    rect(x, yPos, rW, rHeight);
  }

  yPos += rHeight + margin;

  // Basic linear interpolation between two colors
  let linearScale = d3.scaleLinear().domain([0, num]).range(["#db9393ff", "#1b263b"]);

  for (let i = 0; i < num; i++) {
    let c = linearScale(i);
    let x = margin + i * rW;
    fill(c);
    rect(x, yPos, rW, rHeight);
  }

  yPos += rHeight + margin;

  // Power scale with exponent 2 creates non-linear gradient
  let powScale = d3.scalePow().domain([0, num]).range(["#db9393ff", "#1b263b"]).exponent(2);

  for (let i = 0; i < num; i++) {
    let c = powScale(i);
    let x = margin + i * rW;
    fill(c);
    rect(x, yPos, rW, rHeight);
  }

  yPos += rHeight + margin;

  // Divides range into equal bins automatically
  let scaleQuantize = d3.scaleQuantize().domain([0, num]).range(["#db9393ff", "#1b263b", "#197ceeff"]);

  for (let i = 0; i < num; i++) {
    let c = scaleQuantize(i);
    let x = margin + i * rW;
    fill(c);
    rect(x, yPos, rW, rHeight);
  }

  yPos += rHeight + margin;

  // Set your own breakpoints for color changes
  let thresholdScale = d3.scaleThreshold().domain([10, 15, 20]).range(["#db9393ff", "#1b263b", "#197ceeff"]);

  for (let i = 0; i < num; i++) {
    let c = thresholdScale(i);
    let x = margin + i * rW;
    fill(c);
    rect(x, yPos, rW, rHeight);
  }

  yPos += rHeight + margin;

  // Uses built-in color schemes from d3-scale-chromatic
  let scaleSequential = d3.scaleSequential().domain([0, num]).interpolator(d3.interpolateBlues);

  for (let i = 0; i < num; i++) {
    let c = scaleSequential(i);
    let x = margin + i * rW;
    fill(c);
    rect(x, yPos, rW, rHeight);
  }

  yPos += rHeight + margin;

  // Diverging scale emphasizes midpoint with contrasting colors
  let scaleDiverging = d3
    .scaleDiverging()
    .domain([0, num / 2, num])
    .interpolator(d3.interpolateRdBu);

  for (let i = 0; i < num; i++) {
    let c = scaleDiverging(i);
    let x = margin + i * rW;
    fill(c);
    rect(x, yPos, rW, rHeight);
  }
}
