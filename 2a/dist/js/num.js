"use strict";
exports.__esModule = true;
var num = (function () {
    function num(txt) {
        this.n = 0;
        this.mu = 0;
        this.m2 = 0;
        this.sd = 0;
        this.id = "";
        this.lo = Math.pow(10, 32);
        this.hi = -1 * Math.pow(10, 32);
        this.txt = txt;
        this.w = 0;
    }
    num.prototype.numInc = function (t, x, d) {
        if (x == "?") {
            return x;
        }
        t.n++;
        d = x - t.mu;
        t.mu = t.mu + d / t.n;
        t.m2 = t.m2 + d * (x - t.mu);
        if (x > t.hi) {
            t.hi = x;
        }
        if (x < t.lo) {
            t.lo = x;
        }
        if (t.n >= 2) {
            t.sd = Math.pow((t.m2 / (t.n - 1 + Math.pow(10, -32))), 0.5);
        }
        return x;
    };
    num.prototype.numDec = function (t, x, d) {
        if (x == "?") {
            return x;
        }
        if (t.n == 1) {
            return x;
        }
        t.n--;
        d = x - t.mu;
        t.mu = t.mu - d / t.n;
        t.mu2 = t.m2 - d * (x - t.mu);
        if (t.n >= 2) {
            t.sd = Math.pow((t.m2 / (t.n - 1 + Math.pow(10, -32))), 0.5);
        }
        return x;
    };
    num.prototype.numNorm = function (t, x, y) {
        if (x == "?") {
            return 0.5;
        }
        else {
            return (x - t.lo) / (t.hi - t.lo + Math.pow(10, -32));
        }
    };
    num.prototype.numPdf = function (t, x) {
        return Math.exp(-1 * Math.pow((x - t.mu), 2) / (2 * Math.pow(t.sd, 2))) * 1 / (t.sd * (Math.pow((2 * Math.PI), 0.5)));
    };
    num.prototype.numXpect = function (i, j, n) {
        n = i.n + j.n + 0.0001;
        return i.n / n * i.sd + j.n / n * j.sd;
    };
    return num;
}());
exports.num = num;
//# sourceMappingURL=num.js.map