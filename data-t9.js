// Thema 9 DNA (Biologie voor jou MAX havo 5A). Eigen tekst; de termen volgen het boek.
(function () {
  "use strict";
  const PAAR = { A: "T", T: "A", C: "G", G: "C" };
  const comp = (s) => s.split("").map((b) => PAAR[b]).join("");
  const rnd = (R, n) => { let s = ""; for (let i = 0; i < n; i++) s += R.kies(["A", "T", "C", "G"]); return s; };
  const hb = (s) => s.split("").reduce((n, b) => n + (b === "A" || b === "T" ? 2 : 3), 0);

  TW.hoofdstuk({
    id: "t9", nr: "Thema 9", titel: "DNA", icoon: "🧬",
    intro: "Hoe ziet DNA eruit, hoe wordt het gekopieerd, en hoe maakt een cel met die informatie eiwitten? Daarna: genen aan en uit, mutaties en wat je in het lab met DNA kunt doen.",
    onderdelen: [
      // ================= BS 1 DNA =================
      {
        id: "t9-1", nr: "BS 1", titel: "DNA",
        kern: [
          "Al je erfelijke informatie ligt vast in **DNA**. Alle DNA van een cel samen heet het [[genoom]].",
          "Bij mens en dier ligt het meeste DNA in de celkern; een klein beetje zit in de mitochondriën. Plantencellen hebben ook DNA in hun bladgroenkorrels.",
          "Een [[gen]] is een stukje DNA met de informatie voor één eiwit. Verschillende varianten van hetzelfde gen heten [[allel]]en.",
          { kop: "De bouw van DNA" },
          { fig: "nucleotide", bij: "Een nucleotide: suiker, fosfaatgroep en stikstofbase." },
          "DNA is een lange keten van [[nucleotide]]n. Elk nucleotide bestaat uit drie delen: de suiker **desoxyribose**, een **fosfaatgroep** en een **stikstofbase** (A, T, C of G).",
          "Een DNA-molecuul bestaat uit twee strengen die om elkaar heen gedraaid zijn: de [[dubbele helix]]. De basen van de twee strengen vormen paren, verbonden door [[waterstofbrug]]gen.",
          { fig: "dna-ladder", bij: "DNA als ladder: de suikers en fosfaten vormen de stijlen, de basenparen de sporten." },
          { tabel: { kop: ["basenpaar", "waterstofbruggen"], rijen: [["A met T", "2"], ["C met G", "3"]] } },
          { ezel: "Rechte letters bij elkaar (A en T), ronde letters bij elkaar (C en G)." },
          "Omdat A altijd tegenover T staat en C tegenover G, zijn de twee strengen [[complementair]]: als je de ene streng kent, weet je de andere.",
          { voorbeeld: { titel: "Complementaire streng", stappen: ["Streng 1: CGGATACGGTTA", "Zet onder elke base zijn partner: C→G, G→C, A→T, T→A.", "Streng 2: GCCTATGCCAAT"] } },
          { kop: "Van DNA tot chromosoom" },
          "Het DNA van één menselijke cel is samen ongeveer 2 meter lang. Het past in de kern doordat het strak rond eiwitten is opgerold.",
          "Tijdens de celdeling [[spiraliseren]] de DNA-moleculen nog veel verder: dan zie je ze onder de microscoop als [[chromosomen]].",
          { fig: "chromosoom", bij: "Van DNA-molecuul tot chromosoom." },
          "Een chromosoom bevat veel genen, maar ook veel [[niet-coderend DNA]]: DNA dat niet voor een eiwit codeert. Een deel daarvan regelt wanneer genen gebruikt worden.",
          { kop: "DNA in de mitochondriën" },
          "Mitochondriën hebben hun eigen kleine ring DNA ([[mitochondriaal DNA]]). Je krijgt al je mitochondriën van je moeder via de eicel; zaadcellen geven ze niet door.",
          { tip: "Mitochondriaal DNA erft dus alleen via de moeder over. Een man geeft zijn mitochondriaal DNA nooit door aan zijn kinderen." },
          { widget: "dna-bouwer" }
        ],
        begrippen: [
          ["genoom", "Alle erfelijke informatie (al het DNA) van een cel of organisme."],
          ["DNA", "Desoxyribonucleïnezuur: het molecuul waarin de erfelijke informatie ligt opgeslagen."],
          ["nucleotide", "Bouwsteen van DNA: een suiker (desoxyribose), een fosfaatgroep en een stikstofbase."],
          ["stikstofbase", "Deel van een nucleotide: adenine (A), thymine (T), cytosine (C) of guanine (G)."],
          ["basenparing", "A vormt altijd een paar met T, en C altijd met G."],
          ["waterstofbrug", "Zwakke binding tussen twee basen van een paar: A-T heeft er 2, C-G heeft er 3."],
          ["complementair", "Passend bij elkaar: de basenvolgorde van de ene streng bepaalt die van de andere."],
          ["dubbele helix", "De vorm van DNA: twee strengen die als een wenteltrap om elkaar heen gedraaid zijn."],
          ["gen", "Stukje DNA met de informatie voor één eiwit (één erfelijke eigenschap)."],
          ["allel", "Variant van een gen, met een iets andere nucleotidenvolgorde."],
          ["chromosoom", "Eén lang DNA-molecuul met eiwitten; zichtbaar als het tijdens de celdeling gespiraliseerd is."],
          ["spiraliseren", "Het DNA rolt zich steeds verder op, waardoor chromosomen kort, dik en zichtbaar worden."],
          ["niet-coderend DNA", "DNA dat niet codeert voor een eiwit; een deel ervan regelt de werking van genen."],
          ["mitochondriaal DNA", "Klein ringvormig DNA in de mitochondriën; erft alleen via de moeder over."],
          ["nucleotidensequentie", "De volgorde van de nucleotiden (basen) in een stuk DNA."]
        ],
        vragen: [
          { q: "Uit welke drie delen bestaat een nucleotide van DNA?", a: ["Desoxyribose, een fosfaatgroep en een stikstofbase", "Ribose, een fosfaatgroep en een stikstofbase", "Desoxyribose, een aminozuur en een stikstofbase", "Glucose, een fosfaatgroep en een aminozuur"], u: "DNA-nucleotiden bevatten de suiker desoxyribose. Ribose zit in RNA; aminozuren zijn bouwstenen van eiwitten." },
          { q: "Eén streng van een DNA-molecuul is ATTGCA. Wat is de complementaire streng?", a: ["TAACGT", "ATTGCA", "UAACGU", "GCCATG"], u: "A paart met T en C met G. UAACGU zou RNA zijn: DNA bevat geen U." },
          { q: "Hoeveel waterstofbruggen zitten er tussen de basen van het stukje DNA GCAT (met zijn complementaire streng)?", a: ["10", "8", "12", "4"], u: "G-C en C-G hebben elk 3 bruggen, A-T en T-A elk 2: 3 + 3 + 2 + 2 = 10." },
          { q: "In een DNA-molecuul is 30% van de basen adenine. Hoeveel procent is guanine?", a: ["20%", "30%", "40%", "70%"], u: "A = T = 30%, samen 60%. Er blijft 40% over voor C en G samen, dus G = 20%." },
          { q: "Waar bevindt zich DNA in een bladcel van een plant?", a: ["In de celkern, de mitochondriën en de bladgroenkorrels", "Alleen in de celkern", "In de celkern en de ribosomen", "In de celkern en de vacuole"], u: "Mitochondriën en bladgroenkorrels hebben elk een eigen klein DNA-molecuul." },
          { q: "Waarom zie je in een cel in de interfase geen chromosomen met een lichtmicroscoop?", a: ["Het DNA is dan niet gespiraliseerd en is te dun om te zien", "Er is dan nog geen DNA in de kern aanwezig", "De chromosomen liggen dan buiten de celkern", "De chromosomen worden dan afgebroken tot nucleotiden"], u: "Pas tijdens de celdeling spiraliseren de DNA-moleculen tot korte, dikke chromosomen die je kunt zien." },
          { q: "Wat is de juiste volgorde van klein naar groot?", a: ["base, nucleotide, DNA-molecuul, chromosoom, genoom", "nucleotide, base, chromosoom, DNA-molecuul, genoom", "base, nucleotide, genoom, DNA-molecuul, chromosoom", "nucleotide, base, DNA-molecuul, genoom, chromosoom"], u: "Een base is deel van een nucleotide; veel nucleotiden vormen een DNA-molecuul; met eiwitten is dat een chromosoom; alle chromosomen samen vormen het genoom." },
          { q: "Wat is het verschil tussen een gen en een allel?", a: ["Een allel is een variant van een gen", "Een gen is een variant van een allel", "Een allel is een stuk niet-coderend DNA", "Een gen ligt in de kern, een allel in een mitochondrion"], u: "Een gen is een plek met informatie voor één eiwit. Daarvan bestaan varianten met een iets andere nucleotidenvolgorde: de allelen." },
          { q: "Een man heeft een aandoening die veroorzaakt wordt door een fout in zijn mitochondriaal DNA. Hoe groot is de kans dat hij die aan zijn kinderen doorgeeft?", a: ["Vrijwel 0%, want kinderen krijgen hun mitochondriën van de moeder", "50%, want hij geeft de helft van zijn DNA door", "25%, want het is een recessieve aandoening", "100%, want mitochondriën zitten in elke cel"], u: "Mitochondriën komen mee met de eicel, niet met de zaadcel. Mitochondriaal DNA erft via de moeder over." },
          { q: "Welke uitspraak over niet-coderend DNA is juist?", a: ["Het codeert niet voor eiwitten, maar een deel ervan regelt de werking van genen", "Het is overbodig DNA zonder enige functie", "Het codeert voor de eiwitten van de mitochondriën", "Het komt alleen voor in geslachtscellen"], u: "Niet-coderend DNA levert geen eiwit, maar bijvoorbeeld wel plekken die bepalen of een gen aan of uit staat." },
          { q: "Hoe past 2 meter DNA in een celkern van ongeveer 10 μm?", a: ["Het DNA is strak opgerold rondom eiwitten", "Het DNA is in kleine stukjes geknipt", "Het DNA ligt grotendeels buiten de kern", "Het DNA bestaat in de kern uit één enkele streng"], u: "DNA wikkelt zich rond eiwitten, en die bolletjes worden weer verder opgerold. Zo wordt het heel compact." }
        ],
        reken: [
          { gen: (R) => { const a = R.int(15, 35); return { q: `In een DNA-molecuul is ${a}% van de basen thymine (T). Hoeveel procent van de basen is cytosine (C)?`, antwoord: (100 - 2 * a) / 2, eenheid: "%", hint: "T paart met A, dus A en T zijn even talrijk. C en G ook.", stappen: [`T = A = ${a}%, samen ${2 * a}%.`, `C + G = 100 − ${2 * a} = ${100 - 2 * a}%.`, `C = G = ${R.nl((100 - 2 * a) / 2, 1)}%.`] }; } },
          { gen: (R) => { const s = rnd(R, R.int(6, 9)); return { q: `Hoeveel waterstofbruggen zijn er in totaal tussen de twee strengen van dit stukje DNA? Eén streng: ${s}`, antwoord: hb(s), hint: "A-T: 2 bruggen, C-G: 3 bruggen.", stappen: [`A en T: ${s.replace(/[CG]/g, "").length} paren × 2 = ${2 * s.replace(/[CG]/g, "").length}`, `C en G: ${s.replace(/[AT]/g, "").length} paren × 3 = ${3 * s.replace(/[AT]/g, "").length}`, `Totaal: ${hb(s)}`] }; } },
          { gen: (R) => { const s = rnd(R, 8); return { q: `Schrijf de complementaire DNA-streng op van: ${s}`, antwoord: comp(s), hint: "A↔T en C↔G; geen U, want dit is DNA.", stappen: [`Base voor base: ${s.split("").map((b) => b + "→" + PAAR[b]).join(", ")}`, `Antwoord: ${comp(s)}`] }; } },
          { q: "Een stukje DNA bestaat uit 200 basenparen, waarvan 60 A-T-paren. Hoeveel waterstofbruggen houden de strengen bij elkaar?", antwoord: 540, hint: "Er zijn dus 140 C-G-paren.", stappen: ["60 A-T-paren × 2 = 120", "140 C-G-paren × 3 = 420", "120 + 420 = 540"] }
        ],
        oefen: [
          { type: "koppel", q: "Koppel de begrippen aan de omschrijving.", paren: [["nucleotide", "bouwsteen van DNA"], ["gen", "informatie voor één eiwit"], ["allel", "variant van een gen"], ["genoom", "al het DNA van een cel"], ["chromosoom", "opgerold DNA-molecuul met eiwitten"]], u: "Let op het verschil tussen gen (de plek met informatie) en allel (een variant daarvan)." },
          { type: "volgorde", q: "Zet in volgorde van klein naar groot.", items: ["stikstofbase", "nucleotide", "gen", "DNA-molecuul", "chromosoom", "genoom"], u: "Een gen is een stukje van een DNA-molecuul; een chromosoom is één DNA-molecuul met eiwitten." },
          { type: "invul", q: "Vul in.", tekst: "Een nucleotide bestaat uit de suiker {desoxyribose}, een {fosfaatgroep} en een stikstofbase. Tussen A en T zitten {2} waterstofbruggen, tussen C en G zitten er {3}.", extra: ["ribose", "1", "aminozuur"], u: "Ribose zit in RNA, niet in DNA." }
        ],
        open: [
          { q: "Leg uit waarom je uit de basenvolgorde van één DNA-streng de basenvolgorde van de andere streng kunt afleiden.", a: "Door de vaste basenparing: tegenover A staat altijd T en tegenover C altijd G. De strengen zijn complementair, dus elke base bepaalt welke base er tegenover staat.", punten: ["vaste basenparing A-T en C-G", "strengen zijn complementair"] },
          { q: "Bij drie-ouder-ivf wordt de celkern van een eicel van de moeder overgezet in een eicel van een donor, waaruit de kern is verwijderd. Leg uit hoe dit kan voorkomen dat een kind een mitochondriale aandoening van de moeder krijgt.", a: "De aandoening zit in het DNA van de mitochondriën van de moeder. De donoreicel heeft gezonde mitochondriën. Het kind krijgt de kern (met het DNA uit de kern) van de moeder, maar de mitochondriën van de donor, en dus niet het afwijkende mitochondriaal DNA.", punten: ["afwijking zit in mitochondriaal DNA", "mitochondriën komen uit de eicel", "kind krijgt gezonde mitochondriën van de donor"] }
        ],
        widgets: ["dna-bouwer"]
      },

      // ================= BS 2 DNA-replicatie =================
      {
        id: "t9-2", nr: "BS 2", titel: "DNA-replicatie (SE)",
        kern: [
          "Voordat een cel zich deelt, wordt al het DNA gekopieerd: [[DNA-replicatie]]. Zo krijgt elke dochtercel precies dezelfde erfelijke informatie.",
          { kop: "De celcyclus" },
          { fig: "celcyclus", bij: "De celcyclus: interfase (G1, S, G2) en de deling (M-fase)." },
          { tabel: { kop: ["fase", "wat gebeurt er"], rijen: [["G1-fase", "de cel groeit en maakt eiwitten en organellen"], ["S-fase", "DNA-replicatie: het DNA wordt verdubbeld"], ["G2-fase", "de cel maakt zich klaar voor de deling"], ["M-fase", "mitose: kern en cel delen"]] } },
          "G1, S en G2 vormen samen de [[interfase]]. Na de S-fase bestaat elk chromosoom uit twee identieke [[chromatide]]n.",
          "Bij de [[mitose]] gaan de chromatiden uit elkaar. Uit een diploïde cel (2n) ontstaan twee diploïde dochtercellen met dezelfde erfelijke informatie.",
          { kop: "Hoe DNA wordt gekopieerd" },
          { fig: "replicatie", bij: "DNA-replicatie: elk nieuw molecuul heeft één oude en één nieuwe streng." },
          { voorbeeld: { titel: "Replicatie in stappen", stappen: ["De waterstofbruggen tussen de basen worden verbroken: de twee strengen gaan uit elkaar.", "Elke oude streng dient als mal.", "Het enzym [[DNA-polymerase]] koppelt losse (vrije) nucleotiden tegen de oude streng aan, volgens de basenparing.", "Resultaat: twee identieke DNA-moleculen, elk met één oude en één nieuwe streng."] } },
          { tip: "Door de vaste basenparing is de kopie bijna altijd foutloos. Een fout die toch blijft zitten, is een mutatie (BS 5)." },
          { kop: "Telomeren" },
          "Aan de uiteinden van elk chromosoom zitten [[telomeren]]: stukken niet-coderend DNA met beschermende eiwitten.",
          "DNA-polymerase kan het allerlaatste stukje van een streng niet kopiëren. Daardoor worden de telomeren bij elke deling iets korter.",
          "Na ongeveer vijftig delingen zijn de telomeren zo kort dat de cel zich niet meer deelt en doodgaat. In stamcellen en de meeste kankercellen maakt het enzym telomerase de telomeren weer langer.",
          { let: "Telomeren bestaan juist uit niet-coderend DNA. Gingen er genen verloren bij elke deling, dan zou de cel belangrijke informatie kwijtraken." },
          { widget: "dna-bouwer" }
        ],
        begrippen: [
          ["DNA-replicatie", "Het kopiëren (verdubbelen) van DNA vóór een celdeling."],
          ["DNA-polymerase", "Enzym dat bij replicatie vrije nucleotiden tegen een oude streng aan koppelt."],
          ["vrije nucleotiden", "Losse nucleotiden in de kern, die worden ingebouwd in nieuw DNA."],
          ["celcyclus", "De vaste opeenvolging van groeien, DNA verdubbelen en delen: G1, S, G2 en M."],
          ["interfase", "De periode tussen twee delingen: G1-, S- en G2-fase samen."],
          ["S-fase", "Fase waarin het DNA wordt gerepliceerd."],
          ["chromatide", "Eén van de twee identieke helften van een verdubbeld chromosoom."],
          ["mitose", "Kerndeling waarbij elke dochtercel dezelfde chromosomen krijgt als de moedercel."],
          ["diploïd (2n)", "Met chromosomen in paren; menselijke lichaamscellen hebben er 46 (23 paren)."],
          ["telomeren", "Uiteinden van chromosomen van niet-coderend DNA, die bij elke deling korter worden."],
          ["telomerase", "Enzym dat telomeren weer verlengt; actief in stamcellen en veel kankercellen."],
          ["mal (bij replicatie)", "De oude streng waartegen de nieuwe streng wordt opgebouwd."]
        ],
        vragen: [
          { q: "In welke fase van de celcyclus vindt DNA-replicatie plaats?", a: ["In de S-fase", "In de G1-fase", "In de G2-fase", "In de M-fase"], u: "S staat voor synthese: in die fase wordt het DNA verdubbeld." },
          { q: "Welk enzym bouwt bij de replicatie nieuwe nucleotiden in?", a: ["DNA-polymerase", "Telomerase", "Een knipenzym", "Amylase"], u: "DNA-polymerase koppelt vrije nucleotiden tegen de oude streng aan." },
          { q: "Hoe ziet een DNA-molecuul eruit direct na de replicatie?", a: ["Eén oude en één nieuwe streng", "Twee nieuwe strengen", "Twee oude strengen", "Stukjes oude en nieuwe streng door elkaar"], u: "Elke oude streng blijft bestaan en krijgt een nieuwe partnerstreng." },
          { q: "Een menselijke lichaamscel bevindt zich in de G2-fase. Hoeveel chromatiden zitten er in de kern?", a: ["92", "46", "23", "184"], u: "Er zijn 46 chromosomen; na de S-fase bestaat elk uit twee chromatiden: 92." },
          { q: "Wat is het voordeel van de vaste basenparing bij de replicatie?", a: ["De nieuwe streng is een precieze kopie, zodat de dochtercellen dezelfde informatie krijgen", "De replicatie kost daardoor geen energie", "Het DNA kan daardoor sneller spiraliseren", "Er ontstaan daardoor steeds nieuwe allelen"], u: "Omdat tegenover elke base maar één base past, ontstaan identieke DNA-moleculen." },
          { q: "Waarom worden telomeren bij elke celdeling korter?", a: ["DNA-polymerase kan het uiteinde van een streng niet kopiëren", "Telomeren worden bij de mitose afgeknipt door de spoelfiguur", "De cel breekt telomeren af om energie te winnen", "Telomeren worden bij elke deling omgezet in genen"], u: "Het laatste stukje enkelstrengs DNA aan het uiteinde wordt niet gekopieerd en verdwijnt." },
          { q: "Waarom is het belangrijk dat telomeren uit niet-coderend DNA bestaan?", a: ["Bij het korter worden gaat dan geen informatie voor eiwitten verloren", "Niet-coderend DNA wordt sneller gekopieerd", "Niet-coderend DNA kan niet muteren", "Alleen niet-coderend DNA kan rond eiwitten worden opgerold"], u: "Telomeren raken bij elke deling een stukje kwijt. Zaten er genen in, dan raakte de cel die kwijt." },
          { q: "Een diploïde cel met 2n = 8 deelt door mitose. Hoeveel chromosomen heeft elke dochtercel?", a: ["8", "4", "16", "2"], u: "Bij mitose krijgen beide dochtercellen hetzelfde aantal chromosomen als de moedercel." },
          { q: "In welke fase van de celcyclus groeit de cel en vormt hij nieuwe organellen, nog vóór de replicatie?", a: ["G1-fase", "S-fase", "G2-fase", "M-fase"], u: "In de G1-fase groeit de cel; daarna volgt de S-fase met replicatie." },
          { q: "Een onderzoeker voegt radioactief gemerkte nucleotiden toe aan delende cellen. In welke fase worden die ingebouwd?", a: ["S-fase", "G1-fase", "G2-fase", "M-fase"], u: "Vrije nucleotiden worden alleen ingebouwd als er nieuw DNA wordt gemaakt: in de S-fase." }
        ],
        reken: [
          { gen: (R) => { const n = R.int(2, 6); return { q: `Een DNA-molecuul wordt ${n} keer achter elkaar gerepliceerd. Hoeveel DNA-moleculen zijn er daarna?`, antwoord: 2 ** n, hint: "Bij elke replicatie verdubbelt het aantal.", stappen: [`1 → 2 → 4 → … : na ${n} keer 2^{${n}}`, `2^{${n}} = ${2 ** n}`] }; } },
          { gen: (R) => { const n = R.int(2, 5); return { q: `Een DNA-molecuul met twee 'oude' strengen wordt ${n} keer gerepliceerd. Hoeveel van de ontstane moleculen bevatten nog een oude streng?`, antwoord: 2, hint: "De twee oude strengen blijven bestaan en komen elk in een ander molecuul.", stappen: ["Elke oude streng blijft heel en krijgt een nieuwe partner.", `Na ${n} replicaties zitten de 2 oude strengen nog steeds in 2 moleculen (van de ${2 ** n}).`] }; } },
          { gen: (R) => { const n = R.kies([4, 6, 8, 12, 14, 20, 46]); return { q: `Een diploïde cel heeft ${n} chromosomen. Hoeveel chromatiden zijn er in de kern aan het eind van de S-fase?`, antwoord: 2 * n, hint: "Na de replicatie bestaat elk chromosoom uit twee chromatiden.", stappen: [`${n} chromosomen × 2 chromatiden = ${2 * n}`] }; } }
        ],
        oefen: [
          { type: "volgorde", q: "Zet de gebeurtenissen van de DNA-replicatie in de juiste volgorde.", items: ["De waterstofbruggen tussen de basen worden verbroken", "De twee strengen gaan uit elkaar", "DNA-polymerase koppelt vrije nucleotiden tegen elke oude streng", "Er zijn twee identieke DNA-moleculen met elk een oude en een nieuwe streng"], u: "Eerst open, dan opbouwen volgens de basenparing." },
          { type: "sorteer", q: "In welke fase gebeurt dit?", groepen: ["interfase", "M-fase (mitose)"], items: [["DNA wordt gerepliceerd", 0], ["de cel groeit", 0], ["chromatiden gaan uit elkaar", 1], ["chromosomen zijn gespiraliseerd en zichtbaar", 1], ["de cel maakt zich klaar voor deling (G2)", 0], ["de cel deelt in tweeën", 1]], u: "Interfase = G1 + S + G2. Alleen in de M-fase zijn chromosomen zichtbaar." },
          { type: "invul", q: "Vul in.", tekst: "Aan de uiteinden van chromosomen zitten {telomeren}. Ze bestaan uit {niet-coderend} DNA en worden bij elke deling {korter}.", extra: ["centromeren", "coderend", "langer"], u: "Na ongeveer vijftig delingen zijn ze te kort en deelt de cel niet meer." }
        ],
        open: [
          { q: "Leg uit hoe het komt dat twee dochtercellen na een mitose dezelfde erfelijke informatie hebben.", a: "In de S-fase is al het DNA gerepliceerd. Door de vaste basenparing zijn de twee kopieën identiek: elk chromosoom bestaat uit twee gelijke chromatiden. Bij de mitose gaat van elk chromosoom één chromatide naar elke dochtercel.", punten: ["replicatie in de S-fase", "basenparing geeft identieke kopieën", "elke dochtercel krijgt één chromatide van elk chromosoom"] },
          { q: "Kankercellen kunnen zich eindeloos blijven delen. Leg met het begrip telomeren uit hoe dat kan.", a: "Normaal worden telomeren bij elke deling korter, tot de cel na ongeveer vijftig delingen niet meer deelt. In de meeste kankercellen is het enzym telomerase actief. Dat verlengt de telomeren steeds weer, zodat ze niet te kort worden en de cel kan blijven delen.", punten: ["telomeren worden normaal korter", "te korte telomeren: geen deling meer", "telomerase verlengt de telomeren"] }
        ],
        widgets: ["dna-bouwer"]
      },

      // ================= BS 3 Eiwitsynthese =================
      {
        id: "t9-3", nr: "BS 3", titel: "Eiwitsynthese",
        kern: [
          "Een gen bevat de informatie voor een eiwit. Bij de [[eiwitsynthese]] gebruikt de cel die informatie in twee stappen: [[transcriptie]] en [[translatie]].",
          { fig: "eiwitsynthese", bij: "Transcriptie in de kern, translatie bij een ribosoom." },
          { kop: "Stap 1: transcriptie (in de celkern)" },
          "Het DNA gaat bij het gen open. Langs één van de twee strengen, de **template-streng**, wordt een [[mRNA]]-molecuul gebouwd volgens de basenparing.",
          "RNA verschilt van DNA: het is enkelstrengs, bevat de suiker ribose en heeft de base **U** (uracil) in plaats van T. Tegenover A in het DNA komt dus U in het mRNA.",
          { voorbeeld: { titel: "Van template-streng naar mRNA", stappen: ["Template-streng (DNA): TAC CGA TTT ACT", "Tegenover T komt A, tegenover A komt U, tegenover C komt G, tegenover G komt C.", "mRNA: AUG GCU AAA UGA", "Het mRNA heeft dezelfde volgorde als de andere DNA-streng (de coderende streng), alleen met U in plaats van T."] } },
          "Het mRNA verlaat de kern via een kernporie en gaat naar een [[ribosoom]] in het cytoplasma of op het ER.",
          { kop: "Stap 2: translatie (bij een ribosoom)" },
          "Het ribosoom leest het mRNA per drie basen: een [[codon]]. Elk codon staat voor één aminozuur. Welk aminozuur dat is, zoek je op in de codontabel (de genetische code).",
          { fig: "translatie", bij: "tRNA-moleculen met een passend anticodon brengen de aminozuren." },
          "De translatie begint bij het [[startcodon]] AUG (methionine). Het ribosoom schuift codon voor codon op en koppelt de aminozuren aan elkaar, tot het een [[stopcodon]] tegenkomt: UAA, UAG of UGA. Dan laat de aminozuurketen los.",
          "Aminozuren worden aangevoerd door [[tRNA]]-moleculen. Elk tRNA heeft een [[anticodon]] dat complementair is aan een codon.",
          { fig: "codontabel", bij: "De codontabel: lees de 1e base links, de 2e base boven en zoek dan de 3e base." },
          { tip: "Er zijn 64 codons, maar maar 20 aminozuren: de meeste aminozuren hebben meerdere codons. Vanuit een aminozuurvolgorde kun je daarom het mRNA niet precies terugvinden." },
          { kop: "Eiwitten voor buiten de cel" },
          "Eiwitten die de cel uitscheidt, worden gemaakt door ribosomen op het **ER**. Het ER verpakt ze in transportblaasjes, het **golgisysteem** geeft ze hun definitieve vorm, en een blaasje versmelt met het celmembraan.",
          { widget: "eiwitfabriek" }
        ],
        begrippen: [
          ["eiwitsynthese", "Het maken van een eiwit met de informatie van een gen: transcriptie en translatie."],
          ["transcriptie", "Het overschrijven van een gen in mRNA, in de celkern."],
          ["translatie", "Het vertalen van mRNA in een aminozuurketen, bij een ribosoom."],
          ["mRNA", "Boodschapper-RNA: enkelstrengs kopie van een gen, met U in plaats van T."],
          ["template-streng", "De DNA-streng waarlangs het mRNA wordt gebouwd."],
          ["coderende streng", "De andere DNA-streng; heeft dezelfde volgorde als het mRNA, maar met T in plaats van U."],
          ["uracil (U)", "Base in RNA die de plaats van thymine inneemt; paart met A."],
          ["codon", "Drie opeenvolgende basen in mRNA die samen voor één aminozuur (of stop) coderen."],
          ["startcodon", "AUG: hier begint de translatie; codeert voor methionine."],
          ["stopcodon", "UAA, UAG of UGA: codeert niet voor een aminozuur; de translatie stopt."],
          ["genetische code", "De vertaling van codons naar aminozuren, voor bijna alle organismen gelijk."],
          ["ribosoom", "Organel waar de translatie plaatsvindt."],
          ["tRNA", "Transport-RNA: brengt een aminozuur naar het ribosoom."],
          ["anticodon", "Drie basen op een tRNA, complementair aan een codon op het mRNA."],
          ["aminozuur", "Bouwsteen van een eiwit; er zijn 20 verschillende."]
        ],
        vragen: [
          { q: "Waar vindt de transcriptie plaats?", a: ["In de celkern", "Bij de ribosomen", "In het golgisysteem", "In de mitochondriën en de vacuole"], u: "Transcriptie gebeurt bij het DNA, in de kern. Translatie gebeurt bij de ribosomen." },
          { q: "Een stukje template-streng is TACGGT. Welk mRNA wordt hierlangs gemaakt?", a: ["AUGCCA", "ATGCCA", "TACGGT", "UACGGU"], u: "Tegenover T komt A, tegenover A komt U, tegenover C komt G en tegenover G komt C." },
          { q: "Een stukje coderende streng is ATGGCA. Wat is het mRNA?", a: ["AUGGCA", "UACCGU", "TACCGT", "ATGGCA"], u: "Het mRNA heeft dezelfde volgorde als de coderende streng, met U in plaats van T." },
          { q: "Welk aminozuur hoort bij het codon UGG?", a: ["Trp (tryptofaan)", "Cys (cysteïne)", "Gly (glycine)", "stop"], u: "In de codontabel: 1e base U, 2e base G, 3e base G: tryptofaan." },
          { q: "Een mRNA bestaat van startcodon tot en met stopcodon uit 300 nucleotiden. Uit hoeveel aminozuren bestaat het eiwit?", a: ["99", "100", "300", "900"], u: "300 / 3 = 100 codons. Het stopcodon levert geen aminozuur: 99." },
          { q: "Het codon op het mRNA is GCU. Welk anticodon heeft het tRNA dat hierbij past?", a: ["CGA", "GCU", "CGT", "GCA"], u: "Het anticodon is complementair: G↔C, C↔G, U↔A. RNA bevat geen T." },
          { q: "Wat gebeurt er als het ribosoom het codon UAA afleest?", a: ["De translatie stopt en de aminozuurketen laat los", "Er wordt methionine ingebouwd", "Het ribosoom gaat terug naar het startcodon", "Het mRNA wordt teruggebracht naar de kern"], u: "UAA is een stopcodon: het codeert niet voor een aminozuur." },
          { q: "Waarom kun je uit de aminozuurvolgorde van een eiwit de basenvolgorde van het mRNA niet precies afleiden?", a: ["De meeste aminozuren hebben meer dan één codon", "Elk codon codeert voor meerdere aminozuren", "Het mRNA wordt na de translatie veranderd", "Ribosomen slaan soms codons over"], u: "De code is meervoudig: leucine heeft bijvoorbeeld zes codons." },
          { q: "Welk verschil tussen DNA en RNA is juist?", a: ["RNA bevat U in plaats van T en is enkelstrengs", "RNA bevat T in plaats van U en is dubbelstrengs", "RNA bevat desoxyribose, DNA bevat ribose", "RNA komt alleen in de celkern voor"], u: "RNA: ribose, U, één streng. DNA: desoxyribose, T, twee strengen." },
          { q: "Een eiwit dat de cel uitscheidt, wordt gemaakt op het ER. Welke route volgt het daarna?", a: ["ER → transportblaasje → golgisysteem → blaasje → celmembraan", "ER → kern → golgisysteem → celmembraan", "golgisysteem → ER → ribosoom → celmembraan", "ER → mitochondrion → blaasje → celmembraan"], u: "Het golgisysteem werkt het eiwit af en verpakt het in een blaasje dat met het celmembraan versmelt." },
          { q: "Waarom kunnen bacteriën een menselijk gen gebruiken om een menselijk eiwit te maken?", a: ["De genetische code is bij bijna alle organismen hetzelfde", "Bacteriën hebben dezelfde chromosomen als mensen", "Bacteriën maken alle eiwitten die er bestaan", "Menselijk DNA bevat geen stopcodons"], u: "Een codon betekent in een bacterie hetzelfde aminozuur als in een mens." }
        ],
        reken: [
          { gen: (R) => { const n = R.int(40, 400); return { q: `Een eiwit bestaat uit ${n} aminozuren. Uit hoeveel nucleotiden bestaat het mRNA van startcodon tot en met stopcodon?`, antwoord: 3 * (n + 1), hint: "Elk aminozuur heeft één codon, en het stopcodon komt erbij.", stappen: [`${n} aminozuren + 1 stopcodon = ${n + 1} codons`, `${n + 1} × 3 = ${3 * (n + 1)} nucleotiden`] }; } },
          { gen: (R) => { const c = R.kies(Object.keys(BIO.CODE).filter((x) => BIO.CODE[x] !== "stop")); const az = BIO.CODE[c]; return { q: `Welk aminozuur hoort bij het mRNA-codon ${c}? Geef de afkorting van drie letters (zoals Met).`, antwoord: [az, BIO.NAAM[az]], hint: "Lees 1e base links, 2e base boven, dan de 3e base in het vak.", stappen: [`1e base ${c[0]}, 2e base ${c[1]}, 3e base ${c[2]}`, `${c} = ${az} (${BIO.NAAM[az]})`] }; } },
          { gen: (R) => { const m = BIO.gen(R.int(2, 4), R), tpl = m.split("").map((b) => ({ A: "T", U: "A", C: "G", G: "C" })[b]).join(""), n = m.length / 3 - 1; return { q: `Een stukje template-streng van een gen is: ${tpl}. Uit hoeveel aminozuren bestaat het eiwit dat hiermee gemaakt wordt?`, antwoord: n, hint: "Maak eerst het mRNA (A→U, T→A, C→G, G→C) en zoek start- en stopcodon.", stappen: [`mRNA: ${BIO.codons(m).join(" ")}`, `Startcodon AUG tot en met stopcodon ${m.slice(-3)}: ${m.length / 3} codons`, `Het stopcodon levert geen aminozuur: ${n} aminozuren`] }; } }
        ],
        oefen: [
          { type: "volgorde", q: "Zet de stappen van het maken van een eiwit dat de cel uitscheidt in de goede volgorde.", items: ["Er wordt een mRNA-molecuul gevormd langs het DNA", "Het mRNA verlaat de kern via een kernporie", "Een ribosoom op het ER hecht zich aan het startcodon", "Het ribosoom vormt een aminozuurketen", "Het ER vormt een transportblaasje om de keten", "Het eiwit krijgt zijn definitieve vorm in het golgisysteem", "Een blaasje versmelt met het celmembraan"], u: "Transcriptie, translatie, afwerking en uitscheiding." },
          { type: "sorteer", q: "Hoort dit bij transcriptie of bij translatie?", groepen: ["transcriptie", "translatie"], items: [["vindt plaats in de celkern", 0], ["er wordt mRNA gemaakt", 0], ["U komt tegenover A in het DNA", 0], ["tRNA brengt aminozuren", 1], ["een ribosoom leest codons", 1], ["eindigt bij een stopcodon", 1]], u: "Transcriptie: DNA → mRNA. Translatie: mRNA → aminozuurketen." },
          { type: "koppel", q: "Koppel aan elkaar.", paren: [["codon", "drie basen op het mRNA"], ["anticodon", "drie basen op het tRNA"], ["AUG", "startcodon"], ["UGA", "stopcodon"], ["ribosoom", "plaats van de translatie"]], u: "Het anticodon is complementair aan het codon." },
          { type: "invul", q: "Vul in.", tekst: "Bij de {transcriptie} wordt in de kern een {mRNA}-molecuul gemaakt. Een ribosoom leest dit af in groepjes van {drie} basen, de codons.", extra: ["translatie", "tRNA", "twee"], u: "Translatie is de tweede stap, bij het ribosoom." }
        ],
        open: [
          { q: "Leg uit waarom een stopcodon nodig is om een werkend eiwit te krijgen.", a: "Een stopcodon codeert niet voor een aminozuur. Als het ribosoom het afleest, stopt de translatie en laat de aminozuurketen los. Zonder stopcodon zou de keten te lang worden (of niet loskomen) en zou het eiwit een verkeerde vorm en functie krijgen.", punten: ["stopcodon codeert niet voor een aminozuur", "translatie stopt, keten laat los", "juiste lengte geeft juiste vorm en functie"] },
          { q: "Van één gen worden in een cel vaak heel veel mRNA-moleculen gemaakt. Leg uit wat het voordeel daarvan is.", a: "Van elk gen zit maar één (of twee) kopie in de kern. Door veel mRNA-moleculen te maken, kunnen veel ribosomen tegelijk het eiwit maken. Zo wordt in korte tijd veel eiwit geproduceerd, terwijl het DNA zelf in de kern blijft.", punten: ["gen komt maar één of twee keer voor", "veel ribosomen tegelijk aan het werk", "snel veel eiwit"] }
        ],
        widgets: ["eiwitfabriek"]
      },

      // ================= BS 4 Genexpressie =================
      {
        id: "t9-4", nr: "BS 4", titel: "Genexpressie",
        kern: [
          "Al je lichaamscellen hebben hetzelfde DNA. Toch is een zenuwcel heel anders dan een spiercel. Dat komt doordat in elk celtype andere genen **aan** staan.",
          "Als een gen wordt afgelezen en er een eiwit van wordt gemaakt, is er sprake van [[genexpressie]]. Het aan- en uitzetten van genen heet [[genregulatie]].",
          { fig: "differentiatie", bij: "Zelfde genen, andere genen aan: celdifferentiatie." },
          { kop: "Celdifferentiatie en stamcellen" },
          "Tijdens de ontwikkeling van een embryo gaan cellen zich specialiseren: [[celdifferentiatie]]. Welke genen aanstaan, bepaalt welke eiwitten een cel maakt, en dus haar vorm en functie.",
          "[[Stamcel]]len zijn nog niet gespecialiseerd. Een bevruchte eicel en de eerste cellen daarna zijn **embryonale stamcellen**: daaruit kan elk celtype ontstaan. **Adulte stamcellen**, zoals in de kiemlaag van je huid of in het rode beenmerg, kunnen maar een paar celtypen worden.",
          { kop: "Genregulatie bij bacteriën" },
          { fig: "genexpressie", bij: "Een regulatorgen bepaalt of een structuurgen wordt afgelezen." },
          "Een [[structuurgen]] codeert voor een eiwit met een taak in de cel, zoals een enzym. Een [[regulatorgen]] codeert voor een eiwit dat andere genen aan- of uitzet.",
          { voorbeeld: { titel: "Lactose bij E. coli", stappen: ["De darmbacterie E. coli heeft structuurgenen voor enzymen die lactose verteren. Ze liggen naast elkaar in het DNA.", "Een regulatorgen codeert voor een [[repressor]]. Die bindt aan het DNA vóór de structuurgenen en blokkeert de transcriptie.", "Is er lactose, dan wordt de repressor inactief en laat hij los.", "De structuurgenen worden afgelezen: de bacterie maakt de enzymen pas als er lactose te verteren valt."] } },
          "Bij het aminozuur tryptofaan werkt het omgekeerd: is er genoeg tryptofaan, dan remt het zijn eigen aanmaak. Dat heet [[negatieve terugkoppeling]].",
          { tip: "Het voordeel van genregulatie: de cel maakt alleen eiwitten die op dat moment nodig zijn en verspilt geen energie en bouwstoffen." },
          { kop: "Epigenetica" },
          "Ook het milieu (voeding, stress, roken, temperatuur) kan beïnvloeden welke genen aanstaan. Zulke [[epigenetische factoren]] veranderen de nucleotidenvolgorde **niet**, maar wel de genexpressie.",
          "Dat gaat bijvoorbeeld doordat DNA strakker of losser rond eiwitten wordt opgerold (strak opgerold DNA wordt slecht afgelezen), of door [[DNA-methylering]]: er worden methylgroepen aan het DNA gekoppeld, waardoor een gen uitgaat.",
          { let: "Epigenetische veranderingen zijn geen mutaties: de basenvolgorde blijft gelijk." }
        ],
        begrippen: [
          ["genexpressie", "Het tot uiting komen van een gen: het gen wordt afgelezen en er wordt een eiwit gemaakt."],
          ["genregulatie", "Het aan- en uitzetten van genen."],
          ["celdifferentiatie", "Het specialiseren van cellen tot een bepaald celtype doordat andere genen aanstaan."],
          ["stamcel", "Ongespecialiseerde cel die kan delen en zich kan ontwikkelen tot andere celtypen."],
          ["embryonale stamcel", "Stamcel uit een vroeg embryo; kan zich ontwikkelen tot elk celtype."],
          ["adulte stamcel", "Stamcel in een volwassen weefsel; kan maar een beperkt aantal celtypen worden."],
          ["structuurgen", "Gen dat codeert voor een eiwit met een taak in de cel, zoals een enzym."],
          ["regulatorgen", "Gen dat codeert voor een eiwit dat andere genen aan- of uitzet."],
          ["repressor", "Regulatoreiwit dat aan het DNA bindt en de transcriptie van structuurgenen blokkeert."],
          ["negatieve terugkoppeling", "Een stof die ontstaat, remt zijn eigen aanmaak."],
          ["epigenetische factoren", "Invloeden die de genexpressie veranderen zonder de nucleotidenvolgorde te veranderen."],
          ["DNA-methylering", "Koppelen van methylgroepen aan DNA, waardoor genen worden uitgezet."]
        ],
        vragen: [
          { q: "Een zenuwcel en een spiercel van dezelfde persoon verschillen sterk. Hoe komt dat?", a: ["In beide cellen staan andere genen aan", "Ze hebben verschillende genen", "Een spiercel heeft meer chromosomen", "In een zenuwcel zijn genen gemuteerd"], u: "Alle lichaamscellen hebben hetzelfde DNA; de genexpressie verschilt." },
          { q: "Wat doet een repressor bij de lactosegenen van E. coli als er geen lactose is?", a: ["Hij bindt aan het DNA en blokkeert de transcriptie van de structuurgenen", "Hij breekt de lactose af", "Hij zet de structuurgenen aan", "Hij knipt de structuurgenen uit het DNA"], u: "Zonder lactose zit de repressor op het DNA; de enzymen worden dan niet gemaakt." },
          { q: "Wat is het voordeel voor E. coli dat de lactosegenen alleen aanstaan als er lactose is?", a: ["De bacterie maakt geen enzymen die ze niet nodig heeft en bespaart energie en bouwstoffen", "De bacterie kan dan sneller delen zonder voedsel", "De lactose wordt zo omgezet in DNA", "De bacterie wordt zo resistent tegen antibiotica"], u: "Eiwitten maken kost energie; dat is zonde als er niets te verteren valt." },
          { q: "Hoe kan één regulatorgen meerdere structuurgenen tegelijk aan- of uitzetten?", a: ["De structuurgenen liggen naast elkaar en worden samen afgelezen", "Het regulatorgen bevat de informatie van alle structuurgenen", "Elk structuurgen heeft een kopie van het regulatorgen", "Het regulatoreiwit wordt in alle structuurgenen ingebouwd"], u: "De repressor blokkeert de transcriptie van de hele rij structuurgenen tegelijk." },
          { q: "Als E. coli genoeg tryptofaan heeft, stopt de aanmaak van tryptofaan. Hoe heet dit?", a: ["Negatieve terugkoppeling", "Positieve terugkoppeling", "Celdifferentiatie", "DNA-replicatie"], u: "Het product remt zijn eigen aanmaak: negatieve terugkoppeling." },
          { q: "Welk type stamcel is een bevruchte eicel?", a: ["Een embryonale stamcel", "Een adulte stamcel", "Een gedifferentieerde cel", "Een geslachtscel zonder genen"], u: "Uit een bevruchte eicel kunnen alle celtypen ontstaan, ook placenta en navelstreng." },
          { q: "De kiemlaag van de huid kan alleen nieuwe huidcellen maken. Wat voor cellen zitten daar?", a: ["Adulte stamcellen", "Embryonale stamcellen", "Geslachtscellen", "Kankercellen"], u: "Adulte stamcellen kunnen maar een beperkt aantal celtypen vormen." },
          { q: "Welke uitspraak over epigenetische factoren is juist?", a: ["Ze veranderen de genexpressie, maar niet de nucleotidenvolgorde", "Ze veranderen de nucleotidenvolgorde, maar niet de genexpressie", "Ze veranderen zowel de nucleotidenvolgorde als de genexpressie", "Ze hebben alleen invloed op mitochondriaal DNA"], u: "Epigenetica gaat over aan en uit, niet over de basenvolgorde." },
          { q: "Hoe kan DNA-methylering een gen beïnvloeden?", a: ["Het gen wordt uitgezet en niet meer afgelezen", "Het gen wordt verdubbeld", "Er ontstaat een puntmutatie in het gen", "Het gen verhuist naar een ander chromosoom"], u: "Methylgroepen op het DNA zorgen dat transcriptie van dat gen stopt." },
          { q: "DNA dat strak rond eiwitten is opgerold, wordt ...", a: ["slecht afgelezen, waardoor die genen uit staan", "sneller afgelezen, waardoor die genen extra actief zijn", "omgezet in RNA", "afgebroken door de cel"], u: "Transcriptie-eiwitten kunnen strak opgerold DNA moeilijk bereiken." }
        ],
        oefen: [
          { type: "volgorde", q: "Zet de gebeurtenissen bij E. coli in de goede volgorde als er lactose in de darm komt.", items: ["Lactose komt de bacterie binnen", "De repressor wordt inactief", "De repressor laat los van het DNA", "De structuurgenen worden getranscribeerd", "De bacterie maakt enzymen die lactose verteren"], u: "Lactose zet de genen indirect aan door de repressor uit te schakelen." },
          { type: "koppel", q: "Koppel aan elkaar.", paren: [["regulatorgen", "codeert voor een repressor"], ["structuurgen", "codeert voor bijvoorbeeld een enzym"], ["embryonale stamcel", "kan elk celtype worden"], ["DNA-methylering", "zet een gen uit zonder mutatie"], ["celdifferentiatie", "cellen specialiseren zich"]], u: "Let op: epigenetica verandert de genexpressie, niet de basenvolgorde." },
          { type: "invul", q: "Vul in.", tekst: "Alle lichaamscellen bevatten {dezelfde} genen. Door {genregulatie} staan in elk celtype andere genen aan. Invloeden uit het milieu die dit veranderen zonder de basenvolgorde te veranderen, heten {epigenetische} factoren.", extra: ["andere", "mutatie", "mutagene"], u: "Mutagene factoren veroorzaken juist mutaties (BS 5)." }
        ],
        open: [
          { q: "Leg uit waarom het voor organismen belangrijk is dat ze hun genexpressie kunnen aanpassen aan de omstandigheden.", a: "Een organisme maakt dan alleen eiwitten die op dat moment nodig zijn. Het verspilt zo geen energie en bouwstoffen aan eiwitten die niets te doen hebben. Bovendien kan het snel reageren op een verandering, zoals een nieuwe voedselbron.", punten: ["alleen nodige eiwitten maken", "geen verspilling van energie en bouwstoffen", "kunnen reageren op veranderingen"] },
          { q: "Eeneiige tweelingen hebben hetzelfde DNA, maar gaan met de jaren steeds meer van elkaar verschillen. Leg dit uit met het begrip genexpressie.", a: "Ze hebben dezelfde nucleotidenvolgorde, maar leven in een verschillend milieu (voeding, stress, roken). Epigenetische factoren zetten bij de een andere genen aan of uit dan bij de ander. Hoe ouder ze worden, hoe langer die verschillende invloeden werken, dus hoe meer de genexpressie en daarmee het fenotype verschilt.", punten: ["zelfde DNA", "verschillend milieu", "epigenetische factoren veranderen genexpressie", "verschil groeit met de tijd"] }
        ]
      },

      // ================= BS 5 Mutaties =================
      {
        id: "t9-5", nr: "BS 5", titel: "Mutaties",
        kern: [
          "Een [[mutatie]] is een blijvende verandering in het DNA. Een mutatie kan ontstaan door een fout bij de replicatie of door schade aan het DNA.",
          { kop: "Soorten mutaties" },
          { tabel: { kop: ["soort", "wat verandert er", "voorbeeld"], rijen: [["genmutatie (puntmutatie)", "één of enkele nucleotidenparen in een gen", "sikkelcelanemie"], ["chromosoommutatie", "de bouw van een chromosoom: een stuk verdwijnt, verdubbelt of zit omgekeerd", "een stuk van chromosoom 5 mist"], ["genoommutatie", "het aantal chromosomen", "syndroom van Down, syndroom van Turner"]] } },
          "Bij een [[puntmutatie]] is een nucleotidenpaar **vervangen**, **verwijderd** of **ingevoegd**.",
          { fig: "mutaties", bij: "Gevolgen van een puntmutatie voor de aminozuurvolgorde." },
          { tabel: { kop: ["gevolg", "wat gebeurt er"], rijen: [["geen effect", "nieuw codon, maar hetzelfde aminozuur"], ["ander aminozuur", "het eiwit kan anders vouwen en slechter werken"], ["vroeg stopcodon", "het eiwit wordt te kort en werkt meestal niet"], ["leesraamverschuiving", "na een verwijdering of invoeging verandert elk volgend codon"]] } },
          { let: "Een verwijdering of invoeging van één base heeft meestal een veel groter effect dan een vervanging: het hele leesraam verschuift." },
          { widget: "mutatie-lab" },
          { kop: "Sikkelcelanemie" },
          { fig: "sikkelcel", bij: "Eén veranderde base in het hemoglobinegen." },
          "Bij [[sikkelcelanemie]] is in het gen voor hemoglobine één nucleotidenpaar vervangen. Op de coderende streng wordt GAG (glutaminezuur) GTG (valine). Homozygote dragers maken sikkelvormige rode bloedcellen die vastlopen in haarvaten en minder zuurstof vervoeren.",
          "Heterozygote dragers zijn beter beschermd tegen malaria: de malariaparasiet kan zich in hun rode bloedcellen slecht vermeerderen. Daarom komt het sikkelcelallel veel voor in gebieden met malaria (Samenhang 'Sikkelcellen en malariaparasieten').",
          { kop: "Genoommutaties" },
          "Een genoommutatie ontstaat meestal tijdens de meiose: een chromosomenpaar of de twee chromatiden van een chromosoom gaan niet uit elkaar ([[non-disjunctie]]). Een geslachtscel krijgt dan een chromosoom te veel of te weinig.",
          "Bij het **syndroom van Down** zijn er drie exemplaren van chromosoom 21 (47 chromosomen). Bij het **syndroom van Turner** heeft een vrouw maar één X-chromosoom (45 chromosomen).",
          { kop: "Mutagene factoren en kanker" },
          "[[Mutagene factoren]] vergroten de kans op mutaties: uv-straling, röntgenstraling en radioactieve straling, bepaalde stoffen (zoals in tabaksrook) en sommige virussen.",
          "De cel kan veel DNA-schade herstellen. Mislukt dat in genen die de celdeling regelen, dan kan een cel ongeremd gaan delen: een [[tumor]]. Een goedaardige tumor blijft op zijn plaats; een kwaadaardige tumor (kanker) groeit in ander weefsel en kan uitzaaien.",
          { tip: "Alleen mutaties in geslachtscellen (of de cellen waaruit die ontstaan) worden doorgegeven aan nakomelingen. Een mutatie in een huidcel is niet erfelijk." }
        ],
        begrippen: [
          ["mutatie", "Blijvende verandering in de erfelijke informatie (het DNA)."],
          ["puntmutatie", "Mutatie waarbij één nucleotidenpaar wordt vervangen, verwijderd of ingevoegd."],
          ["genmutatie", "Mutatie in de nucleotidenvolgorde van één gen."],
          ["chromosoommutatie", "Verandering in de bouw van een chromosoom, bijvoorbeeld een stuk dat mist."],
          ["genoommutatie", "Verandering in het aantal chromosomen."],
          ["leesraamverschuiving", "Na een verwijdering of invoeging worden alle volgende codons anders gelezen."],
          ["non-disjunctie", "Chromosomen of chromatiden gaan bij de deling niet uit elkaar."],
          ["syndroom van Down", "Genoommutatie: drie exemplaren van chromosoom 21."],
          ["syndroom van Turner", "Genoommutatie: een vrouw met maar één X-chromosoom."],
          ["mutagene factor", "Invloed uit het milieu die de kans op mutaties vergroot, zoals straling of bepaalde stoffen."],
          ["sikkelcelanemie", "Erfelijke ziekte door een puntmutatie in het hemoglobinegen; sikkelvormige rode bloedcellen."],
          ["tumor", "Gezwel van cellen die ongeremd delen."],
          ["kwaadaardige tumor", "Tumor die in omliggend weefsel groeit en kan uitzaaien: kanker."],
          ["cytostatica", "Medicijnen die de celdeling remmen; ze treffen ook gezonde, snel delende cellen."]
        ],
        vragen: [
          { q: "In een gen is één nucleotidenpaar verwijderd vlak na het startcodon. Wat is het meest waarschijnlijke gevolg?", a: ["Het leesraam verschuift, waardoor bijna alle volgende aminozuren anders zijn", "Er verandert precies één aminozuur", "Het eiwit wordt één aminozuur korter, verder blijft alles gelijk", "Er verandert niets, want de code is meervoudig"], u: "Na een verwijdering worden alle volgende codons anders ingedeeld; vaak ontstaat ook snel een stopcodon." },
          { q: "Op de coderende streng verandert GCT in GCC. Wat is het gevolg?", a: ["Geen: beide codons coderen voor alanine", "Alanine wordt vervangen door glycine", "Er ontstaat een stopcodon", "Het leesraam verschuift"], u: "GCU en GCC coderen allebei voor Ala. Zo'n mutatie heeft geen effect op het eiwit." },
          { q: "Op de coderende streng verandert TGG in TGA. Wat is het gevolg?", a: ["Er ontstaat een stopcodon, het eiwit wordt te kort", "Tryptofaan wordt vervangen door cysteïne", "Er verandert niets", "Het leesraam verschuift"], u: "UGG = Trp, UGA = stop." },
          { q: "Welk type mutatie is het syndroom van Down?", a: ["Een genoommutatie", "Een puntmutatie", "Een chromosoommutatie", "Een epigenetische verandering"], u: "Er is een chromosoom extra (drie keer chromosoom 21): het aantal chromosomen is veranderd." },
          { q: "Hoe kan het syndroom van Turner ontstaan?", a: ["Bij de meiose gaan twee X-chromosomen samen naar één pool, zodat een geslachtscel geen X krijgt", "Door uv-straling verdwijnt een X-chromosoom uit de huidcellen", "Door een puntmutatie in het X-chromosoom", "Doordat de vader twee Y-chromosomen doorgeeft"], u: "Non-disjunctie: een eicel of zaadcel zonder geslachtschromosoom versmelt met een cel met één X." },
          { q: "Welke factor is géén mutagene factor?", a: ["Een eiwitrijk dieet", "Uv-straling", "Stoffen in tabaksrook", "Röntgenstraling"], u: "Straling en bepaalde chemische stoffen beschadigen DNA; eiwitrijk eten niet." },
          { q: "Bij sikkelcelanemie verandert GAG in GTG op de coderende streng. Welk aminozuur wordt door welk vervangen?", a: ["Glutaminezuur door valine", "Valine door glutaminezuur", "Glycine door valine", "Glutamine door leucine"], u: "mRNA GAG = Glu, GUG = Val." },
          { q: "Waarom heeft een mutatie in een lichaamscel vaak geen merkbaar gevolg?", a: ["Het gen staat in die cel misschien uit, en het gaat maar om één van de vele cellen", "Lichaamscellen kunnen niet muteren", "Mutaties in lichaamscellen worden altijd doorgegeven aan kinderen", "Lichaamscellen hebben geen genen"], u: "Andere redenen: hetzelfde aminozuur blijft, of het nieuwe allel is recessief." },
          { q: "Waarom vergroten mutaties de kans op kanker?", a: ["Mutaties in genen die de celdeling regelen kunnen leiden tot ongeremde deling", "Mutaties maken cellen groter", "Mutaties zorgen dat cellen minder snel delen", "Mutaties veranderen witte bloedcellen in tumoren"], u: "Als de rem op de celdeling wegvalt, ontstaat een tumor." },
          { q: "Wat is het verschil tussen een goedaardige en een kwaadaardige tumor?", a: ["Een kwaadaardige tumor groeit in ander weefsel en kan uitzaaien", "Een goedaardige tumor bestaat uit gezonde cellen die niet delen", "Een kwaadaardige tumor bevat geen DNA", "Een goedaardige tumor ontstaat door een genoommutatie"], u: "Goedaardig: blijft op zijn plek. Kwaadaardig: dringt binnen en zaait uit." },
          { q: "Waarom komt het sikkelcelallel veel voor in gebieden waar malaria heerst?", a: ["Heterozygote dragers zijn beter beschermd tegen malaria en overleven vaker", "Malariamuggen veroorzaken de mutatie", "Homozygote zieken zijn immuun en krijgen meer kinderen", "Het allel ontstaat door de hitte steeds opnieuw"], u: "Natuurlijke selectie: dragers (heterozygoot) hebben in malariagebied een overlevingsvoordeel." },
          { q: "Cytostatica remmen de celdeling. Waarom krijgen patiënten er vaak haaruitval van?", a: ["Haarzakjes bevatten snel delende cellen, die ook worden geremd", "Cytostatica veroorzaken mutaties in de haren", "Haar bestaat uit kankercellen", "Cytostatica breken eiwitten in het haar af"], u: "Cytostatica treffen alle snel delende cellen, ook gezonde." }
        ],
        reken: [
          { gen: (R) => { let dna, mut, pos, c, mc; do { dna = "ATG"; for (let i = 0; i < 4; i++) dna += R.kies(Object.keys(BIO.CODE).filter((x) => BIO.CODE[x] !== "stop" && x !== "AUG")).replace(/U/g, "T"); dna += "TAA"; pos = R.int(3, 13); const nb = R.kies(["A", "T", "C", "G"].filter((b) => b !== dna[pos])); mut = dna.slice(0, pos) + nb + dna.slice(pos + 1); c = Math.floor(pos / 3); mc = BIO.CODE[mut.slice(c * 3, c * 3 + 3).replace(/T/g, "U")]; } while (!mc); const orig = BIO.CODE[dna.slice(c * 3, c * 3 + 3).replace(/T/g, "U")]; const goed = mc === orig ? "geen effect" : mc === "stop" ? "stopcodon" : "ander aminozuur"; return { q: `Coderende streng normaal: ${dna}\nNa de mutatie: ${mut}\nWat is het gevolg voor het eiwit? Typ: geen effect, ander aminozuur of stopcodon.`, antwoord: goed === "stopcodon" ? ["stopcodon", "stop", "vroeg stopcodon"] : [goed], hint: "Zoek het codon waarin de verandering zit en vertaal het oude en nieuwe codon (T wordt U).", stappen: [`De verandering zit in codon ${c + 1}: ${dna.slice(c * 3, c * 3 + 3)} → ${mut.slice(c * 3, c * 3 + 3)}`, `mRNA: ${dna.slice(c * 3, c * 3 + 3).replace(/T/g, "U")} = ${orig}, ${mut.slice(c * 3, c * 3 + 3).replace(/T/g, "U")} = ${mc}`, `Gevolg: ${goed}`] }; } },
          { q: "Een normale menselijke lichaamscel heeft 46 chromosomen. Hoeveel chromosomen heeft een lichaamscel van iemand met het syndroom van Down?", antwoord: 47, hint: "Chromosoom 21 komt drie keer voor in plaats van twee.", stappen: ["46 + 1 extra chromosoom 21 = 47"] },
          { q: "Hoeveel chromosomen heeft een lichaamscel van een vrouw met het syndroom van Turner?", antwoord: 45, hint: "Ze mist één X-chromosoom.", stappen: ["44 gewone chromosomen + één X = 45"] }
        ],
        oefen: [
          { type: "sorteer", q: "Welk soort mutatie is dit?", groepen: ["genmutatie", "chromosoommutatie", "genoommutatie"], items: [["één base vervangen in het hemoglobinegen", 0], ["drie keer chromosoom 21", 2], ["een stuk van chromosoom 5 ontbreekt", 1], ["vrouw met maar één X-chromosoom", 2], ["één nucleotidenpaar ingevoegd in een gen", 0], ["een stuk chromosoom zit er omgekeerd in", 1]], u: "Gen: basenvolgorde. Chromosoom: bouw. Genoom: aantal." },
          { type: "koppel", q: "Koppel de mutatie aan het gevolg.", paren: [["GCT → GCC", "geen effect"], ["GAG → GTG", "ander aminozuur"], ["TGG → TGA", "vroeg stopcodon"], ["één base verwijderd", "leesraamverschuiving"]], u: "Vertaal steeds het codon (T wordt U) met de codontabel." },
          { type: "invul", q: "Vul in.", tekst: "Straling en stoffen in tabaksrook zijn {mutagene} factoren. Een mutatie in een {geslachtscel} kan worden doorgegeven aan een kind. Cellen die ongeremd delen vormen een {tumor}.", extra: ["epigenetische", "huidcel", "stamcel"], u: "Alleen mutaties in de kiembaan zijn erfelijk." }
        ],
        open: [
          { q: "Leg uit waarom een invoeging van één nucleotidenpaar in een gen meestal schadelijker is dan een vervanging van één nucleotidenpaar.", a: "Bij een vervanging verandert hooguit één codon, dus hooguit één aminozuur (of er ontstaat een stopcodon). Bij een invoeging verschuift het leesraam: alle codons erna worden anders gelezen. Daardoor veranderen veel aminozuren en ontstaat vaak een vroeg stopcodon, zodat het eiwit niet meer werkt.", punten: ["vervanging: één codon anders", "invoeging: leesraamverschuiving", "veel aminozuren anders of vroeg stop"] },
          { q: "Sikkelcelanemie is een ernstige ziekte, toch komt het allel in delen van Afrika bij wel 1 op de 5 mensen voor. Leg uit hoe dat kan.", a: "Homozygote mensen (twee sikkelcelallelen) zijn ziek. Heterozygote dragers hebben weinig klachten en zijn beter beschermd tegen malaria, omdat de parasiet zich in hun rode bloedcellen slecht vermeerdert. In malariagebieden overleven dragers daardoor vaker en krijgen ze meer kinderen, zodat het allel veel blijft voorkomen.", punten: ["homozygoot: ziek", "heterozygoot: bescherming tegen malaria", "dragers overleven vaker, geven allel door"] }
        ],
        widgets: ["mutatie-lab"]
      },

      // ================= BS 6 DNA-technieken =================
      {
        id: "t9-6", nr: "BS 6", titel: "DNA-technieken",
        kern: [
          "In de biotechnologie wordt DNA onderzocht, vermeerderd en veranderd. De belangrijkste technieken: DNA-sequencen, PCR, DNA-profielen en genetische modificatie.",
          { kop: "DNA-sequencen" },
          "Bij [[DNA-sequencen]] bepaal je de nucleotidenvolgorde (basenvolgorde) van een stuk DNA. Door die van verschillende soorten te vergelijken, zie je hoe verwant ze zijn: hoe minder verschillen, hoe nauwer verwant.",
          { kop: "PCR: DNA vermeerderen" },
          "Met [[PCR]] (polymerasekettingreactie) maak je van een heel klein beetje DNA in korte tijd miljoenen kopieën. Een PCR-test op een virus werkt daardoor al bij heel weinig virus.",
          { fig: "pcr", bij: "Elke cyclus heeft drie temperatuurstappen." },
          { voorbeeld: { titel: "Eén PCR-cyclus", stappen: ["Verhitten tot ongeveer 95 °C: de waterstofbruggen breken, de strengen gaan uit elkaar.", "Afkoelen tot ongeveer 55 °C: korte [[primers]] hechten aan het begin van het stuk DNA dat je wilt kopiëren.", "Ongeveer 72 °C: een hittebestendig DNA-polymerase (uit bacteriën) bouwt de nieuwe strengen.", "Na elke cyclus is het aantal DNA-moleculen verdubbeld: na n cycli zijn het er 2^{n}."] } },
          { formule: "aantal kopieën = beginaantal × 2^{n}  (n = aantal cycli)" },
          { kop: "DNA-profiel" },
          "Op sommige plekken (loci) in het niet-coderend DNA zit een stukje dat vaak herhaald wordt. Hoe vaak, verschilt van persoon tot persoon: die stukken verschillen in lengte. Het patroon van lengtes is je [[DNA-profiel]] (DNA-fingerprint).",
          "Met [[gelelektroforese]] scheid je de vermeerderde stukken op lengte: in een gel onder elektrische spanning bewegen korte stukken verder dan lange.",
          { fig: "gel", bij: "Elk bandje van het kind komt van de moeder of van de vader." },
          { tip: "Vaderschapstest: elk kind heeft per locus één allel van de moeder en één van de vader. Elk bandje van het kind dat niet bij de moeder hoort, moet bij de vader voorkomen." },
          { kop: "Genetische modificatie" },
          "Bij [[genetische modificatie]] verander je het DNA van een organisme, bijvoorbeeld door er een gen van een ander organisme in te zetten. Zo'n organisme is een [[ggo]] (genetisch gemodificeerd organisme).",
          { fig: "recombinant", bij: "Recombinant-DNA-techniek: menselijk gen in een plasmide." },
          { voorbeeld: { titel: "Bacteriën die insuline maken", stappen: ["Het gen voor insuline wordt met een [[knipenzym]] (restrictie-enzym) uit menselijk DNA geknipt.", "Een [[plasmide]] (ringvormig bacterie-DNA) wordt met hetzelfde knipenzym opengeknipt.", "Een plakenzym (ligase) zet het gen in het plasmide: [[recombinant-DNA]].", "Bacteriën nemen het plasmide op, delen snel en maken insuline."] } },
          "Komt het ingebrachte gen van een andere soort, dan is het organisme **transgeen**. Komt het van dezelfde soort (of een soort waarmee je kunt kruisen), dan heet het **cisgeen**.",
          "Toepassingen: medicijnen (insuline), gewassen die beter tegen droogte of ziekten kunnen, en [[gentherapie]] (een gezond gen inbrengen bij een patiënt). Risico's: een ggo kan zich in de natuur verspreiden en het ingebrachte gen kan overgaan op wilde soorten.",
          { widget: "biotech-stappen" }
        ],
        begrippen: [
          ["DNA-sequencen", "Het bepalen van de nucleotidenvolgorde van een stuk DNA."],
          ["PCR", "Polymerasekettingreactie: techniek om een stuk DNA snel heel vaak te kopiëren."],
          ["primer", "Kort stukje enkelstrengs DNA dat aangeeft waar het DNA-polymerase begint met kopiëren."],
          ["DNA-profiel", "Patroon van lengtes van variabele stukken DNA; per persoon verschillend (DNA-fingerprint)."],
          ["gelelektroforese", "Scheiden van DNA-stukken op lengte in een gel onder elektrische spanning."],
          ["genetische modificatie", "Het veranderen van het DNA van een organisme met biotechnologie."],
          ["ggo", "Genetisch gemodificeerd organisme."],
          ["recombinant-DNA", "DNA dat is samengesteld uit stukken DNA van verschillende herkomst."],
          ["knipenzym", "Restrictie-enzym: knipt DNA bij een vaste basenvolgorde."],
          ["plakenzym", "Ligase: plakt stukken DNA aan elkaar."],
          ["plasmide", "Klein ringvormig DNA-molecuul in bacteriën; gebruikt om genen over te brengen."],
          ["transgeen", "Organisme met een gen van een andere soort."],
          ["cisgeen", "Organisme met een gen van dezelfde of een kruisbare soort."],
          ["gentherapie", "Behandeling waarbij een gezond gen in cellen van een patiënt wordt gebracht."]
        ],
        vragen: [
          { q: "Wat gebeurt er in de stap van een PCR-cyclus bij ongeveer 95 °C?", a: ["De twee DNA-strengen gaan uit elkaar", "De primers hechten aan het DNA", "DNA-polymerase bouwt de nieuwe strengen", "Het DNA wordt in stukken geknipt"], u: "Door de hitte breken de waterstofbruggen tussen de basen." },
          { q: "Waarom gebruikt men bij PCR een DNA-polymerase uit bacteriën die in hete bronnen leven?", a: ["Dat enzym blijft werken na verhitting tot 95 °C", "Dat enzym maakt RNA in plaats van DNA", "Dat enzym knipt het DNA op de juiste plek", "Dat enzym hoeft geen nucleotiden te gebruiken"], u: "Een gewoon enzym zou bij 95 °C denatureren." },
          { q: "Je begint een PCR met 10 DNA-moleculen en doet 5 cycli. Hoeveel moleculen heb je dan?", a: ["320", "50", "100", "160"], u: "10 × 2^{5} = 10 × 32 = 320." },
          { q: "Hoe scheid je DNA-stukken bij gelelektroforese?", a: ["Op lengte: korte stukken bewegen verder door de gel dan lange", "Op basenvolgorde: A-rijke stukken bewegen het verst", "Op lading: positieve stukken bewegen naar de min-pool", "Op kleur: elk stuk krijgt een eigen kleur"], u: "Kleine stukken komen makkelijker door de gel en gaan sneller." },
          { q: "Bij een vaderschapstest heeft het kind bij een locus allelen van 120 en 180 baseparen. De moeder heeft 120 en 150. Welke man kan de vader zijn?", a: ["Man met 180 en 200", "Man met 120 en 150", "Man met 150 en 200", "Man met 130 en 160"], u: "Het kind kreeg 120 van de moeder; 180 moet dan van de vader komen." },
          { q: "Hoeveel procent van zijn DNA (uit de kern) krijgt een kind van zijn vader?", a: ["50%", "25%", "100%", "75%"], u: "Van elk chromosomenpaar komt er één van de vader." },
          { q: "Welke twee soorten enzymen gebruik je bij de recombinant-DNA-techniek?", a: ["Een knipenzym en een plakenzym", "DNA-polymerase en amylase", "Telomerase en een knipenzym", "Een plakenzym en RNA-polymerase"], u: "Knippen met restrictie-enzymen, plakken met ligase." },
          { q: "Bacteriën met een menselijk insulinegen zijn ...", a: ["transgeen, want het gen komt van een andere soort", "cisgeen, want het gen komt van dezelfde soort", "niet genetisch gemodificeerd", "gekloond, want ze hebben geen eigen DNA meer"], u: "Mens en bacterie zijn verschillende soorten: transgeen." },
          { q: "Waarom kan een gen van een kwal in een zebravis werken (gloeivissen)?", a: ["DNA is bij alle organismen op dezelfde manier opgebouwd en de genetische code is gelijk", "Kwallen en vissen hebben dezelfde chromosomen", "Het gen past zich aan het genoom van de vis aan", "Vissen hebben geen eigen genen voor kleur"], u: "Dezelfde vier nucleotiden en dezelfde codontabel: het visribosoom leest het kwallengen gewoon af." },
          { q: "Hoe kun je met DNA-sequencen de verwantschap tussen soorten onderzoeken?", a: ["Hoe minder verschillen in DNA-volgorde, hoe nauwer verwant", "Hoe meer chromosomen, hoe nauwer verwant", "Hoe langer het DNA, hoe ouder de soort", "Hoe meer verschillen, hoe nauwer verwant"], u: "Verwante soorten hebben een recente gemeenschappelijke voorouder en dus nog weinig verschillen." },
          { q: "Waarom vinden milieuorganisaties dat ggo's niet zomaar in de natuur mogen komen?", a: ["Ze kunnen zich verspreiden en het ingebrachte gen kan overgaan op wilde soorten", "Ggo's bevatten geen DNA meer", "Ggo's zijn altijd giftig om te eten", "Ggo's kunnen zich niet voortplanten"], u: "Het is moeilijk te voorspellen wat zo'n gen in een ecosysteem doet." }
        ],
        reken: [
          { gen: (R) => { const b = R.kies([1, 2, 5, 10, 50, 100]), n = R.int(5, 25); return { q: `Je start een PCR met ${b} DNA-molecu${b === 1 ? "ul" : "len"} en doet ${n} cycli. Hoeveel DNA-moleculen heb je daarna (als alles goed gaat)?`, antwoord: b * 2 ** n, hint: "Elke cyclus verdubbelt het aantal.", stappen: [`${b} × 2^{${n}}`, `2^{${n}} = ${R.nl(2 ** n)}`, `${b} × ${R.nl(2 ** n)} = ${R.nl(b * 2 ** n)}`] }; } },
          { gen: (R) => { const n = R.int(10, 30), c = R.kies([3, 4, 5]); return { q: `Een PCR-cyclus duurt ${c} minuten. Hoe lang duurt het om ${n} cycli te doen?`, antwoord: n * c, eenheid: "min", hint: "Aantal cycli × duur per cyclus.", stappen: [`${n} × ${c} = ${n * c} minuten`] }; } },
          { q: "Hoeveel PCR-cycli heb je minimaal nodig om van 1 DNA-molecuul meer dan een miljoen kopieën te maken?", antwoord: 20, hint: "Zoek de kleinste n met 2^{n} > 1 000 000.", stappen: ["2^{19} = 524 288 (te weinig)", "2^{20} = 1 048 576 (genoeg)", "Dus 20 cycli"] }
        ],
        oefen: [
          { type: "volgorde", q: "Zet de stappen van het maken van insuline door bacteriën in de juiste volgorde.", items: ["Het insulinegen wordt met een knipenzym uit menselijk DNA geknipt", "Een plasmide wordt met hetzelfde knipenzym opengeknipt", "Een plakenzym zet het gen in het plasmide", "Bacteriën nemen het recombinante plasmide op", "De bacteriën delen en maken insuline"], u: "Knippen, plakken, inbrengen, vermeerderen." },
          { type: "volgorde", q: "Zet de stappen van één PCR-cyclus in de goede volgorde.", items: ["Verhitten tot 95 °C: strengen gaan uit elkaar", "Afkoelen tot 55 °C: primers hechten", "72 °C: DNA-polymerase bouwt nieuwe strengen", "Het aantal DNA-moleculen is verdubbeld"], u: "Scheiden, hechten, verlengen." },
          { type: "koppel", q: "Koppel de techniek aan het doel.", paren: [["PCR", "DNA vermeerderen"], ["gelelektroforese", "DNA-stukken op lengte scheiden"], ["DNA-sequencen", "basenvolgorde bepalen"], ["recombinant-DNA-techniek", "gen in een ander organisme zetten"], ["DNA-profiel", "dader of vader opsporen"]], u: "Vaak worden ze gecombineerd: eerst PCR, dan gelelektroforese." }
        ],
        open: [
          { q: "Op een plaats delict is een klein beetje bloed gevonden. Beschrijf hoe het NFI hiermee kan onderzoeken of een verdachte erbij betrokken is.", a: "Uit het bloed (witte bloedcellen) wordt DNA gehaald. Met PCR worden de variabele stukken DNA vermeerderd, zodat er genoeg is. Met gelelektroforese worden de stukken op lengte gescheiden: dat geeft een DNA-profiel. Dit profiel wordt vergeleken met het DNA-profiel van de verdachte. Als alle bandjes overeenkomen, is het zeer waarschijnlijk dat het bloed van de verdachte is.", punten: ["DNA isoleren", "PCR om te vermeerderen", "gelelektroforese geeft DNA-profiel", "vergelijken met profiel verdachte"] },
          { q: "Noem een voordeel en een risico van genetisch gemodificeerde landbouwgewassen.", a: "Voordeel: een gewas kan bijvoorbeeld beter tegen droogte of een ziekte, zodat er minder bestrijdingsmiddel nodig is en de oogst groter is. Risico: het ggo kan zich in de natuur verspreiden, of het ingebrachte gen kan via kruising terechtkomen in wilde verwanten, met onbekende gevolgen voor het ecosysteem.", punten: ["voordeel, bijvoorbeeld beter bestand tegen droogte of ziekte", "risico, bijvoorbeeld verspreiding van het gen in de natuur"] }
        ],
        widgets: ["biotech-stappen"]
      }
    ]
  });
})();
