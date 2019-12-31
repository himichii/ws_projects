const xsym="&times;";
const csym="&bigcirc;";
var Game=function(){
    var _=this;
    this.nodes=new Array();
    this.turn="x";
    this.turnCount=0;

    this.init=function(){
        let buts=document.getElementsByClassName("node");
        for(let i=0;i<buts.length;i++){
            let but=buts[i];
            let node={idx:i,elem:but,value:""};
            _.nodes.push(node);
            but.addEventListener("click",function(){_.onClickOnNode(node);});
        }
        _.reset();
    }

    this.onClickOnNode=function(node){
        if(node.value!="" || _.turn!="x")return;
        node.value=_.turn;
        node.elem.innerHTML=xsym;
        _.turnCount++;
        let set=_.setCompleteFor(_.turn);
        if(set){
            set.idxs.forEach(idx => {
                _.nodes[idx].elem.classList.add("node_anim");
            });
            setTimeout(function(){_.indicateWinner()},1000);
            return;
        }
        if(_.turnCount==9){
            alert("< Draw Game >");
            _.reset();
            return;
        }
        _.turn="o";
        _.cpuDecision();
    }

    this.cpuDecision=function(){
        let target=Math.floor(Math.random()*8);
        while(_.nodes[target].value!=""){
            target=Math.floor(Math.random()*8);
        }
        _.nodes[target].elem.classList.add("node_cpu");
        _.nodes[target].value="o";
        _.nodes[target].elem.innerHTML=csym;
        _.turnCount++;
        let set=_.setCompleteFor(_.turn);
        if(set){
            set.idxs.forEach(idx => {
                _.nodes[idx].elem.classList.add("node_anim");
            });
            setTimeout(function(){_.indicateWinner()},1000);
            return;
        }
        if(_.turnCount==9){
            alert("< Draw Game >");
            _.reset();
            return;
        }
        _.turn="x";
    }

    this.setCompleteFor=function(turn){
        if(_.nodes[0].value==turn && _.nodes[1].value==turn && _.nodes[2].value==turn){
            return {idxs:[0,1,2]};
        }
        if(_.nodes[3].value==turn && _.nodes[4].value==turn && _.nodes[5].value==turn){
            return {idxs:[3,4,5]};
        }
        if(_.nodes[6].value==turn && _.nodes[7].value==turn && _.nodes[8].value==turn){
            return {idxs:[6,7,8]};
        }
        if(_.nodes[0].value==turn && _.nodes[3].value==turn && _.nodes[6].value==turn){
            return {idxs:[0,3,6]};
        }
        if(_.nodes[1].value==turn && _.nodes[4].value==turn && _.nodes[7].value==turn){
            return {idxs:[1,4,7]};
        }
        if(_.nodes[2].value==turn && _.nodes[5].value==turn && _.nodes[8].value==turn){
            return {idxs:[2,5,8]};
        }
        if(_.nodes[0].value==turn && _.nodes[4].value==turn && _.nodes[8].value==turn){
            return {idxs:[0,4,8]};
        }
        if(_.nodes[2].value==turn && _.nodes[4].value==turn && _.nodes[6].value==turn){
            return {idxs:[2,4,6]};
        }
        return false;
    }

    this.reset=function(){
        for(let i=0;i<_.nodes.length;i++){
            let node=_.nodes[i];
            node.value="";
            node.elem.innerHTML=node.value;
            node.elem.classList.remove("node_cpu","node_anim");
        }
        _.turn="x";
        _.turnCount=0;
    }

    this.indicateWinner=function(){
        alert("< "+_.turn+" Wins >");
        _.reset();
    }

};

var game=new Game();
game.init();