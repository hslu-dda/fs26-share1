let fontSize = 40;
let myText = "This is some Text";

function setup() {
  createCanvas(800, 800);
  textFont("Baskerville");
}

function draw() {
  background(220);
  textSize(fontSize);

  push();
  translate(100, 100);
  textSize(fontSize);
  textAlign(LEFT, BASELINE);
  text("Hello World", 0, 0);

  stroke("#d85555ff");
  ellipse(0, 0, 5); // Ankerpunkt vom Textfeld
  line(0, 0, 500, 0); // baseline

  let asc = textAscent();
  stroke("#4597deff");
  line(0, 0 - asc, 500, 0 - asc); // obere Linie

  let desc = textDescent();
  line(0, 0 + desc, 500, 0 + desc); // untere Linie
  let w = textWidth("Hello World");
  line(0 + w, 0 - asc, 0 + w, 0 + desc);

  fill(255, 100);
  rect(0, -asc, w, asc + desc);
  pop();
}
