/**
 * Created by hh on 2019/8/11.
 */

    $(function(){
       var witd = $(window).width();
        if(witd>=1800 && witd<=2330){
            $("html,body").css({
                transform: "scale(0.95)",
                paddingLeft:50+"px"
            })
        }
        if(witd>=1600 && witd<=1799){
            $("body").css({
                transform: "scale(0.9)",
                height:900+"px"
            })
        }
        if(witd>=1500 && witd<=1699){
            $("html,body").css({
                transform: "scale(0.85)",
                width:1650+"px",
                height:700+"px"
            })
            $(".red").css({
                transform:"translate(-100px,-100px)"
            })
        }
        if(witd>=1300 && witd<=1499){
            $("html,body").css({
                transform: "scale(0.85)",
                width:1650+"px",
                height:700+"px"
            })
            $(".red").css({
                transform:"translate(-150px,-100px)"
            })
        }
        if(witd>=1100 && witd<=1299){
            $("html,body").css({
                transform: "scale(0.78)",
                width:1650+"px",
                height:700+"px"
            })
            $(".red").css({
                transform:"translate(-320px,-100px)"
            })
        }
        if(witd>=900 && witd<=1099){
            $("html,body").css({
                transform: "scale(0.73)",
                width:1650+"px",
                height:700+"px"
            })
            $(".red").css({
                transform:"translate(-650px,-150px)"
            })
        }
        if(witd>=699 && witd<=899){
            $("html,body").css({
                transform: "scale(0.64)",
                width:1650+"px",
                height:700+"px"
            })
            $(".red").css({
                transform:"translate(-1100px,-150px)"
            })
        }


    console.log(witd)

        //滚动条
        $(".list").mCustomScrollbar();
        var $audio=$("audio");
        var player=new Player($audio);
        var music;
        var voice;
        var lyric;

        init();
        function init(){
        var qj=$(".music_qj");
        var bj=$(".music_bj");
        var yuan=$(".music_yuan");
        music=new Voice(qj,bj,yuan);
        music.voicemove(function(value){
            player.musicTo(value);
        });
        music.voicedownmove(function(value){
            player.musicTo(value);
        });


        var vqj=$(".voice_qj");
        var vbj=$(".voice_bj");
        var vyuan=$(".voice_yuan");
        voice=new Voice(vqj,vbj,vyuan);
        voice.voicemove(function(value){
                player.musicVoiceTo(value);
            }
        );
        voice.voicedownmove(function(value){
            player.musicVoiceTo(value);
        });
    }



        //歌单按钮显隐
        $(".list").delegate(".list_curr","mouseenter",function(){
            $(this).find(".list_pc").stop().fadeIn(100);
            $(this).find(".list_time span").stop().fadeOut(0);
            $(this).find(".list_time a").stop().fadeIn(0);
        })
        $(".list").delegate(".list_curr","mouseleave",function(){
            //只有在未播放状态下才能隐藏歌单按钮
            if($(this).find(".list_play").attr("src")=="img/play.png"){
                $(this).find(".list_pc").stop().fadeOut(100);
                $(this).find(".list_time a").stop().fadeOut(0);
                $(this).find(".list_time span").stop().fadeIn(0);
            }
        })

        //单选框勾选
        $(".list").delegate(".list_check i","click",function(){
            $(this).toggleClass("bg");
            //单选框高亮
            if($(this).hasClass("bg")){
                $(this).css({
                    border: "1px solid rgba(255,255,255,1)"
                })
            }else{
                $(this).css({
                    border: "1px solid rgba(255,255,255,0.5)"
                })
            }
        })

        //单选框全选
        $(".list_con i").click(function(){
            if($(this).hasClass("bg")){
                $(".list_curr i").removeClass("bg");
                $(".list_curr i"). css({
                    border: "1px solid rgba(255,255,255,0.5)"
                })
            }else{
                $(".list_curr i").addClass("bg");
                $(".list_curr i").css({
                    border: "1px solid rgba(255,255,255,1)"
                })
            }
        })

        //封装改变图片方法
        function changepic(three,one,two){
            if($(three).attr("src")=="img/"+one+".png"){
                $(three).attr("src","img/"+two+".png")
            }else{
                $(three).attr("src","img/"+one+".png")
            }
        }

        //底部播放按钮切换
        $(".foot_in_play a img").eq(1).click(function(){
            changepic(this,"play2","zt");
        })

        //切换循环模式
        $(".foot_in_use a img").eq(0).click(function(){
            if($(this).attr("src")=="img/xh.png"){
                $(this).attr("src","img/sx.png")
                $(this).attr("title","顺序播放[O]")
            }else if($(this).attr("src")=="img/sx.png"){
                $(this).attr("src","img/sj.png")
                $(this).attr("title","随机播放[O]")
            }
            else if($(this).attr("src")=="img/sj.png"){
                $(this).attr("src","img/dq.png")
                $(this).attr("title","单曲播放[O]")
            }
            else if($(this).attr("src")=="img/dq.png"){
                $(this).attr("src","img/xh.png")
                $(this).attr("title","列表循环[O]")
            }
        })

        //歌单点击切换播放按钮
        $(".list").delegate(".list_play","click",function(){
            var $item=$(this).parents(".list_curr").siblings();
            var $item2=$(this).parents(".list_curr");

            //同步已收藏歌曲，红心点亮
            if($item2.attr("collect")=="collect"){
                $(".foot_in_use a img").eq(1).attr("src","img/ax2.png");
            }else{
                $(".foot_in_use a img").eq(1).attr("src","img/ax.png");
            }

            //切换播放按钮
            changepic(this,"play","zt2");
            //切换其他歌单播放按钮
            $item.find(".list_play").attr("src","img/play.png");
            //切换其他歌单字体颜色
            $item.find("div").css({color:"rgba(255,255,255,0.5)"})
            //固定显示当前歌单播放按钮
            $(this).parents(".list_pc").css({display:"block"})
            //切换播放gif图
            $item2.find(".list_number").toggleClass("list_number2");
            $item.find(".list_number").removeClass("list_number2")
            //同步底部播放按钮
            if($(this).attr("src")=="img/play.png"){
                //底部播放按钮切换
                $(".foot_in_play2").attr("src","img/play2.png")
                //改变歌单字体颜色
                $(this).parents(".list_curr").find("div").css({
                    color:"rgba(255,255,255,0.5)"
                })
            }else{
                //底部播放按钮切换
                $(".foot_in_play2").attr("src","img/zt.png")
                //改变歌单字体颜色
                $item2.find("div").css({
                    color:"white"
                })
                //隐藏上条播放歌单按钮
                $item.find(".list_pc").stop().fadeOut(0);
                $item.find(".list_time a").stop().fadeOut(0);
                $item.find(".list_time span").stop().fadeIn(0);
            }

            $(".body_right_bottom").css({
                marginTop: "0px"
            });
            player.playMusic($item2.get(0).index,$item2.get(0).music);
            intmusic($item2.get(0).music);
            intMusicLyric($item2.get(0).music);

        })

        //点亮底部爱心
        $(".foot_in_use a img").eq(1).click(function(){
            var item=$(".list_curr")

            //通过底部爱心取消收藏
            if($(this).attr("src")=="img/ax2.png"){
                for(var i=0;i<item.length;i++){
                    if($(".time-top .pro-name").text()==$.trim($(".list_curr").eq(i).find(".list_name").text())){
                        item.eq(i).attr("collect","");
                    }
                }
            }
            //通过底部爱心添加收藏
            if($(this).attr("src")=="img/ax.png"){
                for(var i=0;i<item.length;i++){
                    if($(".time-top .pro-name").text()==$.trim($(".list_curr").eq(i).find(".list_name").text())){
                        item.eq(i).attr("collect","collect");
                    }
                }
            }

            //改变爱心
            changepic(this,"ax","ax2");
        })

        //纯净模式开关
        $(".foot_in_use a img").eq(4).click(function(){
            changepic(this,"cjk","cjg");
            if($(".cj img").attr("src")=="img/cjg.png"){
                    $(".body").css({
                        display:"block"
                    })
                $(".body2").css({
                    display:"none"
                })
            }else{
                $(".body2").css({
                    display:"block"
                })
                $(".body").css({
                    display:"none"
                })
            }
        })

        //声音控制
        $(".foot_in-lound a img").click(function(){
            changepic(this,"lb","lb2");
            if($(this).attr("src")=="img/lb.png"){
                //关闭声音
                player.musicVoiceTo(1);
               
            }else{
                //打开声音
                 player.musicVoiceTo(0);

            }

        



        })

        //控制底部播放按钮
        $(".foot_in_play2").click(function(){
            if(player.currentIndex==-1){
                $(".list_curr").eq(0).find(".list_play").trigger("click");
            }else {
                $(".list_curr").eq(player.currentIndex).find(".list_play").trigger("click");
            }
        })

        //控制底部上一首按钮
        $(".after_music").click(function(){
            $(".body_right_bottom").css({
                marginTop: "0px"
            });
            $(".list_curr").eq(player.playAfter()).find(".list_play").trigger("click");
        })
        //控制底部下一首按钮
        $(".next_music").click(function(){
            $(".body_right_bottom").css({
                marginTop: "0px"
            });
            $(".list_curr").eq(player.playNext()).find(".list_play").trigger("click");
        })

        //删除按钮
        $(".list").delegate(".list_del","click",function(){
            //找到被点击的音乐
            var $item=$(this).parents(".list_curr");

            //判断当前删除的是否正在播放
            if($item.get(0).index==player.currentIndex){
                $(".next_music").trigger("click");
            }

            $item.remove();
            player.changeMusic($item.get(0).index);


            //重新排序
            $(".list_curr").each(function(index,ele){
                ele.index=index;
                $(ele).find(".list_number").text(index+1)
            })

        });

        //清空按钮
        $(".body_top span").eq(4).click(function(){
            $(".clears").css({
                display:"block"
            })
        })

        //封装关闭按钮
        function close(name){
            $(name).css({
                display:"none"
            })
        }

        //关闭清空提示
        $(".clears_top span").click(function(){
           close(".clears");
        })
        $(".clears_bottom .no_sure").click(function(){
            close(".clears");
        })

        //清空列表
        $(".clears_bottom .sure").click(function(){
            $(".list .list_curr").remove();
            close();
        })

        //必须选择单曲
        function must(){
            $(".handle").css({
                display:"block"
            });
            setTimeout(function(){
                $(".handle").stop().fadeOut(500);
            },2000)
        }

        //收藏
        $(".body_top span").eq(0).click(function(){
            var $item=$(".list_curr i");
            var num=0;
            for(var i=0;i<$item.length;i++){
                if($item.eq(i).hasClass("bg")){
                    $item.eq(i).parents(".list_curr").attr("collect","collect");
                    num++;
                }
            }
            if(num==0){
                must();
            }else{
                $(".collect").css({
                    display:"block"
                });
                setTimeout(function(){
                    $(".collect").stop().fadeOut(500);
                },2000)
            }

        })

        //添加到
        $(".body_top span").eq(1).click(function(){
            var $item=$(".list_curr i");
            var num=0;
            for(var i=0;i<$item.length;i++){
                if($item.eq(i).hasClass("bg")){
                    num++;
                }
            }
            if(num==0){
                must();
            }
        })

        //下载
        $(".body_top span").eq(2).click(function(){
            var $item=$(".list_curr i");
            var num=0;
            for(var i=0;i<$item.length;i++){
                if($item.eq(i).hasClass("bg")){
                    num++;
                }
            }
            if(num==0){
                must();
            }else{
                $(".download").css({
                    display:"block"
                })
            }
        })

        //关闭下载客户端提示
        $(" .download span").click(function(){
            close(".download")
        })

        //删除选中歌曲
        $(".body_top span").eq(3).click(function(){
            var $item=$(".list_curr i");
            var num=0;
            for(var i=0;i<$item.length;i++){
                if($item.eq(i).hasClass("bg")){
                    num++;
                }
            }
            if(num==0){
                must();
            }else{
                $(".delete").css({
                    display:"block"
                })
            }
        })

        $(".delete .sure").click(function(){
            var $item=$(".list_curr i");
            for(var i=0;i<$item.length;i++){
                if($item.eq(i).hasClass("bg")){
                    $item.eq(i).parents(".list_curr").remove();
                }
            }
            close(".delete");
        })
        $(".delete .no_sure").click(function(){
            close(".delete");
        })
        $(".delete_top span").click(function(){
            close(".delete");
        })

        //底部下载按钮
        $(".foot_in_use a").eq(2).click(function(){
            var $item=$(".list_curr i");
            var num=0;
            for(var i=0;i<$item.length;i++){
                if($item.eq(i).hasClass("bg")){
                    num++;
                }
            }
            if(num==0){
                must();
            }else{
                $(".download").css({
                    display:"block"
                })
            }
        })













        //监听播放进度
        player.musicTimeUpdate(function(currentTime,time){
            //同步时间
            $(".pro-time").text(time);
            //同步进度条
            var value=currentTime / player.audio.duration * 100;
            music.setProgress(value);
            if(currentTime== player.audio.duration){
                $(".list_curr").eq(player.playNext()).find(".list_play").trigger("click");
            }

            //同步歌词
           var index= lyric.lryIndex(currentTime);

            //改变歌词颜色
                var item=$(".body_right_bottom li").eq(index);
                var item2=$(".body_right_bottom");
            item.addClass("licolor");
            item.siblings().removeClass("licolor");

            //改变纯净模式歌词颜色
            var item3=$("#lyc li").eq(index);
            var item4=$(".body2 .body_right_bottom");
            item3.addClass("licolor");
            item3.siblings().removeClass("licolor");

            //改变歌词位置
            var  margintop=0;
            var  margintop2=0;
            margintop=(index-1) * -40;
            margintop2=(index-1) * -100;
            if(margintop<0){
                item2.css({
                    marginTop: margintop
                });
            }
            if(margintop2<0){
                item4.css({
                    marginTop: margintop2
                });
            }
        })



        //动态创建歌单
        getPlayList();
        function getPlayList(){
            $.ajax({
                url:"source/musiclist.json",
                dataType:"json",
                type:"get",
                success:function(data){
                    player.musicList=data;
                    //将获取到的歌单信息添加到UL中
                    var $musicList=$("#mCSB_1 #mCSB_1_container");
                    $.each(data,function(index,ele){
                        var $item=createMusicItem(index,ele);
                        $musicList.append($item);
                    })
                    //初始化歌曲信息
                    intmusic(data[0]);
                    //初始化歌词信息
                    intMusicLyric(data[0]);

                },
                error:function(e){
                    console.log(e);
                }
            });
        }
        //初始化歌曲信息
        function intmusic(data){
            //获取信息对应元素
            var musicSinger=$(".song_name a");
            var musicName=$(".song_songer a");
            var musiclist=$(".song_list a");
            var musicTime=$(".pro-time");
            var musicProessName=$(".pro-name");
            var musicPic=$(".body_right_top a img");
            var musicBg=$(".mask_bg");

            musicPic.attr("src",data.cover);
            musicSinger.text(data.name);
            musicName.text(data.singer);
            musiclist.text(data.album);
            musicTime.text("00:00/"+data.time);
            musicProessName.text(data.name);
            musicBg.css({
                background:"url('"+data.cover+"')"
            })

        }
        //初始化歌词信息
        function intMusicLyric(data){
            lyric = new Lyric(data.link_lrc);
            var $lrc=$(".body_right_bottom");
            $lrc.html("");
            lyric.loadLyric(function(){
                //创建歌词列表
                $.each(lyric.lyrics,function(index,ele){
                    var $item=$("<li>"+ele+"</li>");
                        $lrc.append($item);
                    
                })
            });
        }


        //  动态获取每条歌单信息
        function createMusicItem(index,music){
            var $item=$("<li class=\"list_curr\">\n"+
                "<div class=\"list_check\"><i></i></div>\n"+
                    " <div class=\"list_number \">"+(index+1)+"</div>\n"+
                    "<div class=\"list_name\">"+music.name+""+
                    "<div class=\"list_pc\">\n"+
                    " <a><img src=\"img/play.png\"  title=\"播放\" class=\"list_play\"/></a>\n"+
                    "<a><img src=\"img/tjd.png\"   title=\"添加到\"/></a>"+
                    " <a><img src=\"img/vip.png\" title=\"下载\" /></a>"+
                    "<a><img src=\"img/fx.png\" title=\"分享\"/></a>"+
                    "</div>"+
                    "</div>"+
                    "<div class=\"list_singer\">"+music.singer+"</div>"+
                    "<div class=\"list_time\">"+
                    "<span>"+music.time+"</span>"+
                    " <a><img src=\"img/sc2.png\" title=\"删除\" class=\"list_del\"/></a>"+
                    "</div>"+
                    "</li>"
            );
            $item.get(0).index=index;
            $item.get(0).music=music;
            return $item;
        }
    });
