// Figuren van thema 3 Genetica. Kruisingsschema's en stambomen worden getekend door BIO,
// zodat de widgets dezelfde tekeningen en dezelfde gegevens gebruiken.
(function () {
  "use strict";
  const BIO = window.BIO, { svg, nr, pijl, svgGeno } = BIO;

  // ---------- kruisingsschema ----------
  // o: { moeder: [gameten], vader: [gameten], cel: [[..]], accent: [[rij, kol]], dood: [[rij, kol]], vraag: bool }
  BIO.punnett = function (o) {
    const nr_ = o.moeder.length, nk = o.vader.length, cw = Math.min(96, 230 / nk), ch = 44, x0 = 84, y0 = 46;
    let s = `<text x="${x0 + (nk * cw) / 2}" y="13" text-anchor="middle" class="k m">geslachtscellen: ♂ boven, ♀ links</text><text x="34" y="${y0 + (nr_ * ch) / 2 + 6}" text-anchor="middle" class="g">♀</text><text x="34" y="${y0 - 8}" text-anchor="middle" class="g">♂</text>`;
    o.vader.forEach((g, k) => { s += `<rect x="${x0 + k * cw + 2}" y="${y0 - 28}" width="${cw - 4}" height="26" rx="7" class="zacht"/><text x="${x0 + k * cw + cw / 2}" y="${y0 - 9}" text-anchor="middle" class="b">${svgGeno(g)}</text>`; });
    o.moeder.forEach((g, r) => { s += `<rect x="${x0 - 30}" y="${y0 + r * ch + 2}" width="28" height="${ch - 4}" rx="7" class="zacht"/><text x="${x0 - 16}" y="${y0 + r * ch + ch / 2 + 5}" text-anchor="middle" class="b">${svgGeno(g)}</text>`; });
    o.cel.forEach((rij, r) => rij.forEach((c, k) => {
      const acc = (o.accent || []).some((a) => a[0] === r && a[1] === k), dood = (o.dood || []).some((a) => a[0] === r && a[1] === k);
      s += `<rect x="${x0 + k * cw + 2}" y="${y0 + r * ch + 2}" width="${cw - 4}" height="${ch - 4}" rx="7" class="${acc ? "geel" : "wit"}"/><text x="${x0 + k * cw + cw / 2}" y="${y0 + r * ch + ch / 2 + 5}" text-anchor="middle" class="${dood ? "m" : ""}" ${dood ? 'text-decoration="line-through"' : ""}>${o.vraag ? "?" : svgGeno(c)}</text>`;
    }));
    return svg(340, y0 + nr_ * ch + 8, "Kruisingsschema", s);
  };
  TW.fig("kruising-mono", (quiz) => BIO.punnett({ moeder: ["A", "a"], vader: ["A", "a"], cel: [["AA", "Aa"], ["Aa", "aa"]], accent: [[1, 1]], vraag: quiz }));
  TW.fig("kruising-x", (quiz) => BIO.punnett({ moeder: ["X^{A}", "X^{a}"], vader: ["X^{A}", "Y"], cel: [["X^{A}X^{A}", "X^{A}Y"], ["X^{A}X^{a}", "X^{a}Y"]], accent: [[1, 1]], vraag: quiz }));
  TW.fig("kruising-bloed", (quiz) => BIO.punnett({ moeder: ["I^{A}", "i"], vader: ["I^{B}", "i"], cel: [["I^{A}I^{B}", "I^{A}i"], ["I^{B}i", "ii"]], vraag: quiz }));
  TW.fig("kruising-letaal", (quiz) => BIO.punnett({ moeder: ["A", "a"], vader: ["A", "a"], cel: [["AA", "Aa"], ["Aa", "aa"]], dood: [[0, 0]], vraag: quiz }));

  // ---------- intermediair ----------
  TW.fig("intermediair", (quiz) => {
    const bloem = (x, y, kleur, r) => { let b = ""; for (let i = 0; i < 5; i++) { const a = (i * 72 - 90) * Math.PI / 180; b += `<circle cx="${(x + r * Math.cos(a)).toFixed(1)}" cy="${(y + r * Math.sin(a)).toFixed(1)}" r="${r * 0.72}" style="fill:${kleur};stroke:var(--muted);stroke-width:1"/>`; } return b + `<circle cx="${x}" cy="${y}" r="${r * 0.45}" class="geel"/>`; };
    const rood = "var(--o2rijk)", roze = "color-mix(in srgb, var(--o2rijk) 40%, var(--card))", wit = "var(--card)";
    return svg(340, 232, "Intermediaire overerving van bloemkleur: rood maal wit geeft roze", `
      <text x="10" y="40" class="b">P</text>${bloem(110, 34, rood, 13)}<text x="170" y="40" text-anchor="middle" class="g">×</text>${bloem(230, 34, wit, 13)}
      <text x="110" y="72" text-anchor="middle" class="k">${svgGeno("A^{r}A^{r}")}</text><text x="230" y="72" text-anchor="middle" class="k">${svgGeno("A^{w}A^{w}")}</text>
      ${pijl(170, 60, 170, 84, "")}
      <text x="10" y="112" class="b">F1</text>${bloem(170, 106, roze, 13)}<text x="170" y="144" text-anchor="middle" class="k">${quiz ? "?" : svgGeno("A^{r}A^{w}") + '<tspan dx="6">alle roze</tspan>'}</text>
      ${pijl(170, 150, 170, 170, "")}<text x="186" y="164" class="k m">F1 × F1</text>
      <text x="10" y="200" class="b">F2</text>${bloem(84, 194, rood, 11)}${bloem(152, 194, roze, 11)}${bloem(190, 194, roze, 11)}${bloem(258, 194, wit, 11)}
      <text x="170" y="228" text-anchor="middle" class="k b">${quiz ? "verhouding in de F2: ?" : "1 rood : 2 roze : 1 wit"}</text>`);
  });

  // ---------- gekoppelde genen ----------
  TW.fig("gekoppeld", (quiz) => {
    const chr = (x, y, h, a, b, cls) => `<rect x="${x - 9}" y="${y}" width="18" height="${h}" rx="9" class="${cls}"/><rect x="${x - 9}" y="${y + h * 0.22}" width="18" height="7" class="or"/><rect x="${x - 9}" y="${y + h * 0.66}" width="18" height="7" class="acc"/>
      <text x="${x + 16}" y="${y + h * 0.22 + 8}" class="b">${a}</text><text x="${x + 16}" y="${y + h * 0.66 + 8}" class="b">${b}</text>`;
    return svg(340, 190, "Gekoppelde genen liggen op hetzelfde chromosoom en gaan samen naar een geslachtscel", `
      <text x="70" y="16" text-anchor="middle" class="k b">lichaamscel</text>
      <rect x="18" y="24" width="104" height="150" rx="24" class="wit"/>
      ${chr(52, 44, 110, "A", "B", "zacht")}${chr(92, 44, 110, "a", "b", "wit")}
      ${pijl(128, 80, 196, 56, "")}${pijl(128, 118, 196, 142, "")}
      <text x="162" y="104" text-anchor="middle" class="k m">meiose</text>
      <text x="266" y="16" text-anchor="middle" class="k b">geslachtscellen</text>
      <circle cx="240" cy="56" r="34" class="wit"/>${chr(232, 30, 52, "A", "B", "zacht")}
      <circle cx="240" cy="142" r="34" class="wit"/>${chr(232, 116, 52, "a", "b", "wit")}
      <text x="286" y="60" class="b">${quiz ? "?" : "AB"}</text><text x="286" y="146" class="b">${quiz ? "?" : "ab"}</text>
      <text x="286" y="100" class="k m">${quiz ? "" : "geen Ab"}</text><text x="286" y="113" class="k m">${quiz ? "" : "of aB"}</text>`);
  });

  // ---------- tweelingen ----------
  TW.fig("tweelingen", (quiz) => {
    const baby = (x, y, cls) => `<circle cx="${x}" cy="${y}" r="13" class="${cls}"/><circle cx="${x}" cy="${y - 19}" r="8" class="${cls}"/>`;
    const zaad = (x, y) => `<circle cx="${x}" cy="${y}" r="4" class="nrb"/><path d="M${x + 4} ${y} q5 -5 9 0 t9 0" class="s"/>`;
    return svg(340, 224, "Ontstaan van een eeneiige en een twee-eiige tweeling", `
      <text x="84" y="14" text-anchor="middle" class="b">${quiz ? "tweeling 1" : "eeneiig"}</text><text x="254" y="14" text-anchor="middle" class="b">${quiz ? "tweeling 2" : "twee-eiig"}</text>
      <line x1="170" y1="6" x2="170" y2="218" class="raster"/>
      <circle cx="84" cy="44" r="16" class="zacht"/>${zaad(108, 34)}
      ${pijl(84, 64, 84, 82, "")}
      <circle cx="84" cy="100" r="15" class="zacht"/><line x1="84" y1="85" x2="84" y2="115" class="lacc" stroke-dasharray="3 3"/>
      ${pijl(74, 118, 56, 140, "")}${pijl(94, 118, 112, 140, "")}
      ${baby(50, 176, "zacht")}${baby(118, 176, "zacht")}
      <text x="84" y="212" text-anchor="middle" class="k">${quiz ? "" : "zelfde genotype"}</text>
      <circle cx="220" cy="44" r="16" class="zacht"/>${zaad(244, 34)}<circle cx="290" cy="44" r="16" class="geel"/>${zaad(310, 30)}
      ${pijl(220, 64, 220, 140, "")}${pijl(290, 64, 290, 140, "")}
      ${baby(220, 176, "zacht")}${baby(290, 176, "geel")}
      <text x="254" y="212" text-anchor="middle" class="k">${quiz ? "" : "verschillend genotype"}</text>
      <text x="84" y="134" text-anchor="middle" class="k m">${quiz ? "" : "splitst"}</text>`);
  });

  // ---------- fenotype = genotype + milieu ----------
  TW.fig("fenotype", (quiz) => svg(340, 120, "Het fenotype komt tot stand door het genotype en door milieufactoren", `
    <rect x="10" y="14" width="120" height="38" rx="12" class="zacht"/><text x="70" y="38" text-anchor="middle" class="b">${quiz ? "1" : "genotype"}</text>
    <rect x="10" y="70" width="120" height="38" rx="12" class="geel"/><text x="70" y="94" text-anchor="middle" class="b">${quiz ? "2" : "milieufactoren"}</text>
    ${pijl(134, 36, 204, 56, "")}${pijl(134, 88, 204, 68, "")}
    <rect x="208" y="40" width="122" height="44" rx="12" class="wit"/><text x="269" y="67" text-anchor="middle" class="g">${quiz ? "3" : "fenotype"}</text>
    ${quiz ? "" : `<text x="140" y="16" class="k m">nature</text><text x="140" y="112" class="k m">nurture</text>`}`));

  // ---------- stambomen ----------
  // persoon: [nummer, geslacht m/v, ziek, generatie, positie]; paar: [a, b, [kinderen]]
  const AUT = ["AA", "Aa", "aa", "AA of Aa"];
  const XV = ["X^{A}X^{A}", "X^{A}X^{a}", "X^{a}X^{a}", "X^{A}X^{A} of X^{A}X^{a}"], XM = ["X^{A}Y", "X^{a}Y"];
  BIO.GENO_OPTIES = { AUT, XV, XM };
  BIO.STAMBOMEN = [
    {
      id: "s1", titel: "Familie 1", eigenschap: "een erfelijke stofwisselingsziekte",
      personen: [[1, "m", 0, 0, 1.5], [2, "v", 0, 0, 2.5], [3, "v", 1, 1, 0.5], [4, "m", 0, 1, 1.5], [5, "v", 0, 1, 2.5], [6, "m", 1, 1, 3.5], [7, "m", 0, 2, 2.5], [8, "v", 1, 2, 3.5]],
      paren: [[1, 2, [3, 4, 5]], [5, 6, [7, 8]]],
      model: "ar",
      wijze: {
        q: "Hoe erft deze ziekte over?",
        opties: ["Recessief, en niet X-chromosomaal", "Recessief, en X-chromosomaal", "Dominant, en niet X-chromosomaal", "Dominant, en X-chromosomaal"],
        stappen: ["Ouders 1 en 2 zijn gezond, maar dochter 3 is ziek. Het ziekte-allel zat dus verborgen bij de ouders: het is **recessief**.", "Zou het gen op het X-chromosoom liggen, dan heeft dochter 3 genotype X^{a}X^{a} en kreeg ze één X^{a} van haar vader. Vader 1 zou dan X^{a}Y zijn en ziek zijn.", "Vader 1 is gezond, dus het gen ligt **niet op het X-chromosoom**."]
      },
      geno: { vragen: [1, 5, 7, 4], uitleg: { 1: "1 is gezond (minstens één A) en heeft een ziek kind (aa), dat van hem een a kreeg: Aa.", 5: "5 is gezond, maar haar dochter 8 is aa en kreeg een a van haar: Aa.", 7: "7 is gezond, maar zijn vader 6 is aa en geeft altijd a door: Aa.", 4: "4 is gezond en zijn ouders zijn allebei Aa. Hij kan AA of Aa zijn; dat is uit de stamboom niet te bepalen." } },
      kans: { q: "5 en 6 krijgen nog een kind. Hoe groot is de kans dat dit kind de ziekte heeft?", opties: ["50%", "25%", "75%", "0%"], stappen: ["5 is Aa, 6 is aa.", "Aa × aa geeft de helft Aa (gezond) en de helft aa (ziek).", "De kans is 50%."] }
    },
    {
      id: "s2", titel: "Familie 2", eigenschap: "een vorm van kleurenblindheid", extra: "Uit DNA-onderzoek blijkt dat man 1 het allel voor deze kleurenblindheid niet heeft.",
      personen: [[1, "m", 0, 0, 1.5], [2, "v", 0, 0, 2.5], [3, "m", 1, 1, 0.5], [4, "m", 0, 1, 1.5], [5, "v", 0, 1, 2.5], [6, "m", 0, 1, 3.5], [7, "m", 1, 2, 2.25], [8, "v", 0, 2, 3], [9, "m", 0, 2, 3.75]],
      paren: [[1, 2, [3, 4, 5]], [5, 6, [7, 8, 9]]],
      model: "xr", vast: { 1: "X^{A}Y" },
      wijze: {
        q: "Hoe erft deze kleurenblindheid over?",
        opties: ["Recessief, en X-chromosomaal", "Recessief, en niet X-chromosomaal", "Dominant, en X-chromosomaal", "Dominant, en niet X-chromosomaal"],
        stappen: ["Ouders 1 en 2 zijn niet kleurenblind, zoon 3 wel: het allel is **recessief**.", "Bij een gen op een gewoon chromosoom zou zoon 3 (aa) van beide ouders een a hebben gekregen. Maar vader 1 heeft het allel niet.", "Zoon 3 is dus kleurenblind met maar één allel, van zijn moeder. Dat kan alleen als het gen op het **X-chromosoom** ligt: een man heeft maar één X."]
      },
      geno: { vragen: [2, 3, 5, 8], uitleg: { 2: "2 is niet kleurenblind, maar gaf X^{a} door aan zoon 3: X^{A}X^{a} (draagster).", 3: "Een man heeft één X-chromosoom. 3 is kleurenblind: X^{a}Y.", 5: "5 is niet kleurenblind, maar haar zoon 7 is X^{a}Y en kreeg zijn X van haar: X^{A}X^{a}.", 8: "8 kreeg X^{A} van vader 6 en X^{A} of X^{a} van moeder 5. Dat is niet te bepalen." } },
      kans: { q: "5 en 6 krijgen nog een kind. Hoe groot is de kans op een kleurenblind kind?", opties: ["25%", "50%", "0%", "75%"], stappen: ["5 is X^{A}X^{a}, 6 is X^{A}Y.", "Mogelijke kinderen: X^{A}X^{A}, X^{A}X^{a}, X^{A}Y en X^{a}Y, elk 25%.", "Alleen X^{a}Y is kleurenblind: 25%. (Van de zonen is de helft kleurenblind.)"] }
    },
    {
      id: "s3", titel: "Familie 3", eigenschap: "een erfelijke vorm van extra vingers",
      personen: [[1, "m", 1, 0, 1.5], [2, "v", 1, 0, 2.5], [3, "v", 0, 1, 0.5], [4, "m", 1, 1, 1.5], [5, "v", 1, 1, 2.5], [6, "m", 0, 1, 3.5], [7, "v", 0, 2, 2.5], [8, "m", 1, 2, 3.5]],
      paren: [[1, 2, [3, 4, 5]], [5, 6, [7, 8]]],
      model: "ad",
      wijze: {
        q: "Hoe erft deze eigenschap over?",
        opties: ["Dominant, en niet X-chromosomaal", "Dominant, en X-chromosomaal", "Recessief, en niet X-chromosomaal", "Recessief, en X-chromosomaal"],
        stappen: ["Ouders 1 en 2 hebben allebei de eigenschap, dochter 3 niet. Bij de ouders zat dus een allel voor 'geen extra vingers' verborgen: dat allel is recessief en de eigenschap is **dominant**.", "Zou het gen op het X-chromosoom liggen, dan geeft vader 1 (X^{A}Y) zijn X^{A} aan elke dochter. Alle dochters zouden de eigenschap hebben.", "Dochter 3 heeft de eigenschap niet, dus het gen ligt **niet op het X-chromosoom**."]
      },
      geno: { vragen: [1, 3, 5, 4], uitleg: { 1: "1 heeft de eigenschap (minstens één A) en een kind zonder (aa), dat van hem een a kreeg: Aa.", 3: "3 heeft de dominante eigenschap niet: aa.", 5: "5 heeft de eigenschap, maar dochter 7 is aa en kreeg een a van haar: Aa.", 4: "4 heeft de eigenschap en zijn ouders zijn allebei Aa. Hij kan AA of Aa zijn; dat is niet te bepalen." } },
      kans: { q: "5 en 6 krijgen nog een kind. Hoe groot is de kans dat dit kind de eigenschap heeft?", opties: ["50%", "25%", "75%", "100%"], stappen: ["5 is Aa, 6 is aa.", "Aa × aa geeft de helft Aa (met de eigenschap) en de helft aa (zonder).", "De kans is 50%."] }
    },
    {
      id: "s4", titel: "Familie 4", eigenschap: "een erfelijke spierziekte",
      personen: [[1, "m", 1, 0, 1.5], [2, "v", 0, 0, 2.5], [3, "m", 0, 1, 1], [4, "v", 0, 1, 2.5], [5, "m", 0, 1, 3.5], [6, "m", 1, 2, 2.25], [7, "v", 0, 2, 3], [8, "m", 0, 2, 3.75]],
      paren: [[1, 2, [3, 4]], [4, 5, [6, 7, 8]]],
      model: "xr", onzeker: true,
      wijze: {
        q: "Wat kun je uit deze stamboom afleiden?",
        opties: ["Recessief; X-chromosomaal is niet uit te sluiten", "Recessief; zeker niet X-chromosomaal", "Dominant; X-chromosomaal is niet uit te sluiten", "Dominant; zeker niet X-chromosomaal"],
        stappen: ["Ouders 4 en 5 zijn gezond, zoon 6 is ziek: het ziekte-allel is **recessief**.", "X-chromosomaal kun je uitsluiten met een zieke dochter die een gezonde vader heeft, of een zieke moeder met een gezonde zoon. Zo'n combinatie komt hier niet voor.", "Het past wel bij X-chromosomaal: moeder 4 kan X^{a} van haar zieke vader 1 hebben gekregen en aan zoon 6 hebben doorgegeven. X-chromosomaal is dus **niet uit te sluiten** (maar ook niet bewezen)."]
      },
      genoIntro: "Neem aan dat het gen op het X-chromosoom ligt.",
      geno: { vragen: [1, 4, 6, 7], uitleg: { 1: "1 is een zieke man: X^{a}Y.", 4: "4 kreeg het X-chromosoom van haar zieke vader (X^{a}) en is zelf gezond: X^{A}X^{a}.", 6: "6 is een zieke man: X^{a}Y. Zijn X^{a} komt van moeder 4.", 7: "7 kreeg X^{A} van vader 5 en X^{A} of X^{a} van moeder 4. Dat is niet te bepalen." } },
      kans: { q: "Neem weer aan dat het gen op het X-chromosoom ligt. 4 en 5 krijgen een dochter. Hoe groot is de kans dat zij de ziekte heeft?", opties: ["0%", "25%", "50%", "100%"], stappen: ["4 is X^{A}X^{a}, 5 is X^{A}Y.", "Een dochter krijgt van vader 5 altijd X^{A}.", "Met één X^{A} is ze gezond (hooguit draagster): de kans is 0%."] }
    }
  ];
  // o: { gen: {nr: genotype}, vraag: [nrs], klaar: [nrs], tik: bool }
  BIO.stamboomSvg = function (st, o) {
    o = o || {};
    const X = (p) => 52 + p * 66, Y = (g) => 36 + g * 74, P = {};
    st.personen.forEach((p) => { P[p[0]] = { n: p[0], s: p[1], z: p[2], x: X(p[4]), y: Y(p[3]) }; });
    let s = "";
    st.paren.forEach(([a, b, kinderen]) => {
      const A = P[a], B = P[b], mx = (A.x + B.x) / 2, by = A.y + 40;
      s += `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" class="s"/><line x1="${mx}" y1="${A.y}" x2="${mx}" y2="${by}" class="s"/>`;
      const xs = kinderen.map((k) => P[k].x);
      s += `<line x1="${Math.min(mx, ...xs)}" y1="${by}" x2="${Math.max(mx, ...xs)}" y2="${by}" class="s"/>`;
      kinderen.forEach((k) => { s += `<line x1="${P[k].x}" y1="${by}" x2="${P[k].x}" y2="${P[k].y}" class="s"/>`; });
    });
    ["I", "II", "III"].forEach((r, g) => { if (st.personen.some((p) => p[3] === g)) s += `<text x="6" y="${Y(g) + 5}" class="b m">${r}</text>`; });
    Object.values(P).forEach((p) => {
      const kl = `pers ${p.z ? "ziek" : ""} ${(o.vraag || []).includes(p.n) ? "vraag" : ""} ${(o.klaar || []).includes(p.n) ? "klaar" : ""}`;
      s += p.s === "m" ? `<rect x="${p.x - 14}" y="${p.y - 14}" width="28" height="28" class="${kl}"/>` : `<circle cx="${p.x}" cy="${p.y}" r="15" class="${kl}"/>`;
      s += `<text x="${p.x + 19}" y="${p.y - 10}" class="k b">${p.n}</text>`;
      if (o.gen && o.gen[p.n]) s += `<text x="${p.x}" y="${p.y + 30}" text-anchor="middle" class="gen">${svgGeno(o.gen[p.n])}</text>`;
      if (o.tik) s += `<rect x="${p.x - 22}" y="${p.y - 22}" width="44" height="44" class="hot" data-p="${p.n}"/>`;
    });
    const hoogte = Y(Math.max(...st.personen.map((p) => p[3]))) + 58;
    s += `<text x="170" y="${hoogte - 8}" text-anchor="middle" class="k m">□ man · ○ vrouw · gevuld = met de eigenschap</text>`;
    return svg(340, hoogte, "Stamboom van " + st.titel, s, o.extra || "");
  };
  TW.fig("stamboom-1", () => BIO.stamboomSvg(BIO.STAMBOMEN[0]));
  TW.fig("stamboom-2", () => BIO.stamboomSvg(BIO.STAMBOMEN[1]));
  TW.fig("stamboom-3", () => BIO.stamboomSvg(BIO.STAMBOMEN[2]));
  TW.fig("stamboom-4", () => BIO.stamboomSvg(BIO.STAMBOMEN[3]));

  // ---------- X- en Y-chromosoom ----------
  TW.fig("geslachtschromosomen", (quiz) => svg(340, 150, "Geslachtschromosomen: een vrouw heeft XX, een man XY", `
    <text x="90" y="16" text-anchor="middle" class="b">vrouw</text><text x="250" y="16" text-anchor="middle" class="b">man</text>
    <rect x="62" y="26" width="18" height="92" rx="9" class="zacht"/><rect x="100" y="26" width="18" height="92" rx="9" class="zacht"/>
    <rect x="62" y="56" width="18" height="8" class="or"/><rect x="100" y="56" width="18" height="8" class="or"/>
    <rect x="222" y="26" width="18" height="92" rx="9" class="zacht"/><rect x="262" y="70" width="16" height="48" rx="8" class="wit"/>
    <rect x="222" y="56" width="18" height="8" class="or"/>
    <text x="71" y="136" text-anchor="middle" class="b">X</text><text x="109" y="136" text-anchor="middle" class="b">X</text><text x="231" y="136" text-anchor="middle" class="b">X</text><text x="270" y="136" text-anchor="middle" class="b">Y</text>
    <text x="170" y="56" text-anchor="middle" class="k pb b">${quiz ? "" : "gen op X"}</text><text x="170" y="70" text-anchor="middle" class="k m">${quiz ? "" : "vrouw: 2 allelen"}</text><text x="170" y="84" text-anchor="middle" class="k m">${quiz ? "" : "man: 1 allel"}</text>`));
})();
