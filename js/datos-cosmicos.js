/* =========================================================================
   DATOS CÓSMICOS — Explorador Cósmico (Base de Datos Educativa y Astrofísica)
   Incluye: PLANETS, DEEPSPACE, QUIZ, TOURS didácticos, Niveles (Primaria/Secundaria/Avanzado)
   ========================================================================= */

const PLANETS = [
  {
    id: 'sol', name: 'El Sol', type: 'Estrella enana amarilla (G2V)',
    radius: 4.8, dist: 0, speed: 0, color: 0xffaa00,
    desc: 'El Sol es una estrella de tipo espectral G2V que alberga el 99.86% de la masa del Sistema Solar. En su núcleo, la fusión nuclear convierte hidrógeno en helio a 15 millones de grados.',
    descLevels: {
      primaria: '¡El Sol es una bola gigante de fuego y luz! Es tan grande que dentro cabrían un millón de Tierras. Nos da calor y hace posible la vida en nuestro planeta.',
      secundaria: 'El Sol es una estrella enana amarilla compuesta de hidrógeno y helio. En su núcleo ocurre la fusión nuclear, generando una energía inmensa que viaja 8 minutos hasta llegar a la Tierra.',
      avanzado: 'Estrella de secuencia principal G2V en equilibrio hidrostático. Su núcleo opera mediante la cadena protón-protón a 15 MK, generando un flujo radiativo y convectivo con ciclos magnéticos de 11 años.'
    },
    scaleComp: { ref: 'Tierra', sizeStr: '109x diámetro terrestre', massStr: '333,000x masa terrestre' },
    facts: [
      'Temperatura superficial de unos 5,500 °C, núcleo a 15,000,000 °C.',
      'Consume 600 millones de toneladas de hidrógeno por segundo.',
      'La luz solar tarda aproximadamente 8 minutos y 20 segundos en llegar a la Tierra.'
    ],
    fun: '¿Sabías que el Sol es tan grande que dentro de él cabrían un millón de planetas Tierra?'
  },
  {
    id: 'mercurio', name: 'Mercurio', type: 'Planeta rocoso',
    radius: 0.65, dist: 11, speed: 4.15, color: 0x9b9b9b,
    desc: 'El planeta más cercano al Sol y el más pequeño del Sistema Solar. Al carecer de una atmósfera significativa, experimenta las variaciones térmicas más extremas del sistema.',
    descLevels: {
      primaria: 'Mercurio es el planeta más cercano al Sol. Es un mundo rocoso lleno de cráteres, ¡como nuestra Luna! De día hace un calor abrasador y de noche un frío helado.',
      secundaria: 'Por su cercanía al Sol y su delgada exosfera, Mercurio sufre un rango térmico salvaje: desde 430 °C al mediodía hasta -180 °C en su noche.',
      avanzado: 'Cuerpo altamente denso con un núcleo de hierro masivo que ocupa el 85% de su radio. Presenta una resonancia espín-órbita 3:2 única debida a fuerzas de marea solares.'
    },
    scaleComp: { ref: 'Tierra', sizeStr: '0.38x diámetro terrestre', massStr: '0.055x masa terrestre' },
    facts: [
      'Temperaturas extremas: de 430 °C de día a -180 °C de noche.',
      'Un año dura 88 días terrestres, pero su día dura 59 días.',
      'Posee un núcleo metálico que ocupa el 85% del planeta.'
    ],
    fun: 'En Mercurio tu cumpleaños sería cada 3 meses, pero un solo día dura casi dos meses enteros.'
  },
  {
    id: 'venus', name: 'Venus', type: 'Planeta rocoso',
    radius: 1.15, dist: 16, speed: 1.62, color: 0xe8c170,
    desc: 'El planeta más cálido del Sistema Solar debido a un efecto invernadero descontrolado. Su densa atmósfera de dióxido de carbono atrapa el calor de forma extrema.',
    descLevels: {
      primaria: 'Venus es el planeta más caliente de todos. Está cubierto por nubes amarillas que atrapan el calor como una manta gigante. ¡Brilla muchísimo en el cielo al amanecer!',
      secundaria: 'Aunque Mercurio está más cerca del Sol, Venus es más caliente (465 °C) por su atmósfera de CO2 que causa un efecto invernadero desbocado. Gira al revés que la Tierra.',
      avanzado: 'Atmósfera hiperdensa de CO2 con presión superficial de 92 bar y nubes de ácido sulfúrico. Su rotación retrógrada ultralenta indica posibles colisiones masivas en el eón Hádico.'
    },
    scaleComp: { ref: 'Tierra', sizeStr: '0.95x diámetro terrestre', massStr: '0.81x masa terrestre' },
    facts: [
      'Presión atmosférica 92 veces superior a la de la Tierra.',
      'Lluvia permanente de ácido sulfúrico en sus capas altas.',
      'Su rotación es retrógrada: el Sol sale por el oeste.'
    ],
    fun: '¡Un día en Venus dura más que su año! Gira tan despacio sobre sí mismo que tarda 243 días terrestres en dar una vuelta.'
  },
  {
    id: 'tierra', name: 'La Tierra', type: 'Planeta rocoso habitado',
    radius: 1.35, dist: 23, speed: 1.0, color: 0x3b82f6,
    desc: 'Nuestro hogar: el único cuerpo celeste conocido que alberga vida. Su atmósfera rica en nitrógeno y oxígeno, junto a océanos de agua líquida, lo hacen único.',
    descLevels: {
      primaria: '¡Nuestro planeta azul! Es el único lugar donde sabemos que hay vida. Tiene agua dulce, océanos profundos, bosques y una atmósfera que nos permite respirar.',
      secundaria: 'La Tierra posee un campo magnético protector generado por su núcleo de hierro líquido, agua en los tres estados de la materia y placas tectónicas activas.',
      avanzado: 'Planeta terrestre con biosfera autorregulada, campo geomagnético dipolar y tectónica de placas. La inclinación axial de 23.4° genera ciclos estacionales estables y clima moderado.'
    },
    scaleComp: { ref: 'Tierra', sizeStr: '1.0x (Estándar de referencia)', massStr: '1.0x (5.972 × 10^24 kg)' },
    facts: [
      'El 71% de su superficie está cubierta por océanos de agua líquida.',
      'Su escudo magnético nos protege de la radiación solar letal.',
      'Posee una Luna proporcionalmente masiva que estabiliza su eje.'
    ],
    fun: 'Aunque sentimos que estamos quietos, ¡la Tierra viaja por el espacio a 107,000 km/h alrededor del Sol!'
  },
  {
    id: 'marte', name: 'Marte', type: 'Planeta rocoso',
    radius: 0.85, dist: 31, speed: 0.53, color: 0xef4444,
    desc: 'El "Planeta Rojo", cuyo color se debe al óxido de hierro en su superficie. Alberga el volcán más alto y el cañón más profundo de todo el Sistema Solar.',
    descLevels: {
      primaria: 'Le dicen el Planeta Rojo porque su tierra es de color óxido. Tiene el volcán más gigante que existe, el Monte Olimpo, ¡tres veces más alto que el Everest!',
      secundaria: 'Marte tuvo ríos y lagos en el pasado distante. Hoy es un desierto helado con casquetes polares de agua y CO2 congelado y un periodo orbital de 687 días.',
      avanzado: 'Presenta geomorfología fluvial fósil y dicotomía hemisférica crustal. El Monte Olimpo (21.9 km) y Valles Marineris evidencian una pluma mantélica duradera sin tectónica móvil.'
    },
    scaleComp: { ref: 'Tierra', sizeStr: '0.53x diámetro terrestre', massStr: '0.11x masa terrestre' },
    facts: [
      'Monte Olimpo: 21.9 km de altura, casi el triple del Everest.',
      'Valles Marineris: un cañón de 4,000 km de largo y 7 km de profundidad.',
      'Tiene dos lunas de forma irregular: Fobos y Deimos.'
    ],
    fun: 'En Marte los atardeceres no son naranjas ni rojos: el polvo de su atmósfera hace que el cielo se vea azul brillante al ponerse el Sol.'
  },
  {
    id: 'jupiter', name: 'Júpiter', type: 'Gigante gaseoso',
    radius: 2.9, dist: 45, speed: 0.084, color: 0xf59e0b,
    desc: 'El coloso del Sistema Solar: un gigante de hidrógeno y helio con más masa que todos los demás planetas juntos. Su Gran Mancha Roja es una tormenta anticiclónica.',
    descLevels: {
      primaria: '¡Es el rey de los planetas! Es una bola enorme de gas con rayas de colores y una Gran Mancha Roja que es en realidad un huracán más grande que toda la Tierra.',
      secundaria: 'Júpiter es un gigante gaseoso que actúa como un escudo gravitacional para el Sistema Solar interior, desviando cometas y asteroides con su inmensa masa.',
      avanzado: 'Gigante joviano compuesto en un 90% por hidrógeno. Su interior alberga hidrógeno metálico degenerado que impulsa un campo magnético 20,000 veces mayor que el terrestre.'
    },
    scaleComp: { ref: 'Tierra', sizeStr: '11.2x diámetro terrestre', massStr: '318x masa terrestre' },
    facts: [
      'Su masa es 2.5 veces la de todos los demás planetas combinados.',
      'La Gran Mancha Roja es una tormenta con vientos de 430 km/h activa hace siglos.',
      'Posee más de 90 satélites, incluidos los 4 mundos galileanos.'
    ],
    fun: '¡Tiene el día más corto del Sistema Solar! A pesar de su tamaño gigantesco, da una vuelta sobre sí mismo en solo 9 horas y 55 minutos.'
  },
  {
    id: 'saturno', name: 'Saturno', type: 'Gigante gaseoso con anillos',
    radius: 2.3, dist: 61, speed: 0.034, color: 0xfde047,
    desc: 'Famoso por su espectacular sistema de anillos hechos de hielo, roca y polvo cósmico. Es un gigante gaseoso con una densidad menor que la del agua.',
    descLevels: {
      primaria: '¡El planeta de los anillos mágicos! Sus anillos brillan porque están hechos de miles de millones de trozos de hielo y espejos de roca flotando a su alrededor.',
      secundaria: 'Saturno posee un sistema de anillos de 282,000 km de diámetro pero con un grosor de apenas 10 a 100 metros. Tiene más de 140 lunas confirmadas.',
      avanzado: 'El planeta con menor densidad media (0.687 g/cm³). Sus anillos principales (A, B, C) mantienen su estructura gracias al confinamiento resonante de lunas pastoras.'
    },
    scaleComp: { ref: 'Tierra', sizeStr: '9.45x diámetro terrestre', massStr: '95.2x masa terrestre' },
    facts: [
      'Sus anillos miden 282,000 km de ancho pero solo ~10 metros de grosor.',
      'Es el único planeta cuya densidad es menor que la del agua (flotaría).',
      'Su luna Titán tiene océanos y lluvias de metano líquido.'
    ],
    fun: 'Si pudieras encontrar una piscina gigante y lanzaras a Saturno dentro, ¡el planeta flotaría como una pelota de playa!'
  },
  {
    id: 'urano', name: 'Urano', type: 'Gigante de hielo',
    radius: 1.7, dist: 76, speed: 0.012, color: 0x22d3ee,
    desc: 'Un gigante de hielo teñido de cian por el metano atmosférico. Rota "de lado" con una inclinación axial de 98°, posiblemente debido a un cataclismo en su formación.',
    descLevels: {
      primaria: '¡El planeta helado que gira acostado! Es de color celeste turquesa muy bonito y rueda por el espacio como si fuera una canica gigante.',
      secundaria: 'Urano tiene una inclinación axial extrema de 98°, lo que provoca que sus polos pasen 42 años en luz solar continua seguidos de 42 años de oscuridad completa.',
      avanzado: 'Gigante de hielo con manto de fluidos supercríticos (agua, amoníaco, metano). Su eje de rotación tumbado es probablemente resultado de una colisión con un protoplaneta.'
    },
    scaleComp: { ref: 'Tierra', sizeStr: '4.0x diámetro terrestre', massStr: '14.5x masa terrestre' },
    facts: [
      'Inclinación axial de 98°: gira casi paralelo a su plano orbital.',
      'Tiene la temperatura atmosférica más baja medida: -224 °C.',
      'Sus estaciones duran 21 años terrestres cada una.'
    ],
    fun: 'Por estar girando de lado, en el polo norte de Urano el Sol no se pone durante 42 años seguidos... ¡y luego es de noche durante otros 42 años!'
  },
  {
    id: 'neptuno', name: 'Neptuno', type: 'Gigante de hielo',
    radius: 1.65, dist: 91, speed: 0.006, color: 0x2563eb,
    desc: 'El planeta más distante del Sol. Un mundo helado y azul donde soplan los vientos más supersónicos de todo el Sistema Solar, superando los 2,100 km/h.',
    descLevels: {
      primaria: 'Es el planeta más lejano, de un azul intenso y profundo. Allí hay tormentas de viento increíbles, mucho más fuertes que el tornado más rápido de la Tierra.',
      secundaria: 'Neptuno fue el primer planeta descubierto mediante cálculos matemáticos antes de ser visto con un telescopio. Tarda 165 años en dar una vuelta al Sol.',
      avanzado: 'Presenta vientos zonales retrógrados que alcanzan 600 m/s impulsados por calor interno residual. Su luna Tritón orbita de forma retrógrada (objeto capturado del cinturón de Kuiper).'
    },
    scaleComp: { ref: 'Tierra', sizeStr: '3.88x diámetro terrestre', massStr: '17.1x masa terrestre' },
    facts: [
      'Vientos supersónicos récord que superan los 2,100 km/h.',
      'Fue descubierto matemáticamente en 1846 por variaciones en la órbita de Urano.',
      'Su luna Tritón tiene géiseres que expulsan nitrógeno líquido al espacio.'
    ],
    fun: '¡En Neptuno llueven diamantes! La increíble presión atmosférica comprime el carbono cristalizándolo en diamantes que caen hacia su núcleo.'
  }
];

