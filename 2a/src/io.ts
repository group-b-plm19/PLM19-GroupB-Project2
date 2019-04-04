
// A mess of concurrency this is!

var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

var promise_stack = [];
var stdin_stack = [];

rl.on('line', function (line) {

	var promisedQueued = (promise_stack.splice(0, 1)[0] as any);
	if (promisedQueued) {
		// console.log("Popped: " + line)
		promisedQueued(line)
	}
	else {
		// console.log("Queued: " + line)
		stdin_stack.push(line); // you'll need this later
	}

})

export function read() {
	// console.log("reading");//debug
	var stdin_queued = stdin_stack.splice(0, 1)[0];

	return {
		then: (resolve) => {
			if (stdin_queued) {
				// console.log("Popped Promise");
				resolve(stdin_queued);
			}
			else {
				// console.log("Queued Promise");
				promise_stack.push(resolve) // I promise I'll do it later
			}
		}
	};
}

// input(file?) {
// 	//set global file pointer
// 	//from path `file` or stdin

// 	//as far as I know no files are used. just stdin/stdout
// }

export function print(msg) {
	process.stdout.write(msg + "\n");
}

// close() {
// 	//presumably close the global file pointer
// }