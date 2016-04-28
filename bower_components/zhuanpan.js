var Book=function (title,time,type) {
	var a=1;
	if (this instanceof Book) {
		this.title=title;
		this.time=time;
		this.type=type;
	} else {
		return new Book(title,time,type);
	}
}
Book.a=10;
var book=Book('javascript','2016','js');
console.log(Book.a);//Book
console.log(book);//Book
console.log(book.title);//javascript
console.log(book.time);//2016
console.log(book.type);//js
console.log(window.title);//undefined
console.log(window.time);//undefined
console.log(window.type);//undefined
