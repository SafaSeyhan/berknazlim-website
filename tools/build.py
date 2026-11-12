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
EMAIL = "nazlimberk@gmail.com"
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
        "cta_title": "Let's design something lasting together.",
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
        "cta_title": "Birlikte kalıcı bir şey tasarlayalım.",
        "cta_btn": "İletişime geçin",
        "f_about": "İstanbul'dan iç mimarlık ve tasarım.",
        "f_studio": "Sayfalar", "f_contact": "İletişim", "f_follow": "Takip edin",
        "f_start": "Proje başlat", "city": "İstanbul, Türkiye",
        "rights": "Berk Nazlım",
    },
}

# Short interface texts added with the animated rebuild
X = {
    "en": {
        "kicker": "Berk Nazlım, interior architect, Istanbul",
        "see_projects": "View projects", "about_berk": "About Berk",
        "hint_drag": "Drag the model to turn it", "hint_scroll": "Scroll to take it apart",
        "approach": "Approach", "more": "More about Berk",
        "work": "Featured projects", "all": "All projects", "walk_hint": "Keep scrolling to walk through",
        "journal": "News and ideas in architecture", "read_journal": "Read the journal",
        "model_alt": "A turning 3D model of a building: two concrete walls with a glass stair between them, floors, a roof and people.",
    },
    "tr": {
        "kicker": "Berk Nazlım, iç mimar, İstanbul",
        "see_projects": "Projeleri gör", "about_berk": "Berk hakkında",
        "hint_drag": "Modeli çevirmek için sürükleyin", "hint_scroll": "Parçalarına ayırmak için kaydırın",
        "approach": "Yaklaşım", "more": "Berk hakkında daha fazlası",
        "work": "Öne çıkan projeler", "all": "Tüm projeler", "walk_hint": "İçinden yürümek için kaydırmaya devam edin",
        "journal": "Mimarlıkta haberler ve fikirler", "read_journal": "Günlüğü oku",
        "model_alt": "Dönen üç boyutlu bir yapı modeli: aralarında cam merdiven bulunan iki beton duvar, katlar, çatı ve insanlar.",
    },
}

LOGO = ('<svg class="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">'
        '<rect x="1" y="1" width="38" height="38" stroke="currentColor" stroke-width="1.5"/>'
        '<path d="M10 31V9h20v22M10 20h20M20 9v22" stroke="currentColor" stroke-width="1.5"/></svg>')

SUN = ('<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">'
       '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></svg>')
MOON = ('<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">'
        '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>')
ARROW = ('<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">'
         '<path d="M4 12h15M13 6l6 6-6 6"/></svg>')

BG_LIGHT, BG_DARK = "#e8e9e5", "#0d1012"


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
<meta name="google-site-verification" content="ng8IBVjsUk1MznbtXwQrq5oEJaAVr4SV7g_3YMehIEM">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="{BG_LIGHT}" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="{BG_DARK}" media="(prefers-color-scheme: dark)">
<script>(function(){{var d=document.documentElement;d.classList.add('js');setTimeout(function(){{if(!window.__siteReady)d.classList.add('no-motion');}},2500);try{{var t=localStorage.getItem('theme');if(t)d.dataset.theme=t;{redirect}}}catch(e){{}}}})();</script>
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
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300..600;1,300..600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{r}assets/css/style.css">
</head>
'''


def header(lang, page):
    s = S[lang]
    en_href = ("../" if lang == "tr" else "") + page
    tr_href = page if lang == "tr" else "tr/" + page
    cur = lambda h: ' aria-current="page"' if h == page else ""
    links = "".join(f'<li><a href="{h}"{cur(h)}>{t}</a></li>' for h, t in s["nav"])
    mlinks = "".join(f'<li style="--i:{i}"><a href="{h}"{cur(h)}><span>{t}</span></a></li>' for i, (h, t) in enumerate(s["nav"]))
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
  <div class="mm-foot"><a href="mailto:{EMAIL}">{EMAIL}</a><span>{s["city"]}</span></div>
</div>
'''


def cta(lang):
    s = S[lang]
    return f'''<section class="cta"><div class="wrap cta-inner">
  <div><p class="label">{s["cta_label"]}</p><h2 class="split">{s["cta_title"]}</h2></div>
  <a class="btn btn-solid" href="contact.html">{s["cta_btn"]} {ARROW}</a>
</div></section>
'''


