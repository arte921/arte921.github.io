var mcb = document.getElementById("ca");
var mc = mcb.getContext("2d");


var rmin = -1.9;
var rmax = 0.5;
var imin = -1.2;
var imax = 1.2;

br = rmax - rmin;
bi = imax - imin;

rres = br/mcb.width;
ires = bi/mcb.height;



function plot(x,y){
  mc.fillRect((x-rmin)/br*mcb.width,mcb.height-(y-imin)/bi*mcb.height,1,1);
}

function inset(ac,bc){

  ax = 0;
  bx = 0;
  loops = 1000;
  for(g=0;g<loops;g++){
    if(Math.sqrt(Math.pow(ax,2)+Math.pow(bx,2))>2){
      gs = Math.sqrt(g/loops)*255;
      return false;
    }
    ba = ax;
    bb = bx;
    ax = Math.pow(ba,2)-Math.pow(bb,2)+ac;
    bx = 2*ba*bb+bc;

  }
  return true;
}

b = imin;
while (b <= imax) {
  a = rmin;
  while ( a <= rmax ) {
    if(inset(a,b)){
      mc.fillStyle = "rgb(0,0,0)";
      plot(a,b);
    }else{
      mc.fillStyle = "rgb(" + gs + "," + gs + "," + gs + ")";
      plot(a,b);
    }
  a += rres;
  }
  b += ires;
}
