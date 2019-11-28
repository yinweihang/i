/**
 * Created by hh on 2019/9/11.
 */
;(function(window){
    function Lyric(path){
        return new Lyric.prototype.init(path);
    }
    Lyric.prototype={
        constructor:Lyric,
        init:function(path){
            this.path=path;
    },
        id:0,
        index:-1,
        times:[],
        lyrics:[],
    loadLyric:function(callBack){
        var $this=this;
         $.ajax({
                url:$this.path,
                dataType:"text",
                type:"get",
                success:function(data){
                 $this.parseLyric(data);
                    callBack();
                },
                error:function(e){
                    console.log(e);
                }
            });
    },
    parseLyric:function(data){
        var $this=this;
        this.times=[];
        this.lyrics=[];
        var array=data.split("\n");
        var timeReg=/\[(\d*:\d*\.\d*)\]/;
        //遍历取出每一条歌词
        $.each(array,function(index,ele){
            //处理歌词
            var lyr =ele.split("]")[1];
            if(lyr.length<2) return true;
            $this.lyrics.push(lyr);


            var res =timeReg.exec(ele)
            if(res==null)return true;
            var timeStr=res[1] //00:00.99
            var res2=timeStr.split(":");
            var min =parseInt(res2[0])*60;
            var sec=parseFloat(res2[1]);
            var time =parseFloat(Number(min + sec).toFixed(2));
            $this.times.push(time);

        });
    },
    lryIndex:function(currentTime){

        //歌词逐条前进
        if(currentTime>this.times[this.id]){
            this.index++;
            this.id++;
        }

        //歌词跳进
        if(currentTime>this.times[this.id+1]){
            for(var i=0;i<this.times.length;i++){
                if(currentTime>=this.times[i]){
                    this.index=i-1;
                    this.id=i;
                }else{
                    break
                }
            }
        }
        //歌词倒回
        if(currentTime<this.times[this.id-1]){
            for(var i=0;i<this.times.length;i++){
                if(currentTime>=this.times[i]){
                    this.index=i-1;
                    this.id=i;
                }else{
                    break;
                }
            }
        }
        return this.index;
    }

    }
    Lyric.prototype.init.prototype=Lyric.prototype;
    window.Lyric=Lyric;
})(window);
