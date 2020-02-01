{
let mcbwidth = window.screen.width;
let mcbheight = window.screen.height;

let seed = Math.random();
document.getElementById('shadegenslider').value = seed*255;
let growfactor = 0.01;

let dist = 0;


const savegpu = new GPU();
let savecalc = savegpu.createKernel(function(mcbwidth,mcbheight,seed,dist){
    this.color(this.thread.x/mcbwidth,this.thread.y/mcbheight,seed);
}).setOutput([mcbwidth,mcbheight]).setGraphical(true);

const rendergpu = new GPU();
let rendercalc = savegpu.createKernel(function(mcbwidth,mcbheight,seed,dist){
    this.color(this.thread.x/mcbwidth,this.thread.y/mcbheight,seed);
}).setOutput([Math.round(mcbwidth/2),Math.round(mcbheight/2)]).setGraphical(true);

function rendershade(){
  seed=document.getElementById('shadegenslider').value/255;
  savecalc(mcbwidth,mcbheight,seed,dist);
	let canvas = savecalc.canvas;

  document.getElementById('tdshadegen').appendChild(savecalc.canvas);
}

function save(){
	seed=document.getElementById('shadegenslider').value/255;
  savecalc(mcbwidth,mcbheight,seed,dist);
  png = savecalc.canvas.toDataURL('image/png');

  let link = document.createElement('a')
  link.download = seed + '.png';
  link.href = png;
  link.click();
}

rendershade();
}
