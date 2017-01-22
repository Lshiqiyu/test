function shape(canvas,cobj,copy,xp) {
    this.canvas=canvas;
    this.cobj=cobj;
    this.type="line";
    this.fillStyle="#000";
    this.strokeStyle="#000";
    this.lineWidth=1;
    this.style="stroke";
    this.biannum=5;
    this.jiaonum=5;
    this.copy=copy;
    this.history=[];
    this.num=10;
    this.xp=xp;
    this.flag=true;
}
shape.prototype={
    init:function () {
        this.cobj.fillStyle=this.fillStyle;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.lineWidth=this.lineWidth;
    },
    draw:function () {
        this.xp.style.display="none"
        this.init()
        var that=this;
        this.copy.onmousedown=function (e) {
            var ox=e.offsetX;
            var oy=e.offsetY;
            that.copy.onmousemove=function (e) {
                that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height)
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[(that.history.length)-1],0,0)
                }
                var movex=e.offsetX;
                var movey=e.offsetY;
                that[that.type](ox,oy,movex,movey);
                that.copy.onmouseup=function () {
                    var imageData=that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height)
                    that.history.push(imageData)
                    that.copy.onmousemove=null;
                    that.copy.onmouseup=null;
                }
            }
        }
    },
    line:function (ox,oy,movex,movey) {
        this.cobj.beginPath()
        this.cobj.moveTo(ox,oy)
        this.cobj.lineTo(movex,movey)
        this.cobj.stroke();
    },
    rect:function (ox,oy,movex,movey) {
        this.cobj.beginPath()
        this.cobj.rect(ox,oy,movex-ox,movey-oy)
        this.cobj[this.style]();
    },
    arc:function (ox,oy,movex,movey) {
        this.cobj.beginPath()
        var r=Math.sqrt((movex-ox)*(movex-ox)+(movey-oy)*(movey-oy))
        this.cobj.arc(ox,oy,r,0,2*Math.PI)
        this.cobj[this.style]();
    },
    bian:function (ox,oy,movex,movey) {
        this.cobj.beginPath()
        var r=Math.sqrt((movex-ox)*(movex-ox)+(movey-oy)*(movey-oy))
        var n=360/this.biannum*Math.PI/180;
        for(var i=0;i<this.biannum;i++){
            this.cobj.lineTo(ox+r*Math.cos(n*i),oy+r*Math.sin(n*i))
        }
        this.cobj.closePath()
        this.cobj[this.style]();
    },
    jiao:function (ox,oy,movex,movey) {
        var r=Math.sqrt((movex-ox)*(movex-ox)+(movey-oy)*(movey-oy))
        var r1=r/3
        var n=360/(this.jiaonum*2)*Math.PI/180;
        this.cobj.beginPath()
        for (var i=0;i<this.jiaonum*2;i++){
            if(i%2==0){
                this.cobj.lineTo(ox+r*Math.cos(n*i),oy+r*Math.sin(n*i))
            }else{
                this.cobj.lineTo(ox+r1*Math.cos(n*i),oy+r1*Math.sin(n*i))
            }
        }
        this.cobj.closePath()
        this.cobj[this.style]()
    },
    pen:function(){
        var that=this;
        this.copy.onmousedown=function(e){
            var startX= e.offsetX;
            var startY= e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(startX,startY);
            that.copy.onmousemove=function(e){
                var moveX= e.offsetX;
                var moveY= e.offsetY;
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[(that.history.length)-1],0,0)
                }
                that.cobj.lineTo(moveX,moveY);
                that.cobj.stroke();
            that.copy.onmouseup=function(){
                var imageData=that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height)
                that.history.push(imageData)
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }
           }
        }
    },
    clear:function () {
        var that=this
        this.copy.onmousemove=function (e) {
            var movex=e.offsetX;
            var movey=e.offsetY;
            that.xp.style.left=movex-that.num/2+"px";
            that.xp.style.top=movey-that.num/2+"px";
        }
        this.copy.onmousedown=function (e) {
            var ox=e.offsetX;
            var oy=e.offsetY;
            that.xp.style.left=ox-that.num/2+"px";
            that.xp.style.top=oy-that.num/2+"px";
            that.copy.onmousemove=function (e) {
                var movex=e.offsetX;
                var movey=e.offsetY;
                that.xp.style.left=movex-that.num/2+"px";
                that.xp.style.top=movey-that.num/2+"px";
                that.cobj.clearRect(movex-that.num/2,movey-that.num/2,that.num,that.num)
                that.copy.onmouseup=function () {
                    var imageData=that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height)
                    that.history.push(imageData)
                    that.copy.onmousemove=null
                    that.copy.onmouseup=null
                    that.clear()
                }
            }
        }
    },
    return:function () {
        if (this.history.length==0){
            this.cobj.clearRect(0,0,this.canvas.width,this.canvas.height)
            alert("不能后退")
            return
        }else{
            if (this.flag){
                if (this.history.length==1){
                    this.history.pop()
                    this.cobj.clearRect(0,0,this.canvas.width,this.canvas.height)
                }else{
                    this.history.pop()
                    this.cobj.putImageData(this.history.pop(),0,0)
                }
            }else{
                this.cobj.putImageData(this.history.pop(),0,0)
            }
        }
        this.flag=false
    },

}