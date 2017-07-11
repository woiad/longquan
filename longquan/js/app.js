angular.module('myApp',['ionic','myApp.controllers'])
.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
	$ionicConfigProvider.platform.ios.tabs.style('standard'); 
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('bottom');
	
	$ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');
	
	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
	$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');        
	
	$ionicConfigProvider.platform.ios.views.transition('ios'); 
	$ionicConfigProvider.platform.android.views.transition('android');
	
	$stateProvider
	.state('app',{
		url:'/app',
		cache:false,
		abstract: true,
		templateUrl:'templates/tabs.html', 
	})
	.state('app.home',{
		url:'/home',
		cache:false,
		views: {
			'tab-home':{
				templateUrl:'templates/home.html',
				controller: 'homeController'
			}
		}
	})
	.state('app.pro_cotegories',{
		url:'/pro_categories',
		cache:false,
		views: {
			'tab-sor':{
				templateUrl:'templates/pro_categories.html',	
				controller:"procateCrl"
			}
		}
	})
	.state('app.shopcart',{
		url: '/shopcart',
		cache:false,
		views:{
			'tab-shop':{
				templateUrl:'templates/shopcart.html',
				cache:'false',
				controller:"shopcarCrl"
			}
		}
	})
	.state('app.user',{
		url: '/user',
		cache:false,
		views:{
			'tab-use':{
				templateUrl:'templates/user.html',
				controller:'userCrl'
			}
		}
	})
	.state('login',{
		url:'/login',
		cache:false,
		templateUrl:'templates/login.html',
		controller:'loginCrl'
	})
	.state('confirm_order',{
		url:'/comfirm_order',
		cache:false,
		templateUrl:'templates/comfirm_order.html',
		controller:'comfilrCrl'
	})
	.state('order',{
		url:'/order',
		cache:false,
		templateUrl:'templates/order.html',
		controller:'orderCrl'
	})
	.state('pay',{
		url:'/pay',
		cache:false,
		templateUrl:'templates/pay.html',
		controller:'payCrl'
	})
	.state('pro_details',{
		url:'/pro_details',
		cache:false,
		templateUrl:'templates/pro_details.html',
		controller:'prodetails'
	})
	.state('pro_list',{
		url:'/pro_list',
		cache:false,
		templateUrl:'templates/pro_list.html',
		controller:'prolistCrl'
	})
	.state('pro_search',{
		url:'/pro_search',
		cache:false,
		templateUrl:'templates/pro_search.html',
		controller:'searchCrl'
	})
	.state('guide',{
		url:'/guide',
		cache:false,
		templateUrl: 'templates/guide.html',
		controller:'guideCrl'
	})
	.state('register',{
		url:'/register',
		cache:false,
		templateUrl:'templates/register.html',
		controller:'registerCrl'
	})
	// 如果没有上述状态相匹配，以此作为后备
	$urlRouterProvider.otherwise('/guide');
})

