angular.module("myApp",['ionic'])
	.controller('guideCrl',function($scope,$state,$http,$ionicSlideBoxDelegate){
	$scope.changeSlide = function(index){
		var num = $ionicSlideBoxDelegate.slidesCount();
		var slide_a = document.getElementsByClassName('exper');
		if(index>=num-1){
			$ionicSlideBoxDelegate.enableSlide(false);
			slide_a[num-1].style.display="block";
		}
		var hei = slide_a[num-1].offsetHeight;
		slide_a[num-1].style.lineHeight=hei-4+"px"
	}
	$scope.guideArr = [
		{"img":"../img/guide_1.jpg"},
		{"img":"../img/guide_2.jpg"},
		{"img":"../img/guide_3.jpg"}
	]
})
