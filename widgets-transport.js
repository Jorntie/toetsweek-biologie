// Widgets van thema 11 Transport: hart-lab, bloedroute, vaten-druk.
// Tekeningen komen uit figs-transport.js (BIO.hart, BIO.somloop, BIO.drukPlot, BIO.haarvat).
(function () {
  "use strict";
  const BIO = window.BIO, W = BIO.W;
  const tabs = (lijst, aan) => `<div class="tabs">${lijst.map(([k, t]) => `<button type="button" class="btn ${k === aan ? "aan" : ""}" data-tab="${k}">${t}</button>`).join("")}</div>`;

  // ================= Het hart =================
  const FASEN = [
    { n: "hartpauze", hk: "open", hmk: "dicht", naar: "de boezems en de kamers", duur: 0.4 },
    { n: "boezems trekken samen", hk: "open", hmk: "dicht", naar: "de kamers", duur: 0.1 },
    { n: "kamers trekken samen", hk: "dicht", hmk: "open", naar: "de slagaders (aorta en longslagader)", duur: 0.3 }
  ];
  TW.widget("hart-lab", {
    titel: "Hart-lab", icoon: "🫀",
    uitleg: "Benoem de delen van het hart door erop te tikken, en herken de fasen van de hartcyclus aan de kleppen en de bloedstroom.",
    maak(el, api) {
      let tab = "naam", timers = [];
      const stop = () => { timers.forEach(clearTimeout); timers = []; };
      api.opruimen(stop);
      function kies(t) { stop(); tab = t; if (t === "naam") naamStart(); else if (t === "kijk") kijk(); else cyclusStart(); }

      // ---- benoemen ----
      let rij, i, fout, foutHier;
      function naamStart() { rij = api.shuffle(BIO.HARTDELEN.map((d) => d[0])); i = 0; fout = 0; foutHier = false; naam(); }
      function naam(fb, ok) {
        const af = i >= rij.length, d = BIO.HARTDELEN.find((x) => x[0] === rij[i]);
        el.innerHTML = tabs([["naam", "Benoemen"], ["kijk", "Cyclus"], ["fase", "Welke fase?"]], tab) +
          `<div class="score-r"><span>${af ? "klaar" : `deel ${i + 1} van ${rij.length}`}</span><span>fouten: ${fout}</span></div>` +
          (af ? "" : `<p class="opdracht">Tik op: <b>${d[1]}</b></p>`) +
          `<div class="hartvak">${BIO.hart({ hot: !af })}</div><div class="fbk ${ok == null ? "" : ok ? "ok" : "nok"}">${fb || ""}</div>` +
          (af ? `<button type="button" class="btn primary big" data-a="weer">Nog een keer</button>` : "");
        bindTabs();
        if (af) { el.querySelector("[data-a=weer]").onclick = naamStart; return; }
        el.querySelectorAll(".hot").forEach((h) => (h.onclick = () => {
          if (h.dataset.k === rij[i]) {
            el.querySelectorAll(`.hot[data-k="${rij[i]}"]`).forEach((x) => x.classList.add("goed"));
            const naamGoed = d[1]; i++; foutHier = false;
            const t = setTimeout(() => naam(`Goed: ${naamGoed}.`, true), 450); timers.push(t);
            if (i >= rij.length) api.klaar();
          } else {
            fout++; h.classList.add("mis"); el.querySelector(".score-r span:last-child").textContent = `fouten: ${fout}`;
            const fout1 = BIO.HARTDELEN.find((x) => x[0] === h.dataset.k);
            if (foutHier) el.querySelectorAll(`.hot[data-k="${rij[i]}"]`).forEach((x) => x.classList.add("toon"));
            const f = el.querySelector(".fbk"); f.className = "fbk nok";
            f.innerHTML = `Je tikte op: ${fout1 ? fout1[1] : "een ander deel"}. ${foutHier ? "Het gele vlak is het goede deel." : "Denk eraan: de rechterhelft van het hart staat links in de tekening."}`;
            foutHier = true;
            const t = setTimeout(() => h.classList.remove("mis"), 600); timers.push(t);
          }
        }));
      }
      // ---- bekijken ----
      let fase = 0, speelt = false;
      function kijk() {
        el.innerHTML = tabs([["naam", "Benoemen"], ["kijk", "Cyclus"], ["fase", "Welke fase?"]], tab) +
          `<div class="hartvak">${BIO.hart({ tekst: true })}</div><div class="uit faseuit"></div>
          <div class="knoppen"><button type="button" class="btn" data-a="vorig">◀ vorige</button><button type="button" class="btn primary" data-a="speel">${W.rustig() ? "volgende ▶" : "▶ afspelen"}</button><button type="button" class="btn" data-a="volg">volgende ▶</button></div>
          <p class="klein">De kamers en boezems worden kleiner als ze samentrekken. De pijlen geven de bloedstroom aan. In het echt duurt een hartslag 0,8 s; hier gaat het drie keer zo langzaam.</p>`;
        bindTabs();
        const svgEl = el.querySelector(".hartvak svg");
        const toon = () => {
          BIO.hartFase(svgEl, fase); const F = FASEN[fase];
          el.querySelector(".faseuit").innerHTML = `<b>${F.n}</b> (${api.nl(F.duur)} s)<br>hartkleppen <b>${F.hk}</b> · halvemaanvormige kleppen <b>${F.hmk}</b><br>bloed stroomt naar ${F.naar}`;
        };
        const volgende = () => { fase = fase === 0 ? 1 : fase === 1 ? 2 : 0; toon(); };
        const speel = () => { stop(); if (!speelt) return; volgende(); timers.push(setTimeout(speel, FASEN[fase].duur * 3000)); };
        el.querySelector("[data-a=volg]").onclick = () => { speelt = false; stop(); volgende(); };
        el.querySelector("[data-a=vorig]").onclick = () => { speelt = false; stop(); fase = fase === 0 ? 2 : fase - 1; toon(); };
        el.querySelector("[data-a=speel]").onclick = (e) => {
          if (W.rustig()) { volgende(); return; }
          speelt = !speelt; e.target.textContent = speelt ? "❚❚ pauze" : "▶ afspelen";
          if (speelt) timers.push(setTimeout(speel, FASEN[fase].duur * 3000)); else stop();
        };
        toon();
      }
      // ---- fase herkennen ----
      let ronde, goed, f;
      function cyclusStart() { ronde = 0; goed = 0; cyclus(); }
      function cyclus() {
        f = api.R.int(0, 2);
        el.innerHTML = tabs([["naam", "Benoemen"], ["kijk", "Cyclus"], ["fase", "Welke fase?"]], tab) +
          `<div class="score-r"><span>vraag ${ronde + 1} van 6</span><span>goed: ${goed}</span></div>
          <div class="hartvak">${BIO.hart({ tekst: true })}</div><div class="sub"></div>`;
        bindTabs();
        BIO.hartFase(el.querySelector(".hartvak svg"), f);
        const F = FASEN[f], ander = FASEN.filter((x, j) => j !== f).map((x) => x.n);
        const vraag2 = api.R.kies(["hk", "hmk"]);
        W.keuze(el.querySelector(".sub"), api, "Welke fase van de hartcyclus zie je? Kijk naar de kleppen, de pijlen en welke ruimtes kleiner zijn.", [F.n].concat(ander).concat(["alle kleppen dicht: het hart staat stil"]), `Dit is **${F.n}**: hartkleppen ${F.hk}, halvemaanvormige kleppen ${F.hmk}; het bloed stroomt naar ${F.naar}.`, (juist1) => {
          if (juist1) goed++;
          const sub2 = document.createElement("div"); el.appendChild(sub2);
          const naamK = vraag2 === "hk" ? "de hartkleppen (tussen boezem en kamer)" : "de halvemaanvormige kleppen";
          const st = F[vraag2];
          W.keuze(sub2, api, `Zijn ${naamK} nu open of dicht?`, [st, st === "open" ? "dicht" : "open"], `Tijdens ${F.n} zijn ${naamK} ${st}. Hartkleppen en halvemaanvormige kleppen staan altijd tegengesteld.`, (juist2) => {
            if (juist2) goed++;
            ronde++;
            sub2.insertAdjacentHTML("beforeend", `<button type="button" class="btn primary big">${ronde < 6 ? "Volgende" : "Uitslag"}</button>`);
            sub2.querySelector("button.big").onclick = () => {
              if (ronde < 6) return cyclus();
              api.klaar();
              el.querySelector(".sub").innerHTML = ""; sub2.remove();
              el.querySelector(".hartvak").insertAdjacentHTML("afterend", `<div class="fbk ${goed >= 9 ? "ok" : ""}"><b>${goed} van 12 goed.</b> ${goed >= 9 ? "Je kent de hartcyclus." : "Bekijk de cyclus nog eens met de knoppen bij 'Hartcyclus bekijken'."}</div><button type="button" class="btn primary big" data-a="opnieuw">Opnieuw</button>`);
              el.querySelector("[data-a=opnieuw]").onclick = cyclusStart;
            };
          });
        });
      }
      function bindTabs() { el.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => kies(b.dataset.tab))); }
      kies("naam");
    }
  });

  // ================= Bloedroute =================
  const ROUTES = [["darm", "hersenen"], ["benen", "longen"], ["hersenen", "benen"], ["longen", "nieren"], ["darm", "longen"], ["nieren", "hersenen"], ["lever", "benen"], ["benen", "darm"], ["hersenen", "lever"]];
  const naamVan = (k) => BIO.somloopNaam(k);
  TW.widget("bloedroute", {
    titel: "Bloedroute", icoon: "🩸",
    uitleg: "Volg een rode bloedcel door de bloedsomloop: tik in de goede volgorde alle bloedvaten, hartdelen en organen waar hij langskomt.",
    maak(el, api) {
      let A, B, route, i, fout, vorige = -1;
      const { KN, VERB } = BIO.SOMLOOP;
      function start() {
        let r; do { r = api.R.int(0, ROUTES.length - 1); } while (r === vorige); vorige = r;
        [A, B] = ROUTES[r]; route = BIO.route(A, B); i = 1; fout = 0; teken();
      }
      function teken(fb, ok) {
        const af = i >= route.length;
        el.innerHTML = `<p class="opdracht">Een rode bloedcel gaat van de <b>${naamVan(A)}</b> naar de <b>${naamVan(B)}</b> (kortste weg). Tik in de goede volgorde wat hij tegenkomt.</p>
          <div class="score-r"><span>${af ? "aangekomen!" : `stap ${i} van ${route.length - 1}`}</span><span>fouten: ${fout}</span></div>
          <div class="fbk ${ok == null ? "" : ok ? "ok" : "nok"}">${fb || ""}</div>
          <div class="somvak">${BIO.somloop({ tik: !af })}</div><div class="sub"></div>`;
        const svgEl = el.querySelector(".somvak svg");
        const knoop = (k) => svgEl.querySelector(`.knoop[data-k="${k}"]`);
        knoop(A).classList.add("start"); if (!af) knoop(B).classList.add("doel");
        route.slice(1, i).forEach((k, j) => { const g = knoop(k); g.classList.add("gedaan"); g.querySelector(".volg").textContent = j + 1; });
        if (af) return einde(svgEl);
        svgEl.querySelectorAll(".knoop").forEach((g) => (g.onclick = () => tik(g.dataset.k, g)));
      }
      function tik(k, g) {
        if (k === route[i]) { i++; teken(i >= route.length ? null : `Goed: ${naamVan(k)}.`, true); return; }
        if (route.slice(0, i).includes(k)) return;
        fout++; g.classList.add("mis"); W.schud(g);
        const hier = route[i - 1], kan = VERB.filter((v) => v[0] === hier).map((v) => naamVan(v[1]));
        const f = el.querySelector(".fbk"); f.className = "fbk nok";
        const nk = naamVan(k); f.innerHTML = `${nk[0].toUpperCase() + nk.slice(1)} is niet de volgende stap. De bloedcel is nu bij: <b>${naamVan(hier)}</b>. ${kan.length > 1 ? `Van hier kan hij naar: ${kan.join(", ")}. Welke brengt hem het snelst naar de ${naamVan(B)}?` : `Van hier gaat het bloed maar één kant op.`}`;
        setTimeout(() => g.classList.remove("mis"), 700);
      }
      function einde(svgEl) {
        const sub = el.querySelector(".sub");
        const vaten = route.filter((k) => KN[k].soort === "vat" || KN[k].soort === "za" || KN[k].soort === "zr");
        const k = api.R.kies(vaten), rijk = ["la", "aorta", "lb", "lk"].includes(k);
        sub.innerHTML = `<p class="klein">Route: ${route.map(naamVan).join(" → ")}.</p><div class="v2"></div>`;
        W.keuze(sub.querySelector(".v2"), api, `Stroomt er in de/het **${naamVan(k)}** zuurstofrijk of zuurstofarm bloed?`, rijk ? ["zuurstofrijk", "zuurstofarm"] : ["zuurstofarm", "zuurstofrijk"],
          rijk ? "Na de longen is het bloed zuurstofrijk, tot het in de organen zuurstof afgeeft." : "Dit bloed komt uit de organen (of gaat naar de longen) en heeft zuurstof afgegeven. Let op: de longslagader is een slagader met zuurstofarm bloed.", () => {
            api.klaar();
            sub.insertAdjacentHTML("beforeend", `<button type="button" class="btn primary big">Nieuwe route</button>`);
            sub.querySelector("button.big").onclick = start;
          });
        el.querySelector(".fbk").className = "fbk ok";
        el.querySelector(".fbk").innerHTML = `<b>Aangekomen in de ${naamVan(B)}</b> met ${fout} fout${fout === 1 ? "" : "en"}.`;
      }
      start();
    }
  });

  // ================= Bloedvaten en druk =================
  const KENMERK = [
    ["dikke, stevige en elastische wand", "P", "Een slagader moet de drukstoten van het hart opvangen."],
    ["kleppen die terugstromen voorkomen", "Q", "In aders is de druk laag; kleppen houden het bloed op koers naar het hart."],
    ["wand van één laag cellen", "R", "Zo dun, zodat stoffen makkelijk door de wand gaan."],
    ["hier vindt de uitwisseling met weefselvloeistof plaats", "R", "Alleen door de dunne haarvatwand kunnen stoffen het weefsel in en uit."],
    ["het bloed stroomt stootsgewijs; je voelt hier de polsslag", "P", "De elastische wand rekt bij elke hartslag uit."],
    ["voert bloed naar het hart toe", "Q", "Aders voeren bloed naar het hart, slagaders ervan af."],
    ["de hoogste bloeddruk", "P", "De druk is het hoogst vlak na het hart, in de slagaders."],
    ["de laagste stroomsnelheid", "R", "De totale doorsnede van alle haarvaten samen is enorm groot."],
    ["wijde holte en een dunne, slappe wand", "Q", "Aders hoeven weinig druk te weerstaan."],
    ["voert bloed van het hart naar de organen", "P", "Slagaders gaan van het hart af."]
  ];
  const DOELEN = [
    ["de hoogste bloeddruk", (x) => x < 1, "De druk is het hoogst in de aorta, direct na de linkerkamer."],
    ["de laagste stroomsnelheid", (x) => x >= 3 && x < 4, "In de haarvaten stroomt het bloed het langzaamst: hun totale doorsnede is het grootst."],
    ["de grootste totale doorsnede", (x) => x >= 3 && x < 4, "Er zijn miljarden haarvaten; samen hebben ze een veel grotere doorsnede dan de aorta."],
    ["de plek waar de bloeddruk het sterkst daalt", (x) => x >= 2 && x < 3, "In de nauwe slagadertjes is de weerstand groot: daar daalt de druk het snelst."],
    ["de laagste bloeddruk", (x) => x >= 6, "Vlak voor het hart, in de holle aders, is de druk het laagst."],
    ["het vat waar de polsslag nog het sterkst is", (x) => x < 2, "In de grote slagaders schommelt de druk het meest tussen boven- en onderdruk."]
  ];
  const SCEN = [
    { t: "Hoge bloeddruk", q: "De bloeddruk in de haarvaten is veel hoger dan normaal. Wat gebeurt er met de hoeveelheid vocht die uit de haarvaten gaat?", a: ["Die wordt groter", "Die wordt kleiner", "Die blijft gelijk"], zet: { bd: 46, eiwit: 25, dicht: false }, u: "Een hogere bloeddruk perst meer vocht naar buiten; de lymfevaten kunnen het overschot niet meer afvoeren: oedeem." },
    { t: "Eiwittekort", q: "Door eiwittekort in de voeding bevat het bloed weinig plasma-eiwitten. Wat gebeurt er met de hoeveelheid vocht die aan het einde van het haarvat terugstroomt?", a: ["Die wordt kleiner", "Die wordt groter", "Die blijft gelijk"], zet: { bd: 37, eiwit: 15, dicht: false }, u: "Minder eiwitten: lagere osmotische waarde van het bloed, dus minder aanzuiging. Er stroomt minder terug: hongeroedeem." },
    { t: "Lymfevat dicht", q: "Wormen blokkeren de lymfevaten (olifantsziekte). Wat gebeurt er met de weefselvloeistof?", a: ["Die hoopt zich op: oedeem", "Die gaat volledig terug in de haarvaten", "Er verandert niets"], zet: { bd: 37, eiwit: 25, dicht: true }, u: "Uit de haarvaten gaat iets meer vocht dan erin terugkomt. Zonder lymfeafvoer hoopt dat overschot zich op." },
    { t: "Longhaarvat", q: "In de kleine bloedsomloop is de bloeddruk laag. Wat betekent dat voor de vochtafgifte uit de longhaarvaten?", a: ["Er gaat bijna geen vocht uit", "Er gaat extra veel vocht uit", "Er gaat evenveel vocht uit als elders"], zet: { bd: 22, eiwit: 25, dicht: false }, u: "De bloeddruk is overal lager dan de osmotische aanzuiging: de longblaasjes blijven droog." }
  ];
  TW.widget("vaten-druk", {
    titel: "Bloedvaten en druk", icoon: "🩺",
    uitleg: "Herken slagader, ader en haarvat, onderzoek hoe bloeddruk en stroomsnelheid veranderen langs het vaatstelsel, en ontdek hoe weefselvloeistof en oedeem ontstaan.",
    maak(el, api) {
      let tab = "vat", gedaan = {};
      const deelKlaar = (k) => { gedaan[k] = 1; if (Object.keys(gedaan).length >= 2) api.klaar(); };
      const kop = () => tabs([["vat", "Drie vaten"], ["druk", "Bloeddruk"], ["haar", "Haarvat"]], tab);
      function kies(t) { tab = t; if (t === "vat") vatStart(); else if (t === "druk") drukStart(); else haarStart(); }
      const bind = () => el.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => kies(b.dataset.tab)));

      // ---- drie vaten ----
      let rij, n, goed;
      function vatStart() { rij = api.shuffle(KENMERK); n = 0; goed = 0; vat(); }
      function vat(fb, ok) {
        const af = n >= 6;
        el.innerHTML = kop() + `<div class="score-r"><span>${af ? "klaar" : `kenmerk ${n + 1} van 6`}</span><span>goed: ${goed}</span></div>${TW._S.figs.vaten(true)}
          ${af ? `<div class="fbk ${goed >= 5 ? "ok" : ""}"><b>${goed} van 6 goed.</b> P is een slagader, Q een ader en R een haarvat.</div><button type="button" class="btn primary big" data-a="weer">Nieuwe kenmerken</button>`
            : `<p class="opdracht">Bij welk bloedvat hoort: <b>${rij[n][0]}</b>?</p><div class="knoppen">${["P", "Q", "R"].map((x) => `<button type="button" class="btn" data-v="${x}">${x}</button>`).join("")}</div><div class="fbk ${ok == null ? "" : ok ? "ok" : "nok"}">${fb || ""}</div>`}`;
        bind();
        if (af) { deelKlaar("vat"); el.querySelector("[data-a=weer]").onclick = vatStart; return; }
        el.querySelectorAll("[data-v]").forEach((b) => (b.onclick = () => {
          const k = rij[n], juist = b.dataset.v === k[1], naam = { P: "de slagader (P)", Q: "de ader (Q)", R: "het haarvat (R)" }[k[1]];
          if (juist) goed++;
          n++; vat(`${juist ? "<b>Goed.</b>" : `<b>Niet goed:</b> dit hoort bij ${naam}.`} ${k[2]}`, juist);
        }));
      }
      // ---- bloeddruk ----
      let doelen, d, x = 0.5, dGoed;
      function drukStart() { doelen = api.shuffle(DOELEN).slice(0, 4); d = 0; dGoed = 0; druk(); }
      function druk(fb, ok) {
        const af = d >= doelen.length, D = BIO.DRUK, X = BIO.drukX;
        el.innerHTML = kop() + `<div class="score-r"><span>${af ? "klaar" : `opdracht ${d + 1} van ${doelen.length}`}</span><span>goed: ${dGoed}</span></div>
          ${af ? "" : `<p class="opdracht">Sleep de cirkel naar ${doelen[d][0]}.</p>`}
          <div class="drukvak">${BIO.drukPlot({ marker: x })}</div><div class="uit drukuit"></div>
          ${af ? `<button type="button" class="btn primary big" data-a="weer">Nieuwe opdrachten</button>` : `<button type="button" class="btn primary big" data-a="check">Controleer</button>`}
          <div class="fbk ${ok == null ? "" : ok ? "ok" : "nok"}">${fb || ""}</div>`;
        bind();
        const svgEl = el.querySelector(".drukvak svg"), greep = svgEl.querySelector("#mgreep"), lijn = svgEl.querySelector("#mlijn");
        const lees = () => {
          el.querySelector(".drukuit").innerHTML = `<b>${D.vat(x)}</b><br>bloeddruk: ${pijlTekst(D.druk(x))} · stroomsnelheid: ${pijlTekst(D.snelheid(x))} · totale doorsnede: ${pijlTekst(D.doorsnede(x))}`;
        };
        TW.sleep(svgEl, greep, (px) => {
          x = Math.max(0.02, Math.min(6.98, X.vanPx(px)));
          greep.setAttribute("cx", X.naarPx(x)); greep.setAttribute("cy", X.Y(D.druk(x)));
          lijn.setAttribute("x1", X.naarPx(x)); lijn.setAttribute("x2", X.naarPx(x));
          lees();
        });
        lees();
        if (af) { deelKlaar("druk"); el.querySelector("[data-a=weer]").onclick = drukStart; return; }
        el.querySelector("[data-a=check]").onclick = () => {
          const doel = doelen[d], juist = doel[1](x);
          if (juist) dGoed++;
          d++; druk(`${juist ? "<b>Goed.</b>" : `<b>Niet goed.</b> Je stond bij: ${D.vat(x)}.`} ${doel[2]}`, juist);
        };
      }
      const pijlTekst = (v) => (v > 75 ? "zeer hoog" : v > 45 ? "hoog" : v > 20 ? "middel" : v > 6 ? "laag" : "zeer laag");

      // ---- haarvat ----
      let st = { bd: 37, eiwit: 25, dicht: false }, s = 0, sGoed = 0;
      function haarStart() { s = 0; sGoed = 0; st = { bd: 37, eiwit: 25, dicht: false }; haar(); }
      function haar() {
        const af = s >= SCEN.length;
        el.innerHTML = kop() + `<div class="haarvak"></div>
          <label class="schuif"><span>Bloeddruk aan het begin</span><output id="obd"></output><input id="bd" type="range" min="20" max="50" step="1" value="${st.bd}"></label>
          <label class="schuif"><span>Osmotische aanzuiging (plasma-eiwitten)</span><output id="oe"></output><input id="ei" type="range" min="10" max="35" step="1" value="${st.eiwit}"></label>
          <label class="vink"><input id="dicht" type="checkbox" ${st.dicht ? "checked" : ""}> lymfevat geblokkeerd</label>
          <div class="uit haaruit"></div>
          <div class="score-r"><span>${af ? "alle situaties gedaan" : `situatie ${s + 1} van ${SCEN.length}: ${SCEN[s].t}`}</span><span>goed: ${sGoed}</span></div><div class="sub"></div>`;
        bind();
        const tekenH = () => {
          el.querySelector(".haarvak").innerHTML = BIO.haarvat({ bd: st.bd, eiwit: st.eiwit, lymfeDicht: st.dicht });
          const c = BIO.haarvatCalc(st.bd, st.eiwit, st.dicht);
          el.querySelector("#obd").textContent = st.bd; el.querySelector("#oe").textContent = st.eiwit;
          el.querySelector(".haaruit").innerHTML = `vocht eruit: <b>${api.nl(Math.round(c.uit * 10) / 10)}</b> · vocht terug: <b>${api.nl(Math.round(c.terug * 10) / 10)}</b> · afvoer via lymfe: <b>${api.nl(Math.round(c.lymfe * 10) / 10)}</b><br>${c.oedeem ? '<b style="color:var(--bad)">oedeem: er hoopt zich weefselvloeistof op</b>' : "geen oedeem: het overschot wordt afgevoerd"}`;
        };
        el.querySelector("#bd").oninput = (e) => { st.bd = +e.target.value; tekenH(); };
        el.querySelector("#ei").oninput = (e) => { st.eiwit = +e.target.value; tekenH(); };
        el.querySelector("#dicht").onchange = (e) => { st.dicht = e.target.checked; tekenH(); };
        tekenH();
        const sub = el.querySelector(".sub");
        if (af) { deelKlaar("haar"); sub.innerHTML = `<p class="klein">Probeer zelf: bij welke combinatie ontstaat net geen oedeem?</p><button type="button" class="btn big" data-a="weer">Situaties opnieuw</button>`; sub.querySelector("[data-a=weer]").onclick = haarStart; return; }
        const S = SCEN[s];
        W.keuze(sub, api, S.q, S.a, S.u, (juist) => {
          if (juist) sGoed++;
          st = Object.assign({}, S.zet);
          el.querySelector("#bd").value = st.bd; el.querySelector("#ei").value = st.eiwit; el.querySelector("#dicht").checked = st.dicht;
          tekenH();
          sub.insertAdjacentHTML("beforeend", `<p class="klein">De schuiven staan nu op deze situatie: kijk naar de pijlen en de grafiek.</p><button type="button" class="btn primary big">Volgende situatie</button>`);
          sub.querySelector("button.big").onclick = () => { s++; haar(); };
        });
      }
      kies("vat");
    }
  });
})();
