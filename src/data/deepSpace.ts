export interface DeepSpaceObjectData {
  id: string;
  name: string;
  icon: string;
  type: string;
  pos: [number, number, number];
  distanceLy: string;
  constellation: string;
  catalogId: string;
  isGrrtBlackHole?: boolean;
  hasPulsarBeams?: boolean;
  hasAccretionDisk?: boolean;
  isDarkMatterWeb?: boolean;
  color: number;
  edu: {
    infantil: {
      summary: string;
      facts: string[];
      funFact: string;
    };
    jovenes: {
      summary: string;
      facts: string[];
      experiment: string;
    };
    adultos: {
      summary: string;
      facts: string[];
      physicsLaw: string;
    };
  };
}

export const DEEP_SPACE_OBJECTS: DeepSpaceObjectData[] = [
  {
    id: 'gargantua',
    name: 'Gargantua / M87* (Agujero Negro Relativista)',
    icon: '⚫',
    type: 'Agujero Negro Supermasivo (Singularidad de Kerr)',
    pos: [42, 6, -18],
    distanceLy: '53.5 millones de años luz (M87*)',
    constellation: 'Virgo',
    catalogId: 'NGC 4486 / EHT-2019',
    isGrrtBlackHole: true,
    hasAccretionDisk: true,
    color: 0xff6b35,
    edu: {
      infantil: {
        summary: 'Un agujero negro gigante con tanta fuerza de gravedad que ni siquiera la luz puede escapar de él.',
        facts: [
          'Aunque el centro es oscuro, el gas que gira alrededor brilla como un anillo de fuego cósmico.',
          'Si un reloj cayera cerca de él, lo verías moverse más despacio por culpa de la gravedad.',
          '¡El Telescopio del Horizonte de Sucesos (EHT) logró tomarle una fotografía en 2019!'
        ],
        funFact: 'La gravedad curva los rayos de luz alrededor del agujero negro, ¡permitiéndote ver la parte de atrás de su anillo!'
      },
      jovenes: {
        summary: 'Singularidad rotacional gobernada por la métrica de Kerr con disco de acreción caliente y jets relativistas.',
        facts: [
          'Su masa supera las 6,500 millones de masas solares en el centro de la galaxia elíptica M87.',
          'El efecto Doppler relativista hace que el lado del disco que avanza hacia el observador brille mucho más (beaming).',
          'Su sombra interior corresponde al diámetro del horizonte de sucesos aumentado en 1.4x por la curvatura geodésica.'
        ],
        experiment: 'Reto de Raytracing GRRT: Abre el Simulador GRRT y ajusta el espín del agujero negro (a/M) para observar cómo se deforma la sombra.'
      },
      adultos: {
        summary: 'Solución exacta de las ecuaciones de campo de Einstein (Métrica de Kerr-Newman) con transporte radiativo general relativista (GRRT).',
        facts: [
          'Radio del Horizonte de Sucesos de Schwarzschild: r_s = 2GM/c² ~ 19.5 billones de km para M87*.',
          'Los fotones siguen trayectorias geodésicas nulas resolubles numéricamente con la Ecuación de Binet.',
          'El proceso Blandford–Znajek extrae energía rotacional de la ergosfera generando chorros relativistas magnetizados.'
        ],
        physicsLaw: 'Métrica Geodésica de Kerr y Desplazamiento al Rojo Gravitacional: z = (1 - 2GM/rc²)⁻¹/² - 1.'
      }
    }
  },
  {
    id: 'gigante_roja',
    name: 'Betelgeuse (Gigante Roja)',
    icon: '🔴',
    type: 'Supergigante Roja (M1-2Ia-Iab)',
    pos: [-40, 10, -22],
    distanceLy: '642.5 años luz',
    constellation: 'Orión',
    catalogId: 'α Orionis / HIP 27989',
    color: 0xe8552e,
    edu: {
      infantil: {
        summary: 'Una estrella vieja gigantesca en el hombro de la constelación de Orión que brilla en color rojo.',
        facts: [
          'Es tan enorme que si la pusieras en el lugar del Sol, ¡se tragaría a Mercurio, Venus, la Tierra y Marte!',
          'Algún día explotará como una supernova súper brillante y formará una hermosa nube estelar.',
          'Nuestro propio Sol se convertirá en una gigante roja en el futuro.'
        ],
        funFact: 'Cuando Betelgeuse explote, se podrá ver de día en el cielo de la Tierra durante semanas.'
      },
      jovenes: {
        summary: 'Estrella en fase avanzada de evolución habiendo agotado el hidrógeno en su núcleo y fusionando helio y carbono.',
        facts: [
          'Su brillo pulsa y varía de forma semirregular con un periodo de unos 400 días.',
          'En 2019-2020 sufrió un oscurecimiento histórico provocado por una eyección masiva de polvo estelar.',
          'Su diámetro oscila entre 700 y 1,000 veces el radio solar.'
        ],
        experiment: 'Reto Espectral: ¿Por qué las estrellas súper grandes y frías (3,500 K) emiten luz principalmente en el rojo e infrarrojo?'
      },
      adultos: {
        summary: 'Supergigante roja pulsante perdiendo masa a un ritmo de 10⁻⁶ M_☉ por año mediante viento estelar impulsado por radiación.',
        facts: [
          'Su destino evolutivo inminente (<100,000 años) es el colapso gravitatorio del núcleo de hierro en una Supernova Tipo II-P.',
          'Las observaciones del interferómetro VLTI han resuelto penachos de convección que abarcan gran parte de su fotosfera.',
          'Temperatura efectiva media: ~3,600 K con luminosidad 126,000 veces la solar.'
        ],
        physicsLaw: 'Límite de Eddington y Pulsaciones Estelares por el Mecanismo Kappa (κ).'
      }
    }
  },
  {
    id: 'pulsar',
    name: 'Púlsar del Cangrejo (PSR B0531+21)',
    icon: '💫',
    type: 'Estrella de Neutrones Magnetizada Rotatoria',
    pos: [26, 14, -36],
    distanceLy: '6,500 años luz',
    constellation: 'Tauro',
    catalogId: 'M1 / NGC 1952 / SN 1054',
    hasPulsarBeams: true,
    color: 0x8be9fd,
    edu: {
      infantil: {
        summary: 'Una estrella muerta súper diminuta que gira ultra rápido lanzando rayos de luz como un faro cósmico.',
        facts: [
          'Gira sobre sí misma ¡30 veces por cada segundo!',
          'Es tan compacta que toda una estrella entera está apretada en el tamaño de una ciudad como Madrid o Ciudad de México.',
          'Nació de una gran explosión estelar observada por astrónomos chinos en el año 1054.'
        ],
        funFact: 'Una sola cucharadita de materia de un púlsar pesaría tanto como una montaña entera en la Tierra.'
      },
      jovenes: {
        summary: 'Remanente ultradenso del colapso de una supernova con un campo magnético del orden de 10⁸ Teslas.',
        facts: [
          'Sus haces electromagnéticos barren el espacio; cuando apuntan hacia la Tierra los detectamos como pulsos periódicos.',
          'La energía de su rotación acelera electrones a velocidades casi lumínicas provocando radiación sincrotrón en la nebulosa.',
          'Su velocidad de giro disminuye lentamente (frenado magnético) en unos 38 nanosegundos por día.'
        ],
        experiment: 'Reto de Densidad: Calcula la densidad media de una esfera de 10 km de radio que contiene 1.4 masas solares.'
      },
      adultos: {
        summary: 'Estrella de neutrones sustentada por presión de degeneración de neutrones con superfluidez interna.',
        facts: [
          'Periodo de rotación: 33.39 milisegundos con frenado dipolar electromagnético.',
          'Presenta glitches (aceleraciones súbitas del giro) asociados al desacoplamiento entre la corteza sólida cristalina y el vórtice superfluido interior.',
          'Foco emisor de rayos gamma e infrarrojos de máxima precisión relojera astronómica.'
        ],
        physicsLaw: 'Radiación Dipolar Magnética y Presión de Degeneración de Neutrones de Fermi-Dirac.'
      }
    }
  },
  {
    id: 'materia_oscura',
    name: 'Red Cósmica & Materia Oscura',
    icon: '🕸️',
    type: 'Estructura a Gran Escala del Universo',
    pos: [0, -18, -48],
    distanceLy: 'Escala Universal (>1,000 millones años luz)',
    constellation: 'Cosmos Universal',
    catalogId: 'ΛCDM Cosmic Web',
    isDarkMatterWeb: true,
    color: 0xbd93f9,
    edu: {
      infantil: {
        summary: 'El esqueleto invisible del universo que mantiene unidas a las galaxias como una telaraña mágica gigante.',
        facts: [
          'La materia oscura no se puede ver con ojos ni telescopios normales, pero sabemos que está ahí por su gravedad.',
          'Sin su fuerza invisible, las galaxias girarían tan rápido que saldrían disparadas por el espacio.',
          'Las galaxias brillan en los nodos donde los hilos de esta telaraña invisible se cruzan.'
        ],
        funFact: 'El 85% de toda la materia en el universo es materia oscura, ¡la materia normal es solo una pequeña minoría!'
      },
      jovenes: {
        summary: 'Entramado de filamentos de materia oscura fría sobre los que colapsa la materia bariónica formando supercúmulos.',
        facts: [
          'Se detecta empíricamente mediante curvas de rotación galáctica planas y lentes gravitacionales débiles.',
          'La Energía Oscura actúa en dirección opuesta, acelerando la expansión del espacio vacío entre galaxias.',
          'Las supercomputadoras han simulado esta red cósmica coincidiendo perfectamente con censos del Hubble y James Webb.'
        ],
        experiment: 'Reto Gravitacional: Explica cómo la curva de rotación orbital de una galaxia demuestra que hay masa que no brilla.'
      },
      adultos: {
        summary: 'Modelo Cosmológico de Consenso ΛCDM (Lambda Cold Dark Matter) regido por fluctuaciones primordiales de densidad.',
        facts: [
          'Composición del Universo: 68.3% Energía Oscura (Λ), 26.8% Materia Oscura Fría (CDM), 4.9% Materia Bariónica ordinaria.',
          'Lentes gravitacionales fuertes en cúmulos (como Abell 370) permiten cartografiar la densidad superficial de masa invisible.',
          'El Fondo Cósmico de Microondas (CMB) medido por Planck muestra anisotropías espectrales concordantes con ΛCDM.'
        ],
        physicsLaw: 'Ecuación de Friedmann y Tensor de Esfuerzo-Energía en Cosmología Relativista.'
      }
    }
  },
  {
    id: 'nebulosa',
    name: 'Pilares de la Creación (M16)',
    icon: '☁️',
    type: 'Región de Formación Estelar (Nebulosa de Emisión)',
    pos: [-18, -14, -38],
    distanceLy: '6,500 años luz',
    constellation: 'Serpens Cauda',
    catalogId: 'M16 / NGC 6611 / Eagle Nebula',
    color: 0xff79c6,
    edu: {
      infantil: {
        summary: 'Torres gigantes de gas y polvo espacial donde están naciendo estrellas bebés en este mismo momento.',
        facts: [
          'Estas torres son tan inmensas que la luz tarda varios años en viajar de abajo hacia arriba.',
          'El gas se aprieta lentamente hasta encender nuevas estrellas coloridas en el interior de las nubes.',
          'El Telescopio James Webb nos permitió mirar a través del polvo para ver cientos de estrellas nacientes.'
        ],
        funFact: '¡Dentro de un solo pilar cabrían millones de sistemas solares como el nuestro!'
      },
      jovenes: {
        summary: 'Columnas de gas de hidrógeno y polvo interestelar esculpidas por la intensa radiación ultravioleta de estrellas jóvenes masivas.',
        facts: [
          'El proceso de fotoevaporación disipa gradualmente las nubes, dejando glóbulos densos en su punta donde colapsan protoestrellas.',
          'El color rojo de las imágenes tradicionales corresponde a la emisión de hidrógeno alfa (H-α) y azufre ionizado.',
          'El telescopio espacial James Webb (NIRCam) reveló estrellas con chorros prototípicos interestelares en sus puntas.'
        ],
        experiment: 'Reto de Filtros: ¿Por qué los astrónomos asignan colores "falsos" o mapeados al azufre, hidrógeno y oxígeno en nebulosas?'
      },
      adultos: {
        summary: 'Región H II dominada por retroalimentación radiativa e ionización por el cúmulo abierto joven NGC 6611.',
        facts: [
          'Longitud del pilar izquierdo: ~4 a 5 años luz con densidades del orden de miles de partículas por cm³.',
          'La presión de radiación de las estrellas O y B cercanas genera frentes de choque y compresión desencadenando la estrella-génesis inducida.',
          'Las simulaciones hidrodinámicas sugieren que los pilares se erosionarán por completo en unos 3 millones de años.'
        ],
        physicsLaw: 'Inestabilidad de Jeans e Ionización de Strömgren en Nubes Moleculares.'
      }
    }
  }
];
