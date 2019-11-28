/**
 * Created by hh on 2019/9/17.
 */
;(function(window){
    function Voice(qj,bj,yuan){
        return new Voice.prototype.init(qj,bj,yuan);
    }
    Voice.prototype={
        constructor:Voice,
        isMove:false,
        init:function(qj,bj,yuan){
            this.qj=qj;
            this.bj=bj;
            this.yuan=yuan;
        },
        //点击设置进度条长度
        voicemove:function(callBack){
            var $this=this;
            //设置进度条长度
            this.qj.click(function(event){
                var qjLeft=$(this).offset().left;
                var left=event.pageX;
                $this.bj.css({
                    width: left-qjLeft-7+"px"
                });
                $this.yuan.css({
                    left:left-qjLeft-7+"px"
                });

                //计算进度条的比例
                var value=(left-qjLeft)/$this.qj.width();
                callBack(value);



                //防止进度条超出
                if($this.yuan.offset().left>=qjLeft+$(this).width()){
                    $this.bj.css({
                        width:$(this).width()-7+"px"
                    });
                    $this.yuan.css({
                        left:$(this).width()-7+"px"
                    });
                }
                if($this.yuan.offset().left<=qjLeft){
                    $this.bj.css({
                        width:"0px"
                    });
                    $this.yuan.css({
                        left:"0px"
                    });
                }
            })
        },
        //拖拽设置进度条长度
        voicedownmove:function(callBack){
            var $this=this;
            var qjLeft=this.qj.offset().left;
            var left;
            var value;
            this.qj.mousedown(function(){
                $this.isMove=true;
                $(document).mousemove(function(event){
                   left=event.pageX;
                    $this.bj.css({
                        width: left-qjLeft-7+"px"
                    });
                    $this.yuan.css({
                        left:left-qjLeft-7+"px"
                    });


                    //防止进度条超出
                    if($this.yuan.offset().left>=qjLeft+$this.qj.width()){
                        $this.bj.css({
                            width:$this.qj.width()-7+"px"
                        });
                        $this.yuan.css({
                            left:$this.qj.width()-7+"px"
                        });
                    }
                    if($this.yuan.offset().left<=qjLeft){
                        $this.bj.css({
                            width:"0px"
                        });
                        $this.yuan.css({
                            left:"0px"
                        });
                    }
                });
                $(document).mouseup(function(){
                    $this.isMove=false;
                    $(document).off("mousemove").off("mousedown").off("mouseup");
                    //计算进度条的比例
                    value=(left-qjLeft)/$this.qj.width();
                    callBack(value);
                });
            });
        },

        setProgress:function(value){
            if(this.isMove)return;
            if(value<0||value>100){
                return ;
            }
            this.bj.css({
                width:value+"%"
            })
            this.yuan.css({
                left:value+"%"
            })
        }



    }
    Voice.prototype.init.prototype=Voice.prototype;
    window.Voice=Voice;
})(window);