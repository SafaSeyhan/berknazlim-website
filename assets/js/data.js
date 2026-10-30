/* ==========================================================================
   Site content (English + Turkish). Edit this file to change projects and
   journal posts. Every text field has an `en` and a `tr` version.

   PROJECTS come from Berk's portfolio. Images live in
   assets/img/projects/<slug>/ as NN.jpg (1600px) plus NN-sm.jpg (800px),
   which cards load on small screens. To add a project, copy one block,
   give it a new slug and folder, and run `python3 tools/build.py` so the
   sitemap picks it up. Fields you leave out (year, area, client…) are
   simply not shown.

   POSTS are sorted by date automatically (newest first). `body` is HTML.
   ========================================================================== */

window.SITE = {
  email: "nazlimberk@gmail.com",
  linkedin: "https://www.linkedin.com/in/berk-nazl%C4%B1m-11b173279",
};

// gallery helper: [file number, English caption, Turkish caption, "wide" to span the full width]
const shots = (slug, list) => list.map(([n, en, tr, size]) => ({ src: `assets/img/projects/${slug}/${n}.jpg`, en, tr, wide: size === "wide" }));

window.PROJECTS = [
  {
    slug: "ortakoy-dansresim",
    year: 2025,
    form: "hall",
    featured: true,
    image: "assets/img/projects/ortakoy-dansresim/03.jpg",
    hero: "assets/img/projects/ortakoy-dansresim/01.jpg",
    gallery: shots("ortakoy-dansresim", [
      ["01", "Section through the gallery void", "Galeri boşluğundan kesit", "wide"],
      ["04", "Foyer and café", "Fuaye ve kafe"],
      ["05", "Dance studio", "Dans stüdyosu"],
      ["06", "Glass stair between the concrete walls", "Beton duvarlar arasındaki cam merdiven"],
      ["02", "Gallery and stage levels", "Galeri ve sahne katları", "wide"],
      ["07", "Circulation diagram", "Dolaşım diyagramı", "wide"],
      ["08", "Sections", "Kesitler", "wide"],
      ["09", "Sprung floor detail", "Esnek dans zemini detayı"],
    ]),
    en: {
      title: "Ortaköy DansResim",
      location: "Ortaköy, Istanbul",
      category: "Cultural",
      status: "Academic project, ITU",
      summary: "A dance academy in Ortaköy that grows into an art centre where dance and painting meet.",
      body: [
        "DansResim began as a dance academy and became a cultural centre in which dance and painting share one building. From the entrance, the gallery opens as a single tall void, so the first thing a visitor meets is the art. The stage and the dance studios sit above it.",
        "The stairs are made of glass and run between load-bearing concrete walls, like a ballerina's steps within discipline. Movement through the building is part of the performance.",
        "A café and restaurant serve families while their children train. The studios have sprung dance floors, and a physiotherapy room supports the dancers. The plan moves from the general to the specific: public gallery and café below, then increasingly private spaces for training above.",
      ],
    },
    tr: {
      title: "Ortaköy DansResim",
      location: "Ortaköy, İstanbul",
      category: "Kültür",
      status: "Akademik proje, İTÜ",
      summary: "Ortaköy'de, dans ile resmin buluştuğu bir sanat merkezine dönüşen bir dans akademisi.",
      body: [
        "DansResim bir dans akademisi olarak başladı ve dans ile resmin aynı binayı paylaştığı bir kültür merkezine dönüştü. Girişten itibaren galeri tek ve yüksek bir boşluk olarak açılır; ziyaretçinin ilk karşılaştığı şey sanattır. Sahne ve dans stüdyoları bu boşluğun üzerinde yer alır.",
        "Merdivenler camdan yapılmıştır ve taşıyıcı beton duvarların arasından geçer: disiplin içindeki bir balerinin adımları gibi. Binanın içindeki hareket, gösterinin bir parçası olur.",
        "Kafe ve restoran, çocukları ders alırken ailelere hizmet verir. Stüdyolarda esnek dans zeminleri, dansçılar için de bir fizyoterapi odası bulunur. Plan genelden özele doğru akar: altta kamusal galeri ve kafe, yukarıda giderek daha özel hâle gelen çalışma mekânları.",
      ],
    },
  },
  {
    slug: "yedimavi-residence",
    year: 2025,
    form: "house",
    featured: true,
    image: "assets/img/projects/yedimavi-residence/01.jpg",
    gallery: shots("yedimavi-residence", [
      ["02", "TV wall in marble and walnut", "Mermer ve ceviz TV duvarı"],
      ["07", "Dining wall with brass inlays", "Pirinç kakmalı yemek alanı duvarı"],
      ["03", "Living room", "Oturma odası"],
      ["04", "Study", "Çalışma odası"],
      ["05", "Main bedroom", "Ebeveyn yatak odası"],
      ["06", "Bedroom", "Yatak odası"],
    ]),
    en: {
      title: "YediMavi House",
      location: "Zeytinburnu, Istanbul",
      category: "Interior",
      status: "Freelance commission",
      summary: "The interior of a high-rise apartment for a married couple, built around marble, walnut and brass.",
      body: [
        "A freelance interior design for a residential apartment in the YediMavi towers in Zeytinburnu, designed for a married couple.",
        "The living and dining room is organised around two feature walls: dark marble panels set into walnut, divided by thin brass inlays. The rest of the palette stays quiet, with white joinery, soft fabrics and dark timber floors, so the materials and the city view carry the space.",
        "The project covers the living and dining room, the TV wall, a study and the bedrooms, each with built-in storage designed to keep the rooms calm.",
      ],
    },
    tr: {
      title: "YediMavi Konut Projesi",
      location: "Zeytinburnu, İstanbul",
      category: "İç mimari",
      status: "Serbest proje",
      summary: "Evli bir çift için mermer, ceviz ve pirinç üzerine kurulu bir yüksek katlı daire iç mimarisi.",
      body: [
        "Zeytinburnu'ndaki YediMavi konutlarında, evli bir çift için tasarlanan bir dairenin serbest iç mimari projesi.",
        "Oturma ve yemek alanı iki vurgu duvarı etrafında kurgulandı: ceviz içine yerleştirilmiş koyu mermer paneller, ince pirinç kakmalarla bölünür. Paletin geri kalanı sakin tutuldu; beyaz dolaplar, yumuşak kumaşlar ve koyu ahşap zeminler sayesinde mekânı malzemeler ve şehir manzarası taşır.",
        "Proje oturma ve yemek odasını, TV duvarını, çalışma odasını ve yatak odalarını kapsar; her birinde odaları sade tutmak için tasarlanmış gömme depolama alanları bulunur.",
      ],
    },
  },
  {
    slug: "book-cafe-canakkale",
    year: 2024,
    form: "pavilion",
    featured: true,
    image: "assets/img/projects/book-cafe-canakkale/01.jpg",
    gallery: shots("book-cafe-canakkale", [
      ["05", "Physical model in bamboo and walnut", "Bambu ve cevizden fiziksel model", "wide"],
      ["02", "Reading room toward the strait", "Boğaza bakan okuma salonu"],
      ["03", "Ceiling slit and vertical panels", "Tavan yarığı ve dikey paneller"],
      ["04", "Model, garden side", "Model, bahçe cephesi"],
      ["06", "Model, exterior", "Model, dış görünüş", "wide"],
      ["07", "Plans and concept", "Planlar ve konsept", "wide"],
    ]),
    en: {
      title: "Café Tales, Hellespont",
      location: "Çanakkale",
      category: "Hospitality",
      status: "Academic project, ITU",
      summary: "A book café where the myths of the Hellespont meet today, looking over the Çanakkale strait.",
      body: [
        "A book café in Çanakkale where the old stories of the Hellespont meet everyday life. The building looks over the strait on one side and opens to a garden on the other.",
        "It is built from natural, local materials: a pine plank structure, walnut veneer on the walls and furniture, and a solid teak floor laid in chevron. A slit in the ceiling and a rhythm of vertical panels soften the sunlight so that it falls evenly on the pages.",
        "The bookcase and the furniture were designed for the project. The physical model was made from the same family of materials, bamboo and walnut, to test the atmosphere as well as the form.",
      ],
    },
    tr: {
      title: "Kitap Kafe, Hellespontos",
      location: "Çanakkale",
      category: "Ağırlama",
      status: "Akademik proje, İTÜ",
      summary: "Çanakkale Boğazı'na bakan, Hellespontos mitlerinin bugünle buluştuğu bir kitap kafe.",
      body: [
        "Çanakkale'de, Hellespontos'un eski hikâyelerinin gündelik hayatla buluştuğu bir kitap kafe. Bina bir yanıyla boğaza bakar, diğer yanıyla bir bahçeye açılır.",
        "Doğal ve yerel malzemelerle kurulur: çam kalas taşıyıcı sistem, duvarlarda ve mobilyada ceviz kaplama ve balıksırtı döşenmiş masif tik zemin. Tavandaki yarık ve dikey paneller güneş ışığını yumuşatarak sayfaların üzerine eşit biçimde düşmesini sağlar.",
        "Kitaplık ve mobilyalar projeye özel tasarlandı. Fiziksel model de aynı malzeme ailesinden, bambu ve cevizden yapıldı; böylece yalnızca biçim değil atmosfer de denendi.",
      ],
    },
  },
  {
    slug: "bahcekoy-organics",
    year: 2024,
    form: "school",
    image: "assets/img/projects/bahcekoy-organics/02.jpg",
    gallery: shots("bahcekoy-organics", [
      ["03", "Lounge", "Lounge", "wide"],
      ["01", "Open kitchen", "Açık mutfak", "wide"],
      ["05", "Cosy corner", "Sakin köşe"],
      ["04", "Private dining", "Özel yemek alanı", "wide"],
      ["06", "Ground and first floor plans, section A-A", "Zemin ve birinci kat planları, A-A kesiti", "wide"],
    ]),
    en: {
      title: "Bahçeköy Organics",
      location: "Bahçeköy, Sarıyer",
      category: "Hospitality",
      status: "Academic project, ITU",
      summary: "A garden-to-plate restaurant at the social centre of the Bahçeköy plantation.",
      body: [
        "The Bahçeköy plantation has a social centre of five buildings: a gardening school, an ISMEK public education centre, a library and a restaurant. This project is the café and restaurant.",
        "It serves fine dining made with produce from the surrounding village, and the open kitchen puts that journey from garden to plate on show.",
        "Around the main dining room the plan adds private dining, meeting rooms and quieter, cosy corners, so the building works for a family lunch, a workshop group or a long evening.",
      ],
    },
    tr: {
      title: "Bahçeköy Organics",
      location: "Bahçeköy, Sarıyer",
      category: "Ağırlama",
      status: "Akademik proje, İTÜ",
      summary: "Bahçeköy fidanlığının sosyal merkezinde, bahçeden tabağa bir restoran.",
      body: [
        "Bahçeköy fidanlığında beş binadan oluşan bir sosyal merkez bulunur: bahçecilik okulu, İSMEK halk eğitim merkezi, kütüphane ve restoran. Bu proje, merkezin kafe ve restoranıdır.",
        "Çevredeki köyün ürünleriyle hazırlanan bir fine dining sunar; açık mutfak da bahçeden tabağa uzanan bu yolculuğu görünür kılar.",
        "Ana salonun çevresinde özel yemek alanları, toplantı odaları ve daha sakin köşeler yer alır; böylece bina bir aile yemeğine, bir atölye grubuna ya da uzun bir akşama uyum sağlar.",
      ],
    },
  },
  {
    slug: "water-encounters",
    form: "pavilion",
    image: "assets/img/projects/water-encounters/03.jpg",
    gallery: shots("water-encounters", [
      ["05", "Axonometric view", "Aksonometrik görünüş", "wide"],
      ["01", "Model from above", "Modelin üstten görünüşü"],
      ["02", "Floating pier, model", "Yüzer iskele, model"],
      ["04", "Canoe centre, model", "Kano merkezi, model"],
      ["06", "Site section and floating system", "Arazi kesiti ve yüzer sistem", "wide"],
    ]),
    en: {
      title: "Water Encounters",
      location: "Örnektepe, Golden Horn",
      category: "Recreation",
      status: "Academic project, ITU",
      summary: "A canoe centre and social hub on the Golden Horn, with a floating pier and a sea-taxi stop.",
      body: [
        "A canoe centre and social centre on the shore of the Golden Horn at Örnektepe, with a stop for the sea taxi.",
        "The pier floats. It is carried by air-filled balloons under the water, which is possible because the water of the Golden Horn is calm. The platforms step down towards the water so that people can sit, launch a canoe or simply watch.",
        "The project was developed through physical models that test how the stepped decks meet the shore.",
      ],
    },
    tr: {
      title: "Suyla Karşılaşmalar",
      location: "Örnektepe, Haliç",
      category: "Rekreasyon",
      status: "Akademik proje, İTÜ",
      summary: "Haliç kıyısında yüzer iskelesi ve deniz taksi durağıyla bir kano ve sosyal merkez.",
      body: [
        "Haliç kıyısında, Örnektepe'de, deniz taksi durağı da olan bir kano merkezi ve sosyal merkez.",
        "İskele yüzer. Suyun altındaki hava dolu balonlarla taşınır; bu, Haliç'in sakin suyu sayesinde mümkündür. Platformlar suya doğru basamaklanarak iner; insanlar oturabilir, kanosunu suya indirebilir ya da sadece izleyebilir.",
        "Proje, basamaklı güvertelerin kıyıyla nasıl buluştuğunu deneyen fiziksel modellerle geliştirildi.",
      ],
    },
  },
  {
    slug: "future-forms-of-living",
    form: "housing",
    image: "assets/img/projects/future-forms-of-living/01.jpg",
    gallery: shots("future-forms-of-living", [
      ["02", "Concept sketch", "Konsept eskizi"],
      ["03", "Campsite at night", "Gece kamp alanı"],
      ["04", "Terraces down to the sea", "Denize inen teraslar"],
      ["06", "Unit model", "Birim modeli"],
      ["05", "Site model", "Arazi modeli"],
    ]),
    en: {
      title: "Future Forms of Living",
      location: "Kınalıada, Istanbul",
      category: "Residential",
      status: "Academic project, ITU",
      summary: "A getaway for future holidaymakers on the slopes of Kınalıada.",
      body: [
        "A retreat on Kınalıada that asks how people might holiday in the future. Small living units are set into the slope of the island.",
        "Between them are campsites where guests spend the night together, and at the bottom of the slope piers reach out for the sun and the sea.",
        "The project was worked out through hand sketches and cardboard and wood models.",
      ],
    },
    tr: {
      title: "Geleceğin Yaşam Biçimleri",
      location: "Kınalıada, İstanbul",
      category: "Konut",
      status: "Akademik proje, İTÜ",
      summary: "Kınalıada'nın yamaçlarında, geleceğin tatilcileri için bir kaçış noktası.",
      body: [
        "Kınalıada'da, insanların gelecekte nasıl tatil yapabileceğini soran bir kaçış noktası. Küçük yaşam birimleri adanın yamacına yerleşir.",
        "Aralarında konukların geceyi birlikte geçirdiği kamp alanları, yamacın en altında ise güneşe ve denize uzanan iskeleler bulunur.",
        "Proje elle çizilmiş eskizler ile karton ve ahşap modeller üzerinden geliştirildi.",
      ],
    },
  },
];

