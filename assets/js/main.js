/* ==========================================================================
   Berk Nazlım — site behaviour
   ========================================================================== */

(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const root = document.documentElement;
  const lang = root.lang === "tr" ? "tr" : "en";
  const base = root.dataset.root || "";
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  const UI = {
    en: {
      all: "All", overview: "Overview", location: "Location", year: "Year", typology: "Typology", area: "Area",
      client: "Client", status: "Context", next: "Next project", allProjects: "All projects", latest: "Latest",
      read: "Read article", back: "Journal", prev: "Previous", nextPost: "Next", readTime: "read",
      context: "Context", opening: "Opening your email app… If nothing happens, write to ",
      subject: "Project enquiry", name: "Name", email: "Email", company: "Company", type: "Project type", budget: "Budget",
      toLight: "Switch to light mode", toDark: "Switch to dark mode",
    },
    tr: {
      all: "Tümü", overview: "Genel bakış", location: "Konum", year: "Yıl", typology: "Tipoloji", area: "Alan",
      client: "İşveren", status: "Bağlam", next: "Sonraki proje", allProjects: "Tüm projeler", latest: "En yeni",
      read: "Yazıyı oku", back: "Günlük", prev: "Önceki", nextPost: "Sonraki", readTime: "okuma",
      context: "Bağlam", opening: "E-posta uygulamanız açılıyor… Açılmazsa şu adrese yazın: ",
      subject: "Proje talebi", name: "Ad", email: "E-posta", company: "Firma", type: "Proje türü", budget: "Bütçe",
      toLight: "Açık temaya geç", toDark: "Koyu temaya geç",
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
  // home page: the photo drawn as a line drawing (NN-line.webp + NN-tone.webp masks from tools/sketch.py),
  // coloured by the theme like the journal illustrations; the photo shows through on hover
  function drawing(path, alt, sizes, eager) {
    // absolute URL: a relative url() inside a custom property would resolve against style.css
    const m = (k) => `url('${new URL(src(path.replace(/\.jpe?g$/i, `-${k}.webp`)), location.href).href}')`;
    return `<div class="sketch" role="img" aria-label="${esc(alt)}" style="--tone:${m("tone")};--line:${m("line")}"><i class="tone"></i><i class="line"></i></div>`
      + picture(path, "", sizes, eager).replace("<img ", '<img aria-hidden="true" ');
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
    $$('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", current() === "dark" ? "#141413" : "#f3f1ec"));
  };
  if (themeBtn) {
    labelTheme();
    themeBtn.addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      // choosing the same as the device setting goes back to following the device
      if (next === (mq.matches ? "dark" : "light")) {
        delete root.dataset.theme;
        try { localStorage.removeItem("theme"); } catch (e) {}
      } else {
        root.dataset.theme = next;
        store.set("theme", next);
      }
      labelTheme();
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
    // lock page scroll on <html>: locking <body> would turn it into a scroll container and unstick the header
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

  /* ---------- Page renderers ---------- */
  let io;
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

  function projectCard(p, i, cls, drawn) {
    const sizes = cls === "wide" ? "(max-width: 820px) 100vw, 1300px" : "(max-width: 820px) 100vw, 50vw";
    return `<a class="project-card reveal ${cls || ""}" href="${projectUrl(p)}">
      ${drawn && p.image ? `<div class="media drawn">${drawing(p.image, p.title, sizes)}</div>` : media(p, 0, "", sizes)}
      <div class="project-info"><span class="n mono">${pad(i + 1)}</span><h3>${esc(p.title)}</h3><span class="meta">${esc(p.year || "")}</span></div>
      <div class="project-sub">${esc(p.location)} · ${esc(p.category)}</div></a>`;
  }

  function postCard(p) {
    return `<a class="post-card reveal" href="${postUrl(p)}">
      ${media(p, 1)}
      <div class="post-meta mono"><span class="cat">${esc(p.category)}</span><span>${fmtDate(p.date)}</span></div>
      <h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p></a>`;
  }

  if (page === "home") {
    const hero = $("#hero-art"), lead = projects.find((p) => p.hero) || projects[0];
    if (hero && lead) { hero.classList.add("drawn"); hero.innerHTML = drawing(lead.hero || lead.image, lead.title, "100vw"); }
    const feat = projects.filter((p) => p.featured).slice(0, 3);
    $("#featured").innerHTML = feat.map((p, i) => projectCard(p, i, ["wide", "narrow", ""][i], true)).join("");
    $("#latest-posts").innerHTML = posts.slice(0, 3).map(postCard).join("");
  }

  if (page === "portfolio") {
    const grid = $("#projects"), filters = $("#filters");
    const cats = [UI.all, ...new Set(projects.map((p) => p.category))];
    const count = (c) => (c === UI.all ? projects.length : projects.filter((p) => p.category === c).length);
    filters.innerHTML = cats.map((c, i) => `<button type="button" class="filter ${i ? "" : "active"}" data-cat="${esc(c)}" aria-pressed="${!i}">${esc(c)}<sup>${pad(count(c))}</sup></button>`).join("");
    const layout = ["wide", "", "", "narrow", "", "wide"];
    const draw = (cat) => {
      const all = cat === UI.all;
      grid.innerHTML = projects.filter((p) => all || p.category === cat).map((p, i) => projectCard(p, i, all ? layout[i % layout.length] : "")).join("");
      observe();
    };
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      $$(".filter", filters).forEach((x) => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", String(x === b)); });
      draw(b.dataset.cat);
    });
    draw(UI.all);
    $("#index-list").innerHTML = projects.slice().sort((a, b) => (b.year || 0) - (a.year || 0))
      .map((p, i) => `<a class="index-row" href="${projectUrl(p)}"><span class="mono">${pad(i + 1)}</span><span class="t">${esc(p.title)}</span><span class="c">${esc(p.location)}</span><span class="c">${esc(p.category)}</span><span class="y mono">${esc(p.year || "—")}</span></a>`)
      .join("");
  }

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
        <span class="label">${[p.category, p.year].filter(Boolean).map(esc).join(" · ")}</span>
        <h1>${esc(p.title)}</h1>
      </div></section>
      <div class="wrap pd-cover">${media(p, 0, "", "(max-width: 1400px) 100vw, 1400px", true)}</div>
      <div class="wrap"><dl class="pd-facts">
        ${facts.map(([k, v]) => `<div><dt class="label">${k}</dt><dd>${esc(v)}</dd></div>`).join("")}
      </dl></div>
      <section class="section"><div class="wrap">
        <div class="pd-body">
          <div class="reveal"><span class="label">${UI.overview}</span>
            <p class="statement" style="margin-top:16px">${esc(p.summary)}</p>
            ${p.awards && p.awards.length ? `<div class="pd-awards">${p.awards.map((a) => `<span>${esc(a)}</span>`).join("")}</div>` : ""}
          </div>
          <div class="reveal">${p.body.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
        </div>
        ${shotsList.length ? `<div class="pd-gallery">
          ${shotsList.map((g, i) => `<figure class="reveal${g.wide ? " span" : ""}"><div class="media">${picture(g.src, g[lang] || g.en || p.title, g.wide ? "(max-width: 1400px) 100vw, 1400px" : "(max-width: 820px) 100vw, 50vw")}</div><figcaption><span>${esc(g[lang] || g.en || "")}</span><span class="mono">${pad(i + 1)}</span></figcaption></figure>`).join("")}
        </div>` : ""}
      </div></section>
      <section class="cta"><div class="wrap cta-inner">
        <div><span class="label">${UI.next}</span><h2><a href="${projectUrl(next)}">${esc(next.title)}</a></h2></div>
        <a class="btn" href="portfolio.html">${UI.allProjects} <span class="arrow">→</span></a>
      </div></section>`;
  }

  if (page === "journal") {
    const [first, ...rest] = posts;
    $("#feature").innerHTML = `<a class="post-feature reveal" href="${postUrl(first)}">
      ${media(first, 0)}
      <div><div class="post-meta mono"><span class="cat">${UI.latest} · ${esc(first.category)}</span><span>${fmtDate(first.date)}</span></div>
      <h2>${esc(first.title)}</h2><p class="lead">${esc(first.excerpt)}</p><span class="link">${UI.read} →</span></div></a>`;
    const filters = $("#filters");
    const cats = [UI.all, ...new Set(rest.map((p) => p.category))];
    filters.innerHTML = cats.map((c, i) => `<button type="button" class="filter ${i ? "" : "active"}" data-cat="${esc(c)}" aria-pressed="${!i}">${esc(c)}</button>`).join("");
    const draw = (cat) => {
      $("#posts").innerHTML = rest.filter((p) => cat === UI.all || p.category === cat).map(postCard).join("");
      observe();
    };
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      $$(".filter", filters).forEach((x) => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", String(x === b)); });
      draw(b.dataset.cat);
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
      <section class="article-head"><div class="wrap"><div class="article">
        <a class="back" href="journal.html">← ${UI.back}</a>
        <div class="post-meta mono" style="margin-top:28px"><span class="cat">${esc(p.category)}</span><span>${fmtDate(p.date)}</span><span>${esc(p.readTime)} ${UI.readTime}</span></div>
        <h1>${esc(p.title)}</h1><p class="lead">${esc(p.excerpt)}</p>
      </div></div></section>
      <div class="wrap article-cover">${media(p, 0)}</div>
      <div class="wrap"><article class="article">${p.body}
        <p class="mono" style="color:var(--muted);margin-top:40px">— Berk Nazlım</p>
        <nav class="article-nav">
          ${older ? `<a href="${postUrl(older)}"><span class="label">← ${UI.prev}</span><h4>${esc(older.title)}</h4></a>` : "<span></span>"}
          ${newer ? `<a href="${postUrl(newer)}"><span class="label">${UI.nextPost} →</span><h4>${esc(newer.title)}</h4></a>` : ""}
        </nav>
      </article></div>`;
  }

  if (page === "about") {
    const art = $("#portrait-art");
    if (art && !art.querySelector("img")) art.innerHTML = ART.render("house", "portrait", 1);
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
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  }
  observe();

  /* ---------- Drawings: on touch screens, turn into the photo once fully in view ---------- */
  const drawn = $$(".media.drawn");
  if (drawn.length && "IntersectionObserver" in window && !matchMedia("(hover: hover)").matches) {
    const dio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        // photo only while the whole image is on screen; drawing as soon as any part is cut off
        en.target.classList.toggle("photo", en.intersectionRatio >= 0.98);
      });
    }, { threshold: [0, 0.98] });
    drawn.forEach((el) => dio.observe(el));
  }
  window.__siteReady = true;
})();
