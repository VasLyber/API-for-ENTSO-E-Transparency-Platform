const readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: ''
});


var x;
let command_line_interface_prompt_string = function(){
	return x;
}
const command_line_interface_prompt = () => {
	
  return new Promise((resolve, reject) => {
    rl.question('>', (answer) => {
	  x=answer;
      resolve()
    })
  })
}
const command_line_interface_prompt_username = () => {
  return new Promise((resolve, reject) => {
    rl.question('Username:', (answer) => {
      resolve()
    })
  })
}

const command_line_interface_prompt_username_password=()=> {
	rl.input.on("keypress", function (c, k) {
	  // get the number of characters entered so far:
	  var len = rl.line.length;
	  var string=rl.line;
	  // move cursor back to the beginning of the input:
	  readline.moveCursor(rl.output, -len, 0);
	  // clear everything to the right of the cursor:
	  readline.clearLine(rl.output, 1);
	  // replace the original input with asterisks:
	  for (var i = 0; i < len; i++) {
		rl.output.write("*");
	  }
	});
	return new Promise((resolve,reject)=>{
		rl.question("Enter your password: ", function (pw) {
	 
		  console.log(pw);
		  resolve();
		})
	})
}
const command_line_interface_prompt_callibrator=()=> {
	rl.input.on("keypress", function (c, k) {
	  var len = rl.line.length;
	  var string=rl.line;
	  readline.moveCursor(rl.output, -len, 0);
	  readline.clearLine(rl.output, 1);
	  rl.output.write(string);
	 
	});
}
module.exports={
	command_line_interface_prompt,
	command_line_interface_prompt_string,
	command_line_interface_prompt_username,
	command_line_interface_prompt_username_password,
	command_line_interface_prompt_callibrator
	
}