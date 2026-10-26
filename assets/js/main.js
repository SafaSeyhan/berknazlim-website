/* ==========================================================================
   Berk Nazlım — site behaviour
   ========================================================================== */

(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  function media(item, variant, extraClass) {
    const inner = item.image && variant === 0
      ? `<img src="${esc(item.image)}" alt="${esc(item.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover">`
      : item.gallery && item.gallery[variant - 1]
        ? `<img src="${esc(item.gallery[variant - 1])}" alt="${esc(item.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover">`
        : ART.render(item.form, item.palette, item.slug, variant);
    return `<div class="project-media ${extraClass || ""}">${inner}</div>`;
  }

  /* ---------- Header ---------- */
  const header = $(".site-header");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const menuBtn = $(".menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", open);
    });
    $$(".nav-links a").forEach((a) => a.addEventListener("click", () => document.body.classList.remove("menu-open")));
  }

  // Istanbul local time
  const clock = $(".clock b");
  if (clock) {
    const tick = () => {
      clock.textContent = new Date().toLocaleTimeString("en-GB", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    };
    tick();
    setInterval(tick, 1000);
  }

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  let io;

  /* ---------- Page renderers ---------- */
  const page = document.body.dataset.page;
  const projects = window.PROJECTS || [];
  const posts = (window.POSTS || []).slice().sort((a, b) => (a.date < b.date ? 1 : -1));

  function projectCard(p, cls) {
    return `<a class="project-card reveal ${cls || ""}" href="project.html?p=${encodeURIComponent(p.slug)}" data-cat="${esc(p.category)}">
      <div class="project-media">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover">` : ART.render(p.form, p.palette, p.slug, 0)}
        <span class="tag mono">${esc(p.category)}</span><span class="view">↗</span></div>
      <div class="project-info"><div><h3>${esc(p.title)}</h3><span class="mono" style="color:var(--muted)">${esc(p.location)}</span></div>
      <div class="meta mono">${esc(p.year)}<br>${esc(p.status)}</div></div></a>`;
  }

  function postCard(p) {
    return `<a class="post-card reveal" href="post.html?p=${encodeURIComponent(p.slug)}">
      ${media(p, 1)}
      <div class="meta mono"><span class="cat">${esc(p.category)}</span><span>${fmtDate(p.date)}</span><span>${esc(p.readTime)}</span></div>
      <h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></a>`;
  }

  if (page === "home") {
    const feat = projects.filter((p) => p.featured).slice(0, 3);
    const el = $("#featured");
    if (el) el.innerHTML = feat.map((p, i) => projectCard(p, i === 0 ? "wide" : "")).join("");
    const pe = $("#latest-posts");
    if (pe) pe.innerHTML = posts.slice(0, 3).map(postCard).join("");
  }

  if (page === "portfolio") {
    const grid = $("#projects");
    const list = $("#index-list");
    const filters = $("#filters");
    const cats = ["All", ...new Set(projects.map((p) => p.category))];
    const count = (c) => (c === "All" ? projects.length : projects.filter((p) => p.category === c).length);
    filters.innerHTML = cats.map((c, i) => `<button class="filter ${i === 0 ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}<sup>${pad(count(c))}</sup></button>`).join("");
    const layout = ["wide", "", "", "tall", "", "", "", "wide"];
    const draw = (cat) => {
      const items = projects.filter((p) => cat === "All" || p.category === cat);
      grid.innerHTML = items.map((p, i) => projectCard(p, cat === "All" ? layout[i % layout.length] : "")).join("");
      observe();
    };
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      $$(".filter", filters).forEach((x) => x.classList.toggle("active", x === b));
      draw(b.dataset.cat);
    });
    draw("All");
    list.innerHTML = projects
      .slice()
      .sort((a, b) => b.year - a.year)
      .map((p, i) => `<a class="index-row" href="project.html?p=${encodeURIComponent(p.slug)}"><span class="mono" style="color:var(--muted)">${pad(i + 1)}</span><span class="t">${esc(p.title)}</span><span class="c l">${esc(p.location)}</span><span class="c mono">${esc(p.category)}</span><span class="y mono">${esc(p.year)}</span></a>`)
      .join("");
  }

  if (page === "project") {
    const slug = new URLSearchParams(location.search).get("p");
    const i = Math.max(0, projects.findIndex((p) => p.slug === slug));
    const p = projects[i];
    const next = projects[(i + 1) % projects.length];
    document.title = `${p.title} — Berk Nazlım Architecture`;
    $("#project").innerHTML = `
      <section class="pd-hero"><div class="wrap">
        <span class="label">${esc(p.category)} · ${esc(p.year)}</span>
        <h1>${esc(p.title)}</h1>
      </div></section>
      <div class="pd-cover reveal">${media(p, 0)}</div>
      <div class="wrap"><dl class="pd-facts">
        <div><dt class="mono">Location</dt><dd>${esc(p.location)}</dd></div>
        <div><dt class="mono">Year</dt><dd>${esc(p.year)}</dd></div>
        <div><dt class="mono">Typology</dt><dd>${esc(p.category)}</dd></div>
        <div><dt class="mono">Area</dt><dd>${esc(p.area)}</dd></div>
        <div><dt class="mono">Client</dt><dd>${esc(p.client)}</dd></div>
        <div><dt class="mono">Status</dt><dd>${esc(p.status)}</dd></div>
      </dl></div>
      <section class="section"><div class="wrap">
        <div class="pd-body">
          <div class="reveal"><span class="label">Overview</span>
            <p class="statement" style="font-size:clamp(24px,2.6vw,38px);margin-top:20px">${esc(p.summary)}</p>
            ${p.awards && p.awards.length ? `<div class="pd-awards mono">${p.awards.map((a) => `<span>${esc(a)}</span>`).join("")}</div>` : ""}
          </div>
          <div class="reveal" data-delay="1">${p.body.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
        </div>
        <div class="pd-gallery">
          ${[1, 2, 3].map((v) => `<figure style="margin:0" class="reveal">${media(p, v)}<figcaption class="mono">${pad(v)} — ${["Detail study", "Approach", "Close-up"][v - 1]}</figcaption></figure>`).join("")}
        </div>
      </div></section>
      <section class="cta"><div class="wrap">
        <span class="label">Next project</span>
        <h2><a href="project.html?p=${encodeURIComponent(next.slug)}">${esc(next.title)} →</a></h2>
        <a class="btn" href="portfolio.html">All projects</a>
      </div></section>`;
  }

  if (page === "journal") {
    const [first, ...rest] = posts;
    $("#feature").innerHTML = `<a class="post-feature reveal" href="post.html?p=${encodeURIComponent(first.slug)}">
      ${media(first, 0)}
      <div><div class="meta mono" style="display:flex;gap:14px;color:var(--muted)"><span class="accent">Latest · ${esc(first.category)}</span><span>${fmtDate(first.date)}</span></div>
      <h2>${esc(first.title)}</h2><p class="lead">${esc(first.excerpt)}</p><span class="btn" style="margin-top:12px">Read article <span class="arrow">→</span></span></div></a>`;
    const filters = $("#filters");
    const cats = ["All", ...new Set(rest.map((p) => p.category))];
    filters.innerHTML = cats.map((c, i) => `<button class="filter ${i === 0 ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    const draw = (cat) => {
      $("#posts").innerHTML = rest.filter((p) => cat === "All" || p.category === cat).map(postCard).join("");
      observe();
    };
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      $$(".filter", filters).forEach((x) => x.classList.toggle("active", x === b));
      draw(b.dataset.cat);
    });
    draw("All");
  }

  if (page === "post") {
    const slug = new URLSearchParams(location.search).get("p");
    const i = Math.max(0, posts.findIndex((p) => p.slug === slug));
    const p = posts[i];
    const newer = posts[i - 1], older = posts[i + 1];
    document.title = `${p.title} — Journal — Berk Nazlım`;
    $("#post").innerHTML = `
      <section class="article-hero"><div class="wrap"><div class="article">
        <a class="mono" href="journal.html" style="color:var(--muted)">← Journal</a><br><br>
        <span class="label">${esc(p.category)} · ${fmtDate(p.date)} · ${esc(p.readTime)} read</span>
        <h1>${esc(p.title)}</h1><p class="lead">${esc(p.excerpt)}</p>
      </div></div></section>
      <div class="wrap article-cover reveal">${media(p, 0)}</div>
      <div class="wrap"><article class="article">${p.body}
        <p class="mono" style="color:var(--muted);margin-top:48px;font-size:12px">— Berk Nazlım</p>
        <nav class="article-nav">
          ${older ? `<a href="post.html?p=${encodeURIComponent(older.slug)}"><span class="mono" style="color:var(--muted)">← Previous</span><h4>${esc(older.title)}</h4></a>` : "<span></span>"}
          ${newer ? `<a href="post.html?p=${encodeURIComponent(newer.slug)}"><span class="mono" style="color:var(--muted)">Next →</span><h4>${esc(newer.title)}</h4></a>` : ""}
        </nav>
      </article></div>`;
  }

  if (page === "about") {
    const portrait = $("#portrait-art");
    if (portrait) portrait.innerHTML = ART.render("tower", ["#0a0c10", "#4b6bff", "#c6ff4a"], "portrait", 1);
  }

  if (page === "contact") {
    const form = $("#contact-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const subject = `Project enquiry — ${d.get("type") || "General"} — ${d.get("name")}`;
      const body = `Name: ${d.get("name")}\nEmail: ${d.get("email")}\nCompany: ${d.get("company") || "-"}\nProject type: ${d.get("type") || "-"}\nBudget: ${d.get("budget") || "-"}\n\n${d.get("message")}`;
      location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      $("#form-status").textContent = "Opening your email app… If nothing happens, write to " + SITE.email;
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function observe() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    io = io || new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  }
  observe();

  /* ---------- Counters ---------- */
  const counters = $$("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target, target = +el.dataset.count, t0 = performance.now();
        const step = (t) => {
          const k = Math.min(1, (t - t0) / 1600);
          el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  }
})();
