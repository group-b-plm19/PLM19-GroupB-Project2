"use strict";
exports.__esModule = true;
var num = require("./num");
var sym = require("./sym");
var io = require('./io');
function data() {
    return {
        w: {}, syms: {}, nums: {}, "class": null,
        rows: [], name: {}, col: {}, _use: {}
    };
}
var w = [];
var syms = [];
var nums = [];
var _class = null;
var _rows = [];
var name = [];
var col = [];
var _use = [];
function indep(t, c) {
    return (!t.w[c] && t["class"] != c);
}
function dep(t, c) {
    return !this.indep(t, c);
}
function match(str, ptn) {
    return ptn.includes(str[0]) || ptn.includes(str[1]) || ptn.includes(str[2]);
}
function header(cells, t, c, w) {
    t = t || data();
    t.indeps = [];
    for (var c0 in cells) {
        var x = cells[c0];
        if (!match(x, "%?")) {
            c = t._use.length + 1;
            t._use[c] = c0;
            t.name[c] = x;
            t.col[x] = c;
            if (match(x, "[<>%$]")) {
                t.nums[c] = num.num();
            }
            else {
                t.syms[c] = sym.sym();
            }
            if (match(x, "<")) {
                t.w[c] = -1;
            }
            else if (match(x, ">")) {
                t.w[c] = 1;
            }
            else if (match(x, "!")) {
                t["class"] = c;
            }
            else {
                t.indeps[t.indeps.length + 1] = c;
            }
        }
    }
    console.log(t);
    return t;
}
function row(t, cells, x, r) {
    r = t.rows.length + 1;
    t.rows[r] = {};
    for (var c in t._use) {
        var c0 = t._use[c];
        x = cells[c0];
        if (x != "?") {
            if (t.nums[c] != null) {
                x = parseFloat(x);
                num.numInc(t.nums[c], x);
            }
            else {
                sym.symInc(t.syms[c], x);
            }
        }
    }
    t.rows[r][c] = x;
    return t;
}
function clone(data0, rows, data1) {
    data1 = header(data0.name);
    for (var cells in rows) {
        row(data1, cells);
    }
    return data1;
}
function rows1(stream, t, f0, f, first, line, cells) {
    function handleLine(line) {
        line = line.replace(/[\t\r ]*/g, "").replace(/#.*/g, "");
        cells = line.split(",");
        if (cells.length > 0) {
            if (first) {
                f0(cells, t);
            }
            else {
                f(t, cells);
            }
        }
        first = false;
        io.read().then(handleLine);
    }
    first = true;
    io.read().then(handleLine);
    return t;
}
function rows(file, t, f0, f, stream, txt, cells, r, line) {
    return rows1(null, t || data(), f0 || header, f || row);
}
exports.rows = rows;
//# sourceMappingURL=rows.js.map