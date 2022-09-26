const boids = []

let obstacles = []

let alignSlider, cohesionSlider, separationSlider

let periphery

let fps = 0

function setup() 
{
	createCanvas(900, 400)
	colorMode(RGB, 1)
	periphery = PI/4


	alignSlider = createSlider(0, 5, 0, 0.1)
	cohesionSlider = createSlider(0, 5, 0, 0.1)
	separationSlider = createSlider(0, 5, 1, 0.1)

	for (let i = 0; i < 80; i++) 
	{
		boids.push(new Boid())
	}

	obstacles.push(new Obstacle(width/2, 120))
	obstacles.push(new Obstacle(width/2, 280))



}

function draw() 
{
	if (frameCount%10==0)
	{
		fps = floor(frameRate())
	}



	background(0.5)
	text(fps, 100, 100)

	boids[0].color = color(0, 1, 1)

	for (let boid of boids) 
	{
		boid.edges()


		//if (frameCount%2==0)
		{
			boid.flock(boids)
		}



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


	for (let o of obstacles)
	{
		o.show()
	}
}




function mousePressed() {
  noLoop()
}

function mouseReleased() {
  loop()
}