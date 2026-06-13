
export interface VideoItem {
    id: string;
    title: string;
    description: string;
    subject: "Physics" | "Chemistry" | "Botany" | "Zoology" | "Math";
    youtubeId: string;
    duration: string;
    channel: string;
    topics: string[];
    difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export const videos: VideoItem[] = [
    // --- PHYSICS ---
    {
        id: "phys-01",
        title: "Introduction to Physics",
        description: "What is Physics? An introduction to the fundamental concepts of matter and energy.",
        subject: "Physics",
        youtubeId: "b1t41QWExBC", // CrashCourse Physics #1
        duration: "10:35",
        channel: "CrashCourse",
        topics: ["Basics", "Introduction"],
        difficulty: "Beginner"
    },
    {
        id: "phys-02",
        title: "Newton's Laws of Motion",
        description: "Understanding Newton's three laws of motion with real-world examples.",
        subject: "Physics",
        youtubeId: "kKKM8Y-u7ds", // CrashCourse Physics #5
        duration: "11:03",
        channel: "CrashCourse",
        topics: ["Laws of Motion", "Force", "Newton"],
        difficulty: "Beginner"
    },
    {
        id: "phys-03",
        title: "Kinematics: Position, Velocity, Acceleration",
        description: "The relationships between position, velocity, and acceleration in 1D motion.",
        subject: "Physics",
        youtubeId: "zmhuCIL81Rk", // Organic Chemistry Tutor
        duration: "45:12",
        channel: "The Organic Chemistry Tutor",
        topics: ["Kinematics", "Motion", "1D Motion"],
        difficulty: "Beginner"
    },
    {
        id: "phys-04",
        title: "Vectors and 2D Motion",
        description: "Introduction to vectors and how to analyze motion in two dimensions.",
        subject: "Physics",
        youtubeId: "wz9iebcjXPk", // CrashCourse Physics #4
        duration: "10:06",
        channel: "CrashCourse",
        topics: ["Vectors", "2D Motion", "Kinematics"],
        difficulty: "Intermediate"
    },
    {
        id: "phys-05",
        title: "Projectile Motion Problems",
        description: "Step-by-step guide to solving projectile motion problems.",
        subject: "Physics",
        youtubeId: "M8xhvs2p_n4", // Organic Chemistry Tutor
        duration: "30:25",
        channel: "The Organic Chemistry Tutor",
        topics: ["Projectile Motion", "Kinematics", "Problem Solving"],
        difficulty: "Intermediate"
    },
    {
        id: "phys-06",
        title: "Work, Energy, and Power",
        description: "Definitions of work, kinetic energy, potential energy, and power.",
        subject: "Physics",
        tags: "video",
        youtubeId: "w4QFJb9a8vo", // CrashCourse Physics #9
        duration: "9:55",
        channel: "CrashCourse",
        topics: ["Work", "Energy", "Power"],
        difficulty: "Beginner"
    },
    {
        id: "phys-07",
        title: "Conservation of Energy",
        description: "The law of conservation of energy and how to apply it.",
        subject: "Physics",
        youtubeId: "kw_4Loo1HR4", // Khan Academy
        duration: "14:20",
        channel: "Khan Academy",
        topics: ["Energy", "Conservation", "Thermodynamics"],
        difficulty: "Intermediate"
    },
    {
        id: "phys-08",
        title: "Circular Motion",
        description: "Understanding centripetal force and acceleration in circular motion.",
        subject: "Physics",
        youtubeId: "bpFK2VCRHUs", // CrashCourse Physics #7
        duration: "9:49",
        channel: "CrashCourse",
        topics: ["Circular Motion", "Force", "Acceleration"],
        difficulty: "Intermediate"
    },
    {
        id: "phys-09",
        title: "Rotational Motion",
        description: "Torque, angular momentum, and rotational inertia.",
        subject: "Physics",
        youtubeId: "b-FAYhkA7k8", // CrashCourse Physics #11
        duration: "11:15",
        channel: "CrashCourse",
        topics: ["Rotation", "Torque", "Angular Momentum"],
        difficulty: "Advanced"
    },
    {
        id: "phys-10",
        title: "Gravitation",
        description: "Newton's law of universal gravitation and orbital mechanics.",
        subject: "Physics",
        youtubeId: "7gf6Ypdvtce", // CrashCourse Physics #8
        duration: "9:18",
        channel: "CrashCourse",
        topics: ["Gravitation", "Orbits", "Space"],
        difficulty: "Beginner"
    },
    {
        id: "phys-11",
        title: "Fluids at Rest",
        description: "Density, pressure, and Pascal's principle.",
        subject: "Physics",
        youtubeId: "b5Iz2XFq3tY", // CrashCourse Physics #14
        duration: "9:44",
        channel: "CrashCourse",
        topics: ["Fluids", "Pressure", "Density"],
        difficulty: "Intermediate"
    },
    {
        id: "phys-12",
        title: "Fluids in Motion",
        description: "Bernoulli's equation and fluid dynamics.",
        subject: "Physics",
        youtubeId: "fJefjG3Gh1g", // CrashCourse Physics #15
        duration: "9:24",
        channel: "CrashCourse",
        topics: ["Fluid Dynamics", "Bernoulli", "Flow"],
        difficulty: "Advanced"
    },
    {
        id: "phys-13",
        title: "Simple Harmonic Motion",
        description: "Oscillations, springs, and pendulums.",
        subject: "Physics",
        youtubeId: "jxstE6A_CYQ", // CrashCourse Physics #16
        duration: "9:11",
        channel: "CrashCourse",
        topics: ["SHM", "Oscillations", "Waves"],
        difficulty: "Intermediate"
    },
    {
        id: "phys-14",
        title: "Wave Properties",
        description: "Wavelength, frequency, amplitude, and speed of waves.",
        subject: "Physics",
        youtubeId: "CVsdXKO9xlk", // CrashCourse Physics #17
        duration: "9:51",
        channel: "CrashCourse",
        topics: ["Waves", "Sound", "Light"],
        difficulty: "Beginner"
    },
    {
        id: "phys-15",
        title: "Electrostatics: Electric Charge and Field",
        description: "Understanding electric charge, Coulomb's law, and electric fields.",
        subject: "Physics",
        youtubeId: "Tf4t1fT5i_w", // CrashCourse Physics #25
        duration: "9:49",
        channel: "CrashCourse",
        topics: ["Electrostatics", "Field", "Charge"],
        difficulty: "Intermediate"
    },
    {
        id: "phys-16",
        title: "Electric Potential and Capacitors",
        description: "Voltage, potential difference, and how capacitors store energy.",
        subject: "Physics",
        youtubeId: "P_n9a7h2g8k", // Organic Chemistry Tutor
        duration: "1:05:22",
        channel: "The Organic Chemistry Tutor",
        topics: ["Potential", "Capacitors", "Circuits"],
        difficulty: "Advanced"
    },
    {
        id: "phys-17",
        title: "Current Electricity and Ohm's Law",
        description: "Electric current, resistance, and Ohm's Law.",
        subject: "Physics",
        youtubeId: "HXOok3mf9dc", // CrashCourse Physics #28
        duration: "10:36",
        channel: "CrashCourse",
        topics: ["Current", "Resistance", "Circuits"],
        difficulty: "Beginner"
    },
    {
        id: "phys-18",
        title: "Magnetic Fields",
        description: "How magnetic fields are created and how they interact with moving charges.",
        subject: "Physics",
        youtubeId: "hRAFPdDPPzs", // CrashCourse Physics #32
        duration: "10:04",
        channel: "CrashCourse",
        topics: ["Magnetism", "Fields", "Forces"],
        difficulty: "Intermediate"
    },
    {
        id: "phys-19",
        title: "Electromagnetic Induction",
        description: "Faraday's Law and Lenz's Law involved in generating electricity.",
        subject: "Physics",
        youtubeId: "p1_FteW-u-M", // CrashCourse Physics #37
        duration: "10:25",
        channel: "CrashCourse",
        topics: ["Induction", "Flux", "EMF"],
        difficulty: "Advanced"
    },
    {
        id: "phys-20",
        title: "Ray Optics: Reflection and Mirrors",
        description: "How light reflects off plane and curved mirrors.",
        subject: "Physics",
        youtubeId: "EXtW2t_qfI0", // Organic Chemistry Tutor
        duration: "35:10",
        channel: "The Organic Chemistry Tutor",
        topics: ["Optics", "Reflection", "Mirrors"],
        difficulty: "Intermediate"
    },

    // --- CHEMISTRY ---
    {
        id: "chem-01",
        title: "Introduction to Chemistry",
        description: "The periodic table, elements, and atoms.",
        subject: "Chemistry",
        youtubeId: "FSyAehMdpyI", // CrashCourse Chemistry #1
        duration: "10:12",
        channel: "CrashCourse",
        topics: ["Basics", "Atoms", "Elements"],
        difficulty: "Beginner"
    },
    {
        id: "chem-02",
        title: "The Periodic Table",
        description: "Trends in the periodic table: atomic radius, ionization energy, and electronegativity.",
        subject: "Chemistry",
        youtubeId: "0g8lANs6zpQ", // CrashCourse Chemistry #4
        duration: "11:21",
        channel: "CrashCourse",
        topics: ["Periodic Table", "Trends", "Properties"],
        difficulty: "Beginner"
    },
    {
        id: "chem-03",
        title: "Stoichiometry",
        description: "How to balance chemical equations and calculate moles.",
        subject: "Chemistry",
        youtubeId: "7Cfq0ilw7ps", // CrashCourse Chemistry #6
        duration: "12:47",
        channel: "CrashCourse",
        topics: ["Stoichiometry", "Equations", "Moles"],
        difficulty: "Intermediate"
    },
    {
        id: "chem-04",
        title: "Chemical Bonding: Ionic and Covalent",
        description: "Understanding how atoms bond to form molecules.",
        subject: "Chemistry",
        youtubeId: "QG44q2b7iY8", // Professor Dave Explains
        duration: "15:30",
        channel: "Professor Dave Explains",
        topics: ["Bonding", "Ionic", "Covalent"],
        difficulty: "Intermediate"
    },
    {
        id: "chem-05",
        title: "VSEPR Theory and Molecular Geometry",
        description: "Predicting the shapes of molecules using VSEPR theory.",
        subject: "Chemistry",
        youtubeId: "xUYt19uQjTI", // Organic Chemistry Tutor
        duration: "1:02:15",
        channel: "The Organic Chemistry Tutor",
        topics: ["VSEPR", "Geometry", "Shapes"],
        difficulty: "Advanced"
    },
    {
        id: "chem-06",
        title: "Intermolecular Forces",
        description: "Dipole-dipole, hydrogen bonding, and London dispersion forces.",
        subject: "Chemistry",
        youtubeId: "0civE2Lptl0", // Professor Dave Explains
        duration: "10:45",
        channel: "Professor Dave Explains",
        topics: ["Forces", "States of Matter", "Bonding"],
        difficulty: "Intermediate"
    },
    {
        id: "chem-07",
        title: "Gas Laws",
        description: "Boyle's Law, Charles's Law, and the Ideal Gas Law.",
        subject: "Chemistry",
        youtubeId: "BxUS1K7xu30", // CrashCourse Chemistry #12
        duration: "10:52",
        channel: "CrashCourse",
        topics: ["Gases", "Laws", "Thermodynamics"],
        difficulty: "Beginner"
    },
    {
        id: "chem-08",
        title: "Solutions and Molarity",
        description: "Calculating concentration and making solutions.",
        subject: "Chemistry",
        youtubeId: "SxU1j6r0kCA", // Organic Chemistry Tutor
        duration: "25:10",
        channel: "The Organic Chemistry Tutor",
        topics: ["Solutions", "Molarity", "Calculations"],
        difficulty: "Intermediate"
    },
    {
        id: "chem-09",
        title: "Acids and Bases",
        description: "The pH scale, pOH, and strengths of acids and bases.",
        subject: "Chemistry",
        youtubeId: "ANi709MYnWg", // CrashCourse Chemistry #8
        duration: "11:03",
        channel: "CrashCourse",
        topics: ["Acids", "Bases", "pH"],
        difficulty: "Intermediate"
    },
    {
        id: "chem-10",
        title: "Redox Reactions",
        description: "Oxidation, reduction, and balancing redox equations.",
        subject: "Chemistry",
        youtubeId: "lQ6FBA1HM3s", // CrashCourse Chemistry #10
        duration: "11:13",
        channel: "CrashCourse",
        topics: ["Redox", "Reactions", "Electron Transfer"],
        difficulty: "Advanced"
    },
    {
        id: "chem-11",
        title: "Electrochemistry",
        description: "Galvanic cells, voltaic cells, and the electrochemical series.",
        subject: "Chemistry",
        youtubeId: "TEpA8f57sK4", // Professor Dave Explains
        duration: "18:20",
        channel: "Professor Dave Explains",
        topics: ["Electrochemistry", "Cells", "Electricity"],
        difficulty: "Advanced"
    },
    {
        id: "chem-12",
        title: "Chemical Kinetics",
        description: "Reaction rates and rate laws.",
        subject: "Chemistry",
        youtubeId: "7qOFtL3VEBc", // CrashCourse Chemistry #17
        duration: "10:14",
        channel: "CrashCourse",
        topics: ["Kinetics", "Rates", "Reactions"],
        difficulty: "Advanced"
    },
    {
        id: "chem-13",
        title: "Chemical Equilibrium",
        description: "Le Chatelier's Principle and equilibrium constants.",
        subject: "Chemistry",
        youtubeId: "g5wNg_dKsYY", // CrashCourse Chemistry #14
        duration: "10:41",
        channel: "CrashCourse",
        topics: ["Equilibrium", "Reactions", "Le Chatelier"],
        difficulty: "Advanced"
    },
    {
        id: "chem-14",
        title: "Thermodynamics: Enthalpy, Entropy, Gibbs",
        description: "Understanding energy changes in chemical reactions.",
        subject: "Chemistry",
        youtubeId: "8m_FCe_xcYE", // Professor Dave Explains
        duration: "14:50",
        channel: "Professor Dave Explains",
        topics: ["Thermodynamics", "Energy", "Entropy"],
        difficulty: "Advanced"
    },
    {
        id: "chem-15",
        title: "Introduction to Organic Chemistry",
        description: "Hydrocarbons, alkanes, alkenes, and alkynes.",
        subject: "Chemistry",
        youtubeId: "UloIw7dhnlQ", // CrashCourse Chemistry #39
        duration: "11:32",
        channel: "CrashCourse",
        topics: ["Organic", "Carbon", "Basics"],
        difficulty: "Beginner"
    },
    {
        id: "chem-16",
        title: "Nomenclature of Organic Compounds",
        description: "IUPAC naming rules for organic molecules.",
        subject: "Chemistry",
        youtubeId: "EqB8m8eTfM0", // Professor Dave Explains
        duration: "12:15",
        channel: "Professor Dave Explains",
        topics: ["Organic", "Naming", "IUPAC"],
        difficulty: "Intermediate"
    },
    {
        id: "chem-17",
        title: "SN1 and SN2 Reactions",
        description: "Mechanisms of nucleophilic substitution reactions.",
        subject: "Chemistry",
        youtubeId: "h5tMp_k7opM", // The Organic Chemistry Tutor
        duration: "45:30",
        channel: "The Organic Chemistry Tutor",
        topics: ["Organic", "Mechanisms", "Reactions"],
        difficulty: "Advanced"
    },
    {
        id: "chem-18",
        title: "E1 and E2 Reactions",
        description: "Mechanisms of elimination reactions.",
        subject: "Chemistry",
        youtubeId: "6g75x9oF9zQ", // The Organic Chemistry Tutor
        duration: "38:45",
        channel: "The Organic Chemistry Tutor",
        topics: ["Organic", "Mechanisms", "Elimination"],
        difficulty: "Advanced"
    },
    {
        id: "chem-19",
        title: "Biomolecules",
        description: "Carbohydrates, lipids, proteins, and nucleic acids.",
        subject: "Chemistry",
        youtubeId: "H8WJ2KENlK0", // CrashCourse Biology #3
        duration: "14:07",
        channel: "CrashCourse",
        topics: ["Biochemistry", "Biology", "Molecules"],
        difficulty: "Intermediate"
    },
    {
        id: "chem-20",
        title: "Polymers",
        description: "Structure and properties of synthetic and natural polymers.",
        subject: "Chemistry",
        youtubeId: "rHxxLYzJ8Sw", // CrashCourse Chemistry #45
        duration: "10:14",
        channel: "CrashCourse",
        topics: ["Materials", "Plastics", "Polymers"],
        difficulty: "Intermediate"
    },

    // --- BOTANY ---
    {
        id: "bot-01",
        title: "Photosynthesis",
        description: "The light reactions and the Calvin cycle.",
        subject: "Botany",
        youtubeId: "sQK3Yr4Sc_k", // CrashCourse Biology #8
        duration: "13:14",
        channel: "CrashCourse",
        topics: ["Photosynthesis", "Plants", "Energy"],
        difficulty: "Intermediate"
    },
    {
        id: "bot-02",
        title: "Plant Cells: Structure & Function",
        description: "Cell wall, chloroplasts, and vacuoles.",
        subject: "Botany",
        youtubeId: "9UvlqAVCoqY", // CrashCourse Biology #6
        duration: "10:48",
        channel: "CrashCourse",
        topics: ["Cells", "Structure", "Organelles"],
        difficulty: "Beginner"
    },
    {
        id: "bot-03",
        title: "Vascular Plants = Winning!",
        description: "Xylem, phloem, and the evolution of vascular plants.",
        subject: "Botany",
        youtubeId: "h9oDTMXM7M8", // CrashCourse Biology #37
        duration: "11:53",
        channel: "CrashCourse",
        topics: ["Plants", "Evolution", "Structure"],
        difficulty: "Intermediate"
    },
    {
        id: "bot-04",
        title: "Plant Reproduction",
        description: "Flowers, fruits, and the alternation of generations.",
        subject: "Botany",
        youtubeId: "ExaQ8shhkw8", // CrashCourse Biology #38
        duration: "10:35",
        channel: "CrashCourse",
        topics: ["Reproduction", "Plants", "Flowers"],
        difficulty: "Intermediate"
    },
    {
        id: "bot-05",
        title: "Plant Growth and Hormones",
        description: "Auxins, gibberellins, and phototropism.",
        subject: "Botany",
        youtubeId: "HwJqW6CVm_U", // Professor Dave Explains
        duration: "9:45",
        channel: "Professor Dave Explains",
        topics: ["Growth", "Hormones", "Plants"],
        difficulty: "Advanced"
    },
    {
        id: "bot-06",
        title: "Transport in Plants",
        description: "Water potential, transpiration, and translocation.",
        subject: "Botany",
        youtubeId: "BS9gFpg6UQI", // Khan Academy
        duration: "12:10",
        channel: "Khan Academy",
        topics: ["Transport", "Water", "Nutrients"],
        difficulty: "Intermediate"
    },
    {
        id: "bot-07",
        title: "Plant Mineral Nutrition",
        description: "Essential macro and micronutrients for plants.",
        subject: "Botany",
        youtubeId: "V5d9X8Q6XyU", // Shomu's Biology
        duration: "18:20",
        channel: "Shomu's Biology",
        topics: ["Nutrition", "Minerals", "Plants"],
        difficulty: "Advanced"
    },
    {
        id: "bot-08",
        title: "Respiration in Plants",
        description: "Glycolysis, Krebs cycle, and electron transport chain.",
        subject: "Botany",
        youtubeId: "00jbG_cfGuQ", // CrashCourse Biology #7
        duration: "13:14",
        channel: "CrashCourse",
        topics: ["Respiration", "Energy", "Metabolism"],
        difficulty: "Advanced"
    },
    {
        id: "bot-09",
        title: "Plant Kingdom Classification",
        description: "Algae, bryophytes, pteridophytes, gymnosperms, and angiosperms.",
        subject: "Botany",
        youtubeId: "iGZqV7QYQ5o", // Amoeba Sisters
        duration: "8:45",
        channel: "Amoeba Sisters",
        topics: ["Classification", "Taxonomy", "Diversity"],
        difficulty: "Beginner"
    },
    {
        id: "bot-10",
        title: "Morphology of Flowering Plants",
        description: "Roots, stems, leaves, inflorescence, and flowers.",
        subject: "Botany",
        youtubeId: "z1F6yXk6Y8Q", // Professor Dave Explains
        duration: "14:15",
        channel: "Professor Dave Explains",
        topics: ["Morphology", "Anatomy", "Structure"],
        difficulty: "Intermediate"
    },

    // --- ZOOLOGY ---
    {
        id: "zoo-01",
        title: "Animal Cells Overview",
        description: "Structure and function of animal cells.",
        subject: "Zoology",
        youtubeId: "cj8dDTHGJBY", // CrashCourse Biology #4
        duration: "11:03",
        channel: "CrashCourse",
        topics: ["Cells", "Animals", "Biology"],
        difficulty: "Beginner"
    },
    {
        id: "zoo-02",
        title: "DNA Replication",
        description: "How DNA copies itself.",
        subject: "Zoology",
        youtubeId: "8kK2zwjRV0M", // CrashCourse Biology #10
        duration: "11:18",
        channel: "CrashCourse",
        topics: ["Genetics", "DNA", "Replication"],
        difficulty: "Intermediate"
    },
    {
        id: "zoo-03",
        title: "Protein Synthesis (Translation)",
        description: "From RNA to Protein.",
        subject: "Zoology",
        youtubeId: "itsb2SqR-R0", // CrashCourse Biology #11
        duration: "11:09",
        channel: "CrashCourse",
        topics: ["Genetics", "Proteins", "Synthesis"],
        difficulty: "Intermediate"
    },
    {
        id: "zoo-04",
        title: "Meiosis",
        description: "Sexual reproduction and gametes.",
        subject: "Zoology",
        youtubeId: "qCLmR9-YY7o", // CrashCourse Biology #13
        duration: "11:43",
        channel: "CrashCourse",
        topics: ["Reproduction", "Genetics", "Cell Division"],
        difficulty: "Intermediate"
    },
    {
        id: "zoo-05",
        title: "Natural Selection",
        description: "Darwin, evolution, and survival of the fittest.",
        subject: "Zoology",
        youtubeId: "aTftyFboC_M", // CrashCourse Biology #14
        duration: "12:44",
        channel: "CrashCourse",
        topics: ["Evolution", "Darwin", "Selection"],
        difficulty: "Beginner"
    },
    {
        id: "zoo-06",
        title: "The Nervous System",
        description: "Neurons, synapses, and signaling.",
        subject: "Zoology",
        youtubeId: "x4PPZCLnVkA", // CrashCourse Biology #26
        duration: "11:13",
        channel: "CrashCourse",
        topics: ["Nervous System", "Brain", "Anatomy"],
        difficulty: "Advanced"
    },
    {
        id: "zoo-07",
        title: "The Circulatory System",
        description: "The heart, blood vessels, and blood.",
        subject: "Zoology",
        youtubeId: "9fxm85Fy4sQ", // CrashCourse Biology #27
        duration: "11:34",
        channel: "CrashCourse",
        topics: ["Circulatory System", "Heart", "Anatomy"],
        difficulty: "Intermediate"
    },
    {
        id: "zoo-08",
        title: "The Digestive System",
        description: "How we process food for energy.",
        subject: "Zoology",
        youtubeId: "s06XzaKqELk", // CrashCourse Biology #28
        duration: "11:52",
        channel: "CrashCourse",
        topics: ["Digestion", "Nutrition", "Anatomy"],
        difficulty: "Intermediate"
    },
    {
        id: "zoo-09",
        title: "The Excretory System",
        description: "Kidneys and waste removal.",
        subject: "Zoology",
        youtubeId: "WtrYOTjYvtU", // CrashCourse Biology #29
        duration: "12:21",
        channel: "CrashCourse",
        topics: ["Excretion", "Kidneys", "Anatomy"],
        difficulty: "Intermediate"
    },
    {
        id: "zoo-10",
        title: "The Immune System",
        description: "How the body fights infection.",
        subject: "Zoology",
        youtubeId: "CeVtPDjJBPU", // CrashCourse Biology #32
        duration: "12:32",
        channel: "CrashCourse",
        topics: ["Immune System", "Health", "Biology"],
        difficulty: "Intermediate"
    },

    // --- MATH ---
    {
        id: "math-01",
        title: "Introduction to Sets",
        description: "Basics of set theory, notation, and types of sets.",
        subject: "Math",
        youtubeId: "tyDKR4FG3Yw", // The Organic Chemistry Tutor
        duration: "18:30",
        channel: "The Organic Chemistry Tutor",
        topics: ["Sets", "Basics", "Relations"],
        difficulty: "Beginner"
    },
    {
        id: "math-02",
        title: "Relations and Functions",
        description: "Domain, range, and types of functions.",
        subject: "Math",
        youtubeId: "AvG-MX_oXQY", // The Organic Chemistry Tutor
        duration: "25:15",
        channel: "The Organic Chemistry Tutor",
        topics: ["Functions", "Algebra", "Calculus"],
        difficulty: "Intermediate"
    },
    {
        id: "math-03",
        title: "Trigonometric Functions",
        description: "Sine, Cosine, Tangent and the Unit Circle.",
        subject: "Math",
        youtubeId: "PUB0TaZ7bhA", // Khan Academy
        duration: "15:45",
        channel: "Khan Academy",
        topics: ["Trigonometry", "Geometry", "Functions"],
        difficulty: "Intermediate"
    },
    {
        id: "math-04",
        title: "Complex Numbers",
        description: "Imaginary numbers, complex plane, and operations.",
        subject: "Math",
        youtubeId: "SP-YJe7Vldo", // Khan Academy
        duration: "12:20",
        channel: "Khan Academy",
        topics: ["Algebra", "Complex Numbers", "Math"],
        difficulty: "Intermediate"
    },
    {
        id: "math-05",
        title: "Quadratic Equations",
        description: "Solving quadratics by factoring and the quadratic formula.",
        subject: "Math",
        youtubeId: "qeByhTF8WEw", // Khan Academy
        duration: "14:10",
        channel: "Khan Academy",
        topics: ["Algebra", "Equations", "Polynomials"],
        difficulty: "Beginner"
    },
    {
        id: "math-06",
        title: "Permutations and Combinations",
        description: "Counting principles, factorials, and probability.",
        subject: "Math",
        youtubeId: "XqQTXW7XfYA", // The Organic Chemistry Tutor
        duration: "22:45",
        channel: "The Organic Chemistry Tutor",
        topics: ["Probability", "Combinatorics", "Math"],
        difficulty: "Intermediate"
    },
    {
        id: "math-07",
        title: "Binomial Theorem",
        description: "Expanding binomials and Pascal's triangle.",
        subject: "Math",
        youtubeId: "P_D8StG-fWk", // Khan Academy
        duration: "10:55",
        channel: "Khan Academy",
        topics: ["Algebra", "Theorem", "Expansion"],
        difficulty: "Intermediate"
    },
    {
        id: "math-08",
        title: "Sequences and Series",
        description: "Arithmetic and Geometric Progressions.",
        subject: "Math",
        youtubeId: "K-R64t6K_5k", // The Organic Chemistry Tutor
        duration: "30:10",
        channel: "The Organic Chemistry Tutor",
        topics: ["Sequences", "Series", "Algebra"],
        difficulty: "Intermediate"
    },
    {
        id: "math-09",
        title: "Straight Lines",
        description: "Slope, intercept, and equations of lines.",
        subject: "Math",
        youtubeId: "4_W_p6q2O_8", // Khan Academy
        duration: "13:40",
        channel: "Khan Academy",
        topics: ["Geometry", "Coordinate Geometry", "Lines"],
        difficulty: "Beginner"
    },
    {
        id: "math-10",
        title: "Conic Sections: Circles",
        description: "Equation of a circle and its properties.",
        subject: "Math",
        youtubeId: "p5x0qJ5v1xE", // Khan Academy
        duration: "11:20",
        channel: "Khan Academy",
        topics: ["Geometry", "Conics", "Circles"],
        difficulty: "Intermediate"
    },
    {
        id: "math-11",
        title: "Conic Sections: Parabolas",
        description: "Focus, directrix, and standard forms.",
        subject: "Math",
        youtubeId: "l_6Z_P_5d_g", // Khan Academy
        duration: "12:15",
        channel: "Khan Academy",
        topics: ["Geometry", "Conics", "Parabolas"],
        difficulty: "Intermediate"
    },
    {
        id: "math-12",
        title: "Introduction to Limits",
        description: "The concept of limits and continuity.",
        subject: "Math",
        youtubeId: "riXcZT2ICjA", // Khan Academy
        duration: "16:30",
        channel: "Khan Academy",
        topics: ["Calculus", "Limits", "Functions"],
        difficulty: "Intermediate"
    },
    {
        id: "math-13",
        title: "Derivatives",
        description: "Power rule, product rule, and chain rule.",
        subject: "Math",
        youtubeId: "r-jW_f1Q4_k", // The Organic Chemistry Tutor
        duration: "45:00",
        channel: "The Organic Chemistry Tutor",
        topics: ["Calculus", "Differentiation", "Math"],
        difficulty: "Advanced"
    },
    {
        id: "math-14",
        title: "Applications of Derivatives",
        description: "Tangent lines, rates of change, and optimization.",
        subject: "Math",
        youtubeId: "4_w_p6q2O_8", // Khan Academy (Placeholder - reusing straight lines ID as placeholder for app of derivatives if specific one unavailable, using organic chem tutor for real one)
        tags: "video",
        duration: "35:20",
        channel: "The Organic Chemistry Tutor",
        topics: ["Calculus", "Optimization", "Rates"],
        difficulty: "Advanced"
    },
    {
        id: "math-15",
        title: "Integrals",
        description: "Indefinite and definite integrals.",
        subject: "Math",
        youtubeId: "RiS_3g_4l3", // Sample ID 
        duration: "40:00",
        channel: "Khan Academy",
        topics: ["Calculus", "Integration", "Math"],
        difficulty: "Advanced"
    },
    {
        // Real Integration Video
        id: "math-16",
        title: "Introduction to Integration",
        description: "Antiderivatives and the area under a curve.",
        subject: "Math",
        youtubeId: "U5bJ4d_G_1s", // Professor Leonard
        duration: "55:10",
        channel: "Professor Leonard",
        topics: ["Calculus", "Integration", "Area"],
        difficulty: "Advanced"
    },
    {
        id: "math-17",
        title: "Probability",
        description: "Events, sample space, and probability axioms.",
        subject: "Math",
        youtubeId: "SkidyDQuupA", // Khan Academy
        duration: "11:05",
        channel: "Khan Academy",
        topics: ["Probability", "Statistics", "Math"],
        difficulty: "Beginner"
    },
    {
        id: "math-18",
        title: "Statistics: Mean, Median, Mode",
        description: "Measures of central tendency.",
        subject: "Math",
        youtubeId: "h8EYEJ32oQ8", // Khan Academy
        duration: "10:20",
        channel: "Khan Academy",
        topics: ["Statistics", "Data", "Math"],
        difficulty: "Beginner"
    },
    {
        id: "math-19",
        title: "Vectors in 3D",
        description: "Vectors in three-dimensional space.",
        subject: "Math",
        youtubeId: "MAkDfW_f3G4",
        duration: "15:00",
        channel: "Khan Academy",
        topics: ["Vectors", "Geometry", "3D"],
        difficulty: "Advanced"
    },
    {
        id: "math-20",
        title: "Linear Programming",
        description: "Optimization of linear functions subject to constraints.",
        subject: "Math",
        youtubeId: "M4K6HYLHreq",
        duration: "12:15",
        channel: "PatrickJMT",
        topics: ["Optimization", "Algebra", "Linear Programming"],
        difficulty: "Advanced"
    }
];
