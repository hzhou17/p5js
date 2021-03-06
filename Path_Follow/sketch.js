// From "The Nature of Code" by Daniel Shiffman, 2012
// www.natureofcode.com

// Example 6.6 page 
// Path following

// Translated from Processing
// www.skolekoding.no/eksempler-nc-p5js
// Stein Olav Kivle

let vehicle;
let path;

function setup() 
{
    createCanvas(600, 200);
    let startX = width / 3;
    let startY = random(height / 3, height * 2 / 3)

    vehicle = new Vehicle(startX, startY);

    path = new Path();


    for (let i=0; i<=2*PI+0.1; i+=0.1)
    {
        path.addPoint(50*sin(i)+300, 50*cos(i)+100)
    }
}

function draw() {
  background(220);

  path.display();

  vehicle.follow(path);
  vehicle.update();
  vehicle.display();
}

function mousePressed() 
{
  vehicle = new Vehicle(mouseX, mouseY);
}

function keyPressed() 
{
  if (keyCode === 32) { //Space key 
    path = new Path();
    path.addPoint(0, random(height));
    path.addPoint(100, random(height));
    path.addPoint(300, random(height));
    path.addPoint(500, random(height));
    path.addPoint(600, random(height));
  }
}

// Classes Path and Vehicle in separate files to the left