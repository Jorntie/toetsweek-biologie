// Rekent alle kruisingen, stambomen en kansen na, onafhankelijk van de kruisingsmotor.
// Gebruik: node tools/check-genetica.js (vanuit de vak-map)
const fs = require("fs"), path = require("path"), vm = require("vm");
const dir = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const ctx = { console, Math, JSON, Number, String, Array, Object, isFinite, setTimeout, clearTimeout,
  document: { getElementById: () => null, documentElement: { style: { setProperty() {} } }, addEventListener() {}, querySelector: () => null, querySelectorAll: () => [] },
  localStorage: { getItem: () => null, setItem() {} }, location: { hash: "" }, addEventListener() {}, requestAnimationFrame() {} };
ctx.window = ctx; vm.createContext(ctx);
for (const m of html.matchAll(/<script src="([^"]+)"/g)) vm.runInContext(fs.readFileSync(path.join(dir, m[1]), "utf8"), ctx, { filename: m[1] });
const BIO = ctx.BIO, G = BIO.GEN, TW = ctx.TW;
let fouten = 0, tests = 0;
const ok = (c, m) => { tests++; if (!c) { fouten++; console.log("FOUT:", m); } };

// ---------- 1. onafhankelijke kruisingen ----------
// allelen als losse tekens: A/a, r/w (intermediair), A/B/O (bloed), X/x/Y (X-chromosomaal), gekoppeld als chromosoompaar
const tok = (g) => g.replace(/\^\{(.)\}/g, "$1");
function onafh(type, moeder, vader) {
  // geeft {fenotype: kans} als breuk-getal, op basis van volledige opsomming van allelcombinaties (met herhaling)
  const res = {}; let n = 0;
  const add = (f) => { res[f] = (res[f] || 0) + 1; n++; };
  if (type === "di") {
    for (const a1 of moeder[0]) for (const b1 of moeder[1]) for (const a2 of vader[0]) for (const b2 of vader[1]) {
      const A = a1 === "A" || a2 === "A", B = b1 === "B" || b2 === "B"; add((A ? "A" : "a") + (B ? "B" : "b"));
    }
  } else if (type === "gek") {
    for (const c1 of moeder) for (const c2 of vader) { const s = c1 + c2; add((s.includes("A") ? "A" : "a") + (s.includes("B") ? "B" : "b")); }
  } else {
    for (const a1 of moeder) for (const a2 of vader) {
      const x = tok(a1), y = tok(a2), p = [x, y];
      if (type === "mono") add(p.includes("A") ? "dom" : "rec");
      else if (type === "letaal") add(x === "A" && y === "A" ? "sterft" : p.includes("A") ? "dom" : "rec");
      else if (type === "inter") add(x !== y ? "mid" : x === "Ar" ? "p1" : "p2");
      else if (type === "bloed") { const A = p.includes("IA"), B = p.includes("IB"); add(A && B ? "AB" : A ? "A" : B ? "B" : "0"); }
      else if (type === "x") { const man = p.includes("Y"); add((p.includes("XA") ? "dom" : "rec") + (man ? "-m" : "-v")); }
    }
  }
  const levend = n - (res.sterft || 0); const uit = {};
  Object.keys(res).forEach((f) => { if (f !== "sterft") uit[f] = res[f] / levend; });
  return uit;
}
// motor-fenotype naar de sleutels van de onafhankelijke telling
function sleutel(type, f, c) {
  if (type === "mono" || type === "letaal") return f === c.dom ? "dom" : "rec";
  if (type === "inter") return f === c.mid ? "mid" : f === c.p1 ? "p1" : "p2";
  if (type === "bloed") return f.replace("bloedgroep ", "");
  if (type === "x") { const m = f.match(/^(.*) \((zoon|dochter)\)$/); return (m[1] === c.dom ? "dom" : "rec") + (m[2] === "zoon" ? "-m" : "-v"); }
  if (type === "di" || type === "gek") { const [a, b] = f.replace(c.na ? " " + c.na : "", "").split(" en "); return (a === c.a1 ? "A" : "a") + (b === c.b1 ? "B" : "b"); }
}
let nKruis = 0;
Object.keys(G.PAREN).forEach((type) => G.PAREN[type].forEach(([m, v]) => G.C[type].forEach((c) => {
  const k = G.kruis(type, c, m, v), ref = onafh(type, m, v);
  const motor = {}; Object.keys(k.feno).forEach((f) => { if (f !== "sterft") motor[sleutel(type, f, c)] = k.feno[f] / k.levend; });
  const alle = new Set([...Object.keys(ref), ...Object.keys(motor)]);
  alle.forEach((s) => ok(Math.abs((ref[s] || 0) - (motor[s] || 0)) < 1e-9, `${type} ${JSON.stringify(m)} x ${JSON.stringify(v)}: ${s} motor ${motor[s]} ref ${ref[s]}`));
  nKruis++;
})));
console.log(`Kruisingen: ${nKruis} combinaties van ouders en context vergeleken met onafhankelijke telling.`);

