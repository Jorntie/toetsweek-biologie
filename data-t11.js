// Thema 11 Transport (Biologie voor jou MAX havo 5). Alleen dieren en mens. Eigen tekst; termen volgen het boek.
(function () {
  "use strict";

  TW.hoofdstuk({
    id: "t11", nr: "Thema 11", titel: "Transport", icoon: "❤️",
    intro: "Bloed, de bloedsomloop van verschillende dieren, het hart, de bloedvaten en wat er gebeurt tussen bloed en cellen. Zuurstofrijk is rood getekend, zuurstofarm blauw.",
    onderdelen: [
      // ================= BS 1 Het bloed =================
      {
        id: "t11-1", nr: "BS 1", titel: "Het bloed",
        kern: [
          "Bloed vervoert stoffen door je lichaam: zuurstof, voedingsstoffen, afvalstoffen (zoals koolstofdioxide en ureum), regelende stoffen (hormonen) en beschermende stoffen (antistoffen). Het vervoert ook warmte.",
          "Bloed bestaat uit [[bloedplasma]] (ongeveer 55%) met daarin rode bloedcellen, witte bloedcellen en bloedplaatjes.",
          { fig: "bloed", bij: "Bloed na centrifugeren: de cellen zakken naar beneden, want ze hebben een grotere dichtheid dan plasma." },
          { tabel: { kop: ["", "rode bloedcellen", "witte bloedcellen", "bloedplaatjes"], rijen: [["kern", "nee", "ja", "nee (celstukjes)"], ["gevormd in", "rode beenmerg", "rode beenmerg", "rode beenmerg"], ["functie", "vervoer van zuurstof (en wat CO_{2})", "ziekteverwekkers bestrijden, opruimen, antistoffen maken", "bloedstolling"], ["aantal", "veruit het meest", "het minst", "daartussenin"]] } },
          { kop: "Rode bloedcellen" },
          "Rode bloedcellen zitten vol [[hemoglobine]]: een eiwit met ijzer dat zuurstof bindt in de longen en afgeeft in de weefsels.",
          { fig: "gaswisseling", bij: "In de longen neemt hemoglobine zuurstof op, in de weefsels geeft het zuurstof af." },
          "Een rode bloedcel is plat en aan beide kanten ingedeukt. Dat geeft een groot oppervlak, zodat zuurstof snel in en uit de cel diffundeert.",
          "Bij een zuurstoftekort maken de nieren meer van het hormoon **epo**. Epo zet het rode beenmerg aan tot het maken van meer rode bloedcellen. Daarom trainen sporters soms hoog in de bergen.",
          { let: "Bij bloedarmoede door ijzertekort helpt extra epo niet: ijzer is dan de beperkende factor voor het maken van hemoglobine." },
          { kop: "Witte bloedcellen en bloedplaatjes" },
          "Witte bloedcellen kunnen van vorm veranderen. Zo kruipen ze door de wand van haarvaten naar een ontsteking en sluiten ze bacteriën in (fagocytose). Pus bestaat uit dode witte bloedcellen en bacteriën.",
          { voorbeeld: { titel: "Bloedstolling", stappen: ["Bij een wondje raken bloedplaatjes beschadigd.", "Samen met stollingsfactoren uit het plasma start een keten van reacties (vitamine K is nodig om stollingsfactoren te maken).", "Het opgeloste eiwit [[fibrinogeen]] wordt omgezet in [[fibrine]]: lange draden.", "In het netwerk van fibrinedraden blijven bloedcellen hangen: een bloedstolsel sluit de wond."] } },
          "Bij **hemofilie** (bloederziekte) ontbreekt een stollingsfactor, zodat het bloed slecht stolt. Plasma zonder fibrinogeen en stollingsfactoren heet [[bloedserum]].",
          { tip: "Niet alle dieren hebben rood bloed: bij krabben en inktvissen bindt het blauwe [[hemocyanine]] de zuurstof, met koper in plaats van ijzer." },
          { kop: "Samenhang: sikkelcellen" },
          "Bij sikkelcelanemie maakt een puntmutatie in het hemoglobinegen afwijkend hemoglobine. Bij weinig zuurstof krijgen de rode bloedcellen een sikkelvorm, lopen vast in haarvaten en worden snel afgebroken. Heterozygote dragers zijn juist beter beschermd tegen malaria (zie thema 9 BS 5).",
          { fig: "sikkelcel", bij: "Normale rode bloedcel en sikkelcel." }
        ],
        begrippen: [
          ["bloedplasma", "Vloeibaar deel van het bloed (ongeveer 55%): water met opgeloste stoffen."],
          ["bloedserum", "Bloedplasma zonder fibrinogeen en stollingsfactoren."],
          ["rode bloedcel", "Bloedcel zonder kern met hemoglobine; vervoert zuurstof."],
          ["hemoglobine", "Rood eiwit met ijzer in rode bloedcellen dat zuurstof bindt."],
          ["witte bloedcel", "Bloedcel met kern die ziekteverwekkers bestrijdt; kan van vorm veranderen."],
          ["bloedplaatjes", "Celstukjes zonder kern die nodig zijn voor de bloedstolling."],
          ["rode beenmerg", "Weefsel in botten waar alle bloedcellen worden gevormd."],
          ["epo", "Hormoon uit de nieren dat het rode beenmerg aanzet tot het maken van rode bloedcellen."],
          ["bloedarmoede", "Te weinig hemoglobine of rode bloedcellen, waardoor er minder zuurstof wordt vervoerd."],
          ["fibrinogeen", "Opgelost eiwit in het plasma dat bij stolling wordt omgezet in fibrine."],
          ["fibrine", "Draadvormig eiwit dat een netwerk vormt in een bloedstolsel."],
          ["stollingsfactoren", "Stoffen in het plasma die samen de bloedstolling op gang brengen."],
          ["hemofilie", "Erfelijke ziekte waarbij een stollingsfactor ontbreekt (bloederziekte)."],
          ["fagocytose", "Insluiten en verteren van een bacterie of deeltje door een witte bloedcel."],
          ["hemocyanine", "Blauw eiwit met koper dat bij onder andere krabben zuurstof bindt."]
        ],
        vragen: [
          { q: "Welke bestanddelen van bloed zitten na het centrifugeren onderin de buis?", a: ["De bloedcellen, met de rode bloedcellen helemaal onderin", "Het bloedplasma", "Alleen de bloedplaatjes", "Het fibrinogeen"], u: "Bloedcellen hebben een grotere dichtheid dan plasma en zakken naar beneden." },
          { q: "Welke bloedcellen hebben een celkern?", a: ["Alleen de witte bloedcellen", "Alleen de rode bloedcellen", "De rode en de witte bloedcellen", "Alle bloedcellen en de bloedplaatjes"], u: "Rode bloedcellen verliezen hun kern bij het ontstaan; bloedplaatjes zijn celstukjes." },
          { q: "Wat is het voordeel van de platte, ingedeukte vorm van een rode bloedcel?", a: ["Een groot oppervlak, zodat zuurstof snel kan diffunderen", "Er past meer DNA in de cel", "De cel kan zich daardoor actief voortbewegen", "De cel kan zo bacteriën insluiten"], u: "Hoe groter het oppervlak, hoe sneller de gaswisseling." },
          { q: "Een sporter traint een maand in de bergen. Welk orgaan maakt daardoor meer epo?", a: ["De nieren", "Het rode beenmerg", "De lever", "Het hart"], u: "De nieren maken epo; het rode beenmerg maakt daarna de extra rode bloedcellen." },
          { q: "Waardoor kunnen witte bloedcellen ook buiten de bloedvaten werken?", a: ["Ze kunnen van vorm veranderen en door de haarvatwand kruipen", "Ze worden in de weefsels gemaakt", "Ze lossen op in het plasma", "Ze worden door de lymfe naar buiten gespoeld"], u: "Door hun vervormbaarheid passen ze door openingen tussen de cellen van de haarvatwand." },
          { q: "Welke stof wordt bij de bloedstolling omgezet in fibrine?", a: ["Fibrinogeen", "Hemoglobine", "Epo", "Vitamine K"], u: "Fibrinogeen is opgelost; fibrine vormt draden." },
          { q: "Waarom kan een tekort aan vitamine K leiden tot problemen met de bloedstolling?", a: ["Vitamine K is nodig voor de vorming van stollingsfactoren", "Vitamine K is een onderdeel van hemoglobine", "Vitamine K zet fibrine om in fibrinogeen", "Vitamine K maakt bloedplaatjes aan in de lever"], u: "Zonder voldoende stollingsfactoren loopt de keten van stollingsreacties niet." },
          { q: "Drie buizen met evenveel bloed, bloedplasma en bloedserum worden ingedroogd. Welke buis bevat de minste droge stof?", a: ["Bloedserum", "Bloed", "Bloedplasma", "Ze bevatten evenveel droge stof"], u: "Bloed heeft cellen, plasma heeft geen cellen maar wel fibrinogeen, serum mist ook het fibrinogeen." },
          { q: "Iemand heeft bloedarmoede door ijzertekort. Waarom is hij snel moe?", a: ["Er wordt minder zuurstof vervoerd, dus de verbranding in zijn cellen levert minder energie", "Zijn bloed stolt te snel", "Hij heeft te weinig witte bloedcellen", "IJzer is zelf de brandstof voor de spieren"], u: "Minder hemoglobine betekent minder zuurstoftransport en minder aerobe dissimilatie." },
          { q: "Rattengif bevat vaak antistollingsmiddelen. Waardoor gaan de ratten dood?", a: ["Kleine inwendige bloedingen stoppen niet meer, ze verliezen veel bloed", "Hun bloed stolt overal in de vaten", "Ze maken geen rode bloedcellen meer", "Ze krijgen geen zuurstof meer in de longen"], u: "Inwendige bloedinkjes komen steeds voor; zonder stolling stoppen ze niet." },
          { q: "Wat vervoert het bloedplasma niet?", a: ["Het grootste deel van de zuurstof", "Glucose", "Hormonen", "Ureum"], u: "Zuurstof lost slecht op in water; het meeste zuurstof wordt gebonden aan hemoglobine in de rode bloedcellen." }
        ],
        reken: [
          { gen: (R) => { const v = R.kies([4.5, 5, 5.5, 6]), p = R.kies([52, 55, 58]); return { q: `Iemand heeft ${R.nl(v)} liter bloed. Daarvan is ${p}% bloedplasma. Hoeveel liter bloedcellen (en bloedplaatjes) heeft deze persoon?`, antwoord: R.rond(v * (100 - p) / 100, 2), eenheid: "L", hint: "Wat niet plasma is, zijn cellen.", stappen: [`${100 - p}% van ${R.nl(v)} L`, `${R.nl((100 - p) / 100)} × ${R.nl(v)} = ${R.nl(R.rond(v * (100 - p) / 100, 2))} L`] }; } },
          { q: "Een rode bloedcel leeft ongeveer 120 dagen. Je hebt ongeveer 25 biljoen (25 000 000 000 000) rode bloedcellen. Hoeveel rode bloedcellen moet je beenmerg dan gemiddeld per seconde maken? Rond af op miljoenen.", antwoord: 2.4, eenheid: "miljoen per seconde", tol: 0.1, hint: "Reken eerst uit hoeveel seconden 120 dagen zijn.", stappen: ["120 dagen × 24 × 3600 = 10 368 000 s", "25 000 000 000 000 / 10 368 000 ≈ 2 400 000", "Ongeveer 2,4 miljoen per seconde"], u: "De getallen zijn afgeronde schattingen; het gaat om de orde van grootte." }
        ],
        oefen: [
          { type: "sorteer", q: "Welk bestanddeel van het bloed heeft deze taak?", groepen: ["rode bloedcellen", "witte bloedcellen", "bloedplaatjes", "bloedplasma"], items: [["zuurstof vervoeren", 0], ["bacteriën insluiten", 1], ["antistoffen maken", 1], ["bloedstolling starten", 2], ["glucose en ureum vervoeren", 3], ["hormonen vervoeren", 3]], u: "Hormonen en voedingsstoffen zijn opgelost in het plasma." },
          { type: "volgorde", q: "Zet de bloedstolling in de juiste volgorde.", items: ["Een bloedvat raakt beschadigd", "Bloedplaatjes gaan kapot en geven stoffen af", "Met stollingsfactoren start een keten van reacties", "Fibrinogeen wordt omgezet in fibrine", "Bloedcellen blijven hangen in het fibrinenetwerk"], u: "Het eindresultaat is een stolsel dat de wond afsluit." },
          { type: "invul", q: "Vul in.", tekst: "Alle bloedcellen worden gemaakt in het {rode beenmerg}. Rode bloedcellen bevatten {hemoglobine}, een eiwit met {ijzer}.", extra: ["gele beenmerg", "fibrine", "koper"], u: "Koper zit in hemocyanine, het blauwe bloedeiwit van krabben." }
        ],
        open: [
          { q: "Leg in drie stappen uit hoe trainen met minder zuurstof (hoogtetraining) kan leiden tot betere sportprestaties.", a: "1 Met minder zuurstof in de lucht vervoert het bloed minder zuurstof; de nieren maken daardoor meer epo. 2 Epo zet het rode beenmerg aan tot het maken van meer rode bloedcellen. 3 Met meer rode bloedcellen (meer hemoglobine) kan het bloed meer zuurstof naar de spieren vervoeren, waardoor die meer energie kunnen vrijmaken.", punten: ["minder zuurstof: nieren maken meer epo", "meer rode bloedcellen", "meer zuurstoftransport naar de spieren"] },
          { q: "Samenhang: in gebieden met malaria hebben veel mensen één sikkelcelallel. Leg uit waarom die mensen een voordeel hebben ten opzichte van mensen zonder dit allel, en waarom dat voordeel er niet is voor mensen met twee sikkelcelallelen.", a: "De malariaparasiet vermeerdert zich in rode bloedcellen. Bij heterozygote dragers vervormen geïnfecteerde rode bloedcellen en worden ze sneller afgebroken, zodat de parasiet zich slecht kan vermeerderen: ze worden minder ernstig ziek van malaria. Mensen met twee sikkelcelallelen hebben sikkelcelanemie: hun rode bloedcellen vervormen ook zonder malaria, lopen vast in haarvaten en vervoeren minder zuurstof. Dat nadeel is groter dan de bescherming.", punten: ["parasiet vermeerdert zich in rode bloedcellen", "dragers: bescherming tegen malaria", "homozygoot: ziek door sikkelcellen"] }
        ]
      },

      // ================= BS 2 Transportsystemen bij dieren =================
      {
        id: "t11-2", nr: "BS 2", titel: "Transportsystemen bij dieren",
        kern: [
          "Een eencellige, zoals een pantoffeldiertje, staat met zijn hele oppervlak in contact met het water om zich heen. Stoffen komen er via diffusie in en uit; een transportsysteem is niet nodig.",
          "Bij grotere dieren liggen de meeste cellen te ver van de buitenwereld. Een [[circulatiesysteem]] (bloedsomloop) brengt stoffen naar alle cellen.",
          { kop: "Open of gesloten" },
          { tabel: { kop: ["", "open circulatiesysteem", "gesloten circulatiesysteem"], rijen: [["voorbeeld", "sprinkhaan, slak, beerdiertje", "regenworm, vis, mens"], ["bloed", "stroomt vrij tussen de organen; vermengd met andere lichaamsvloeistof (hemolymfe)", "blijft in bloedvaten"], ["druk", "laag", "hoog"], ["transport", "langzaam, over korte afstand", "snel en over grote afstand"]] } },
          "Bij een [[open circulatiesysteem]] pompt een buisvormig hart de [[lichaamsvloeistof]] in de lichaamsholte. Er is geen apart bloed: alles is één vloeistof. Voor grote, actieve dieren is dat te traag.",
          { kop: "Enkel of dubbel" },
          { fig: "somloop-typen", bij: "Een vis heeft een enkele, een zoogdier een dubbele bloedsomloop." },
          "Bij een [[enkele bloedsomloop]] (vis) gaat het bloed per rondje één keer door het hart: hart, kieuwen, organen, hart. In de haarvaten van de kieuwen verliest het bloed veel druk, zodat het daarna langzaam naar de organen stroomt.",
          "Bij een [[dubbele bloedsomloop]] (vogels, zoogdieren, ook kikkers) gaat het bloed per rondje twee keer door het hart. Na de longen pompt het hart het bloed opnieuw weg, met veel kracht naar alle organen.",
          { tip: "Warmbloedige dieren verbruiken veel zuurstof om op temperatuur te blijven. Een dubbele bloedsomloop voert meer zuurstof aan; voor een koudbloedige vis volstaat een enkele." },
          { kop: "Kleine en grote bloedsomloop bij de mens" },
          { fig: "bloedsomloop", bij: "Schema van de dubbele bloedsomloop; blauw is zuurstofarm, rood zuurstofrijk." },
          { tabel: { kop: ["", "route", "functie"], rijen: [["[[kleine bloedsomloop]]", "rechterkamer → longslagader → longen → longaders → linkerboezem", "zuurstof opnemen, koolstofdioxide afgeven"], ["[[grote bloedsomloop]]", "linkerkamer → aorta → slagaders → organen → aders → holle aders → rechterboezem", "zuurstof en voedingsstoffen naar alle organen"]] } },
          { let: "Let op: de longslagader vervoert zuurstofarm bloed en de longaders zuurstofrijk bloed. Slagaders gaan van het hart af, aders naar het hart toe, ongeacht hoeveel zuurstof erin zit." },
          "Het bloed uit de darmen gaat niet direct terug naar het hart, maar eerst via de [[poortader]] naar de lever. Daar worden opgenomen voedingsstoffen verwerkt en schadelijke stoffen (zoals alcohol) afgebroken.",
          { widget: "bloedroute" }
        ],
        begrippen: [
          ["circulatiesysteem", "Systeem dat stoffen door het lichaam vervoert: de bloedsomloop."],
          ["open circulatiesysteem", "Bloed stroomt niet alleen in vaten maar vrij tussen de organen; vermengd met andere lichaamsvloeistof."],
          ["gesloten circulatiesysteem", "Bloed stroomt alleen door bloedvaten."],
          ["lichaamsvloeistof (hemolymfe)", "Mengsel van bloed en andere lichaamsvloeistoffen bij een open circulatiesysteem."],
          ["enkele bloedsomloop", "Per rondje gaat het bloed één keer door het hart (vis)."],
          ["dubbele bloedsomloop", "Per rondje gaat het bloed twee keer door het hart (zoogdier, vogel, kikker)."],
          ["kleine bloedsomloop", "Van de rechterkamer via de longen naar de linkerboezem."],
          ["grote bloedsomloop", "Van de linkerkamer via de organen naar de rechterboezem."],
          ["aorta", "Grote slagader die zuurstofrijk bloed uit de linkerkamer naar de organen voert."],
          ["longslagader", "Slagader die zuurstofarm bloed van de rechterkamer naar de longen voert."],
          ["longaders", "Aders die zuurstofrijk bloed van de longen naar de linkerboezem voeren."],
          ["holle aders", "Bovenste en onderste holle ader: voeren zuurstofarm bloed naar de rechterboezem."],
          ["poortader", "Ader die bloed van de darmen naar de lever voert."],
          ["leverader", "Ader die bloed van de lever naar de onderste holle ader voert."]
        ],
        vragen: [
          { q: "Waarom heeft een pantoffeldiertje geen bloedsomloop nodig?", a: ["Het is één cel die direct stoffen uitwisselt met het water", "Het heeft geen zuurstof nodig", "Het leeft in het bloed van andere dieren", "Het heeft een open circulatiesysteem"], u: "Diffusie over een korte afstand is snel genoeg." },
          { q: "Wat is een nadeel van een open circulatiesysteem ten opzichte van een gesloten?", a: ["Stoffen worden langzamer en over kleinere afstanden vervoerd", "Er is een hart nodig", "Het bloed kan geen zuurstof vervoeren", "Het kost veel meer bloed om te maken"], u: "Zonder vaten blijft de druk laag; dat werkt alleen voor kleine of weinig actieve dieren." },
          { q: "Hoe vaak gaat het bloed van een vis door het hart bij één volledige omloop?", a: ["Eén keer", "Twee keer", "Drie keer", "Het gaat niet door het hart"], u: "Een vis heeft een enkele bloedsomloop: hart, kieuwen, organen, hart." },
          { q: "Wat is het voordeel van een dubbele bloedsomloop?", a: ["Het bloed wordt na de longen opnieuw met kracht weggepompt naar de organen", "Er is maar één hartkamer nodig", "Het bloed hoeft niet langs de longen", "Zuurstofrijk en zuurstofarm bloed mengen beter"], u: "Bij een enkele bloedsomloop verliest het bloed in de kieuwen veel druk." },
          { q: "Een kikker heeft een hart met twee boezems en één kamer. Het bloed gaat per omloop twee keer door het hart. Wat voor bloedsomloop heeft een kikker?", a: ["Een dubbele bloedsomloop", "Een enkele bloedsomloop", "Een open bloedsomloop", "Een enkele bloedsomloop met hulpharten"], u: "Het aantal keren door het hart per rondje bepaalt of hij enkel of dubbel is." },
          { q: "Welke harthelft van de mens bevat zuurstofarm bloed?", a: ["De rechterhelft", "De linkerhelft", "Beide helften evenveel", "Geen van beide: zuurstofarm bloed gaat niet door het hart"], u: "Rechts komt het bloed uit de organen binnen, via de holle aders." },
          { q: "Welk bloedvat vervoert zuurstofrijk bloed?", a: ["Longader", "Longslagader", "Bovenste holle ader", "Poortader"], u: "De longaders komen van de longen, waar het bloed zuurstof heeft opgenomen." },
          { q: "Waar begint de kleine bloedsomloop?", a: ["In de rechterkamer", "In de linkerkamer", "In de rechterboezem", "In de longen"], u: "De rechterkamer pompt het bloed via de longslagader naar de longen." },
          { q: "Alcohol wordt opgenomen in de dunne darm. Via welk bloedvat komt het eerst in de lever?", a: ["Via de poortader", "Via de leverslagader", "Via de leverader", "Via de onderste holle ader"], u: "Al het bloed uit de darmen gaat via de poortader naar de lever." },
          { q: "Een octopus heeft een gesloten bloedsomloop. Twee hulpharten pompen bloed door de kieuwen, een centraal hart pompt het daarna naar de organen. Hoe vaak gaat het bloed per omloop door het centrale hart?", a: ["Eén keer, dus het is een enkele bloedsomloop", "Twee keer, dus het is een dubbele bloedsomloop", "Drie keer, want er zijn drie harten", "Nooit, de hulpharten doen al het werk"], u: "Per rondje passeert het bloed het centrale hart één keer; de hulpharten compenseren het drukverlies in de kieuwen." },
          { q: "Waarom heeft een groot, actief dier als een mens geen open circulatiesysteem?", a: ["Stoffen moeten snel over grote afstanden worden vervoerd", "Mensen hebben geen lichaamsholte", "Een open systeem kan geen voedingsstoffen vervoeren", "Een open systeem werkt alleen in het water"], u: "Alleen met vaten en een sterk hart is de druk hoog genoeg." }
        ],
        oefen: [
          { type: "volgorde", q: "Zet de route van een rode bloedcel in de juiste volgorde, beginnend in de rechterboezem.", items: ["rechterboezem", "rechterkamer", "longslagader", "longen", "longaders", "linkerboezem", "linkerkamer", "aorta"], u: "Eerst de kleine bloedsomloop (rechts → longen → links), dan de grote." },
          { type: "sorteer", q: "Zuurstofrijk of zuurstofarm bloed?", groepen: ["zuurstofrijk", "zuurstofarm"], items: [["aorta", 0], ["longslagader", 1], ["longaders", 0], ["onderste holle ader", 1], ["linkerkamer", 0], ["poortader", 1]], u: "Let op de uitzonderingen: longslagader arm, longaders rijk." },
          { type: "sorteer", q: "Open of gesloten circulatiesysteem?", groepen: ["open", "gesloten"], items: [["sprinkhaan", 0], ["regenworm", 1], ["beerdiertje", 0], ["vis", 1], ["mens", 1], ["slak", 0]], u: "Een regenworm heeft een buisvormig hart, maar wel bloedvaten: gesloten." }
        ],
        open: [
          { q: "Een vis heeft een enkele, een mens een dubbele bloedsomloop. Leg uit dat dit samenhangt met hun lichaamstemperatuur.", a: "Een mens is warmbloedig en verbruikt veel energie, en dus veel zuurstof, om zijn lichaamstemperatuur constant te houden. Een dubbele bloedsomloop pompt het bloed na de longen met kracht naar de organen en voert zo veel zuurstof aan. Een vis is koudbloedig en verbruikt minder zuurstof; een enkele bloedsomloop met lagere druk is voor hem voldoende.", punten: ["warmbloedig: veel zuurstof nodig", "dubbele bloedsomloop: hoge druk naar organen, veel zuurstof", "vis koudbloedig: enkele bloedsomloop volstaat"] },
          { q: "Beschrijf de weg van een glucosemolecuul van de dunne darm naar een spiercel in je been. Noem de bloedvaten en hartdelen in de juiste volgorde.", a: "Dunne darm → poortader → lever → leverader → onderste holle ader → rechterboezem → rechterkamer → longslagader → longen → longaders → linkerboezem → linkerkamer → aorta → beenslagader → haarvaten in de beenspier → spiercel.", punten: ["poortader en lever", "via holle ader naar rechterharthelft", "kleine bloedsomloop door de longen", "linkerkamer, aorta, slagader naar het been"] }
        ],
        widgets: ["bloedroute"]
      },

      // ================= BS 3 Het hart =================
      {
        id: "t11-3", nr: "BS 3", titel: "Het hart",
        kern: [
          "Het hart is een holle spier met vier ruimten: twee **boezems** (boven) en twee **kamers** (onder). De [[harttussenwand]] scheidt de rechterhelft (zuurstofarm bloed) van de linkerhelft (zuurstofrijk bloed).",
          { fig: "hart", bij: "Doorsnede van het hart van voren gezien: de rechterhelft van het hart staat links in de tekening." },
          { let: "Een tekening van het hart is altijd van voren gezien, alsof je naar iemand kijkt. De rechterkamer staat dan links in de tekening." },
          "De linkerkamer heeft de dikste, meest gespierde wand: die pompt het bloed door het hele lichaam. De rechterkamer pompt alleen naar de longen. Beide kamers pompen per slag wel evenveel bloed weg.",
          { kop: "Kleppen" },
          { tabel: { kop: ["klep", "ligt tussen", "voorkomt terugstromen naar"], rijen: [["[[hartkleppen]]", "boezem en kamer (rechts en links)", "de boezem"], ["[[halvemaanvormige kleppen]]", "kamer en slagader (in de aorta en de longslagader)", "de kamer"]] } },
          "De hartkleppen zitten met peesdraden vast aan de kamerwand, zodat ze niet doorslaan naar de boezem.",
          { kop: "De hartcyclus" },
          { fig: "hartcyclus", bij: "Eén hartslag duurt bij 75 slagen per minuut 0,8 seconde." },
          { tabel: { kop: ["fase", "bloed stroomt naar", "hartkleppen", "halvemaanvormige kleppen"], rijen: [["boezems trekken samen", "de kamers", "open", "dicht"], ["kamers trekken samen", "de slagaders", "dicht", "open"], ["hartpauze", "de boezems en de kamers", "open", "dicht"]] } },
          { ezel: "Hartkleppen en halvemaanvormige kleppen staan altijd tegengesteld: zijn de een open, dan zijn de ander dicht." },
          "Als de kamers gaan samentrekken, slaan eerst de hartkleppen dicht. Pas als de druk in de kamers hoger is dan in de slagaders, gaan de halvemaanvormige kleppen open. Na het samentrekken slaan die weer dicht. Dat dichtklappen hoor je als harttonen.",
          { widget: "hart-lab" },
          { kop: "Hartspier en hartritme" },
          "De hartspier zelf krijgt zuurstof en voedingsstoffen via de [[kransslagaders]]. Het bloed gaat via de kransaders terug naar de rechterboezem. Raakt een kransslagader verstopt, dan sterft een deel van de hartspier af: een [[hartinfarct]].",
          "De impulsen voor het samentrekken ontstaan in het hart zelf, in de [[sinusknoop]] in de wand van de rechterboezem. Daarom klopt een hart buiten het lichaam nog even door. Een ecg meet die elektrische activiteit.",
          { fig: "ecg", bij: "Ecg van één hartslag: P-top (boezems), QRS (kamers), T-top (kamers ontspannen)." },
          "Bij een hartstilstand pompt het hart niet meer. Een **aed** geeft een stroomstoot, zodat de sinusknoop weer een normaal ritme kan oppakken.",
          { kop: "Hartminuutvolume" },
          { formule: "hartminuutvolume = hartslagfrequentie × slagvolume" },
          "Het [[slagvolume]] is de hoeveelheid bloed die één kamer per slag wegpompt (in rust ongeveer 70 tot 85 mL). Getrainde sporters hebben een groter slagvolume en daardoor in rust een lagere hartslag."
        ],
        begrippen: [
          ["boezem", "Bovenste hartruimte die bloed uit de aders ontvangt."],
          ["kamer", "Onderste, gespierde hartruimte die bloed de slagaders in pompt."],
          ["harttussenwand", "Wand tussen de linker- en rechterhelft van het hart."],
          ["hartkleppen", "Kleppen tussen boezem en kamer; voorkomen terugstromen naar de boezem."],
          ["halvemaanvormige kleppen", "Kleppen bij het begin van de aorta en de longslagader; voorkomen terugstromen naar de kamer."],
          ["peesdraden", "Draden die de hartkleppen aan de kamerwand vastmaken."],
          ["hartcyclus", "Eén hartslag: boezems trekken samen, kamers trekken samen, hartpauze."],
          ["hartpauze", "Fase waarin het hele hart ontspannen is en vol bloed loopt."],
          ["kransslagaders", "Slagaders die de hartspier van zuurstofrijk bloed voorzien."],
          ["hartinfarct", "Afsterven van een deel van de hartspier doordat een kransslagader is afgesloten."],
          ["sinusknoop", "Groepje cellen in de wand van de rechterboezem dat de impulsen voor de hartslag maakt."],
          ["ecg", "Elektrocardiogram: registratie van de elektrische activiteit van het hart."],
          ["slagvolume", "Hoeveelheid bloed die één kamer per hartslag wegpompt."],
          ["hartminuutvolume", "Hoeveelheid bloed die het hart per minuut rondpompt: hartslagfrequentie × slagvolume."],
          ["aed", "Apparaat dat met een stroomstoot een normaal hartritme kan herstellen."]
        ],
        vragen: [
          { q: "Welke kamer heeft de dikste wand, en waarom?", a: ["De linkerkamer, want die pompt het bloed door het hele lichaam", "De rechterkamer, want die pompt het bloed naar de longen", "De linkerkamer, want die bevat zuurstofarm bloed", "Beide even dik, want ze pompen evenveel bloed"], u: "De grote bloedsomloop heeft meer weerstand dan de kleine; de linkerkamer moet meer kracht leveren." },
          { q: "Een bloedcel gaat van de bovenste holle ader naar de aorta. Door welke delen van het hart gaat hij achtereenvolgens?", a: ["Rechterboezem, rechterkamer, linkerboezem, linkerkamer", "Rechterkamer, rechterboezem, linkerkamer, linkerboezem", "Linkerboezem, linkerkamer, rechterboezem, rechterkamer", "Rechterboezem, linkerboezem, rechterkamer, linkerkamer"], u: "Tussen rechterkamer en linkerboezem gaat hij door de longen." },
          { q: "Wat is de stand van de kleppen als de kamers samentrekken?", a: ["Hartkleppen dicht, halvemaanvormige kleppen open", "Hartkleppen open, halvemaanvormige kleppen dicht", "Alle kleppen open", "Alle kleppen dicht"], u: "Het bloed moet de slagaders in, niet terug naar de boezems." },
          { q: "Waar stroomt het bloed naartoe tijdens de hartpauze?", a: ["Naar de boezems en de kamers", "Naar de slagaders", "Alleen naar de boezems", "Nergens, het staat stil"], u: "Tijdens de hartpauze staan de hartkleppen open; het bloed loopt via de boezems door tot in de kamers." },
          { q: "Wanneer is het bloedvolume in de kamers het grootst?", a: ["Aan het eind van het samentrekken van de boezems", "Aan het eind van het samentrekken van de kamers", "Aan het begin van de hartpauze", "Midden in het samentrekken van de kamers"], u: "De boezems persen het laatste bloed de kamers in; daarna trekken de kamers samen." },
          { q: "Via welke bloedvaten krijgt de hartspier zuurstof?", a: ["Via de kransslagaders", "Via de longaders", "Rechtstreeks uit het bloed in de kamers", "Via de holle aders"], u: "De hartwand is te dik voor diffusie vanuit de kamers; hij heeft eigen vaten." },
          { q: "Waar komt koolstofdioxide uit de hartspier als eerste in het hart terecht?", a: ["In de rechterboezem, via de kransaders", "In de linkerboezem, via de longaders", "In de linkerkamer, via de aorta", "In de rechterkamer, via de longslagader"], u: "De kransaders monden uit in de rechterboezem." },
          { q: "Hoe kan een zoogdierhart buiten het lichaam nog even doorkloppen?", a: ["De impulsen ontstaan in het hart zelf, in de sinusknoop", "Het hart krijgt nog impulsen uit de hersenen via het bloed", "De hartkleppen blijven door de zwaartekracht bewegen", "De hartspier trekt alleen samen als er bloed in zit"], u: "De sinusknoop is de natuurlijke gangmaker van het hart." },
          { q: "Een klep bij de aorta sluit niet goed. Welk deel van het hart raakt te vol?", a: ["De linkerkamer", "De rechterkamer", "De linkerboezem", "De rechterboezem"], u: "Tijdens de hartpauze stroomt bloed uit de aorta terug in de linkerkamer." },
          { q: "Wat is het verschil tussen een hartinfarct en een hartstilstand?", a: ["Bij een infarct sterft een deel van de hartspier af; bij een stilstand pompt het hart niet meer", "Een infarct is in de linkerhelft, een stilstand in de rechterhelft", "Een stilstand is altijd dodelijk, een infarct nooit", "Een infarct gaat over de kleppen, een stilstand over de kransslagaders"], u: "Een infarct kan wel leiden tot een hartstilstand." },
          { q: "Een sporter traint maandenlang. Zijn hartslag in rust daalt, maar zijn hartminuutvolume blijft gelijk. Hoe kan dat?", a: ["Zijn slagvolume is groter geworden", "Zijn slagvolume is kleiner geworden", "Zijn bloed bevat meer plasma", "Zijn sinusknoop werkt niet meer"], u: "Hartminuutvolume = frequentie × slagvolume; als de frequentie daalt, moet het slagvolume stijgen." },
          { q: "Welk deel van het ecg hoort bij het samentrekken van de boezems?", a: ["De P-top", "Het QRS-complex", "De T-top", "De vlakke lijn na de T-top"], u: "P: boezems, QRS: kamers trekken samen, T: kamers herstellen." }
        ],
        reken: [
          { gen: (R) => { const f = R.int(55, 90), s = R.int(65, 90); return { q: `Iemand heeft in rust een hartslag van ${f} slagen per minuut en een slagvolume van ${s} mL. Bereken het hartminuutvolume in liter per minuut.`, antwoord: R.rond(f * s / 1000, 2), eenheid: "L/min", tol: 0.01, hint: "Hartminuutvolume = hartslagfrequentie × slagvolume; zet mL om in L.", stappen: [`${f} × ${s} mL = ${f * s} mL per minuut`, `${f * s} mL = ${R.nl(R.rond(f * s / 1000, 2))} L per minuut`] }; } },
          { gen: (R) => { const hmv = R.kies([15, 18, 20, 24, 25]), f = R.kies([150, 160, 170, 180]); return { q: `Tijdens een wedstrijd pompt het hart van een wielrenner ${hmv} liter bloed per minuut, bij een hartslag van ${f}. Bereken het slagvolume in mL.`, antwoord: R.rond(hmv * 1000 / f, 0), eenheid: "mL", tol: 1, hint: "Slagvolume = hartminuutvolume / hartslagfrequentie.", stappen: [`${hmv} L = ${hmv * 1000} mL`, `${hmv * 1000} / ${f} = ${R.nl(R.rond(hmv * 1000 / f, 1))} mL`] }; } },
          { gen: (R) => { const f = R.kies([60, 75, 80, 100, 120]); return { q: `Hoe lang duurt één hartslag (één hartcyclus) bij een hartslag van ${f} slagen per minuut? Geef je antwoord in seconden.`, antwoord: R.rond(60 / f, 2), eenheid: "s", tol: 0.01, hint: "Een minuut heeft 60 seconden.", stappen: [`60 / ${f} = ${R.nl(R.rond(60 / f, 2))} s`] }; } },
          { q: "Het hart pompt in rust ongeveer 5 L bloed per minuut. Hoeveel liter is dat per dag?", antwoord: 7200, eenheid: "L", hint: "Een dag heeft 24 × 60 minuten.", stappen: ["24 × 60 = 1440 minuten", "1440 × 5 = 7200 L"] }
        ],
        oefen: [
          { type: "koppel", q: "Koppel de fase aan de juiste beschrijving.", paren: [["boezems trekken samen", "bloed stroomt naar de kamers"], ["kamers trekken samen", "bloed stroomt de slagaders in"], ["hartpauze", "hart loopt vol, alles ontspannen"], ["halvemaanvormige kleppen dicht", "na het samentrekken van de kamers"]], u: "Gebruik de tabel van de hartcyclus." },
          { type: "invul", q: "Vul in.", tekst: "Als de kamers samentrekken, zijn de hartkleppen {dicht} en de halvemaanvormige kleppen {open}. De impulsen voor de hartslag ontstaan in de {sinusknoop}.", extra: ["kransslagader", "half open"], u: "Hartkleppen en halvemaanvormige kleppen staan tegengesteld." },
          { type: "sorteer", q: "Zuurstofrijk of zuurstofarm bloed?", groepen: ["zuurstofrijk", "zuurstofarm"], items: [["linkerboezem", 0], ["rechterkamer", 1], ["kransslagaders", 0], ["kransaders", 1], ["longaders", 0], ["bovenste holle ader", 1]], u: "Kransslagaders komen uit de aorta; kransaders voeren zuurstofarm bloed af." }
        ],
        open: [
          { q: "Een arts hoort een ruis bij het hart: een klep sluit niet goed. Leg uit wat het gevolg is voor de bloedstroom.", a: "Als een klep niet goed sluit, stroomt bloed terug: van een kamer naar een boezem (bij een hartklep) of van een slagader naar een kamer (bij een halvemaanvormige klep). Daardoor wordt per slag minder bloed de aorta of longslagader in gepompt, en moet het hart harder werken om genoeg bloed rond te pompen.", punten: ["bloed stroomt terug", "minder bloed per slag de slagader in", "hart moet harder werken"] },
          { q: "Leg uit waarom een aed kan helpen bij een hartstilstand door hartritmestoornissen.", a: "Bij zo'n hartstilstand trekken de hartspiercellen ongeordend samen, zodat het hart niet pompt. De stroomstoot van de aed laat alle spiercellen tegelijk stoppen. Daarna kan de sinusknoop weer de leiding nemen en impulsen in een normaal ritme afgeven.", punten: ["ongeordend samentrekken, hart pompt niet", "stroomstoot zet alles stil", "sinusknoop herstelt het ritme"] }
        ],
        widgets: ["hart-lab"]
      },

      // ================= BS 4 De bloedvaten =================
      {
        id: "t11-4", nr: "BS 4", titel: "De bloedvaten",
        kern: [
          "Er zijn drie soorten bloedvaten: [[slagaders]] voeren bloed van het hart af, [[aders]] voeren bloed naar het hart toe, en [[haarvaten]] liggen in de organen tussen slagaders en aders.",
          { fig: "vaten", bij: "Doorsnede van een slagader, een ader en een haarvat." },
          { tabel: { kop: ["", "slagaders", "haarvaten", "aders"], rijen: [["bloed stroomt", "van het hart naar de organen", "in de organen", "van de organen naar het hart"], ["wand", "dik, stevig en elastisch", "één cellaag dik", "dun en weinig elastisch"], ["bloedstroom", "stootsgewijs (kloppend)", "gelijkmatig, langzaam", "gelijkmatig"], ["kleppen", "nee (alleen de halvemaanvormige kleppen)", "nee", "ja, waar bloed omhoog moet"], ["bloeddruk", "hoog", "dalend", "laag"]] } },
          "Bij elke samentrekking van de linkerkamer rekt de elastische wand van de slagaders uit en veert daarna terug. Die golf voel je als **polsslag**.",
          "Door de dunne wand van de [[haarvaten]] vindt alle uitwisseling plaats tussen bloed en weefsel. Doordat er heel veel haarvaten zijn, is hun totale doorsnede groot en stroomt het bloed er langzaam: er is tijd voor uitwisseling.",
          { kop: "Terug naar het hart" },
          { fig: "aderklep", bij: "Kleppen in een ader laten het bloed alleen naar het hart stromen." },
          "In de aders is de druk laag. Kleppen in de aders zorgen dat het bloed niet terugzakt. Als je beenspieren samentrekken, drukken ze de aders samen en duwen ze het bloed omhoog (spierpomp).",
          { kop: "Bloeddruk" },
          { fig: "drukverloop", bij: "Bloeddruk, stroomsnelheid en totale doorsnede van de vaten." },
          "De bloeddruk is het hoogst in de aorta en daalt langs het vaatstelsel. In de slagaders schommelt hij: de [[bovendruk]] als de kamers samentrekken, de [[onderdruk]] in de hartpauze. Een normale bloeddruk is ongeveer 120/80 mm Hg.",
          { tip: "Je kunt boven- en onderdruk alleen in slagaders meten: alleen daar is de bloedstroom stootsgewijs. Een slagaderlijke bloeding spuit en is daardoor veel gevaarlijker dan een aderlijke." },
          { widget: "vaten-druk" },
          { kop: "Uitzonderingen" },
          "De longslagader is een slagader met zuurstofarm bloed; de longaders zijn aders met zuurstofrijk bloed. De [[poortader]] ligt tussen twee haarvatnetten: die van de darmen en die van de lever.",
          { kop: "Hart- en vaatziekten" },
          { fig: "atherosclerose", bij: "Atherosclerose: plaque in de wand vernauwt de slagader; een stolsel kan hem afsluiten." },
          "Bij [[atherosclerose]] zet zich vet (cholesterol) en kalk af in de wand van slagaders. De slagader wordt nauwer en minder elastisch. Een bloedstolsel kan het vat dan afsluiten: in een kransslagader geeft dat een hartinfarct, in de hersenen een herseninfarct (beroerte).",
          "Roken, veel verzadigd vet eten, weinig bewegen en een hoge bloeddruk vergroten de kans op atherosclerose. Onverzadigde vetten zijn gunstiger voor de vaatwanden.",
          { widget: "bloedroute" }
        ],
        begrippen: [
          ["slagader", "Bloedvat dat bloed van het hart af voert; dikke, elastische wand en hoge druk."],
          ["ader", "Bloedvat dat bloed naar het hart toe voert; dunne wand, kleppen en lage druk."],
          ["haarvat", "Heel dun bloedvat met een wand van één cellaag; hier vindt uitwisseling plaats."],
          ["aderklep", "Klep in een ader die voorkomt dat bloed terugstroomt."],
          ["spierpomp", "Samentrekkende spieren drukken aders samen en duwen het bloed naar het hart."],
          ["polsslag", "Drukgolf in de slagaders bij elke samentrekking van de linkerkamer."],
          ["bloeddruk", "De druk van het bloed op de wand van de bloedvaten."],
          ["bovendruk", "Hoogste druk in de slagaders, als de kamers samentrekken."],
          ["onderdruk", "Laagste druk in de slagaders, tijdens de hartpauze."],
          ["poortader", "Ader tussen de haarvaten van de darmen en die van de lever."],
          ["atherosclerose", "Vernauwing van slagaders door afzetting van vet en kalk in de wand (plaque)."],
          ["plaque", "Ophoping van vet, kalk en cellen in de wand van een slagader."],
          ["herseninfarct", "Afsterven van hersenweefsel doordat een slagader in de hersenen is afgesloten."]
        ],
        vragen: [
          { q: "Welke eigenschap hoort bij een slagader?", a: ["Dikke, elastische wand en stootsgewijze bloedstroom", "Dunne wand met kleppen", "Wand van één cellaag", "Lage druk en gelijkmatige stroom"], u: "De elastische wand vangt de drukstoten van het hart op." },
          { q: "Waarom komen in aders kleppen voor en in slagaders niet?", a: ["In aders is de druk zo laag dat het bloed zonder kleppen terug zou zakken", "In slagaders stroomt het bloed altijd omlaag", "Slagaders zijn te smal voor kleppen", "Aders vervoeren zuurstofarm bloed"], u: "In slagaders duwt de hoge druk het bloed vanzelf de goede kant op." },
          { q: "In welk bloedvat stroomt het bloed het langzaamst?", a: ["In de haarvaten", "In de aorta", "In de holle aders", "In de longslagader"], u: "De totale doorsnede van alle haarvaten samen is heel groot; daardoor is de snelheid laag." },
          { q: "Waarom kun je de onderdruk en bovendruk alleen in slagaders meten?", a: ["Alleen in slagaders is de bloedstroom stootsgewijs", "Alleen slagaders liggen dicht onder de huid", "In aders is helemaal geen bloeddruk", "Alleen slagaders hebben kleppen"], u: "In haarvaten en aders is de druk gelijkmatig geworden." },
          { q: "Een bloeddruk van 130/85. Wat betekent 130?", a: ["De druk als de kamers samentrekken (bovendruk)", "De druk tijdens de hartpauze (onderdruk)", "Het aantal hartslagen per minuut", "De druk in de holle aders"], u: "Het eerste getal is de bovendruk, het tweede de onderdruk." },
          { q: "Waarom is een slagaderlijke bloeding gevaarlijker dan een aderlijke?", a: ["Door de hoge druk spuit het bloed eruit en verlies je snel veel bloed", "Slagaderlijk bloed stolt niet", "Slagaderlijk bloed bevat geen bloedplaatjes", "Uit een ader komt geen bloed"], u: "Bij hoge druk stroomt er per seconde veel meer bloed weg." },
          { q: "Welk bloedvat ligt tussen twee haarvatnetten?", a: ["De poortader", "De aorta", "De longader", "De leverader"], u: "De poortader verbindt de haarvaten van de darmen met die van de lever." },
          { q: "Hoe helpt lopen bij het terugvoeren van bloed uit de benen?", a: ["Beenspieren drukken de aders samen; kleppen laten het bloed alleen omhoog gaan", "Lopen verhoogt de druk in de slagaders van de benen", "Bij lopen gaan de aderkleppen open staan", "Lopen maakt de aderwand elastischer"], u: "De spierpomp werkt samen met de aderkleppen." },
          { q: "Wat is atherosclerose?", a: ["Vernauwing van slagaders door vet- en kalkafzetting in de wand", "Het dichtslibben van aders door kleppen", "Een ontsteking van de hartkleppen", "Te weinig rode bloedcellen in het bloed"], u: "De plaque maakt de slagader nauwer en stijver." },
          { q: "Hoe verandert de bloeddruk van de aorta naar de holle aders?", a: ["Hij daalt steeds, het sterkst in de slagadertjes en haarvaten", "Hij stijgt steeds", "Hij blijft gelijk", "Hij is het hoogst in de haarvaten"], u: "Door de wrijving in de smalle vaatjes neemt de druk af." },
          { q: "Een alcoholmolecuul gaat via de kortste weg van de dunne darm naar de longen. Welke route?", a: ["Poortader, lever, leverader, onderste holle ader, rechterboezem, rechterkamer, longslagader", "Poortader, lever, aorta, linkerkamer, longader", "Darmslagader, aorta, linkerkamer, longslagader", "Poortader, onderste holle ader, linkerboezem, longaders"], u: "Darmbloed gaat eerst via de lever; daarna via de rechterharthelft naar de longen." }
        ],
        reken: [
          { gen: (R) => { const v = R.kies([4.5, 5, 5.5, 6]), h = R.kies([4.5, 5, 6, 7.5, 9]); return { q: `Je hebt ${R.nl(v)} L bloed en je hart pompt ${R.nl(h)} L per minuut rond. Hoe lang duurt het gemiddeld voordat al je bloed één keer is rondgepompt? Geef je antwoord in seconden.`, antwoord: R.rond(v / h * 60, 0), eenheid: "s", tol: 1, hint: "Tijd = totale hoeveelheid / hoeveelheid per minuut.", stappen: [`${R.nl(v)} / ${R.nl(h)} = ${R.nl(R.rond(v / h, 3))} minuut`, `× 60 = ${R.nl(R.rond(v / h * 60, 1))} s`] }; } },
          { gen: (R) => { const b = R.int(110, 150), o = R.int(65, 95); return { q: `Iemand heeft een bloeddruk van ${b}/${o} mm Hg. Wat is het verschil tussen bovendruk en onderdruk?`, antwoord: b - o, eenheid: "mm Hg", hint: "Het eerste getal is de bovendruk.", stappen: [`${b} − ${o} = ${b - o} mm Hg`] }; } }
        ],
        oefen: [
          { type: "sorteer", q: "Slagader, haarvat of ader?", groepen: ["slagader", "haarvat", "ader"], items: [["dikke, elastische wand", 0], ["wand van één cellaag", 1], ["kleppen in het been", 2], ["polsslag voelbaar", 0], ["uitwisseling met weefselvloeistof", 1], ["lage druk, gelijkmatige stroom naar het hart", 2]], u: "Gebruik de tabel met de drie soorten bloedvaten." },
          { type: "volgorde", q: "Zet de bloedvaten in volgorde van hoge naar lage bloeddruk.", items: ["aorta", "slagaders", "slagadertjes", "haarvaten", "adertjes", "aders", "holle aders"], u: "De druk daalt langs de hele grote bloedsomloop." },
          { type: "invul", q: "Vul in.", tekst: "De {bovendruk} meet je als de kamers samentrekken, de {onderdruk} tijdens de hartpauze. Bij {atherosclerose} wordt een slagader nauwer door vet en kalk in de wand.", extra: ["hartpauze", "trombose"], u: "Een normale bloeddruk is ongeveer 120/80 mm Hg." }
        ],
        open: [
          { q: "Leg uit waarom het bloed in de haarvaten langzaam stroomt en waarom dat gunstig is.", a: "Er zijn enorm veel haarvaten; hun totale doorsnede is veel groter dan die van de aorta. Dezelfde hoeveelheid bloed per seconde verdeelt zich over die grote doorsnede, dus de snelheid is laag. Daardoor is er genoeg tijd voor uitwisseling van stoffen tussen bloed en weefselvloeistof.", punten: ["grote totale doorsnede", "dus lage snelheid", "tijd voor uitwisseling"] },
          { q: "Leg uit hoe roken en veel verzadigd vet eten de kans op een hartinfarct vergroten.", a: "Ze bevorderen atherosclerose: vet en kalk zetten zich af in de wand van slagaders, ook in de kransslagaders. Die worden nauwer en minder elastisch. Op een plaque kan een bloedstolsel ontstaan dat de kransslagader afsluit. Het deel van de hartspier daarachter krijgt dan geen zuurstof en sterft af: een hartinfarct.", punten: ["atherosclerose in kransslagaders", "vernauwing en stolsel", "hartspier krijgt geen zuurstof"] }
        ],
        widgets: ["vaten-druk", "bloedroute"]
      },

      // ================= BS 5 Weefselvloeistof en lymfe =================
      {
        id: "t11-5", nr: "BS 5", titel: "Weefselvloeistof en lymfe",
        kern: [
          "Lichaamsvocht krijgt een naam naar de plek waar het is: in de bloedvaten heet het **bloedplasma**, tussen de cellen [[weefselvloeistof]] en in de lymfevaten [[lymfe]].",
          "Cellen nemen stoffen op uit de weefselvloeistof en geven er afvalstoffen aan af. De weefselvloeistof wordt steeds ververst vanuit de haarvaten.",
          { kop: "Uitwisseling in een haarvat" },
          { fig: "haarvat", bij: "Aan het begin van het haarvat gaat vocht eruit, aan het einde komt vocht terug." },
          "Twee krachten bepalen of er vocht uit een haarvat gaat of erin komt: de **bloeddruk** (perst vocht naar buiten) en de **osmotische waarde** van het bloed (trekt vocht naar binnen). Het bloed heeft een hogere osmotische waarde dan de weefselvloeistof, door de grote plasma-eiwitten die niet door de haarvatwand kunnen.",
          { voorbeeld: { titel: "Langs een haarvat", stappen: ["Begin van het haarvat: de bloeddruk is groter dan de osmotische aanzuiging. Water met kleine opgeloste stoffen (glucose, zouten, zuurstof) wordt naar buiten geperst.", "Grote eiwitten en rode bloedcellen blijven in het haarvat. Witte bloedcellen kunnen er wel uit.", "Einde van het haarvat: de bloeddruk is sterk gedaald. De osmotische aanzuiging is nu groter: vocht met afvalstoffen (CO_{2}, ureum) stroomt terug het haarvat in.", "Er gaat iets meer vocht uit dan er terugkomt. Dat overschot wordt afgevoerd door de lymfevaten."] } },
          { widget: "vaten-druk" },
          { kop: "Lymfe" },
          "[[Lymfevaten]] beginnen blind tussen de cellen. Ze vangen het overtollige weefselvocht op: dat heet dan lymfe. Net als aders hebben lymfevaten kleppen, en spieren duwen de lymfe voort.",
          "Onderweg stroomt de lymfe door [[lymfeknopen]]. Daarin zitten veel witte bloedcellen die ziekteverwekkers uit de lymfe halen. Bij een infectie zwellen de lymfeknopen in je hals op.",
          "De lymfe komt via een grote lymfebuis bij de sleutelbeenader weer in het bloed terecht. Lymfevaatjes in de darmvlokken nemen bovendien vetten op uit de darm.",
          { kop: "Oedeem" },
          "Hoopt zich te veel weefselvloeistof op, dan zwelt het weefsel op: [[oedeem]]. Dat gebeurt als er te veel vocht uit de haarvaten gaat of als het niet goed wordt afgevoerd.",
          { tabel: { kop: ["oorzaak", "waarom oedeem"], rijen: [["hoge bloeddruk in de haarvaten", "er wordt meer vocht uit de haarvaten geperst"], ["eiwittekort in de voeding (hongeroedeem)", "minder plasma-eiwitten: lagere osmotische waarde van het bloed, minder vocht terug"], ["lymfevaten geblokkeerd (bijvoorbeeld door wormen bij olifantsziekte)", "overtollig vocht wordt niet afgevoerd"], ["lang stilzitten (dikke enkels)", "geen spierpomp, dus minder afvoer via aders en lymfevaten"]] } },
          { tip: "In de longhaarvaten is de bloeddruk laag. Daardoor treedt er bijna geen vocht uit en blijven de longblaasjes droog, zodat de gaswisseling goed gaat." }
        ],
        begrippen: [
          ["weefselvloeistof", "Vocht tussen de cellen, ontstaan uit bloedplasma dat uit de haarvaten is geperst."],
          ["lymfe", "Weefselvloeistof die in de lymfevaten is opgenomen."],
          ["lymfevat", "Vat dat blind begint tussen de cellen en overtollig weefselvocht afvoert; heeft kleppen."],
          ["lymfeknoop", "Verdikking in een lymfevat met veel witte bloedcellen, die ziekteverwekkers verwijderen."],
          ["osmotische waarde", "Maat voor de concentratie opgeloste deeltjes; water stroomt naar de hoogste osmotische waarde."],
          ["plasma-eiwitten", "Grote eiwitten in het bloedplasma die niet door de haarvatwand kunnen."],
          ["oedeem", "Opzwelling door ophoping van weefselvloeistof."],
          ["hongeroedeem", "Oedeem door eiwittekort in de voeding."],
          ["olifantsziekte (elefantiase)", "Sterke zwelling doordat wormen de lymfevaten blokkeren."],
          ["sleutelbeenader", "Ader bij het sleutelbeen waar de lymfe weer in het bloed komt."]
        ],
        vragen: [
          { q: "Hoe heet het heldere vocht in een blaar?", a: ["Weefselvloeistof", "Bloedplasma", "Lymfe", "Bloedserum"], u: "Het vocht zit tussen de cellen van de huid: weefselvloeistof." },
          { q: "Welke kracht perst aan het begin van een haarvat vocht naar buiten?", a: ["De bloeddruk", "De osmotische waarde van het bloed", "De spierpomp", "De zwaartekracht"], u: "Aan het begin is de bloeddruk nog hoog, hoger dan de osmotische aanzuiging." },
          { q: "Waarom stroomt aan het einde van een haarvat vocht terug het haarvat in?", a: ["De bloeddruk is gedaald en het bloed heeft door de eiwitten een hogere osmotische waarde", "De bloeddruk is aan het einde het hoogst", "De weefselvloeistof bevat meer eiwitten dan het bloed", "De lymfevaten persen het vocht terug"], u: "De plasma-eiwitten blijven in het bloed en trekken water aan." },
          { q: "Welke bestanddelen van het bloed komen normaal niet in de weefselvloeistof?", a: ["Rode bloedcellen en grote plasma-eiwitten", "Water en glucose", "Zuurstof en zouten", "Witte bloedcellen"], u: "Die zijn te groot voor de openingen in de haarvatwand. Witte bloedcellen kunnen van vorm veranderen en wel passeren." },
          { q: "Wat gebeurt er met de vochtafgifte als de bloeddruk in een haarvat stijgt?", a: ["Er gaat meer vocht uit het haarvat", "Er gaat minder vocht uit het haarvat", "Er verandert niets", "Er komt meer vocht terug in het haarvat"], u: "Een hogere bloeddruk perst meer vocht naar buiten." },
          { q: "Ondervoede kinderen met eiwitgebrek krijgen een dikke buik. Hoe komt dat?", a: ["Er zijn weinig plasma-eiwitten, dus er stroomt minder vocht terug in de haarvaten", "Ze hebben een te hoge bloeddruk", "Hun lymfevaten zijn geblokkeerd door wormen", "Ze drinken te veel water"], u: "Minder eiwitten: lagere osmotische waarde van het bloed. Het vocht blijft in het weefsel: hongeroedeem." },
          { q: "Waarom zwellen de lymfeknopen in je hals op als je verkouden bent?", a: ["Er zijn veel witte bloedcellen aan het werk om ziekteverwekkers uit de lymfe te halen", "Er hoopt zich bloedplasma op", "De lymfe stolt in de lymfeknopen", "De lymfevaten krijgen een hogere bloeddruk"], u: "Lymfeknopen zijn filters met veel witte bloedcellen." },
          { q: "Waar komt de lymfe weer in het bloed terecht?", a: ["Bij een sleutelbeenader", "In de haarvaten van de longen", "In de lever via de poortader", "In de linkerkamer"], u: "De grote lymfebuis mondt uit in de ader bij het sleutelbeen." },
          { q: "Waarom krijg je na een lange vliegreis soms dikke enkels?", a: ["Door stilzitten werkt de spierpomp niet, zodat bloed en weefselvocht slecht worden afgevoerd", "In het vliegtuig is de luchtdruk hoger", "Je bloed bevat dan minder eiwitten", "Je lymfeknopen zijn ontstoken"], u: "Bewegen helpt: de spieren duwen bloed en lymfe omhoog." },
          { q: "Waarom treedt in de longhaarvaten bijna geen vocht uit?", a: ["De bloeddruk in de kleine bloedsomloop is laag", "De longhaarvaten hebben een wand zonder openingen", "Het bloed in de longen bevat geen water", "De longen hebben extra veel lymfevaten"], u: "Zo blijven de longblaasjes droog voor de gaswisseling." },
          { q: "Wat hebben lymfevaten en aders gemeen?", a: ["Ze hebben allebei kleppen en worden geholpen door spieren", "Ze vervoeren allebei zuurstofrijk bloed", "Ze beginnen allebei blind tussen de cellen", "Ze hebben allebei een dikke, elastische wand"], u: "Ook in lymfevaten is de druk laag." }
        ],
        oefen: [
          { type: "volgorde", q: "Zet de weg van een watermolecuul in de juiste volgorde.", items: ["bloedplasma in een slagadertje", "begin van een haarvat", "weefselvloeistof", "lymfevat", "lymfeknoop", "sleutelbeenader"], u: "Het overschot aan weefselvocht gaat via de lymfe terug naar het bloed." },
          { type: "sorteer", q: "Wat gebeurt er aan het begin en aan het einde van een haarvat?", groepen: ["begin van het haarvat", "einde van het haarvat"], items: [["bloeddruk groter dan de osmotische aanzuiging", 0], ["vocht stroomt terug het haarvat in", 1], ["glucose en zuurstof gaan het weefsel in", 0], ["CO_{2} en ureum gaan het bloed in", 1], ["bloeddruk sterk gedaald", 1], ["vocht wordt naar buiten geperst", 0]], u: "De osmotische aanzuiging blijft ongeveer gelijk; de bloeddruk daalt." },
          { type: "koppel", q: "Koppel de oorzaak aan het soort oedeem.", paren: [["eiwittekort in de voeding", "hongeroedeem"], ["wormen in de lymfevaten", "olifantsziekte"], ["lang stilzitten", "dikke enkels"], ["ontstoken lymfeknopen", "slechte afvoer van lymfe"]], u: "Steeds gaat er te veel vocht uit, of wordt er te weinig afgevoerd." }
        ],
        open: [
          { q: "Leg uit hoe een tekort aan eiwitten in het voedsel tot oedeem leidt.", a: "Bij eiwittekort komen er weinig eiwitten in het bloedplasma. Daardoor is de osmotische waarde van het bloed lager en is het verschil met de weefselvloeistof kleiner. Aan het einde van de haarvaten stroomt dan minder vocht terug het bloed in. Er blijft meer vocht achter in de weefsels dan de lymfevaten kunnen afvoeren: oedeem.", punten: ["weinig plasma-eiwitten", "lagere osmotische waarde bloed", "minder vocht terug in haarvaten", "vocht hoopt op"] },
          { q: "Bij olifantsziekte blokkeren wormen de lymfevaten. Leg uit waarom een been daardoor sterk opzwelt.", a: "Uit de haarvaten gaat altijd iets meer vocht naar buiten dan er terugkomt. Dat overschot wordt normaal door de lymfevaten afgevoerd. Als de lymfevaten geblokkeerd zijn, kan het niet weg en hoopt de weefselvloeistof zich op in het been.", punten: ["overschot aan weefselvocht", "normaal afgevoerd via lymfe", "blokkade: ophoping"] }
        ],
        widgets: ["vaten-druk"]
      }
    ]
  });
})();
