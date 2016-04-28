
	var socket=io.connect('http://114.215.164.105:80');

	socket.on('connect',function () {
		socket.emit('join',prompt('请填写你的真实名字哦?'));
		$('.main').css('display','block');
		
	})
	socket.on('ann',function (msg) {

		$('.messages').append('<li class="miya message"><img class="img-responsive img-thumbnail" src="/images/miya.jpg" alt="" /><span>欢迎'+msg+'!</span></li>');
	})
	var input=document.getElementById('input');
	var form=document.getElementById('form');
	form.onsubmit=function () {
		addMessage(input.value);
		socket.emit('text',input.value);
		
		input.value='';
		return false;
	}
	socket.on('reply',addMiya);
	function addMessage(text) {
		$('.messages').append('<li class="user message"><span>'+text+'</span><img class="img-responsive img-thumbnail" src="/images/user.jpg" alt="" /></li>');
	}
	function addMiya(text) {

		$('.messages').append('<li class="miya message"><img class="img-responsive img-thumbnail" src="/images/miya.jpg" alt="" /><span>'+text+'</span></li>');
		var lis=document.getElementsByClassName('message');
		lis[lis.length-1].scrollIntoView();
		if (text=="祝你中奖哦~") {
			setTimeout(function () {
				$('.main').fadeToggle("slow", "swing");
				$('.main1').fadeToggle("slow", "swing");
			},1000)
		}
	}

	var oZhi=document.getElementsByClassName('zhizhen');
		var oZhuan=document.getElementsByClassName('zhuanpan');
		var cssRule;

		var rol=0;
		var news;
		function getRule() {
		      var rule;
		      var ss = document.styleSheets;
		      for (var i = 0; i < ss.length; ++i) {
		          // loop through all the rules!
		          for (var x = 0; x < ss[i].cssRules.length; ++x) {
		              rule = ss[i].cssRules[x];
		              if (rule.name == "action" && rule.type == CSSRule.KEYFRAMES_RULE) {
		                  cssRule = rule;
		              }
		          }
		      }
		  }
		getRule();
		socket.on('bianma',function (msg,hint) {
			news=hint;
			rol=msg+360;
			cssRule.deleteRule("0");
  			cssRule.deleteRule("1");
  			cssRule.appendRule("0% { transform: rotate(0);}");
  			cssRule.appendRule("100% { transform: rotate("+rol+"deg);}"); 
			console.log(rol);
		})
		
		var ac=1;
		oZhi[0].onclick=function () {
			if (ac==1) {
				ac=0;
				oZhuan[0].style.animationPlayState='running';
				setTimeout(function () {
					oZhuan[0].style.animationPlayState='paused';
					alert(news);
				},1900)
			} else {
				alert('你已经抽过了哦！')
			}
			
		}