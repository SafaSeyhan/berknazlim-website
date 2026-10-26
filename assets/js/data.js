/* ==========================================================================
   Site content. Edit this file to change projects and journal posts.

   PROJECTS — placeholder portfolio. Replace with Berk's real work.
   To use a real photo instead of the generated drawing, add an `image`
   field, e.g.  image: "assets/img/projects/bosphorus-1.jpg"
   and optionally `gallery: ["...jpg", "...jpg", "...jpg"]`.

   POSTS — journal / blog. Newest first is not required; they are sorted
   by `date` automatically. Body is plain HTML.
   ========================================================================== */

window.SITE = {
  name: "Berk Nazlım",
  email: "hello@berknazlim.com",
  phone: "+90 (5xx) xxx xx xx",
  city: "Istanbul, Türkiye",
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/",
};

window.PROJECTS = [
  {
    slug: "bosphorus-light-pavilion",
    title: "Bosphorus Light Pavilion",
    location: "Istanbul, Türkiye",
    year: 2026,
    category: "Cultural",
    status: "Completed",
    area: "1,240 m²",
    client: "Istanbul Design Foundation",
    form: "pavilion",
    palette: ["#0b1a2b", "#f2a65a", "#c6ff4a"],
    summary: "A floating canopy of 3,200 perforated aluminium fins that turns the Bosphorus light into architecture.",
    body: [
      "Set on the European shore between two historic yalıs, the pavilion is a single sweeping roof held up by twelve slender columns. Its underside is a field of perforated fins, each one rotated by a script that reads the water's reflection at different hours of the day.",
      "By morning the canopy throws a cool, rippling light; at sunset it glows amber across the strait. The plan stays almost entirely open, so the pavilion behaves like a public square with a ceiling rather than a building with walls.",
      "The structure was optimised computationally to use 38% less steel than a conventional space frame, and every fin can be disassembled and reused.",
    ],
    awards: ["Shortlisted, World Architecture Festival 2026", "Arkitera Young Architect Award 2026"],
    featured: true,
  },
  {
    slug: "levent-helix-tower",
    title: "Levent Helix Tower",
    location: "Levent, Istanbul",
    year: 2027,
    category: "Mixed-use",
    status: "In design",
    area: "86,000 m²",
    client: "Confidential",
    form: "tower",
    palette: ["#05070c", "#4b6bff", "#c6ff4a"],
    summary: "A 52-storey tower whose floor plates rotate 1.4° each, wrapping sky gardens around its core.",
    body: [
      "The Helix Tower rethinks the business-district skyscraper as a vertical neighbourhood. Each floor plate turns 1.4° relative to the one below, and the twist opens a continuous spiral of terraces planted with native Marmara species.",
      "The rotation is not decoration. Wind-tunnel studies showed it reduces vortex shedding by almost a third, which allowed a lighter structure and a slimmer core.",
      "Offices, a hotel and residences stack from bottom to top, linked by a public sky lobby on the 30th floor with a 360° view from the Black Sea to the Marmara.",
    ],
    awards: ["1st Prize, Invited Competition 2026"],
    featured: true,
  },
  {
    slug: "cappadocia-tuff-retreat",
    title: "Tuff Retreat",
    location: "Cappadocia, Türkiye",
    year: 2026,
    category: "Hospitality",
    status: "Under construction",
    area: "4,800 m²",
    client: "Kapadokya Hospitality Group",
    form: "stone",
    palette: ["#1c120c", "#e3a36c", "#ffd9a8"],
    summary: "Twenty-four suites carved into a volcanic ridge, continuing a thousand-year-old way of building.",
    body: [
      "Cappadocia's houses have always been carved, not built. Tuff Retreat follows the same logic: the suites are excavated into the ridge and the excavated stone is cut into blocks for the few walls that rise above ground.",
      "Thick tuff walls hold the day's heat into the cold desert night and keep rooms cool in August, so mechanical heating and cooling is reduced to a minimum.",
      "From the valley the hotel almost disappears. Only a line of deep window openings and a rooftop terrace for the morning balloons reveal it.",
    ],
    awards: ["Commended, AR Emerging Architecture 2026"],
    featured: true,
  },
  {
    slug: "galata-archive",
    title: "Galata Archive & Library",
    location: "Karaköy, Istanbul",
    year: 2025,
    category: "Adaptive reuse",
    status: "Competition",
    area: "6,300 m²",
    client: "Municipal competition",
    form: "library",
    palette: ["#0d0d10", "#b48cff", "#e8e3ff"],
    summary: "A 19th-century warehouse turned into a public archive, with a glass reading room floating inside.",
    body: [
      "The project keeps every brick of the original Karaköy warehouse and inserts a new structure that never touches the old walls. A glass reading room hangs from a steel truss above the main hall, so visitors read surrounded by the building's history.",
      "Archive stacks occupy the climate-controlled basement, and a ramp spirals from the street up to a roof terrace facing the Golden Horn.",
    ],
    awards: ["Honourable Mention, National Competition 2025"],
  },
  {
    slug: "aegean-wind-house",
    title: "Aegean Wind House",
    location: "Bodrum, Türkiye",
    year: 2026,
    category: "Residential",
    status: "Completed",
    area: "420 m²",
    client: "Private",
    form: "house",
    palette: ["#071a22", "#5fd3e6", "#f6f1e7"],
    summary: "A villa shaped by the meltem wind, with cantilevered rooms that frame the sea.",
    body: [
      "Three white volumes are stacked and shifted so that each room catches the northern meltem wind and opens to its own view. Courtyards between them work as wind catchers, pulling cool air through the house all summer.",
      "Local stone, lime plaster and timber shutters keep the material palette quiet and the carbon footprint low.",
    ],
    awards: [],
  },
  {
    slug: "seismic-commons",
    title: "Seismic Commons",
    location: "Hatay, Türkiye",
    year: 2025,
    category: "Urban",
    status: "Research",
    area: "12 ha masterplan",
    client: "Research proposal",
    form: "housing",
    palette: ["#101418", "#ff6b3d", "#ffe2cf"],
    summary: "A resilient housing model: low-rise, base-isolated blocks around shared courtyards.",
    body: [
      "Seismic Commons is a research proposal for rebuilding neighbourhoods after earthquakes. Instead of isolated towers, it proposes four- to six-storey base-isolated blocks around shared courtyards, so communities can stay together and the open courts double as safe assembly areas.",
      "A kit of prefabricated timber-concrete hybrid parts allows fast construction while leaving room for each neighbourhood's own character.",
    ],
    awards: ["Graduation project, ITU Faculty of Architecture 2026"],
  },
  {
    slug: "ankara-transit-hall",
    title: "Ankara Transit Hall",
    location: "Ankara, Türkiye",
    year: 2027,
    category: "Infrastructure",
    status: "Concept",
    area: "22,000 m²",
    client: "Concept study",
    form: "hall",
    palette: ["#0a0c10", "#9cf6ff", "#c6ff4a"],
    summary: "A high-speed rail hall under a ribbed timber vault that spans 96 metres.",
    body: [
      "The hall is covered by a single glulam vault made of diagonal ribs. Daylight enters through the gaps between ribs, so the platforms are lit naturally for most of the day.",
      "Arrivals, departures, a market hall and a bus terminal share one continuous floor, making the station a covered public street for the city.",
    ],
    awards: [],
  },
  {
    slug: "nordic-timber-school",
    title: "Fjord Timber School",
    location: "Bergen, Norway",
    year: 2026,
    category: "Education",
    status: "Competition",
    area: "7,900 m²",
    client: "International competition",
    form: "school",
    palette: ["#0c1412", "#7fe0b0", "#eef7ef"],
    summary: "A cross-laminated timber school with sawtooth roofs that bring northern light into every classroom.",
    body: [
      "Built entirely in cross-laminated timber, the school is organised as a small village of classroom clusters under a sawtooth roof. North-facing skylights bring soft, even light deep into the plan through the long Nordic winter.",
      "The central learning street is both a corridor and a stepped auditorium where the whole school can gather.",
    ],
    awards: ["2nd Prize, International Competition 2026"],
  },
];

