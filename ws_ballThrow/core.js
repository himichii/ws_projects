const clearColor="#061030";
const goalColor="#5521A0";
const ballColor="#d63031";
const pointsColor="#F85253";
const can=document.getElementById("can");
const cw=can.width;const ch=can.height;
var mouseDown=false;var firstMP={};
var distanceMultiplier=3;
var cc,game;

function init(){
    can.addEventListener("mousedown",onMouseDown);
    can.addEventListener("mouseup",onMouseUp);
    can.addEventListener("mousemove",onMouseMove);
    cc=can.getContext("2d");
    game=new Game();
    game.init();
}

function update(){
    clearCanvas(cc);
    game.update(cc);
    requestAnimationFrame(update);
}

function onMouseDown(e){
    let mp=getMousePos(can,e);
    firstMP=mp;
    mouseDown=true;
}
function onMouseUp(){
    mouseDown=false;
    game.throwBall();
}
function onMouseMove(e){
    if(mouseDown){
        let mp=getMousePos(can,e);
        game.distance=(firstMP.mx-mp.mx)*distanceMultiplier;
        game.amplitude=mp.my-firstMP.my;
        game.calculatePointsPosition();
    }
}

init();
update();

