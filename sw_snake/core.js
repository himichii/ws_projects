const step=120;
const clearColor="#061030";
const snakeColor="#EEEEEE";
const foodColor="#5521A0";
const can=document.getElementById("can");
const cw=can.width;const ch=can.height;
const ns=16;
const cuts=cw/ns;const ycuts=ch/ns;
var cc,snake;

function init(){
    window.addEventListener("keyup",onInput);
    cc=can.getContext("2d");
    snake=new Snake();
    snake.init(new Vec(Math.floor(cw/2/ns)*ns,Math.floor(ch/2/ns)*ns));
}

function update(){
    clearCanvas(cc);
    snake.update(cc);
}

function onInput(e){
    let keycode=e.keyCode;
    //left
    if(keycode==37){
        snake.setDest(-1,0);
    }
    //up
    if(keycode==38){
        snake.setDest(0,-1);
    }
    //right
    if(keycode==39){
        snake.setDest(1,0);
    }
    //down
    if(keycode==40){
        snake.setDest(0,1);
    }
}


init();
//update();
var game=setInterval(update,step);