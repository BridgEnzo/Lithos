/*
 * Générateur d'illustrations SVG de textures de roches.
 * Chaque roche possède un objet `tex` :
 *   k : type de texture (grenu, porphyre, fin, verre, bulles, clastes, sable,
 *       lite, folie, rubane, coquilles, oolithes, sucre, charbon, terreux, spinifex)
 *   b : couleur de fond, c : palette, s : taille caractéristique (px)
 *   + options propres à chaque type (voir le code).
 * Le rendu est déterministe (graine = id de la roche).
 *
 * render(rock, W, H, legende) : si `legende` est fourni (voir js/data/legendes.js),
 * des pastilles numérotées sont posées sur un élément de chaque type décrit.
 * Clés de légende : 'b' (fond / pâte), 'c0'…'c5' (couleurs de la palette),
 * 'p', 'p2' (phénocristaux), 'garnet', 'veins', 'nod', 'spots', 'eyes',
 * 'cortex', 'holes', 'grains', 'lines'.
 */
(function () {
  'use strict';

  function hash(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return h >>> 0;
  }
  function rng(seed) { // mulberry32
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const f = (n) => Math.round(n * 10) / 10;
  const cap = (n, max) => Math.min(Math.floor(n), max || 1400);
  let uid = 0;

  function poly(R, cx, cy, r, n, irreg) {
    const pts = [];
    const a0 = R() * Math.PI * 2;
    for (let i = 0; i < n; i++) {
      const a = a0 + (i / n) * Math.PI * 2 + (R() - 0.5) * 0.5;
      const rr = r * (1 - irreg + R() * irreg * 2);
      pts.push(f(cx + Math.cos(a) * rr) + ',' + f(cy + Math.sin(a) * rr));
    }
    return pts.join(' ');
  }
  function wavyPts(y, W, amp, freq, phase) {
    const pts = [];
    for (let x = -10; x <= W + 10; x += 6) {
      pts.push([x, f(y + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 2.7 + phase * 1.3) * amp * 0.3)]);
    }
    return pts;
  }
  function wavyPath(R, y, W, amp, freq, phase) {
    return 'M ' + wavyPts(y, W, amp, freq, phase).map((p) => p.join(' ')).join(' L ');
  }
  function band(top, bot) {
    return 'M ' + top.map((p) => p.join(' ')).join(' L ') + ' L ' + bot.slice().reverse().map((p) => p.join(' ')).join(' L ') + ' Z';
  }

  function render(rock, W, H, legende) {
    W = W || 240; H = H || 160;
    const t = rock.tex || { k: 'fin', b: '#999', c: ['#888'], s: 1 };
    const R = rng(hash(rock.id));
    const id = 'tx' + (uid++);
    const c = t.c || ['#888'];
    const s = t.s || 4;
    let g = '';
    const defs = [];

    // Mémorise des positions d'éléments pour y poser les annotations
    const marks = {};
    const mark = (key, x, y, w) => {
      if (!legende) return;
      if (x < W * 0.06 || x > W * 0.94 || y < H * 0.08 || y > H * 0.92) return;
      (marks[key] = marks[key] || []).push([x, y, w || 1]);
    };
    // Choisit une couleur de la palette et retient son indice
    let ci = 0;
    const pc = () => { ci = Math.floor(R() * c.length); return c[ci]; };
    const markBg = (n) => { for (let i = 0; i < (n || 30); i++) mark('b', R() * W, R() * H, 0.5); };

    const bg = `<rect width="${W}" height="${H}" fill="${t.b}"/>`;

    switch (t.k) {
      case 'grenu': {
        const n = cap((W * H) / (s * s) * 1.6, 1600);
        for (let i = 0; i < n; i++) {
          const x = R() * W, y = R() * H;
          const col = pc();
          if (t.cube) {
            const w = s * (0.6 + R() * 0.6);
            g += `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(w)}" fill="${col}" transform="rotate(${f((R() - 0.5) * 30)} ${f(x)} ${f(y)})" opacity="0.92"/>`;
            mark('c' + ci, x + w / 2, y + w / 2, i / n);
          } else {
            g += `<polygon points="${poly(R, x, y, s * (0.45 + R() * 0.5), 5 + Math.floor(R() * 3), 0.35)}" fill="${col}"/>`;
            mark('c' + ci, x, y, i / n); // les derniers dessinés sont au-dessus
          }
        }
        break;
      }
      case 'porphyre': {
        markBg();
        const n = cap((W * H) / 5); const ds = Math.max(s, Math.sqrt((W * H) / n) * 0.55);
        for (let i = 0; i < n; i++) g += `<rect x="${f(R() * W)}" y="${f(R() * H)}" width="${f(ds)}" height="${f(ds)}" fill="${pc()}" opacity="0.7"/>`;
        for (let i = 0; i < 16; i++) {
          const x = R() * W, y = R() * H, w = 4 + R() * 9, h = 2 + R() * 4;
          g += `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${t.p}" transform="rotate(${f(R() * 180)} ${f(x)} ${f(y)})"/>`;
          mark('p', x, y, w);
        }
        for (let i = 0; i < 10; i++) {
          const x = R() * W, y = R() * H, l = 3 + R() * 7;
          g += `<rect x="${f(x)}" y="${f(y)}" width="${f(l)}" height="2.2" fill="${t.p2}" transform="rotate(${f(R() * 180)} ${f(x)} ${f(y)})"/>`;
          mark('p2', x, y, l);
        }
        break;
      }
      case 'fin': {
        markBg();
        const n = cap((W * H) / 4); const ds = Math.max(s, Math.sqrt((W * H) / n) * 0.5);
        for (let i = 0; i < n; i++) g += `<rect x="${f(R() * W)}" y="${f(R() * H)}" width="${f(ds)}" height="${f(ds)}" fill="${pc()}" opacity="0.6"/>`;
        if (t.lines) for (let y = 4; y < H; y += 7 + R() * 8) g += `<path d="${wavyPath(R, y, W, 0.6, 0.03, R() * 6)}" stroke="${c[0]}" stroke-width="0.8" fill="none" opacity="0.6"/>`;
        if (t.v) {
          const nv = Math.floor(t.v * 60);
          for (let i = 0; i < nv; i++) {
            const x = R() * W, y = R() * H;
            g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(1 + R() * 3)}" ry="${f(1 + R() * 2)}" fill="#0b0b0c" opacity="0.8"/>`;
            mark('holes', x, y);
          }
          for (let i = 0; i < 12; i++) {
            const x = R() * W, y = R() * H;
            g += `<polygon points="${poly(R, x, y, 2 + R() * 1.5, 6, 0.2)}" fill="${c[c.length - 1]}"/>`;
            mark('c' + (c.length - 1), x, y, 2);
          }
        }
        if (t.nod) {
          const y = H * (0.3 + R() * 0.4);
          for (let x = 10; x < W; x += 30 + R() * 30) {
            const yy = y + (R() - 0.5) * 12;
            g += `<polygon points="${poly(R, x, yy, 7 + R() * 7, 9, 0.3)}" fill="${t.nod}" stroke="#fff" stroke-width="2" stroke-opacity="0.6"/>`;
            mark('nod', x, yy, 3);
          }
        }
        if (t.spots) for (let i = 0; i < 18; i++) {
          const x = R() * W, y = R() * H;
          g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(2 + R() * 4)}" ry="${f(1.5 + R() * 2.5)}" fill="${t.spots}" opacity="0.8"/>`;
          mark('spots', x, y);
        }
        break;
      }
      case 'verre': {
        defs.push(`<linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="0.45" stop-color="${t.b}"/><stop offset="1" stop-color="${t.b}"/></linearGradient>`);
        g += `<rect width="${W}" height="${H}" fill="url(#${id}g)"/>`;
        const cx = W * (0.3 + R() * 0.4), cy = H * (0.3 + R() * 0.4);
        for (let i = 1; i < 9; i++) g += `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${i * 16}" ry="${i * 11}" fill="none" stroke="${c[1]}" stroke-width="${f(0.6 + R())}" opacity="${f(0.35 - i * 0.025)}"/>`;
        mark('lines', cx + 3 * 16 * 0.7, cy + 3 * 11 * 0.7, 2);
        g += `<path d="M ${f(W * 0.1)} ${f(H * 0.25)} Q ${f(W * 0.35)} ${f(H * 0.05)} ${f(W * 0.7)} ${f(H * 0.18)}" stroke="#fff" stroke-width="5" fill="none" opacity="0.18" stroke-linecap="round"/>`;
        mark('b', W * 0.62, H * 0.62, 1);
        if (t.cortex) {
          g = `<rect width="${W}" height="${H}" fill="${t.cortex}"/><g clip-path="url(#${id}c)">${g}</g>` +
            `<path d="M0 ${H * 0.82} Q ${W * 0.5} ${H * 0.7} ${W} ${H * 0.86}" stroke="${t.cortex}" stroke-width="10" fill="none"/>`;
          defs.push(`<clipPath id="${id}c"><polygon points="${poly(R, W / 2, H / 2, Math.min(W, H) * 0.62, 11, 0.12)}"/></clipPath>`);
          mark('cortex', W * 0.9, H * 0.12, 1); mark('cortex', W * 0.5, H * 0.86, 2);
          if (marks.b) marks.b = [[W * 0.5, H * 0.45, 1]];
        }
        return finish();
      }
      case 'bulles': {
        markBg();
        const n = cap((W * H) / (s * s) * (t.long ? 1.2 : 0.55), 650);
        for (let i = 0; i < n; i++) {
          const x = R() * W, y = R() * H;
          const rx = t.long ? s * (0.6 + R() * 1.6) : s * (0.3 + R() * 0.7);
          const ry = t.long ? rx * (0.2 + R() * 0.2) : rx * (0.7 + R() * 0.3);
          const rot = t.long ? -15 + R() * 30 : R() * 180;
          g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="${c[0]}" transform="rotate(${f(rot)} ${f(x)} ${f(y)})"/>`;
          g += `<ellipse cx="${f(x)}" cy="${f(y - ry * 0.3)}" rx="${f(rx * 0.8)}" ry="${f(ry * 0.5)}" fill="none" stroke="${c[1] || '#fff'}" stroke-width="0.6" opacity="0.6" transform="rotate(${f(rot)} ${f(x)} ${f(y)})"/>`;
          mark('holes', x, y, rx);
        }
        break;
      }
      case 'clastes': {
        markBg();
        const nd = cap((W * H) / 6, 900);
        for (let i = 0; i < nd; i++) g += `<rect x="${f(R() * W)}" y="${f(R() * H)}" width="1" height="1" fill="#000" opacity="${f(R() * 0.18)}"/>`;
        const n = cap((W * H) / (s * s * 2.4), 500);
        for (let i = 0; i < n; i++) {
          const x = R() * W, y = R() * H, r = s * (0.35 + R() * 0.7), col = pc();
          if (t.ang) g += `<polygon points="${poly(R, x, y, r, 4 + Math.floor(R() * 3), 0.45)}" fill="${col}" stroke="#000" stroke-opacity="0.18"/>`;
          else if (t.flat) g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r * 1.6)}" ry="${f(r * 0.28)}" fill="${col}" transform="rotate(${f((R() - 0.5) * 12)} ${f(x)} ${f(y)})" opacity="0.9"/>`;
          else {
            const rot = R() * 180;
            g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(r)}" ry="${f(r * (0.6 + R() * 0.35))}" fill="${col}" stroke="#000" stroke-opacity="0.15" transform="rotate(${f(rot)} ${f(x)} ${f(y)})"/>`;
            g += `<ellipse cx="${f(x - r * 0.25)}" cy="${f(y - r * 0.25)}" rx="${f(r * 0.4)}" ry="${f(r * 0.22)}" fill="#fff" opacity="0.15" transform="rotate(${f(rot)} ${f(x)} ${f(y)})"/>`;
          }
          mark('c' + ci, x, y, r + i / n * 10);
        }
        break;
      }
      case 'sable': {
        markBg(10);
        const n = cap((W * H) / (s * s) * 0.9, 1800);
        for (let i = 0; i < n; i++) {
          const x = R() * W, y = R() * H;
          g += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(s * (0.45 + R() * 0.35))}" fill="${pc()}"/>`;
          mark('c' + ci, x, y, i / n);
        }
        if (t.lit) for (let i = 0; i < 9; i++) { const y = R() * H; g += `<path d="M -5 ${f(y)} L ${W + 5} ${f(y - 30 - R() * 20)}" stroke="#000" stroke-opacity="0.08" stroke-width="1.5"/>`; mark('lines', W * 0.5, y - 20, 1); }
        break;
      }
      case 'lite': {
        let y = -5;
        const amp = (t.w || 1) * 2.2, freq = 0.02 + R() * 0.02;
        let ph = R() * 6;
        const bands = [];
        while (y < H + 10) {
          const h = s * (0.6 + R() * 2);
          const col = pc();
          bands.push([y, h, col]);
          mark('c' + ci, W * (0.2 + R() * 0.6), y + h / 2 + 0.3, h);
          y += h;
        }
        markBg(1);
        for (const [yy, h, col] of bands) {
          g += `<path d="${band(wavyPts(yy, W, amp, freq, ph), wavyPts(yy + h + 0.6, W, amp, freq, ph))}" fill="${col}"/>`;
          ph += (R() - 0.5) * 0.4;
        }
        const ns = cap((W * H) / 10, 900);
        for (let i = 0; i < ns; i++) g += `<rect x="${f(R() * W)}" y="${f(R() * H)}" width="1" height="1" fill="#000" opacity="${f(R() * 0.15)}"/>`;
        if (t.holes) for (let i = 0; i < 26; i++) { const x = R() * W, yy = R() * H; g += `<ellipse cx="${f(x)}" cy="${f(yy)}" rx="${f(2 + R() * 6)}" ry="${f(0.8 + R() * 1.4)}" fill="#6b5a3f" opacity="0.55"/>`; mark('holes', x, yy); }
        if (t.eyes) for (let i = 0; i < 9; i++) { const x = R() * W, yy = R() * H, l = 6 + R() * 8; g += `<path d="M ${f(x - l)} ${f(yy + 2)} Q ${f(x)} ${f(yy - 4)} ${f(x + l)} ${f(yy - 2)} Q ${f(x)} ${f(yy + 4)} ${f(x - l)} ${f(yy + 2)} Z" fill="${t.eyes}"/>`; mark('eyes', x, yy, l); }
        break;
      }
      case 'folie': {
        markBg(6);
        const step = t.flat ? 2.2 : 2.8;
        const ph = R() * 6;
        for (let y = -4; y < H + 4; y += step + R() * step) {
          g += `<path d="${wavyPath(R, y, W, t.flat ? 0.4 : 2.2, 0.035, ph + y * 0.02)}" stroke="${pc()}" stroke-width="${f(0.5 + R() * s * 0.7)}" fill="none" opacity="${f(0.5 + R() * 0.5)}"/>`;
          mark('c' + ci, W * (0.15 + R() * 0.7), y, 1);
          mark('lines', W * (0.15 + R() * 0.7), y, 1);
        }
        if (t.grains) for (let i = 0; i < 140; i++) { const x = R() * W, y = R() * H; g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(1.5 + R() * 2.5)}" ry="0.9" fill="${c[2]}" opacity="0.85"/>`; mark('grains', x, y); }
        if (t.sheen) {
          defs.push(`<linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0.6"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`);
          g += `<rect width="${W}" height="${H}" fill="url(#${id}s)"/>`;
        }
        if (t.garnet) for (let i = 0; i < 12; i++) {
          const x = R() * W, y = R() * H, r = 2.2 + R() * 3;
          g += `<polygon points="${poly(R, x, y, r, 6, 0.1)}" fill="${t.garnet}"/><circle cx="${f(x - r * 0.3)}" cy="${f(y - r * 0.3)}" r="${f(r * 0.3)}" fill="#fff" opacity="0.35"/>`;
          mark('garnet', x, y, r);
        }
        break;
      }
      case 'rubane': {
        const ph = R() * 6;
        let y = -8, i = 0;
        while (y < H + 10) {
          const h = s * (0.5 + R() * 1.1);
          const k = i % 2 === 0 ? 0 : 1;
          const amp = t.chaos ? 6 + R() * 7 : 3;
          const freq = t.chaos ? 0.04 + R() * 0.03 : 0.03;
          g += `<path d="${band(wavyPts(y, W, amp, freq, ph + i * (t.chaos ? 0.9 : 0.15)), wavyPts(y + h, W, amp, freq, ph + (i + 1) * (t.chaos ? 0.9 : 0.15)))}" fill="${c[k]}"/>`;
          mark('c' + k, W * (0.2 + R() * 0.6), y + h * 0.45, h);
          y += h * 0.85; i++;
        }
        for (let k = 0; k < 260; k++) {
          const x = R() * W, yy = R() * H;
          g += `<polygon points="${poly(R, x, yy, 1.2 + R() * 1.8, 5, 0.3)}" fill="${pc()}" opacity="0.75"/>`;
          if (ci > 1) mark('c' + ci, x, yy, 1);
        }
        break;
      }
      case 'coquilles': {
        markBg();
        const nd = cap((W * H) / 5, 1000);
        for (let i = 0; i < nd; i++) g += `<rect x="${f(R() * W)}" y="${f(R() * H)}" width="1.4" height="1.4" fill="${pc()}" opacity="0.7"/>`;
        const n = t.few ? 9 : cap((W * H) / (s * s * 1.1), 600);
        for (let i = 0; i < n; i++) {
          const x = R() * W, y = R() * H, r = s * (0.5 + R() * 0.8), rot = R() * 360;
          g += `<path d="M ${f(x - r)} ${f(y)} A ${f(r)} ${f(r * 0.7)} 0 0 1 ${f(x + r)} ${f(y)} Z" fill="${pc()}" stroke="#6b5c44" stroke-opacity="0.45" stroke-width="0.7" transform="rotate(${f(rot)} ${f(x)} ${f(y)})"/>`;
          for (let k = 1; k < 3; k++) g += `<path d="M ${f(x)} ${f(y)} L ${f(x + Math.cos(Math.PI + k) * r)} ${f(y - Math.abs(Math.sin(Math.PI + k)) * r * 0.65)}" stroke="#6b5c44" stroke-opacity="0.3" stroke-width="0.5" transform="rotate(${f(rot)} ${f(x)} ${f(y)})"/>`;
          mark('grains', x, y, r + i / n * 5);
          mark('c' + ci, x, y, r + i / n * 5);
        }
        break;
      }
      case 'oolithes': {
        markBg(8);
        const n = cap((W * H) / (s * s) * 0.75, 1200);
        for (let i = 0; i < n; i++) {
          const x = R() * W, y = R() * H, r = s * (0.55 + R() * 0.4);
          g += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${pc()}"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 0.55)}" fill="none" stroke="#000" stroke-opacity="0.15" stroke-width="0.6"/>`;
          mark('c' + ci, x, y, i / n);
          mark('grains', x, y, i / n);
        }
        break;
      }
      case 'sucre': {
        const n = cap((W * H) / (s * s) * 1.5, 1600);
        for (let i = 0; i < n; i++) {
          const x = R() * W, y = R() * H;
          g += `<polygon points="${poly(R, x, y, s * (0.5 + R() * 0.4), 5 + Math.floor(R() * 2), 0.3)}" fill="${pc()}"/>`;
          mark('c' + ci, x, y, i / n);
          mark('grains', x, y, i / n);
        }
        for (let i = 0; i < 40; i++) g += `<rect x="${f(R() * W)}" y="${f(R() * H)}" width="1.6" height="1.6" fill="#fff" opacity="${f(0.4 + R() * 0.5)}"/>`;
        if (t.veins) for (let i = 0; i < 4; i++) {
          let x = R() * W, y = -5, d = `M ${f(x)} ${y}`;
          while (y < H + 5) { x += (R() - 0.5) * 22; y += 8 + R() * 10; d += ` L ${f(x)} ${f(y)}`; mark('veins', x, y, 2); }
          g += `<path d="${d}" stroke="${t.veins}" stroke-width="${f(0.6 + R() * 1.8)}" fill="none" opacity="0.65"/>`;
        }
        if (t.fibres) for (let i = 0; i < 60; i++) { const x = R() * W; g += `<line x1="${f(x)}" y1="0" x2="${f(x + 6)}" y2="${H}" stroke="#fff" stroke-opacity="0.25" stroke-width="0.6"/>`; mark('lines', x + 3, H / 2, 1); }
        break;
      }
      case 'charbon': {
        let y = 0;
        while (y < H) { const h = 3 + R() * 9; g += `<rect x="0" y="${f(y)}" width="${W}" height="${f(h)}" fill="${pc()}" opacity="0.6"/>`; mark('c' + ci, W * (0.2 + R() * 0.6), y + h / 2, h); y += h; }
        for (let i = 0; i < 30; i++) { const yy = R() * H, x1 = R() * W * 0.5, x2 = W * 0.5 + R() * W * 0.5; g += `<line x1="${f(x1)}" y1="${f(yy)}" x2="${f(x2)}" y2="${f(yy)}" stroke="#9aa0aa" stroke-width="0.6" opacity="${f(0.2 + R() * 0.5)}"/>`; mark('lines', (x1 + x2) / 2, yy, 1); }
        for (let i = 0; i < 10; i++) { const x = R() * W, y1 = R() * H, y2 = R() * H; g += `<line x1="${f(x)}" y1="${f(y1)}" x2="${f(x)}" y2="${f(y2)}" stroke="#000" stroke-width="0.8" opacity="0.6"/>`; mark('veins', x, (y1 + y2) / 2, 1); }
        markBg(4);
        break;
      }
      case 'terreux': {
        markBg();
        for (let i = 0; i < 40; i++) {
          const x = R() * W, y = R() * H;
          g += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(s * (3 + R() * 5))}" fill="${pc()}" opacity="0.28"/>`;
          mark('c' + ci, x, y, i);
        }
        const n = cap((W * H) / (t.smooth ? 14 : 5), 1200);
        for (let i = 0; i < n; i++) {
          const x = R() * W, y = R() * H;
          g += `<rect x="${f(x)}" y="${f(y)}" width="${f(t.smooth ? 1 : s * 0.6)}" height="${f(t.smooth ? 1 : s * 0.6)}" fill="${pc()}" opacity="0.7"/>`;
          if (!t.smooth) mark('grains', x, y, i / n);
        }
        if (t.sheen) {
          defs.push(`<linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`);
          g += `<rect width="${W}" height="${H}" fill="url(#${id}s)"/>`;
        }
        break;
      }
      case 'spinifex': {
        markBg();
        const nd = cap((W * H) / 5, 1000);
        for (let i = 0; i < nd; i++) g += `<rect x="${f(R() * W)}" y="${f(R() * H)}" width="1.4" height="1.4" fill="${pc()}" opacity="0.5"/>`;
        for (let b = 0; b < 7; b++) {
          const ox = R() * W, oy = R() * H, a0 = R() * Math.PI * 2;
          for (let i = 0; i < 14; i++) {
            const a = a0 + (R() - 0.5) * 0.7, l = 25 + R() * 45;
            g += `<line x1="${f(ox)}" y1="${f(oy)}" x2="${f(ox + Math.cos(a) * l)}" y2="${f(oy + Math.sin(a) * l)}" stroke="${pc()}" stroke-width="${f(0.8 + R() * s)}"/>`;
            mark('lines', ox + Math.cos(a) * l * 0.6, oy + Math.sin(a) * l * 0.6, l);
          }
        }
        break;
      }
      default:
        break;
    }
    g = bg + g;
    return finish();

    function finish() {
      defs.push(`<radialGradient id="${id}l" cx="0.3" cy="0.25" r="0.9"><stop offset="0" stop-color="#fff" stop-opacity="0.16"/><stop offset="0.6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.22"/></radialGradient>`);
      defs.push(`<filter id="${id}n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${uid % 97}"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"/></filter>`);
      let ann = '';
      if (legende) {
        const placed = [];
        legende.forEach((entry, i) => {
          const keys = [].concat(entry[0]);
          let cands = [];
          keys.forEach((k) => { if (marks[k]) cands = cands.concat(marks[k]); });
          if (!cands.length) return;
          // Préfère les éléments dessinés en dernier (visibles), loin des autres pastilles
          cands.sort((a, b) => b[2] - a[2]);
          cands = cands.slice(0, Math.max(12, Math.ceil(cands.length * 0.35)));
          let best = cands[0], bestD = -1;
          cands.forEach((p) => {
            const d = placed.reduce((m, q) => Math.min(m, Math.hypot(p[0] - q[0], p[1] - q[1])), 1e9);
            const edge = Math.min(p[0], W - p[0], p[1], H - p[1]);
            const score = Math.min(d, W * 0.35) + Math.min(edge, 30) * 0.5;
            if (score > bestD) { bestD = score; best = p; }
          });
          placed.push(best);
          const [x, y] = best;
          const r = Math.max(7, Math.min(W, H) * 0.045);
          const dx = x > W * 0.72 ? -1 : 1, dy = y < H * 0.32 ? 1 : -1;
          const lx = x + dx * r * 2, ly = y + dy * r * 2;
          ann += `<g class="pin"><line x1="${f(x)}" y1="${f(y)}" x2="${f(lx)}" y2="${f(ly)}" stroke="#fff" stroke-width="2.6"/><line x1="${f(x)}" y1="${f(y)}" x2="${f(lx)}" y2="${f(ly)}" stroke="#111" stroke-width="1"/>` +
            `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 0.3)}" fill="#fff" stroke="#111" stroke-width="1"/>` +
            `<circle cx="${f(lx)}" cy="${f(ly)}" r="${f(r)}" fill="#fff" stroke="#111" stroke-width="1.4"/>` +
            `<text x="${f(lx)}" y="${f(ly + r * 0.4)}" font-size="${f(r * 1.15)}" font-weight="700" text-anchor="middle" fill="#111" font-family="system-ui,sans-serif">${i + 1}</text></g>`;
        });
      }
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><defs>${defs.join('')}</defs>${g}<rect width="${W}" height="${H}" filter="url(#${id}n)" opacity="0.5"/><rect width="${W}" height="${H}" fill="url(#${id}l)"/>${ann}</svg>`;
    }
  }

  window.RockTexture = { render };
})();
