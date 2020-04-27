const express = require('express');
var mysql = require('mysql');
const reset_database=require('./Reset');
const healthcheck_database=require('./Healthcheck');
const help_print=require('./Help');
const database_dreate=require('./Database_Create');
const command_line_interface=require('./Command_Line_Interface');
/*const authRoute=require('./Authentication');
const app = express();
var port = process.env.PORT || 8764;
app.use('/api/user',authRoute);
app.listen(8764,()=>console.log('Listening on the port 8765'));
*/
const main = async () => {
	while(1){
		//await question1()
		await command_line_interface.command_line_interface_prompt();
		var connection=database_dreate.create_database();
		switch (command_line_interface.command_line_interface_prompt_string()) {
			case '/Help':
				help_print.help();
				break;
			case '/Healthcheck':
				healthcheck_database.healthcheck(connection);
				break;
			case '/print_users':
				connection.query("SELECT * FROM user_data",function(error,rows,fields){
					if(!!error){
						console.log('Error in the query');
					}
					else{
						console.log('Successful query');
						console.log(rows);
					}
				});
				break;
			case '/Reset':
				reset_database.reset(connection);
				break;
			case '/Register':
				//reset_database.reset(connection);
				break;
			case '/Login':
				await command_line_interface.command_line_interface_prompt_username();
				await command_line_interface.command_line_interface_prompt_username_password();
				await command_line_interface.command_line_interface_prompt_callibrator();
				break;
			case '/Admin':
				await command_line_interface.command_line_interface_prompt_username();
				await command_line_interface.command_line_interface_prompt_username_password();
				await command_line_interface.command_line_interface_prompt_callibrator();
				
				break;
			case '/Exit':
				process.exit(0);
			}
				
		}
}
main()