angular.module('myApp.controllers',['ionic'])

.controller('homeController',function($scope,$ionicSideMenuDelegate,$timeout,$http,$ionicLoading){
 				$scope.dragonArr = [
 					{id:1,srcPic:'img/ltt01.jpg'},
 					{id:2,srcPic:'img/ltt02.jpg'}
 				]
 				$scope.personalaArr =[
 					{id:1,name:'39°东北特产名酒，十五年洞藏酒500ml＊1[1瓶 39度]',price:'100.00',href:'#/pro_details'},
 					{id:2,name:'39°东北特产名酒，十五年洞藏酒500ml＊1[1瓶 39度]',price:'100.00',href:'#/pro_details'}
 				]
 				$scope.caveArr = [
 					{id:1,srcPic:'img/cave01.jpg',name:'百年洞藏',elsename:'龙小二',goodname:'【时尚龙小二没事整一口】'},
 					{id:2,srcPic:'img/cave02.jpg',name:'百年洞藏',elsename:'三星',goodname:'【高品质 更走心】'},
 					{id:3,srcPic:'img/cave03.jpg',name:'百年洞藏',elsename:'五星',goodname:'【醇甜柔和 余味爽净】'},
					{id:4,srcPic:'img/cave02.jpg',name:'百年洞藏',elsename:'三星',goodname:'【高品质 更走心】'},
					{id:5,srcPic:'img/cave02.jpg',name:'百年洞藏',elsename:'三星',goodname:'【高品质 更走心】'},
					{id:6,srcPic:'img/cave02.jpg',name:'百年洞藏',elsename:'三星',goodname:'【高品质 更走心】'},
 					
 				]
 			
 				$scope.doRefresh=function(){
 					$timeout(function(){
 						$scope.$broadcast('scroll.refreshComplete')
 					},1000)
 				};
 				$scope.newCaveArr=[];
 				for(var i=0;i<3;i++){
 					$scope.newCaveArr.push($scope.caveArr.shift())
 				}
 				$scope.moreBool = true;
 				$scope.loadMore = function(){
 					$timeout(function(){
 						console.log($scope.newCaveArr.length)
 						for(var i=0;i<3;i++){
 							if($scope.caveArr.length ==0 ){
 								console.log(111)
 								$(".cave").append('<p class="item-divider">没有更多了</li>')
 								$scope.moreBool = false;
 								break;
 							}else{
 								$scope.newCaveArr.push($scope.caveArr.shift())
 							}
 						}
 						$scope.$broadcast('scroll.infiniteScrollComplete')
 					},2000)
 				}
 					
 })
