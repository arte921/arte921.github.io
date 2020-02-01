{
let mcbwidth = window.innerWidth/2;
let mcbheight = window.innerHeight/2;

let rcenter = -0.7
let icenter = 0;
let br = 2.4;
let zoomfactor = 1.5;

let colorfactor = 1000;

let bi;
let rmin;
let imin;
let imax;
let rmax;
let loops=10000000;



function logmouse(clickevent){
	if(clickevent.clientX<mcbwidth && clickevent.clientY<mcbheight){
		rcenter=clickevent.clientX/mcbwidth*br+rmin;
		icenter=(mcbheight-clickevent.clientY)/mcbheight*bi+imin;
		br /= zoomfactor;
		render(rcenter,icenter,br);
	}
}

document.addEventListener("click",logmouse);

const gpu = new GPU();
const calc = gpu.createKernel(function(mcbwidth,mcbheight,rmin,rmax,imin,imax,loops,colorfactor){

  let ba = 0;
  let bb = 0;
  let ax = 0;
  let bx = 0;

  let br = rmax - rmin;
  let bi = imax - imin;

  let rres = br/mcbwidth;
  let ires = bi/mcbheight;

  const ac=rres*this.thread.x + rmin;
  const bc=ires*this.thread.y + imin;

  let gs = 0;

  let g=0;
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

  let go;
  let finish;
  go=new Date();

  bi = br*mcbheight/mcbwidth;


  rmin = rcenter-br/2;
  rmax = rcenter+br/2;
  imin = icenter-bi/2;
  imax = icenter+bi/2;

  let rres = br/mcbwidth;
  let ires = bi/mcbheight;



  calc(mcbwidth,mcbheight,rmin,rmax,imin,imax,loops,colorfactor);
  let canvas = calc.canvas;
	canvas.width=mcbwidth;
	canvas.height=mcbheight;

  document.getElementById('tdmandelbrot').appendChild(canvas);

  finish = new Date();
  console.log(finish-go);

}
render(rcenter,icenter,br);
}
