
// const fs = require('fs');

// const kbd = require('kbd');

var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

var input_stack = [];

rl.on('line', function (line) {
	input_stack.push(line);
})

export class IO {
	read() {
		return input_stack.splice(0, 1);
	}

	input(file?) {
		//set global file pointer
		//from path `file` or stdin

		//as far as I know no files are used. just stdin/stdout
	}

	write(msg) {
		process.stdout.write(msg);
	}

	close() {
		//presumably close the global file pointer
	}
}