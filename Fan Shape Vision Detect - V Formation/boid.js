// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM
// https://editor.p5js.org/codingtrain/sketches/ry4XZ8OkN

class Boid 
{
    constructor() 
    {
        this.position = createVector(random(width), random(height))
        this.velocity = p5.Vector.random2D()
        this.velocity.setMag(random(2, 3))
        this.acceleration = createVector()
        this.maxForce = 0.1
        this.maxSpeed = 3
        this.color = color(1,1,1)
    }

    edges() 
    {
        if (this.position.x > width) 
        {
          this.position.x = 0
        } else if (this.position.x < 0) 
        {
          this.position.x = width
        }
        if (this.position.y > height) 
        {
          this.position.y = 0
        } else if (this.position.y < 0) 
        {
          this.position.y = height
        }
    }

    align(boids) 
    {
        let perceptionRadius = 50
        let steering = createVector()
        let total = 0
        for (let other of boids) 
        {
            let d = dist(this.position.x,this.position.y, other.position.x, other.position.y)
            if (other != this && d < perceptionRadius) 
            {
                steering.add(other.velocity)
                total++
            }
        }
        if (total > 0) 
        {
            steering.div(total)
            steering.setMag(this.maxSpeed)
            steering.sub(this.velocity)
            steering.limit(this.maxForce)
        }
        return steering
    }

    separation(boids) 
    {
        let perceptionRadius = 50
        let steering = createVector()
        let total = 0
        for (let other of boids) 
        {
            let d = dist(this.position.x,this.position.y, other.position.x, other.position.y)
          if (other != this && d < perceptionRadius) 
          {
            let diff = p5.Vector.sub(this.position, other.position)
            diff.div(d * d)
            steering.add(diff)
            total++
          }
        }
        if (total > 0) 
        {
          steering.div(total)
          steering.setMag(this.maxSpeed)
          steering.sub(this.velocity)
          steering.limit(this.maxForce)
        }
        return steering
    }

    cohesion(boids) 
    {
        let perceptionRadius = 50
        let steering = createVector()
        let total = 0
        for (let other of boids) 
        {
            let d = dist(this.position.x,this.position.y, other.position.x, other.position.y)
          if (other != this && d < perceptionRadius) 
          {
            steering.add(other.position)
            total++
          }
        }
        if (total > 0) 
        {
          steering.div(total)
          steering.sub(this.position)
          steering.setMag(this.maxSpeed)
          steering.sub(this.velocity)
          steering.limit(this.maxForce)
        }
        return steering
    }

    detect(boids)
    {
        let perceptionRadius = 50
        let steering = createVector()
        let orthoVec = createVector()

        let total = 0

        for (let other of boids) 
        {
            let diff =  p5.Vector.sub(other.position,this.position)
            let d = dist(this.position.x,this.position.y, other.position.x, other.position.y)

            let angle = diff.angleBetween(this.velocity)


            if (other != this && abs(angle) < periphery && d < perceptionRadius)
            {
                orthoVec.x = -diff.y
                orthoVec.y = diff.x 

                //print(orthoVec)

                steering.add(orthoVec)
                total++
            }

            if (total > 0)
            {
                steering.div(total)
                steering.setMag(this.maxSpeed)
                steering.sub(this.velocity)
                steering.limit(this.maxForce)
            }

            return steering
        }
    }


    flock(boids) 
    {
        let alignment = this.align(boids)
        let cohesion = this.cohesion(boids)
        let separation = this.separation(boids)
        let detect = this.detect(boids)

        alignment.mult(alignSlider.value())
        cohesion.mult(cohesionSlider.value())
        separation.mult(separationSlider.value())
        detect.mult(detectSlider.value())

        this.acceleration.add(alignment)
        this.acceleration.add(cohesion)
        this.acceleration.add(separation)
        this.acceleration.add(detect)
    } 


    update() 
    {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxSpeed)
        this.acceleration.mult(0)
    }


    show() 
    {
        push()
          noStroke()
          fill(this.color)
          translate(this.position.x, this.position.y)
          rotate(this.velocity.heading() + PI/2)
          triangle(0, -15, -3, 3, 3, 3)
        pop()
    }
}

    // if (abs(angle) < periphery && d < perceptionRadius)
    // {
    //     other.color = color(1, 0, 0)
    // }
    // else
    // {
    //     other.color = color(1, 1, 1)
    // }