export interface DeepSpaceObjectData {
  id: string;
  name: string;
  icon: string;
  type: string;
  galacticPos: [number, number, number];
  distanceLy: string;
  constellation: string;
  catalogId: string;
  isGrrtBlackHole?: boolean;
  hasPulsarBeams?: boolean;
  hasAccretionDisk?: boolean;
  isExternalGalaxy?: boolean;
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

// Galactic coordinate system:
// Center of Milky Way at (0, 0, 0)
// Sun at (SUN_X, 0, 0) in the Orion Spur
// Galaxy disk in XZ plane, Y = perpendicular to disk
// Scale: 1 unit ≈ 325 ly, galaxy radius ≈ 150 units
export const SUN_GALACTIC_POS: [number, number, number] = [80, 0, 0];
export const GALAXY_RADIUS = 150;

export const DEEP_SPACE_OBJECTS: DeepSpaceObjectData[] = [
  {
    id: 'sgr_a_star',
    name: 'Sagitario A* (Agujero Negro Central)',
    icon: '⚫',
    type: 'Agujero Negro Supermasivo (4M masas solares)',
    galacticPos: [0, 0, 0],
    distanceLy: '26,000 años luz',
    constellation: 'Sagitario',
    catalogId: 'Sgr A* / EHT-2022',
    isGrrtBlackHole: true,
    hasAccretionDisk: true,
    color: 0xff6b35,
    edu: {
      infantil: {
        summary: 'El agujero negro gigante que vive en el centro exacto de nuestra galaxia, la Vía Láctea.',
        facts: [
          'Es tan pesado como 4 millones de soles juntos, pero su sombra es más pequeña que la órbita de Mercurio.',
          'Las estrellas a su alrededor giran a velocidades de miles de km/s, atrapadas por su gravedad.',
          'El Telescopio del Horizonte de Sucesos (EHT) fotografió su sombra en 2022.'
        ],
        funFact: 'La estrella S2 orbita Sgr A* en solo 16 años a velocidades del 3% de la luz.'
      },
      jovenes: {
        summary: 'Agujero negro supermasivo en reposo relativo en el centro de la Vía Láctea, rodeado de un cúmulo estelar denso.',
        facts: [
          'Masa: ~4.15 millones de masas solares, medida por las órbitas de estrellas S cercanas (especialmente S2).',
          'Andrea Ghez y Reinhard Genzel recibieron el Nobel de Física 2020 por demostrar su existencia con seguimiento orbital.',
          'A diferencia de M87*, Sgr A* tiene un disco de acreción tenue porque acumula materia muy lentamente.'
        ],
        experiment: 'Reto orbital: Si la estrella S2 orbita a 26,000 ly del Sol, ¿cómo podemos medir su órbita con tanta precisión?'
      },
      adultos: {
        summary: 'Fuente de radio compacta en Sgr A coincidente con un agujero negro de Kerr cuyo horizonte cabe dentro de la órbita de Mercurio.',
        facts: [
          'Radio de Schwarzschild: r_s = 2GM/c² ≈ 12.4 millones de km (0.08 UA).',
          'Luminosidad bolométrica ~10³⁶ erg/s, muy por debajo de Eddington: acrecimiento en modo RIAF (flujo de acreción ineficiente).',
          'Los flares en infrarrojo y rayos X sugieren reconexión magnética episódica en el disco caliente.'
        ],
        physicsLaw: 'Métrica de Kerr y Geodésicas de estrellas S: precesión de Schwarzschild medida en S2 (2020).'
      }
    }
  },
  {
    id: 'gigante_roja',
    name: 'Betelgeuse (Supergigante Roja)',
    icon: '🔴',
    type: 'Supergigante Roja (M1-2Ia-Iab)',
    // ~640 ly from Sun, l≈200°, b≈-9° → exaggerated to 15 units for visibility
    galacticPos: [94, -2, -5],
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
    // ~6,500 ly from Sun, l≈184°, b≈-6° → toward anticenter, Perseus arm
    galacticPos: [110, -3, -2],
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
    id: 'nebulosa',
    name: 'Pilares de la Creación (M16)',
    icon: '☁️',
    type: 'Región de Formación Estelar (Nebulosa de Emisión)',
    // ~5,700 ly from Sun, l≈17°, b≈1° → toward center, Sagittarius arm
    galacticPos: [53, 1, 8],
    distanceLy: '~5,700 años luz (Gaia DR3)',
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
  },
  {
    id: 'andromeda',
    name: 'Galaxia de Andrómeda (M31)',
    icon: '🌀',
    type: 'Galaxia Espiral Barrada (SA(s)b)',
    // ~2.5 million ly from Sun, l≈121°, b≈-22° → far away
    galacticPos: [260, -80, 340],
    distanceLy: '2.537 millones de años luz',
    constellation: 'Andrómeda',
    catalogId: 'M31 / NGC 224',
    isExternalGalaxy: true,
    color: 0xaabbff,
    edu: {
      infantil: {
        summary: 'La galaxia grande más cercana a la nuestra, visible a simple vista en noches oscuras como una manchita borrosa.',
        facts: [
          'Tiene un billón de estrellas — ¡el doble que nuestra Vía Láctea!',
          'Se acerca a nosotros a 110 km/s y chocará con la Vía Láctea dentro de 4,500 millones de años.',
          'Es lo más lejano que puedes ver sin telescopio: su luz tarda 2.5 millones de años en llegar.'
        ],
        funFact: 'Cuando la luz que ves de Andrómeda salió de allí, en la Tierra aún no existían los humanos.'
      },
      jovenes: {
        summary: 'Galaxia espiral masiva del Grupo Local que se aproxima a la Vía Láctea con velocidad radial de -301 km/s.',
        facts: [
          'Contiene ~1 billón de estrellas con un agujero negro central de ~140 millones de masas solares.',
          'Su diámetro es de 220,000 años luz, más del doble que la Vía Láctea.',
          'La fusión con la Vía Láctea (~4,500 Ma) formará una galaxia elíptica llamada "Milkomeda".'
        ],
        experiment: 'Reto cosmológico: ¿Cómo midió Edwin Hubble la distancia a Andrómeda usando estrellas Cefeidas variables?'
      },
      adultos: {
        summary: 'Galaxia dominante del Grupo Local con subestructura de mareas y corrientes estelares que evidencian acreción de satélites.',
        facts: [
          'SMBH central (P2): M ≈ 1.4 × 10⁸ M_☉ derivada de cinemática estelar con HST/STIS.',
          'El halo galáctico contiene corrientes estelares fósiles (Giant Stellar Stream) de una galaxia enana destruida hace ~1 Ga.',
          'Presenta un doble núcleo óptico (P1+P2) explicado por un disco excéntrico de estrellas orbitando el SMBH.'
        ],
        physicsLaw: 'Relación de Tully-Fisher, Cefeidas como candelas estándar y fusión galáctica por fricción dinámica.'
      }
    }
  }
];