window.POSTS = [
  {
    slug: "designing-for-the-next-earthquake",
    title: "Designing for the next earthquake",
    date: "2026-10-20",
    category: "Resilience",
    readTime: "6 min",
    form: "housing",
    palette: ["#101418", "#ff6b3d", "#ffe2cf"],
    excerpt: "For an architect in Istanbul, seismic safety is not a technical appendix. It is the starting point of every line we draw.",
    body: `
      <p>Every architect who studies in Istanbul learns the same lesson early: the ground beneath this city moves. Seismic safety is not a technical appendix handed to the engineer at the end. It is the first constraint, and it should shape the plan, the section and the way a neighbourhood is laid out.</p>
      <h2>Form follows forces</h2>
      <p>Regular plans, continuous load paths and the avoidance of soft storeys sound like textbook rules, but they are also design opportunities. A clear structural rhythm gives a façade its order. A generous ground floor that is stiffened properly can still be open and public.</p>
      <blockquote>A safe building is not a compromise on beauty. It is the precondition for it.</blockquote>
      <h2>Thinking beyond the single building</h2>
      <p>Resilience also lives at the scale of the street. Open courtyards and squares that work as assembly areas, short walking distances to safe ground and mixed-use blocks that keep services running after a disaster are all architectural decisions.</p>
      <ul>
        <li>Base isolation and damping are becoming more accessible for mid-rise housing.</li>
        <li>Retrofit of existing stock is often faster and lower in carbon than demolition.</li>
        <li>Community participation keeps rebuilt neighbourhoods recognisable to the people who live there.</li>
      </ul>
      <p>These ideas are at the centre of my graduation research, Seismic Commons, and they will stay at the centre of the studio's work.</p>`,
  },
  {
    slug: "mass-timber-is-climbing",
    title: "Mass timber is climbing. Should Türkiye follow?",
    date: "2026-10-08",
    category: "Materials",
    readTime: "5 min",
    form: "school",
    palette: ["#0c1412", "#7fe0b0", "#eef7ef"],
    excerpt: "Engineered timber has moved from pavilions to high-rise. Here is what it could mean for construction in Türkiye.",
    body: `
      <p>Over the last decade, engineered timber such as cross-laminated timber (CLT) and glulam has moved from small pavilions to schools, offices and towers across Europe, North America and Japan. The arguments are familiar: timber stores carbon, prefabrication speeds up construction and the interiors are warm and calm.</p>
      <h2>The local question</h2>
      <p>Türkiye builds overwhelmingly in reinforced concrete. Changing that means building a supply chain, updating fire and seismic regulations and training a workforce. None of that happens overnight, but hybrid systems, timber floors on concrete or steel frames, are a realistic first step.</p>
      <blockquote>The greenest material is the one that fits its context. Timber deserves a serious place in that conversation.</blockquote>
      <p>Timber is also light, and lighter buildings attract smaller seismic forces. That alone makes it worth studying for our region.</p>`,
  },
  {
    slug: "ai-in-the-studio",
    title: "AI in the studio: a tool, not an author",
    date: "2026-09-24",
    category: "Technology",
    readTime: "4 min",
    form: "tower",
    palette: ["#05070c", "#4b6bff", "#c6ff4a"],
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
      <p>A tool cannot visit the site, listen to a client or take responsibility for a decision. The architect's judgement, about people, place and what is worth building, remains the core of the profession.</p>
      <blockquote>Use the machine to see more options. Use your judgement to choose.</blockquote>`,
  },
  {
    slug: "the-return-of-thick-walls",
    title: "The return of thick walls",
    date: "2026-09-10",
    category: "Sustainability",
    readTime: "5 min",
    form: "stone",
    palette: ["#1c120c", "#e3a36c", "#ffd9a8"],
    excerpt: "As Mediterranean summers get hotter, vernacular strategies of mass, shade and ventilation are back on the drawing board.",
    body: `
      <p>Long before air-conditioning, builders around the Mediterranean kept houses cool with thick masonry walls, small openings to the sun, shaded courtyards and cross-ventilation. As summers get hotter, these passive strategies are becoming relevant again.</p>
      <h2>Mass and time</h2>
      <p>Heavy walls delay heat. They absorb it during the day and release it at night, when it can be flushed out by cooler air. Combined with good shading, thermal mass can keep interiors comfortable for most of the year.</p>
      <h2>Learning from the vernacular</h2>
      <p>The cave dwellings of Cappadocia, the stone houses of Mardin and the courtyard houses of the Aegean are not nostalgic references. They are tested climate technology, and they inspired projects like Tuff Retreat and the Aegean Wind House.</p>`,
  },
  {
    slug: "adaptive-reuse-greenest-building",
    title: "The greenest building is the one already standing",
    date: "2026-08-27",
    category: "Heritage",
    readTime: "4 min",
    form: "library",
    palette: ["#0d0d10", "#b48cff", "#e8e3ff"],
    excerpt: "Demolition throws away the carbon already spent. Adaptive reuse keeps it, and keeps a city's memory too.",
    body: `
      <p>A large share of a building's lifetime emissions is spent before anyone moves in, in making cement, steel and glass and in the construction itself. Demolishing a sound structure throws that investment away.</p>
      <h2>More than carbon</h2>
      <p>Old warehouses, factories and depots also hold the memory of a city. Turning them into libraries, schools or housing keeps that memory alive while giving the building a new life.</p>
      <blockquote>Reuse is not the conservative option. It is often the most radical one.</blockquote>
      <p>Istanbul's waterfronts are full of such buildings. The Galata Archive proposal is one attempt to show what they could become.</p>`,
  },
  {
    slug: "notes-from-taskisla",
    title: "Notes from Taşkışla: graduating in 2026",
    date: "2026-07-15",
    category: "Studio",
    readTime: "3 min",
    form: "hall",
    palette: ["#0a0c10", "#9cf6ff", "#c6ff4a"],
    excerpt: "Some reflections on finishing architecture school at ITU, and what comes next.",
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
];
