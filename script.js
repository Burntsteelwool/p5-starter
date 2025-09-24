let c1 = [];
let c2 = [];
let c3 = [];
var num = 0;
let f = [];
let carnSpeed = 5
let herbProtection = 0;
let randomEvent = 60;
let eventCheck = 0;
let famine = 0;
let herbSplitCheck = 2;
let carnSplitCheck = 2;
let blueSplitCheck = 2;

document.getElementById("button1").addEventListener("click", addHerbs);
document.getElementById("button2").addEventListener("click", addCarns);
document.getElementById("button3").addEventListener("click", addFood);
document.getElementById("devTool").addEventListener("click", herbWin)

function setup() {
  createCanvas(1000, 1000);
  for (var i = 0; i < 10; i++) {
    let ranx = Math.floor(random(width));
    let rany = Math.floor(random(height));
    c1.push(new Creature1(ranx, rany));
  }
  for (var i = 0; i < 10; i++) {
    let ranx = Math.floor(random(width));
    let rany = Math.floor(random(height));
    c2.push(new Creature2(ranx, rany));
  }
  /*
  for (var i = 0; i < 50; i++) {
    let ranx = Math.floor(random(width));
    let rany = Math.floor(random(height));
    f.push(new Food(ranx, rany));
  }*/
  for (var i = 0; i < 10; i++) {
    let ranx = Math.floor(random(width));
    let rany = Math.floor(random(height));
    c3.push(new Creature3(ranx, rany));
  }
}

function draw() {
  background(220);
  //random event
  /*if(eventCheck == 1){
    if(randomEvent > 0){
      randomEvent--;
    }
    
  }
  if(randomEvent == 0){
    famine = 0;
    herbProtection = 0;
    carnSpeed = 5;
  }
  if(num % (30*60) == 0 && num != 0){
    eventCheck = 1
    let eventNum = Math.floor(random(4));
    if(eventNum == 1){
      //no food
      f = [];
      famine = 1;
    }
    if(eventNum == 2){
      // invisble herb
      herbProtection = 1;
    }
    if(eventNum == 3){
      //faster carn
      carnSpeed+=10;
    }
    randomEvent = 600;
  }*/
  // --- Creature1 (herbivores)
  for (var i = c1.length - 1; i >= 0; i--) {
    let herb = c1[i];

    /*if(herbProtection == 0){
      if (num % 30 == 0 && num != 0) {
      herb.energy--;
      }
    }else{
      herb.energy = 20
    }

    if (herb.energy <= 0) {
      c1.splice(i, 1);
      continue;
    }

    

    // eat food
    for (var j = f.length - 1; j >= 0; j--) {
      let foodItem = f[j];
      let d = dist(herb.pos.x, herb.pos.y, foodItem.pos.x, foodItem.pos.y);
      if (d < 20) {
        herb.energy += 5;
        herb.split++;
        f.splice(j, 1);
      }
      */

    for(var j = 0; j < c3.length; j++){
      let blue = c3[j];
      let d = dist(herb.pos.x, herb.pos.y, blue.pos.x, blue.pos.y)
      if(d < 30){
        herb.split++;
        c3.splice(j, 1);
      }
    }

    herb.update();
    herb.draw();
    if (herb.split >= herbSplitCheck) {
      c1.push(new Creature1(herb.pos.x, herb.pos.y));
      herb.split = 0; // reset after splitting
    }
    }
    
    // split into new creature


  for (var i = 0; i < c2.length; i++) {
    let carn = c2[i]
    carn.update();
    carn.draw();

    /*if(num % 30 == 0 && num != 0){
      carn.energy--;
    }*/
    //ear herb
    if(herbProtection == 0){
      for(var j = c1.length -1; j >= 0; j--){
        let herb = c1[j];
        let d = dist(herb.pos.x, herb.pos.y, carn.pos.x, carn.pos.y);
        if (d < 30) {
          c1.splice(j, 1);
          carn.split++;
        }   
      }
    }

    if (carn.split >= carnSplitCheck) {
      c2.push(new Creature2(carn.pos.x, carn.pos.y));
      carn.split = 0; // reset after splitting
    }
  }

  
  /*for (var i = 0; i < f.length; i++) {
    f[i].draw();
  }*/

  for(var i = 0; i < c3.length; i++){
    let blue = c3[i]
    c3[i].update()
    c3[i].draw()

    for(var j = 0; j < c2.length; j++){
      let carn = c2[j];
      let d = dist(blue.pos.x, blue.pos.y, carn.pos.x, carn.pos.y);
      if(d < 30){
        c2.splice(j, j+1)
        blue.split++;
      }
    }
    if (blue.split >= blueSplitCheck){
      c3.push(new Creature3(blue.pos.x, blue.pos.y))
      blue.split = 0
    }
  }

  /*if(num % 60 == 0 && famine == 0){
    let newF = Math.floor(random(5));
    for(var i = 0; i < newF; i++){
      let ranx = Math.floor(random(width));
      let rany = Math.floor(random(height));
      f.push(new Food(ranx, rany));
    }
  }*/
  num++;
}