// bekende verhoudingen uit de lesstof
const verh = (type, m, v, c) => { const k = G.kruis(type, c || G.C[type][0], m, v); return Object.keys(k.feno).filter((f) => f !== "sterft").map((f) => k.feno[f]).sort((a, b) => b - a).join(":"); };
ok(verh("mono", ["A", "a"], ["A", "a"]) === "3:1", "Aa x Aa moet 3:1 zijn");
ok(verh("inter", ["A^{r}", "A^{w}"], ["A^{r}", "A^{w}"]) === "2:1:1", "intermediair F2 moet 1:2:1 zijn");
ok(verh("letaal", ["A", "a"], ["A", "a"]) === "2:1", "letaal moet 2:1 zijn");
ok(verh("bloed", ["I^{A}", "i"], ["I^{B}", "i"]) === "1:1:1:1", "IAi x IBi moet 1:1:1:1 zijn");
ok(verh("di", [["A", "a"], ["B", "b"]], [["A", "a"], ["B", "b"]]) === "9:3:3:1", "AaBb x AaBb moet 9:3:3:1 zijn");
ok(verh("gek", ["Ab", "aB"], ["Ab", "aB"]) === "2:1:1", "Ab/aB x Ab/aB moet 1:2:1 zijn");
ok(verh("gek", ["AB", "ab"], ["ab", "ab"]) === "1:1", "AB/ab x ab/ab moet 1:1 zijn");

// ---------- 2. rekenopgaven van thema 3 (gen) ----------
const t3 = TW._S.hfst.find((h) => h.id === "t3");
let nGen = 0;
t3.onderdelen.forEach((o) => (o.reken || []).forEach((r, i) => {
  if (typeof r.gen !== "function") return;
  for (let n = 0; n < 300; n++) {
    const d = r.gen(TW.R); nGen++;
    const m = d.q.match(/genotype (\S+) en (\S+)\. Hoe groot is de kans op (.+)\? Geef/);
    if (!m) continue;
    // terugvinden van type en context
    const ctxTekst = d.q.split("\n")[0];
    const type = Object.keys(G.C).find((t) => G.C[t].some((c) => c.tekst === ctxTekst) && G.PAREN[t].some(([a, b]) => G.T[t].toon(a) === m[1] && G.T[t].toon(b) === m[2]));
    const c = G.C[type].find((x) => x.tekst === ctxTekst), paar = G.PAREN[type].find(([a, b]) => G.T[type].toon(a) === m[1] && G.T[type].toon(b) === m[2]);
    const ref = onafh(type, paar[0], paar[1]);
    // fenotype uit de vraagtekst terugzoeken
    const k = G.kruis(type, c, paar[0], paar[1]);
    const f = Object.keys(k.feno).find((ff) => ff !== "sterft" && d.q.includes(BIOwie(ff, c.wie)));
    ok(f, `fenotype niet gevonden in: ${d.q}`);
    if (!f) continue;
    const verwacht = 100 * ref[sleutel(type, f, c)];
    ok(Math.abs(verwacht - d.antwoord) <= 0.06, `${o.id} reken[${i}]: antwoord ${d.antwoord}, verwacht ${verwacht} (${d.q.replace(/\n/g, " ")})`);
  }
}));
function BIOwie(f, wie) {
  const m = f.match(/^(.*) \((zoon|dochter)\)$/);
  if (m) return m[1] === "gezond" ? `een gezonde ${m[2]}` : m[1].startsWith("niet ") ? `een ${m[2]} die ${m[1]} is` : m[1] === "kleurenblind" ? `een kleurenblinde ${m[2]}` : `een ${m[2]} met ${m[1]}`;
  if (f === "gezond") return `een gezond ${wie}?`;
  return `een ${wie} met ${f}?`;
}
console.log(`Rekenopgaven thema 3: ${nGen} gegenereerde opgaven nagerekend.`);

