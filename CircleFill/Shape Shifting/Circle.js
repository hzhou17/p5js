class Circle
{
  constructor(x, y)
  {
  this.x = x;
  this.y = y;
  this.r = 2.5;
  this.growing = true;
  
  this.pct = 0.01
  
  this.target = createVector(random(width), random(height))
  }
  

  
  

  grow()
  {
    if (this.growing) this.r += 1;
      
  }

  show() 
  {
    stroke('red');
    strokeWeight(1);
    noFill();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  };

  edges() 
  {
    return (
      this.x + this.r >= width ||
      this.x - this.r <= 0 ||
      this.y + this.r >= height ||
      this.y - this.r <= 0
    );
  };
  
  increase()
    {          
        if (this.pct < 1) 
        {
            this.pct = Math.sqrt(this.pct) * 0.2
        }
            
    }
  
  
    move()
    {          
    this.x = this.x+ (this.target.x - this.x)*this.pct
    this.y = this.y+ (this.target.y - this.y)*this.pct  
      
        //print("fjidjfdgjhdi")
    }
  
    newTarget()
    {          
    this.target = createVector(random(width), random(height))
    this.pct = 0.01     
    }  
}