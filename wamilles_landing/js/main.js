$(function(){

	// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     ||  
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();
//
var canvas = document.getElementById("canvas");


var ctx = canvas.getContext("2d");


var W = window.innerWidth, H = window.innerHeight;
canvas.width = 2000;
canvas.height = 100;

// Some variables for later use
var particleCount = 60,
	particles = [],
	minDist = 70,
	dist;

// Function to paint the canvas black
function paintCanvas() {
	// Set the fill color to black
	ctx.fillStyle = "rgba(255,255,255,1)";
	
	// This will create a rectangle of white color from the 
	// top left (0,0) to the bottom right corner (W,H)
	ctx.fillRect(0,0,W,H);
}



function Particle() {
	
	this.x = Math.random() * W;
	this.y = Math.random() * H;
	
	
	// We would also need some velocity for the particles
	// so that they can move freely across the space
	this.vx = -1 + Math.random() * 2;
	this.vy = -1 + Math.random() * 2;

	// Now the radius of the particles. I want all of 
	// them to be equal in size so no Math.random() here..
	this.radius = 4;
	
	
	this.draw = function() {
		ctx.fillStyle = "rgba(120,0,8,0.7)";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		
		// Fill the color to the arc that we just created
		ctx.fill();
	}
}


for(var i = 0; i < particleCount; i++) {
	particles.push(new Particle());
}


function draw() {
	
	
	paintCanvas();
	
	
	for (var i = 0; i < particles.length; i++) {
		p = particles[i];
		p.draw();
	}
	
	//Finally call the update function
	update();
}

// Give every particle some life
function update() {
	
	
	for (var i = 0; i < particles.length; i++) {
		p = particles[i];
		
		// Change the velocities
		p.x += p.vx;
		p.y += p.vy
			
		
		if(p.x + p.radius > W) 
			p.x = p.radius;
		
		else if(p.x - p.radius < 0) {
			p.x = W - p.radius;
		}
		
		if(p.y + p.radius > H) 
			p.y = p.radius;
		
		else if(p.y - p.radius < 0) {
			p.y = H - p.radius;
		}
		
		
		for(var j = i + 1; j < particles.length; j++) {
			p2 = particles[j];
			distance(p, p2);
		}
	
	}
}

function distance(p1, p2) {
	var dist,
		dx = p1.x - p2.x,
		dy = p1.y - p2.y;
	
	dist = Math.sqrt(dx*dx + dy*dy);
			
	
	if(dist <= minDist) {
		
		
		ctx.beginPath();
		ctx.strokeStyle = "rgba(120,0,8,"+ (1.2-dist/minDist) +")";
		ctx.moveTo(p1.x, p1.y);
		ctx.lineTo(p2.x, p2.y);
		ctx.stroke();
		ctx.closePath();
		
		// Some acceleration for the partcles 
		// depending upon their distance
		var ax = dx/2000,
			ay = dy/2000;
		
		// Apply the acceleration on the particles
		p1.vx -= ax;
		p1.vy -= ay;
		
		p2.vx += ax;
		p2.vy += ay;
	}
}

function animloop() {
	draw();
	requestAnimFrame(animloop);
}

animloop();

//
}); $(function(){


/**
 * Generates random particles using canvas
 * 
 * @class Particles
 * @constructor
 */
function Particles(){
  //particle colors
  this.colors = [
    '255, 255, 255',
    '255, 99, 71',
    '19, 19, 19'
  ]
  //adds gradient to particles on true
  this.blurry = true;
  //adds white border
  this.border = false;
  //particle radius min/max
  this.minRadius = 10; 
  this.maxRadius = 30;
  //particle opacity min/max
  this.minOpacity = .005;
  this.maxOpacity = .3;
  //particle speed min/max
  this.minSpeed = .05;
  this.maxSpeed = .3;
  //frames per second 
  this.fps = 60;
  //number of particles
  this.numParticles = 75;
  //required canvas variables
  this.canvas = document.getElementById('header-canvas');
  this.ctx = this.canvas.getContext('2d');
}

/**
 * Initializes everything
 * @method init
 */
Particles.prototype.init = function(){
  this.render();
  this.createCircle();
}

/**
 * generates random number between min and max values
 * @param  {number} min value
 * @param  {number} max malue
 * @return {number} random number between min and max
 * @method _rand
 */
Particles.prototype._rand = function(min, max){
  return Math.random() * (max - min) + min;
}

/**
 * Sets canvas size and updates values on resize
 * @method render
 */
Particles.prototype.render = function(){ 
  var self = this,
      wHeight = $(window).height(),
      wWidth = $(window).width();
  
  self.canvas.width = wWidth;
  self.canvas.height = wHeight;
  
  $(window).on('resize', self.render);
}

/**
 * Randomly creates particle attributes
 * @method createCircle
 */
Particles.prototype.createCircle = function(){
  var particle = [];

  for (var i = 0; i < this.numParticles; i++) {
    var self = this,
        color = self.colors[~~(self._rand(0, self.colors.length))];
    
    particle[i] = {
      radius    : self._rand(self.minRadius, self.maxRadius),
      xPos      : self._rand(0, canvas.width),
      yPos      : self._rand(0, canvas.height),
      xVelocity : self._rand(self.minSpeed, self.maxSpeed),
      yVelocity : self._rand(self.minSpeed, self.maxSpeed),
      color     : 'rgba(' + color + ',' + self._rand(self.minOpacity, self.maxOpacity) + ')'
    }
    
    //once values are determined, draw particle on canvas
    self.draw(particle, i);
  }
  //...and once drawn, animate the particle
  self.animate(particle);
}

/**
 * Draws particles on canvas
 * @param  {array} Particle array from createCircle method
 * @param  {number} i value from createCircle method
 * @method draw
 */
Particles.prototype.draw = function(particle, i){
  var self = this,
      ctx = self.ctx;
  
  if (self.blurry === true ) {
    //creates gradient if blurry === true
    var grd = ctx.createRadialGradient(particle[i].xPos, particle[i].yPos, particle[i].radius, particle[i].xPos, particle[i].yPos, particle[i].radius/1.25);
    
    grd.addColorStop(1.000, particle[i].color);
    grd.addColorStop(0.000, 'rgba(34, 34, 34, 0)');
    ctx.fillStyle = grd;
  } else {
    //otherwise sets to solid color w/ opacity value
    ctx.fillStyle = particle[i].color; 
  }
  
  if (self.border === true) {
    ctx.strokeStyle = '#fff';
    ctx.stroke();
  }
  
  ctx.beginPath();
  ctx.arc(particle[i].xPos, particle[i].yPos, particle[i].radius, 0, 2 * Math.PI, false);
  ctx.fill();
}

/**
 * Animates particles 
 * @param  {array} particle value from createCircle & draw methods
 * @method animate
 */
Particles.prototype.animate = function(particle){
  var self = this,
          ctx = self.ctx;
  
  setInterval(function(){
    //clears canvas
    self.clearCanvas();
    //then redraws particles in new positions based on velocity
    for (var i = 0; i < self.numParticles; i++) {
      particle[i].xPos += particle[i].xVelocity;
      particle[i].yPos -= particle[i].yVelocity;
     
      //if particle goes off screen call reset method to place it offscreen to the left/bottom
      if (particle[i].xPos > self.canvas.width + particle[i].radius || particle[i].yPos > self.canvas.height + particle[i].radius) {
        self.resetParticle(particle, i);
      } else {
        self.draw(particle, i);
      }
    }  
  }, 1000/self.fps); 
}

/**
 * Resets position of particle when it goes off screen
 * @param  {array} particle value from createCircle & draw methods
 * @param  {number} i value from createCircle method
 * @method resetParticle
 */
Particles.prototype.resetParticle = function(particle, i){
  var self = this;
  
  var random = self._rand(0, 1);
  
  if (random > .5) { 
    // 50% chance particle comes from left side of window...
    particle[i].xPos = -particle[i].radius;
    particle[i].yPos = self._rand(0, canvas.height);
  } else {
    //... or bottom of window
    particle[i].xPos = self._rand(0, canvas.width);
    particle[i].yPos = canvas.height + particle[i].radius;   
  }
  //redraw particle with new values
  self.draw(particle, i);
}

/**
 * Clears canvas between animation frames
 * @method clearCanvas
 */
Particles.prototype.clearCanvas = function(){
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

 
// go go go!
var particle = new Particles().init(); 



});