let pxx,pxy,x,y,i;

let canvas = document.getElementById('logmapcanvas');
let ctx = canvas.getContext('2d');
mcbheight = window.innerHeight/2;
mcbwidth = window.innerWidth/2;
canvas.width = mcbwidth
canvas.height = mcbheight;

let cx = 3.4;
let cy = 0.6;
let rx = 0.75;
let ry = rx*mcbheight/mcbwidth;

let xres = 2*rx/mcbwidth;
let yres = 2*ry/mcbheight;

function plot(mx,my){
	pxx = (mx-(cx-rx))/(2*rx)*mcbwidth;
	pxy = mcbheight-((my-(cy-ry))/(2*ry)*mcbheight);
	ctx.fillRect(pxx,pxy,1,1);
}
let go = new Date();
x=cx-rx;
y=0.5;
while (x<=cx+rx){
	for(i=0;i<1000;i++){
		y=x*y*(1-y);
		plot(x,y);
	}
	x += xres;
}
console.log(new Date()-go);
