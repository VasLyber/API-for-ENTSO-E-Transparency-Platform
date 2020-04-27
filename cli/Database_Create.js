var mysql = require('mysql');
let create_database =function(){
	var connection = mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: '',
				database: 'usersdatabase'
			});
	return connection;
}
module.exports = { 
   create_database
} 