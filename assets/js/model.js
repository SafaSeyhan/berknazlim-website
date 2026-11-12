/* ==========================================================================
   The 3D model on the home page and the services page.

   An abstract section model built from Berk's own projects: two load-bearing
   walls with a glass stair between them and a tall gallery void (Ortaköy
   DansResim), a roof slit and vertical timber fins (the Çanakkale book café),
   brass handrails and frames (YediMavi).

   mount(host, { mode }) -> { setExplode(0..1), setStage(0..3) }
     mode "hero":    the model extrudes itself on load, turns slowly, follows
                     the pointer and can be dragged; setExplode lifts the
                     floors apart.
     mode "process": the model is built stage by stage with setStage:
                     0 site, 1 structure as lines, 2 solid, 3 finished.

   Colours come from the --m-* variables in style.css, so the model follows
   the light / dark theme.
   ========================================================================== */

import * as THREE from "../vendor/three.module.min.js";

const cssVar = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const ease = (t) => 1 - Math.pow(1 - t, 4);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function mount(host, opts = {}) {
  const mode = opts.mode || "hero";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) {
    host.classList.add("no-gl");
    return null;
  }
  // phones get a lighter picture: fewer pixels and a smaller, simpler shadow
  const lite = matchMedia("(max-width: 820px), (pointer: coarse)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = lite ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(20, 1, 5, 600);
  const rig = new THREE.Group();
  scene.add(rig);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x888888, 1.5);
  const sun = new THREE.DirectionalLight(0xffffff, 2.1);
  sun.position.set(-22, 40, 26);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); // halved on phones, below
  Object.assign(sun.shadow.camera, { left: -30, right: 30, top: 34, bottom: -24, near: 1, far: 140 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.05;
  sun.shadow.radius = 5;
  scene.add(hemi, sun);

  if (lite) sun.shadow.mapSize.set(1024, 1024);

  /* ---------- materials ---------- */
  const lam = (o) => new THREE.MeshLambertMaterial(o || {});
  const M = {
    site: lam(), concrete: lam(), wall: lam(), walnut: lam(), brass: lam(), ink: lam(),
    glass: lam({ transparent: true, opacity: 0.32, depthWrite: false, side: THREE.DoubleSide }),
  };
  const lineMat = new THREE.LineBasicMaterial();
  const ghostMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.55 });

  function paint() {
    for (const k of Object.keys(M)) M[k].color.set(cssVar("--m-" + k) || "#cccccc");
    M.brass.emissive.set(cssVar("--m-brass") || "#b8903a").multiplyScalar(0.25);
    lineMat.color.set(cssVar("--m-line") || "#111111");
    ghostMat.color.set(cssVar("--m-brass") || "#b8903a");
    const dark = cssVar("--m-dark") === "1";
    hemi.intensity = dark ? 1.15 : 1.55;
    hemi.groundColor.set(dark ? 0x30363b : 0xb9bbb6);
    sun.intensity = dark ? 2.4 : 2.0;
  }
  paint();
  const mo = new MutationObserver(paint);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener && mq.addEventListener("change", paint);

  /* ---------- pieces ---------- */
  // layer decides how far a piece lifts when the model is taken apart
  const LIFT = { site: 0, core: 0, l1: 3.4, l2: 6.8, roof: 10.5 };
  const pieces = [];
  // x, z: centre on plan. y: underside. w (x), h (y), d (z). s: [stage as lines, stage as solid]
  function piece(layer, mat, x, y, z, w, h, d, o = {}) {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    if (o.rz) g.rotation.z = o.rz;
    const geo = o.geo || new THREE.BoxGeometry(w, h, d).translate(0, h / 2, 0);
    const mesh = new THREE.Mesh(geo, M[mat]);
    mesh.castShadow = !o.noShadow && mat !== "glass";
    mesh.receiveShadow = true;
    g.add(mesh);
    let lines = null;
    if (!o.noLines) {
      lines = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 30), lineMat);
      g.add(lines);
    }
    rig.add(g);
    const s = o.s || [1, 2];
    pieces.push({ g, mesh, lines, layer, y, wire: s[0], solid: s[1], a: 0, from: 0, to: 0, t0: 0, grow: o.grow !== false });
    return g;
  }

  const F = 0.3; // top of the plinth
  piece("site", "site", 0, -0.4, 0, 30, 0.4, 21, { s: [0, 0] });
  piece("site", "concrete", 0, 0, 0, 20, F, 15, { s: [0, 0] });

  // the two load-bearing walls
  piece("core", "wall", 1, F, -1.5, 14, 11.6, 0.4);
  piece("core", "wall", 1, F, 1.5, 14, 11.6, 0.4);

  // columns along both long sides
  for (const z of [-6.9, 6.9]) for (const x of [-8.6, -4.2, 0.2, 4.6, 8.6]) piece("core", "concrete", x, F, z, 0.32, 11.6, 0.32);

  // floors: the gallery void stays open at the front left
  piece("l1", "concrete", 4, 4, 4.45, 10, 0.3, 5.5);
  piece("l1", "concrete", 0, 4, -4.45, 18, 0.3, 5.5);
  piece("l2", "concrete", 0, 7.7, 4.45, 18, 0.3, 5.5);
  piece("l2", "concrete", 3, 7.7, -4.45, 12, 0.3, 5.5);
  // roof in two halves with a slit of light over the stair
  piece("roof", "concrete", 0, 11.9, -4.1, 19.4, 0.35, 7.2);
  piece("roof", "concrete", 0, 11.9, 4.1, 19.4, 0.35, 7.2);

  // glass stair between the walls: three flights, one above the other
  const RUN = 8, RISE = 3.7, STEPS = 10;
  [[-5, F, 1], [3, F + RISE, -1], [-5, F + RISE * 2, 1]].forEach(([x0, y0, dir], f) => {
    for (let i = 0; i < STEPS; i++) {
      piece("core", "glass", x0 + dir * (i + 0.5) * (RUN / STEPS), y0 + (i + 0.6) * (RISE / STEPS), 0, RUN / STEPS, 0.1, 2.4, { s: [3, 3], grow: false });
    }
    const len = Math.hypot(RUN, RISE), ang = Math.atan2(RISE, RUN) * dir;
    for (const z of [-1.22, 1.22]) {
      piece("core", "brass", x0 + dir * RUN / 2, y0 + RISE / 2 + 1.05, z, len, 0.07, 0.07, { s: [3, 3], rz: ang, noLines: true, grow: false });
    }
    // landing at the top of the flight
    piece("core", "glass", x0 + dir * (RUN + 1.2), y0 + RISE - 0.1, 0, 2.4, 0.1, 2.4, { s: [3, 3], grow: false });
  });

  // vertical timber fins on the east side
  for (let i = 0; i < 14; i++) piece("core", "walnut", 9.6, F, -6.5 + i, 0.5, 11.6, 0.1, { s: [3, 3] });

  // gallery: paintings in brass frames and a free-standing wall
  piece("core", "brass", -3.4, 1.6, 1.76, 2.4, 3.2, 0.08, { s: [3, 3], grow: false });
  piece("core", "brass", -5.1, 6.2, 1.76, 1.5, 2, 0.08, { s: [3, 3], grow: false });
  piece("site", "wall", -6.6, F, 4.4, 0.25, 4.6, 3.6);
  piece("site", "brass", -6.44, 1.7, 4.4, 0.08, 2.2, 1.8, { s: [3, 3], grow: false });

  // café tables, a stage, a long bench
  for (const [x, z] of [[2.2, 3.4], [4.4, 5.2], [6.6, 3.6], [7.6, 5.6]]) piece("site", "walnut", x, F, z, 0.9, 0.75, 0.9, { s: [3, 3] });
  piece("l2", "walnut", 4, 8, 4.4, 6.5, 0.4, 3.6, { s: [3, 3] });
  piece("l1", "walnut", -2, 4.3, -6.4, 9, 0.45, 0.5, { s: [3, 3] });

  // people
  const body = new THREE.CapsuleGeometry(0.2, 1.15, 4, 10).translate(0, 0.78, 0);
  const person = (layer, x, y, z) => piece(layer, "ink", x, y, z, 0, 0, 0, { geo: body, noLines: true, s: [3, 3] });
  person("site", -4.4, F, 4.6); person("site", -2.6, F, 3.2); person("site", 3.3, F, 4.4); person("site", 5.6, F, 5.9);
  person("l1", 2.5, 4.3, 5.3); person("l1", -4, 4.3, -4); person("l1", -2.6, 4.3, -4.8); person("l1", 5, 4.3, -3.6);
  person("l2", 4.6, 8.4, 4.2); person("l2", -5.5, 8, 4.8);
  person("site", -11.5, 0, 6.5); person("site", 12.2, 0, -3);

  // survey lines on the site (first thing drawn in "process" mode)
  const gridGeo = new THREE.BufferGeometry();
  const gp = [];
  for (let x = -14; x <= 14; x += 3.5) gp.push(x, 0.02, -10, x, 0.02, 10);
  for (let z = -10; z <= 10; z += 4) gp.push(-14, 0.02, z, 14, 0.02, z);
  gridGeo.setAttribute("position", new THREE.Float32BufferAttribute(gp, 3));
  const grid = new THREE.LineSegments(gridGeo, ghostMat);
  rig.add(grid);

  /* ---------- state ---------- */
  let stage = mode === "process" ? 0 : 3;
  let explode = 0, explodeTo = 0;
  let yaw = -0.62, spin = 0, drag = 0, dragV = 0, px = 0, py = 0, pxT = 0, pyT = 0;
  let visible = true, last = performance.now(), dirty = true, tick = false;

  function retarget(stagger) {
    const now = performance.now();
    let k = 0;
    for (const p of pieces) {
      const to = stage >= p.wire ? 1 : 0;
      if (to !== p.to) {
        p.from = p.a; p.to = to;
        p.t0 = now + (reduce ? 0 : k++ * stagger);
      }
    }
    dirty = true;
  }
  if (reduce) { for (const p of pieces) p.a = p.to = stage >= p.wire ? 1 : 0; }
  retarget(mode === "hero" ? 16 : 9);

  /* ---------- layout ---------- */
  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // the model sits to one side on wide screens: --model-shift is a fraction of the width
    const shift = parseFloat(getComputedStyle(host).getPropertyValue("--model-shift")) || 0;
    const rise = parseFloat(getComputedStyle(host).getPropertyValue("--model-rise")) || 0;
    if (shift || rise) camera.setViewOffset(w, h, -w * shift, h * rise, w, h); else camera.clearViewOffset();
    camera.updateProjectionMatrix();
    dirty = true;
  }
  new ResizeObserver(resize).observe(host);
  resize();

  /* ---------- pointer ---------- */
  const el = renderer.domElement;
  let dragging = false, lastX = 0;
  el.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; dragV = 0; el.setPointerCapture(e.pointerId); host.classList.add("grabbing"); });
  el.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX; lastX = e.clientX;
    dragV = dx * 0.006; drag += dragV; dirty = true;
  });
  const stop = () => { dragging = false; host.classList.remove("grabbing"); };
  el.addEventListener("pointerup", stop); el.addEventListener("pointercancel", stop);
  if (mode === "hero" && matchMedia("(hover: hover)").matches) {
    window.addEventListener("pointermove", (e) => { pxT = e.clientX / window.innerWidth - 0.5; pyT = e.clientY / window.innerHeight - 0.5; }, { passive: true });
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((en) => { visible = en[0].isIntersecting; if (visible) { last = performance.now(); dirty = true; } }).observe(host);
  }

  /* ---------- frame ---------- */
  const target = new THREE.Vector3();
  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    // on phones the slow idle turn is drawn at half rate; anything the visitor causes runs at full rate
    if (lite && !dragging && Math.abs(explodeTo - explode) < 0.0005 && (tick = !tick)) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    let moving = false;

    for (const p of pieces) {
      if (p.a !== p.to || now < p.t0 + 950) {
        const t = clamp((now - p.t0) / 900, 0, 1);
        p.a = p.from + (p.to - p.from) * ease(t);
        if (t >= 1) p.a = p.to;
        moving = true;
      }
      const on = p.a > 0.002;
      p.g.visible = on;
      if (on) {
        if (p.grow) p.g.scale.y = Math.max(0.0001, p.a); else p.g.scale.setScalar(Math.max(0.0001, p.a));
        p.g.position.y = p.y + LIFT[p.layer] * explode + (p.grow ? 0 : (1 - p.a) * 1.5);
      }
      p.mesh.visible = stage >= p.solid;
    }
    grid.visible = mode === "process" && stage < 2;

    if (Math.abs(explodeTo - explode) > 0.0005) { explode += (explodeTo - explode) * Math.min(1, dt * 7); moving = true; }
    if (!dragging && Math.abs(dragV) > 0.0001) { drag += dragV; dragV *= 0.94; moving = true; }
    if (!reduce && !dragging) { spin += dt * (mode === "hero" ? 0.05 : 0.09); moving = true; }
    if (Math.abs(pxT - px) + Math.abs(pyT - py) > 0.0005) { px += (pxT - px) * Math.min(1, dt * 4); py += (pyT - py) * Math.min(1, dt * 4); moving = true; }

    if (!moving && !dirty) return;
    dirty = false;

    rig.rotation.y = yaw + spin + drag + px * 0.5 + explode * 0.9;
    const narrow = Math.min(1, camera.aspect / 1.25);
    const dist = (mode === "hero" ? 106 : 80) / Math.max(0.42, narrow) + explode * 26;
    const elev = 0.5 - py * 0.12 + explode * 0.1;
    target.set(0, 5.4 + explode * 5.2, 0);
    camera.position.set(0, target.y + Math.sin(elev) * dist, Math.cos(elev) * dist);
    camera.lookAt(target);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
  host.classList.add("ready");

  return {
    setExplode(v) { explodeTo = clamp(v, 0, 1); },
    setStage(n) { n = clamp(Math.round(n), 0, 3); if (n !== stage) { stage = n; retarget(9); } },
  };
}
