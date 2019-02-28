/*//获取刚开始的.monitor的坐标
		var mon=$(".monitor");
		//获取.word的宽度
		var word=$(".word");
		//var wordwidth=word[0].offsetWidth;
		//获取.def的宽度
		var def=$(".def");
		//var defwidth=deff[0].offsetWidth;
		//var defheight=deff[0].offsetHeight;
		//alert(defwidth);
		
       function e(e){//接受传入的对象
        //获取鼠标位置
            var x = e.clientX;
            var y = e.clientY+ document.documentElement.scrollTop;
		   
		 //判断光标位置是否在图像区域上，如果是则透视镜，如果不是则无透视镜
		   //建立一个布尔变量
		   var boo=(x< wordwidth && x>defwidth);
		   var bor=(y<defheight);
		   if  (boo && bor) {
           //图片相对当前定位 要求图片始终固定在原点位置
			 
		   
           //透视镜跟随鼠标移动
           
		   }
		   else {
		   //将monitor弄回到原来的位置，
		   
		   }
       }
*/
//怎样写一个很好用的插件？

//此插件可以：
/* 	1、自定义透视镜的背景颜色
	2、自定义透视镜的半径
	3、自定义需要透视的元素的类名
	4、支持链式语法(可以在元素数组后面加点号然后调用方法，就像jquery那样)
	5、可以删除某个元素组的"透视包围"
	6、此插件采用面向对象和函数式编程
	7、可以对某个类名的所有元素添加"透视包围"
	8、可以对某个类名的已被"透视包围"的所有元素删除"透视包围"
	9、用命名空间来防止“amespace则完全是个逻辑概念，
	它控制这个区域里的符号名在哪个空间里生效，这样项目大了可能会用到相同的函数名，
	链接的时候就不会冲突了。”
*/
/*
Function的简洁写法

这是一种比较简洁的实现，结构紧凑，通过function实例，且调用时无需实例化（new），方案来自stackoverflow：

var NameSpace = window.NameSpace || {};
NameSpace.Hello = new function() {
  var self = this;
  var name = 'world';
  self.sayHello = function(_name) {
    return 'Hello ' + (_name || name);
  };
};

调用

NameSpace.Hello.sayHello();
*/
//偷窥的单词是：peep
var peep=window.peep || {};

