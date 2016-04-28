

function option(data1,ci,rep,users) {
	var text;
	data1=data1.trim();
	data1=data1.replace(/\n/g,'');

		var t=1;
		var n=0;
		var sum=[];
		var svm=[];
		
		var re1=/(再见|拜拜|bye)\b/;
		// console.log(dataa);
		if (users.length) {
			users.forEach(function (v) {
				if (data1==v) {
					n++;
				}
			})
		}
		if (n==1) {
			text='你已经说过一次了';
			n=0;
		}else if(n==2){
			text='你很烦哎';
			n=0;
		}else if(n==3){
			text='不跟你聊了，再见！';
		}else if(n==0){
			for (var i = 0; i < ci.length; i++) {
				if (data1==ci[i]) {
					svm.push(rep[i]);
					t=0;
				}else if(data1.indexOf(ci[i])>=0) {
					sum.push(rep[i]);
					t=0;
				}
			}
			if (t==1) {
				if (re1.test(data1)) {
					text='下次再见咯！';
				} else {
					text='我听不懂你说什么';
					t=0;
				}
			}else{
				if (svm.length) {
					var val=Math.round(Math.random()*(svm.length-1));
					text=svm[val];

				} else {
					var val=Math.round(Math.random()*(sum.length-1));
					text=sum[val];

				}
				
			}
		}
		users.push(data1);
		return text;
}
exports.option=option;