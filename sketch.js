// Springy animation tutorial
// https://www.youtube.com/watch?v=VWfXiSUDquw

var pos;
//var target;
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

var backupDelay = 50/2;
var backupDelayMax = 1000;
var moveDelay = 200/2;
var moveDelayMax = 1000;

var backup = 3;

var defaults = true;
var b = 0.0;
var gui;

var jelly;

var block;
var tentical;


let tentacles = [];

step = 0


let noise_val = 0;
function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  // pos = createVector(0, 0);
  // target = createVector(100, 0);
  // vel = createVector(0, 0);
  // gui = createGui("Spring Setting", width - 40, 10);
  // gui.addGlobals(
  //   "defaults",
  //   "drag",
  //   "strength",
  //   "backupDelay",
  //   "moveDelay",
  //   "move",
  //   "backup"
  // );
  strength = 0.03;
  move = 10;
  backupDelay = 50;
  backup = 3;
  drag = 0.85;

  jelly = new Jellyfish();
  jelly.pos.set(10, 10);

  block = new Block();
  block.pos.set(200, 200);
  block.size.set(100, 100);

  tentical = new Tentical();
  tentical.add(createVector(0, 100));
  tentical.add(createVector(100, 100));
  tentical.add(createVector(200, 100));
  tentical.add(createVector(300, 100));
  collideDebug(true);

  rectMode(CENTER);
  ellipseMode(CENTER);
  setup_tenticals()
}


function collision_test_rect_circ(vec1, size1, vec2, size2){
 // vars set 1 == rect
 // vars set 2 == circle
 //todo: this is not really a circle collision test.
//  case1 = (simpledist(vec1.x, vec1.y, vec2.x, vec2.y) < size1 + size2)
      //strokeWeight(2)
      //line(vec1.x,vec1.y, vec2.x, vec2.y)


 return (simpledist(vec1.x, vec1.y, vec2.x, vec2.y) < size1 + size2);
}

function simpledist(x1, y1, x2, y2){
  return(max(abs(x1-x2),abs(y1-y2)));
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


  // for (var i = 0; i < 10; i++) {
    // vel.mult(-1);

      var force = p5.Vector.sub(jelly.target, jelly.pos); //.copy()

      force.mult(strength);

      jelly.vel.mult(drag);
      jelly.vel.add(force);

      // pos.add(vel);
 // separate this into x and
      // this is an attempt to move the position.  It will be tested below y
    jelly.pos.x+=jelly.vel.x;
      //jelly.collide
      //if (collideRectCircleVector(block.pos, block., this.pos, this.radius, 10)}(block.pos, block.size)) {
      if (collision_test_rect_circ(block.pos, block.size.x*.5, jelly.pos, jelly.radius)){
        // force.x=0;
        // drag.x=0;
        fill(200,0,0,40)//color("red"));
        // https://jonathanwhiting.com/tutorial/collision/
        // if we hit from the left, set loc to just to the left of obstacle
        if (jelly.pos.x<block.pos.x){
          jelly.pos.x=block.pos.x-(jelly.radius+block.size.x*.5);
          // block.pos.x-block.size.x*.5 is the left side of the box
          // subtract jelly.radius for the center of the jellyfish
        }
        // if we hit from the right, set loc to just to the right of obstacle
        if (jelly.pos.x>block.pos.x){
          jelly.pos.x=block.pos.x+(jelly.radius+block.size.x*.5);
        }
        jelly.vel.x=-jelly.vel.x;
        jelly.target.x=jelly.pos.x+jelly.vel.x*5;
        // modify the multiplier ^ for different bounce
      }
      // Hey Oran!  Nice tentacle / spermatozoon tail.  I'm copying the horizontal collision test just because I'm curious about whether it will work once the Y-direction is in place as well.
      // It seems to work ok!

      jelly.pos.y+=jelly.vel.y;

      if (collision_test_rect_circ(block.pos, block.size.y*.5, jelly.pos, jelly.radius)){
        // force.x=0;
        // drag.x=0;
        fill(200,0,0,40)//color("red"));
        //hit from above:
        if (jelly.pos.y<block.pos.y){
          jelly.pos.y=block.pos.y-(jelly.radius+block.size.y*.5);
          // block.pos.x-block.size.x*.5 is the left side of the box
          // subtract jelly.radius for the center of the jellyfish
        }
        // hit from below
        if (jelly.pos.y>block.pos.y){
          jelly.pos.y=block.pos.y+(jelly.radius+block.size.y*.5);
        }
        jelly.vel.y=-jelly.vel.y;
        jelly.target.y=jelly.pos.y+jelly.vel.y*5;
        // modify the multiplier ^ for different bounce
      }

      ellipse(jelly.pos.x, jelly.pos.y, jelly.radius*2, jelly.radius*2);

  // jelly.render();

  block.render();
   push()
   angleMode(RADIANS)

    draw_tenticals(jelly.pos.x,jelly.pos.y)

    pop()
  // tentical.render();
}

