/*
 * Roches MÉTAMORPHIQUES — voir le schéma des fiches en tête de magmatiques.js
 */
window.ROCHES = window.ROCHES || [];
window.ROCHES.push(

/* ======================= FOLIÉES ======================= */
{
  id: 'ardoise', nom: 'Ardoise', alias: ['Schiste ardoisier', 'Slate'],
  famille: 'metamorphique', groupe: 'Foliée (faible degré)',
  resume: 'Argile légèrement métamorphisée qui se fend en plaques fines et régulières.',
  description: "Roche métamorphique de faible degré issue d'argilites. Elle se débite en plaques minces, planes et régulières grâce à sa schistosité (« clivage ardoisier »), généralement oblique par rapport à la stratification d'origine. Grain invisible, surface mate, elle est imperméable et durable.",
  mineraux: [['Micas fins (séricite, illite)', '30–50 %'], ['Chlorite', '10–20 %'], ['Quartz', '20–40 %'], ['Pyrite, matière carbonée', 'traces']],
  texture: 'Schisteuse, grain invisible.',
  couleur: 'Gris-noir, gris-bleu, vert, violet, rouge.',
  grain: ['invisible'], densite: [2.7, 2.8], durete: [3, 4], hcl: 'nulle', magn: 0,
  aspect: ['folie', 'fin'], teinte: ['sombre', 'moyenne'], struct: ['foliation'],
  tests: [
    'Se fend en plaques fines au couteau ou au burin.',
    'Sonne clair quand on tapote une plaque.',
    'Ne se ramollit pas dans l’eau (≠ shale) ; surface mate ou à peine satinée.',
    'Cristaux cubiques dorés de pyrite fréquents.'
  ],
  confusions: [
    ['argilite', 'Le shale est plus tendre, se délite dans le sens des couches et s’altère à l’eau.'],
    ['phyllade', 'Le phyllade a un éclat soyeux nettement brillant et des surfaces ondulées.'],
    ['phonolite', 'Volcanique, gris-vert, pas de feuillets fins.']
  ],
  formation: 'Métamorphisme de faible degré (200–400 °C) d’argilites lors de la formation des chaînes de montagnes : la compression oriente les minéraux plats perpendiculairement à la contrainte.',
  contexte: 'Zones externes des chaînes de montagnes (faciès schiste vert inférieur).',
  lieux: [
    ['Trélazé (Anjou)', 'France', 47.45, -0.47],
    ['Fumay (Ardennes)', 'France', 49.99, 4.71],
    ['Carrière de Penrhyn', 'Royaume-Uni (pays de Galles)', 53.18, -4.06]
  ],
  usages: 'Couverture des toits, dallage, tableaux noirs, tables de billard.',
  anecdote: 'Les paysages ardoisiers du nord-ouest du pays de Galles sont classés au patrimoine mondial de l’UNESCO.',
  wiki: ['Ardoise', 'Slate'],
  tex: { k: 'folie', b: '#3f4651', c: ['#4c5562', '#353b45', '#5a6370'], s: 1, flat: true }
},
{
  id: 'phyllade', nom: 'Phyllade', alias: ['Phyllite'],
  famille: 'metamorphique', groupe: 'Foliée (faible degré)',
  resume: 'Intermédiaire entre ardoise et micaschiste : éclat soyeux, surfaces ondulées.',
  description: "Roche métamorphique foliée de faible degré, à grain encore très fin mais dont les micas (séricite) et la chlorite ont suffisamment grandi pour donner un éclat satiné à soyeux aux plans de foliation. Les surfaces sont souvent ondulées ou finement plissotées.",
  mineraux: [['Séricite (muscovite fine)', '30–50 %'], ['Chlorite', '10–30 %'], ['Quartz', '20–40 %']],
  texture: 'Schisteuse, plans lustrés, crénulations.',
  couleur: 'Gris argenté, gris-vert, gris-noir.',
  grain: ['invisible', 'fin'], densite: [2.7, 2.8], durete: [3, 4], hcl: 'nulle', magn: 0,
  aspect: ['folie', 'fin'], teinte: ['moyenne', 'sombre'], struct: ['foliation'],
  tests: [
    'Éclat soyeux, presque nacré, sur les plans de foliation.',
    'Surfaces ondulées ; débit moins régulier que l’ardoise.',
    'Cristaux individuels encore invisibles à l’œil nu.'
  ],
  confusions: [
    ['ardoise', 'Plaques mates et parfaitement planes.'],
    ['micaschiste', 'Paillettes de mica visibles individuellement.']
  ],
  formation: 'Métamorphisme d’une argilite à température un peu plus élevée que l’ardoise (~300–450 °C).',
  contexte: 'Chaînes de montagnes, faciès schiste vert.',
  lieux: [
    ['Massif de l’Ardenne', 'Belgique / France', 50.0, 5.0],
    ['Vosges du Nord-Est (Villé)', 'France', 48.34, 7.3]
  ],
  usages: 'Couverture locale, pierre sèche, dallage.',
  anecdote: 'Du grec phyllon, « feuille » : une roche qui s’effeuille.',
  wiki: ['Phyllade', 'Phyllite'],
  tex: { k: 'folie', b: '#7a7f78', c: ['#9aa098', '#62675f', '#c4c9c0'], s: 1.5, sheen: true }
},
{
  id: 'micaschiste', nom: 'Micaschiste', alias: ['Schiste cristallin'],
  famille: 'metamorphique', groupe: 'Foliée (degré moyen)',
  resume: 'Roche feuilletée scintillante de micas, souvent constellée de grenats.',
  description: "Roche métamorphique de degré moyen à forte schistosité, dans laquelle les micas (muscovite, biotite) sont visibles à l'œil nu en paillettes brillantes alignées. Elle contient du quartz en lentilles et souvent des minéraux index : grenat, staurotide, disthène, andalousite. Les feldspaths sont rares.",
  mineraux: [['Micas (muscovite, biotite)', '30–60 %'], ['Quartz', '20–50 %'], ['Grenat, staurotide, disthène…', '0–20 %'], ['Feldspath', '< 10 %']],
  texture: 'Schisteuse, grain fin à moyen, lépidoblastique.',
  couleur: 'Gris argenté, brun doré, scintillant.',
  grain: ['fin', 'moyen'], densite: [2.7, 2.9], durete: [3, 6], hcl: 'nulle', magn: 0,
  aspect: ['folie', 'cristallin'], teinte: ['moyenne'], struct: ['foliation', 'porphyrique'],
  tests: [
    'Paillettes de mica brillantes qui se détachent à la pointe du couteau.',
    'Se débite en plaques ondulées ; laisse des paillettes sur les doigts.',
    'Grenats rouge sombre en petits cristaux arrondis (dodécaèdres) très durs.'
  ],
  confusions: [
    ['gneiss', 'Le gneiss est riche en feldspath et rubané, moins fissile.'],
    ['phyllade', 'Micas trop fins pour être vus individuellement.']
  ],
  formation: 'Métamorphisme régional d’argilites à 450–650 °C et plusieurs kilomètres de profondeur lors des collisions continentales. Les minéraux index permettent d’estimer pression et température.',
  contexte: 'Cœurs des chaînes de montagnes (faciès amphibolite).',
  lieux: [
    ['Cévennes', 'France', 44.2, 3.7],
    ['Massif des Maures', 'France', 43.27, 6.4],
    ['Île de Groix', 'France', 47.64, -3.46]
  ],
  usages: 'Pierre sèche, lauzes, moellons.',
  anecdote: 'Les « schistes » des Cévennes, utilisés pour les murets et les toitures, sont en majorité des micaschistes.',
  wiki: ['Micaschiste', 'Schist'],
  tex: { k: 'folie', b: '#8c857a', c: ['#c9c2b5', '#6d665b', '#e6e0d3'], s: 2.5, sheen: true, garnet: '#7a1f22' }
},
{
  id: 'schistebleu', nom: 'Schiste bleu', alias: ['Glaucophanite', 'Blueschist'],
  famille: 'metamorphique', groupe: 'Foliée (haute pression)',
  resume: 'Roche bleutée de haute pression et basse température, signature des subductions.',
  description: "Roche métamorphique foliée de teinte bleu-violacé due à la glaucophane, une amphibole sodique. Elle contient souvent de la lawsonite, de l'épidote et des grenats. Elle provient le plus souvent de basaltes océaniques entraînés en subduction.",
  mineraux: [['Glaucophane', '20–60 %'], ['Épidote, lawsonite', '10–30 %'], ['Grenat', '0–20 %'], ['Chlorite, phengite, quartz', 'variables']],
  texture: 'Schisteuse à nématoblastique (aiguilles alignées).',
  couleur: 'Bleu-gris, bleu lavande, violacé.',
  grain: ['fin', 'moyen'], densite: [3.0, 3.2], durete: [5, 6], hcl: 'nulle', magn: 0,
  aspect: ['folie', 'cristallin'], teinte: ['coloree', 'sombre'], struct: ['foliation'],
  tests: [
    'Teinte bleutée caractéristique (glaucophane).',
    'Lourde pour une roche foliée.',
    'Aiguilles fines alignées ; grenats rouges fréquents.'
  ],
  confusions: [
    ['amphibolite', 'Noire à vert sombre, hornblende, pas de teinte bleue.'],
    ['ardoise', 'Grain invisible, densité normale.']
  ],
  formation: 'Métamorphisme de haute pression (8–12 kbar, soit 25–40 km) et basse température (200–500 °C), réalisé quand une plaque océanique froide plonge rapidement en subduction.',
  contexte: 'Zones de subduction anciennes ou actuelles (prisme d’accrétion, chaînes alpines).',
  lieux: [
    ['Île de Groix', 'France', 47.64, -3.46],
    ['Île de Syros', 'Grèce', 37.45, 24.92],
    ['Massif du Queyras', 'France', 44.75, 6.85]
  ],
  usages: 'Intérêt scientifique et pédagogique ; pierre ornementale ponctuelle.',
  anecdote: 'L’île de Groix est une réserve naturelle géologique, célèbre pour ses schistes bleus à grenats et glaucophane.',
  wiki: ['Schiste bleu', 'Blueschist'],
  tex: { k: 'folie', b: '#55607a', c: ['#6b7896', '#3e475c', '#8a96b3'], s: 2, garnet: '#8b2a2a' }
},

/* ======================= RUBANÉES ======================= */
{
  id: 'gneiss', nom: 'Gneiss', alias: ['Orthogneiss', 'Paragneiss', 'Gneiss œillé'],
  famille: 'metamorphique', groupe: 'Rubanée (haut degré)',
  resume: 'Roche de haut degré rubanée : bandes claires (quartz-feldspath) et sombres (micas).',
  description: "Roche métamorphique de degré moyen à élevé, grenue, présentant une foliation sous forme d'alternance de lits clairs (quartz, feldspaths) et sombres (biotite, amphibole). Un orthogneiss dérive d'une roche magmatique (souvent un granite) ; un paragneiss dérive d'une roche sédimentaire. Le gneiss œillé contient de gros cristaux de feldspath en forme d'yeux.",
  mineraux: [['Feldspaths', '30–60 %'], ['Quartz', '20–40 %'], ['Biotite, muscovite', '10–25 %'], ['Amphibole, grenat, sillimanite', 'variables']],
  texture: 'Grenue, foliée, rubanée (gneissique).',
  couleur: 'Gris, rose, blanc rayé de noir.',
  grain: ['moyen', 'grossier'], densite: [2.6, 2.9], durete: [6, 7], hcl: 'nulle', magn: 0,
  aspect: ['rubane', 'cristallin', 'folie'], teinte: ['claire', 'moyenne'], struct: ['bandes', 'foliation'],
  tests: [
    'Bandes alternées claires et sombres, souvent plissées.',
    'Raye le verre (quartz, feldspath).',
    'Se débite mal en plaques (contrairement au micaschiste).'
  ],
  confusions: [
    ['granite', 'Le granite n’a pas d’orientation des minéraux.'],
    ['migmatite', 'Parties ayant fondu, bandes granitiques diffuses et contournées.'],
    ['micaschiste', 'Plus riche en micas, pauvre en feldspaths, très fissile.']
  ],
  formation: 'Métamorphisme régional intense (600–750 °C, 15–30 km) de granites ou de roches sédimentaires lors des collisions continentales ; la ségrégation des minéraux crée le rubanement.',
  contexte: 'Racines des chaînes de montagnes, boucliers précambriens.',
  lieux: [
    ['Gneiss d’Acasta (Territoires du Nord-Ouest)', 'Canada', 65.17, -115.55],
    ['Gneiss lewisiens (Highlands)', 'Royaume-Uni (Écosse)', 58.2, -5.2],
    ['Gneiss œillés du Limousin', 'France', 45.6, 1.6]
  ],
  usages: 'Pierre de construction, dallage, plans de travail (« granite » du commerce), granulats.',
  anecdote: 'Les gneiss d’Acasta, vieux d’environ 4 milliards d’années, comptent parmi les plus anciennes roches connues sur Terre.',
  wiki: ['Gneiss', 'Gneiss'],
  tex: { k: 'rubane', b: '#cfc6bb', c: ['#e3dbd0', '#6a625b', '#d7a796', '#2d2926', '#f2ece4'], s: 8 }
},
{
  id: 'migmatite', nom: 'Migmatite', alias: [],
  famille: 'metamorphique', groupe: 'Rubanée (ultra-haut degré, fusion partielle)',
  resume: 'Roche à la frontière métamorphisme/magmatisme : un gneiss en train de fondre.',
  description: "Roche mixte composée d'une partie métamorphique sombre (paléosome/mélanosome, riche en biotite) et d'une partie claire de composition granitique (leucosome) issue de la fusion partielle. Les bandes claires forment des veines, des taches ou des plis désordonnés, souvent spectaculaires.",
  mineraux: [['Quartz, feldspaths (leucosome)', '40–70 %'], ['Biotite, amphibole (mélanosome)', '15–40 %'], ['Cordiérite, grenat, sillimanite', 'variables']],
  texture: 'Hétérogène, rubanée, plissée, grain moyen à grossier.',
  couleur: 'Bandes blanches à roses et noires.',
  grain: ['moyen', 'grossier'], densite: [2.6, 2.8], durete: [6, 7], hcl: 'nulle', magn: 0,
  aspect: ['rubane', 'cristallin'], teinte: ['claire', 'moyenne'], struct: ['bandes'],
  tests: [
    'Veines granitiques claires aux contours flous, plissées de façon chaotique (plis ptygmatiques).',
    'Liserés sombres riches en biotite autour des veines claires.',
    'Raye le verre.'
  ],
  confusions: [
    ['gneiss', 'Rubanement régulier, sans veines de fusion.'],
    ['granite', 'Homogène, sans bandes.']
  ],
  formation: 'Quand la température dépasse ~650–700 °C en présence d’eau, la croûte commence à fondre : les premiers liquides granitiques se séparent et cristallisent en veines. Les migmatites font le lien avec la genèse des granites.',
  contexte: 'Croûte continentale profonde des chaînes de collision, boucliers.',
  lieux: [
    ['Dôme du Velay', 'France', 45.1, 4.1],
    ['Côte d’Helsinki', 'Finlande', 60.17, 24.94]
  ],
  usages: 'Pierre ornementale (dalles, plans de travail aux motifs tourmentés).',
  anecdote: 'Le mot vient du grec migma, « mélange ».',
  wiki: ['Migmatite', 'Migmatite'],
  tex: { k: 'rubane', b: '#bdb3a8', c: ['#efe6dc', '#4f4843', '#e6cfc2', '#2b2725'], s: 11, chaos: true }
},
{
  id: 'mylonite', nom: 'Mylonite', alias: [],
  famille: 'metamorphique', groupe: 'Dynamique (zones de cisaillement)',
  resume: 'Roche « laminée » par le cisaillement dans une grande faille ductile.',
  description: "Roche métamorphique dynamique à grain très fin, fortement foliée et linéée, formée par le broyage et la recristallisation des minéraux le long de zones de cisaillement profondes. Elle contient souvent des « porphyroclastes » : restes de gros cristaux étirés en yeux asymétriques, qui indiquent le sens du cisaillement.",
  mineraux: [['Quartz, feldspaths recristallisés', 'dominants'], ['Micas fins', 'variables'], ['Porphyroclastes de feldspath', 'variables']],
  texture: 'Mylonitique : grain très fin, laminé, avec yeux asymétriques.',
  couleur: 'Gris, rubané sombre et clair.',
  grain: ['invisible', 'fin'], densite: [2.6, 2.8], durete: [6, 7], hcl: 'nulle', magn: 0,
  aspect: ['rubane', 'fin', 'folie'], teinte: ['moyenne', 'sombre'], struct: ['bandes', 'foliation'],
  tests: [
    'Lamination très fine et régulière, comme feuilletée.',
    'Yeux de feldspath étirés asymétriques (sigmoïdes).',
    'Très dure et tenace malgré le grain fin.'
  ],
  confusions: [
    ['gneiss', 'Grain plus grossier, pas de porphyroclastes asymétriques.'],
    ['chert', 'Chimique, pas d’yeux étirés.']
  ],
  formation: 'Déformation ductile intense (cisaillement) à plusieurs kilomètres de profondeur, dans de grandes failles et chevauchements où les roches « fluent » à l’état solide.',
  contexte: 'Grands chevauchements et zones de cisaillement crustales.',
  lieux: [
    ['Knockan Crag, chevauchement de Moine', 'Royaume-Uni (Écosse)', 58.03, -5.07],
    ['Cisaillement sud-armoricain', 'France', 47.3, -2.6]
  ],
  usages: 'Intérêt scientifique (sens de mouvement des failles).',
  anecdote: 'Du grec mylos, « meule » : on pensait autrefois que la roche avait été moulue.',
  wiki: ['Mylonite', 'Mylonite'],
  tex: { k: 'lite', b: '#6c6a66', c: ['#8a8782', '#4e4c49', '#a9a59e', '#3c3a37'], s: 1.4, w: 0.8, eyes: '#e7dfd2' }
},

/* ======================= NON FOLIÉES ======================= */
{
  id: 'marbre', nom: 'Marbre', alias: ['Cipolin'],
  famille: 'metamorphique', groupe: 'Non foliée',
  resume: 'Calcaire recristallisé : cristaux brillants « sucrés », fait effervescence.',
  description: "Roche métamorphique issue d'un calcaire (ou d'une dolomie) recristallisé sous l'effet de la chaleur et de la pression. Les fossiles disparaissent et la roche devient un assemblage de cristaux de calcite engrenés, brillants comme du sucre. Les impuretés donnent des veines et des couleurs (vert : serpentine ; gris : graphite ; rouge : hématite). En pierre ornementale, « marbre » désigne aussi tout calcaire polissable.",
  mineraux: [['Calcite et/ou dolomite', '> 90 %'], ['Graphite, micas, serpentine, diopside, grenat', 'impuretés']],
  texture: 'Granoblastique saccharoïde (cristaux engrenés), non foliée.',
  couleur: 'Blanc pur (Carrare, Paros), gris veiné, rose, vert, noir.',
  grain: ['fin', 'moyen', 'grossier'], densite: [2.6, 2.8], durete: [3, 4], hcl: 'forte', magn: 0,
  aspect: ['cristallin'], teinte: ['claire', 'coloree'], struct: ['massive', 'bandes'],
  tests: [
    'Effervescence vive à l’acide (marbre calcitique) ; sur poudre pour un marbre dolomitique.',
    'Cristaux brillants à faces de clivage scintillantes à la lumière.',
    'Se raye au couteau, ne raye pas le verre.',
    'Translucide sur quelques mm (le marbre blanc « s’éclaire » sous une lampe).'
  ],
  confusions: [
    ['quartzite', 'La quartzite raye le verre et ne fait pas effervescence.'],
    ['calcaire', 'Le calcaire est mat, à grain fin, souvent fossilifère.'],
    ['gypse', 'Le gypse se raye à l’ongle et ne fait pas effervescence.']
  ],
  formation: 'Métamorphisme de contact (au voisinage d’une intrusion magmatique) ou régional d’un calcaire : la calcite recristallise en grains plus gros.',
  contexte: 'Chaînes de montagnes, auréoles de contact.',
  lieux: [
    ['Carrare (Alpes apuanes)', 'Italie', 44.08, 10.1],
    ['Saint-Béat (Haute-Garonne)', 'France', 42.91, 0.69],
    ['Paros', 'Grèce', 37.08, 25.15],
    ['Campan (Hautes-Pyrénées)', 'France', 42.98, 0.18]
  ],
  usages: 'Sculpture (David de Michel-Ange), décoration, dallage ; charges minérales (carbonate de calcium).',
  anecdote: 'Les Pyrénées sont une terre de marbre : celui de Saint-Béat est exploité depuis l’époque romaine, et le marbre rouge et vert de Campan orne le Grand Trianon de Versailles.',
  wiki: ['Marbre', 'Marble'],
  tex: { k: 'sucre', b: '#efede8', c: ['#f8f7f3', '#e5e2dc', '#ffffff', '#dad6ce'], s: 4, veins: '#9a9890' }
},
{
  id: 'quartzite', nom: 'Quartzite', alias: ['Métaquartzite'],
  famille: 'metamorphique', groupe: 'Non foliée',
  resume: 'Grès recristallisé si dur que la cassure traverse les grains de quartz.',
  description: "Roche métamorphique formée presque exclusivement de quartz, issue de la recristallisation d'un grès quartzeux. Les grains sont soudés entre eux : la roche casse à travers les grains et non autour. Très dure, résistante à l'érosion, elle forme souvent des crêtes. Le terme désigne aussi des grès très cimentés par la silice (orthoquartzites).",
  mineraux: [['Quartz', '> 90 %'], ['Muscovite, feldspath, oxydes de fer', '< 10 %']],
  texture: 'Granoblastique (grains engrenés), aspect saccharoïde vitreux.',
  couleur: 'Blanc, gris, rose, rouge, vert (fuchsite : aventurine).',
  grain: ['fin', 'moyen'], densite: [2.6, 2.7], durete: [7, 7], hcl: 'nulle', magn: 0,
  aspect: ['cristallin'], teinte: ['claire', 'coloree'], struct: ['massive', 'litage'],
  tests: [
    'Raye facilement le verre et l’acier.',
    'Cassure à travers les grains, surface lisse un peu vitreuse.',
    'Aucune effervescence.',
    'Ne s’effrite pas (≠ grès).'
  ],
  confusions: [
    ['gres', 'Le grès est poreux, rugueux et la cassure contourne les grains.'],
    ['marbre', 'Le marbre fait effervescence et ne raye pas le verre.'],
    ['chert', 'Grain invisible, cassure conchoïdale.']
  ],
  formation: 'Métamorphisme d’un grès riche en quartz : la silice recristallise et soude les grains. Peut aussi résulter d’une cimentation siliceuse intense sans métamorphisme.',
  contexte: 'Chaînes de montagnes, boucliers ; crêtes résistantes.',
  lieux: [
    ['Baraboo Range (Wisconsin)', 'États-Unis', 43.42, -89.73],
    ['Presqu’île de Crozon (grès armoricain)', 'France', 48.25, -4.5]
  ],
  usages: 'Granulats et ballast de grande résistance, silice industrielle, pierre ornementale, outils préhistoriques.',
  anecdote: 'Les quartzites, très résistantes, forment les crêtes appalachiennes et les « barres » des Monts d’Arrée.',
  wiki: ['Quartzite', 'Quartzite'],
  tex: { k: 'sucre', b: '#e2d6cc', c: ['#ece3db', '#d6c7bb', '#f4eee8', '#cbb9ab'], s: 3, glossy: true }
},
{
  id: 'amphibolite', nom: 'Amphibolite', alias: [],
  famille: 'metamorphique', groupe: 'Non foliée à faiblement foliée',
  resume: 'Roche sombre de hornblende et plagioclase : un basalte métamorphisé.',
  description: "Roche métamorphique sombre, lourde, composée essentiellement d'amphibole (hornblende) noire à vert foncé et de plagioclase blanc, souvent avec du grenat. Les cristaux d'amphibole allongés sont fréquemment alignés (linéation), lui donnant un aspect strié.",
  mineraux: [['Hornblende', '40–70 %'], ['Plagioclase', '20–50 %'], ['Grenat, épidote, quartz', 'variables']],
  texture: 'Nématoblastique (prismes alignés), grain moyen.',
  couleur: 'Noir, vert très sombre, moucheté de blanc.',
  grain: ['fin', 'moyen'], densite: [2.9, 3.1], durete: [5.5, 6], hcl: 'nulle', magn: 0,
  aspect: ['cristallin', 'folie'], teinte: ['sombre'], struct: ['foliation', 'massive'],
  tests: [
    'Prismes noirs brillants à deux clivages à 120° (hornblende).',
    'Lourde et sombre ; cristaux souvent alignés.',
    'Raye à peine le verre.'
  ],
  confusions: [
    ['gabbro', 'Texture magmatique non orientée, pyroxène.'],
    ['diorite', 'Plus de plagioclase, texture grenue non orientée.'],
    ['schistebleu', 'Teinte bleutée (glaucophane).']
  ],
  formation: 'Métamorphisme de degré moyen à élevé (500–750 °C) de roches basiques (basaltes, gabbros, dolérites) ou de marnes.',
  contexte: 'Chaînes de collision, socles anciens.',
  lieux: [
    ['Adirondacks (New York)', 'États-Unis', 44.1, -74.0],
    ['Haut-Limousin', 'France', 45.9, 1.4]
  ],
  usages: 'Granulats, pierre ornementale ; outils polis néolithiques (haches).',
  anecdote: 'Des haches polies néolithiques en amphibolite circulaient sur des centaines de kilomètres.',
  wiki: ['Amphibolite', 'Amphibolite'],
  tex: { k: 'folie', b: '#262a26', c: ['#3b423b', '#121412', '#d9d7cf'], s: 3, grains: true }
},
{
  id: 'eclogite', nom: 'Éclogite', alias: [],
  famille: 'metamorphique', groupe: 'Non foliée (très haute pression)',
  resume: 'Superbe roche rouge et verte (grenat + omphacite) née à très grande profondeur.',
  description: "Roche métamorphique très dense composée de grenat rouge (pyrope-almandin) et d'omphacite verte (pyroxène sodique). Elle provient de basaltes ou de gabbros enfouis à grande profondeur (> 45 km), en subduction ou sous les chaînes de collision. Certaines contiennent de la coésite ou même du diamant.",
  mineraux: [['Grenat', '30–60 %'], ['Omphacite', '30–60 %'], ['Rutile, quartz/coésite, disthène, phengite', 'accessoires']],
  texture: 'Granoblastique, grain moyen.',
  couleur: 'Vert pomme à vert sombre parsemé de grenats rouges.',
  grain: ['moyen', 'grossier'], densite: [3.3, 3.5], durete: [6.5, 7.5], hcl: 'nulle', magn: 0,
  aspect: ['cristallin'], teinte: ['coloree', 'sombre'], struct: ['massive', 'porphyrique'],
  tests: [
    'Association rouge (grenat) et verte (omphacite) unique.',
    'Très lourde (≥ 3,3), plus que le gabbro.',
    'Raye le verre (grenat ~7).'
  ],
  confusions: [
    ['gabbro', 'Plagioclase blanc présent, densité moindre, pas de grenat.'],
    ['peridotite', 'Olivine vert olive, pas de grenats abondants.']
  ],
  formation: 'Transformation d’une roche basaltique à haute pression (> 1,2 GPa) : le plagioclase disparaît au profit du grenat et de l’omphacite. Le retour en surface rapide est nécessaire pour la préserver.',
  contexte: 'Zones de subduction, racines de chaînes de collision.',
  lieux: [
    ['Les Essarts (Vendée)', 'France', 46.77, -1.23],
    ['Mont Viso', 'Italie', 44.67, 7.09],
    ['Massif de Dora Maira (coésite)', 'Italie', 44.6, 7.3]
  ],
  usages: 'Intérêt scientifique ; pierre ornementale rare.',
  anecdote: 'L’éclogite des Essarts, en Vendée, témoigne d’une ancienne subduction liée à la chaîne hercynienne (varisque), aujourd’hui totalement arasée.',
  wiki: ['Éclogite', 'Eclogite'],
  tex: { k: 'grenu', b: '#4f6b45', c: ['#5f7d52', '#3f5a37', '#7b1f24', '#9b2d2f', '#6a8a5c'], s: 6 }
},
{
  id: 'serpentinite', nom: 'Serpentinite', alias: ['Serpentine', 'Ophite (pierre verte)'],
  famille: 'metamorphique', groupe: 'Non foliée (hydratation)',
  resume: 'Péridotite hydratée : verte, veinée, au toucher gras, motifs de peau de serpent.',
  description: "Roche composée de minéraux du groupe de la serpentine (antigorite, lizardite, chrysotile), issue de l'hydratation de péridotites du manteau. Verte à noire, souvent marbrée et veinée de blanc, elle a un éclat gras ou cireux et un toucher doux, parfois savonneux. La magnétite produite lors de la réaction la rend souvent magnétique.",
  mineraux: [['Serpentine (antigorite, lizardite, chrysotile)', '> 70 %'], ['Magnétite', '2–10 %'], ['Chlorite, talc, carbonates', 'variables']],
  texture: 'Massive, veinée, parfois foliée ou fibreuse.',
  couleur: 'Vert clair à vert noirâtre, marbré, veines blanches ou vert pâle.',
  grain: ['invisible', 'fin'], densite: [2.5, 2.7], durete: [3, 5], hcl: 'nulle', magn: 2,
  aspect: ['fin', 'cristallin'], teinte: ['coloree', 'sombre'], struct: ['massive', 'bandes'],
  tests: [
    'Attire souvent un aimant (magnétite).',
    'Éclat gras/cireux, toucher lisse ; se raye au couteau.',
    'Surfaces polies naturellement (miroirs de faille) et veines fibreuses.',
    '⚠️ Les veines fibreuses peuvent contenir de l’amiante (chrysotile) : ne pas gratter ni poncer.'
  ],
  confusions: [
    ['peridotite', 'Plus dure, plus dense, olivine vitreuse.'],
    ['steatite', 'Se raye à l’ongle, toucher très savonneux.'],
    ['marbre', 'Fait effervescence (sauf « marbres verts » mixtes).']
  ],
  formation: 'Hydratation de péridotites à basse température (< 500 °C) par l’eau de mer au niveau des dorsales et des failles transformantes, ou dans les zones de subduction.',
  contexte: 'Ophiolites, fonds océaniques, zones de subduction.',
  lieux: [
    ['Péninsule du Lizard (Cornouailles)', 'Royaume-Uni', 49.96, -5.21],
    ['Cap Corse', 'France', 42.95, 9.4],
    ['Mont Viso', 'Italie', 44.7, 7.1]
  ],
  usages: 'Pierre ornementale (« marbre vert »), sculpture ; étudiée pour le stockage du CO₂ et la production naturelle d’hydrogène.',
  anecdote: 'Les ateliers de la péninsule du Lizard sculptent la serpentine depuis l’époque victorienne.',
  wiki: ['Serpentinite', 'Serpentinite'],
  tex: { k: 'sucre', b: '#3d5a43', c: ['#4d6e51', '#2c4432', '#5e8264', '#26382b'], s: 6, veins: '#cfe0c8' }
},
{
  id: 'corneenne', nom: 'Cornéenne', alias: ['Hornfels'],
  famille: 'metamorphique', groupe: 'Non foliée (contact)',
  resume: 'Roche « cuite » au contact d’un magma : sombre, très dure, cassure en corne.',
  description: "Roche métamorphique de contact à grain très fin, dure et tenace, sans foliation. Elle résulte de la « cuisson » d'argilites ou de grès au contact d'une intrusion magmatique. Sa cassure esquilleuse rappelle celle de la corne. Elle contient parfois des taches ou des cristaux d'andalousite (chiastolite) ou de cordiérite.",
  mineraux: [['Biotite, quartz, feldspath', 'dominants'], ['Andalousite, cordiérite, grenat, pyroxène', 'variables']],
  texture: 'Cornéenne : granoblastique très fine, non orientée ; parfois tachetée.',
  couleur: 'Gris sombre, noir, violacé, brun.',
  grain: ['invisible', 'fin'], densite: [2.7, 3.0], durete: [6, 7], hcl: 'nulle', magn: 0,
  aspect: ['fin'], teinte: ['sombre'], struct: ['massive', 'porphyrique'],
  tests: [
    'Extrêmement dure et tenace : rebondit sous le marteau, sonne.',
    'Cassure esquilleuse à conchoïdale.',
    'Situation de terrain : auréole autour d’un granite.',
    'Taches ou baguettes de chiastolite (croix noire en section).'
  ],
  confusions: [
    ['basalte', 'Le basalte est volcanique, souvent vacuolaire, parfois magnétique.'],
    ['ardoise', 'L’ardoise est schisteuse et se fend en plaques.']
  ],
  formation: 'Métamorphisme thermique de contact (450–800 °C, faible pression) dans l’auréole d’un pluton granitique ou gabbroïque, sans déformation.',
  contexte: 'Auréoles de contact autour des plutons.',
  lieux: [
    ['Auréole du granite de Flamanville', 'France', 49.53, -1.88],
    ['Skiddaw (Cumbria)', 'Royaume-Uni', 54.65, -3.15]
  ],
  usages: 'Granulats ; « lithophones » (pierres musicales de Skiddaw).',
  anecdote: 'Les « Musical Stones of Skiddaw », un xylophone en cornéenne, sont exposés au musée de Keswick.',
  wiki: ['Cornéenne', 'Hornfels'],
  tex: { k: 'fin', b: '#34312f', c: ['#423e3b', '#2a2725', '#4d4844'], s: 1, spots: '#1b1918' }
},
{
  id: 'steatite', nom: 'Stéatite', alias: ['Pierre à savon', 'Pierre ollaire', 'Talcschiste'],
  famille: 'metamorphique', groupe: 'Non foliée (hydrothermale)',
  resume: 'Roche à talc si tendre qu’elle se raye à l’ongle, au toucher savonneux.',
  description: "Roche métamorphique composée principalement de talc, avec chlorite, magnésite ou serpentine. Elle est très tendre, au toucher gras et savonneux, et se sculpte facilement. Elle résiste à la chaleur et aux acides et accumule bien la chaleur.",
  mineraux: [['Talc', '50–90 %'], ['Chlorite, magnésite, serpentine', 'variables'], ['Magnétite', 'traces']],
  texture: 'Massive à schisteuse, grain fin.',
  couleur: 'Gris, gris-vert, blanc, brun.',
  grain: ['invisible', 'fin'], densite: [2.7, 2.8], durete: [1, 2], hcl: 'nulle', magn: 1,
  aspect: ['tendre', 'fin'], teinte: ['claire', 'moyenne', 'coloree'], struct: ['massive', 'foliation'],
  tests: [
    'Se raye à l’ongle (talc dureté 1).',
    'Toucher savonneux, gras.',
    'Ne fait pas effervescence ; insoluble ; sans goût.'
  ],
  confusions: [
    ['serpentinite', 'Plus dure (ne se raye pas à l’ongle).'],
    ['gypse', 'Toucher non savonneux, cristaux lamellaires.'],
    ['argile', 'Plastique dans l’eau.']
  ],
  formation: 'Transformation de roches ultrabasiques (péridotites, serpentinites) ou de dolomies par des fluides hydrothermaux riches en silice et en CO₂, lors du métamorphisme.',
  contexte: 'Ceintures ophiolitiques, zones de failles hydrothermales.',
  lieux: [
    ['Carrière de talc de Trimouns, Luzenac (Ariège)', 'France', 42.75, 1.76],
    ['Ouro Preto (Minas Gerais)', 'Brésil', -20.39, -43.5]
  ],
  usages: 'Sculpture (inuit, Christ Rédempteur), poêles de masse, plans de travail ; talc industriel (papier, plastiques, cosmétiques).',
  anecdote: 'Le Christ Rédempteur de Rio est recouvert de milliers de tesselles de stéatite.',
  wiki: ['Stéatite', 'Soapstone'],
  tex: { k: 'terreux', b: '#8c958a', c: ['#9ea79c', '#7a8378', '#b1b8ad'], s: 4, smooth: true, sheen: true }
},
{
  id: 'skarn', nom: 'Skarn', alias: ['Tactite'],
  famille: 'metamorphique', groupe: 'Non foliée (métasomatique)',
  resume: 'Roche de contact multicolore entre un granite et un calcaire, riche en minerais.',
  description: "Roche métamorphique de contact formée par des échanges chimiques (métasomatose) entre un magma granitique et des roches carbonatées. Elle est constituée de silicates calciques et magnésiens souvent bien cristallisés et colorés : grenat (grossulaire, andradite), pyroxène (diopside, hédenbergite), wollastonite, épidote, vésuvianite. Elle concentre souvent des minerais (tungstène, cuivre, fer, zinc).",
  mineraux: [['Grenat calcique', '20–60 %'], ['Pyroxène calcique', '10–40 %'], ['Wollastonite, épidote, vésuvianite, calcite', 'variables'], ['Scheelite, magnétite, chalcopyrite', 'minerais']],
  texture: 'Granoblastique, grain moyen à grossier, hétérogène.',
  couleur: 'Brun-rouge, vert, mêlé ; très variable.',
  grain: ['moyen', 'grossier'], densite: [3.0, 3.5], durete: [5.5, 7], hcl: 'faible', magn: 1,
  aspect: ['cristallin'], teinte: ['coloree'], struct: ['massive', 'bandes'],
  tests: [
    'Gros grenats bruns ou verts et pyroxènes verts.',
    'Lourde ; magnétique si riche en magnétite.',
    'Calcite résiduelle effervescente par endroits.',
    'Sous UV courts, la scheelite (minerai de tungstène) fluoresce en bleu.'
  ],
  confusions: [
    ['eclogite', 'Omphacite + grenat rouge, pas de calcite ni contexte de contact.'],
    ['marbre', 'Essentiellement de la calcite.']
  ],
  formation: 'Les fluides chauds issus d’un granite réagissent avec un calcaire encaissant : apports de silice, de fer et de métaux, départ de CO₂.',
  contexte: 'Contact granite / calcaire.',
  lieux: [
    ['Mine de Salau (Ariège)', 'France', 42.75, 1.18],
    ['Île d’Elbe', 'Italie', 42.78, 10.4]
  ],
  usages: 'Minerais de tungstène, cuivre, fer, zinc, molybdène ; spécimens de minéraux.',
  anecdote: 'La mine de Salau, dans les Pyrénées ariégeoises, fut l’une des principales mines de tungstène d’Europe jusqu’en 1986.',
  wiki: ['Skarn', 'Skarn'],
  tex: { k: 'grenu', b: '#6b5a3e', c: ['#8c4a2c', '#5e7a45', '#a8742f', '#3f5233', '#d9cfb5'], s: 9 }
},
{
  id: 'granulite', nom: 'Granulite', alias: ['Leptynite (variété claire)'],
  famille: 'metamorphique', groupe: 'Haut degré (croûte profonde)',
  resume: 'Roche de la croûte inférieure, très haute température, sans micas.',
  description: "Roche métamorphique de très haute température (> 750 °C) dans laquelle les minéraux hydratés (micas, amphiboles) ont disparu au profit de pyroxènes, de grenats et de feldspaths. Grenue, peu foliée, elle peut être claire (granulite felsique à grenats) ou sombre (granulite mafique à pyroxènes).",
  mineraux: [['Feldspaths', '30–60 %'], ['Quartz', '0–30 %'], ['Pyroxènes (ortho/clino)', '0–40 %'], ['Grenat, sillimanite, disthène', 'variables']],
  texture: 'Granoblastique, grain moyen ; quartz parfois en disques aplatis.',
  couleur: 'Claire à grenats roses, ou gris sombre à verdâtre.',
  grain: ['moyen'], densite: [2.8, 3.0], durete: [6, 7], hcl: 'nulle', magn: 0,
  aspect: ['cristallin'], teinte: ['claire', 'sombre'], struct: ['massive', 'bandes'],
  tests: [
    'Absence de micas et d’amphiboles.',
    'Grenats roses ou rouges dispersés, pyroxènes.',
    'Raye le verre.'
  ],
  confusions: [
    ['gneiss', 'Contient des micas et souvent un rubanement net.'],
    ['eclogite', 'Omphacite verte, pas de feldspath.']
  ],
  formation: 'Métamorphisme à très haute température (750–1 000 °C) dans la croûte inférieure, lors des collisions ou du sous-placage de magmas.',
  contexte: 'Croûte continentale inférieure, boucliers anciens.',
  lieux: [
    ['Massif des granulites de Saxe (localité type)', 'Allemagne', 50.9, 12.8],
    ['Scourie (gneiss lewisiens)', 'Royaume-Uni (Écosse)', 58.35, -5.15]
  ],
  usages: 'Intérêt scientifique ; granulats.',
  anecdote: 'Les granulites nous renseignent sur une partie de la croûte, la croûte inférieure, qu’aucun forage n’atteint.',
  wiki: ['Granulite', 'Granulite'],
  tex: { k: 'grenu', b: '#cdbfb4', c: ['#e1d6cc', '#b9aa9e', '#a03a3c', '#4d4a40', '#d9cbbf'], s: 6 }
}
);
