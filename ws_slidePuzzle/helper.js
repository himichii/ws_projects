function clearCanvas(cc){
    cc.fillStyle=clearColor;
    cc.fillRect(0,0,cw,ch);
}

function drawRect(cc,x,y,w,h,color){
    cc.fillStyle=color;
    cc.fillRect(x,y,w,h);
}

function pointInRect(px,py,rx,ry,rw,rh){
    if(px>rx && px<rx+rw && py>ry && py<ry+rh){
        return true;
    }
    return false;
}
