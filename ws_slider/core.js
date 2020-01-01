var Slider=function(){
    var _=this;
    this.imgs=new Array();
    this.imgsCount=0;
    this.currentIdx=0;

    this.init=function(){
        _.imgs=document.getElementsByClassName("img-cont");
        _.imgsCount=_.imgs.length;
        for(let i=0;i<_.imgsCount;i++){
            _.imgs[i].style.left=(i*100)+"%";
        }
        document.getElementById("left_arrow").addEventListener("click",_.slideLeft);
        document.getElementById("right_arrow").addEventListener("click",_.slideRight);
    }

    this.slideLeft=function(){
        if(_.currentIdx>0){
            _.currentIdx--;
            for(let i=0;i<_.imgsCount;i++){
                let pos=(i-_.currentIdx)*100;
                _.imgs[i].style.left=pos+"%";
            }
        }
    }

    this.slideRight=function(){
        if(_.currentIdx<_.imgsCount-1){
            _.currentIdx++;
            for(let i=0;i<_.imgsCount;i++){
                let pos=(i-_.currentIdx)*100;
                _.imgs[i].style.left=pos+"%";
            }
        }
    }

};

var slider=new Slider();
slider.init();