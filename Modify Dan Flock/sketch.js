const flock = [];

let alignSlider, cohesionSlider, separationSlider;

let periphery

function setup() 
{
	createCanvas(640, 360);
	colorMode(RGB, 1)
	periphery = PI/4


	alignSlider = createSlider(0, 2, 1, 0.1);
	cohesionSlider = createSlider(0, 2, 0.5, 0.1);
	separationSlider = createSlider(0, 2, 1, 0.1);

	for (let i = 0; i < 25; i++) 
	{
		flock.push(new Boid());
	}
}

function draw() 
{
	background(0.5);

	for (let boid of flock) 
	{
		boid.edges();
		boid.flock(flock);
		boid.update();
		boid.show();
		//boid.detect(flock)


		// if (boid == flock[0])
		// {
		// 	//boid.detect(flock)


		// 	push()
		// 		//noStroke()
		// 		fill(1, 0, 0, 0.1)
		// 		translate(boid.position.x, boid.position.y)
		// 		rotate(boid.velocity.heading())

		// 		//arc(x, y, w, h, start, stop, [mode], [detail])
		// 		arc(0, 0, 100, 100, 0, periphery)
		// 	pop()









			
		// }





	}
}