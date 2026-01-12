# Timer Concepts in p5.js

This repository contains examples of different approaches to implementing timers in p5.js. Understanding timers is crucial for creating time-based animations, games, and interactive experiences.

## Basic Concepts

### Time in JavaScript and p5.js

There are two main approaches to working with timers:

1. **JavaScript's native timer functions**: `setInterval()`, `setTimeout()`, `clearInterval()`
2. **p5.js's `millis()` function**: Returns milliseconds since the sketch started

- **setInterval/setTimeout**: Useful for discrete events, but can be harder to control and may cause issues if the sketch is paused
- **millis()**: More reliable in p5.js, works with the draw loop, easier to restart and modify

---

## Sketch 1: JavaScript's setInterval()

```javascript
let col;
let interval;

function setup() {
  createCanvas(windowWidth, windowHeight);
  interval = setInterval(tick, 1000); // Call tick() every 1000ms (1 second)
  setTimeout(timeIsUp, 10100); // Call timeIsUp() after 10.1 seconds
  col = color(random(255), 100, 100);
}

function draw() {
  background(col);
}

function tick() {
  console.log("tick ");
  col = color(random(70, 120), random(70, 120), random(70, 120));
}

function timeIsUp() {
  console.log("time is up");
  clearInterval(interval); // Stop the interval
}
```

### Key Concepts:

**`setInterval(function, milliseconds)`**

- Repeatedly calls a function at specified intervals
- Returns an interval ID that you store in a variable
- Continues indefinitely until stopped

**`setTimeout(function, milliseconds)`**

- Calls a function once after a delay
- Used here to stop the timer after 10 seconds

**`clearInterval(id)`**

- Stops an interval from continuing
- You pass it the interval ID you saved earlier

### Pros and Cons:

**Pros:**

- Simple syntax
- Familiar to JavaScript developers
- Good for single events (`setTimeout`)

**Cons:**

- Runs independently of the draw loop
- Can't pause easily when sketch pauses
- Harder to synchronize with animations
- Timing can drift over time

---

## Sketch 2: p5.js millis() Pattern

```javascript
let duration = 60000; // Duration in milliseconds (60 seconds)
let startTime = 0; // When the current timer started
let lastSecond = duration / 1000 + 1; // Track the last second we saw

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0);

  let remaining = startTime + duration - millis(); // Time left
  let remainingSeconds = ceil(remaining / 1000); // Convert to seconds
  let elapsed = millis() - startTime; // Time passed
  let elapsedSeconds = floor(elapsed / 1000); // Convert to seconds

  // Tick every second
  if (remainingSeconds !== lastSecond) {
    console.log(elapsedSeconds, remainingSeconds);
    tick();
    lastSecond = remainingSeconds;
  }

  // Reset when time runs out
  if (remaining <= 0) {
    startTime = millis();
    duration = random(1000, 50000); // Random new duration
  }
}

function tick() {
  // do stuff
}
```

### Key Concepts:

**`millis()`**

- Returns the number of milliseconds since the sketch started
- Called every frame in the draw loop
- More reliable than setInterval for p5.js sketches

**Timer Pattern:**

1. Store a `startTime` (when timer begins)
2. Calculate `elapsed = millis() - startTime`
3. Calculate `remaining = duration - elapsed`
4. Check if remaining <= 0 to detect completion

**Tick Detection:**

- Compare current second to `lastSecond`
- When they differ, a second has passed
- Update `lastSecond` to prevent multiple ticks

### Pros and Cons:

**Pros:**

- Integrates with draw loop
- Easy to pause/resume
- No drift over time
- Can easily restart or modify
- Works well with p5.js animations

**Cons:**

- Slightly more code
- Need to understand the pattern

---

## Example: Object Creation with Timers

```javascript
let duration = 60000;
let startTime = 0;
let lastSecond = duration / 1000 + 1;

let col = 0;
let cellW = 50;
let row = 0;
let numCol = 10;
margin = 50;

let arrayOfObjects = []; // Store all created objects

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  let remaining = startTime + duration - millis();
  let remainingSeconds = ceil(remaining / 1000);
  let elapsed = millis() - startTime;
  let elapsedSeconds = floor(elapsed / 1000);

  // Draw all objects
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

  // Reset timer
  if (remaining <= 0) {
    startTime = millis();
    duration = random(1000, 50000);
  }
}

function tick() {
  // Create a new object every second
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

  arrayOfObjects.push(o); // Add to array
}
```

**Object Creation Pattern:**

- Each tick creates a new object with properties
- Objects are stored in an array
- All objects are drawn every frame

**Grid Layout:**

- `col` tracks current column (0 to numCol-1)
- `row` tracks current row
- Position calculated: `col * cellW + margin`
- When column fills, reset to 0 and increment row

**Data Structure:**

```javascript
{
  posX: number,    // X position
  posY: number,    // Y position
  color: color,    // p5.js color object
  size: number     // Width/height of rectangle
}
```

**Drawing Pattern:**

```javascript
for (let object of arrayOfObjects) {
  push(); // Save drawing state
  fill(object.color); // Set fill color
  translate(object.posX, object.posY); // Move to position
  rect(0, 0, object.size); // Draw at (0,0) due to translate
  pop(); // Restore drawing state
}
```

### Use Cases:

- Creating visual patterns over time
- Building generative art
- Spawning game objects at intervals
- Creating time-based data visualizations
- Animation sequences

---

## Summary

| Approach        | Best For                     | Complexity |
| --------------- | ---------------------------- | ---------- |
| `setInterval()` | Simple repeating events      | Low        |
| `millis()`      | Animation timers, countdowns | Medium     |
