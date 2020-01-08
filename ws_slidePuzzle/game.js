var Game=function(){
    var _=this;
    this.img=document.getElementById("img");
    this.imgWidth=_.img.width;
    this.imgHeight=_.img.height;
    this.cols=3;
    this.rows=3;
    this.nodes=new Array();
    this.ns=cw/_.cols;
    this.indexes=[];
    this.missingNode=0;
    this.missingNodeIndex=0;
    this.completed=false;

    this.init=function(){
        for(let x=0;x<_.cols;x++){
            for(let y=0;y<_.rows;y++){
                let node={cx:x*_.imgWidth/_.cols,cy:y*_.imgHeight/_.rows,cw:_.imgWidth/_.cols,ch:_.imgHeight/_.rows,
                    x:x*_.ns,y:y*_.ns,w:_.ns,h:_.ns
                };
                _.nodes.push(node);
                _.indexes.push(y+_.cols*x);
            }
        }
        this.missingNode=Math.floor(Math.random()*_.nodes.length);
        //shuffle indexes
        _.indexes.sort(()=>{return Math.random()-0.5});
        _.missingNodeIndex=_.indexes.indexOf(_.missingNode);
    }

    this.draw=function(cc){
        for(let i=0;i<_.nodes.length;i++){
            if(i===_.missingNodeIndex)continue;
            let node=_.nodes[i];
            cc.drawImage(_.img,_.nodes[_.indexes[i]].cx,_.nodes[_.indexes[i]].cy,_.nodes[_.indexes[i]].cw,_.nodes[_.indexes[i]].ch,node.x,node.y,node.w,node.h);
        }
    }

    this.update=function(cc){
        _.draw(cc);
    }

    this.onClick=function(x,y){
        if(_.completed)return;
        x=Math.floor(x/_.ns);
        y=Math.floor(y/_.ns);
        let nodeidx=y+_.cols*x;
        let mnxc=Math.floor(_.nodes[_.missingNodeIndex].x/_.ns);
        let mnyc=Math.floor(_.nodes[_.missingNodeIndex].y/_.ns);
        if((Math.abs(mnxc-x)==1 && Math.abs(mnyc-y)==0) || (Math.abs(mnxc-x)==0 && Math.abs(mnyc-y)==1)){
            _.indexes[_.missingNodeIndex]=_.indexes[nodeidx];
            _.indexes[nodeidx]=_.missingNode;
            _.missingNodeIndex=nodeidx;
        }
        _.completed=_.checkPuzzleCompleted();
        if(_.completed){
            setTimeout(function(){
                alert("< GAME COMPLETE >")
            },1000);
        }
    }

    this.checkPuzzleCompleted=function(){
        for(let i=0;i<_.indexes.length;i++){
            if(i+1>_.indexes.length-1)return true;
            if(_.indexes[i+1]!=_.indexes[i]+1){
                return false;
            }
        }
        return true;
    }

};