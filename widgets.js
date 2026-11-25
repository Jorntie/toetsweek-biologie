// Interactieve onderdelen. TW.widget(naam, { titel, icoon, uitleg, maak(el, api) {} });
// Dit bestand: thema 9 DNA. Zie ook widgets-transport.js en widgets-genetica.js.
(function () {
  "use strict";
  const BIO = window.BIO;
  const rustig = () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PAAR = { A: "T", T: "A", C: "G", G: "C" };
  const RNA = { A: "U", T: "A", C: "G", G: "C" };
  const willekeurig = (n, R) => { let s = ""; for (let i = 0; i < n; i++) s += R.kies(["A", "T", "C", "G"]); return s; };

  // Gedeelde hulpjes voor alle widget-bestanden
  BIO.W = {
    rustig,
    // meerkeuze binnen een widget: opties[0] is goed; cb(juist) na de keuze
    keuze(el, api, vraag, opties, uitleg, cb) {
      const volg = api.shuffle(opties.map((t, i) => ({ t, i })));
      el.innerHTML = `<p class="opdracht">${api.fmt(vraag)}</p><div class="kolom">${volg.map((o) => `<button type="button" class="btn" data-i="${o.i}">${api.fmt(o.t)}</button>`).join("")}</div><div class="fbk"></div>`;
      el.querySelectorAll("button").forEach((b) => (b.onclick = () => {
        const juist = b.dataset.i === "0";
        el.querySelectorAll("button").forEach((x) => { x.disabled = true; if (x.dataset.i === "0") x.classList.add("good"); });
        if (!juist) b.classList.add("bad");
        const f = el.querySelector(".fbk"); f.className = "fbk " + (juist ? "ok" : "nok");
        f.innerHTML = `<b>${juist ? "Goed!" : "Niet goed."}</b> ${Array.isArray(uitleg) ? `<ol class="stappen">${uitleg.map((u) => `<li>${api.fmt(u)}</li>`).join("")}</ol>` : api.fmt(uitleg || "")}`;
        if (cb) cb(juist);
      }));
    },
    schud(n) { if (!n || rustig()) return; n.classList.remove("schud"); void n.offsetWidth; n.classList.add("schud"); }
  };
  const W = BIO.W;

  // ---------- tekening van (dubbel)strengen ----------
  // rijen: [{ seq, n (aantal zichtbare basen, standaard alles), nieuw, links, rechts, nu (index gemarkeerd), naam }]
  // bruggen: [[rijA, rijB]] tekent waterstofbruggen waar beide basen zichtbaar zijn
  function strengen(rijen, o) {
    o = o || {};
    const n = Math.max(...rijen.map((r) => r.seq.length)), x0 = 24, stap = Math.min(34, 292 / n), bw = Math.min(26, stap - 3), rh = 30;
    let y = 4, s = "";
    const Y = [];
    rijen.forEach((r, ri) => {
      if (r.naam) { s += `<text x="${x0}" y="${y + 10}" class="k ${r.nieuw ? "tn b" : "m"}">${r.naam}</text>`; y += 14; }
      Y[ri] = y;
      const zicht = r.n == null ? r.seq.length : r.n;
      s += `<line x1="${x0 - 4}" y1="${y + (r.onder ? rh : 0)}" x2="${x0 + n * stap}" y2="${y + (r.onder ? rh : 0)}" class="${r.nieuw ? "nieuw" : "s"} dik"/>`;
      for (let i = 0; i < r.seq.length; i++) {
        const x = x0 + i * stap + (stap - bw) / 2 + (o.codons ? Math.floor(i / 3) * 0 : 0), b = r.seq[i];
        if (i < zicht) s += `<rect x="${x.toFixed(1)}" y="${y + 2}" width="${bw}" height="${rh - 4}" rx="4" class="b${b}"/><text x="${(x + bw / 2).toFixed(1)}" y="${y + rh / 2 + 4.5}" text-anchor="middle" class="op">${b}</text>`;
        else s += `<rect x="${x.toFixed(1)}" y="${y + 2}" width="${bw}" height="${rh - 4}" rx="4" class="${i === r.nu ? "zacht" : "grijs"}" ${i === r.nu ? 'stroke-dasharray="4 3"' : 'opacity=".55"'}/>${i === r.nu ? `<text x="${(x + bw / 2).toFixed(1)}" y="${y + rh / 2 + 4.5}" text-anchor="middle" class="pa b">?</text>` : ""}`;
        if (o.codons && i % 3 === 0 && i) s += `<line x1="${(x0 + i * stap).toFixed(1)}" y1="${y - 2}" x2="${(x0 + i * stap).toFixed(1)}" y2="${y + rh + 2}" class="raster"/>`;
      }
      s += `<text x="10" y="${y + rh / 2 + 4}" text-anchor="middle" class="k b">${r.links || ""}</text><text x="${x0 + n * stap + 10}" y="${y + rh / 2 + 4}" text-anchor="middle" class="k b">${r.rechts || ""}</text>`;
      y += rh + (r.gat == null ? 12 : r.gat);
    });
    (o.bruggen || []).forEach(([a, b]) => {
      const A = rijen[a], B = rijen[b], ya = Y[a] + rh, yb = Y[b];
      for (let i = 0; i < n; i++) {
        if (i >= (A.n == null ? A.seq.length : A.n) || i >= (B.n == null ? B.seq.length : B.n)) continue;
        const br = A.seq[i] === "A" || A.seq[i] === "T" || A.seq[i] === "U" ? 2 : 3, xm = x0 + i * stap + stap / 2;
        for (let k = 0; k < br; k++) { const xx = xm + (k - (br - 1) / 2) * 5; s += `<line x1="${xx.toFixed(1)}" y1="${ya}" x2="${xx.toFixed(1)}" y2="${yb}" class="stip"/>`; }
      }
    });
    return BIO.svg(340, y, o.label || "DNA-strengen", s);
  }
  BIO.strengen = strengen;
  const basenKnoppen = (letters) => `<div class="basen">${letters.map((b) => `<button type="button" class="base-k b-${b}" data-b="${b}" aria-label="base ${b}">${b}</button>`).join("")}</div>`;

  // ================= DNA-bouwer =================
  TW.widget("dna-bouwer", {
    titel: "DNA-bouwer", icoon: "🧬",
    uitleg: "Bouw eerst de tweede streng van een stukje DNA. Daarna kopieer je het hele molecuul, net als een cel vóór de deling.",
    maak(el, api) {
      let seq, pos, fouten, fase, pos2;
      function start() { seq = willekeurig(7, api.R); pos = 0; pos2 = 0; fouten = 0; fase = 0; teken(); }
      function teken(fb, ok) {
        const comp = BIO.comp(seq);
        let h = "";
        if (fase === 0) {
          h = `<div class="stap">Stap 1 van 4 · basenparing</div><p class="opdracht">Welke base hoort tegenover het vraagteken? Tik de juiste base.</p>
            ${strengen([{ seq, links: "5'", rechts: "3'", gat: 16 }, { seq: comp, n: pos, nu: pos, links: "3'", rechts: "5'", onder: true }], { bruggen: [[0, 1]] })}
            ${basenKnoppen(["A", "T", "C", "G"])}`;
        } else if (fase === 1) {
          h = `<div class="stap">Stap 2 van 4 · waterstofbruggen</div>${strengen([{ seq, links: "5'", rechts: "3'", gat: 16 }, { seq: comp, links: "3'", rechts: "5'", onder: true }], { bruggen: [[0, 1]] })}<div class="sub"></div>`;
        } else if (fase === 2) {
          h = `<div class="stap">Stap 3 van 4 · de strengen gaan uit elkaar</div><p class="opdracht">De cel gaat delen en moet het DNA eerst verdubbelen. Een enzym verbreekt de waterstofbruggen.</p>
            ${strengen([{ seq, links: "5'", rechts: "3'", gat: 16 }, { seq: comp, links: "3'", rechts: "5'", onder: true }], { bruggen: [[0, 1]] })}
            <button type="button" class="btn primary big" data-a="open">Verbreek de waterstofbruggen</button>`;
        } else if (fase === 3) {
          const klaarBoven = pos >= seq.length;
          h = `<div class="stap">Stap 4 van 4 · DNA-replicatie</div><p class="opdracht">${klaarBoven ? "Nu de onderste oude streng: bouw ook hier een nieuwe streng tegenaan." : "Elke oude streng is het voorbeeld voor een nieuwe. Bouw de nieuwe streng (roze) aan de bovenste oude streng."}</p>
            ${strengen([{ seq, links: "5'", rechts: "3'", naam: "oude streng", gat: 14 }, { seq: comp, n: pos, nu: klaarBoven ? -1 : pos, nieuw: true, onder: true, links: "3'", rechts: "5'", gat: 26 },
              { seq, n: pos2, nu: klaarBoven ? pos2 : -1, nieuw: true, links: "5'", rechts: "3'", gat: 14 }, { seq: comp, links: "3'", rechts: "5'", onder: true, naam: "oude streng" }], { bruggen: [[0, 1], [2, 3]] })}
            ${basenKnoppen(["A", "T", "C", "G"])}`;
        } else {
          h = `<div class="stap">Klaar · twee DNA-moleculen</div>
            ${strengen([{ seq, links: "5'", rechts: "3'", naam: "molecuul 1", gat: 14 }, { seq: comp, nieuw: true, onder: true, links: "3'", rechts: "5'", gat: 26 }, { seq, nieuw: true, links: "5'", rechts: "3'", naam: "molecuul 2", gat: 14 }, { seq: comp, links: "3'", rechts: "5'", onder: true }], { bruggen: [[0, 1], [2, 3]] })}
            <div class="sub"></div>`;
        }
        el.innerHTML = h + `<div class="fbk ${ok == null ? "" : ok ? "ok" : "nok"}">${fb || ""}</div>` + (fase < 4 ? `<div class="score-r"><span>fouten: ${fouten}</span><button type="button" class="btn link" data-a="nieuw">andere volgorde</button></div>` : "");
        const sub = el.querySelector(".sub");
        if (fase === 1) {
          const n = BIO.waterstofbruggen(seq), at = seq.split("").filter((b) => b === "A" || b === "T").length;
          const opties = [String(n), String(seq.length * 2), String(seq.length * 3), String(n + (n % 2 ? 1 : -1))].filter((v, i, a) => a.indexOf(v) === i);
          while (opties.length < 4) opties.push(String(n + opties.length + 1));
          W.keuze(sub, api, "Hoeveel waterstofbruggen houden deze twee strengen bij elkaar?", opties, [`A-T heeft 2 waterstofbruggen, C-G heeft er 3.`, `${at} × 2 + ${seq.length - at} × 3 = ${n}.`, "Veel C-G-paren betekent dus: steviger aan elkaar."], () => { sub.insertAdjacentHTML("beforeend", `<button type="button" class="btn primary big" data-a="verder">Verder</button>`); sub.querySelector("[data-a=verder]").onclick = () => { fase = 2; teken(); }; });
        }
        if (fase === 4) {
          W.keuze(sub, api, "Vergelijk de twee nieuwe DNA-moleculen. Wat klopt?", ["Elk molecuul heeft één oude en één nieuwe streng", "Eén molecuul is helemaal oud, het andere helemaal nieuw", "Beide moleculen bestaan uit twee nieuwe strengen", "De basenvolgorde van molecuul 2 is omgekeerd"],
            "Elke oude streng dient als voorbeeld voor een nieuwe streng. Zo ontstaan twee moleculen met precies dezelfde basenvolgorde, elk half oud en half nieuw.", () => { api.klaar(); sub.insertAdjacentHTML("beforeend", `<button type="button" class="btn primary big" data-a="nieuw">Nog een keer met een nieuwe volgorde</button>`); sub.querySelector("[data-a=nieuw]").onclick = start; });
        }
        el.querySelectorAll("[data-b]").forEach((b) => (b.onclick = () => kies(b.dataset.b, b)));
        const open = el.querySelector("[data-a=open]"); if (open) open.onclick = () => { fase = 3; pos = 0; pos2 = 0; teken(); };
        const nw = el.querySelector(".score-r [data-a=nieuw]"); if (nw) nw.onclick = start;
      }
      function kies(b, knop) {
        const comp = BIO.comp(seq);
        const boven = fase === 0 || pos < seq.length;       // bouwen we tegenover de bovenste (seq) of de onderste (comp) streng?
        const tegen = boven ? seq[fase === 0 ? pos : pos] : comp[pos2], goed = PAAR[tegen];
        if (b !== goed) { fouten++; teken(`Tegenover <b>${tegen}</b> hoort <b>${goed}</b>, niet ${b}. Onthoud: A paart met T, C paart met G.`, false); return; }
        if (boven) pos++; else pos2++;
        if (fase === 0 && pos >= seq.length) { fase = 1; teken("De complementaire streng is af. De strengen lopen in tegengestelde richting: 5' tegenover 3'.", true); return; }
        if (fase === 3 && pos >= seq.length && pos2 >= seq.length) { fase = 4; teken(); return; }
        teken();
      }
      start();
    }
  });

  // ================= Eiwitfabriek =================
  TW.widget("eiwitfabriek", {
    titel: "Eiwitfabriek", icoon: "🏭",
    uitleg: "Maak zelf een eiwit: schrijf het gen over naar mRNA (transcriptie) en vertaal het mRNA met de codontabel (translatie).",
    maak(el, api) {
      let mrna, template, coderend, pos, fase, keten, fouten, vak;
      const naarTemplate = (m) => m.split("").map((b) => ({ A: "T", U: "A", C: "G", G: "C" }[b])).join("");
      function start() { mrna = BIO.gen(api.R.int(3, 4), api.R); template = naarTemplate(mrna); coderend = mrna.replace(/U/g, "T"); pos = 0; fase = 0; keten = []; fouten = 0; vak = null; teken(); }
      function teken(fb, ok) {
        const cods = BIO.codons(mrna);
        let h = "";
        if (fase === 0) {
          h = `<div class="stap">Stap 1 · transcriptie (in de celkern)</div><p class="opdracht">Bouw het mRNA tegen de template-streng aan. Let op: RNA heeft U in plaats van T.</p>
            ${strengen([{ seq: coderend, links: "5'", rechts: "3'", naam: "coderende streng (DNA)", gat: 6 }, { seq: template, links: "3'", rechts: "5'", naam: "template-streng (DNA)", gat: 14, onder: true }, { seq: mrna, n: pos, nu: pos, nieuw: true, links: "5'", rechts: "3'", naam: "mRNA" }], { bruggen: [[1, 2]], codons: true })}
            ${basenKnoppen(["A", "U", "C", "G"])}`;
        } else if (fase === 1) {
          const i = keten.length;
          h = `<div class="stap">Stap 2 · translatie (bij een ribosoom)</div>
            <div class="streng"><span class="lab">mRNA in codons; het ribosoom staat bij het omlijnde codon</span>${cods.map((c, k) => c.split("").map((b, j) => `<span class="nt b-${b} ${j === 0 && k ? "gap" : ""} ${k === i ? "nu-c" : ""}" ${k === i ? 'style="outline:2.5px solid var(--accent);outline-offset:1px"' : k < i ? 'style="opacity:.45"' : ""}>${b}</span>`).join("")).join("")}</div>
            <div class="keten"><span class="lab">aminozuurketen</span>${keten.map((a) => `<span class="az">${a}</span>`).join("")}<span class="az leeg">?</span></div>
            <p class="opdracht">Zoek codon <b>${cods[i]}</b> op: tik eerst het vak (1e en 2e base), kies daarna het codon.</p>
            ${BIO.codontabel(true)}<div class="knoppen codonkeuze"></div>`;
        } else {
          const n = keten.length, c = cods[api.R.int(1, cods.length - 2)], anti = BIO.transcribeer(c.replace(/U/g, "T")).replace(/T/g, "U");
          h = `<div class="stap">Klaar · het eiwit laat los</div>
            <div class="streng"><span class="lab">mRNA</span>${cods.map((cc, k) => cc.split("").map((b, j) => `<span class="nt b-${b} ${j === 0 && k ? "gap" : ""}">${b}</span>`).join("")).join("")}</div>
            <div class="keten"><span class="lab">eiwit (${n} aminozuren)</span>${keten.map((a) => `<span class="az pop">${a}</span>`).join("")}<span class="az stop">stop</span></div><div class="sub" data-c="${c}" data-anti="${anti}"></div>`;
        }
        el.innerHTML = h + `<div class="fbk ${ok == null ? "" : ok ? "ok" : "nok"}">${fb || ""}</div><div class="score-r"><span>fouten: ${fouten}</span><button type="button" class="btn link" data-a="nieuw">nieuw gen</button></div>`;
        el.querySelector("[data-a=nieuw]").onclick = start;
        el.querySelectorAll("[data-b]").forEach((b) => (b.onclick = () => transcribeer(b.dataset.b)));
        el.querySelectorAll(".codontabel button").forEach((b) => (b.onclick = () => { vak = b.dataset.v; toonVak(); }));
        if (fase === 1 && vak) toonVak();
        const sub = el.querySelector(".sub");
        if (sub) {
          const c = sub.dataset.c, anti = sub.dataset.anti, opties = [anti, c, c.replace(/U/g, "T"), anti.replace(/U/g, "T")].filter((v, i, a) => a.indexOf(v) === i);
          if (opties.length < 4) opties.push(anti.split("").reverse().join("") === anti ? "AAA" : anti.split("").reverse().join(""));
          W.keuze(sub, api, `Welk anticodon heeft het tRNA-molecuul dat bij codon ${c} past?`, opties.slice(0, 4), `Het anticodon is complementair aan het codon: tegenover A staat U, tegenover C staat G. Bij ${c} hoort dus ${anti}. In RNA komt geen T voor.`, () => {
            api.klaar(); sub.insertAdjacentHTML("beforeend", `<p class="klein">Het stopcodon codeert niet voor een aminozuur: ${BIO.codons(mrna).length} codons geven ${keten.length} aminozuren.</p><button type="button" class="btn primary big">Nog een gen</button>`); sub.querySelector("button.big").onclick = start;
          });
        }
      }
      function toonVak() {
        el.querySelectorAll(".codontabel button").forEach((b) => b.classList.toggle("sel", b.dataset.v === vak));
        const k = el.querySelector(".codonkeuze"); if (!k) return;
        k.innerHTML = BIO.BASEN.map((b) => `<button type="button" class="btn" data-c="${vak + b}">${vak + b}<br><small>${BIO.CODE[vak + b]}</small></button>`).join("");
        k.querySelectorAll("button").forEach((b) => (b.onclick = () => vertaal(b.dataset.c)));
        if (!rustig() && k.scrollIntoView) k.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
      function transcribeer(b) {
        const t = template[pos], goed = RNA[t];
        if (b !== goed) { fouten++; teken(t === "A" && b === "T" ? "RNA bevat geen T." : `Tegenover <b>${t}</b> in het DNA komt <b>${goed}</b> in het mRNA${t === "A" ? ": RNA heeft U (uracil) in plaats van T" : ""}.`, false); return; }
        pos++;
        if (pos >= mrna.length) { fase = 1; teken("Het mRNA is af en verlaat de kern via een kernporie. Vergelijk: het mRNA is gelijk aan de coderende streng, met U in plaats van T.", true); return; }
        teken();
      }
      function vertaal(c) {
        const cods = BIO.codons(mrna), doel = cods[keten.length];
        if (c !== doel) { fouten++; vak = null; teken(`Je koos ${c} (${BIO.CODE[c]}), maar het codon is <b>${doel}</b>. Rij = 1e base (${doel[0]}), kolom = 2e base (${doel[1]}), daarna de 3e base (${doel[2]}).`, false); return; }
        vak = null;
        if (BIO.CODE[c] === "stop") { fase = 2; teken("Stopcodon: er komt geen aminozuur meer bij. Het ribosoom laat het mRNA en de aminozuurketen los.", true); return; }
        keten.push(BIO.CODE[c]);
        teken(keten.length === 1 ? "AUG is het startcodon en codeert voor Met (methionine). Hier begint elk eiwit." : `${c} codeert voor ${BIO.CODE[c]} (${BIO.NAAM[BIO.CODE[c]]}).`, true);
      }
      start();
    }
  });

  // ================= Mutatie-lab =================
  const EFFECT = {
    geen: "Geen effect: het aminozuur blijft hetzelfde",
    ander: "Eén ander aminozuur in het eiwit",
    stop: "Vroeg stopcodon: het eiwit wordt korter",
    raam: "Het leesraam verschuift: alles erna verandert"
  };
  // welk gevolg heeft de mutatie? orig en mut zijn coderende DNA-strengen
  BIO.mutatieEffect = function (orig, mut) {
    const a = BIO.vertaal(BIO.naarRna(orig)).map((x) => x.az), b = BIO.vertaal(BIO.naarRna(mut)).map((x) => x.az);
    if (mut.slice(0, 3) !== "ATG") return "start";
    if (mut.length !== orig.length) return "raam";
    if (a.join() === b.join()) return "geen";
    if (b[b.length - 1] === "stop" && b.length < a.length) return "stop";
    if (b[b.length - 1] !== "stop" || b.length > a.length) return "langer";
    return "ander";
  };
  // alle mogelijke mutaties van één base met hun effect (start- en stopcodon blijven heel)
  BIO.mutaties = function (dna) {
    const uit = [], eind = dna.length - 3;
    for (let i = 3; i < eind; i++) {
      ["A", "T", "C", "G"].forEach((b) => { if (b !== dna[i]) { const m = dna.slice(0, i) + b + dna.slice(i + 1); uit.push({ soort: "vervang", i, b, dna: m, effect: BIO.mutatieEffect(dna, m) }); } });
      const d = dna.slice(0, i) + dna.slice(i + 1); uit.push({ soort: "weg", i, dna: d, effect: BIO.mutatieEffect(dna, d) });
      ["A", "T", "C", "G"].forEach((b) => { const m = dna.slice(0, i) + b + dna.slice(i); uit.push({ soort: "erbij", i, b, dna: m, effect: BIO.mutatieEffect(dna, m) }); });
    }
    return uit;
  };
  // een leesraamverschuiving is alleen een duidelijke opgave als het eerste veranderde codon geen stopcodon wordt
  BIO.duidelijkeRaam = function (dna, m) {
    const a = BIO.vertaal(BIO.naarRna(dna)), b = BIO.vertaal(BIO.naarRna(m.dna)), k = Math.floor(m.i / 3);
    return b.length > k + 1 && b[k] && b[k].az !== "stop" && a.slice(k).map((x) => x.az).join() !== b.slice(k).map((x) => x.az).join() && b[k].az !== a[k].az;
  };
  BIO.mutatieGen = function (R) {
    for (let poging = 0; poging < 200; poging++) {
      const dna = BIO.gen(5, R).replace(/U/g, "T"), alle = BIO.mutaties(dna);
      const per = { geen: alle.filter((m) => m.soort === "vervang" && m.effect === "geen"), ander: alle.filter((m) => m.soort === "vervang" && m.effect === "ander"), stop: alle.filter((m) => m.soort === "vervang" && m.effect === "stop"), raam: alle.filter((m) => m.effect === "raam" && m.i < dna.length - 9 && BIO.duidelijkeRaam(dna, m)) };
      if (per.geen.length && per.ander.length && per.stop.length && per.raam.length) return { dna, per };
    }
    return null;
  };
  const ntRij = (dna, o) => {
    o = o || {};
    return `<div class="streng">${o.lab ? `<span class="lab">${o.lab}</span>` : ""}${dna.split("").map((b, i) => `<${o.tik ? 'button type="button"' : "span"} class="nt b-${b} ${i % 3 === 0 && i ? "gap" : ""} ${o.mut === i ? "mut" : ""} ${o.sel === i ? "nu" : ""}" data-i="${i}" ${o.tik ? `aria-label="base ${i + 1}: ${b}"` : ""}>${b}</${o.tik ? "button" : "span"}>`).join("")}</div>`;
  };
  const eiwitRij = (dna, ref, lab) => {
    const e = BIO.vertaal(BIO.naarRna(dna)), r = ref ? BIO.vertaal(BIO.naarRna(ref)) : null;
    const zonderStop = e.length && e[e.length - 1].az !== "stop";
    return `<div class="keten"><span class="lab">${lab}</span>${e.map((x, i) => `<span class="az ${x.az === "stop" ? "stop" : r && (!r[i] || r[i].az !== x.az) ? "anders" : ""}">${x.az}</span>`).join("")}${zonderStop ? `<span class="az leeg">… geen stopcodon</span>` : ""}</div>`;
  };
  const mutTekst = (dna, m) => m.soort === "vervang" ? `Base ${m.i + 1} (${dna[m.i]}) wordt vervangen door ${m.b}.` : m.soort === "weg" ? `Base ${m.i + 1} (${dna[m.i]}) valt weg.` : `Vóór base ${m.i + 1} komt een extra ${m.b}.`;
  TW.widget("mutatie-lab", {
    titel: "Mutatie-lab", icoon: "🧪",
    uitleg: "Wat doet één veranderde base met een eiwit? Voorspel eerst het gevolg, of experimenteer zelf in het vrije lab.",
    maak(el, api) {
      let tab = "voorspel", G, ronde, score, volg, huidig, antwoord, vrij, sel, doel, gehaald;
      const DOELEN = [["geen", "Maak een puntmutatie die het eiwit niet verandert."], ["stop", "Maak met één vervanging een vroeg stopcodon."], ["ander", "Verander precies één aminozuur."], ["raam", "Laat het leesraam verschuiven."]];
      function nieuwGen() { G = BIO.mutatieGen(api.R); ronde = 0; score = 0; volg = api.shuffle(["geen", "ander", "stop", "raam", api.R.kies(["ander", "raam", "stop"])]); vrij = G.dna; sel = null; doel = 0; gehaald = {}; volgende(); }
      function volgende() { const soort = volg[ronde]; huidig = api.R.kies(G.per[soort]); antwoord = null; teken(); }
      function teken() {
        let h = `<div class="tabs"><button type="button" class="btn ${tab === "voorspel" ? "aan" : ""}" data-tab="voorspel">Voorspel het gevolg</button><button type="button" class="btn ${tab === "vrij" ? "aan" : ""}" data-tab="vrij">Vrij lab</button></div>`;
        if (tab === "voorspel") {
          if (ronde >= volg.length) {
            h += `<p class="score">${score}/${volg.length}</p><p class="score-sub">goed voorspeld</p><div class="fbk ${score >= 4 ? "ok" : ""}">${score >= 4 ? "Sterk: je ziet het verschil tussen een vervanging en een verschuiving van het leesraam." : "Tip: bij een vervanging blijft het leesraam gelijk en verandert hooguit één codon. Valt er een base weg of komt er één bij, dan verschuiven alle codons erna."}</div><button type="button" class="btn primary big" data-a="opnieuw">Nieuw gen, nieuwe ronde</button>`;
          } else {
            h += `<div class="score-r"><span>mutatie ${ronde + 1} van ${volg.length}</span><span>${score} goed</span></div>
              ${ntRij(G.dna, { lab: "coderende streng van het gen (5' → 3'), per codon", mut: huidig.soort === "erbij" ? null : huidig.i, sel: huidig.soort === "erbij" ? huidig.i : null })}
              ${eiwitRij(G.dna, null, "eiwit zonder mutatie")}
              <p class="opdracht">🧬 ${mutTekst(G.dna, huidig)} Wat is het gevolg voor het eiwit?</p>`;
            if (!antwoord) h += `<div class="kolom">${Object.keys(EFFECT).map((k) => `<button type="button" class="btn" data-e="${k}">${EFFECT[k]}</button>`).join("")}</div><p class="klein">Tip: gebruik de codontabel uit je Binas of uit de Eiwitfabriek.</p>`;
            else {
              const juist = antwoord === huidig.effect, k = Math.floor(huidig.i / 3), oc = BIO.codons(G.dna)[k], nc = BIO.codons(huidig.dna)[k];
              const uitleg = { geen: `Codon ${oc} wordt ${nc}. Beide coderen voor ${BIO.CODE[BIO.naarRna(nc)]}: het eiwit blijft gelijk. Zo'n mutatie merk je niet.`, ander: `Codon ${oc} (${BIO.CODE[BIO.naarRna(oc)]}) wordt ${nc} (${BIO.CODE[BIO.naarRna(nc)]}). Eén aminozuur is anders; de rest blijft gelijk. Of het eiwit nog werkt, hangt af van de plek.`, stop: `Codon ${oc} wordt ${nc}: in het mRNA is dat het stopcodon ${BIO.naarRna(nc)}. De translatie stopt te vroeg en het eiwit is te kort; meestal werkt het niet meer.`, raam: `Er ${huidig.soort === "weg" ? "valt een base weg" : "komt een base bij"}, dus vanaf codon ${k + 1} schuiven alle basen een plaats op. Alle codons erna worden anders gelezen: het eiwit is vanaf daar compleet anders.` }[huidig.effect];
              h += `${ntRij(huidig.dna, { lab: "gen met mutatie", mut: huidig.soort === "weg" ? null : huidig.i })}${eiwitRij(huidig.dna, G.dna, "eiwit met mutatie (oranje = veranderd)")}
                <div class="fbk ${juist ? "ok" : "nok"}"><b>${juist ? "Goed voorspeld!" : "Anders dan je dacht."}</b> ${EFFECT[huidig.effect]}. ${uitleg}</div><button type="button" class="btn primary big" data-a="verder">${ronde + 1 < volg.length ? "Volgende mutatie" : "Bekijk je score"}</button>`;
            }
          }
        } else {
          const eff = BIO.mutatieEffect(G.dna, vrij), veranderd = vrij !== G.dna;
          const naam = { start: "Het startcodon is weg: er wordt geen normaal eiwit gemaakt.", langer: "Het stopcodon is verdwenen: de translatie gaat te lang door.", geen: EFFECT.geen + ".", ander: EFFECT.ander + ".", stop: EFFECT.stop + ".", raam: EFFECT.raam + "." }[eff];
          if (veranderd && DOELEN[doel] && eff === DOELEN[doel][0]) { gehaald[doel] = 1; }
          h += `<p class="opdracht">${doel < DOELEN.length ? `Opdracht ${doel + 1} van ${DOELEN.length}: ${DOELEN[doel][1]}` : "Alle opdrachten gehaald. Experimenteer gerust verder."}</p>
            ${ntRij(vrij, { lab: "tik op een base van het gen", tik: true, sel })}
            ${sel != null ? `<div class="knoppen">${["A", "T", "C", "G"].filter((b) => b !== vrij[sel]).map((b) => `<button type="button" class="btn" data-v="${b}">→ ${b}</button>`).join("")}<button type="button" class="btn" data-w="1">verwijder</button></div><div class="knoppen">${["A", "T", "C", "G"].map((b) => `<button type="button" class="btn" data-n="${b}">+${b} ervoor</button>`).join("")}</div>` : ""}
            ${eiwitRij(G.dna, null, "eiwit zonder mutatie")}${eiwitRij(vrij, G.dna, "eiwit nu")}
            ${veranderd ? `<div class="fbk ${gehaald[doel] ? "ok" : ""}">${gehaald[doel] ? "<b>Gelukt!</b> " : ""}${naam}</div>` : ""}
            <div class="knoppen"><button type="button" class="btn" data-a="herstel" ${veranderd ? "" : "disabled"}>Herstel het gen</button>${gehaald[doel] ? `<button type="button" class="btn primary" data-a="doel">Volgende opdracht</button>` : ""}</div>`;
        }
        el.innerHTML = h;
        el.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { tab = b.dataset.tab; teken(); }));
        el.querySelectorAll("[data-e]").forEach((b) => (b.onclick = () => { antwoord = b.dataset.e; if (antwoord === huidig.effect) score++; teken(); }));
        const q = (s) => el.querySelector(s);
        if (q("[data-a=verder]")) q("[data-a=verder]").onclick = () => { ronde++; if (ronde >= volg.length) { api.klaar(); teken(); } else volgende(); };
        if (q("[data-a=opnieuw]")) q("[data-a=opnieuw]").onclick = nieuwGen;
        if (q("[data-a=herstel]")) q("[data-a=herstel]").onclick = () => { vrij = G.dna; sel = null; teken(); };
        if (q("[data-a=doel]")) q("[data-a=doel]").onclick = () => { doel++; vrij = G.dna; sel = null; if (doel >= DOELEN.length) api.klaar(); teken(); };
        el.querySelectorAll("button.nt").forEach((b) => (b.onclick = () => { sel = sel === +b.dataset.i ? null : +b.dataset.i; teken(); }));
        el.querySelectorAll("[data-v]").forEach((b) => (b.onclick = () => { vrij = G.dna.length === vrij.length || true ? vrij.slice(0, sel) + b.dataset.v + vrij.slice(sel + 1) : vrij; sel = null; teken(); }));
        if (q("[data-w]")) q("[data-w]").onclick = () => { vrij = vrij.slice(0, sel) + vrij.slice(sel + 1); sel = null; teken(); };
        el.querySelectorAll("[data-n]").forEach((b) => (b.onclick = () => { vrij = vrij.slice(0, sel) + b.dataset.n + vrij.slice(sel); sel = null; teken(); }));
      }
      nieuwGen();
    }
  });

  // ================= Biotechniek in stappen =================
  const ring = (x, y, r, open, gen) => `<circle cx="${x}" cy="${y}" r="${r}" class="lgrijs" stroke-width="${r > 12 ? 5 : 3}" ${open ? `stroke-dasharray="${(2 * Math.PI * r * 0.8).toFixed(0)} ${(2 * Math.PI * r * 0.2).toFixed(0)}" transform="rotate(-54 ${x} ${y})"` : ""}/>${gen ? `<path d="M${(x - r * 0.59).toFixed(1)} ${(y - r * 0.81).toFixed(1)} A${r} ${r} 0 0 1 ${(x + r * 0.59).toFixed(1)} ${(y - r * 0.81).toFixed(1)}" class="lor" stroke-width="${r > 12 ? 6 : 4}"/>` : ""}`;
  const bact = (x, y, plasmide, eiwit) => `<rect x="${x - 34}" y="${y - 20}" width="68" height="40" rx="20" class="wit"/><path d="M${x - 24} ${y + 4} q5 -9 10 0 t10 0" class="s"/>${plasmide ? ring(x + 18, y - 2, 8, false, true) : ""}${eiwit ? `<circle cx="${x - 16}" cy="${y - 8}" r="3.5" class="or"/><circle cx="${x + 2}" cy="${y - 10}" r="3.5" class="or"/><circle cx="${x + 4}" cy="${y + 10}" r="3.5" class="or"/>` : ""}`;
  function recScene(n) {
    let s = "";
    // n = aantal stappen dat gedaan is (0..6)
    s += `<text x="8" y="14" class="k m">menselijk DNA</text><path d="M10 34 q6 -8 12 0 t12 0 t12 0" class="lgrijs dik"/><path d="M${n >= 1 ? 52 : 46} ${n >= 1 ? 52 : 34} q6 -8 12 0 t12 0" class="lor dik"/><path d="M${n >= 1 ? 76 : 70} 34 q6 -8 12 0 t12 0 t12 0" class="lgrijs dik"/>`;
    if (n >= 1) s += `<text x="64" y="72" text-anchor="middle" class="k pb b">insulinegen</text>`;
    s += `<text x="250" y="14" text-anchor="middle" class="k m">bacterie</text>` + bact(250, 44, n < 2, false);
    if (n >= 2 && n < 3) s += ring(170, 44, 18, true, false) + `<text x="170" y="80" text-anchor="middle" class="k">open plasmide</text>`;
    if (n >= 3 && n < 4) s += ring(170, 44, 18, false, true) + `<text x="170" y="80" text-anchor="middle" class="k b">recombinant plasmide</text>`;
    if (n >= 4) s += BIO.pijl(250, 68, 250, 92, "") + bact(250, 116, true, false);
    if (n === 4) s += `<text x="250" y="150" text-anchor="middle" class="k b">transgene bacterie</text>`;
    if (n >= 5) [0, 1, 2, 3].forEach((i) => { s += bact(52 + i * 78, 176, true, n >= 6); });
    if (n >= 5) s += BIO.pijl(250, 138, 250, 152, "");
    if (n >= 6) s += `<text x="170" y="214" text-anchor="middle" class="k pb b">● insuline: zuiveren en gebruiken als medicijn</text>`;
    return BIO.svg(340, 222, "Recombinant-DNA-techniek, stap " + n, s);
  }
  function pcrScene(n) {
    const duplex = (x, y, w, open, primers, nieuw) => {
      let d = `<line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" class="s dik"/><line x1="${x}" y1="${y + (open ? 26 : 8)}" x2="${x + w}" y2="${y + (open ? 26 : 8)}" class="s dik"/>`;
      if (primers) d += `<line x1="${x}" y1="${y + 7}" x2="${x + (nieuw ? w : 16)}" y2="${y + 7}" class="nieuw dik"/><line x1="${x + (nieuw ? 0 : w - 16)}" y1="${y + 19}" x2="${x + w}" y2="${y + 19}" class="nieuw dik"/>`;
      return d;
    };
    let s = `<rect x="6" y="6" width="328" height="34" rx="10" class="zacht"/><text x="170" y="28" text-anchor="middle" class="b">${["", "start: alles in één buisje", "± 95 °C", "± 55 °C", "± 72 °C", "volgende cycli"][n] || "PCR"}</text>`;
    if (n <= 1) s += duplex(110, 80, 120, false) + (n === 1 ? `<line x1="40" y1="120" x2="56" y2="120" class="nieuw dik"/><line x1="70" y1="132" x2="86" y2="132" class="nieuw dik"/><text x="64" y="150" text-anchor="middle" class="k tn">primers</text><circle cx="160" cy="124" r="4" class="vnieuw"/><circle cx="176" cy="134" r="4" class="vnieuw"/><circle cx="150" cy="138" r="4" class="vnieuw"/><text x="164" y="156" text-anchor="middle" class="k tn">nucleotiden</text><ellipse cx="270" cy="128" rx="18" ry="13" class="zacht"/><text x="270" y="156" text-anchor="middle" class="k pa">DNA-polymerase</text>` : `<text x="170" y="120" text-anchor="middle" class="k m">één stukje DNA uit een monster</text>`);
    if (n === 2) s += duplex(110, 70, 120, true) + `<text x="170" y="124" text-anchor="middle" class="k">waterstofbruggen breken: twee losse strengen</text>`;
    if (n === 3) s += duplex(110, 70, 120, true, true, false) + `<text x="170" y="124" text-anchor="middle" class="k">primers hechten aan het begin van elk stuk</text>`;
    if (n === 4) s += duplex(110, 62, 120, true, true, true).replace(/y1="88" x2="230" y2="88"/, 'y1="88" x2="230" y2="88"') + `<text x="170" y="124" text-anchor="middle" class="k">DNA-polymerase bouwt verder: 2 moleculen</text>`;
    if (n >= 5) { [0, 1, 2, 3, 4, 5, 6, 7].forEach((i) => { s += duplex(24 + (i % 4) * 78, 64 + Math.floor(i / 4) * 34, 58, false); }); s += `<text x="170" y="144" text-anchor="middle" class="k">na 3 cycli: 8 moleculen, na elke cyclus 2 × zoveel</text>`; }
    return BIO.svg(340, 162, "PCR, stap " + n, s);
  }
  const TECH = {
    rec: {
      naam: "Insuline uit bacteriën", scene: recScene, intro: "Mensen met diabetes type 1 hebben insuline nodig. Laat bacteriën menselijke insuline maken met de recombinant-DNA-techniek.",
      stappen: [
        ["Knip het gen voor insuline uit menselijk DNA", ["Maak de celkern van de bacterie open", "Meng menselijke cellen met bacteriën"], "Je hebt eerst het gen zelf nodig. Een enzym knipt het DNA op vaste plekken door (restrictie-enzym)."],
        ["Haal een plasmide uit een bacterie en knip het open", ["Knip het chromosoom van de bacterie in stukken", "Zet het gen los in het cytoplasma van de bacterie"], "Een plasmide is een klein ringvormig DNA-molecuul van een bacterie. Hetzelfde enzym knipt de ring open, zodat de uiteinden op het gen passen."],
        ["Plak het gen in het open plasmide", ["Plak het gen aan een ribosoom", "Vertaal het gen eerst naar aminozuren"], "Een ander enzym (ligase) plakt het gen in de ring. Het resultaat heet een recombinant plasmide: DNA van twee soorten in één molecuul."],
        ["Breng het recombinante plasmide in een bacterie", ["Spuit het plasmide in bij de patiënt", "Breng het plasmide in een menselijke eicel"], "De bacterie met het menselijke gen is nu een transgeen organisme: genetisch gemodificeerd."],
        ["Laat de bacteriën zich delen in een kweekvat", ["Verhit de bacteriën tot 95 °C", "Haal de plasmiden weer uit de bacteriën"], "Bij elke deling worden ook de plasmiden gekopieerd. Zo krijg je snel miljarden bacteriën met het gen."],
        ["De bacteriën maken insuline; zuiver die uit de kweek", ["Geef de patiënt de bacteriën als medicijn", "Wacht tot de bacteriën menselijke cellen worden"], "De bacteriën lezen het gen af (transcriptie en translatie) en maken het menselijke eiwit. De genetische code is voor bijna alle organismen gelijk."]
      ],
      slot: ["Waarom kan een bacterie een menselijk gen aflezen en het juiste eiwit maken?", ["De genetische code is in bijna alle organismen hetzelfde", "Bacteriën hebben dezelfde chromosomen als mensen", "Het plasmide bevat ook menselijke ribosomen", "De bacterie verandert door het gen in een menselijke cel"], "Hetzelfde codon betekent in een bacterie hetzelfde aminozuur als in een mens. Daardoor levert hetzelfde gen hetzelfde eiwit op."]
    },
    pcr: {
      naam: "DNA vermeerderen met PCR", scene: pcrScene, intro: "Op een plaats delict is maar een spoortje DNA gevonden. Met PCR maak je er in korte tijd miljoenen kopieën van.",
      stappen: [
        ["Doe het DNA, primers, losse nucleotiden en DNA-polymerase bij elkaar", ["Doe het DNA bij ribosomen en aminozuren", "Zet het DNA in een bacterie"], "PCR is DNA-replicatie in een buisje. Je hebt dezelfde ingrediënten nodig als in de cel: een voorbeeldstreng, bouwstenen en het enzym DNA-polymerase. Primers zijn korte stukjes DNA die het beginpunt aangeven."],
        ["Verhit tot ongeveer 95 °C", ["Koel af tot ongeveer 5 °C", "Voeg een enzym toe dat DNA in stukken knipt"], "Door de hitte breken de waterstofbruggen tussen de basenparen: de twee strengen laten los."],
        ["Koel af tot ongeveer 55 °C, zodat de primers hechten", ["Verhit verder tot het DNA verdampt", "Wacht tot de strengen vanzelf weer aan elkaar zitten"], "Bij lagere temperatuur binden de primers door basenparing aan de enkele strengen."],
        ["Verwarm tot ongeveer 72 °C: DNA-polymerase verlengt de primers", ["Voeg mRNA toe voor de translatie", "Verhit weer tot 95 °C voordat er iets gebouwd is"], "DNA-polymerase koppelt losse nucleotiden aan de primers. Van één molecuul zijn er nu twee gemaakt."],
        ["Herhaal de cyclus tientallen keren", ["Stop: twee moleculen zijn genoeg", "Begin opnieuw met een nieuw monster"], "Elke cyclus verdubbelt de hoeveelheid DNA: 2, 4, 8, 16 ... Na 30 cycli heb je ruim een miljard kopieën."]
      ],
      slot: null
    }
  };
  TW.widget("biotech-stappen", {
    titel: "Biotechniek in stappen", icoon: "🧫",
    uitleg: "Voer zelf een DNA-techniek uit. Kies steeds de juiste volgende stap; de tekening laat zien wat er gebeurt.",
    maak(el, api) {
      let welk = "rec", n, fouten, opties, fb, slot, klaarSet = {};
      function start(w) { welk = w; n = 0; fouten = 0; fb = null; slot = false; mix(); teken(); }
      function mix() { const T = TECH[welk]; if (n < T.stappen.length) opties = api.shuffle([{ t: T.stappen[n][0], g: 1 }].concat(T.stappen[n][1].map((t) => ({ t, g: 0 })))); }
      function teken() {
        const T = TECH[welk], af = n >= T.stappen.length;
        let h = `<div class="tabs">${Object.keys(TECH).map((k) => `<button type="button" class="btn ${k === welk ? "aan" : ""}" data-t="${k}">${TECH[k].naam}${klaarSet[k] ? " ✓" : ""}</button>`).join("")}</div>
          ${n === 0 && !fb ? `<p>${T.intro}</p>` : ""}<div class="score-r"><span>stap ${Math.min(n + 1, T.stappen.length)} van ${T.stappen.length}</span><span>fouten: ${fouten}</span></div>
          <div class="${fb && fb.ok && !BIO.W.rustig() ? "pop" : ""}">${T.scene(n)}</div>
          ${fb ? `<div class="fbk ${fb.ok ? "ok" : "nok"}">${fb.t}</div>` : ""}`;
        if (!af) h += `<p class="opdracht">Wat is de volgende stap?</p><div class="kolom">${opties.map((o, i) => `<button type="button" class="btn" data-o="${i}">${o.t}</button>`).join("")}</div>`;
        else h += `<div class="sub"></div>`;
        el.innerHTML = h;
        el.querySelectorAll("[data-t]").forEach((b) => (b.onclick = () => start(b.dataset.t)));
        el.querySelectorAll("[data-o]").forEach((b) => (b.onclick = () => {
          const o = opties[+b.dataset.o];
          if (o.g) { fb = { ok: true, t: `<b>Goed.</b> ${T.stappen[n][2]}` }; n++; mix(); }
          else { fouten++; fb = { ok: false, t: "Dat is niet de volgende stap. Kijk naar de tekening: wat heb je al, en wat ontbreekt nog?" }; }
          teken();
        }));
        const sub = el.querySelector(".sub");
        if (sub) {
          const einde = () => { klaarSet[welk] = 1; api.klaar(); const ander = welk === "rec" ? "pcr" : "rec"; sub.insertAdjacentHTML("beforeend", `<div class="knoppen"><button type="button" class="btn" data-a="weer">Opnieuw</button><button type="button" class="btn primary" data-a="ander">${TECH[ander].naam} →</button></div>`); sub.querySelector("[data-a=weer]").onclick = () => start(welk); sub.querySelector("[data-a=ander]").onclick = () => start(ander); };
          if (welk === "pcr") {
            const c = api.R.int(4, 10), goed = 2 ** c, opt = [goed, 2 * c, c * c, 2 ** (c - 1)].map((x) => api.nl(x)).filter((v, i, a) => a.indexOf(v) === i);
            while (opt.length < 4) opt.push(api.nl(goed * 2 + opt.length));
            BIO.W.keuze(sub, api, `Je begint met 1 DNA-molecuul. Hoeveel moleculen heb je na ${c} cycli?`, opt, [`Elke cyclus verdubbelt het aantal.`, `Na ${c} cycli: 2^{${c}} = ${api.nl(goed)} moleculen.`], einde);
          } else BIO.W.keuze(sub, api, T.slot[0], T.slot[1], T.slot[2], einde);
        }
      }
      start("rec");
    }
  });
})();
