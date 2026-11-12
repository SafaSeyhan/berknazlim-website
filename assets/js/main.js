/* ==========================================================================
   Berk Nazlım — site behaviour
   Content comes from data.js. The 3D model lives in model.js and is loaded
   only on the pages that show it.
   ========================================================================== */

(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const root = document.documentElement;
  const lang = root.lang === "tr" ? "tr" : "en";
  const base = root.dataset.root || "";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  const ARROW = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';

  const UI = {
    en: {
      all: "All", overview: "Overview", location: "Location", year: "Year", typology: "Typology", area: "Area",
      client: "Client", status: "Context", next: "Next project", allProjects: "All projects", latest: "Latest",
      read: "Read article", back: "Journal", prev: "Previous", nextPost: "Next", readTime: "read",
      opening: "Opening your email app… If nothing happens, write to ",
      subject: "Project enquiry", name: "Name", email: "Email", company: "Company", type: "Project type", budget: "Budget",
      toLight: "Switch to light mode", toDark: "Switch to dark mode",
      close: "Close", prevImg: "Previous image", nextImg: "Next image", enlarge: "Enlarge image",
    },
    tr: {
      all: "Tümü", overview: "Genel bakış", location: "Konum", year: "Yıl", typology: "Tipoloji", area: "Alan",
      client: "İşveren", status: "Bağlam", next: "Sonraki proje", allProjects: "Tüm projeler", latest: "En yeni",
      read: "Yazıyı oku", back: "Günlük", prev: "Önceki", nextPost: "Sonraki", readTime: "okuma",
      opening: "E-posta uygulamanız açılıyor… Açılmazsa şu adrese yazın: ",
      subject: "Proje talebi", name: "Ad", email: "E-posta", company: "Firma", type: "Proje türü", budget: "Bütçe",
      toLight: "Açık temaya geç", toDark: "Koyu temaya geç",
      close: "Kapat", prevImg: "Önceki görsel", nextImg: "Sonraki görsel", enlarge: "Görseli büyüt",
    },
  }[lang];

  const loc = (item) => Object.assign({}, item, item[lang] || item.en);
  const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString(lang === "tr" ? "tr-TR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  const src = (p) => (/^(https?:)?\//.test(p) ? p : base + p);

  // photos come in two sizes: NN.jpg (1600px) and NN-sm.jpg (800px)
  const small = (p) => p.replace(/(\.jpe?g)$/i, "-sm$1");
  function picture(path, alt, sizes, eager) {
    const s = src(path);
    const set = /\/projects\//.test(path) ? ` srcset="${esc(src(small(path)))} 800w, ${esc(s)} 1600w" sizes="${sizes || "100vw"}"` : "";
    return `<img src="${esc(s)}"${set} alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
  }
  // the photo as a line drawing (NN-line.webp + NN-tone.webp masks from tools/sketch.py), coloured by the theme
  function drawing(path, alt, sizes) {
    // absolute URL: a relative url() inside a custom property would resolve against style.css
    const m = (k) => `url('${new URL(src(path.replace(/\.jpe?g$/i, `-${k}.webp`)), location.href).href}')`;
    return `<div class="sketch" role="img" aria-label="${esc(alt)}" style="--tone:${m("tone")};--line:${m("line")}"><i class="tone"></i><i class="line"></i></div>`
      + picture(path, "", sizes, true).replace("<img ", '<img aria-hidden="true" ');
  }
  function media(item, variant, cls, sizes, eager) {
    const img = variant === 0 ? item.image : item.gallery && item.gallery[variant - 1];
    const inner = img ? picture(img.src || img, item.title, sizes, eager) : ART.render(item.form, item.slug, variant);
    return `<div class="media ${cls || ""}">${inner}</div>`;
  }

  /* ---------- Theme ---------- */
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const current = () => root.dataset.theme || (mq.matches ? "dark" : "light");
  const themeBtn = $(".theme-toggle");
  const labelTheme = () => {
    if (themeBtn) themeBtn.setAttribute("aria-label", current() === "dark" ? UI.toLight : UI.toDark);
    // keep the phone's browser bar in step with a manually chosen theme
    $$('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", current() === "dark" ? "#0d1012" : "#e8e9e5"));
  };
  if (themeBtn) {
    labelTheme();
    themeBtn.addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      const apply = () => {
        // choosing the same as the device setting goes back to following the device
        if (next === (mq.matches ? "dark" : "light")) {
          delete root.dataset.theme;
          try { localStorage.removeItem("theme"); } catch (e) {}
        } else {
          root.dataset.theme = next;
          store.set("theme", next);
        }
        labelTheme();
      };
      // the new theme opens as a circle from the button
      if (document.startViewTransition && !reduce) {
        const r = themeBtn.getBoundingClientRect();
        root.style.setProperty("--vx", r.left + r.width / 2 + "px");
        root.style.setProperty("--vy", r.top + r.height / 2 + "px");
        root.classList.add("theme-switch");
        const t = document.startViewTransition(apply);
        t.finished.finally(() => root.classList.remove("theme-switch"));
      } else apply();
    });
    mq.addEventListener && mq.addEventListener("change", labelTheme);
  }

  /* ---------- Language ---------- */
  $$(".lang a").forEach((a) => {
    a.addEventListener("click", () => store.set("lang", a.dataset.lang));
    if (location.search) a.href = a.getAttribute("href") + location.search;
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $(".menu-btn");
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    // lock page scroll on <html>: locking <body> would turn it into a scroll container
    root.classList.toggle("menu-lock", open);
    if (menuBtn) menuBtn.setAttribute("aria-expanded", String(open));
  };
  if (menuBtn) {
    menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
    $$(".mobile-menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
    window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });
  }

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  let io; // the observer behind every scroll-in effect (see enhance)

  /* ---------- Scroll: one listener, many readers ---------- */
  const onScroll = [];
  let ticking = false, lastY = window.scrollY;
  const runScroll = () => { ticking = false; onScroll.forEach((fn) => fn()); };
  const queue = () => { if (!ticking) { ticking = true; requestAnimationFrame(runScroll); } };
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);

  // header: steps aside when reading down, returns when scrolling up
  onScroll.push(() => {
    const y = window.scrollY;
    root.classList.toggle("scrolled", y > 24);
    if (Math.abs(y - lastY) > 6) {
      root.classList.toggle("nav-away", y > lastY && y > 320 && !document.body.classList.contains("menu-open"));
      lastY = y;
    }
  });

  /* ---------- Page data ---------- */
  const page = document.body.dataset.page;
  const projects = (window.PROJECTS || []).map(loc);
  const posts = (window.POSTS || []).map(loc).sort((a, b) => (a.date < b.date ? 1 : -1));
  const projectUrl = (p) => `project.html?p=${encodeURIComponent(p.slug)}`;
  const postUrl = (p) => `post.html?p=${encodeURIComponent(p.slug)}`;

  // project.html and post.html serve every item, so point their search/share tags at this item
  function setMeta(title, desc, slug) {
    document.title = `${title} — Berk Nazlım`;
    const q = "?p=" + encodeURIComponent(slug);
    $$('link[rel="canonical"], link[rel="alternate"], meta[property="og:url"]').forEach((el) => {
      const attr = el.tagName === "META" ? "content" : "href";
      el.setAttribute(attr, el.getAttribute(attr).split("?")[0] + q);
    });
    $$('meta[name="description"], meta[property="og:description"]').forEach((m) => m.setAttribute("content", desc));
    const ogt = $('meta[property="og:title"]');
    if (ogt) ogt.setAttribute("content", document.title);
  }

  function projectCard(p, i, cls) {
    const sizes = cls === "wide" ? "(max-width: 820px) 100vw, 1300px" : "(max-width: 820px) 100vw, 50vw";
    return `<a class="project-card tilt ${cls || ""}" href="${projectUrl(p)}">
      ${media(p, 0, "curtain", sizes)}
      <div class="project-info"><h3>${esc(p.title)}</h3><span class="meta">${esc(p.year || "")}</span></div>
      <div class="project-sub">${esc(p.location)}, ${esc(p.category)}</div></a>`;
  }

  function postCard(p) {
    return `<a class="post-card tilt" href="${postUrl(p)}">
      ${media(p, 1, "curtain")}
      <div class="post-meta"><span class="cat">${esc(p.category)}</span><span>${fmtDate(p.date)}</span></div>
      <h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></a>`;
  }

  /* ---------- Home ---------- */
  if (page === "home") {
    $("#latest-posts").innerHTML = posts.slice(0, 3).map(postCard).join("");
    initWalk();

    // scrolling through the hero takes the model apart
    const hero = $("[data-hero]");
    let heroP = -1;
    onScroll.push(() => {
      const r = hero.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - window.innerHeight), 0, 1);
      if (p === heroP) return;
      heroP = p;
      hero.style.setProperty("--hp", p.toFixed(3));
      if (models.hero) models.hero.setExplode(reduce ? 0 : smooth(0.04, 0.85, p));
    });
  }

  /* Featured projects as a walk-through: the drawings hang left and right of a
     corridor, scrolling walks forward, and each drawing turns into the photo
     as you reach it. */
  function initWalk() {
    const sec = $("[data-walk]"), world = $("#featured");
    const feat = projects.filter((p) => p.featured).slice(0, 3);
    const n = feat.length + 1; // + the "all projects" door at the end
    world.innerHTML = feat.map((p, i) => `<a class="walk-card" href="${projectUrl(p)}">
        <div class="media drawn">${drawing(p.image, p.title, "(max-width: 820px) 90vw, 760px")}</div>
        <div class="walk-info"><span class="n">${pad(i + 1)}</span><h3>${esc(p.title)}</h3><p>${esc(p.location)}, ${esc(p.category)}${p.year ? ", " + esc(p.year) : ""}</p></div></a>`).join("")
      + `<a class="walk-card walk-end" href="portfolio.html"><span>${esc(world.dataset.all)}</span>${ARROW}<small>${projects.length}</small></a>`
      + `<div class="walk-floor" aria-hidden="true">${"<i></i>".repeat(14)}<b></b><b></b><b></b></div>`;
    const cards = $$(".walk-card", world), floor = $(".walk-floor", world), lines = $$("i", floor);
    const count = $("#walk-count"), bar = $(".walk-bar i", sec);

    // phones and tablets: a swipe gallery the browser scrolls natively, which stays smooth on any device
    if (!reduce && matchMedia("(max-width: 820px), (pointer: coarse)").matches) {
      sec.classList.add("swipe");
      const shown = cards.slice(0, feat.length);
      if ("IntersectionObserver" in window) {
        // as before: a drawing turns into its photo only while the whole picture is on screen
        const pio = new IntersectionObserver((en) => en.forEach((e) => e.target.classList.toggle("photo", e.intersectionRatio >= 0.95)), { threshold: [0, 0.95] });
        shown.forEach((c) => pio.observe($(".media", c)));
      } else shown.forEach((c) => $(".media", c).classList.add("photo"));
      let wait = false;
      const mark = () => {
        wait = false;
        const max = world.scrollWidth - world.clientWidth;
        const p = max > 0 ? clamp(world.scrollLeft / max, 0, 1) : 0;
        const k = Math.round(p * (n - 1));
        if (count) count.textContent = k < feat.length ? `${pad(k + 1)} / ${pad(feat.length)}` : "";
        if (bar) bar.style.transform = `scaleX(${Math.max(p, 1 / n).toFixed(3)})`;
      };
      world.addEventListener("scroll", () => { if (!wait) { wait = true; requestAnimationFrame(mark); } }, { passive: true });
      mark();
      return;
    }
    if (reduce || !window.CSS || !CSS.supports("transform-style", "preserve-3d")) {
      sec.classList.add("flat");
      cards.forEach((c) => c.style.setProperty("--mix", 1));
      return;
    }
    const D = 1300, START = 420, GAP = 420;
    sec.style.height = `${100 + n * 95}vh`;
    onScroll.push(() => {
      const r = sec.getBoundingClientRect(), vw = window.innerWidth;
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const p = clamp(-r.top / Math.max(1, r.height - window.innerHeight), 0, 1);
      const cam = p * ((n - 1) * D + START - 120);
      const wide = vw > 820;
      const side = wide ? Math.min(vw * 0.2, 330) : vw * 0.03;
      const turn = wide ? 17 : 5;
      let nearest = 0, best = 1e9;
      cards.forEach((c, i) => {
        const rel = -i * D - START + cam;
        const last = i === n - 1;
        const s = last ? 0 : i % 2 ? 1 : -1;
        // cards swing a little flatter as you reach them, so they are easy to read
        const flat = smooth(-900, -100, rel);
        c.style.transform = `translate3d(${(s * side * (1 - flat * 0.45)).toFixed(1)}px,0,${rel.toFixed(1)}px) rotateY(${(-s * turn * (1 - flat * 0.6)).toFixed(2)}deg)`;
        const op = Math.min(smooth(-4300, -2300, rel) * 0.85 + 0.15 * smooth(-4600, -4300, rel), 1 - smooth(20, 260, rel));
        c.style.opacity = op.toFixed(3);
        c.style.visibility = op < 0.01 ? "hidden" : "visible";
        c.style.pointerEvents = rel > 80 || rel < -1300 ? "none" : "auto";
        c.style.setProperty("--mix", smooth(-1150, -430, rel).toFixed(3));
        c.style.zIndex = String(100 - i);
        const d = Math.abs(rel + 250);
        if (d < best) { best = d; nearest = i; }
      });
      lines.forEach((l, i) => {
        const z = 300 - i * GAP + (cam % GAP);
        l.style.transform = `translate3d(-50%,0,${z.toFixed(1)}px) rotateX(90deg)`;
        l.style.opacity = (smooth(-5200, -2600, z) * (1 - smooth(-100, 300, z))).toFixed(3);
      });
      if (count) count.textContent = nearest < feat.length ? `${pad(nearest + 1)} / ${pad(feat.length)}` : "";
      if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
    });
  }

  /* ---------- Portfolio ---------- */
  if (page === "portfolio") {
    const grid = $("#projects"), filters = $("#filters");
    const cats = [UI.all, ...new Set(projects.map((p) => p.category))];
    const count = (c) => (c === UI.all ? projects.length : projects.filter((p) => p.category === c).length);
    filters.innerHTML = cats.map((c, i) => `<button type="button" class="filter ${i ? "" : "active"}" data-cat="${esc(c)}" aria-pressed="${!i}">${esc(c)}<sup>${count(c)}</sup></button>`).join("");
    const layout = ["wide", "", "", "narrow", "", "wide"];
    const draw = (cat) => {
      const all = cat === UI.all;
      grid.innerHTML = projects.filter((p) => all || p.category === cat).map((p, i) => projectCard(p, i, all ? layout[i % layout.length] : "")).join("");
      enhance(grid);
    };
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b || b.classList.contains("active")) return;
      $$(".filter", filters).forEach((x) => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", String(x === b)); });
      if (document.startViewTransition && !reduce) document.startViewTransition(() => draw(b.dataset.cat)); else draw(b.dataset.cat);
    });
    draw(UI.all);

    const list = $("#index-list");
    list.innerHTML = projects.slice().sort((a, b) => (b.year || 0) - (a.year || 0))
      .map((p, i) => `<a class="index-row reveal" href="${projectUrl(p)}" data-img="${esc(src(small(p.image)))}"><span class="num">${pad(i + 1)}</span><span class="t">${esc(p.title)}</span><span class="c">${esc(p.location)}</span><span class="c">${esc(p.category)}</span><span class="y">${esc(p.year || "—")}</span></a>`)
      .join("");

    // a picture of the project follows the pointer over the index
    if (canHover) {
      const peek = document.createElement("div");
      peek.className = "peek";
      peek.setAttribute("aria-hidden", "true");
      peek.innerHTML = "<img alt=''>";
      document.body.appendChild(peek);
      const img = $("img", peek);
      let x = 0, y = 0, tx = 0, ty = 0, on = false, raf = 0;
      const loop = () => {
        const dx = tx - x; x += dx * 0.16; y += (ty - y) * 0.16;
        peek.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${clamp(dx * 0.06, -7, 7).toFixed(2)}deg)`;
        raf = on || Math.abs(dx) > 0.3 ? requestAnimationFrame(loop) : 0;
      };
      list.addEventListener("pointermove", (e) => {
        const row = e.target.closest(".index-row");
        tx = e.clientX + 28; ty = e.clientY - 110;
        if (!row) return;
        if (img.getAttribute("src") !== row.dataset.img) img.src = row.dataset.img;
        if (!on) { on = true; x = tx; y = ty; peek.classList.add("on"); }
        if (!raf) raf = requestAnimationFrame(loop);
      });
      list.addEventListener("pointerleave", () => { on = false; peek.classList.remove("on"); });
    }
  }

  /* ---------- Project ---------- */
  if (page === "project") {
    const slug = new URLSearchParams(location.search).get("p");
    const i = projects.findIndex((p) => p.slug === slug);
    if (i < 0) { location.replace("portfolio.html"); return; }
    const p = projects[i], next = projects[(i + 1) % projects.length];
    setMeta(p.title, p.summary, p.slug);
    const facts = [[UI.location, p.location], [UI.year, p.year], [UI.typology, p.category], [UI.area, p.area], [UI.client, p.client], [UI.status, p.status]]
      .filter(([, v]) => v);
    const shotsList = (p.gallery || []).map((g) => (typeof g === "string" ? { src: g } : g));
    $("#project").innerHTML = `
      <section class="pd-head"><div class="wrap">
        <p class="label rise" style="--d:0">${[p.category, p.year].filter(Boolean).map(esc).join(", ")}</p>
        <h1 class="split" data-split-now>${esc(p.title)}</h1>
      </div></section>
      <div class="wrap pd-cover" data-parallax>${media(p, 0, "curtain now", "(max-width: 1400px) 100vw, 1400px", true)}</div>
      <div class="wrap"><dl class="pd-facts reveal">
        ${facts.map(([k, v], j) => `<div style="--i:${j}"><dt class="label">${k}</dt><dd>${esc(v)}</dd></div>`).join("")}
      </dl></div>
      <section class="section section-tight"><div class="wrap">
        <div class="pd-body">
          <div><p class="label">${UI.overview}</p>
            <p class="statement split">${esc(p.summary)}</p>
            ${p.awards && p.awards.length ? `<div class="pd-awards">${p.awards.map((a) => `<span>${esc(a)}</span>`).join("")}</div>` : ""}
          </div>
          <div class="reveal">${p.body.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
        </div>
        ${shotsList.length ? `<div class="pd-gallery">
          ${shotsList.map((g, j) => `<figure class="${g.wide ? "span" : ""}"><button type="button" class="zoom" data-shot="${j}" aria-label="${UI.enlarge}: ${esc(g[lang] || g.en || p.title)}"><div class="media curtain">${picture(g.src, g[lang] || g.en || p.title, g.wide ? "(max-width: 1400px) 100vw, 1400px" : "(max-width: 820px) 100vw, 50vw")}</div></button><figcaption><span>${esc(g[lang] || g.en || "")}</span><span>${pad(j + 1)}</span></figcaption></figure>`).join("")}
        </div>` : ""}
      </div></section>
      <a class="next-project" href="${projectUrl(next)}">
        <div class="media">${picture(next.image, "", "100vw")}</div>
        <div class="wrap"><p class="label">${UI.next}</p><h2>${esc(next.title)} ${ARROW}</h2></div>
      </a>
      <div class="wrap pd-all"><a class="link" href="portfolio.html">${UI.allProjects} ${ARROW}</a></div>`;

    // the cover drifts slower than the page
    const cover = $("[data-parallax]");
    onScroll.push(() => {
      const r = cover.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      cover.style.setProperty("--py", (reduce ? 0 : clamp((window.innerHeight - r.top) / (window.innerHeight + r.height), 0, 1) - 0.5).toFixed(4));
    });

    if (shotsList.length) lightbox(shotsList, p.title);
  }

  // gallery pictures open large; arrow keys and swipes move between them
  function lightbox(shots, title) {
    const dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.innerHTML = `<button type="button" class="lb-close icon-btn" aria-label="${UI.close}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 5l14 14M19 5L5 19"/></svg></button>
      <button type="button" class="lb-prev icon-btn" aria-label="${UI.prevImg}">${ARROW}</button>
      <figure><img alt=""><figcaption><span class="cap"></span><span class="pos"></span></figcaption></figure>
      <button type="button" class="lb-next icon-btn" aria-label="${UI.nextImg}">${ARROW}</button>`;
    document.body.appendChild(dlg);
    const img = $("img", dlg), cap = $(".cap", dlg), pos = $(".pos", dlg);
    let at = 0;
    const show = (k, dir) => {
      at = (k + shots.length) % shots.length;
      const g = shots[at];
      const swap = () => {
        img.src = src(g.src);
        img.alt = g[lang] || g.en || title;
        cap.textContent = g[lang] || g.en || "";
        pos.textContent = `${pad(at + 1)} / ${pad(shots.length)}`;
      };
      if (dir && !reduce) {
        dlg.style.setProperty("--dir", dir);
        img.classList.add("out");
        setTimeout(() => { swap(); img.classList.remove("out"); }, 160);
      } else swap();
    };
    $("#project").addEventListener("click", (e) => {
      const b = e.target.closest(".zoom");
      if (!b) return;
      show(+b.dataset.shot);
      dlg.showModal();
    });
    $(".lb-close", dlg).addEventListener("click", () => dlg.close());
    $(".lb-prev", dlg).addEventListener("click", () => show(at - 1, -1));
    $(".lb-next", dlg).addEventListener("click", () => show(at + 1, 1));
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(at - 1, -1);
      if (e.key === "ArrowRight") show(at + 1, 1);
    });
    let sx = null;
    dlg.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener("touchend", (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    });
  }

  /* ---------- Journal ---------- */
  if (page === "journal") {
    const [first, ...rest] = posts;
    $("#feature").innerHTML = `<a class="post-feature tilt" href="${postUrl(first)}">
      ${media(first, 0, "curtain now")}
      <div><div class="post-meta"><span class="cat">${UI.latest}, ${esc(first.category)}</span><span>${fmtDate(first.date)}</span></div>
      <h2>${esc(first.title)}</h2><p class="lead">${esc(first.excerpt)}</p><span class="link">${UI.read} ${ARROW}</span></div></a>`;
    const filters = $("#filters");
    const cats = [UI.all, ...new Set(rest.map((p) => p.category))];
    filters.innerHTML = cats.map((c, i) => `<button type="button" class="filter ${i ? "" : "active"}" data-cat="${esc(c)}" aria-pressed="${!i}">${esc(c)}</button>`).join("");
    const draw = (cat) => {
      $("#posts").innerHTML = rest.filter((p) => cat === UI.all || p.category === cat).map(postCard).join("");
      enhance($("#posts"));
    };
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b || b.classList.contains("active")) return;
      $$(".filter", filters).forEach((x) => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", String(x === b)); });
      if (document.startViewTransition && !reduce) document.startViewTransition(() => draw(b.dataset.cat)); else draw(b.dataset.cat);
    });
    draw(UI.all);
  }

  if (page === "post") {
    const slug = new URLSearchParams(location.search).get("p");
    const i = posts.findIndex((p) => p.slug === slug);
    if (i < 0) { location.replace("journal.html"); return; }
    const p = posts[i], newer = posts[i - 1], older = posts[i + 1];
    setMeta(p.title, p.excerpt, p.slug);
    $("#post").innerHTML = `
      <div class="read-bar" aria-hidden="true"><i></i></div>
      <section class="article-head"><div class="wrap"><div class="article">
        <a class="back rise" style="--d:0" href="journal.html">${ARROW} ${UI.back}</a>
        <div class="post-meta rise" style="--d:0"><span class="cat">${esc(p.category)}</span><span>${fmtDate(p.date)}</span><span>${esc(p.readTime)} ${UI.readTime}</span></div>
        <h1 class="split" data-split-now>${esc(p.title)}</h1><p class="lead rise" style="--d:1">${esc(p.excerpt)}</p>
      </div></div></section>
      <div class="wrap article-cover">${media(p, 0, "curtain now")}</div>
      <div class="wrap"><article class="article" id="article-body">${p.body}
        <p class="sign">Berk Nazlım</p>
        <nav class="article-nav">
          ${older ? `<a href="${postUrl(older)}"><span class="label">${UI.prev}</span><h4>${esc(older.title)}</h4></a>` : "<span></span>"}
          ${newer ? `<a href="${postUrl(newer)}"><span class="label">${UI.nextPost}</span><h4>${esc(newer.title)}</h4></a>` : ""}
        </nav>
      </article></div>`;
    const bar = $(".read-bar i"), body = $("#article-body");
    onScroll.push(() => {
      const r = body.getBoundingClientRect();
      bar.style.transform = `scaleX(${clamp((window.innerHeight * 0.5 - r.top) / r.height, 0, 1).toFixed(4)})`;
    });
  }

  if (page === "about") {
    const art = $("#portrait-art");
    if (art && !art.querySelector("img")) art.innerHTML = ART.render("house", "portrait", 1);
    // the line of the timeline is drawn as you read down it
    const tl = $("[data-timeline]");
    if (tl) onScroll.push(() => {
      const r = tl.getBoundingClientRect();
      tl.style.setProperty("--tp", (reduce ? 1 : clamp((window.innerHeight * 0.72 - r.top) / r.height, 0, 1)).toFixed(4));
    });
  }

  /* ---------- Services: the model is built step by step ---------- */
  if (page === "services") {
    const steps = $$("[data-step]"), dots = $$(".build-dots i");
    let active = -1;
    onScroll.push(() => {
      const mid = window.innerHeight * 0.58;
      let k = 0;
      steps.forEach((s, i) => { if (s.getBoundingClientRect().top < mid) k = i; });
      if (k === active && models.process) return;
      active = k;
      steps.forEach((s, i) => s.classList.toggle("active", i === k));
      dots.forEach((d, i) => d.classList.toggle("on", i <= k));
      if (models.process) models.process.setStage(k);
    });
  }

  if (page === "contact") {
    const form = $("#contact-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const subject = `${UI.subject} — ${d.get("type") || "—"} — ${d.get("name")}`;
      const body = `${UI.name}: ${d.get("name")}\n${UI.email}: ${d.get("email")}\n${UI.company}: ${d.get("company") || "-"}\n${UI.type}: ${d.get("type") || "-"}\n${UI.budget}: ${d.get("budget") || "-"}\n\n${d.get("message")}`;
      location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      $("#form-status").textContent = UI.opening + SITE.email;
    });
  }

  /* ---------- 3D model (home, services) ---------- */
  const models = {};
  const hosts = $$("[data-model]");
  if (hosts.length) {
    import(new URL(base + "assets/js/model.js", location.href).href)
      .then((m) => {
        hosts.forEach((h) => { models[h.dataset.model] = m.mount(h, { mode: h.dataset.model }); });
        queue();
      })
      .catch(() => hosts.forEach((h) => h.classList.add("no-gl")));
  }

  /* ---------- Motion ---------- */
  // headings rise word by word from behind a line
  function split(el) {
    if (el.dataset.split) return;
    el.dataset.split = "1";
    let i = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((c) => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach((tok) => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.append(" "); return; }
            const o = document.createElement("span"), inner = document.createElement("span");
            o.className = "w";
            inner.textContent = tok;
            inner.style.setProperty("--i", i++);
            o.append(inner);
            frag.append(o);
          });
          c.replaceWith(frag);
        } else if (c.nodeType === 1 && c.tagName !== "svg") walk(c);
      });
    };
    walk(el);
  }

  // numbers count up the first time they are seen
  function countUp(el) {
    const m = el.textContent.trim().match(/^(\D*)(\d+)(\D*)$/);
    if (!m || reduce) return;
    const to = +m[2], t0 = performance.now(), dur = 900 + Math.min(to, 12) * 60;
    const tick = (now) => {
      const t = clamp((now - t0) / dur, 0, 1);
      el.textContent = m[1] + Math.round(to * (1 - Math.pow(1 - t, 3))) + m[3];
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // pictures lean towards the pointer
  function tilt(el) {
    if (!canHover || reduce || el.dataset.tilt) return;
    el.dataset.tilt = "1";
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--tx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty("--ty", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    el.addEventListener("pointerleave", () => { el.style.setProperty("--tx", 0); el.style.setProperty("--ty", 0); });
  }

  function enhance(scope) {
    const s = scope || document;
    $$(".split", s).forEach(split);
    $$(".tilt", s).forEach(tilt);
    const watch = $$(".reveal:not(.in), .curtain:not(.in), .split:not(.in), [data-count]:not(.in)", s);
    if (!("IntersectionObserver" in window)) { watch.forEach((el) => el.classList.add("in")); return; }
    io = io || new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target.__curtain || en.target;
        el.classList.add("in");
        if (el.hasAttribute("data-count")) countUp(el);
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    watch.forEach((el) => {
      if (el.hasAttribute("data-split-now") || el.classList.contains("now")) requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("in")));
      else if (el.classList.contains("curtain")) {
        // a closed curtain has no visible area of its own, so watch the element around it
        el.parentElement.__curtain = el;
        io.observe(el.parentElement);
      } else io.observe(el);
    });
  }
  enhance();
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("loaded")));
  runScroll();
  window.__siteReady = true;
})();
