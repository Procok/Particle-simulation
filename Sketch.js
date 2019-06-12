const rc = Math.PI / 180

const particles = [];
let visualize = false

let quadTree = undefined


let alpha = 180
let beta = 17
let v = 0.67
let r = 5


function setup() {
	//createCanvas(window.innerWidth - 20, window.innerHeight - 20);
	createCanvas(400, 400)
	frameRate(60)
	createParticles(400)
	background(0)
}

function draw() {
	
	background(color(0, 0, 0, 130))
	var bound = new Rectangle(0, 0, width, height)
	bound.visualize = visualize
	quadTree = new QuadTree(bound)
	quadTree.insertRange(particles)
	for (let particle of particles) {
		var c = new Circle(particle.position.x, particle.position.y, r)
		var N = quadTree.query(c)
		var R = 0, L = 0
		var x1 =  Math.sin(toRad(particle.angle) * r)
		var x2 =  Math.sin(toRad(-particle.angle) * r)
		var y1 =  Math.cos(toRad(particle.angle) * r)
		var y2 =  Math.cos(toRad(-particle.angle) * r)
		for(var i = 0; i < N.length; i++){
			var n = N[i]
			var d = (n.position.x - x1) * (y2 - y1) - (n.position.y - y1) * (x2 - x1)
			if(d > 0){
				R++
			}
			else if(d < 0){
				L++
			}
		}
		particle.update(N.length, R, L)
		particle.edges()
		particle.show(8)
	}
	if (mouseIsPressed) {
		if (mouseButton === LEFT) {
			
		}
		if (mouseButton === RIGHT) {
			
		}
	}
}






function createParticles(num) {
	for (let i = 0; i < num; i++) {
		particles.push(new Particle(createVector(random(width / 20, width - width / 20), random(height / 20, height - height / 20)), random(0, 360)));
	}
}

function removeParticles(num) {
	if (num > particles.length){
		return
	}
	for (let i = 0; i < num; i++){
		particles.splice(Math.floor(random(0, particles.length)), 1)
	}
}


function toRad(angle){
	return angle * rc
}
