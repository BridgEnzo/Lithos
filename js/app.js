/*
 * Guide des roches — application (routeur + vues)
 * Aucune dépendance hormis Leaflet (cartes). Fonctionne en ouvrant index.html
 * directement ou via GitHub Pages.
 */
(function () {
  'use strict';

  /* =========================================================
   * Utilitaires
   * ========================================================= */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const num = (n) => String(n).replace('.', ',');
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } }
  };

  const ROCHES = (window.ROCHES || []).slice().sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
  const BY_ID = Object.fromEntries(ROCHES.map((r) => [r.id, r]));
  const FAM = {
    magmatique: { nom: 'Magmatiques', sing: 'Magmatique', css: 'mag', color: 'var(--mag)', hex: '#c2410c',
      desc: 'Nées du refroidissement d’un magma : en profondeur (plutoniques, grenues) ou en surface (volcaniques, à grain fin ou vitreuses).' },
    sedimentaire: { nom: 'Sédimentaires', sing: 'Sédimentaire', css: 'sed', color: 'var(--sed)', hex: '#a16207',
      desc: 'Formées en surface par accumulation de débris, d’organismes ou par précipitation chimique, puis consolidées.' },
    metamorphique: { nom: 'Métamorphiques', sing: 'Métamorphique', css: 'met', color: 'var(--met)', hex: '#4f5aa8',
      desc: 'Roches transformées à l’état solide par la température et la pression, souvent dans les chaînes de montagnes.' }
  };
  const HCL = { forte: 'Effervescence vive', faible: 'Faible / sur poudre', nulle: 'Aucune' };
  const MAGN = ['Non', 'Parfois faible', 'Oui'];
  const GRAIN = { invisible: 'invisible', fin: 'fin', moyen: 'moyen', grossier: 'grossier' };

  const tex = (r, w, h, leg) => window.RockTexture.render(r, w, h, leg);
  const range = (a, sep) => (a[0] === a[1] ? num(a[0]) : num(a[0]) + (sep || ' – ') + num(a[1]));
  const wikiUrl = (lang, title) => `https://${lang}.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(title)}&go=Go`;
  const osmUrl = (lat, lon) => `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=12/${lat}/${lon}`;

  /* =========================================================
   * Collection personnelle (localStorage)
   * ========================================================= */
  const Collection = {
    set: new Set(store.get('gr-collection', [])),
    has(id) { return this.set.has(id); },
    toggle(id) { this.set.has(id) ? this.set.delete(id) : this.set.add(id); store.set('gr-collection', [...this.set]); return this.set.has(id); }
  };
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-star]');
    if (!b) return;
    e.preventDefault(); e.stopPropagation();
    const on = Collection.toggle(b.dataset.star);
    $$(`[data-star="${b.dataset.star}"]`).forEach((x) => { x.setAttribute('aria-pressed', on); x.title = on ? 'Dans ma collection' : 'Ajouter à ma collection'; });
  });
  const starBtn = (id, cls) => `<button class="${cls || 'star'}" data-star="${id}" aria-pressed="${Collection.has(id)}" title="${Collection.has(id) ? 'Dans ma collection' : 'Ajouter à ma collection'}" aria-label="Ma collection">★</button>`;

  /* =========================================================
   * Photos : API Wikipédia (images Wikimedia Commons)
   * ========================================================= */
  const Photos = {
    key: 'gr-photos-v2',
    ttl: 1000 * 60 * 60 * 24 * 14,
    cache: store.get('gr-photos-v2', {}),
    enabled: store.get('gr-photos-on', true),
    pending: null,
    get(r) {
      if (r.photo) return { src: r.photo, local: true };
      const c = this.cache[r.id];
      return c && c.src ? c : null;
    },
    async query(lang, titles) {
      const url = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages&piprop=thumbnail%7Cname&pithumbsize=640&titles=` +
        encodeURIComponent(titles.join('|'));
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const q = data.query || {};
      const map = {};
      (q.normalized || []).forEach((n) => (map[n.from] = n.to));
      (q.redirects || []).forEach((n) => (map[n.from] = n.to));
      const pages = {};
      Object.values(q.pages || {}).forEach((p) => (pages[p.title] = p));
      const out = {};
      titles.forEach((t) => {
        let k = t; let guard = 0;
        while (map[k] && guard++ < 5) k = map[k];
        const p = pages[k];
        if (p && p.thumbnail) out[t] = { src: p.thumbnail.source, file: p.pageimage, lang, page: p.title };
      });
      return out;
    },
    prefetch() {
      if (!this.enabled) return Promise.resolve();
      if (this.pending) return this.pending;
      const now = Date.now();
      const todo = ROCHES.filter((r) => !r.photo && !(this.cache[r.id] && now - this.cache[r.id].t < this.ttl));
      if (!todo.length) return Promise.resolve();
      this.pending = (async () => {
        try {
          for (let i = 0; i < todo.length; i += 45) {
            const chunk = todo.slice(i, i + 45);
            let en = {};
            try { en = await this.query('en', chunk.map((r) => r.wiki[1])); } catch (e) { /* hors ligne */ }
            const missing = chunk.filter((r) => !en[r.wiki[1]]);
            let fr = {};
            if (missing.length) { try { fr = await this.query('fr', missing.map((r) => r.wiki[0])); } catch (e) { /* hors ligne */ } }
            chunk.forEach((r) => {
              const p = en[r.wiki[1]] || fr[r.wiki[0]];
              this.cache[r.id] = p ? Object.assign({ t: now }, p) : { t: now - this.ttl + 1000 * 60 * 60 }; // réessaie dans 1 h
            });
          }
          store.set(this.key, this.cache);
        } finally { this.pending = null; }
        this.apply(document);
      })();
      return this.pending;
    },
    // Remplace les illustrations par les photos dans les éléments [data-photo]
    apply(root) {
      if (!this.enabled) return;
      $$('[data-photo]', root).forEach((el) => {
        if (el.dataset.done) return;
        const r = BY_ID[el.dataset.photo];
        const p = r && this.get(r);
        if (!p) return;
        el.dataset.done = '1';
        const img = new Image();
        img.alt = 'Photo : ' + r.nom;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.referrerPolicy = 'no-referrer';
        img.onload = () => { img.classList.add('loaded'); setTimeout(() => { const sv = el.querySelector(':scope > svg'); if (sv) sv.remove(); }, 450); };
        img.onerror = () => img.remove();
        img.src = p.src;
        el.appendChild(img);
      });
    }
  };

  /* =========================================================
   * Lames minces : photos au microscope (Wikimedia Commons)
   * Par défaut, recherche automatique « <roche> thin section ».
   * Pour imposer des images précises, ajoutez dans la fiche :
   *   lames: ['File:Nom_du_fichier.jpg', ...]
   * ========================================================= */
  const MICRO_Q = {
    diatomite: 'diatomite diatoms microscope', argile: 'clay thin section micrograph', loess: 'loess thin section',
    houille: 'coal petrography microscope', lignite: 'lignite thin section', halite: 'rock salt halite thin section',
    ferrubane: 'banded iron formation thin section', dolomie: 'dolostone thin section', conglomerat: 'conglomerate thin section',
    ponce: 'pumice thin section', scorie: 'scoria thin section', oolithique: 'oolite thin section', lumachelle: 'coquina thin section'
  };
  const Micro = {
    key: 'gr-lames-v1', ttl: 1000 * 60 * 60 * 24 * 14,
    cache: store.get('gr-lames-v1', {}),
    re: /thin[ _-]?section|lame[ _-]?mince|micrograph|microscop|photomicro|\bxpl\b|\bppl\b|polari[sz]|cross[ _-]?nicol|crossed|petrograph/i,
    strip(html) { const d = document.createElement('div'); d.innerHTML = html || ''; return (d.textContent || '').trim(); },
    async api(params) {
      const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=url%7Cextmetadata&iiurlwidth=480&' + params;
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const pages = Object.values(((await res.json()).query || {}).pages || {});
      pages.sort((a, b) => (a.index || 0) - (b.index || 0));
      return pages.filter((p) => p.imageinfo && p.imageinfo[0] && p.imageinfo[0].thumburl).map((p) => {
        const ii = p.imageinfo[0], m = ii.extmetadata || {};
        return {
          title: p.title, thumb: ii.thumburl, page: ii.descriptionurl,
          desc: this.strip(m.ImageDescription && m.ImageDescription.value).slice(0, 220),
          author: this.strip(m.Artist && m.Artist.value).slice(0, 80),
          licence: m.LicenseShortName ? m.LicenseShortName.value : ''
        };
      });
    },
    async get(r) {
      const c = this.cache[r.id];
      if (c && Date.now() - c.t < this.ttl) return c.items;
      let items;
      if (r.lames && r.lames.length) {
        items = await this.api('titles=' + encodeURIComponent(r.lames.join('|')));
      } else {
        const q = (MICRO_Q[r.id] || r.wiki[1].replace(/\s*\(.*\)/, '') + ' thin section') + ' filetype:bitmap';
        const found = await this.api('generator=search&gsrnamespace=6&gsrlimit=20&gsrsearch=' + encodeURIComponent(q));
        items = found.filter((x) => this.re.test(x.title + ' ' + x.desc)).slice(0, 6);
      }
      this.cache[r.id] = { t: Date.now(), items };
      store.set(this.key, this.cache);
      return items;
    },
    searchUrl(r) {
      const q = MICRO_Q[r.id] || r.wiki[1].replace(/\s*\(.*\)/, '') + ' thin section';
      return 'https://commons.wikimedia.org/w/index.php?title=Special:MediaSearch&type=image&search=' + encodeURIComponent(q);
    },
    async render(r, el) {
      if (!Photos.enabled) { el.innerHTML = '<p class="muted small">Photos désactivées (voir le pied de page).</p>'; return; }
      el.innerHTML = '<p class="muted small">Recherche de lames minces sur Wikimedia Commons…</p>';
      let items;
      try { items = await this.get(r); } catch (e) { items = null; }
      if (!el.isConnected) return;
      if (!items) { el.innerHTML = `<p class="muted small">Impossible de charger les images (hors ligne ?). <a href="${this.searchUrl(r)}" target="_blank" rel="noopener">Chercher sur Wikimedia Commons</a></p>`; return; }
      if (!items.length) { el.innerHTML = `<p class="muted small">Aucune lame mince trouvée automatiquement pour cette roche. <a href="${this.searchUrl(r)}" target="_blank" rel="noopener">Chercher sur Wikimedia Commons</a></p>`; return; }
      el.innerHTML = `<div class="micro-grid">${items.map((x, i) => `
          <figure class="micro">
            <button class="micro-img" data-i="${i}" aria-label="Agrandir"><img src="${esc(x.thumb)}" alt="${esc(x.desc || x.title)}" loading="lazy" referrerpolicy="no-referrer"></button>
            <figcaption>${x.desc ? esc(x.desc.length > 110 ? x.desc.slice(0, 110) + '…' : x.desc) + '<br>' : ''}<a href="${esc(x.page)}" target="_blank" rel="noopener">${esc(x.author || 'Auteur')}</a>${x.licence ? ' · ' + esc(x.licence) : ''}</figcaption>
          </figure>`).join('')}</div>
        <p class="small muted" style="margin-top:.6rem">Images trouvées automatiquement : vérifiez la légende, une image peut être mal classée. <a href="${this.searchUrl(r)}" target="_blank" rel="noopener">Voir plus sur Commons</a></p>`;
      el.querySelector('.micro-grid').addEventListener('click', (e) => {
        const b = e.target.closest('[data-i]');
        if (!b) return;
        const x = items[+b.dataset.i];
        const big = x.thumb.replace(/\/\d+px-/, '/1280px-');
        const d = document.createElement('div');
        d.className = 'modal';
        d.innerHTML = `<figure class="card micro-big"><img src="${esc(big)}" alt="${esc(x.desc || x.title)}" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${esc(x.thumb)}'">
          <figcaption class="small">${esc(x.desc || x.title.replace(/^File:/, ''))}<br><a href="${esc(x.page)}" target="_blank" rel="noopener">${esc(x.author || 'Auteur')}</a>${x.licence ? ' · ' + esc(x.licence) : ''} — Wikimedia Commons</figcaption></figure>`;
        d.addEventListener('click', (ev) => { if (!ev.target.closest('a')) d.remove(); });
        document.body.appendChild(d);
      });
    }
  };

  /* =========================================================
   * Illustration annotée et formations géologiques
   * ========================================================= */
  function swatchColor(r, key) {
    const t = r.tex || {}, c = t.c || [];
    if (key === 'b') return t.b;
    if (/^c\d$/.test(key)) return c[+key[1]] || t.b;
    if (t[key] && typeof t[key] === 'string') return t[key];
    if (key === 'holes') return t.k === 'bulles' ? c[0] : t.k === 'lite' ? '#6b5a3f' : '#0b0b0c';
    if (key === 'grains') return t.k === 'folie' ? c[2] : c[0];
    if (key === 'lines') return t.k === 'verre' ? (c[1] || t.b) : (c[1] || c[0] || t.b);
    return t.b;
  }
  function illustration(r, solo) {
    const leg = (window.LEGENDES || {})[r.id];
    const info = (window.TEXTURES_INFO || {})[(r.tex || {}).k] || '';
    const svg = tex(r, 480, solo ? 340 : 260, leg ? leg.l : null);
    return `<figure class="illu${solo ? ' solo' : ''}">${svg}
      <figcaption>
        ${leg ? `<ol class="legend">${leg.l.map((x, i) => {
          const k = [].concat(x[0])[0];
          return `<li><span class="num">${i + 1}</span><span class="swc" style="background:${swatchColor(r, k)}"></span><span><strong>${esc(x[1])}</strong>${x[2] ? ' — ' + esc(x[2]) : ''}</span></li>`;
        }).join('')}</ol>` : ''}
        <p class="small" style="margin:.6rem 0 .2rem">${esc(info)}${leg && leg.e ? ` <span class="muted">Largeur représentée : ${esc(leg.e)}.</span>` : ''}</p>
        <p class="tiny muted">Illustration schématique générée, non photographique.${solo && Photos.enabled ? ' <span id="photoMissing">Recherche d’une photo…</span>' : ''}</p>
      </figcaption>
    </figure>`;
  }
  function gisementsBlock(r) {
    const G = (window.GISEMENTS || {})[r.id];
    if (!G) return '';
    const T = window.GISEMENT_TYPES || {};
    return `<section class="card block"><h2>🏔️ Formations géologiques où la trouver</h2>
      <ul class="gis">${G.g.map(([type, txt]) => `<li><a class="gis-type" href="#/catalogue?milieu=${type}" title="Toutes les roches de ce milieu">${T[type] ? T[type][0] + ' ' + esc(T[type][1]) : esc(type)}</a><span>${esc(txt)}</span></li>`).join('')}</ul>
      ${G.paysage ? `<div class="callout" style="margin-top:1rem"><strong>👀 Sur le terrain, repérez :</strong> ${esc(G.paysage)}</div>` : ''}
      <p class="small muted" style="margin-top:.8rem">Pour savoir quelles formations affleurent près de chez vous : carte géologique <a href="https://infoterre.brgm.fr/" target="_blank" rel="noopener">BRGM InfoTerre</a> (France) ou <a href="https://macrostrat.org/map" target="_blank" rel="noopener">Macrostrat</a> (monde).</p>
    </section>`;
  }

  /* =========================================================
   * Composants
   * ========================================================= */
  function card(r) {
    return `<a class="card rock-card" href="#/roche/${r.id}">
      <div class="thumb" data-photo="${r.id}">${tex(r, 240, 160)}</div>
      ${starBtn(r.id)}
      <div class="body">
        <span class="tag ${r.famille}">${esc(FAM[r.famille].sing)}</span>
        <h3>${esc(r.nom)}</h3>
        <span class="grp">${esc(r.groupe)}</span>
        <p>${esc(r.resume)}</p>
        <div class="mini-facts">
          <span title="Densité">⚖️ ${range(r.densite, '–')}</span>
          <span title="Dureté (Mohs)">💎 ${range(r.durete, '–')}</span>
          <span title="Acide">🧪 ${r.hcl === 'forte' ? 'HCl +' : r.hcl === 'faible' ? 'HCl ±' : 'HCl –'}</span>
          ${r.magn === 2 ? '<span title="Magnétique">🧲 oui</span>' : ''}
        </div>
      </div>
    </a>`;
  }
  const swatch = (r, w, h) => `<div class="sw">${tex(r, w || 64, h || 48)}</div>`;
  const rockLink = (id) => (BY_ID[id] ? `<a href="#/roche/${id}">${esc(BY_ID[id].nom)}</a>` : esc(id));

  /* =========================================================
   * Cartes Leaflet
   * ========================================================= */
  let maps = [];
  function clearMaps() { maps.forEach((m) => { try { m.remove(); } catch (e) {} }); maps = []; }
  function makeMap(el, opts) {
    if (!window.L) { el.innerHTML = '<p class="photo-missing">Carte indisponible (Leaflet non chargé).</p>'; return null; }
    const m = L.map(el, Object.assign({ scrollWheelZoom: false, worldCopyJump: true }, opts || {}));
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, subdomains: 'abc',
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(m);
    maps.push(m);
    return m;
  }
  function marker(m, lat, lon, color, html) {
    return L.circleMarker([lat, lon], { radius: 7, color: '#fff', weight: 2, fillColor: color, fillOpacity: 0.95 }).addTo(m).bindPopup(html);
  }

  /* =========================================================
   * Cycle des roches (SVG)
   * ========================================================= */
  function cycleSVG() {
    const cx = 330, cy = 225, R = 160;
    const nodes = [
      { a: -90, t: 'Magma', c: '#7a1d0b', href: '#/classification' },
      { a: -18, t: 'Roches magmatiques', c: FAM.magmatique.hex, href: '#/catalogue?famille=magmatique' },
      { a: 54, t: 'Sédiments', c: '#8a7b63', href: '#/catalogue?famille=sedimentaire' },
      { a: 126, t: 'Roches sédimentaires', c: FAM.sedimentaire.hex, href: '#/catalogue?famille=sedimentaire' },
      { a: 198, t: 'Roches métamorphiques', c: FAM.metamorphique.hex, href: '#/catalogue?famille=metamorphique' }
    ];
    const labels = ['Refroidissement, cristallisation', 'Altération, érosion, transport', 'Diagenèse (compaction, cimentation)', 'Métamorphisme (↑ pression, température)', 'Fusion partielle'];
    const P = (a, r) => [cx + Math.cos(a * Math.PI / 180) * (r || R), cy + Math.sin(a * Math.PI / 180) * (r || R)];
    let s = `<svg viewBox="0 0 660 450" role="img" aria-labelledby="cyT"><title id="cyT">Le cycle des roches</title>
      <defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="var(--ink-2)"/></marker></defs>`;
    nodes.forEach((n, i) => {
      const a1 = n.a + 19, a2 = nodes[(i + 1) % 5].a + (i === 4 ? 360 : 0) - 19;
      const [x1, y1] = P(a1), [x2, y2] = P(a2);
      s += `<path d="M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}" fill="none" stroke="var(--ink-2)" stroke-width="2" marker-end="url(#arr)"/>`;
      const am = (a1 + a2) / 2;
      const [lx, ly] = P(am, R + 30);
      const anchor = Math.abs(lx - cx) < 30 ? 'middle' : lx > cx ? 'start' : 'end';
      s += `<text x="${lx}" y="${ly}" font-size="12.5" fill="var(--ink-2)" text-anchor="${anchor}" dominant-baseline="middle">${labels[i]}</text>`;
    });
    // flèches internes
    const [mx, my] = P(-18, R - 52), [tx, ty] = P(198, R - 52);
    s += `<path d="M ${mx} ${my} L ${tx} ${ty}" stroke="var(--ink-3)" stroke-dasharray="5 4" stroke-width="1.6" marker-end="url(#arr)"/>`;
    s += `<text x="${cx}" y="${my - 8}" font-size="12" fill="var(--ink-3)" text-anchor="middle">Métamorphisme</text>`;
    const [ex, ey] = P(198, R - 40), [sx, sy] = P(54, R - 40);
    s += `<path d="M ${ex} ${ey + 10} L ${sx - 6} ${sy - 10}" stroke="var(--ink-3)" stroke-dasharray="5 4" stroke-width="1.6" marker-end="url(#arr)"/>`;
    s += `<text x="${cx - 18}" y="${cy + 48}" font-size="12" fill="var(--ink-3)" text-anchor="middle" transform="rotate(32 ${cx - 18} ${cy + 48})">Érosion</text>`;
    nodes.forEach((n) => {
      const [x, y] = P(n.a);
      const w = n.t.length * 7.3 + 26;
      s += `<a href="${n.href}"><rect x="${x - w / 2}" y="${y - 19}" width="${w}" height="38" rx="19" fill="${n.c}"/><text x="${x}" y="${y + 1}" fill="#fff" font-size="13.5" font-weight="700" text-anchor="middle" dominant-baseline="middle">${n.t}</text></a>`;
    });
    return s + '</svg>';
  }

  /* =========================================================
   * VUES
   * ========================================================= */
  const app = $('#app');

  function viewHome() {
    const count = (f) => ROCHES.filter((r) => r.famille === f).length;
    const pickIds = ['granite', 'basalte', 'gneiss', 'calcaire', 'obsidienne', 'conglomerat', 'marbre', 'gres', 'micaschiste'];
    app.innerHTML = `
      <section class="hero">
        <div>
          <div class="kicker">Guide de terrain</div>
          <h1>Reconnaître, tester et comprendre les roches</h1>
          <p class="lead">${ROCHES.length} roches magmatiques, sédimentaires et métamorphiques : description, tests d’identification, formation, lieux où les observer et clé de détermination.</p>
          <form class="hero-search" id="homeSearch" role="search">
            <input type="search" name="q" placeholder="Chercher une roche, un minéral… (ex. olivine)" aria-label="Rechercher">
            <button class="btn primary" type="submit">Chercher</button>
          </form>
          <div class="chips">
            <a class="btn" href="#/identifier">🔎 Identifier une roche</a>
            <a class="btn ghost" href="#/roche/${ROCHES[Math.floor(Math.random() * ROCHES.length)].id}">🎲 Roche au hasard</a>
          </div>
        </div>
        <div class="hero-mosaic">
          ${pickIds.map((id) => BY_ID[id]).filter(Boolean).map((r) => `<a href="#/roche/${r.id}" class="thumb" data-photo="${r.id}" aria-label="${esc(r.nom)}">${tex(r, 160, 160)}<span>${esc(r.nom)}</span></a>`).join('')}
        </div>
      </section>

      <div class="section-title"><h2>Les trois grandes familles</h2></div>
      <div class="grid familles">
        ${Object.entries(FAM).map(([k, f]) => `
          <a class="card famille-card" style="--c:${f.color}" href="#/catalogue?famille=${k}">
            <div class="n">${count(k)}</div>
            <h3>Roches ${f.nom.toLowerCase()}</h3>
            <p class="muted small">${f.desc}</p>
          </a>`).join('')}
      </div>

      <div class="section-title"><h2>Outils</h2></div>
      <div class="grid tools">
        <a class="card tool" href="#/identifier"><span class="ico">🔎</span><strong>Assistant d’identification</strong><span class="muted small">Répondez à quelques observations : les roches compatibles sont classées.</span></a>
        <a class="card tool" href="#/identifier?mode=cle"><span class="ico">🗝️</span><strong>Clé de détermination</strong><span class="muted small">Questions successives jusqu’au nom de la roche.</span></a>
        <a class="card tool" href="#/tests"><span class="ico">🧪</span><strong>Tests de terrain</strong><span class="muted small">Acide, dureté, densité, aimant… avec calculateur.</span></a>
        <a class="card tool" href="#/carte"><span class="ico">🗺️</span><strong>Carte des localités</strong><span class="muted small">${ROCHES.reduce((n, r) => n + r.lieux.length, 0)} sites remarquables dans le monde.</span></a>
      </div>

      <div class="section-title"><h2>Le cycle des roches</h2></div>
      <div class="card pad cycle-wrap">
        <div class="cycle">${cycleSVG()}</div>
        <div>
          <p>Les roches se transforment sans cesse les unes en les autres, au rythme de la tectonique des plaques et de l’érosion.</p>
          <p><strong>Magmatiques</strong> : le magma refroidit en profondeur (granite, gabbro) ou en surface (basalte, rhyolite).</p>
          <p><strong>Sédimentaires</strong> : l’érosion produit des débris qui se déposent et se consolident (grès, argilite) ; les organismes et la chimie de l’eau forment calcaires, évaporites et charbons.</p>
          <p><strong>Métamorphiques</strong> : enfouies, chauffées et comprimées, les roches recristallisent (ardoise, gneiss, marbre) et peuvent finir par fondre.</p>
          <a class="btn" href="#/classification">Voir la classification détaillée →</a>
        </div>
      </div>`;
    $('#homeSearch').addEventListener('submit', (e) => {
      e.preventDefault();
      location.hash = '#/catalogue?q=' + encodeURIComponent(e.target.q.value.trim());
    });
  }

  /* ---------- Catalogue ---------- */
  function hasMilieu(r, k) {
    const G = (window.GISEMENTS || {})[r.id];
    return !!G && G.g.some((x) => x[0] === k);
  }
  function searchText(r) {
    const G = (window.GISEMENTS || {})[r.id];
    return r._s || (r._s = norm([G ? G.g.map((x) => x[1]).join(' ') + ' ' + G.paysage : '',r.nom, r.alias.join(' '), r.groupe, r.resume, r.couleur, r.mineraux.map((m) => m[0]).join(' '), r.lieux.map((l) => l[0] + ' ' + l[1]).join(' ')].join(' ')));
  }
  function viewCatalogue(q) {
    const st = { famille: q.famille || '', groupe: q.groupe || '', milieu: q.milieu || '', q: q.q || '', coll: q.coll === '1', tri: q.tri || 'nom' };
    app.innerHTML = `
      <h1>Catalogue des roches</h1>
      <div class="card filters">
        <div class="filters-row">
          <input type="search" id="fq" placeholder="Nom, minéral, lieu, couleur…" value="${esc(st.q)}" aria-label="Rechercher">
          <select id="fg" aria-label="Sous-famille"></select>
          <select id="fm" aria-label="Milieu de formation">
            <option value="">Tous milieux de formation</option>
            ${Object.entries(window.GISEMENT_TYPES || {}).filter(([k]) => ROCHES.some((r) => hasMilieu(r, k))).map(([k, v]) => `<option value="${k}" ${k === st.milieu ? 'selected' : ''}>${v[0]} ${esc(v[1])}</option>`).join('')}
          </select>
          <select id="ft" aria-label="Trier">
            <option value="nom">Tri : A → Z</option>
            <option value="densite">Tri : densité</option>
            <option value="durete">Tri : dureté</option>
            <option value="famille">Tri : famille</option>
          </select>
        </div>
        <div class="filters-row">
          <div class="chips" id="ff">
            <button class="chip" data-f="">Toutes</button>
            ${Object.entries(FAM).map(([k, f]) => `<button class="chip ${f.css}" data-f="${k}"><span class="dot" style="color:${f.color}"></span> ${f.nom}</button>`).join('')}
            <button class="chip" id="fc">★ Ma collection</button>
          </div>
          <span class="count" id="fn"></span>
        </div>
      </div>
      <div class="rock-grid" id="grid"></div>`;
    const grid = $('#grid'), fg = $('#fg'), fq = $('#fq'), ft = $('#ft');
    ft.value = st.tri;

    function fillGroups() {
      const groups = [...new Set(ROCHES.filter((r) => !st.famille || r.famille === st.famille).map((r) => r.groupe))].sort((a, b) => a.localeCompare(b, 'fr'));
      if (st.groupe && !groups.includes(st.groupe)) st.groupe = '';
      fg.innerHTML = '<option value="">Toutes sous-familles</option>' + groups.map((g) => `<option ${g === st.groupe ? 'selected' : ''}>${esc(g)}</option>`).join('');
    }
    function update() {
      $$('#ff [data-f]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.f === st.famille));
      $('#fc').setAttribute('aria-pressed', st.coll);
      const words = norm(st.q).split(/\s+/).filter(Boolean);
      let list = ROCHES.filter((r) =>
        (!st.famille || r.famille === st.famille) &&
        (!st.groupe || r.groupe === st.groupe) &&
        (!st.milieu || hasMilieu(r, st.milieu)) &&
        (!st.coll || Collection.has(r.id)) &&
        words.every((w) => searchText(r).includes(w)));
      const order = { magmatique: 0, sedimentaire: 1, metamorphique: 2 };
      if (st.tri === 'densite') list.sort((a, b) => a.densite[0] + a.densite[1] - b.densite[0] - b.densite[1]);
      if (st.tri === 'durete') list.sort((a, b) => a.durete[0] + a.durete[1] - b.durete[0] - b.durete[1]);
      if (st.tri === 'famille') list.sort((a, b) => order[a.famille] - order[b.famille] || a.groupe.localeCompare(b.groupe, 'fr'));
      $('#fn').textContent = `${list.length} roche${list.length > 1 ? 's' : ''}`;
      grid.innerHTML = list.length ? list.map(card).join('') :
        `<div class="empty" style="grid-column:1/-1">${st.coll ? 'Votre collection est vide : cliquez sur ★ sur une fiche pour l’ajouter.' : 'Aucune roche ne correspond. Essayez un autre mot-clé.'}</div>`;
      Photos.apply(grid);
      const p = new URLSearchParams();
      if (st.famille) p.set('famille', st.famille);
      if (st.groupe) p.set('groupe', st.groupe);
      if (st.milieu) p.set('milieu', st.milieu);
      if (st.q) p.set('q', st.q);
      if (st.coll) p.set('coll', '1');
      if (st.tri !== 'nom') p.set('tri', st.tri);
      const h = '#/catalogue' + (p.toString() ? '?' + p : '');
      if (location.hash !== h) history.replaceState(null, '', h);
    }
    $('#ff').addEventListener('click', (e) => {
      const b = e.target.closest('[data-f]');
      if (b) { st.famille = b.dataset.f; fillGroups(); update(); }
    });
    $('#fc').addEventListener('click', () => { st.coll = !st.coll; update(); });
    fg.addEventListener('change', () => { st.groupe = fg.value; update(); });
    $('#fm').addEventListener('change', (e) => { st.milieu = e.target.value; update(); });
    ft.addEventListener('change', () => { st.tri = ft.value; update(); });
    fq.addEventListener('input', () => { st.q = fq.value; update(); });
    fillGroups(); update();
  }

  /* ---------- Fiche roche ---------- */
  function viewRoche(id) {
    const r = BY_ID[id];
    if (!r) return view404();
    const f = FAM[r.famille];
    const i = ROCHES.indexOf(r);
    const prev = ROCHES[(i - 1 + ROCHES.length) % ROCHES.length], next = ROCHES[(i + 1) % ROCHES.length];
    const p = Photos.enabled ? Photos.get(r) : null;
    const gauge = (v, max) => `<div class="gauge"><i style="left:${(v[0] / max) * 100}%;right:${100 - (Math.max(v[1], v[0] + max * 0.03) / max) * 100}%"></i></div>`;
    const credit = p ? (p.local ? 'Photo locale' :
      `Photo : <a href="https://${p.lang}.wikipedia.org/wiki/File:${encodeURIComponent(p.file)}" target="_blank" rel="noopener">${esc(p.file.replace(/_/g, ' '))}</a> — Wikimedia Commons (voir licence et auteur)`) : '';
    const bigSrc = p && !p.local ? p.src.replace(/\/\d+px-/, '/960px-') : p && p.src;

    app.innerHTML = `
      <nav class="crumbs"><a href="#/catalogue">Catalogue</a> › <a href="#/catalogue?famille=${r.famille}">${f.nom}</a> › <a href="#/catalogue?famille=${r.famille}&groupe=${encodeURIComponent(r.groupe)}">${esc(r.groupe)}</a></nav>
      <section class="fiche-head">
        <div>
          <span class="tag ${r.famille}">${f.sing} · ${esc(r.groupe)}</span>
          <h1>${esc(r.nom)}</h1>
          ${r.alias.length ? `<div class="alias">Aussi : ${r.alias.map(esc).join(', ')}</div>` : ''}
          <p class="resume">${esc(r.resume)}</p>
          <div class="idcard">
            <div><div class="k">Grain</div><div class="v">${r.grain.map((g) => GRAIN[g]).join(' à ')}</div></div>
            <div><div class="k">Densité</div><div class="v">${range(r.densite)}</div>${gauge(r.densite, 4)}</div>
            <div><div class="k">Dureté (Mohs)</div><div class="v">${range(r.durete)}</div>${gauge(r.durete, 10)}</div>
            <div><div class="k">Acide (HCl)</div><div class="v">${HCL[r.hcl]}</div></div>
            <div><div class="k">Magnétisme</div><div class="v">${MAGN[r.magn]}</div></div>
            <div><div class="k">Raye le verre</div><div class="v">${r.durete[0] >= 6 ? 'Oui' : r.durete[1] >= 5.5 ? 'Parfois / à peine' : 'Non'}</div></div>
          </div>
          <div class="links no-print">
            ${starBtn(r.id, 'btn').replace('>★<', '>★ Ma collection<')}
            <button class="btn" onclick="window.print()">🖨️ Imprimer la fiche</button>
            <a class="btn" href="#/identifier?mode=cle">🗝️ Clé de détermination</a>
          </div>
        </div>
        <div class="media">
          ${p ? `<figure class="photo"><img src="${esc(bigSrc)}" alt="Photo de ${esc(r.nom)}" referrerpolicy="no-referrer" data-fallback="${esc(p.src)}"><figcaption>${credit}</figcaption></figure>` : ''}
          ${illustration(r, !p)}
        </div>
      </section>

      <div class="fiche-body">
        <div>
          <section class="card block"><h2>📖 Description</h2>
            <p>${esc(r.description)}</p>
            <p><strong>Texture :</strong> ${esc(r.texture)}</p>
            <p><strong>Couleur :</strong> ${esc(r.couleur)}</p>
          </section>

          <section class="card block"><h2>⚗️ Composition minéralogique</h2>
            <div class="table-wrap"><table><thead><tr><th>Minéral</th><th>Proportion</th></tr></thead>
            <tbody>${r.mineraux.map((m) => `<tr><td>${esc(m[0])}</td><td>${esc(m[1])}</td></tr>`).join('')}</tbody></table></div>
            <p class="small muted" style="margin-top:.6rem">Aide pour reconnaître les minéraux : <a href="#/mineraux">tableau des minéraux</a>.</p>
          </section>

          <section class="card block"><h2>🔬 Au microscope (lames minces)</h2>
            <p class="small muted">Une lame mince est une tranche de roche de 30 µm observée au microscope polarisant : en lumière polarisée non analysée (LPNA, « PPL ») puis analysée (LPA, « XPL »), où les minéraux prennent leurs couleurs d’interférence.</p>
            <div id="micro"></div>
          </section>

          <section class="card block"><h2>🧪 Tests et identification</h2>
            <p class="small muted">Cochez au fur et à mesure de vos vérifications (non enregistré).</p>
            <ul class="checklist">${r.tests.map((t, k) => `<li><input type="checkbox" id="t${k}"><label for="t${k}">${esc(t)}</label></li>`).join('')}</ul>
            <p class="small" style="margin-top:.8rem">Comment faire ces tests ? → <a href="#/tests">Guide des tests</a></p>
          </section>

          <section class="card block"><h2>⚠️ Ne pas confondre avec</h2>
            ${r.confusions.map(([cid, txt]) => BY_ID[cid] ? `<a class="confusion" href="#/roche/${cid}">${swatch(BY_ID[cid])}<div><strong>${esc(BY_ID[cid].nom)}</strong><span>${esc(txt)}</span></div></a>` : '').join('')}
          </section>

          <section class="card block"><h2>🌋 Formation</h2>
            <p>${esc(r.formation)}</p>
            <p><strong>Contexte géologique :</strong> ${esc(r.contexte)}</p>
          </section>

          ${gisementsBlock(r)}
        </div>

        <aside>
          <section class="card block"><h2>📍 Où l’observer</h2>
            <div class="minimap" id="minimap"></div>
            <ul class="lieux">${r.lieux.map((l) => `<li><span class="dot" style="color:${f.color};margin-top:.5em"></span><a href="${osmUrl(l[2], l[3])}" target="_blank" rel="noopener">${esc(l[0])} <span class="muted">— ${esc(l[1])}</span></a></li>`).join('')}</ul>
            <p class="small muted" style="margin-top:.8rem">Respectez la réglementation : prélèvements interdits dans les réserves naturelles géologiques.</p>
          </section>
          <section class="card block"><h2>🛠️ Usages</h2><p>${esc(r.usages)}</p></section>
          <section class="card block callout"><h2>💡 Le saviez-vous ?</h2><p style="margin:0">${esc(r.anecdote)}</p></section>
          <section class="card block"><h2>🔗 Pour aller plus loin</h2>
            <div class="links">
              <a class="btn" href="${wikiUrl('fr', r.wiki[0])}" target="_blank" rel="noopener">Wikipédia (FR)</a>
              <a class="btn" href="${wikiUrl('en', r.wiki[1])}" target="_blank" rel="noopener">Wikipedia (EN)</a>
              <a class="btn" href="https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(r.wiki[1] + ' rock')}&title=Special:MediaSearch&type=image" target="_blank" rel="noopener">Plus de photos</a>
            </div>
          </section>
        </aside>
      </div>

      <nav class="fiche-nav">
        <a class="btn" href="#/roche/${prev.id}">← ${esc(prev.nom)}</a>
        <a class="btn" href="#/roche/${next.id}">${esc(next.nom)} →</a>
      </nav>`;

    const bigImg = $('.media .photo img');
    if (bigImg) bigImg.addEventListener('error', () => {
      if (bigImg.src !== bigImg.dataset.fallback) bigImg.src = bigImg.dataset.fallback;
      else bigImg.closest('figure').remove();
    });
    Micro.render(r, $('#micro'));
    // Mini-carte
    const mm = makeMap($('#minimap'));
    if (mm) {
      const pts = r.lieux.map((l) => [l[2], l[3]]);
      r.lieux.forEach((l) => marker(mm, l[2], l[3], f.hex, `<strong>${esc(l[0])}</strong><br>${esc(l[1])}`));
      if (pts.length === 1) mm.setView(pts[0], 6); else mm.fitBounds(pts, { padding: [30, 30], maxZoom: 7 });
    }
    // Photo pas encore en cache : on la charge puis on rafraîchit la fiche
    if (!p && Photos.enabled) {
      Photos.prefetch().then(() => {
        if (currentRoute === 'roche/' + id) {
          if (Photos.get(r)) render(); else { const m = $('#photoMissing'); if (m) m.textContent = 'Photo indisponible (hors ligne ?).'; }
        }
      });
    }
  }

  /* ---------- Identification ---------- */
  const QUESTIONS = [
    { id: 'aspect', titre: 'Aspect général', help: 'Sur une cassure fraîche.', opts: [
      ['cristallin', 'Cristaux imbriqués'], ['detritique', 'Grains / fragments cimentés'], ['fin', 'Pâte fine homogène'], ['vitreux', 'Vitreux / cireux'],
      ['folie', 'Feuilleté / folié'], ['rubane', 'Rubané'], ['poreux', 'Poreux / bulleux'], ['tendre', 'Tendre / friable'], ['organique', 'Noir charbonneux']] },
    { id: 'grain', titre: 'Taille des grains', help: 'Invisible < 0,06 mm · fin < 1 mm · moyen 1–5 mm · grossier > 5 mm.', opts: [
      ['invisible', 'Invisible'], ['fin', 'Fin (loupe)'], ['moyen', 'Moyen'], ['grossier', 'Grossier']] },
    { id: 'teinte', titre: 'Teinte dominante', help: 'Sur cassure fraîche.', opts: [
      ['claire', 'Claire'], ['moyenne', 'Grise moyenne'], ['sombre', 'Sombre / noire'], ['coloree', 'Nettement colorée (rouge, vert, bleu…)']] },
    { id: 'hcl', titre: 'Réaction à l’acide (HCl 10 %)', help: 'Voir le guide des tests.', opts: [
      ['forte', 'Vive effervescence'], ['faible', 'Faible / sur poudre'], ['nulle', 'Aucune']] },
    { id: 'durete', titre: 'Dureté', help: 'Testez les grains principaux.', opts: [
      ['ongle', 'Se raye à l’ongle'], ['couteau', 'Se raye au couteau, pas à l’ongle'], ['verre', 'Raye le verre']] },
    { id: 'densite', titre: 'Densité (soupesée ou mesurée)', help: 'Comparez avec un galet de granite de même taille.', opts: [
      ['flotte', 'Flotte (< 1)'], ['legere', 'Légère (1 – 2,4)'], ['normale', 'Normale (2,4 – 2,9)'], ['lourde', 'Lourde (> 2,9)']] },
    { id: 'magn', titre: 'Attire un aimant ?', help: 'Aimant suspendu à un fil.', opts: [['oui', 'Oui'], ['non', 'Non']] },
    { id: 'struct', titre: 'Structure visible', help: 'Ce qui se voit à l’échelle de l’échantillon ou de l’affleurement.', opts: [
      ['litage', 'Couches / litage'], ['foliation', 'Foliation'], ['bandes', 'Bandes'], ['vacuoles', 'Bulles'], ['fossiles', 'Fossiles'],
      ['fragments', 'Fragments / galets'], ['porphyrique', 'Gros cristaux isolés'], ['prismes', 'Prismes / dalles'], ['massive', 'Aucune (massive)']] }
  ];
  function overlap(a, b) { return Math.max(0, Math.min(a[1], b[1]) - Math.max(a[0], b[0])); }
  function scoreRock(r, ans) {
    let sum = 0, n = 0; const bad = [];
    const add = (v, label) => { sum += v; n++; if (v < 0.5) bad.push(label); };
    if (ans.aspect) add(r.aspect.includes(ans.aspect) ? 1 : 0, 'aspect');
    if (ans.grain) add(r.grain.includes(ans.grain) ? 1 : 0, 'grain');
    if (ans.teinte) add(r.teinte.includes(ans.teinte) ? 1 : 0, 'teinte');
    if (ans.hcl) add(r.hcl === ans.hcl ? 1 : (r.hcl === 'faible' || ans.hcl === 'faible') ? 0.3 : 0, 'acide');
    if (ans.durete) {
      const cls = { ongle: [0, 2.5], couteau: [2.5, 5.5], verre: [5.5, 10] }[ans.durete];
      const d = [r.durete[0], r.durete[1] + 0.01];
      add(overlap(d, cls) > 0 ? 1 : (Math.abs(d[0] - cls[1]) <= 0.5 || Math.abs(d[1] - cls[0]) <= 0.5) ? 0.4 : 0, 'dureté');
    }
    if (ans.densite) {
      const cls = { flotte: [0, 1], legere: [1, 2.4], normale: [2.4, 2.9], lourde: [2.9, 5] }[ans.densite];
      const d = [r.densite[0], r.densite[1] + 0.01];
      add(overlap(d, cls) > 0 ? 1 : (Math.abs(d[0] - cls[1]) <= 0.1 || Math.abs(d[1] - cls[0]) <= 0.1) ? 0.5 : 0, 'densité');
    }
    if (ans.magn) add(ans.magn === 'oui' ? [0, 0.7, 1][r.magn] : [1, 0.6, 0][r.magn], 'magnétisme');
    if (ans.struct) add(r.struct.includes(ans.struct) ? 1 : 0, 'structure');
    return { s: n ? sum / n : 0, n, bad };
  }
  function viewIdentifier(q) {
    const mode = q.mode === 'cle' ? 'cle' : 'assistant';
    app.innerHTML = `
      <h1>Identifier une roche</h1>
      <div class="tabs" role="tablist">
        <button role="tab" aria-selected="${mode === 'assistant'}" data-mode="assistant">🔎 Assistant multicritère</button>
        <button role="tab" aria-selected="${mode === 'cle'}" data-mode="cle">🗝️ Clé de détermination</button>
      </div>
      <div id="identBody"></div>`;
    $('.tabs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-mode]');
      if (b) location.hash = '#/identifier' + (b.dataset.mode === 'cle' ? '?mode=cle' : '');
    });
    if (mode === 'cle') return renderKey($('#identBody'), q);
    const ans = store.get('gr-ident', {});
    $('#identBody').innerHTML = `
      <p class="muted">Renseignez ce que vous observez, laissez vide ce que vous ignorez. Les roches compatibles sont classées en direct. <a href="#/tests">Comment faire les tests ?</a></p>
      <div class="ident">
        <div id="qs">${QUESTIONS.map((qq) => `
          <div class="card q" data-q="${qq.id}">
            <h3>${qq.titre}</h3><div class="help">${qq.help}</div>
            <div class="chips">${qq.opts.map(([v, l]) => `<button class="chip" data-v="${v}" aria-pressed="${ans[qq.id] === v}">${l}</button>`).join('')}</div>
          </div>`).join('')}
          <button class="btn" id="reset">↺ Tout effacer</button>
        </div>
        <div class="card pad results"><h2 style="font-size:1.2rem">Roches compatibles</h2><div id="res"></div></div>
      </div>`;
    function update() {
      const scored = ROCHES.map((r) => Object.assign({ r }, scoreRock(r, ans)));
      const n = scored[0] ? scored[0].n : 0;
      if (!n) { $('#res').innerHTML = '<p class="muted">Commencez par choisir au moins un critère.</p>'; return; }
      scored.sort((a, b) => b.s - a.s || a.r.nom.localeCompare(b.r.nom, 'fr'));
      const top = scored.filter((x) => x.s >= 0.5).slice(0, 12);
      $('#res').innerHTML = (top.length ? top : scored.slice(0, 5)).map((x) => `
        <a class="result" href="#/roche/${x.r.id}">${swatch(x.r, 56, 42)}
          <div><strong>${esc(x.r.nom)}</strong><div class="why">${x.bad.length ? 'Écart : ' + x.bad.join(', ') : 'Correspond à tous vos critères'}</div>
          <div class="bar"><i style="width:${Math.round(x.s * 100)}%;background:${x.s > 0.85 ? 'var(--ok)' : x.s > 0.65 ? 'var(--warn)' : 'var(--bad)'}"></i></div></div>
          <span class="score">${Math.round(x.s * 100)} %</span></a>`).join('') +
        `<p class="small muted" style="margin-top:.8rem">${n} critère${n > 1 ? 's' : ''} renseigné${n > 1 ? 's' : ''}. Confirmez toujours avec les tests de la fiche.</p>`;
    }
    $('#qs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-v]');
      if (!b) return;
      const qid = b.closest('[data-q]').dataset.q;
      ans[qid] = ans[qid] === b.dataset.v ? undefined : b.dataset.v;
      $$('[data-v]', b.parentNode).forEach((x) => x.setAttribute('aria-pressed', x.dataset.v === ans[qid]));
      store.set('gr-ident', ans); update();
    });
    $('#reset').addEventListener('click', () => { Object.keys(ans).forEach((k) => delete ans[k]); store.set('gr-ident', {}); $$('#qs [data-v]').forEach((x) => x.setAttribute('aria-pressed', false)); update(); });
    update();
  }
  function renderKey(el, q) {
    const path = (q.p || '').split('.').filter(Boolean).map(Number);
    let node = window.CLE.depart, crumbs = [], target = null;
    for (const idx of path) {
      const a = node.r[idx];
      if (!a) break;
      crumbs.push(a[0]);
      const [type, id] = a[1].split(':');
      if (type === 'k') node = window.CLE[id]; else { target = id; break; }
    }
    const go = (p) => '#/identifier?mode=cle' + (p.length ? '&p=' + p.join('.') : '');
    const back = path.length ? `<a class="btn" href="${go(path.slice(0, -1))}">← Retour</a>` : '';
    const crumbHtml = crumbs.length ? `<div class="key-path">${crumbs.map((c) => `<span>${esc(c)}</span>`).join('')}</div>` : '';
    if (target) {
      const r = BY_ID[target];
      el.innerHTML = `<div class="card pad key-box">${crumbHtml}
        <div class="kicker">Résultat probable</div>
        <div class="key-result">
          <div class="sw" data-photo="${r.id}">${tex(r, 240, 160)}</div>
          <div><h2>${esc(r.nom)}</h2><p>${esc(r.resume)}</p>
            <h3 style="font-family:var(--sans);font-size:1rem">Vérifiez avec ces tests :</h3>
            <ul>${r.tests.slice(0, 3).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
            <div class="links"><a class="btn primary" href="#/roche/${r.id}">Voir la fiche complète</a>${back}<a class="btn ghost" href="${go([])}">↺ Recommencer</a></div>
          </div></div>
          ${r.confusions.length ? `<p class="small muted" style="margin-top:1rem">Hésitation possible avec : ${r.confusions.map((c) => rockLink(c[0])).join(', ')}.</p>` : ''}
        </div>`;
      Photos.apply(el);
      return;
    }
    el.innerHTML = `<div class="card pad key-box">${crumbHtml}
      <div class="kicker">Question ${path.length + 1}</div>
      <div class="key-q">${esc(node.q)}</div>
      ${node.aide ? `<p class="small muted">${esc(node.aide)}</p>` : ''}
      <div class="answers">${node.r.map((a, i) => `<button data-i="${i}">${esc(a[0])}</button>`).join('')}</div>
      <div class="links" style="margin-top:1rem">${back}${path.length ? `<a class="btn ghost" href="${go([])}">↺ Recommencer</a>` : ''}</div>
    </div>`;
    $('.answers', el).addEventListener('click', (e) => {
      const b = e.target.closest('[data-i]');
      if (b) location.hash = go(path.concat(+b.dataset.i));
    });
  }

  /* ---------- Tests ---------- */
  function viewTests() {
    const mohsColors = ['#c9c2b7', '#b9b0a4', '#a99c8f', '#9a897a', '#8a7765', '#7b6450', '#6b523c', '#5b4028', '#4c2e15', '#3c1c02'];
    app.innerHTML = `
      <h1>Tests d’identification</h1>
      <p class="muted" style="max-width:70ch">Une identification fiable croise plusieurs indices : observation, dureté, réaction à l’acide, densité et contexte de terrain. Voici comment réaliser chaque test avec un matériel simple.</p>
      <div class="card pad" style="margin:1.2rem 0">
        <h2 style="font-size:1.2rem">🎒 Le kit du géologue amateur</h2>
        <ul class="kit">
          <li>Loupe ×10</li><li>Marteau de géologue + lunettes de protection</li><li>Flacon d’HCl dilué à 10 % (compte-gouttes)</li>
          <li>Couteau en acier ou clou</li><li>Plaque de verre et pièce de cuivre</li><li>Plaque de porcelaine non émaillée</li>
          <li>Petit aimant néodyme</li><li>Balance de cuisine précise</li><li>Carnet, crayon, sachets, marqueur</li><li>GPS / téléphone et carte géologique</li>
        </ul>
      </div>
      <div class="tests-grid">
        ${window.TESTS.map((t) => `
          <section class="card pad test" id="test-${t.id}">
            <h2><span>${t.icone}</span> ${esc(t.titre)}</h2>
            <div class="mat"><strong>Matériel :</strong> ${esc(t.materiel)}</div>
            <p>${esc(t.principe)}</p>
            ${t.id === 'durete' ? `<div class="mohs" aria-hidden="true">${mohsColors.map((c, i) => `<div style="background:${c}">${i + 1}</div>`).join('')}</div>` : ''}
            <ol>${t.etapes.map((e) => `<li>${esc(e)}</li>`).join('')}</ol>
            ${t.lecture.length ? `<div class="table-wrap"><table><tbody>${t.lecture.map((l) => `<tr><th scope="row" style="text-transform:none;letter-spacing:0;color:var(--ink);font-size:.88rem">${esc(l[0])}</th><td>${esc(l[1])}</td></tr>`).join('')}</tbody></table></div>` : ''}
            ${t.id === 'densite' ? `
              <form class="calc" id="calc" onsubmit="return false">
                <label>Masse dans l’air M (g)<input type="number" id="cM" min="0" step="0.1" inputmode="decimal" placeholder="ex. 132,5"></label>
                <label>Masse d’eau déplacée m (g)<input type="number" id="cm" min="0" step="0.1" inputmode="decimal" placeholder="ex. 49,8"></label>
                <output id="cOut">Entrez les deux mesures.</output>
              </form>` : ''}
          </section>`).join('')}
      </div>`;
    const cM = $('#cM'), cm = $('#cm'), out = $('#cOut');
    const calc = () => {
      const M = parseFloat(cM.value), m = parseFloat(cm.value);
      if (!(M > 0 && m > 0)) { out.textContent = 'Entrez les deux mesures.'; return; }
      const d = M / m;
      const cands = ROCHES.filter((r) => d >= r.densite[0] - 0.05 && d <= r.densite[1] + 0.05).sort((a, b) => Math.abs((a.densite[0] + a.densite[1]) / 2 - d) - Math.abs((b.densite[0] + b.densite[1]) / 2 - d)).slice(0, 8);
      out.innerHTML = `Densité : <strong>${num(d.toFixed(2))}</strong><br><span class="small">Compatible avec : ${cands.length ? cands.map((r) => rockLink(r.id)).join(', ') : 'aucune roche du guide'}</span>`;
    };
    cM.addEventListener('input', calc); cm.addEventListener('input', calc);
  }

  /* ---------- Minéraux ---------- */
  function viewMineraux() {
    app.innerHTML = `
      <h1>Minéraux des roches</h1>
      <p class="muted" style="max-width:70ch">Les roches sont des assemblages de minéraux. Savoir reconnaître la vingtaine de minéraux les plus courants permet d’identifier la plupart des roches.</p>
      <div class="card filters"><input type="search" id="mq" placeholder="Filtrer (ex. vert, 7, clivage, aimant…)" aria-label="Filtrer les minéraux"></div>
      <div class="card table-wrap"><table>
        <thead><tr><th>Minéral</th><th>Couleur</th><th>Dureté</th><th>Éclat</th><th>Clivage / cassure</th><th>Indice clé</th><th>Présent dans</th></tr></thead>
        <tbody id="mt"></tbody></table></div>`;
    const rows = window.MINERAUX.map((m) => {
      const key = norm(m[0].split(' ')[0]);
      const rocks = ROCHES.filter((r) => r.mineraux.some((x) => norm(x[0]).includes(key))).slice(0, 6);
      return { m, rocks, s: norm(m.join(' ')) };
    });
    const draw = () => {
      const w = norm($('#mq').value).split(/\s+/).filter(Boolean);
      $('#mt').innerHTML = rows.filter((x) => w.every((k) => x.s.includes(k))).map(({ m, rocks }) => `
        <tr><td><strong>${esc(m[0])}</strong></td><td>${esc(m[1])}</td><td>${esc(m[2])}</td><td>${esc(m[3])}</td><td>${esc(m[4])}</td><td>${esc(m[5])}</td>
        <td class="small">${rocks.map((r) => rockLink(r.id)).join(', ') || '—'}</td></tr>`).join('');
    };
    $('#mq').addEventListener('input', draw); draw();
  }

  /* ---------- Classification ---------- */
  function ptSVG() {
    const X = (t) => 70 + t * 0.54, Y = (p) => 30 + p * 113.3;
    const facies = [
      ['Diagenèse', 0, 200, 0, 0.5, '#cfc4b3', ['argilite']],
      ['Cornéennes (contact)', 350, 950, 0, 0.2, '#e3a87f', ['corneenne', 'skarn']],
      ['Schistes verts', 300, 500, 0.2, 0.9, '#8fbf8f', ['ardoise', 'phyllade', 'serpentinite']],
      ['Amphibolite', 480, 700, 0.2, 1.2, '#6fa08a', ['micaschiste', 'gneiss', 'amphibolite', 'marbre']],
      ['Granulite', 700, 1000, 0.2, 1.4, '#c98f74', ['granulite', 'migmatite']],
      ['Schistes bleus', 150, 420, 0.8, 1.45, '#7f95c9', ['schistebleu']],
      ['Éclogite', 450, 1000, 1.45, 2.8, '#b55d6a', ['eclogite']]
    ];
    let s = `<svg viewBox="0 0 680 418" role="img" aria-labelledby="ptT"><title id="ptT">Faciès métamorphiques en fonction de la pression et de la température</title>`;
    s += `<polygon points="${X(0)},${Y(0)} ${X(0)},${Y(3)} ${X(495)},${Y(3)}" fill="var(--ink-3)" opacity=".15"/>`;
    s += `<text x="${X(40)}" y="${Y(2.6)}" font-size="11" fill="var(--ink-3)">Domaine non atteint</text><text x="${X(40)}" y="${Y(2.75)}" font-size="11" fill="var(--ink-3)">sur Terre (trop froid)</text>`;
    facies.forEach(([n, t1, t2, p1, p2, c, rocks]) => {
      s += `<rect x="${X(t1)}" y="${Y(p1)}" width="${X(t2) - X(t1)}" height="${Y(p2) - Y(p1)}" fill="${c}" opacity=".55" rx="6"/>`;
      const cx = (X(t1) + X(t2)) / 2, cy = Y(p1) + (p2 - p1 > 0.3 ? 18 : 12);
      s += `<text x="${cx}" y="${cy}" font-size="12" font-weight="700" fill="var(--ink)" text-anchor="middle">${n}</text>`;
      if (p2 - p1 > 0.3) rocks.forEach((id, i) => {
        s += `<a href="#/roche/${id}"><text x="${cx}" y="${cy + 16 + i * 14}" font-size="11.5" fill="var(--accent)" text-anchor="middle" text-decoration="underline">${esc(BY_ID[id].nom)}</text></a>`;
      });
      else s += `<a href="#/roche/${rocks[0]}"><text x="${cx}" y="${cy + 12}" font-size="11" fill="var(--accent)" text-anchor="middle" text-decoration="underline">${rocks.map((id) => BY_ID[id].nom).join(', ')}</text></a>`;
    });
    s += `<path d="M ${X(790)} ${Y(0.03)} Q ${X(695)} ${Y(0.3)} ${X(678)} ${Y(0.8)} L ${X(668)} ${Y(1.6)} L ${X(676)} ${Y(2.9)}" stroke="var(--bad)" stroke-width="2" stroke-dasharray="6 4" fill="none"/>`;
    s += `<text x="${X(684)}" y="${Y(2.92)}" font-size="10.5" fill="var(--bad)">← début de fusion (migmatites)</text>`;
    s += `<rect x="${X(0)}" y="${Y(0)}" width="${X(1000) - X(0)}" height="${Y(3) - Y(0)}" fill="none" stroke="var(--ink-3)"/>`;
    for (let t = 0; t <= 1000; t += 200) s += `<text x="${X(t)}" y="${Y(3) + 16}" font-size="11" fill="var(--ink-2)" text-anchor="middle">${t}</text>`;
    for (let p = 0; p <= 3; p += 0.5) s += `<text x="${X(0) - 8}" y="${Y(p) + 4}" font-size="11" fill="var(--ink-2)" text-anchor="end">${num(p)}</text><text x="${X(1000) + 6}" y="${Y(p) + 4}" font-size="10" fill="var(--ink-3)">${Math.round(p * 33)} km</text>`;
    s += `<text x="${X(500)}" y="${Y(3) + 34}" font-size="12" fill="var(--ink-2)" text-anchor="middle">Température (°C)</text>`;
    s += `<text x="16" y="${Y(1.5)}" font-size="12" fill="var(--ink-2)" text-anchor="middle" transform="rotate(-90 16 ${Y(1.5)})">Pression (GPa)</text>`;
    return s + '</svg>';
  }
  function viewClassification() {
    const L = (ids) => ids.map(rockLink).join(' ');
    app.innerHTML = `
      <h1>Classification des roches</h1>
      <p class="muted" style="max-width:72ch">Cliquez sur un nom pour ouvrir sa fiche. Ces tableaux sont simplifiés : la classification officielle des roches magmatiques (diagramme QAPF de Streckeisen, diagramme TAS) repose sur des proportions minérales et des analyses chimiques.</p>

      <div class="section-title"><h2><span class="dot" style="color:var(--mag)"></span> Roches magmatiques</h2></div>
      <div class="card pad">
        <p>Deux critères : la <strong>vitesse de refroidissement</strong> (taille des cristaux) et la <strong>composition chimique</strong> (teneur en silice SiO₂, qui va de pair avec la couleur).</p>
        <div class="table-wrap"><table class="classif">
          <thead><tr><th></th><th>Felsique / acide<br>&gt; 63 % SiO₂</th><th>Intermédiaire<br>52 – 63 %</th><th>Mafique / basique<br>45 – 52 %</th><th>Ultramafique<br>&lt; 45 %</th></tr></thead>
          <tbody>
            <tr><th scope="row">Plutonique<br><span class="small muted">grenue, refroidissement lent</span></th><td>${L(['granite', 'granodiorite', 'pegmatite'])}</td><td>${L(['diorite', 'syenite'])}</td><td>${L(['gabbro'])}</td><td>${L(['peridotite'])}</td></tr>
            <tr><th scope="row">Hypovolcanique<br><span class="small muted">filons, grain intermédiaire</span></th><td class="muted small">microgranite</td><td class="muted small">microdiorite</td><td>${L(['dolerite'])}</td><td>${L(['kimberlite'])}</td></tr>
            <tr><th scope="row">Volcanique<br><span class="small muted">microlitique, refroidissement rapide</span></th><td>${L(['rhyolite', 'dacite'])}</td><td>${L(['andesite', 'trachyte', 'phonolite'])}</td><td>${L(['basalte'])}</td><td>${L(['komatiite'])}</td></tr>
            <tr><th scope="row">Vitreuse / pyroclastique</th><td>${L(['obsidienne', 'ponce', 'ignimbrite'])}</td><td>${L(['tuf'])}</td><td>${L(['scorie'])}</td><td class="muted">—</td></tr>
            <tr class="silica"><th scope="row">Teinte</th><td style="background:#efe3d6;color:#5a4636">Claire</td><td style="background:#b9aa99;color:#2c2018">Moyenne</td><td style="background:#4d4741;color:#fff">Sombre</td><td style="background:#5d6b3a;color:#fff">Verte, très dense</td></tr>
          </tbody></table></div>
                </div>
        <p class="small muted" style="margin-top:.8rem">Trachyte, phonolite et syénite appartiennent à la série alcaline (riche en Na et K) ; ils sont rangés ici avec les intermédiaires pour simplifier.</p>
      </div>

      <div class="section-title"><h2><span class="dot" style="color:var(--sed)"></span> Roches sédimentaires</h2></div>
      <div class="card pad">
        <div class="table-wrap"><table class="classif">
          <thead><tr><th>Origine</th><th>Critère</th><th>Roches</th></tr></thead>
          <tbody>
            <tr><th scope="row" rowspan="4">Détritiques<br><span class="small muted">débris de roches</span></th><td>&gt; 2 mm (rudites)</td><td>${L(['conglomerat', 'breche'])}</td></tr>
            <tr><td>0,063 – 2 mm, sables (arénites)</td><td>${L(['gres', 'arkose', 'grauwacke'])}</td></tr>
            <tr><td>4 – 63 µm, silts</td><td>${L(['loess'])}</td></tr>
            <tr><td>&lt; 4 µm, argiles (lutites)</td><td>${L(['argile', 'argilite', 'marne'])}</td></tr>
            <tr><th scope="row">Carbonatées<br><span class="small muted">biochimiques et chimiques</span></th><td>Calcite, dolomite</td><td>${L(['calcaire', 'craie', 'oolithique', 'lumachelle', 'travertin', 'dolomie'])}</td></tr>
            <tr><th scope="row">Siliceuses</th><td>Silice biogène ou chimique</td><td>${L(['silex', 'chert', 'diatomite'])}</td></tr>
            <tr><th scope="row">Évaporites</th><td>Précipitation de sels</td><td>${L(['gypse', 'halite'])}</td></tr>
            <tr><th scope="row">Organiques</th><td>Matière végétale</td><td>${L(['lignite', 'houille'])}</td></tr>
            <tr><th scope="row">Résiduelles</th><td>Altération tropicale</td><td>${L(['bauxite', 'laterite'])}</td></tr>
            <tr><th scope="row">Ferrifères</th><td>Précipitation du fer</td><td>${L(['ferrubane'])}</td></tr>
            <tr><th scope="row">Volcano-sédimentaires</th><td>Débris volcaniques</td><td>${L(['tuf', 'ignimbrite'])}</td></tr>
          </tbody></table></div>
      </div>

      <div class="section-title"><h2><span class="dot" style="color:var(--met)"></span> Roches métamorphiques</h2></div>
      <div class="card pad">
        <h3>Séries métamorphiques : une même roche à des degrés croissants</h3>
        <p class="small muted">Roche d’origine (protolithe) → transformation avec l’augmentation de la température et de la pression.</p>
        <div class="series"><span class="s">Argile</span><i>→</i>${L(['argilite'])}<i>→</i>${L(['ardoise'])}<i>→</i>${L(['phyllade'])}<i>→</i>${L(['micaschiste'])}<i>→</i>${L(['gneiss'])}<i>→</i>${L(['migmatite'])}</div>
        <div class="series"><span class="s">Basalte / gabbro</span><i>→</i><span class="s">schiste vert</span><i>→</i>${L(['amphibolite'])}<i>→</i>${L(['granulite'])}</div>
        <div class="series"><span class="s">Basalte (subduction)</span><i>→</i>${L(['schistebleu'])}<i>→</i>${L(['eclogite'])}</div>
        <div class="series">${L(['calcaire'])}<i>→</i>${L(['marbre'])}<span class="s" style="margin-left:1rem">${L(['gres'])}</span><i>→</i>${L(['quartzite'])}</div>
        <div class="series">${L(['peridotite'])}<i>→</i>${L(['serpentinite'])}<i>→</i>${L(['steatite'])}</div>
        <div class="series">${L(['granite'])}<i>→</i><span class="s">orthogneiss</span> ${L(['gneiss'])} <i>·</i> <span class="s">cisaillement</span><i>→</i>${L(['mylonite'])}</div>
        <h3 style="margin-top:1.4rem">Faciès métamorphiques</h3>
        <div class="pt">${ptSVG()}</div>
        <p class="small muted">Limites approximatives. 1 GPa ≈ 33 km de profondeur dans la croûte.</p>
      </div>`;
  }

  /* ---------- Carte ---------- */
  function viewCarte(q) {
    const on = new Set(q.famille ? [q.famille] : Object.keys(FAM));
    app.innerHTML = `
      <h1>Carte des localités</h1>
      <p class="muted">Sites remarquables où observer chaque roche. Cliquez sur un point pour ouvrir la fiche.</p>
      <div class="chips" id="mf" style="margin-bottom:1rem">${Object.entries(FAM).map(([k, f]) => `<button class="chip ${f.css}" data-f="${k}" aria-pressed="${on.has(k)}"><span class="dot" style="color:${f.color}"></span> ${f.nom}</button>`).join('')}</div>
      <div class="bigmap" id="bigmap"></div>`;
    const m = makeMap($('#bigmap'), { scrollWheelZoom: true });
    if (!m) return;
    m.setView([30, 5], 2);
    const layers = {};
    Object.keys(FAM).forEach((k) => (layers[k] = L.layerGroup()));
    ROCHES.forEach((r) => r.lieux.forEach((l) => {
      L.circleMarker([l[2], l[3]], { radius: 6, color: '#fff', weight: 1.5, fillColor: FAM[r.famille].hex, fillOpacity: 0.95 })
        .bindPopup(`<a href="#/roche/${r.id}">${esc(r.nom)}</a><br>${esc(l[0])}<br><span style="color:#888">${esc(l[1])}</span>`)
        .addTo(layers[r.famille]);
    }));
    Object.keys(layers).forEach((k) => on.has(k) && layers[k].addTo(m));
    $('#mf').addEventListener('click', (e) => {
      const b = e.target.closest('[data-f]');
      if (!b) return;
      const k = b.dataset.f;
      if (on.has(k)) { on.delete(k); m.removeLayer(layers[k]); } else { on.add(k); layers[k].addTo(m); }
      b.setAttribute('aria-pressed', on.has(k));
    });
  }

  /* ---------- Glossaire ---------- */
  function viewGlossaire() {
    app.innerHTML = `
      <h1>Glossaire</h1>
      <div class="card filters"><input type="search" id="gq" placeholder="Rechercher un terme…" aria-label="Rechercher un terme"></div>
      <div class="card pad"><dl class="gloss" id="gl"></dl></div>`;
    const draw = () => {
      const w = norm($('#gq').value);
      $('#gl').innerHTML = window.GLOSSAIRE.filter((g) => !w || norm(g.join(' ')).includes(w)).map((g) => `<dt>${esc(g[0])}</dt><dd>${esc(g[1])}</dd>`).join('') || '<p class="muted">Aucun terme.</p>';
    };
    $('#gq').addEventListener('input', draw); draw();
  }

  function view404() {
    app.innerHTML = `<div class="empty"><h1>Page introuvable</h1><p><a class="btn" href="#/">Retour à l’accueil</a></p></div>`;
  }

  /* =========================================================
   * Routeur
   * ========================================================= */
  let currentRoute = '';
  function parse() {
    const h = location.hash.replace(/^#\/?/, '');
    const [path, qs] = h.split('?');
    return { path: path || '', q: Object.fromEntries(new URLSearchParams(qs || '')) };
  }
  function render() {
    const { path, q } = parse();
    const changedPage = path !== currentRoute;
    currentRoute = path;
    clearMaps();
    const [seg, arg] = path.split('/');
    const titles = { '': '', catalogue: 'Catalogue', identifier: 'Identifier', tests: 'Tests', mineraux: 'Minéraux', classification: 'Classification', carte: 'Carte', glossaire: 'Glossaire' };
    switch (seg) {
      case '': viewHome(); break;
      case 'catalogue': viewCatalogue(q); break;
      case 'roche': viewRoche(arg); break;
      case 'identifier': viewIdentifier(q); break;
      case 'tests': viewTests(); break;
      case 'mineraux': viewMineraux(); break;
      case 'classification': viewClassification(); break;
      case 'carte': viewCarte(q); break;
      case 'glossaire': viewGlossaire(); break;
      default: view404();
    }
    const t = seg === 'roche' && BY_ID[arg] ? BY_ID[arg].nom : titles[seg];
    document.title = (t ? t + ' — ' : '') + 'Guide des roches';
    $$('#nav a').forEach((a) => a.classList.toggle('active', a.dataset.r === seg || (seg === 'roche' && a.dataset.r === 'catalogue')));
    $('#nav').classList.remove('open');
    $('#menuBtn').setAttribute('aria-expanded', 'false');
    Photos.apply(app);
    if (changedPage) window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', render);

  /* =========================================================
   * Interface globale
   * ========================================================= */
  $('#menuBtn').addEventListener('click', () => {
    const o = $('#nav').classList.toggle('open');
    $('#menuBtn').setAttribute('aria-expanded', o);
  });
  $('#themeBtn').addEventListener('click', () => {
    const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('gr-theme', t); } catch (e) {}
  });
  const pt = $('#photosToggle');
  pt.checked = Photos.enabled;
  pt.addEventListener('change', () => {
    Photos.enabled = pt.checked;
    store.set('gr-photos-on', pt.checked);
    render();
    if (pt.checked) Photos.prefetch();
  });

  /* Application installable (PWA) */
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => { /* non disponible (iframe, navigateur privé…) */ });
  }
  let installEvt = null;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const ib = $('#installBtn');
  if (!standalone()) ib.hidden = false;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvt = e; ib.hidden = false; });
  function installHelp() {
    const ua = navigator.userAgent;
    const ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const inApp = /FBAN|FBAV|Instagram|Line\/|GitHub|Snapchat|; wv\)/.test(ua);
    const samsung = /SamsungBrowser/.test(ua);
    let steps;
    if (ios) steps = ['Ouvrez cette page dans <strong>Safari</strong> (pas dans une autre appli).', 'Touchez le bouton <strong>Partager</strong> (carré avec une flèche vers le haut).', 'Choisissez <strong>Sur l’écran d’accueil</strong>, puis <strong>Ajouter</strong>.'];
    else if (samsung) steps = ['Touchez le menu <strong>≡</strong> en bas à droite.', 'Choisissez <strong>Ajouter page à</strong> → <strong>Écran d’accueil</strong>.'];
    else steps = [
      'Si la page est ouverte dans une autre appli (barre avec une croix ✕ en haut), touchez <strong>⋮</strong> puis <strong>Ouvrir dans Chrome</strong>.',
      'Dans Chrome, touchez <strong>⋮</strong> en haut à droite.',
      'Choisissez <strong>Installer l’application</strong> (ou <strong>Ajouter à l’écran d’accueil</strong>).'];
    const d = document.createElement('div');
    d.className = 'modal';
    d.innerHTML = `<div class="card pad modal-box" role="dialog" aria-modal="true" aria-labelledby="mT">
      <h2 id="mT">Installer le guide</h2>
      ${inApp && !ios ? '<p class="small muted">Vous êtes dans le navigateur d’une autre application : l’installation n’y est pas possible.</p>' : ''}
      <ol>${steps.map((s) => `<li>${s}</li>`).join('')}</ol>
      <p class="small muted">L’icône « Roches » apparaîtra sur l’écran d’accueil ; le guide fonctionnera aussi hors ligne.</p>
      <button class="btn primary" id="mClose">J’ai compris</button></div>`;
    document.body.appendChild(d);
    const close = () => d.remove();
    d.addEventListener('click', (e) => { if (e.target === d || e.target.id === 'mClose') close(); });
  }
  ib.addEventListener('click', async () => {
    if (!installEvt) return installHelp();
    installEvt.prompt();
    try { await installEvt.userChoice; } catch (e) {}
    installEvt = null;
    if (standalone()) ib.hidden = true;
  });
  window.addEventListener('appinstalled', () => { $('#installBtn').hidden = true; });

  render();
  Photos.prefetch();
})();
