var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var xw = 106;
var yw = 17;

var zo = new Array(xw*yw).fill(0);
console.log(zo);

if(window.innerWidth/xw<window.innerHeight/yw){
  size=Math.floor(window.innerWidth/xw);
}else{
  size=Math.floor(window.innerHeight/yw);
}

var mcbwidth = xw*size+1;
var mcbheight = yw*size+1;
canvas.width=mcbwidth;
canvas.height=mcbheight;

for(let h=0;h<=xw;h++){
  ctx.fillRect(h*size,0,1,yw*size);
}

for(let v=0;v<=yw;v++){
  ctx.fillRect(0,v*size,xw*size,1);
}

canvas.addEventListener('click',function(event){
  let x = Math.floor(event.offsetX/mcbwidth*xw);
  let y = Math.floor(event.offsetY/mcbheight*yw);
  let drawx = x*size;
  let drawy = y*size;

  let index = (x*yw+(yw-1)-y);
  console.log(index);
  if(zo[index]!=1){
    zo[index] = 1;
    ctx.fillRect(drawx,drawy,size,size);
  }else{
    zo[index] = 0;
    ctx.clearRect(drawx+1,drawy+1,size-1,size-1);
  }
  document.getElementById('output').innerHTML = bigInt(zo.join(''),2).toString();
});
