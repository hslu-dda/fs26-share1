# Typography Primer for p5.js

A hands-on guide to working with text in creative coding.

---

## 1. Text Anatomy & Metrics

Understanding how text is measured is fundamental to precise typographic control.

```
         ┌─────────────────────────── Ascent (textAscent)
         │
         │    H e l l o
─────────┼────────────────────────── Baseline (y = 0)
         │    g y p
         │
         └─────────────────────────── Descent (textDescent)
```

**Key functions:**

- `textAscent()` — height above the baseline (capitals, tall letters)
- `textDescent()` — depth below the baseline (g, y, p, q)
- `textWidth("string")` — horizontal space the text occupies

```javascript
textSize(40);
let asc = textAscent();
let desc = textDescent();
let w = textWidth("Hello");

// Bounding box around text
rect(x, y - asc, w, asc + desc);
```

---

## 2. Text Alignment

Control where text anchors relative to your coordinates.

```javascript
textAlign(horizAlign, vertAlign);
```

| Horizontal | Vertical             |
| ---------- | -------------------- |
| `LEFT`     | `TOP`                |
| `CENTER`   | `CENTER`             |
| `RIGHT`    | `BASELINE` (default) |
|            | `BOTTOM`             |

```javascript
// Center text on screen
textAlign(CENTER, CENTER);
text("Hello", width / 2, height / 2);
```

**Tip:** `BASELINE` is the natural resting line of text. Use it when you need precise vertical stacking.

---

## 3. Loading Fonts

**System fonts** — available on the user's machine:

```javascript
textFont("Baskerville");
textFont("Helvetica");
textFont("Courier New");
```

**Custom fonts** — load from file:

```javascript
let myFont;

function preload() {
  myFont = loadFont("fonts/SpaceMono-Bold.ttf");
}

function setup() {
  textFont(myFont);
}
```

**Google Fonts** — link in your HTML, then use by name:

```html
<!-- index.html -->
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@100..900&display=swap" rel="stylesheet" />
</head>
```

```javascript
// sketch.js
textFont("Grenze Gotisch");
```

---

## 4. Manual Text Rendering

For full control, render text character-by-character.

```javascript
let x = 100;
let y = 100;
let maxWidth = 900;

for (let i = 0; i < myText.length; i++) {
  let char = myText[i];

  // Handle line breaks
  if (char === "\n") {
    x = 100;
    y += fontSize * 1.5;
    continue;
  }

  // Word wrap
  if (x + textWidth(char) > maxWidth) {
    x = 100;
    y += fontSize * 1.5;
  }

  text(char, x, y);
  x += textWidth(char);
}
```

**Why do this?**

- Animate individual characters
- Apply different styles per character
- Create kinetic typography
- Build typewriter effects

---

## 6. Typewriter Animation

Reveal text progressively using a counter:

```javascript
let textCount = 0;

function draw() {
  for (let i = 0; i < textCount; i++) {
    // render character i
  }
  textCount++;
}
```

For timed reveals, use `setInterval`:

```javascript
let counter = 0;
setInterval(() => {
  counter++;
  redraw();
}, 500); // advance every 500ms
```

---

## 7. Text to Points

Convert text outlines to coordinate arrays for particle effects:

```javascript
let font;
let points;

function preload() {
  font = loadFont("assets/SpaceMono-Bold.ttf");
}

function setup() {
  points = font.textToPoints("p5*js", 50, 200, 250, {
    sampleFactor: 0.1, // density (lower = more points)
    simplifyThreshold: 0, // smoothing
  });
}

function draw() {
  for (let p of points) {
    ellipse(p.x, p.y, 5);
  }
}
```

**Note:** Requires a loaded font file (not system fonts).

---

## 8. Variable Fonts

Variable fonts contain multiple styles in one file, controlled by axes.
Its important that you use p5.js 2.0 and the new async pattern:

**p5.js 2.0 & async/await:**  
Starting with p5.js 2.0, `loadFont()` returns a Promise. Use `async setup()` to load fonts that need variation settings:

```javascript
let font;

async function setup() {
  createCanvas(800, 400);

  font = await loadFont("https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@100..1000&display=swap");
}

function draw() {
  background(220);

  textFont("'Roboto Flex'", {
    fontVariationSettings: `'wght' 700, 'wdth' 120, 'slnt' -5`,
  });

  textSize(72);
  text("Hello", width / 2, height / 2);
}
```

**Common axes:**
| Axis | Name | Typical Range |
|------|------|---------------|
| `wght` | Weight | 100–900 |
| `wdth` | Width | 50–200 |
| `slnt` | Slant | -10–0 |
| `ital` | Italic | 0–1 |

**Roboto Flex extended axes:**

- `GRAD` — Grade (stroke thickness without changing width)
- `XOPQ` — Thick stroke weight
- `YOPQ` — Thin stroke weight
- `XTRA` — Counter width
- `YTLC` — Lowercase height
- `YTUC` — Uppercase height

---

## Quick Reference

```javascript
// Setup
textFont("FontName");
textSize(24);
textAlign(CENTER, CENTER);
textLeading(36);

// Metrics
textWidth("string"); // → number
textAscent(); // → number
textDescent(); // → number

// Drawing
text("string", x, y);
text("string", x, y, maxWidth, maxHeight); // with bounding box

// Advanced
font.textToPoints("string", x, y, size, options);
```

---