class Creature1 {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(3);
    this.energy = 50;
    this.split = 0;
  }

  update() {
    this.pos.add(this.vel);

    if (random(1) < 0.05) {
      let angleChange = random(-0.3, 0.3);
      this.vel.rotate(angleChange);
    }

    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    noStroke();
    fill(0, 200, 0);
    ellipse(0, 0, 40, 40);
    fill(0);
    ellipse(4, 6, 10, 10);
    ellipse(4, -6, 10, 10);
    fill(255);
    ellipse(4, 6, 8, 8);
    ellipse(4, -6, 8, 8);
    fill(0, 0, 200);
    ellipse(4, 6, 4, 4);
    ellipse(4, -6, 4, 4);
    pop();
  }
}

class Creature2 {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(carnSpeed);
    this.split = 0;
    this.energy = 50
  }

  update() {
    this.pos.add(this.vel);

    if (random(1) < 0.05) {
      let angleChange = random(-0.3, 0.3);
      this.vel.rotate(angleChange);
    }

    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    noStroke();
    fill(0);
    ellipse(0, 0, 40, 40);
    fill(255);
    ellipse(4, 6, 8, 8);
    ellipse(4, -6, 8, 8);
    fill(200, 0, 0);
    ellipse(4, 6, 4, 4);
    ellipse(4, -6, 4, 4);
    pop();
  }
}

class Creature4 {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(carnSpeed);
    this.split = 0;
    this.energy = 50
  }

  update() {
    this.pos.add(this.vel);

    if (random(1) < 0.05) {
      let angleChange = random(-0.3, 0.3);
      this.vel.rotate(angleChange);
    }

    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    noStroke();
    fill(150, 75, 0);
    ellipse(0, 0, 40, 40);
    fill(255);
    ellipse(4, 6, 8, 8);
    ellipse(4, -6, 8, 8);
    fill(0);
    ellipse(4, 6, 4, 4);
    ellipse(4, -6, 4, 4);
    pop();
  }
}

class Creature3 {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(carnSpeed);
    this.split = 0;
    this.energy = 50
  }

  update() {
    this.pos.add(this.vel);

    if (random(1) < 0.05) {
      let angleChange = random(-0.3, 0.3);
      this.vel.rotate(angleChange);
    }

    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    noStroke();
    fill(0, 0, 200);
    ellipse(0, 0, 40, 40);
    fill(255);
    ellipse(4, 6, 8, 8);
    ellipse(4, -6, 8, 8);
    fill(0);
    ellipse(4, 6, 4, 4);
    ellipse(4, -6, 4, 4);
    pop();
  }
}





class Food {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(153, 118, 69);
    ellipse(0, 0, 5, 5);
    pop();
  }
}



function addHerbs(){
  var num = document.getElementById("button1Num").value;
  for(var i = 0; i < num; i++){
    let ranx = Math.floor(random(width));
    let rany = Math.floor(random(height));
    c1.push(new Creature1(ranx, rany));
  }
  document.getElementById("button1Num").innerHTML = ''
}

function addCarns(){
  var num = document.getElementById("button2Num").value;
  for(var i = 0; i < num; i++){
    let ranx = Math.floor(random(width));
    let rany = Math.floor(random(height));
    c2.push(new Creature2(ranx, rany));
  }
  document.getElementById("button2Num").innerHTML = ''
}

function addFood(){
  var num = document.getElementById("button3Num").value;
  for(var i = 0; i < num; i++){
    let ranx = Math.floor(random(width));
    let rany = Math.floor(random(height));
    f.push(new Food(ranx, rany));
  }
  document.getElementById("button3Num").innerHTML = ''
}

function herbWin(){
  let devCheck = document.getElementById("1").value;
  if(devCheck == 1){

  }else if(devCheck == 2){

  }else if(devCheck == 3){

  }else if(devCheck == 4){
    c1 = [];
    c2 = [];
  }

}