.controller('shopcarCrl',function($scope,$ionicSideMenuDelegate,$ionicPopup,$window){
				$scope.likePic = [
					{id:1,picSrc:"img/youlike01.jpg"},
					{id:2,picSrc:"img/youlike01.jpg"},
					{id:3,picSrc:"img/youlike01.jpg"},
					{id:4,picSrc:"img/youlike01.jpg"}
				]
				var firstfun = function(){
					$scope.Myprolist = JSON.parse(localStorage.getItem("Myprolist"))
					$scope.inputVal = []
					if($scope.Myprolist!=null || $scope.Myprolist!=undefined){
						for(var i=0;i<$scope.Myprolist.length;i++){
							$scope.inputVal.push(parseInt($scope.Myprolist[i].num))
						}		
					}
				}
				firstfun()
				$scope.initVal ={
					total:0,
				}
				function getTotal(){
					$scope.initVal.total=0
					if($scope.Myprolist!=null || $scope.Myprolist!=undefined){
						for(var i=0;i<$scope.Myprolist.length;i++){
							if($scope.Myprolist[i].checked){
								$scope.initVal.total += $scope.Myprolist[i].price* $scope.Myprolist[i].num;	
							}
						}	
					}
				}
				function setCheck(){
					if($scope.Myprolist!=null || $scope.Myprolist!=undefined){
						for(var i=0;i<$scope.Myprolist.length;i++){
							if($scope.Myprolist[i].checked){
								$scope.checkAll = true
								$("[name=items]:checkbox").prop("checked",true)
							}else{
								$scope.checkAll = false
								$("[name=items]:checkbox").prop("checked",false)
								break
							}
						}	
					}
				}
				function setCheckAll(bool){
					for(var i=0;i<$scope.Myprolist.length;i++){
						$scope.Myprolist[i].checked = bool
					}
					getTotal()
				}
				$scope.check = function(bool){
					if(bool){
						getTotal()
						setCheck(bool)
					}else{
						getTotal()
						setCheck(bool)
					}
				}
				$scope.miuns = function(index){
					if($scope.Myprolist[index].num>1){
						$scope.Myprolist[index].num --
						var list = localStorage.getItem("Myprolist"),
							listJson = JSON.parse(list);
							listJson[index].num= $scope.Myprolist[index].num
							localStorage.setItem("Myprolist",JSON.stringify(listJson))
							$scope.Myprolist = JSON.parse(localStorage.getItem("Myprolist"))
						firstfun()
						getTotal()
						
					}
				}
				$scope.add = function(index){
					if($scope.Myprolist[index].num<99){
						$scope.Myprolist[index].num ++
						var list = localStorage.getItem("Myprolist"),
							listJson = JSON.parse(list);
							listJson[index].num= $scope.Myprolist[index].num
							localStorage.setItem("Myprolist",JSON.stringify(listJson))
							$scope.Myprolist = JSON.parse(localStorage.getItem("Myprolist"))
						firstfun()
						getTotal()
					}else{
						$ionicPopup.alert({
							title:"已达商品购买最大量",
							okText:'确定',
							okType:'button-positive',
						})
					}
				}
				$scope.checkedAll = function(bool){
					if(bool){
						setCheckAll(bool)
					}else{
						setCheckAll(bool)
					}
				}
				$scope.blurText = function(index){
					var a = $(".con span>input").val();
					if(isNaN(a)){
						$scope.Myprolist[index].num=1
					}else{
						$scope.Myprolist[index].num=a
					}
					var list = localStorage.getItem("Myprolist"),
							listJson = JSON.parse(list);
							listJson[index].num= $scope.Myprolist[index].num
							localStorage.setItem("Myprolist",JSON.stringify(listJson))
							$scope.Myprolist = JSON.parse(localStorage.getItem("Myprolist"))
						firstfun()
						getTotal()
				}
				
				$scope.goCom = function(){
					var a=0;
						if($scope.Myprolist!=null || $scope.Myprolist!=undefined){
							for(var i=0;i<$scope.Myprolist.length;i++){
								if($scope.Myprolist[i].checked){
									$("a.bill").attr("href","#/comfirm_order")
									a+=1;
								}
							
							}
						}
						if(a==0){
							$("a.bill").attr("href","javascript:;")
									$ionicPopup.alert({
										title:"请选择商品",
										okText:'确定',
										okType:'button-positive',
									})
						}
					
				}
				$scope.del = function(){
					var confirmPopup = $ionicPopup.confirm({
						title:"确认删除选中商品",
						okText:'确定',
						okType:'button-positive',
						cancelText:'取消',
						cancelType:'button-assertive'
					})
					confirmPopup.then(function(rel){
						if(rel){
							$scope.Myprolistjsn = JSON.parse(localStorage.getItem("Myprolist"))
							var proArr=[],
								newproArr=[],
								a=0;
							if($scope.Myprolistjsn!=null || $scope.Myprolistjsn!=undefined){
								for(var i=0;i<$scope.Myprolistjsn.length;i++){
									proArr.push($scope.Myprolistjsn[i])
								}		
							}
							console.log(proArr)
							for(var i=0;i<proArr.length;i++){
								if($scope.Myprolist[i].checked==false){
									newproArr.push($scope.Myprolist[i])
								}else{
										
											a+=1;
									  var  old_mon = parseInt(proArr[i].price)*parseInt(proArr[i].num),
										   all_mon = parseInt($(".all_pri P span").text().replace("￥", "")),
										   new_mon = all_mon - old_mon;
										   $(".all_pri p>span").text("￥"+new_mon+".00")
								}
								localStorage.setItem("Myprolist",JSON.stringify(newproArr))
								localStorage.getItem("Myprolist")
							}
							if(a==0){
								$ionicPopup.alert({
									title:"请选择商品",
									okText:"确定"
								})
							}else{
									$scope.Myprolist =JSON.parse(localStorage.getItem("Myprolist"));
									$scope.checkAll = false
							}
						}
					})
				}
				setCheck()
				getTotal()
})
.controller('procateCrl',function($scope,$ionicSideMenuDelegate,$state,$ionicPopup){
			$scope.cateimgArr =[
				{id:1,srcPic:"./img/pro_sor01.jpg",name:'龙抬头系列'},
				{id:2,srcPic:"./img/pro_sor01.jpg",name:'龙抬头系列'},
				{id:3,srcPic:"./img/pro_sor01.jpg",name:'龙抬头系列'},
				{id:4,srcPic:'img/sort02.jpg',name:'洞藏系列'},
				{id:5,srcPic:'img/sort02.jpg',name:'洞藏系列'},
				{id:6,srcPic:'img/sort02.jpg',name:'洞藏系列'},
				{id:7,srcPic:'img/sort03.jpg',name:'锁弄井系列'},
				{id:8,srcPic:'img/sort03.jpg',name:'锁弄井系列'},
				{id:9,srcPic:'img/sort03.jpg',name:'锁弄井系列'},
				{id:10,srcPic:'img/sort04.jpg',name:'其他系列'},
				{id:11,srcPic:'img/sort04.jpg',name:'其他系列'},
				{id:12,srcPic:'img/sort04.jpg',name:'其他系列'}
			]
			$scope.sortArr=[]
			$scope.newsort=[]
			var check=$(".silide ul li.active").text()
			for(var i=0;i<$scope.cateimgArr.length;i++){
					if($scope.cateimgArr[i].name==check){
						$scope.sortArr.push($scope.cateimgArr[i])
					}
				}
			$(".silide ul li").click(function(){
				$(this).addClass("active").siblings().removeClass("active")
				var check=$(this).text()
				$scope.sortArr=[]
				for(var i=0;i<$scope.cateimgArr.length;i++){
					if($scope.cateimgArr[i].name==check){
						$scope.sortArr.push($scope.cateimgArr[i])
					}
				}
				console.log($scope.sortArr)
				$scope.$apply();
			})
})
.controller('prolistCrl',function($scope,$ionicSideMenuDelegate,$ionicPopup){
	$scope.prolistArr = [
		{id:1,proPic:"img/prolist01.png",name:"百年大双龙酒",cap:"600ml/瓶",smell:"浓香型",price:85.00,old_pri:385.00,sortName:"商品"},
		{id:2,proPic:"img/prolist01.png",name:"百年大双龙酒",cap:"600ml/瓶",smell:"浓香型",price:185.00,old_pri:385.00,sortName:"商品"},
		{id:3,proPic:"img/prolist01.png",name:"百年大双龙酒",cap:"600ml/瓶",smell:"浓香型",price:20.00,old_pri:385.00,sortName:"商品"},
		{id:4,proPic:"img/prolist01.png",name:"百年大双龙酒",cap:"600ml/瓶",smell:"浓香型",price:585.00,old_pri:385.00,sortName:"商品"},
		{id:5,proPic:"img/prolist01.png",name:"百年洞藏龙酒",cap:"600ml/瓶",smell:"浓香型",price:585.00,old_pri:385.00,sortName:"洞藏系列"},
		{id:6,proPic:"img/prolist01.png",name:"百年龙抬头酒",cap:"600ml/瓶",smell:"浓香型",price:585.00,old_pri:385.00,sortName:"龙抬头系列"},
		{id:7,proPic:"img/prolist01.png",name:"百年锁弄系列酒",cap:"600ml/瓶",smell:"浓香型",price:585.00,old_pri:385.00,sortName:"锁弄井系列"},
		{id:8,proPic:"img/prolist01.png",name:"百年其他系列酒",cap:"600ml/瓶",smell:"浓香型",price:585.00,old_pri:385.00,sortName:"其他系列"}
	]
	$scope.addcrat = function($index){
		 var prolacal = localStorage.getItem('Myprolist'),
			 	Myprolist = [],
			 	len,
			 	proLcalJson =JSON.parse(prolacal);
		 	if(proLcalJson !=null ){
		 		len = proLcalJson.length;;
		 		for(i=0;i<len;i++){
		 			Myprolist.push(proLcalJson[i])
		 		}
		 	}
		var pro_title = $(".good_name h1 a").html(),
 			pro_num = 1,
 			pro_img = $(".good_con ul li img").attr('src'),
 			pro_price = $(".right p:first-child span").eq($index).html().replace("￥",'');
 		for(var x=0;x<Myprolist.length;x++){
 			if(pro_price == Myprolist[x].price){
 				Myprolist[x].num = parseInt(Myprolist[x].num)+parseInt(pro_num)
 				localStorage.setItem("Myprolist",JSON.stringify(Myprolist));
 				console.log(localStorage.getItem("Myprolist"))
 				$ionicPopup.alert({
		 			title:"添加购物车成功",
		 			okText:"确定"
	 			
	 			})
 				return false;
 			}
 		}
 		localDate(pro_title,pro_num,pro_img,pro_price)
 
 	
 	function localDate(title,num,img,price){
 		var product = {
 			title:title,
 			num:num,
 			img:img,
 			price:price,
 			checked:true
 		}
	 		Myprolist.push(product)
	 		localStorage.setItem("Myprolist",JSON.stringify(Myprolist))
	 		$ionicPopup.alert({
	 			title:"添加购物车成功",
	 			okText:"确定"
	 			
	 		})
	 		console.log(localStorage.getItem("Myprolist"))
 		}
	}
	$scope.prolistShow = []
	$scope.newprilist = []
	var Key = $("ul li.active").text();
	for(var i=0;i<$scope.prolistArr.length;i++){
		if($scope.prolistArr[i].sortName ==Key){
			$scope.prolistShow.push($scope.prolistArr[i])
		}
	}
	$(".proList-top ul li").click(function(){
		$(this).addClass("active").siblings().removeClass("active")
		$scope.prolistShow = []
		var Key = $(this).text();
		for(var i=0;i<$scope.prolistArr.length;i++){
		if($scope.prolistArr[i].sortName ==Key){
			$scope.prolistShow.push($scope.prolistArr[i])
			}
		}
		$scope.$apply();
	})
	$scope.mintext=function(index){
		$scope.num = $(".prolist_con p span:nth-child(2) input").val()
		if(isNaN($scope.num)){
		$(".prolist_con p span:nth-child(2) input").val(10)
		}
	}
	$scope.filter = function(){
		$scope.max =$(".prolist_con p span:last-child input").val();
		if(isNaN($scope.max)){
			$(".prolist_con p span:last-child input").val(20)
		}
		var num = $(".prolist_con p span:nth-child(2) input").val()
		var max =$(".prolist_con p span:last-child input").val();
		$scope.choseArr = [];
		$scope.prolistShow=[]
		var check = $(".proList-top ul li.active").text()
		for(var i=0;i<$scope.prolistArr.length;i++){
			if($scope.prolistArr[i].sortName == check){
				$scope.prolistShow.push($scope.prolistArr[i])
			}
		}
		for(var i=0;i<$scope.prolistShow.length;i++){
			$scope.choseArr.push($scope.prolistShow[i])	
		}
		$scope.prolistShow = [];
		for(var i=0;i<$scope.choseArr.length;i++){
			if(num<$scope.choseArr[i].price && $scope.choseArr[i].price<max){
				$scope.prolistShow.push($scope.choseArr[i])
				console.log($scope.prolistShow)
			}
		}
	}
	
})
.controller('searchCrl',function($scope,$ionicSideMenuDelegate,$timeout){
	$timeout(function(){
		document.getElementById("auto").focus();		
	},200)
	$scope.seaArr = [
		{id:1,searName:"龙泉春白酒"},
		{id:2,searName:"龙泉春白酒"},
		{id:3,searName:"龙泉春白酒"},
		{id:4,searName:"龙泉春白酒"},
		{id:5,searName:"龙泉春白酒"}
	]
})
.controller('comfilrCrl',function($scope,$ionicSideMenuDelegate){
	$scope.orderArr = [
		{id:1,img:"img/shop01.jpg",name:"39°锁龙井市酒500ml",price:358.00,num:"x1"},
		{id:2,img:"img/shop01.jpg",name:"39°锁龙井市酒500ml",price:358.00,num:"x1"}
	]
})
.controller('orderCrl',function($scope,$ionicSideMenuDelegate){
	$scope.myOrderArr = [
		{id:1,img:"img/order01.png",name:"39°锁龙井市酒500ml",price:358.00,statu:"待发货",num:"x1"},
		{id:2,img:"img/order01.png",name:"39°锁龙井市酒500ml",price:358.00,statu:"待发货",num:"x1"},
		{id:3,img:"img/order01.png",name:"39°锁龙井市酒500ml",price:358.00,statu:"待发货",num:"x1"},
		{id:4,img:"img/order01.png",name:"39°锁龙井市酒500ml",price:358.00,statu:"待评价",num:''},
		{id:5,img:"img/order01.png",name:"39°锁龙井市酒500ml",price:358.00,statu:"待评价",num:''},
		{id:6,img:"img/order01.png",name:"39°锁龙井市酒500ml",price:358.00,statu:"待评价",num:''}
	]
})
.controller('payCrl',function($scope,$ionicPopup){
	$scope.payCom = function($event){
		var confirmPopup = $ionicPopup.confirm({
			title:"确认支付",
			okText:'确定',
			okType:'button-positive',
			cancelText:'取消',
			cancelType:'button-assertive'
		})
		confirmPopup.then(function(res){
		if(res){
			var confirmPopup = $ionicPopup.show({
				title:"<img src='img/smile.png'>",
				subTitle:'恭喜！支付成功',
				template:"<p>订单号：D1638445412558255</p> <p>收货人：王小二</p> <p>电   话：13866832952</p> <p>地   址：重庆石桥铺雨林商都6011</p>",
				scope:$scope,
				buttons:[{
					text:'查看详情',
					type:'button-default',
					onTap:function(){
							window.location.href='#/order';
						}
					},
					{
					text:"继续购物",
					type:'button-default',
					onTap:function(){
							window.location.href='#/pro_list';
						}
					}
				]	
			})
		}else{
            var confirmPopup = $ionicPopup.show({
				title:"<img src='img/tear.png'>",
				subTitle:'糟糕！支付失败',
				template:"<p class='failu'>账上余额不足~~</p> ",
				scope:$scope,
				buttons:[{
					text:'查看详情',
					type:'button-default',
					onTap:function(){
							window.location.href='#/order';
						}
					},
					{
					text:"继续支付",
					type:'button-default',
					}
				]	
			})
		}
	})
	}
	
})
.controller('prodetails',function($scope,$rootScope,$http,$timeout,$ionicLoading,$window){
	         var prolacal = localStorage.getItem('Myprolist'),
			 	Myprolist = [],
			 	len,
			 	proLcalJson =JSON.parse(prolacal);
		 	if(proLcalJson !=null ){
		 		len = proLcalJson.length;;
		 		for(i=0;i<len;i++){
		 			Myprolist.push(proLcalJson[i])
		 		}
		 	}
	$scope.addshopcar=function(){
		 	
		 	var pro_title = $(".deta_con .top h1>i").html(),
		 			pro_num = $(".deta_con .top h1>span").html(),
		 			pro_img = $(".img_slide img").attr('src'),
		 			pro_price = $(".deta_con .top p>i").html().replace("￥",'');
		 		for(var x=0;x<Myprolist.length;x++){
		 			if(pro_title == Myprolist[x].title){
		 				Myprolist[x].num = parseInt(Myprolist[x].num)+parseInt(pro_num)
		 				localStorage.setItem("Myprolist",JSON.stringify(Myprolist));
		 				console.log(localStorage.getItem("Myprolist"))
		 				return false;
		 			}
		 		}
		 		localDate(pro_title,pro_num,pro_img,pro_price)
		 
		 	
		 	function localDate(title,num,img,price){
		 		var product = {
		 			title:title,
		 			num:num,
		 			img:img,
		 			price:price,
		 			checked:true
		 		}
		 		Myprolist.push(product)
		 		localStorage.setItem("Myprolist",JSON.stringify(Myprolist))
		 		console.log(localStorage.getItem("Myprolist"))
		 	}
	}
	
	$scope.buyOnce =function(){
//			var pro_title = $(".deta_con .top h1>i").html(),
//		 			pro_num = $(".deta_con .top h1>span").html(),
//		 			pro_img = $(".img_slide img").attr('src'),
//		 			pro_price = $(".deta_con .top p>i").html().replace("￥",'');
//		 		for(var x=0;x<Myprolist.length;x++){
//		 			if(pro_title == Myprolist[x].title){
//		 				Myprolist[x].num = parseInt(Myprolist[x].num)+parseInt(pro_num)
//		 				localStorage.setItem("Myprolist",JSON.stringify(Myprolist));
//		 				console.log(localStorage.getItem("Myprolist"))
//		 				return false;
//		 			}
//		 		}
//		 		localDate(pro_title,pro_num,pro_img,pro_price)
//		 
//		 	
//		 	function localDate(title,num,img,price){
//		 		var product = {
//		 			title:title,
//		 			num:num,
//		 			img:img,
//		 			price:price,
//		 			checked:true
//		 		}
//		 		Myprolist.push(product)
//		 		localStorage.setItem("Myprolist",JSON.stringify(Myprolist))
//		 		console.log(localStorage.getItem("Myprolist"))
//		 	}
	}
	$scope.loadMore=function(){
		$ionicLoading.show({
			template:'<ion-spinner ison="android" class="spinner spinner-android"></ion-spinner>',
			noBackdrop:false
		})
		$timeout(function(){
			$ionicLoading.hide();
		},1500)
	}
})
.config(function($httpProvider){
		$httpProvider.defaults.transformRequest = function(obj){
			var str = [];
			for(var p in obj){
				str.push(encodeURIComponent(p) +"="+ encodeURIComponent(obj[p]));
			}
			return str.join("&");
		}
		$httpProvider.defaults.headers.post = {
			'Content-Type':'application/x-www-form-urlencoded'		
		}
})
.controller("registerCrl",function($scope,$http,$window,$interval,$ionicPopup){
	$scope.focusBool = false;
	$scope.pasfocu = false;
	$scope.phoneBool = false;
	$scope.codeBool = false
	
	$scope.inputFocus = function(){
		$scope.errorBool = false;
		$scope.focusBool = true;
	}
	$scope.inputBlur = function(val){
		console.log(val)
		$http({
			method:'GET',
			url:'https://woiad.github.io/longquan/longquan/js/user.json'
		}).success(function(data){
			if(data[val]==undefined){
				if(val !=undefined){
					$scope.textError = "用户名可用";
					$scope.errorBool = true;
					$scope.styleBlur = {"font-size":"0.18rem","color":"red"}
				}
				return ;
			}else{
				$scope.textError = "用户名已被注册";
				$scope.errorBool = true;
				$scope.styleBlur = {"font-size":"0.18rem","color":"red"}
			}
		})
	}
	$scope.pasinp = function(){
		$scope.pasfocu = true		
	}
	$scope.phninp = function(){
		$scope.phoneBool = true
	}
	$scope.codeinp =function(){
		$scope.codeBool=true	
	}
	$scope.submitBtn = function(name,pwd,phonemol,codemol,check){
		
		if(name==undefined || phonemol==undefined || pwd==undefined || codemol==undefined ||check==undefined ||$scope.textError == "用户名已被注册"){
			$ionicPopup.alert({
				title:"输入信息有误",
				okText:"确定"
			})
			return false;
		}
		$scope.user = {username:name,password:pwd}
		console.log($scope.user)
		$http({
			method:'PUT',
			url:'https://woiad.github.io/longquan/longquan/js/index.php',
			data:$scope.user
		}).success(function(){
			alert(1)
			$window.location.href = "#/login"
		})
	}
	$scope.codeText = "点击获取验证码";
	var source = 60;
	$scope.codeEvent = function(){
		alert(1)
		$scope.codeText = source+"s后获取"
		$scope.disable = true;
		var time =$interval(function(){
			if(source==0){
				$scope.codeText = "重新获取验证码"
				$scope.disable = false;
				$interval.cancel(time)
				source = 60;
			}else{
				source --;
				$scope.codeText = source+"s后获取"
			}
		},1000)
	}
})
.controller("loginCrl",function($scope,$http,$window,$ionicPopup){
	$scope.nameBool = false;
	$scope.passBool = false
	$scope.inputfocu = function(){
		$scope.nameBool = true
		$scope.useEit = false
	}
	$scope.ipnutblur = function(val){
		$http({
			method:'GET',
			url:"https://woiad.github.io/longquan/longquan/js/user.json"
		}).success(function(data){
			if(data[val]==undefined){
				if(val!=undefined){
					$scope.useEit = true;
					$scope.useText = "该用户不存在"	
				}
			}else{
				$scope.useEit = true;
				$scope.useText = "该用户可用"
			}
		})
	}
	$scope.pawfocu = function(name,password){
		$scope.passBool = true
		$scope.passtip = false
	}
	$scope.pwdblur = function(name,password){
		$http({
			method:'GET',
			url:"https://woiad.github.io/longquan/longquan/js/user.json"
		}).success(function(data){
			if(name!=undefined && password!=undefined){
				var exitPwd = data[name].password;
				if(password!=exitPwd){
					$scope.passtip = true;
					$scope.passText="密码错误"
				}else{
					$scope.passtip = true;
					$scope.passText="密码正确"
				}
			}
		})
	}
	$scope.login = function(name,password,check){
		$http({
			method:'GET',
			url:"https://woiad.github.io/longquan/longquan/js/user.json"
		}).success(function(data){
			if(data[name]!=undefined && data[name].password==password){
				if(check){
					localDate(name,password,check)
				}
				$window.location.href="#/app/home"
			}else{
				$ionicPopup.alert({
				title:"输入信息有误",
				okText:"确定"
				})
			}
		})
	}
	var localDate = function(name,password,check){
		var user={
			username:name,
			password:password,
			check:check
		}
		localStorage.setItem("user",JSON.stringify(user))
	}
	if(localStorage.getItem("user")!=undefined && localStorage.getItem("user")!=null){
		var userIform = localStorage.getItem("user"),
			userjson = JSON.parse(userIform);
			$scope.nameLog = userjson.username;
			$scope.pwdLog = userjson.password;
			$scope.rember = userjson.check;
			
	}
})
.controller("userCrl",function($scope){
	if(localStorage.getItem("user")!=undefined || localStorage.getItem("user")!=null){
		var userlist = JSON.parse(localStorage.getItem("user"))
		console.log(userlist)
		$(".head_img p").text(userlist.username)
	}else{
		$(".head_img p").text("")
	}
})
//.controller('startCrl',function($scope,$state){
//	$state.go('app.home');
//})

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
		{"img":"./img/guide_1.jpg"},
		{"img":"./img/guide_2.jpg"},
		{"img":"./img/guide_3.jpg"}
	]
})
