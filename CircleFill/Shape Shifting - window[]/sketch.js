// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE
let img1, img2, img3

let images = [];

let finished = false

let maxNum = 700

let current_image_index = 0


function preload() 
{
	img1 = loadImage('assets/koi.png')
	img2 = loadImage('assets/dragon.png')
	img3 = loadImage('assets/dragon1.png')	
}

function setup()
{
	createCanvas(img1.width, img1.height)
	colorMode(RGB, 1)


	let density = displayDensity()
	pixelDensity(1)


	images.push(img1)
	images.push(img2)
	images.push(img3)

  	for(let i=0; i<images.length; i++)
	{
		window['spots_' + i] = []

		window['circle_num' + i] = 0

		window['planned_circles' + i] = []

		window['planned_loc' + i] = []

		window['finished' + i] = false
	}


  	for(let i=0; i<images.length; i++)
	{

		images[i].loadPixels()


		for (let x = 0; x < images[i].width; x++) 
		{
			for (let y = 0; y < images[i].height; y++) 
			{
				let index = x + y * images[i].width

				let c = images[i].pixels[index*4]
				let b = brightness([c])

				if (b < 1) 
				{
					window['spots_'+i].push(createVector(x, y))
				}
			}
		}
	}
}


function draw() 
{
//--------------------------------------------------  
	if (finished0 && finished1 && finished2) finished = true
    
	print(finished2)
//--------------------------------------------------  
  
	background(0);

	let total = 10;
	let count = 0;
	let attempts = 0;
//--------------------------------------------------


  	for(let i=0; i<images.length; i++)
	{
		if (window['circle_num' + i] < maxNum)
		{
			while (count < total) 
		  	{
			    let newC = newCircle(i, window['spots_' + i]);
			    
			    if (newC !== null) 
			    {
					window['planned_circles' + i].push(newC);
					count++;
					window['circle_num' + i]++;
			    }
			    
			    attempts++;
			    
			    if (attempts > 50) 
			    {
					//noLoop();
					console.log('finished');
					finished = true

					break;
			    }
			    
			    if (circle_num0 > 1000) 
			    {
					//noLoop();
					console.log('finished');

					finished = true

					break;
			    }
			}

		}

		else window['finished' + i] = true
	}
  
  
//--------------------------------------------------  
	if (finished == false)
	{
		for (let i = 0; i < planned_circles0.length; i++) 
		{
			let circle = planned_circles0[i];

			if (circle.growing) 
			{
		  		if (circle.edges()) 
		  		{
		    		circle.growing = false;
		  		} 
		  		else 
		  		{
		    		for (let j = 0; j < planned_circles0.length; j++) 
		    		{
		      			let other = planned_circles0[j];

		      			if (circle !== other) 
		      			{
		        			let d = dist(circle.x, circle.y, other.x, other.y);
		        			let distance = circle.r + other.r;
		        		
		       	

					        if (d - 5 < distance) 
					        {
					          circle.growing = false;
					          break;
					        }
					    }    
					}
				}
	    	}


			circle.show()
			circle.grow()
	    }
	}
  
	if (finished && planned_loc0.length < 1000)
	{
		for (let i=0; i<images.length; i++)
		{
			for (let j of window['planned_circles'+i])
			{
				let location = createVector(j.x, j.y)

				window['planned_loc'+i].push(location)
			}
		}
	}
  

  if (finished)
	{
		for (let i = 0; i < planned_circles0.length; i++)
		{
			planned_circles0[i].increase()
			planned_circles0[i].move()
			planned_circles0[i].show()
		}
	}
  

}


function mousePressed()
{
	for (let i of planned_circles0)
	{
		i.newTarget()
	}
}



function keyPressed() 
{
	if (keyCode === RETURN) 
	{
		current_image_index += 1
		if (current_image_index == images.length) current_image_index = 0

		for (let i =0; i<maxNum; i++)
		{
			planned_circles0[i].pct = 0.01
			planned_circles0[i].target = 
				window['planned_loc'+current_image_index][i]
		}
	} 

	// if (keyCode === UP_ARROW) 
	// {
	// 	for (let i =0; i<maxNum; i++)
	// 	{
	// 		planned_circles0[i].pct = 0.01
	// 		planned_circles0[i].target = planned_loc1[i]
	// 	}
	// } 

	// if (keyCode === DOWN_ARROW) 
	// {
	// 	for (let i =0; i<maxNum; i++)
	// 	{
	// 		planned_circles0[i].pct = 0.01
	// 		planned_circles0[i].target = planned_loc0[i]
	// 	}
	// } 
  
  
}


function newCircle(index, image_spots) 
{
	let r = int(random(0, image_spots.length))
	let spot = image_spots[r]
	let x = spot.x
	let y = spot.y

	let valid = true;

	for (let i = 0; i < window['planned_circles' + index].length; i++) 
	{
		let circle = window['planned_circles' + index][i]
		let d = dist(x, y, circle.x, circle.y)

		if (d < circle.r) 
		{
			valid = false
			break;
		}
	}

	if (valid) 
	{
		return new Circle(x, y)
	} 
	else 
	{
		return null
	}
}