function setup_tenticals(){
  // for (var i = 0; i <= 10; i += 1) {
    let point = new p5.Vector(100, 200);

    let current = new Segment(point, 10, 0);
    for (let i = 0; i < 20; i++) {
      let next = new Segment(current, 5, i);
      current.child = next;
      current = next;
    }
    tentacle = current;

  
}
function draw_tenticals(x,y){
  
  // for (var i = 0; i <= 10; i += 1) {
  step+=0.01
    tentacle.follow(x,y);
    tentacle.update();
    tentacle.show();

    let next = tentacle.par;
    while (next) {
      next.follow();
      next.update();
      next.show();
      next = next.par;
    }
  
}
function Jellyfish() {
  this.pos = createVector(0, 0);
  this.vel = createVector(0, 0);
  this.target = createVector(0, 0);
  this.angle = 0;
  this.radius = 40;

  // this.state = 0
  this.hit = false;

  this.collide = (r, sz) => {
    this.hit = collideRectCircleVector(r, sz, this.pos, this.radius, 10); // = function(r, sz, c, diameter){
    return this.hit;
  };

  this.update = () => {}

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
    // prev_node = undefined;
    // for (let i = 1; i < this.nodes.length; i++) {
      let i = 1;
      // const node = this.nodes[i];
      let prev_node = createVector(0, 0)//this.nodes[i - 1];
      let node = createVector(100, 100)

push()
translate(node.x,node.y)
      rectMode(CENTER);
      rect(0, 0, 4, this.size.y);
      rect(0, 0, this.size.y, 2);
      
      
      
    
        midpoint = p5.Vector.lerp(node, prev_node, 0.5);
        // print(midpoint)
        rect(midpoint.x, midpoint.y, 4, 4);
        pop()
        // right_angle =
        // source
        // https://stackoverflow.com/a/52378449/5460870
        // len = p5.Vector.add(node,prev_node)
        // m = p5.Vector.dot(p5.Vector.sub(node,prev_node).div(p5.Vector.dot(prev_node,prev_node)))
        // right_angle = p5.Vector.mult(len,m)
        // rect(right_angle.x, right_angle.y,4,4)

        prev_normalized = prev_node.copy().normalize();
        current_normalize = node.copy().normalize();
        push()
        translate(300,300)
        line(0, 0, prev_normalized.x * 30, prev_normalized.y * 30);
        stroke(0,200,0)
        current_normalize
        line(0, 0, current_normalize.x * 30, current_normalize.y * 30);

        pop()
        // print(prev_normalized);
        
        // v1.angleBetween(v2);
        angleMode(DEGREES)
        print(prev_normalized.x)
        angle = prev_normalized.angleBetween(current_normalize)
        // angle from
        angledVector = p5.Vector.fromAngle(angle);
        
        // scale vector by factor
        // add to node point

      
    // }

    // todo begin shape
    //end shape
    pop();
  };

  push();
  for (var i in this.root) {
    this.pulsate += this.PULSATE_SPEED;

    // noStroke()
    fill(36, 25, 20,40); //"dark brown"
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
    jelly.target.add(direction.mult(backup));
  }, backupDelay);
// 
  setTimeout(() => {
    jelly.target.add(direction.mult(-1).mult(move));
  }, moveDelay);
}


function do_nothing(){}

function keyInput() {
  if(keyIsDown(RIGHT_ARROW)|| (key === "d")){move_animation(createVector(-1,0));}
  if(keyIsDown(LEFT_ARROW) || (key === "a")){move_animation(createVector(1,0));}
  if(keyIsDown(DOWN_ARROW) || (key === "s")){move_animation(createVector(0,-1));}
  if(keyIsDown(UP_ARROW)   || (key === "w")){move_animation(createVector(0,1));}

  // (keyIsDown(LEFT_ARROW) || key === "a" ? move_animation : do_nothing )(createVector(1, 0));
  // (keyIsDown(DOWN_ARROW) || key === "s" ? move_animation : do_nothing )(createVector(0,-1));
  // (keyIsDown(UP_ARROW)   || key === "w"  ? move_animation : do_nothing )(createVector(0, 1));

  
  ((key === "r" )? ()=>{target = createVector(0, 0)} : do_nothing )();
}
