/*
 * Données de référence : clé dichotomique, tests, minéraux, glossaire.
 */

/* ------------------------------------------------------------------
 * CLÉ DICHOTOMIQUE
 * Chaque nœud : { q: question, aide: texte optionnel, r: [[réponse, cible], …] }
 * cible = id d'un autre nœud (préfixe 'k:') ou id d'une roche (préfixe 'r:')
 * ------------------------------------------------------------------ */
window.CLE = {
  depart: {
    q: 'Une goutte d’acide chlorhydrique dilué (10 %) fait-elle effervescence sur la roche ?',
    aide: 'À défaut d’acide, du vinaigre blanc chauffé donne une réaction plus faible. Faites le test sur une cassure fraîche.',
    r: [
      ['Oui, vive effervescence immédiate (ça « mousse »)', 'k:carbonate'],
      ['Seulement sur la poudre grattée ou faiblement', 'k:dolo'],
      ['Non, aucune réaction', 'k:aspect']
    ]
  },
  carbonate: {
    q: 'À quoi ressemble cette roche carbonatée ?',
    r: [
      ['Cristaux brillants imbriqués, aspect de sucre, pas de fossiles', 'r:marbre'],
      ['Blanche, tendre, légère, tache les doigts', 'r:craie'],
      ['Faite de petites billes rondes (0,5–2 mm)', 'r:oolithique'],
      ['Faite presque entièrement de coquilles', 'r:lumachelle'],
      ['Poreuse, en lits ondulés, aspect concrétionné', 'r:travertin'],
      ['Tendre, laisse une boue grise après l’acide, odeur d’argile', 'r:marne'],
      ['Galets ou fragments de roches cimentés', 'k:clastes'],
      ['Compacte, grain fin, fossiles possibles', 'r:calcaire']
    ]
  },
  dolo: {
    q: 'L’aspect général est plutôt…',
    r: [
      ['Grains cristallins brillants, roche recristallisée', 'r:marbre'],
      ['Aspect sédimentaire, toucher sableux ou « sucre », patine grise ou jaunâtre', 'r:dolomie'],
      ['Poudre jaune farineuse, non plastique', 'r:loess'],
      ['Mélange de grenats, pyroxènes et calcite au contact d’un granite', 'r:skarn'],
      ['Roche bréchique gris-bleu à grains d’olivine et de grenat', 'r:kimberlite'],
      ['Grès dont seul le ciment réagit', 'r:gres']
    ]
  },
  aspect: {
    q: 'Quel est l’aspect général de la roche ?',
    r: [
      ['Verre ou aspect vitreux / cireux, cassure en coquille', 'k:verre'],
      ['Pleine de bulles (vacuoles)', 'k:bulles'],
      ['Feuilletée : se débite en plaques ou feuillets', 'k:folie'],
      ['Rubanée : bandes claires et sombres alternées', 'k:rubane'],
      ['Faite de grains ou fragments cimentés (détritique)', 'k:detritique'],
      ['Cristaux imbriqués visibles à l’œil nu (grenue)', 'k:grenu'],
      ['Pâte fine où l’on ne distingue pas (ou peu) les grains', 'k:fine'],
      ['Noire ou brune, légère, tache les doigts, combustible', 'k:organique'],
      ['Très tendre : se raye à l’ongle', 'k:tendre'],
      ['Terreuse, rouge à ocre, nodules ou alvéoles', 'k:residuelle']
    ]
  },
  verre: {
    q: 'Précisez :',
    r: [
      ['Noire (ou brune) brillante, translucide sur les bords, assez légère', 'r:obsidienne'],
      ['Très claire, mousseuse, flotte sur l’eau', 'r:ponce'],
      ['Opaque, éclat cireux, en rognon avec un cortex blanc (dans la craie)', 'r:silex'],
      ['Rouge, verte ou noire, en bancs réguliers, éclat cireux', 'r:chert']
    ]
  },
  bulles: {
    q: 'Comment se comporte-t-elle ?',
    r: [
      ['Claire, flotte sur l’eau', 'r:ponce'],
      ['Rouge ou noire, rugueuse, légère mais coule', 'r:scorie'],
      ['Noire et dense, bulles isolées', 'r:basalte'],
      ['Rouge-ocre, alvéolaire, trait brun-rouge', 'r:laterite']
    ]
  },
  folie: {
    q: 'Comment sont les feuillets ?',
    r: [
      ['Plaques fines, planes, mates ; sonnent ; grain invisible', 'r:ardoise'],
      ['Éclat soyeux, surfaces ondulées, micas invisibles', 'r:phyllade'],
      ['Paillettes de mica brillantes visibles, souvent grenats', 'r:micaschiste'],
      ['Teinte bleutée, lourde', 'r:schistebleu'],
      ['Noire ou vert sombre, aiguilles alignées, lourde', 'r:amphibolite'],
      ['Tendre, se délite et s’altère à l’eau, fossiles possibles', 'r:argilite'],
      ['Toucher savonneux, se raye à l’ongle', 'r:steatite']
    ]
  },
  rubane: {
    q: 'Quel type de bandes ?',
    r: [
      ['Bandes régulières de minéraux visibles (quartz-feldspath / micas)', 'r:gneiss'],
      ['Veines claires granitiques floues et plissées dans tous les sens', 'r:migmatite'],
      ['Bandes rouges (jaspe) et gris métallique ; très lourde, magnétique', 'r:ferrubane'],
      ['Lamination très fine, yeux de feldspath étirés', 'r:mylonite'],
      ['Bandes ondulées d’écoulement dans une pâte claire (lave)', 'r:rhyolite']
    ]
  },
  detritique: {
    q: 'Quelle taille ont les éléments ?',
    r: [
      ['Plus de 2 mm (graviers, galets, fragments)', 'k:clastes'],
      ['Grains de sable (0,06–2 mm)', 'k:sables'],
      ['Fragments volcaniques (cendres, ponces, cristaux)', 'k:pyroclastes']
    ]
  },
  clastes: {
    q: 'Forme des fragments :',
    r: [
      ['Arrondis (galets)', 'r:conglomerat'],
      ['Anguleux (arêtes vives)', 'r:breche']
    ]
  },
  sables: {
    q: 'Composition des grains :',
    r: [
      ['Surtout du quartz (grains gris ou blancs vitreux)', 'r:gres'],
      ['Beaucoup de grains roses ou blancs à faces brillantes (feldspath)', 'r:arkose'],
      ['Grains variés dans une pâte sombre, roche dure gris foncé', 'r:grauwacke'],
      ['Petites billes rondes (oolithes) ou pisolithes', 'r:oolithique']
    ]
  },
  pyroclastes: {
    q: 'Aspect :',
    r: [
      ['Tendre, poreux, cendres fines', 'r:tuf'],
      ['Soudé, ponces aplaties en « flammes » sombres', 'r:ignimbrite'],
      ['Gris-bleu, enclaves et grains d’olivine/grenat (cheminée)', 'r:kimberlite']
    ]
  },
  grenu: {
    q: 'Y a-t-il du quartz (grains gris translucides, sans clivage, qui rayent le verre) ?',
    r: [
      ['Oui, beaucoup de quartz', 'k:quartz'],
      ['Non, peu ou pas de quartz', 'k:sansquartz'],
      ['Cristaux géants (plusieurs cm)', 'r:pegmatite'],
      ['Grains de sel cubiques, goût salé', 'r:halite']
    ]
  },
  quartz: {
    q: 'Précisez :',
    r: [
      ['Feldspath rose et/ou blanc + micas, aucune orientation', 'r:granite'],
      ['Surtout plagioclase blanc, plus de minéraux noirs, teinte grise', 'r:granodiorite'],
      ['Quasiment que du quartz soudé, cassure à travers les grains', 'r:quartzite'],
      ['Minéraux orientés en bandes', 'r:gneiss'],
      ['Grenats et pyroxènes, sans micas', 'r:granulite']
    ]
  },
  sansquartz: {
    q: 'Couleur et minéraux :',
    r: [
      ['Noir et blanc « poivre et sel » (plagioclase + amphibole)', 'r:diorite'],
      ['Sombre, lourde (plagioclase + pyroxène)', 'r:gabbro'],
      ['Vert olive, très lourde (olivine)', 'r:peridotite'],
      ['Feldspaths roses/gris dominants, reflets bleus possibles', 'r:syenite'],
      ['Grenats rouges dans une matrice verte, très lourde', 'r:eclogite'],
      ['Verte, aspect gras, veinée, souvent magnétique', 'r:serpentinite'],
      ['Grenats bruns, pyroxènes verts, au contact d’un calcaire', 'r:skarn'],
      ['Sombre, baguettes de plagioclase entrecroisées, grain ~1 mm', 'r:dolerite'],
      ['Noire, prismes brillants alignés (hornblende)', 'r:amphibolite'],
      ['Lamelles blanches qui se rayent à l’ongle', 'r:gypse']
    ]
  },
  fine: {
    q: 'Teinte de la pâte :',
    r: [
      ['Noire ou gris très sombre, lourde', 'k:finesombre'],
      ['Grise moyenne avec cristaux blancs (plagioclase)', 'k:finegrise'],
      ['Claire (rose, beige, gris clair)', 'k:fineclaire'],
      ['Gris-vert, se débite en dalles sonores', 'r:phonolite'],
      ['Verte, aspect gras, veines', 'r:serpentinite']
    ]
  },
  finesombre: {
    q: 'Précisez :',
    r: [
      ['Lave noire, parfois cristaux verts d’olivine ou bulles, orgues', 'r:basalte'],
      ['Très dure, sonne, cassure esquilleuse, près d’un granite', 'r:corneenne'],
      ['Aiguilles sombres en éventail (« spinifex »), très ancienne', 'r:komatiite'],
      ['Gris foncé, faite de grains variés', 'r:grauwacke']
    ]
  },
  finegrise: {
    q: 'Voit-on des grains de quartz ?',
    r: [
      ['Non : plagioclase blanc + amphibole/pyroxène noirs', 'r:andesite'],
      ['Oui : quartz arrondi + plagioclase + biotite', 'r:dacite']
    ]
  },
  fineclaire: {
    q: 'Précisez :',
    r: [
      ['Avec quartz, souvent rubanée par l’écoulement', 'r:rhyolite'],
      ['Toucher rugueux, tablettes de feldspath transparent', 'r:trachyte'],
      ['Ponces aplaties en flammes', 'r:ignimbrite']
    ]
  },
  organique: {
    q: 'Précisez :',
    r: [
      ['Noir, brillant ou semi-mat, cassant', 'r:houille'],
      ['Brun, terne, structure du bois visible', 'r:lignite']
    ]
  },
  tendre: {
    q: 'Quel autre indice ?',
    r: [
      ['Goût salé, soluble dans l’eau', 'r:halite'],
      ['Sans goût, cristaux ou lamelles blanches', 'r:gypse'],
      ['Toucher savonneux, gris-vert', 'r:steatite'],
      ['Plastique quand elle est mouillée, odeur de terre', 'r:argile'],
      ['Blanche, extrêmement légère, tache les doigts, ne réagit pas à l’acide', 'r:diatomite'],
      ['Poudre jaune farineuse, non plastique', 'r:loess'],
      ['Feuillets qui se délitent', 'r:argilite'],
      ['Cendres volcaniques poreuses', 'r:tuf']
    ]
  },
  residuelle: {
    q: 'Précisez :',
    r: [
      ['Petites billes (pisolithes) rouge brique, plutôt légère', 'r:bauxite'],
      ['Alvéolaire, dure, rouge-brun, lourde', 'r:laterite']
    ]
  }
};

