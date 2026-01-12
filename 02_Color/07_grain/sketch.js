function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  noStroke();

  let num = 200;
  let margin = 40;
  let usableWidth = width - margin;
  let usableHeight = height - margin * 2;
  let rW = int(usableWidth / num);
  let yPos = margin;
  let h = round((usableHeight - 6 * rW) / 6);

  // Exponent 0.1: keeps threshold low across most of width (more white)
  let powScale = d3.scalePow().domain([margin, usableWidth]).range([0, 1]).exponent(0.1);
  for (let y = yPos; y < yPos + h; y += rW) {
    for (let x = margin; x < usableWidth; x += rW) {
      let threshold = powScale(x);
      let r = random(0, 1);
      // Each square: if random > threshold, white; else black
      if (r > threshold) {
        fill(255);
      } else fill(0);
      rect(x, y, rW, rW);
    }
  }

  yPos += h + rW;

  // Exponent 0.5: gentler transition from white to black
  powScale = d3.scalePow().domain([margin, usableWidth]).range([0, 1]).exponent(0.5);
  for (let y = yPos; y < yPos + h; y += rW) {
    for (let x = margin; x < usableWidth; x += rW) {
      let threshold = powScale(x);
      let r = random(0, 1);
      if (r > threshold) {
        fill(255);
      } else fill(0);
      rect(x, y, rW, rW);
    }
  }

  yPos += h + rW;

  // Exponent 1: linear transition (even gradient)
  powScale = d3.scalePow().domain([margin, usableWidth]).range([0, 1]).exponent(1);
  for (let y = yPos; y < yPos + h; y += rW) {
    for (let x = margin; x < usableWidth; x += rW) {
      let threshold = powScale(x);
      let r = random(0, 1);
      if (r > threshold) {
        fill(255);
      } else fill(0);
      rect(x, y, rW, rW);
    }
  }

  yPos += h + rW;

  // Exponent 2: stays whiter longer, then transitions quickly
  powScale = d3.scalePow().domain([margin, usableWidth]).range([0, 1]).exponent(2);
  for (let y = yPos; y < yPos + h; y += rW) {
    for (let x = margin; x < usableWidth; x += rW) {
      let threshold = powScale(x);
      let r = random(0, 1);
      if (r > threshold) {
        fill(255);
      } else fill(0);
      rect(x, y, rW, rW);
    }
  }

  yPos += h + rW;

  // Exponent 4: mostly white, sudden drop to black near end
  powScale = d3.scalePow().domain([margin, usableWidth]).range([0, 1]).exponent(4);
  for (let y = yPos; y < yPos + h; y += rW) {
    for (let x = margin; x < usableWidth; x += rW) {
      let threshold = powScale(x);
      let r = random(0, 1);
      if (r > threshold) {
        fill(255);
      } else fill(0);
      rect(x, y, rW, rW);
    }
  }

  yPos += h + rW;

  // Exponent 8: very sharp transition (almost all white, then black)
  powScale = d3.scalePow().domain([margin, usableWidth]).range([0, 1]).exponent(8);
  for (let y = yPos; y < yPos + h; y += rW) {
    for (let x = margin; x < usableWidth; x += rW) {
      let threshold = powScale(x);
      let r = random(0, 1);
      if (r > threshold) {
        fill(255);
      } else fill(0);
      rect(x, y, rW, rW);
    }
  }
}
