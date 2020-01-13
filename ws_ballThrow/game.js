var Game=function(){
    var _=this;
    this.ball={x:cw*0.2,y:ch*0.5,r:25};
    this.goal={x:cw*0.8,y:ch*0.5,w:80,h:25};
    this.distance=0;
    this.amplitude=0;
    this.maxAngle=180;
    this.cuts=20;
    this.angleStep=_.maxAngle/_.cuts;
    this.points=[];
    this.thrown=false;
    this.ballSpeed=8;
    this.ballTargetIdx=1;

    this.init=function(){
        for(let i=0;i<_.cuts+1;i++){
            let point={x:0,y:0};
            _.points.push(point);
        }
    }

    this.draw=function(cc){
        drawRect(cc,_.goal.x,_.goal.y,_.goal.w,_.goal.h,goalColor);
        drawCircle(cc,_.ball.x,_.ball.y,_.ball.r,ballColor);
        if(_.thrown)return;
        for(let i=0;i<_.points.length;i++){
            let p=_.points[i];
            drawCircle(cc,p.x,p.y,5,pointsColor);
        }
    }

    this.update=function(cc){
        if(_.thrown)_.updateBallMovement();
        _.draw(cc);
    }

    this.updateBallMovement=function(){
        let target=_.points[_.ballTargetIdx];
        let xdif=target.x-_.ball.x;
        let ydif=target.y-_.ball.y;
        let len=Math.sqrt(xdif*xdif+ydif*ydif);
        let dx=xdif/len;let dy=ydif/len;
        _.ball.x+=dx*_.ballSpeed;
        _.ball.y+=dy*_.ballSpeed;
        if(len<_.ballSpeed){
            _.ball.x=target.x;
            _.ball.y=target.y;
            _.ballTargetIdx++;
            if(_.ballTargetIdx>_.points.length-1){
                _.thrown=false;
                _.ballTargetIdx=1;
            }
        }
    }

    this.calculatePointsPosition=function(){
        for(let i=0;i<_.points.length;i++){
            let ang=i*_.angleStep;
            let h=-Math.sin(ang*Math.PI/180);
            let step=_.distance/_.cuts;
            _.points[i].x=i*step+_.ball.x;
            _.points[i].y=h*_.amplitude+_.ball.y;
        }
    }

    this.throwBall=function(){
        if(_.thrown)return;
        _.thrown=true;
    }


};

