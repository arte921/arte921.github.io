var input,output,i,length;
var mode = 'ff';
function update(){
  output='';
  input=document.getElementById('input').value;
  length=input.length;

  switch(mode){
    case 'ff':
    for(i=0;i<length;i++){
      if(i%2==0){
        output += input.charAt(i).toLowerCase();
      }else{
        output += input.charAt(i).toUpperCase();
      }
    }
    break;
  }
  document.getElementById('output').innerHTML = output;
}
