var mysql = require('mysql');

var option = {
	  host            : 'sqld.duapp.com',
	  port            : 4050,
	  user            : '61Lhhx78F15O3Fr8KMLPuQ8Z',
	  password        : 'ciL8LEMTrlWguRxjgWC9fnZS20hhcXKt',
	  database        : 'UUQJMItxeMZumdKbeHSH'
	  };

function getConnection(callback){
	var connection  = mysql.createConnection(option);

	connection.connect(function(err){
	  if (err) {
		callback('connect error');
		return;
	  }
	});
		
	connection.on('error',function(err) {
	  if (err.errno != 'ECONNRESET') {
		throw err;
	  } else {
		// do nothing
	  }
	});

	return connection;
}

exports.getConnection = getConnection;