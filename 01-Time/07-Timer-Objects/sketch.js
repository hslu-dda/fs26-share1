let duration = 60000;
let startTime = 0;
let lastSecond = duration / 1000 + 1;

let col = 0;
let cellW = 50;
let row = 0;
let numCol = 10;

margin = 50;

let arrayOfObjects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  let remaining = startTime + duration - millis();
  let remainingSeconds = ceil(remaining / 1000);
  let elapsed = millis() - startTime;
  let elapsedSeconds = floor(elapsed / 1000);

  for (let object of arrayOfObjects) {
    push();
    fill(object.color);
    translate(object.posX, object.posY);
    rect(0, 0, object.size);
    pop();
  }

  // Tick every second
  if (elapsedSeconds !== lastSecond) {
    console.log(elapsedSeconds, remainingSeconds);
    tick();
    lastSecond = elapsedSeconds;
  }

  if (remaining <= 0) {
    startTime = millis();
    duration = random(1000, 50000);
  }
}

function tick() {
  // do stuff
  let o = {
    posX: col * cellW + margin,
    posY: row * cellW + margin,
    color: color(random(255), random(255), random(255)),
    size: random(10, cellW),
  };

  col++;
  if (col >= numCol) {
    col = 0;
    row++;
  }
  arrayOfObjects.push(o);
}
