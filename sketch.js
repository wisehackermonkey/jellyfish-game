// Springy animation tutorial
// https://www.youtube.com/watch?v=VWfXiSUDquw

var pos;
var target;
var strength = 0.03;
var strengthMin = 0.01;
var strengthStep = 0.01;
var strengthMax = 1;

var vel;

var drag = 0.85;
var dragMin = 0.1;
var dragMax = 0.99;
var dragStep = 0.01;

var offset = 0;
var offsetMin = -20;
var offsetMax = 20;
var offsetStep = 0.01;

var acc = 0.1;

var accMin = 0.1;
var accMax = 1;
var accStep = 0.01;

var move = 10;
var moveVal = 0;

var backupDelay = 50;
var backupDelayMax = 1000;
var moveDelay = 200;
var moveDelayMax = 1000;

var backup = 3;

var defaults = false;
var b = 0.0;
var gui;

var jelly

function setup() {
  createCanvas(600,600);
  angleMode(DEGREES);
  pos = createVector(0,0);
  target = createVector(100,0);
  vel = createVector(0,0);
  gui = createGui('Spring Setting', width/3*2,10);
  gui.addGlobals("defaults",'drag','strength',"backupDelay","moveDelay","move","backup");
  strength = 0.03;
  move = 10;
  backupDelay = 50;
  backup = 3;
  drag = 0.85;

  jelly = new Jellyfish()
  jelly.pos.set(100,100)
}

function draw() {
  background(50);
  if(defaults){
    strength = 0.03;
    move = 10;
    backupDelay = 50;
    backup = 3;
    drag = 0.85;
  }
  keyInput();
  var force = p5.Vector.sub(target,pos);//.copy();

  force.mult(strength);
  
  
  vel.mult(drag);
  vel.add(force);
  
  pos.add(vel);
  ellipse(pos.x,pos.y,40,40);
  jelly.pos.set(pos)
  jelly.render();

}


function Jellyfish(){
    this.pos = createVector(0,0);
    this.angle = 0
    this.render = ()=>{
        push()
        translate(this.pos.x, this.pos.y);
        rotate(0+random(-4,4))
        arc(0, 0, 80, 80, 180, 0, PIE); 
        line(0, 0, 0+10, 0+60);
        line(0, 0, 0-10, 0+60);
        pop()
    }
}



function keyInput() {
  if (keyIsDown(RIGHT_ARROW)) {
    print("d");
    setTimeout(function(){
      target.x -= backup;
    },backupDelay);
    setTimeout(function(){
      target.x += move;
    },moveDelay);
  }
  
  if (keyIsDown(LEFT_ARROW)) {
    print("a");
    setTimeout(function(){
      target.x += backup;
    },backupDelay);
    setTimeout(function(){
      target.x -= move;
    },moveDelay);
  } 
  
  
  
  
  if (keyIsDown(DOWN_ARROW)) {
    print("s");
    setTimeout(function(){
      target.y -= backup;
    },backupDelay);
   
    setTimeout(function(){
      target.y += move;
    },moveDelay);
  }
  
  if (keyIsDown(UP_ARROW)) {
    print("w");
    
    setTimeout(function(){
      target.y += backup;
    },backupDelay);
    
    setTimeout(function(){
      target.y -= move;
    },moveDelay);

  }
  
  
  
  if (key === "r") {
   target = createVector(0,0);
  }
}
