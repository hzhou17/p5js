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

		this.wall = false

		if (random(1) < 0.4)
		{
			this.wall = true
		}
	}

	show(color)
	{

		stroke(1)

		fill(color)

		if (this.wall)
		{
			fill(0)
		}


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

  

		if (i > 0 && j > 0) this.neighbors.push(grid[i - 1][j - 1]);
  

		if (i < cols - 1 && j > 0) this.neighbors.push(grid[i + 1][j - 1]);

		if (i > 0 && j < rows - 1) this.neighbors.push(grid[i - 1][j + 1]);

		if (i < cols - 1 && j < rows - 1) this.neighbors.push(grid[i + 1][j + 1]);
      

    }

}