function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // First text - size controlled by horizontal mouse position
  let firstTextSize = map(mouseX, 0, width, 0, 50);
  textSize(firstTextSize);
  let firstTextHeight = textAscent();
  text("Hello World", 100, 100 + firstTextHeight);

  // Draw reference points
  ellipse(100, 100, 5); // baseline point
  ellipse(100, 100 + firstTextHeight, 5); // baseline point

  // Second text - size controlled by vertical mouse position
  let secondTextSize = map(mouseY, 0, height, 0, 50);
  textSize(secondTextSize);
  let secondTextHeight = textAscent();
  text("Hello World", 100, 100 + firstTextHeight + secondTextHeight);
  ellipse(100, 100 + firstTextHeight + secondTextHeight, 5); // baseline point
}
