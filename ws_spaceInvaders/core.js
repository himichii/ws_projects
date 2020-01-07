const clearColor="#121212";
const shipMissileColor="#FC427B";
const invaderMissileColor="#8854d0";
const can=document.getElementById("can");
const cw=can.width;const ch=can.height;
var leftkey=rightkey=false;
var cc,game;

function init(){
    window.addEventListener("keyup",onKeyUp);
    window.addEventListener("keydown",onKeyDown);
    cc=can.getContext("2d");
    game=new Game();
    game.init();
}

function update(){
    clearCanvas(cc);
    game.update(cc);
    requestAnimationFrame(update);
}

function onKeyDown(e){
    let keycode=e.keyCode;
    //left
    if(keycode==37){
        leftkey=true;
    }
    //right
    if(keycode==39){
        rightkey=true;
    }
    //space
    if(keycode==32){
        game.shipShootMissile();
    }
}

function onKeyUp(e){
    let keycode=e.keyCode;
    //left
    if(keycode==37){
        leftkey=false;
    }
    //right
    if(keycode==39){
        rightkey=false;
    }
}

window.onload=function(){
    init();
    update();
}