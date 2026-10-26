/* ==========================================================================
   Placeholder imagery: procedural architectural drawings.
   Colours come from CSS variables (see .art in style.css), so every drawing
   follows the light / dark theme automatically.

   ART.render(form, seed, variant) -> SVG markup string
   forms: tower, pavilion, stone, library, house, housing, hall, school
   ========================================================================== */

(function () {
  const W = 1600, H = 1000, G = 760; // canvas and ground line

  function rng(seed) {
    let a = 0;
    for (let i = 0; i < seed.length; i++) a = (Math.imul(31, a) + seed.charCodeAt(i)) | 0;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const f = (n) => Math.round(n * 10) / 10;
  const pts = (arr) => arr.map((p) => f(p[0]) + "," + f(p[1])).join(" ");
  const poly = (p, cls, extra) => `<polygon points="${pts(p)}" class="${cls}" ${extra || ""}/>`;
  const line = (x1, y1, x2, y2, cls, extra) => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="${cls || "s"}" ${extra || ""}/>`;

  function iso(ox, oy, s) {
    const c = Math.cos(Math.PI / 6), sn = Math.sin(Math.PI / 6);
    return (x, y, z) => [ox + (x - y) * c * s, oy + (x + y) * sn * s - z * s];
  }
  function box(P, x, y, z, w, d, h) {
    const A = P(x, y + d, z), B = P(x + w, y + d, z), C = P(x + w, y, z);
    const A2 = P(x, y + d, z + h), B2 = P(x + w, y + d, z + h), C2 = P(x + w, y, z + h), D2 = P(x, y, z + h);
    return poly([A, B, B2, A2], "f2", 'stroke-width="1.2"') + poly([B, C, C2, B2], "f3", 'stroke-width="1.2"') + poly([A2, B2, C2, D2], "f1", 'stroke-width="1.2"');
  }

  const forms = {
    tower(r) {
      let s = "";
      const floors = 46, cx = 800, fh = 12.5, hw = 140, hd = 100;
      for (let i = 0; i <= floors; i++) {
        const a = i * 0.034 + 0.3, y0 = G - i * fh;
        const c = [[-hw, -hd], [hw, -hd], [hw, hd], [-hw, hd]].map(([px, py]) => [
          cx + px * Math.cos(a) - py * Math.sin(a),
          y0 + (px * Math.sin(a) + py * Math.cos(a)) * 0.3,
        ]);
        s += poly(c, i % 8 === 0 ? "f2" : "f1", `stroke-width="${i % 8 === 0 ? 1.4 : 0.8}"`);
      }
      s += line(cx, G, cx, G - floors * fh - 70, "sa", 'stroke-width="1.5" stroke-dasharray="10 6"');
      return { body: s, levels: [0, 16, 32, 48].map((m) => [G - m * fh, m * 3.6]) };
    },

    pavilion(r) {
      let s = "";
      const n = 130, x0 = 140, x1 = 1460;
      const roof = (t) => 470 - 120 * Math.sin(Math.PI * t) + 22 * Math.sin(t * 9 + 1);
      const top = [], bot = [];
      for (let i = 0; i <= n; i++) {
        const t = i / n, x = x0 + (x1 - x0) * t, y = roof(t);
        const len = 24 + 38 * Math.sin(Math.PI * t) + 10 * Math.sin(t * 22);
        top.push([x, y]); bot.push([x, y + len]);
        s += line(x, y, x + Math.sin(t * 12) * 8, y + len, i % 10 === 0 ? "sa" : "s", `stroke-width="${i % 10 === 0 ? 1.6 : 0.8}"`);
      }
      s += `<polyline points="${pts(top)}" class="s" stroke-width="2.4"/>`;
      s += `<polyline points="${pts(bot)}" class="s" stroke-width="0.8" opacity="0.6"/>`;
      for (let k = 1; k < 12; k++) {
        const t = k / 12, x = x0 + (x1 - x0) * t;
        s += line(x, roof(t) + 40, x, G, "s", 'stroke-width="2"');
      }
      for (let k = 0; k < 12; k++) {
        const x = 260 + r() * 1080, h = 50 + r() * 10;
        s += line(x, G, x, G - h, "s", 'stroke-width="5" stroke-linecap="round"') + `<circle cx="${f(x)}" cy="${f(G - h - 10)}" r="7" class="ink"/>`;
      }
      return { body: s, levels: [[G, 0], [roof(0.5), 9.6]] };
    },

    stone(r) {
      let s = "";
      const ridge = [[0, G]];
      for (let x = 0; x <= W; x += 40) ridge.push([x, 420 + 90 * Math.sin(x / 260) + 36 * Math.sin(x / 90 + 2) + r() * 14]);
      ridge.push([W, G]);
      s += poly(ridge, "f2", 'stroke-width="2"');
      for (let k = 1; k < 9; k++) {
        const l = ridge.slice(1, -1).map(([x, y]) => [x, y + k * ((G - y) / 9) + Math.sin(x / 70 + k) * 4]);
        s += `<polyline points="${pts(l)}" class="s" stroke-width="0.6" opacity="0.45"/>`;
      }
      for (let row = 0; row < 3; row++)
        for (let k = 0; k < 8; k++) {
          const x = 300 + k * 130 + row * 40 + r() * 20, y = 560 + row * 62;
          s += `<rect x="${f(x)}" y="${f(y)}" width="54" height="36" rx="18" class="${r() > 0.35 ? "acc" : "fb"}" stroke-width="1"/>`;
        }
      for (let k = 0; k < 5; k++) {
        const x = 160 + r() * 1280, y = 110 + r() * 200, rr = 16 + r() * 18;
        s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" class="s" stroke-width="1.4"/>` + line(x - rr * 0.6, y + rr * 0.8, x - rr * 0.2, y + rr * 1.8) + line(x + rr * 0.6, y + rr * 0.8, x + rr * 0.2, y + rr * 1.8) + `<rect x="${f(x - rr * 0.25)}" y="${f(y + rr * 1.8)}" width="${f(rr * 0.5)}" height="${f(rr * 0.35)}" class="ink"/>`;
      }
      return { body: s, levels: [[G, 0], [560, 6.5], [430, 11]] };
    },

    library(r) {
      let s = "";
      const x0 = 260, x1 = 1340, top = 300;
      s += `<rect x="${x0}" y="${top}" width="${x1 - x0}" height="${G - top}" class="f1" stroke-width="2"/>`;
      for (let y = top + 16; y < G; y += 16) s += line(x0, y, x1, y, "s", 'stroke-width="0.5" opacity="0.35"');
      const cols = 9;
      for (let i = 0; i < cols; i++) {
        const cx = x0 + 60 + i * ((x1 - x0 - 120) / (cols - 1));
        for (const wy of [350, 560])
          s += `<path d="M ${f(cx - 32)} ${wy + 140} V ${wy + 32} A 32 32 0 0 1 ${f(cx + 32)} ${wy + 32} V ${wy + 140} Z" class="fb" stroke-width="1.2"/>`;
      }
      s += poly([[x0 - 24, top], [800, 160], [x1 + 24, top]], "f2", 'stroke-width="2"');
      const gx = 470, gy = 420, gw = 660, gh = 170;
      s += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" class="acc" opacity="0.18"/><rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" class="sa" stroke-width="2.4"/>`;
      for (let i = 1; i < 12; i++) s += line(gx + i * (gw / 12), gy, gx + i * (gw / 12), gy + gh, "sa", 'stroke-width="1"');
      for (let i = 0; i < 5; i++) s += line(gx + 60 + i * 135, gy, 800, 172, "sa", 'stroke-width="1" stroke-dasharray="6 6"');
      return { body: s, levels: [[G, 0], [gy + gh, 5.2], [top, 13.5], [160, 18]] };
    },

    house(r) {
      const P = iso(800, 470, 1.3);
      let s = line(0, 520, W, 520, "s", 'stroke-width="1" stroke-dasharray="2 8"');
      s += box(P, -60, -60, -40, 360, 260, 40);
      s += box(P, 0, 0, 0, 240, 140, 70);
      s += box(P, 80, -40, 70, 260, 120, 66);
      s += box(P, -30, 40, 136, 200, 110, 60);
      s += poly([P(340, -40, 80), P(340, 80, 80), P(340, 80, 128), P(340, -40, 128)], "acc", 'opacity="0.85"');
      s += poly([P(0, 140, 12), P(0, 140, 58), P(160, 140, 58), P(160, 140, 12)], "acc", 'opacity="0.55"');
      s += poly([P(250, 150, 0), P(420, 150, 0), P(420, 200, 0), P(250, 200, 0)], "acc", 'opacity="0.35"');
      return { body: s, levels: [[P(0, 0, 0)[1], 0], [P(0, 0, 136)[1] + 60, 7]] };
    },

    housing(r) {
      const P = iso(800, 300, 0.92);
      let s = "";
      const blocks = [];
      for (let gx = -2; gx <= 2; gx++)
        for (let gy = -2; gy <= 2; gy++) if ((gx + gy) % 2 === 0 && r() > 0.2) blocks.push([gx, gy]);
      blocks.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
      for (const [gx, gy] of blocks) {
        const x = gx * 170, y = gy * 170, h = 60 + Math.floor(r() * 3) * 22;
        s += box(P, x, y, 0, 140, 34, h) + box(P, x, y + 34, 0, 34, 72, h) + box(P, x + 106, y + 34, 0, 34, 72, h) + box(P, x, y + 106, 0, 140, 34, h);
        const t = P(x + 70, y + 70, 0);
        s += `<circle cx="${f(t[0])}" cy="${f(t[1] - 8)}" r="12" class="acc"/>`;
      }
      return { body: s, levels: [] };
    },

    hall(r) {
      let s = "";
      const cx = 800, vy = 470;
      for (let k = 0; k < 14; k++) {
        const t = k / 13, sc = 0.12 + 0.88 * Math.pow(t, 1.6);
        const w = 760 * sc, h = 520 * sc, by = vy + 290 * sc;
        s += `<path d="M ${f(cx - w)} ${f(by)} Q ${cx} ${f(by - h * 1.6)} ${f(cx + w)} ${f(by)}" class="${k % 4 === 0 ? "sa" : "s"}" stroke-width="${f(0.8 + sc * 2.2)}"/>`;
      }
      for (let k = -9; k <= 9; k++) s += line(cx, vy - 30, cx + k * 120, Math.abs(k) > 6 ? 640 : 90 + Math.abs(k) * 42, "s", 'stroke-width="0.6" opacity="0.4"');
      for (const off of [-520, -200, 200, 520]) s += line(cx + off * 0.05, vy + 20, cx + off * 1.8, H, "s", 'stroke-width="1.4"');
      s += poly([[cx - 14, vy + 20], [cx + 14, vy + 20], [cx + 300, H], [cx - 300, H]], "acc", 'opacity="0.15"');
      return { body: s, levels: [], noGround: true };
    },

    school(r) {
      const P = iso(780, 400, 1.0);
      let s = "";
      const n = 9;
      for (let k = 0; k < 10; k++) {
        const t = P(-460 + k * 90 + r() * 30, 250 + r() * 40, 0);
        s += poly([[t[0], t[1] - 70 - r() * 30], [t[0] - 16, t[1]], [t[0] + 16, t[1]]], "f2", 'stroke-width="1"');
      }
      for (let i = 0; i < n; i++) {
        const x = i * 70 - 300;
        s += box(P, x, -200, 0, 70, 380, 70);
        const a = P(x, -200, 70), b = P(x, 180, 70), c = P(x + 70, 180, 70), d = P(x + 70, -200, 70);
        const a2 = P(x + 70, -200, 122), b2 = P(x + 70, 180, 122);
        s += poly([a, b, b2, a2], "f1", 'stroke-width="1.2"') + poly([d, c, b2, a2], "acc", 'opacity="0.75"');
      }
      for (let k = 1; k < 14; k++) {
        const a = P(-300, 180, k * 5), b = P(-300 + n * 70, 180, k * 5);
        s += line(a[0], a[1], b[0], b[1], "s", 'stroke-width="0.5" opacity="0.5"');
      }
      return { body: s, levels: [] };
    },
  };

  function render(form, seed, variant) {
    variant = variant || 0;
    const r = rng(seed + ":" + variant);
    const id = "h" + Math.floor(r() * 1e9).toString(36);
    const views = ["0 0 1600 1000", "260 160 1080 675", "-80 -40 1760 1100", "420 260 760 475"];
    const res = (forms[form] || forms.tower)(r);

    // structural grid axes with bubbles
    let axes = "";
    const letters = "ABCDEFG";
    for (let i = 0; i < 7; i++) {
      const x = 200 + i * 200;
      axes += line(x, 80, x, G, "s", 'stroke-width="0.6" stroke-dasharray="14 6 2 6" opacity="0.35"');
      axes += `<circle cx="${x}" cy="56" r="20" class="fb" stroke-width="1"/><text x="${x}" y="63" text-anchor="middle" class="t">${letters[i]}</text>`;
    }
    // level markers
    let lv = "";
    for (const [y, m] of res.levels) {
      lv += line(1440, y, 1560, y, "s", 'stroke-width="0.8"') + poly([[1470, y], [1460, y - 12], [1480, y - 12]], "ink") + `<text x="1488" y="${f(y - 8)}" class="t">+${m.toFixed(2)}</text>`;
    }
    // ground: section hatch below the ground line
    const ground = res.noGround ? "" :
      `<rect x="-200" y="${G}" width="2000" height="400" fill="url(#${id})"/>` + line(-200, G, 1800, G, "s", 'stroke-width="3"');
    // scale bar + north arrow
    const scale = `<g transform="translate(60 ${H - 60})"><rect x="-10" y="-34" width="300" height="52" class="fb" stroke="none"/>` +
      [0, 1, 2, 3].map((k) => `<rect x="${k * 60}" y="0" width="60" height="10" class="${k % 2 ? "fb" : "ink"}" stroke-width="1"/>`).join("") +
      `<text x="0" y="-8" class="t">0</text><text x="112" y="-8" class="t">10</text><text x="226" y="-8" class="t">20 m</text></g>` +
      `<g transform="translate(${W - 80} ${H - 80})"><circle r="34" class="fb" stroke-width="1"/>${poly([[0, -30], [10, 14], [0, 6], [-10, 14]], "ink")}<text y="-42" text-anchor="middle" class="t">N</text></g>`;

    return `<svg class="art" xmlns="http://www.w3.org/2000/svg" viewBox="${views[variant % views.length]}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
<defs><pattern id="${id}" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="18" class="s" stroke-width="1" opacity="0.5"/></pattern></defs>
<rect x="-400" y="-400" width="2400" height="1800" class="bg"/>
${axes}${ground}<g>${res.body}</g>${lv}${scale}
</svg>`;
  }

  window.ART = { render };
})();
