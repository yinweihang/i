/**
 * Created by hh on 2019/8/28.
 */
(function(){
    function Food(options){
        options=options||{};
        this.x=options.x||0;
        this.y=options.y||0;

        this.width=options.width||20;
        this.height=options.height||20;

        this.color=options.color||"green"
    }
    var position="absolute";
//��¼�ϴδ�����ʳ�Ϊɾ����׼��
    var elements=[];
//��Ⱦ
    Food.prototype.render=function(map){
        //ɾ�����Ե���ʳ��
        remove();
        //�������ʳ��λ��
        this.x=Tools.getRandom(0,map.offsetWidth/this.width-1)*this.width;
        this.y=Tools.getRandom(0,map.offsetHeight/this.height-1)*this.height;

        var div=document.createElement("div");
        map.appendChild(div);
        elements.push(div);

        //������ʽ
        div.style.position=position;
        div.style.left=this.x+"px";
        div.style.top=this.y+"px"
        div.style.width=this.width+"px"
        div.style.height=this.height+"px"
        div.style.backgroundColor=this.color;
    }

    function remove(){
        for(var i=elements.length-1;i>=0;i--){
            //ɾ��div
            elements[i].parentNode.removeChild(elements[i]);
            //ɾ������Ԫ��
            //��һ���������ӵڼ���Ԫ�ؿ�ʼɾ��
            //�ڶ���������ɾ������Ԫ��
            elements.splice(i,1);
        }
    }
    window.Food=Food;
})()

//����
/*var map=document.getElementById("map");
var food=new Food();
food.render(map);*/
