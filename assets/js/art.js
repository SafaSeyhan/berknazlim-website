/* ==========================================================================
   Procedural architectural drawings used as placeholder imagery.
   ART.render(form, palette, seed, variant) -> SVG markup string
   ========================================================================== */

(function () {
  const W = 1600, H = 1000, HORIZON = 760;

  function rng(seed) {
    let a = 0;
    for (let i = 0; i < seed.length; i++) a = (Math.imul(31, a) + seed.charCodeAt(i)) | 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const f = (n) => Math.round(n * 10) / 10;
  const pts = (arr) => arr.map((p) => f(p[0]) + "," + f(p[1])).join(" ");

  // isometric projection helper
  function iso(ox, oy, s) {
    const c = Math.cos(Math.PI / 6), sn = Math.sin(Math.PI / 6);
    return (x, y, z) => [ox + (x - y) * c * s, oy + (x + y) * sn * s - z * s];
  }
  function isoBox(P, x, y, z, w, d, h, fills, stroke) {
    const A = P(x, y + d, z), B = P(x + w, y + d, z), C = P(x + w, y, z);
    const A2 = P(x, y + d, z + h), B2 = P(x + w, y + d, z + h), C2 = P(x + w, y, z + h), D2 = P(x, y, z + h);
    return (
      `<polygon points="${pts([A, B, B2, A2])}" fill="${fills[1]}" stroke="${stroke}" stroke-width="1"/>` +
      `<polygon points="${pts([B, C, C2, B2])}" fill="${fills[2]}" stroke="${stroke}" stroke-width="1"/>` +
      `<polygon points="${pts([A2, B2, C2, D2])}" fill="${fills[0]}" stroke="${stroke}" stroke-width="1"/>`
    );
  }

  const forms = {
    tower(p, r) {
      const [bg, c1, c2] = p;
      let s = "";
      const floors = 52, cx = 800, base = HORIZON, fh = 11.4, hw = 150, hd = 105;
      for (let i = 0; i <= floors; i++) {
        const a = i * 0.035 + 0.3;
        const y0 = base - i * fh;
        const corners = [[-hw, -hd], [hw, -hd], [hw, hd], [-hw, hd]].map(([px, py]) => {
          const rx = px * Math.cos(a) - py * Math.sin(a);
          const ry = px * Math.sin(a) + py * Math.cos(a);
          return [cx + rx, y0 + ry * 0.28];
        });
        const op = 0.25 + (i / floors) * 0.6;
        s += `<polygon points="${pts(corners)}" fill="${i === floors ? c1 : "none"}" fill-opacity="${i === floors ? 0.25 : 0}" stroke="${i % 6 === 0 ? c2 : "#ffffff"}" stroke-opacity="${op}" stroke-width="${i % 6 === 0 ? 1.6 : 0.8}"/>`;
        if (i % 6 === 3 && r() > 0.2) {
          // planted terrace dots
          for (let k = 0; k < 6; k++) {
            const c = corners[Math.floor(r() * 4)];
            s += `<circle cx="${f(c[0] + (r() - 0.5) * 30)}" cy="${f(c[1] - 4)}" r="${f(2 + r() * 4)}" fill="${c2}" opacity="0.7"/>`;
          }
        }
      }
      // spine
      s += `<line x1="${cx}" y1="${base}" x2="${cx}" y2="${base - floors * fh - 90}" stroke="${c2}" stroke-width="1" opacity="0.7"/>`;
      return s;
    },

    pavilion(p, r) {
      const [bg, c1, c2] = p;
      let s = "";
      const n = 150, x0 = 120, x1 = 1480;
      const roof = (t) => 470 - 130 * Math.sin(Math.PI * t) + 26 * Math.sin(t * 9 + 1);
      let top = [], bot = [];
      for (let i = 0; i <= n; i++) {
        const t = i / n, x = x0 + (x1 - x0) * t, y = roof(t);
        const len = 26 + 40 * Math.sin(Math.PI * t) + 14 * Math.sin(t * 22);
        const tilt = Math.sin(t * 12) * 10;
        top.push([x, y]); bot.push([x + tilt, y + len]);
        s += `<line x1="${f(x)}" y1="${f(y)}" x2="${f(x + tilt)}" y2="${f(y + len)}" stroke="${i % 10 === 0 ? c2 : c1}" stroke-width="${i % 10 === 0 ? 2 : 1.2}" opacity="${0.45 + 0.5 * Math.sin(Math.PI * t)}"/>`;
      }
      s += `<polyline points="${pts(top)}" fill="none" stroke="#fff" stroke-width="2" opacity="0.85"/>`;
      s += `<polyline points="${pts(bot)}" fill="none" stroke="${c1}" stroke-width="1" opacity="0.5"/>`;
      for (let k = 1; k < 12; k++) {
        const t = k / 12, x = x0 + (x1 - x0) * t;
        s += `<line x1="${f(x)}" y1="${f(roof(t) + 40)}" x2="${f(x)}" y2="${HORIZON}" stroke="#fff" stroke-width="1.4" opacity="0.55"/>`;
      }
      // people
      for (let k = 0; k < 14; k++) {
        const x = 260 + r() * 1080, h = 26 + r() * 8;
        s += `<line x1="${f(x)}" y1="${HORIZON}" x2="${f(x)}" y2="${f(HORIZON - h)}" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.6"/><circle cx="${f(x)}" cy="${f(HORIZON - h - 6)}" r="4" fill="#fff" opacity="0.6"/>`;
      }
      return s;
    },

    stone(p, r) {
      const [bg, c1, c2] = p;
      let s = "";
      let ridge = [[0, HORIZON]];
      for (let x = 0; x <= W; x += 40) {
        const y = 430 + 90 * Math.sin(x / 260) + 40 * Math.sin(x / 90 + 2) + r() * 18;
        ridge.push([x, y]);
      }
      ridge.push([W, HORIZON]);
      s += `<polygon points="${pts(ridge)}" fill="${c1}" opacity="0.22"/>`;
      s += `<polyline points="${pts(ridge.slice(1, -1))}" fill="none" stroke="${c2}" stroke-width="1.6" opacity="0.8"/>`;
      // strata lines
      for (let k = 1; k < 9; k++) {
        const line = ridge.slice(1, -1).map(([x, y]) => [x, y + k * ((HORIZON - y) / 9) + Math.sin(x / 70 + k) * 4]);
        s += `<polyline points="${pts(line)}" fill="none" stroke="${c2}" stroke-width="0.7" opacity="${0.12 + k * 0.02}"/>`;
      }
      // carved openings, glowing
      for (let row = 0; row < 3; row++) {
        for (let k = 0; k < 8; k++) {
          const x = 300 + k * 130 + row * 40 + r() * 20, y = 560 + row * 62;
          s += `<rect x="${f(x)}" y="${f(y)}" width="54" height="34" rx="17" fill="${c2}" opacity="${0.35 + r() * 0.5}"/>`;
        }
      }
      // balloons
      for (let k = 0; k < 7; k++) {
        const x = 120 + r() * 1360, y = 90 + r() * 260, rr = 12 + r() * 22;
        s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="${c1}" opacity="0.85"/><line x1="${f(x)}" y1="${f(y + rr)}" x2="${f(x)}" y2="${f(y + rr * 1.8)}" stroke="${c2}" opacity="0.6"/><rect x="${f(x - rr * 0.25)}" y="${f(y + rr * 1.8)}" width="${f(rr * 0.5)}" height="${f(rr * 0.35)}" fill="${c2}" opacity="0.8"/>`;
      }
      return s;
    },

    library(p, r) {
      const [bg, c1, c2] = p;
      let s = "";
      const x0 = 260, x1 = 1340, top = 300;
      s += `<rect x="${x0}" y="${top}" width="${x1 - x0}" height="${HORIZON - top}" fill="#ffffff" opacity="0.04" stroke="#fff" stroke-opacity="0.5"/>`;
      // brick coursing
      for (let y = top + 14; y < HORIZON; y += 14) s += `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="#fff" stroke-width="0.5" opacity="0.1"/>`;
      // arched windows
      const cols = 9;
      for (let i = 0; i < cols; i++) {
        const cx = x0 + 60 + i * ((x1 - x0 - 120) / (cols - 1));
        for (const wy of [360, 560]) {
          s += `<path d="M ${f(cx - 34)} ${wy + 140} V ${wy + 34} A 34 34 0 0 1 ${f(cx + 34)} ${wy + 34} V ${wy + 140} Z" fill="${bg}" stroke="#fff" stroke-opacity="0.55"/>`;
        }
      }
      // gable
      s += `<polyline points="${pts([[x0 - 20, top], [800, 160], [x1 + 20, top]])}" fill="none" stroke="#fff" stroke-width="2" opacity="0.7"/>`;
      // floating glass reading room
      const gx = 470, gy = 420, gw = 660, gh = 170;
      s += `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" fill="${c1}" opacity="0.22" stroke="${c2}" stroke-width="2"/>`;
      for (let i = 1; i < 12; i++) s += `<line x1="${gx + i * (gw / 12)}" y1="${gy}" x2="${gx + i * (gw / 12)}" y2="${gy + gh}" stroke="${c2}" opacity="0.5"/>`;
      for (let i = 0; i < 5; i++) s += `<line x1="${gx + 60 + i * 135}" y1="${gy}" x2="${800}" y2="${170}" stroke="${c1}" opacity="0.55"/>`;
      return s;
    },

    house(p, r) {
      const [bg, c1, c2] = p;
      const P = iso(800, 520, 1.25);
      const fills = [c2, "rgba(255,255,255,0.55)", "rgba(255,255,255,0.18)"];
      let s = "";
      s += `<line x1="0" y1="${HORIZON - 160}" x2="${W}" y2="${HORIZON - 160}" stroke="${c1}" opacity="0.4"/>`;
      s += isoBox(P, -60, -60, -40, 360, 260, 40, ["rgba(255,255,255,0.12)", "rgba(255,255,255,0.06)", "rgba(255,255,255,0.03)"], "rgba(255,255,255,0.3)");
      s += isoBox(P, 0, 0, 0, 240, 140, 70, fills, "rgba(255,255,255,0.6)");
      s += isoBox(P, 80, -40, 70, 260, 120, 66, fills, "rgba(255,255,255,0.6)");
      s += isoBox(P, -30, 40, 136, 200, 110, 60, fills, "rgba(255,255,255,0.6)");
      // glazing stripes
      const g1 = [P(80 + 260, -40, 80), P(80 + 260, 80, 80), P(80 + 260, 80, 128), P(80 + 260, -40, 128)];
      s += `<polygon points="${pts(g1)}" fill="${c1}" opacity="0.6"/>`;
      // pool
      s += `<polygon points="${pts([P(250, 150, 0), P(420, 150, 0), P(420, 200, 0), P(250, 200, 0)])}" fill="${c1}" opacity="0.7"/>`;
      return s;
    },

    housing(p, r) {
      const [bg, c1, c2] = p;
      const P = iso(800, 330, 0.9);
      let s = "";
      const fills = ["rgba(255,255,255,0.32)", "rgba(255,255,255,0.12)", "rgba(255,255,255,0.05)"];
      const blocks = [];
      for (let gx = -2; gx <= 2; gx++)
        for (let gy = -2; gy <= 2; gy++) {
          if ((gx + gy) % 2 === 0 && r() > 0.25) blocks.push([gx, gy]);
        }
      blocks.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
      for (const [gx, gy] of blocks) {
        const x = gx * 170, y = gy * 170, h = 60 + Math.floor(r() * 3) * 22;
        // courtyard ring = four bars
        s += isoBox(P, x, y, 0, 140, 34, h, fills, "rgba(255,255,255,0.45)");
        s += isoBox(P, x, y + 34, 0, 34, 72, h, fills, "rgba(255,255,255,0.45)");
        s += isoBox(P, x + 106, y + 34, 0, 34, 72, h, fills, "rgba(255,255,255,0.45)");
        s += isoBox(P, x, y + 106, 0, 140, 34, h, fills, "rgba(255,255,255,0.45)");
        const t = P(x + 70, y + 70, 0);
        s += `<circle cx="${f(t[0])}" cy="${f(t[1])}" r="9" fill="${c1}" opacity="0.9"/>`;
      }
      return s;
    },

    hall(p, r) {
      const [bg, c1, c2] = p;
      let s = "";
      const cx = 800, vy = 470;
      // vault ribs in one-point perspective
      for (let k = 0; k < 14; k++) {
        const t = k / 13, sc = 0.12 + 0.88 * Math.pow(t, 1.6);
        const w = 760 * sc, h = 520 * sc, by = vy + 300 * sc;
        s += `<path d="M ${f(cx - w)} ${f(by)} Q ${cx} ${f(by - h * 1.6)} ${f(cx + w)} ${f(by)}" fill="none" stroke="${k % 3 === 0 ? c2 : c1}" stroke-width="${f(0.8 + sc * 2.4)}" opacity="${f(0.35 + sc * 0.6)}"/>`;
      }
      // diagonal lattice
      for (let k = -10; k <= 10; k++) {
        s += `<line x1="${cx}" y1="${vy - 40}" x2="${f(cx + k * 110)}" y2="${f(k === 0 ? 0 : Math.abs(k) > 7 ? 600 : 80 + Math.abs(k) * 40)}" stroke="${c1}" stroke-width="0.6" opacity="0.25"/>`;
      }
      // platforms
      for (const off of [-520, -200, 200, 520]) {
        s += `<line x1="${cx + off * 0.05}" y1="${vy + 20}" x2="${cx + off * 1.8}" y2="${H}" stroke="#fff" stroke-width="1.2" opacity="0.5"/>`;
      }
      s += `<polygon points="${pts([[cx - 14, vy + 20], [cx + 14, vy + 20], [cx + 300, H], [cx - 300, H]])}" fill="${c2}" opacity="0.08"/>`;
      // train light
      s += `<circle cx="${cx}" cy="${vy + 14}" r="10" fill="${c2}"/>`;
      return s;
    },

    school(p, r) {
      const [bg, c1, c2] = p;
      const P = iso(780, 420, 1.0);
      let s = "";
      const n = 9;
      for (let i = 0; i < n; i++) {
        const x = i * 70 - 300;
        // body
        s += isoBox(P, x, -200, 0, 70, 380, 70, ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"], "rgba(255,255,255,0.4)");
        // sawtooth roof
        const a = P(x, -200, 70), b = P(x, 180, 70), c = P(x + 70, 180, 70), d = P(x + 70, -200, 70);
        const a2 = P(x + 70, -200, 120), b2 = P(x + 70, 180, 120);
        s += `<polygon points="${pts([a, b, b2, a2])}" fill="${c2}" opacity="0.28" stroke="${c2}" stroke-opacity="0.7"/>`;
        s += `<polygon points="${pts([d, c, b2, a2])}" fill="${c1}" opacity="0.55" stroke="${c1}"/>`;
      }
      // timber grain lines on front
      for (let k = 0; k < 18; k++) {
        const a = P(-300, 180, k * 4), b = P(-300 + n * 70, 180, k * 4);
        s += `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${c2}" stroke-width="0.5" opacity="0.3"/>`;
      }
      // trees
      for (let k = 0; k < 16; k++) {
        const t = P(-420 + r() * 900, 260 + r() * 160, 0);
        s += `<polygon points="${pts([[t[0], t[1] - 70 - r() * 30], [t[0] - 16, t[1]], [t[0] + 16, t[1]]])}" fill="${c1}" opacity="0.45"/>`;
      }
      return s;
    },
  };

  function render(form, palette, seed, variant) {
    variant = variant || 0;
    const r = rng(seed + ":" + variant);
    const [bg, c1, c2] = palette;
    const id = "g" + Math.floor(r() * 1e9).toString(36);
    const views = ["0 0 1600 1000", "260 160 1080 675", "-120 -60 1840 1150", "420 260 760 475"];
    const vb = views[variant % views.length];
    const sunX = 250 + r() * 1100, sunY = 160 + r() * 200;
    const body = (forms[form] || forms.tower)(palette, r);
    // starfield / dust
    let dust = "";
    for (let i = 0; i < 40; i++) dust += `<circle cx="${f(r() * W)}" cy="${f(r() * HORIZON * 0.7)}" r="${f(r() * 1.4)}" fill="#fff" opacity="${f(r() * 0.5)}"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">
<defs>
<linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg}"/><stop offset="0.7" stop-color="${bg}"/><stop offset="1" stop-color="${c1}" stop-opacity="0.35"/></linearGradient>
<radialGradient id="${id}r" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${c1}" stop-opacity="0.55"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
<pattern id="${id}p" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity="0.05"/></pattern>
<linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}" stop-opacity="0.25"/><stop offset="1" stop-color="${bg}" stop-opacity="1"/></linearGradient>
</defs>
<rect x="-400" y="-400" width="2400" height="1800" fill="${bg}"/>
<rect width="${W}" height="${HORIZON}" fill="url(#${id}s)"/>
<rect x="-400" y="-400" width="2400" height="1800" fill="url(#${id}p)"/>
${dust}
<circle cx="${f(sunX)}" cy="${f(sunY)}" r="260" fill="url(#${id}r)"/>
<circle cx="${f(sunX)}" cy="${f(sunY)}" r="46" fill="${c1}" opacity="0.9"/>
<rect x="-400" y="${HORIZON}" width="2400" height="700" fill="url(#${id}w)"/>
<line x1="-400" y1="${HORIZON}" x2="2000" y2="${HORIZON}" stroke="${c2}" stroke-opacity="0.6"/>
<g>${body}</g>
<g transform="translate(0 ${HORIZON * 2}) scale(1 -1)" opacity="0.12">${body}</g>
</svg>`;
  }

  window.ART = { render };
})();
