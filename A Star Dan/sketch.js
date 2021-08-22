
//close set contains nodes that have been evaluated

//open set are nodes that need to be evaluated

let openSet = []
let closedSet = []

let start, end

let w, h

let cols = 30

let rows = 30

let grid = new Array(cols)

let current

let path = []



function setup() 
{

	createCanvas(500, 500)
	colorMode(RGB, 1)

	w = width/rows
	h = height/cols

	print(grid)




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
	end = grid[cols-1][rows-1]


	start.wall = false
	end.wall = false



	openSet.push(start)

}

//f(n) = g(n) + h(n)

function draw() 
{
	//background(0)

	if (openSet.length > 0)
	{
		
		let winnerIndex = 0;

		for (let i=0; i<openSet.length; i++)
		{
			//current := the node in openSet having the lowest fScore[] value
			if (openSet[i].f < openSet[winnerIndex].f)
			{
				winnerIndex = i
			}
		}

		current = openSet[winnerIndex]


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
      		let neighbor = neighbors[i];

	      // Valid next spot?
			if (!closedSet.includes(neighbor) && !neighbor.wall) 
			{
				let tentativeG = current.g + heuristic(neighbor, current)

			// Is this a better path than before?
				let newPath = false;

				if (openSet.includes(neighbor)) 
				{
					if (tentativeG < neighbor.g) 
					{
						neighbor.g = tentativeG;
						newPath = true;
					}
				} 

				else 
				{
					neighbor.g = tentativeG;
					newPath = true;
					openSet.push(neighbor);
				}

				// Yes, it's a better path
				if (newPath) 
				{
					neighbor.h = heuristic(neighbor, end);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.previous = current;
				}

			}

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
		}
	}


	for (let i = 0; i < closedSet.length; i++) 
	{
		closedSet[i].show(color(1, 0, 0));
	}

	for (let i = 0; i < openSet.length; i++) 
	{
		openSet[i].show(color(0, 1, 0));
	}

	// Find the path
	path = []
	let temp = current
	path.push(temp)


	//print(temp.previous)
	//backtrack the path, while there is a previous one, add it, 
	//and then set the current to that previous one. so on and so forth
	while (temp.previous) 
	{
		path.push(temp.previous);
		temp = temp.previous;

	}

	print(openSet.length)

	for (let i of path)
	{
		i.show(color(0,0,1))
	}

}









function removeFromArray(array, element)
{
	for (let i=array.length; i>=0; i--)
	{

		if (array[i] == element)
		{
			array.splice(i,1)
		}

	}
}

function heuristic(a, b)
{
	let d = dist(a.i, a.j, b.i, b.j)

	//let d = abs(a.i-b.i) + abs(a.j-b.j)

	return d
}