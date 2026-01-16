// Global variables for typography settings
let fontSize = 20;
let words; // Array to store each word
let lines; // Array to store each line from the text file
let myText; // Will hold the loaded text as a single string

let textCount = 0;
let speed = 1;

function preload() {
  lines = loadStrings("text.txt"); // Load text file into an array (one element per line)
}

function setup() {
  createCanvas(1200, 1800);

  // join() combines array elements into one string, preserving line breaks with "\n"
  myText = lines.join("\n");
  words = myText.split(" ");

  console.log("lines", lines);
  console.log("text", myText);
  console.log("words", words);

  textFont("Menlo"); // Monospace font - each character has equal width
}

function draw() {
  background(220);

  // Starting position for manual text rendering
  let x = 100;
  let y = 100;
  let maxWidth = 900; // Right boundary for text wrapping

  // Set font properties
  textSize(fontSize);
  textLeading(fontSize * 1.5);

  // Calculate width of a single character (works because Menlo is monospace)
  let w = textWidth("m");
  // Draw vertical grid lines to visualize the monospace character grid
  stroke(200);
  for (let x = 100; x <= maxWidth; x += w) {
    line(x, 0, x, height);
  }

  // Second pass: manual character-by-character rendering
  fill(0);
  for (let i = 0; i < textCount; i++) {
    let char = myText[i];
    // Handle explicit line breaks from the source text
    if (char === "\n") {
      x = 100; // Carriage return - reset to left margin
      y += fontSize * 1.5; // Line feed - move down one line
      continue; // Skip to next character without drawing
    }
    // Get the width of the current character for positioning
    let charWidth = textWidth(char);
    // Word wrap: if character would exceed maxWidth, move to next line
    if (x + charWidth > maxWidth) {
      x = 100;
      y += fontSize * 1.5;
    }
    // Draw the character at current position
    text(char, x, y);
    // Advance cursor for next character
    x += charWidth;
  }

  textCount += speed;
  if (textCount >= myText.length || textCount <= 0) speed *= -1;
}
