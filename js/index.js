/**
 * Created by hh on 2019/11/28.
 */
var height;
var index=0;
for(let i=0;i<=5;i++){
    $(".dh li").eq(i).click(function(){
        height=$(".b").height();
        $(".body").stop().animate({
            top:(-height)*i,
        },1000,"linear",function(){
            index=i;
        })
    })
}
$(document).bind('mousewheel DOMMouseScroll', function(event) {
    height=$(".b").height();
    var wheel = event.originalEvent.wheelDelta;
    var detal = event.originalEvent.detail;
    if(event.originalEvent.wheelDelta) {
        if(wheel > 0) {
            index--;
            if(index<0){
                index=0
            }
            $(".body").stop().animate({
                top:(-height)*index
            },1000,"linear")
        }
        if(wheel < 0) {
            index++;
            if(index>5){
                index=5
            }
            $(".body").stop().animate({
                top:(-height)*index
            },1000,"linear")
        }
    }
    // Firefox�����¼�
    else if(event.originalEvent.detail) {
        // ���������¹���ʱ
        if(detal > 0) {
            console.log("down");
        }
        // ���������Ϲ���ʱ
        if(detal < 0) {
            console.log("up");
        }
    }
})


