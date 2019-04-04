

export function num(txt: string) {
	return {
		n: 0,
		mu: 0,
		m2: 0,
		sd: 0,
		id: "",
		lo: 10 ** 32,
		hi: -1 * 10 ** 32,
		txt: txt,
		w: 0
	}
}

export function numInc(t, x, d) {
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


function numDec(t, x, d) {
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

function numNorm(t, x, y) {
	if (x == "?") {
		return 0.5
	}
	else {
		return (x - t.lo) / (t.hi - t.lo + 10 ** -32)
	}
}

function numPdf(t, x) {
	return Math.exp(-1 * (x - t.mu) ** 2 / (2 * t.sd ** 2)) * 1 / (t.sd * ((2 * Math.PI) ** 0.5));
}

function numXpect(i, j, n) {
	n = i.n + j.n + 0.0001;
	return i.n / n * i.sd + j.n / n * j.sd;
}


