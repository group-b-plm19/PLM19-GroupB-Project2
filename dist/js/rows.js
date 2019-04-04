var num = require("./num");
var sym = require("./sym");
var io = require('./io');
io.read().then(function (line) { return console.log("wangus " + line); });
function data() {
    return {
        w: {}, syms: {}, nums: {}, "class": null,
        rows: {}, name: {}, col: {}, _use: {}
    };
}
var Data = (function () {
    function Data() {
        this.w = [];
        this.syms = [];
        this.nums = [];
        this["class"] = null;
        this._rows = [];
        this.name = [];
        this.col = [];
        this._use = [];
    }
    Data.prototype.indep = function (t, c) {
        return (!t.w[c] && t["class"] != c);
    };
    Data.prototype.dep = function (t, c) {
        return !this.indep(t, c);
    };
    Data.prototype.header = function (cells, t, c, w) {
        if (t != null || data() != null) {
            t.indeps = [];
        }
        for (var c0 in cells) {
            var x = cells[c0];
            if (!(x == "%?")) {
                c = t._use++;
                t._use[c] = c0;
                t.name[c] = x;
                t.col[x] = c;
                if (x == "[<>%$]") {
                    t.nums[c] = num();
                }
                else {
                    t.syms[c] = sym();
                }
                if (x == "<") {
                    t.w[c] = -1;
                }
                else {
                    if (x == ">") {
                        t.w[c] = 1;
                    }
                    else {
                        if (x == "!") {
                            t["class"] = c;
                        }
                        else {
                            t.indeps[t.indeps++] = c;
                        }
                    }
                }
            }
        }
        return t;
    };
    Data.prototype.row = function (t, cells, x, r) {
        r = t.rows++;
        t.tows[r] = [];
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
    };
    Data.prototype.clone = function (data0, rows, data1) {
        data1 = this.header(data0.name);
        for (var cells in rows) {
            this.row(data1, cells);
        }
        return data1;
    };
    Data.prototype.rows1 = function (stream, t, f0, f, first, line, cells) {
        first = true;
        line = io.read();
        while (line) {
            line = line.replace(/[\t\r ]*/g, "").replace(/#.*/g, "");
            cells = line.split(",");
            line = io.read();
            if (cells > 0) {
                if (first) {
                    f0(cells, t);
                }
                else {
                    f(t, cells);
                }
            }
        }
        io.close(stream);
        return t;
    };
    Data.prototype.rows = function (file, t, f0, f, stream, txt, cells, r, line) {
        return this.rows1(file ? io.input(file) : io.input(), t, f0, f);
    };
    return Data;
}());
//# sourceMappingURL=rows.js.map