/* ------------------------------------------------------------------
 * GUIDE DES TESTS
 * ------------------------------------------------------------------ */
window.TESTS = [
  {
    id: 'observation', titre: 'Observation à l’œil nu et à la loupe', icone: '🔍',
    materiel: 'Loupe ×10, cassure fraîche, bonne lumière (naturelle de préférence).',
    principe: "Avant tout test, on observe une cassure fraîche (la surface altérée trompe sur la couleur). On note la taille des grains, leur forme et leur arrangement, qui révèlent l'origine de la roche.",
    etapes: [
      'Casser un petit éclat (lunettes !) ou examiner une surface fraîche.',
      'Grains jointifs et engrenés → roche cristalline (magmatique ou métamorphique). Grains arrondis ou fragments liés par un ciment → roche détritique.',
      'Minéraux orientés, plans de débit → roche métamorphique foliée.',
      'Pas de grains visibles même à la loupe → roche volcanique, sédimentaire fine ou verre.',
      'Rechercher fossiles (sédimentaire), bulles (volcanique), litage (sédimentaire).'
    ],
    lecture: [
      ['Invisible', '< 0,06 mm (même à la loupe)'],
      ['Fin', '0,06 – 1 mm (visible à la loupe)'],
      ['Moyen', '1 – 5 mm'],
      ['Grossier', '> 5 mm']
    ]
  },
  {
    id: 'durete', titre: 'Dureté (échelle de Mohs)', icone: '💎',
    materiel: 'Ongle, pièce de cuivre (ou clou en laiton), lame de couteau, plaque de verre, lime en acier, cristal de quartz.',
    principe: "On teste quel objet raye l'autre. La dureté s'applique aux minéraux : dans une roche hétérogène, testez chaque minéral. Une vraie rayure est un sillon qui reste après avoir frotté du doigt (ne pas confondre avec une trace de métal déposée).",
    etapes: [
      'Choisir une surface plane et fraîche.',
      'Appuyer fermement l’outil et tirer sur 1 cm.',
      'Essuyer : sillon = rayé ; trace qui s’efface = poudre de l’outil.',
      'Encadrer la dureté entre l’objet qui raye et celui qui ne raye pas.'
    ],
    lecture: [
      ['1 – Talc', 'Se raye à l’ongle facilement, toucher gras'],
      ['2 – Gypse', 'Se raye à l’ongle'],
      ['~2,5 – Ongle', ''],
      ['3 – Calcite', 'Se raye à la pièce de cuivre'],
      ['~3,5 – Pièce de cuivre', ''],
      ['4 – Fluorite', 'Se raye facilement au couteau'],
      ['5 – Apatite', 'Se raye au couteau difficilement'],
      ['~5,5 – Verre, lame de couteau', ''],
      ['6 – Orthose (feldspath)', 'Raye le verre difficilement'],
      ['~6,5 – Lime en acier', ''],
      ['7 – Quartz', 'Raye le verre facilement'],
      ['8 – Topaze', ''],
      ['9 – Corindon', ''],
      ['10 – Diamant', '']
    ]
  },
  {
    id: 'acide', titre: 'Test à l’acide chlorhydrique', icone: '🧪',
    materiel: 'Acide chlorhydrique dilué à 10 % en flacon compte-gouttes (en magasin de bricolage : « acide chlorhydrique » à diluer), lunettes, gants, eau de rinçage. À défaut : vinaigre blanc chaud (réaction plus lente).',
    principe: 'Les carbonates libèrent du CO₂ au contact de l’acide : CaCO₃ + 2 HCl → CaCl₂ + H₂O + CO₂. La vigueur de l’effervescence distingue la calcite de la dolomite.',
    etapes: [
      '⚠️ Porter des lunettes. Toujours verser l’acide dans l’eau pour le diluer, jamais l’inverse.',
      'Déposer une goutte sur une cassure fraîche.',
      'Observer (à la loupe si besoin) : bulles vives = calcite.',
      'Si rien : gratter un peu de poudre au couteau et refaire le test sur la poudre (dolomite).',
      'Tester séparément les grains et le ciment d’une roche détritique.',
      'Rincer abondamment l’échantillon à l’eau ensuite.'
    ],
    lecture: [
      ['Effervescence vive immédiate', 'Calcite : calcaire, craie, marbre, travertin, marne'],
      ['Effervescence + boue grise résiduelle', 'Marne (calcaire + argile)'],
      ['Faible, seulement sur la poudre ou à chaud', 'Dolomite : dolomie, marbre dolomitique'],
      ['Localisée (ciment ou veines)', 'Grès ou conglomérat à ciment calcaire, basalte à vacuoles remplies'],
      ['Aucune', 'Silicates : granite, basalte, grès siliceux, quartzite…']
    ]
  },
  {
    id: 'densite', titre: 'Densité', icone: '⚖️',
    materiel: 'Balance de cuisine précise (0,1 g idéalement), récipient d’eau, fil fin.',
    principe: "La densité (masse volumique relative à l'eau) se ressent déjà en soupesant, mais se mesure facilement par la méthode d'Archimède. Utilisez le calculateur ci-dessous.",
    etapes: [
      'Peser l’échantillon sec : masse M.',
      'Placer un récipient d’eau sur la balance, faire la tare.',
      'Suspendre l’échantillon par un fil pour qu’il soit totalement immergé sans toucher le fond ni les parois : la balance affiche m (masse d’eau déplacée = volume en cm³).',
      'Densité = M / m.'
    ],
    lecture: [
      ['< 1', 'Flotte : ponce, diatomite sèche, lignite'],
      ['1 – 2', 'Charbon, tuf, craie très poreuse, scorie'],
      ['2,3 – 2,8', 'La plupart des roches : grès, calcaire, granite, gneiss'],
      ['2,8 – 3,1', 'Roches sombres : basalte, gabbro, amphibolite'],
      ['> 3,2', 'Péridotite, éclogite, fer rubané, minerais']
    ]
  },
  {
    id: 'aimant', titre: 'Magnétisme', icone: '🧲',
    materiel: 'Petit aimant néodyme, idéalement suspendu à un fil, ou boussole.',
    principe: 'La magnétite (et la pyrrhotite) attirent l’aimant. Les roches contenant quelques % de magnétite réagissent : basaltes, gabbros, serpentinites, fer rubané.',
    etapes: [
      'Suspendre l’aimant à un fil de 10 cm.',
      'Approcher lentement l’échantillon : l’aimant dévie-t-il ?',
      'Avec une boussole : approcher la roche, l’aiguille bouge-t-elle ?'
    ],
    lecture: [
      ['Forte attraction', 'Fer rubané, minerai de magnétite, certaines serpentinites et skarns'],
      ['Attraction faible', 'Basalte, gabbro, dolérite, scories, latérite'],
      ['Aucune', 'Granite, calcaire, grès, marbre…']
    ]
  },
  {
    id: 'trait', titre: 'Couleur du trait', icone: '✏️',
    materiel: 'Plaque de porcelaine non émaillée (dos d’un carreau de faïence).',
    principe: 'On frotte le minéral sur la porcelaine : la couleur de la poudre est plus constante que celle du minéral. Utile surtout pour les minerais et oxydes (hématite, magnétite, goethite). Inopérant pour les minéraux plus durs que la porcelaine (~7).',
    etapes: ['Frotter fermement le minéral ou la roche sur la plaque.', 'Observer la couleur de la trace de poudre.'],
    lecture: [
      ['Rouge-brun', 'Hématite (fer rubané, bauxite, latérite)'],
      ['Noir', 'Magnétite, graphite, charbon'],
      ['Jaune-brun', 'Goethite, limonite (latérite)'],
      ['Blanc / incolore', 'La plupart des silicates et carbonates']
    ]
  },
  {
    id: 'sens', titre: 'Goût, toucher, odeur, son', icone: '👅',
    materiel: 'Vos sens… avec prudence !',
    principe: 'Certains indices sensoriels sont décisifs. Ne jamais goûter un échantillon inconnu susceptible d’être toxique (minerais métalliques, minéraux d’arsenic, de plomb…).',
    etapes: [
      'Goût : salé = halite ; amer = sylvite (sel de potasse).',
      'Toucher : savonneux = talc (stéatite) ; âpre = trachyte ; rugueux = grès ; farineux = lœss ; gras = serpentinite.',
      'Odeur : souffler son haleine sur la roche → odeur de terre mouillée = argile, marne, shale. Odeur fétide quand on frappe = calcaire bitumineux.',
      'Langue : l’argile sèche « happe » la langue.',
      'Son : une dalle de phonolite, d’ardoise ou de cornéenne sonne clair.'
    ],
    lecture: []
  },
  {
    id: 'eau', titre: 'Tests à l’eau', icone: '💧',
    materiel: 'Un verre d’eau, un compte-gouttes.',
    principe: 'L’eau révèle la porosité, la solubilité et la plasticité.',
    etapes: [
      'Flottaison : la ponce et la diatomite sèche flottent.',
      'Solubilité : la halite disparaît dans l’eau en quelques minutes.',
      'Plasticité : une argile humide se modèle en boudin sans casser.',
      'Porosité : une goutte est absorbée par un grès, une craie, un tuf ; elle perle sur un granite ou un marbre.',
      'Délitement : une marne ou un shale se désagrège après des cycles mouillé/sec.'
    ],
    lecture: []
  },
  {
    id: 'cassure', titre: 'Cassure, éclat et clivage', icone: '🔨',
    materiel: 'Marteau de géologue, lunettes de protection.',
    principe: 'La manière dont une roche ou un minéral se brise et réfléchit la lumière est très informative.',
    etapes: [
      'Cassure conchoïdale (en coquille) : obsidienne, silex, chert, quartz.',
      'Clivages plans brillants qui « flashent » à la lumière : feldspaths, calcite, amphibole, pyroxène.',
      'Débit en plaques : ardoise, schistes, phonolite.',
      'Éclat vitreux (verre), cireux (silex), gras (serpentine, quartz), soyeux (phyllade, gypse fibreux), métallique (hématite).'
    ],
    lecture: [
      ['Amphibole', '2 clivages à ~120° (section en losange)'],
      ['Pyroxène', '2 clivages à ~90° (section carrée)'],
      ['Calcite', '3 clivages en rhomboèdre'],
      ['Mica', '1 clivage parfait en feuillets'],
      ['Quartz', 'Aucun clivage, cassure conchoïdale']
    ]
  },
  {
    id: 'terrain', titre: 'Indices de terrain', icone: '🗺️',
    materiel: 'Carte géologique (BRGM InfoTerre en France, Macrostrat ailleurs), boussole, carnet.',
    principe: 'Le contexte élimine souvent beaucoup d’hypothèses : une même roche n’apparaît que dans certains environnements.',
    etapes: [
      'Consulter la carte géologique au 1/50 000 du lieu de récolte.',
      'Observer l’affleurement : couches (sédimentaire), orgues (volcanique), plis et foliation (métamorphique), filons (magmatique).',
      'Galets de rivière : ils proviennent du bassin versant amont.',
      'Noter la position GPS et prendre une photo de l’affleurement.'
    ],
    lecture: []
  }
];

