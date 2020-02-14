var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var xw = 106;
var yw = 17;

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

function floor(inp){
  return inp - inp % BigInt(1);
}
function mod(b,s){
  return b % s;
}

function render(){
  console.log('begin');
  let xwb = BigInt(xw);
  let ywb = BigInt(yw);
  let drawx,drawy;
  let ymin = BigInt(BigInt(document.getElementById('input').value));
  let ymax = BigInt(document.getElementById('input').value) + ywb;


  for(let x=0;x<xw;x++){
    for(let y=ymin;y<ymax;y++){
      console.log(floor(mod(floor(y/BigInt(17)) / BigInt(2)**(-(BigInt(-17*Math.floor(x))-mod(floor(y),BigInt(17)))),BigInt(2))));
      if(
        1/2 < floor(mod(floor(y/BigInt(17)) / BigInt(2)**(-(BigInt(-17*Math.floor(x))-mod(floor(y),BigInt(17)))),BigInt(2)))
      ) {

        drawx = (xw-x-1)*size;
        drawy = (Number(y-ymin))*size;
        console.log(drawx,drawy,size,size);
        ctx.fillRect(drawx,drawy,size,size);
      }
    }
  }
  console.log('end');
}
render();
