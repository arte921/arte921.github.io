var canvasa = document.getElementById("ca");
var canvasb = document.getElementById("cb");
var canvasc = document.getElementById("cc");
var canvasd = document.getElementById("cd");

var ca = canvasa.getContext("bitmaprenderer");
var cb = canvasb.getContext("bitmaprenderer");
var cc = canvasc.getContext("bitmaprenderer");
var cd = canvasd.getContext("bitmaprenderer");

var rmin = -1.9;
var rmax = 0.5;
var imin = -1.2;
var imax = 1.2;

/*
var rmin = -0.75;
var rmax = -0.69;
var imin = 0.22;
var imax = 0.27;
*/

var br = rmax - rmin;
var bi = imax - imin;

var canvasaheight = canvasa.height;
var canvasawidth = canvasa.width;

var rres = br/canvasawidth;
var ires = bi/canvasaheight;

var x;
var y;

const workera = new Worker("worker.js");

workera.onmessage = function(data){
  ca.transferFromImageBitmap(data.data);
};

const workerb = new Worker("worker.js");

workerb.onmessage = function(data){
  cb.transferFromImageBitmap(data.data);
};

const workerc = new Worker("worker.js");

workerc.onmessage = function(data){
  cc.transferFromImageBitmap(data.data);
};

const workerd = new Worker("worker.js");

workerd.onmessage = function(data){
  cd.transferFromImageBitmap(data.data);
};

function kill(){
  workera.terminate();
  workerb.terminate();
  workerc.terminate();
  return "killed";
}

workera.postMessage([rmin,rmax,imin,imax,canvasawidth,canvasaheight,0,4]);
workerb.postMessage([rmin,rmax,imin,imax,canvasawidth,canvasaheight,1,4]);
workerc.postMessage([rmin,rmax,imin,imax,canvasawidth,canvasaheight,2,4]);
workerd.postMessage([rmin,rmax,imin,imax,canvasawidth,canvasaheight,3,4]);
