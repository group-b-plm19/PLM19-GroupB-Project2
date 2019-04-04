"use strict";
exports.__esModule = true;
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var promise_stack = [];
var stdin_stack = [];
rl.on('line', function (line) {
    var promisedQueued = promise_stack.splice(0, 1)[0];
    if (promisedQueued) {
        promisedQueued(line);
    }
    else {
        stdin_stack.push(line);
    }
});
function read() {
    var stdin_queued = stdin_stack.splice(0, 1)[0];
    return {
        then: function (resolve) {
            if (stdin_queued) {
                resolve(stdin_queued);
            }
            else {
                promise_stack.push(resolve);
            }
        }
    };
}
exports.read = read;
function print(msg) {
    process.stdout.write(msg + "\n");
}
exports.print = print;
//# sourceMappingURL=io.js.map