def footer(lang):
    s = S[lang]
    nav = dict(s["nav"])
    return f'''<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div><p class="footer-about">{s["f_about"]}</p></div>
      <div><h5>{s["f_studio"]}</h5><ul><li><a href="portfolio.html">{nav["portfolio.html"]}</a></li><li><a href="services.html">{nav["services.html"]}</a></li><li><a href="about.html">{nav["about.html"]}</a></li><li><a href="journal.html">{nav["journal.html"]}</a></li></ul></div>
      <div><h5>{s["f_contact"]}</h5><ul><li><a href="mailto:{EMAIL}">{EMAIL}</a></li><li>{s["city"]}</li><li><a href="contact.html">{s["f_start"]}</a></li></ul></div>
      <div><h5>{s["f_follow"]}</h5><ul><li><a href="{LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a></li></ul></div>
    </div>
    <a class="wordmark" href="index.html" aria-label="{s["home_aria"]}"><span class="letters split">Berk Nazlım</span></a>
    <div class="footer-bottom"><span>© <span id="year">2026</span> {s["rights"]}</span><span>41.0082° N, 28.9784° E</span><span>berknazlim.com</span></div>
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

HOME = {
    "en": {
        "statement": "Good architecture reads its site, respects its city and gives something back to the people who use it.",
        "lead": "Trained in the Department of Interior Architecture at ITU's Faculty of Architecture, Berk has worked on construction sites and in design offices since 2023, from a hotel lobby in Maçka to an apartment in Zeytinburnu. Each project starts from one clear idea and carries it down to the material, the furniture and the detail.",
        "stats": [("6", "Selected projects"), ("5", "Roles in offices and on site"), ("7", "Design and rendering tools"), ("’26", "ITU graduate")],
    },
    "tr": {
        "statement": "İyi mimarlık yerini okur, kentine saygı duyar ve onu kullanan insanlara bir şey geri verir.",
        "lead": "İTÜ Mimarlık Fakültesi İç Mimarlık Bölümü'nde eğitim alan Berk, 2023'ten bu yana şantiyelerde ve tasarım ofislerinde çalışıyor: Maçka'daki bir otel lobisinden Zeytinburnu'ndaki bir daireye kadar. Her proje tek ve net bir fikirle başlıyor ve bu fikri malzemeye, mobilyaya ve detaya kadar taşıyor.",
        "stats": [("6", "Seçili proje"), ("5", "Ofis ve şantiye deneyimi"), ("7", "Tasarım ve görselleştirme aracı"), ("’26", "İTÜ mezunu")],
    },
}


def home(lang):
    h, x = HOME[lang], X[lang]
    r = "../" if lang == "tr" else ""
    stats = "".join(f'<div class="stat"><div class="num" data-count>{n}</div><p>{t}</p></div>' for n, t in h["stats"])
    return f'''<section class="hero" data-hero>
  <div class="hero-sticky">
    <div class="model" data-model="hero" role="img" aria-label="{x["model_alt"]}"></div>
    <div class="wrap hero-copy">
      <p class="kicker rise" style="--d:0">{x["kicker"]}</p>
      <h1 class="split" data-split-now>{h["statement"]}</h1>
      <div class="hero-actions rise" style="--d:1"><a class="btn btn-solid" href="portfolio.html">{x["see_projects"]} {ARROW}</a><a class="btn" href="about.html">{x["about_berk"]}</a></div>
    </div>
    <div class="wrap hero-foot rise" style="--d:2"><span class="hint-drag">{x["hint_drag"]}</span><span class="hint-scroll"><i></i>{x["hint_scroll"]}</span><span>41.0082° N, 28.9784° E</span></div>
  </div>
</section>

<section class="section approach"><div class="wrap approach-grid">
  <figure class="approach-portrait tilt"><div class="media curtain"><img src="{r}assets/img/berk-nazlim.jpg" alt="Berk Nazlım" width="526" height="536"></div></figure>
  <div>
    <p class="label">{x["approach"]}</p>
    <p class="lead reveal">{h["lead"]}</p>
    <a class="link reveal" href="about.html">{x["more"]} {ARROW}</a>
    <div class="stats reveal">{stats}</div>
  </div>
</div></section>

<section class="walk" data-walk aria-label="{x["work"]}">
  <div class="walk-sticky">
    <div class="wrap walk-head"><h2>{x["work"]}</h2><a class="link" href="portfolio.html">{x["all"]} {ARROW}</a></div>
    <div class="walk-stage"><div class="walk-world" id="featured" data-all="{x["all"]}" data-hint="{x["walk_hint"]}"></div></div>
    <div class="wrap walk-foot"><span class="walk-count" id="walk-count"></span><span class="walk-bar"><i></i></span></div>
  </div>
