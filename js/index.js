$(function () {
    var canvas=$("canvas")[0];
    var cobj=canvas.getContext("2d")
    var copy=$(".copy")[0]
    var box_btm=$(".box_btm")[0]
    var copy=$(".copy")[0]
    var xp=$(".xp")[0]
    canvas.width=$(window).width()*0.65;
    canvas.height=$(window).height()*0.7;
    box_btm.style.cssText="width:"+canvas.width+"px"
    box_btm.style.cssText="heifht:"+canvas.height+"px";
    $(".file_self").css("padding-top",($(".file_self").height()-25)/2+"px")
    //画布和字体图标的响应式
    $(window).resize(function () {
        canvas.width=$(window).width()*0.65;
        canvas.height=$(window).height()*0.7;
        $(".file_self").css("padding-top",($(".file_self").height()-16)/2+"px")
        // canvas.clearRect(0,0,canvas.width,canvas.height)
    })

    //工具栏交互
    function nav() {
        var flag=true

        $(".nav").on("click",".file_self",function () {
            if(flag=true) {
                $(".file_self").css({"transform": "rotateY(60deg)"})
                $(this).parent().children()[1].style.opacity = "1"
                $(this).parent().children()[1].style.transform = "rotateY(0deg)"
                flag = false
            }
        })
    }
    nav()
    
    var shapes=new shape(canvas,cobj,copy,xp);
    $(".huatu div").click(function () {
        if($(this).attr("data-role")=="pen"){
            shapes.pen()
        }else if($(this).attr("data-role")!="pen"){
            shapes.type=$(this).attr("data-role")
            shapes.draw();
        }
        $(".file_self").css({"transform":"rotateY(0deg)"})
        $(this).parent()[0].style.opacity="0"
        $(this).parent()[0].style.transform="rotateY(-90deg)"
    })
    $(".in_file:eq(2) div input").change(function () {
        shapes.fillStyle=shapes.strokeStyle=this.value
        shapes.draw()
    })
    $(".in_file:eq(2) div input").click(function () {
        $(".file_self").css({"transform":"rotateY(0deg)"})
        $(this).parent().parent()[0].style.opacity="0";
        $(this).parent().parent()[0].style.transform="rotateY(-90deg)";
    })
    $(".in_file:eq(3) div").click(function () {
        shapes.style=$(this).attr("data-role")
        $(".file_self").css({"transform":"rotateY(0deg)"})
        $(this).parent()[0].style.opacity="0"
        $(this).parent()[0].style.transform="rotateY(-90deg)"
    })
    $(".in_file:eq(4) div").click(function () {
        if($(this).attr("data-role")){
            shapes.lineWidth=$(this).attr("data-role")
            shapes.draw()
            $(".file_self").css({"transform":"rotateY(0deg)"})
            $(this).parent()[0].style.opacity="0"
            $(this).parent()[0].style.transform="rotateY(-90deg)"
        }else{
            $(this).children()[0].onchange=function () {
                shapes.lineWidth=this.value
                shapes.draw()
                console.log(this.value)
                $(".file_self").css({"transform":"rotateY(0deg)"})
                $(this).parent().parent()[0].style.opacity="0"
                $(this).parent().parent()[0].style.transform="rotateY(-90deg)"
            }

        }
    })
    $(".in_file:eq(5)").parent().click(function () {
        $(".xp").css({"display":"block"})
        shapes.clear()
    })
    $(".in_file:eq(5) div input").change(function () {
        $(".xp").css({"width":+this.value+"px","height":+this.value+"px"})
        shapes.num=this.value
        $(".file_self").css({"transform":"rotateY(0deg)"})
        $(this).parent().parent()[0].style.opacity="0";
        $(this).parent().parent()[0].style.transform="rotateY(-90deg)";
    })

    $(".return").click(function () {
        shapes.return();
        $(".file_self").css({"transform":"rotateY(0deg)"})
        $(this).parent()[0].style.opacity="0";
        $(this).parent()[0].style.transform="rotateY(-90deg)";
    })
    /*save*/

    $(".save").click(function(){
        // if(shapes.histroy.length>0) {
            location.href = canvas.toDataURL().replace("image/png", "stream/octet");
        $(".file_self").css({"transform":"rotateY(0deg)"})
        $(this).parent()[0].style.opacity="0";
        $(this).parent()[0].style.transform="rotateY(-90deg)";
        // }
    })

    /*new*/

    $(".set").click(function(){
        // if(shapes.histroy.length>0){
            var yes=confirm("是否保存");
            if(yes){
                location.href=canvas.toDataURL().replace("image/png","stream/octet");
            }
            shapes.histroy=[];
            cobj.clearRect(0,0,canvas.width,canvas.height);
        $(".file_self").css({"transform":"rotateY(0deg)"})
        $(this).parent()[0].style.opacity="0";
        $(this).parent()[0].style.transform="rotateY(-90deg)";

        // }
    })
})