const DEEPSPACE = [
  {
    id: 'agujero',
    name: 'Agujero Negro Relativista ("Gargantua")',
    type: 'Singularidad Gravitacional Supermasiva',
    pos: [0, -2, -26],
    desc: 'Un agujero negro relativista modelado con precisión astrofísica. Su inmenso campo gravitatorio curva el espacio-tiempo, doblando la trayectoria de la luz en un Anillo de Einstein y acelerando su disco de acreción hasta temperaturas de rayos X con efecto Doppler relativista (beaming).',
    descLevels: {
      primaria: '¡Es el objeto con más fuerza de atracción del universo! Su gravedad es tan poderosa que ni siquiera la luz puede escapar. A su alrededor hay un disco de gas caliente brillando.',
      secundaria: 'Un agujero negro curva el espacio-tiempo a su alrededor. Vemos la parte trasera de su disco por encima y por debajo debido al efecto de lente gravitacional de Einstein.',
      avanzado: 'Métrica de Kerr-Schild hipermasiva con disco de acreción ópticamente delgado. Muestra asimetría de brillo por beaming relativista (efecto Doppler amplificado) y anillo fotónico al borde de la última órbita estable (ISCO).'
    },
    scaleComp: { ref: 'Sol', sizeStr: 'Diámetro de Horizonte: ~1 AU (150 M km)', massStr: '4.3 millones de masas solares' },
    facts: [
      'Lente gravitacional de Einstein: la luz del disco trasero se curva por encima y por debajo del horizonte.',
      'Efecto Doppler Relativista (Beaming): el lado que gira hacia nosotros resplandece en blanco-cian brillante; el que se aleja se atenúa en tonos rojos y ámbar.',
      'Chorros relativistas de materia eyectada a lo largo del eje magnético a casi la velocidad de la luz.'
    ],
    fun: 'Si pudieras mirar este agujero negro de frente, ¡estarías viendo su parte trasera y delantera al mismo tiempo gracias a que la luz viaja en círculos!'
  },
  {
    id: 'pulsar',
    name: 'Púlsar de Neutrones Magnetizado',
    type: 'Estrella de Neutrones en Rotación Ultrarrápida',
    pos: [110, 35, -125],
    desc: 'El núcleo colapsado remanente de una supernova masiva. Con apenas 20 km de diámetro y una densidad equivalente a mil millones de toneladas por centímetro cúbico, gira a 30 revoluciones por segundo emitiendo haces de radiación sincrotrón como un faro cósmico.',
    descLevels: {
      primaria: '¡Es como el faro más rápido del espacio! Es una pequeña bola superdensa que gira rapidísimo lanzando rayos láser cósmicos por sus polos.',
      secundaria: 'Cuando una estrella supermasiva estalla en supernova, su núcleo puede colapsar en una estrella de neutrones. Gira tan rápido por la conservación del momento angular.',
      avanzado: 'Estrella de neutrones altamente magnetizada (campo 10^12 Gauss) emitiendo radiación sincrotrón por aceleración de partículas en su magnetosfera con un periodo de 33 ms.'
    },
    scaleComp: { ref: 'Tierra', sizeStr: '20 km (Tamaño de una ciudad)', massStr: '1.4x a 2.1x masas solares' },
    facts: [
      'Densidad nuclear extrema: una sola cucharadita pesaría el equivalente al Everest (mil millones de toneladas).',
      'Rotación vertiginosa: gira a 30 revoluciones por segundo (1,800 RPM).',
      'Chorros electromagnéticos de radiación sincrotrón pulsados en intervalos atómicos exactos.'
    ],
    fun: '¡Gira más rápido que el motor de un coche de Fórmula 1 a máxima velocidad y pesa más que todo nuestro Sol en el tamaño de una ciudad!'
  },
  {
    id: 'nebulosa',
    name: 'Nebulosa de Emisión H-alpha ("Pilares")',
    type: 'Nube Interestelar de Ionización y Vivero Estelar',
    pos: [-115, -28, -130],
    desc: 'Una vasta catedral de gas ionizado y polvo interestelar a miles de años luz. Modelada con paletas de astrofotografía (H-alpha en rojo carmín, [OIII] en cian luminoso y [SII] en ámbar dorado), alberga un cúmulo de jóvenes estrellas supergigantes O y B que esculpen la nube con sus vientos ultravioleta.',
    descLevels: {
      primaria: '¡Es una fábrica de estrellas bebé en el cielo! Son nubes gigantescas de gas de colores rosa, celeste y oro donde nacen nuevos soles.',
      secundaria: 'Las nebulosas de emisión brillan porque la radiación ultravioleta de estrellas calientes excita los átomos de hidrógeno y oxígeno del gas circundante.',
      avanzado: 'Región HII de fotoionización ionizada por estrellas jóvenes OB. La emisión espectral sigue la paleta de Hubble (SHO) diferenciando gradientes de densidad, ionización e hidrocarburos policíclicos aromáticos.'
    },
    scaleComp: { ref: 'Sol', sizeStr: '~30 a 50 años luz de envergadura', massStr: 'Miles de masas solares en gas y polvo' },
    facts: [
      'Espectroscopía astrofotográfica: rojo por emisión de Hidrógeno-alfa, cian por Oxígeno-III ionizado.',
      'Cúmulo estelar joven en el corazón: estrellas azules supermasivas que viven apenas pocos millones de años.',
      'Pilares de creación donde la gravedad comprime gas molecular para encender nuevas estrellas.'
    ],
    fun: '¡Esta nube es tan enorme que un rayo de luz tardaría 40 años en cruzar de un extremo a otro a 300,000 km por segundo!'
  },
  {
    id: 'galaxia',
    name: 'Galaxia Espiral Barrada (Tipo SBbc)',
    type: 'Isla Universal de 100 Mil Millones de Soles',
    pos: [-45, 68, -195],
    desc: 'Una estructura galáctica majestuosa con un núcleo bulbo amarillo de estrellas viejas (Población II) y brazos espirales azules colmados de estrellas calientes (Población I) y corredores oscuros de polvo molecular absorbiendo la luz estelar de fondo.',
    descLevels: {
      primaria: '¡Una gigantesca espiral formada por cien mil millones de estrellas! Nuestra propia Vía Láctea es una galaxia hermana muy parecida a esta.',
      secundaria: 'Las galaxias espirales tienen un centro amarillento lleno de estrellas antiguas y brazos azules donde nacen soles nuevos en espirales de ondas de densidad.',
      avanzado: 'Morfología espiral con ondas de densidad en co-rotación. Presenta gradiente de metalicidad y color (Población I en disco delgado y II en bulbo), con pistas oscuras de extinción por polvo frío.'
    },
    scaleComp: { ref: 'Sol', sizeStr: '100,000 años luz de diámetro', massStr: '100,000 millones de masas solares' },
    facts: [
      'Brazos espirales azules: regiones de activa formación estelar con supergigantes masivas.',
      'Bulbo central amarillo: población estelar de edad madura densamente agrupada en torno al núcleo.',
      'Bandas oscuras interestelares: polvo frío de silicatos y grafito que bloquea y dispersa la luz óptica.'
    ],
    fun: '¡Si contaras una estrella de esta galaxia cada segundo, tardarías más de 3,000 años sin dormir en terminarlas todas!'
  },
  {
    id: 'gigante',
    name: 'Gigante Roja en Fase Asintótica',
    type: 'Estrella Evolucionada en Expansión Masiva',
    pos: [85, -45, -160],
    desc: 'Una estrella evolutivamente anciana que ha agotado su hidrógeno central y quema helio en sus capas externas. Su superficie ha crecido hasta alcanzar 250 veces el diámetro del Sol, mostrando células de convección gigantescas, pulsaciones térmicas y un viento estelar supermasivo.',
    descLevels: {
      primaria: '¡Una estrella anciana que se hincha como un globo rojo gigante! Dentro de 5 mil millones de años nuestro Sol se convertirá en una estrella así.',
      secundaria: 'Cuando una estrella de masa media agota su hidrógeno, su núcleo se contrae y su corteza se expande enormemente y se enfría, adquiriendo color rojo.',
      avanzado: 'Fase de rama gigante asintótica (AGB). Exhibe inestabilidad pulsacional con supergranulación convectiva macroscópica y alta pérdida de masa por presión de radiación sobre granos de polvo.'
    },
    scaleComp: { ref: 'Sol', sizeStr: '250x diámetro solar (Absorbería órbita de la Tierra)', massStr: '1.2x masa solar en rápida eyección' },
    facts: [
      'Diámetro colosal: si estuviera en lugar del Sol, engulliría a Mercurio, Venus y la Tierra.',
      'Células de convección masivas: cada burbuja brillante en su superficie es tan grande como Júpiter.',
      'Vientos estelares densos que enriquecen el espacio interestelar con carbono, oxígeno y nitrógeno.'
    ],
    fun: '¡Cada mancha o burbuja de calor que ves bullendo en la superficie de esta estrella es más grande que todo el planeta Júpiter!'
  },
  {
    id: 'enana',
    name: 'Enana Blanca Degenerada con Disco',
    type: 'Remanente Estelar de Alta Densidad con Anillo de Escombros',
    pos: [-80, 20, -110],
    desc: 'El núcleo de carbono-oxígeno expuesto tras la expulsión de una nebulosa planetaria. Sostenida únicamente por la presión de degeneración de electrones, esta brasa cósmica caliente está rodeada por un anillo de escombros de asteroides y planetas rocosos destruidos por fuerzas de marea.',
    descLevels: {
      primaria: '¡Es el corazón brillante que queda cuando una estrella como el Sol envejece! Tiene el tamaño de la Tierra, pero pesa tanto como el Sol entero.',
      secundaria: 'Las enanas blancas no realizan fusión nuclear; brillan por su calor residual latente durante miles de millones de años hasta enfriarse.',
      avanzado: 'Remanente estelar sostenido contra el colapso gravitatorio por presión de degeneración electrónica de Fermi. Su anillo circumestelar proviene de la disrupción planetaria por el límite de Roche.'
    },
    scaleComp: { ref: 'Tierra', sizeStr: '1.0x tamaño (diámetro terrestre)', massStr: '330,000x masa (densidad extrema)' },
    fun: '¡Una cuchara de materia tomada del corazón de esta pequeña estrella blanca pesaría en la Tierra tanto como un autobús escolar entero!'
  }
];

