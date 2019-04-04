
export class num {

	n: number;
	mu: number;
	m2: number;
	sd: number;
	id: string;
	lo: number;
	hi: number;
	txt: string;
	w: number;

	constructor(txt: string) {
		this.n = 0;
		this.mu = 0;
		this.m2 = 0;
		this.sd = 0;
		this.id = "";
		this.lo = 10 ** 32;
		this.hi = -1 * 10 ** 32;
		this.txt = txt;
		this.w = 0;

	}

	numInc(t, x, d) {
		if (x == "?") {
			return x;
		}

		t.n++;
		d = x - t.mu;
		t.mu = t.mu + d / t.n;
		t.m2 = t.m2 + d * (x - t.mu);

		if (x > t.hi) {
			t.hi = x;
		}

		if (x < t.lo) {
			t.lo = x;
		}

		if (t.n >= 2) {
			t.sd = (t.m2 / (t.n - 1 + 10 ** -32)) ** 0.5
		}
		return x;
	}


	numDec(t, x, d) {
		if (x == "?") {
			return x;
		}

		if (t.n == 1) {
			return x;
		}

		t.n--;
		d = x - t.mu;
		t.mu = t.mu - d / t.n;
		t.mu2 = t.m2 - d * (x - t.mu);
		if (t.n >= 2) {
			t.sd = (t.m2 / (t.n - 1 + 10 ** -32)) ** 0.5;
		}
		return x;

	}

	numNorm(t, x, y) {
		if (x == "?") {
			return 0.5
		}
		else {
			return (x - t.lo) / (t.hi - t.lo + 10 ** -32)
		}
	}

	numPdf(t, x) {
		return Math.exp(-1 * (x - t.mu) ** 2 / (2 * t.sd ** 2)) * 1 / (t.sd * ((2 * Math.PI) ** 0.5));
	}

	numXpect(i, j, n) {
		n = i.n + j.n + 0.0001;
		return i.n / n * i.sd + j.n / n * j.sd;
	}


}
