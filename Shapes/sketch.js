/****
64
made by twitter.com/mattywillo_ for twitter.com/sableRaph's #WCCChallenge topic: 64
dissects a hexacontatetragon into rhombs and moves them around
the dissection is possibly not actually correct, but i tried to generalise it. try chaging `sides` below
****/







const ngonOutAngle = (n) => 2*Math.PI/n;

const ngonLength = (n, r) => 2*r*Math.sin(Math.PI/n);

const rhombGeo = (l, a) => { let t = abs(sin(a)*l), u = abs(cos(a)*l); return [0, 0, t, u, 0, u*2, -t, u]};

const fanProps = (l, a, n) => Array(Math.ceil(n)).fill(0).reduce((acc, _, ci)=>[...acc, {length:l, angle:a*(ci+1), rhombLength:cos(a*(ci+1))*l*2, offset: ci<=0?0:ci==1?l:acc[ci-2].offset+acc[ci-2].rhombLength, aOffset:a*ci}], []);
const starProps = (l, a, n) => fanProps(l, a, Math.max(0, n/2-1)).map(x=>({...x, ...{count: n, range: Math.PI*2}}))

const cmyk = (c,m,y,k=0) => [(1-c)*(1-k), (1-m)*(1-k), (1-y)*(1-k)];

let monochrome = false; //change to true for a clearer picture of whats happening
let step = 0.00014;
let gt = 0.0;
let sides = 64;
let oangle = ngonOutAngle(sides);
let length = ngonLength(sides, 0.8);

function drawFans(props, trf = ()=>{}, mutf = x=>x) {
  props.forEach((x,i)=>{
    let p = {...x, ...mutf(x, i)};
    let geo = rhombGeo(p.length, p.angle);
    for(let k = 0; k < p.count; k++) {
      push();
      rotate(p.aOffset + (p.range/p.count) * k);
      translate(0, p.offset);
      trf(x, i, k);
      quad(...geo);
      pop();
    }
  })
}

function draw() {
  gt = (gt+step*deltaTime)%1;
	t = 1-abs((0.5-gt)*2);
  t = t*t*(3-2*t);

  scale(width/2, -height/2);
  translate(1, -1);
  background(0.92, 1.0);

  drawFans(starProps(length/2, oangle/2, sides).reverse(), (x,i,k)=>{
    scale(lerp(6, 1, t));
    if(monochrome) {
      strokeWeight(0.0005);
      stroke(0.3);
      fill(map(i, 0, sides/2, 0.6, 1))
    } else {
      noStroke();
      fill(...cmyk(0.7*sin(k*3), 0.7*sin(i*1), 0.7*sin(i+2)), 0.7);
    }
  }, (x,i) => {
		let lt = Math.min(1, map(t, 0, ((sides/2-i)/sides*2), 0, 1));
		return {
			length: lerp(0, x.length, lt),
			angle: lerp(0, x.angle, lt),
			aOffset: lerp(x.aOffset*2, x.aOffset, lt),
			offset: lerp(0, x.offset, lt)
		}});
}

function setup() {
  setAttributes('antialias', true);
  colorMode(RGB, 1);
  createCanvas(1024, 1024);
}


function ngonInAngle(n)
{
	return (n-2)*Math.PI/n; //polygon angle sum theorem
}


const ngonPoints = (n, r)=>Array(Math.ceil(n)).fill(0).map((x,i)=>({x:r*Math.cos(2*Math.PI*i/n), y:r*Math.sin(2*Math.PI*i/n)}));

function ngonPoint (n, r)
{
	renturn 
}