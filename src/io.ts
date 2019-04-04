
// const fs = require('fs');

// const kbd = require('kbd');

var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

var promise_stack = [];

rl.on('line', function (line) {
	var func = (promise_stack.splice(0, 1)[0] as any);
	if (func)
		func(line)
})

export function read() {
	// console.log("reading:" + input_stack.slice(0, 1))//debug
	// return input_stack.splice(0, 1)[0];

	return {
		then: (resolve) => {
			promise_stack.push(resolve)
		}
	};
}

// input(file?) {
// 	//set global file pointer
// 	//from path `file` or stdin

// 	//as far as I know no files are used. just stdin/stdout
// }

export function write(msg) {
	process.stdout.write(msg);
}

// close() {
// 	//presumably close the global file pointer
// }