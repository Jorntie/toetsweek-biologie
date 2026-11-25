// Thema 3 Genetica, basisstof 5 t/m 7 (Biologie voor jou MAX havo 4A), met een compact voorkennisonderdeel.
// Eigen tekst; genotypen in examennotatie (X^{A}, I^{A}, A^{r}A^{w}). Kansen komen uit de kruisingsmotor (genetica.js).
(function () {
  "use strict";
  const G = BIO.GEN;
  // beschrijving van een nakomeling met fenotype f
  function wieMet(f, wie) {
    const m = f.match(/^(.*) \((zoon|dochter)\)$/);
    if (m) return m[1] === "gezond" ? `een gezonde ${m[2]}` : m[1].startsWith("niet ") ? `een ${m[2]} die ${m[1]} is` : m[1] === "kleurenblind" ? `een kleurenblinde ${m[2]}` : `een ${m[2]} met ${m[1]}`;
    if (f === "gezond") return `een gezond ${wie}`;
    return `een ${wie} met ${f}`;
  }
  function kansOpgave(R, type, vast) {
    const ctx = R.kies(G.C[type]), paar = vast || R.kies(G.PAREN[type]), k = G.kruis(type, ctx, paar[0], paar[1]);
    const fen = Object.keys(k.feno).filter((f) => f !== "sterft"), f = R.kies(fen), p = (100 * k.feno[f]) / k.levend;
    const t = G.T[type], tm = t.toon(paar[0]), tv = t.toon(paar[1]);
    const genoRij = Object.keys(k.geno).map((g) => `${g} (${k.geno[g]}×)`).join(", ");
    const stappen = [
      `P: ${tm} × ${tv}`,
      `Geslachtscellen: ${k.m.map(k.gameet).join(" en ")} × ${k.v.map(k.gameet).join(" en ")}`,
      k.n === 1 ? `Elke ouder maakt maar één soort geslachtscel, dus alle nakomelingen krijgen genotype ${Object.keys(k.geno)[0]}.` : `Kruisingsschema met ${k.n} vakjes: ${genoRij}`
    ];
    if (k.levend < k.n) stappen.push(`${k.n - k.levend} van de ${k.n} vakjes (AA) sterven; er blijven ${k.levend} levende nakomelingen over.`);
    stappen.push(k.levend === 1 ? `${wieMet(f, ctx.wie)[0].toUpperCase() + wieMet(f, ctx.wie).slice(1)}: alle nakomelingen, dus 100%` : `${wieMet(f, ctx.wie)[0].toUpperCase() + wieMet(f, ctx.wie).slice(1)}: ${k.feno[f]} van de ${k.levend} = ${G.breuk(k.feno[f], k.levend)} = ${G.pct(k.feno[f], k.levend)}`);
    return { q: `${ctx.tekst}\nDe ouders hebben genotype ${tm} en ${tv}. Hoe groot is de kans op ${wieMet(f, ctx.wie)}? Geef je antwoord in procenten.`, antwoord: Math.round(p * 10) / 10, eenheid: "%", tol: 0.6, hint: "Bepaal de geslachtscellen van beide ouders en maak een kruisingsschema.", stappen };
  }
  BIO.kansOpgave = kansOpgave;

  TW.hoofdstuk({
    id: "t3", nr: "Thema 3", titel: "Genetica (basisstof 5 t/m 7)", icoon: "🧩",
    intro: "Toetsstof: basisstof 5 (speciale manieren van overerven), basisstof 6 (opvoeding of aanleg) en de Samenhang 'Twin strangers'. Begin met het voorkennisonderdeel als kruisingen en stambomen wat zijn weggezakt.",
    onderdelen: [
      // ================= Voorkennis =================
      {
        id: "t3-v", nr: "Voorkennis", titel: "Voorkennis BS 1 t/m 4",
        kern: [
          { tip: "Voorkennis: dit onderdeel herhaalt kort basisstof 1 tot en met 4. Die stof heb je nodig voor BS 5 en 6." },
          "Het [[genotype]] is de erfelijke informatie voor een eigenschap: welke allelen je hebt. Het [[fenotype]] is wat je ervan ziet of kunt meten: kleur, lengte, bloedgroep.",
          "Lichaamscellen hebben chromosomen in paren (bij de mens 23 paren). Van elk gen heb je dus twee allelen: één van je vader en één van je moeder. Een geslachtscel krijgt er één van.",
          { tabel: { kop: ["begrip", "betekenis", "voorbeeld"], rijen: [["[[homozygoot]]", "twee gelijke allelen", "AA of aa"], ["[[heterozygoot]]", "twee verschillende allelen", "Aa"], ["[[dominant]]", "allel komt altijd tot uiting", "A"], ["[[recessief]]", "allel komt alleen tot uiting als het dubbel aanwezig is", "a (alleen bij aa)"]] } },
          { kop: "Monohybride kruising" },
          "Bij een monohybride kruising volg je één eigenschap. Noteer eerst de ouders (P), dan hun geslachtscellen, en zet die in een kruisingsschema. De nakomelingen heten de F1; kruis je F1 met F1, dan krijg je de F2.",
          { fig: "kruising-mono", bij: "Aa × Aa: genotypen 1 AA : 2 Aa : 1 aa, fenotypen 3 : 1." },
          { voorbeeld: { titel: "Aa × Aa", stappen: ["Geslachtscellen van elke ouder: A of a (elk 50%).", "Kruisingsschema: AA, Aa, Aa, aa.", "Genotypen: 1 AA : 2 Aa : 1 aa.", "Fenotypen: 3 dominant : 1 recessief, dus 75% en 25%."] } },
          "Met een [[terugkruising]] (kruisen met een homozygoot recessief individu, aa) ontdek je of een dominant individu AA of Aa is: krijg je ook recessieve nakomelingen, dan was het Aa.",
          { kop: "X-chromosomale overerving" },
          { fig: "geslachtschromosomen", bij: "Een vrouw heeft XX, een man XY." },
          "Een vrouw heeft twee X-chromosomen, een man een X en een Y. Ligt een gen op het X-chromosoom, dan heeft een vrouw twee allelen (X^{A}X^{a}) en een man maar één (X^{a}Y). Een recessieve X-chromosomale aandoening komt daardoor veel vaker voor bij mannen.",
          { fig: "kruising-x", bij: "Draagster × gezonde man: de helft van de zonen is ziek." },
          { let: "Een zoon krijgt zijn X-chromosoom altijd van zijn moeder. Een vader geeft zijn X aan al zijn dochters." },
          { kop: "Stambomen lezen" },
          { tabel: { kop: ["als je ziet", "dan weet je"], rijen: [["twee ouders zonder de eigenschap met een kind mét", "de eigenschap is recessief"], ["twee ouders mét de eigenschap met een kind zonder", "de eigenschap is dominant"], ["recessief: een dochter mét de eigenschap met een vader zonder", "niet X-chromosomaal"], ["recessief: een moeder mét de eigenschap met een zoon zonder", "niet X-chromosomaal"]] } },
          { widget: "stamboom-detective" },
          { widget: "kruisingslab" }
        ],
        begrippen: [
          ["genotype", "De erfelijke informatie voor een eigenschap: de combinatie van allelen."],
          ["fenotype", "Alle waarneembare eigenschappen van een individu."],
          ["homologe chromosomen", "Twee chromosomen van een paar, met dezelfde genen op dezelfde plaatsen."],
          ["genenpaar", "De twee allelen van een gen op een paar homologe chromosomen."],
          ["homozygoot", "Met twee gelijke allelen voor een gen (AA of aa)."],
          ["heterozygoot", "Met twee verschillende allelen voor een gen (Aa)."],
          ["dominant", "Allel dat in het fenotype tot uiting komt, ook als er maar één van is."],
          ["recessief", "Allel dat alleen tot uiting komt als het homozygoot aanwezig is."],
          ["monohybride kruising", "Kruising waarbij je de overerving van één eigenschap volgt."],
          ["P, F1, F2", "Ouders, eerste generatie nakomelingen, tweede generatie nakomelingen."],
          ["terugkruising", "Kruising met een homozygoot recessief individu om het genotype van een dominant individu te bepalen."],
          ["geslachtschromosomen", "X en Y; vrouw XX, man XY."],
          ["X-chromosomale overerving", "Overerving van een gen dat op het X-chromosoom ligt."],
          ["draagster", "Vrouw die heterozygoot is voor een recessief X-chromosomaal allel (X^{A}X^{a})."],
          ["stamboom", "Schema van een familie waarin je ziet wie een eigenschap heeft."]
        ],
        vragen: [
          { q: "Wat is een heterozygoot genotype?", a: ["Aa: twee verschillende allelen", "AA: twee dominante allelen", "aa: twee recessieve allelen", "A: één allel"], u: "Heterozygoot: twee verschillende allelen." },
          { q: "Twee ouders met genotype Aa krijgen een kind. Hoe groot is de kans dat het kind het recessieve fenotype heeft?", a: ["25%", "50%", "75%", "0%"], u: "Alleen aa heeft het recessieve fenotype: 1 van de 4 vakjes." },
          { q: "Een cavia met een zwarte vacht (dominant) wordt gekruist met een witte cavia (aa). Er komen zwarte en witte jongen. Wat is het genotype van de zwarte ouder?", a: ["Aa, want er komen ook witte jongen", "AA, want zwart is dominant", "aa, want de andere ouder is wit", "Dat is niet te bepalen"], u: "Witte jongen zijn aa en kregen ook van de zwarte ouder een a." },
          { q: "Hoeveel allelen voor een gen op het X-chromosoom heeft een man?", a: ["Eén", "Twee", "Vier", "Geen"], u: "Een man heeft maar één X-chromosoom." },
          { q: "Een vrouw is draagster van hemofilie (X^{A}X^{a}), haar man is gezond (X^{A}Y). Hoe groot is de kans dat een zoon van hen hemofilie heeft?", a: ["50%", "25%", "0%", "100%"], u: "Een zoon krijgt Y van vader en X^{A} of X^{a} van moeder: de helft van de zonen is X^{a}Y." },
          { q: "Van wie krijgt een zoon zijn X-chromosoom?", a: ["Altijd van zijn moeder", "Altijd van zijn vader", "Van zijn vader of zijn moeder, elk 50%", "Van beide ouders"], u: "Van zijn vader krijgt een zoon het Y-chromosoom." },
          { q: "In een stamboom hebben twee gezonde ouders een ziek kind. Wat kun je concluderen?", a: ["Het ziekte-allel is recessief", "Het ziekte-allel is dominant", "Het gen ligt op het X-chromosoom", "Het kind heeft een nieuwe mutatie gekregen"], u: "Beide ouders hebben het allel verborgen bij zich: ze zijn heterozygoot." },
          { q: "Een recessieve ziekte: een zieke dochter heeft een gezonde vader. Wat weet je dan zeker?", a: ["Het gen ligt niet op het X-chromosoom", "Het gen ligt op het X-chromosoom", "De moeder is ook ziek", "De ziekte is dominant"], u: "X-chromosomaal zou de dochter X^{a}X^{a} zijn en een X^{a} van haar vader hebben, die dan ook ziek zou zijn." },
          { q: "Wat is het fenotype?", a: ["Alle waarneembare eigenschappen", "De combinatie van allelen", "Het aantal chromosomen", "Alleen de erfelijke eigenschappen"], u: "Het fenotype ontstaat door genotype én milieu." },
          { q: "Aa × aa. Wat is de verhouding van de fenotypen bij de nakomelingen?", a: ["1 dominant : 1 recessief", "3 dominant : 1 recessief", "alle dominant", "1 : 2 : 1"], u: "De helft Aa, de helft aa." }
        ],
        reken: [
          { gen: (R) => kansOpgave(R, "mono") },
          { gen: (R) => kansOpgave(R, "x") }
        ],
        oefen: [
          { type: "koppel", q: "Koppel het genotype aan het begrip.", paren: [["AA", "homozygoot dominant"], ["aa", "homozygoot recessief"], ["Aa", "heterozygoot"], ["X^{A}X^{a}", "draagster"], ["X^{a}Y", "zieke man"]], u: "Bij X-chromosomaal recessief is een vrouw met één X^{a} draagster." },
          { type: "invul", q: "Vul in.", tekst: "Bij Aa × Aa is de genotypeverhouding {1 : 2 : 1} en de fenotypeverhouding {3 : 1}. Een kruising met aa om het genotype te bepalen heet een {terugkruising}.", extra: ["1 : 1", "9 : 3 : 3 : 1", "kruisbestuiving"], u: "Bij volledige dominantie zien AA en Aa er hetzelfde uit." },
          { type: "sorteer", q: "Wat kun je concluderen uit deze waarneming in een stamboom?", groepen: ["recessief", "dominant"], items: [["twee gezonde ouders, ziek kind", 0], ["twee zieke ouders, gezond kind", 1], ["eigenschap slaat een generatie over", 0], ["alle kinderen van aa × aa hebben de eigenschap", 0]], u: "Een allel dat 'verborgen' zit bij ouders zonder de eigenschap is recessief." }
        ],
        open: [
          { q: "Leg uit waarom een recessieve X-chromosomale aandoening zoals kleurenblindheid veel vaker voorkomt bij mannen dan bij vrouwen.", a: "Een man heeft maar één X-chromosoom. Heeft hij daarop het recessieve allel (X^{a}Y), dan komt het altijd tot uiting. Een vrouw heeft twee X-chromosomen en is alleen kleurenblind als ze op allebei het recessieve allel heeft (X^{a}X^{a}). Die kans is veel kleiner.", punten: ["man één X, geen tweede allel", "vrouw moet twee recessieve allelen hebben"] }
        ],
        widgets: ["kruisingslab", "stamboom-detective"]
      },

      // ================= BS 5 Speciale manieren van overerven =================
      {
        id: "t3-5", nr: "BS 5", titel: "Speciale manieren van overerven",
        kern: [
          "Niet elke eigenschap erft over volgens 'dominant en recessief' met een verhouding van 3 : 1. In deze basisstof leer je vier speciale gevallen: intermediair, codominant (met multipele allelen), letale factoren en gekoppelde genen.",
          { kop: "Intermediair" },
          "Als geen van de twee allelen dominant is, heet het genenpaar [[onvolledig dominant]]. De heterozygoot heeft dan een fenotype tussen dat van de homozygoten in: een [[intermediair fenotype]]. Rood (A^{r}A^{r}) × wit (A^{w}A^{w}) geeft roze (A^{r}A^{w}).",
          { fig: "intermediair", bij: "Bij intermediaire overerving is de F2-verhouding 1 : 2 : 1, voor genotype én fenotype." },
          { tip: "Bij intermediair geef je beide allelen dezelfde hoofdletter met een verschillend superscript: A^{r} en A^{w}. Elk genotype heeft een eigen fenotype." },
          { kop: "Codominant en multipele allelen: bloedgroepen" },
          "Bij [[codominantie]] komen beide allelen volledig tot uiting, niet als mengvorm. Bloedgroep AB is daarvan het voorbeeld: je maakt zowel kenmerk A als kenmerk B op je rode bloedcellen.",
          "Voor de bloedgroep zijn er drie allelen: I^{A}, I^{B} en i. Als er meer dan twee allelen voor een gen bestaan, heet dat [[multipele allelen]]. Iedereen heeft er wel maar twee van.",
          { tabel: { kop: ["bloedgroep (fenotype)", "mogelijke genotypen"], rijen: [["A", "I^{A}I^{A} of I^{A}i"], ["B", "I^{B}I^{B} of I^{B}i"], ["AB", "I^{A}I^{B}"], ["0", "ii"]] } },
          { fig: "kruising-bloed", bij: "I^{A}i × I^{B}i: elke bloedgroep heeft 25% kans." },
          { kop: "Letale factoren" },
          "Een [[letale factor]] is een allel dat in homozygote toestand dodelijk is, vaak al bij het embryo. Gele muizen zijn daarom altijd Aa: AA sterft vóór de geboorte.",
          { fig: "kruising-letaal", bij: "Aa × Aa met letale factor: AA sterft, dus 2 geel : 1 donker." },
          { voorbeeld: { titel: "Achondroplasie", stappen: ["Achondroplasie is dominant (A); AA overleeft niet.", "Twee ouders met achondroplasie: Aa × Aa.", "Schema: AA (sterft), Aa, Aa, aa.", "Van de levende kinderen heeft 2/3 achondroplasie en 1/3 (33%) een normale lengte."] } },
          { let: "Bij een letale factor reken je de kans uit over de levende nakomelingen: deel door 3, niet door 4." },
          { kop: "Gekoppelde en onafhankelijke overerving" },
          "Volg je twee genen tegelijk, dan is het een dihybride kruising. Liggen de genen op verschillende chromosomen, dan erven ze **onafhankelijk** over: AaBb maakt vier soorten geslachtscellen (AB, Ab, aB, ab), en AaBb × AaBb geeft 9 : 3 : 3 : 1.",
          "Liggen twee genen op hetzelfde chromosoom, dan erven ze [[gekoppeld]] over: de allelen op één chromosoom gaan samen naar een geslachtscel. Je noteert per chromosoom: AB/ab. Zo'n individu maakt alleen geslachtscellen AB en ab.",
          { fig: "gekoppeld", bij: "Gekoppelde genen: geen geslachtscellen Ab of aB." },
          { tip: "Herken gekoppelde overerving aan ontbrekende combinaties: komen bepaalde combinaties van fenotypen in de nakomelingen niet voor, dan liggen de genen waarschijnlijk op hetzelfde chromosoom." },
          { widget: "kruisingslab" }
        ],
        begrippen: [
          ["onvolledig dominant", "Geen van de twee allelen is dominant over het andere."],
          ["intermediair fenotype", "Fenotype van een heterozygoot dat tussen de fenotypen van de homozygoten in ligt."],
          ["codominantie", "Beide allelen komen in de heterozygoot volledig tot uiting, zoals I^{A} en I^{B} bij bloedgroep AB."],
          ["multipele allelen", "Er bestaan meer dan twee allelen van een gen, zoals I^{A}, I^{B} en i."],
          ["bloedgroep 0", "Genotype ii: geen kenmerk A en geen kenmerk B op de rode bloedcellen."],
          ["letale factor", "Allel dat in homozygote toestand tot de dood leidt."],
          ["dihybride kruising", "Kruising waarbij je de overerving van twee eigenschappen tegelijk volgt."],
          ["onafhankelijke overerving", "Genen op verschillende chromosomen; hun allelen worden los van elkaar verdeeld."],
          ["gekoppelde overerving", "Genen op hetzelfde chromosoom erven samen over."],
          ["gekoppelde genen", "Genen die op hetzelfde chromosoom liggen."],
          ["9 : 3 : 3 : 1", "Fenotypeverhouding bij AaBb × AaBb met onafhankelijke overerving."],
          ["HLA-type", "Combinatie van allelen van een groep gekoppelde genen op chromosoom 6; belangrijk bij transplantaties."]
        ],
        vragen: [
          { q: "Wat is het verschil tussen intermediair en codominant?", a: ["Bij codominant komen beide allelen volledig tot uiting, bij intermediair ontstaat een mengvorm", "Bij intermediair komen beide allelen volledig tot uiting, bij codominant ontstaat een mengvorm", "Bij codominant is één allel dominant, bij intermediair geen van beide", "Er is geen verschil: het zijn twee namen voor hetzelfde"], u: "Roze bloem = mengvorm (intermediair). Bloedgroep AB = beide kenmerken volledig (codominant)." },
          { q: "Twee roze wonderbloemen (A^{r}A^{w}) worden gekruist. Welke verhouding van fenotypen verwacht je?", a: ["1 rood : 2 roze : 1 wit", "3 rood : 1 wit", "alle roze", "1 rood : 1 wit"], u: "Bij intermediair heeft elk genotype een eigen fenotype: 1 A^{r}A^{r} : 2 A^{r}A^{w} : 1 A^{w}A^{w}." },
          { q: "Een man en een vrouw hebben allebei bloedgroep AB. Welke bloedgroepen kunnen hun kinderen hebben?", a: ["A, B en AB", "Alleen AB", "A, B, AB en 0", "Alleen A en B"], u: "I^{A}I^{B} × I^{A}I^{B} geeft I^{A}I^{A}, I^{A}I^{B} en I^{B}I^{B}. Bloedgroep 0 (ii) kan niet: niemand heeft een i." },
          { q: "Twee ouders met bloedgroep A krijgen een kind met bloedgroep 0. Wat zijn de genotypen van de ouders?", a: ["Allebei I^{A}i", "Allebei I^{A}I^{A}", "I^{A}I^{A} en I^{A}i", "Dat is niet te bepalen"], u: "Het kind is ii en kreeg van elke ouder een i." },
          { q: "Ouders met I^{A}i en I^{B}i krijgen een kind. Hoe groot is de kans op bloedgroep 0?", a: ["25%", "0%", "50%", "75%"], u: "Vier gelijke mogelijkheden: I^{A}I^{B}, I^{A}i, I^{B}i en ii." },
          { q: "Gele muizen (Aa) worden onderling gekruist. Er komen 116 gele en 58 donkere jongen. Hoe verklaar je de verhouding 2 : 1?", a: ["Muizen met AA sterven als embryo: een letale factor", "Geel is intermediair", "De genen zijn gekoppeld", "Geel is recessief"], u: "Van 1 AA : 2 Aa : 1 aa blijven alleen 2 Aa (geel) en 1 aa (donker) over." },
          { q: "Twee mensen met achondroplasie (Aa, AA is letaal) krijgen een kind. Hoe groot is de kans dat het kind geen achondroplasie heeft?", a: ["33%", "25%", "50%", "67%"], u: "AA overleeft niet. Van de drie overgebleven mogelijkheden (Aa, Aa, aa) is er één aa: 1/3." },
          { q: "Wanneer erven twee genen gekoppeld over?", a: ["Als ze op hetzelfde chromosoom liggen", "Als ze allebei dominant zijn", "Als ze op het X-chromosoom liggen", "Als ze voor hetzelfde eiwit coderen"], u: "Allelen op één chromosoom gaan samen naar een geslachtscel." },
          { q: "Een plant AB/ab (gekoppeld) wordt gekruist met ab/ab. Welke fenotypen krijgen de nakomelingen?", a: ["Alleen AB-fenotype en ab-fenotype, 1 : 1", "Vier fenotypen in de verhouding 1 : 1 : 1 : 1", "Vier fenotypen in de verhouding 9 : 3 : 3 : 1", "Alleen het AB-fenotype"], u: "De plant maakt alleen geslachtscellen AB en ab. Nakomelingen: AB/ab en ab/ab." },
          { q: "AaBb × AaBb, de genen liggen op verschillende chromosomen. Welk deel van de nakomelingen heeft beide recessieve fenotypen?", a: ["1/16", "1/4", "3/16", "9/16"], u: "aa heeft kans 1/4, bb ook 1/4: samen 1/4 × 1/4 = 1/16." },
          { q: "Een onderzoeker kruist planten met gele bloemen en pijlvormige bladeren met planten met witte bloemen en ovale bladeren. In de F2 komen alleen deze twee combinaties terug. Wat concludeer je?", a: ["De genen erven gekoppeld over", "De genen erven onafhankelijk over", "Het is een letale factor", "Bloemkleur is intermediair"], u: "De combinaties geel-ovaal en wit-pijlvormig ontbreken: de allelen blijven samen." },
          { q: "Waarom is de kans heel klein dat een willekeurig ander iemand precies jouw HLA-type heeft?", a: ["Van elk HLA-gen bestaan heel veel allelen, dus er zijn enorm veel combinaties", "HLA-genen liggen op het Y-chromosoom", "HLA-genen muteren bij elke celdeling", "Je HLA-type verandert door je voeding"], u: "Bij broers en zussen is de kans 1/4, omdat de HLA-genen gekoppeld overerven." }
        ],
        reken: [
          { gen: (R) => kansOpgave(R, "inter") },
          { gen: (R) => kansOpgave(R, "bloed") },
          { gen: (R) => kansOpgave(R, "letaal") },
          { gen: (R) => kansOpgave(R, "di") },
          { gen: (R) => kansOpgave(R, "gek") }
        ],
        oefen: [
          { type: "koppel", q: "Koppel de kruising aan de verhouding van de fenotypen.", paren: [["Aa × Aa (dominant)", "3 : 1"], ["A^{r}A^{w} × A^{r}A^{w} (intermediair)", "1 : 2 : 1"], ["Aa × Aa (AA letaal)", "2 : 1"], ["AaBb × AaBb (onafhankelijk)", "9 : 3 : 3 : 1"], ["AB/ab × ab/ab (gekoppeld)", "1 : 1"]], u: "Leer deze vijf verhoudingen herkennen: ze verraden de manier van overerven." },
          { type: "sorteer", q: "Welk genotype hoort bij welke bloedgroep?", groepen: ["bloedgroep A", "bloedgroep B", "bloedgroep AB", "bloedgroep 0"], items: [["I^{A}I^{A}", 0], ["I^{A}i", 0], ["I^{B}i", 1], ["I^{B}I^{B}", 1], ["I^{A}I^{B}", 2], ["ii", 3]], u: "i is recessief; I^{A} en I^{B} zijn codominant." },
          { type: "invul", q: "Vul in.", tekst: "Bloedgroep AB is een voorbeeld van {codominantie}. Omdat er drie allelen zijn, spreek je van {multipele} allelen. Een allel dat homozygoot dodelijk is, heet een {letale} factor.", extra: ["intermediair", "gekoppelde", "recessieve"], u: "Intermediair is een mengvorm, codominant is beide volledig." }
        ],
        open: [
          { q: "Een vrouw met bloedgroep A en een man met bloedgroep B krijgen een kind met bloedgroep 0. Wat zijn de genotypen van de ouders? Hoe groot is de kans dat een volgend kind bloedgroep AB heeft? Leg uit met een kruisingsschema.", a: "Het kind is ii, dus beide ouders hebben een i: moeder I^{A}i en vader I^{B}i. Geslachtscellen moeder: I^{A} en i; vader: I^{B} en i. Schema: I^{A}I^{B}, I^{A}i, I^{B}i, ii. Eén van de vier is I^{A}I^{B}: de kans op bloedgroep AB is 25%.", punten: ["ouders I^{A}i en I^{B}i", "kruisingsschema met vier uitkomsten", "kans 25%"] },
          { q: "Bij konijnen zijn lang haar (A) en rechte oren (B) dominant. De genen liggen op hetzelfde chromosoom. Een homozygoot langharig konijn met hangende oren wordt gekruist met een homozygoot kortharig konijn met rechte oren. Welke fenotypen verwacht je in de F2, en in welke verhouding?", a: "P: Ab/Ab × aB/aB. Geslachtscellen: Ab en aB. F1: allemaal Ab/aB (lang haar, rechte oren). F1 × F1: geslachtscellen Ab en aB. F2: Ab/Ab (lang, hangend), 2 × Ab/aB (lang, recht), aB/aB (kort, recht). Verhouding: 1 lang en hangende oren : 2 lang en rechte oren : 1 kort en rechte oren. Kort haar met hangende oren komt niet voor.", punten: ["gekoppeld: alleen gameten Ab en aB", "F1 Ab/aB", "F2 1 : 2 : 1", "combinatie kort en hangend ontbreekt"] }
        ],
        widgets: ["kruisingslab"]
      },

      // ================= BS 6 Opvoeding of aanleg =================
      {
        id: "t3-6", nr: "BS 6", titel: "Opvoeding of aanleg (SE)",
        kern: [
          "Is een eigenschap aangeboren (aanleg) of komt het door hoe je bent opgegroeid (opvoeding)? In het Engels heet dat **nature** en **nurture**. In de genetica zeg je: genotype en [[milieufactoren]].",
          { fig: "fenotype", bij: "Fenotype = genotype + invloed van het milieu." },
          { formule: "fenotype = genotype + milieufactoren" },
          "Je genotype ligt vast vanaf de bevruchting. Milieufactoren zijn alle invloeden van buitenaf: voeding, training, opvoeding, klimaat, ziekten, roken en alcohol, de bodem waarin een plant staat.",
          "Bij veel eigenschappen bepaalt het genotype de grenzen, en het milieu waar je binnen die grenzen uitkomt. Je lengte hangt bijvoorbeeld af van je genen én van je voeding.",
          { kop: "Modificaties" },
          "Een [[modificatie]] is een verandering in het fenotype die door het milieu komt en niet door het genotype. Modificaties zijn niet erfelijk.",
          { tabel: { kop: ["voorbeeld", "milieufactor"], rijen: [["gespierde armen door krachttraining", "training"], ["blauwe of roze hortensia's van dezelfde moederplant", "zuurgraad van de bodem"], ["bruine huid in de zomer", "zonlicht"], ["foetaal-alcoholsyndroom", "alcohol tijdens de zwangerschap"]] } },
          { let: "Een gespierde vader krijgt door zijn training geen gespierder kind: het genotype in zijn geslachtscellen verandert niet." },
          { kop: "Tweelingonderzoek" },
          { fig: "tweelingen", bij: "Eeneiig: één bevruchte eicel splitst. Twee-eiig: twee eicellen, twee zaadcellen." },
          { tabel: { kop: ["", "eeneiige tweeling", "twee-eiige tweeling"], rijen: [["ontstaan", "één bevruchte eicel die in tweeën splitst", "twee eicellen, door twee zaadcellen bevrucht"], ["genotype", "gelijk", "verschillend (zoals broers en zussen, ongeveer 50% gelijk)"], ["geslacht", "altijd hetzelfde", "hetzelfde of verschillend"]] } },
          { voorbeeld: { titel: "Wat leer je van welke tweeling?", stappen: ["Eeneiige tweeling, apart opgegroeid: zelfde genotype, ander milieu. Verschillen komen door het milieu.", "Twee-eiige tweeling, samen opgegroeid: ongeveer zelfde milieu, ander genotype. Verschillen komen vooral door het genotype.", "Lijken eeneiige tweelingen voor een eigenschap veel meer op elkaar dan twee-eiige, dan speelt het genotype een grote rol."] } },
          "Bij mensen kun je geen experimenten doen met genotype en milieu. Daarom zijn tweelingen zo waardevol voor onderzoek.",
          { kop: "Genotype, milieu en genexpressie" },
          "Milieufactoren kunnen genen aan- of uitzetten zonder het DNA te veranderen (epigenetica, thema 9 BS 4). Daardoor gaan eeneiige tweelingen met de jaren meer van elkaar verschillen.",
          "Ook toeval speelt mee. Bij een vrouw wordt in elke lichaamscel willekeurig één van de twee X-chromosomen uitgeschakeld. Een lapjeskat (altijd een poes) is heterozygoot voor een vachtkleurgen op het X-chromosoom: in de ene groep cellen werkt het ene X, in de andere groep het andere."
        ],
        begrippen: [
          ["nature en nurture", "Aanleg (genotype) en opvoeding (milieufactoren)."],
          ["milieufactoren", "Invloeden van buitenaf op het fenotype, zoals voeding, training en klimaat."],
          ["modificatie", "Niet-erfelijke verandering in het fenotype door milieufactoren."],
          ["eeneiige tweeling", "Tweeling uit één bevruchte eicel die in tweeën splitst; zelfde genotype."],
          ["twee-eiige tweeling", "Tweeling uit twee eicellen en twee zaadcellen; verschillend genotype."],
          ["tweelingonderzoek", "Onderzoek naar de invloed van genotype en milieu door tweelingen te vergelijken."],
          ["Siamese tweeling", "Eeneiige tweeling die aan elkaar vastgegroeid is, doordat de splitsing niet helemaal gelukt is."],
          ["foetaal-alcoholsyndroom", "Aangeboren afwijkingen door alcoholgebruik van de moeder tijdens de zwangerschap; een modificatie."],
          ["X-inactivatie", "In elke lichaamscel van een vrouw wordt willekeurig één X-chromosoom uitgeschakeld."],
          ["lapjeskat", "Poes met vlekken in twee kleuren door X-inactivatie; heterozygoot voor een vachtkleurgen op X."]
        ],
        vragen: [
          { q: "Vanaf welk moment ligt het genotype van een individu vast?", a: ["Vanaf de bevruchting", "Vanaf de geboorte", "Vanaf de puberteit", "Pas als alle organen gevormd zijn"], u: "Bij de bevruchting komen de chromosomen van vader en moeder samen." },
          { q: "Welke termen gebruik je in de genetica voor nature en nurture?", a: ["Genotype en milieufactoren", "Fenotype en genotype", "Dominant en recessief", "Allel en gen"], u: "Nature = aanleg = genotype; nurture = opvoeding = milieu." },
          { q: "Welk voorbeeld is een modificatie?", a: ["Gespierde benen door veel fietsen", "Bloedgroep AB", "Kleurenblindheid", "Sikkelcelanemie"], u: "Een modificatie komt door het milieu en is niet erfelijk." },
          { q: "Hortensia's die stekjes zijn van dezelfde moederplant hebben verschillende bloemkleuren. Hoe komt dat?", a: ["Door verschillen in milieu, bijvoorbeeld de bodem", "Door verschillende genotypen", "Door mutaties in elk stekje", "Doordat ze van verschillende ouders afstammen"], u: "Stekjes hebben hetzelfde genotype; de verschillen zijn modificaties." },
          { q: "Een Siamese tweeling heeft ...", a: ["hetzelfde genotype, want het is een eeneiige tweeling", "een verschillend genotype, want ze zijn twee personen", "de helft van de genen gemeenschappelijk", "geen eigen genotype"], u: "Siamese tweelingen ontstaan uit één bevruchte eicel." },
          { q: "Twee-eiige tweelingen die samen opgroeien verschillen in fenotype. Waardoor vooral?", a: ["Door verschillen in genotype, want hun milieu is ongeveer gelijk", "Door verschillen in milieu, want hun genotype is gelijk", "Door mutaties tijdens de zwangerschap", "Door X-inactivatie"], u: "Twee-eiig: verschillend genotype. Samen opgegroeid: vergelijkbaar milieu." },
          { q: "Onderzoekers bestuderen eeneiige tweelingen die apart zijn opgegroeid. Wat onderzoeken ze vooral?", a: ["De invloed van het milieu op het fenotype", "De invloed van het genotype op het fenotype", "Hoe vaak mutaties ontstaan", "Of de genen gekoppeld zijn"], u: "Het genotype is gelijk; verschillen komen dus door het milieu." },
          { q: "Een jongen en een meisje zijn een tweeling. Wat voor tweeling is het?", a: ["Twee-eiig", "Eeneiig", "Siamees", "Dat is niet te zeggen"], u: "Eeneiige tweelingen hebben hetzelfde genotype, dus ook hetzelfde geslacht (XX of XY)." },
          { q: "Waarom gaan eeneiige tweelingen met de jaren meer van elkaar verschillen?", a: ["Door verschillende milieu-invloeden verandert hun genexpressie steeds meer", "Hun DNA-volgorde wordt steeds verschillender", "Ze krijgen steeds andere chromosomen", "Een van beiden verliest een X-chromosoom"], u: "Epigenetische factoren veranderen de genexpressie, niet het DNA." },
          { q: "Waarom is een lapjeskat (bijna) altijd een poes?", a: ["De vlekken ontstaan doordat in verschillende cellen een ander X-chromosoom werkt, en alleen een poes heeft er twee", "Het vachtkleurgen ligt op het Y-chromosoom", "Katers met dat genotype sterven als embryo", "Katers hebben geen genen voor vachtkleur"], u: "Een kater (XY) heeft één X; dat werkt in alle cellen." },
          { q: "Waarom is de invloed van nature en nurture bij mensen moeilijker te onderzoeken dan bij dieren?", a: ["Je kunt met mensen geen kruisingsproeven of opgroei-experimenten doen", "Mensen hebben meer genen dan dieren", "Bij mensen speelt het milieu geen rol", "Mensen hebben geen modificaties"], u: "Daarom gebruikt men tweelingonderzoek." }
        ],
        reken: [
          { gen: (R) => { const e = R.int(55, 90), t = R.int(15, Math.min(50, e - 10)); return { q: `Bij ${e}% van de eeneiige tweelingen hebben beide leden een bepaalde aandoening als één van de twee die heeft. Bij twee-eiige tweelingen is dat ${t}%. Hoeveel procentpunt is het verschil?`, antwoord: e - t, eenheid: "procentpunt", hint: "Trek de percentages van elkaar af.", stappen: [`${e} − ${t} = ${e - t} procentpunt`, "Eeneiige tweelingen lijken veel meer op elkaar: het genotype speelt bij deze aandoening een grote rol."] }; } }
        ],
        oefen: [
          { type: "sorteer", q: "Erfelijk of een modificatie?", groepen: ["erfelijk (genotype)", "modificatie (milieu)"], items: [["bloedgroep", 0], ["bruine huid na de zomer", 1], ["kleurenblindheid", 0], ["foetaal-alcoholsyndroom", 1], ["gespierde armen door training", 1], ["sikkelcelanemie", 0]], u: "Een modificatie wordt niet doorgegeven aan nakomelingen." },
          { type: "sorteer", q: "Eeneiige of twee-eiige tweeling?", groepen: ["eeneiig", "twee-eiig"], items: [["altijd hetzelfde geslacht", 0], ["kan een jongen en een meisje zijn", 1], ["uit één bevruchte eicel", 0], ["twee zaadcellen nodig", 1], ["genotype gelijk", 0], ["lijken genetisch op elkaar als gewone broers en zussen", 1]], u: "Eeneiig: één zygote die splitst." },
          { type: "invul", q: "Vul in.", tekst: "Het fenotype ontstaat door het {genotype} en door {milieufactoren}. Een niet-erfelijke verandering in het fenotype heet een {modificatie}.", extra: ["mutatie", "allel"], u: "Een mutatie is juist wel een verandering in het DNA." }
        ],
        open: [
          { q: "Onderzoekers willen weten of nicotineverslaving vooral door aanleg of door het milieu komt. Leg uit hoe ze dat met tweelingonderzoek kunnen nagaan.", a: "Ze vergelijken eeneiige en twee-eiige tweelingen. Als eeneiige tweelingen (zelfde genotype) veel vaker allebei verslaafd raken dan twee-eiige tweelingen, speelt het genotype een grote rol. Ook kun je eeneiige tweelingen die apart zijn opgegroeid vergelijken: verschillen tussen hen komen door het milieu.", punten: ["eeneiig: zelfde genotype", "vergelijken met twee-eiig", "apart opgegroeid: effect van milieu"] },
          { q: "Uit onderzoek blijkt dat mensen met een bepaald allel van het FGF21-gen meer zin hebben in zoetigheid. Krijgt iedereen met dit allel overgewicht? Leg uit.", a: "Nee. Het fenotype hangt af van het genotype én van milieufactoren. Of iemand overgewicht krijgt, hangt ook af van wat hij eet, hoeveel hij beweegt en van andere genen. Het allel vergroot alleen de kans.", punten: ["fenotype = genotype + milieu", "andere genen en leefstijl spelen mee", "allel verhoogt alleen de kans"] }
        ]
      },

      // ================= Samenhang Twin strangers =================
      {
        id: "t3-s", nr: "Samenhang", titel: "Twin strangers",
        kern: [
          "'Twin strangers' zijn dubbelgangers: mensen die sprekend op elkaar lijken, maar geen familie zijn. In deze samenhang pas je BS 5 en BS 6 toe: hoe kan dat, en hoe toon je verwantschap aan?",
          { kop: "Echte tweelingen en dubbelgangers" },
          "Een eeneiige tweeling lijkt op elkaar doordat het genotype gelijk is. Een twee-eiige tweeling deelt ongeveer de helft van de allelen, net als gewone broers en zussen. Dubbelgangers zijn niet verwant: ze hebben toevallig voor de genen van gezichtskenmerken vergelijkbare allelen.",
          { fig: "tweelingen", bij: "Eeneiig en twee-eiig." },
          { kop: "Kansberekening" },
          { voorbeeld: { titel: "Hoeveel dubbelgangers heb je?", stappen: ["Stel dat 32 genen je gezicht bepalen, elk met een dominant en een recessief allel. Per gen zijn er dan twee fenotypen.", "Aantal combinaties: 2^{32} ≈ 4,3 miljard.", "Er leven ongeveer 8 miljard mensen: 8 / 4,3 ≈ 2.", "Volgens dit sterk vereenvoudigde model hebben ongeveer twee mensen op aarde dezelfde combinatie als jij."] } },
          "Hoe meer van je kenmerken door een dominant allel komen, hoe groter de kans op een dubbelganger: AA en Aa geven hetzelfde fenotype.",
          { kop: "DNA-test op verwantschap" },
          "Ongeveer 99,5% van het DNA is bij alle mensen gelijk. Een DNA-test op verwantschap kijkt daarom naar de 0,5% die verschilt.",
          "Het Y-chromosoom gaat van vader op zoon. Mitochondriaal DNA gaat van moeder op al haar kinderen (zonen en dochters). Zo kun je bij mannen via het Y-chromosoom en bij iedereen via het mitochondriaal DNA nagaan hoelang geleden twee mensen een gemeenschappelijke voorouder hadden.",
          { tip: "Lijken twee mensen sprekend op elkaar en blijken ze bij een DNA-test geen recente voorouder te delen, dan zijn het dubbelgangers en geen familie." }
        ],
        begrippen: [
          ["dubbelganger", "Iemand die sprekend op een ander lijkt zonder familie te zijn."],
          ["verwantschap", "Mate waarin mensen familie zijn: hoe recenter de gemeenschappelijke voorouder, hoe meer verwant."],
          ["gemeenschappelijke voorouder", "Voorouder van wie twee mensen allebei afstammen."],
          ["Y-chromosoom", "Geslachtschromosoom dat alleen van vader op zoon overgaat."],
          ["mitochondriaal DNA", "DNA in mitochondriën; gaat van moeder op al haar kinderen over."],
          ["DNA-sequentie", "De volgorde van nucleotiden in een stuk DNA."],
          ["organisatieniveau", "Niveau waarop je naar leven kijkt: molecuul, cel, orgaan, organisme, populatie, ecosysteem, biosfeer."],
          ["DNA-test", "Vergelijking van DNA-sequenties, bijvoorbeeld om verwantschap vast te stellen."]
        ],
        vragen: [
          { q: "Waarom kun je ook bij mannen met mitochondriaal DNA een gemeenschappelijke voorouder in moederlijn opsporen?", a: ["Mannen krijgen hun mitochondriën ook van hun moeder", "Mannen hebben geen Y-chromosoom in hun mitochondriën", "Mitochondriaal DNA komt van de vader", "Mitochondriaal DNA verandert nooit"], u: "Mitochondriën komen mee met de eicel, bij zonen en dochters." },
          { q: "Een DNA-test op verwantschap onderzoekt vooral ...", a: ["het DNA dat tussen mensen verschilt (ongeveer 0,5%)", "het DNA dat bij iedereen gelijk is (ongeveer 99,5%)", "alleen het mitochondriaal DNA van de vader", "het aantal chromosomen"], u: "Het gelijke DNA zegt niets over familie: dat heeft iedereen." },
          { q: "Neem aan dat 32 genen het gezicht bepalen, elk met twee fenotypen. Hoeveel combinaties zijn er dan ongeveer?", a: ["4,3 miljard", "64", "1024", "8 miljard"], u: "2^{32} = 4 294 967 296." },
          { q: "Waarom is de kans op een dubbelganger groter als veel van je kenmerken door dominante allelen komen?", a: ["Homozygote en heterozygote mensen hebben dan hetzelfde fenotype", "Dominante allelen muteren minder vaak", "Dominante allelen liggen op het Y-chromosoom", "Dominante allelen komen alleen bij tweelingen voor"], u: "AA en Aa zien er hetzelfde uit; meer mensen delen dan jouw fenotype." },
          { q: "Op welk organisatieniveau hoort 'DNA-sequentie'?", a: ["Molecuul", "Cel", "Organisme", "Populatie"], u: "DNA is een molecuul." },
          { q: "Twee dubbelgangers blijken bij een DNA-test geen recente gemeenschappelijke voorouder te hebben. Waarom lijken ze dan toch zo op elkaar?", a: ["Ze hebben toevallig vergelijkbare allelen voor de genen van gezichtskenmerken", "Ze hebben hetzelfde mitochondriaal DNA", "Ze zijn een eeneiige tweeling", "Ze zijn in hetzelfde gezin opgegroeid"], u: "Bij zoveel mensen op aarde komen toevallige overeenkomsten voor." },
          { q: "Hoeveel van zijn allelen deelt een twee-eiige tweeling gemiddeld met elkaar?", a: ["Ongeveer de helft", "Allemaal", "Ongeveer een kwart", "Geen enkele"], u: "Net als gewone broers en zussen." }
        ],
        reken: [
          { gen: (R) => { const n = R.int(20, 33); return { q: `Stel dat ${n} genen je gezichtskenmerken bepalen, elk met een dominant en een recessief allel (dus twee fenotypen per gen). Hoeveel combinaties van fenotypen zijn er? Geef het antwoord in miljoenen, afgerond op één decimaal.`, antwoord: Math.round((2 ** n) / 1e5) / 10, eenheid: "miljoen", tol: 0.11, hint: "Per gen 2 mogelijkheden; bij n genen 2^{n}.", stappen: [`2^{${n}} = ${R.nl(2 ** n)}`, `Dat is ongeveer ${R.nl(Math.round((2 ** n) / 1e5) / 10)} miljoen`] }; } }
        ],
        oefen: [
          { type: "sorteer", q: "Op welk organisatieniveau hoort het begrip?", groepen: ["molecuul", "cel", "organisme", "populatie"], items: [["DNA-sequentie", 0], ["eicel", 1], ["gezichtskenmerken", 2], ["voorouder", 2], ["familie", 3], ["dubbelgangers", 3]], u: "Een familie of een groep dubbelgangers bestaat uit meer organismen." },
          { type: "koppel", q: "Via wie erft dit over?", paren: [["Y-chromosoom", "van vader op zoon"], ["mitochondriaal DNA", "van moeder op al haar kinderen"], ["X-chromosoom van een zoon", "van zijn moeder"], ["allelen in de kern", "van beide ouders"]], u: "Een zoon krijgt X van moeder en Y van vader." }
        ],
        open: [
          { q: "Een man en een vrouw lijken sprekend op elkaar. Ze willen weten of ze familie zijn via hun moeders. Welk DNA kunnen ze het beste laten vergelijken? Leg uit.", a: "Hun mitochondriaal DNA. Dat krijgt iedereen alleen van zijn moeder, zonder menging met DNA van de vader. Is hun mitochondriaal DNA (vrijwel) gelijk, dan hebben ze in moederlijn een recente gemeenschappelijke voorouder. Het Y-chromosoom kan niet, want de vrouw heeft er geen.", punten: ["mitochondriaal DNA", "erft alleen via de moeder", "Y-chromosoom heeft de vrouw niet"] }
        ]
      }
    ]
  });
})();