const CONSTELLATIONS = [
  {
    id: 'ursamajor', name: 'Osa Mayor (Ursa Major)', type: 'Constelación & Guía de Navegación',
    pos: [-220, 240, -320], color: 0x818cf8,
    stars: [
      { name: 'Dubhe', p: [-200, 260, -310], mag: 1.8 },
      { name: 'Merak', p: [-225, 230, -325], mag: 2.3 },
      { name: 'Phecda', p: [-240, 215, -340], mag: 2.4 },
      { name: 'Megrez', p: [-215, 235, -335], mag: 3.3 },
      { name: 'Alioth', p: [-190, 245, -350], mag: 1.7 },
      { name: 'Mizar', p: [-170, 255, -365], mag: 2.0 },
      { name: 'Alkaid', p: [-145, 260, -385], mag: 1.8 }
    ],
    lines: [[0,1], [1,2], [2,3], [3,0], [3,4], [4,5], [5,6]],
    desc: 'La Osa Mayor contiene "El Carro", una de las figuras celestes más reconocibles. Sus estrellas Merak y Dubhe actúan como punteros celestes directos hacia Polaris.',
    descLevels: {
      primaria: '¡El famoso Carro o Cazo del cielo norte! Si trazas una línea imaginaria entre sus dos estrellas delanteras, llegarás directo a la Estrella Polar.',
      secundaria: 'Cinco de las siete estrellas del Carro pertenecen a una misma asociación estelar en movimiento, nacidas juntas de una misma nube interestelar hace 300 millones de años.',
      avanzado: 'Asterismo de referencia en astrometría. Las misiones de exploración profunda como las sondas Voyager y New Horizons emplean rastreadores estelares (Star Trackers) calibrados con estas posiciones.'
    },
    scaleComp: { ref: 'Esfera Celeste', sizeStr: '128 grados cuadrados en el cielo norte', massStr: 'Cúmulo estelar de la Osa Mayor a 80 años luz' },
    facts: [
      'Merak y Dubhe señalan con precisión matemática la posición del Norte geográfico celeste.',
      'Alberga en su campo profunda la Galaxia de Bode (M81) y el Cigarro (M82).',
      'El telescopio espacial Hubble apuntó a una zona vacía de la Osa Mayor en 1995 para revelar miles de galaxias (Hubble Deep Field).'
    ],
    fun: '¡En la antigüedad los marineros, comerciantes y pioneros usaban este carro celestial como brújula natural para cruzar océanos sin perderse!'
  },
  {
    id: 'ursaminor', name: 'Osa Menor (Polaris)', type: 'Constelación & Eje Celeste Norte',
    pos: [0, 390, -210], color: 0x93c5fd,
    stars: [
      { name: 'Polaris (Estrella Polar)', p: [0, 405, -200], mag: 1.9 },
      { name: 'Kochab', p: [-15, 375, -220], mag: 2.0 },
      { name: 'Pherkad', p: [15, 365, -230], mag: 3.0 },
      { name: 'Yildun', p: [5, 390, -215], mag: 4.3 }
    ],
    lines: [[0,3], [3,1], [1,2]],
    desc: 'Su estrella principal, Polaris, está situada casi exactamente en la proyección del eje de rotación de la Tierra en el cielo del norte, por lo que parece permanecer inmóvil toda la noche.',
    descLevels: {
      primaria: '¡La Estrella Polar es la brújula del cielo! Mírala por la noche y siempre te indicará hacia dónde queda el Norte.',
      secundaria: 'Polaris es en realidad un sistema triple de estrellas y una supergigante amarilla palpitante (cefeida) que dista unos 433 años luz de nosotros.',
      avanzado: 'Debido a la precesión de los equinoccios (ciclo de 25,772 años), Polaris es temporalmente nuestra estrella polar; en el año 14000, Vega ocupará su lugar.'
    },
    scaleComp: { ref: 'Polaris vs Sol', sizeStr: '37x diámetro solar (Polaris Aa)', massStr: '5.4x masa solar (Supergigante F7Ib)' },
    facts: [
      'Punto estelar de orientación para navegantes terrestres, aéreos y astronáuticos.',
      'Su luminosidad es unas 2,500 veces superior al brillo de nuestro Sol.',
      'Las cámaras de navegación de la NASA en órbita terrestre verifican actitud con Polaris.'
    ],
    fun: '¡Aunque parece fija, la Tierra se tambalea lentamente como una peonza y dentro de miles de años tendremos otra estrella polar!'
  },
  {
    id: 'ori', name: 'Orión (El Cazador)', type: 'Constelación & Vivero Estelar',
    pos: [260, 40, -350], color: 0x38bdf8,
    stars: [
      { name: 'Betelgeuse', p: [240, 75, -340], mag: 0.5 },
      { name: 'Rigel', p: [280, 10, -360], mag: 0.1 },
      { name: 'Bellatrix', p: [275, 70, -345], mag: 1.6 },
      { name: 'Saiph', p: [245, 15, -355], mag: 2.0 },
      { name: 'Alnitak', p: [255, 42, -350], mag: 1.7 },
      { name: 'Alnilam', p: [260, 42, -350], mag: 1.7 },
      { name: 'Mintaka', p: [265, 42, -350], mag: 2.2 }
    ],
    lines: [[0,4], [2,6], [4,5], [5,6], [4,3], [6,1], [0,2], [1,3]],
    desc: 'Una de las constelaciones más emblemáticas y visibles desde ambos hemisferios. En su espada alberga la Nebulosa de Orión (M42), una cuna de formación estelar analizada en detalle por los telescopios Hubble y James Webb.',
    descLevels: {
      primaria: '¡El gran cazador celeste con su cinturón de tres estrellas! En su hombro brilla Betelgeuse de color naranja y en su pie brilla Rigel azul.',
      secundaria: 'Betelgeuse es una supergigante roja a punto de estallar en supernova. En el centro de Orión se encuentra M42, la fábrica de estrellas más cercana a la Tierra.',
      avanzado: 'La Nebulosa de Orión (M42) a 1,344 años luz es un laboratorio astrofísico prioritario. El telescopio James Webb ha relevado discos protoplanetarios y enanas marrones en su centro (cúmulo del Trapecio).'
    },
    scaleComp: { ref: 'Betelgeuse vs Sol', sizeStr: '~764x diámetro solar', massStr: '16.5x masa solar' },
    facts: [
      'El Cinturón de Orión (Alnitak, Alnilam, Mintaka) guía hacia Sirio y Aldebarán.',
      'El Telescopio Espacial James Webb descubrió en M42 más de 500 candidatos a planetas vagabundos (JUMBOs).',
      'Betelgeuse es tan grande que si se ubicara en el lugar del Sol, llegaría hasta el cinturón de asteroides.'
    ],
    fun: '¡Cuando Betelgeuse explote como supernova, brillará en nuestro cielo de día durante meses con el brillo de la Luna llena!'
  },
  {
    id: 'cassiopeia', name: 'Casiopea (La Reina W)', type: 'Constelación & Remanente de Supernova',
    pos: [180, 310, -260], color: 0xa855f7,
    stars: [
      { name: 'Schedar', p: [165, 320, -250], mag: 2.2 },
      { name: 'Caph', p: [150, 300, -260], mag: 2.3 },
      { name: 'Gamma Cas', p: [185, 330, -255], mag: 2.1 },
      { name: 'Ruchbah', p: [200, 310, -265], mag: 2.7 },
      { name: 'Segin', p: [215, 295, -270], mag: 3.3 }
    ],
    lines: [[1,0], [0,2], [2,3], [3,4]],
    desc: 'Reconocible por su inconfundible forma en "W" o "M" en el cielo del hemisferio norte. En su interior se encuentra Cassiopeia A, el remanente de una colosal supernova observada en el siglo XVII.',
    descLevels: {
      primaria: '¡Se parece a una letra W gigante dibujada con estrellas! Está justo en el lado opuesto a la Osa Mayor respecto a la Estrella Polar.',
      secundaria: 'Alberga a Cassiopeia A, la fuente de ondas de radio y rayos X más potente del cielo más allá de nuestro Sistema Solar, producto de una explosión estelar masiva.',
      avanzado: 'El remanente Cassiopeia A fue la primera imagen oficial capturada por el observatorio de rayos X Chandra de la NASA en 1999 y re-estudiada por el James Webb en infrarrojo medio.'
    },
    scaleComp: { ref: 'Cassiopeia A', sizeStr: '10 años luz de diámetro en expansión', massStr: 'Proyectada a 4,000 - 6,000 km/s' },
    facts: [
      'Su estrella central Gamma Cassiopeiae es un rotador rápido que emite anillos de gas.',
      'Cassiopeia A reveló cómo las supernovas sintetizan y dispersan hierro y oxígeno en el cosmos.',
      'Visible todo el año desde hemisferio norte por ser una constelación circumpolar.'
    ],
    fun: '¡La luz de la explosión estelar de Cassiopeia A viajó durante 11,000 años antes de llegar a la Tierra hace apenas 300 años!'
  },
  {
    id: 'cygnus', name: 'Cisne (La Cruz del Norte & Cygnus X-1)', type: 'Constelación & Primer Agujero Negro Confirmado',
    pos: [-280, 280, -210], color: 0x60a5fa,
    stars: [
      { name: 'Deneb', p: [-295, 305, -200], mag: 1.25 },
      { name: 'Albireo', p: [-260, 255, -225], mag: 3.0 },
      { name: 'Sadr', p: [-280, 280, -210], mag: 2.2 },
      { name: 'Gienah', p: [-305, 275, -215], mag: 2.5 },
      { name: 'Delta Cygni', p: [-265, 295, -205], mag: 2.9 }
    ],
    lines: [[0,2], [2,1], [3,2], [2,4]],
    desc: 'El majestuoso Cisne volando a lo largo de la Vía Láctea. Contiene la estrella supergigante blanca Deneb y el sistema Cygnus X-1, el primer agujero negro estelar descubierto y confirmado en la historia de la exploración espacial.',
    descLevels: {
      primaria: '¡Una cruz gigante que vuela en el cielo de verano! Su estrella más brillante es Deneb, que forma parte del Triángulo de Verano.',
      secundaria: 'En esta constelación se descubrió Cygnus X-1: un agujero negro que devora gas de una estrella compañera supergigante azul emitiendo intensos rayos X.',
      avanzado: 'Cygnus X-1 (a 7,200 años luz) alberga un agujero negro de 21 masas solares en órbita cerrada (5.6 días) con HDE 226868, verificado por satélites Uhuru y telescopios espaciales de rayos X.'
    },
    scaleComp: { ref: 'Deneb vs Sol', sizeStr: '~203x diámetro solar', massStr: '19x masa solar (Supergigante A2Ia)' },
    facts: [
      'Deneb es una de las estrellas más luminosas conocidas (brilla 200,000 veces más que el Sol).',
      'Cygnus X-1 fue el objeto de una famosa apuesta entre Stephen Hawking y Kip Thorne en 1975.',
      'Albireo es un sistema binario visual de contraste oro y azul zafiro.'
    ],
    fun: '¡Stephen Hawking apostó que Cygnus X-1 no era un agujero negro y tuvo que pagar su apuesta en 1990 cuando las misiones espaciales confirmaron que sí lo era!'
  },
  {
    id: 'crux', name: 'Cruz del Sur (Crux Australis)', type: 'Constelación & Guía del Sur',
    pos: [-150, -320, -290], color: 0xf43f5e,
    stars: [
      { name: 'Acrux', p: [-150, -340, -285], mag: 0.77 },
      { name: 'Mimosa', p: [-135, -315, -295], mag: 1.25 },
      { name: 'Gacrux', p: [-150, -300, -290], mag: 1.64 },
      { name: 'Imai', p: [-165, -320, -290], mag: 2.8 }
    ],
    lines: [[0,2], [1,3]],
    desc: 'La constelación más pequeña pero una de las más emblemáticas del cielo austral. Sus estrellas guían el eje hacia el polo sur celeste y marcan la famosa nebulosa oscura del Saco de Carbón.',
    descLevels: {
      primaria: '¡La cruz brillante del hemisferio sur! Aparece en las banderas de países como Brasil, Australia y Nueva Zelanda.',
      secundaria: 'El eje mayor entre Gacrux y Acrux apunta hacia el polo sur celeste. Junto a ella descansa el Saco de Carbón, una nube oscura interestelar.',
      avanzado: 'Acrux es un sistema estelar múltiple con supergigantes calientes tipo B. Constituye un hito de calibración para misiones astronómicas australes y telescopios en el desierto de Atacama.'
    },
    scaleComp: { ref: 'Acrux A vs Sol', sizeStr: '7.8x diámetro solar', massStr: '18x masa solar' },
    facts: [
      'Constelación más compacta de las 88 reconocidas por la Unión Astronómica Internacional.',
      'Su estrella superior Gacrux es una gigante roja situada a solo 88 años luz.',
      'Símbolo histórico de navegación interoceánica para navegantes del Pacífico y Atlántico Sur.'
    ],
    fun: '¡Aunque es la más diminuta de todas las constelaciones, es tan famosa que aparece en la bandera de cinco naciones del mundo!'
  },
  {
    id: 'scorpius', name: 'Escorpión (Scorpius & Antares)', type: 'Constelación & Supergigante Roja',
    pos: [300, -200, -280], color: 0xf97316,
    stars: [
      { name: 'Antares', p: [290, -185, -275], mag: 0.96 },
      { name: 'Graffias', p: [275, -165, -290], mag: 2.6 },
      { name: 'Dschubba', p: [280, -175, -285], mag: 2.3 },
      { name: 'Sargas', p: [315, -225, -275], mag: 1.8 },
      { name: 'Shaula', p: [325, -240, -270], mag: 1.6 },
      { name: 'Lesath', p: [325, -245, -272], mag: 2.7 }
    ],
    lines: [[1,2], [2,0], [0,3], [3,4], [4,5]],
    desc: 'El impresionante Escorpión del cielo veraniego, dominado en su corazón por Antares, una supergigante roja hipermasiva de color rubí.',
    descLevels: {
      primaria: '¡Tiene forma de escorpión real con una cola en gancho y un corazón rojo brillante llamado Antares!',
      secundaria: 'Antares significa "el rival de Marte" por su intenso color rojo. Es una estrella que está al final de su vida expulsando vientos estelares masivos.',
      avanzado: 'Antares (a 550 años luz) es una supergigante M1.5Iab que alberga un sistema binario con Antares B. Su atmósfera extendida ha sido cartografiada por interferometría infrarroja de alta resolución.'
    },
    scaleComp: { ref: 'Antares vs Sol', sizeStr: '~680x diámetro solar (Engulliría a Marte)', massStr: '12x masa solar' },
    facts: [
      'En la cola del escorpión brillan las estrellas Shaula y Lesath ("El aguijón").',
      'Antares es una de las pocas estrellas cuya superficie y vientos han sido fotografiados en detalle.',
      'Rica región en cúmulos globulares como M4 y M80 explorados por telescopios espaciales.'
    ],
    fun: '¡Si pusieras a Antares en el centro de nuestro Sistema Solar, nos comería a nosotros, a Marte y al cinturón de asteroides!'
  },
  {
    id: 'centaurus', name: 'Centauro (Próxima Centauri)', type: 'Constelación & Vecino Estelar Más Cercano',
    pos: [-260, -220, -310], color: 0x34d399,
    stars: [
      { name: 'Alfa Centauri A/B', p: [-250, -235, -300], mag: -0.27 },
      { name: 'Próxima Centauri', p: [-245, -240, -295], mag: 11.0 },
      { name: 'Hadar (Beta Centauri)', p: [-270, -225, -315], mag: 0.61 },
      { name: 'Menkent', p: [-280, -205, -320], mag: 2.06 }
    ],
    lines: [[0,2], [2,3], [0,1]],
    desc: 'El Centauro austral alberga a Alfa Centauri y Próxima Centauri (a solo 4.24 años luz), el sistema estelar más cercano a la Tierra y objetivo primordial de las futuras misiones de exploración interestelar.',
    descLevels: {
      primaria: '¡En esta constelación vive nuestra estrella vecina más cercana! Se llama Próxima Centauri y está justo al lado de nuestro Sistema Solar.',
      secundaria: 'Alfa Centauri es un sistema triple. Alrededor de la pequeña enana roja Próxima Centauri orbita Próxima b, un exoplaneta rocoso en la zona habitable.',
      avanzado: 'Próxima Centauri y su exoplaneta Próxima b (descubierto en 2016 por ESO) son el objetivo de la iniciativa de sondas láser ultraligeras Breakthrough Starshot para viajar a 0.2c.'
    },
    scaleComp: { ref: 'Próxima Centauri vs Sol', sizeStr: '0.15x diámetro solar', massStr: '0.12x masa solar (Enana roja M5.5Ve)' },
    facts: [
      'Próxima Centauri está a 4.24 años luz (~40 billones de kilómetros).',
      'Contiene el cúmulo globular Omega Centauri, conteniendo diez millones de estrellas.',
      'El planeta Próxima b tiene una masa similar a la Tierra y recibe agua líquida potencial.'
    ],
    fun: '¡Con un cohete actual tardaríamos unos 70,000 años en llegar a Próxima Centauri, pero con velas láser interestelares podríamos llegar en solo 20 años!'
  },
  {
    id: 'pegasus', name: 'Pegaso (El Gran Cuadrado & 51 Pegasi)', type: 'Constelación & Primer Exoplaneta Solar',
    pos: [320, 190, -250], color: 0xe2e8f0,
    stars: [
      { name: 'Markab', p: [305, 175, -245], mag: 2.49 },
      { name: 'Scheat', p: [310, 215, -255], mag: 2.44 },
      { name: 'Algenib', p: [335, 180, -240], mag: 2.84 },
      { name: 'Alpheratz', p: [335, 210, -250], mag: 2.07 }
    ],
    lines: [[0,1], [1,3], [3,2], [2,0]],
    desc: 'Famosa por su "Gran Cuadrado" de cuatro estrellas prominentes. En esta constelación se descubrió en 1995 el planeta 51 Pegasi b ("Dimidio"), marcando el nacimiento de la búsqueda espacial de exoplanetas.',
    descLevels: {
      primaria: '¡El caballo alado mitológico con un gran cuadrado brillante en su cuerpo! Aquí los astrónomos descubrieron el primer planeta fuera de nuestro sistema solar.',
      secundaria: '51 Pegasi b fue el primer exoplaneta descubierto alrededor de una estrella como el Sol. Es un "Júpiter caliente" que orbita su estrella en solo 4 días.',
      avanzado: 'El descubrimiento de 51 Pegasi b por Michel Mayor y Didier Queloz (Premio Nobel 2019) impulsó misiones espaciales como Kepler, TESS y James Webb para espectroscopía exoplanetaria.'
    },
    scaleComp: { ref: '51 Pegasi b', sizeStr: '1.9x radio de Júpiter', massStr: '0.47x masa de Júpiter (Júpiter caliente)' },
    facts: [
      'El Gran Cuadrado de Pegaso sirve para localizar la Galaxia de Andrómeda (M31).',
      'Su estrella Scheat es una gigante roja variable a 196 años luz.',
      'Las misiones de exploración TESS y Kepler han hallado más de 5,500 exoplanetas gracias al camino abierto aquí.'
    ],
    fun: '¡En 51 Pegasi b hace tanto calor (más de 1,000 °C) que el hierro se evapora y llueve hierro fundido en su atmósfera!'
  },
  {
    id: 'canismajor', name: 'Can Mayor (Sirio)', type: 'Constelación & La Estrella Más Brillante',
    pos: [190, -160, -370], color: 0xfef08a,
    stars: [
      { name: 'Sirio (Sirius A/B)', p: [180, -145, -360], mag: -1.46 },
      { name: 'Mirzam', p: [170, -170, -375], mag: 1.98 },
      { name: 'Wezen', p: [205, -175, -375], mag: 1.83 },
      { name: 'Adhara', p: [195, -195, -370], mag: 1.5 }
    ],
    lines: [[0,1], [0,2], [2,3]],
    desc: 'El Can Mayor acompaña a Orión en la bóveda celeste. Su joya suprema es Sirio, la estrella más brillante de todo el cielo nocturno y hogar de Sirio B, la primera enana blanca estudiada por la astrofísica.',
    descLevels: {
      primaria: '¡Sirio es la estrella más brillante de todo el cielo nocturno! Brilla con destellos blancos y azules brillantes como un diamante.',
      secundaria: 'A solo 8.6 años luz, Sirio es un sistema binario. Sirio A es una estrella blanca caliente, y su compañera Sirio B es un pequeño núcleo comprimido de una estrella muerta.',
      avanzado: 'Sirio B fue confirmada por Walter Adams en 1915 como enana blanca degenerada, validando experimentalmente el desplazamiento al rojo gravitacional predicho por Einstein.'
    },
    scaleComp: { ref: 'Sirio A vs Sol', sizeStr: '1.71x diámetro solar', massStr: '2.06x masa solar (25x más luminosa)' },
    facts: [
      'Magnitud visual de -1.46, solo superada en brillo aparente por el Sol, la Luna y planetas como Venus o Júpiter.',
      'Su enana blanca Sirio B tiene la masa del Sol en el tamaño del planeta Tierra.',
      'El telescopio espacial Hubble ha fotografiado el sistema orbital binario A/B en alta resolución.'
    ],
    fun: '¡Los antiguos egipcios basaron su calendario en la primera aparición de Sirio antes del amanecer, porque anunciaba la crecida anual del río Nilo!'
  },
  {
    id: 'taurus', name: 'Tauro (Aldebarán & Las Pléyades)', type: 'Constelación & Cúmulo de Las Pléyades',
    pos: [350, 110, -260], color: 0xfde047,
    stars: [
      { name: 'Aldebarán', p: [340, 95, -250], mag: 0.85 },
      { name: 'Elnath', p: [365, 135, -265], mag: 1.65 },
      { name: 'Las Pléyades (M45)', p: [355, 125, -255], mag: 1.6 },
      { name: 'Híades', p: [335, 105, -252], mag: 3.0 }
    ],
    lines: [[0,1], [0,2], [0,3]],
    desc: 'Una de las constelaciones del zodiaco astronómico del cielo de invierno. Destaca el ojo naranja del toro (Aldebarán) y el cúmulo abierto de Las Pléyades (Las Siete Hermanas), y el remanente de la Nebulosa del Cangrejo (M1).',
    descLevels: {
      primaria: '¡El toro celeste que guarda a Las Pléyades, el racimo de estrellas bebé más bonito del cielo nocturno!',
      secundaria: 'Las Pléyades (M45) son un cúmulo estelar joven compuesto por estrellas azules muy calientes rodeadas de nubes de polvo interestelar que reflejan su luz azulada.',
      avanzado: 'Tauro contiene la Nebulosa del Cangrejo (M1), remanente de la supernova SN 1054 con el Púlsar del Cangrejo en su interior, calibrador fundamental en astrofísica de rayos gamma y satélites espaciales.'
    },
    scaleComp: { ref: 'Aldebarán vs Sol', sizeStr: '44x diámetro solar', massStr: '1.16x masa solar (Gigante naranja K5III)' },
    facts: [
      'Las Pléyades se encuentran a 444 años luz y son visibles a simple vista como 6 o 7 estrellas.',
      'En la mitología de Japón, el cúmulo de Las Pléyades se conoce con el nombre de "Subaru".',
      'El Púlsar del Cangrejo gira 30 veces por segundo y fue estudiado a fondo por el observatorio Fermi de la NASA.'
    ],
    fun: '¡La marca de coches Subaru lleva en su logotipo las seis estrellas principales del cúmulo de Las Pléyades de Tauro!'
  },
  {
    id: 'leo', name: 'León (Régulo & La Hoz)', type: 'Constelación & Estrella Ultrarrápida',
    pos: [-340, 90, -280], color: 0xfcd34d,
    stars: [
      { name: 'Régulo (Regulus)', p: [-325, 75, -270], mag: 1.36 },
      { name: 'Algieba', p: [-340, 95, -280], mag: 2.08 },
      { name: 'Denebola', p: [-360, 105, -290], mag: 2.14 },
      { name: 'Zosma', p: [-350, 115, -285], mag: 2.56 },
      { name: 'Rasalas', p: [-335, 110, -275], mag: 3.8 }
    ],
    lines: [[0,1], [1,4], [1,3], [3,2], [0,3]],
    desc: 'El majestuoso León celeste, reconocible por la "Hoz" o signo de interrogación invertido en su cabeza. Su estrella principal, Régulo, gira a una velocidad tan vertiginosa que es notablemente ovalada.',
    descLevels: {
      primaria: '¡Tiene forma de un león acostado! Su estrella más brillante está en su corazón y se llama Régulo, el pequeño rey.',
      secundaria: 'Régulo rota sobre sí misma en solo 15.9 horas (el Sol tarda 27 días), provocando que su ecuador sobresalga y su forma sea un huevo achatado.',
      avanzado: 'La forma achatada y la distribución de temperatura por gravedad de Régulo fueron medidas directamente mediante interferometría espacial (CHARA Array).'
    },
    scaleComp: { ref: 'Régulo A vs Sol', sizeStr: '3.09x diámetro ecuatorial vs 2.4x polar', massStr: '3.8x masa solar' },
    facts: [
      'Rotación extrema a 317 km/s (el 86% de la velocidad límite en la que la estrella se rompería por fuerza centrífuga).',
      'Contiene el Triángulo de Leo de galaxias (M65, M66 y NGC 3628) fotografiadas por telescopios espaciales.',
      'Es el origen radiante de la lluvia de meteoros de las Leónidas cada mes de noviembre.'
    ],
    fun: '¡Régulo gira tan rápido que si acelerara solo un 14% más, saldría volando en pedazos al espacio!'
  }
];

