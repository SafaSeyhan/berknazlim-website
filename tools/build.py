"""Generates the static HTML pages in English (site root) and Turkish (/tr/).

Run from the repository root after changing page text:

    python3 tools/build.py

Projects and journal posts are not in here: they live in assets/js/data.js
and are rendered in the browser, so editing them needs no rebuild.
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://berknazlim.com"
LINKEDIN = "https://www.linkedin.com/in/berk-nazl%C4%B1m-11b173279"
PAGES = ["index.html", "portfolio.html", "project.html", "services.html", "about.html",
         "journal.html", "post.html", "contact.html"]

S = {
    "en": {
        "nav": [("index.html", "Home"), ("portfolio.html", "Portfolio"), ("services.html", "Services"),
                ("about.html", "About"), ("journal.html", "Journal"), ("contact.html", "Contact")],
        "tagline": "Interior Architecture",
        "home_aria": "Berk Nazlım, home",
        "menu": "Menu",
        "skip": "Skip to content",
        "theme": "Switch light or dark mode",
        "cta_nav": "Start a project",
        "cta_label": "Have a project in mind?",
        "cta_title": "Let's design something <em>lasting</em> together.",
        "cta_btn": "Get in touch",
        "f_about": "Interior architecture and design from Istanbul.",
        "f_studio": "Pages", "f_contact": "Contact", "f_follow": "Follow",
        "f_start": "Start a project", "city": "Istanbul, Türkiye",
        "rights": "Berk Nazlım",
    },
    "tr": {
        "nav": [("index.html", "Ana sayfa"), ("portfolio.html", "Projeler"), ("services.html", "Hizmetler"),
                ("about.html", "Hakkında"), ("journal.html", "Günlük"), ("contact.html", "İletişim")],
        "tagline": "İç Mimarlık",
        "home_aria": "Berk Nazlım, ana sayfa",
        "menu": "Menü",
        "skip": "İçeriğe geç",
        "theme": "Açık veya koyu temaya geç",
        "cta_nav": "Proje başlat",
        "cta_label": "Aklınızda bir proje mi var?",
        "cta_title": "Birlikte <em>kalıcı</em> bir şey tasarlayalım.",
        "cta_btn": "İletişime geçin",
        "f_about": "İstanbul'dan iç mimarlık ve tasarım.",
        "f_studio": "Sayfalar", "f_contact": "İletişim", "f_follow": "Takip edin",
        "f_start": "Proje başlat", "city": "İstanbul, Türkiye",
        "rights": "Berk Nazlım",
    },
}

LOGO = ('<svg class="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">'
        '<rect x="1" y="1" width="38" height="38" stroke="currentColor" stroke-width="1.5"/>'
        '<path d="M10 31V9h20v22M10 20h20M20 9v22" stroke="currentColor" stroke-width="1.5"/></svg>')

SUN = ('<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">'
       '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>')
MOON = ('<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">'
        '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>')


def url(lang, page):
    path = "" if page == "index.html" else page
    return f"{DOMAIN}/{'tr/' if lang == 'tr' else ''}{path}"


def jsonld(lang):
    import json
    data = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Berk Nazlım " + ("İç Mimarlık" if lang == "tr" else "Interior Architecture"),
        "url": url(lang, "index.html"),
        "image": DOMAIN + "/assets/og.png",
        "email": "nazlimberk@gmail.com",
        "address": {"@type": "PostalAddress", "addressLocality": "İstanbul" if lang == "tr" else "Istanbul", "addressCountry": "TR"},
        "founder": {"@type": "Person", "name": "Berk Nazlım", "jobTitle": "İç Mimar" if lang == "tr" else "Interior Architect", "sameAs": [LINKEDIN],
                    "alumniOf": {"@type": "CollegeOrUniversity", "name": "İstanbul Teknik Üniversitesi" if lang == "tr" else "Istanbul Technical University"}},
    }
    data["logo"] = DOMAIN + "/icon-512.png"
    # WebSite lets Google show "Berk Nazlım" as the site name in search results
    site = {"@context": "https://schema.org", "@type": "WebSite", "name": "Berk Nazlım", "url": DOMAIN + "/"}
    return '<script type="application/ld+json">' + json.dumps([site, data], ensure_ascii=False) + "</script>"


def head(lang, page, title, desc):
    r = "../" if lang == "tr" else ""
    # On the English pages, visitors whose browser is set to Turkish are sent to the Turkish
    # version once, unless they have already picked a language with the EN/TR switch.
    redirect = ""
    if lang == "en":
        redirect = ("if(!localStorage.getItem('lang')&&/^tr\\b/i.test(navigator.language||''))"
                    f"{{location.replace('tr/{'' if page == 'index.html' else page}'+location.search);}}")
    return f'''<!doctype html>
<html lang="{lang}" data-root="{r}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#f3f1ec" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#141413" media="(prefers-color-scheme: dark)">
<script>(function(){{var d=document.documentElement;d.classList.add('js');setTimeout(function(){{if(!window.__siteReady)d.classList.add('no-reveal');}},2500);try{{var t=localStorage.getItem('theme');if(t)d.dataset.theme=t;{redirect}}}catch(e){{}}}})();</script>
<link rel="canonical" href="{url(lang, page)}">
<link rel="alternate" hreflang="en" href="{url('en', page)}">
<link rel="alternate" hreflang="tr" href="{url('tr', page)}">
<link rel="alternate" hreflang="x-default" href="{url('en', page)}">
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url(lang, page)}">
<meta property="og:image" content="{DOMAIN}/assets/og.png">
<meta property="og:locale" content="{'tr_TR' if lang == 'tr' else 'en_GB'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{r}favicon.ico" sizes="48x48">
<link rel="icon" href="{r}favicon.svg" type="image/svg+xml">
<link rel="icon" href="{r}favicon-96x96.png" sizes="96x96" type="image/png">
<link rel="manifest" href="{r}site.webmanifest">
<link rel="apple-touch-icon" href="{r}apple-touch-icon.png">
{jsonld(lang) if page == "index.html" else ""}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{r}assets/css/style.css">
</head>
'''


def header(lang, page):
    s = S[lang]
    other = "tr" if lang == "en" else "en"
    en_href = ("../" if lang == "tr" else "") + page
    tr_href = page if lang == "tr" else "tr/" + page
    links = "".join(f'<li><a href="{h}"{" aria-current=\"page\"" if h == page else ""}>{t}</a></li>' for h, t in s["nav"])
    mlinks = "".join(f'<li><a href="{h}"{" aria-current=\"page\"" if h == page else ""}>{t}<span>{i + 1:02d}</span></a></li>'
                     for i, (h, t) in enumerate(s["nav"]))
    return f'''<header class="site-header">
  <nav class="nav wrap" aria-label="{s["menu"]}">
    <a class="brand" href="index.html" aria-label="{s["home_aria"]}">{LOGO}<span><span class="brand-name">Berk Nazlım</span><small>{s["tagline"]}</small></span></a>
    <ul class="nav-links">{links}</ul>
    <div class="nav-tools">
      <div class="lang" role="group" aria-label="Language / Dil">
        <a href="{en_href}" data-lang="en" hreflang="en" lang="en"{' aria-current="true"' if lang == "en" else ""}>EN</a>
        <a href="{tr_href}" data-lang="tr" hreflang="tr" lang="tr"{' aria-current="true"' if lang == "tr" else ""}>TR</a>
      </div>
      <button class="icon-btn theme-toggle" type="button" aria-label="{s["theme"]}">{SUN}{MOON}</button>
      <button class="icon-btn menu-btn" type="button" aria-label="{s["menu"]}" aria-expanded="false" aria-controls="mobile-menu"><span class="bars"></span></button>
    </div>
  </nav>
</header>
<div class="mobile-menu" id="mobile-menu">
  <ul>{mlinks}</ul>
  <div class="mm-foot"><a href="mailto:nazlimberk@gmail.com">nazlimberk@gmail.com</a><br>{s["city"]}</div>
</div>
'''


def cta(lang):
    s = S[lang]
    return f'''<section class="cta"><div class="wrap cta-inner">
  <div><span class="label">{s["cta_label"]}</span><h2>{s["cta_title"]}</h2></div>
  <a class="btn btn-solid" href="contact.html">{s["cta_btn"]} <span class="arrow">→</span></a>
</div></section>
'''


def footer(lang):
    s = S[lang]
    nav = dict(s["nav"])
    return f'''<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div><a class="brand" href="index.html">{LOGO}<span><span class="brand-name">Berk Nazlım</span><small>{s["tagline"]}</small></span></a><p>{s["f_about"]}</p></div>
      <div><h5>{s["f_studio"]}</h5><ul><li><a href="portfolio.html">{nav["portfolio.html"]}</a></li><li><a href="services.html">{nav["services.html"]}</a></li><li><a href="about.html">{nav["about.html"]}</a></li><li><a href="journal.html">{nav["journal.html"]}</a></li></ul></div>
      <div><h5>{s["f_contact"]}</h5><ul><li><a href="mailto:nazlimberk@gmail.com">nazlimberk@gmail.com</a></li><li>{s["city"]}</li><li><a href="contact.html">{s["f_start"]}</a></li></ul></div>
      <div><h5>{s["f_follow"]}</h5><ul><li><a href="{LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a></li></ul></div>
    </div>
    <div class="footer-bottom mono"><span>© <span id="year">2026</span> {s["rights"]}</span><span>41.0082° N, 28.9784° E</span><span>berknazlim.com</span></div>
  </div>
</footer>
'''


def scripts(lang):
    r = "../" if lang == "tr" else ""
    return f'''<script src="{r}assets/js/data.js"></script>
<script src="{r}assets/js/art.js"></script>
<script src="{r}assets/js/main.js"></script>
</body>
</html>
'''


def write(lang, page, title, desc, slug, body, with_cta=True):
    html = (head(lang, page, title, desc) + f'<body data-page="{slug}">\n<a class="skip" href="#main">{S[lang]["skip"]}</a>\n'
            + header(lang, page) + '<main id="main">\n'
            + body + (cta(lang) if with_cta else "") + "</main>\n" + footer(lang) + scripts(lang))
    out = os.path.join(ROOT, "tr" if lang == "tr" else "", page)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as fh:
        fh.write(html)


# ==========================================================================
# Page content
# ==========================================================================

def home(lang):
    if lang == "en":
        return '''<section class="hero"><div class="wrap">
  <div class="hero-top">
    <div><span class="label">Interior architecture · Design — Istanbul</span>
    <h1>Spaces shaped by <em>material</em>, light and the people who use them.</h1></div>
    <div class="hero-side"><p>Berk Nazlım is an Istanbul-based designer and interior architect, and a 2026 graduate of Istanbul Technical University. His work moves between interiors, cultural buildings and hand-made models.</p>
    <div class="hero-actions"><a class="btn btn-solid" href="portfolio.html">View projects <span class="arrow">→</span></a><a class="btn" href="about.html">About</a></div></div>
  </div>
  <a href="project.html?p=ortakoy-dansresim" class="hero-figure"><figure><div class="media" id="hero-art"></div>
  <figcaption><span>Ortaköy DansResim, Istanbul</span><span class="mono">2025</span></figcaption></figure></a>
</div></section>

<section class="section"><div class="wrap intro">
  <div><span class="label">01 — Approach</span></div>
  <div>
    <p class="statement reveal">Good architecture reads its site, respects its city and gives something back to the people who use it.</p>
    <p class="lead reveal">Trained in the Department of Interior Architecture at ITU's Faculty of Architecture, Berk has worked on construction sites and in design offices since 2023, from a hotel lobby in Maçka to an apartment in Zeytinburnu. Each project starts from one clear idea and carries it down to the material, the furniture and the detail.</p>
    <a class="link reveal" href="about.html">More about Berk →</a>
    <div class="stats">
      <div class="stat"><div class="num">6</div><p>Selected projects</p></div>
      <div class="stat"><div class="num">5</div><p>Roles in offices and on site</p></div>
      <div class="stat"><div class="num">7</div><p>Design and rendering tools</p></div>
      <div class="stat"><div class="num">’26</div><p>ITU graduate</p></div>
    </div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">02 — Selected work</span><h2>Featured projects</h2></div><a class="link" href="portfolio.html">All projects →</a></div>
  <div class="projects-grid" id="featured"></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">03 — Services</span><h2>What I do</h2></div><a class="link" href="services.html">All services →</a></div>
  <div class="services-list">
    <div class="service reveal"><span class="n mono">01</span><h3>Interior architecture</h3><p>Homes, cafés and restaurants planned as one idea, from the layout to the materials, lighting and furniture.</p></div>
    <div class="service reveal"><span class="n mono">02</span><h3>Architectural design</h3><p>Concept and schematic design for cultural, hospitality and leisure buildings.</p></div>
    <div class="service reveal"><span class="n mono">03</span><h3>Visualisation &amp; models</h3><p>Renders, presentation drawings and physical models that show a space before it is built.</p></div>
    <div class="service reveal"><span class="n mono">04</span><h3>Site &amp; construction</h3><p>Renovation and repair work followed on site, with material and detail decisions made alongside the builders.</p></div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">04 — Journal</span><h2>News &amp; ideas in architecture</h2></div><a class="link" href="journal.html">Read the journal →</a></div>
  <div class="posts-grid" id="latest-posts"></div>
</div></section>
'''
    return '''<section class="hero"><div class="wrap">
  <div class="hero-top">
    <div><span class="label">İç mimarlık · Tasarım — İstanbul</span>
    <h1><em>Malzeme</em>, ışık ve onu kullanan insanlarla biçimlenen mekânlar.</h1></div>
    <div class="hero-side"><p>Berk Nazlım, İstanbul merkezli bir tasarımcı ve iç mimar; 2026 yılında İstanbul Teknik Üniversitesi'nden mezun oldu. Çalışmaları iç mekânlar, kültür yapıları ve elle yapılan maketler arasında ilerliyor.</p>
    <div class="hero-actions"><a class="btn btn-solid" href="portfolio.html">Projeleri gör <span class="arrow">→</span></a><a class="btn" href="about.html">Hakkında</a></div></div>
  </div>
  <a href="project.html?p=ortakoy-dansresim" class="hero-figure"><figure><div class="media" id="hero-art"></div>
  <figcaption><span>Ortaköy DansResim, İstanbul</span><span class="mono">2025</span></figcaption></figure></a>
</div></section>

<section class="section"><div class="wrap intro">
  <div><span class="label">01 — Yaklaşım</span></div>
  <div>
    <p class="statement reveal">İyi mimarlık yerini okur, kentine saygı duyar ve onu kullanan insanlara bir şey geri verir.</p>
    <p class="lead reveal">İTÜ Mimarlık Fakültesi İç Mimarlık Bölümü'nde eğitim alan Berk, 2023'ten bu yana şantiyelerde ve tasarım ofislerinde çalışıyor: Maçka'daki bir otel lobisinden Zeytinburnu'ndaki bir daireye kadar. Her proje tek ve net bir fikirle başlıyor ve bu fikri malzemeye, mobilyaya ve detaya kadar taşıyor.</p>
    <a class="link reveal" href="about.html">Berk hakkında daha fazlası →</a>
    <div class="stats">
      <div class="stat"><div class="num">6</div><p>Seçili proje</p></div>
      <div class="stat"><div class="num">5</div><p>Ofis ve şantiye deneyimi</p></div>
      <div class="stat"><div class="num">7</div><p>Tasarım ve görselleştirme aracı</p></div>
      <div class="stat"><div class="num">’26</div><p>İTÜ mezunu</p></div>
    </div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">02 — Seçili işler</span><h2>Öne çıkan projeler</h2></div><a class="link" href="portfolio.html">Tüm projeler →</a></div>
  <div class="projects-grid" id="featured"></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">03 — Hizmetler</span><h2>Neler yapıyorum</h2></div><a class="link" href="services.html">Tüm hizmetler →</a></div>
  <div class="services-list">
    <div class="service reveal"><span class="n mono">01</span><h3>İç mimarlık</h3><p>Plan kurgusundan malzemeye, aydınlatmaya ve mobilyaya kadar tek bir fikir olarak tasarlanan evler, kafeler ve restoranlar.</p></div>
    <div class="service reveal"><span class="n mono">02</span><h3>Mimari tasarım</h3><p>Kültür, ağırlama ve rekreasyon yapıları için konsept ve avan proje.</p></div>
    <div class="service reveal"><span class="n mono">03</span><h3>Görselleştirme ve maket</h3><p>Bir mekânı inşa edilmeden önce gösteren görseller, sunum çizimleri ve fiziksel maketler.</p></div>
    <div class="service reveal"><span class="n mono">04</span><h3>Şantiye ve uygulama</h3><p>Sahada takip edilen tadilat ve onarım işleri; malzeme ve detay kararları ustalarla birlikte.</p></div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">04 — Günlük</span><h2>Mimarlıkta haberler ve fikirler</h2></div><a class="link" href="journal.html">Günlüğü oku →</a></div>
  <div class="posts-grid" id="latest-posts"></div>
</div></section>
'''


def portfolio(lang):
    if lang == "en":
        return '''<section class="page-head"><div class="wrap">
  <span class="label">Portfolio</span><h1>Selected <em>work</em></h1>
  <p class="lead">Academic and freelance work: a cultural centre, cafés and restaurants, a waterfront and a family home, around Istanbul and Çanakkale.</p>
</div></section>
<section class="section"><div class="wrap">
  <div class="filters" id="filters" role="group" aria-label="Filter projects"></div>
  <div class="projects-grid" id="projects"></div>
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">Index</span><h2>All projects</h2></div></div>
  <div class="index-row index-head label"><span>No.</span><span>Project</span><span>Location</span><span>Typology</span><span class="y">Year</span></div>
  <div class="index-list" id="index-list"></div>
</div></section>
'''
    return '''<section class="page-head"><div class="wrap">
  <span class="label">Projeler</span><h1>Seçili <em>işler</em></h1>
  <p class="lead">Akademik ve serbest çalışmalar: bir kültür merkezi, kafe ve restoranlar, bir kıyı projesi ve bir aile evi; İstanbul ve Çanakkale'de.</p>
</div></section>
<section class="section"><div class="wrap">
  <div class="filters" id="filters" role="group" aria-label="Projeleri filtrele"></div>
  <div class="projects-grid" id="projects"></div>
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">Dizin</span><h2>Tüm projeler</h2></div></div>
  <div class="index-row index-head label"><span>No</span><span>Proje</span><span>Konum</span><span>Tipoloji</span><span class="y">Yıl</span></div>
  <div class="index-list" id="index-list"></div>
</div></section>
'''


SERVICES = {
    "en": [
        ("Interior architecture", "Homes, cafés and restaurants designed as one idea: space planning, materials, lighting and furniture made for the space.",
         ["Space planning", "Material palettes", "Lighting", "Custom furniture and joinery"]),
        ("Architectural design", "Concept and schematic design for cultural, hospitality and leisure buildings, worked out in plan, section and model.",
         ["Concept design", "Schematic design", "Plans and sections", "Presentation drawings"]),
        ("Visualisation & models", "Renders and physical models that let clients see and feel a space before it is built.",
         ["3ds Max + Corona renders", "Lumion and SketchUp", "Physical models", "Hand sketches"]),
        ("Site & construction", "Renovation and repair work followed on site, coordinating builders, schedules and finishes.",
         ["Site management", "Renovation", "Contractor coordination", "Quality checks"]),
        ("Materials & details", "Advice on materials, paving and finishes, with detail drawings that solve problems on site.",
         ["Material selection", "Stone and paving", "Detail drawings", "Investor-side design review"]),
    ],
    "tr": [
        ("İç mimarlık", "Tek bir fikir olarak tasarlanan evler, kafeler ve restoranlar: mekân kurgusu, malzeme, aydınlatma ve mekâna özel mobilya.",
         ["Mekân planlama", "Malzeme paleti", "Aydınlatma", "Özel mobilya ve doğrama"]),
        ("Mimari tasarım", "Kültür, ağırlama ve rekreasyon yapıları için plan, kesit ve maketle geliştirilen konsept ve avan proje.",
         ["Konsept tasarım", "Avan proje", "Plan ve kesitler", "Sunum çizimleri"]),
        ("Görselleştirme ve maket", "Bir mekânı inşa edilmeden önce görmeyi ve hissetmeyi sağlayan görseller ve fiziksel maketler.",
         ["3ds Max + Corona görselleri", "Lumion ve SketchUp", "Fiziksel maket", "Elle eskiz"]),
        ("Şantiye ve uygulama", "Sahada takip edilen tadilat ve onarım işleri; ustaların, iş programının ve ince işlerin koordinasyonu.",
         ["Şantiye yönetimi", "Tadilat", "Yüklenici koordinasyonu", "Kalite kontrol"]),
        ("Malzeme ve detay", "Malzeme, zemin kaplaması ve ince işler üzerine danışmanlık; sahadaki sorunları çözen detay çizimleri.",
         ["Malzeme seçimi", "Taş ve zemin kaplaması", "Detay çizimleri", "Yatırımcı tarafında tasarım değerlendirmesi"]),
    ],
}
PROCESS = {
    "en": [("Listen", "Site visit, brief, budget and ambitions. We agree on what success looks like."),
           ("Explore", "Sketches, models and analysis to test several directions quickly."),
           ("Refine", "One direction developed in detail: plans, materials, structure and cost."),
           ("Build", "Drawings, material choices and close follow-up on site until handover.")],
    "tr": [("Dinlemek", "Arazi ziyareti, ihtiyaç programı, bütçe ve hedefler. Başarının ne olduğunu birlikte tanımlarız."),
           ("Keşfetmek", "Birkaç yönü hızla denemek için eskizler, maketler ve analizler."),
           ("Geliştirmek", "Seçilen yönün ayrıntılı geliştirilmesi: planlar, malzeme, taşıyıcı sistem ve maliyet."),
           ("İnşa etmek", "Çizimler, malzeme kararları ve teslimata kadar şantiyede yakın takip.")],
}


def services(lang):
    rows = "".join(
        f'<div class="service reveal"><span class="n mono">{i + 1:02d}</span><h3>{t}</h3><div><p>{d}</p><ul>{"".join(f"<li>{x}</li>" for x in items)}</ul></div></div>'
        for i, (t, d, items) in enumerate(SERVICES[lang]))
    steps = "".join(f'<div class="step reveal"><span class="n">{i + 1:02d}</span><h4>{t}</h4><p>{d}</p></div>'
                    for i, (t, d) in enumerate(PROCESS[lang]))
    if lang == "en":
        return f'''<section class="page-head"><div class="wrap">
  <span class="label">Services</span><h1>From first sketch to <em>finished</em> space</h1>
  <p class="lead">A complete design service, or exactly the part you need. Every project is handled personally by Berk.</p>
</div></section>
<section class="section"><div class="wrap"><div class="services-list">{rows}</div></div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">Process</span><h2>How we work together</h2></div><p class="lead">Clear stages, clear deliverables and one point of contact from first sketch to handover.</p></div>
  <div class="process">{steps}</div>
</div></section>
'''
    return f'''<section class="page-head"><div class="wrap">
  <span class="label">Hizmetler</span><h1>İlk eskizden <em>tamamlanmış</em> mekâna</h1>
  <p class="lead">Eksiksiz bir tasarım hizmeti ya da tam ihtiyacınız olan kısım. Her proje bizzat Berk tarafından yürütülür.</p>
</div></section>
<section class="section"><div class="wrap"><div class="services-list">{rows}</div></div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">Süreç</span><h2>Birlikte nasıl çalışıyoruz</h2></div><p class="lead">Net aşamalar, net çıktılar ve ilk eskizden teslime kadar tek bir muhatap.</p></div>
  <div class="process">{steps}</div>
</div></section>
'''


ABOUT = {
    "en": {
        "label": "About", "title": "Berk <em>Nazlım</em>",
        "lead": "Designer and interior architect. Istanbul Technical University, Faculty of Architecture, Department of Interior Architecture, class of 2026.",
        "caption": ("Berk Nazlım", "Istanbul"),
        "statement": "I design spaces that belong to their place and to the people who use them.",
        "bio": [
            "I am an Istanbul-based designer and interior architect, born in 1999. I studied in the Department of Interior Architecture at Istanbul Technical University's Faculty of Architecture.",
            "At ITU I learned to draw by hand, to think in section and to test ideas with physical models, often built from the same materials as the real thing: bamboo and walnut for a book café, cardboard and wood for a hillside retreat.",
            "Alongside my studies I have worked on construction sites and in design offices: managing repairs in a hotel lobby, making material decisions for international hotel brands, planning stone paving for a shopping mall and designing a family apartment from start to finish. I enjoy the whole path, from the first concept to the last brass inlay.",
        ],
        "path": "Experience",
        "timeline": [("2026", "Interior Architecture degree, Istanbul Technical University", "Faculty of Architecture, Department of Interior Architecture."),
                     ("2025", "Freelance interior designer", "Interior of a residential apartment in YediMavi, Zeytinburnu, for a married couple."),
                     ("2025", "Intern, Topaz Construction", "Construction site of the second phase of the 5. Levent projects."),
                     ("2024", "Advisor and schematic designer, Legra Design", "Planned stone paving to correct ground irregularities left by rough-construction errors at a shopping mall in Tersane İstanbul, Haliç."),
                     ("2023", "Intern, Carimond Invest, Design Office", "Hotel investment and construction for global brands; design and material decisions on the investor's side."),
                     ("2023", "Site manager, The Wall Architecture", "Repair and painting of the lobby and service areas of the Swissôtel The Bosphorus in Maçka.")],
        "tools": "Tools",
        "toollist": ["Hand drawing", "Model making", "AutoCAD", "3ds Max", "Corona", "SketchUp", "Lumion", "Adobe", "Microsoft Office"],
        "values_label": "Principles", "values_title": "What guides the work",
        "values": [("Context first", "Every site has a history, a climate and a community. Good design starts by listening to all three."),
                   ("Material honesty", "Natural, local materials, used where they perform best, age well and make a space feel calm."),
                   ("Down to the detail", "A strong idea only works if it survives to the last joint, handle and inlay. That is where I spend my time.")],
    },
    "tr": {
        "label": "Hakkında", "title": "Berk <em>Nazlım</em>",
        "lead": "Tasarımcı ve iç mimar. İstanbul Teknik Üniversitesi, Mimarlık Fakültesi, İç Mimarlık Bölümü, 2026 mezunu.",
        "caption": ("Berk Nazlım", "İstanbul"),
        "statement": "Yerine ve onu kullanan insanlara ait mekânlar tasarlıyorum.",
        "bio": [
            "1999 doğumlu, İstanbul merkezli bir tasarımcı ve iç mimarım. İstanbul Teknik Üniversitesi Mimarlık Fakültesi İç Mimarlık Bölümü'nde okudum.",
            "İTÜ'de elle çizmeyi, kesitle düşünmeyi ve fikirleri fiziksel maketlerle denemeyi öğrendim; çoğu zaman gerçeğiyle aynı malzemeleri kullanarak: bir kitap kafe için bambu ve ceviz, bir yamaç projesi için karton ve ahşap.",
            "Eğitimim boyunca şantiyelerde ve tasarım ofislerinde çalıştım: bir otel lobisindeki onarımları yönettim, uluslararası otel markaları için malzeme kararlarında yer aldım, bir alışveriş merkezi için taş kaplama planladım ve bir aile dairesini baştan sona tasarladım. İlk konseptten son pirinç kakmaya kadar bütün yolu seviyorum.",
        ],
        "path": "Deneyim",
        "timeline": [("2026", "İç Mimarlık lisansı, İstanbul Teknik Üniversitesi", "Mimarlık Fakültesi, İç Mimarlık Bölümü."),
                     ("2025", "Serbest iç mimar", "Zeytinburnu YediMavi'de evli bir çift için konut dairesi iç mimari projesi."),
                     ("2025", "Stajyer, Topaz İnşaat", "5. Levent projelerinin ikinci etap şantiyesi."),
                     ("2024", "Danışman ve avan proje tasarımcısı, Legra Design", "Tersane İstanbul, Haliç'teki bir alışveriş merkezinde kaba inşaat hatalarından kaynaklanan zemin bozukluklarını gidermek için taş kaplama planlaması."),
                     ("2023", "Stajyer, Carimond Invest Tasarım Ofisi", "Global markalar için otel yatırımları ve inşaatı; yatırımcı tarafında tasarım ve malzeme kararları."),
                     ("2023", "Şantiye sorumlusu, The Wall Architecture", "Maçka'daki Swissôtel The Bosphorus'un lobi ve servis alanlarının onarımı ve boyası.")],
        "tools": "Araçlar",
        "toollist": ["Elle çizim", "Maket", "AutoCAD", "3ds Max", "Corona", "SketchUp", "Lumion", "Adobe", "Microsoft Office"],
        "values_label": "İlkeler", "values_title": "İşe yön veren ilkeler",
        "values": [("Önce bağlam", "Her arazinin bir tarihi, bir iklimi ve bir topluluğu vardır. İyi tasarım üçünü de dinleyerek başlar."),
                   ("Dürüst malzeme", "En iyi çalıştıkları yerde kullanılan doğal ve yerel malzemeler iyi yaşlanır ve mekâna huzur verir."),
                   ("Detaya kadar", "Güçlü bir fikir ancak son birleşime, kulpa ve kakmaya kadar korunursa işe yarar. Zamanımı orada geçiriyorum.")],
    },
}


def about(lang):
    a = ABOUT[lang]
    bio = "".join(f"<p>{p}</p>" for p in a["bio"])
    tl = "".join(f'<div class="tl"><span class="y mono">{y}</span><div><h4>{t}</h4><p>{d}</p></div></div>' for y, t, d in a["timeline"])
    vals = "".join(f'<div class="value reveal"><span class="n mono">{i + 1:02d}</span><h4>{t}</h4><p>{d}</p></div>' for i, (t, d) in enumerate(a["values"]))
    return f'''<section class="page-head"><div class="wrap">
  <span class="label">{a["label"]}</span><h1>{a["title"]}</h1><p class="lead">{a["lead"]}</p>
</div></section>
<section class="section"><div class="wrap about-grid">
  <figure class="portrait"><div class="media" id="portrait-art"><img src="{"../" if lang == "tr" else ""}assets/img/berk-nazlim.jpg" alt="Berk Nazlım" width="526" height="536"></div><figcaption><span>{a["caption"][0]}</span><span class="mono">{a["caption"][1]}</span></figcaption></figure>
  <div>
    <p class="statement">{a["statement"]}</p>
    <div class="lead" style="max-width:none">{bio}</div>
    <div class="block"><span class="label">{a["path"]}</span><div class="timeline">{tl}</div></div>
    <div class="block"><span class="label">{a["tools"]}</span><div class="tags">{"".join(f"<span>{x}</span>" for x in a["toollist"])}</div></div>
  </div>
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">{a["values_label"]}</span><h2>{a["values_title"]}</h2></div></div>
  <div class="values">{vals}</div>
</div></section>
'''


def journal(lang):
    if lang == "en":
        return '''<section class="page-head"><div class="wrap">
  <span class="label">Journal</span><h1>News &amp; <em>ideas</em></h1>
  <p class="lead">The latest in architecture: materials, technology, cities and notes on my own work.</p>
</div></section>
<section class="section"><div class="wrap">
  <div id="feature"></div>
  <div class="filters" id="filters" role="group" aria-label="Filter articles"></div>
  <div class="posts-grid" id="posts"></div>
</div></section>
'''
    return '''<section class="page-head"><div class="wrap">
  <span class="label">Günlük</span><h1>Haberler ve <em>fikirler</em></h1>
  <p class="lead">Mimarlıkta son gelişmeler: malzeme, teknoloji, kentler ve kendi çalışmalarımdan notlar.</p>
</div></section>
<section class="section"><div class="wrap">
  <div id="feature"></div>
  <div class="filters" id="filters" role="group" aria-label="Yazıları filtrele"></div>
  <div class="posts-grid" id="posts"></div>
</div></section>
'''


CONTACT = {
    "en": {
        "label": "Contact", "title": "Let's <em>talk</em>",
        "lead": "Interiors, renovations, collaborations or a job opportunity. Tell me about your project and I'll reply within two working days.",
        "email": "Email", "studio": "Based in", "hours": "Hours", "hours_v": "Mon – Fri, 09:00 – 18:00 (GMT+3)", "social": "Social",
        "name": "Name", "mail": "Email", "company": "Company (optional)", "type": "Project type",
        "types": ["Residential", "Interior", "Hospitality", "Collaboration", "Other"],
        "budget": "Estimated budget", "select": "Select…",
        "budgets": ["Under €100k", "€100k – €500k", "€500k – €2M", "Over €2M", "Not sure yet"],
        "message": "About the project", "send": "Send message",
    },
    "tr": {
        "label": "İletişim", "title": "Hadi <em>konuşalım</em>",
        "lead": "İç mekânlar, tadilatlar, iş birlikleri ya da bir iş fırsatı. Projenizden bahsedin, iki iş günü içinde yanıt vereyim.",
        "email": "E-posta", "studio": "Konum", "hours": "Çalışma saatleri", "hours_v": "Pzt – Cum, 09:00 – 18:00", "social": "Sosyal medya",
        "name": "Ad soyad", "mail": "E-posta", "company": "Firma (isteğe bağlı)", "type": "Proje türü",
        "types": ["Konut", "İç mimarlık", "Ağırlama", "İş birliği", "Diğer"],
        "budget": "Tahmini bütçe", "select": "Seçin…",
        "budgets": ["1 milyon ₺ altı", "1 – 5 milyon ₺", "5 – 20 milyon ₺", "20 milyon ₺ üzeri", "Henüz bilmiyorum"],
        "message": "Proje hakkında", "send": "Mesaj gönder",
    },
}


def contact(lang):
    c = CONTACT[lang]
    chips = "".join(f'<input type="radio" id="t{i}" name="type" value="{t}"><label for="t{i}">{t}</label>' for i, t in enumerate(c["types"]))
    opts = "".join(f"<option>{b}</option>" for b in c["budgets"])
    city = S[lang]["city"]
    return f'''<section class="page-head"><div class="wrap">
  <span class="label">{c["label"]}</span><h1>{c["title"]}</h1><p class="lead">{c["lead"]}</p>
</div></section>
<section class="section"><div class="wrap contact-grid">
  <div class="contact-info"><dl>
    <div><dt class="label">{c["email"]}</dt><dd><a href="mailto:nazlimberk@gmail.com">nazlimberk@gmail.com</a></dd></div>
    <div><dt class="label">{c["studio"]}</dt><dd>{city}</dd></div>
    <div><dt class="label">{c["hours"]}</dt><dd>{c["hours_v"]}</dd></div>
    <div><dt class="label">{c["social"]}</dt><dd><a href="{LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a></dd></div>
  </dl></div>
  <form id="contact-form">
    <div class="form-row">
      <div class="field"><label class="label" for="name">{c["name"]} *</label><input id="name" name="name" required autocomplete="name"></div>
      <div class="field"><label class="label" for="email">{c["mail"]} *</label><input id="email" name="email" type="email" required autocomplete="email"></div>
    </div>
    <div class="field"><label class="label" for="company">{c["company"]}</label><input id="company" name="company" autocomplete="organization"></div>
    <fieldset class="field" style="border:0;padding:0;margin:0 0 26px"><legend class="label flabel" style="margin-bottom:10px;padding:0">{c["type"]}</legend><div class="chips">{chips}</div></fieldset>
    <div class="field"><label class="label" for="budget">{c["budget"]}</label><select id="budget" name="budget"><option value="">{c["select"]}</option>{opts}</select></div>
    <div class="field"><label class="label" for="message">{c["message"]} *</label><textarea id="message" name="message" required></textarea></div>
    <button class="btn btn-solid" type="submit">{c["send"]} <span class="arrow">→</span></button>
    <p class="form-note" id="form-status" aria-live="polite"></p>
  </form>
</div></section>
'''


META = {
    "en": {
        "index.html": ("Berk Nazlım — Interior Architect, Istanbul", "Berk Nazlım is an Istanbul-based designer and interior architect, ITU class of 2026."),
        "portfolio.html": ("Portfolio — Berk Nazlım", "Selected projects by Berk Nazlım: a cultural centre, cafés and restaurants, a waterfront and a family home."),
        "project.html": ("Project — Berk Nazlım", "A project by Berk Nazlım."),
        "services.html": ("Services — Berk Nazlım", "Interior architecture, architectural design, visualisation and models, site work and material advice."),
        "about.html": ("About — Berk Nazlım", "Berk Nazlım is a designer and interior architect from Istanbul and a 2026 graduate of Istanbul Technical University."),
        "journal.html": ("Journal — Berk Nazlım", "News and essays on architecture, materials, technology and cities."),
        "post.html": ("Journal — Berk Nazlım", "An article from the Berk Nazlım journal."),
        "contact.html": ("Contact — Berk Nazlım", "Contact Berk Nazlım in Istanbul about a new project."),
    },
    "tr": {
        "index.html": ("Berk Nazlım — İç Mimar, İstanbul", "Berk Nazlım, İstanbul merkezli bir tasarımcı ve iç mimar, İTÜ 2026 mezunu."),
        "portfolio.html": ("Projeler — Berk Nazlım", "Berk Nazlım'ın seçili projeleri: bir kültür merkezi, kafe ve restoranlar, bir kıyı projesi ve bir aile evi."),
        "project.html": ("Proje — Berk Nazlım", "Berk Nazlım'ın bir projesi."),
        "services.html": ("Hizmetler — Berk Nazlım", "İç mimarlık, mimari tasarım, görselleştirme ve maket, şantiye ve malzeme danışmanlığı."),
        "about.html": ("Hakkında — Berk Nazlım", "Berk Nazlım, İstanbullu bir tasarımcı ve iç mimar, İstanbul Teknik Üniversitesi 2026 mezunu."),
        "journal.html": ("Günlük — Berk Nazlım", "Mimarlık, malzeme, teknoloji ve kentler üzerine haberler ve yazılar."),
        "post.html": ("Günlük — Berk Nazlım", "Berk Nazlım günlüğünden bir yazı."),
        "contact.html": ("İletişim — Berk Nazlım", "Yeni bir proje için İstanbul'daki Berk Nazlım ile iletişime geçin."),
    },
}

BODIES = {
    "index.html": ("home", home, True),
    "portfolio.html": ("portfolio", portfolio, True),
    "project.html": ("project", lambda l: '<div id="project"></div>\n', False),
    "services.html": ("services", services, True),
    "about.html": ("about", about, True),
    "journal.html": ("journal", journal, True),
    "post.html": ("post", lambda l: '<div id="post"></div>\n', True),
    "contact.html": ("contact", contact, False),
}

for lang in ("en", "tr"):
    for page in PAGES:
        slug, fn, with_cta = BODIES[page]
        title, desc = META[lang][page]
        write(lang, page, title, desc, slug, fn(lang), with_cta)

# 404 page (GitHub Pages serves it for any unknown URL, so links are absolute)
nf = head("en", "index.html", "Page not found — Berk Nazlım", "Page not found.").replace(
    "if(!localStorage", "if(false&&!localStorage")
nf = nf.replace('href="favicon', 'href="/favicon').replace('href="site.webmanifest', 'href="/site.webmanifest').replace('href="assets/', 'href="/assets/').replace('href="apple-touch', 'href="/apple-touch')
nf = "\n".join(l for l in nf.split("\n") if not l.startswith(('<link rel="canonical"', '<link rel="alternate"', '<script type="application/ld+json"', '<meta property="og:url"')))
nf = nf.replace('<meta name="color-scheme"', '<meta name="robots" content="noindex">\n<meta name="color-scheme"')
nf += '''<body data-page="404"><main><section class="notfound"><div class="wrap">
  <h1>404</h1>
  <p class="lead" style="margin:0 auto 12px">This page hasn't been built yet.</p>
  <p class="lead" style="margin:0 auto 32px" lang="tr">Bu sayfa henüz inşa edilmedi.</p>
  <a class="btn btn-solid" href="/">Home / Ana sayfa →</a>
</div></section></main></body></html>
'''
with open(os.path.join(ROOT, "404.html"), "w", encoding="utf-8") as fh:
    fh.write(nf)

with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8") as fh:
    fh.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n')
    for page in ["index.html", "portfolio.html", "services.html", "about.html", "journal.html", "contact.html"]:
        for lang in ("en", "tr"):
            fh.write(f'  <url><loc>{url(lang, page)}</loc>'
                     f'<xhtml:link rel="alternate" hreflang="en" href="{url("en", page)}"/>'
                     f'<xhtml:link rel="alternate" hreflang="tr" href="{url("tr", page)}"/></url>\n')
    import re
    data = open(os.path.join(ROOT, "assets", "js", "data.js"), encoding="utf-8").read()
    projects_js, posts_js = data.split("window.POSTS")
    for page, block in (("project.html", projects_js), ("post.html", posts_js)):
        for slug in re.findall(r'^    slug: "([^"]+)"', block, re.M):
            for lang in ("en", "tr"):
                q = "?p=" + slug
                fh.write(f'  <url><loc>{url(lang, page)}{q}</loc>'
                         f'<xhtml:link rel="alternate" hreflang="en" href="{url("en", page)}{q}"/>'
                         f'<xhtml:link rel="alternate" hreflang="tr" href="{url("tr", page)}{q}"/></url>\n')
    fh.write("</urlset>\n")

print("Built", len(PAGES) * 2 + 1, "pages")
