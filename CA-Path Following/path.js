class Path
{
	constructor()
	{
		this.point1 = createVector(20, 220)
		this.point2 = createVector(380, 180)
	}

	show()
	{
		line(this.point1.x, this.point1.y, this.point2.x, this.point2.y)
	}
}