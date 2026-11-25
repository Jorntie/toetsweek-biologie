// Controleert de codontabel in figs.js tegen de standaard genetische code (64 codons).
// Gebruik: node tools/check-codons.js (vanuit de vak-map)
const fs = require("fs"), vm = require("vm"), path = require("path");
const dir = path.resolve(__dirname, "..");
const ctx = { console, Math, window: {} }; ctx.TW = { esc: (s) => s, fig() {}, widget() {} }; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(dir, "figs.js"), "utf8"), ctx);
const CODE = ctx.BIO.CODE;
// onafhankelijke referentie: per aminozuur de codons (standaard code, NCBI tabel 1)
const REF = {
  Phe: "UUU UUC", Leu: "UUA UUG CUU CUC CUA CUG", Ile: "AUU AUC AUA", Met: "AUG", Val: "GUU GUC GUA GUG",
  Ser: "UCU UCC UCA UCG AGU AGC", Pro: "CCU CCC CCA CCG", Thr: "ACU ACC ACA ACG", Ala: "GCU GCC GCA GCG",
  Tyr: "UAU UAC", stop: "UAA UAG UGA", His: "CAU CAC", Gln: "CAA CAG", Asn: "AAU AAC", Lys: "AAA AAG",
  Asp: "GAU GAC", Glu: "GAA GAG", Cys: "UGU UGC", Trp: "UGG", Arg: "CGU CGC CGA CGG AGA AGG", Gly: "GGU GGC GGA GGG"
};
let n = 0, fout = 0;
for (const [az, l] of Object.entries(REF)) for (const c of l.split(" ")) { n++; if (CODE[c] !== az) { fout++; console.log("FOUT", c, "tabel:", CODE[c], "moet:", az); } }
console.log(`${Object.keys(CODE).length} codons in de tabel, ${n} in de referentie, ${fout} fouten`);
process.exit(fout || n !== 64 || Object.keys(CODE).length !== 64 ? 1 : 0);
