
const num = require("./num");
const sym = require("./sym");

// port
const io = require('./io');

function data() {
  return {
    w: {}, syms: {}, nums: {}, class: null,
    rows: {}, name: "", col: {}, _use: {}
  }
}

let w = [];
let syms = [];
let nums = [];
let _class = null;
let _rows = [];
let name = [];
let col = [];
let _use = [];

function indep(t, c) {
  return (!t.w[c] && t.class != c);
}

function dep(t, c) {
  return !this.indep(t, c);
}

function header(cells, t?, c?, w?) {
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
            t.class = c;
          }
          else {
            t.indeps[t.indeps++] = c;
          }
        }
      }

    }

  }
  return t;
}


function row(t, cells, x?, r?) {
  r = t.rows++;
  t.tows[r] = [];
  for (var c in t._use) {
    var c0 = t._use[c];
    x = cells[c0]
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
  t.rows[r][c] = x
}

function clone(data0, rows, data1) {
  data1 = this.header(data0.name);
  for (var cells in rows) {
    this.row(data1, cells)
  }
  return data1;

}

function rows1(stream, t, f0, f, first?, line?, cells?) {
  function handleLine(line) {
    line = line.replace(/[\t\r ]*/g, "").replace(/#.*/g, "")
    cells = line.split(",");

    if (cells > 0) {
      if (first) {
        f0(cells, t);
      }
      else {
        f(t, cells);
      }
    }
    io.read().then(handleLine);

  }

  first = true;
  io.read().then(handleLine)
  // io.close(stream);
  return t;
}

export function rows(file, t?, f0?, f?, stream?, txt?, cells?, r?, line?) {
  //file ? io.input(file) : io.input()
  // don't need ^
  return rows1(null, t || data(), f0 || header, f || row);
}