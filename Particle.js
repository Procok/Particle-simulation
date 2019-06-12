class Particle {
	constructor(pos, angle) {
		this.position = pos
		this.angle = angle
		this.color = color(0, 255, 0)
		this.lastPos = pos
	}

	edges() {
		if (this.position.x > width) {
			this.position.x = 0;
		} else if (this.position.x < 0) {
			this.position.x = width;
		}
		if (this.position.y > height) {
			this.position.y = 0;
		} else if (this.position.y < 0) {
			this.position.y = height;
		}
	}

	
	update(N, R, L) {
		var dangle = alpha + beta * N * Math.sign(R-L)
		this.angle += dangle
		var rangle = toRad(this.angle)
		this.position.add(createVector(Math.sin(rangle) * v, Math.cos(rangle) * v));
	}

	show(st = 8) {
		strokeWeight(st);
		stroke(this.color)
		//stroke()
		point(this.position.x, this.position.y);
		//line(this.position.x, this.position.y, this.lastPos.x, this.lastPos.y)
		//this.lastPos = this.position
	}
}
