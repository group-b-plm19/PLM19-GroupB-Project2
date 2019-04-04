"use strict";
exports.__esModule = true;
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var promise_stack = [];
rl.on('line', function (line) {
    var func = promise_stack.splice(0, 1)[0];
    if (func)
        func(line);
});
function read() {
    return {
        then: function (resolve) {
            promise_stack.push(resolve);
        }
    };
}
exports.read = read;
function write(msg) {
    process.stdout.write(msg);
}
exports.write = write;
//# sourceMappingURL=io.js.map