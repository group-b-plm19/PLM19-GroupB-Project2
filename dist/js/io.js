"use strict";
exports.__esModule = true;
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
var input_stack = [];
rl.on('line', function (line) {
    input_stack.push(line);
});
var IO = (function () {
    function IO() {
    }
    IO.prototype.read = function () {
        return input_stack.splice(0, 1);
    };
    IO.prototype.input = function (file) {
    };
    IO.prototype.write = function (msg) {
        process.stdout.write(msg);
    };
    IO.prototype.close = function () {
    };
    return IO;
}());
exports.IO = IO;
//# sourceMappingURL=io.js.map