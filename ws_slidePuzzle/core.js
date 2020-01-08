const clearColor="#061030";
const paddleColor="#EEEEEE";
const ballColor="#d63031";
const can=document.getElementById("can");
const cw=can.width;const ch=can.height;
var cc,game;

function init(){
    can.addEventListener("click",onClickOnCanvas);
    cc=can.getContext("2d");
    game=new Game();
    game.init();
}

function update(){
    clearCanvas(cc);
    game.update(cc);
    requestAnimationFrame(update);
}

function onClickOnCanvas(e){
    let mx=e.clientX;let my=e.clientY;
    let br=can.getBoundingClientRect();
    mx-=br.left;my-=br.top;
    game.onClick(mx,my);
}  


window.onload=function(){
    init();
    update();
}