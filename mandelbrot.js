var mcbwidth = window.innerWidth;
var mcbheight = window.innerHeight;

var rcenter = -0.7
var icenter = 0;
var br = 2.4;
var zoomfactor = 1.5;

var colorfactor = 1000;

var bi;
var rmin;
var imin;
var imax;
var rmax;
var loops=10000000;



function logmouse(clickevent){
  rcenter=clickevent.clientX/mcbwidth*br+rmin;
  icenter=(mcbheight-clickevent.clientY)/mcbheight*bi+imin;
  br /= zoomfactor;
  render(rcenter,icenter,br);
}

document.addEventListener("click",logmouse);

const gpu = new GPU();
const calc = gpu.createKernel(function(mcbwidth,mcbheight,rmin,rmax,imin,imax,loops,colorfactor){

  var ba = 0;
  var bb = 0;
  var ax = 0;
  var bx = 0;

  var br = rmax - rmin;
  var bi = imax - imin;

  var rres = br/mcbwidth;
  var ires = bi/mcbheight;

  const ac=rres*this.thread.x + rmin;
  const bc=ires*this.thread.y + imin;

  var gs = 0;

  var g=0;
  while(g<loops){
    if(Math.sqrt(Math.pow(ax,2)+Math.pow(bx,2))>2){

      gs = Math.sqrt(g/colorfactor*1);
      this.color(gs,gs,gs);
      g=loops+1;
    }
    ba = ax;
    bb = bx;
    ax = Math.pow(ba,2)-Math.pow(bb,2)+ac;
    bx = 2*ba*bb+bc;
    g+=1;
  }
  if(g==loops){
    this.color(0,0,0);
  }

}).setOutput([mcbwidth,mcbheight]).setGraphical(true);





function render(rcenter,icenter,br){
  //document.getElementById('mainframe').removeChild(document.getElementById('mainframe').childNodes[0]);

  var go;
  var finish;
  go=new Date();

  bi = br*mcbheight/mcbwidth;


  rmin = rcenter-br/2;
  rmax = rcenter+br/2;
  imin = icenter-bi/2;
  imax = icenter+bi/2;

  var rres = br/mcbwidth;
  var ires = bi/mcbheight;



  calc(mcbwidth,mcbheight,rmin,rmax,imin,imax,loops,colorfactor);
  const canvas = calc.canvas;

  document.getElementById('mainframe').appendChild(canvas);

  finish = new Date();
  console.log(finish-go);

}
render(rcenter,icenter,br);
