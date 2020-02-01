{
let pxx,pxy,x,y,i;

let canvas = document.getElementById('logmapcanvas');
let ctx = canvas.getContext('2d');
let mcbwidth = document.body.clientWidth/2;
let mcbheight = document.body.clientHeight/2;
canvas.width = mcbwidth;
canvas.height = mcbheight;

var cx = 3;
var cy = 0.5;
var rx = 1.1;
let ry = rx*mcbheight/mcbwidth;

var it=100;

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
	for(i=0;i<it;i++){
		y=x*y*(1-y);
		plot(x,y);
	}
	x += xres;
}
document.getElementById('logmapbm').innerHTML=("Logmap rendered in " + (new Date()-go) + " ms at " + it + " iterations.");
document.getElementById('resolution').innerHTML=("All renders are at a " + Math.round(mcbwidth) + " x " + Math.round(mcbheight) + " resolution.<br><br>The downloaded gradient will be at a " + window.screen.width + " x " + window.screen.height + " resolution.");
}