const TOURS = {
  estrellas: {
    title: 'El Ciclo de Vida de las Estrellas',
    desc: 'Un viaje a través de las etapas evolutivas estelares: desde el nacimiento y el esplendor en secuencia principal hasta sus destinos relativistas.',
    steps: [
      { id: 'sol', title: '1. El Sol — Secuencia Principal', type: 'planet' },
      { id: 'gigante', title: '2. Gigante Roja — La Expansión Final', type: 'deep' },
      { id: 'enana', title: '3. Enana Blanca — El Núcleo Degenerado', type: 'deep' },
      { id: 'pulsar', title: '4. Púlsar de Neutrones — El Faro Cósmico', type: 'deep' },
      { id: 'agujero', title: '5. Agujero Negro — La Singularidad Relativista', type: 'deep' }
    ]
  },
  constelaciones: {
    title: 'Cielo Estrellado & Exploración Espacial',
    desc: 'Recorre las principales constelaciones celestes, mitología y sus vínculos con los hitos de la exploración espacial.',
    steps: [
      { id: 'ursamajor', title: '1. Osa Mayor — La Gran Guía Celeste', type: 'constelacion' },
      { id: 'ursaminor', title: '2. Osa Menor — Polaris y la Navegación Astronáutica', type: 'constelacion' },
      { id: 'ori', title: '3. Orión — Viveros Estelares y el Telescopio Webb', type: 'constelacion' },
      { id: 'cygnus', title: '4. Cisne — Cygnus X-1 y el Primer Agujero Negro Confirmado', type: 'constelacion' },
      { id: 'centaurus', title: '5. Centauro — Próxima Centauri y la Exploración Interestelar', type: 'constelacion' },
      { id: 'pegasus', title: '6. Pegaso — 51 Pegasi b y la Revolución Exoplanetaria', type: 'constelacion' }
    ]
  },
  relativista: {
    title: 'Astrofísica Relativista: Agujeros Negros de Kerr & Púlsares',
    desc: 'Explora la física extrema del espacio-tiempo, el efecto Doppler relativista en discos de acreción y los chorros de sincrotrón.',
    steps: [
      { id: 'agujero', title: '1. Agujero Negro de Kerr — Doppler Beaming & Lentes Gravitacionales', type: 'deep' },
      { id: 'pulsar', title: '2. Púlsar Magnetizado — Haces de Sincrotrón a 30 Hz', type: 'deep' },
      { id: 'enana', title: '3. Enana Blanca — Presión de Degeneración de Fermi', type: 'deep' },
      { id: 'cygnus', title: '4. Cygnus X-1 — Evidencia Observacional de Rayos X', type: 'constelacion' }
    ]
  },
  oceanos: {
    title: 'Mundos Océano y Habitalidad en el Sistema Solar',
    desc: 'Explora los planetas clave y gigantes que protegen y sostienen la hidrosfera en el Sistema Solar.',
    steps: [
      { id: 'tierra', title: '1. La Tierra — El Planeta Azul', type: 'planet' },
      { id: 'marte', title: '2. Marte — Océanos del Pasado', type: 'planet' },
      { id: 'jupiter', title: '3. Júpiter y sus Lunas Heladas (Europa & Ganimedes)', type: 'planet' },
      { id: 'saturno', title: '4. Saturno y Encélado', type: 'planet' },
      { id: 'neptuno', title: '5. Neptuno — El Gigante de Hielo', type: 'planet' }
    ]
  },
  gigantes: {
    title: 'Los Colosos del Sistema Solar',
    desc: 'Recorre los gigantes gaseosos y helados que dominan gravitacionalmente nuestro vecindario estelar.',
    steps: [
      { id: 'jupiter', title: '1. Júpiter — El Rey de los Planetas', type: 'planet' },
      { id: 'saturno', title: '2. Saturno — La Joya de los Anillos', type: 'planet' },
      { id: 'urano', title: '3. Urano — El Gigante Inclinado', type: 'planet' },
      { id: 'neptuno', title: '4. Neptuno — Tormentas Supersónicas', type: 'planet' }
    ]
  }
};

