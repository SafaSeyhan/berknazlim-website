"""Generates the static HTML pages in English (site root) and Turkish (/tr/).

Run from the repository root after changing page text:

    python3 tools/build.py

Projects and journal posts are not in here: they live in assets/js/data.js
and are rendered in the browser, so editing them needs no rebuild.
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOMAIN = "https://berknazlim.com"
PAGES = ["index.html", "portfolio.html", "project.html", "services.html", "about.html",
         "journal.html", "post.html", "contact.html"]

S = {
    "en": {
        "nav": [("index.html", "Home"), ("portfolio.html", "Portfolio"), ("services.html", "Services"),
                ("about.html", "About"), ("journal.html", "Journal"), ("contact.html", "Contact")],
        "tagline": "Architecture",
        "home_aria": "Berk Nazlım, home",
        "menu": "Menu",
        "theme": "Switch light or dark mode",
        "cta_nav": "Start a project",
        "cta_label": "Have a project in mind?",
        "cta_title": "Let's design something <em>lasting</em> together.",
        "cta_btn": "Get in touch",
        "f_about": "Architecture, interiors and urban design from Istanbul.",
        "f_studio": "Studio", "f_contact": "Contact", "f_follow": "Follow",
        "f_start": "Start a project", "city": "Istanbul, Türkiye",
        "rights": "Berk Nazlım Architecture",
    },
    "tr": {
        "nav": [("index.html", "Ana sayfa"), ("portfolio.html", "Projeler"), ("services.html", "Hizmetler"),
                ("about.html", "Hakkında"), ("journal.html", "Günlük"), ("contact.html", "İletişim")],
        "tagline": "Mimarlık",
        "home_aria": "Berk Nazlım, ana sayfa",
        "menu": "Menü",
        "theme": "Açık veya koyu temaya geç",
        "cta_nav": "Proje başlat",
        "cta_label": "Aklınızda bir proje mi var?",
        "cta_title": "Birlikte <em>kalıcı</em> bir şey tasarlayalım.",
        "cta_btn": "İletişime geçin",
        "f_about": "İstanbul'dan mimarlık, iç mimarlık ve kentsel tasarım.",
        "f_studio": "Stüdyo", "f_contact": "İletişim", "f_follow": "Takip edin",
        "f_start": "Proje başlat", "city": "İstanbul, Türkiye",
        "rights": "Berk Nazlım Mimarlık",
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
<script>(function(){{var d=document.documentElement;d.classList.add('js');try{{var t=localStorage.getItem('theme');if(t)d.dataset.theme=t;{redirect}}}catch(e){{}}}})();</script>
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
<link rel="icon" href="{r}favicon.svg" type="image/svg+xml">
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
  <div class="mm-foot"><a href="mailto:hello@berknazlim.com">hello@berknazlim.com</a><br>{s["city"]}</div>
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
      <div><h5>{s["f_contact"]}</h5><ul><li><a href="mailto:hello@berknazlim.com">hello@berknazlim.com</a></li><li>{s["city"]}</li><li><a href="contact.html">{s["f_start"]}</a></li></ul></div>
      <div><h5>{s["f_follow"]}</h5><ul><li><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a></li><li><a href="https://linkedin.com/" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="https://www.behance.net/" target="_blank" rel="noopener">Behance</a></li></ul></div>
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
    html = (head(lang, page, title, desc) + f'<body data-page="{slug}">\n' + header(lang, page) + "<main>\n"
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
    <div><span class="label">Architecture · Interiors · Urban design — Istanbul</span>
    <h1>Architecture rooted in place, <em>designed</em> for the century ahead.</h1></div>
    <div class="hero-side"><p>Berk Nazlım is an Istanbul-based architect and a graduate of Istanbul Technical University, designing cultural, residential and mixed-use buildings.</p>
    <div class="hero-actions"><a class="btn btn-solid" href="portfolio.html">View projects <span class="arrow">→</span></a><a class="btn" href="about.html">About</a></div></div>
  </div>
  <a href="project.html?p=galata-archive" class="hero-figure"><figure><div class="media" id="hero-art"></div>
  <figcaption><span>Galata Archive &amp; Library, Istanbul</span><span class="mono">2025</span></figcaption></figure></a>
</div></section>

<section class="section"><div class="wrap intro">
  <div><span class="label">01 — Studio</span></div>
  <div>
    <p class="statement reveal">Good architecture reads its site, respects its city and gives something back to the people who use it.</p>
    <p class="lead reveal">Trained at ITU's Faculty of Architecture in the historic Taşkışla building, Berk works across scales, from a single pavilion to towers, hotels and whole neighbourhoods. Every project combines careful analysis with a deep respect for place, climate and material.</p>
    <a class="link reveal" href="about.html">More about Berk →</a>
    <div class="stats">
      <div class="stat"><div class="num">24</div><p>Projects designed</p></div>
      <div class="stat"><div class="num">9</div><p>Awards and distinctions</p></div>
      <div class="stat"><div class="num">6</div><p>Countries</p></div>
      <div class="stat"><div class="num">140<sup>k m²</sup></div><p>Floor area in design</p></div>
    </div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">02 — Selected work</span><h2>Featured projects</h2></div><a class="link" href="portfolio.html">All projects →</a></div>
  <div class="projects-grid" id="featured"></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">03 — Services</span><h2>What the studio does</h2></div><a class="link" href="services.html">All services →</a></div>
  <div class="services-list">
    <div class="service reveal"><span class="n mono">01</span><h3>Architecture</h3><p>From first concept to construction drawings for cultural, residential, commercial and mixed-use buildings.</p></div>
    <div class="service reveal"><span class="n mono">02</span><h3>Interiors</h3><p>Spaces, furniture and lighting designed as one continuous idea with the building.</p></div>
    <div class="service reveal"><span class="n mono">03</span><h3>Urban design</h3><p>Masterplans and public spaces that make neighbourhoods more liveable and more resilient.</p></div>
    <div class="service reveal"><span class="n mono">04</span><h3>Restoration &amp; reuse</h3><p>New life for existing buildings, from heritage warehouses to post-war housing.</p></div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">04 — Journal</span><h2>News &amp; ideas in architecture</h2></div><a class="link" href="journal.html">Read the journal →</a></div>
  <div class="posts-grid" id="latest-posts"></div>
</div></section>
'''
    return '''<section class="hero"><div class="wrap">
  <div class="hero-top">
    <div><span class="label">Mimarlık · İç mimarlık · Kentsel tasarım — İstanbul</span>
    <h1>Yere kök salan, gelecek yüzyıl için <em>tasarlanan</em> mimarlık.</h1></div>
    <div class="hero-side"><p>Berk Nazlım, İstanbul Teknik Üniversitesi mezunu, İstanbul merkezli bir mimar. Kültür, konut ve karma kullanımlı yapılar tasarlıyor.</p>
    <div class="hero-actions"><a class="btn btn-solid" href="portfolio.html">Projeleri gör <span class="arrow">→</span></a><a class="btn" href="about.html">Hakkında</a></div></div>
  </div>
  <a href="project.html?p=galata-archive" class="hero-figure"><figure><div class="media" id="hero-art"></div>
  <figcaption><span>Galata Arşiv ve Kütüphanesi, İstanbul</span><span class="mono">2025</span></figcaption></figure></a>
</div></section>

<section class="section"><div class="wrap intro">
  <div><span class="label">01 — Stüdyo</span></div>
  <div>
    <p class="statement reveal">İyi mimarlık yerini okur, kentine saygı duyar ve onu kullanan insanlara bir şey geri verir.</p>
    <p class="lead reveal">Eğitimini İTÜ Mimarlık Fakültesi'nde, tarihi Taşkışla binasında alan Berk, tek bir pavyondan kulelere, otellere ve mahallelere kadar her ölçekte çalışıyor. Her proje, dikkatli bir analizi yere, iklime ve malzemeye duyulan derin saygıyla birleştiriyor.</p>
    <a class="link reveal" href="about.html">Berk hakkında daha fazlası →</a>
    <div class="stats">
      <div class="stat"><div class="num">24</div><p>Tasarlanan proje</p></div>
      <div class="stat"><div class="num">9</div><p>Ödül ve derece</p></div>
      <div class="stat"><div class="num">6</div><p>Ülke</p></div>
      <div class="stat"><div class="num">140<sup>bin m²</sup></div><p>Tasarımdaki inşaat alanı</p></div>
    </div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">02 — Seçili işler</span><h2>Öne çıkan projeler</h2></div><a class="link" href="portfolio.html">Tüm projeler →</a></div>
  <div class="projects-grid" id="featured"></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">03 — Hizmetler</span><h2>Stüdyo neler yapıyor</h2></div><a class="link" href="services.html">Tüm hizmetler →</a></div>
  <div class="services-list">
    <div class="service reveal"><span class="n mono">01</span><h3>Mimarlık</h3><p>Kültür, konut, ticari ve karma kullanımlı yapılar için ilk konseptten uygulama projesine kadar.</p></div>
    <div class="service reveal"><span class="n mono">02</span><h3>İç mimarlık</h3><p>Mekân, mobilya ve aydınlatmanın binayla tek ve kesintisiz bir fikir olarak tasarlanması.</p></div>
    <div class="service reveal"><span class="n mono">03</span><h3>Kentsel tasarım</h3><p>Mahalleleri daha yaşanabilir ve daha dirençli kılan master planlar ve kamusal alanlar.</p></div>
    <div class="service reveal"><span class="n mono">04</span><h3>Restorasyon ve yeniden kullanım</h3><p>Tarihi antrepolardan savaş sonrası konutlara, mevcut binalara yeni bir hayat.</p></div>
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
  <p class="lead">Buildings, interiors, competitions and research, from Istanbul to the Norwegian fjords.</p>
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
  <p class="lead">İstanbul'dan Norveç fiyortlarına binalar, iç mekânlar, yarışmalar ve araştırmalar.</p>
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
        ("Architectural design", "Concept, schematic and developed design through to permit and construction documents for new buildings of every scale.",
         ["Concept design", "Permit drawings", "Construction documents", "Site supervision"]),
        ("Interior architecture", "Interiors that carry the building's idea inside: space planning, materials, lighting and bespoke furniture.",
         ["Space planning", "Material palettes", "Lighting", "Custom joinery"]),
        ("Urban design & masterplanning", "Neighbourhood plans, public spaces and resilient housing strategies that put people and climate first.",
         ["Masterplans", "Public space", "Feasibility studies", "Seismic resilience"]),
        ("Restoration & adaptive reuse", "Surveys, restoration and new uses for existing and historic buildings, keeping their character and their embodied carbon.",
         ["Building surveys", "Restoration", "Change of use", "Retrofit"]),
        ("Visualisation & models", "Drawings, renders and physical models that let clients understand a building before it exists.",
         ["Presentation drawings", "Renders", "Physical models", "Walkthroughs"]),
        ("Competitions & consultancy", "Competition entries, design reviews and sustainability advice for developers, institutions and other practices.",
         ["Competition entries", "Design review", "Sustainability strategy", "Feasibility"]),
    ],
    "tr": [
        ("Mimari tasarım", "Her ölçekte yeni yapılar için konsept, avan ve kesin projeden ruhsat ve uygulama projelerine kadar.",
         ["Konsept tasarım", "Ruhsat projesi", "Uygulama projesi", "Şantiye denetimi"]),
        ("İç mimarlık", "Binanın fikrini içeriye taşıyan iç mekânlar: mekân kurgusu, malzeme, aydınlatma ve özel mobilya.",
         ["Mekân planlama", "Malzeme paleti", "Aydınlatma", "Özel mobilya"]),
        ("Kentsel tasarım ve master plan", "İnsanı ve iklimi öne koyan mahalle planları, kamusal alanlar ve dirençli konut stratejileri.",
         ["Master plan", "Kamusal alan", "Fizibilite", "Deprem dayanıklılığı"]),
        ("Restorasyon ve yeniden kullanım", "Mevcut ve tarihi binalar için rölöve, restorasyon ve yeni işlevler; karakterlerini ve gömülü karbonlarını koruyarak.",
         ["Rölöve", "Restorasyon", "İşlev değişikliği", "Güçlendirme"]),
        ("Görselleştirme ve maket", "Müşterinin bir binayı daha var olmadan anlamasını sağlayan çizimler, görseller ve fiziksel maketler.",
         ["Sunum çizimleri", "Görselleştirme", "Fiziksel maket", "Sanal tur"]),
        ("Yarışma ve danışmanlık", "Yatırımcılar, kurumlar ve diğer ofisler için yarışma projeleri, tasarım değerlendirmesi ve sürdürülebilirlik danışmanlığı.",
         ["Yarışma projeleri", "Tasarım değerlendirmesi", "Sürdürülebilirlik", "Fizibilite"]),
    ],
}
PROCESS = {
    "en": [("Listen", "Site visit, brief, budget and ambitions. We agree on what success looks like."),
           ("Explore", "Sketches, models and analysis to test several directions quickly."),
           ("Refine", "One direction developed in detail: plans, materials, structure and cost."),
           ("Build", "Permits, construction documents and close supervision on site until handover.")],
    "tr": [("Dinlemek", "Arazi ziyareti, ihtiyaç programı, bütçe ve hedefler. Başarının ne olduğunu birlikte tanımlarız."),
           ("Keşfetmek", "Birkaç yönü hızla denemek için eskizler, maketler ve analizler."),
           ("Geliştirmek", "Seçilen yönün ayrıntılı geliştirilmesi: planlar, malzeme, taşıyıcı sistem ve maliyet."),
           ("İnşa etmek", "Ruhsat, uygulama projeleri ve teslimata kadar şantiyede yakın takip.")],
}


def services(lang):
    rows = "".join(
        f'<div class="service reveal"><span class="n mono">{i + 1:02d}</span><h3>{t}</h3><div><p>{d}</p><ul>{"".join(f"<li>{x}</li>" for x in items)}</ul></div></div>'
        for i, (t, d, items) in enumerate(SERVICES[lang]))
    steps = "".join(f'<div class="step reveal"><span class="n">{i + 1:02d}</span><h4>{t}</h4><p>{d}</p></div>'
                    for i, (t, d) in enumerate(PROCESS[lang]))
    if lang == "en":
        return f'''<section class="page-head"><div class="wrap">
  <span class="label">Services</span><h1>From first sketch to <em>finished</em> building</h1>
  <p class="lead">A full architectural service, or exactly the part you need. Every project is led personally by Berk.</p>
</div></section>
<section class="section"><div class="wrap"><div class="services-list">{rows}</div></div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">Process</span><h2>How we work together</h2></div><p class="lead">Clear stages, clear deliverables and one point of contact from first sketch to handover.</p></div>
  <div class="process">{steps}</div>
</div></section>
'''
    return f'''<section class="page-head"><div class="wrap">
  <span class="label">Hizmetler</span><h1>İlk eskizden <em>tamamlanmış</em> binaya</h1>
  <p class="lead">Eksiksiz bir mimarlık hizmeti ya da tam ihtiyacınız olan kısım. Her proje bizzat Berk tarafından yürütülür.</p>
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
        "lead": "Architect. Istanbul Technical University, Faculty of Architecture, class of 2026.",
        "caption": ("Portrait coming soon", "Istanbul"),
        "statement": "I design buildings that belong to their place and to their time.",
        "bio": [
            "I grew up between the Bosphorus and the hills of Istanbul, a city where Byzantine walls, Ottoman domes and glass towers share the same skyline. That layered city taught me that architecture is always a conversation between past and future.",
            "I studied architecture at Istanbul Technical University, one of the oldest technical universities in the world, in the historic Taşkışla building. There I learned to draw by hand, to think in section and to treat structure, climate and context as the raw material of design.",
            "Today my work combines digital tools with craft: careful studies to find the right form, and precise detailing to build it well. Whether it is a small house or a tower, the aim is the same: architecture that is generous, durable and calm.",
        ],
        "path": "Path",
        "timeline": [("2026 —", "Founder, Berk Nazlım Architecture", "Independent studio in Istanbul working on cultural, residential and mixed-use projects."),
                     ("2026", "B.Arch, Istanbul Technical University", "Faculty of Architecture. Graduation project: Seismic Commons, a resilient housing model."),
                     ("2025", "Design intern, international practice", "Competition and tower projects in Europe and the Middle East."),
                     ("2024", "Exchange semester, Europe", "Studio work on timber construction and adaptive reuse."),
                     ("2022", "Intern, Istanbul architecture office", "Residential and interior projects, construction site experience.")],
        "tools": "Tools", "langs": "Languages",
        "langlist": ["Turkish — native", "English — fluent", "German — intermediate"],
        "toollist": ["Hand drawing", "Model making", "Rhino", "Grasshopper", "Revit", "AutoCAD", "Blender", "Enscape", "Adobe CC"],
        "values_label": "Principles", "values_title": "What guides the work",
        "values": [("Context first", "Every site has a history, a climate and a community. Good architecture starts by listening to all three."),
                   ("Built to last", "Seismic safety, durable materials and low-carbon thinking are not extras. They are the foundation."),
                   ("Quiet, not loud", "Strong ideas, expressed with restraint and precise detail, age far better than fashion.")],
        "awards_label": "Recognition", "awards_title": "Awards",
        "awards": [("2026", "World Architecture Festival — Shortlist", "Bosphorus Light Pavilion"),
                   ("2026", "Invited Competition — 1st Prize", "Levent Helix Tower"),
                   ("2026", "AR Emerging Architecture — Commendation", "Tuff Retreat"),
                   ("2026", "International Competition — 2nd Prize", "Fjord Timber School"),
                   ("2026", "Arkitera Young Architect Award", "Studio"),
                   ("2025", "National Competition — Honourable Mention", "Galata Archive & Library")],
    },
    "tr": {
        "label": "Hakkında", "title": "Berk <em>Nazlım</em>",
        "lead": "Mimar. İstanbul Teknik Üniversitesi, Mimarlık Fakültesi, 2026 mezunu.",
        "caption": ("Portre yakında", "İstanbul"),
        "statement": "Yerine ve zamanına ait binalar tasarlıyorum.",
        "bio": [
            "Boğaz ile İstanbul'un tepeleri arasında büyüdüm; Bizans surlarının, Osmanlı kubbelerinin ve cam kulelerin aynı siluette buluştuğu bir şehirde. Bu katmanlı şehir bana mimarlığın her zaman geçmişle gelecek arasında bir diyalog olduğunu öğretti.",
            "Mimarlık eğitimimi dünyanın en köklü teknik üniversitelerinden İstanbul Teknik Üniversitesi'nde, tarihi Taşkışla binasında aldım. Orada elle çizmeyi, kesitle düşünmeyi ve taşıyıcı sistemi, iklimi ve bağlamı tasarımın ham maddesi olarak görmeyi öğrendim.",
            "Bugün çalışmalarım dijital araçları zanaatle birleştiriyor: doğru biçimi bulmak için dikkatli çalışmalar, onu iyi inşa etmek için titiz detaylar. Küçük bir ev de olsa bir kule de olsa amaç aynı: cömert, kalıcı ve sakin bir mimarlık.",
        ],
        "path": "Yol",
        "timeline": [("2026 —", "Kurucu, Berk Nazlım Mimarlık", "Kültür, konut ve karma kullanımlı projeler üzerine çalışan İstanbul merkezli bağımsız stüdyo."),
                     ("2026", "Lisans, İstanbul Teknik Üniversitesi", "Mimarlık Fakültesi. Bitirme projesi: dirençli bir konut modeli olan Sismik Ortak Alanlar."),
                     ("2025", "Tasarım stajyeri, uluslararası ofis", "Avrupa ve Orta Doğu'da yarışma ve kule projeleri."),
                     ("2024", "Değişim dönemi, Avrupa", "Ahşap yapım ve yeniden kullanım üzerine stüdyo çalışmaları."),
                     ("2022", "Stajyer, İstanbul'da bir mimarlık ofisi", "Konut ve iç mimarlık projeleri, şantiye deneyimi.")],
        "tools": "Araçlar", "langs": "Diller",
        "langlist": ["Türkçe — ana dil", "İngilizce — ileri", "Almanca — orta"],
        "toollist": ["Elle çizim", "Maket", "Rhino", "Grasshopper", "Revit", "AutoCAD", "Blender", "Enscape", "Adobe CC"],
        "values_label": "İlkeler", "values_title": "İşe yön veren ilkeler",
        "values": [("Önce bağlam", "Her arazinin bir tarihi, bir iklimi ve bir topluluğu vardır. İyi mimarlık üçünü de dinleyerek başlar."),
                   ("Kalıcı olmak için", "Deprem güvenliği, dayanıklı malzemeler ve düşük karbonlu düşünce ek değildir. Temelin kendisidir."),
                   ("Sakin, gösterişsiz", "Ölçülü ve titiz detaylarla ifade edilen güçlü fikirler, modadan çok daha iyi yaşlanır.")],
        "awards_label": "Takdir", "awards_title": "Ödüller",
        "awards": [("2026", "World Architecture Festival — Finalist", "Boğaziçi Işık Pavyonu"),
                   ("2026", "Davetli Yarışma — Birincilik", "Levent Helix Kulesi"),
                   ("2026", "AR Emerging Architecture — Övgü", "Tüf Otel"),
                   ("2026", "Uluslararası Yarışma — İkincilik", "Fiyort Ahşap Okulu"),
                   ("2026", "Arkitera Genç Mimar Ödülü", "Stüdyo"),
                   ("2025", "Ulusal Yarışma — Mansiyon", "Galata Arşiv ve Kütüphanesi")],
    },
}


def about(lang):
    a = ABOUT[lang]
    bio = "".join(f"<p>{p}</p>" for p in a["bio"])
    tl = "".join(f'<div class="tl"><span class="y mono">{y}</span><div><h4>{t}</h4><p>{d}</p></div></div>' for y, t, d in a["timeline"])
    vals = "".join(f'<div class="value reveal"><span class="n mono">{i + 1:02d}</span><h4>{t}</h4><p>{d}</p></div>' for i, (t, d) in enumerate(a["values"]))
    aw = "".join(f'<div class="award"><span class="y mono">{y}</span><span class="t">{t}</span><span class="c">{p}</span></div>' for y, t, p in a["awards"])
    return f'''<section class="page-head"><div class="wrap">
  <span class="label">{a["label"]}</span><h1>{a["title"]}</h1><p class="lead">{a["lead"]}</p>
</div></section>
<section class="section"><div class="wrap about-grid">
  <figure class="portrait"><div class="media" id="portrait-art"></div><figcaption><span>{a["caption"][0]}</span><span class="mono">{a["caption"][1]}</span></figcaption></figure>
  <div>
    <p class="statement">{a["statement"]}</p>
    <div class="lead" style="max-width:none">{bio}</div>
    <div class="block"><span class="label">{a["path"]}</span><div class="timeline">{tl}</div></div>
    <div class="block"><span class="label">{a["tools"]}</span><div class="tags">{"".join(f"<span>{x}</span>" for x in a["toollist"])}</div></div>
    <div class="block"><span class="label">{a["langs"]}</span><div class="tags">{"".join(f"<span>{x}</span>" for x in a["langlist"])}</div></div>
  </div>
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">{a["values_label"]}</span><h2>{a["values_title"]}</h2></div></div>
  <div class="values">{vals}</div>
</div></section>
<section class="section"><div class="wrap">
  <div class="section-head"><div><span class="label">{a["awards_label"]}</span><h2>{a["awards_title"]}</h2></div></div>
  <div class="awards-table">{aw}</div>
</div></section>
'''


def journal(lang):
    if lang == "en":
        return '''<section class="page-head"><div class="wrap">
  <span class="label">Journal</span><h1>News &amp; <em>ideas</em></h1>
  <p class="lead">The latest in architecture: materials, technology, cities and the work of the studio.</p>
</div></section>
<section class="section"><div class="wrap">
  <div id="feature"></div>
  <div class="filters" id="filters" role="group" aria-label="Filter articles"></div>
  <div class="posts-grid" id="posts"></div>
</div></section>
'''
    return '''<section class="page-head"><div class="wrap">
  <span class="label">Günlük</span><h1>Haberler ve <em>fikirler</em></h1>
  <p class="lead">Mimarlıkta son gelişmeler: malzeme, teknoloji, kentler ve stüdyonun çalışmaları.</p>
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
        "lead": "New buildings, interiors, competitions or collaborations. Tell me about your project and I'll reply within two working days.",
        "email": "Email", "studio": "Studio", "hours": "Hours", "hours_v": "Mon – Fri, 09:00 – 18:00 (GMT+3)", "social": "Social",
        "name": "Name", "mail": "Email", "company": "Company (optional)", "type": "Project type",
        "types": ["Residential", "Commercial", "Interior", "Urban", "Other"],
        "budget": "Estimated budget", "select": "Select…",
        "budgets": ["Under €100k", "€100k – €500k", "€500k – €2M", "Over €2M", "Not sure yet"],
        "message": "About the project", "send": "Send message",
    },
    "tr": {
        "label": "İletişim", "title": "Hadi <em>konuşalım</em>",
        "lead": "Yeni binalar, iç mekânlar, yarışmalar ya da iş birlikleri. Projenizden bahsedin, iki iş günü içinde yanıt vereyim.",
        "email": "E-posta", "studio": "Stüdyo", "hours": "Çalışma saatleri", "hours_v": "Pzt – Cum, 09:00 – 18:00", "social": "Sosyal medya",
        "name": "Ad soyad", "mail": "E-posta", "company": "Firma (isteğe bağlı)", "type": "Proje türü",
        "types": ["Konut", "Ticari", "İç mimarlık", "Kentsel", "Diğer"],
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
    <div><dt class="label">{c["email"]}</dt><dd><a href="mailto:hello@berknazlim.com">hello@berknazlim.com</a></dd></div>
    <div><dt class="label">{c["studio"]}</dt><dd>{city}</dd></div>
    <div><dt class="label">{c["hours"]}</dt><dd>{c["hours_v"]}</dd></div>
    <div><dt class="label">{c["social"]}</dt><dd><a href="https://instagram.com/" target="_blank" rel="noopener">Instagram</a> · <a href="https://linkedin.com/" target="_blank" rel="noopener">LinkedIn</a></dd></div>
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
        "index.html": ("Berk Nazlım — Architect, Istanbul", "Berk Nazlım is an Istanbul-based architect designing cultural, residential and mixed-use buildings."),
        "portfolio.html": ("Portfolio — Berk Nazlım", "Selected projects by Berk Nazlım: cultural buildings, towers, hotels, housing and competitions."),
        "project.html": ("Project — Berk Nazlım", "A project by Berk Nazlım Architecture."),
        "services.html": ("Services — Berk Nazlım", "Architectural design, interiors, urban design, restoration, visualisation and competitions."),
        "about.html": ("About — Berk Nazlım", "Berk Nazlım is an architect from Istanbul and a graduate of Istanbul Technical University (2026)."),
        "journal.html": ("Journal — Berk Nazlım", "News and essays on architecture, materials, technology and cities."),
        "post.html": ("Journal — Berk Nazlım", "An article from the Berk Nazlım journal."),
        "contact.html": ("Contact — Berk Nazlım", "Contact Berk Nazlım Architecture in Istanbul about a new project."),
    },
    "tr": {
        "index.html": ("Berk Nazlım — Mimar, İstanbul", "Berk Nazlım, kültür, konut ve karma kullanımlı yapılar tasarlayan İstanbul merkezli bir mimar."),
        "portfolio.html": ("Projeler — Berk Nazlım", "Berk Nazlım'ın seçili projeleri: kültür yapıları, kuleler, oteller, konutlar ve yarışmalar."),
        "project.html": ("Proje — Berk Nazlım", "Berk Nazlım Mimarlık projesi."),
        "services.html": ("Hizmetler — Berk Nazlım", "Mimari tasarım, iç mimarlık, kentsel tasarım, restorasyon, görselleştirme ve yarışmalar."),
        "about.html": ("Hakkında — Berk Nazlım", "Berk Nazlım, İstanbul Teknik Üniversitesi 2026 mezunu, İstanbullu bir mimar."),
        "journal.html": ("Günlük — Berk Nazlım", "Mimarlık, malzeme, teknoloji ve kentler üzerine haberler ve yazılar."),
        "post.html": ("Günlük — Berk Nazlım", "Berk Nazlım günlüğünden bir yazı."),
        "contact.html": ("İletişim — Berk Nazlım", "Yeni bir proje için İstanbul'daki Berk Nazlım Mimarlık ile iletişime geçin."),
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
nf = nf.replace('href="favicon', 'href="/favicon').replace('href="assets/', 'href="/assets/')
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
    fh.write("</urlset>\n")

print("Built", len(PAGES) * 2 + 1, "pages")
