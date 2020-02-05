var mcbwidth = document.body.clientWidth;
var mcbheight = document.body.clientHeight;

var canvas = document.getElementById('canvas');
canvas.width = mcbwidth;
canvas.height = mcbheight;
var ctx = canvas.getContext('2d');
var mousedown=false;

var a;
var b;

var bw = mcbwidth/5;
const xo = mcbwidth/2-bw/2;
const yo = mcbheight/2;
//xo+bw/2
var x = Math.round(xo+Math.random()*bw*0.8+bw*0.1);
var y = yo;

ctx.fillStyle='rgb(100,100,100)';
ctx.fillRect(mcbwidth/2-bw/2,mcbheight/2-2,bw,4);

ctx.fillStyle='rgb(200,200,200)';
ctx.lineWidth=5;

ctx.font = Math.round(mcbwidth/20) + 'px Times New Roman';


function draw(x,y,realy){
  ctx.fillStyle='rgb(200,200,200)';
  ctx.clearRect(0,0,mcbwidth,mcbheight);
  ctx.fillRect(xo,yo-2,bw,4);
  ctx.beginPath();
  ctx.arc(x,y,20,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle='rgb(0,0,0)';

  a=x/mcbwidth*500-200;
  b=-y/mcbheight*500+250;
  if(realy && b != 0){
    ctx.fillText(Math.round(a) + ' + ' + Math.round(b) + 'i%',0,Math.round(mcbwidth/20));
  }else{
    ctx.fillText(Math.round(a) + '%',0,Math.round(mcbwidth/20));
  }

}

canvas.onmousedown=function(){
  mousedown=true;
}
canvas.onmouseup=function(){
  mousedown=false;
}

document.onmousemove=function(event){
  if(mousedown){
    x=event.offsetX;
    y=event.offsetY;
    if(x>xo && x<xo+bw && y<yo+10 && y>yo-10){
      draw(x,yo,false);
    }else{
      draw(x,y,true);
    }
  }
}

draw(x,y);
