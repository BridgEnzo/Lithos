/*
 * Roches SÉDIMENTAIRES — voir le schéma des fiches en tête de magmatiques.js
 */
window.ROCHES = window.ROCHES || [];
window.ROCHES.push(

/* ======================= DÉTRITIQUES ======================= */
{
  id: 'conglomerat', nom: 'Conglomérat', alias: ['Poudingue'],
  famille: 'sedimentaire', groupe: 'Détritique',
  resume: 'Galets arrondis cimentés : un ancien lit de rivière ou une plage fossile.',
  description: "Roche détritique formée d'éléments arrondis de plus de 2 mm (graviers, galets, blocs) liés par une matrice plus fine (sable, argile) et/ou un ciment (silice, calcite, oxydes de fer). Lorsque les galets sont bien arrondis, on parle de poudingue. La nature des galets renseigne sur les roches érodées en amont.",
  mineraux: [['Galets (quartz, quartzite, calcaire, granite… selon la source)', 'variables'], ['Matrice sableuse ou argileuse', 'variable'], ['Ciment (calcite, silice, oxydes de fer)', 'variable']],
  texture: 'Détritique grossière, éléments arrondis > 2 mm.',
  couleur: 'Très variable selon les galets et le ciment ; souvent beige, gris, rouge.',
  grain: ['grossier'], densite: [2.3, 2.7], durete: [3, 7], hcl: 'faible', magn: 0,
  aspect: ['detritique'], teinte: ['claire', 'moyenne', 'coloree'], struct: ['fragments', 'litage'],
  tests: [
    'Galets arrondis visibles à l’œil nu (> 2 mm).',
    'Tester le ciment à l’acide : effervescence si ciment calcaire, rien si siliceux.',
    'La cassure contourne les galets (ciment fragile) ou les traverse (ciment très dur).'
  ],
  confusions: [
    ['breche', 'Les éléments de la brèche sont anguleux.'],
    ['gres', 'Grains de sable < 2 mm seulement.']
  ],
  formation: "Dépôt par des courants énergiques (torrents, rivières, cônes alluviaux, plages de galets) puis enfouissement, compaction et cimentation (diagenèse). L'arrondi des galets témoigne d'un transport assez long.",
  contexte: 'Cônes alluviaux, rivières en tresses, piémonts de chaînes de montagnes.',
  lieux: [
    ['Montserrat (Catalogne)', 'Espagne', 41.59, 1.84],
    ['Mallos de Riglos (Aragon)', 'Espagne', 42.35, -0.73],
    ['Poudingue de Valensole (Provence)', 'France', 43.83, 5.98]
  ],
  usages: 'Pierre ornementale, granulats ; certains conglomérats renferment de l’or (Witwatersrand).',
  anecdote: 'Les conglomérats du Witwatersrand (Afrique du Sud) ont fourni environ 40 % de tout l’or extrait dans l’histoire.',
  wiki: ['Conglomérat (géologie)', 'Conglomerate (geology)'],
  tex: { k: 'clastes', b: '#c8b79c', c: ['#8d8a86', '#d9d3c7', '#a26f55', '#5c5a57', '#e8e2d4'], s: 14 }
},
{
  id: 'breche', nom: 'Brèche', alias: ['Brèche sédimentaire', 'Brèche de faille'],
  famille: 'sedimentaire', groupe: 'Détritique',
  resume: 'Fragments anguleux cimentés : transport court, éboulis, faille ou impact.',
  description: "Roche formée de fragments anguleux de plus de 2 mm, liés par une matrice ou un ciment. L'angularité indique un transport quasi nul : éboulis, effondrement de grotte, broyage le long d'une faille, ou bien impact météoritique (brèches d'impact) ou explosion volcanique (brèches volcaniques).",
  mineraux: [['Fragments anguleux (nature variable)', 'dominant'], ['Matrice / ciment (calcite, silice, oxydes)', 'variable']],
  texture: 'Détritique grossière à éléments anguleux.',
  couleur: 'Très variable ; brèches calcaires souvent polychromes.',
  grain: ['grossier'], densite: [2.4, 2.8], durete: [3, 7], hcl: 'faible', magn: 0,
  aspect: ['detritique'], teinte: ['claire', 'moyenne', 'coloree'], struct: ['fragments'],
  tests: [
    'Fragments à arêtes vives, non usés.',
    'Tester les fragments et le ciment à l’acide séparément.'
  ],
  confusions: [
    ['conglomerat', 'Galets arrondis.'],
    ['ignimbrite', 'Fragments volcaniques et ponces aplaties dans une matrice de cendres.']
  ],
  formation: 'Accumulation de débris anguleux au pied des falaises, dans les cavités karstiques, le long des failles, ou fragmentation par impact de météorite puis cimentation.',
  contexte: 'Pieds de falaises, failles, cratères d’impact.',
  lieux: [
    ['Astroblème de Rochechouart (brèches d’impact)', 'France', 45.82, 0.78],
    ['Le Tholonet, « brèche d’Alep » (Aix-en-Provence)', 'France', 43.52, 5.51]
  ],
  usages: 'Marbres bréchiques décoratifs (cheminées, colonnes, Versailles).',
  anecdote: 'À Rochechouart, une météorite d’environ 1,5 km a frappé il y a ~207 millions d’années ; ses brèches ont servi à bâtir le village.',
  wiki: ['Brèche (géologie)', 'Breccia'],
  tex: { k: 'clastes', b: '#c9a98f', c: ['#e9e1d4', '#8a5a48', '#6f6a64', '#d2bba2', '#a9a19a'], s: 14, ang: true }
},
{
  id: 'gres', nom: 'Grès', alias: ['Sandstone'],
  famille: 'sedimentaire', groupe: 'Détritique',
  resume: 'Sable consolidé, surtout du quartz : rugueux comme du papier de verre.',
  description: "Roche détritique formée de grains de sable (0,063 à 2 mm), principalement de quartz, liés par un ciment (silice, calcite, oxydes de fer, argile). La couleur dépend du ciment : blanc (silice), jaune à rouge (oxydes de fer). Il montre souvent des stratifications obliques, des rides de courant ou des fossiles.",
  mineraux: [['Quartz', '> 65 % (grès quartzeux > 90 %)'], ['Feldspaths', '< 25 %'], ['Micas, fragments de roches', 'variables'], ['Ciment (silice, calcite, hématite)', 'variable']],
  texture: 'Détritique, grains de sable visibles à la loupe, toucher rugueux.',
  couleur: 'Blanc, beige, jaune, rose, rouge, gris.',
  grain: ['fin', 'moyen'], densite: [2.0, 2.6], durete: [6, 7], hcl: 'faible', magn: 0,
  aspect: ['detritique'], teinte: ['claire', 'coloree'], struct: ['litage', 'fossiles'],
  tests: [
    'Toucher rugueux ; frotter la surface libère du sable.',
    'Les grains raient l’acier et le verre (quartz) même si la roche s’effrite.',
    'Effervescence seulement si le ciment est calcaire (grès calcareux).',
    'Poreux : une goutte d’eau est absorbée.'
  ],
  confusions: [
    ['quartzite', 'Dans la quartzite, la cassure traverse les grains (soudés) ; surface lisse et brillante.'],
    ['arkose', 'Riche en feldspaths roses ou blancs (> 25 %).'],
    ['calcaire', 'Le calcaire fait effervescence partout et ne raye pas le verre.']
  ],
  formation: 'Accumulation de sables dans les dunes, rivières, deltas, plages ou fonds marins, puis compaction et cimentation lors de l’enfouissement (diagenèse).',
  contexte: 'Déserts, deltas, littoraux, rivières, plateformes.',
  lieux: [
    ['Forêt de Fontainebleau', 'France', 48.4, 2.7],
    ['Grès rose des Vosges (Strasbourg)', 'France', 48.58, 7.75],
    ['Grès d’Annot (Alpes-de-Haute-Provence)', 'France', 43.97, 6.67],
    ['Pétra', 'Jordanie', 30.33, 35.44],
    ['Monument Valley', 'États-Unis', 36.98, -110.11]
  ],
  usages: 'Pierre de taille (cathédrale de Strasbourg), pavés (grès de Fontainebleau), meules, verre (sable siliceux), réservoir d’eau et de pétrole.',
  anecdote: 'Les rochers de Fontainebleau, terrain d’escalade mondialement connu, sont des blocs de grès quartzeux très cimenté au sein de sables.',
  wiki: ['Grès (géologie)', 'Sandstone'],
  tex: { k: 'sable', b: '#d8b98f', c: ['#c9a678', '#e8d3b2', '#b88c5e', '#f2e5cc'], s: 1.4, lit: true }
},
{
  id: 'arkose', nom: 'Arkose', alias: ['Grès arkosique'],
  famille: 'sedimentaire', groupe: 'Détritique',
  resume: 'Grès riche en feldspaths, issu de l’érosion rapide d’un granite.',
  description: "Grès contenant plus de 25 % de feldspaths (roses ou blancs), en plus du quartz. Les grains sont souvent anguleux et mal triés : la roche ressemble parfois à un granite « désagrégé puis recollé ». Elle témoigne d'une érosion rapide de granites ou de gneiss, sous climat sec ou froid, avec un transport court.",
  mineraux: [['Quartz', '40–70 %'], ['Feldspaths', '> 25 %'], ['Micas', '0–10 %'], ['Ciment (calcite, silice, hématite)', 'variable']],
  texture: 'Détritique moyenne à grossière, grains anguleux.',
  couleur: 'Rose, rouge, gris clair.',
  grain: ['moyen', 'grossier'], densite: [2.3, 2.6], durete: [6, 7], hcl: 'faible', magn: 0,
  aspect: ['detritique'], teinte: ['claire', 'coloree'], struct: ['litage'],
  tests: [
    'Grains roses à faces de clivage brillantes (feldspath) au milieu du quartz gris.',
    'Toucher rugueux, s’effrite parfois en arène.'
  ],
  confusions: [
    ['granite', 'Dans le granite, les cristaux sont jointifs et engrenés, pas arrondis ni cimentés.'],
    ['gres', 'Moins de 25 % de feldspaths.']
  ],
  formation: 'Érosion mécanique rapide d’un massif granitique proche, transport court, dépôt dans des bassins continentaux (cônes alluviaux, rifts).',
  contexte: 'Bassins continentaux au pied de massifs granitiques.',
  lieux: [
    ['Uluru (Ayers Rock)', 'Australie', -25.345, 131.036],
    ['Bassin de Brive (grès et arkoses permiens)', 'France', 45.16, 1.53]
  ],
  usages: 'Pierre de construction locale.',
  anecdote: 'Uluru doit sa couleur rouge à l’oxydation du fer contenu dans l’arkose ; à cœur, la roche est grise.',
  wiki: ['Arkose', 'Arkose'],
  tex: { k: 'sable', b: '#c99583', c: ['#e3b3a0', '#b9a79c', '#f1ddd2', '#9b6f5f'], s: 2.4 }
},
{
  id: 'grauwacke', nom: 'Grauwacke', alias: ['Greywacke'],
  famille: 'sedimentaire', groupe: 'Détritique',
  resume: 'Grès sombre, dur et mal trié, déposé par des avalanches sous-marines.',
  description: "Grès gris sombre à verdâtre, dur, formé de grains de quartz, de feldspaths et de fragments de roches pris dans une abondante matrice argileuse (> 15 %). Les grauwackes se déposent par des courants de turbidité et montrent souvent un granoclassement (grains grossiers à la base, fins au sommet).",
  mineraux: [['Quartz', '20–50 %'], ['Fragments de roches', '10–40 %'], ['Feldspaths', '10–30 %'], ['Matrice argileuse, chlorite', '> 15 %']],
  texture: 'Détritique, mal triée, matrice abondante.',
  couleur: 'Gris foncé, gris-vert, presque noir.',
  grain: ['fin', 'moyen'], densite: [2.6, 2.75], durete: [6, 7], hcl: 'nulle', magn: 0,
  aspect: ['detritique'], teinte: ['sombre', 'moyenne'], struct: ['litage'],
  tests: [
    'Grains de tailles variées dans une pâte sombre.',
    'Dure et tenace, cassure irrégulière.',
    'Granoclassement visible dans les bancs.'
  ],
  confusions: [
    ['gres', 'Plus clair, mieux trié, peu de matrice.'],
    ['basalte', 'Le basalte n’est pas formé de grains détritiques.']
  ],
  formation: 'Courants de turbidité (avalanches sous-marines de sédiments) au bas des talus continentaux et dans les fosses, souvent liés aux marges actives.',
  contexte: 'Turbidites profondes, fosses océaniques, flyschs anciens.',
  lieux: [
    ['Massif du Harz', 'Allemagne', 51.75, 10.6],
    ['Southern Uplands', 'Royaume-Uni (Écosse)', 55.4, -3.5]
  ],
  usages: 'Granulats routiers de haute résistance.',
  anecdote: 'Le mot vient de l’allemand grau (gris) et Wacke, un terme de mineurs du Harz.',
  wiki: ['Grauwacke', 'Greywacke'],
  tex: { k: 'sable', b: '#55574f', c: ['#6b6d65', '#3f413b', '#8a8c83', '#2e302c'], s: 1.6 }
},
{
  id: 'argile', nom: 'Argile', alias: ['Glaise', 'Kaolin (variété)'],
  famille: 'sedimentaire', groupe: 'Détritique fine',
  resume: 'Sédiment ultra-fin, plastique quand il est mouillé, qui sent la « terre mouillée ».',
  description: "Roche meuble ou peu consolidée formée de minéraux argileux (phyllosilicates < 2 µm : kaolinite, illite, smectite) et souvent de quartz très fin. Humide, l'argile est plastique et imperméable ; sèche, elle durcit et se fendille. Le kaolin, blanc et pur, provient de l'altération des feldspaths des granites.",
  mineraux: [['Minéraux argileux (kaolinite, illite, smectite, chlorite)', '> 50 %'], ['Quartz très fin', '0–40 %'], ['Oxydes de fer, matière organique', 'variables']],
  texture: 'Pélitique, grains invisibles même à la loupe.',
  couleur: 'Blanc (kaolin), gris, vert, ocre, rouge, noir.',
  grain: ['invisible'], densite: [1.7, 2.3], durete: [1, 2], hcl: 'nulle', magn: 0,
  aspect: ['tendre', 'fin'], teinte: ['claire', 'moyenne', 'coloree'], struct: ['litage', 'massive'],
  tests: [
    'Mouillée, elle devient plastique : on peut modeler un boudin sans qu’il casse.',
    'Souffler son haleine dessus : odeur caractéristique de terre mouillée.',
    'Happe la langue (adhère) quand elle est sèche.',
    'Se raye à l’ongle ; pas d’effervescence (sinon c’est une marne).'
  ],
  confusions: [
    ['marne', 'La marne fait effervescence (35–65 % de calcaire).'],
    ['argilite', 'L’argilite/shale est indurée et se débite en feuillets.'],
    ['loess', 'Le loess n’est pas plastique, il est farineux.']
  ],
  formation: 'Altération chimique des silicates (feldspaths, micas) sous climat humide, transport des particules fines en suspension et dépôt en eau calme (lacs, plaines d’inondation, fonds marins profonds).',
  contexte: 'Lacs, plaines alluviales, mers calmes ; profils d’altération.',
  lieux: [
    ['Kaolin de Saint-Yrieix-la-Perche', 'France', 45.52, 1.2],
    ['Argile de Londres', 'Royaume-Uni', 51.5, -0.1],
    ['Argiles du Vexin et de Provins', 'France', 48.56, 3.3]
  ],
  usages: 'Briques, tuiles, poteries, porcelaine (kaolin de Limoges), ciment, barrières étanches, cosmétique.',
  anecdote: 'La découverte du kaolin à Saint-Yrieix vers 1768 a permis la naissance de la porcelaine de Limoges.',
  wiki: ['Argile', 'Clay'],
  tex: { k: 'terreux', b: '#a9a49a', c: ['#bab5aa', '#99948a', '#c9b49a'], s: 2, smooth: true }
},
{
  id: 'argilite', nom: 'Argilite / Shale', alias: ['Schiste argileux', 'Pélite', 'Schiste carton'],
  famille: 'sedimentaire', groupe: 'Détritique fine',
  resume: 'Argile durcie qui se débite en feuillets ; berceau de fossiles exceptionnels.',
  description: "Roche sédimentaire fine (argile + silt) indurée par compaction. Le shale (anglais) se débite en feuillets parallèles à la stratification (fissilité), contrairement à l'ardoise dont la schistosité est d'origine métamorphique. Les shales noirs, riches en matière organique, sont des roches-mères de pétrole et de gaz.",
  mineraux: [['Minéraux argileux', '50–70 %'], ['Quartz (silt)', '20–40 %'], ['Matière organique, pyrite', '0–10 %'], ['Carbonates', '0–15 %']],
  texture: 'Pélitique, feuilletée (fissile) selon le litage.',
  couleur: 'Gris, noir, brun, vert, rouge.',
  grain: ['invisible'], densite: [2.2, 2.7], durete: [2, 3], hcl: 'nulle', magn: 0,
  aspect: ['fin', 'folie', 'tendre'], teinte: ['moyenne', 'sombre'], struct: ['litage', 'fossiles'],
  tests: [
    'Se raye à l’ongle ou à la pièce de cuivre.',
    'Se délite en feuillets dans le sens des couches ; se ramollit à l’eau à la longue.',
    'Odeur argileuse quand on souffle dessus.',
    'Fossiles fréquents à la surface des feuillets.'
  ],
  confusions: [
    ['ardoise', 'L’ardoise est plus dure, sonore et ne se ramollit pas à l’eau.'],
    ['argile', 'L’argile est plastique et non feuilletée.'],
    ['marne', 'La marne fait effervescence.']
  ],
  formation: 'Dépôt de boues fines en milieu calme (plateau profond, lacs, bassins anoxiques), puis compaction qui oriente les feuillets d’argile.',
  contexte: 'Bassins marins profonds ou confinés, lacs.',
  lieux: [
    ['Schistes de Burgess (Colombie-Britannique)', 'Canada', 51.43, -116.47],
    ['Schistes de Holzmaden', 'Allemagne', 48.63, 9.53],
    ['Schistes cartons du Toarcien, Grands Causses', 'France', 44.1, 3.08]
  ],
  usages: 'Briques et ciment ; roche-mère et réservoir de gaz/huile de schiste.',
  anecdote: 'Les schistes de Burgess conservent des animaux à corps mou du Cambrien (~508 Ma), une fenêtre unique sur l’explosion de la vie.',
  wiki: ['Shale', 'Shale'],
  tex: { k: 'lite', b: '#4d4c4a', c: ['#5b5a57', '#3e3d3b', '#666461', '#45443f'], s: 2.4, w: 0.3 }
},
{
  id: 'marne', nom: 'Marne', alias: [],
  famille: 'sedimentaire', groupe: 'Mixte (argile + calcaire)',
  resume: 'Mélange d’argile et de calcaire : tendre, fait effervescence et laisse un résidu boueux.',
  description: "Roche sédimentaire composée de 35 à 65 % de calcaire et de 35 à 65 % d'argile. Tendre, souvent gris-bleu ou beige, elle se délite à l'eau et au gel en formant des paysages de badlands (roubines). Au-delà de 65 % de calcaire on parle de calcaire marneux, en deçà de 35 % d'argile calcaire.",
  mineraux: [['Calcite', '35–65 %'], ['Minéraux argileux', '35–65 %'], ['Quartz, pyrite', 'variables']],
  texture: 'Pélitique, compacte ou litée.',
  couleur: 'Gris, gris-bleu, beige, noir (marnes noires).',
  grain: ['invisible'], densite: [2.0, 2.4], durete: [2, 3], hcl: 'forte', magn: 0,
  aspect: ['fin', 'tendre'], teinte: ['claire', 'moyenne', 'sombre'], struct: ['litage', 'fossiles'],
  tests: [
    'Effervescence à l’acide, mais il reste une boue argileuse grise après réaction.',
    'Se raye facilement au couteau, parfois à l’ongle.',
    'Odeur d’argile quand on souffle dessus ; se délite dans l’eau.'
  ],
  confusions: [
    ['calcaire', 'Effervescence sans résidu boueux, plus dur.'],
    ['argile', 'Aucune effervescence.'],
    ['craie', 'La craie est blanche, tache les doigts et ne laisse quasiment pas de résidu.']
  ],
  formation: 'Dépôt mixte de boues calcaires (plancton) et d’argiles apportées par les rivières, en mer ou en lac, puis compaction.',
  contexte: 'Bassins marins et lacustres calmes.',
  lieux: [
    ['Terres noires de Digne (marnes noires jurassiques)', 'France', 44.09, 6.24],
    ['Marnes bleues des Baronnies', 'France', 44.3, 5.4]
  ],
  usages: 'Fabrication du ciment (avec le calcaire), amendement des sols (marnage), briques.',
  anecdote: 'Le « ciment naturel » prompt de Grenoble est obtenu en cuisant des calcaires marneux à la composition idéale.',
  wiki: ['Marne (roche)', 'Marl'],
  tex: { k: 'lite', b: '#9da1a3', c: ['#a8acae', '#8f9395', '#b6b9b9', '#85898c'], s: 5, w: 0.5 }
},

/* ======================= CARBONATÉES ======================= */
{
  id: 'calcaire', nom: 'Calcaire', alias: ['Pierre à chaux', 'Limestone'],
  famille: 'sedimentaire', groupe: 'Carbonatée (biochimique)',
  resume: 'Roche de calcite (CaCO₃) qui fait vivement effervescence à l’acide.',
  description: "Roche sédimentaire composée d'au moins 50 % de carbonate de calcium (calcite). Les calcaires sont très variés : compacts et fins (micritiques), à fossiles (bioclastiques), à oolithes, récifaux, lacustres… Ils renferment souvent des fossiles (coquilles, coraux, foraminifères) et sont sculptés par la dissolution (karst : grottes, lapiaz, gorges).",
  mineraux: [['Calcite', '> 50 % (souvent > 90 %)'], ['Dolomite, argile, quartz', 'variables']],
  texture: 'Micritique (fine), sparitique (cristalline), bioclastique ou oolithique.',
  couleur: 'Blanc, beige, gris, jaune ; noir s’il est riche en matière organique.',
  grain: ['invisible', 'fin', 'moyen'], densite: [2.3, 2.7], durete: [3, 4], hcl: 'forte', magn: 0,
  aspect: ['fin', 'detritique'], teinte: ['claire', 'moyenne'], struct: ['litage', 'fossiles', 'massive'],
  tests: [
    'Effervescence vive et immédiate à froid avec l’acide chlorhydrique dilué (bulles de CO₂).',
    'Se raye au couteau en acier mais pas à l’ongle (calcite dureté 3).',
    'Ne raye pas le verre.',
    'Rechercher les fossiles à la loupe ; certains calcaires dégagent une odeur fétide quand on les casse (calcaires bitumineux).'
  ],
  confusions: [
    ['dolomie', 'La dolomie ne réagit qu’à chaud ou sur poudre.'],
    ['marbre', 'Le marbre est entièrement recristallisé (cristaux brillants), sans fossiles.'],
    ['gres', 'Le grès raye le verre et ne fait pas (ou peu) effervescence.']
  ],
  formation: "Accumulation de squelettes et coquilles calcaires (coraux, algues, mollusques, plancton) ou précipitation chimique de calcite dans des mers chaudes et peu profondes, puis lithification. Certains calcaires se forment en lac ou en source.",
  contexte: 'Plateformes marines tropicales, récifs, lagons, lacs.',
  lieux: [
    ['Massif du Vercors', 'France', 45.05, 5.45],
    ['Gorges du Verdon', 'France', 43.76, 6.33],
    ['Calcaire lutétien de Paris (« pierre de Paris »)', 'France', 48.85, 2.35],
    ['Massif du Jura', 'France / Suisse', 46.6, 6.1],
    ['Baie d’Ha Long', 'Viêt Nam', 20.91, 107.18]
  ],
  usages: 'Chaux, ciment, pierre de taille (Paris haussmannien), granulats, amendement agricole, industrie (verre, sucre, acier).',
  anecdote: 'Une grande partie de Paris a été construite avec le calcaire lutétien extrait… sous Paris : ce sont les carrières devenues catacombes.',
  wiki: ['Calcaire', 'Limestone'],
  tex: { k: 'coquilles', b: '#d9d1bf', c: ['#c4bba6', '#e6dfcf', '#b3a990'], s: 4, few: true }
},
{
  id: 'craie', nom: 'Craie', alias: ['Chalk'],
  famille: 'sedimentaire', groupe: 'Carbonatée (biochimique)',
  resume: 'Calcaire blanc, tendre et poreux, fait de plancton microscopique.',
  description: "Calcaire très pur (> 95 % de calcite), blanc, tendre, léger et poreux, formé essentiellement de coccolithes : plaquettes calcaires d'algues planctoniques microscopiques. Elle contient souvent des rognons de silex alignés en lits et des fossiles (oursins, bélemnites).",
  mineraux: [['Calcite (coccolithes)', '> 95 %'], ['Silex (rognons)', 'variable'], ['Argile', '< 5 %']],
  texture: 'Micritique très fine, poreuse, friable.',
  couleur: 'Blanc pur à blanc crème.',
  grain: ['invisible'], densite: [1.5, 2.2], durete: [1.5, 2.5], hcl: 'forte', magn: 0,
  aspect: ['fin', 'tendre', 'poreux'], teinte: ['claire'], struct: ['litage', 'fossiles'],
  tests: [
    'Tache les doigts et écrit sur une surface sombre.',
    'Effervescence très vive à l’acide, sans résidu.',
    'Se raye à l’ongle ou presque ; très légère et absorbante.'
  ],
  confusions: [
    ['diatomite', 'La diatomite ne fait pas effervescence (siliceuse).'],
    ['gypse', 'Le gypse ne fait pas effervescence.'],
    ['calcaire', 'Plus dur, plus dense, ne tache pas.']
  ],
  formation: "Accumulation au fond des mers chaudes du Crétacé supérieur (100–66 Ma) des coccolithes produites en masse par le phytoplancton, à quelques centaines de mètres de profondeur, loin des apports de sable et d'argile.",
  contexte: 'Mers épicontinentales du Crétacé (bassin de Paris, Manche).',
  lieux: [
    ['Falaises d’Étretat', 'France', 49.71, 0.19],
    ['Falaises de Douvres', 'Royaume-Uni', 51.13, 1.33],
    ['Crayères de Reims (caves de Champagne)', 'France', 49.25, 4.03]
  ],
  usages: 'Craie pour amendements, ciment, charges industrielles (peintures, papier) ; caves à champagne creusées dedans.',
  anecdote: 'La « craie » d’école moderne est le plus souvent… du gypse ou du carbonate de calcium de synthèse.',
  wiki: ['Craie', 'Chalk'],
  tex: { k: 'fin', b: '#f2efe6', c: ['#e8e4d8', '#faf8f2', '#dcd8cc'], s: 1, v: 0, nod: '#3a3c40' }
},
{
  id: 'oolithique', nom: 'Calcaire oolithique', alias: ['Oolite'],
  famille: 'sedimentaire', groupe: 'Carbonatée (chimique)',
  resume: 'Calcaire fait de petites billes concentriques (oolithes) comme des œufs de poisson.',
  description: "Calcaire constitué en majorité d'oolithes : grains sphériques de 0,5 à 2 mm formés de couches concentriques de calcite autour d'un noyau (grain de sable, débris de coquille). Le nom vient du grec ôon, « œuf », par ressemblance avec des œufs de poisson.",
  mineraux: [['Calcite (oolithes + ciment)', '> 90 %'], ['Débris coquilliers, quartz', 'variables']],
  texture: 'Oolithique : billes jointives de 0,5–2 mm.',
  couleur: 'Beige, crème, jaune doré, gris clair.',
  grain: ['fin', 'moyen'], densite: [2.2, 2.6], durete: [3, 3.5], hcl: 'forte', magn: 0,
  aspect: ['detritique'], teinte: ['claire'], struct: ['litage', 'fossiles'],
  tests: [
    'À la loupe : petites billes rondes à structure concentrique (visible sur une cassure).',
    'Effervescence vive.',
    'Toucher grenu, un peu rugueux.'
  ],
  confusions: [
    ['gres', 'Grains de quartz qui ne réagissent pas à l’acide.'],
    ['calcaire', 'Pas de billes concentriques.']
  ],
  formation: 'Précipitation de calcite autour de grains roulés en permanence par les vagues et les courants, dans des eaux tropicales peu profondes, chaudes et sursaturées en carbonate.',
  contexte: 'Hauts-fonds marins agités tropicaux (Bahamas actuelles, mers jurassiques).',
  lieux: [
    ['Pierre de Bath', 'Royaume-Uni', 51.38, -2.36],
    ['Grand Banc des Bahamas (oolithes actuelles)', 'Bahamas', 24.5, -77.5],
    ['Calcaires oolithiques de Bourgogne (Comblanchien, Bathonien)', 'France', 47.1, 4.9]
  ],
  usages: 'Pierre de taille appréciée (Bath, Bourgogne), granulats.',
  anecdote: 'Toute la ville de Bath (patrimoine mondial) est bâtie dans ce calcaire oolithique doré.',
  wiki: ['Oolithe', 'Oolite'],
  tex: { k: 'oolithes', b: '#d8c7a0', c: ['#e8dbbb', '#c7b285', '#f0e6cf'], s: 3 }
},
{
  id: 'lumachelle', nom: 'Lumachelle', alias: ['Coquina', 'Falun (variété meuble)'],
  famille: 'sedimentaire', groupe: 'Carbonatée (bioclastique)',
  resume: 'Calcaire formé presque entièrement de coquilles entières ou brisées.',
  description: "Calcaire bioclastique constitué d'une accumulation de coquilles de mollusques (huîtres, gastéropodes, bivalves), entières ou fragmentées, plus ou moins cimentées. Les faluns sont des équivalents meubles plus récents. La coquina est une lumachelle peu cimentée et poreuse.",
  mineraux: [['Calcite / aragonite (coquilles)', '> 80 %'], ['Ciment calcitique, sable', 'variable']],
  texture: 'Bioclastique grossière.',
  couleur: 'Beige, gris, jaunâtre.',
  grain: ['moyen', 'grossier'], densite: [1.8, 2.5], durete: [3, 3], hcl: 'forte', magn: 0,
  aspect: ['detritique', 'poreux'], teinte: ['claire'], struct: ['fossiles', 'litage'],
  tests: [
    'Coquilles reconnaissables à l’œil nu.',
    'Effervescence vive.',
    'Souvent poreuse et légère.'
  ],
  confusions: [
    ['calcaire', 'Fossiles dispersés et non jointifs dans un calcaire ordinaire.'],
    ['conglomerat', 'Galets de roches, pas de coquilles.']
  ],
  formation: 'Concentration de coquilles par les vagues et les tempêtes sur des plages, des barres sableuses ou des bancs d’huîtres, puis cimentation.',
  contexte: 'Littoraux, plateformes peu profondes.',
  lieux: [
    ['Coquina d’Anastasia Island (Floride)', 'États-Unis', 29.85, -81.27],
    ['Faluns de Touraine (Savigné-sur-Lathan)', 'France', 47.44, 0.31]
  ],
  usages: 'Pierre de construction (fort de San Marcos, Floride), amendement calcaire.',
  anecdote: 'Les murs en coquina du fort de San Marcos absorbaient les boulets de canon au lieu d’éclater.',
  wiki: ['Lumachelle', 'Coquina'],
  tex: { k: 'coquilles', b: '#cdbb98', c: ['#e9dcc0', '#a8916a', '#f3ead7', '#b8a37c'], s: 10 }
},
{
  id: 'dolomie', nom: 'Dolomie', alias: ['Dolomite (roche)'],
  famille: 'sedimentaire', groupe: 'Carbonatée',
  resume: 'Roche de dolomite (carbonate de Ca et Mg) qui ne réagit à l’acide que sur poudre.',
  description: "Roche carbonatée composée de plus de 50 % de dolomite, CaMg(CO₃)₂. D'aspect proche du calcaire, souvent un peu saccharoïde (comme du sucre), elle est plus dure et plus dense. Elle forme des reliefs ruiniformes spectaculaires et des falaises.",
  mineraux: [['Dolomite', '> 50 %'], ['Calcite', 'variable'], ['Argile, quartz', 'variables']],
  texture: 'Cristalline fine à saccharoïde ; souvent poreuse (vacuoles).',
  couleur: 'Gris, beige, blanc, rosé ; patine fréquente jaune-brun ou gris ruiniforme.',
  grain: ['fin', 'moyen'], densite: [2.7, 2.9], durete: [3.5, 4], hcl: 'faible', magn: 0,
  aspect: ['cristallin', 'fin'], teinte: ['claire', 'moyenne'], struct: ['massive', 'litage'],
  tests: [
    'Effervescence nulle ou très faible à froid sur la roche…',
    '… mais nette sur la poudre (gratter au couteau) ou avec de l’acide chaud.',
    'Souvent un toucher « sucre » (cristaux fins brillants) et une patine sableuse.',
    'Un peu plus lourde que le calcaire.'
  ],
  confusions: [
    ['calcaire', 'Effervescence vive immédiate sur la roche.'],
    ['marbre', 'Marbre : cristaux plus gros, effervescence vive (marbre calcitique).'],
    ['gres', 'Raye le verre.']
  ],
  formation: 'Le plus souvent par transformation d’un calcaire (dolomitisation) : des eaux riches en magnésium (lagunes évaporitiques, mélanges eau douce/eau de mer) remplacent une partie du calcium. Les conditions de formation directe restent débattues (« problème de la dolomie »).',
  contexte: 'Plateformes carbonatées, lagunes, récifs anciens.',
  lieux: [
    ['Dolomites (Tre Cime di Lavaredo)', 'Italie', 46.62, 12.3],
    ['Chaos de Montpellier-le-Vieux (Causses)', 'France', 44.13, 3.2],
    ['Cirque de Mourèze (Hérault)', 'France', 43.62, 3.36]
  ],
  usages: 'Granulats, fondant en sidérurgie, réfractaires, source de magnésium, amendement agricole (magnésien).',
  anecdote: 'La roche et les Dolomites portent le nom de Déodat de Dolomieu, géologue français qui l’a décrite en 1791.',
  wiki: ['Dolomie', 'Dolomite (rock)'],
  tex: { k: 'sucre', b: '#cfc6b6', c: ['#ddd5c7', '#c2b9a8', '#e8e2d6', '#b8ad99'], s: 3 }
},
{
  id: 'travertin', nom: 'Travertin', alias: ['Tuf calcaire'],
  famille: 'sedimentaire', groupe: 'Carbonatée (chimique)',
  resume: 'Calcaire de source, poreux et rubané, précipité par des eaux chargées de calcium.',
  description: "Calcaire continental déposé par des sources et cours d'eau sursaturés en carbonate de calcium. Il est poreux, montre des cavités allongées et des lits ondulés, et peut englober des végétaux (mousses, feuilles) devenus empreintes. Le tuf calcaire est une variété très poreuse, souvent à empreintes de végétaux.",
  mineraux: [['Calcite (parfois aragonite)', '> 95 %']],
  texture: 'Concrétionnée, litée, vacuolaire.',
  couleur: 'Beige, crème, ivoire, jaune, rouille.',
  grain: ['fin'], densite: [2.2, 2.5], durete: [3, 3], hcl: 'forte', magn: 0,
  aspect: ['poreux', 'fin'], teinte: ['claire'], struct: ['litage', 'vacuoles', 'bandes'],
  tests: [
    'Effervescence vive.',
    'Cavités allongées alignées dans les lits ondulés.',
    'Empreintes de végétaux fréquentes (tuf calcaire).'
  ],
  confusions: [
    ['scorie', 'La scorie est sombre et ne fait pas effervescence.'],
    ['calcaire', 'Pas de structure concrétionnée poreuse.']
  ],
  formation: 'Les eaux ayant traversé des calcaires (ou chauffées en profondeur) se chargent en CO₂ et en calcium ; à la sortie, le dégazage du CO₂ provoque la précipitation de calcite, favorisée par les mousses et les algues.',
  contexte: 'Sources chaudes ou froides, cascades, régions karstiques.',
  lieux: [
    ['Pamukkale', 'Turquie', 37.92, 29.12],
    ['Tivoli (travertin romain)', 'Italie', 41.96, 12.8],
    ['Mammoth Hot Springs, Yellowstone', 'États-Unis', 44.97, -110.7]
  ],
  usages: 'Pierre de taille et dallage (Colisée de Rome), revêtements.',
  anecdote: 'Le Colisée est construit en grande partie en travertin de Tivoli.',
  wiki: ['Travertin', 'Travertine'],
  tex: { k: 'lite', b: '#e3d6bc', c: ['#d6c6a6', '#ece2cd', '#c9b38b'], s: 5, w: 1.2, holes: true }
},

/* ======================= SILICEUSES ======================= */
{
  id: 'silex', nom: 'Silex', alias: ['Pierre à fusil', 'Flint'],
  famille: 'sedimentaire', groupe: 'Siliceuse',
  resume: 'Rognon de silice très dur à cassure conchoïdale, logé dans la craie.',
  description: "Roche siliceuse (calcédoine et quartz microcristallin) formant des rognons ou des lits dans la craie et les calcaires. Très dure, elle se brise en éclats tranchants à cassure conchoïdale. Le cœur est gris à noir, entouré d'un cortex blanc crayeux.",
  mineraux: [['Calcédoine, quartz microcristallin', '> 95 %'], ['Opale, impuretés', 'traces']],
  texture: 'Cryptocristalline, compacte.',
  couleur: 'Noir, gris, brun, blond ; cortex blanc.',
  grain: ['invisible'], densite: [2.55, 2.65], durete: [6.5, 7], hcl: 'nulle', magn: 0,
  aspect: ['vitreux', 'fin'], teinte: ['sombre', 'moyenne'], struct: ['massive'],
  tests: [
    'Raye le verre et l’acier ; fait des étincelles contre de l’acier (briquet à silex).',
    'Cassure conchoïdale à éclat cireux, bords tranchants.',
    'Translucide en éclat très mince.',
    'Le cortex blanc fait effervescence (craie), pas le cœur.'
  ],
  confusions: [
    ['obsidienne', 'L’obsidienne est vitreuse, plus brillante et ne se trouve pas dans la craie.'],
    ['chert', 'Chert/jaspe : en bancs, souvent coloré, sans cortex crayeux.']
  ],
  formation: 'La silice dissoute provenant de squelettes d’éponges et de radiolaires migre dans les sédiments crayeux en cours de diagenèse et précipite en nodules autour de terriers ou de fossiles.',
  contexte: 'Craies et calcaires, surtout du Crétacé.',
  lieux: [
    ['Le Grand-Pressigny (Indre-et-Loire)', 'France', 46.92, 0.8],
    ['Minières de Spiennes', 'Belgique', 50.42, 3.99],
    ['Falaises de craie de Normandie', 'France', 49.9, 0.9]
  ],
  usages: 'Outils préhistoriques, pierres à fusil, briquets ; galets de broyage ; construction (Normandie, Sussex).',
  anecdote: 'Les lames du Grand-Pressigny, en silex couleur « cire d’abeille », s’exportaient dans toute l’Europe vers 2800–2400 av. J.-C.',
  wiki: ['Silex', 'Flint'],
  tex: { k: 'verre', b: '#3a3734', c: ['#57524b', '#8a8174'], s: 1, cortex: '#ece7dc' }
},
{
  id: 'chert', nom: 'Chert / Radiolarite / Jaspe', alias: ['Radiolarite', 'Jaspe', 'Phtanite'],
  famille: 'sedimentaire', groupe: 'Siliceuse',
  resume: 'Silice microcristalline en bancs, souvent rouge ou verte (radiolarites, jaspes).',
  description: "Terme général pour les roches siliceuses microcristallines formant des bancs. Les radiolarites sont formées de squelettes siliceux de radiolaires (plancton) et se déposent en mer profonde ; les jaspes sont des cherts colorés (rouges par l'hématite, verts, jaunes). Les phtanites sont des cherts noirs riches en matière organique.",
  mineraux: [['Quartz microcristallin, calcédoine', '> 90 %'], ['Hématite, argile, matière organique', 'variables']],
  texture: 'Cryptocristalline, compacte, en bancs centimétriques.',
  couleur: 'Rouge, vert, brun, noir, panaché.',
  grain: ['invisible'], densite: [2.5, 2.7], durete: [6.5, 7], hcl: 'nulle', magn: 0,
  aspect: ['fin', 'vitreux'], teinte: ['coloree', 'sombre'], struct: ['litage', 'massive'],
  tests: [
    'Raye le verre, très dure et tenace.',
    'Cassure conchoïdale à esquilleuse, éclat cireux à mat.',
    'Bancs réguliers séparés par de fins joints argileux.'
  ],
  confusions: [
    ['silex', 'Rognons à cortex blanc dans la craie.'],
    ['quartzite', 'Grains visibles, éclat saccharoïde.']
  ],
  formation: 'Accumulation de squelettes siliceux de plancton (radiolaires, diatomées) au fond des océans profonds, sous la profondeur où les carbonates se dissolvent ; ou précipitation de silice d’origine hydrothermale.',
  contexte: 'Fonds océaniques profonds ; associés aux ophiolites.',
  lieux: [
    ['Marin Headlands (Californie)', 'États-Unis', 37.83, -122.53],
    ['Radiolarites des ophiolites du Queyras', 'France', 44.75, 6.85]
  ],
  usages: 'Outils préhistoriques, pierre ornementale (jaspe), granulats.',
  anecdote: 'Les radiolarites alpines marquent l’ancien plancher de l’océan alpin (Téthys), aujourd’hui perché à plus de 2 000 m.',
  wiki: ['Chert', 'Chert'],
  tex: { k: 'lite', b: '#8c3a2e', c: ['#9b4434', '#7a3127', '#a85a48', '#5f2a22'], s: 6, w: 0.4 }
},
{
  id: 'diatomite', nom: 'Diatomite', alias: ['Terre de diatomées', 'Kieselguhr', 'Tripoli'],
  famille: 'sedimentaire', groupe: 'Siliceuse (biogène)',
  resume: 'Roche blanche ultra-légère faite de squelettes de micro-algues siliceuses.',
  description: "Roche siliceuse, blanche, très légère et poreuse, formée par l'accumulation de frustules (carapaces) de diatomées, des algues microscopiques. Sèche, elle peut flotter sur l'eau. Elle est friable et tache les doigts comme la craie, mais ne réagit pas à l'acide.",
  mineraux: [['Opale (silice amorphe des diatomées)', '> 80 %'], ['Argile, sable fin', 'variables']],
  texture: 'Très fine, poreuse, friable, souvent finement litée.',
  couleur: 'Blanc, crème, gris clair.',
  grain: ['invisible'], densite: [0.4, 0.9], durete: [1, 1.5], hcl: 'nulle', magn: 0,
  aspect: ['tendre', 'poreux', 'fin'], teinte: ['claire'], struct: ['litage'],
  tests: [
    'Extrêmement légère ; un fragment sec peut flotter.',
    'Tache les doigts ; aucune effervescence (≠ craie).',
    'Absorbe l’eau comme une éponge.'
  ],
  confusions: [
    ['craie', 'La craie fait vivement effervescence et coule.'],
    ['ponce', 'La ponce est dure et abrasive, aux bulles visibles.']
  ],
  formation: 'Prolifération de diatomées dans des lacs ou mers riches en silice dissoute (souvent fournie par des cendres volcaniques), accumulation des carapaces au fond.',
  contexte: 'Lacs volcaniques, bassins marins à remontées d’eau froide.',
  lieux: [
    ['Lompoc (Californie)', 'États-Unis', 34.63, -120.45],
    ['Gisements du Cantal (Murat)', 'France', 45.11, 2.87]
  ],
  usages: 'Filtration (bière, vin, piscines), absorbant, insecticide naturel, abrasif doux ; Alfred Nobel l’utilisait pour stabiliser la nitroglycérine.',
  anecdote: 'Un seul centimètre cube de diatomite contient des dizaines de millions de carapaces de diatomées.',
  wiki: ['Diatomite', 'Diatomaceous earth'],
  tex: { k: 'terreux', b: '#ecebe4', c: ['#f6f5ef', '#dfddd4', '#e7e5dc'], s: 2, smooth: true }
},

/* ======================= ÉVAPORITES ======================= */
{
  id: 'gypse', nom: 'Gypse', alias: ['Pierre à plâtre', 'Albâtre gypseux', 'Sélénite'],
  famille: 'sedimentaire', groupe: 'Évaporite',
  resume: 'Sulfate de calcium hydraté si tendre qu’il se raye à l’ongle.',
  description: "Roche évaporitique composée de gypse (CaSO₄·2H₂O). Elle peut être massive et saccharoïde (albâtre), fibreuse et soyeuse, ou en grands cristaux transparents (sélénite, « fer de lance », « roses des sables »). Chauffé vers 150 °C, le gypse perd une partie de son eau et donne le plâtre.",
  mineraux: [['Gypse', '> 80 %'], ['Anhydrite, argile, calcite', 'variables']],
  texture: 'Saccharoïde, fibreuse ou en cristaux lamellaires.',
  couleur: 'Blanc, gris, rosé, incolore ; parfois rouge (argiles).',
  grain: ['fin', 'moyen', 'grossier'], densite: [2.3, 2.35], durete: [1.5, 2], hcl: 'nulle', magn: 0,
  aspect: ['tendre', 'cristallin'], teinte: ['claire'], struct: ['litage', 'massive'],
  tests: [
    'Se raye à l’ongle (dureté 2) : test décisif.',
    'Aucune effervescence (sauf impuretés calcaires).',
    'Cristaux lamellaires flexibles mais non élastiques ; clivage parfait en feuillets.',
    'Aucun goût (≠ halite).'
  ],
  confusions: [
    ['halite', 'La halite a un goût salé et est soluble dans l’eau.'],
    ['craie', 'La craie fait effervescence.'],
    ['marbre', 'Le marbre ne se raye pas à l’ongle et fait effervescence.']
  ],
  formation: 'Évaporation intense de l’eau de mer ou de lacs salés dans des lagunes et sebkhas sous climat chaud et aride : le gypse précipite parmi les premiers sels, après les carbonates.',
  contexte: 'Lagunes et sebkhas évaporitiques, bassins fermés.',
  lieux: [
    ['Butte Montmartre, Paris', 'France', 48.886, 2.343],
    ['White Sands (dunes de gypse)', 'États-Unis', 32.78, -106.17],
    ['Grotte des cristaux de Naica', 'Mexique', 27.85, -105.5]
  ],
  usages: 'Plâtre et plaques de plâtre, régulateur de prise du ciment, amendement agricole, albâtre de sculpture.',
  anecdote: 'Le « plâtre de Paris » vient du gypse exploité sous Montmartre ; la grotte de Naica renferme des cristaux de gypse de plus de 10 m.',
  wiki: ['Gypse', 'Gypsum'],
  tex: { k: 'sucre', b: '#ede7df', c: ['#f6f2ec', '#e0d9cf', '#f9f6f1', '#d8cfc3'], s: 4, fibres: true }
},
{
  id: 'halite', nom: 'Sel gemme', alias: ['Halite', 'Sel'],
  famille: 'sedimentaire', groupe: 'Évaporite',
  resume: 'Le sel de cuisine à l’état de roche : goût salé, cubes, soluble.',
  description: "Roche évaporitique formée de halite (chlorure de sodium, NaCl). Elle se présente en masses cristallines grenues, souvent incolores à blanches, parfois rouges, oranges, bleues ou grises selon les impuretés. Plastique à l'échelle géologique, le sel peut remonter en dômes (diapirs) à travers les couches.",
  mineraux: [['Halite (NaCl)', '> 90 %'], ['Sylvite, gypse, anhydrite, argile', 'variables']],
  texture: 'Cristalline grenue, cubes à clivage cubique parfait.',
  couleur: 'Incolore, blanc, gris, orange, rose, bleu.',
  grain: ['moyen', 'grossier'], densite: [2.1, 2.2], durete: [2, 2.5], hcl: 'nulle', magn: 0,
  aspect: ['cristallin', 'tendre'], teinte: ['claire', 'coloree'], struct: ['massive', 'litage'],
  tests: [
    'Goût salé (lécher un échantillon propre et sûr).',
    'Se dissout dans l’eau.',
    'Clivage cubique parfait : se brise en petits cubes.',
    'Se raye à l’ongle ou presque.'
  ],
  confusions: [
    ['gypse', 'Pas de goût, insoluble à froid.'],
    ['marbre', 'Insoluble, effervescent, plus dur.']
  ],
  formation: 'Évaporation poussée d’eau de mer (après précipitation des carbonates et du gypse) dans des bassins fermés ou lagunes, sous climat aride. Les gisements épais impliquent des apports d’eau de mer répétés.',
  contexte: 'Grands bassins évaporitiques, salars, diapirs.',
  lieux: [
    ['Mine de sel de Wieliczka', 'Pologne', 49.98, 20.05],
    ['Mine de Varangéville (Lorraine)', 'France', 48.64, 6.32],
    ['Salar d’Uyuni', 'Bolivie', -20.13, -67.49]
  ],
  usages: 'Sel alimentaire, déneigement, industrie chimique (chlore, soude) ; cavités pour stockage de gaz.',
  anecdote: 'La mine de Wieliczka abrite une cathédrale entièrement sculptée dans le sel, y compris les lustres.',
  wiki: ['Halite', 'Halite'],
  tex: { k: 'grenu', b: '#ecd8cf', c: ['#f6eeea', '#e7c3b2', '#dfe4e8', '#f1ddd2', '#c99e8c'], s: 14, cube: true }
},

/* ======================= ORGANIQUES ======================= */
{
  id: 'houille', nom: 'Houille', alias: ['Charbon', 'Anthracite (variété)'],
  famille: 'sedimentaire', groupe: 'Organique (carbonée)',
  resume: 'Charbon noir et brillant, léger, qui tache les doigts et brûle.',
  description: "Roche carbonée noire formée de débris végétaux transformés par l'enfouissement (houillification). Elle est légère, cassante, à bandes alternativement brillantes et mates. L'anthracite est le stade le plus évolué (> 90 % de carbone), très brillant, ne tachant presque plus les doigts.",
  mineraux: [['Matière organique (macéraux : vitrinite, inertinite…)', '> 50 %'], ['Argile, pyrite, quartz (cendres)', 'variables']],
  texture: 'Litée, à bandes brillantes et mates ; cassure cubique ou conchoïdale.',
  couleur: 'Noir, éclat brillant à semi-mat.',
  grain: ['invisible'], densite: [1.2, 1.5], durete: [2, 3], hcl: 'nulle', magn: 0,
  aspect: ['organique'], teinte: ['sombre'], struct: ['litage', 'fossiles'],
  tests: [
    'Très légère pour une roche noire.',
    'Tache les doigts en noir ; trait noir.',
    'Brûle avec une flamme et une fumée (ne jamais tester en intérieur).',
    'Empreintes de fougères ou de troncs dans les schistes associés.'
  ],
  confusions: [
    ['lignite', 'Brun, structure ligneuse visible, plus terne.'],
    ['obsidienne', 'Beaucoup plus dense, ne tache pas, ne brûle pas.'],
    ['argilite', 'Un shale noir ne brûle pas et est plus lourd.']
  ],
  formation: "Accumulation de végétaux dans des marécages et tourbières (surtout au Carbonifère, 359–299 Ma), transformation en tourbe, puis enfouissement : la chaleur et la pression expulsent eau et matières volatiles. Tourbe → lignite → houille → anthracite.",
  contexte: 'Bassins houillers continentaux et deltaïques.',
  lieux: [
    ['Terrils de Loos-en-Gohelle (bassin minier du Nord)', 'France', 50.46, 2.79],
    ['Bassin houiller de Saint-Étienne', 'France', 45.43, 4.39],
    ['Anthracite de La Mure (Isère)', 'France', 44.9, 5.78],
    ['Ruhr', 'Allemagne', 51.5, 7.2]
  ],
  usages: 'Combustible (électricité), coke pour la sidérurgie, chimie.',
  anecdote: 'Le Bassin minier du Nord–Pas-de-Calais est inscrit au patrimoine mondial de l’UNESCO depuis 2012.',
  wiki: ['Houille', 'Coal'],
  tex: { k: 'charbon', b: '#141414', c: ['#2a2a2c', '#5d6066', '#0b0b0b'], s: 3 }
},
{
  id: 'lignite', nom: 'Lignite', alias: ['Charbon brun', 'Jais (variété)'],
  famille: 'sedimentaire', groupe: 'Organique (carbonée)',
  resume: 'Charbon brun jeune, où l’on reconnaît souvent encore le bois.',
  description: "Charbon peu évolué (60–70 % de carbone), brun à noir, terne, souvent humide, où l'on distingue fréquemment la structure du bois (fibres, troncs). Il se fragmente en séchant. Le jais, variété compacte et noire polissable, est issu de bois fossile.",
  mineraux: [['Matière organique (bois peu transformé)', '> 50 %'], ['Eau', '30–60 % (frais)'], ['Argile, sable', 'variables']],
  texture: 'Fibreuse, ligneuse, terne.',
  couleur: 'Brun, brun-noir.',
  grain: ['invisible'], densite: [1.0, 1.3], durete: [1, 2], hcl: 'nulle', magn: 0,
  aspect: ['organique', 'tendre'], teinte: ['sombre'], struct: ['litage', 'fossiles'],
  tests: [
    'Très légère, tache en brun.',
    'Structure du bois visible (fibres, cernes).',
    'Se fendille en séchant ; brûle en dégageant beaucoup de fumée.'
  ],
  confusions: [
    ['houille', 'Plus dure, noire brillante, sans structure ligneuse.']
  ],
  formation: 'Enfouissement modéré de tourbes et de végétaux, généralement au Tertiaire ; la houillification est restée incomplète.',
  contexte: 'Bassins lacustres et deltaïques récents (Tertiaire).',
  lieux: [
    ['Bassin de Gardanne (Provence)', 'France', 43.45, 5.47],
    ['Garzweiler (Rhénanie)', 'Allemagne', 51.05, 6.5]
  ],
  usages: 'Combustible pour centrales thermiques (fortement émetteur de CO₂) ; jais en bijouterie (Whitby).',
  anecdote: 'Le jais de Whitby (Angleterre) était à la mode pour les bijoux de deuil à l’époque victorienne.',
  wiki: ['Lignite', 'Lignite'],
  tex: { k: 'lite', b: '#3b2c22', c: ['#4a372a', '#2c2019', '#5a4434'], s: 2, w: 1.5 }
},

/* ======================= RÉSIDUELLES & FERRIFÈRES ======================= */
{
  id: 'bauxite', nom: 'Bauxite', alias: [],
  famille: 'sedimentaire', groupe: 'Résiduelle (altération)',
  resume: 'Roche d’altération tropicale riche en aluminium, à petites billes (pisolithes).',
  description: "Roche résiduelle riche en hydroxydes d'aluminium (gibbsite, boehmite, diaspore), souvent rouge à cause des oxydes de fer. Elle présente fréquemment une texture pisolithique (petites billes concentriques). C'est le minerai principal de l'aluminium.",
  mineraux: [['Gibbsite, boehmite, diaspore', '40–80 %'], ['Hématite, goethite', '5–30 %'], ['Kaolinite', 'variable'], ['Anatase', 'traces']],
  texture: 'Pisolithique, terreuse ou compacte.',
  couleur: 'Rouge brique, rose, ocre, blanc (bauxite blanche).',
  grain: ['invisible', 'fin'], densite: [2.0, 2.6], durete: [1, 3], hcl: 'nulle', magn: 0,
  aspect: ['tendre', 'fin'], teinte: ['coloree'], struct: ['massive'],
  tests: [
    'Petites billes arrondies (pisolithes) de quelques mm.',
    'Couleur rouge et trait rouge-brun (hématite).',
    'Ne fait pas effervescence ; pas plastique quand mouillée (≠ argile).'
  ],
  confusions: [
    ['laterite', 'La latérite est plus riche en fer qu’en aluminium, souvent plus dure et alvéolaire.'],
    ['argile', 'L’argile devient plastique dans l’eau.']
  ],
  formation: 'Altération chimique intense sous climat tropical chaud et humide : la silice et les éléments solubles sont lessivés, l’aluminium et le fer restent sur place. Les bauxites de Provence se sont formées au Crétacé sur des calcaires.',
  contexte: 'Sols tropicaux anciens ou actuels ; paléo-surfaces karstiques.',
  lieux: [
    ['Les Baux-de-Provence (localité type)', 'France', 43.74, 4.79],
    ['Boké', 'Guinée', 10.93, -14.29],
    ['Weipa (Queensland)', 'Australie', -12.63, 141.88]
  ],
  usages: 'Minerai d’aluminium (via l’alumine), abrasifs, réfractaires, ciments alumineux.',
  anecdote: 'La bauxite a été nommée en 1821 par Pierre Berthier d’après le village des Baux-de-Provence.',
  wiki: ['Bauxite', 'Bauxite'],
  tex: { k: 'oolithes', b: '#a8513a', c: ['#c46a4e', '#8e3f2c', '#d48a6c'], s: 4 }
},
{
  id: 'laterite', nom: 'Latérite', alias: ['Cuirasse ferrugineuse'],
  famille: 'sedimentaire', groupe: 'Résiduelle (altération)',
  resume: 'Sol tropical durci, rouge et alvéolaire, riche en fer.',
  description: "Formation résiduelle des régions tropicales, riche en oxydes et hydroxydes de fer (goethite, hématite) et d'aluminium. Meuble en profondeur, elle durcit à l'air pour former des cuirasses rouges, souvent alvéolaires ou vacuolaires.",
  mineraux: [['Goethite, hématite', '20–60 %'], ['Kaolinite', 'variable'], ['Gibbsite', 'variable'], ['Quartz résiduel', 'variable']],
  texture: 'Vacuolaire, scoriacée, pisolithique ou terreuse.',
  couleur: 'Rouge, ocre, brun, avec taches jaunes.',
  grain: ['invisible', 'fin'], densite: [2.3, 3.0], durete: [3, 5], hcl: 'nulle', magn: 1,
  aspect: ['poreux', 'tendre'], teinte: ['coloree'], struct: ['vacuoles', 'massive'],
  tests: [
    'Trait brun-rouge à jaune.',
    'Aspect alvéolaire ou en nodules ; assez lourde.',
    'Parfois faiblement magnétique (maghémite).'
  ],
  confusions: [
    ['bauxite', 'Plus riche en alumine, plus claire et plus légère.'],
    ['scorie', 'La scorie est volcanique, à bulles rondes et vitreuses.']
  ],
  formation: 'Altération profonde des roches sous climat tropical à saisons contrastées ; le fer s’accumule et cristallise lors des saisons sèches.',
  contexte: 'Plateaux tropicaux (Afrique de l’Ouest, Inde, Brésil).',
  lieux: [
    ['Angadipuram (Kerala), localité type', 'Inde', 10.98, 76.2],
    ['Plateaux du Burkina Faso', 'Burkina Faso', 12.4, -1.5]
  ],
  usages: 'Briques taillées (temples d’Angkor), routes en terre, minerai de fer, de nickel ou d’aluminium.',
  anecdote: 'Le nom vient du latin later, « brique » : on la découpe humide et elle durcit en séchant.',
  wiki: ['Latérite', 'Laterite'],
  tex: { k: 'bulles', b: '#9c4a2a', c: ['#5e2716', '#c47a3a'], s: 6 }
},
{
  id: 'loess', nom: 'Lœss', alias: ['Limon des plateaux'],
  famille: 'sedimentaire', groupe: 'Détritique (éolienne)',
  resume: 'Poussière apportée par le vent lors des glaciations : jaune, farineuse et fertile.',
  description: "Sédiment détritique meuble, très fin (silt de 10 à 50 µm), jaune-beige, déposé par le vent. Homogène et sans litage, il peut tenir en parois verticales. Souvent légèrement calcaire, il donne des sols très fertiles.",
  mineraux: [['Quartz (silt)', '50–70 %'], ['Calcite', '0–30 %'], ['Feldspaths, micas, argiles', 'variables']],
  texture: 'Silteuse, farineuse, poreuse, non litée.',
  couleur: 'Jaune, beige, chamois.',
  grain: ['invisible', 'fin'], densite: [1.4, 1.8], durete: [1, 2], hcl: 'faible', magn: 0,
  aspect: ['tendre', 'detritique'], teinte: ['claire'], struct: ['massive'],
  tests: [
    'Farineux au toucher, crisse légèrement entre les dents (silt).',
    'Pas plastique quand mouillé (≠ argile).',
    'Effervescence faible à moyenne s’il contient du calcaire.',
    'Petites concrétions calcaires (poupées du lœss) fréquentes.'
  ],
  confusions: [
    ['argile', 'L’argile est plastique et collante.'],
    ['craie', 'Effervescence beaucoup plus vive, blanche.']
  ],
  formation: 'Pendant les périodes glaciaires, le vent arrachait les poussières des plaines glaciaires et des déserts dénudés et les redéposait plus loin en épaisses couches.',
  contexte: 'Plaines périglaciaires, bordures de déserts.',
  lieux: [
    ['Plateau de lœss (Shaanxi)', 'Chine', 36.0, 108.0],
    ['Kochersberg (Alsace)', 'France', 48.68, 7.55],
    ['Plateaux limoneux de Picardie', 'France', 49.9, 2.3]
  ],
  usages: 'Terres agricoles très fertiles, briques, habitats creusés (yaodong en Chine).',
  anecdote: 'Le fleuve Jaune tire sa couleur du lœss qu’il érode en masse.',
  wiki: ['Lœss', 'Loess'],
  tex: { k: 'terreux', b: '#d6b98a', c: ['#c9aa77', '#e1c89c', '#bc9c6a'], s: 1.5, smooth: true }
},
{
  id: 'ferrubane', nom: 'Fer rubané (BIF)', alias: ['Formation de fer rubané', 'Itabirite', 'Taconite'],
  famille: 'sedimentaire', groupe: 'Chimique (ferrifère)',
  resume: 'Bandes rouges de jaspe et grises d’oxydes de fer : témoin de l’oxygénation de la Terre.',
  description: "Roche sédimentaire chimique précambrienne formée d'une alternance fine de lits riches en oxydes de fer (magnétite, hématite) gris-noir métallique et de lits de chert ou de jaspe rouge. Très lourde et souvent magnétique, elle est la source de la majorité du minerai de fer mondial.",
  mineraux: [['Hématite, magnétite', '25–50 %'], ['Chert / jaspe (quartz microcristallin)', '40–60 %'], ['Carbonates, silicates de fer', 'variables']],
  texture: 'Rubanée, lits millimétriques à centimétriques, souvent plissés.',
  couleur: 'Rouge, gris argenté, noir.',
  grain: ['invisible', 'fin'], densite: [3.0, 3.8], durete: [5.5, 7], hcl: 'nulle', magn: 2,
  aspect: ['rubane', 'fin'], teinte: ['coloree', 'sombre'], struct: ['bandes', 'litage'],
  tests: [
    'Très lourde.',
    'Attire fortement un aimant (magnétite).',
    'Trait rouge (hématite) ou noir (magnétite) sur porcelaine.',
    'Les bandes de jaspe raient le verre.'
  ],
  confusions: [
    ['chert', 'Pas de lits d’oxydes métalliques, densité normale.'],
    ['gneiss', 'Le gneiss est fait de minéraux grenus (feldspath, mica), pas de jaspe.']
  ],
  formation: "Précipitation du fer dissous dans les océans archéens et paléoprotérozoïques (surtout entre 2,7 et 1,8 milliard d'années) au contact de l'oxygène produit par les premières bactéries photosynthétiques.",
  contexte: 'Bassins marins précambriens ; cratons anciens.',
  lieux: [
    ['Bassin de Hamersley (Pilbara)', 'Australie', -22.3, 118.0],
    ['Chaîne de Mesabi (Minnesota)', 'États-Unis', 47.5, -92.5],
    ['Isua', 'Groenland', 65.1, -50.0]
  ],
  usages: 'Principal minerai de fer mondial ; pierre ornementale (« tiger iron »).',
  anecdote: 'Ces roches enregistrent la « Grande Oxydation », il y a ~2,4 milliards d’années, quand l’oxygène est apparu durablement dans l’atmosphère.',
  wiki: ['Formation de fer rubané', 'Banded iron formation'],
  tex: { k: 'lite', b: '#8a2f24', c: ['#a33a2c', '#3b3d42', '#7d8088', '#b54636', '#2a2b2f'], s: 5, w: 1.6 }
}
);