/*radius是透视镜的半径，
position是光标的位置，一共有5个可选项，上中下左右，default=中
bgcolor是透视镜的背景颜色,default=yellow
wordlist是需要添加透视镜效果的元素的数组
wordbg是添加透视镜效果的元素的所需要的背景颜色，default=lightgray
cover函数用于对wordlist的元素添加透视镜效果
cancel函数用于对wordlist的元素取消透视镜效果
*/
peep.Grass=function (radius,position,bgcolor,wordlist,wordbg) {
		this.radius=radius || 25;
		this.position=position || 'center';
		this.bgcolor=bgcolor || 'yellow';
		this.wordlist=wordlist;
		this.wordbg=wordbg || 'lightgray';
		//this.cover=function () 
			for(var i=0;i<this.wordlist.length;i++) {
			//获取元素的宽度
			var longg=this.wordlist[i].offsetWidth;
			//第0步：获取元素的标签名
			var tagg=this.wordlist[i].nodeName;
			tagg=tagg.toLowerCase();
		//第一步：检查元素的display的值，先判断是行内标签还是块级标签，然后在检查display的值，由此来决定包裹层的display的值,
		
		//建立一个行内元素的数组和一个块级元素的数组

		var hangnei=["b", "big", "i", "small", "tt","abbr", "acronym", "cite", "code", "dfn", "em", "kbd", "strong", "samp", 
"a", "bdo", "br", "img", "map", "object", "q", "script", "span", "sub", "sup",
"button", "input", "label", "select", "textarea"]

		var kuaiji=["address","article","aside","audio","blockquote","canvas","dd","div",
		"dl","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","noscript",
		"ol","output","p","pre","section","table","tfoot","ul","video"]
		//判断是行内标签还是块级标签
		var nodepart;
		for (var j=0;j<hangnei.length;j++) {
			if(tagg==hangnei[j]) {
				var nodepart='hangnei';
				break;
			}
			
		}
		if (typeof nodepart == "undefined" || nodepart == null || nodepart == "") {
			for (var j=0;j<kuaiji.length;j++) {
				if(tagg==kuaiji[j]) {
					var nodepart='kuaiji';
					break;
				}
			
			}
			
		}
		//检查display的值和float值	
		var testt=this.wordlist[i];
		var showw=this.wordlist[i].style.display;
		var floatt=this.wordlist[i].style.float;
		var finalshow;
		//块级元素+display:inline-block+float:none;--->display:inline-block;
		//块级元素+display:block+floatt:none;--->display:block;
		//块级元素+display:block+float:left;--->display:inline-block;
		var boolone=(showw=='block');
		var booltwo=(floatt=='undefined');
		if (nodepart=='hangnei') {
			finalshow='inline-block';
		}
		else
		{
			finalshow='block';
		}
		//宽度高度：
		var bggwidth=this.wordlist[i].offsetWidth+'px';
		var bggheight=this.wordlist[i].offsetHeight+'px';
		var monsize=this.radius * 2 + 'px';
		//第二步：获取该元素的宽度和高度，然后将此样式应用在<div class="bg" style="></div><div class="monitor" style="position:absolute;"></div>上中下左右，default
		var strcss="<div class='monitor' style='display:none;background:yellow;position:absolute;border-radius: 50%;overflow: hidden;opacity:1;"
						
		var str2="width:"+monsize+";"+"height:"+monsize+";"+"background:"+this.bgcolor+";";
		var str3="'></div>";
		var cssss=strcss+str2+str3;	
		//构造第一层<div class="monitor">
		$(this.wordlist[i]).wrap(cssss);
		//构造第二层<div class="bg">
		var ss="<div class='bg'";
		var st2="style='z-index:-1;display:"+finalshow+";"+"width:"+bggwidth+";"+"height:"+bggheight+";"+"background:"+this.wordbg+";";
		var st3="'></div>";
		var cs=ss+st2+st3;	
		$(this.wordlist[i]).parent().wrap(cs);
		//<div class="monitor">添加样式：display:none;
		
		//元素自身添加样式：
		this.wordlist[i].style.position='relative';
		$(this.wordlist[i]).css("width",longg+"px");
		//第三步：给<div class="monitor"></div>添加样式：opacity:0;
		//给此元素的父元素的父元素<div class="bg">添加一个光标移入时的事件：移入时，触发透视镜函数
				var tee=$(this.wordlist[i]).parent().parent();
				$(tee).mousemove(function(e) {
					var rel=this;
					var poo={};
					poo.x=e.clientX;
					poo.y=e.clientY+ document.documentElement.scrollTop;
					var rad=radius;
					peep.mon(rel,poo,rad);
				});
		//给此元素的父元素的父元素<div class="bg">添加一个光标溢出时的事件：移出时，
		
		
		//包裹需要透视镜效果的元素
		//第二层<div class="bg"></div>
		//第一层<div class="monitor"></div>
		/*
		<div class="bg">
        <div class="monitor">
			<div class="word">climax</div>
        </div>
		</div>
		*/
			}
		
	   this.cancel=function () {
		   //将某个元素数组的cover操作取消掉
		   for(var i=0;i<this.wordlist.length;i++) {
			   //删除包裹单词的<div class="bg"><div class="monitor">,要执行两次unwrap()函数，因为"单词"被两层div所包裹
				$(this.wordlist[i]).unwrap();
				$(this.wordlist[i]).unwrap();
				//解除事件绑定
				/*
				jQuery中的remove方法，会在移除dom元素的同时，调用一个内部函数cleanData将所有子节点及相关的event listener全部移除
				不知道jquery中的unwrap()方法会不会也是这样
				*/
		   }
		   
		   
		   
		   //
		   
		   
		   
	   }
			
		
}













	//透视镜函数：
peep.mon=function(bgrel,point,radius) {
			

			//获取到<div class="bg">的宽度、高度、display的方式、横坐标、纵坐标
				/*
获取页面某一元素的绝对X,Y坐标，可以用offset()方法：
var X = $('#DivID').offset().top;
var Y = $('#DivID').offset().left;
 
获取相对(父元素)位置:
var X = $('#DivID').position().top;
var Y = $('#DivID').position().left;
				*/
			
			var bg=bgrel;
			//将<div class="monitor">的opacity设置为1
			//$(bg).css("opacity","1");
			var bgtop=$(bg).offset().top;
			var bgleft=$(bg).offset().left;
			var bgwidth=bg.offsetWidth;
			var bgheight=bg.offsetHeight;
			//接受传入的对象
			//获取鼠标位置
			var x = point.x;
			var y = point.y;
		   
		 //判断光标位置是否在图像区域上，如果是则透视镜，如果不是则无透视镜
		   //建立一个布尔变量
			var xxp=(x< bgwidth+bgleft && x>bgleft);
			var yyp=(y<bgheight+bgtop && y>bgtop);
			if  (xxp && yyp) {
			//图片相对当前定位 要求图片始终固定在原点位置
			 
		   
			//透视镜跟随鼠标移动
			var monitor=$(bg).children(":first-child");
			//monitor.style.opacity=1;
            $(monitor).css("display","inline-block");//即<div class="monitor"></div>这个元素的display的值：只有两个inline-block或者block;
           // var pic=$(this).find(".word")
			var pic=$(bg).children(":first-child").children(":first-child");
			$(pic).css("margin-left",-x+bgleft+radius+'px');
			$(pic).css("margin-top",-y+bgtop+radius+'px');
           //透视镜跟随鼠标移动
		   //设置偏移坐标：
//$(selector).offset({top:value,left:value})
			
            $(monitor).offset({top:y-radius,left:x-radius});
			}
			else {
				//将monitor弄回到原来的位置，
				var monitor=$(bg).children(":first-child");
				$(monitor).css("display","none");
			}
		}   
		



















