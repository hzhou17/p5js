class Obstacle
{
	constructor(x, y)
	{

		this.position = createVector(x, y)

		this.radius = 65
	}




	show()
	{
		push()
			fill(1, 0.5)
			ellipse(this.position.x, this.position.y, this.radius*2)
		pop()
	}
}