</section>

<section class="section"><div class="wrap">
  <div class="section-head"><h2 class="split">{x["journal"]}</h2><a class="link" href="journal.html">{x["read_journal"]} {ARROW}</a></div>
  <div class="posts-grid" id="latest-posts"></div>
</div></section>
'''


def portfolio(lang):
    if lang == "en":
        t = ("Portfolio", "Selected work", "Academic and freelance work: a cultural centre, cafés and restaurants, a waterfront and a family home, around Istanbul and Çanakkale.",
             "Filter projects", "All projects", ("No.", "Project", "Location", "Typology", "Year"))
    else:
        t = ("Projeler", "Seçili işler", "Akademik ve serbest çalışmalar: bir kültür merkezi, kafe ve restoranlar, bir kıyı projesi ve bir aile evi; İstanbul ve Çanakkale'de.",
             "Projeleri filtrele", "Tüm projeler", ("No", "Proje", "Konum", "Tipoloji", "Yıl"))
    c = t[5]
    return f'''<section class="page-head"><div class="wrap">
  <p class="label rise" style="--d:0">{t[0]}</p><h1 class="split" data-split-now>{t[1]}</h1>
  <p class="lead rise" style="--d:1">{t[2]}</p>
</div></section>
<section class="section section-tight"><div class="wrap">
  <div class="filters" id="filters" role="group" aria-label="{t[3]}"></div>
  <div class="projects-grid" id="projects"></div>
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><h2 class="split">{t[4]}</h2></div>
  <div class="index-row index-head"><span>{c[0]}</span><span>{c[1]}</span><span>{c[2]}</span><span>{c[3]}</span><span class="y">{c[4]}</span></div>
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

SERVICES_PAGE = {
    "en": ("Services", "From first sketch to finished space", "A complete design service, or exactly the part you need. Every project is handled personally by Berk.",
           "How we work together", "Clear stages, clear deliverables and one point of contact from first sketch to handover.",
           "A 3D model of a building that is built up in four steps as you scroll: site, structure, solid form, finished building."),
    "tr": ("Hizmetler", "İlk eskizden tamamlanmış mekâna", "Eksiksiz bir tasarım hizmeti ya da tam ihtiyacınız olan kısım. Her proje bizzat Berk tarafından yürütülür.",
           "Birlikte nasıl çalışıyoruz", "Net aşamalar, net çıktılar ve ilk eskizden teslime kadar tek bir muhatap.",
           "Kaydırdıkça dört adımda inşa edilen üç boyutlu bir yapı modeli: arazi, taşıyıcı sistem, kütle ve tamamlanmış yapı."),
}


def services(lang):
    t = SERVICES_PAGE[lang]
    rows = "".join(
        f'<div class="service reveal"><span class="n">{i + 1:02d}</span><h3>{title}</h3><div><p>{d}</p><ul>{"".join(f"<li>{x}</li>" for x in items)}</ul></div></div>'
        for i, (title, d, items) in enumerate(SERVICES[lang]))
    steps = "".join(f'<div class="step" data-step="{i}"><span class="n">{i + 1:02d}</span><h3>{title}</h3><p>{d}</p></div>'
                    for i, (title, d) in enumerate(PROCESS[lang]))
    return f'''<section class="page-head"><div class="wrap">
  <p class="label rise" style="--d:0">{t[0]}</p><h1 class="split" data-split-now>{t[1]}</h1>
  <p class="lead rise" style="--d:1">{t[2]}</p>
</div></section>
<section class="section section-tight"><div class="wrap"><div class="services-list">{rows}</div></div></section>
<section class="section build" data-build><div class="wrap">
  <div class="section-head"><h2 class="split">{t[3]}</h2><p class="lead">{t[4]}</p></div>
  <div class="build-grid">
    <div class="build-model"><div class="model" data-model="process" role="img" aria-label="{t[5]}"></div><div class="build-dots" aria-hidden="true"><i></i><i></i><i></i><i></i></div></div>
    <div class="build-steps">{steps}</div>
  </div>
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
    r = "../" if lang == "tr" else ""
    import re
    title = re.sub(r"</?em>", "", a["title"])
    bio = "".join(f"<p>{p}</p>" for p in a["bio"])
    tl = "".join(f'<div class="tl reveal"><span class="y">{y}</span><div><h4>{t}</h4><p>{d}</p></div></div>' for y, t, d in a["timeline"])
    vals = "".join(f'<div class="value reveal" style="--i:{i}"><h4>{t}</h4><p>{d}</p></div>' for i, (t, d) in enumerate(a["values"]))
    return f'''<section class="page-head"><div class="wrap">
  <p class="label rise" style="--d:0">{a["label"]}</p><h1 class="split" data-split-now>{title}</h1><p class="lead rise" style="--d:1">{a["lead"]}</p>
