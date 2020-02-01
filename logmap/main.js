var pxx,pxy,x,y,i;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var mcbheight = window.innerHeight;
var mcbwidth = window.innerWidth;
canvas.width = mcbwidth
canvas.height = mcbheight;

var cx = 3.4;
var cy = 0.6;
var rx = 0.75;
var ry = rx*mcbheight/mcbwidth;

var xres = 2*rx/mcbwidth;
var yres = 2*ry/mcbheight;

function plot(mx,my){
	pxx = (mx-(cx-rx))/(2*rx)*mcbwidth;
	pxy = mcbheight-((my-(cy-ry))/(2*ry)*mcbheight);
	ctx.fillRect(pxx,pxy,1,1);
}
var go = new Date();
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
