"use strict";
exports.__esModule = true;
function Lean0() {
    return {
        cohen: 0.2,
        distance: { k: 1, p: 2, kernel: "triangle", samples: 64 },
        dom: { samples: 100 },
        domtree: { enough: 0.5 },
        enough: 100,
        fft: { min: 4 },
        label: { enough: 0.5, cohen: 0.3, margin: 1.05 },
        nb: { m: 2, k: 1, enough: 20 },
        num: { p: 2 },
        ok: { tries: 0, fails: 0 },
        random: { seed: 10013 },
        sample: { max: 512 },
        sk: {
            cohen: 0.2,
            conf: 95
        },
        stats: {
            conf: 95,
            bootstraps: 375,
            cf: ([0.147, 0.33, 0.474])[1]
        },
        "super": { enough: 0.5, cohen: 0.3, margin: 1.05 },
        tiles: {
            width: 50,
            chops: {
                0: [0.05, "-"],
                1: [0.25, " "],
                2: [0.5, " "],
                3: [0.75, "-"],
                4: [0.95, " "]
            },
            bar: "|",
            star: "*",
            num: "%5.3f",
            sym: "%20s"
        }
    };
}
exports.Lean0 = Lean0;
exports.Lean = Lean0();
//# sourceMappingURL=config.js.map