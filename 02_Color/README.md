# Complete Beginner's Guide to Colors in p5.js and D3

## Table of Contents

1. [RGB Color Mode](#rgb-color-mode)
2. [HSB Color Mode](#hsb-color-mode)
3. [Color Lerp (Color Interpolation)](#color-lerp)
4. [D3 Color Scales](#d3-color-scales)
5. [Practical Examples](#practical-examples)

---

## RGB Color Mode

RGB stands for Red, Green, Blue. It's the default color mode in p5.js and how computer screens display colors by mixing these three primary colors of light.

### Basic Syntax

```javascript
function setup() {
  createCanvas(400, 400);

  // RGB values range from 0-255 by default
  fill(255, 0, 0); // Pure red
  rect(0, 0, 100, 100);

  fill(0, 255, 0); // Pure green
  rect(100, 0, 100, 100);

  fill(0, 0, 255); // Pure blue
  rect(200, 0, 100, 100);

  // With alpha (transparency): 0 = transparent, 255 = opaque
  fill(255, 0, 0, 128); // Semi-transparent red
  rect(50, 50, 100, 100);
}
```

### Understanding RGB Values

- **Red channel**: Controls red intensity (0-255)
- **Green channel**: Controls green intensity (0-255)
- **Blue channel**: Controls blue intensity (0-255)
- **Alpha channel** (optional): Controls transparency (0-255)

---

## HSB Color Mode

HSB (also called HSV) stands for Hue, Saturation, Brightness. This color mode is often more intuitive for creating color schemes because it separates color identity (hue) from its intensity (saturation) and brightness.

### Switching to HSB Mode

```javascript
function setup() {
  createCanvas(400, 400);

  // Switch to HSB mode and/or customize the ranges
  colorMode(HSB, 360, 100, 100); // Explicit ranges
  colorMode(HSB, 100); // All values 0-100
  colorMode(HSB, 1.0); // All values 0.0-1.0
}
```

### Understanding HSB Values

**Hue (H)**: The color itself

**Saturation (S)**: How pure/vivid the color is

**Brightness (B)**: How light or dark the color is

### HSB Examples

```javascript
function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  // Rainbow using hue
  for (let i = 0; i < 12; i++) {
    fill(i * 30, 100, 100); // Varying hue, full saturation & brightness
    rect(i * 50, 0, 50, 100);
  }

  // Saturation gradient (red hue)
  for (let i = 0; i < 10; i++) {
    fill(0, i * 10, 100); // Red hue, varying saturation
    rect(i * 60, 120, 60, 100);
  }

  // Brightness gradient (blue hue)
  for (let i = 0; i < 10; i++) {
    fill(240, 100, i * 10); // Blue hue, varying brightness
    rect(i * 60, 240, 60, 100);
  }
}
```

### When to Use HSB vs RGB

**Use HSB when:**

- Creating color wheels or gradients
- Animating through colors smoothly
- Adjusting brightness or saturation while keeping the same hue
- Building intuitive color pickers

---

## Color Lerp (Color Interpolation)

`lerpColor()` creates colors between two other colors. "Lerp" is short for "linear interpolation" - it smoothly transitions from one color to another.

### Basic Syntax

```javascript
let newColor = lerpColor(colorA, colorB, amount);
```

- **colorA**: Starting color
- **colorB**: Ending color
- **amount**: How far to interpolate (0.0 to 1.0)
  - 0.0 = 100% colorA
  - 0.5 = 50/50 mix
  - 1.0 = 100% colorB

### Simple Example

```javascript
function setup() {
  createCanvas(600, 200);

  let c1 = color(255, 0, 0); // Red
  let c2 = color(0, 0, 255); // Blue

  noStroke();

  // Create 10 steps from red to blue
  for (let i = 0; i < 10; i++) {
    let amt = i / 9; // 0.0, 0.111, 0.222, ..., 1.0
    let c = lerpColor(c1, c2, amt);
    fill(c);
    rect(i * 60, 0, 60, 200);
  }
}
```

---

## D3 Color Scales

D3.js provides powerful tools for generating color palettes. While p5.js is great for drawing, D3 excels at data-driven color generation.

### Including D3 in Your Sketch

Add this to your HTML file:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
```

Or in the p5.js web editor, add the CDN link in the index.html file.

### Sequential Scales

Sequential scales go from light to dark (or vice versa) - perfect for showing data magnitude.

```javascript
function setup() {
  createCanvas(800, 400);
  noStroke();

  // Create a sequential scale from white to dark blue
  let colorScale = d3
    .scaleSequential()
    .domain([0, 1]) // Input range
    .interpolator(d3.interpolateBlues);

  // Draw gradient
  for (let i = 0; i < 20; i++) {
    let t = i / 19;
    let c = colorScale(t);
    fill(c);
    rect(i * 40, 0, 40, 150);
  }

  // Built-in D3 interpolators:
  // d3.interpolateBlues, d3.interpolateGreens, d3.interpolateReds
  // d3.interpolateOranges, d3.interpolatePurples, d3.interpolateGreys
  // d3.interpolateViridis, d3.interpolatePlasma, d3.interpolateInferno
  // d3.interpolateMagma, d3.interpolateCool, d3.interpolateWarm
}
```

### Diverging Scales

Diverging scales have a neutral middle and two extremes - great for data that has a meaningful center point (like temperature anomalies).

```javascript
function setup() {
  createCanvas(800, 400);
  noStroke();

  // Blue (cold) to white (neutral) to red (hot)
  let colorScale = d3
    .scaleDiverging()
    .domain([-1, 0, 1]) // Low, middle, high
    .interpolator(d3.interpolateRdBu);

  for (let i = 0; i < 20; i++) {
    let t = map(i, 0, 19, -1, 1);
    let c = colorScale(t);
    fill(c);
    rect(i * 40, 0, 40, 150);
  }

  // Built-in diverging schemes:
  // d3.interpolateRdBu (red to blue)
  // d3.interpolateBrBG (brown to blue-green)
  // d3.interpolatePRGn (purple to green)
  // d3.interpolateRdYlBu (red-yellow-blue)
  // d3.interpolateSpectral (rainbow-like)
}
```

### Categorical Scales

Categorical scales provide distinct colors for categories (not gradients).

```javascript
function setup() {
  createCanvas(800, 400);
  noStroke();

  // Get an array of 10 distinct colors
  let colors = d3.schemeCategory10;

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(i * 80, 0, 80, 150);
  }

  // Other categorical schemes:
  // d3.schemeCategory10 (10 colors)
  // d3.schemeAccent (8 colors)
  // d3.schemeDark2 (8 colors)
  // d3.schemePaired (12 colors)
  // d3.schemeSet1, d3.schemeSet2, d3.schemeSet3
}
```

### Custom D3 Color Scales

```javascript
function setup() {
  createCanvas(800, 400);
  noStroke();

  // Create a custom gradient from your own colors
  let colorScale = d3
    .scaleLinear()
    .domain([0, 0.5, 1]) // Three control points
    .range(["#FF6B6B", "#FEE440", "#4ECDC4"]); // Your colors

  for (let i = 0; i < 30; i++) {
    let t = i / 29;
    let c = colorScale(t);
    fill(c);
    rect(i * (width / 30), 0, width / 30, 150);
  }

  // Using more colors for complex gradients
  let sunsetScale = d3
    .scaleLinear()
    .domain([0, 0.25, 0.5, 0.75, 1])
    .range(["#0d1b2a", "#1b263b", "#415a77", "#778da9", "#e0e1dd"]);

  for (let i = 0; i < 30; i++) {
    let t = i / 29;
    let c = sunsetScale(t);
    fill(c);
    rect(i * (width / 30), 200, width / 30, 150);
  }
}
```

### Quantize Scales (Discrete Steps)

Sometimes you want distinct color bands rather than smooth gradients:

```javascript
function setup() {
  createCanvas(800, 400);
  noStroke();

  // Create 5 discrete color bands
  let colorScale = d3.scaleQuantize().domain([0, 1]).range(["#ffffcc", "#c7e9b4", "#7fcdbb", "#41b6c4", "#2c7fb8"]);

  for (let i = 0; i < 100; i++) {
    let t = i / 99;
    let c = colorScale(t);
    fill(c);
    rect(i * 8, 0, 8, 150);
  }
}
```

---

### Example: Smooth Color Transitions

```javascript
let colors = [];
let colorScale;

function setup() {
  createCanvas(800, 400);

  // Define key colors
  colors = ["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"];

  // Create smooth interpolation between them
  colorScale = d3
    .scaleLinear()
    .domain(colors.map((_, i) => i / (colors.length - 1)))
    .range(colors);
}

function draw() {
  noStroke();

  for (let x = 0; x < width; x++) {
    let t = x / width;
    let c = colorScale(t);
    fill(c);
    rect(x, 0, 1, height);
  }

  // Add interactive element
  if (mouseX >= 0 && mouseX < width) {
    let t = mouseX / width;
    let c = colorScale(t);
    fill(c);
    circle(mouseX, height / 2, 80);

    fill(255);
    textAlign(CENTER, CENTER);
    text(c, mouseX, height / 2);
  }
}
```

---

## Key Takeaways

### When to Use What

**RGB Mode**:

- Default mode, good for specific colors
- Direct correspondence to hex colors
- Best for images and existing color values

**HSB Mode**:

- Intuitive for creating color schemes
- Easy to animate through colors
- Great for brightness/saturation adjustments
- Perfect for color wheels

**Color Lerp**:

- Smooth transitions between colors
- Simple gradients
- Animation between states
- Works in both RGB and HSB

**D3 Scales**:

- Data-driven color mapping
- Professional color schemes
- Complex multi-color gradients
- Categorical distinctions
- Perceptually uniform colors (like Viridis)

---

## Quick Reference

### p5.js Color Functions

```javascript
color(r, g, b, [a]); // Create color
fill(color); // Set fill color
stroke(color); // Set stroke color
background(color); // Set background
colorMode(RGB | HSB); // Switch color mode
lerpColor(c1, c2, amt); // Interpolate colors
red(color); // Extract red value
green(color); // Extract green value
blue(color); // Extract blue value
hue(color); // Extract hue
saturation(color); // Extract saturation
brightness(color); // Extract brightness
alpha(color); // Extract alpha
```

### D3 Scale Types

```javascript
d3.scaleSequential(); // Continuous gradient
d3.scaleDiverging(); // Diverging gradient
d3.scaleLinear(); // Custom gradient
d3.scaleQuantize(); // Discrete steps
d3.schemeCategory10; // Categorical colors
```

Happy coloring! 🎨
