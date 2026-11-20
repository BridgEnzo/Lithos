/*
 * Roches MAGMATIQUES
 * -------------------------------------------------------------
 * Schéma d'une fiche (identique dans les 3 fichiers de données) :
 *  id         identifiant unique (utilisé dans l'URL : #/roche/<id>)
 *  nom, alias nom usuel + autres noms
 *  famille    'magmatique' | 'sedimentaire' | 'metamorphique'
 *  groupe     sous-famille (plutonique, volcanique, détritique…)
 *  resume     phrase courte
 *  description, formation, contexte, usages, anecdote : textes
 *  mineraux   [[minéral, proportion], …]
 *  texture, couleur : textes descriptifs
 *  grain      ['invisible'|'fin'|'moyen'|'grossier']
 *  densite    [min, max]  (g/cm³)
 *  durete     [min, max]  (échelle de Mohs, dureté « globale » de la roche)
 *  hcl        'forte' | 'faible' | 'nulle'   (effervescence à l'acide)
 *  magn       0 = non, 1 = parfois, 2 = oui (attire un aimant)
 *  aspect     ['cristallin','detritique','vitreux','folie','fin','poreux','tendre','organique','rubane']
 *  teinte     ['claire','moyenne','sombre','coloree']
 *  struct     ['litage','foliation','bandes','vacuoles','fossiles','fragments','porphyrique','massive','prismes']
 *  tests      liste de tests d'identification spécifiques
 *  confusions [[id d'une roche proche, comment les distinguer], …]
 *  lieux      [[lieu, pays, latitude, longitude], …]
 *  wiki       [titre Wikipédia FR, titre Wikipédia EN]  (sert à la photo)
 *  photo      (optionnel) chemin d'une photo locale, ex. 'images/granite.jpg'
 *  tex        paramètres de l'illustration SVG générée (voir js/texture.js)
 */
