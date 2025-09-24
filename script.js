
let c1 = [];
let c2 = [];
var c3Size = 20;
let c3;
var num = 0;
function setup() {
  createCanvas(2000, 1000);
  for (var i = 0; i < 20; i++) {
    let ranx = Math.floor(random(2000));
    let rany = Math.floor(random(1000));
    c1.push(new Creature1(ranx, rany));
  }
  for(var i = 0; i < 5; i++){
    let ranx = Math.floor(random(2000));
    let rany = Math.floor(random(1000));
    c2.push(new creature2(ranx, rany))
  }
  let ranx = Math.floor(random(2000));
  let rany = Math.floor(random(1000));
  c3 = new creature3(ranx, rany)
}

function draw() {
  background(220);
  for (var i = 0; i < c1.length; i++) {
    c1[i].update();  
    c1[i].draw();    
  }
  for (var i = 0; i < c2.length; i++) {
    c2[i].update();  
    c2[i].draw();    
  }
  c3.draw();
  if(num % 2 == 0){
    c3Size+=5
  }
}


class Creature1 {
  constructor(x, y) {
    this.pos = createVector(x, y);  
    this.vel = p5.Vector.random2D();
    this.vel.setMag(3);
  }

  update() {
    // Add velocity to position
    this.pos.add(this.vel);

    // Add some randomness to direction but keep it smooth
    if (random(1) < 0.05) { // only sometimes change direction
      let angleChange = random(-0.3, 0.3); // small turns
      this.vel.rotate(angleChange);
    }

    // Stay within canvas bounds
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading()); // face movement direction
    noStroke();
    fill(0, 200, 0);
    ellipse(0, 0, 40, 40);   // body
    fill(0, 0, 0)
    ellipse(4, 6, 10, 10)
    ellipse(4, -6, 10, 10)
    fill(255, 255, 255);
    ellipse(4, 6, 8, 8);
    ellipse(4, -6, 8, 8);
    fill(0, 0, 200);
    ellipse(4, 6, 4, 4);
    ellipse(4, -6, 4, 4);
    pop();
  }
}



class creature2{
    constructor(x,y){
        this.pos = createVector(x,y)
        this.vel = p5.Vector.random2D();
        this.vel.setMag(5)
    }

    update() {
    // Add velocity to position
    this.pos.add(this.vel);

    // Add some randomness to direction but keep it smooth
    if (random(1) < 0.05) { // only sometimes change direction
      let angleChange = random(-0.3, 0.3); // small turns
      this.vel.rotate(angleChange);
    }

    // Stay within canvas bounds
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
    }

    draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading()); // face movement direction
    noStroke();
    fill(0, 0, 0);
    ellipse(0, 0, 40, 40);   // body
    fill(0, 0, 0)
    ellipse(4, 6, 10, 10)
    ellipse(4, -6, 10, 10)
    fill(255, 255, 255);
    ellipse(4, 6, 8, 8);
    ellipse(4, -6, 8, 8);
    fill(200, 0, 0);
    ellipse(4, 6, 4, 4);
    ellipse(4, -6, 4, 4);
    pop();
  }
}

class creature3{
   constructor(x,y){
        this.pos = createVector(x,y)
    }

    

    draw() {
    push();
    translate(this.pos.x, this.pos.y);

    noStroke();
    fill(0);
    ellipse(0, 0, c3Size+2, c3Size+2);   // body
    fill(250)
    ellipse(0, 0, c3Size, c3Size)
    fill(0, 0, 0)
    ellipse(4, 6, 10, 10)
    ellipse(4, -6, 10, 10)
    fill(255, 255, 255);
    ellipse(4, 6, 8, 8);
    ellipse(4, -6, 8, 8);
    fill(200, 0, 0);
    ellipse(4, 6, 4, 4);
    ellipse(4, -6, 4, 4);
    pop();
  } 
}