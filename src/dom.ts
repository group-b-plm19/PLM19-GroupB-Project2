
const lib = require("./lib");
const num = require("./num");
const rows = require("./rows");
const config = require("./config");
const io = require("./io");

function dom(t, row1, row2, n?, a0?, a?, b0?, b?, s1?, s2?) {
  s1 = s2 = n = 0;
  for (var _ in t.w) {
    n++;
  }

  let w;
  for (var c in t.w) {
    w = t.w[c];
    a0 = row1[c];
    b0 = row2[c];
    a = num.numNorm(t.nums[c], a0);
    b = num.numNorm(t.nums[c], b0);
    s1 = s1 - 10 ** (w * (a - b) / n);
    s2 = s2 - 10 ** (w * (b - a) / n);
  }

  return s1 / n < s2 / n
}

function doms(t, n?, c?, row1?, row2?, s?) {
  n = config.Lean.dom.samples
  c = t.name + 1
  io.print(lib.cat(t.name, ",") + ",>dom")
  for (var r1 in t.rows) {
    row1 = t.rows[r1];
    row1[c] = 0;
    for (let s = 1; s < n; s++) {
      row2 = lib.another(r1, t.row);
      s = dom(t, row1, row2) ? 1 : 0;
      row1[c] = row1[c] + s;
    }
    console.log("try dump") //debug
    lib.dump(t.rows)
  }
}

doms(rows.rows())