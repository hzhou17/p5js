// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE

let koi_circles = [], dragon_circles = []
let koi_spots=[], dragon_spots=[];
let img1, img2;

let koi_finished = false, dragon_finished = false


let finished = false


let koi_circle_num = 0;
let dragon_circle_num = 0;

let maxNum = 700

let koiLoc = [], dragonLoc = []

function preload() 
{
  koi_img = loadImage('assets/koi.png');
  dragon_img = loadImage('assets/dragon.png');
}

// noprotect
function setup() 
{
  createCanvas(koi_img.width, koi_img.height);
  
  let density = displayDensity();
  pixelDensity(1);
  
  koi_img.loadPixels();  
  dragon_img.loadPixels();


  for (let x = 0; x < koi_img.width; x++) 
  {
    for (let y = 0; y < koi_img.height; y++) 
    {
      let index = x + y * koi_img.width;
      let c = koi_img.pixels[index * 4];
      let b = brightness([c]);
      if (b < 1) 
      {
        koi_spots.push(createVector(x, y));
      }
    }
  }
  
    for (let x = 0; x < dragon_img.width; x++) 
    {
      for (let y = 0; y < dragon_img.height; y++) 
      {
        let index = x + y * dragon_img.width;
        let c = dragon_img.pixels[index * 4];
        let b = brightness([c]);
        
        if (b < 1) 
        {
          dragon_spots.push(createVector(x, y));
        }
      }
    }

}

function draw() 
{
//--------------------------------------------------  
  if (dragon_finished && koi_finished) finished = true
    
//--------------------------------------------------  
  
  background(0);

  let total = 10;
  let count = 0;
  let attempts = 0;
//--------------------------------------------------
  if (koi_circle_num < maxNum)
  {
    while (count < total) 
  {
    let newC = k_newCircle();
    
    if (newC !== null) 
    {
      koi_circles.push(newC);
      count++;
      koi_circle_num++;
    }
    
    attempts++;
    
    if (attempts > 50) 
    {
      //noLoop();
      console.log('finished');
      finished = true
      
      break;
    }
    
    if (koi_circle_num > 1000) 
    {
      //noLoop();
      console.log('finished');
      
      finished = true
      
      break;
    }
  }

  }
  else koi_finished = true
  
//--------------------------------------------------  
  if (dragon_circle_num < maxNum)
  {
    while (count < total) 
  {
    let newC = d_newCircle();
    
    if (newC !== null) 
    {
      dragon_circles.push(newC);
      count++;
      dragon_circle_num++;
    }
    
    attempts++;
    
    if (attempts > 50) 
    {
      //noLoop();
      console.log('finished');
      finished = true
      
      break;
    }
    
    if (dragon_circle_num > 1000) 
    {
      //noLoop();
      console.log('finished');
      
      finished = true
      
      break;
    }
  }

  }
  else dragon_finished = true
  
  
//--------------------------------------------------  
  if (finished == false)
  {
      for (let i = 0; i < koi_circles.length; i++) {
    let circle = koi_circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (let j = 0; j < koi_circles.length; j++) {
          let other = koi_circles[j];
          if (circle !== other) {
            let d = dist(circle.x, circle.y, other.x, other.y);
            let distance = circle.r + other.r;

            if (d - 5 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
  }
  
  
  if (finished && koiLoc.length < 1000)
  {
    for (let i of koi_circles)
    {
      let location = createVector(i.x, i.y)
      
      koiLoc.push(location)
      
      //print(location)
    }
    
    
    for (let i of dragon_circles)
    {
      let location = createVector(i.x, i.y)
      
      dragonLoc.push(location)
      
      //print(location)
    }
    
    
    
    
    
  }
  
  
  
  
  
  
  
  
  
  if (finished)
  {
    for (let i = 0; i < koi_circles.length; i++)
    {
      koi_circles[i].increase()
      koi_circles[i].move()
      koi_circles[i].show();
    }
  }
  
}

function mousePressed()
{
  for (let i of koi_circles)
  {
    i.newTarget()

  }
}


function keyPressed() 
{
  if (keyCode === RETURN) 
  {
    for (let i =0; i<maxNum; i++)
    {
      koi_circles[i].pct = 0.01
      koi_circles[i].target = koiLoc[i]
    }
  } 
  
  if (keyCode === UP_ARROW) 
  {
    for (let i =0; i<maxNum; i++)
    {
      koi_circles[i].pct = 0.01
      koi_circles[i].target = dragonLoc[i]
    }
  } 
  
  if (keyCode === DOWN_ARROW) 
  {
    for (let i =0; i<maxNum; i++)
    {
      koi_circles[i].pct = 0.01
      koi_circles[i].target = koiLoc[i]
    }
  } 
  
  
}



function k_newCircle() {
  let r = int(random(0, koi_spots.length));
  let spot = koi_spots[r];
  let x = spot.x;
  let y = spot.y;

  let valid = true;
  for (let i = 0; i < koi_circles.length; i++) {
    let circle = koi_circles[i];
    let d = dist(x, y, circle.x, circle.y);
    if (d < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}


function d_newCircle() {
  let r = int(random(0, dragon_spots.length));
  let spot = dragon_spots[r];
  let x = spot.x;
  let y = spot.y;

  let valid = true;
  for (let i = 0; i < dragon_circles.length; i++) {
    let circle = dragon_circles[i];
    let d = dist(x, y, circle.x, circle.y);
    if (d < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}
