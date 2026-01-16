let fontSize = 20;
let actualFontSize = 20;
let myText;
let textCount = 0;
let speed = 1;

// Timer: calls tick() every 1000ms (1 second) to advance the animation
let interval = setInterval(tick, 500);
let counter = 0; // Tracks which character is currently "active"

let randomnessScale;

// Array of macOS system fonts
let fonts = [
  "Academy Engraved LET",
  "Monaco",
  "Helvetica",
  "Bodoni Ornaments",
  "Georgia",
  "Times New Roman",
  "Courier New",
  "Comic Sans MS",
  "Phosphate",
  "Avenir",
  "Gill Sans",
  "Optima",
  "Palatino",
  "Baskerville",
  "Didot",
  "American Typewriter",
  "Copperplate",
  "Papyrus",
  "Impact",
  "Trebuchet MS",
];

function preload() {
  myText = loadStrings("text.txt");
}

function setup() {
  createCanvas(1200, 1800);
  myText = myText.join("\n");
  textFont("Menlo");
  //randomnessScale = d3.scaleLinear().domain([0, 1]).range([0, 1]);

  randomnessScale = d3
    .scalePow()
    .exponent(2) // adjust curvature here
    .domain([0, 1]) // normalized input
    .range([0, 1]); // probability output
}

function draw() {
  background(220);
  let x = 100;
  let y = 100;
  let maxWidth = 1150;
  textSize(fontSize);
  let w = textWidth("m");

  stroke(200);
  for (let x = 100; x <= maxWidth; x += w) {
    line(x, 0, x, height);
  }

  for (let i = 0; i < myText.length; i++) {
    let t = map(i, 0, myText.length - 1, 0, 1, true); // normalize & clamp
    let randomnessProbability = randomnessScale(t);

    // Highlight the current character by switching to Impact font
    if (random() < randomnessProbability) {
      textFont(random(fonts));
    } else {
      textFont("Menlo");
    }

    let char = myText[i];

    if (char === "\n") {
      x = 100;
      y += fontSize * 1.5;
      continue;
    }

    let charWidth = textWidth(char);

    if (x + charWidth > maxWidth) {
      x = 100;
      y += fontSize * 1.5;
    }

    // Rotate each character based on its position in the text
    // Creates a progressive rotation effect across the entire string
    push();
    translate(x, y);
    text(char, 0, 0);
    pop();

    x += charWidth;
  }

  // Animation control for textCount (currently unused but set up for ping-pong effect)
  textCount += speed;
  if (textCount >= myText.length || textCount <= 0) speed *= -1;

  // End screen when counter exceeds text length
  if (counter > myText.length) {
    rect(0, 0, width, height);
    textFont("Impact");
    textSize(80);
    text("Time is up", 200, 500);
  }

  noLoop(); // Pause draw loop until tick() calls redraw()
}

// Timer callback: advances counter and triggers a redraw
function tick() {
  counter++;
  //redraw();
}
