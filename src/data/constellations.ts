export interface ConstellationStar {
  id: string;
  name: string;
  ra: number; // Ascensión Recta en horas (0 - 24)
  dec: number; // Declinación en grados (-90 - +90)
  mag: number; // Magnitud aparente (menor = más brillante)
  color: number; // Hex color según temperatura espectral
}

export interface ConstellationData {
  id: string;
  name: string;
  latinName: string;
  genitive: string;
  icon: string;
  season: 'Primavera' | 'Verano' | 'Otoño' | 'Invierno' | 'Circumpolar';
  stars: ConstellationStar[];
  lines: [number, number][]; // Índices conectores del array de estrellas
  mythology: {
    grecia: string;
    egipto: string;
    china: string;
    maya: string;
  };
  scientificNote: string;
}

export const CONSTELLATIONS_IAU: ConstellationData[] = [
  {
    id: 'orion',
    name: 'Orión (El Cazador)',
    latinName: 'Orion',
    genitive: 'Orionis',
    icon: '🏹',
    season: 'Invierno',
    stars: [
      { id: 'betelgeuse', name: 'Betelgeuse (α Ori)', ra: 5.92, dec: 7.41, mag: 0.5, color: 0xff5533 }, // 0: Hombro izq
      { id: 'rigel', name: 'Rigel (β Ori)', ra: 5.24, dec: -8.2, mag: 0.13, color: 0xaaccff },      // 1: Pie der
      { id: 'bellatrix', name: 'Bellatrix (γ Ori)', ra: 5.42, dec: 6.35, mag: 1.64, color: 0xccddff }, // 2: Hombro der
      { id: 'saiph', name: 'Saiph (κ Ori)', ra: 5.79, dec: -9.67, mag: 2.07, color: 0xbbd0ff },       // 3: Pie izq
      { id: 'alnitak', name: 'Alnitak (ζ Ori)', ra: 5.68, dec: -1.94, mag: 1.77, color: 0xaaccff },   // 4: Cinturón izq
      { id: 'alnilam', name: 'Alnilam (ε Ori)', ra: 5.6, dec: -1.2, mag: 1.69, color: 0xbbd0ff },     // 5: Cinturón centro
      { id: 'mintaka', name: 'Mintaka (δ Ori)', ra: 5.53, dec: -0.3, mag: 2.23, color: 0xbbeeff },    // 6: Cinturón der
    ],
    lines: [
      [0, 5], [2, 5], // Hombros al centro del cinturón
      [4, 5], [5, 6], // Cinturón de Orión (Tres Marías)
      [1, 5], [3, 5], // Pies al centro
      [0, 2], [1, 3]
    ],
    mythology: {
      grecia: 'El cazador gigante de Boeotia presumió que podía cazar a todas las bestias de la Tierra; Gea envió un escorpión para vencerlo y ambos fueron puestos en lados opuestos del cielo.',
      egipto: 'Representaba a Osiris, dios de la resurrección y el inframundo, guiando las crecidas bienhechoras del río Nilo.',
      china: 'Conocida como Shen (参), los tres guerreros o generales que defienden las fronteras del imperio celestial.',
      maya: 'Las Tres Marías formaban "Las Tres Piedras del Fogón de la Creación", en cuyo centro se encendió el primer fuego cósmico en 3114 a.C.'
    },
    scientificNote: 'Contiene la Gran Nebulosa de Orión (M42), uno de los viveros estelares más cercanos a la Tierra (1,344 años luz), visible a simple vista.'
  },
  {
    id: 'ursa_major',
    name: 'Osa Mayor (El Carro)',
    latinName: 'Ursa Major',
    genitive: 'Ursae Majoris',
    icon: '🐻',
    season: 'Circumpolar',
    stars: [
      { id: 'dubhe', name: 'Dubhe (α UMa)', ra: 11.06, dec: 61.75, mag: 1.79, color: 0xffdd88 },   // 0
      { id: 'merak', name: 'Merak (β UMa)', ra: 11.03, dec: 56.38, mag: 2.37, color: 0xddeeff },   // 1
      { id: 'phecda', name: 'Phecda (γ UMa)', ra: 11.9, dec: 53.69, mag: 2.44, color: 0xddeeff },  // 2
      { id: 'megrez', name: 'Megrez (δ UMa)', ra: 12.25, dec: 57.03, mag: 3.31, color: 0xddeeff }, // 3
      { id: 'alioth', name: 'Alioth (ε UMa)', ra: 12.9, dec: 55.96, mag: 1.77, color: 0xddeeff },  // 4
      { id: 'mizar', name: 'Mizar (ζ UMa)', ra: 13.4, dec: 54.92, mag: 2.23, color: 0xddeeff },    // 5
      { id: 'alkaid', name: 'Alkaid (η UMa)', ra: 13.79, dec: 49.31, mag: 1.86, color: 0xaaccee }  // 6
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 0], // Cuenco de la carreta
      [3, 4], [4, 5], [5, 6]          // Mango o cola
    ],
    mythology: {
      grecia: 'La ninfa Calisto fue transformada en oso por Hera y posteriormente catapultada al cielo por Zeus junto a su hijo Arcas (Osa Menor).',
      egipto: 'La Pata de Buey o Meskhetyu, símbolo utilizada por los sacerdotes del faraón para alinear pirámides y tumbas al norte verdadero.',
      china: 'Beidou (北斗), el Cazo del Norte, residencia del Emperador de Jade y medidor de las estaciones por la orientación de su mango.',
      maya: 'Siete Guacamayas (Vucub Caquix), pájaro celestial pretencioso derribado por los héroes gemelos Hunahpú e Ixbalanqué.'
    },
    scientificNote: 'Las estrellas Dubhe y Merak sirven como "punteras": al trazar una línea imaginaria de 5 veces su distancia se localiza la Estrella Polar (Polaris).'
  },
  {
    id: 'cassiopeia',
    name: 'Casiopea (La Reina)',
    latinName: 'Cassiopeia',
    genitive: 'Cassiopeiae',
    icon: '👑',
    season: 'Circumpolar',
    stars: [
      { id: 'caph', name: 'Caph (β Cas)', ra: 0.15, dec: 59.15, mag: 2.28, color: 0xfffaed },      // 0
      { id: 'shedar', name: 'Shedar (α Cas)', ra: 0.68, dec: 56.54, mag: 2.24, color: 0xffaa55 },    // 1
      { id: 'cih', name: 'Cih (γ Cas)', ra: 0.94, dec: 60.72, mag: 2.15, color: 0xaaccff },        // 2
      { id: 'ruchbah', name: 'Ruchbah (δ Cas)', ra: 1.43, dec: 60.23, mag: 2.68, color: 0xddf0ff },  // 3
      { id: 'segin', name: 'Segin (ε Cas)', ra: 1.9, dec: 63.67, mag: 3.35, color: 0xbbd5ff }      // 4
    ],
    lines: [
      [0, 1], [1, 2], [2, 3], [3, 4] // Forma característica en W o M
    ],
    mythology: {
      grecia: 'La arrogante reina de Etiopía que alardeó ser más bella que las Nereidas del mar; fue castigada por Poseidón girando boca abajo en el trono celeste la mitad del año.',
      egipto: 'Asociada a Nut, la diosa madre de la bóveda celeste que se arquea sobre la Tierra protegiéndola.',
      china: 'Wangliang (王良), famoso auriga y cochero imperial guiando un carro de cuatro caballos a través de las estrellas septentrionales.',
      maya: 'Una de las constelaciones tutelares de la temporada seca que anuncia la siembra del maíz al ascender.'
    },
    scientificNote: 'Alberga el famoso remanente de supernova Cassiopeia A, la fuente de ondas de radio más intensa en el cielo fuera del Sol.'
  }
];
