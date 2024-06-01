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

function Box() {
  //   context.fillStyle = "#B67352";
  //   context.fillRect(250, 30, 810, 460);
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
  let x;
  let y;

  imagesObj = {};
  arrImages = [];
  imagesList.forEach((image) => {
    for (let x = 0; x < 3; x++) {
      arrImages.push(image);
    }
  });
  arrImages.sort(() => Math.random() - 0.5);

  for (let x = 0; x < 3; x++) {
    horizontally = 298;

    for (let y = 0; y < 5; y++) {
      BoxColors(horizontally, vertically, "#EAD8C0", "rgba(255,255,255,0.4)");
      //   boxDetails(horizontally, vertically);
      //   horizontally = 430;

      let imgHorizontal = horizontally;
      let imgvertical = vertically + 30;

      for (let i = 0; i < 3; i++) {
        let randomImage = arrImages.pop();
        // let image = new Image();
        // image.src = `./images/${randomImage}`;

        // if (imagesObj[randomImage] && imagesObj[randomImage] >= 3) {
        //   randomImage = ImagesRandom();
        //   console.log("hello");
        // }

        let imageHorizon = horizontally + 5 + i * (30 + 5);
        let imageVerticl = vertically + 30 + 5;

        drawingImage(randomImage, imageHorizon, imageVerticl, 60, 80);
        imagesObj[randomImage] = (imagesObj[randomImage] || 0) + 1;
      }

      horizontally += 120 + 25;
    }

    vertically += 120 + 25;
  }
}

function ImagesRandom() {
  return imagesList[Math.floor(Math.random() * imagesList.length)];
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

function drawingImage(src, x, y, w, h) {
  let image = new Image();
  image.src = `./images/${src}`;
  image.onload = () => {
    context.drawImage(image, x, y, w, h);
  };
}
resizeWindow();
Box();

window.addEventListener("resize", () => {
  resizeWindow();
  Box();
});
addEventListener("mousemove", (e) => {
  handImage.style.cssText = `
        top:${
          e.clientY - canvas1.offsetTop - handImage.offsetHeight / 2 + 60
        }px;
        left:${e.clientX - canvas1.offsetLeft - handImage.offsetWidth / 2}px;
    `;
});
