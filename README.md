# OŠK Slovan Beckov – návrh webu

Návrh nového webu futbalového klubu OŠK Slovan Beckov (Obecný športový klub Slovan Beckov). **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/osk-slovan-beckov/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/osk-slovan-beckov/admin/

## Vzhľad

**„Bočný panel“ (dizajn v2, 17. 11. 2026).** Svetlý kameň v paneli, biela plocha, modrá z vlajky, žltá len v drobnostiach. Písmo Libre Caslon Display (titulky) a Libre Caslon Text (text).

- na počítači stojí vľavo pevný panel s erbom, menu a najbližším zápasom áčka, vpravo sa posúva obsah,
- úvod: titulok, zápas áčka, výsledky a program, celá tabuľka a tri tituly za desať rokov,
- stránka Klub: ročníky áčka, ročník 2025/26, mládež 2026, ihrisko pri hrádzi a obec s hradom,
- na telefóne je panel nahradený hlavičkou a menu cez celú obrazovku.

Web sa skladá zo spoločného jadra v2 (`kluby-siet/engine`: `python assemble.py <web>`), vlastný je `src/site.js` (úvod, Klub, nastavenia) a `src/css/skin.css`.

## Obsah a zdroje

- Zápasy, výsledky, strelci, karty, počty divákov, zostavy dospelých, tabuľky a súpisky 5 tímov (áčko, U15, U13, U11, U9) zo Sportnetu (Futbalnet), verejné API súťaží (`scripts/sportnet.mjs` → `data/sportnet.json`). Vek hráčov sa neukladá, zostavy len pri dospelých.
- Ročníky áčka 2014/15 – 2025/26 z konečných tabuliek na Sportnete (`data/klub.json`).
- Správy z klubu z Beckovských novín (noviny obce od roku 1996): ročník 2025/26 v VI. lige, mládežnícke turnaje 2026, návšteva Leva Jašina v roku 1971 (4/2025), ihrisko, workoutový park a cyklotrasa pri hrádzi.
- Premenovanie TJ Slovan Beckov na OŠK (2010) a Facebook klubu z webu obce (Športové kluby). Hrad a obec podľa Slovakia.travel, Wikipédie a webu obce (O hrade, Osobnosti).
- E-mail zo Sportnetu. Vlastný web klubu sme nenašli (17. 11. 2026).
- Vlajka klubu a erby súperov zo Sportnetu (`scripts/logos.py`). Patria príslušným klubom.
- Písmo Rubik a Lora, licencia SIL Open Font License 1.1 (`scripts/fonts.py`, rovné číslice sú zapečené do písma).

## Zostavenie

Statický generátor bez závislostí (Node 20+, Python 3 s Pillow na erby a fontTools na písmo):

```
node scripts/sportnet.mjs        # zápasy, tabuľky a súpisky (FULL=1 stiahne znova aj detaily zápasov)
python -I scripts/logos.py       # erby súperov a náš erb do src/img (FORCE=1 stiahne znova)
node build.js                    # data/ + src/ -> dist/ (TODAY=2026-11-17 prepíše dnešný dátum)
node scripts/serve.mjs dist 5400 # náhľad na http://127.0.0.1:5400/ (?nolr = bez obnovovania, s CSP)
node scripts/deploy.mjs          # nasadenie dist/ na vetvu gh-pages (GitHub Pages)
```

Výsledky sa po zápasoch aktualizujú samé cez GitHub Actions (`.github/workflows/sportnet.yml`). Ročníky v `data/klub.json` treba po sezóne doplniť ručne.
