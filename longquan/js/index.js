$(function(){
	var win = $(window).width();
	var a= win/7.2;
	$("body,html").css({"font-size":a});
	$(window).resize(function(){
		var Win = $(document).width();
		var a= Math.floor(Win/7.2)
		$("body,html").css({"font-size":a})
	})
})
