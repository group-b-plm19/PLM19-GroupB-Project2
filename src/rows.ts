
const num = require("./num");
const sym = require("./sym");

// port
const io = require('./io');

function data() {
  return {
    w: {}, syms: {}, nums: {}, class: null,
    rows: {}, name: {}, col: {}, _use: {}
  }
}

class Data {
  w: number[];
  syms: number[];
  nums: number[];
  class: string;
  _rows: number[];
  name: string[];
  col: number[];
  _use: string[];

  constructor() {
    this.w = [];
    this.syms = [];
    this.nums = [];
    this.class = null;
    this._rows = [];
    this.name = [];
    this.col = [];
    this._use = [];
  }

  indep(t, c) {
    return (!t.w[c] && t.class != c);
  }

  dep(t, c) {
    return !this.indep(t, c);
  }

  header(cells, t?, c?, w?) {
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


  row(t, cells, x?, r?) {
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

  clone(data0, rows, data1) {
    data1 = this.header(data0.name);
    for (var cells in rows) {
      this.row(data1, cells)
    }
    return data1;

  }

  rows1(stream, t, f0, f, first?, line?, cells?) {
    first = true;
    line = io.read();
    while (line) {
      line = line.replace(/[\t\r ]*/g, "").replace(/#.*/g, "")
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
  }

  rows(file, t, f0, f, stream, txt, cells, r, line) {
    return this.rows1(file ? io.input(file) : io.input(), t, f0, f);
  }


}
