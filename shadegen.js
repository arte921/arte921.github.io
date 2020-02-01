{
let mcbwidth = window.screen.width;
let mcbheight = window.screen.height;

let seed = Math.random();
document.getElementById('slider').value = seed*255;
let growfactor = 0.01;

let dist = 0;


const gpu = new GPU();
let calc = gpu.createKernel(function(mcbwidth,mcbheight,seed,dist){
    this.color(this.thread.x/mcbwidth,this.thread.y/mcbheight,seed);
}).setOutput([mcbwidth,mcbheight]).setGraphical(true);

function rendershade(){
  seed=document.getElementById('shadegenslider').value/255;
  calc(mcbwidth,mcbheight,seed,dist);
  document.getElementById('tdshadegen').appendChild(calc.canvas);
}

function save(){
	seed=document.getElementById('shadegenslider').value/255;
  calc(mcbwidth,mcbheight,seed,dist);
  png = calc.canvas.toDataURL('image/png');

  let link = document.createElement('a')
  link.download = seed + '.png';
  link.href = png;
  link.click();
}

rendershade();
}
