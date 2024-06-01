let canvas1 = document.getElementById("canvas1");
let handImage = document.getElementById("hand");
let imagesList = [
  "cup1.png",
  "cup2.png",
  "cup3.png",
  "cup4.png",
  "cup5.png",
  "cup6.png",
  "cup7.png",
  "cup9.png",
  "cup10.png",
  "cup11.png",
  "cup12.png",
  "cup13.png",
  "cup14.png",
];

function resizeWindow() {
  canvas1.width = window.innerWidth;
  canvas1.height = 700;
}

let context = canvas1.getContext("2d");
let arrImages = [];
let details = [];

imagesList.forEach((image) => {
  for (let x = 0; x < 3; x++) {
    arrImages.push(image);
  }
});
arrImages.sort(() => Math.random() - 0.5);

function Box() {
  context.clearRect(0, 0, canvas1.width, canvas1.height);

  let mainBox = context.createLinearGradient(250, 50, 250, 30 + 460);
  mainBox.addColorStop(0, "#C68D5B");
  mainBox.addColorStop(1, "#B67352");
  context.fillStyle = mainBox;
  context.shadowColor = "rgba(0,0,0,0.2)";
  context.shadowBlur = 20;

  context.fillRect(250, 50, 810, 460);

  context.shadowColor = "rgba(0,0,0,0)";
  context.shadowBlur = 0;

  let vertically = 70;
  let horizontally;

  for (let x = 0; x < 3; x++) {
    horizontally = 298;

    for (let y = 0; y < 5; y++) {
      BoxColors(horizontally, vertically, "#EAD8C0", "rgba(255,255,255,0.4)");

      for (let i = 0; i < 3; i++) {
        let randomImage = arrImages.pop();
        let imageHorizon = horizontally + 5 + i * (30 + 5);
        let imageVerticl = vertically + 30 + 5;

        let detail = {
          names: randomImage,
          x: imageHorizon,
          y: imageVerticl,
          w: 60,
          h: 80,
        };
        details.push(detail);
        drawingImage(detail);
      }

      horizontally += 120 + 25;
    }

    vertically += 120 + 25;
  }

  details.forEach((detail) => {
    drawingImage(detail);
  });
}

function BoxColors(h, v, color, gloss) {
  let firstColor = context.createLinearGradient(h, v, h, v + 120);
  firstColor.addColorStop(0, color);
  firstColor.addColorStop(1, color);
  context.fillStyle = firstColor;

  context.fillRect(h, v, 130, 120);

  let gloss1 = context.createLinearGradient(h, v, h, v + 120);
  gloss1.addColorStop(0, gloss);
  gloss1.addColorStop(0.5, gloss);
  gloss1.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gloss1;
  context.fillRect(h, v, 130, 120);
}

function drawingImage(detail) {
  let image = new Image();
  image.src = `./images/${detail.names}`;
  image.onload = () => {
    context.drawImage(image, detail.x, detail.y, detail.w, detail.h);
  };
}

resizeWindow();
Box();

window.addEventListener("resize", () => {
  resizeWindow();
  Box();
});
addEventListener("mousemove", (event) => {
  mx = event.clientX;
  my = event.clientY;

  // Update the position of the hand image, keeping the cursor at the top
  handImage.style.left = `${mx + 77}px`;
  handImage.style.top = `${my - 35}px`;
});

let XAxis;
let YAxis;
let startX, startY;
let dragging = false;
let current;

let inImage = function (x, y, image) {
  let imageLeft = image.x;
  let imageRight = image.x + image.w;

  let imageTop = image.y;
  let imagebottom = image.y + image.h;

  return x > imageLeft && x < imageRight && y > imageTop && y < imagebottom;
};

let handDown = function (event) {
  event.preventDefault();
  XAxis = parseInt(event.clientX);
  YAxis = parseInt(event.clientY);

  for (let i = 0; i < details.length; i++) {
    if (inImage(XAxis, YAxis, details[i])) {
      current = i;
      dragging = true;
      startX = XAxis;
      startY = YAxis;

      return;
    }
  }
};

let handUp = function (event) {
  event.preventDefault();
  if (!dragging) return;
  dragging = false;
};

let handOut = function (event) {
  event.preventDefault();
  if (!dragging) return;
  dragging = false;
};

let handMove = function (event) {
  if (!dragging) return;
  event.preventDefault();

  let handX = parseInt(event.clientX);
  let handY = parseInt(event.clientY);

  let dx = handX - startX;
  let dy = handY - startY;
  let currenImage = details[current];
  currenImage.x += dx;
  currenImage.y += dy;
  startX = handX;
  startY = handY;
  Box();
};

document.addEventListener("mousedown", handDown);
document.addEventListener("mouseup", handUp);
document.addEventListener("mouseout", handOut);
document.addEventListener("mousemove", handMove);
