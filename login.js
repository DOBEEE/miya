var express = require('express');
var app = express();

var mongoose=require('mongoose');
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var port=process.env.PORT||3000;

// var server=require('http').server(app);
// server.listen(port);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(serveStatic('bower_components'))
app.use(serveStatic('node_modules'))
// app.set('views','./views/pages/');
// app.set('view engine','jade');


console.log('start on'+port);
db.connection.on('error',function(error) {
	console.log("数据库连接失败"+error);
})
db.connection.on('open',function() {
	console.log("数据库连接成功");
})

var TestSchema=new mongoose.Schema({
	name:{type:String},
	age:{type:Number,default:0},
	password:{type:String},
	email:{type:String,default:''}
})
var TestModel=db.model('test1',TestSchema);
var TestEntity=new TestModel({
	name:"hehe",
	age:18,
	email:"233@abc.com",
	password:"1232"
})
TestEntity.save(function (err,doc) {
	if (err) {
		console.log("error:"+err)
	} else {
		console.log(doc);
	}
})

app.get('/', function(req, res){
  res.render('index',{
		title:'miya'
	});
});