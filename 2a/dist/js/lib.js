"use strict";
exports.__esModule = true;
var config = require("./config");
var n = 0;
function id() {
    n++;
    return n;
}
function fy(x) {
    console.error(x);
}
function fyi(x) {
    console.error(x);
}
var seed0 = config.Lean.random.seed;
var seed = seed0;
var modulus = 2147483647;
var multipler = 16807;
function rseed(n) { seed = n || seed0; }
function rand() {
    seed = (multipler * seed) % modulus;
    return seed / modulus;
}
function another(x, t, y) {
    y = cap(Math.floor(0.5 + rand() * t.length), 1, t.length);
    if (x == y)
        return another(x, t);
    if (t[y])
        return t[y];
    return another(x, t);
}
exports.another = another;
function any(t, x) {
    return t[cap(Math.floor(0.5 + rand() * t.length), 1, t.length)];
}
function cat(x, y) {
    return x.concat(y);
}
exports.cat = cat;
function dump(a, sep) {
    console.log("dumped");
    for (var i = 0; a < a.length; i++) {
        console.log(cat(a[i], sep || ","));
    }
}
exports.dump = dump;
function first(t) { return t[0]; }
function second(t) { return t[1]; }
function last(t) { return t[t.length - 1]; }
function splice(t, m, n, f) {
    f = f || (function (x) { return x; });
    m = m || 1;
    n = n || t.length;
    if (n > t.length)
        n = t.length;
    var u = [];
    for (var i = m; i < n; i++)
        u[u.length + 1] = f(t[i]);
    return u;
}
function cap(x, lo, hi) {
    return Math.min(hi, Math.max(lo, x));
}
//# sourceMappingURL=lib.js.map