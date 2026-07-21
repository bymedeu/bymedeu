export const projects = [
  {
    id: "mystarceiling",
    name: "MyStarCeiling",
    description: {
      en: "A planned tool for exploring the night sky from anywhere and at any time.",
      fr: "Un outil en préparation pour explorer le ciel nocturne depuis n’importe quel lieu et à n’importe quelle date.",
    },
    type: "personal",
    status: "planned",
    visibility: "public",
    url: "https://github.com/bymedeu/mystarceiling",
    tags: ["research", "mathematics", "web"],
    art: "stars",
  },
  {
    id: "aurora",
    name: "Aurora",
    description: {
      en: "A long-term machine-learning framework and research notebook, progressing from numerical foundations to autograd, attention, and transformers.",
      fr: "Un framework d’apprentissage automatique et carnet de recherche au long cours, des fondements numériques jusqu’à l’autograd, l’attention et les transformers.",
    },
    type: "personal",
    status: "active",
    visibility: "public",
    url: "https://github.com/bymedeu/aurora",
    tags: ["ai", "research", "python", "ml", "mathematics"],
    art: "aurora",
  },
  {
    id: "snow-plow",
    name: { en: "Snow Plow Optimizer", fr: "Optimiseur de chasse-neige" },
    description: {
      en: "A route-optimization system using OpenStreetMap road graphs to assign streets, minimize completion time, calculate costs, and generate interactive maps.",
      fr: "Un système d’optimisation d’itinéraires qui utilise les graphes OpenStreetMap pour affecter les rues, réduire le temps total, calculer les coûts et générer des cartes interactives.",
    },
    type: "academic", visibility: "private", tags: ["python", "algorithms", "graphs", "optimization"], art: "route",
  },
  {
    id: "42sh",
    name: "42sh",
    description: {
      en: "A shell written in C with a lexer, recursive parser, AST, expansions, pipelines, redirections, control flow, and built-ins.",
      fr: "Un shell écrit en C avec lexer, parseur récursif, AST, expansions, pipelines, redirections, structures de contrôle et commandes internes.",
    },
    type: "academic", visibility: "private", tags: ["c", "systems", "unix", "parsing"], art: "terminal",
  },
  {
    id: "tiger",
    name: { en: "Tiger Compiler", fr: "Compilateur Tiger" },
    description: {
      en: "A compiler pipeline covering lexical and syntax analysis, AST transformations, binding, type checking, optimization passes, and LLVM translation.",
      fr: "Une chaîne de compilation couvrant analyses lexicale et syntaxique, transformations d’AST, liaison, typage, passes d’optimisation et traduction LLVM.",
    },
    type: "academic", visibility: "private", tags: ["cpp", "compilers", "parsing", "systems"], art: "compiler",
  },
  {
    id: "image-library",
    name: { en: "Generic Image Library", fr: "Bibliothèque d’images générique" },
    description: {
      en: "A C++20 image-processing library built around concepts, generic algorithms, morphological erosion, tests, and performance benchmarks.",
      fr: "Une bibliothèque de traitement d’images en C++20 fondée sur les concepts, les algorithmes génériques, l’érosion morphologique, les tests et les benchmarks.",
    },
    type: "academic", visibility: "private", tags: ["cpp", "vision", "algorithms", "testing", "performance"], art: "pixels",
  },
  {
    id: "comments-platform",
    name: { en: "Comments Platform", fr: "Plateforme de commentaires" },
    description: {
      en: "A containerized comments system composed of Go services, Redis persistence, Docker orchestration, and Prometheus metrics.",
      fr: "Un système de commentaires conteneurisé composé de services Go, d’une persistance Redis, d’une orchestration Docker et de métriques Prometheus.",
    },
    type: "academic", visibility: "private", tags: ["go", "systems", "web", "redis", "docker"], art: "service",
  },
  {
    id: "http-server",
    name: { en: "HTTP Server", fr: "Serveur HTTP" },
    description: {
      en: "A compact HTTP server implemented in C, covering sockets, requests, responses, configuration, and concurrent systems concerns.",
      fr: "Un serveur HTTP compact implémenté en C, couvrant sockets, requêtes, réponses, configuration et problématiques de concurrence.",
    },
    type: "academic", visibility: "private", tags: ["c", "systems", "networking", "web"], art: "network",
  },
  {
    id: "memory-allocator",
    name: { en: "Memory Allocator", fr: "Allocateur mémoire" },
    description: {
      en: "A custom dynamic-memory allocator exploring pages, blocks, alignment, allocation strategies, and memory recycling.",
      fr: "Un allocateur de mémoire dynamique explorant pages, blocs, alignement, stratégies d’allocation et recyclage de la mémoire.",
    },
    type: "academic", visibility: "private", tags: ["c", "systems", "unix", "performance"], art: "memory",
  },
  {
    id: "minimake",
    name: "MiniMake",
    description: {
      en: "A small Make-like build tool with rule parsing, variables, dependency resolution, and command execution.",
      fr: "Un petit outil de build inspiré de Make avec analyse des règles, variables, résolution des dépendances et exécution de commandes.",
    },
    type: "academic", visibility: "private", tags: ["c", "systems", "parsing", "algorithms"], art: "build",
  },
  {
    id: "tinyprintf",
    name: "TinyPrintf",
    description: {
      en: "A compact formatted-output implementation in C, recreating essential printf behavior and variadic argument handling.",
      fr: "Une implémentation compacte de sortie formatée en C, reproduisant les fonctions essentielles de printf et la gestion des arguments variadiques.",
    },
    type: "academic", visibility: "private", tags: ["c", "systems", "parsing"], art: "terminal",
  },
  {
    id: "evalexpr",
    name: { en: "Expression Evaluator", fr: "Évaluateur d’expressions" },
    description: {
      en: "An arithmetic expression evaluator in C, focused on tokenization, operator precedence, parsing, and evaluation.",
      fr: "Un évaluateur d’expressions arithmétiques en C, centré sur la tokenisation, la priorité des opérateurs, l’analyse et l’évaluation.",
    },
    type: "academic", visibility: "private", tags: ["c", "algorithms", "parsing"], art: "math",
  },
  {
    id: "degrees",
    name: { en: "Degrees of Separation", fr: "Degrés de séparation" },
    description: {
      en: "A breadth-first graph search that finds the shortest chain connecting two actors through shared films.",
      fr: "Une recherche en largeur dans un graphe pour trouver la plus courte chaîne reliant deux acteurs par leurs films communs.",
    },
    type: "academic", visibility: "private", tags: ["python", "ai", "graphs", "algorithms"], art: "graph",
  },
  {
    id: "tictactoe",
    name: { en: "Tic-Tac-Toe AI", fr: "IA de morpion" },
    description: {
      en: "An optimal Tic-Tac-Toe agent using adversarial search and the Minimax algorithm.",
      fr: "Un agent de morpion optimal utilisant la recherche adversariale et l’algorithme Minimax.",
    },
    type: "academic", visibility: "private", tags: ["python", "ai", "algorithms"], art: "game",
  },
  {
    id: "knights",
    name: { en: "Knights & Knaves", fr: "Chevaliers et fripons" },
    description: {
      en: "A propositional-logic model checker that solves knowledge puzzles from formalized statements.",
      fr: "Un vérificateur de modèles en logique propositionnelle qui résout des énigmes à partir d’énoncés formalisés.",
    },
    type: "academic", visibility: "private", tags: ["python", "ai", "algorithms"], art: "logic",
  },
  {
    id: "minesweeper",
    name: { en: "Minesweeper AI", fr: "IA de démineur" },
    description: {
      en: "A knowledge-based Minesweeper agent that derives safe moves and mine locations through logical inference.",
      fr: "Un agent de démineur fondé sur la connaissance, qui déduit les coups sûrs et la position des mines par inférence logique.",
    },
    type: "academic", visibility: "private", tags: ["python", "ai", "algorithms"], art: "game",
  },
  {
    id: "heredity",
    name: { en: "Heredity Inference", fr: "Inférence d’hérédité" },
    description: {
      en: "A probabilistic model that infers gene and trait distributions across family relationships.",
      fr: "Un modèle probabiliste qui infère la distribution des gènes et des traits au sein de relations familiales.",
    },
    type: "academic", visibility: "private", tags: ["python", "ai", "mathematics"], art: "probability",
  },
  {
    id: "pagerank",
    name: "PageRank",
    description: {
      en: "Two PageRank implementations using random-walk sampling and iterative probability convergence.",
      fr: "Deux implémentations de PageRank par échantillonnage de marches aléatoires et convergence probabiliste itérative.",
    },
    type: "academic", visibility: "private", tags: ["python", "ai", "graphs", "mathematics"], art: "graph",
  },
  {
    id: "crossword",
    name: { en: "Crossword Generator", fr: "Générateur de mots croisés" },
    description: {
      en: "A constraint-satisfaction solver using node consistency, arc consistency, and backtracking search.",
      fr: "Un solveur de satisfaction de contraintes utilisant cohérence de nœuds, cohérence d’arcs et recherche par retour arrière.",
    },
    type: "academic", visibility: "private", tags: ["python", "ai", "algorithms"], art: "grid",
  },
  {
    id: "nim",
    name: { en: "Nim Reinforcement Agent", fr: "Agent de renforcement pour Nim" },
    description: {
      en: "A self-training Nim agent that learns an effective strategy through Q-learning and repeated simulated games.",
      fr: "Un agent de Nim qui apprend une stratégie efficace par Q-learning au fil de parties simulées.",
    },
    type: "academic", visibility: "private", tags: ["python", "ai", "ml", "algorithms"], art: "game",
  },
  {
    id: "shopping",
    name: { en: "Shopping Predictor", fr: "Prédiction d’achat" },
    description: {
      en: "A nearest-neighbor classifier that predicts whether an online shopping session will result in a purchase.",
      fr: "Un classifieur par plus proches voisins qui prédit si une session d’achat en ligne aboutira à une commande.",
    },
    type: "academic", visibility: "private", tags: ["python", "ai", "ml"], art: "data",
  },
  {
    id: "traffic-signs",
    name: { en: "Traffic Sign Recognition", fr: "Reconnaissance de panneaux" },
    description: {
      en: "A convolutional neural network trained to classify road signs from the GTSRB image dataset.",
      fr: "Un réseau de neurones convolutif entraîné à classifier des panneaux routiers du jeu de données GTSRB.",
    },
    type: "academic", visibility: "private", tags: ["python", "ai", "dl", "vision"], art: "vision",
  },
  {
    id: "attention-visualizer",
    name: { en: "Attention Visualizer", fr: "Visualisation de l’attention" },
    description: {
      en: "A BERT masked-language experiment that visualizes token attention patterns across transformer heads.",
      fr: "Une expérience de langage masqué avec BERT qui visualise l’attention entre tokens dans les têtes du transformer.",
    },
    type: "academic", visibility: "private", tags: ["python", "ai", "dl", "nlp", "research"], art: "attention",
  },
  {
    id: "nlp-parser",
    name: { en: "Natural Language Parser", fr: "Analyseur de langage naturel" },
    description: {
      en: "A context-free grammar parser that analyzes English sentences and extracts noun-phrase chunks.",
      fr: "Un analyseur à grammaire hors contexte qui traite des phrases anglaises et extrait leurs groupes nominaux.",
    },
    type: "academic", visibility: "private", tags: ["python", "ai", "nlp", "parsing"], art: "language",
  },
];

export const featuredProjectIds = ["aurora", "mystarceiling", "snow-plow"];

export function getProjectName(project, language) {
  return typeof project.name === "string" ? project.name : project.name[language];
}

export function getProjectDescription(project, language) {
  return project.description[language];
}

export function getAllTags() {
  return [...new Set(projects.flatMap((project) => project.tags))];
}
