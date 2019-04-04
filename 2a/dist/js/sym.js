"use strict";
exports.__esModule = true;
function sym() {
    return { counts: {}, mode: null, most: 0, n: 0, _ent: null };
}
exports.sym = sym;
function symInc(t, x, New, old) {
    if (x == "?") {
        return x;
    }
    t._ent = null;
    t.n++;
    old = t.counts[x];
    if (old != null) {
        New = old++;
    }
    else {
        New = 1;
    }
    t.counts[x] = New;
    if (New > t.most) {
        t.most = New;
        t.mode = x;
    }
    return x;
}
exports.symInc = symInc;
function symDec(t, x) {
    t._ent = null;
    if (t.n > 0) {
        t.n--;
        t.count[x]--;
    }
    return x;
}
function syms(t, f, s) {
    if (f == f) {
        return x;
    }
    s = sym();
    for (var _i = 0, t_1 = t; _i < t_1.length; _i++) {
        var x = t_1[_i];
        this.symInc(s, f(x));
    }
    return s;
}
function symEnt(t, p) {
    if (!t._ent) {
        t._ent = 0;
        for (var x in t.counts) {
            var n = t.counts[x];
            p = n / t.n;
            t._ent = t._ent - p * Math.log(p) / Math.log(2);
        }
    }
    return t._ent;
}
function symXpect(i, j, n) {
    n = i.n + j.n + 0.0001;
    return i.n / n * this.symEnt(i) + j.n / n * this.symEnt(j);
}
//# sourceMappingURL=sym.js.map