/* ------------------------------------------------------------------
 * MINÉRAUX DES ROCHES (aide à l'identification)
 * [nom, couleur, dureté, éclat, clivage/cassure, indice clé]
 * ------------------------------------------------------------------ */
window.MINERAUX = [
  ['Quartz', 'Incolore, gris, blanc, rose', '7', 'Vitreux à gras', 'Aucun ; cassure conchoïdale', 'Raye le verre, aspect de verre gras, sans faces planes dans les roches'],
  ['Orthose (feldspath K)', 'Blanc, rose, saumon', '6', 'Vitreux', '2 clivages à 90°', 'Faces planes brillantes, souvent rose dans le granite ; macles de Carlsbad'],
  ['Plagioclase', 'Blanc, gris, bleuté', '6–6,5', 'Vitreux', '2 clivages à ~86°', 'Fines stries parallèles (macles polysynthétiques) sur les faces'],
  ['Muscovite', 'Incolore, argenté', '2–2,5', 'Nacré', '1 parfait (feuillets)', 'Feuillets transparents élastiques'],
  ['Biotite', 'Noir, brun', '2,5–3', 'Brillant', '1 parfait (feuillets)', 'Paillettes noires qui se détachent à l’ongle'],
  ['Hornblende (amphibole)', 'Noir, vert sombre', '5–6', 'Vitreux', '2 à ~120°', 'Prismes allongés, section losangique'],
  ['Augite (pyroxène)', 'Noir, vert sombre', '5,5–6', 'Vitreux à terne', '2 à ~90°', 'Prismes trapus, section octogonale'],
  ['Olivine', 'Vert olive à jaune', '6,5–7', 'Vitreux', 'Aucun net', 'Grains verts vitreux ; s’altère en rouille'],
  ['Grenat', 'Rouge, brun, vert, orange', '6,5–7,5', 'Vitreux', 'Aucun', 'Cristaux ronds à facettes (dodécaèdres), dense'],
  ['Calcite', 'Blanc, incolore', '3', 'Vitreux', '3 (rhomboèdre)', 'Effervescence vive à l’acide, double réfraction'],
  ['Dolomite', 'Blanc, beige, rosé', '3,5–4', 'Vitreux à nacré', '3 (rhomboèdre)', 'Effervescence seulement sur poudre'],
  ['Gypse', 'Blanc, incolore', '2', 'Vitreux à soyeux', '1 parfait', 'Se raye à l’ongle'],
  ['Halite', 'Incolore, blanc', '2,5', 'Vitreux', '3 à 90° (cubes)', 'Goût salé, soluble'],
  ['Talc', 'Blanc, vert pâle', '1', 'Gras, nacré', '1 parfait', 'Toucher savonneux'],
  ['Serpentine', 'Vert', '3–5', 'Gras, cireux', 'Variable (fibreux pour le chrysotile)', 'Aspect cireux vert, marbré'],
  ['Chlorite', 'Vert', '2–2,5', 'Nacré', '1 parfait', 'Feuillets verts non élastiques'],
  ['Glaucophane', 'Bleu lavande à bleu-noir', '6', 'Vitreux', '2 à ~120°', 'Amphibole bleue des schistes bleus'],
  ['Magnétite', 'Noir', '5,5–6,5', 'Métallique', 'Aucun', 'Attire l’aimant, trait noir'],
  ['Hématite', 'Gris acier à rouge', '5–6', 'Métallique à terreux', 'Aucun', 'Trait rouge-brun'],
  ['Pyrite', 'Jaune laiton', '6–6,5', 'Métallique', 'Aucun', 'Cubes dorés, trait noir verdâtre (« or des fous »)'],
  ['Tourmaline (schorl)', 'Noir', '7–7,5', 'Vitreux', 'Aucun', 'Prismes striés à section triangulaire'],
  ['Andalousite (chiastolite)', 'Rose, gris', '7,5', 'Vitreux', '2', 'Croix noire en section (chiastolite)']
];

