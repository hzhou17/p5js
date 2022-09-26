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

    align(boids, radius) 
    {
        let steering = createVector()
        let total = 0
        for (let other of boids) 
        {
            let comparison =  p5.Vector.sub(other.position,this.position)
            let d = dist(this.position.x,this.position.y, other.position.x, other.position.y)
            let angle = comparison.angleBetween(this.velocity)

            if (other != this && abs(angle) < periphery && d < radius) 
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

    separation(boids, radius) 
    {
        let steering = createVector()
        let total = 0
        for (let other of boids) 
        {
            let comparison =  p5.Vector.sub(other.position,this.position)           
            let angle = comparison.angleBetween(this.velocity)
            let d = dist(this.position.x,this.position.y, other.position.x, other.position.y)

            //if (other != this && abs(angle) < periphery && d < radius) 
            if (other != this && d < radius) 
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

    cohesion(boids, radius) 
    {
        let steering = createVector()
        let total = 0
        for (let other of boids) 
        {
            let comparison =  p5.Vector.sub(other.position,this.position)
            let d = dist(this.position.x,this.position.y, other.position.x, other.position.y)
            let angle = comparison.angleBetween(this.velocity)


            if (other != this && abs(angle) < periphery && d < radius) 
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
 
    queue(boids, radius)
    {
        let steering = createVector()
        let total = 0
        for (let other of boids) 
        {
            let comparison =  p5.Vector.sub(other.position,this.position)
            let d = dist(this.position.x,this.position.y, other.position.x, other.position.y)
            let angle = comparison.angleBetween(this.velocity)


            if (other != this && abs(angle) < periphery && d < radius) 
            {
                steering = this.velocity.mult(-1)

                //
                this.maxSpeed = 0
            }
            else
            {
                this.maxSpeed = 3
            }



        }
            let mag = steering.mag()

            steering.normalize().mult(min(mag, this.maxSpeed))

            steering.limit(this.maxForce)

        return steering
    }

    seek()
    {
        let steering = 
            createVector(mouseX-this.position.x, mouseY-this.position.y)

        let d = dist(this.position.x,this.position.y, mouseX, mouseY) 
        
        if (d < 100)
        {
            this.maxSpeed = map(d, 50, 100, 0, 3)
            this.maxForce = map(d, 50, 100, 0, 0.1)
        }
        else  
        {
            this.maxSpeed = 3
            this.maxForce = 0.1
        }


        steering.setMag(this.maxSpeed)
        steering.limit(this.maxForce)

        return steering
    }

    avoid()
    {
        let steering = createVector()


        let normalA = createVector()
        let normalB = createVector()

        let mouse = createVector(mouseX, mouseY)

        let clearance = 20

        for (let o of obstacles)
        {
            let d = dist(this.position.x,this.position.y, o.position.x, o.position.y)
            let comparison =  p5.Vector.sub(o.position,this.position)
            let angle = comparison.angleBetween(this.velocity)

            let target = p5.Vector.sub(mouse, this.position)


            //if (d < o.radius + clearance)
            if (abs(angle) < PI/6 && d < o.radius + clearance)
            {
                steering = p5.Vector.sub(this.position, o.position)
            }

            normalA.x = -steering.y
            normalA.y = steering.x

            // normalB.x = steering.y
            // normalB.y = -steering.x

            // let normalA_angle = normalA.angleBetween(target)
            // let normalB_angle = normalB.angleBetween(target)

            // if (normalA_angle > normalB_angle)
            // {
            //     steering = normalB
            // }
            // else steering = normalA

        }

        // steering.setMag(this.maxSpeed)
        // steering.limit(this.maxForce)

        return normalA
    }



    detect(other, radius)
    {
        let comparison =  p5.Vector.sub(other.position,this.position)
        let d = dist(this.position.x,this.position.y, other.position.x, other.position.y)
        let angle = comparison.angleBetween(this.velocity)


        if (abs(angle) < periphery && d < radius)
        {
            return true
        }
        else
        {
            return false
        }
    }

    mark_detected(boids, radius)
    {
        for (let other of boids) 
        {
            let comparison =  p5.Vector.sub(other.position,this.position)
            let d = dist(this.position.x,this.position.y, other.position.x, other.position.y)

            let angle = comparison.angleBetween(this.velocity)


            if (abs(angle) < periphery && d < radius)
            {
                other.color = color(1, 0, 0)
            }
            else
            {
                other.color = color(1, 1, 1)
            }
        }
    }

    flock(boids) 
    {
        let alignment = this.align(boids, 50)
        let cohesion = this.cohesion(boids, 50)
        let separation = this.separation(boids, 50)
        let queue = this.queue(boids, 15)
        let seek = this.seek()
        let avoid = this.avoid()

        alignment.mult(alignSlider.value())
        cohesion.mult(cohesionSlider.value())
        separation.mult(separationSlider.value())

        avoid.mult(10)

        this.acceleration.add(alignment)
        this.acceleration.add(cohesion)
        this.acceleration.add(separation)
        this.acceleration.add(queue)
        this.acceleration.add(seek)
        this.acceleration.add(avoid)
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