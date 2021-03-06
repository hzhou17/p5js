//References: 

//https://github.com/CodingTrain/website/blob/master/CodingChallenges/CC_016_LSystem/P5/sketch.js. (L-System Set up)

//https://en.wikipedia.org/wiki/L-system (Rule for Koch curve)

//How to run: press the Generate button for a few times.

var current_index = 0;

var axiom = "FG";

var sentence = axiom;

var len = 10

var angle

var rules = [] 

rules[0] = 
{
  a: 'F',
  b: 'F−G+F+G−F'
}

rules[1] = 
{
  a: 'G',
  b: 'GG'
}

function generate() 
{
  current_index = sentence.length


  var nextSentence = '';

  for (var i = 0; i < sentence.length; i++) 
  {
    var current = sentence.charAt(i);
    var found = false;

    for (var j = 0; j < rules.length; j++) 
    {
      if (current == rules[j].a) 
      {
        found = true;
        nextSentence += rules[j].b;
        break;
      }

    }
    if (!found) 
    {
      nextSentence += current;
    }
  }

  sentence = nextSentence;
  createP(sentence);
  turtle();
}

function turtle(index)
{
  background(0.5)

  resetMatrix();

  //translate(0, height - 10)
  translate(0, 100)

  stroke(1)

  for (var i = 0; i < index; i++)
  {
    var current = sentence.charAt(i)

    if (current == "F" || current == "G")
    {
        line(0, 0, len, 0)

        translate(len, 0);
    }

    else if (current == '+')
    {
      rotate(-angle) 
    }

    else if (current == '−')
    {
      rotate(angle) 
    }
  }
}


function setup() 
{  

    angle = 2 * PI / 3

    createCanvas(700, 700);

    colorMode(RGB, 1)

    background(0.5)

    createP(axiom)

    turtle()

    var button = createButton("generate")

    button.mousePressed(generate)

}

function draw()
{
      if (current_index < sentence.length)
      {
        current_index += 1;

        turtle(current_index)
      }


}