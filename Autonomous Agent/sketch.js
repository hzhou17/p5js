let agent

let target

let force, acc, pos, vel

let desired_vel

let maxSpeed = 1

let mass = 1


function setup() 
{
	createCanvas(400, 400);

	force = createVector()
	acc = createVector()
	pos = createVector()
	vel = createVector()


	agent = new Agent()


	target = createVector(random(width), random(height))



}

function draw() 
{
	background(0)

	ellipse(target.x, target.y, 10, 10)

	//force = ((pos.sub(target)).normalize()).mult(maxSpeed).mult(mass)

	force = p5.Vector.sub(target, pos).normalize().mult(mass)


	vel.add(force)
	//vel.limit(5)


	pos.add(vel)


	//print(force.x)


	agent.show()
}