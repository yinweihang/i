/**
 * Created by hh on 2019/8/28.
 */
(function(){
    var that;
    function Game(map){
        this.snake=new Snake();
        this.food=new Food();
        this.map=map;
        that=this;
    }
    Game.prototype.start=function(){
        //把蛇和食物渲染到地图上
        this.food.render(this.map);
        this.snake.render(this.map);

        runSnake();
        bindkey();


    }

    function bindkey(){
        document.addEventListener("keydown",function(e){
            switch (e.keyCode){
                case 37:
                    that.snake.direction="left"
                    break;
                case 38:
                    that.snake.direction="top"
                    break;
                case 39:
                    that.snake.direction="right"
                    break;
                case 40:
                    that.snake.direction="bottom"
                    break;
            }
        },false);

    }


    function runSnake(){
        var timerId=setInterval(function(){
            that.snake.move(that.food,that.map);
            that.snake.render(that.map);

            var headx=that.snake.body[0].x;
            var heady=that.snake.body[0].y;

            var maxx=that.map.offsetWidth/that.snake.width;
            var maxy=that.map.offsetHeight/that.snake.height;

            if(headx<0||headx>=maxx){
                alert("Game over");
                clearInterval(timerId);
            }
            if(heady<0||heady>=maxy){
                alert("Game over");
                clearInterval(timerId);
            }
        },150)
    }


    window.Game=Game;
})()

var map=document.getElementById("map");
var game =new Game(map);
game.start();