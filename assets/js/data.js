/* ==========================================================================
   Site content (English + Turkish). Edit this file to change projects and
   journal posts. Every text field has an `en` and a `tr` version.

   PROJECTS are placeholders: replace them with Berk's real work.
   To show real photos instead of the generated drawings, put the files in
   assets/img/ and add to a project:
       image: "assets/img/bosphorus-cover.jpg",
       gallery: ["assets/img/b1.jpg", "assets/img/b2.jpg", "assets/img/b3.jpg"],

   POSTS are sorted by date automatically (newest first). `body` is HTML.
   ========================================================================== */

window.SITE = {
  email: "hello@berknazlim.com",
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/",
};

window.PROJECTS = [
  {
    slug: "bosphorus-light-pavilion",
    year: 2026,
    form: "pavilion",
    featured: true,
    en: {
      title: "Bosphorus Light Pavilion",
      location: "Istanbul, Türkiye",
      category: "Cultural",
      status: "Completed",
      area: "1,240 m²",
      client: "Istanbul Design Foundation",
      summary: "A floating canopy of 3,200 perforated aluminium fins that turns the light of the Bosphorus into architecture.",
      body: [
        "Set on the European shore between two historic waterside mansions, the pavilion is a single sweeping roof carried by twelve slender columns. Its underside is a field of perforated fins, each rotated by a script that reads the water's reflection at different hours of the day.",
        "In the morning the canopy throws a cool, rippling light; at sunset it glows amber across the strait. The plan stays almost entirely open, so the pavilion behaves like a public square with a ceiling rather than a building with walls.",
        "The structure was optimised computationally to use 38% less steel than a conventional space frame, and every fin can be dismantled and reused.",
      ],
      awards: ["Shortlisted, World Architecture Festival 2026", "Arkitera Young Architect Award 2026"],
    },
    tr: {
      title: "Boğaziçi Işık Pavyonu",
      location: "İstanbul, Türkiye",
      category: "Kültür",
      status: "Tamamlandı",
      area: "1.240 m²",
      client: "İstanbul Tasarım Vakfı",
      summary: "Boğaz'ın ışığını mimariye dönüştüren, 3.200 delikli alüminyum kanattan oluşan yüzen bir saçak.",
      body: [
        "Avrupa yakasında iki tarihi yalı arasında yer alan pavyon, on iki ince kolonun taşıdığı tek ve akıcı bir çatıdan oluşur. Çatının alt yüzü, her biri suyun günün farklı saatlerindeki yansımasını okuyan bir algoritmayla döndürülmüş delikli kanatlardan meydana gelir.",
        "Sabahları saçak serin ve dalgalı bir ışık yayar; gün batımında ise boğazın üzerinde kehribar rengiyle parlar. Plan neredeyse tamamen açık bırakıldı; böylece pavyon, duvarları olan bir binadan çok tavanı olan bir kamusal meydan gibi davranır.",
        "Taşıyıcı sistem, geleneksel bir uzay kafes sisteme göre %38 daha az çelik kullanacak şekilde hesaplamalı olarak optimize edildi ve her kanat sökülüp yeniden kullanılabilir.",
      ],
      awards: ["Finalist, World Architecture Festival 2026", "Arkitera Genç Mimar Ödülü 2026"],
    },
  },
  {
    slug: "levent-helix-tower",
    year: 2027,
    form: "tower",
    featured: true,
    en: {
      title: "Levent Helix Tower",
      location: "Levent, Istanbul",
      category: "Mixed-use",
      status: "In design",
      area: "86,000 m²",
      client: "Confidential",
      summary: "A 52-storey tower whose floor plates rotate 1.4° each, wrapping sky gardens around its core.",
      body: [
        "The Helix Tower rethinks the business-district skyscraper as a vertical neighbourhood. Each floor plate turns 1.4° relative to the one below, and the twist opens a continuous spiral of terraces planted with species native to the Marmara region.",
        "The rotation is not decoration. Wind-tunnel studies showed that it reduces vortex shedding by almost a third, which allowed a lighter structure and a slimmer core.",
        "Offices, a hotel and residences stack from bottom to top, linked by a public sky lobby on the 30th floor with a 360° view from the Black Sea to the Sea of Marmara.",
      ],
      awards: ["1st Prize, Invited Competition 2026"],
    },
    tr: {
      title: "Levent Helix Kulesi",
      location: "Levent, İstanbul",
      category: "Karma kullanım",
      status: "Tasarım aşamasında",
      area: "86.000 m²",
      client: "Gizli",
      summary: "Kat döşemeleri her katta 1,4° dönen ve çekirdeğin etrafına gökyüzü bahçeleri saran 52 katlı bir kule.",
      body: [
        "Helix Kulesi, iş merkezindeki gökdeleni dikey bir mahalle olarak yeniden düşünür. Her kat döşemesi bir alttakine göre 1,4° döner ve bu dönüş, Marmara bölgesine özgü bitkilerle yeşillendirilmiş kesintisiz bir teras sarmalı oluşturur.",
        "Bu dönüş bir süsleme değildir. Rüzgâr tüneli çalışmaları, dönüşün girdap oluşumunu neredeyse üçte bir oranında azalttığını gösterdi; bu da daha hafif bir taşıyıcı sistem ve daha ince bir çekirdek sağladı.",
        "Ofisler, otel ve konutlar aşağıdan yukarıya doğru üst üste yerleşir ve 30. kattaki, Karadeniz'den Marmara'ya 360° manzaralı kamusal gökyüzü lobisiyle birbirine bağlanır.",
      ],
      awards: ["Birincilik Ödülü, Davetli Yarışma 2026"],
    },
  },
  {
    slug: "cappadocia-tuff-retreat",
    year: 2026,
    form: "stone",
    featured: true,
    en: {
      title: "Tuff Retreat",
      location: "Cappadocia, Türkiye",
      category: "Hospitality",
      status: "Under construction",
      area: "4,800 m²",
      client: "Kapadokya Hospitality Group",
      summary: "Twenty-four suites carved into a volcanic ridge, continuing a thousand-year-old way of building.",
      body: [
        "Cappadocia's houses have always been carved rather than built. Tuff Retreat follows the same logic: the suites are excavated into the ridge, and the excavated stone is cut into blocks for the few walls that rise above ground.",
        "Thick tuff walls hold the day's heat into the cold desert night and keep the rooms cool in August, so mechanical heating and cooling are reduced to a minimum.",
        "From the valley the hotel almost disappears. Only a line of deep window openings and a rooftop terrace for watching the morning balloons reveal it.",
      ],
      awards: ["Commended, AR Emerging Architecture 2026"],
    },
    tr: {
      title: "Tüf Otel",
      location: "Kapadokya, Türkiye",
      category: "Turizm",
      status: "İnşaat aşamasında",
      area: "4.800 m²",
      client: "Kapadokya Turizm Grubu",
      summary: "Volkanik bir sırta oyulmuş yirmi dört süit; bin yıllık bir yapı geleneğinin devamı.",
      body: [
        "Kapadokya'nın evleri her zaman inşa edilmekten çok oyulmuştur. Tüf Otel de aynı mantığı izler: süitler sırtın içine oyulur ve çıkan taş, zeminin üzerinde yükselen birkaç duvar için blok hâline getirilir.",
        "Kalın tüf duvarlar gündüzün ısısını soğuk bozkır gecesine taşır ve ağustosta odaları serin tutar; böylece mekanik ısıtma ve soğutma ihtiyacı en aza iner.",
        "Vadiden bakıldığında otel neredeyse kaybolur. Onu yalnızca bir dizi derin pencere boşluğu ve sabah balonlarını izlemek için yapılmış çatı terası belli eder.",
      ],
      awards: ["Övgü, AR Emerging Architecture 2026"],
    },
  },
  {
    slug: "galata-archive",
    year: 2025,
    form: "library",
    en: {
      title: "Galata Archive & Library",
      location: "Karaköy, Istanbul",
      category: "Adaptive reuse",
      status: "Competition",
      area: "6,300 m²",
      client: "Municipal competition",
      summary: "A 19th-century warehouse turned into a public archive, with a glass reading room suspended inside.",
      body: [
        "The project keeps every brick of the original Karaköy warehouse and inserts a new structure that never touches the old walls. A glass reading room hangs from a steel truss above the main hall, so visitors read surrounded by the building's history.",
        "Archive stacks occupy the climate-controlled basement, and a ramp spirals from the street up to a roof terrace facing the Golden Horn.",
      ],
      awards: ["Honourable Mention, National Competition 2025"],
    },
    tr: {
      title: "Galata Arşiv ve Kütüphanesi",
      location: "Karaköy, İstanbul",
      category: "Yeniden kullanım",
      status: "Yarışma",
      area: "6.300 m²",
      client: "Belediye yarışması",
      summary: "İçinde asılı cam bir okuma salonuyla kamusal arşive dönüştürülen 19. yüzyıldan kalma bir antrepo.",
      body: [
        "Proje, Karaköy'deki özgün antreponun her tuğlasını korur ve eski duvarlara hiç dokunmayan yeni bir strüktür yerleştirir. Cam okuma salonu ana holün üzerindeki çelik bir kafes kirişe asılır; böylece ziyaretçiler binanın tarihiyle çevrili olarak okur.",
        "Arşiv rafları iklimlendirilmiş bodrum katta yer alır ve bir rampa sokaktan Haliç'e bakan çatı terasına doğru sarmal biçimde yükselir.",
      ],
      awards: ["Mansiyon, Ulusal Yarışma 2025"],
    },
  },
  {
    slug: "aegean-wind-house",
    year: 2026,
    form: "house",
    en: {
      title: "Aegean Wind House",
      location: "Bodrum, Türkiye",
      category: "Residential",
      status: "Completed",
      area: "420 m²",
      client: "Private",
      summary: "A villa shaped by the meltem wind, with cantilevered rooms that frame the sea.",
      body: [
        "Three white volumes are stacked and shifted so that each room catches the northern meltem wind and opens onto its own view. The courtyards between them act as wind catchers, drawing cool air through the house all summer.",
        "Local stone, lime plaster and timber shutters keep the material palette quiet and the carbon footprint low.",
      ],
      awards: [],
    },
    tr: {
      title: "Ege Rüzgâr Evi",
      location: "Bodrum, Türkiye",
      category: "Konut",
      status: "Tamamlandı",
      area: "420 m²",
      client: "Özel",
      summary: "Meltemin biçimlendirdiği, denizi çerçeveleyen konsol odalara sahip bir villa.",
      body: [
        "Üç beyaz kütle, her oda kuzeyden esen meltemi yakalayacak ve kendi manzarasına açılacak şekilde üst üste konup kaydırıldı. Aralarındaki avlular rüzgâr yakalayıcı gibi çalışarak yaz boyunca evin içinden serin hava geçirir.",
        "Yerel taş, kireç sıva ve ahşap kepenkler malzeme paletini sade, karbon ayak izini ise düşük tutar.",
      ],
      awards: [],
    },
  },
  {
    slug: "seismic-commons",
    year: 2026,
    form: "housing",
    en: {
      title: "Seismic Commons",
      location: "Hatay, Türkiye",
      category: "Urban",
      status: "Research",
      area: "12 ha masterplan",
      client: "Graduation project, ITU",
      summary: "A resilient housing model: low-rise, base-isolated blocks around shared courtyards.",
      body: [
        "Seismic Commons is a research proposal for rebuilding neighbourhoods after earthquakes. Instead of isolated towers, it proposes four- to six-storey base-isolated blocks around shared courtyards, so communities can stay together and the open courts double as safe assembly areas.",
        "A kit of prefabricated timber-concrete hybrid parts allows fast construction while leaving room for each neighbourhood's own character.",
      ],
      awards: ["Graduation project, ITU Faculty of Architecture 2026"],
    },
    tr: {
      title: "Sismik Ortak Alanlar",
      location: "Hatay, Türkiye",
      category: "Kentsel",
      status: "Araştırma",
      area: "12 ha master plan",
      client: "Bitirme projesi, İTÜ",
      summary: "Dirençli bir konut modeli: ortak avlular etrafında az katlı, sismik izolatörlü bloklar.",
      body: [
        "Sismik Ortak Alanlar, depremlerden sonra mahallelerin yeniden inşası için bir araştırma önerisidir. Tekil kuleler yerine ortak avlular etrafında dört ila altı katlı, sismik izolatörlü bloklar önerir; böylece topluluklar bir arada kalabilir ve açık avlular aynı zamanda güvenli toplanma alanı olur.",
        "Prefabrik ahşap-beton hibrit parçalardan oluşan bir sistem, her mahallenin kendine özgü karakterine yer bırakarak hızlı inşa imkânı sunar.",
      ],
      awards: ["Bitirme projesi, İTÜ Mimarlık Fakültesi 2026"],
    },
  },
  {
    slug: "ankara-transit-hall",
    year: 2027,
    form: "hall",
    en: {
      title: "Ankara Transit Hall",
      location: "Ankara, Türkiye",
      category: "Infrastructure",
      status: "Concept",
      area: "22,000 m²",
      client: "Concept study",
      summary: "A high-speed rail hall under a ribbed timber vault spanning 96 metres.",
      body: [
        "The hall is covered by a single glulam vault made of diagonal ribs. Daylight enters through the gaps between the ribs, so the platforms are naturally lit for most of the day.",
        "Arrivals, departures, a market hall and a bus terminal share one continuous floor, making the station a covered public street for the city.",
      ],
      awards: [],
    },
    tr: {
      title: "Ankara Ulaşım Holü",
      location: "Ankara, Türkiye",
      category: "Altyapı",
      status: "Konsept",
      area: "22.000 m²",
      client: "Konsept çalışması",
      summary: "96 metre açıklığı geçen nervürlü ahşap bir tonozun altında hızlı tren holü.",
      body: [
        "Hol, çapraz nervürlerden oluşan tek bir tutkallı lamine ahşap tonozla örtülüdür. Gün ışığı nervürlerin arasındaki boşluklardan girer; böylece peronlar günün büyük bölümünde doğal olarak aydınlanır.",
        "Gelişler, gidişler, bir çarşı holü ve otobüs terminali tek bir kesintisiz zemini paylaşır; istasyon, kent için üstü örtülü bir kamusal sokağa dönüşür.",
      ],
      awards: [],
    },
  },
  {
    slug: "fjord-timber-school",
    year: 2026,
    form: "school",
    en: {
      title: "Fjord Timber School",
      location: "Bergen, Norway",
      category: "Education",
      status: "Competition",
      area: "7,900 m²",
      client: "International competition",
      summary: "A cross-laminated timber school whose sawtooth roofs bring northern light into every classroom.",
      body: [
        "Built entirely in cross-laminated timber, the school is organised as a small village of classroom clusters under a sawtooth roof. North-facing skylights bring soft, even light deep into the plan through the long Nordic winter.",
        "The central learning street is both a corridor and a stepped auditorium where the whole school can gather.",
      ],
      awards: ["2nd Prize, International Competition 2026"],
    },
    tr: {
      title: "Fiyort Ahşap Okulu",
      location: "Bergen, Norveç",
      category: "Eğitim",
      status: "Yarışma",
      area: "7.900 m²",
      client: "Uluslararası yarışma",
      summary: "Testere dişi çatılarıyla her sınıfa kuzey ışığı getiren çapraz lamine ahşap bir okul.",
      body: [
        "Tamamen çapraz lamine ahşaptan inşa edilen okul, testere dişi bir çatı altında sınıf kümelerinden oluşan küçük bir köy gibi düzenlenmiştir. Kuzeye bakan çatı pencereleri, uzun İskandinav kışı boyunca planın derinliklerine yumuşak ve dengeli bir ışık taşır.",
        "Merkezdeki öğrenme sokağı hem bir koridor hem de tüm okulun toplanabildiği basamaklı bir amfidir.",
      ],
      awards: ["İkincilik Ödülü, Uluslararası Yarışma 2026"],
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
        <p>These ideas are at the centre of my graduation research, Seismic Commons, and they will stay at the centre of the studio's work.</p>`,
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
        <p>Bu fikirler bitirme araştırmam Sismik Ortak Alanlar'ın merkezinde yer alıyor ve stüdyonun çalışmalarının da merkezinde kalacak.</p>`,
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
        <p>The cave dwellings of Cappadocia, the stone houses of Mardin and the courtyard houses of the Aegean are not nostalgic references. They are tested climate technology, and they inspired projects like Tuff Retreat and the Aegean Wind House.</p>`,
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
        <p>Kapadokya'nın kaya evleri, Mardin'in taş evleri ve Ege'nin avlulu evleri nostaljik referanslar değildir. Bunlar denenmiş iklim teknolojileridir ve Tüf Otel ile Ege Rüzgâr Evi gibi projelere ilham verdiler.</p>`,
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
        <p>Istanbul's waterfronts are full of such buildings. The Galata Archive proposal is one attempt to show what they could become.</p>`,
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
        <p>İstanbul'un kıyıları bu tür binalarla dolu. Galata Arşivi önerisi, bu binaların neye dönüşebileceğini göstermeye yönelik bir deneme.</p>`,
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
        <p>This journal will follow the studio's work, competitions and the ideas shaping architecture today. Thank you for reading.</p>`,
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
        <p>Bu günlük; stüdyonun çalışmalarını, yarışmaları ve bugün mimarlığı biçimlendiren fikirleri takip edecek. Okuduğunuz için teşekkürler.</p>`,
    },
  },
];
