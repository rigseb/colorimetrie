// ==============================
// OBSERVATION + TESTS
// ==============================

export const OBSERVATION_QUESTIONS = [
  {
    key: "O_TEMP",
    title: "Perception globale du teint",
    optionA: "Chaud (doré, pêche)",
    optionB: "Froid (rosé, bleuté)",
  },
  {
    key: "O_VALUE",
    title: "Clarté naturelle",
    optionA: "Clair",
    optionB: "Profond",
  },
  {
    key: "O_INTENSITY",
    title: "Intensité du visage",
    optionA: "Doux",
    optionB: "Vif",
  },
  {
    key: "O_CONTRAST",
    title: "Contraste global",
    optionA: "Faible",
    optionB: "Fort",
  },
];

export const TESTS = [
  {
    key: "A1",
    section: "Température",
    title: "Or vs Argent",
    optionA: "Or",
    optionB: "Argent",
  },
  {
    key: "B1",
    section: "Valeur",
    title: "Clair vs Foncé",
    optionA: "Clair",
    optionB: "Foncé",
  },
  {
    key: "C1",
    section: "Intensité",
    title: "Doux vs Vif",
    optionA: "Doux",
    optionB: "Vif",
  },
  {
    key: "D1",
    section: "Contraste",
    title: "Contraste faible vs fort",
    optionA: "Faible",
    optionB: "Fort",
  },
];

// ==============================
// PROFILS PREMIUM (ÉTAPE 3.3)
// ==============================

export const PROFILES = [
  {
    name: "Printemps Clair",
    season: "Printemps",
    subtype: "Clair",
    axes: {
      temperature: "chaud",
      value: "clair",
      intensity: "doux",
      contrast: "faible",
    },
    logic: "Chaud + Clair + Doux",
    summary:
      "Palette lumineuse, délicate et chaleureuse. L’harmonie repose sur la légèreté et la subtilité.",
    pitch:
      "Votre visage s’éclaire naturellement avec des teintes chaudes, lumineuses et délicates. Les couleurs trop profondes prennent le dessus, alors que des nuances claires et subtilement dorées révèlent immédiatement l’éclat naturel du visage.",
    advice: [
      "Privilégier des couleurs claires et lumineuses.",
      "Rester dans des contrastes doux pour ne pas durcir les traits.",
      "Éviter les teintes trop profondes ou trop saturées.",
    ],
    examples: {
      tops: ["ivoire", "pêche", "beige doré", "abricot clair"],
      jackets: ["camel clair", "sable", "beige chaud", "miel clair"],
      accessories: ["doré", "cuir clair", "beige nude", "écaille claire"],
    },
    avoid: ["noir", "gris froid", "bordeaux sombre", "anthracite dur"],
    palettes: {
      base: [
        "#FFF2CC",
        "#FFF0BA",
        "#FFDAB9",
        "#FAD6A5",
        "#C1E1C1",
        "#D2F4E1",
        "#D1EDF8",
        "#AEEEEE",
      ],
      coeur: ["#FFDAB9", "#EBDBC7", "#EAD3B5", "#EEDCC4"],
      neutres: ["#F8F8F7", "#F4F3F1", "#E0DCD6", "#D3CDC5"],
      accents: ["#E9A263", "#EBAD75", "#EFBD8F", "#E9B063"],
      complements: ["#A1C1DD", "#95BDE0", "#9CC1E2", "#81B0DA"],
    },
  },
  {
    name: "Hiver Profond",
    season: "Hiver",
    subtype: "Profond",
    axes: {
      temperature: "froid",
      value: "profond",
      intensity: "vif",
      contrast: "fort",
    },
    logic: "Froid + Profond + Vif",
    summary:
      "Palette intense et contrastée. L’harmonie repose sur la profondeur et la netteté.",
    pitch:
      "Votre visage supporte naturellement la profondeur et le contraste, qui renforcent votre présence. Les couleurs intenses structurent vos traits, là où des teintes trop douces risquent de les atténuer.",
    advice: [
      "Assumer des contrastes forts.",
      "Privilégier des couleurs profondes et froides.",
      "Éviter les teintes trop fondues ou chaudes.",
    ],
    examples: {
      tops: ["noir", "bordeaux", "bleu nuit", "prune profond"],
      jackets: ["anthracite", "marine profond", "noir structuré", "charbon"],
      accessories: ["argent", "noir", "gunmetal", "laque sombre"],
    },
    avoid: ["beige chaud", "orange", "camel doré", "terracotta clair"],
    palettes: {
      base: [
        "#0072E3",
        "#191970",
        "#4B0082",
        "#2F4F4F",
        "#051829",
        "#2A000F",
        "#000000",
        "#8B0000",
      ],
      coeur: ["#8B0000", "#2F4F4F", "#24247E", "#1E1E85"],
      neutres: ["#96999C", "#93999F", "#96989C", "#8F99A3"],
      accents: ["#BE0000", "#AA0000", "#8B0000", "#800000"],
      complements: ["#9F9F25", "#97972D", "#8F8F35", "#8A8A20"],
    },
  },
  {
    name: "Default",
    hidden: true,
    season: "Generic",
    subtype: "Generic",
    axes: {
      temperature: "chaud",
      value: "moyen",
      intensity: "doux",
      contrast: "modéré",
    },
    logic: "Analyse basée sur axes",
    summary: "Votre profil repose sur l’équilibre de vos axes colorimétriques.",
    pitch:
      "Votre harmonie repose sur l’équilibre naturel de vos couleurs. En respectant vos axes dominants, vous mettez en valeur votre visage sans créer de rupture visuelle.",
    advice: [
      "Respecter vos axes dominants.",
      "Éviter les extrêmes non cohérents.",
      "Privilégier l’harmonie globale.",
    ],
    examples: {
      tops: [],
      jackets: [],
      accessories: [],
    },
    avoid: [],
    palettes: {
      base: [],
      coeur: [],
      neutres: [],
      accents: [],
      complements: [],
    },
  },
];
