let sliders = [];
let font;
let sliderData = [];

p5.disableFriendlyErrors = true;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  font = await loadFont(
    // "assets/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf"
    "https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,slnt,wdth,wght,GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC@8..144,-10..0,25..151,100..1000,-200..150,27..175,323..603,25..135,649..854,-305..-98,560..788,416..570,528..760&display=swap",
  );

  // let sliderData = [
  //   { name: "wght", min: 100, max: 1000, value: 400, label: "Weight" },
  //   { name: "wdth", min: 25, max: 151, value: 100, label: "Width" },
  //   { name: "slnt", min: -10, max: 0, value: 0, label: "Slant" },
  // ];

  sliderData = [
    { name: "wght", min: 100, max: 1000, value: 400, label: "Weight" },
    { name: "slnt", min: -10, max: 0, value: 0, label: "Slant" },
    { name: "wdth", min: 25, max: 151, value: 100, label: "Width" },
    { name: "GRAD", min: -200, max: 150, value: 0, label: "Grade" },
    { name: "XOPQ", min: 27, max: 175, value: 96, label: "Thick Stroke" },
    { name: "YOPQ", min: 25, max: 135, value: 79, label: "Thin Stroke" },
    { name: "XTRA", min: 323, max: 603, value: 468, label: "Counter Width" },
    { name: "YTLC", min: 416, max: 570, value: 514, label: "Lowercase Height" },
    { name: "YTUC", min: 528, max: 760, value: 712, label: "Uppercase Height" }, // fixed
    { name: "YTAS", min: 649, max: 854, value: 750, label: "Ascender Height" },
    { name: "YTDE", min: -305, max: -98, value: -203, label: "Descender Depth" },
    { name: "YTFI", min: 560, max: 788, value: 738, label: "Figure Height" },
  ];

  for (let i = 0; i < sliderData.length; i++) {
    let data = sliderData[i];
    let slider = createSlider(data.min, data.max, data.value, 1);
    slider.position(40, 40 + i * 40);
    slider.style("width", "200px");
    sliders.push({ slider, label: data.label, name: data.name });
  }

  let settings = sliders.map((s) => `'${s.name}' ${s.slider.value()}`).join(", ");
  console.log("settings", settings);
}

function draw() {
  background(50);

  if (sliders.length === 0) return; // Wait for setup
  let settings = sliders.map((s) => `'${s.name}' ${s.slider.value()}`).join(", ");

  // let wght = sliders[0].slider.value();
  // let wdth = sliders[1].slider.value();
  // let slnt = sliders[2].slider.value();

  fill(255);
  textAlign(CENTER, CENTER);
  // textFont("'Roboto Flex'", {
  //   fontVariationSettings: `'wght' ${wght}, 'wdth' ${wdth}, 'slnt' ${slnt}`,
  // });

  textFont("'Roboto Flex'", {
    fontVariationSettings: settings,
  });
  textSize(140);
  text("Hello Xylophon", width / 2, height / 2);

  // Draw labels
  textFont("'Roboto Flex'", {
    fontVariationSettings: `'wght' 400`,
  });
  textSize(14);
  textAlign(LEFT, CENTER);
  for (let i = 0; i < sliders.length; i++) {
    let s = sliders[i];
    text(`${s.label}: ${s.slider.value()}`, 250, 50 + i * 40);
  }
}