/* ------------------------------------------------------------------
 * GLOSSAIRE
 * ------------------------------------------------------------------ */
window.GLOSSAIRE = [
  ['Affleurement', 'Endroit où la roche apparaît à la surface, non recouverte de sol ou de végétation.'],
  ['Altération', 'Transformation chimique ou mécanique d’une roche au contact de l’eau et de l’air.'],
  ['Aphanitique', 'Se dit d’une roche dont les cristaux sont invisibles à l’œil nu.'],
  ['Batholite', 'Très grand massif de roches plutoniques (> 100 km²).'],
  ['Ciment', 'Matière minérale (calcite, silice, oxydes) précipitée entre les grains d’une roche détritique et qui les lie.'],
  ['Clivage', 'Tendance d’un minéral à se casser selon des plans réguliers liés à sa structure cristalline.'],
  ['Cristallisation fractionnée', 'Séparation progressive des cristaux d’un magma qui fait évoluer sa composition.'],
  ['Diagenèse', 'Ensemble des transformations qui changent un sédiment meuble en roche (compaction, cimentation).'],
  ['Dorsale', 'Chaîne volcanique sous-marine où se crée la croûte océanique.'],
  ['Effervescence', 'Dégagement de bulles de CO₂ quand un carbonate réagit avec un acide.'],
  ['Enclave', 'Fragment d’une roche inclus dans une autre roche.'],
  ['Évaporite', 'Roche formée par précipitation de sels lors de l’évaporation de l’eau (gypse, sel gemme).'],
  ['Faciès métamorphique', 'Ensemble d’associations minérales caractéristiques d’un domaine de pression et de température.'],
  ['Felsique', 'Riche en feldspaths et silice, donc clair (granite, rhyolite). Synonyme : acide.'],
  ['Foliation', 'Organisation planaire des minéraux dans une roche métamorphique.'],
  ['Grenue', 'Texture d’une roche entièrement cristallisée à grains visibles à l’œil nu.'],
  ['Hypovolcanique', 'Mis en place à faible profondeur (filons, sills) ; grain intermédiaire.'],
  ['Karst', 'Paysage façonné par la dissolution des calcaires (grottes, gouffres, lapiaz).'],
  ['Lithification', 'Transformation d’un sédiment en roche.'],
  ['Mafique', 'Riche en magnésium et fer, donc sombre (basalte, gabbro). Synonyme : basique.'],
  ['Magma', 'Roche fondue, mélange de liquide, cristaux et gaz.'],
  ['Matrice', 'Fraction fine entourant les grains plus gros d’une roche.'],
  ['Métamorphisme', 'Transformation à l’état solide d’une roche sous l’effet de la température et/ou de la pression.'],
  ['Métasomatose', 'Métamorphisme accompagné d’échanges chimiques avec des fluides.'],
  ['Microlites', 'Très petits cristaux en baguettes dans la pâte d’une lave.'],
  ['Ophiolite', 'Fragment de lithosphère océanique charrié sur un continent.'],
  ['Phénocristal', 'Grand cristal visible dans une pâte fine (texture porphyrique).'],
  ['Plutonique', 'Se dit d’une roche magmatique cristallisée lentement en profondeur.'],
  ['Porphyrique', 'Texture à grands cristaux (phénocristaux) dans une pâte fine ou vitreuse.'],
  ['Pyroclastique', 'Formé de fragments projetés par une éruption explosive.'],
  ['Schistosité', 'Débit en feuillets dû à la compression lors du métamorphisme.'],
  ['Stratification', 'Disposition en couches superposées des roches sédimentaires.'],
  ['Subduction', 'Plongée d’une plaque lithosphérique sous une autre.'],
  ['Texture', 'Taille, forme et arrangement des grains d’une roche.'],
  ['Ultrabasique', 'Très pauvre en silice (< 45 %), riche en Mg (péridotite).'],
  ['Vacuole', 'Cavité laissée par une bulle de gaz dans une lave.'],
  ['Volcanique', 'Se dit d’une roche magmatique refroidie rapidement en surface.']
];
