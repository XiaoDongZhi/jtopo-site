var express = require('express');
var path = require('path');
var app = express();

var db = require('./dbtest');
 
app.configure(function(){
    app.set('port', 18080);
    //app.set('views', __dirname + '/views');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('expressdemo'));
    app.use(express.session());	
    
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	//app.use(express.static(__dirname, 'public'));
    app.use(express.errorHandler());
});

function render(res, obj){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.send(obj);
}

app.get('/users', function(req, res){
	var conn = db.getConnection();
	conn.query("select * from User" , function(err, results, fields){
		if(err){
			render(res, JSON.stringify(err));
		}else{
			render(res, JSON.stringify(results));
		}
		conn.end();
	});
})

app.listen(18080);
/*
var http = require('http');
var port = 18080;
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World</p>');
}).listen(port);
*/
