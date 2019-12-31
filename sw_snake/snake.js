var Snake=function(){
    var _=this;
    this.parts=new Array();
    this.dest=new Vec(-1,0);
    this.speed=ns;
    this.lastPos=new Array();
    this.food=null;

    this.init=function(pos){
        _.parts.push(new Vec(pos.x,pos.y));
        _.lastPos.push(new Vec(pos.x,pos.y));
        _.spawnFood();
    }

    this.draw=function(cc){
        for(let i=0,len=_.parts.length;i<len;i++){
            let part=_.parts[i];
            drawRect(cc,part.x,part.y,ns,ns,snakeColor);
        }
        if(_.food){
            drawRect(cc,_.food.x,_.food.y,ns,ns,foodColor);
        }
    }

    this.update=function(cc){
        for(let i=0,len=_.parts.length;i<len;i++){
            let part=_.parts[i];
            _.lastPos[i].x=part.x;_.lastPos[i].y=part.y;
            if(i===0){
                part.x+=_.speed*_.dest.x;
                part.y+=_.speed*_.dest.y;
                continue;
            }
            part.x=_.lastPos[i-1].x;
            part.y=_.lastPos[i-1].y;
            _.checkBodyCollision(part);
        }
        _.checkFoodCollision();
        _.draw(cc);
    }

    this.addPart=function(){
        _.parts.push(new Vec(_.lastPos[0].x,_.lastPos[0].y));
        _.lastPos.push(new Vec(_.lastPos[0].x,_.lastPos[0].y));
    }

    this.spawnFood=function(){
        _.food=new Vec(Math.floor(Math.random()*cw/ns)*ns,Math.floor(Math.random()*ch/ns)*ns);
    }

    this.checkFoodCollision=function(){
        if(_.food){
            if(_.parts[0].x/ns==_.food.x/ns && _.parts[0].y/ns==_.food.y/ns){
                _.food=null;
                _.addPart();
                _.spawnFood();
            }
        }
    }
    this.checkBodyCollision=function(part){
        if(_.parts[0].x/ns==part.x/ns && _.parts[0].y/ns==part.y/ns){
            clearInterval(game);
            alert("<Game Over>");
        }
    }

    this.setDest=function(x,y){
        _.dest.x=x;
        _.dest.y=y;
    }

};