import { db } from "../db";
import { chapterContent } from "../../shared/schema";

const chapters = [
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 11,
    chapterTitle: "Thermal Properties of Matter",
    introduction: "This chapter explores how matter responds to heat and temperature changes. We study temperature scales, thermal expansion, specific heat, calorimetry, and heat transfer mechanisms.",
    detailedNotes: `# Thermal Properties of Matter

## Temperature and Heat

**Temperature:** measure of hotness or coldness; related to average kinetic energy of molecules.
**Heat:** energy transferred due to temperature difference.

**Temperature scales:**
- K = C + 273.15
- F = (9/5) C + 32

## Thermal Expansion

- delta L = alpha L0 delta T
- delta A = beta A0 delta T (beta = 2 alpha)
- delta V = gamma V0 delta T (gamma = 3 alpha)

**Anomalous expansion of water:** density is maximum at 4 C.

## Calorimetry

- Q = m c delta T
- Latent heat: Q = m L
- Principle of heat exchange: sum Q = 0 (no heat loss to surroundings)

## Heat Transfer

- Conduction: Q/t = k A (T1 - T2) / L
- Convection: heat transfer by bulk fluid motion
- Radiation: P = sigma A (T^4 - T_env^4)

## Newton's Law of Cooling

- dT/dt = -k (T - T_env)` ,
    keyConcepts: [
      {
        title: "Temperature Scales",
        description: "Conversions between Celsius, Kelvin, and Fahrenheit.",
        formula: "K = C + 273.15, F = (9/5) C + 32",
      },
      {
        title: "Thermal Expansion",
        description: "Solids expand when heated; expansion depends on alpha.",
        formula: "delta L = alpha L0 delta T",
      },
      {
        title: "Calorimetry",
        description: "Heat exchange and specific heat capacity.",
        formula: "Q = m c delta T",
      },
      {
        title: "Latent Heat",
        description: "Heat required for phase change at constant temperature.",
        formula: "Q = m L",
      },
      {
        title: "Heat Conduction",
        description: "Rate of heat flow through a material.",
        formula: "Q/t = k A (T1 - T2) / L",
      },
    ],
    formulas: [
      "K = C + 273.15",
      "F = (9/5) C + 32",
      "delta L = alpha L0 delta T",
      "delta A = beta A0 delta T",
      "delta V = gamma V0 delta T",
      "Q = m c delta T",
      "Q = m L",
      "Q/t = k A (T1 - T2) / L",
      "P = sigma A (T^4 - T_env^4)",
      "dT/dt = -k (T - T_env)",
    ],
    importantTopics: [
      "Temperature scales conversion",
      "Thermal expansion calculations",
      "Calorimetry problems",
      "Phase changes and latent heat",
      "Heat transfer mechanisms",
      "Newton's law of cooling",
    ],
    learningObjectives: [
      "Convert between temperature scales",
      "Calculate thermal expansion",
      "Solve calorimetry problems",
      "Apply latent heat in phase change calculations",
      "Understand heat transfer mechanisms",
      "Apply Newton's law of cooling",
    ],
    prerequisites: [
      "Heat and temperature concepts",
      "Energy conservation",
      "Basic algebra",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 11",
    visualizationsData: [
      {
        type: "concept",
        title: "Thermal Expansion (Bimetallic Strip)",
        description: "See how different metals expand with heat.",
        config: {
          visualizationName: "bimetallic-strip",
        },
      },
      {
        type: "concept",
        title: "Calorimetry Heat Exchange",
        description: "Track heat flow and temperature changes during mixing.",
        config: {
          visualizationName: "calorimetry",
        },
      },
    ],
    difficultyLevel: 3,
    estimatedStudyMinutes: 300,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 12,
    chapterTitle: "Thermodynamics",
    introduction: "Thermodynamics deals with heat, work, and energy transformations. We study the laws governing energy conversion, heat engines, refrigerators, and entropy.",
    detailedNotes: `# Thermodynamics

## Thermodynamic System

- Open system: exchanges matter and energy
- Closed system: exchanges energy only
- Isolated system: no exchange

## Zeroth Law

If two systems are each in thermal equilibrium with a third, they are in thermal equilibrium with each other.

## First Law

Energy conservation:
- delta Q = delta U + W
- Work done by the system is positive

**Processes:**
- Isothermal (T constant): delta U = 0, W = n R T ln(V2/V1)
- Isochoric (V constant): W = 0
- Isobaric (P constant): W = P delta V
- Adiabatic: Q = 0, P V^gamma = constant

## Second Law

- Heat cannot spontaneously flow from cold to hot
- No engine can convert all heat into work

**Entropy:**
- delta S = Q_rev / T

## Heat Engines and Refrigerators

- Efficiency: eta = W / Qh = 1 - Qc/Qh
- Carnot efficiency: eta = 1 - Tc/Th
- Refrigerator COP: K = Qc / W = Tc / (Th - Tc)` ,
    keyConcepts: [
      {
        title: "First Law",
        description: "Heat supplied equals increase in internal energy plus work done.",
        formula: "delta Q = delta U + W",
      },
      {
        title: "Thermodynamic Processes",
        description: "Isothermal, adiabatic, isobaric, and isochoric processes.",
        formula: "Isothermal: W = n R T ln(V2/V1); Adiabatic: P V^gamma = constant",
      },
      {
        title: "Entropy",
        description: "Measure of disorder; defined for reversible processes.",
        formula: "delta S = Q_rev / T",
      },
      {
        title: "Heat Engine Efficiency",
        description: "Efficiency depends on heat absorbed and rejected.",
        formula: "eta = 1 - Qc/Qh",
      },
      {
        title: "Carnot Cycle",
        description: "Ideal reversible engine sets the maximum efficiency.",
        formula: "eta = 1 - Tc/Th",
      },
    ],
    formulas: [
      "delta Q = delta U + W",
      "W = P delta V",
      "W = n R T ln(V2/V1)",
      "P V^gamma = constant",
      "T V^(gamma-1) = constant",
      "U = (f/2) n R T",
      "eta = 1 - Qc/Qh",
      "eta_carnot = 1 - Tc/Th",
      "K = Qc / W = Tc / (Th - Tc)",
    ],
    importantTopics: [
      "Laws of thermodynamics",
      "Thermodynamic processes and PV diagrams",
      "Heat engine efficiency",
      "Carnot cycle",
      "Entropy and second law",
      "Refrigerator performance",
    ],
    learningObjectives: [
      "Apply first law to various processes",
      "Calculate work done in thermodynamic processes",
      "Determine efficiency of heat engines",
      "Understand entropy and irreversibility",
      "Solve Carnot cycle problems",
    ],
    prerequisites: [
      "Kinetic theory basics",
      "Energy conservation",
      "Ideal gas equation",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 12",
    visualizationsData: [
      {
        type: "concept",
        title: "Carnot Cycle (P-V Diagram)",
        description: "Explore reversible processes and efficiency limits.",
        config: {
          visualizationName: "carnot-cycle",
        },
      },
      {
        type: "concept",
        title: "Calorimetry Heat Exchange",
        description: "Track heat flow and temperature changes during mixing.",
        config: {
          visualizationName: "calorimetry",
        },
      },
    ],
    difficultyLevel: 5,
    estimatedStudyMinutes: 420,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 13,
    chapterTitle: "Kinetic Theory",
    introduction: "This chapter connects macroscopic thermodynamic properties to microscopic molecular motion. We study ideal gas behavior, kinetic interpretation of temperature, and mean free path.",
    detailedNotes: `# Kinetic Theory

## Assumptions of Ideal Gas

1. Large number of molecules in random motion
2. Molecular volume is negligible compared to container volume
3. No intermolecular forces except during collisions
4. Collisions are perfectly elastic

## Pressure from Kinetic Theory

- P = (1/3) rho v_rms^2
- rho = mass density of gas

## Temperature and Kinetic Energy

- Average KE per molecule = (3/2) k T
- For one mole: (1/2) m v_rms^2 = (3/2) R T

## Degrees of Freedom and Internal Energy

- U = (f/2) n R T
- f is degrees of freedom

## Molecular Speeds

- v_rms = sqrt(3 R T / M)
- v_avg = sqrt(8 R T / (pi M))
- v_mp = sqrt(2 R T / M)

## Mean Free Path

- lambda = 1 / (sqrt(2) pi d^2 n)` ,
    keyConcepts: [
      {
        title: "Pressure Relation",
        description: "Macroscopic pressure arises from molecular collisions.",
        formula: "P = (1/3) rho v_rms^2",
      },
      {
        title: "Temperature and KE",
        description: "Temperature measures average molecular kinetic energy.",
        formula: "Average KE = (3/2) k T",
      },
      {
        title: "Internal Energy",
        description: "Depends only on temperature for an ideal gas.",
        formula: "U = (f/2) n R T",
      },
      {
        title: "Molecular Speeds",
        description: "RMS, average, and most probable speeds.",
        formula: "v_rms = sqrt(3 R T / M)",
      },
      {
        title: "Mean Free Path",
        description: "Average distance between collisions.",
        formula: "lambda = 1 / (sqrt(2) pi d^2 n)",
      },
    ],
    formulas: [
      "P = (1/3) rho v_rms^2",
      "Average KE = (3/2) k T",
      "U = (f/2) n R T",
      "v_rms = sqrt(3 R T / M)",
      "v_avg = sqrt(8 R T / (pi M))",
      "v_mp = sqrt(2 R T / M)",
      "lambda = 1 / (sqrt(2) pi d^2 n)",
    ],
    importantTopics: [
      "Kinetic theory assumptions",
      "Derivation of pressure formula",
      "Molecular speed calculations",
      "Degrees of freedom",
      "Equipartition theorem",
      "Mean free path",
    ],
    learningObjectives: [
      "Derive pressure from kinetic theory",
      "Calculate molecular speeds",
      "Apply equipartition theorem",
      "Determine degrees of freedom",
      "Calculate mean free path",
    ],
    prerequisites: [
      "Newton's laws",
      "Ideal gas equation",
      "Basic statistics",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 13",
    visualizationsData: [
      {
        type: "concept",
        title: "Gas Molecules Simulator",
        description: "Visualize random molecular motion and temperature effects.",
        config: {
          visualizationName: "gas-molecules",
        },
      },
      {
        type: "concept",
        title: "Avogadro Jar",
        description: "Explore gas volume, particle count, and pressure.",
        config: {
          visualizationName: "avogadro-jar",
        },
      },
    ],
    difficultyLevel: 4,
    estimatedStudyMinutes: 360,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 14,
    chapterTitle: "Oscillations",
    introduction: "This chapter studies periodic motion, focusing on simple harmonic motion (SHM). We explore oscillations in springs, pendulums, and energy in SHM.",
    detailedNotes: `# Oscillations

## Simple Harmonic Motion (SHM)

SHM is periodic motion where the restoring force is proportional to displacement and directed toward equilibrium.

- F = -k x
- a = -omega^2 x

**Displacement:**
- x = A sin(omega t + phi)

**Velocity:**
- v = dx/dt
- v_max = omega A

**Acceleration:**
- a = -omega^2 x

## Energy in SHM

- PE = 0.5 k x^2
- KE = 0.5 m v^2
- Total energy: E = 0.5 k A^2 = 0.5 m omega^2 A^2 (constant)

## Spring-Mass System

- omega = sqrt(k/m)
- T = 2 pi sqrt(m/k)

## Simple Pendulum (small angle)

- T = 2 pi sqrt(L/g)

## Damping and Resonance

- Damping reduces amplitude over time
- Resonance occurs when driving frequency matches natural frequency` ,
    keyConcepts: [
      {
        title: "SHM Condition",
        description: "Restoring force proportional to displacement.",
        formula: "F = -k x, a = -omega^2 x",
      },
      {
        title: "Spring-Mass System",
        description: "Angular frequency and time period for a spring.",
        formula: "omega = sqrt(k/m), T = 2 pi sqrt(m/k)",
      },
      {
        title: "Simple Pendulum",
        description: "Small-angle oscillations have fixed period.",
        formula: "T = 2 pi sqrt(L/g)",
      },
      {
        title: "Energy in SHM",
        description: "Total energy remains constant in ideal SHM.",
        formula: "E = 0.5 k A^2",
      },
      {
        title: "Resonance",
        description: "Large amplitude when driving frequency equals natural frequency.",
        formula: "f_drive = f_natural",
      },
    ],
    formulas: [
      "x = A sin(omega t + phi)",
      "v_max = omega A",
      "a = -omega^2 x",
      "omega = sqrt(k/m)",
      "T = 2 pi sqrt(m/k)",
      "T = 2 pi sqrt(L/g)",
      "E = 0.5 k A^2",
      "E = 0.5 m omega^2 A^2",
    ],
    importantTopics: [
      "SHM equations and graphs",
      "Energy in SHM",
      "Spring-mass oscillations",
      "Simple pendulum motion",
      "Damping and resonance",
    ],
    learningObjectives: [
      "Identify SHM conditions",
      "Derive and apply SHM equations",
      "Calculate energy in oscillating systems",
      "Analyze spring and pendulum systems",
      "Understand damping and resonance",
    ],
    prerequisites: [
      "Newton's laws",
      "Energy conservation",
      "Trigonometry",
      "Calculus basics",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 14",
    visualizationsData: [
      {
        type: "concept",
        title: "Simple Pendulum Phase",
        description: "Explore SHM in phase space (theta vs omega).",
        config: {
          visualizationName: "simple-pendulum-phase",
        },
      },
      {
        type: "concept",
        title: "Spring Energy Bar",
        description: "See energy exchange between kinetic and potential energy.",
        config: {
          visualizationName: "spring-energy-bar",
        },
      },
    ],
    difficultyLevel: 4,
    estimatedStudyMinutes: 360,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 15,
    chapterTitle: "Waves",
    introduction: "This chapter explores wave motion, types of waves, wave properties, and phenomena like interference, diffraction, and beats. We study sound waves and their characteristics.",
    detailedNotes: `# Waves

## Wave Motion

Wave motion transfers energy without transporting matter over long distances.

**Wave equation:**
- y(x,t) = A sin(k x - omega t + phi)
- k = 2 pi / lambda
- omega = 2 pi f
- v = lambda f = omega / k

## Types of Waves

- Transverse: particle motion perpendicular to wave direction
- Longitudinal: particle motion parallel to wave direction

## Waves on a String

- v = sqrt(T / mu)
- Standing waves: f_n = n v / (2 L)

## Sound Waves in Pipes

- Open pipe: f_n = n v / (2 L)
- Closed pipe: f_n = (2n - 1) v / (4 L)

## Interference and Beats

- Superposition leads to interference
- Beats frequency: f_beat = |f1 - f2|

## Doppler Effect

- f' = f (v +/- v_o) / (v -/+ v_s)` ,
    keyConcepts: [
      {
        title: "Wave Parameters",
        description: "Relationship between wavelength, frequency, and speed.",
        formula: "v = lambda f",
      },
      {
        title: "Standing Waves",
        description: "Allowed frequencies on a string or in air columns.",
        formula: "f_n = n v / (2 L)",
      },
      {
        title: "Beats",
        description: "Interference of close frequencies causes beats.",
        formula: "f_beat = |f1 - f2|",
      },
      {
        title: "Doppler Effect",
        description: "Observed frequency changes due to relative motion.",
        formula: "f' = f (v +/- v_o) / (v -/+ v_s)",
      },
      {
        title: "Wave Speed on String",
        description: "Depends on tension and mass per length.",
        formula: "v = sqrt(T / mu)",
      },
    ],
    formulas: [
      "y(x,t) = A sin(k x - omega t + phi)",
      "k = 2 pi / lambda",
      "omega = 2 pi f",
      "v = lambda f",
      "v = sqrt(T / mu)",
      "f_n = n v / (2 L)",
      "f_n(closed) = (2n - 1) v / (4 L)",
      "f_beat = |f1 - f2|",
      "f' = f (v +/- v_o) / (v -/+ v_s)",
    ],
    importantTopics: [
      "Wave types and motion",
      "Wave equation",
      "Interference patterns",
      "Standing waves",
      "Sound characteristics",
      "Beats",
      "Doppler effect",
    ],
    learningObjectives: [
      "Distinguish wave types",
      "Apply wave equations",
      "Analyze interference patterns",
      "Calculate standing wave frequencies",
      "Understand sound properties",
      "Solve Doppler effect problems",
    ],
    prerequisites: [
      "SHM concepts",
      "Trigonometry",
      "Wave basics",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 15",
    visualizationsData: [
      {
        type: "concept",
        title: "Standing Waves",
        description: "Visualize nodes, antinodes, and harmonics.",
        config: {
          visualizationName: "standing-wave",
        },
      },
      {
        type: "concept",
        title: "Resonance Tube",
        description: "Explore resonance in air columns and harmonics.",
        config: {
          visualizationName: "resonance-tube",
        },
      },
      {
        type: "concept",
        title: "Doppler Effect",
        description: "See frequency shift with relative motion.",
        config: {
          visualizationName: "doppler-effect",
        },
      },
      {
        type: "concept",
        title: "Interference Pattern",
        description: "Constructive and destructive interference patterns.",
        config: {
          visualizationName: "interference-pattern",
        },
      },
    ],
    difficultyLevel: 4,
    estimatedStudyMinutes: 360,
    status: "published" as const,
  },
];

async function seedPhysicsChapters11to15() {
  console.log("🌱 Seeding Physics Class 11 chapters 11-15...");

  for (const chapter of chapters) {
    await db
      .insert(chapterContent)
      .values(chapter)
      .onConflictDoUpdate({
        target: [
          chapterContent.subject,
          chapterContent.classLevel,
          chapterContent.chapterNumber,
        ],
        set: {
          chapterTitle: chapter.chapterTitle,
          introduction: chapter.introduction,
          detailedNotes: chapter.detailedNotes,
          keyConcepts: chapter.keyConcepts,
          formulas: chapter.formulas,
          importantTopics: chapter.importantTopics,
          learningObjectives: chapter.learningObjectives,
          prerequisites: chapter.prerequisites,
          ncertChapterRef: chapter.ncertChapterRef,
          visualizationsData: chapter.visualizationsData,
          difficultyLevel: chapter.difficultyLevel,
          estimatedStudyMinutes: chapter.estimatedStudyMinutes,
          status: chapter.status,
        },
      });

    console.log(`  ✅ Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle} upserted`);
  }

  console.log("✅ Physics Class 11 chapters 11-15 seeding completed!");
}

seedPhysicsChapters11to15()
  .then(() => {
    console.log("Seed completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
