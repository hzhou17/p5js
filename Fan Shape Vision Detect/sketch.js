const boids = []

let alignSlider, cohesionSlider, separationSlider

let periphery

function setup() 
{
	createCanvas(600, 400)
	colorMode(RGB, 1)
	periphery = PI/5


	alignSlider = createSlider(0, 5, 1.1, 0.1)
	cohesionSlider = createSlider(0, 5, 1.1, 0.1)
	separationSlider = createSlider(0, 5, 1.1, 0.1)

	for (let i = 0; i < 100; i++) 
	{
		boids.push(new Boid())
	}
}

function draw() 
{
	background(0.5)
	text(frameRate(), 100, 100)

	boids[0].color = color(0, 1, 1)

	for (let boid of boids) 
	{
		boid.edges()
		boid.flock(boids)
		boid.update()


		boid.show()

		if (boid == boids[0])
		{
			push()
				//noStroke()
				fill(1, 0, 0, 0.1)
				translate(boid.position.x, boid.position.y)
				rotate(boid.velocity.heading())

				//arc(x, y, w, h, start, stop, [mode], [detail])
				arc(0, 0, 200, 200, -periphery, periphery)
			pop()


			boid.mark_detected(boids, 100)
		}
	}
}




function mousePressed() {
  noLoop()
}

function mouseReleased() {
  loop()
}