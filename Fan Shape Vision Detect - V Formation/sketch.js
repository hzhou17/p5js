const boids = []

let alignSlider, cohesionSlider, separationSlider, detectSlider

let periphery

function setup() 
{
	createCanvas(500, 300)
	colorMode(RGB, 1)
	periphery = PI/4


	alignSlider = createSlider(0, 2, 1, 0.1)
	cohesionSlider = createSlider(0, 2, 0.9, 0.1)
	separationSlider = createSlider(0, 2, 1, 0.1)
	detectSlider = createSlider(0, 1000, 1, 10)

	for (let i = 0; i < 25; i++) 
	{
		boids.push(new Boid())
	}
}

function draw() 
{
	background(0.5)

	//boids[0].color = color(0, 1, 1)

	for (let boid of boids) 
	{
		boid.edges()
		boid.flock(boids)
		boid.update()


		boid.show()









		// if (boid == boids[0])
		// {
		// 	push()
		// 		//noStroke()
		// 		fill(1, 0, 0, 0.1)
		// 		translate(boid.position.x, boid.position.y)
		// 		rotate(boid.velocity.heading())

		// 		//arc(x, y, w, h, start, stop, [mode], [detail])
		// 		arc(0, 0, 200, 200, -periphery, periphery)
		// 	pop()


		// 	//boid.detect(boids)
		// }
	}
}




// function mousePressed() {
//   noLoop()
// }

// function mouseReleased() {
//   loop()
// }