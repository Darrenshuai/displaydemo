$(function() {
	window.onload=function(){
	  $('#slider').flexslider({
	  	directionNav: false,
		animationLoop: true
	  });
	  var IScroll = $.AMUI.iScroll;
  	  var myScroll = new IScroll('.grid',{
  	  	click:true
  	  });
	};
  // 图片轮播	
});