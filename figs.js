// Figuren (inline SVG). TW.fig(naam, (quiz) => svg); bij quiz = true weglaten wat het antwoord verklapt.
// Dit bestand: gedeelde hulpmiddelen (BIO) en de figuren van thema 9 DNA.
(function () {
  "use strict";

  // ---------- BIO: gedeelde biologie-hulpmiddelen voor figuren en widgets ----------
  const BASEN = ["U", "C", "A", "G"];
  // Standaard genetische code, in de volgorde van de codontabel (1e base, 2e base, 3e base: U C A G).
  const EEN = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
  const DRIE = { F: "Phe", L: "Leu", S: "Ser", Y: "Tyr", C: "Cys", W: "Trp", P: "Pro", H: "His", Q: "Gln", R: "Arg", I: "Ile", M: "Met", T: "Thr", N: "Asn", K: "Lys", V: "Val", A: "Ala", D: "Asp", E: "Glu", G: "Gly", "*": "stop" };
  const NAAM = { Phe: "fenylalanine", Leu: "leucine", Ser: "serine", Tyr: "tyrosine", Cys: "cysteïne", Trp: "tryptofaan", Pro: "proline", His: "histidine", Gln: "glutamine", Arg: "arginine", Ile: "isoleucine", Met: "methionine", Thr: "threonine", Asn: "asparagine", Lys: "lysine", Val: "valine", Ala: "alanine", Asp: "asparaginezuur", Glu: "glutaminezuur", Gly: "glycine", stop: "stopcodon" };
  const CODE = {};
  BASEN.forEach((a, i) => BASEN.forEach((b, j) => BASEN.forEach((c, k) => { CODE[a + b + c] = DRIE[EEN[i * 16 + j * 4 + k]]; })));
  const DNA_PAAR = { A: "T", T: "A", C: "G", G: "C" };
  const RNA_VAN_TEMPLATE = { A: "U", T: "A", C: "G", G: "C" };
  const esc = (s) => TW.esc(s);

  const BIO = {
    BASEN, CODE, NAAM,
    // complementaire DNA-streng (zelfde leesrichting op papier: positie voor positie)
    comp: (dna) => dna.split("").map((b) => DNA_PAAR[b]).join(""),
    // mRNA dat aan een template-streng wordt gebouwd (positie voor positie)
    transcribeer: (template) => template.split("").map((b) => RNA_VAN_TEMPLATE[b]).join(""),
    // coderende streng (DNA) -> mRNA: T wordt U
    naarRna: (coderend) => coderend.replace(/T/g, "U"),
    codons: (seq) => { const r = []; for (let i = 0; i + 3 <= seq.length; i += 3) r.push(seq.slice(i, i + 3)); return r; },
    // vertaal mRNA vanaf positie 0 tot en met het eerste stopcodon; geeft [{codon, az}]
    vertaal(mrna) {
      const uit = [];
      for (const c of BIO.codons(mrna)) { const az = CODE[c]; uit.push({ codon: c, az }); if (az === "stop") break; }
      return uit;
    },
    // willekeurig gen (mRNA): AUG + n codons zonder stop + stopcodon
    gen(n, R) {
      const zin = Object.keys(CODE).filter((c) => CODE[c] !== "stop" && c !== "AUG");
      let s = "AUG";
      for (let i = 0; i < n; i++) s += R.kies(zin);
      return s + R.kies(["UAA", "UAG", "UGA"]);
    },
    waterstofbruggen: (dna) => dna.split("").reduce((n, b) => n + (b === "A" || b === "T" ? 2 : 3), 0),
    // genotype-tekst met ^{..} naar SVG-tspans
    svgGeno(s) {
      let uit = "", omhoog = false;
      String(s).split(/(\^\{.+?\})/).forEach((deel) => {
        if (!deel) return;
        const m = deel.match(/^\^\{(.+?)\}$/);
        if (m) { uit += `<tspan dy="-5" font-size="9">${esc(m[1])}</tspan>`; omhoog = true; }
        else { uit += `<tspan${omhoog ? ' dy="5"' : ""}>${esc(deel)}</tspan>`; omhoog = false; }
      });
      return uit;
    },
    // pijl met punt (geen markers nodig)
    pijl(x1, y1, x2, y2, cls, k) {
      const a = Math.atan2(y2 - y1, x2 - x1), L = k || 7;
      const p = (h) => `${(x2 - L * Math.cos(a + h)).toFixed(1)},${(y2 - L * Math.sin(a + h)).toFixed(1)}`;
      return `<line x1="${x1}" y1="${y1}" x2="${(x2 - 3 * Math.cos(a)).toFixed(1)}" y2="${(y2 - 3 * Math.sin(a)).toFixed(1)}" class="pijl ${cls || ""}"/><polygon points="${x2},${y2} ${p(0.45)} ${p(-0.45)}" class="pk ${cls ? cls + "-k" : ""}"/>`;
    },
    nr: (x, y, n) => `<circle cx="${x}" cy="${y}" r="9" class="nrb"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="nrt">${n}</text>`,
    // label: tekst, of in de quizvariant een nummer
    lab(quiz, x, y, tekst, n, anker, cls) {
      if (quiz) { const dx = anker === "end" ? -9 : anker === "middle" ? 0 : 9; return BIO.nr(x + dx, y - 4, n); }
      return `<text x="${x}" y="${y}" text-anchor="${anker || "start"}" class="${cls || "k"}">${esc(tekst)}</text>`;
    },
    svg: (w, h, label, body, extra) => `<svg class="fig" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" ${extra || ""}>${body}</svg>`,
    // codontabel als HTML; knoppen = true maakt de 16 vakken tikbaar (data-v = eerste twee basen)
    codontabel(knoppen) {
      let h = `<div class="codontabel"><span class="h"></span>${BASEN.map((b) => `<span class="h">${b}</span>`).join("")}`;
      BASEN.forEach((a) => {
        h += `<span class="h">${a}</span>`;
        BASEN.forEach((b) => {
          const regels = BASEN.map((c) => { const az = CODE[a + b + c]; return `<span class="${az === "stop" ? "stop" : a + b + c === "AUG" ? "start" : ""}">${a + b + c} <i>${az}</i></span>`; }).join("");
          h += knoppen ? `<button type="button" class="c" data-v="${a + b}" aria-label="codons die beginnen met ${a}${b}">${regels}</button>` : `<div class="c">${regels}</div>`;
        });
      });
      return h + `<span class="cap">links: 1e base · boven: 2e base · AUG (Met) is ook het startcodon</span></div>`;
    }
  };
  window.BIO = BIO;

  const { svg, lab, nr, pijl } = BIO;
  const baseRect = (x, y, w, h, b, tekst) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" class="b${b}"/><text x="${x + w / 2}" y="${y + h / 2 + 4.5}" text-anchor="middle" class="op">${tekst == null ? b : tekst}</text>`;

  // ---------- nucleotide ----------
  TW.fig("nucleotide", (quiz) => svg(340, 150, "Bouw van een DNA-nucleotide", `
    <line x1="92" y1="62" x2="128" y2="76" class="s"/><line x1="190" y1="80" x2="222" y2="80" class="s"/>
    <circle cx="72" cy="56" r="24" class="geel"/><text x="72" y="61" text-anchor="middle" class="b">P</text>
    <polygon points="158,52 192,76 180,114 138,114 126,76" class="zacht"/>
    ${baseRect(222, 58, 84, 44, "A", quiz ? "?" : "base")}
    ${quiz ? nr(72, 20, 1) + nr(158, 132, 2) + nr(264, 44, 3) : `
    <text x="72" y="22" text-anchor="middle" class="k b">fosfaatgroep</text>
    <text x="158" y="134" text-anchor="middle" class="k b">desoxyribose (suiker)</text>
    <text x="264" y="46" text-anchor="middle" class="k b">stikstofbase</text>
    <text x="264" y="120" text-anchor="middle" class="k m">A, T, C of G</text>`}`));

  // ---------- DNA-ladder ----------
  function ladder(boven, quiz) {
    const onder = BIO.comp(boven), n = boven.length, stap = 270 / n, x0 = 35;
    let s = `<line x1="24" y1="34" x2="316" y2="34" class="s dik"/><line x1="24" y1="166" x2="316" y2="166" class="s dik"/>`;
    for (let i = 0; i < n; i++) {
      const x = x0 + i * stap + stap / 2, w = Math.min(34, stap - 8), br = boven[i] === "A" || boven[i] === "T" ? 2 : 3;
      s += baseRect(x - w / 2, 36, w, 48, boven[i]) + (quiz ? `<rect x="${x - w / 2}" y="116" width="${w}" height="48" rx="5" class="grijs"/><text x="${x}" y="144.5" text-anchor="middle" class="b">?</text>` : baseRect(x - w / 2, 116, w, 48, onder[i]));
      for (let k = 0; k < br; k++) { const xx = x + (k - (br - 1) / 2) * 7; s += `<line x1="${xx.toFixed(1)}" y1="86" x2="${xx.toFixed(1)}" y2="114" class="stip"/>`; }
    }
    s += `<text x="12" y="38" text-anchor="middle" class="k b">5'</text><text x="328" y="38" text-anchor="middle" class="k b">3'</text><text x="12" y="170" text-anchor="middle" class="k b">3'</text><text x="328" y="170" text-anchor="middle" class="k b">5'</text>`;
    s += `<text x="170" y="16" text-anchor="middle" class="k m">keten van suiker en fosfaat</text><text x="170" y="190" text-anchor="middle" class="k m">stippellijnen: waterstofbruggen tussen de basen</text>`;
    return svg(340, 196, "Stukje dubbelstrengs DNA met basenparen", s);
  }
  TW.fig("dna-ladder", (quiz) => ladder("ATGCCA", quiz));
  BIO.ladder = ladder;

  // ---------- chromosoom en dubbele helix ----------
  TW.fig("chromosoom", (quiz) => {
    let helix = "";
    const pts = (fase) => { const p = []; for (let i = 0; i <= 60; i++) { const x = 180 + i * 2.4; p.push(`${x.toFixed(1)} ${(78 + 20 * Math.sin(i / 60 * Math.PI * 4 + fase)).toFixed(1)}`); } return "M" + p.join("L"); };
    for (let i = 2; i <= 58; i += 4) { const x = 180 + i * 2.4, a = 78 + 20 * Math.sin(i / 60 * Math.PI * 4), b = 78 + 20 * Math.sin(i / 60 * Math.PI * 4 + Math.PI); if (Math.abs(a - b) > 8) helix += `<line x1="${x.toFixed(1)}" y1="${a.toFixed(1)}" x2="${x.toFixed(1)}" y2="${b.toFixed(1)}" class="lgrijs"/>`; }
    helix += `<path d="${pts(0)}" class="curve"/><path d="${pts(Math.PI)}" class="curve4"/>`;
    return svg(340, 190, "Chromosoom met twee chromatiden en een uitvergroot stukje DNA", `
      <path d="M52 22 C40 22 36 34 40 50 L52 88 L40 132 C36 150 42 164 54 164 C66 164 70 150 66 132 L60 92 L66 50 C70 34 64 22 52 22Z" class="zacht"/>
      <path d="M84 22 C72 22 68 34 72 50 L78 92 L72 132 C68 150 72 164 84 164 C96 164 102 150 98 132 L86 88 L98 50 C102 34 96 22 84 22Z" class="zacht"/>
      <rect x="40" y="112" width="26" height="9" class="or"/><rect x="72" y="112" width="26" height="9" class="or"/>
      <circle cx="68" cy="90" r="6" class="acc"/>
      <line x1="98" y1="116" x2="140" y2="130" class="stip"/><line x1="140" y1="130" x2="176" y2="96" class="stip"/>
      ${lab(quiz, 112, 30, "chromatide", 1)}
      ${quiz ? "" : `<line x1="100" y1="30" x2="110" y2="28" class="lgrijs"/>`}
      ${lab(quiz, 112, 88, "centromeer", 2)}
      ${quiz ? "" : `<line x1="76" y1="90" x2="110" y2="86" class="lgrijs"/>`}
      ${lab(quiz, 104, 148, "gen", 3, "start", "k pb")}
      ${lab(quiz, 18, 180, "telomeer (uiteinde)", 4)}
      ${helix}
      ${quiz ? nr(254, 124, 5) : `<text x="254" y="126" text-anchor="middle" class="k b">DNA-molecuul: dubbele helix</text><text x="254" y="142" text-anchor="middle" class="k m">om eiwitten gewikkeld</text>`}`);
  });

  // ---------- DNA-replicatie ----------
  TW.fig("replicatie", (quiz) => {
    let r = "";
    for (let x = 30; x <= 114; x += 14) r += `<line x1="${x}" y1="95" x2="${x}" y2="115" class="lgrijs"/>`;
    for (let x = 222; x <= 316; x += 14) r += `<line x1="${x}" y1="40" x2="${x}" y2="60" class="lgrijs"/>`;
    for (let x = 250; x <= 316; x += 14) r += `<line x1="${x}" y1="150" x2="${x}" y2="170" class="lgrijs"/>`;
    return svg(340, 212, "DNA-replicatie: de dubbele streng gaat open en aan elke oude streng wordt een nieuwe gebouwd", `${r}
      <path d="M20 95 L120 95 L200 40 L322 40" class="s dik"/><path d="M20 115 L120 115 L200 170 L322 170" class="s dik"/>
      <path d="M215 60 L322 60" class="nieuw dik"/><path d="M243 150 L322 150" class="nieuw dik"/>
      <ellipse cx="232" cy="160" rx="17" ry="14" class="zacht"/>
      <circle cx="162" cy="96" r="4" class="vnieuw"/><circle cx="176" cy="112" r="4" class="vnieuw"/><circle cx="160" cy="122" r="4" class="vnieuw"/><circle cx="188" cy="94" r="4" class="vnieuw"/>
      ${quiz ? nr(60, 80, 1) + nr(270, 26, 2) + nr(270, 76, 3) + nr(204, 176, 4) + nr(174, 140, 5) : `
      <text x="68" y="84" text-anchor="middle" class="k b">oorspronkelijk DNA</text>
      <text x="270" y="30" text-anchor="middle" class="k">oude streng</text>
      <text x="270" y="78" text-anchor="middle" class="k tn b">nieuwe streng</text>
      <text x="270" y="140" text-anchor="middle" class="k tn b">nieuwe streng</text>
      <text x="290" y="188" text-anchor="middle" class="k">oude streng</text>
      <text x="212" y="184" text-anchor="end" class="k pa b">DNA-polymerase</text>
      <text x="150" y="146" text-anchor="middle" class="k tn">vrije nucleotiden</text>`}
      <text x="170" y="208" text-anchor="middle" class="k m">${quiz ? "" : "elk nieuw DNA-molecuul: één oude en één nieuwe streng"}</text>`);
  });

  // ---------- celcyclus ----------
  TW.fig("celcyclus", (quiz) => {
    const cx = 110, cy = 100, r = 62;
    const boog = (a0, a1, cls) => { const p = (a) => `${(cx + r * Math.sin(a * Math.PI / 180)).toFixed(1)} ${(cy - r * Math.cos(a * Math.PI / 180)).toFixed(1)}`; return `<path d="M${p(a0)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(a1)}" class="${cls}" stroke-width="22" fill="none"/>`; };
    const t = (a, s, cls) => `<text x="${(cx + r * Math.sin(a * Math.PI / 180)).toFixed(1)}" y="${(cy - r * Math.cos(a * Math.PI / 180) + 4).toFixed(1)}" text-anchor="middle" class="${cls}">${s}</text>`;
    return svg(340, 200, "Celcyclus met G1-fase, S-fase, G2-fase en M-fase", `
      ${boog(2, 148, "lgrijs")}${boog(152, 248, "lacc")}${boog(252, 308, "lgrijs")}${boog(312, 358, "lor")}
      ${t(75, "G1", "k b")}${t(200, quiz ? "1" : "S", "op")}${t(280, "G2", "k b")}${t(335, quiz ? "2" : "M", "op")}
      ${pijl(cx + 4, cy - r + 22, cx + 22, cy - r + 25, "")}
      <text x="${cx}" y="${cy - 2}" text-anchor="middle" class="k b">celcyclus</text><text x="${cx}" y="${cy + 12}" text-anchor="middle" class="k m">met de klok mee</text>
      ${quiz ? `<text x="200" y="70" class="k">Fase 1: het DNA wordt</text><text x="200" y="84" class="k">verdubbeld.</text><text x="200" y="116" class="k">Fase 2: de kern en de cel</text><text x="200" y="130" class="k">delen.</text>` : `
      <text x="200" y="52" class="k b pa">S-fase</text><text x="200" y="66" class="k">DNA-replicatie: elk</text><text x="200" y="80" class="k">chromosoom krijgt twee</text><text x="200" y="94" class="k">chromatiden</text>
      <text x="200" y="122" class="k b pb">M-fase</text><text x="200" y="136" class="k">mitose: de chromatiden</text><text x="200" y="150" class="k">gaan uit elkaar</text>
      <text x="200" y="178" class="k m">G1 + S + G2 = interfase</text>`}`);
  });

  // ---------- overzicht eiwitsynthese ----------
  TW.fig("eiwitsynthese", (quiz) => {
    let golf = "M92 88"; for (let i = 0; i < 9; i++) golf += ` q4 ${i % 2 ? 7 : -7} 8 0`;
    let mrna = "M100 140"; for (let i = 0; i < 22; i++) mrna += ` q4 ${i % 2 ? 6 : -6} 8 0`;
    return svg(340, 226, "Eiwitsynthese in de cel: transcriptie in de celkern en translatie bij een ribosoom", `
      <rect x="8" y="12" width="324" height="204" rx="34" class="wit"/>
      <circle cx="104" cy="112" r="80" class="zacht"/>
      <rect x="177" y="130" width="12" height="20" class="kaart"/>
      <path d="${golf}" class="s dik"/><path d="${golf.replace("M92 88", "M92 96")}" class="s dik"/>
      <path d="${mrna}" class="lor dik"/>
      ${pijl(100, 102, 100, 130, "")}
      <ellipse cx="262" cy="134" rx="30" ry="15" class="geel"/><ellipse cx="262" cy="150" rx="22" ry="10" class="geel"/>
      ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${266 + i * 9}" cy="${112 - i * 11}" r="6.5" class="acc"/>`).join("")}
      ${quiz ? nr(104, 50, 1) + nr(72, 78, 2) + nr(116, 118, 3) + nr(140, 160, 4) + nr(262, 176, 5) + nr(312, 46, 6) + nr(184, 166, 7) + nr(222, 122, 8) : `
      <text x="104" y="52" text-anchor="middle" class="k b pa">celkern</text>
      <text x="92" y="78" class="k b">DNA</text>
      <text x="108" y="121" class="k pa">transcriptie</text>
      <text x="100" y="162" class="k pb b">mRNA</text>
      <text x="190" y="166" class="k m">kernporie</text>
      <text x="262" y="178" text-anchor="middle" class="k b">ribosoom</text>
      <text x="262" y="194" text-anchor="middle" class="k pa">translatie</text>
      <text x="272" y="44" text-anchor="middle" class="k b">eiwit</text>
      <text x="160" y="206" text-anchor="middle" class="k m">cytoplasma</text>`}`);
  });

  // ---------- translatie in detail ----------
  TW.fig("translatie", (quiz) => {
    const cod = ["AUG", "GCU", "AAA", "UGG", "UAA"], x0 = 22, w = 58;
    let s = `<path d="M96 150 C96 96 250 96 250 150 L250 196 C250 206 96 206 96 196Z" class="geel" opacity=".55"/>`;
    cod.forEach((c, i) => { s += `<rect x="${x0 + i * w + 2}" y="160" width="${w - 4}" height="26" rx="6" class="wit"/><text x="${x0 + i * w + w / 2}" y="178" text-anchor="middle" class="mono b">${c}</text>`; });
    const trna = (i, anti, az, hoog) => `<path d="M${x0 + i * w + 12} 152 L${x0 + i * w + w - 12} 152 L${x0 + i * w + w - 22} ${hoog + 26} L${x0 + i * w + 22} ${hoog + 26}Z" class="zacht"/>
      <text x="${x0 + i * w + w / 2}" y="148" text-anchor="middle" class="mono b pa">${anti}</text><circle cx="${x0 + i * w + w / 2}" cy="${hoog + 12}" r="14" class="acc"/><text x="${x0 + i * w + w / 2}" y="${hoog + 16}" text-anchor="middle" class="op k">${az}</text>`;
    s += trna(1, "CGA", "Ala", 62) + trna(2, quiz ? "? ? ?" : "UUU", quiz ? "?" : "Lys", 62);
    s += `<circle cx="${x0 + w + w / 2 - 30}" cy="60" r="14" class="acc"/><text x="${x0 + w + w / 2 - 30}" y="64" text-anchor="middle" class="op k">Met</text><line x1="${x0 + w + w / 2 - 16}" y1="68" x2="${x0 + w + w / 2 - 12}" y2="70" class="s"/>`;
    s += pijl(262, 200, 310, 200, "") + `<text x="286" y="216" text-anchor="middle" class="k m">ribosoom schuift op</text>`;
    s += `<text x="10" y="178" class="k b">5'</text><text x="322" y="178" class="k b">3'</text>`;
    s += quiz ? nr(40, 150, 1) + nr(214, 120, 2) + nr(128, 30, 3) + nr(264, 124, 4)
      : `<text x="22" y="150" class="k pb b">mRNA</text><text x="238" y="112" class="k pa b">tRNA</text><text x="238" y="126" class="k m">met anticodon</text><text x="110" y="32" text-anchor="middle" class="k b">aminozuurketen</text><text x="264" y="146" class="k b">ribosoom</text><text x="22" y="206" class="k m">codon</text>`;
    return svg(340, 222, "Translatie: een ribosoom leest het mRNA per codon af, tRNA-moleculen brengen de aminozuren aan", s);
  });

  // ---------- codontabel ----------
  TW.fig("codontabel", () => BIO.codontabel(false));

  // ---------- genexpressie ----------
  TW.fig("genexpressie", (quiz) => {
    // model van de lactosegenen van E. coli: een actieve repressor blokkeert de structuurgenen
    const rij = (y, aan) => `
      <rect x="20" y="${y}" width="300" height="14" rx="7" class="grijs"/>
      <rect x="30" y="${y - 3}" width="90" height="20" rx="5" class="or"/><text x="75" y="${y + 11}" text-anchor="middle" class="op k">${quiz ? "1" : "regulatorgen"}</text>
      <rect x="200" y="${y - 3}" width="90" height="20" rx="5" class="${aan ? "acc" : "wit"}"/><text x="245" y="${y + 11}" text-anchor="middle" class="${aan ? "op k" : "k"}">${quiz ? "2" : "structuurgen"}</text>
      ${pijl(75, y + 19, 75, y + 38, "")}
      <path d="M62 ${y + 42} h26 v12 l-13 9 l-13 -9Z" class="${aan ? "wit" : "or"}"/>
      ${aan ? `<circle cx="96" cy="${y + 47}" r="5" class="geel"/>` + pijl(245, y + 19, 245, y + 40, "") + `<path d="M222 ${y + 48} q5 -7 10 0 t10 0 t10 0 t10 0" class="lor dik"/>${pijl(272, y + 48, 296, y + 48, "")}<circle cx="308" cy="${y + 48}" r="8" class="acc"/>`
        : pijl(92, y + 50, 178, y + 20, "") + `<path d="M172 ${y - 6} h22 v10 l-11 8 l-11 -8Z" class="or"/><path d="M226 ${y + 30} l12 12 m0 -12 l-12 12" class="curve2"/>`}`;
    return svg(340, 226, "Genregulatie: een actieve repressor blokkeert het structuurgen; is de repressor inactief, dan wordt het gen afgelezen", `
      <text x="20" y="16" class="k b pg">Gen staat aan</text>${rij(26, true)}
      <text x="20" y="130" class="k b pr">Gen staat uit</text>${rij(142, false)}
      ${quiz ? "" : `<text x="20" y="104" class="k">repressor inactief (lactose erop)</text><text x="318" y="92" text-anchor="end" class="k m">mRNA → eiwit</text><text x="20" y="220" class="k">repressor actief: zit op het DNA, geen mRNA</text>`}`);
  });

  // ---------- celdifferentiatie ----------
  TW.fig("differentiatie", () => {
    const cel = (x, naam, aan) => `<rect x="${x - 44}" y="96" width="88" height="70" rx="20" class="wit"/><text x="${x}" y="184" text-anchor="middle" class="k b">${naam}</text>
      ${[0, 1, 2, 3].map((i) => `<rect x="${x - 34 + i * 18}" y="116" width="14" height="30" rx="4" class="${aan[i] ? ["acc", "or", "vnieuw", "za"][i] : "grijs"}"/><text x="${x - 27 + i * 18}" y="160" text-anchor="middle" class="k m">${i + 1}</text>`).join("")}`;
    return svg(340, 192, "Celdifferentiatie: alle cellen hebben dezelfde genen, maar per celtype staan andere genen aan", `
      <circle cx="170" cy="34" r="24" class="zacht"/><text x="170" y="38" text-anchor="middle" class="k b">stamcel</text>
      ${pijl(150, 54, 76, 92, "")}${pijl(170, 60, 170, 92, "")}${pijl(190, 54, 264, 92, "")}
      ${cel(64, "spiercel", [1, 1, 0, 0])}${cel(170, "zenuwcel", [1, 0, 1, 0])}${cel(276, "levercel", [1, 0, 0, 1])}
      <text x="226" y="24" class="k m">gekleurd = gen aan</text><text x="226" y="38" class="k m">grijs = gen uit</text>`);
  });

  // ---------- mutaties ----------
  const MUT_BASIS = "ATGGCTGAATGGAAATAA";
  BIO.mutVoorbeelden = [
    { naam: "normaal", dna: MUT_BASIS, pos: -1 },
    { naam: "geen effect", dna: "ATGGCCGAATGGAAATAA", pos: 5 },
    { naam: "ander aminozuur", dna: "ATGGCTGTATGGAAATAA", pos: 7 },
    { naam: "vroeg stopcodon", dna: "ATGGCTGAATGAAAATAA", pos: 11 },
    { naam: "leesraam verschuift", dna: "ATGCTGAATGGAAATAA", pos: 3 }
  ];
  TW.fig("mutaties", (quiz) => {
    let s = "";
    BIO.mutVoorbeelden.forEach((m, r) => {
      const y = 22 + r * 46, cods = BIO.codons(m.dna), eiwit = BIO.vertaal(BIO.naarRna(m.dna));
      s += `<text x="6" y="${y}" class="k b ${r ? "" : "pa"}">${quiz && r ? "mutatie " + r : m.naam}</text>`;
      cods.forEach((c, i) => {
        const x = 142 + i * 34, hit = m.pos >= i * 3 && m.pos < i * 3 + 3;
        s += `<text x="${x}" y="${y}" text-anchor="middle" class="mono ${hit ? "pr b" : ""}">${c}</text>`;
        const az = eiwit[i];
        if (az) s += `<text x="${x}" y="${y + 16}" text-anchor="middle" class="k ${az.az === "stop" ? "pr b" : r && az.az !== BIO.vertaal(BIO.naarRna(MUT_BASIS))[i].az ? "pb b" : "m"}">${az.az}</text>`;
      });
      if (m.dna.length % 3) s += `<text x="${142 + cods.length * 34}" y="${y}" text-anchor="middle" class="mono m">${m.dna.slice(cods.length * 3)}</text>`;
      if (r === 4) s += `<text x="6" y="${y + 16}" class="k m">${quiz ? "" : "(G uit GCT weg)"}</text>`;
    });
    return svg(340, 236, "Vier soorten gevolgen van een puntmutatie voor de aminozuurvolgorde", s);
  });

  // ---------- PCR ----------
  TW.fig("pcr", (quiz) => {
    const Y = (t) => 150 - (t - 40) * 2, pts = [[30, 72], [44, 95], [70, 95], [84, 55], [110, 55], [122, 72], [160, 72], [174, 95], [200, 95], [214, 55], [240, 55], [252, 72], [290, 72], [304, 95], [322, 95]];
    return svg(340, 190, "Temperatuurverloop tijdens PCR: steeds drie stappen per cyclus", `
      ${[55, 72, 95].map((t) => `<line x1="30" y1="${Y(t)}" x2="326" y2="${Y(t)}" class="raster"/><text x="26" y="${Y(t) + 4}" text-anchor="end" class="k">${t}</text>`).join("")}
      <line x1="30" y1="20" x2="30" y2="150" class="s"/><line x1="30" y1="150" x2="326" y2="150" class="s"/>
      <text x="4" y="12" class="k b">temperatuur (°C)</text><text x="326" y="166" text-anchor="end" class="k b">tijd</text>
      <path d="M${pts.map((p) => p[0] + " " + Y(p[1])).join("L")}" class="curve"/>
      <line x1="44" y1="158" x2="174" y2="158" class="s"/><text x="109" y="172" text-anchor="middle" class="k">cyclus 1</text>
      <line x1="174" y1="158" x2="304" y2="158" class="s"/><text x="239" y="172" text-anchor="middle" class="k">cyclus 2</text>
      ${nr(57, Y(95) - 14, 1)}${nr(97, Y(55) + 16, 2)}${nr(141, Y(72) - 14, 3)}
      <text x="170" y="186" text-anchor="middle" class="k m">${quiz ? "" : "1 strengen los · 2 primers hechten · 3 polymerase bouwt"}</text>`);
  });

  // ---------- DNA-profiel ----------
  TW.fig("gel", () => {
    const banen = [["moeder", [50, 90, 130, 160]], ["kind", [50, 110, 130, 175]], ["man 1", [70, 110, 150, 175]], ["man 2", [60, 110, 140, 185]]];
    return svg(340, 214, "DNA-profielen van een moeder, een kind en twee mannen", `
      <rect x="58" y="30" width="268" height="170" rx="8" class="wit"/>
      <text x="4" y="44" class="k m">lange</text><text x="4" y="56" class="k m">stukken</text><text x="4" y="184" class="k m">korte</text><text x="4" y="196" class="k m">stukken</text>
      ${banen.map((b, i) => `<text x="${86 + i * 66}" y="20" text-anchor="middle" class="k b">${b[0]}</text>${b[1].map((y) => `<rect x="${64 + i * 66}" y="${y}" width="44" height="6" rx="2" class="${i === 1 ? "acc" : "nrb"}"/>`).join("")}`).join("")}`);
  });

  // ---------- recombinant-DNA ----------
  TW.fig("recombinant", (quiz) => {
    const ring = (x, y, gat, gen) => `<circle cx="${x}" cy="${y}" r="20" class="lgrijs" stroke-width="5" ${gat ? 'stroke-dasharray="100 26"' : ""}/>${gen ? `<path d="M${x - 14} ${y - 14} A20 20 0 0 1 ${x + 14} ${y - 14}" class="lor" stroke-width="6"/>` : ""}`;
    return svg(340, 212, "Recombinant-DNA-techniek: een gen wordt in een plasmide gezet en in een bacterie gebracht", `
      <path d="M22 44 q6 -8 12 0 t12 0 t12 0" class="lgrijs dik"/><path d="M58 44 q6 -8 12 0 t12 0" class="lor dik"/><path d="M82 44 q6 -8 12 0 t12 0" class="lgrijs dik"/>
      ${ring(64, 104, true, false)}
      ${pijl(112, 44, 148, 60, "")}${pijl(92, 104, 148, 84, "")}
      ${ring(180, 72, false, true)}
      ${pijl(206, 72, 232, 72, "")}
      <rect x="236" y="42" width="92" height="60" rx="28" class="wit"/><path d="M252 82 q6 -10 12 0 t12 0 t12 0" class="s"/>${ring(300, 66, false, true).replace(/r="20"/g, 'r="12"').replace("A20 20", "A12 12").replace(`M${300 - 14} ${66 - 14}`, `M${300 - 8} ${66 - 9}`).replace(`${300 + 14} ${66 - 14}`, `${300 + 8} ${66 - 9}`)}
      ${pijl(282, 106, 282, 130, "")}
      ${[0, 1, 2, 3].map((i) => `<rect x="${196 + i * 34}" y="138" width="28" height="18" rx="9" class="wit"/><circle cx="${210 + i * 34}" cy="170" r="4" class="or"/><circle cx="${202 + i * 34}" cy="178" r="4" class="or"/>`).join("")}
      ${quiz ? nr(70, 24, 1) + nr(64, 140, 2) + nr(180, 108, 3) + nr(282, 30, 4) + nr(180, 160, 5) : `
      <text x="64" y="26" text-anchor="middle" class="k"><tspan class="pb" font-weight="700">gen</tspan> uit menselijk DNA</text>
      <text x="64" y="142" text-anchor="middle" class="k b">plasmide</text><text x="64" y="156" text-anchor="middle" class="k m">opengeknipt</text>
      <text x="180" y="110" text-anchor="middle" class="k b">recombinant</text><text x="180" y="124" text-anchor="middle" class="k b">plasmide</text>
      <text x="282" y="32" text-anchor="middle" class="k b">bacterie</text>
      <text x="100" y="170" class="k">bacteriën delen en</text><text x="100" y="184" class="k">maken het <tspan class="pb" font-weight="700">eiwit</tspan></text>`}`);
  });

  // ---------- sikkelcel (samenhang thema 11) ----------
  TW.fig("sikkelcel", () => svg(340, 150, "Normale rode bloedcel en sikkelcel met het verschil in het DNA", `
    <ellipse cx="70" cy="56" rx="38" ry="30" class="zr"/><ellipse cx="70" cy="56" rx="16" ry="12" class="zr" style="filter:brightness(.8)"/>
    <path d="M214 30 C262 34 290 64 286 92 C270 70 244 60 206 64 C226 54 226 40 214 30Z" class="zr"/>
    <text x="70" y="106" text-anchor="middle" class="k b">normale rode bloedcel</text><text x="250" y="116" text-anchor="middle" class="k b">sikkelcel</text>
    <text x="70" y="126" text-anchor="middle" class="mono">GAG → Glu</text><text x="250" y="136" text-anchor="middle" class="mono">G<tspan class="pr" font-weight="700">T</tspan>G → <tspan class="pr" font-weight="700">Val</tspan></text>
    <text x="70" y="144" text-anchor="middle" class="k m">codon in hemoglobinegen</text>`));
})();
