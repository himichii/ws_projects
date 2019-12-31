function clearCanvas(cc){
    cc.fillStyle=clearColor;
    cc.fillRect(0,0,cw,ch);
}

function drawRect(cc,x,y,w,h,color){
    cc.fillStyle=color;
    cc.fillRect(x,y,w,h);
}

var Vec=function(x,y){
    this.x=x;this.y=y;
};
