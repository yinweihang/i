/**
 * Created by hh on 2019/8/28.
 */
(function(){
    function Snake(options){
        options=options||{};
        //蛇节大小
        this.width=options.width||20;
        this.height=options.height||20;
        //蛇节方向
        this.direction=options.direction||"right";
        //蛇节身体，第一个元素是蛇头
        this.body=[
            {x:3,y:2,color:"red"},
            {x:2,y:2,color:"blue"},
            {x:1,y:2,color:"blue"}
        ]
    }

    var position="absolute";
    var elements=[];

    Snake.prototype.render=function(map){
        //删除之前的蛇
        remove();

        for(var i= 0,len=this.body.length;i<len;i++){
            var object=this.body[i];
            //设置样式
            var div=document.createElement("div")
            map.appendChild(div);
            elements.push(div);

            div.style.width=this.width+"px";
            div.style.height=this.height+"px";
            div.style.left=object.x * this.width+"px";
            div.style.top=object.y * this.height+"px";
            div.style.backgroundColor=object.color
            div.style.position=position;
        }
    }

    function remove(){
        for(var i=elements.length-1;i>=0;i--){
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i,1);
        }
    }

    //控制蛇移动方法
    Snake.prototype.move=function(food,map){
        //控制蛇身体移动（当前蛇节移动到上一个蛇节位置）
        for(var i=this.body.length-1;i>0;i--){
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
        }
        //控制蛇头的移动
        var head=this.body[0];
        switch (this.direction){
            case "right":
                head.x += 1;
                break;
            case "left":
                head.x -= 1;
                break;
            case "top":
                head.y -= 1;
                break;
            case "bottom":
                head.y += 1;
                break;
        }

        var headX=head.x * this.width;
        var headY=head.y * this.height;
        if(headX===food.x && headY===food.y){
            var last=this.body[this.body.length-1];
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            })


            food.render(map);
        }




    }
    window.Snake=Snake;
})()

//测试
/*var map=document.getElementById("map");
var snake=new Snake();
snake.render(map);*/