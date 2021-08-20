
//close set contains nodes that have been evaluated

//open set are nodes that need to be evaluated

let openSet = []
let closedSet = []

let start, end

let w, h

let cols = 10

let rows = 10

let grid = new Array(cols)

let path = []

let current

function setup() 
{
	createCanvas(400, 400)
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

			//print(grid[i][j])
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
	//background(0)

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

		current = openSet[winner]


		if (current === end)
		{
			noLoop()
			print("Done")
		}


		removeFromArray(openSet, current)
		closedSet.push(current)



		let neighbors = current.neighbors

		for (let i=0; i<neighbors.length; i++)
		{
			let neighbor = neighbors[i]

			if (!closedSet.includes(neighbors))
			{
				//tentative_gScore := gScore[current] + d(current, neighbor)
				//1 is distance between current and neighbor. 1 in the current case.
				let tentative_gScore = current.g + 1 

				if (openSet.includes(neighbors))
				{
					if (tentative_gScore < neighbor.g)
					{
						neighbor.g = tentative_gScore
					}
				}
				else
				{
					neighbor.g = tentative_gScore
					openSet.push(neighbor)

				}
			}

			neighbor.h = heuristic(neighbor, end)

			neighbor.f = neighbor.g + neighbor.h


			neighbor.previous = current

		}

	}


	else 
	{
	    console.log('no solution');
	    noLoop();
	    return;
	}

		  // Draw current state of everything
  	background(1);




	for (let i=0; i<cols; i++)
	{
		for (let j=0; j<rows; j++)
		{

			grid[i][j].show(0.5)

			//print("hi")
		}
	}


  for (var i = 0; i < closedSet.length; i++) 
  {
    closedSet[i].show(color(1, 0, 0, 0.5));
  }

  for (var i = 0; i < openSet.length; i++) 
  {
    openSet[i].show(color(0, 1, 0, 0.5));
  }





	// // Find the path
	// path = []

	// //let temp = current



	// path.push(current)

	// //backtrack the path, while there is a previous one, add it, 
	// //and then set the current to that previous one. so on and so forth
	// if (current.previous) 
	// {

	// 	path.push(current.previous);
	// 	current = current.previous;
	// }

  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }



	

	print(path.length)
	for (let i of path)
	{
		i.show(color(0,0,1))
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

		this.previous = undefined
	}

	show(color)
	{

		stroke(1)

		fill(color)

		rect(this.i*w, this.j*h, w, h)
		//print("hello")

	}

	addNeighbors(grid)
	{

		let i = this.i
		let j = this.j


		if (i<cols-1) 	this.neighbors.push(grid[i+1][j])

		if (i>1) 		this.neighbors.push(grid[i-1][j])

		if (j<rows-1)   this.neighbors.push(grid[i][j+1])

		if (j>0) 		this.neighbors.push(grid[i][j-1])


//		if (i < cols - 1) this.neighbors.push(grid[i + 1][j])
//   	if (i > 0)  this.neighbors.push(grid[i - 1][j]);

//   	if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
  
//   	if (j > 0) this.neighbors.push(grid[i][j - 1]);
  

// 		if (i > 0 && j > 0) this.neighbors.push(grid[i - 1][j - 1]);
  

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

function heuristic(a, b)
{
	//let d = dist(a.i, a.j, b.i, b.j)

	let d = abs(a.i-b.i) + abs(a.j-b.j)

	return d
}