let circles = []

let num = 5

let initialLoc = []
let currentLoc = []

let at_initialLoc;

function setup() {
  createCanvas(400, 400);
  
  for (let i =0; i<num; i++)
  {
    circles.push(new Circle())
  }
  
  for (let i of circles)
  {
    initialLoc.push(i.target)

    print(i.target)
  }
}

function draw() 
{
  background(220);
  
  for (let i of circles)
  {
    i.increase()
    i.show()
    i.move()
  }
  
  //print(circles[0].pct)
}


function mousePressed()
{
  currentLoc = []
  
  for (let i of circles)
  {
    i.newTarget()
    
    currentLoc.push(i.target)
  }
}

function keyPressed() 
{
  if (keyCode === RETURN) 
  {
    //print("fdgdgdd")
    for (let i =0; i<num; i++)
    {
      circles[i].pct = 0.01
      circles[i].target = initialLoc[i]
      
      //print(initialLoc[i])
    }
  } 
}



class Circle
{
	constructor()
	{
		this.start = createVector(random(width), random(height))
		this.target = createVector(random(width), random(height))

		this.x = this.start.x
		this.y = this.start.y    
		this.r = random(10, 25)
		this.pct = 0.01
	}  

	show()
	{
		ellipse(this.x, this.y, this.r)
	}

	move()
	{
		this.x = this.x+ (this.target.x - this.x)*this.pct
		this.y = this.y+ (this.target.y - this.y)*this.pct
	}

	increase()
	{
		if (this.pct < 1) 
		{
			//linear
			//this.pct += 0.001

			//square root
  			this.pct = Math.sqrt(this.pct) * 0.2
		}
	}

	newTarget()
	{
		this.target = createVector(random(width), random(height))
		this.pct = 0.01
	}



	

}




