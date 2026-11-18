// Statický generátor webu OŠK Slovan Beckov: data/ + src/ -> dist/   (node build.js; TODAY=2026-11-17 prepíše dnešný dátum)
// Zostavuje ho kluby-siet/engine/assemble.py zo spoločného jadra v2 a tohto súboru (vzhľad, úvod, stránka Klub).
// Kostra „Bočný panel“: na počítači stojí vľavo pevný panel s erbom, menu a najbližším zápasom áčka, vpravo sa
// posúva obsah – zápas áčka, výsledky a program, tabuľka a tri tituly za desať rokov. Svetlý kameň v paneli, biela
// plocha, modrá z vlajky, žltá len v drobnostiach. Písmo Libre Caslon Display (titulky) a Libre Caslon Text (text).
const SKIN = {
  nav: 'side', theme: '#1d3480', brand: 'OŠK Slovan Beckov', brandSub: 'futbal pod hradom',
  fonts: ['libre-caslon-display-400.woff', 'libre-caslon-text-400.woff', 'libre-caslon-text-700.woff'],
  sources: 'Správy z klubu podľa Beckovských novín, obec podľa webu obce.',
  adminHero: 'Futbal pod Beckovským hradom',
  adminFacts: club.historia.filter((h) => h.rok !== '1971').map((h) => ({ k: h.rok, t: h.text })),
  links: [[club.noviny, 'Beckovské noviny']],
};
const NAV = [['zapasy/', 'Zápasy'], ['tabulky/', 'Tabuľky'], ['timy/', 'Tímy'], ['klub/', 'Klub'], ['kontakt/', 'Kontakt']];
const DESC = `${club.nazov} – zápasy, výsledky, tabuľky a súpisky áčka (${A.leagueName}) a mládeže. Za desať ročníkov z 8. ligy do krajskej VI. ligy, tri tituly.`;
const titles = club.rocniky.zoznam.filter((r) => r.titul || r.poz === 1);

add('', {
  title: 'futbal pod hradom', active: '', bodyClass: 'home',
  body: (R) => {
    const pick = cardPick(A.slug);
    const wl = winterLine();
    return `<section class="sec sec--first"><div class="wrap">
  <p class="kicker">Ročník ${SEASON} · ${esc(A.leagueName)}${A.pos ? ` · ${A.pos}. miesto ${zo(A.of)}` : ''}</p>
  <h1 class="h1">Futbal pod Beckovským hradom</h1>
  <p class="lede">Za desať ročníkov prešlo áčko z 8. ligy do krajskej VI. ligy Sever. V mládeži ${youth.length >= 2 && youth.length <= 4 ? 'hrajú' : 'hrá'} ${plural(youth.length, 'tím', 'tímy', 'tímov')}.</p>
  ${wl ? `<p class="pause">${nextA ? 'Zimná prestávka.' : wl}</p>` : ''}
  <div class="home-card">${pick ? card(pick, R, { big: true }) : ''}</div>
</div></section>
<section class="sec sec--tint" aria-labelledby="z-h"><div class="wrap">
  ${secHead('Zápasy', 'z-h', more(`${R}zapasy/`, 'Všetky zápasy'))}
  <div class="cols2"><div><h3 class="h3">Výsledky</h3>${fxList(homeRes(5, lastA), R)}</div><div><h3 class="h3">Program</h3>${homeUp(5, nextA).length ? fxList(homeUp(5, nextA), R) : '<p>Ďalšie zápasy zatiaľ nie sú vyžrebované.</p>'}</div></div>
</div></section>
${A.table ? `<section class="sec" aria-labelledby="t-h"><div class="wrap">${secHead(esc(A.leagueName), 't-h', more(`${R}tabulky/`, 'Všetky tabuľky'), 'Áčko')}${tableHtml(A.table, R)}</div></section>` : ''}
<section class="sec sec--tint" aria-labelledby="ti-h"><div class="wrap">
  ${secHead('Tri tituly za desať rokov', 'ti-h', more(`${R}klub/`, 'Ročníky a história'))}
  <ol class="titles">${titles.map((r) => `<li><b>${esc(r.rok)}</b><span>${esc(r.liga)}</span><small>${esc(r.skore)} · ${r.body} b</small></li>`).join('')}</ol>
</div></section>`;
  },
});

add('klub/', {
  title: 'Klub', active: 'klub/', desc: `${club.nazov}: z 8. ligy do VI. ligy, tri tituly, ročník 2025/26, mládež, ihrisko pri hrádzi a obec Beckov s hradom.`,
  body: (R) => `${pageHead({ title: 'Klub', sub: `${esc(club.pravnyNazov)}, do roku 2010 TJ Slovan Beckov. Klubové farby: ${esc(club.farby)}.`, R, crumbs: [[null, 'Klub']] })}
<section class="sec sec--first"><div class="wrap">
  <h2 class="h2">Ročníky áčka</h2>
  ${seasonsTable(club.rocniky.zoznam)}
</div></section>
<section class="sec sec--tint"><div class="wrap cols2">
  <div><h2 class="h2">Ročník 2025/26</h2><p>${esc(club.sezona2526.text)}</p></div>
  <div><h2 class="h2">Mládež 2026</h2>${facts(club.mladez.body)}</div>
</div></section>
<section class="sec"><div class="wrap cols2">
  <div><h2 class="h2">${esc(ST.nazov)}</h2>${facts(ST.fakty)}</div>
  <div><h2 class="h2">Beckov</h2>${facts(club.obec.fakty)}<p class="note">Zdroje: Beckovské noviny, web obce Beckov, Slovakia.travel, Wikipédia, Sportnet.</p></div>
</div></section>`,
});
