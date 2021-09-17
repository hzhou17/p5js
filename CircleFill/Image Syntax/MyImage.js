class myImage extends p5.Image
{

    constructor(width, height, pixels)
    {    
        super(width, height, pixels)
        this.spots = []

    }
  

    loadPixels()
    {
        super.loadPixels()
    }


}