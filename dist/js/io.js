"use strict";
exports.__esModule = true;
var kbd = require('kbd');
var IO = (function () {
    function IO() {
    }
    IO.prototype.read = function () {
        return kbd.getLineSync();
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