window.POSTS = [
  {
    slug: "designing-for-the-next-earthquake",
    date: "2026-10-20",
    form: "housing",
    en: {
      title: "Designing for the next earthquake",
      category: "Resilience",
      readTime: "6 min",
      excerpt: "For an architect in Istanbul, seismic safety is not a technical appendix. It is the starting point of every line we draw.",
      body: `
        <p>Every architect who studies in Istanbul learns the same lesson early: the ground beneath this city moves. Seismic safety is not a technical appendix handed to the engineer at the end. It is the first constraint, and it should shape the plan, the section and the way a neighbourhood is laid out.</p>
        <h2>Form follows forces</h2>
        <p>Regular plans, continuous load paths and avoiding soft storeys sound like textbook rules, but they are also design opportunities. A clear structural rhythm gives a façade its order. A generous ground floor that is properly stiffened can still be open and public.</p>
        <blockquote>A safe building is not a compromise on beauty. It is the precondition for it.</blockquote>
        <h2>Thinking beyond the single building</h2>
        <p>Resilience also lives at the scale of the street. Courtyards and squares that work as assembly areas, short walks to safe ground and mixed-use blocks that keep services running after a disaster are all architectural decisions.</p>
        <ul>
          <li>Base isolation and damping are becoming more accessible for mid-rise housing.</li>
          <li>Retrofitting existing buildings is often faster and lower in carbon than demolition.</li>
          <li>Community participation keeps rebuilt neighbourhoods recognisable to the people who live there.</li>
        </ul>
        <p>For anyone training in Istanbul, these ideas belong at the start of every project, not at the end.</p>`,
    },
    tr: {
      title: "Bir sonraki deprem için tasarlamak",
      category: "Dayanıklılık",
      readTime: "6 dk",
      excerpt: "İstanbul'da çalışan bir mimar için deprem güvenliği teknik bir ek değildir. Çizdiğimiz her çizginin başlangıç noktasıdır.",
      body: `
        <p>İstanbul'da mimarlık okuyan herkes aynı dersi erkenden öğrenir: bu şehrin altındaki zemin hareket eder. Deprem güvenliği, işin sonunda mühendise devredilen teknik bir ek değildir. İlk kısıttır ve planı, kesiti, hatta bir mahallenin nasıl kurgulandığını biçimlendirmelidir.</p>
        <h2>Biçim kuvvetleri izler</h2>
        <p>Düzenli planlar, kesintisiz yük aktarımı ve yumuşak kattan kaçınmak ders kitabı kuralları gibi görünür; ama aynı zamanda tasarım fırsatlarıdır. Net bir taşıyıcı ritim cepheye düzen verir. Doğru rijitleştirilmiş cömert bir zemin kat, yine de açık ve kamusal olabilir.</p>
        <blockquote>Güvenli bir bina, güzellikten verilmiş bir taviz değildir. Güzelliğin ön koşuludur.</blockquote>
        <h2>Tek binanın ötesinde düşünmek</h2>
        <p>Dayanıklılık sokak ölçeğinde de yaşar. Toplanma alanı olarak çalışan avlular ve meydanlar, güvenli alanlara kısa yürüme mesafeleri ve afetten sonra hizmetlerin sürmesini sağlayan karma kullanımlı bloklar birer mimari karardır.</p>
        <ul>
          <li>Sismik izolasyon ve sönümleme, orta yükseklikteki konutlar için giderek daha erişilebilir hâle geliyor.</li>
          <li>Mevcut binaların güçlendirilmesi çoğu zaman yıkımdan daha hızlı ve daha düşük karbonludur.</li>
          <li>Katılımcı süreçler, yeniden inşa edilen mahallelerin sakinleri için tanıdık kalmasını sağlar.</li>
        </ul>
        <p>İstanbul'da mimarlık öğrenen herkes için bu fikirler her projenin sonunda değil, başında yer almalı.</p>`,
    },
  },
  {
    slug: "mass-timber-is-climbing",
    date: "2026-10-08",
    form: "school",
    en: {
      title: "Mass timber is climbing. Should Türkiye follow?",
      category: "Materials",
      readTime: "5 min",
      excerpt: "Engineered timber has moved from pavilions to high-rise buildings. What could it mean for construction in Türkiye?",
      body: `
        <p>Over the last decade, engineered timber such as cross-laminated timber (CLT) and glulam has moved from small pavilions to schools, offices and towers across Europe, North America and Japan. The arguments are familiar: timber stores carbon, prefabrication speeds up construction and the interiors are warm and calm.</p>
        <h2>The local question</h2>
        <p>Türkiye builds overwhelmingly in reinforced concrete. Changing that means building a supply chain, updating fire and seismic regulations and training a workforce. None of that happens overnight, but hybrid systems, such as timber floors on concrete or steel frames, are a realistic first step.</p>
        <blockquote>The greenest material is the one that fits its context. Timber deserves a serious place in that conversation.</blockquote>
        <p>Timber is also light, and lighter buildings attract smaller seismic forces. That alone makes it worth studying for our region.</p>`,
    },
    tr: {
      title: "Ahşap yükseliyor. Türkiye de izlemeli mi?",
      category: "Malzeme",
      readTime: "5 dk",
      excerpt: "Mühendislik ahşabı pavyonlardan yüksek binalara geçti. Türkiye'deki inşaat için ne anlama gelebilir?",
      body: `
        <p>Son on yılda çapraz lamine ahşap (CLT) ve tutkallı lamine ahşap gibi mühendislik ahşapları; Avrupa, Kuzey Amerika ve Japonya'da küçük pavyonlardan okullara, ofislere ve kulelere geçti. Gerekçeler tanıdık: ahşap karbon depolar, prefabrikasyon inşaatı hızlandırır ve iç mekânlar sıcak ve sakin olur.</p>
        <h2>Yerel soru</h2>
        <p>Türkiye ağırlıklı olarak betonarme inşa ediyor. Bunu değiştirmek; bir tedarik zinciri kurmayı, yangın ve deprem yönetmeliklerini güncellemeyi ve iş gücünü eğitmeyi gerektiriyor. Bunların hiçbiri bir gecede olmaz; ancak beton ya da çelik karkas üzerine ahşap döşemeler gibi hibrit sistemler gerçekçi bir ilk adımdır.</p>
        <blockquote>En yeşil malzeme, bağlamına uyan malzemedir. Ahşap bu tartışmada ciddi bir yeri hak ediyor.</blockquote>
        <p>Ahşap aynı zamanda hafiftir ve daha hafif binalar daha küçük deprem kuvvetleri çeker. Yalnızca bu bile onu bölgemiz için incelemeye değer kılıyor.</p>`,
    },
  },
  {
    slug: "ai-in-the-studio",
    date: "2026-09-24",
    form: "tower",
    en: {
      title: "AI in the studio: a tool, not an author",
      category: "Technology",
      readTime: "4 min",
      excerpt: "Generative tools are changing how architects sketch, test and present. They are not changing who is responsible.",
      body: `
        <p>Image generators, parametric scripts and analysis plug-ins have entered every architecture studio. In a single afternoon we can test dozens of massing options against daylight, wind and views. That is a real change in how we work.</p>
        <h2>Where it helps</h2>
        <ul>
          <li>Fast early-stage exploration of form and orientation.</li>
          <li>Environmental analysis that once took weeks.</li>
          <li>Clearer communication with clients through quick visualisation.</li>
        </ul>
        <h2>Where it does not</h2>
        <p>A tool cannot visit the site, listen to a client or take responsibility for a decision. The architect's judgement about people, place and what is worth building remains the core of the profession.</p>
        <blockquote>Use the machine to see more options. Use your judgement to choose.</blockquote>`,
    },
    tr: {
      title: "Stüdyoda yapay zekâ: yazar değil, araç",
      category: "Teknoloji",
      readTime: "4 dk",
      excerpt: "Üretken araçlar mimarların eskiz yapma, test etme ve sunum biçimini değiştiriyor. Sorumluluğun kimde olduğunu değiştirmiyor.",
      body: `
        <p>Görsel üreticiler, parametrik betikler ve analiz eklentileri her mimarlık stüdyosuna girdi. Tek bir öğleden sonra düzinelerce kütle seçeneğini gün ışığı, rüzgâr ve manzaraya göre test edebiliyoruz. Bu, çalışma biçimimizde gerçek bir değişim.</p>
        <h2>Nerede yardımcı oluyor</h2>
        <ul>
          <li>Erken aşamada biçim ve yönlenmenin hızlıca araştırılması.</li>
          <li>Eskiden haftalar süren çevresel analizler.</li>
          <li>Hızlı görselleştirmeyle müşteriyle daha net iletişim.</li>
        </ul>
        <h2>Nerede yetmiyor</h2>
        <p>Bir araç araziyi ziyaret edemez, müşteriyi dinleyemez ya da bir kararın sorumluluğunu alamaz. Mimarın insanlar, yer ve neyin inşa edilmeye değer olduğu konusundaki yargısı mesleğin özü olmaya devam ediyor.</p>
        <blockquote>Daha fazla seçenek görmek için makineyi kullanın. Seçmek için kendi yargınızı.</blockquote>`,
    },
  },
  {
    slug: "the-return-of-thick-walls",
    date: "2026-09-10",
    form: "stone",
    en: {
      title: "The return of thick walls",
      category: "Sustainability",
      readTime: "5 min",
      excerpt: "As Mediterranean summers get hotter, vernacular strategies of mass, shade and ventilation are back on the drawing board.",
      body: `
        <p>Long before air-conditioning, builders around the Mediterranean kept houses cool with thick masonry walls, small openings towards the sun, shaded courtyards and cross-ventilation. As summers get hotter, these passive strategies are becoming relevant again.</p>
        <h2>Mass and time</h2>
        <p>Heavy walls delay heat. They absorb it during the day and release it at night, when it can be flushed out by cooler air. Combined with good shading, thermal mass can keep interiors comfortable for most of the year.</p>
        <h2>Learning from the vernacular</h2>
        <p>The cave dwellings of Cappadocia, the stone houses of Mardin and the courtyard houses of the Aegean are not nostalgic references. They are tested climate technology, and they still have a lot to teach us.</p>`,
    },
    tr: {
      title: "Kalın duvarların dönüşü",
      category: "Sürdürülebilirlik",
      readTime: "5 dk",
      excerpt: "Akdeniz yazları ısındıkça kütle, gölge ve havalandırmaya dayalı yerel stratejiler yeniden çizim masasına dönüyor.",
      body: `
        <p>Klimadan çok önce, Akdeniz çevresindeki ustalar evleri kalın yığma duvarlar, güneşe bakan küçük açıklıklar, gölgeli avlular ve çapraz havalandırmayla serin tutuyordu. Yazlar ısındıkça bu pasif stratejiler yeniden önem kazanıyor.</p>
        <h2>Kütle ve zaman</h2>
        <p>Ağır duvarlar ısıyı geciktirir. Gündüz ısıyı emer, gece ise serin havayla dışarı atılabileceği zaman geri verir. İyi bir gölgelemeyle birleştiğinde ısıl kütle, iç mekânları yılın büyük bölümünde konforlu tutabilir.</p>
        <h2>Yerel mimariden öğrenmek</h2>
        <p>Kapadokya'nın kaya evleri, Mardin'in taş evleri ve Ege'nin avlulu evleri nostaljik referanslar değildir. Bunlar denenmiş iklim teknolojileridir ve bize hâlâ öğretecekleri çok şey var.</p>`,
    },
  },
  {
    slug: "adaptive-reuse-greenest-building",
    date: "2026-08-27",
    form: "library",
    en: {
      title: "The greenest building is the one already standing",
      category: "Heritage",
      readTime: "4 min",
      excerpt: "Demolition throws away the carbon already spent. Adaptive reuse keeps it, and keeps a city's memory too.",
      body: `
        <p>A large share of a building's lifetime emissions is spent before anyone moves in: in making cement, steel and glass, and in construction itself. Demolishing a sound structure throws that investment away.</p>
        <h2>More than carbon</h2>
        <p>Old warehouses, factories and depots also hold the memory of a city. Turning them into libraries, schools or housing keeps that memory alive while giving the building a new life.</p>
        <blockquote>Reuse is not the conservative option. It is often the most radical one.</blockquote>
        <p>Istanbul's waterfronts are full of such buildings. Each one is a chance to show what they could become.</p>`,
    },
    tr: {
      title: "En yeşil bina, zaten ayakta olandır",
      category: "Miras",
      readTime: "4 dk",
      excerpt: "Yıkım, harcanmış karbonu çöpe atar. Yeniden kullanım onu korur; kentin hafızasını da.",
      body: `
        <p>Bir binanın ömrü boyunca ürettiği emisyonların büyük bir kısmı, daha kimse taşınmadan harcanır: çimento, çelik ve cam üretiminde ve inşaatın kendisinde. Sağlam bir yapıyı yıkmak bu yatırımı çöpe atmak demektir.</p>
        <h2>Karbondan fazlası</h2>
        <p>Eski antrepolar, fabrikalar ve depolar aynı zamanda kentin hafızasını taşır. Onları kütüphaneye, okula ya da konuta dönüştürmek, binaya yeni bir hayat verirken bu hafızayı da canlı tutar.</p>
        <blockquote>Yeniden kullanım muhafazakâr seçenek değildir. Çoğu zaman en radikal olanıdır.</blockquote>
        <p>İstanbul'un kıyıları bu tür binalarla dolu. Her biri, neye dönüşebileceklerini göstermek için bir fırsat.</p>`,
    },
  },
  {
    slug: "notes-from-taskisla",
    date: "2026-07-15",
    form: "hall",
    en: {
      title: "Notes from Taşkışla: graduating in 2026",
      category: "Studio",
      readTime: "3 min",
      excerpt: "Some reflections on finishing architecture school at ITU, and on what comes next.",
      body: `
        <p>Taşkışla, home of ITU's Faculty of Architecture, is a building that teaches by itself. Its thick walls, long corridors and courtyard taught me as much about proportion and light as any lecture.</p>
        <h2>What I am taking with me</h2>
        <ul>
          <li>Drawing by hand before opening any software.</li>
          <li>Designing the section as carefully as the plan.</li>
          <li>Respecting the city as the real client.</li>
        </ul>
        <p>This journal will follow my work, new projects and the ideas shaping architecture today. Thank you for reading.</p>`,
    },
    tr: {
      title: "Taşkışla'dan notlar: 2026 mezuniyeti",
      category: "Stüdyo",
      readTime: "3 dk",
      excerpt: "İTÜ'de mimarlık eğitimini bitirmek ve sonrası üzerine birkaç düşünce.",
      body: `
        <p>İTÜ Mimarlık Fakültesi'ne ev sahipliği yapan Taşkışla, kendi başına öğreten bir bina. Kalın duvarları, uzun koridorları ve avlusu bana oran ve ışık hakkında herhangi bir ders kadar şey öğretti.</p>
        <h2>Yanımda götürdüklerim</h2>
        <ul>
          <li>Herhangi bir yazılımı açmadan önce elle çizmek.</li>
          <li>Kesiti de plan kadar özenle tasarlamak.</li>
          <li>Kenti asıl işveren olarak görmek.</li>
        </ul>
        <p>Bu günlük; çalışmalarımı, yeni projeleri ve bugün mimarlığı biçimlendiren fikirleri takip edecek. Okuduğunuz için teşekkürler.</p>`,
    },
  },
];
