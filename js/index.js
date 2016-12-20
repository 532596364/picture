
//***********原生jquery实现的瀑布流
$(function () {
	// 实现图片瀑布流
	imgLocation("imgbox","li");
	//无法从后台获取，直接建立一个临时的图片数据
	var imgDate = {
		"date":[
		{"src":"1.jpeg"},{"src":"2.jpg"},{"src":"3.jpeg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpeg"},
		{"src":"7.jpeg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpeg"},{"src":"12.jpeg"},
		{"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpeg"},{"src":"17.jpg"},{"src":"18.jpeg"},
		{"src":"19.jpeg"},{"src":"20.jpg"},{"src":"21.jpg"},{"src":"22.jpeg"},{"src":"23.jpg"},{"src":"24.jpg"},
		{"src":"25.jpeg"},{"src":"26.jpg"},{"src":"27.jpeg"},{"src":"28.jpeg"},{"src":"29.jpg"},{"src":"30.jpg"},
		]};
	//滚动监听
	window.onscroll = function () {
		if (scrollside()) {
			$.each(imgDate.date,function (index,value) {
				var li = $("<li>").appendTo($("#imgbox"));
				var div = $("<div>").appendTo(li);
				var img = $("<img>").attr("src","img/"+$(value).attr("src")).appendTo(div);
			})
			imgLocation("imgbox","li");
		}
	}
	
});
//浏览器窗体大小改变的时候重新渲染
window.onresize = function () {
	imgLocation("imgbox","li");
}
// 实现图片瀑布流
function imgLocation(parents,content) {
	//节点
	var li = $("#"+parents+" "+content);
	//图片的宽度
	var imgWidth = li.eq(0).width();
	//图片的列数
	var cols = Math.floor($("#"+parents).width()/imgWidth);
	//图片，每一列的高度
	var heightArr = [];
	li.each(function (index,value) {
		//清空li原有属性重新渲染
		$(value).removeAttr('style');
		//获取图片的高度
		var boxH = li.eq(index).height();
		if (index <cols) {
			//将第一行的图片的各个高度存入数组
			heightArr[index]=boxH;
		}else{
			//获取每一列最小高度
			var minH = Math.min.apply(null,heightArr);
			//获取每一列最小高度的index
			var minI = $.inArray(minH,heightArr);
			//安放图片
			$(value).css({
				"position":"absolute",
				"top":minH,
				"left":li.eq(minI).position().left
			});
			//改变最小高度
			heightArr[minI] += boxH;
		}
	})
}
//滚动距离是否满足条件
function scrollside() {
	var li = $("#imgbox li");
	var lastpic = Math.floor(li.last().height()/2)+li.last().position().top;
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	return  (lastpic < (scrollTop+documentH))? true:false;
}
/*
//***********原生js实现的瀑布流

window.onload = function () {
	// 实现图片瀑布流
	imgLocation("imgbox","li");
	//无法从后台获取，直接建立一个临时的图片数据
	var imgDate = {
		"date":[
		{"src":"1.jpeg"},{"src":"2.jpg"},{"src":"3.jpeg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpeg"},
		{"src":"7.jpeg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpeg"},{"src":"12.jpeg"},
		{"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpeg"},{"src":"17.jpg"},{"src":"18.jpeg"},
		{"src":"19.jpeg"},{"src":"20.jpg"},{"src":"21.jpg"},{"src":"22.jpeg"},{"src":"23.jpg"},{"src":"24.jpg"},
		{"src":"25.jpeg"},{"src":"26.jpg"},{"src":"27.jpeg"},{"src":"28.jpeg"},{"src":"29.jpg"},{"src":"30.jpg"},
		]};
	//实现滚动条滑动底部继续加载新图片
	window.onscroll = function () {
		if (checkFlag()) {
			//获取父节点
			var parent = document.getElementById("imgbox");
			for (var i = 0; i < imgDate.date.length; i++) {
				var li = document.createElement("li");
				parent.appendChild(li);
				var div = document.createElement("div");
				li.appendChild(div);
				var img = document.createElement("img");
				img.src = "img/"+imgDate.date[i].src;
				div.appendChild(img);
			}
			imgLocation("imgbox","li");
		}
	}
}
//实现图片瀑布流
function imgLocation(parents,content){
	//获取父节点
	var parent = document.getElementById(parents);
	//获取所有图片的对象
	var imgs = parent.getElementsByTagName(content);
	//获取每张图片的宽度
	var imgsWidth = imgs[0].offsetWidth;
	//获取应该摆放图片的列数
	var cols = Math.floor(parent.offsetWidth/imgsWidth);
	//让图片显示区域居中
	parent.style.cssText = "width:"+imgsWidth*cols+"px;"+"margin: 0 auto;";
	//图片每列的高度
	var imgsHeight = [];
	for (var i = 0; i < imgs.length; i++) {
		if (i<cols) {
			//将第一行的图片的各个高度存入数组
			imgsHeight[i] = imgs[i].offsetHeight;	
		}else{
			//获取每一列最小高度的index
			var minI = minIndex(imgsHeight);
			//除了第一行的图片之外，都是从每次高度最小的一列下开始摆放
			//设置此图片的位置
			imgs[i].style.position = "absolute";
			imgs[i].style.top = imgsHeight[minI]+"px";
			imgs[i].style.left = imgs[minI].offsetLeft+"px";
			//放置完图片，使得该列的高度增加
			imgsHeight[minI] +=imgs[i].offsetHeight;
		}
	}
}
//获取数组中高度最下的那个值的index
function minIndex(imgsHeight) {
	var minheight = Math.min.apply(null,imgsHeight);
	for (var i = 0; i < imgsHeight.length; i++) {
		if (imgsHeight[i] == minheight ) {
			return i;
		}
	}
}
//滚动条的状况
function checkFlag() {
	//获取父节点
	var parent = document.getElementById("imgbox");
	//获取所有图片的对象
	var imgs = parent.getElementsByTagName("li");
	//最后一张图片底部距离顶部的距离
	var lentop= imgs[imgs.length-1].offsetTop+imgs[imgs.length-1].offsetHeight;
	// 
    //获取滚动条滚动距离
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //获取页面的高度
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
	if (lentop <= (scrollTop+pageHeight)) {
		return true;
	}else{
		return false;
	}
}
*/