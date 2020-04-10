var mcbwidth = window.screen.width;
var mcbheight = window.screen.height;

var seed = Math.random();
document.getElementById('slider').value = seed*255;
var growfactor = 0.01;

var dist = 0;


const gpu = new GPU();
var calc = gpu.createKernel(function(mcbwidth,mcbheight,seed,dist){
    this.color(this.thread.x/mcbwidth,this.thread.y/mcbheight,seed);
}).setOutput([mcbwidth,mcbheight]).setGraphical(true);

function render(){
  seed=document.getElementById('slider').value/255;
  calc(mcbwidth,mcbheight,seed,dist);
  document.getElementById('mainframe').appendChild(calc.canvas);
}

function save(){
	seed=document.getElementById('slider').value/255;
  calc(mcbwidth,mcbheight,seed,dist);
  png = calc.canvas.toDataURL('image/png');

  var link = document.createElement('a')
  link.download = seed + '.png';
  link.href = png;
  link.click();
}

render();
