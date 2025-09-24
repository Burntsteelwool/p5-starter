let wheelNumbers = [
  { num: 0, color: "green" },
  { num: 32, color: "red" }, { num: 15, color: "black" },
  { num: 19, color: "red" }, { num: 4, color: "black" },
  { num: 21, color: "red" }, { num: 2, color: "black" },
  { num: 25, color: "red" }, { num: 17, color: "black" },
  { num: 34, color: "red" }, { num: 6, color: "black" },
  { num: 27, color: "red" }, { num: 13, color: "black" },
  { num: 36, color: "red" }, { num: 11, color: "black" },
  { num: 30, color: "red" }, { num: 8, color: "black" },
  { num: 23, color: "red" }, { num: 10, color: "black" },
  { num: 5, color: "red" }, { num: 24, color: "black" },
  { num: 16, color: "red" }, { num: 33, color: "black" },
  { num: 1, color: "red" }, { num: 20, color: "black" },
  { num: 14, color: "red" }, { num: 31, color: "black" },
  { num: 9, color: "red" }, { num: 22, color: "black" },
  { num: 18, color: "red" }, { num: 29, color: "black" },
  { num: 7, color: "red" }, { num: 28, color: "black" },
  { num: 12, color: "red" }, { num: 35, color: "black" },
  { num: 3, color: "red" }, { num: 26, color: "black" }
];

let angle = 0;
let spinning = false;
let spinSpeed = 0;
let money = 100;
let betAmount = 10;
let betType = "red";
let result = null;
let popupMessage = "";
let showPopup = false;

let ballAngle = 0;
let ballSpeed = 0.08;

document.getElementById("play").addEventListener("click", play)
function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  textSize(20);

  // Hook into HTML controls
  document.getElementById("betAmount").addEventListener("input", e => {
    betAmount = parseInt(e.target.value) || 10;
  });

  document.getElementById("betType").addEventListener("change", e => {
    betType = e.target.value;
  });
}

function draw() {
  background(30, 120, 30);

  translate(width / 2, height / 2);

  // Draw wheel
  let slice = TWO_PI / wheelNumbers.length;
  rotate(angle);
  for (let i = 0; i < wheelNumbers.length; i++) {
    fill(wheelNumbers[i].color);
    stroke(255);
    strokeWeight(2);
    arc(0, 0, 500, 500, i * slice, (i + 1) * slice, PIE);

    push();
    rotate((i + 0.5) * slice);
    fill(255);
    noStroke();
    textSize(14);
    text(wheelNumbers[i].num, 180, 0);
    pop();
  }

  // Inner circle
  fill(50);
  noStroke();
  ellipse(0, 0, 100);

  // Ball
  let ballRadius = 240;
  let ballX = ballRadius * cos(-ballAngle + angle);
  let ballY = ballRadius * sin(-ballAngle + angle);
  fill(255);
  noStroke();
  ellipse(ballX, ballY, 20);

  // Spin logic
  if (spinning) {
    angle += spinSpeed;
    spinSpeed *= 0.99;
    ballAngle += ballSpeed;
    if (spinSpeed < 0.01) {
      spinning = false;
      determineResult();
    }
  }

  resetMatrix();

  // UI
  fill(255);
  text("Money: $" + money, width / 2, 30);
  text("Your Bet: $" + betAmount + " on " + betType, width / 2, 60);

  if (showPopup) {
    drawPopup();
  }
}

function play() {
  if (!spinning && !showPopup) {
    if (money >= betAmount) {
      spinSpeed = random(0.3, 0.5);
      spinning = true;
      result = null;
      money -= betAmount;
    } else {
      popupMessage = "Not enough money to bet!";
      showPopup = true;
    }
  }

  if (showPopup) {
    showPopup = false;
  }
}

function determineResult() {
  let slice = TWO_PI / wheelNumbers.length;
  let landedIndex = floor(((TWO_PI - (angle % TWO_PI)) / slice) % wheelNumbers.length);
  let landed = wheelNumbers[landedIndex];

  let won = false;
  let winnings = 0;

  if (betType === "red" || betType === "black") {
    if (landed.color === betType) {
      won = true;
      winnings = betAmount * 2;
      money += winnings;
    }
  } else if (betType === "green") {
    if (landed.num === 0) {
      won = true;
      winnings = betAmount * 14; // higher payout for 0
      money += winnings;
    }
  }

  popupMessage =
    "Ball landed on " + landed.num + " (" + landed.color + ")\n" +
    (won ? "You WON $" + winnings + "!" : "You LOST $" + betAmount + "!");
  showPopup = true;
}

function drawPopup() {
  fill(255);
  stroke(0);
  rectMode(CENTER);
  rect(width / 2, height / 2, 400, 200, 20);
  fill(0);
  noStroke();
  text(popupMessage, width / 2, height / 2);
  text("(Click to continue)", width / 2, height / 2 + 60);
}
