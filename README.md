# Toetsweek · Biologie

Interactieve leer-app voor de toetsweek (havo 5). Stof: Thema 9 DNA · Thema 11 Transport · Thema 3 Genetica (basisstof 5 t/m 7). Eigen oefenstof bij Biologie voor jou.

Statische app zonder build-stap: open `index.html`, of start een lokale server:

```bash
python3 -m http.server 8772
```

`core.js` en `core.css` zijn de gedeelde kern uit `../toetsweek/core/` (daar aanpassen, dan `../toetsweek/sync-core.sh`).
Controle van de stof: `node ../toetsweek/core/check.js`.

Controlescripts in `tools/`: `node tools/check-codons.js` (codontabel tegen de standaard genetische code), `node tools/check-genetica.js` (kruisingen, stambomen en kansen), `node tools/check-reken.js` (rekenopgaven thema 9 en 11). `tools/figuren.html` toont alle figuren.
