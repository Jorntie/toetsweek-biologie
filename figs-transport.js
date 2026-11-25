// Figuren van thema 11 Transport. De tekenfuncties voor hart, bloedsomloop, drukverloop en haarvat
// staan in BIO zodat de widgets dezelfde tekeningen gebruiken.
(function () {
  "use strict";
  const BIO = window.BIO, { svg, lab, nr, pijl } = BIO;
  const esc = (s) => TW.esc(s);
  // buis: wand + bloed
  const buis = (d, kleur, w) => `<path d="${d}" class="wand" stroke-width="${w || 24}" stroke-linecap="butt"/><path d="${d}" class="${kleur}" stroke-width="${(w || 24) - 7}" stroke-linecap="butt"/>`;
  const wpijl = (x1, y1, x2, y2) => { const a = Math.atan2(y2 - y1, x2 - x1), p = (h) => `${(x2 - 7 * Math.cos(a + h)).toFixed(1)},${(y2 - 7 * Math.sin(a + h)).toFixed(1)}`; return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--card)" stroke-width="2.2"/><polygon points="${x2},${y2} ${p(0.5)} ${p(-0.5)}" fill="var(--card)" transform="translate(${(3 * Math.cos(a)).toFixed(1)} ${(3 * Math.sin(a)).toFixed(1)})"/>`; };

  // ---------- bloed ----------
  TW.fig("bloed", (quiz) => svg(340, 214, "Samenstelling van bloed na centrifugeren en de drie soorten bloedcellen", `
    <path d="M40 14 L40 170 A30 30 0 0 0 100 170 L100 14" class="wit"/>
    <rect x="42" y="24" width="56" height="88" class="plasma"/>
    <rect x="42" y="112" width="56" height="5" class="kaart"/>
    <path d="M42 117 L98 117 L98 170 A28 28 0 0 1 42 170Z" class="zr"/>
    <line x1="100" y1="66" x2="118" y2="66" class="lgrijs"/><line x1="100" y1="114" x2="118" y2="114" class="lgrijs"/><line x1="100" y1="160" x2="118" y2="160" class="lgrijs"/>
    ${quiz ? nr(128, 66, 1) + nr(128, 114, 2) + nr(128, 160, 3) : `
    <text x="122" y="62" class="k b">bloedplasma</text><text x="122" y="76" class="k m">ongeveer 55%</text>
    <text x="122" y="110" class="k b">witte bloedcellen en</text><text x="122" y="124" class="k b">bloedplaatjes</text><text x="122" y="138" class="k m">minder dan 1%</text>
    <text x="122" y="164" class="k b">rode bloedcellen</text><text x="122" y="178" class="k m">ongeveer 45%</text>`}
    <ellipse cx="282" cy="34" rx="24" ry="18" class="zr"/><ellipse cx="282" cy="34" rx="10" ry="7" class="zr" style="filter:brightness(.82)"/>
    <circle cx="282" cy="100" r="23" class="wit"/><path d="M270 94 C272 84 290 84 294 96 C296 108 282 104 280 112 C272 112 268 102 270 94Z" class="za" opacity=".75"/>
    <path d="M264 158 l8 -5 l6 6 l-7 6Z M284 154 l9 2 l-2 9 l-8 -3Z M300 164 l6 -6 l5 7 l-6 5Z" class="plasma" stroke="var(--muted)" stroke-width="1"/>
    ${quiz ? nr(244, 34, 4) + nr(244, 100, 5) + nr(244, 160, 6) : `
    <text x="282" y="68" text-anchor="middle" class="k">rode bloedcel</text>
    <text x="282" y="138" text-anchor="middle" class="k">witte bloedcel</text>
    <text x="282" y="186" text-anchor="middle" class="k">bloedplaatjes</text>`}
    <text x="70" y="208" text-anchor="middle" class="k m">gecentrifugeerd bloed</text>`));

  // ---------- hart ----------
  // opties: nummers (true = alle delen genummerd), tekst (namen in de holtes), stroom (pijlen), hot (tikvlakken)
  BIO.HARTDELEN = [
    ["bha", "bovenste holle ader"], ["oha", "onderste holle ader"], ["rb", "rechterboezem"], ["rk", "rechterkamer"],
    ["lsa", "longslagader"], ["la", "longaders"], ["lb", "linkerboezem"], ["lk", "linkerkamer"],
    ["aorta", "aorta"], ["hk", "hartkleppen"], ["hmk", "halvemaanvormige kleppen"], ["wand", "harttussenwand"]
  ];
  BIO.hart = function (o) {
    o = o || {};
    const NR = { bha: [96, 40], oha: [70, 300], rb: [98, 150], rk: [140, 246], lsa: [40, 84], la: [318, 156], lb: [254, 152], lk: [226, 250], aorta: [258, 40], hk: [243, 212], hmk: [154, 168], wand: [181, 268] };
    let s = "";
    // hartspier
    s += `<path d="M56 152 C52 118 80 108 110 114 L136 122 L222 122 C248 110 298 116 296 154 C298 204 266 264 208 314 C192 322 176 314 160 298 C120 262 92 230 86 198 C68 192 58 172 56 152Z" class="spier"/>`;
    // aorta (achter de longslagader)
    s += buis("M204 204 L204 76 C204 34 316 34 316 76 L316 106", "lzr", 26);
    s += buis("M232 34 L232 10", "lzr", 12) + buis("M258 30 L258 10", "lzr", 12) + buis("M284 34 L284 10", "lzr", 12);
    // longslagader met twee takken
    s += buis("M154 204 L154 112 C154 92 170 84 190 84 L288 84", "lza", 26);
    s += buis("M154 118 C154 96 140 84 118 84 L20 84", "lza", 24);
    s += `<path d="M154 204 L154 120" class="lza" stroke-width="19"/>`;
    // holle aders en longaders
    s += buis("M96 8 L96 132", "lza", 24) + buis("M70 326 L70 172", "lza", 24);
    s += buis("M326 144 L270 144", "lzr", 16) + buis("M326 167 L270 167", "lzr", 16);
    // holtes
    s += `<g class="h-rb zacht-anim"><ellipse cx="98" cy="152" rx="32" ry="29" class="za"/></g>`;
    s += `<g class="h-lb zacht-anim"><ellipse cx="254" cy="154" rx="31" ry="25" class="zr"/></g>`;
    s += `<rect x="103" y="174" width="24" height="30" class="za"/><rect x="230" y="172" width="28" height="32" class="zr"/>`;
    s += `<g class="h-rk zacht-anim"><path d="M100 200 L168 200 L172 242 C172 268 176 284 182 298 C150 286 110 242 100 200Z" class="za"/></g>`;
    s += `<g class="h-lk zacht-anim"><path d="M190 200 L264 200 C264 234 238 278 204 302 C194 282 190 252 190 200Z" class="zr"/></g>`;
    s += `<path d="M144 204 L144 190 L164 190 L164 204Z" class="za"/><path d="M194 204 L194 190 L214 190 L214 204Z" class="zr"/>`;
    // kleppen: open en dicht als aparte groepen
    const klep = "stroke=\"var(--card)\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\"";
    s += `<g class="kl-av-open"><path d="M103 188 L108 212 M127 188 L122 212 M230 188 L236 212 M258 188 L252 212" ${klep}/><path d="M108 212 L118 252 M122 212 L118 252 M236 212 L226 256 M252 212 L226 256" stroke="var(--card)" stroke-width="1" opacity=".8"/></g>`;
    s += `<g class="kl-av-dicht" style="display:none"><path d="M103 190 Q109 182 115 187 Q121 182 127 190 M230 190 Q237 181 244 187 Q251 181 258 190" ${klep}/><path d="M115 187 L118 252 M244 187 L226 256" stroke="var(--card)" stroke-width="1" opacity=".8"/></g>`;
    s += `<g class="kl-hm-dicht"><path d="M143 184 Q148 198 154 187 Q160 198 165 184 M193 184 Q198 198 204 187 Q210 198 215 184" ${klep}/></g>`;
    s += `<g class="kl-hm-open" style="display:none"><path d="M144 190 L147 174 M164 190 L161 174 M194 190 L197 174 M214 190 L211 174" ${klep}/></g>`;
    // stroompijlen per fase (0 = hartpauze, 1 = boezems trekken samen, 2 = kamers trekken samen)
    const instroom = wpijl(96, 30, 96, 60) + wpijl(70, 300, 70, 262) + wpijl(322, 144, 300, 144) + wpijl(322, 167, 300, 167);
    s += `<g class="fl fl-0" ${o.fase === 0 || o.stroom ? "" : 'style="display:none"'}>${instroom}${o.stroom ? wpijl(154, 150, 154, 116) + wpijl(204, 110, 204, 78) + wpijl(40, 84, 24, 84) + wpijl(264, 84, 284, 84) + wpijl(316, 78, 316, 102) : wpijl(115, 176, 115, 214) + wpijl(244, 176, 244, 214)}</g>`;
    s += `<g class="fl fl-1" style="display:none">${wpijl(115, 170, 115, 222)}${wpijl(244, 170, 244, 222)}</g>`;
    s += `<g class="fl fl-2" style="display:none">${instroom}${wpijl(154, 176, 154, 120)}${wpijl(204, 176, 204, 96)}${wpijl(40, 84, 24, 84)}${wpijl(264, 84, 284, 84)}${wpijl(316, 78, 316, 102)}</g>`;
    // namen of nummers
    if (o.tekst) {
      const t = (x, y, a, b) => `<text x="${x}" y="${y}" text-anchor="middle" class="op k">${a}</text><text x="${x}" y="${y + 12}" text-anchor="middle" class="op k">${b}</text>`;
      s += t(96, 150, "rechter-", "boezem") + t(256, 152, "linker-", "boezem") + t(140, 244, "rechter-", "kamer") + t(226, 246, "linker-", "kamer");
    }
    if (o.nummers) BIO.HARTDELEN.forEach((d, i) => { if (o.nummers === true || o.nummers.includes(d[0])) s += nr(NR[d[0]][0], NR[d[0]][1], i + 1); });
    if (o.legenda) {
      const lijst = BIO.HARTDELEN.map((d, i) => [i + 1, d[1], d[0]]).filter((d) => o.nummers === true || o.nummers.includes(d[2]));
      lijst.forEach((d, i) => { const kol = i % 2, rij = Math.floor(i / 2); s += `<text x="${kol ? 178 : 8}" y="${348 + rij * 16}" class="k"><tspan font-weight="700">${d[0]}</tspan> ${esc(d[1])}</text>`; });
    }
    if (o.hot) {
      const h = (k, vorm) => vorm.replace("/>", ` class="hot" data-k="${k}"/>`);
      s += h("bha", `<rect x="76" y="4" width="40" height="76"/>`) + h("oha", `<rect x="50" y="232" width="40" height="96"/>`) + h("lsa", `<rect x="8" y="64" width="64" height="40"/>`) + h("lsa", `<rect x="222" y="64" width="72" height="40"/>`);
      s += h("aorta", `<rect x="210" y="6" width="124" height="52"/>`) + h("aorta", `<rect x="296" y="56" width="40" height="56"/>`) + h("la", `<rect x="282" y="132" width="52" height="50"/>`);
      s += h("rb", `<ellipse cx="96" cy="146" rx="36" ry="28"/>`) + h("lb", `<ellipse cx="256" cy="148" rx="34" ry="24"/>`);
      s += h("rk", `<path d="M96 214 L168 214 L172 242 C172 268 176 284 184 304 C150 290 104 250 96 214Z"/>`) + h("lk", `<path d="M190 214 L268 214 C264 240 238 282 204 306 C194 282 190 252 190 214Z"/>`);
      s += h("hk", `<rect x="94" y="172" width="42" height="42"/>`) + h("hk", `<rect x="224" y="172" width="42" height="42"/>`);
      s += h("hmk", `<rect x="136" y="166" width="38" height="44"/>`) + h("hmk", `<rect x="186" y="166" width="38" height="44"/>`);
      s += h("wand", `<rect x="168" y="240" width="26" height="60"/>`);
    }
    const hoogte = o.legenda ? 348 + Math.ceil((o.nummers === true ? 12 : o.nummers.length) / 2) * 16 : 332;
    return svg(340, hoogte, "Doorsnede van het hart van voren gezien", s, o.extra || "");
  };
  // zet een getekend hart in een fase van de hartcyclus: 0 hartpauze, 1 boezems trekken samen, 2 kamers trekken samen
  BIO.hartFase = function (svgEl, fase) {
    const zet = (sel, aan) => svgEl.querySelectorAll(sel).forEach((g) => { g.style.display = aan ? "" : "none"; });
    zet(".kl-av-open", fase !== 2); zet(".kl-av-dicht", fase === 2);
    zet(".kl-hm-open", fase === 2); zet(".kl-hm-dicht", fase !== 2);
    [0, 1, 2].forEach((f) => zet(".fl-" + f, f === fase));
    const schaal = (sel, f, cx, cy) => svgEl.querySelectorAll(sel).forEach((g) => { g.setAttribute("transform", f === 1 ? "" : `translate(${cx} ${cy}) scale(${f}) translate(${-cx} ${-cy})`); });
    schaal(".h-rb", fase === 1 ? 0.8 : 1, 98, 160); schaal(".h-lb", fase === 1 ? 0.8 : 1, 254, 160);
    schaal(".h-rk", fase === 2 ? 0.82 : 1, 140, 200); schaal(".h-lk", fase === 2 ? 0.82 : 1, 222, 200);
  };
  TW.fig("hart", (quiz) => BIO.hart(quiz ? { nummers: true } : { nummers: ["bha", "oha", "lsa", "la", "aorta", "hk", "hmk", "wand"], tekst: true, legenda: true, stroom: true }));

  // ---------- hartcyclus in de tijd ----------
  TW.fig("hartcyclus", (quiz) => {
    const X = (t) => 96 + t * 290;
    return svg(340, 150, "Tijdbalk van één hartslag van 0,8 seconde", `
      ${[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((t) => `<line x1="${X(t)}" y1="24" x2="${X(t)}" y2="112" class="raster"/><text x="${X(t)}" y="126" text-anchor="middle" class="k">${TW.nl(t, 1)}</text>`).join("")}
      <text x="328" y="142" text-anchor="end" class="k b">tijd (s)</text>
      <text x="6" y="50" class="k b">boezems</text><text x="6" y="92" class="k b">kamers</text>
      <rect x="${X(0)}" y="34" width="${X(0.8) - X(0)}" height="24" rx="5" class="grijs"/><rect x="${X(0)}" y="34" width="${X(0.1) - X(0)}" height="24" rx="5" class="acc"/>
      <rect x="${X(0)}" y="76" width="${X(0.8) - X(0)}" height="24" rx="5" class="grijs"/><rect x="${X(0.1)}" y="76" width="${X(0.4) - X(0.1)}" height="24" rx="5" class="or"/>
      ${quiz ? nr(X(0.05), 22, 1) + nr(X(0.25), 66, 2) + nr(X(0.6), 66, 3) : `
      <text x="${X(0.12)}" y="22" class="k pa b">boezems trekken samen</text>
      <text x="${X(0.25)}" y="70" text-anchor="middle" class="k pb b">kamers trekken samen</text>
      <text x="${X(0.6)}" y="70" text-anchor="middle" class="k m">hartpauze</text>`}
      <text x="6" y="142" class="k m">gekleurd = samentrekken</text>`);
  });

  // ---------- dubbele bloedsomloop ----------
  const KN = {
    hersenen: { r: [120, 6, 100, 44], t: ["hersenen"], soort: "orgaan" },
    longen: { r: [120, 84, 100, 44], t: ["longen"], soort: "orgaan" },
    rb: { r: [44, 190, 84, 42], t: ["rechter-", "boezem"], soort: "za" },
    rk: { r: [44, 238, 84, 42], t: ["rechter-", "kamer"], soort: "za" },
    lb: { r: [196, 190, 84, 42], t: ["linker-", "boezem"], soort: "zr" },
    lk: { r: [196, 238, 84, 42], t: ["linker-", "kamer"], soort: "zr" },
    lever: { r: [56, 340, 76, 44], t: ["lever"], soort: "orgaan" },
    darm: { r: [212, 340, 76, 44], t: ["darm"], soort: "orgaan" },
    nieren: { r: [128, 410, 84, 44], t: ["nieren"], soort: "orgaan" },
    benen: { r: [128, 478, 84, 44], t: ["benen"], soort: "orgaan" },
    bha: { r: [2, 84, 84, 44], t: ["bovenste", "holle ader"], soort: "vat", nr: 1 },
    lsa: { r: [122, 136, 80, 40], t: ["longslagader"], soort: "vat", nr: 2 },
    la: { r: [216, 136, 68, 40], t: ["longader"], soort: "vat", nr: 3 },
    aorta: { r: [290, 194, 48, 42], t: ["aorta"], soort: "vat", nr: 4 },
    oha: { r: [2, 292, 84, 44], t: ["onderste", "holle ader"], soort: "vat", nr: 5 },
    poort: { r: [140, 340, 64, 44], t: ["poortader"], soort: "vat", nr: 6 }
  };
  const mid = (k) => [KN[k].r[0] + KN[k].r[2] / 2, KN[k].r[1] + KN[k].r[3] / 2];
  // gerichte verbindingen met de weg die het bloed aflegt (voor de animatie) en de kleur
  const VERB = [
    ["hersenen", "bha", "za", [[120, 28], [16, 28], [16, 106]]], ["bha", "rb", "za", [[16, 106], [16, 200], [44, 200]]],
    ["rb", "rk", "za", [[86, 232], [86, 238]]], ["rk", "lsa", "za", [[128, 258], [162, 258], [162, 156]]], ["lsa", "longen", "za", [[162, 156], [162, 128]]],
    ["longen", "la", "zr", [[220, 106], [250, 106], [250, 156]]], ["la", "lb", "zr", [[250, 156], [250, 190]]], ["lb", "lk", "zr", [[238, 232], [238, 238]]],
    ["lk", "aorta", "zr", [[280, 258], [314, 258], [314, 215]]],
    ["aorta", "hersenen", "zr", [[314, 215], [314, 28], [220, 28]]], ["aorta", "lever", "zr", [[314, 215], [314, 326], [110, 326], [110, 340]]],
    ["aorta", "darm", "zr", [[314, 215], [314, 362], [288, 362]]], ["aorta", "nieren", "zr", [[314, 215], [314, 432], [212, 432]]], ["aorta", "benen", "zr", [[314, 215], [314, 500], [212, 500]]],
    ["darm", "poort", "za", [[212, 362], [172, 362]]], ["poort", "lever", "za", [[172, 362], [132, 362]]],
    ["lever", "oha", "za", [[56, 362], [16, 362], [16, 314]]], ["nieren", "oha", "za", [[128, 432], [16, 432], [16, 314]]], ["benen", "oha", "za", [[128, 500], [16, 500], [16, 314]]],
    ["oha", "rb", "za", [[16, 314], [16, 222], [44, 222]]]
  ];
  BIO.SOMLOOP = { KN, VERB, mid };
  BIO.somloopNaam = (k) => (KN[k].t[0].endsWith("-") ? KN[k].t[0].slice(0, -1) + KN[k].t[1] : KN[k].t.join(" "));
  // kortste route van orgaan a naar orgaan b (lijst met knopen)
  BIO.route = function (a, b) {
    const rij = [[a]], gezien = new Set([a]);
    while (rij.length) {
      const pad = rij.shift(), laatste = pad[pad.length - 1];
      if (laatste === b && pad.length > 1) return pad;
      VERB.filter((v) => v[0] === laatste).forEach((v) => { if (!gezien.has(v[1]) || v[1] === b) { gezien.add(v[1]); rij.push(pad.concat(v[1])); } });
    }
    return null;
  };
  BIO.somloop = function (o) {
    o = o || {};
    let s = `<rect x="34" y="182" width="256" height="108" rx="22" class="spier" opacity=".6"/>`;
    VERB.forEach((v) => { s += `<path d="M${v[3].map((p) => p.join(" ")).join("L")}" class="l${v[2]}" stroke-width="7" stroke-linejoin="round" data-v="${v[0]}>${v[1]}"/>`; });
    const pijlen = [[16, 150, 16, 170], [162, 200, 162, 180], [250, 164, 250, 182], [314, 120, 314, 100], [314, 290, 314, 310], [16, 270, 16, 250], [188, 362, 176, 362]];
    pijlen.forEach((p) => { s += pijl(p[0], p[1], p[2], p[3], ""); });
    s += `<text x="212" y="320" text-anchor="middle" class="k m">${o.quiz ? "" : "leverslagader"}</text>`;
    Object.keys(KN).forEach((k) => {
      const n = KN[k], [x, y, w, h] = n.r, kl = n.soort === "za" || n.soort === "zr" ? n.soort : "";
      const tekst = o.quiz && n.soort === "vat" ? [String(n.nr)] : n.t;
      s += `<g class="knoop ${kl ? "hd" : ""} ${o.tik ? "tik" : ""}" data-k="${k}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${n.soort === "vat" ? 20 : 10}" ${kl ? `style="fill:var(--o2${kl === "zr" ? "rijk" : "arm"})"` : ""}/>` +
        tekst.map((t, i) => `<text x="${x + w / 2}" y="${y + h / 2 + 4 + (i - (tekst.length - 1) / 2) * 13}" text-anchor="middle" class="${kl ? "op k" : n.soort === "orgaan" ? "b" : "k b"}">${t}</text>`).join("") +
        `<text x="${x + w - 4}" y="${y + 12}" text-anchor="end" class="k pa b volg"></text></g>`;
    });
    s += `<text x="8" y="528" class="k tza b">blauw: zuurstofarm</text><text x="332" y="528" text-anchor="end" class="k tzr b">rood: zuurstofrijk</text>`;
    return svg(340, 536, "Schema van de dubbele bloedsomloop van de mens", s, o.extra || "");
  };
  TW.fig("bloedsomloop", (quiz) => BIO.somloop({ quiz }));

  // ---------- open en gesloten, enkel en dubbel ----------
  TW.fig("somloop-typen", (quiz) => {
    const hart = (x, y, n) => `<rect x="${x - 16}" y="${y - 14}" width="32" height="28" rx="8" class="spier"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="k b">${n || "hart"}</text>`;
    const bol = (x, y, t) => `<rect x="${x - 26}" y="${y - 12}" width="52" height="24" rx="12" class="wit"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="k">${t}</text>`;
    return svg(340, 226, "Enkele bloedsomloop van een vis en dubbele bloedsomloop van een zoogdier", `
      <text x="84" y="16" text-anchor="middle" class="b">${quiz ? "dier P" : "vis: enkel"}</text><text x="254" y="16" text-anchor="middle" class="b">${quiz ? "dier Q" : "zoogdier: dubbel"}</text>
      <path d="M84 196 L30 196 L30 52 L84 52" class="lza" stroke-width="6"/><path d="M84 52 L138 52 L138 196 L84 196" class="lzr" stroke-width="6"/>
      <path d="M30 150 L30 196 L84 196" class="lza" stroke-width="6"/><path d="M84 196 L138 196 L138 150" class="lza" stroke-width="6"/>
      <path d="M138 52 L138 150" class="lzr" stroke-width="6"/>
      ${bol(84, 52, "kieuwen")}${bol(138, 124, "organen")}${hart(60, 196)}
      ${pijl(30, 130, 30, 100, "")}${pijl(138, 76, 138, 96, "")}${pijl(118, 196, 96, 196, "")}
      <text x="84" y="220" text-anchor="middle" class="k m">${quiz ? "" : "per rondje 1 × door het hart"}</text>
      <path d="M240 118 L200 118 L200 52 L254 52" class="lza" stroke-width="6"/><path d="M254 52 L308 52 L308 118 L268 118" class="lzr" stroke-width="6"/>
      <path d="M268 118 L308 118 L308 196 L254 196" class="lzr" stroke-width="6"/><path d="M254 196 L200 196 L200 118 L240 118" class="lza" stroke-width="6"/>
      ${bol(254, 52, "longen")}${bol(254, 196, "organen")}
      <rect x="226" y="103" width="56" height="30" rx="9" class="spier"/><line x1="254" y1="103" x2="254" y2="133" class="wand" stroke-width="2"/><text x="240" y="122" text-anchor="middle" class="k b">R</text><text x="268" y="122" text-anchor="middle" class="k b">L</text>
      ${pijl(200, 96, 200, 76, "")}${pijl(308, 76, 308, 96, "")}${pijl(308, 150, 308, 172, "")}${pijl(200, 172, 200, 150, "")}
      <text x="254" y="220" text-anchor="middle" class="k m">${quiz ? "" : "per rondje 2 × door het hart"}</text>`);
  });

  // ---------- bloedvaten ----------
  TW.fig("vaten", (quiz) => {
    const cel = (cx, cy, r) => [0, 1, 2].map((i) => { const a = i * 120 * Math.PI / 180; return `<line x1="${(cx + (r - 9) * Math.cos(a)).toFixed(1)}" y1="${(cy + (r - 9) * Math.sin(a)).toFixed(1)}" x2="${(cx + r * Math.cos(a)).toFixed(1)}" y2="${(cy + r * Math.sin(a)).toFixed(1)}" class="wand" stroke-width="1.5"/><ellipse cx="${(cx + (r - 4.5) * Math.cos(a + 1)).toFixed(1)}" cy="${(cy + (r - 4.5) * Math.sin(a + 1)).toFixed(1)}" rx="3" ry="2" class="nrb" opacity=".6"/>`; }).join("");
    return svg(340, 200, "Doorsnede van een slagader, een ader en een haarvat", `
      <circle cx="62" cy="74" r="48" class="spier"/><circle cx="62" cy="74" r="36" class="lspier" stroke-width="2" style="stroke:var(--spier-d)" stroke-dasharray="3 3"/><circle cx="62" cy="74" r="24" class="zr"/>
      <circle cx="176" cy="74" r="48" class="spier"/><circle cx="176" cy="74" r="38" class="za"/>
      <circle cx="286" cy="74" r="34" class="spier"/><circle cx="286" cy="74" r="25" class="zr" opacity=".85"/>${cel(286, 74, 34)}
      <text x="62" y="142" text-anchor="middle" class="b">${quiz ? "P" : "slagader"}</text><text x="176" y="142" text-anchor="middle" class="b">${quiz ? "Q" : "ader"}</text><text x="286" y="142" text-anchor="middle" class="b">${quiz ? "R" : "haarvat"}</text>
      ${quiz ? `<text x="286" y="160" text-anchor="middle" class="k m">(sterk vergroot)</text>` : `
      <text x="62" y="158" text-anchor="middle" class="k">dikke, stevige en</text><text x="62" y="172" text-anchor="middle" class="k">elastische wand</text><text x="62" y="186" text-anchor="middle" class="k m">hoge druk</text>
      <text x="176" y="158" text-anchor="middle" class="k">dunne, slappe wand,</text><text x="176" y="172" text-anchor="middle" class="k">wijde holte, kleppen</text><text x="176" y="186" text-anchor="middle" class="k m">lage druk</text>
      <text x="286" y="158" text-anchor="middle" class="k">wand van één</text><text x="286" y="172" text-anchor="middle" class="k">laag cellen</text><text x="286" y="186" text-anchor="middle" class="k m">(sterk vergroot)</text>`}`);
  });

  // ---------- aderklep ----------
  TW.fig("aderklep", (quiz) => svg(340, 170, "Kleppen in een ader: open als het bloed naar het hart stroomt, dicht als het terug wil stromen", `
    <rect x="50" y="14" width="60" height="140" class="za"/><line x1="50" y1="14" x2="50" y2="154" class="wand" stroke-width="5"/><line x1="110" y1="14" x2="110" y2="154" class="wand" stroke-width="5"/>
    <path d="M52 100 L72 72 M108 100 L88 72" stroke="var(--card)" stroke-width="3.5" stroke-linecap="round"/>
    ${pijl(80, 134, 80, 44, "")}
    <rect x="230" y="14" width="60" height="140" class="za"/><line x1="230" y1="14" x2="230" y2="154" class="wand" stroke-width="5"/><line x1="290" y1="14" x2="290" y2="154" class="wand" stroke-width="5"/>
    <path d="M232 72 Q244 104 260 84 Q276 104 288 72" stroke="var(--card)" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    ${pijl(260, 30, 260, 66, "")}
    <text x="80" y="168" text-anchor="middle" class="k b">${quiz ? "A" : "naar het hart: klep open"}</text>
    <text x="260" y="168" text-anchor="middle" class="k b">${quiz ? "B" : "terugzakken: klep dicht"}</text>
    <text x="170" y="60" text-anchor="middle" class="k m">${quiz ? "" : "spieren"}</text><text x="170" y="74" text-anchor="middle" class="k m">${quiz ? "" : "drukken de"}</text><text x="170" y="88" text-anchor="middle" class="k m">${quiz ? "" : "ader samen"}</text>`));

  // ---------- drukverloop ----------
  const VATEN = ["aorta", "slagaders", "slagadertjes", "haarvaten", "adertjes", "aders", "holle aders"];
  const lin = (pts, x) => { for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) { const a = pts[i - 1], b = pts[i]; return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]); } return pts[pts.length - 1][1]; };
  const DRUK = [[0, 100], [1, 96], [2, 88], [3, 34], [4, 16], [5, 10], [6, 5], [7, 2]];
  const SNEL = [[0, 100], [1, 88], [2, 60], [2.8, 6], [3, 2], [4, 2], [4.3, 8], [5, 30], [6, 45], [7, 55]];
  const OPP = [[0, 2], [1, 4], [2, 14], [3, 70], [3.5, 100], [4, 80], [5, 30], [6, 8], [7, 3]];
  BIO.DRUK = {
    VATEN,
    druk: (x) => lin(DRUK, x),
    puls: (x) => Math.max(0, 20 * (1 - Math.max(0, x - 1) / 1.9)),
    snelheid: (x) => lin(SNEL, x),
    doorsnede: (x) => lin(OPP, x),
    vat: (x) => VATEN[Math.max(0, Math.min(6, Math.floor(x)))]
  };
  BIO.drukPlot = function (o) {
    o = o || {};
    const X = (x) => 34 + x * 41, Y = (v) => 176 - v * 1.14, D = BIO.DRUK;
    let s = "";
    VATEN.forEach((v, i) => {
      if (i === 3) s += `<rect x="${X(i)}" y="34" width="41" height="142" class="vlak"/>`;
      s += `<line x1="${X(i)}" y1="34" x2="${X(i)}" y2="176" class="raster"/>`;
      s += `<text transform="translate(${X(i) + 12} 190) rotate(38)" class="k">${o.quiz && i >= 2 && i <= 4 ? "?" : v}</text>`;
    });
    const pad = (f, n) => { const p = []; for (let i = 0; i <= n; i++) { const x = (7 * i) / n; p.push(`${X(x).toFixed(1)} ${Y(f(x)).toFixed(1)}`); } return "M" + p.join("L"); };
    s += `<line x1="34" y1="34" x2="34" y2="176" class="s"/><line x1="34" y1="176" x2="322" y2="176" class="s"/>`;
    if (!o.alleenDruk) s += `<path d="${pad(D.doorsnede, 70)}" class="curve5" stroke-dasharray="2 4"/><path d="${pad(D.snelheid, 70)}" class="curve4" stroke-dasharray="7 4"/>`;
    s += `<path d="${pad((x) => D.druk(x) + D.puls(x) * Math.sin(x * 26), 280)}" class="curve2"/>`;
    s += `<text x="30" y="42" text-anchor="end" class="k">hoog</text><text x="30" y="178" text-anchor="end" class="k">laag</text>`;
    s += `<line x1="6" y1="12" x2="24" y2="12" class="curve2"/><text x="28" y="16" class="k pr b">bloeddruk</text>` + (o.alleenDruk ? "" : `<line x1="92" y1="12" x2="110" y2="12" class="curve4" stroke-dasharray="7 4"/><text x="114" y="16" class="k pb b">stroomsnelheid</text><line x1="204" y1="12" x2="222" y2="12" class="curve5" stroke-dasharray="2 4"/><text x="226" y="16" class="k pg b">totale doorsnede</text>`);
    if (o.marker != null) s += `<line x1="${X(o.marker)}" y1="34" x2="${X(o.marker)}" y2="176" class="lacc" stroke-width="2" id="mlijn"/><circle cx="${X(o.marker)}" cy="${Y(D.druk(o.marker))}" r="14" class="greep" id="mgreep"/>`;
    return svg(340, 240, "Bloeddruk, stroomsnelheid en totale doorsnede van de bloedvaten van de aorta tot de holle aders", s, o.extra || "");
  };
  BIO.drukX = { naarPx: (x) => 34 + x * 41, vanPx: (px) => (px - 34) / 41, Y: (v) => 176 - v * 1.14 };
  TW.fig("drukverloop", (quiz) => BIO.drukPlot({ quiz }));

  // ---------- haarvat: filtratie en terugresorptie ----------
  // o: bd = bloeddruk aan het begin (normaal 35), eiwit = zuigkracht van plasma-eiwitten (normaal 25), lymfeDicht, quiz
  BIO.haarvatCalc = function (bd, eiwit, lymfeDicht) {
    const eind = bd - 20; // druk daalt langs het haarvat
    // oppervlak boven en onder de lijn 'eiwit' (lineair verloop van bd naar eind)
    let uit = 0, terug = 0;
    for (let i = 0; i < 100; i++) { const p = bd + (eind - bd) * (i + 0.5) / 100, d = p - eiwit; if (d > 0) uit += d / 100; else terug -= d / 100; }
    const over = Math.max(0, uit - terug), lymfe = lymfeDicht ? 0 : Math.min(over, 2.2);
    return { eind, uit, terug, over, lymfe, oedeem: over - lymfe > 0.3 };
  };
  BIO.haarvat = function (o) {
    o = Object.assign({ bd: 35, eiwit: 25 }, o || {});
    const c = BIO.haarvatCalc(o.bd, o.eiwit, o.lymfeDicht);
    const gx0 = 50, gx1 = 290, GY = (v) => 250 - (v - 5) * 2.2;
    const kruis = o.bd === c.eind ? 0.5 : (o.bd - o.eiwit) / (o.bd - c.eind), kx = gx0 + Math.max(0, Math.min(1, kruis)) * (gx1 - gx0);
    let s = `<defs><linearGradient id="hvg" x1="0" x2="1"><stop offset="0" style="stop-color:var(--o2rijk)"/><stop offset="1" style="stop-color:var(--o2arm)"/></linearGradient></defs>`;
    // weefsel
    s += `<rect x="6" y="6" width="328" height="150" rx="14" class="plasma" opacity="${c.oedeem ? 0.75 : 0.35}"/>`;
    [[40, 28], [100, 24], [160, 30], [220, 24], [282, 28]].forEach((p) => { s += `<rect x="${p[0] - 22}" y="${p[1] - 12}" width="44" height="26" rx="10" class="wit"/><circle cx="${p[0]}" cy="${p[1] + 1}" r="5" class="grijs"/>`; });
    // haarvat
    s += `<rect x="20" y="64" width="300" height="34" rx="6" fill="url(#hvg)"/><rect x="20" y="64" width="300" height="34" rx="6" class="wand" stroke-width="2" stroke-dasharray="26 4"/>`;
    [66, 116, 228, 282].forEach((x) => { s += `<ellipse cx="${x}" cy="81" rx="10" ry="6" style="fill:var(--card)" opacity=".85"/>`; });
    // pijlen: filtratie links, resorptie rechts (dikte naar grootte)
    const fp = (x, uitw, kracht) => { const k = Math.max(0.5, Math.min(1.6, kracht)); return uitw ? pijl(x, 98, x, 98 + 16 * k, "") + pijl(x, 64, x, 64 - 14 * k, "") : pijl(x, 98 + 16 * k, x, 100, "") + pijl(x, 64 - 14 * k, x, 62, ""); };
    const n = 6;
    for (let i = 0; i < n; i++) { const f = (i + 0.5) / n, x = 92 + f * 190, d = o.bd + (c.eind - o.bd) * f - o.eiwit; if (Math.abs(d) > 1.5) s += fp(x, d > 0, Math.abs(d) / 7); }
    // lymfevat
    s += `<path d="M200 132 C230 124 270 128 334 140 L334 154 C270 142 230 140 204 146 C196 146 194 136 200 132Z" class="lymfe" opacity="${o.lymfeDicht ? 0.3 : 0.9}"/>`;
    if (o.lymfeDicht) s += `<path d="M286 128 l16 20 m0 -20 l-16 20" class="curve2"/>`;
    else if (c.lymfe > 0.05) s += pijl(214, 118, 222, 132, "") + pijl(280, 140, 316, 146, "");
    if (!o.quiz) s += `<text x="20" y="58" class="k b tzr">slagadertje</text><text x="320" y="58" text-anchor="end" class="k b tza">adertje</text><text x="170" y="85" text-anchor="middle" class="op k">haarvat</text><text x="330" y="126" text-anchor="end" class="k b" style="fill:var(--lymfe)">lymfevat</text><text x="14" y="148" class="k m">weefselvloeistof tussen de cellen</text>`;
    else s += nr(40, 116, 1) + nr(300, 116, 2) + nr(250, 150, 3);
    // grafiek eronder
    s += `<line x1="${gx0}" y1="${GY(50)}" x2="${gx0}" y2="${GY(5)}" class="s"/><line x1="${gx0}" y1="${GY(5)}" x2="${gx1}" y2="${GY(5)}" class="s"/>`;
    if (kruis > 0) s += `<path d="M${gx0} ${GY(o.bd)} L${kx} ${GY(Math.max(o.eiwit, c.eind))} L${kx} ${GY(o.eiwit)} L${gx0} ${GY(o.eiwit)}Z" class="vlak2"/>`;
    if (kruis < 1) s += `<path d="M${kx} ${GY(Math.min(o.eiwit, o.bd))} L${gx1} ${GY(c.eind)} L${gx1} ${GY(o.eiwit)} L${kx} ${GY(o.eiwit)}Z" class="vlak"/>`;
    s += `<line x1="${gx0}" y1="${GY(o.bd)}" x2="${gx1}" y2="${GY(c.eind)}" class="curve2"/><line x1="${gx0}" y1="${GY(o.eiwit)}" x2="${gx1}" y2="${GY(o.eiwit)}" class="curve"/>`;
    s += `<text x="${gx0 - 4}" y="${GY(o.bd) + 4}" text-anchor="end" class="k pr b">${o.quiz ? "P" : "bloed-"}</text><text x="${gx0 - 4}" y="${GY(o.bd) + 16}" text-anchor="end" class="k pr b">${o.quiz ? "" : "druk"}</text>`;
    s += `<text x="${gx1 + 4}" y="${GY(o.eiwit) + 4}" class="k pa b">${o.quiz ? "Q" : "osmo-"}</text><text x="${gx1 + 4}" y="${GY(o.eiwit) + 16}" class="k pa b">${o.quiz ? "" : "tische"}</text><text x="${gx1 + 4}" y="${GY(o.eiwit) + 28}" class="k pa b">${o.quiz ? "" : "zuiging"}</text>`;
    if (!o.quiz) {
      if (kruis > 0.12) s += `<text x="${(gx0 + Math.min(kx, gx0 + 90)) / 2 + 6}" y="${GY(o.eiwit) - 6 > GY(o.bd) + 26 ? GY(o.eiwit) - 5 : GY(o.bd) - 6}" text-anchor="middle" class="k pr">vocht eruit</text>`;
      if (kruis < 0.88) s += `<text x="${(Math.max(kx, gx1 - 100) + gx1) / 2}" y="${GY(c.eind) + 14}" text-anchor="middle" class="k pa">vocht terug</text>`;
    }
    s += `<text x="170" y="264" text-anchor="middle" class="k m">begin van het haarvat → einde</text>`;
    return svg(340, 268, "Uitwisseling in een haarvat: aan het begin wordt vocht uit het bloed geperst, aan het einde stroomt vocht terug", s, o.extra || "");
  };
  TW.fig("haarvat", (quiz) => BIO.haarvat({ quiz }));

  // ---------- ecg ----------
  TW.fig("ecg", (quiz) => svg(340, 164, "Eén hartslag in een ecg met P-top, QRS-complex en T-top", `
    <path d="M10 100 L70 100 Q86 72 102 100 L132 100 L140 112 L152 26 L164 124 L172 100 L212 100 Q236 60 260 100 L330 100" class="curve2"/>
    ${quiz ? nr(86, 70, 1) + nr(152, 14, 2) + nr(236, 62, 3) : `
    <text x="86" y="76" text-anchor="middle" class="b">P</text><text x="176" y="34" class="b">QRS</text><text x="236" y="70" text-anchor="middle" class="b">T</text>
    <text x="86" y="124" text-anchor="middle" class="k">boezems</text><text x="86" y="138" text-anchor="middle" class="k">trekken samen</text>
    <text x="158" y="146" text-anchor="middle" class="k">kamers</text><text x="158" y="160" text-anchor="middle" class="k">trekken samen</text>
    <text x="250" y="124" text-anchor="middle" class="k">kamers</text><text x="250" y="138" text-anchor="middle" class="k">ontspannen</text>`}`));

  // ---------- atherosclerose ----------
  TW.fig("atherosclerose", (quiz) => svg(340, 160, "Slagader: gezond, vernauwd door een plaque en afgesloten door een bloedstolsel", `
    ${[62, 170, 278].map((x) => `<circle cx="${x}" cy="66" r="46" class="spier"/><circle cx="${x}" cy="66" r="34" class="zr"/>`).join("")}
    <path d="M148 40 A34 34 0 0 0 148 92 A44 34 0 0 1 148 40Z" class="plasma" stroke="var(--muted)" stroke-width="1"/><path d="M146 44 A34 34 0 0 0 150 92 A58 34 0 0 0 146 44Z" class="plasma"/>
    <path d="M256 40 A34 34 0 0 0 256 92 A44 34 0 0 1 256 40Z" class="plasma" stroke="var(--muted)" stroke-width="1"/><path d="M254 44 A34 34 0 0 0 258 92 A58 34 0 0 0 254 44Z" class="plasma"/>
    <circle cx="288" cy="66" r="24" class="nrb" opacity=".75"/>
    <text x="62" y="130" text-anchor="middle" class="k b">${quiz ? "1" : "gezonde slagader"}</text>
    <text x="170" y="130" text-anchor="middle" class="k b">${quiz ? "2" : "plaque in de wand"}</text><text x="170" y="146" text-anchor="middle" class="k m">${quiz ? "" : "minder ruimte voor bloed"}</text>
    <text x="278" y="130" text-anchor="middle" class="k b">${quiz ? "3" : "bloedstolsel erbij"}</text><text x="278" y="146" text-anchor="middle" class="k m">${quiz ? "" : "vat zit dicht"}</text>`));

  // ---------- zuurstoftransport ----------
  TW.fig("gaswisseling", (quiz) => svg(340, 170, "Rode bloedcellen nemen zuurstof op in de longen en geven die af in de weefsels", `
    <rect x="14" y="20" width="120" height="50" rx="14" class="wit"/><text x="74" y="50" text-anchor="middle" class="b">${quiz ? "P" : "longen"}</text>
    <rect x="206" y="20" width="120" height="50" rx="14" class="wit"/><text x="266" y="50" text-anchor="middle" class="b">${quiz ? "Q" : "weefsels"}</text>
    <path d="M74 70 L74 120 L266 120 L266 70" class="lzr" stroke-width="12"/>
    <path d="M40 70 L40 152 L300 152 L300 70" class="lza" stroke-width="12"/>
    ${pijl(150, 120, 190, 120, "")}${pijl(190, 152, 150, 152, "")}
    <text x="170" y="110" text-anchor="middle" class="k tzr b">${quiz ? "1" : "veel O₂ aan hemoglobine"}</text>
    <text x="170" y="142" text-anchor="middle" class="k tza b">${quiz ? "2" : "weinig O₂, veel CO₂"}</text>
    ${quiz ? "" : `<text x="74" y="14" text-anchor="middle" class="k m">O₂ erin, CO₂ eruit</text><text x="266" y="14" text-anchor="middle" class="k m">O₂ eruit, CO₂ erin</text>`}`));
})();
