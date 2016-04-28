var fs=require('fs');
var express=require('express');
var miyaRead=require('./miya2');
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var port=process.env.PORT||80;

var app=express();
var server=require('http').Server(app)
var io=require('socket.io')(server);
server.listen(port);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(serveStatic('bower_components'))
app.use(serveStatic('node_modules'))
app.set('views','./views/pages/');
app.set('view engine','jade');


console.log('miya start on'+port);

var ci=[];
var rep=[];
var users=[];
var names;
fs.readFile('ini.txt','utf8',function (err,data) {

		var ree=new RegExp('\\r\\n\\r\\n(.+)\\r\\n(.+)\\r\\n','g');
		var dataa;
		
		while(ree.lastIndex<data.length){
			dataa=ree.exec(data);
			// console.log(ree.lastIndex);
			ci.push(dataa[1]);
			rep.push(dataa[2]);

		};
	})
io.sockets.on('connection',function (socket) {

	socket.on('join',function (name) {
		console.log('someone connect');
		name=name.trim();
		name=name.replace(/ /g,'');
		socket.nickname=name;
		names=name;
		users=[];
		socket.emit('ann',name);
	})
	socket.on('text',function (msg) {
		var ac=0;
		fs.readFile('zjmsg.json','utf8',function (err,data) {
			var JsonObj=JSON.parse(data);
			JsonObj.user.forEach(function (v) {
				if(v.name==names){
					ac=1;
				}

			})
		
		if (msg=='生日快乐') {
			if (ac==0) {
				socket.emit('reply','祝你中奖哦~');
				var number=Math.random()*10;
				var bianma;
				var hint;
				if (number>0&&number<=5.5) {
					bianma=45;
					hint='很遗憾呢，没中奖，不过还是谢谢！';
				} else if(number>5.5&&number<=7.9){
					bianma=180;
					hint='恭喜您抽中1毛钱！真的是1毛钱！';
				}else if(number>7.9&&number<=9.4){
					bianma=135;
					hint='恭喜你抽中1块钱！可以买包辣条了！';
				}else if(number>9.4&&number<9.9){
					bianma=90;
					hint='恭喜你抽中10块钱！狗屎运啊！';
				}else{
					bianma=270;
					hint='卧槽！你中了50元！';
				}
				fs.readFile('zjmsg.json','utf8',function (err,data) {
					var JsonObj=JSON.parse(data);
					JsonObj.user.push({name:names,jiang:hint});
					fs.writeFile('zjmsg.json',JSON.stringify(JsonObj));
				})
				socket.emit('bianma',bianma,hint);
			} else {
				socket.emit('reply','谢谢祝福，不过你已经抽过奖了哦~');
			}
			
		} else {
			var replys=miyaRead.option(msg,ci,rep,users);
			if (replys) {
				socket.emit('reply',replys);
			}
		}
	})
		
	})
	
})

app.get('/',function (req,res) {
	res.render('index',{
		title:'miya'
	});
})

// app.get('/choujiang',function (req,res) {
// 	res.render('zhuanpan',{
// 		title:'choujiang'
// 	});
// })