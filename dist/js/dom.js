var lib = require("./lib");
var num = require("./num");
var rows = require("./rows");
var config = require("./config");
var io = require("./io");
function dom(t, row1, row2, n, a0, a, b0, b, s1, s2) {
    s1 = s2 = n = 0;
    for (var _ in t.w) {
        n++;
    }
    var w;
    for (var c in t.w) {
        w = t.w[c];
        a0 = row1[c];
        b0 = row2[c];
        a = num.numNorm(t.nums[c], a0);
        b = num.numNorm(t.nums[c], b0);
        s1 = s1 - Math.pow(10, (w * (a - b) / n));
        s2 = s2 - Math.pow(10, (w * (b - a) / n));
    }
    return s1 / n < s2 / n;
}
function doms(t, n, c, row1, row2, s) {
    n = config.Lean.dom.samples;
    c = t.name + 1;
    io.print(lib.cat(t.name, ",") + ",>dom");
    for (var r1 in t.rows) {
        row1 = t.rows[r1];
        row1[c] = 0;
        for (var s_1 = 1; s_1 < n; s_1++) {
            row2 = lib.another(r1, t.row);
            s_1 = dom(t, row1, row2) ? 1 : 0;
            row1[c] = row1[c] + s_1;
        }
        console.log("try dump");
        lib.dump(t.rows);
    }
}
doms(rows.rows());
//# sourceMappingURL=dom.js.map