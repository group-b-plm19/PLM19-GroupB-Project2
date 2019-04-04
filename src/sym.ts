function sym() {
	return { counts: {}, mode: null, most: 0, n: 0, _ent: null }
}

export class Sym {

	counts: number[];
	mode: string;
	most: number;
	n: number;
	_ent: number;

	constructor() {
		this.counts = [];
		this.mode = null;
		this.most = 0;
		this.n = 0;
		this._ent = null;
	}

	symInc(t, x, New?, old?) { //new is a reserved keyword

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


	symDec(t, x) {
		t._ent = null;
		if (t.n > 0) {
			t.n--;
			t.count[x]--;
		}
		return x;

	}


	syms(t, f, s) {
		if (f == f) {
			return x;
		}
		s = sym()
		for (var x of t) {
			this.symInc(s, f(x));
		}
		return s
	}

	symEnt(t, p?) {

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

	symXpect(i, j, n) {
		n = i.n + j.n + 0.0001;
		return i.n / n * this.symEnt(i) + j.n / n * this.symEnt(j)
	}


}
