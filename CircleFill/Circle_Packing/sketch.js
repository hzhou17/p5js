let circles = []

let radiusMin = 5

let maxNum = 500

let circleNum = 0

function setup() 
{
	createCanvas(500, 360);
	colorMode(RGB, 1)
	noFill()
} 
    

function draw()
{
	background(0.5)

	//circles.push(new Circle(random(width), random(height)))

	if (circleNum < maxNum)
	{
		let circle = newCircle()
		circleNum += 1
	}

	//print(circleNum)
	// if (circle !== null)
	// {
	// 	circles.push(circle)
	// }

	for (let i of circles)
	{
		if (i.growing) //if a circle is growing, 2 conditions to stop growing
		{
			if (i.onEdges()) i.growing = false

			else
			{
				for (let j of circles)
				{
					if (i != j) //every other circle. not itself
					{
						let d = dist(i.x, i.y, j.x, j.y)

						if (d < i.r + j.r)
						{
							i.growing = false

							break
						}
					}	
				}
			}
		}


		i.show()
		i.grow()
	}
}
    
  



function newCircle()

{
	let x = random(width)
	let y = random(height)

	let valid = true

	for (let i of circles)
	{

		let d = dist(x, y, i.x, i.y)

		if (d < i.r + radiusMin)
		{
			valid = false
			break
		}
	}


	if (valid) circles.push(new Circle(x,y))

	else return null

}


class Circle
{
	constructor(x, y)
	{
		this.x = x
		this.y = y
		this.r = radiusMin

		this.growing = true
	}

	show()
	{
		ellipse(this.x, this.y, this.r*2, this.r*2)
	}

	grow()
	{
		if (this.growing)
		{
			this.r += 1
		}
	}

	onEdges()
	{
		return (this.x-this.r < 0	  || 
				this.x+this.r > width || 
				this.y-this.r < 0     ||  
				this.y+this.r > height)
	}

}