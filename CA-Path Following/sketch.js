let path



let arrowPos, ro, rd, height, oClosest, sp



// this.point1 = createVector(20, 220)
// this.point2 = createVector(380, 180)




function setup() 
{
	createCanvas(400, 400);
	colorMode(RGB, 1)

	arrowPos = createVector(100, 100)
	path = new Path()

	ro = arrowPos.copy().sub(path.point1)



	rd = path.point2.copy().sub(path.point1)

	// let rd_copy = rd.copy().normalize();

	// let v = (ro).cross(rd)
	// height = v.mag()/rd.mag()

 // 	let sine = v.mag()/(ro.mag() * rd.mag())


	 sp = drawScalar(ro, rd)

	 print(length)


	//print(rd)


}

function draw() 
{
	background(0.5)

		//triangle(5, 0, -5, 0, 0, -25)
	ellipse(100, 100, 5*2)


	path.show()


	ellipse(path.point1.x + sp.x, path.point1.y + sp.y, 10)
}



function drawScalar(a, b)
{
	  let bCopy = b.copy().normalize()
	  
	  //https://en.wikipedia.org/wiki/Scalar_projection
	  //lenght = ||a|| * cos(theta). cos(theta) = dot(a, b)/||a||||b||
	  
	  let length = a.dot(b)/b.mag()
	  
	  //return a vector with the same direction as b, but new length
	  return bCopy.mult(length)
}

function scalarLength(a,b)
{
	  let bCopy = b.copy().normalize()
	  
	  //https://en.wikipedia.org/wiki/Scalar_projection
	  //lenght = ||a|| * cos(theta). cos(theta) = dot(a, b)/||a||||b||
	  
	  let length = a.dot(b)/b.mag()
	  
	  //return a vector with the same direction as b, but new length
	  return length
 }