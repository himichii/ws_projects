var Calculator=function(){
    var _=this;
    this.num_display=document.getElementById("num_display");
    this.buts=document.getElementsByTagName("button");
    this.values=new Array();

    this.init=function(){
        _.values.push(0);
        _.bindListeners();
    }
    this.bindListeners=function(){
        for(let i=0,len=_.buts.length;i<len;i++){
            let but=_.buts[i];
            but.addEventListener("click",function(){_.onClickOnButton(but.innerText);});
        }
    }

    this.onClickOnButton=function(text){
        let lastvalue=_.getLastValue();
        if(text=="0" || text=="1" || text=="2" || text=="3" || text=="4" || text=="5" || text=="6" || text=="7" || text=="8" || text=="9"){
            if(!isNaN(lastvalue)){
                lastvalue+=text;
                lastvalue=parseFloat(lastvalue);
                _.setLastValue(lastvalue);
            }else{
                _.values.push(parseFloat(text));
            }
            _.updateDisplayValue();
        }else if(text=="+" || text=="-" || text=="*" || text=="/"){
            if(isNaN(lastvalue)){
                _.setLastValue(text);
            }else{
                _.values.push(text);
            }
            _.updateDisplayValue();
        }else if(text=="="){
            if(_.values.length>=3 && !isNaN(lastvalue)){
                let result=_.calculateResult();
                _.values.splice(0,_.values.length,result);
                _.setDisplayValue(result.toLocaleString());
            }
        }else if(text=="."){
            if(!isNaN(lastvalue)){
                _.values.push(text);
                _.updateDisplayValue();
            }
        }else if(text=="c"){
            _.values.length=0;
            _.values.push(0);
            _.setDisplayValue("0");
        }else if(text=="<"){
            if(_.values.length>1){
                _.values.pop();
                _.updateDisplayValue();
            }else{
                _.values[0]=0;
                _.setDisplayValue("0");
            }
        }else if(text=="√"){
            let result=_.calculateResult();
            result=Math.sqrt(result);
            _.values.splice(0,_.values.length,result);
            _.setDisplayValue(result);
        }
    }


    this.calculateResult=function(){
        return eval(_.values.join(""));
    }

    this.setDisplayValue=function(val){
        _.num_display.value=val;
    }
    this.updateDisplayValue=function(){
        let text="";
        for(let i=0,len=_.values.length;i<len;i++){
            let value=_.values[i];
            if(typeof _.values[i]=="number"){
                value=value.toLocaleString();
            }
            text+=value;
        }
        _.setDisplayValue(text);
    }

    this.getLastValue=function(){
        return _.values[_.values.length-1];
    }
    this.setLastValue=function(val){
        _.values[_.values.length-1]=val;
    }

};




var calc=new Calculator();
calc.init();

