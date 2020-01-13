function clearCanvas(cc){
    cc.fillStyle=clearColor;
    cc.fillRect(0,0,cw,ch);
}

function drawRect(cc,x,y,w,h,color){
    cc.fillStyle=color;
    cc.fillRect(x,y,w,h);
}
function drawCircle(cc,x,y,r,color){
    cc.fillStyle=color;
    cc.beginPath();
    cc.arc(x,y,r,0,2*Math.PI);
    cc.fill();
}

function getMousePos(can,e){
    let mx=e.clientX;let my=e.clientY;
    let br=can.getBoundingClientRect();
    return {mx:mx-br.left,my:my-br.top};
}