const failSound = new Audio("audio/failSound.mp3");
const randomSound = new Audio("audio/randomSound.mp3");
const choiceSound = new Audio("audio/choiceSound.mp3");
failSound.volume = 0.5;
randomSound.volume = 0.5;
choiceSound.volume = 0.5;

var data = [];
var glowColor = 1;
var circleCurrent = 0;

const circle = document.querySelector(".circle");
const startButton = document.querySelector(".start");
const numberRound = document.querySelector(".numberRound")

function randomSettings() {
  var r1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      const colors = ["blue", "red", "yellow", "green"];
      let color = colors[Math.floor(Math.random() * colors.length)];
      data.push(color);
      let colorid = document.getElementById(color);
      colorid.style.opacity = 1;
      randomSound.play();
      resolve(colorid);
    }, 500);
  });
  r1.then((colorData) => {
    setTimeout(() => {
      colorData.style.opacity = 0.5;
      if (glowColor < 3) {
        randomSettings();
        glowColor++;
      }
    }, 200);
  });
  return;
}

function validationCircle(event) {
  if (event.target.id == data[circleCurrent]) {
    event.target.style.opacity = 1;
    choiceSound.play();
    setTimeout(() => {
      event.target.removeAttribute("style");
    }, 100);
    circleCurrent++;
  } else {
    data = [];
    glowColor = 1;
    circleCurrent = 0;
    numberRound.innerHTML = 0;
    failSound.play();
  }
  if (circleCurrent == glowColor) {
    data = [];
    glowColor = 1;
    circleCurrent = 0;
    numberRound.innerHTML++
    setTimeout(randomSettings, 2000);
  }
  return;
}

function fnStart() {
  data = [];
  glowColor = 1;
  circleCurrent = 0;
  randomSettings();
  return;
}

circle.addEventListener("click", validationCircle);
startButton.addEventListener("click", fnStart);
