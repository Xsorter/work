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
		ctx.fillStyle = "rgba(120,5,22,1)";
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
});