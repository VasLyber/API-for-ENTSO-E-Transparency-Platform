
let reset =function(connection) {
    connection.end(function(err) {
		});
	connection.connect(function(error){
		if(!!error){
			console.log('The reset was successful ');
		}
		else{
			console.log('Connected');
		}
	});
}

module.exports = { 
   reset
} 