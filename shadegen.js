{
let screenwidth = window.screen.width;
let screenheight = window.screen.height;

let mcbwidth = document.body.clientWidth/2;
let mcbheight = document.body.clientHeight/2;

let seed = Math.random();
document.getElementById('shadegenslider').value = seed*255;
let growfactor = 0.01;

let dist = 0;


const savegpu = new GPU();
let savecalc = savegpu.createKernel(function(screenwidth,screenheight,seed,dist){
    this.color(this.thread.x/screenwidth,this.thread.y/screenheight,seed);
}).setOutput([screenwidth,screenheight]).setGraphical(true);

const rendergpu = new GPU();
let rendercalc = savegpu.createKernel(function(mcbwidth,mcbheight,seed,dist){
    this.color(this.thread.x/mcbwidth,this.thread.y/mcbwidth,seed);
}).setOutput([mcbwidth,mcbheight]).setGraphical(true);

function requestframe(){
	window.requestAnimationFrame(rendershade);
}

function rendershade(){
	let go = new Date();
  seed=document.getElementById('shadegenslider').value/255;
  rendercalc(mcbwidth,mcbheight,seed,dist);
	let canvas = rendercalc.canvas;

  document.getElementById('tdshadegen').appendChild(rendercalc.canvas);
	document.getElementById('shadegenbm').innerHTML=("Gradient rendered in " + (new Date()-go) + " ms");
}

function save(){
	seed=document.getElementById('shadegenslider').value/255;
  savecalc(screenwidth,screenheight,seed,dist);
  png = savecalc.canvas.toDataURL('image/png');

  let link = document.createElement('a')
  link.download = seed + '.png';
  link.href = png;
  link.click();
}


rendershade();

}
