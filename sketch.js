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

var jelly;

var block;
var tentical;

let noise_val = 0;
function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  pos = createVector(0, 0);
  target = createVector(100, 0);
  vel = createVector(0, 0);
  gui = createGui("Spring Setting", width - 40, 10);
  gui.addGlobals(
    "defaults",
    "drag",
    "strength",
    "backupDelay",
    "moveDelay",
    "move",
    "backup"
  );
  strength = 0.03;
  move = 10;
  backupDelay = 50;
  backup = 3;
  drag = 0.85;

  jelly = new Jellyfish();
  jelly.pos.set(100, 100);

  block = new Block();
  block.pos.set(100, 100);
  block.size.set(100, 100);

  tentical = new Tentical();
  tentical.add(createVector(0, 100));
  tentical.add(createVector(100, 100));
  tentical.add(createVector(200, 100));
  tentical.add(createVector(300, 100));
  collideDebug(true);
}

function draw() {
  background(50);
  if (defaults) {
    strength = 0.03;
    move = 10;
    backupDelay = 50;
    backup = 3;
    drag = 0.85;
  }
  keyInput();
  var force = p5.Vector.sub(target, pos); //.copy()

  force.mult(strength);

  vel.mult(drag);
  vel.add(force);

  pos.add(vel);
  ellipse(pos.x, pos.y, 40, 40);
  jelly.pos.set(pos);

  for (var i = 0; i < 10; i++) {
    if (jelly.collide(block.pos, block.size)) {
      fill(color("red"));
      // pos.add(vel.mult(-1).mult(2))
      // vel.normalize()
    }
  }

  jelly.render();

  block.render();
  tentical.render();
}

function Jellyfish() {
  this.pos = createVector(0, 0);
  this.angle = 0;
  this.radius = 40;

  // this.state = 0
  this.hit = false;

  this.collide = (r, sz) => {
    this.hit = collideRectCircleVector(r, sz, this.pos, this.radius, 10); // = function(r, sz, c, diameter){
    return this.hit;
  };

  this.render = () => {
    push();
    translate(this.pos.x, this.pos.y);
    noise_val += 0.01;
    rotate(0 + noise(noise_val));
    arc(0, 0, 80, 80, 180, 0, PIE);
    line(0, 0, 0 + 10, 0 + 60);
    line(0, 0, 0 - 10, 0 + 60);
    pop();
  };
}

function Block() {
  this.pos = createVector(0, 0);
  this.size = createVector(0, 0);
  this.render = () => {
    push();
    rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    pop();
  };
}

function Tentical() {
  this.pos = createVector(0, 0);
  this.size = createVector(30, 30);
  this.nodes = [];
  this.current = 0;
  this.add = (vector) => {
    //createVector(mouseX, mouseY)
    this.nodes[this.current] = vector;
    this.current++;
  };
  this.render = () => {
    push();
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      rectMode(CENTER);
      rect(node.x, node.y, 4, this.size.y);
      rect(node.x, node.y, this.size.y, 2);
      if (i - 1 > 0) {
        prev_node = this.nodes[i - 1];
        midpoint = p5.Vector.lerp(node, prev_node, 0.5);
        // print(midpoint)
        rect(midpoint.x, midpoint.y, 4, 4);
        // right_angle =
        // source
        // https://stackoverflow.com/a/52378449/5460870
        // len = p5.Vector.add(node,prev_node)
        // m = p5.Vector.dot(p5.Vector.sub(node,prev_node).div(p5.Vector.dot(prev_node,prev_node)))
        // right_angle = p5.Vector.mult(len,m)
        // rect(right_angle.x, right_angle.y,4,4)

        prev_normalized = prev_node.copy().normalize;
        current_normalize = node.copy().normalize;
        line(0, 0, prev_normalized.x * 10, prev_normalized.y * 10);
        // print(prev_normalized);
        // v1.angleBetween(v2);
        // angle from
        // scale vector by factor
        // add to node point
      }
    }

    // todo begin shape
    //end shape
    pop();
  };

  push();
  for (var i in this.root) {
    this.pulsate += this.PULSATE_SPEED;

    // noStroke()
    fill(36, 25, 20); //"dark brown"
    // todo add sucking up water wave motion
    // http://sites.music.columbia.edu/cmc/MusicAndComputers/chapter3/03_03.php
    root_width = this.start_width * log(i + 1) + sin(this.pulsate);
    root_width = max_root_width - root_width;
    root_width = constrain(root_width, 3, 30);
    ellipse(this.root[i].x, this.root[i].y, root_width, root_width);
  }
  pop();
}

function move_animation(direction) {
  setTimeout(() => {
    target.add(direction.mult(backup));
  }, backupDelay);
  setTimeout(() => {
    target.add(direction.mult(-1).mult(move));
  }, moveDelay);
}


function do_nothing(){}

function keyInput() {
  (keyIsDown(RIGHT_ARROW)|| key === "d" ? move_animation : do_nothing )(createVector(-1,0));
  (keyIsDown(LEFT_ARROW) || key === "a" ? move_animation : do_nothing )(createVector(1, 0));
  (keyIsDown(DOWN_ARROW) || key === "s" ? move_animation : do_nothing )(createVector(0,-1));
  (keyIsDown(UP_ARROW)   || key === "w"  ? move_animation : do_nothing )(createVector(0, 1));


  (true?()=>{}:()=>{})()
  (true?()=>{}:()=>{})();
  
  ((key === "r" )? ()=>{target = createVector(0, 0)} : do_nothing )();
}