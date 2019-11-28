/**
 * Created by hh on 2019/9/11.
 */
;(function(window){
    function Player($audio){
        return new Player.prototype.init($audio);
    }
    Player.prototype={
        constructor:Player,
        musicList:[],
        init:function($audio){
        this.$audio=$audio;
        this.audio=$audio.get(0);
    },
        currentIndex:-1,
        //控制音乐播放与暂停
        playMusic:function(index,music){
            if(this.currentIndex==index){
                if(this.audio.paused){
                    this.audio.play();
                }else{
                    this.audio.pause();
                }
            }else{
                this.$audio.attr("src",music.link_url);
                this.audio.play();
                this.currentIndex=index;
            }
        },
        //获取当前播放音乐的上一条索引
        playAfter:function(){
            var index=this.currentIndex-1
            if(index<0){
                index=this.musicList.length-1;
            }
            return index;
        },

        //获取当前播放音乐的下一条索引
        playNext:function(){
            var index=this.currentIndex+1;
            if(index>this.musicList.length-1){
                index=0;
            }
            return index;
        },

        changeMusic:function(index){
            //删除对应数据
            this.musicList.splice(index,1);

            //判断当前删除的是否是正在播放音乐起前面的音乐
            if(index<this.currentIndex){
                this.currentIndex=this.currentIndex-1;
            }
        },

        //获取当前播放时间并返回格式化后的时间
        musicTimeUpdate:function(callBack){
            var $this=this;
            this.$audio.on("timeupdate",function(){
                var currentTime=$this.audio.currentTime;
                var time=$this.timeGs(currentTime);
                callBack(currentTime,time);
            });
        },
        //格式化时间
        timeGs:function(currentTime){
            var endtime=this.musicList[this.currentIndex].time;

            var startMin=parseInt(currentTime/60);
            var startSec=parseInt(currentTime%60);

            if(startMin<10){
                startMin="0"+startMin
            }
            if(startSec<10){
                startSec="0"+startSec
            }
            return startMin+":"+startSec+"/"+endtime;
        },

        //控制播放进度
        musicTo:function(value){
            if(isNaN(value)) return;
            this.audio.currentTime = this.audio.duration * value;
        },

        //调节音量
        musicVoiceTo:function(value){
            if(isNaN(value)) return;
            if(value>1)value=1;
            if(value<0)value=0;
            
            this.audio.volume=value;
        }

    }
    Player.prototype.init.prototype=Player.prototype;
    window.Player=Player;
})(window);