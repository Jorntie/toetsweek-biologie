// Widgets van thema 3 Genetica: kruisingslab en stamboom-detective.
// De kruisingsmotor staat in genetica.js (BIO.GEN), de stambomen in figs-genetica.js (BIO.STAMBOMEN).
(function () {
  "use strict";
  const BIO = window.BIO, W = BIO.W, G = BIO.GEN;
  const same = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

  // ================= Kruisingslab =================
  const SOORTEN = [
    ["mono", "Dominant"], ["x", "X-chromosomaal"], ["inter", "Intermediair"], ["bloed", "Bloedgroepen"], ["letaal", "Letaal"], ["twee", "Twee genen"]
  ];
  // alle mogelijke geslachtscellen en genotypen per type (de keuzes in het lab)
  const GAMEET_KEUZE = { mono: ["A", "a"], inter: ["A^{r}", "A^{w}"], bloed: ["I^{A}", "I^{B}", "i"], letaal: ["A", "a"], x: ["X^{A}", "X^{a}", "Y"], di: ["AB", "Ab", "aB", "ab"], gek: ["AB", "Ab", "aB", "ab"] };
  const GENO_KEUZE = {
    mono: ["AA", "Aa", "aa"], letaal: ["AA", "Aa", "aa"], inter: ["A^{r}A^{r}", "A^{r}A^{w}", "A^{w}A^{w}"],
    bloed: ["I^{A}I^{A}", "I^{A}I^{B}", "I^{A}i", "I^{B}I^{B}", "I^{B}i", "ii"],
    x: ["X^{A}X^{A}", "X^{A}X^{a}", "X^{a}X^{a}", "X^{A}Y", "X^{a}Y"],
    di: ["AABB", "AABb", "AAbb", "AaBB", "AaBb", "Aabb", "aaBB", "aaBb", "aabb"],
    gek: ["AB/AB", "AB/Ab", "AB/aB", "AB/ab", "Ab/Ab", "Ab/aB", "Ab/ab", "aB/aB", "aB/ab", "ab/ab"]
  };
  const UITLEG = {
    mono: "Elke ouder geeft één allel door. Een homozygote ouder maakt maar één soort geslachtscel.",
    inter: "Bij intermediair werkt het net als bij gewone kruisingen; alleen heeft de heterozygoot een eigen fenotype.",
    bloed: "Elke ouder geeft één van zijn twee allelen door: I^{A}, I^{B} of i.",
    letaal: "Let op: nakomelingen met AA sterven. Reken kansen uit over de levende nakomelingen.",
    x: "De moeder geeft altijd een X door. De vader geeft een X (dan wordt het een dochter) of een Y (een zoon).",
    di: "De genen liggen op verschillende chromosomen: elk allel van gen A kan samen met elk allel van gen B in een geslachtscel komen.",
    gek: "De genen liggen op hetzelfde chromosoom: de allelen die op één chromosoom liggen, gaan samen naar een geslachtscel."
  };
  const POOL = [0, 25, 50, 75, 100, 100 / 3, 200 / 3, 12.5, 37.5, 6.25, 18.75, 56.25];

  TW.widget("kruisingslab", {
    titel: "Kruisingslab", icoon: "🧩",
    uitleg: "Steeds een nieuwe kruising: bepaal de geslachtscellen, vul het kruisingsschema in en bereken de kans op een nakomeling met een bepaald fenotype.",
    maak(el, api) {
      let soort = "mono", type, ctx, paar, k, stap, kiesM, kiesV, cellen, selCel, fout, gemaakt = 0;
      function nieuw(s) {
        if (s) soort = s;
        type = soort === "twee" ? api.R.kies(["di", "gek"]) : soort;
        ctx = api.R.kies(G.C[type]); paar = api.R.kies(G.PAREN[type]);
        k = G.kruis(type, ctx, paar[0], paar[1]);
        stap = 1; kiesM = []; kiesV = []; cellen = k.cel.map((r) => r.map(() => null)); selCel = null; fout = 0;
        teken();
      }
      const fm = (s) => api.fmt(s);
      const groot = () => k.m.length * k.v.length > 4;
      function kopHtml() {
        const t = G.T[type], o1 = type === "x" ? "♀ " : "", o2 = type === "x" ? "♂ " : "";
        return `<div class="tabs">${SOORTEN.map(([s, n]) => `<button type="button" class="btn ${s === soort ? "aan" : ""}" data-s="${s}">${n}</button>`).join("")}</div>
          <p>${fm(ctx.tekst)}</p><p class="opdracht">P: ${o1}${fm(t.toon(paar[0]))} × ${o2}${fm(t.toon(paar[1]))}</p>`;
      }
      function schema(invul) {
        const vier = groot();
        return `<table class="punnett ${vier ? "vier" : ""}"><tr><th class="hoek">${type === "x" ? "♀ \\ ♂" : "gameten"}</th>${k.v.map((g) => `<th>${fm(k.gameet(g))}</th>`).join("")}</tr>` +
          k.m.map((gm, r) => `<tr><th>${fm(k.gameet(gm))}</th>${k.v.map((gv, c) => {
            const echt = k.toon(k.cel[r][c]), dood = k.feno1(k.cel[r][c]) === "sterft";
            if (!invul) return `<td><button type="button" class="vol ${dood ? "dood" : ""}" disabled>${fm(echt)}</button></td>`;
            const w = cellen[r][c], kl = w == null ? "" : "vol";
            return `<td><button type="button" class="${kl} ${selCel && selCel[0] === r && selCel[1] === c ? "sel" : ""}" data-r="${r}" data-c="${c}">${w == null ? "?" : fm(w)}</button></td>`;
          }).join("")}</tr>`).join("") + "</table>";
      }
      function teken(fb, ok) {
        let h = kopHtml();
        if (stap === 1) {
          const keuzeM = type === "x" ? ["X^{A}", "X^{a}"] : GAMEET_KEUZE[type];
          const blok = (wie, gt, keus, gekozen) => `<div class="ouder"><b>Welke geslachtscellen maakt ${wie} (${fm(G.T[type].toon(gt))})? Tik ze allemaal aan.</b>${keus.map((g) => `<button type="button" class="chip groot ${gekozen.includes(g) ? "aan" : ""}" data-w="${wie === "ouder 1" || wie === "de moeder" ? "m" : "v"}" data-g="${g}">${fm(g)}</button>`).join("")}</div>`;
          h += `<div class="stap">Stap 1 van 3 · geslachtscellen</div>` + blok(type === "x" ? "de moeder" : "ouder 1", paar[0], keuzeM, kiesM) + blok(type === "x" ? "de vader" : "ouder 2", paar[1], GAMEET_KEUZE[type], kiesV) +
            `<button type="button" class="btn primary big" data-a="g">Controleer</button>`;
        } else if (stap === 2) {
          h += `<div class="stap">Stap 2 van 3 · kruisingsschema</div>`;
          if (groot()) h += `<p class="klein">Met ${k.n} vakjes vullen we het schema voor je in. Controleer een paar vakjes zelf.</p>${schema(false)}<button type="button" class="btn primary big" data-a="door">Naar de kansvraag</button>`;
          else h += `<p class="klein">Tik een vakje en kies het genotype.</p>${schema(true)}<div class="knoppen genokeuze">${GENO_KEUZE[type].map((g) => `<button type="button" class="btn" data-k="${g}" ${selCel ? "" : "disabled"}>${fm(g)}</button>`).join("")}</div><button type="button" class="btn primary big" data-a="s">Controleer schema</button>`;
        } else {
          h += `<div class="stap">Stap 3 van 3 · kans</div>${schema(false)}<div class="sub"></div>`;
        }
        h += `<div class="fbk ${ok == null ? "" : ok ? "ok" : "nok"}">${fb || ""}</div><div class="score-r"><span>fouten: ${fout}</span><button type="button" class="btn link" data-a="nieuw">nieuwe kruising</button></div>`;
        el.innerHTML = h;
        el.querySelectorAll("[data-s]").forEach((b) => (b.onclick = () => nieuw(b.dataset.s)));
        const aan = el.querySelector(".tabs .aan"), rij = el.querySelector(".tabs");
        if (aan && rij) rij.scrollLeft = aan.offsetLeft - rij.offsetLeft - 8;
        el.querySelector("[data-a=nieuw]").onclick = () => nieuw();
        if (stap === 1) bindGameten();
        else if (stap === 2) bindSchema();
        else kansVraag();
      }
      function bindGameten() {
        el.querySelectorAll("[data-g]").forEach((b) => (b.onclick = () => {
          const lijst = b.dataset.w === "m" ? kiesM : kiesV, g = b.dataset.g, i = lijst.indexOf(g);
          if (i >= 0) lijst.splice(i, 1); else lijst.push(g);
          b.classList.toggle("aan");
        }));
        el.querySelector("[data-a=g]").onclick = () => {
          const echtM = k.m.map(k.gameet), echtV = k.v.map(k.gameet), okM = same(kiesM, echtM), okV = same(kiesV, echtV);
          if (okM && okV) { stap = 2; selCel = [0, 0]; teken(`<b>Goed.</b> ${fm(UITLEG[type])}`, true); return; }
          fout++;
          const fouteOuder = !okM ? (type === "x" ? "de moeder" : "ouder 1") : (type === "x" ? "de vader" : "ouder 2");
          teken(`<b>Nog niet goed bij ${fouteOuder}.</b> ${fm(UITLEG[type])}${fout >= 2 ? ` Antwoord: ${fm(echtM.join(" en "))} × ${fm(echtV.join(" en "))}.` : ""}`, false);
        };
      }
      function bindSchema() {
        const door = el.querySelector("[data-a=door]");
        if (door) { door.onclick = () => { stap = 3; teken(); }; return; }
        el.querySelectorAll(".punnett [data-r]").forEach((b) => (b.onclick = () => { selCel = [+b.dataset.r, +b.dataset.c]; teken(); }));
        el.querySelectorAll(".genokeuze [data-k]").forEach((b) => (b.onclick = () => {
          if (!selCel) return;
          cellen[selCel[0]][selCel[1]] = b.dataset.k;
          // volgende lege cel selecteren
          let volgende = null; cellen.forEach((r, ri) => r.forEach((c, ci) => { if (c == null && !volgende) volgende = [ri, ci]; }));
          selCel = volgende; teken();
        }));
        el.querySelector("[data-a=s]").onclick = () => {
          let fouten = 0, leeg = 0;
          el.querySelectorAll(".punnett [data-r]").forEach((b) => {
            const r = +b.dataset.r, c = +b.dataset.c, w = cellen[r][c];
            if (w == null) { leeg++; return; }
            const juist = w === k.toon(k.cel[r][c]); if (!juist) fouten++;
            b.classList.add(juist ? "goed" : "fout");
          });
          const f = el.querySelector(".fbk");
          if (leeg) { f.className = "fbk nok"; f.innerHTML = "Vul eerst alle vakjes in."; return; }
          if (fouten) { fout++; f.className = "fbk nok"; f.innerHTML = `${fouten} vakje${fouten > 1 ? "s" : ""} fout (rood). Combineer steeds de geslachtscel links met die erboven. Tik een rood vakje om het te verbeteren.`; return; }
          stap = 3; teken(`<b>Schema klopt.</b>${type === "letaal" ? " Het doorgestreepte vakje (AA) sterft." : ""}`, true);
        };
      }
      function kansVraag() {
        const sub = el.querySelector(".sub");
        let teller, noemer, wat;
        const fen = Object.keys(k.feno).filter((f) => f !== "sterft");
        const conditioneel = type === "x" && api.R.int(0, 1) === 1;
        if (conditioneel) {
          const zoon = api.R.int(0, 1) === 1, rec = api.R.int(0, 1) === 1, eind = zoon ? " (zoon)" : " (dochter)";
          noemer = 0; teller = 0;
          k.cel.forEach((r) => r.forEach((gt) => { const f = k.feno1(gt); if (f.endsWith(eind)) { noemer++; if (f.startsWith(rec ? ctx.rec : ctx.dom)) teller++; } }));
          wat = `dat een ${zoon ? "zoon" : "dochter"} van deze ouders ${rec ? (ctx.rec === "kleurenblind" ? "kleurenblind is" : "hemofilie heeft") : (ctx.dom === "gezond" ? "gezond is" : "niet kleurenblind is")}`;
        } else {
          const f = api.R.kies(fen); teller = k.feno[f]; noemer = k.levend;
          wat = "op " + beschrijf(f);
        }
        const p = (100 * teller) / noemer;
        const fout4 = type === "letaal" ? (100 * teller) / k.n : null;
        let opties = [p];
        if (fout4 != null && Math.abs(fout4 - p) > 0.01) opties.push(fout4);
        api.shuffle((type === "di" ? POOL : type === "letaal" ? [0, 25, 50, 75, 100, 100 / 3, 200 / 3] : [0, 25, 50, 75, 100]).concat(fen.map((f) => (100 * k.feno[f]) / k.levend))).forEach((x) => { if (opties.length < 4 && !opties.some((y) => Math.abs(y - x) < 0.01)) opties.push(x); });
        const lbl = (x) => `${api.nl(Math.round(x * 100) / 100)}%`;
        const verh = fen.map((f) => `${k.feno[f]} ${f}`).join(" : ");
        W.keuze(sub, api, `Hoe groot is de kans ${wat}?`, opties.map(lbl), [
          `Fenotypen in het schema: ${verh}${k.levend < k.n ? " (AA sterft)" : ""}.`,
          conditioneel ? `Kijk alleen naar de ${noemer} vakjes met een ${wat.includes("zoon") ? "zoon" : "dochter"}: ${teller} daarvan ${teller === 1 ? "voldoet" : "voldoen"}.` : `${teller} van de ${noemer} ${k.levend < k.n ? "levende " : ""}vakjes voldoen.`,
          `Kans: ${G.breuk(teller, noemer)} = ${lbl(p)}.`
        ], (juist) => {
          if (!juist) fout++;
          gemaakt++; api.klaar();
          sub.insertAdjacentHTML("beforeend", `<button type="button" class="btn primary big">Nieuwe kruising</button>`);
          sub.querySelector("button.big").onclick = () => nieuw();
        });
      }
      function beschrijf(f) {
        const m = f.match(/^(.*) \((zoon|dochter)\)$/);
        if (m) return m[1] === "gezond" ? `een gezonde ${m[2]}` : m[1].startsWith("niet ") ? `een ${m[2]} die ${m[1]} is` : m[1] === "kleurenblind" ? `een kleurenblinde ${m[2]}` : `een ${m[2]} met ${m[1]}`;
        if (f === "gezond") return `een gezond ${ctx.wie}`;
        return `een ${ctx.wie} met ${f}`;
      }
      nieuw("mono");
    }
  });

  // ================= Stamboom-detective =================
  // Zoekt alle genotypen die met de stamboom kloppen (per persoon de mogelijke genotypen).
  BIO.stamboomOplossing = function (st) {
    const xr = st.model === "xr", P = st.personen;
    const opties = P.map(([n, s, z]) => {
      let o;
      if (xr) o = s === "m" ? (z ? ["X^{a}Y"] : ["X^{A}Y"]) : (z ? ["X^{a}X^{a}"] : ["X^{A}X^{A}", "X^{A}X^{a}"]);
      else if (st.model === "ar") o = z ? ["aa"] : ["AA", "Aa"];
      else o = z ? ["AA", "Aa"] : ["aa"];
      if (st.vast && st.vast[n]) o = o.filter((g) => g === st.vast[n]);
      return o;
    });
    const allelen = (g) => (xr ? g.match(/X\^\{.\}|Y/g) : g.split(""));
    const kanKind = (gm, gv, gk, kindMan) => {
      const m = allelen(gm), v = allelen(gv), kk = allelen(gk);
      if (xr) { const vx = v[0]; if (kindMan) return m.includes(kk[0]); return (kk[0] === vx && m.includes(kk[1])) || (kk[1] === vx && m.includes(kk[0])); }
      return (m.includes(kk[0]) && v.includes(kk[1])) || (m.includes(kk[1]) && v.includes(kk[0]));
    };
    const idx = {}; P.forEach((p, i) => (idx[p[0]] = i));
    const mogelijk = P.map(() => new Set()), keuze = [];
    (function zoek(i) {
      if (i === P.length) {
        const ok = st.paren.every(([a, b, kids]) => {
          const ma = P[idx[a]][1] === "v" ? a : b, va = ma === a ? b : a;
          return kids.every((kd) => kanKind(keuze[idx[ma]], keuze[idx[va]], keuze[idx[kd]], P[idx[kd]][1] === "m"));
        });
        if (ok) keuze.forEach((g, j) => mogelijk[j].add(g));
        return;
      }
      opties[i].forEach((g) => { keuze[i] = g; zoek(i + 1); });
    })(0);
    const uit = {};
    P.forEach((p, i) => (uit[p[0]] = [...mogelijk[i]]));
    return uit;
  };
  BIO.genoLabel = function (lijst, xr) {
    if (lijst.length === 1) return lijst[0];
    return xr ? "X^{A}X^{A} of X^{A}X^{a}" : "AA of Aa";
  };

  TW.widget("stamboom-detective", {
    titel: "Stamboom-detective", icoon: "🔎",
    uitleg: "Lees een stamboom als een detective: bepaal of een eigenschap dominant, recessief of X-chromosomaal overerft, leid genotypen af en bereken een kans.",
    maak(el, api) {
      let fam = 0, stap, gi, oplos, klaarSet = {}, fout, gevonden;
      function start(f) { fam = f; stap = 1; gi = 0; fout = 0; gevonden = {}; oplos = BIO.stamboomOplossing(BIO.STAMBOMEN[fam]); teken(); }
      function teken(fb, ok) {
        const st = BIO.STAMBOMEN[fam], xr = st.model === "xr";
        const vraagNr = stap === 2 ? st.geno.vragen[gi] : null;
        let h = `<div class="tabs">${BIO.STAMBOMEN.map((s, i) => `<button type="button" class="btn ${i === fam ? "aan" : ""}" data-f="${i}">${s.titel}${klaarSet[i] ? " ✓" : ""}</button>`).join("")}</div>
          <p>Deze stamboom laat zien wie <b>${st.eigenschap}</b> heeft. ${st.extra ? api.fmt(st.extra) : ""}</p>
          ${BIO.stamboomSvg(st, { gen: gevonden, vraag: vraagNr ? [vraagNr] : [], klaar: Object.keys(gevonden).map(Number) })}
          <div class="stap">Stap ${stap} van 3 · ${["", "manier van overerven", "genotypen", "kans"][stap]}</div><div class="sub"></div>
          <div class="fbk ${ok == null ? "" : ok ? "ok" : "nok"}">${fb || ""}</div>`;
        el.innerHTML = h;
        el.querySelectorAll("[data-f]").forEach((b) => (b.onclick = () => start(+b.dataset.f)));
        const sub = el.querySelector(".sub");
        if (stap === 1) {
          W.keuze(sub, api, st.wijze.q, st.wijze.opties, st.wijze.stappen, (juist) => {
            if (!juist) fout++;
            sub.insertAdjacentHTML("beforeend", `<button type="button" class="btn primary big">Naar de genotypen</button>`);
            sub.querySelector("button.big").onclick = () => { stap = 2; teken(); };
          });
        } else if (stap === 2) {
          const pers = st.personen.find((p) => p[0] === vraagNr), man = pers[1] === "m";
          const opts = xr ? (man ? BIO.GENO_OPTIES.XM : BIO.GENO_OPTIES.XV) : BIO.GENO_OPTIES.AUT;
          const goed = BIO.genoLabel(oplos[vraagNr], xr);
          sub.innerHTML = `${gi === 0 && st.genoIntro ? `<p class="klein">${api.fmt(st.genoIntro)}</p>` : ""}<p class="opdracht">Wat is het genotype van persoon ${vraagNr} (omcirkeld)? Gebruik A en a${xr ? " op het X-chromosoom" : ""}.</p>
            <div class="kolom">${opts.map((o) => `<button type="button" class="btn" data-o="${o}">${api.fmt(o)}</button>`).join("")}</div>`;
          sub.querySelectorAll("[data-o]").forEach((b) => (b.onclick = () => {
            const juist = b.dataset.o === goed;
            sub.querySelectorAll("[data-o]").forEach((x) => { x.disabled = true; if (x.dataset.o === goed) x.classList.add("good"); });
            if (!juist) { b.classList.add("bad"); fout++; }
            gevonden[vraagNr] = oplos[vraagNr].length === 1 ? goed : xr ? "X^{A}X^{?}" : "AA/Aa";
            const f = el.querySelector(".fbk"); f.className = "fbk " + (juist ? "ok" : "nok");
            f.innerHTML = `<b>${juist ? "Goed." : "Niet goed."}</b> ${api.fmt(st.geno.uitleg[vraagNr])}`;
            sub.insertAdjacentHTML("beforeend", `<button type="button" class="btn primary big">${gi < st.geno.vragen.length - 1 ? "Volgende persoon" : "Naar de kansvraag"}</button>`);
            sub.querySelector("button.big").onclick = () => { gi++; if (gi >= st.geno.vragen.length) stap = 3; teken(); };
          }));
        } else {
          W.keuze(sub, api, st.kans.q, st.kans.opties, st.kans.stappen, (juist) => {
            if (!juist) fout++;
            klaarSet[fam] = 1; api.klaar();
            sub.insertAdjacentHTML("beforeend", `<p class="klein">Familie opgelost met ${fout} fout${fout === 1 ? "" : "en"}.</p>${fam < BIO.STAMBOMEN.length - 1 ? `<button type="button" class="btn primary big">Volgende familie</button>` : `<button type="button" class="btn primary big">Opnieuw bij familie 1</button>`}`);
            sub.querySelector("button.big").onclick = () => start((fam + 1) % BIO.STAMBOMEN.length);
          });
        }
      }
      start(0);
    }
  });
})();
