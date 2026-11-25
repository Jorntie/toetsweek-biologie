// Rekent de rekenopgaven van thema 9 en thema 11 na (vaste en gegenereerde), met een eigen berekening per opgave.
// Gebruik: node tools/check-reken.js (vanuit de vak-map)
const fs = require("fs"), path = require("path"), vm = require("vm");
const dir = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const ctx = { console, Math, JSON, Number, String, Array, Object, isFinite, setTimeout, clearTimeout,
  document: { getElementById: () => null, documentElement: { style: { setProperty() {} } }, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [] },
  localStorage: { getItem: () => null, setItem() {} }, location: { hash: "" }, addEventListener() {}, requestAnimationFrame() {} };
ctx.window = ctx; vm.createContext(ctx);
for (const m of html.matchAll(/<script src="([^"]+)"/g)) vm.runInContext(fs.readFileSync(path.join(dir, m[1]), "utf8"), ctx, { filename: m[1] });
const TW = ctx.TW;
let tests = 0, fouten = 0;
const ok = (c, m) => { tests++; if (!c) { fouten++; console.log("FOUT:", m); } };
const getal = (s) => s.match(/-?\d+(?:,\d+)?/g).map((x) => +x.replace(",", "."));
// onafhankelijke codetabel (standaard genetische code)
const REF = { Phe: "UUU UUC", Leu: "UUA UUG CUU CUC CUA CUG", Ile: "AUU AUC AUA", Met: "AUG", Val: "GUU GUC GUA GUG", Ser: "UCU UCC UCA UCG AGU AGC", Pro: "CCU CCC CCA CCG", Thr: "ACU ACC ACA ACG", Ala: "GCU GCC GCA GCG", Tyr: "UAU UAC", stop: "UAA UAG UGA", His: "CAU CAC", Gln: "CAA CAG", Asn: "AAU AAC", Lys: "AAA AAG", Asp: "GAU GAC", Glu: "GAA GAG", Cys: "UGU UGC", Trp: "UGG", Arg: "CGU CGC CGA CGG AGA AGG", Gly: "GGU GGC GGA GGG" };
const CODE = {}; Object.entries(REF).forEach(([a, l]) => l.split(" ").forEach((c) => (CODE[c] = a)));
const close = (a, b, t) => Math.abs(a - b) <= (t == null ? Math.max(0.005, Math.abs(b) * 0.01) : t);

// per opgave een controlefunctie: (d) => verwacht antwoord
const C = {
  "t9-1": [
    (d) => { const [t] = getal(d.q); return (100 - 2 * t) / 2; },
    (d) => { const s = d.q.match(/streng: ([ATCG]+)/)[1]; return [...s].reduce((n, b) => n + ("AT".includes(b) ? 2 : 3), 0); },
    (d) => { const s = d.q.match(/van: ([ATCG]+)/)[1]; return [...s].map((b) => ({ A: "T", T: "A", C: "G", G: "C" })[b]).join(""); },
    () => 60 * 2 + 140 * 3
  ],
  "t9-2": [(d) => 2 ** getal(d.q)[0], () => 2, (d) => 2 * getal(d.q)[0]],
  "t9-3": [
    (d) => 3 * (getal(d.q)[0] + 1),
    (d) => CODE[d.q.match(/codon ([UCAG]{3})/)[1]],
    (d) => { const t = d.q.match(/is: ([ATCG]+)\./)[1], m = [...t].map((b) => ({ A: "U", T: "A", C: "G", G: "C" })[b]).join(""); let n = 0; for (let i = m.indexOf("AUG"); i + 3 <= m.length; i += 3) { if (CODE[m.slice(i, i + 3)] === "stop") return n; n++; } return -1; }
  ],
  "t9-5": [
    (d) => { const [, a, b] = d.q.match(/normaal: ([ATCG]+)\nNa de mutatie: ([ATCG]+)/); const i = [...a].findIndex((x, j) => x !== b[j]), c = Math.floor(i / 3) * 3; const o = CODE[a.slice(c, c + 3).replace(/T/g, "U")], n = CODE[b.slice(c, c + 3).replace(/T/g, "U")]; return n === o ? "geen effect" : n === "stop" ? "stopcodon" : "ander aminozuur"; },
    () => 47, () => 45
  ],
  "t9-6": [(d) => { const [b, n] = getal(d.q); return b * 2 ** n; }, (d) => { const [c, n] = getal(d.q); return c * n; }, () => { let n = 0; while (2 ** n <= 1e6) n++; return n; }],
  "t11-1": [(d) => { const [v, p] = getal(d.q); return v * (100 - p) / 100; }, () => 25e12 / (120 * 24 * 3600) / 1e6],
  "t11-3": [(d) => { const [f, s] = getal(d.q); return f * s / 1000; }, (d) => { const [h, f] = getal(d.q); return h * 1000 / f; }, (d) => 60 / getal(d.q)[0], () => 5 * 60 * 24],
  "t11-4": [(d) => { const [v, h] = getal(d.q); return v / h * 60; }, (d) => { const [b, o] = getal(d.q); return b - o; }]
};
let nOp = 0;
TW._S.hfst.forEach((h) => h.onderdelen.forEach((o) => (o.reken || []).forEach((r, i) => {
  const f = C[o.id] && C[o.id][i];
  if (!f) { if (h.id !== "t3") console.log(`(geen controle voor ${o.id} reken[${i}])`); return; }
  const n = typeof r.gen === "function" ? 300 : 1;
  for (let k = 0; k < n; k++) {
    const d = typeof r.gen === "function" ? r.gen(TW.R) : r, v = f(d); nOp++;
    if (typeof v === "number") ok(typeof d.antwoord === "number" && close(d.antwoord, v, d.tol), `${o.id} reken[${i}]: antwoord ${d.antwoord}, verwacht ${v} | ${d.q.replace(/\n/g, " ")}`);
    else ok([].concat(d.antwoord).map((x) => x.toLowerCase()).includes(String(v).toLowerCase()), `${o.id} reken[${i}]: antwoord ${d.antwoord}, verwacht ${v} | ${d.q.replace(/\n/g, " ")}`);
  }
})));
// voorbeelden en vaste feiten in de tekst
ok([..."CGGATACGGTTA"].map((b) => ({ A: "T", T: "A", C: "G", G: "C" })[b]).join("") === "GCCTATGCCAAT", "voorbeeld complementaire streng BS 1");
ok(["AUG", "GCU", "AAA", "UGA"].map((c) => CODE[c]).join(" ") === "Met Ala Lys stop", "voorbeeld template-streng BS 3");
ok([..."TACCGATTTACT"].map((b) => ({ A: "U", T: "A", C: "G", G: "C" })[b]).join("") === "AUGGCUAAAUGA", "voorbeeld transcriptie BS 3");
ok(CODE.GAG === "Glu" && CODE.GUG === "Val", "sikkelcel GAG -> GUG");
ok(CODE.GCU === CODE.GCC && CODE.UGA === "stop" && CODE.UGG === "Trp", "mutatievoorbeelden");
// MC-vragen met rekenwerk
ok(2 * 3 + 2 * 2 === 10, "GCAT: 10 waterstofbruggen");
ok(10 * 2 ** 5 === 320, "PCR 10 moleculen, 5 cycli");
ok(300 / 3 - 1 === 99, "300 nucleotiden: 99 aminozuren");
console.log(`${nOp} opgaven nagerekend; ${tests} controles, ${fouten} fouten`);
process.exit(fouten ? 1 : 0);
