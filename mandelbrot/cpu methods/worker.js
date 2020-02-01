var osc;

console.log('start');
var inbox;
var rmin;
var rmax;
var imin;
var imax;
var mcbwidth;
var mcbheight;
var ceiledheight;
var gs;
var c;
var mt;
var idb;
var id


function bake(a,b){
  mt.fillStyle = "rgb(" + gs + "," + gs + "," + gs + ")";
  mt.fillRect(Math.round(a),Math.round(b),1,1);

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

onmessage = function(ups){
  inbox = ups.data;
  rmin = inbox[0];
  rmax = inbox[1];
  imin = inbox[2];
  imax = inbox[3];
  mcbwidth = inbox[4];
  mcbheight = inbox[5];
  threadnr = inbox[6];
  totalthreads = inbox[7];

  osc = new OffscreenCanvas(mcbwidth,mcbheight);
  mt = osc.getContext('2d');
  //mt.translate(0.5,0.5);

  br = rmax - rmin;
  bi = imax - imin;

  rres = br/mcbwidth;
  ires = bi/mcbheight;

  b = threadnr*ires+imin;
  while (b <= imax) {
    a = rmin;
    while (a <= rmax) {
      if(inset(a,b)){
        gs=0;
        bake((a-rmin)/br*mcbwidth,mcbheight-(b-imin)/bi*mcbheight);
      }else{
        bake((a-rmin)/br*mcbwidth,mcbheight-(b-imin)/bi*mcbheight);
      }
      a += rres;
    }
  b += totalthreads*ires;
  }

  var outbox = osc.transferToImageBitmap();
  self.postMessage(outbox,[outbox]);
  console.log("done");
};
