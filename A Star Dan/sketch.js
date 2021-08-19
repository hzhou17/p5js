
//close set contains nodes that have been evaluated

//open set are nodes that need to be evaluated

let openSet = []
let closedSet = []

let start, end

let w, h

let cols = 5

let rows = 5

let grid = new Array(cols)


function setup() 
{
	createCanvas(400, 400);
	colorMode(RGB, 1)
	w = width/rows
	h = height/cols


	for (let i=0; i<cols; i++)
	{
		grid[i] = new Array(rows);


		
	}






	for (let i=0; i<cols; i++)
	{
		for (let j=0; j<rows; j++)
		{
			grid[i][j] = new Spot(i, j)
		}
	}

	for (let i=0; i<cols; i++)
	{
		for (let j=0; j<rows; j++)
		{
			grid[i][j].addNeighbors(grid)
		}
	}


//----------------------------------------------------------------------

	start = grid[0][0]
	//print(start)

	end = grid[cols-1][rows-1]

	openSet.push(start)








}




//f(n) = g(n) + h(n)

function draw() 
{
	if (openSet.length > 0)
	{
		
		let winner = 0;

		for (let i=0; i<openSet.length; i++)
		{
			//current := the node in openSet having the lowest fScore[] value
			if (openSet[i].f < openSet[winner].f)
			{
				winner = i
			}
		}

		let current = openSet[winner]




		if (current === end)
		{
			print("Done")
		}

		//openSet.remove(current)

		//removeFromArray()


		removeFromArray(openSet, current)
		closedSet.push(current)


	}
	else
	{

	}




	for (let i=0; i<cols; i++)
	{
		for (let j=0; j<rows; j++)
		{
			grid[i][j].show(0.5)
		}
	}



	for (let i of openSet)
	{
		i.show(color(0,1,0))


	}






	for (let i of closedSet)
	{
		i.show(color(1,0,0))
	}
















}













class Spot
{
	constructor(i, j)
	{
		this.i = i
		this.j = j


		//f(n) = g(n) + h(n)
		this.f = 0
		this.g = 0
		this.h = 0

		this.neighbors = []
	}

	show(color)
	{
		stroke(0)
		fill(color)
		rect(this.x*w, this.y*h, w, h)

	}

	addNeighbors(grid)
	{
		let i = this.i
		let j = this.j

		if (i<cols-1) 	this.neighbors.push(grid[i+1][j])

		if (i>1) 		this.neighbors.push(grid[i-1][j])

		if (j<rows-1)    this.neighbors.push(grid[i][j+1])

		if (j>0) 		this.neighbors.push(grid[i][j-1])

		// if (i < cols - 1) this.neighbors.push(grid[i + 1][j])
  //   	if (i > 0)  this.neighbors.push(grid[i - 1][j]);

  //   	if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
      
  //   	if (j > 0) this.neighbors.push(grid[i][j - 1]);
      

		// if (i > 0 && j > 0) this.neighbors.push(grid[i - 1][j - 1]);
      

  //   	if (i < cols - 1 && j > 0) this.neighbors.push(grid[i + 1][j - 1]);

  //   	if (i > 0 && j < rows - 1) this.neighbors.push(grid[i - 1][j + 1]);
      
  //   	if (i < cols - 1 && j < rows - 1) this.neighbors.push(grid[i + 1][j + 1]);
      

    }

}

function removeFromArray(array, element)
{
	for (var i=array.length; i>=0; i--)
	{
		if (array[i] == element)
		{
			array.splice(i,1)
		}
	}
}