</div></section>
<section class="section section-tight"><div class="wrap about-grid">
  <figure class="portrait tilt"><div class="media curtain" id="portrait-art"><img src="{r}assets/img/berk-nazlim.jpg" alt="Berk Nazlım" width="526" height="536"></div><figcaption><span>{a["caption"][0]}</span><span>{a["caption"][1]}</span></figcaption></figure>
  <div>
    <p class="statement split">{a["statement"]}</p>
    <div class="bio reveal">{bio}</div>
    <div class="block"><p class="label">{a["path"]}</p><div class="timeline" data-timeline>{tl}</div></div>
    <div class="block"><p class="label">{a["tools"]}</p><div class="tags reveal">{"".join(f'<span style="--i:{i}">{x}</span>' for i, x in enumerate(a["toollist"]))}</div></div>
  </div>
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><h2 class="split">{a["values_title"]}</h2></div>
  <div class="values">{vals}</div>
</div></section>
'''


def journal(lang):
    if lang == "en":
        t = ("Journal", "News and ideas", "The latest in architecture: materials, technology, cities and notes on my own work.", "Filter articles")
    else:
        t = ("Günlük", "Haberler ve fikirler", "Mimarlıkta son gelişmeler: malzeme, teknoloji, kentler ve kendi çalışmalarımdan notlar.", "Yazıları filtrele")
    return f'''<section class="page-head"><div class="wrap">
  <p class="label rise" style="--d:0">{t[0]}</p><h1 class="split" data-split-now>{t[1]}</h1>
  <p class="lead rise" style="--d:1">{t[2]}</p>
</div></section>
<section class="section section-tight"><div class="wrap">
  <div id="feature"></div>
  <div class="filters" id="filters" role="group" aria-label="{t[3]}"></div>
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
    import re
    title = re.sub(r"</?em>", "", c["title"])
    chips = "".join(f'<input type="radio" id="t{i}" name="type" value="{t}"><label for="t{i}">{t}</label>' for i, t in enumerate(c["types"]))
    opts = "".join(f"<option>{b}</option>" for b in c["budgets"])
    city = S[lang]["city"]
    return f'''<section class="page-head"><div class="wrap">
  <p class="label rise" style="--d:0">{c["label"]}</p><h1 class="split" data-split-now>{title}</h1><p class="lead rise" style="--d:1">{c["lead"]}</p>
</div></section>
<section class="section section-tight"><div class="wrap contact-grid">
  <div class="contact-info reveal"><dl>
    <div><dt class="label">{c["email"]}</dt><dd><a href="mailto:{EMAIL}">{EMAIL}</a></dd></div>
    <div><dt class="label">{c["studio"]}</dt><dd>{city}</dd></div>
    <div><dt class="label">{c["hours"]}</dt><dd>{c["hours_v"]}</dd></div>
    <div><dt class="label">{c["social"]}</dt><dd><a href="{LINKEDIN}" target="_blank" rel="noopener">LinkedIn</a></dd></div>
  </dl></div>
  <form id="contact-form" class="reveal">
    <div class="form-row">
      <div class="field"><label class="label" for="name">{c["name"]} *</label><input id="name" name="name" required autocomplete="name"></div>
      <div class="field"><label class="label" for="email">{c["mail"]} *</label><input id="email" name="email" type="email" required autocomplete="email"></div>
    </div>
    <div class="field"><label class="label" for="company">{c["company"]}</label><input id="company" name="company" autocomplete="organization"></div>
    <fieldset class="field chips-field"><legend class="label">{c["type"]}</legend><div class="chips">{chips}</div></fieldset>
    <div class="field"><label class="label" for="budget">{c["budget"]}</label><select id="budget" name="budget"><option value="">{c["select"]}</option>{opts}</select></div>
    <div class="field"><label class="label" for="message">{c["message"]} *</label><textarea id="message" name="message" required></textarea></div>
    <button class="btn btn-solid" type="submit">{c["send"]} {ARROW}</button>
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
  <a class="btn btn-solid" href="/">Home / Ana sayfa</a>
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
