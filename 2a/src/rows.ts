
const num = require("./num");
const sym = require("./sym");

// port
const io = require('./io');

function data() {
  return {
    w: {}, syms: {}, nums: {}, class: null,
    rows: [], name: {}, col: {}, _use: {}
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
  t = t || data()
  t.indeps = [];
  for (var c0 in cells) {
    var x = cells[c0];
    if (!(x.match("%?"))) {
      c = t._use.length + 1;
      t._use[c] = c0;
      t.name[c] = x;
      t.col[x] = c;
      if (x.match("[<>%$]")) {
        t.nums[c] = num.num();
      }
      else {
        t.syms[c] = sym.sym();
      }
      if (x.match("<")) {
        t.w[c] = -1;
      }
      else if (x.match(">")) {
        t.w[c] = 1;
      }
      else if (x.match("!")) {
        t.class = c;
      }
      else {
        t.indeps[t.indeps.length + 1] = c;
      }
    }
  }
  console.log(t); //debug
  return t;
}


function row(t, cells, x?, r?) {
  r = t.rows.length + 1;
  t.rows[r] = {};
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
  t.rows[r][c] = x;
  return t;
}

function clone(data0, rows, data1) {
  data1 = header(data0.name);
  for (var cells in rows) {
    row(data1, cells)
  }
  return data1;

}

function rows1(stream, t, f0, f, first?: boolean, line?, cells?) {
  function handleLine(line) {

    line = line.replace(/[\t\r ]*/g, "").replace(/#.*/g, "")
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
  io.read().then(handleLine)
  return t;
}

export function rows(file, t?, f0?, f?, stream?, txt?, cells?, r?, line?) {
  //file ? io.input(file) : io.input()
  // don't need ^
  return rows1(null, t || data(), f0 || header, f || row);
}