window.ROCHES = window.ROCHES || [];
window.ROCHES.push(

/* ======================= PLUTONIQUES ======================= */
{
  id: 'granite', nom: 'Granite', alias: ['Granit'],
  famille: 'magmatique', groupe: 'Plutonique',
  resume: 'La roche grenue claire emblématique des continents : quartz, feldspaths et micas.',
  description: "Roche magmatique plutonique à grain moyen à grossier, entièrement cristallisée. On y distingue à l'œil nu trois minéraux : le quartz (grains gris translucides, aspect de verre gras), les feldspaths (blancs, crème ou roses, à faces de clivage brillantes) et les micas (biotite noire et/ou muscovite argentée en paillettes). Le granite est la roche la plus caractéristique de la croûte continentale.",
  mineraux: [['Quartz', '20–40 %'], ['Feldspath potassique (orthose, microcline)', '30–50 %'], ['Plagioclase', '10–30 %'], ['Biotite / muscovite', '5–15 %'], ['Amphibole (parfois)', '0–5 %']],
  texture: 'Grenue (holocristalline, grains jointifs visibles à l’œil nu), parfois porphyroïde avec de grands cristaux de feldspath.',
  couleur: 'Gris clair, blanc moucheté de noir, rose à rouge selon le feldspath.',
  grain: ['moyen', 'grossier'], densite: [2.6, 2.7], durete: [6, 7], hcl: 'nulle', magn: 0,
  aspect: ['cristallin'], teinte: ['claire', 'coloree'], struct: ['massive', 'porphyrique'],
  tests: [
    'Raye le verre (le quartz a une dureté de 7).',
    'Aucune effervescence à l’acide chlorhydrique.',
    'À la loupe : quartz sans clivage (cassure vitreuse), feldspaths à faces planes qui réfléchissent la lumière, micas qui se détachent en feuillets à la pointe d’un couteau.',
    'Altéré, il se désagrège en « arène » granitique (sable grossier).'
  ],
  confusions: [
    ['granodiorite', 'Moins de feldspath potassique rose, davantage de plagioclase blanc et de minéraux sombres : teinte plus grise.'],
    ['diorite', 'La diorite n’a pratiquement pas de quartz : aspect « poivre et sel » noir et blanc.'],
    ['gneiss', 'Le gneiss a les mêmes minéraux mais organisés en bandes/foliation.'],
    ['syenite', 'La syénite contient très peu ou pas de quartz.']
  ],
  formation: "Cristallisation lente (des milliers à des millions d'années) d'un magma riche en silice (> 66 % SiO₂) à plusieurs kilomètres de profondeur. Ces magmas proviennent surtout de la fusion partielle de la croûte continentale (collision de chaînes de montagnes) ou de la différenciation de magmas en zone de subduction. Les granites forment des plutons et batholites, mis à l'affleurement par l'érosion.",
  contexte: 'Croûte continentale ; chaînes de collision, arcs volcaniques continentaux (5–30 km de profondeur).',
  lieux: [
    ["Ploumanac'h, Côte de Granit Rose", 'France', 48.83, -3.49],
    ['Sidobre (Tarn)', 'France', 43.65, 2.43],
    ['Massif du Mont-Blanc', 'France / Italie', 45.83, 6.86],
    ['El Capitan, Yosemite', 'États-Unis', 37.73, -119.64]
  ],
  usages: 'Pierre de construction et de taille, plans de travail, pavés, bordures, monuments funéraires, granulats.',
  anecdote: "Le « granite » des plans de cuisine est souvent… une autre roche : le commerce appelle granite toute pierre dure cristalline (gabbro, gneiss, syénite).",
  wiki: ['Granite', 'Granite'],
  tex: { k: 'grenu', b: '#d9d2c9', c: ['#efe9e2', '#e3b8a6', '#d79c86', '#b7b4b0', '#2d2a28', '#cfc8bf'], s: 9 }
},
{
  id: 'granodiorite', nom: 'Granodiorite', alias: [],
  famille: 'magmatique', groupe: 'Plutonique',
  resume: 'Cousine grise du granite, plus riche en plagioclase et en minéraux sombres.',
  description: "Roche plutonique grenue intermédiaire entre le granite et la diorite. Elle contient du quartz mais le plagioclase (blanc) domine nettement sur le feldspath potassique. La biotite et l'amphibole lui donnent un aspect gris moucheté. C'est en réalité la roche plutonique la plus abondante de la croûte continentale, souvent appelée « granite » par abus de langage.",
  mineraux: [['Plagioclase', '30–50 %'], ['Quartz', '20–30 %'], ['Feldspath potassique', '5–20 %'], ['Biotite', '5–15 %'], ['Amphibole (hornblende)', '5–15 %']],
  texture: 'Grenue, grain moyen ; enclaves sombres arrondies fréquentes.',
  couleur: 'Gris moyen, moucheté de noir.',
  grain: ['moyen', 'grossier'], densite: [2.67, 2.78], durete: [6, 7], hcl: 'nulle', magn: 0,
  aspect: ['cristallin'], teinte: ['claire', 'moyenne'], struct: ['massive'],
  tests: [
    'Raye le verre.',
    'Pas d’effervescence.',
    'Comparer la proportion de feldspath rose (rare) et blanc (dominant) à la loupe.',
    'Présence fréquente d’enclaves sombres (enclaves microgrenues) de quelques cm.'
  ],
  confusions: [
    ['granite', 'Le granite a plus de feldspath potassique (souvent rose) et moins de minéraux sombres.'],
    ['diorite', 'La diorite est quasiment dépourvue de quartz.']
  ],
  formation: "Cristallisation en profondeur de magmas calco-alcalins de composition intermédiaire à acide, typiques des zones de subduction sous un continent. Elle constitue l'essentiel des grands batholites des cordillères (Andes, Sierra Nevada).",
  contexte: 'Batholites des arcs continentaux (marges actives).',
  lieux: [
    ['Half Dome, Yosemite', 'États-Unis', 37.746, -119.533],
    ['Batholite côtier du Pérou', 'Pérou', -10.0, -77.5],
    ['Flamanville (Manche)', 'France', 49.53, -1.88]
  ],
  usages: 'Granulats, pierre de taille, enrochements.',
  anecdote: 'Le célèbre Half Dome de Yosemite, souvent cité comme « granite », est une granodiorite.',
  wiki: ['Granodiorite', 'Granodiorite'],
  tex: { k: 'grenu', b: '#bdbab4', c: ['#e6e3de', '#d4d0ca', '#a9a7a2', '#2f2d2b', '#3d3a36', '#cbc7c1'], s: 8 }
},
{
  id: 'diorite', nom: 'Diorite', alias: [],
  famille: 'magmatique', groupe: 'Plutonique',
  resume: 'Roche grenue « poivre et sel » : plagioclase blanc et amphibole noire, sans quartz.',
  description: "Roche plutonique grenue de composition intermédiaire (52–63 % SiO₂). Elle est formée surtout de plagioclase blanc à gris et d'amphibole (hornblende) noire, en proportions comparables, ce qui lui donne un aspect moucheté noir et blanc très caractéristique. Le quartz est absent ou très rare (< 5 %).",
  mineraux: [['Plagioclase (andésine)', '50–70 %'], ['Hornblende', '15–40 %'], ['Biotite', '0–15 %'], ['Pyroxène', '0–10 %'], ['Quartz', '< 5 %']],
  texture: 'Grenue, grain moyen à grossier.',
  couleur: 'Noir et blanc « poivre et sel », gris moyen à sombre.',
  grain: ['moyen', 'grossier'], densite: [2.8, 3.0], durete: [5.5, 6], hcl: 'nulle', magn: 1,
  aspect: ['cristallin'], teinte: ['moyenne'], struct: ['massive'],
  tests: [
    'Raye à peine ou ne raye pas le verre (pas de quartz).',
    'Pas d’effervescence.',
    'Chercher le quartz à la loupe : absent ou très rare.',
    'Les baguettes noires d’amphibole montrent deux clivages à environ 120°.'
  ],
  confusions: [
    ['granodiorite', 'Contient du quartz bien visible.'],
    ['gabbro', 'Le gabbro est plus sombre et plus lourd (pyroxène au lieu d’amphibole).']
  ],
  formation: 'Cristallisation lente en profondeur de magmas andésitiques, typiques des zones de subduction. La diorite est l’équivalent plutonique de l’andésite.',
  contexte: 'Arcs volcaniques, bordures de batholites granitiques.',
  lieux: [
    ['Guernesey', 'Îles Anglo-Normandes', 49.46, -2.58],
    ['Cordillère des Andes centrales', 'Chili', -33.4, -70.2]
  ],
  usages: 'Pierre ornementale, granulats ; utilisée dans l’Antiquité pour les statues et stèles.',
  anecdote: 'La statue du roi Gudea (Mésopotamie, Louvre) est sculptée dans une diorite noire, prisée pour sa dureté et son poli.',
  wiki: ['Diorite', 'Diorite'],
  tex: { k: 'grenu', b: '#8f8d8a', c: ['#f0eeea', '#dedbd6', '#1f1e1d', '#2c2a28', '#bab7b2'], s: 8 }
},
{
  id: 'gabbro', nom: 'Gabbro', alias: [],
  famille: 'magmatique', groupe: 'Plutonique',
  resume: 'Équivalent grenu du basalte : sombre, lourd, plagioclase + pyroxène.',
  description: "Roche plutonique basique, grenue, de teinte sombre (gris-vert à noir). Elle est composée de plagioclase calcique (gris, blanc ou verdâtre) et de pyroxène noir-vert, parfois d'olivine. Le gabbro constitue la partie profonde (couche 3) de la croûte océanique.",
  mineraux: [['Plagioclase (labrador)', '40–70 %'], ['Pyroxène (augite)', '25–50 %'], ['Olivine', '0–20 %'], ['Magnétite, ilménite', 'accessoires']],
  texture: 'Grenue, grain moyen à grossier ; parfois litée (gabbros lités) ou à cristaux très gros (pegmatoïde).',
  couleur: 'Gris sombre, vert foncé à noir ; plagioclase parfois à reflets irisés.',
  grain: ['moyen', 'grossier'], densite: [2.9, 3.1], durete: [5.5, 6], hcl: 'nulle', magn: 1,
  aspect: ['cristallin'], teinte: ['sombre'], struct: ['massive', 'litage'],
  tests: [
    'Nettement plus lourd en main qu’un granite de même taille.',
    'Pas de quartz, pas d’effervescence.',
    'Peut attirer légèrement un aimant puissant (magnétite).',
    'Pyroxène : deux clivages à ~90° (contre 120° pour l’amphibole).'
  ],
  confusions: [
    ['diorite', 'Plus claire, à amphibole, moins dense.'],
    ['dolerite', 'Même composition mais grain plus fin et cristaux de plagioclase en baguettes entrecroisées.'],
    ['basalte', 'Même chimie, mais grain invisible à l’œil nu.']
  ],
  formation: "Cristallisation lente d'un magma basaltique (45–52 % SiO₂) issu de la fusion partielle du manteau, sous les dorsales océaniques ou à la base de grandes intrusions continentales. On l'observe à terre dans les ophiolites (morceaux de lithosphère océanique charriés sur les continents).",
  contexte: 'Croûte océanique profonde, ophiolites, grandes intrusions litées.',
  lieux: [
    ['Massif du Chenaillet (Hautes-Alpes)', 'France', 44.91, 6.74],
    ['Ophiolite de Semail', 'Oman', 23.0, 57.8],
    ['Cuillin, île de Skye', 'Royaume-Uni', 57.21, -6.23],
    ['Intrusion de Skaergaard', 'Groenland', 68.15, -31.7]
  ],
  usages: 'Pierre ornementale (« granit noir » du commerce), dalles, monuments, granulats routiers.',
  anecdote: 'Au Chenaillet, on peut marcher sur un fond océanique de la Téthys vieux d’environ 155 millions d’années.',
  wiki: ['Gabbro', 'Gabbro'],
  tex: { k: 'grenu', b: '#3b3d3a', c: ['#1e201e', '#2a2d2a', '#6f7570', '#9aa09a', '#4b5a4f'], s: 8 }
},
{
  id: 'peridotite', nom: 'Péridotite', alias: ['Lherzolite', 'Dunite', 'Harzburgite'],
  famille: 'magmatique', groupe: 'Plutonique ultrabasique',
  resume: 'La roche du manteau terrestre, verte et très dense, riche en olivine.',
  description: "Roche ultrabasique (< 45 % SiO₂) composée majoritairement d'olivine vert olive, accompagnée de pyroxènes (vert émeraude pour le diopside chromifère, brun pour l'enstatite) et parfois de spinelle ou de grenat. Selon les proportions on parle de dunite (> 90 % d'olivine), harzburgite ou lherzolite. C'est le constituant principal du manteau supérieur.",
  mineraux: [['Olivine', '40–100 %'], ['Orthopyroxène (enstatite)', '0–40 %'], ['Clinopyroxène (diopside)', '0–20 %'], ['Spinelle / grenat', 'accessoires']],
  texture: 'Grenue ; en enclaves (nodules) dans les basaltes ou en massifs.',
  couleur: 'Vert olive à vert jaunâtre (frais) ; brun-rouille ou vert sombre une fois altérée.',
  grain: ['moyen', 'grossier'], densite: [3.2, 3.4], durete: [6.5, 7], hcl: 'nulle', magn: 1,
  aspect: ['cristallin'], teinte: ['coloree', 'sombre'], struct: ['massive'],
  tests: [
    'Très dense : nettement plus lourde que toutes les roches courantes de surface.',
    'Raye le verre (olivine dureté 6,5–7).',
    'Olivine : grains vert bouteille, éclat vitreux, cassure conchoïdale, sans clivage net.',
    'Surface d’altération brun-orangé caractéristique ; souvent partiellement transformée en serpentine.'
  ],
  confusions: [
    ['serpentinite', 'La serpentinite (péridotite hydratée) est plus tendre, plus légère, à aspect gras et souvent veinée.'],
    ['gabbro', 'Le gabbro contient du plagioclase blanc ou gris.']
  ],
  formation: "La péridotite forme le manteau terrestre. Elle arrive en surface de trois façons : en enclaves arrachées par les magmas basaltiques, dans les ophiolites (base de la lithosphère océanique charriée) ou dans des massifs remontés lors de l'ouverture d'océans ou de collisions (massifs de Lherz, Ronda).",
  contexte: 'Manteau supérieur ; ophiolites, enclaves dans les basaltes, massifs orogéniques.',
  lieux: [
    ['Étang de Lherz (Ariège), localité type de la lherzolite', 'France', 42.81, 1.38],
    ['Massif de Ronda', 'Espagne', 36.62, -5.0],
    ['Ophiolite de Semail', 'Oman', 22.9, 58.2],
    ['Île de Zabargad (péridot gemme)', 'Égypte', 23.61, 36.2]
  ],
  usages: 'Source de chrome, nickel et platinoïdes ; olivine utilisée en fonderie et étudiée pour le stockage du CO₂. Le péridot est une gemme.',
  anecdote: 'La lherzolite doit son nom à l’étang de Lherz en Ariège, décrit dès la fin du XVIIIe siècle.',
  wiki: ['Péridotite', 'Peridotite'],
  tex: { k: 'grenu', b: '#7c8a4a', c: ['#8fa04f', '#6f7f3b', '#a3b064', '#2f4a2c', '#4b5a2b', '#8b6a3a'], s: 7 }
},
{
  id: 'syenite', nom: 'Syénite', alias: ['Larvikite (variété)'],
  famille: 'magmatique', groupe: 'Plutonique',
  resume: 'Roche grenue riche en feldspath alcalin, sans (ou presque sans) quartz.',
  description: "Roche plutonique grenue dominée par le feldspath alcalin (orthose, microcline, anorthose), avec un peu d'amphibole, de biotite ou de pyroxène, et pas ou très peu de quartz. Certaines variétés contiennent des feldspathoïdes (syénites néphéliniques). La larvikite norvégienne, une monzonite/syénite, montre des feldspaths à reflets bleus chatoyants.",
  mineraux: [['Feldspath alcalin', '60–90 %'], ['Plagioclase', '0–20 %'], ['Amphibole / biotite / pyroxène', '5–25 %'], ['Quartz', '< 5 %'], ['Néphéline (parfois)', '0–20 %']],
  texture: 'Grenue, grain moyen à grossier ; feldspaths souvent tabulaires.',
  couleur: 'Rose, gris, crème, parfois gris-bleu à reflets (larvikite).',
  grain: ['moyen', 'grossier'], densite: [2.6, 2.8], durete: [6, 6], hcl: 'nulle', magn: 0,
  aspect: ['cristallin'], teinte: ['claire', 'moyenne', 'coloree'], struct: ['massive'],
  tests: [
    'Raye à peine le verre (feldspath 6).',
    'Chercher le quartz : absent, contrairement au granite.',
    'Feldspaths à clivages brillants, parfois avec jeux de lumière bleus (labradorescence).'
  ],
  confusions: [
    ['granite', 'Contient au moins 20 % de quartz.'],
    ['diorite', 'Le feldspath dominant est le plagioclase et les minéraux sombres sont plus abondants.']
  ],
  formation: 'Cristallisation de magmas alcalins, en général en contexte de rift continental ou de point chaud, ou par différenciation poussée de magmas basaltiques alcalins. Équivalent plutonique du trachyte.',
  contexte: 'Rifts continentaux, complexes alcalins annulaires.',
  lieux: [
    ['Larvik (larvikite)', 'Norvège', 59.05, 10.03],
    ['Massif de Ditrău', 'Roumanie', 46.82, 25.51],
    ['Assouan, l’antique Syène (nom d’origine)', 'Égypte', 24.09, 32.9]
  ],
  usages: 'Pierre ornementale (larvikite pour façades et plans de travail), source de feldspath pour céramique.',
  anecdote: 'Le nom vient de Syène (Assouan) décrite par Pline… mais la pierre d’Assouan est en réalité un granite !',
  wiki: ['Syénite', 'Syenite'],
  tex: { k: 'grenu', b: '#c9a493', c: ['#d8ad98', '#c6917c', '#e5c8b8', '#3a3532', '#a68472'], s: 10 }
},
{
  id: 'pegmatite', nom: 'Pegmatite', alias: [],
  famille: 'magmatique', groupe: 'Plutonique (filonien)',
  resume: 'Roche à cristaux géants (cm à m), souvent en filons, riche en minéraux rares.',
  description: "Roche magmatique à cristaux exceptionnellement grands (de quelques centimètres à plusieurs mètres), généralement de composition granitique : quartz, feldspaths et micas en grandes plaques. Les pegmatites concentrent les éléments rares (lithium, béryllium, tantale, étain…) et livrent des gemmes : tourmaline, béryl (aigue-marine, émeraude), topaze, grenat.",
  mineraux: [['Feldspath potassique', '40–60 %'], ['Quartz', '25–40 %'], ['Muscovite', '5–15 %'], ['Tourmaline, béryl, grenat, lépidolite, spodumène…', 'variables']],
  texture: 'Pegmatitique (cristaux > 2 cm) ; parfois « graphique » (quartz en motifs d’écriture dans le feldspath).',
  couleur: 'Blanc, rose, gris ; taches noires de tourmaline, plaques argentées de mica.',
  grain: ['grossier'], densite: [2.6, 2.7], durete: [6, 7], hcl: 'nulle', magn: 0,
  aspect: ['cristallin'], teinte: ['claire'], struct: ['massive'],
  tests: [
    'Taille des cristaux : un seul cristal dépasse souvent la taille de la main.',
    'Muscovite en « livres » qui se débitent en feuilles transparentes et élastiques.',
    'Baguettes noires striées de tourmaline (schorl) à section triangulaire.'
  ],
  confusions: [
    ['granite', 'Même composition mais grains de quelques mm seulement.']
  ],
  formation: "Cristallisation des derniers liquides d'un magma granitique, très riches en eau et en éléments volatils (bore, fluor, lithium). Ces fluides diminuent la viscosité et favorisent la croissance de cristaux énormes. Les pegmatites forment des filons et des poches en bordure ou au sommet des plutons.",
  contexte: 'Filons au toit et en bordure des massifs granitiques.',
  lieux: [
    ['Black Hills (Dakota du Sud)', 'États-Unis', 43.9, -103.6],
    ['Province pegmatitique du Minas Gerais', 'Brésil', -17.0, -42.0],
    ['Vallée de la Sahatany', 'Madagascar', -19.6, 47.0]
  ],
  usages: 'Minerais de lithium (batteries), tantale, béryllium ; feldspath et mica industriels ; gemmes.',
  anecdote: 'Des cristaux de spodumène de plus de 10 m ont été extraits de la mine Etta, dans les Black Hills.',
  wiki: ['Pegmatite', 'Pegmatite'],
  tex: { k: 'grenu', b: '#e8e1d6', c: ['#f3eee6', '#e9cbbd', '#c8c3bb', '#1c1c1c', '#d7d2c4'], s: 26 }
},

/* ======================= HYPOVOLCANIQUE ======================= */
{
  id: 'dolerite', nom: 'Dolérite', alias: ['Diabase'],
  famille: 'magmatique', groupe: 'Hypovolcanique (filonien)',
  resume: 'Basalte cristallisé en filon : grain fin à moyen, baguettes de plagioclase entrecroisées.',
  description: "Roche basique de même composition que le basalte et le gabbro, mais à grain intermédiaire (environ 1 mm). Au microscope comme à la loupe, les baguettes de plagioclase s'entrecroisent et enserrent le pyroxène : c'est la texture doléritique (ou ophitique). Elle forme des filons (dykes) et des sills.",
  mineraux: [['Plagioclase', '45–60 %'], ['Pyroxène (augite)', '30–45 %'], ['Olivine', '0–10 %'], ['Magnétite, ilménite', '2–5 %']],
  texture: 'Doléritique / ophitique : lattes de plagioclase entrecroisées, grain fin à moyen.',
  couleur: 'Gris sombre à noir verdâtre, moucheté.',
  grain: ['fin', 'moyen'], densite: [2.9, 3.05], durete: [6, 6], hcl: 'nulle', magn: 1,
  aspect: ['cristallin', 'fin'], teinte: ['sombre'], struct: ['massive', 'prismes'],
  tests: [
    'À la loupe : fines baguettes blanches de plagioclase en « jeu de mikado ».',
    'Lourde, sombre, souvent légèrement magnétique.',
    'Se trouve en filons recoupant d’autres roches, avec des bordures à grain plus fin (bordure figée).'
  ],
  confusions: [
    ['basalte', 'Grain invisible à l’œil nu.'],
    ['gabbro', 'Grain plus grossier, cristaux bien visibles à l’œil nu.']
  ],
  formation: 'Refroidissement d’un magma basaltique à faible profondeur, dans des fractures (dykes) ou entre des couches (sills). Le refroidissement est plus lent que pour une coulée, plus rapide que pour un pluton.',
  contexte: 'Essaims de filons, sills, rifts, grandes provinces magmatiques.',
  lieux: [
    ['Palisades (rive de l’Hudson)', 'États-Unis', 40.85, -73.95],
    ['Collines de Preseli (« bluestones » de Stonehenge)', 'Royaume-Uni', 51.96, -4.75]
  ],
  usages: 'Granulats de haute qualité (ballast ferroviaire, routes), pavés, pierre funéraire.',
  anecdote: 'Une partie des « pierres bleues » de Stonehenge est une dolérite tachetée transportée sur plus de 200 km depuis le pays de Galles.',
  wiki: ['Dolérite', 'Diabase'],
  tex: { k: 'grenu', b: '#30332f', c: ['#1d1f1c', '#3a3e39', '#8d938c', '#58605a'], s: 4 }
},

/* ======================= VOLCANIQUES ======================= */
{
  id: 'basalte', nom: 'Basalte', alias: [],
  famille: 'magmatique', groupe: 'Volcanique',
  resume: 'La roche volcanique la plus répandue : noire, dense, à grain invisible.',
  description: "Roche volcanique basique, sombre et dense, à pâte très fine (microlitique) dans laquelle on aperçoit parfois de petits cristaux verts d'olivine ou noirs de pyroxène. Le basalte constitue l'essentiel du plancher océanique et des grands épanchements volcaniques (trapps, îles volcaniques). Il peut être massif, bulleux (vacuoles) ou débité en orgues (prismes) lors du refroidissement.",
  mineraux: [['Plagioclase (microlites)', '45–60 %'], ['Pyroxène (augite)', '25–40 %'], ['Olivine', '0–15 %'], ['Verre volcanique, magnétite', 'variables']],
  texture: 'Microlitique (pâte à microcristaux + verre), parfois porphyrique (phénocristaux d’olivine) ou vacuolaire.',
  couleur: 'Noir, gris sombre ; brun-rouge en surface altérée.',
  grain: ['invisible', 'fin'], densite: [2.8, 3.0], durete: [6, 6], hcl: 'nulle', magn: 1,
  aspect: ['fin'], teinte: ['sombre'], struct: ['massive', 'vacuoles', 'prismes', 'porphyrique'],
  tests: [
    'Lourd, noir, grain invisible ; pas d’effervescence (sauf remplissage de calcite dans les vacuoles).',
    'Cristaux vert bouteille d’olivine visibles à la loupe (basaltes à olivine).',
    'Souvent faiblement magnétique (attire une boussole ou un aimant puissant).',
    'Débit en colonnes hexagonales (orgues) caractéristique sur le terrain.'
  ],
  confusions: [
    ['andesite', 'Plus claire (grise), plus légère, phénocristaux de plagioclase blancs.'],
    ['dolerite', 'Grain visible à la loupe (baguettes de plagioclase).'],
    ['scorie', 'La scorie est très bulleuse et légère.'],
    ['corneenne', 'La cornéenne se trouve au contact des granites et n’est pas bulleuse.']
  ],
  formation: "Refroidissement rapide en surface d'un magma basaltique (45–52 % SiO₂) issu de la fusion partielle du manteau. Il se met en place en coulées fluides aux dorsales océaniques, aux points chauds (Hawaï, La Réunion, Islande), dans les rifts et lors des grandes provinces magmatiques (trapps). Sous l'eau, il forme des laves en coussins (pillow-lavas).",
  contexte: 'Dorsales océaniques, points chauds, rifts, trapps.',
  lieux: [
    ['Chaussée des Géants', 'Royaume-Uni (Irlande du Nord)', 55.24, -6.51],
    ['Orgues d’Espaly, Le Puy-en-Velay', 'France', 45.05, 3.86],
    ['Piton de la Fournaise, La Réunion', 'France', -21.24, 55.71],
    ['Reynisfjara', 'Islande', 63.4, -19.04],
    ['Kīlauea, Hawaï', 'États-Unis', 19.41, -155.28],
    ['Trapps du Deccan', 'Inde', 19.0, 74.0]
  ],
  usages: 'Granulats et ballast, pavés, laine de roche (isolation), fibres de basalte, pierre de Volvic (en partie trachyandésite).',
  anecdote: 'Environ 70 % de la surface de la Terre (le plancher océanique) est recouverte de basalte, et la Lune et Mars en sont aussi largement couvertes.',
  wiki: ['Basalte', 'Basalt'],
  tex: { k: 'fin', b: '#2c2d2e', c: ['#3b3c3d', '#1c1d1e', '#55575a', '#6b8a3c'], s: 1.2, v: 0.15 }
},
{
  id: 'andesite', nom: 'Andésite', alias: [],
  famille: 'magmatique', groupe: 'Volcanique',
  resume: 'Lave grise des volcans de subduction, souvent à cristaux blancs de plagioclase.',
  description: "Roche volcanique de composition intermédiaire (52–63 % SiO₂), grise, à pâte fine contenant fréquemment des phénocristaux blancs de plagioclase et noirs d'amphibole ou de pyroxène (texture porphyrique). Elle tire son nom de la cordillère des Andes, où elle est omniprésente.",
  mineraux: [['Plagioclase (andésine)', '50–70 %'], ['Amphibole et/ou pyroxène', '15–35 %'], ['Biotite', '0–10 %'], ['Verre volcanique', 'variable']],
  texture: 'Microlitique porphyrique.',
  couleur: 'Gris moyen, gris-vert, gris-brun, parfois rougeâtre.',
  grain: ['invisible', 'fin'], densite: [2.5, 2.8], durete: [6, 6], hcl: 'nulle', magn: 1,
  aspect: ['fin'], teinte: ['moyenne'], struct: ['porphyrique', 'massive', 'vacuoles'],
  tests: [
    'Pâte grise avec petits cristaux blancs rectangulaires (plagioclase) et aiguilles noires (amphibole).',
    'Pas de quartz visible (sinon penser à la dacite).',
    'Moins lourde et plus claire qu’un basalte.'
  ],
  confusions: [
    ['basalte', 'Plus sombre et plus dense.'],
    ['dacite', 'Phénocristaux de quartz visibles, teinte plus claire.'],
    ['trachyte', 'Toucher rugueux, feldspath alcalin en tablettes.']
  ],
  formation: "Magma produit au-dessus des zones de subduction par fusion du manteau hydraté puis évolution dans la croûte (cristallisation fractionnée, assimilation). Les magmas andésitiques, visqueux et riches en gaz, construisent des stratovolcans explosifs.",
  contexte: 'Arcs volcaniques de subduction (« ceinture de feu » du Pacifique).',
  lieux: [
    ['Cotopaxi', 'Équateur', -0.68, -78.44],
    ['Stratovolcan du Cantal', 'France', 45.11, 2.68],
    ['Mont Fuji (basalte-andésite)', 'Japon', 35.36, 138.73]
  ],
  usages: 'Granulats, pierre de construction locale.',
  anecdote: 'Le terme a été proposé en 1836 par Leopold von Buch d’après les laves des Andes.',
  wiki: ['Andésite', 'Andesite'],
  tex: { k: 'porphyre', b: '#7a7874', c: ['#6c6a66', '#8a8884', '#5d5b58'], p: '#ecebe6', p2: '#1d1c1b', s: 1.2 }
},
{
  id: 'dacite', nom: 'Dacite', alias: [],
  famille: 'magmatique', groupe: 'Volcanique',
  resume: 'Lave visqueuse claire à phénocristaux de quartz, typique des dômes explosifs.',
  description: "Roche volcanique acide à intermédiaire (63–68 % SiO₂), entre l'andésite et la rhyolite. Pâte claire à moyenne, avec phénocristaux de plagioclase, de quartz, de biotite et d'amphibole. Ses magmas très visqueux forment des dômes et des éruptions très explosives.",
  mineraux: [['Plagioclase', '30–50 %'], ['Quartz', '10–25 %'], ['Biotite, amphibole', '5–15 %'], ['Feldspath potassique', '0–10 %'], ['Verre', 'variable']],
  texture: 'Porphyrique à pâte microlitique ou vitreuse.',
  couleur: 'Gris clair, gris-rose, beige.',
  grain: ['invisible', 'fin'], densite: [2.4, 2.7], durete: [6, 6.5], hcl: 'nulle', magn: 0,
  aspect: ['fin'], teinte: ['claire', 'moyenne'], struct: ['porphyrique', 'massive'],
  tests: [
    'Grains de quartz gris vitreux arrondis dans une pâte claire.',
    'Paillettes noires hexagonales de biotite.',
    'Raye le verre.'
  ],
  confusions: [
    ['andesite', 'Pas de quartz visible, teinte plus sombre.'],
    ['rhyolite', 'Plus riche en feldspath potassique, souvent rubanée, plus claire.']
  ],
  formation: 'Magmas différenciés de zones de subduction, très visqueux et riches en gaz, à l’origine de dômes de lave et d’éruptions pliniennes.',
  contexte: 'Volcans d’arc explosifs, dômes de lave.',
  lieux: [
    ['Mont Saint Helens', 'États-Unis', 46.19, -122.19],
    ['Pinatubo', 'Philippines', 15.13, 120.35]
  ],
  usages: 'Granulats, pierre de construction locale.',
  anecdote: 'Nom tiré de la Dacie romaine (Transylvanie), où elle a été décrite au XIXe siècle.',
  wiki: ['Dacite', 'Dacite'],
  tex: { k: 'porphyre', b: '#b3aaa2', c: ['#a69d95', '#c0b8b0', '#9b928a'], p: '#f2efe9', p2: '#2a2522', s: 1.2 }
},
{
  id: 'rhyolite', nom: 'Rhyolite', alias: ['Liparite'],
  famille: 'magmatique', groupe: 'Volcanique',
  resume: 'Équivalent volcanique du granite : claire, riche en silice, souvent rubanée.',
  description: "Roche volcanique acide (> 68 % SiO₂), de même composition chimique que le granite, mais refroidie rapidement. Pâte très fine ou vitreuse, souvent rubanée par l'écoulement (rhyolite fluidale), avec parfois des phénocristaux de quartz et de sanidine. Les magmas rhyolitiques sont les plus visqueux et les plus explosifs.",
  mineraux: [['Quartz', '20–35 %'], ['Feldspath alcalin (sanidine)', '30–50 %'], ['Plagioclase', '5–15 %'], ['Biotite', '< 5 %'], ['Verre', 'variable']],
  texture: 'Microlitique à vitreuse, porphyrique ; fluidale (rubanée) ; parfois sphérolites.',
  couleur: 'Blanc, gris clair, rose, rouge, violacé (rhyolite amarante de l’Estérel).',
  grain: ['invisible', 'fin'], densite: [2.4, 2.6], durete: [6, 6.5], hcl: 'nulle', magn: 0,
  aspect: ['fin'], teinte: ['claire', 'coloree'], struct: ['bandes', 'porphyrique', 'massive'],
  tests: [
    'Raye le verre.',
    'Légère pour une roche dure ; teinte claire ou colorée.',
    'Rubanement d’écoulement fréquemment visible (fines bandes ondulées).',
    'Petits « yeux » de quartz bipyramidés dans la pâte.'
  ],
  confusions: [
    ['dacite', 'Plus de plagioclase, souvent plus grise.'],
    ['trachyte', 'Pas de quartz, toucher âpre.'],
    ['obsidienne', 'L’obsidienne est une rhyolite entièrement vitreuse.']
  ],
  formation: "Magmas riches en silice formés par fusion de la croûte continentale ou différenciation extrême. Ils donnent des dômes, des coulées courtes et épaisses et surtout des éruptions explosives (ponces, ignimbrites). Les grandes caldeiras (Yellowstone) sont rhyolitiques.",
  contexte: 'Caldeiras continentales, rifts, arcs matures.',
  lieux: [
    ['Massif de l’Estérel', 'France', 43.5, 6.85],
    ['Yellowstone', 'États-Unis', 44.43, -110.59],
    ['Landmannalaugar', 'Islande', 63.99, -19.06]
  ],
  usages: 'Pavés, granulats ; outils préhistoriques taillés.',
  anecdote: 'Les montagnes multicolores de Landmannalaugar doivent leurs teintes à des rhyolites altérées par l’hydrothermalisme.',
  wiki: ['Rhyolite', 'Rhyolite'],
  tex: { k: 'lite', b: '#c79a8e', c: ['#d4a99c', '#b88275', '#e2c2b6', '#a8736a'], s: 6, w: 1 }
},
{
  id: 'trachyte', nom: 'Trachyte', alias: ['Domite'],
  famille: 'magmatique', groupe: 'Volcanique',
  resume: 'Lave claire et âpre au toucher, riche en feldspath alcalin.',
  description: "Roche volcanique alcaline, claire, dont le nom (du grec trakhus, « rugueux ») évoque le toucher âpre. Pâte formée de microlites de sanidine souvent alignés par l'écoulement (texture trachytique), avec des phénocristaux de sanidine en tablettes. Pas ou peu de quartz. Équivalent volcanique de la syénite.",
  mineraux: [['Feldspath alcalin (sanidine)', '60–90 %'], ['Plagioclase', '0–20 %'], ['Biotite, amphibole, pyroxène', '5–15 %'], ['Quartz', '< 5 %']],
  texture: 'Trachytique (microlites alignés), porphyrique, souvent poreuse.',
  couleur: 'Blanc, gris clair, beige, rosé.',
  grain: ['invisible', 'fin'], densite: [2.5, 2.65], durete: [6, 6], hcl: 'nulle', magn: 0,
  aspect: ['fin', 'poreux'], teinte: ['claire'], struct: ['porphyrique', 'massive'],
  tests: [
    'Toucher rugueux, comme du papier de verre fin.',
    'Phénocristaux tabulaires de sanidine, transparents, à éclat vitreux.',
    'Relativement légère et souvent un peu poreuse.'
  ],
  confusions: [
    ['phonolite', 'La phonolite sonne et se débite en dalles, teinte plus verdâtre.'],
    ['rhyolite', 'Contient du quartz.'],
    ['andesite', 'Plus sombre, feldspath = plagioclase.']
  ],
  formation: 'Différenciation de magmas basaltiques alcalins (points chauds intracontinentaux, rifts). Les magmas trachytiques visqueux édifient des dômes (Puy de Dôme) ou alimentent des éruptions explosives.',
  contexte: 'Volcanisme intraplaque continental et océanique alcalin.',
  lieux: [
    ['Puy de Dôme (domite)', 'France', 45.772, 2.964],
    ['Puy de Sarcoui', 'France', 45.81, 2.96],
    ['Ischia', 'Italie', 40.73, 13.9]
  ],
  usages: 'Pierre de construction (églises auvergnates), pierre réfractaire.',
  anecdote: 'La « domite » est le nom local du trachyte du Puy de Dôme, utilisé jadis pour les fours et sarcophages.',
  wiki: ['Trachyte', 'Trachyte'],
  tex: { k: 'porphyre', b: '#d6cfc3', c: ['#cbc3b6', '#e0dad0', '#c0b8aa'], p: '#f5f2ea', p2: '#3a3530', s: 1.4 }
},
{
  id: 'phonolite', nom: 'Phonolite', alias: ['Pierre qui chante'],
  famille: 'magmatique', groupe: 'Volcanique',
  resume: 'Lave alcaline gris-vert qui sonne quand on la frappe et se débite en dalles (lauzes).',
  description: "Roche volcanique alcaline sous-saturée en silice, riche en feldspath alcalin et en feldspathoïdes (néphéline, leucite). Pâte compacte gris-vert à grain très fin, souvent débitée en plaques fines. Son nom (« pierre qui sonne ») vient du son clair qu'elle émet lorsqu'on la frappe.",
  mineraux: [['Feldspath alcalin (sanidine)', '40–60 %'], ['Néphéline / leucite', '15–40 %'], ['Aegyrine, amphibole', '5–15 %'], ['Quartz', '0 %']],
  texture: 'Microlitique fluidale, compacte ; débit en dalles.',
  couleur: 'Gris-vert, gris-brun, vert olive.',
  grain: ['invisible', 'fin'], densite: [2.5, 2.6], durete: [5.5, 6], hcl: 'nulle', magn: 0,
  aspect: ['fin'], teinte: ['moyenne', 'coloree'], struct: ['massive', 'prismes'],
  tests: [
    'Frappée au marteau, une dalle fine émet un son métallique, cristallin.',
    'Débit en dalles plates (lauzes), patine blanchâtre.',
    'Cassure esquilleuse ; aucun quartz possible (incompatible avec la néphéline).'
  ],
  confusions: [
    ['trachyte', 'Plus clair, plus rugueux, ne se débite pas en dalles sonores.'],
    ['ardoise', 'L’ardoise est foliée, plus sombre et se fend en feuillets très fins.']
  ],
  formation: 'Différenciation de magmas alcalins pauvres en silice dans les contextes de point chaud ou de rift continental. Les phonolites forment des dômes et des necks visqueux.',
  contexte: 'Volcanisme alcalin continental (Massif central, rift est-africain).',
  lieux: [
    ['Mont Gerbier de Jonc', 'France', 44.84, 4.22],
    ['Orgues de Bort-les-Orgues', 'France', 45.4, 2.5],
    ['Devils Tower (Wyoming)', 'États-Unis', 44.59, -104.71]
  ],
  usages: 'Lauzes de toiture (Velay, Cantal), dalles.',
  anecdote: 'Les toits de lauzes de phonolite du Mézenc peuvent peser plusieurs centaines de kg/m².',
  wiki: ['Phonolite', 'Phonolite'],
  tex: { k: 'fin', b: '#6f7468', c: ['#7b8174', '#62675b', '#858a7d'], s: 1, lines: true }
},
{
  id: 'obsidienne', nom: 'Obsidienne', alias: ['Verre volcanique'],
  famille: 'magmatique', groupe: 'Volcanique vitreuse',
  resume: 'Verre volcanique noir et brillant, à cassure conchoïdale tranchante.',
  description: "Verre naturel formé par le refroidissement extrêmement rapide d'une lave rhyolitique, trop visqueuse pour que des cristaux aient le temps de se former. Noire le plus souvent (fines inclusions de magnétite), elle peut être brune (acajou), grise, verdâtre, à flocons blancs (obsidienne « neige ») ou à reflets dorés ou irisés.",
  mineraux: [['Verre volcanique rhyolitique', '> 90 %'], ['Microlites, cristobalite (flocons)', 'traces'], ['Magnétite (pigment)', 'traces']],
  texture: 'Vitreuse (hyaline), sans cristaux.',
  couleur: 'Noir, brun-rouge, gris translucide en éclat mince ; flocons blancs ou reflets irisés.',
  grain: ['invisible'], densite: [2.35, 2.6], durete: [5, 5.5], hcl: 'nulle', magn: 0,
  aspect: ['vitreux'], teinte: ['sombre'], struct: ['massive', 'bandes'],
  tests: [
    'Éclat vitreux et cassure conchoïdale (en coquille) aux bords très tranchants.',
    'Translucide sur les bords minces observés à contre-jour.',
    'Ne raye pas (ou à peine) le verre.',
    'Plus légère qu’elle n’en a l’air (≈ 2,4).'
  ],
  confusions: [
    ['silex', 'Le silex est opaque, d’éclat cireux et se trouve dans la craie ; il raye le verre.'],
    ['houille', 'Le charbon est bien plus léger, tache les doigts et brûle.'],
    ['basalte', 'Le basalte est mat et grenu au toucher.']
  ],
  formation: 'Trempe très rapide d’une lave rhyolitique pauvre en eau, en bordure de coulées ou de dômes. Instable à l’échelle géologique, le verre se dévitrifie : on ne trouve quasiment pas d’obsidienne plus ancienne que le Crétacé.',
  contexte: 'Coulées et dômes rhyolitiques.',
  lieux: [
    ['Rocche Rosse, Lipari', 'Italie', 38.49, 14.95],
    ['Monte Arci, Sardaigne', 'Italie', 39.75, 8.75],
    ['Obsidian Cliff, Yellowstone', 'États-Unis', 44.82, -110.73]
  ],
  usages: 'Outils et armes préhistoriques, miroirs (Aztèques), scalpels de chirurgie très fins, bijouterie.',
  anecdote: 'La composition chimique d’une obsidienne est une « signature » de sa source : on retrace ainsi les routes commerciales du Néolithique.',
  wiki: ['Obsidienne', 'Obsidian'],
  tex: { k: 'verre', b: '#121214', c: ['#2b2d33', '#5b6170'], s: 1 }
},
{
  id: 'ponce', nom: 'Pierre ponce', alias: ['Ponce', 'Pumice'],
  famille: 'magmatique', groupe: 'Volcanique vitreuse',
  resume: 'Mousse de verre volcanique si poreuse qu’elle flotte sur l’eau.',
  description: "Roche volcanique vitreuse, claire, extrêmement poreuse (souvent > 70 % de vides), formée de bulles de gaz allongées figées dans un verre rhyolitique ou dacitique. Elle est si légère qu'elle flotte sur l'eau tant que ses pores ne sont pas remplis.",
  mineraux: [['Verre volcanique (rhyolitique/dacitique)', '> 90 %'], ['Phénocristaux épars (feldspath, quartz, biotite)', 'traces']],
  texture: 'Vitreuse, ponceuse (vésicules allongées, fibreuses).',
  couleur: 'Blanc, crème, gris clair, parfois jaunâtre.',
  grain: ['invisible'], densite: [0.25, 0.9], durete: [5, 6], hcl: 'nulle', magn: 0,
  aspect: ['vitreux', 'poreux'], teinte: ['claire'], struct: ['vacuoles'],
  tests: [
    'Flotte sur l’eau !',
    'Très abrasive : raye le verre et use la peau (d’où son usage cosmétique).',
    'Bulles allongées, aspect soyeux ou fibreux.'
  ],
  confusions: [
    ['scorie', 'La scorie est sombre (basaltique), à grosses bulles rondes et coule dans l’eau.'],
    ['tuf', 'Le tuf est un agglomérat de cendres, pas une mousse de verre continue.'],
    ['diatomite', 'La diatomite est tendre, poudreuse et tache les doigts.']
  ],
  formation: "Lors d'une éruption explosive, le magma visqueux et riche en gaz se dépressurise brutalement : les gaz forment une mousse qui se fige instantanément. Les ponces retombent en nappes (retombées pliniennes) ou dans les écoulements pyroclastiques.",
  contexte: 'Éruptions pliniennes de volcans rhyolitiques et dacitiques.',
  lieux: [
    ['Campo Bianco, Lipari', 'Italie', 38.51, 14.96],
    ['Santorin', 'Grèce', 36.4, 25.43],
    ['Taupo', 'Nouvelle-Zélande', -38.8, 176.0]
  ],
  usages: 'Pierre ponce cosmétique, abrasif, délavage des jeans, granulat léger pour bétons, substrat horticole.',
  anecdote: 'Des « radeaux » de ponces de plusieurs centaines de km² dérivent parfois sur les océans après une éruption sous-marine.',
  wiki: ['Pierre ponce', 'Pumice'],
  tex: { k: 'bulles', b: '#e9e5dc', c: ['#c9c3b6', '#d8d3c8'], s: 5, long: true }
},
{
  id: 'scorie', nom: 'Scorie volcanique', alias: ['Pouzzolane', 'Lapilli'],
  famille: 'magmatique', groupe: 'Volcanique (pyroclastique)',
  resume: 'Fragments de lave basaltique bulleuse, rouges ou noirs, qui forment les cônes stromboliens.',
  description: "Fragments de lave basaltique ou andésitique très bulleux, sombres (noirs) ou oxydés (rouges), projetés lors d'éruptions stromboliennes. Plus denses que la ponce, ils coulent dans l'eau. En Auvergne, ces scories meubles sont exploitées sous le nom de pouzzolane.",
  mineraux: [['Verre basaltique', 'dominant'], ['Microlites de plagioclase, pyroxène, olivine', 'variables'], ['Hématite (teinte rouge)', 'variable']],
  texture: 'Vacuolaire (grosses bulles arrondies), rugueuse, scoriacée.',
  couleur: 'Noir, brun, rouge brique (oxydation à chaud).',
  grain: ['invisible'], densite: [1.0, 2.2], durete: [5, 6], hcl: 'nulle', magn: 1,
  aspect: ['poreux', 'vitreux'], teinte: ['sombre', 'coloree'], struct: ['vacuoles'],
  tests: [
    'Légère mais coule dans l’eau.',
    'Bulles rondes de quelques mm, parois rugueuses et coupantes.',
    'Souvent faiblement magnétique.'
  ],
  confusions: [
    ['ponce', 'La ponce est claire, fibreuse et flotte.'],
    ['basalte', 'Un basalte vacuolaire reste massif avec des bulles isolées, et est plus dense.']
  ],
  formation: "Fragmentation de lave basaltique riche en gaz lors d'éruptions stromboliennes : les lambeaux de lave se figent en vol et retombent autour de l'évent, construisant un cône de scories.",
  contexte: 'Cônes stromboliens (chaîne des Puys, Etna).',
  lieux: [
    ['Volcan de Lemptégy, chaîne des Puys', 'France', 45.82, 2.93],
    ['Etna', 'Italie', 37.75, 14.99],
    ['Stromboli', 'Italie', 38.79, 15.21]
  ],
  usages: 'Pouzzolane : granulat léger, drainage, aménagements paysagers, ciment pouzzolanique (déjà utilisé par les Romains).',
  anecdote: 'Le nom pouzzolane vient de Pozzuoli près de Naples, dont les cendres donnaient leur résistance aux bétons romains.',
  wiki: ['Scorie volcanique', 'Scoria'],
  tex: { k: 'bulles', b: '#5a2a22', c: ['#2a1612', '#3d1d17'], s: 9 }
},
{
  id: 'tuf', nom: 'Tuf volcanique', alias: ['Cinérite', 'Tuff'],
  famille: 'magmatique', groupe: 'Volcanique (pyroclastique)',
  resume: 'Roche tendre faite de cendres volcaniques consolidées.',
  description: "Roche pyroclastique formée de cendres (< 2 mm) et de petits fragments volcaniques (lapilli, ponces, cristaux) consolidés. Souvent tendre, poreuse, légère, de teinte claire, elle se taille facilement. Elle peut contenir des lits granoclassés si les cendres sont tombées dans l'eau.",
  mineraux: [['Verre volcanique (échardes)', 'dominant'], ['Cristaux (feldspath, quartz, biotite)', 'variables'], ['Zéolites, argiles (altération)', 'variables']],
  texture: 'Pyroclastique, fine à grossière, parfois litée.',
  couleur: 'Blanc, beige, jaune, rose, gris.',
  grain: ['fin', 'moyen'], densite: [1.2, 2.0], durete: [2, 4], hcl: 'nulle', magn: 0,
  aspect: ['detritique', 'poreux', 'tendre'], teinte: ['claire', 'coloree'], struct: ['litage', 'fragments'],
  tests: [
    'Se raye au couteau, parfois à l’ongle ; léger et poreux.',
    'À la loupe : échardes de verre, petits cristaux et fragments de ponce.',
    'Absorbe l’eau rapidement.'
  ],
  confusions: [
    ['ignimbrite', 'L’ignimbrite est soudée (plus dure) avec des ponces aplaties en flammes.'],
    ['gres', 'Le grès est fait de grains de quartz arrondis, pas d’échardes de verre.'],
    ['craie', 'La craie fait effervescence à l’acide.']
  ],
  formation: 'Accumulation de cendres issues d’éruptions explosives, retombées à l’air libre ou dans l’eau, puis compaction et cimentation (souvent par des zéolites).',
  contexte: 'Pourtours de volcans explosifs, bassins proches.',
  lieux: [
    ['Cappadoce (Göreme)', 'Turquie', 38.64, 34.83],
    ['Tuf jaune napolitain, Naples', 'Italie', 40.85, 14.25],
    ['Rapa Nui (moaï en tuf)', 'Chili', -27.12, -109.29]
  ],
  usages: 'Pierre de construction légère, habitats troglodytes, statues (moaï de l’île de Pâques).',
  anecdote: 'Les célèbres « cheminées de fées » de Cappadoce sont sculptées dans des tufs et ignimbrites.',
  wiki: ['Tuf volcanique', 'Tuff'],
  tex: { k: 'terreux', b: '#ddcfb2', c: ['#c9b996', '#efe5cf', '#b4a07d', '#8a8070'], s: 3 }
},
{
  id: 'ignimbrite', nom: 'Ignimbrite', alias: ['Tuf soudé'],
  famille: 'magmatique', groupe: 'Volcanique (pyroclastique)',
  resume: 'Dépôt de nuée ardente soudé, aux ponces écrasées en « flammes ».',
  description: "Roche pyroclastique déposée par un écoulement pyroclastique (nuée ardente) : un mélange de cendres, de ponces et de fragments de roches. Si le dépôt est encore très chaud, les éléments se soudent et les ponces s'aplatissent en lentilles sombres appelées fiammes (flammes).",
  mineraux: [['Verre (cendres et ponces)', 'dominant'], ['Cristaux (sanidine, quartz, plagioclase)', '5–30 %'], ['Fragments lithiques', 'variables']],
  texture: 'Pyroclastique, eutaxitique (fiammes alignées) lorsqu’elle est soudée.',
  couleur: 'Rose, gris, brun, rougeâtre.',
  grain: ['fin', 'moyen'], densite: [1.8, 2.5], durete: [4, 6], hcl: 'nulle', magn: 0,
  aspect: ['detritique', 'fin'], teinte: ['claire', 'moyenne', 'coloree'], struct: ['fragments', 'bandes'],
  tests: [
    'Repérer les fiammes : lentilles sombres aplaties toutes orientées dans le même sens.',
    'Mélange désordonné de cristaux, fragments de roches et ponces dans une pâte fine.',
    'Plus dure et compacte qu’un tuf ordinaire.'
  ],
  confusions: [
    ['tuf', 'Non soudé, plus tendre, sans fiammes.'],
    ['rhyolite', 'Pâte homogène, sans fragments ni ponces.']
  ],
  formation: 'Effondrement d’une colonne éruptive ou débordement d’une caldeira : un écoulement de gaz brûlant et de fragments dévale les pentes à plusieurs centaines de km/h puis se dépose, parfois sur des centaines de km².',
  contexte: 'Grandes caldeiras rhyolitiques et dacitiques.',
  lieux: [
    ['Bishop Tuff (Californie)', 'États-Unis', 37.65, -118.5],
    ['Zone volcanique de Taupo', 'Nouvelle-Zélande', -38.5, 176.2],
    ['Cappadoce', 'Turquie', 38.66, 34.85]
  ],
  usages: 'Pierre de construction (nombreuses églises d’Arménie, Mexique).',
  anecdote: 'Certaines ignimbrites ont recouvert plus de 10 000 km² en une seule éruption.',
  wiki: ['Ignimbrite', 'Ignimbrite'],
  tex: { k: 'clastes', b: '#b98f7f', c: ['#4b3a35', '#ddc8bb', '#7e6559'], s: 6, flat: true }
},
{
  id: 'kimberlite', nom: 'Kimberlite', alias: ['Terre bleue (blue ground)'],
  famille: 'magmatique', groupe: 'Hypovolcanique ultrabasique',
  resume: 'Roche des cheminées diamantifères, remontée très vite depuis plus de 150 km.',
  description: "Roche ultrabasique riche en potassium et en volatils (CO₂, H₂O), mise en place dans des cheminées en forme de carotte (diatrèmes). Elle contient de nombreux fragments du manteau (péridotites, éclogites) et des minéraux indicateurs : grenat pyrope rouge-violet, diopside chromifère vert, ilménite… et parfois des diamants. Fraîche, elle est gris-bleu ; altérée, jaune.",
  mineraux: [['Olivine (souvent serpentinisée)', '25–60 %'], ['Phlogopite, calcite, serpentine', 'variables'], ['Grenat pyrope, diopside chromifère, ilménite', 'xénocristaux'], ['Diamant', 'traces (rarement)']],
  texture: 'Bréchique / porphyrique : macrocristaux et enclaves dans une matrice fine.',
  couleur: 'Gris-bleu à vert sombre (« terre bleue »), jaune une fois altérée.',
  grain: ['fin', 'moyen'], densite: [2.6, 3.0], durete: [3, 5], hcl: 'faible', magn: 1,
  aspect: ['detritique', 'cristallin'], teinte: ['sombre', 'coloree'], struct: ['fragments', 'porphyrique'],
  tests: [
    'Aspect bréchique avec enclaves arrondies et grains d’olivine (souvent serpentinisés).',
    'Repérer les minéraux indicateurs : petits grenats rouge-violet, diopside vert émeraude.',
    'Peut réagir faiblement à l’acide (carbonates de la matrice).'
  ],
  confusions: [
    ['peridotite', 'La péridotite est grenue et homogène, sans aspect bréchique.'],
    ['serpentinite', 'Pas d’enclaves ni de minéraux indicateurs.']
  ],
  formation: 'Magmas formés à plus de 150 km de profondeur sous les vieux cratons. Riches en gaz, ils remontent en quelques heures, assez vite pour que le diamant n’ait pas le temps de se transformer en graphite, et explosent près de la surface en formant des diatrèmes.',
  contexte: 'Cratons archéens (Afrique australe, Sibérie, Canada).',
  lieux: [
    ['Big Hole de Kimberley', 'Afrique du Sud', -28.74, 24.76],
    ['Mine Mir, Yakoutie', 'Russie', 62.53, 113.99]
  ],
  usages: 'Principale source de diamants.',
  anecdote: 'Le Big Hole de Kimberley, creusé à la pioche entre 1871 et 1914, est l’un des plus grands trous creusés à la main.',
  wiki: ['Kimberlite', 'Kimberlite'],
  tex: { k: 'clastes', b: '#4e5f61', c: ['#7d8b6b', '#2f3a3c', '#8c3b4a', '#a9b19a'], s: 7 }
},
{
  id: 'komatiite', nom: 'Komatiite', alias: [],
  famille: 'magmatique', groupe: 'Volcanique ultrabasique',
  resume: 'Lave ultra-chaude de l’Archéen, à cristaux d’olivine en aiguilles « spinifex ».',
  description: "Lave ultrabasique très riche en magnésium (> 18 % MgO), émise à des températures probablement supérieures à 1 600 °C. Elle n'existe pratiquement que dans les terrains de plus de 2,5 milliards d'années. Elle montre souvent une texture spinifex : de longues lames d'olivine ou de pyroxène entrecroisées, formées par refroidissement brutal.",
  mineraux: [['Olivine (souvent serpentinisée)', '40–70 %'], ['Pyroxène', '10–30 %'], ['Verre / chlorite', 'variable']],
  texture: 'Spinifex (lames parallèles ou en gerbes) ou cumulative.',
  couleur: 'Vert sombre à noir.',
  grain: ['fin', 'moyen'], densite: [2.9, 3.2], durete: [5, 6], hcl: 'nulle', magn: 1,
  aspect: ['fin', 'cristallin'], teinte: ['sombre'], struct: ['massive'],
  tests: [
    'Texture spinifex : aiguilles ou lames sombres de plusieurs cm, en éventails.',
    'Lourde, verte, souvent altérée en serpentine/chlorite (toucher doux).'
  ],
  confusions: [
    ['basalte', 'Pas de lames spinifex, moins magnésien.'],
    ['serpentinite', 'Aspect gras et veiné sans aiguilles.']
  ],
  formation: 'Fusion partielle très importante d’un manteau archéen plus chaud qu’aujourd’hui ; la lave très fluide s’épanchait en coulées turbulentes.',
  contexte: 'Ceintures de roches vertes archéennes.',
  lieux: [
    ['Rivière Komati, Barberton', 'Afrique du Sud', -25.9, 31.0],
    ['Pyke Hill, Munro Township (Ontario)', 'Canada', 48.6, -80.2]
  ],
  usages: 'Gisements de nickel associés (Kambalda, Australie).',
  anecdote: 'Elle témoigne d’une Terre primitive dont le manteau était plus chaud de 200 à 300 °C.',
  wiki: ['Komatiite', 'Komatiite'],
  tex: { k: 'spinifex', b: '#2f3a30', c: ['#56664f', '#1d241e', '#6d7f62'], s: 2 }
}
);