// ---------- 3. stambomen ----------
BIO.STAMBOMEN.forEach((st) => {
  const opl = BIO.stamboomOplossing(st);
  // het model moet passen: elke persoon minstens één mogelijk genotype
  ok(Object.values(opl).every((l) => l.length > 0), `${st.titel}: model ${st.model} past niet`);
  // de andere modellen moeten (behalve bij 'onzeker') uitgesloten zijn
  const andere = ["ar", "ad", "xr", "xd"].filter((x) => x !== st.model);
  const past = (model) => { if (model === "xd") return pastXD(st); const o = BIO.stamboomOplossing(Object.assign({}, st, { model, vast: model === st.model ? st.vast : null })); return Object.values(o).every((l) => l.length > 0); };
  const passend = andere.filter(past);
  console.log(`${st.titel} (${st.model}): ook passend: ${passend.join(", ") || "geen"}; genotypen: ${st.geno.vragen.map((n) => n + "=" + BIO.genoLabel(opl[n], st.model === "xr")).join(", ")}`);
  if (!st.onzeker && st.model !== "xr") ok(!passend.includes("xr") || st.model === "ad", `${st.titel}: X-chromosomaal recessief zou ook passen`);
  if (st.model === "ad") ok(!pastXD(st), `${st.titel}: X-chromosomaal dominant zou ook passen`);
  // kansvraag: ouders uit de vraag halen en uitrekenen
  const ouders = st.kans.q.match(/(\d+) en (\d+) krijgen/);
  const a = +ouders[1], b = +ouders[2], ga = opl[a], gb = opl[b];
  ok(ga.length === 1 && gb.length === 1, `${st.titel}: ouders ${a} en ${b} hebben geen eenduidig genotype`);
  const moeder = st.personen.find((p) => p[0] === a)[1] === "v" ? ga[0] : gb[0], vader = moeder === ga[0] ? gb[0] : ga[0];
  let kans;
  if (st.model === "xr") {
    const mx = moeder.match(/X\^\{.\}/g), vx = vader.match(/X\^\{.\}/g)[0];
    const kinderen = []; mx.forEach((x) => { kinderen.push({ v: true, ziek: x === "X^{a}" && vx === "X^{a}" }); kinderen.push({ v: false, ziek: x === "X^{a}" }); });
    kans = /dochter/.test(st.kans.q) ? kinderen.filter((k) => k.v && k.ziek).length / kinderen.filter((k) => k.v).length : kinderen.filter((k) => k.ziek).length / kinderen.length;
  } else {
    let z = 0, t = 0; moeder.split("").forEach((x) => vader.split("").forEach((y) => { t++; const aa = x === "a" && y === "a"; if (st.model === "ar" ? aa : !aa) z++; })); kans = z / t;
  }
  ok(st.kans.opties[0] === Math.round(kans * 100) + "%", `${st.titel}: kans ${st.kans.opties[0]} maar berekend ${kans * 100}%`);
});
function pastXD(st) {
  // X-chromosomaal dominant: zieke man X^AY geeft ziekte aan al zijn dochters; gezonde man heeft geen zieke dochters uit gezonde moeder; zieke zoon heeft zieke moeder
  const P = {}; st.personen.forEach((p) => (P[p[0]] = p));
  return st.paren.every(([a, b, kids]) => {
    const m = P[a][1] === "v" ? P[a] : P[b], v = m === P[a] ? P[b] : P[a];
    return kids.every((k) => { const K = P[k]; if (K[1] === "v") { if (v[2] && !K[2]) return false; if (!v[2] && !m[2] && K[2]) return false; } else { if (K[2] && !m[2]) return false; } return true; });
  });
}

console.log(`\n${tests} controles, ${fouten} fouten`);
process.exit(fouten ? 1 : 0);
