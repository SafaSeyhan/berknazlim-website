/* ==========================================================================
   Home hero: a slowly rotating wireframe of a twisting tower over a
   perspective ground grid. Pure canvas, no libraries.
   ========================================================================== */

(function () {
  const canvas = document.querySelector(".hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, dpr, mx = 0, my = 0, tx = 0, ty = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (e) => {
    tx = (e.clientX / w - 0.5) * 2;
    ty = (e.clientY / h - 0.5) * 2;
  });
  resize();

  const FLOORS = 40, FH = 0.11, HW = 0.55, HD = 0.38, TWIST = 0.045;

  function project(x, y, z, rot, cam) {
    // rotate around vertical axis
    const c = Math.cos(rot), s = Math.sin(rot);
    let X = x * c - z * s, Z = x * s + z * c, Y = y;
    // tilt camera
    const ct = Math.cos(cam), st = Math.sin(cam);
    const Y2 = Y * ct - Z * st, Z2 = Y * st + Z * ct;
    const d = 6.2, sc = Math.min(w * 0.34, h * 0.165);
    const k = d / (d + Z2);
    const ox = w > 860 ? w * 0.8 : w * 0.62;
    return [ox + X * k * sc, h * 0.9 - Y2 * k * sc, k];
  }

  function frame(t) {
    mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
    const rot = (reduce ? 0.6 : t * 0.00012) + mx * 0.35;
    const cam = 0.22 + my * 0.06;
    ctx.clearRect(0, 0, w, h);

    // ground grid
    ctx.lineWidth = 1;
    for (let i = -8; i <= 8; i++) {
      const a = project(i * 0.5, 0, -4, rot, cam), b = project(i * 0.5, 0, 4, rot, cam);
      const c = project(-4, 0, i * 0.5, rot, cam), d = project(4, 0, i * 0.5, rot, cam);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.moveTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.stroke();
    }

    // floor plates
    let prev = null;
    for (let i = 0; i <= FLOORS; i++) {
      const a = i * TWIST + Math.sin(t * 0.0004 + i * 0.12) * (reduce ? 0 : 0.01);
      const y = i * FH;
      const taper = 1 - (i / FLOORS) * 0.25;
      const corners = [[-HW, -HD], [HW, -HD], [HW, HD], [-HW, HD]].map(([x, z]) => {
        const X = (x * Math.cos(a) - z * Math.sin(a)) * taper;
        const Z = (x * Math.sin(a) + z * Math.cos(a)) * taper;
        return project(X, y, Z, rot, cam);
      });
      const lit = i % 5 === 0;
      ctx.strokeStyle = lit ? "rgba(198,255,74,0.9)" : `rgba(236,234,228,${0.12 + (i / FLOORS) * 0.45})`;
      ctx.lineWidth = lit ? 1.3 : 0.8;
      ctx.beginPath();
      corners.forEach((p, j) => (j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.closePath(); ctx.stroke();
      if (i === FLOORS) {
        ctx.fillStyle = "rgba(198,255,74,0.08)"; ctx.fill();
      }
      // vertical mullions every few floors
      if (prev && i % 1 === 0) {
        ctx.strokeStyle = "rgba(236,234,228,0.08)";
        ctx.beginPath();
        for (let j = 0; j < 4; j++) { ctx.moveTo(prev[j][0], prev[j][1]); ctx.lineTo(corners[j][0], corners[j][1]); }
        ctx.stroke();
      }
      prev = corners;
    }

    // scanning line
    if (!reduce) {
      const sy = ((t * 0.00008) % 1) * FLOORS * FH;
      const s1 = project(-1.2, sy, 0, rot, cam), s2 = project(1.2, sy, 0, rot, cam);
      const g = ctx.createLinearGradient(s1[0], 0, s2[0], 0);
      g.addColorStop(0, "rgba(198,255,74,0)"); g.addColorStop(0.5, "rgba(198,255,74,0.7)"); g.addColorStop(1, "rgba(198,255,74,0)");
      ctx.strokeStyle = g; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(s1[0] - 60, s1[1]); ctx.lineTo(s2[0] + 60, s2[1]); ctx.stroke();
    }

    if (!reduce) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