const QUIZ = [
  {
    q: '¿Qué planeta tiene un día que dura más que su propio año?',
    opts: ['Venus', 'Mercurio', 'Marte', 'Júpiter'],
    ans: 0,
    exp: 'Venus gira tan despacio sobre su propio eje (243 días terrestres) que su día dura más que el tiempo que tarda en orbitar alrededor del Sol (225 días).'
  },
  {
    q: '¿Por qué brilla en blanco-cyan intenso un lado del disco del Agujero Negro Relativista de Kerr y el lado opuesto se enrojece?',
    opts: [
      'Por el efecto Doppler relativista (Beaming) al acercarse el plasma orbital a velocidades cercanas a la de la luz',
      'Porque el Sol lo ilumina únicamente desde la izquierda',
      'Por la atracción magnética de un púlsar cercano',
      'Porque el lado rojo está cubierto por nubes de polvo frío exclusivamente'
    ],
    ans: 0,
    exp: 'En un agujero negro de Kerr en rotación, el haz relativista (Doppler beaming) hace que el gas que gira hacia el observador a velocidades próximas a c aumente drásticamente su brillo y frecuencia (azul/blanco), mientras que el lado que se aleja sufre desplazamiento al rojo.'
  },
  {
    q: '¿Qué constelación alberga a Cygnus X-1, el primer agujero negro de masa estelar confirmado en la historia de la exploración espacial?',
    opts: ['Cisne (Cygnus)', 'Orión', 'Osa Mayor', 'Escorpión'],
    ans: 0,
    exp: 'En la constelación del Cisne se descubrió Cygnus X-1 en 1964 mediante observatorios de rayos X en cohetes suborbitales y satélites espaciales, confirmando la existencia real de los agujeros negros.'
  },
  {
    q: '¿Por qué la Estrella Polar (Polaris) en la Osa Menor es tan importante para la navegación espacial y marítima?',
    opts: [
      'Porque está situada casi exactamente en la línea del eje de rotación norte de la Tierra y parece fija en el cielo',
      'Porque es la estrella más brillante de todo el universo conocido',
      'Porque es el único cuerpo celeste que cambia de color cada hora',
      'Porque está dentro de nuestro propio Sistema Solar'
    ],
    ans: 0,
    exp: 'Al alinearse con el eje norte terrestre, Polaris no parece girar durante la noche, sirviendo como brújula confiable tanto para navegantes como para los sensores estelares de naves espaciales.'
  },
  {
    q: '¿Cuál es el sistema estelar más cercano a nuestro Sistema Solar a solo 4.24 años luz de distancia?',
    opts: [
      'Próxima Centauri (en la constelación del Centauro)',
      'Betelgeuse (en Orión)',
      'Sirio (en el Can Mayor)',
      'Deneb (en el Cisne)'
    ],
    ans: 0,
    exp: 'Próxima Centauri es una enana roja ubicada a solo 4.24 años luz en la constelación del Centauro y alberga el planeta habitado candidato Próxima b, objetivo de futuras sondas interestelares.'
  },
  {
    q: '¿Cuál es el planeta con la velocidad de viento más alta del Sistema Solar (hasta 2,100 km/h)?',
    opts: ['Neptuno', 'Júpiter', 'Saturno', 'Urano'],
    ans: 0,
    exp: 'A pesar de estar a gran distancia del Sol, Neptuno posee los vientos más violentos y supersónicos medidos en el Sistema Solar, superando los 2,100 km/h.'
  },
  {
    q: '¿Por qué flotaría Saturno si existiera una piscina con suficiente agua para contenerlo?',
    opts: [
      'Porque su densidad media es menor que la del agua',
      'Porque sus anillos le sirven de flotador',
      'Porque no tiene gravedad propia',
      'Porque está hecho de hielo puramente'
    ],
    ans: 0,
    exp: 'Saturno es el planeta menos denso del Sistema Solar (0.687 g/cm³), por lo que es inferior a la densidad del agua (1.0 g/cm³).'
  }
];

