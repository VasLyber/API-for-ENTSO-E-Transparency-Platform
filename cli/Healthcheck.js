let healthcheck=function(connection){
	connection.connect(function(error){
		if(!!error){
			console.log('Error');
		}
		else{
			console.log('Connected');
		}
	}); 
}
module.exports={
	healthcheck
}