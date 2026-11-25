// Kruisingsmotor voor thema 3 Genetica: gameten, kruisingsschema, genotype- en fenotypeverhoudingen.
// Gebruikt door widgets-genetica.js (kruisingslab) en door de rekenopgaven in data-t3.js.
// Genotypen in examennotatie: Aa, A^{r}A^{w}, I^{A}i, X^{A}X^{a}, X^{a}Y, AaBb, AB/ab.
(function () {
  "use strict";
  const BIO = window.BIO;
  const uniek = (a) => a.filter((x, i) => a.findIndex((y) => JSON.stringify(y) === JSON.stringify(x)) === i);
  const sorteer = (arr, volg) => arr.slice().sort((p, q) => volg.indexOf(p) - volg.indexOf(q));

  // één locus, twee allelen per individu; volg = volgorde van noteren
  function eenLocus(volg, feno) {
    return {
      gameten: (gt) => uniek(gt.map((a) => [a])),
      kind: (m, v) => sorteer([m[0], v[0]], volg),
      toon: (gt) => gt.join(""),
      gameet: (g) => g.join(""),
      feno
    };
  }
  const T = {};
  // monohybride, volledig dominant
  T.mono = eenLocus(["A", "a"], (gt, c) => (gt.includes("A") ? c.dom : c.rec));
  // intermediair (onvolledig dominant)
  T.inter = eenLocus(["A^{r}", "A^{w}"], (gt, c) => (gt[0] !== gt[1] ? c.mid : gt[0] === "A^{r}" ? c.p1 : c.p2));
  // bloedgroepen: I^{A} en I^{B} codominant, i recessief
  T.bloed = eenLocus(["I^{A}", "I^{B}", "i"], (gt) => { const A = gt.includes("I^{A}"), B = gt.includes("I^{B}"); return A && B ? "bloedgroep AB" : A ? "bloedgroep A" : B ? "bloedgroep B" : "bloedgroep 0"; });
  // letale factor: AA sterft
  T.letaal = eenLocus(["A", "a"], (gt, c) => (gt[0] === "A" && gt[1] === "A" ? "sterft" : gt.includes("A") ? c.dom : c.rec));
  // X-chromosomaal recessief; moeder [X, X], vader [X, Y]
  T.x = {
    gameten: (gt) => uniek(gt.map((a) => [a])),
    kind: (m, v) => sorteer([m[0], v[0]], ["X^{A}", "X^{a}", "Y"]),
    toon: (gt) => gt.join(""),
    gameet: (g) => g.join(""),
    feno: (gt, c) => { const man = gt.includes("Y"); return (gt.includes("X^{A}") ? c.dom : c.rec) + (man ? " (zoon)" : " (dochter)"); }
  };
  // dihybride, onafhankelijk: gt = [[a1, a2], [b1, b2]]
  T.di = {
    gameten: (gt) => { const r = []; uniek(gt[0]).forEach((a) => uniek(gt[1]).forEach((b) => r.push([a, b]))); return r; },
    kind: (m, v) => [sorteer([m[0], v[0]], ["A", "a"]), sorteer([m[1], v[1]], ["B", "b"])],
    toon: (gt) => gt[0].join("") + gt[1].join(""),
    gameet: (g) => g.join(""),
    feno: (gt, c) => (gt[0].includes("A") ? c.a1 : c.a0) + " en " + (gt[1].includes("B") ? c.b1 : c.b0) + (c.na ? " " + c.na : "")
  };
  // volledig gekoppeld: gt = ["AB", "ab"] (twee chromosomen)
  const CHR = ["AB", "Ab", "aB", "ab"];
  T.gek = {
    gameten: (gt) => uniek(gt).map((c) => [c]),
    kind: (m, v) => sorteer([m[0], v[0]], CHR),
    toon: (gt) => gt.join("/"),
    gameet: (g) => g[0],
    feno: (gt, c) => (gt.join("").includes("A") ? c.a1 : c.a0) + " en " + (gt.join("").includes("B") ? c.b1 : c.b0)
  };

  // kruising: geeft gameten, schema en tellingen
  function kruis(type, ctx, moeder, vader) {
    const t = T[type], m = t.gameten(moeder), v = t.gameten(vader);
    const cel = m.map((gm) => v.map((gv) => t.kind(gm, gv)));
    const geno = {}, feno = {};
    let n = 0, levend = 0;
    cel.forEach((rij) => rij.forEach((gt) => {
      const g = t.toon(gt), f = t.feno(gt, ctx);
      geno[g] = (geno[g] || 0) + 1; feno[f] = (feno[f] || 0) + 1; n++;
      if (f !== "sterft") levend++;
    }));
    return { m, v, cel, geno, feno, n, levend, toon: t.toon, gameet: t.gameet, feno1: (gt) => t.feno(gt, ctx) };
  }

  // contexten (gegevens van de opgaven)
  const C = {
    mono: [
      { tekst: "Bij erwten is het allel voor paarse bloemen (A) dominant over het allel voor witte bloemen (a).", dom: "paarse bloemen", rec: "witte bloemen", wie: "plant" },
      { tekst: "Taaislijmziekte erft recessief over. Allel A is gezond, allel a geeft taaislijmziekte.", dom: "gezond", rec: "taaislijmziekte", wie: "kind" },
      { tekst: "Bij cavia's is het allel voor een zwarte vacht (A) dominant over het allel voor een witte vacht (a).", dom: "zwarte vacht", rec: "witte vacht", wie: "jong" }
    ],
    inter: [
      { tekst: "Bij de Japanse wonderbloem erft de bloemkleur intermediair over: A^{r} geeft rood, A^{w} geeft wit, A^{r}A^{w} is roze.", p1: "rode bloemen", p2: "witte bloemen", mid: "roze bloemen", wie: "plant" },
      { tekst: "Bij leeuwenbekjes erft de bloemkleur intermediair over: A^{r}A^{r} is rood, A^{w}A^{w} is wit en A^{r}A^{w} is roze.", p1: "rode bloemen", p2: "witte bloemen", mid: "roze bloemen", wie: "plant" }
    ],
    bloed: [{ tekst: "Bloedgroepen: I^{A} en I^{B} zijn codominant, allebei dominant over i.", wie: "kind" }],
    letaal: [
      { tekst: "Bij muizen is het allel voor een gele vacht (A) dominant over het allel voor een donkere vacht (a). Embryo's met genotype AA sterven al in de baarmoeder.", dom: "gele vacht", rec: "donkere vacht", wie: "jong" },
      { tekst: "Achondroplasie (een vorm van dwerggroei) erft dominant over (allel A). Embryo's die homozygoot AA zijn, overleven niet.", dom: "achondroplasie", rec: "normale lengte", wie: "kind" }
    ],
    x: [
      { tekst: "Rood-groenkleurenblindheid erft X-chromosomaal recessief over: X^{A} is normaal, X^{a} kleurenblind.", dom: "niet kleurenblind", rec: "kleurenblind", wie: "kind" },
      { tekst: "Hemofilie (bloederziekte) erft X-chromosomaal recessief over: X^{A} is normaal, X^{a} geeft hemofilie.", dom: "gezond", rec: "hemofilie", wie: "kind" }
    ],
    di: [{ tekst: "Bij erwten is geel zaad (A) dominant over groen zaad (a) en rond zaad (B) dominant over gerimpeld zaad (b). De genen liggen op verschillende chromosomen.", a1: "gele", a0: "groene", b1: "ronde", b0: "gerimpelde", na: "zaden", wie: "plant" }],
    gek: [{ tekst: "Bij konijnen is lang haar (A) dominant over kort haar (a) en rechte oren (B) dominant over hangende oren (b). De genen liggen op hetzelfde chromosoom en erven volledig gekoppeld over.", a1: "lang haar", a0: "kort haar", b1: "rechte oren", b0: "hangende oren", wie: "jong" }]
  };
  // ouderparen die per type gevraagd worden
  const PAREN = {
    mono: [[["A", "a"], ["A", "a"]], [["A", "a"], ["a", "a"]], [["A", "A"], ["a", "a"]], [["A", "A"], ["A", "a"]]],
    inter: [[["A^{r}", "A^{w}"], ["A^{r}", "A^{w}"]], [["A^{r}", "A^{w}"], ["A^{w}", "A^{w}"]], [["A^{r}", "A^{r}"], ["A^{w}", "A^{w}"]], [["A^{r}", "A^{w}"], ["A^{r}", "A^{r}"]]],
    bloed: [[["I^{A}", "i"], ["I^{B}", "i"]], [["I^{A}", "I^{B}"], ["I^{A}", "I^{B}"]], [["I^{A}", "I^{B}"], ["i", "i"]], [["I^{A}", "i"], ["I^{A}", "i"]], [["I^{B}", "i"], ["I^{A}", "I^{B}"]]],
    letaal: [[["A", "a"], ["A", "a"]], [["A", "a"], ["a", "a"]]],
    x: [[["X^{A}", "X^{a}"], ["X^{A}", "Y"]], [["X^{A}", "X^{a}"], ["X^{a}", "Y"]], [["X^{a}", "X^{a}"], ["X^{A}", "Y"]], [["X^{A}", "X^{A}"], ["X^{a}", "Y"]]],
    di: [[[["A", "a"], ["B", "b"]], [["A", "a"], ["B", "b"]]], [[["A", "a"], ["B", "b"]], [["a", "a"], ["b", "b"]]], [[["A", "a"], ["B", "B"]], [["A", "a"], ["b", "b"]]], [[["A", "A"], ["B", "b"]], [["a", "a"], ["B", "b"]]]],
    gek: [[["AB", "ab"], ["AB", "ab"]], [["AB", "ab"], ["ab", "ab"]], [["Ab", "aB"], ["Ab", "aB"]], [["Ab", "aB"], ["ab", "ab"]]]
  };
  const toonOuder = (type, gt) => T[type].toon(gt);
  // breuk netjes
  const ggd = (a, b) => (b ? ggd(b, a % b) : a);
  const breuk = (t, n) => { if (!t) return "0"; const g = ggd(t, n); return n / g === 1 ? "1" : `${t / g}/${n / g}`; };
  const pct = (t, n) => TW.nl(Math.round((1000 * t) / n) / 10) + "%";

  BIO.GEN = { T, kruis, C, PAREN, toonOuder, breuk, pct };
})();
