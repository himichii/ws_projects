var Game=function(){
    var _=this;
    this.scl=0.1;
    this.ship_img=document.getElementById("ship_img");
    this.invader_img=document.getElementById("invader_img");
    this.sd={w:384*_.scl,h:512*_.scl};
    this.id={w:512*_.scl,h:512*_.scl,rows:3,cols:8,gap:10};
    this.ship={x:cw/2-_.sd.w/2,y:ch-10-_.sd.h,w:_.sd.w,h:_.sd.h};
    this.shipMissiles=new Array();
    this.shipSpeed=4;
    this.shipMissileSpeed=3;
    this.invaders=new Array();
    this.invadersMissiles=new Array();
    this.invaderMissileSpeed=3;
    this.missileWidth=3;
    this.missileHeight=20;
    this.completed=false;
    this.invadersRange={x:0,w:0};

    this.init=function(){
        let dd=_.id;
        _.invadersRange.w=dd.cols*dd.w+dd.cols*dd.gap;
        _.invadersRange.x=cw/2-_.invadersRange.w/2;
        let yoffset=10;
        let xoffset=_.invadersRange.x;
        for(let x=0;x<dd.cols;x++){
            for(let y=0;y<dd.rows;y++){
                let invader={x:x*dd.w+x*dd.gap,y:y*dd.h+y*dd.gap,w:dd.w,h:dd.h};
                invader.x+=xoffset;invader.y+=yoffset;
                _.invaders.push(invader);
            }
        }
    }

    this.draw=function(cc){
        for(let i=0;i<_.invaders.length;i++){
            let invader=_.invaders[i];
            drawImg(cc,_.invader_img,invader.x,invader.y,invader.w,invader.h);
        }
        drawImg(cc,_.ship_img,_.ship.x,_.ship.y,_.ship.w,_.ship.h);
    }

    this.update=function(cc){
        if(_.completed)return;
        _.updateShipMovement();
        _.draw(cc);
        _.updateMissiles(cc);
        _.updateInvadersBehaviour();
        _.checkGameCompleted();
    }

    this.updateShipMovement=function(){
        if(leftkey){
            _.ship.x-=_.shipSpeed;
        }
        if(rightkey){
            _.ship.x+=_.shipSpeed;
        }
        if(_.ship.x<_.invadersRange.x){
            _.ship.x=_.invadersRange.x;
        }
        if(_.ship.x+_.ship.w>_.invadersRange.x+_.invadersRange.w){
            _.ship.x=_.invadersRange.x+_.invadersRange.w-_.ship.w;
        }
    }

    this.shipShootMissile=function(){
        let missile={x:_.ship.x+_.ship.w/2-_.missileWidth/2,y:_.ship.y-_.missileHeight};
        _.shipMissiles.push(missile);
    }

    this.updateMissiles=function(cc){
        //ship missiles
        for(let i=0;i<_.shipMissiles.length;i++){
            let missile=_.shipMissiles[i];
            missile.y-=_.shipMissileSpeed;
            for(let j=0;j<_.invaders.length;j++){
                let inv=_.invaders[j];
                if(rectColl(missile.x,missile.y,_.missileWidth,_.missileHeight,inv.x,inv.y,inv.w,inv.h)){
                    _.shipMissiles.splice(i,1);
                    _.invaders.splice(j,1);
                    break;
                }
            }
            drawRect(cc,missile.x,missile.y,_.missileWidth,_.missileHeight,shipMissileColor);
        }
        //invaders missiles
        for(let i=0;i<_.invadersMissiles.length;i++){
            let missile=_.invadersMissiles[i];
            missile.y+=_.invaderMissileSpeed;
            if(rectColl(missile.x,missile.y,_.missileWidth,_.missileHeight,_.ship.x,_.ship.y,_.ship.w,_.ship.h)){
                _.completed=true;
                alert("< GAME OVER >");
            }
            drawRect(cc,missile.x,missile.y,_.missileWidth,_.missileHeight,invaderMissileColor);
        }
    }

    this.updateInvadersBehaviour=function(){
        let shoot=Math.random();
        if(shoot<0.03){
            let invader=_.invaders[Math.floor(Math.random()*_.invaders.length)];
            let missile={x:invader.x+invader.w/2-_.missileWidth/2,y:invader.y+invader.h};
            _.invadersMissiles.push(missile);
        }
    }

    this.checkGameCompleted=function(){
        if(_.invaders.length<1){
            _.completed=true;
            alert("< Game Complete :) >");
        }
    }
    

};