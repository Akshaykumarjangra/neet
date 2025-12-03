import { db } from "../db";
import { chapterContent } from "../../shared/schema";

const chapters = [
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 1,
    chapterTitle: "Some Basic Concepts of Chemistry",
    introduction: "This chapter introduces fundamental concepts of chemistry including matter, atoms, molecules, chemical reactions, and stoichiometry. We explore the laws of chemical combination and quantitative aspects of chemistry.",
    detailedNotes: `# Some Basic Concepts of Chemistry

## Nature of Matter

**Classification:**
- Pure substances: Elements and Compounds
- Mixtures: Homogeneous and Heterogeneous

**States of Matter:**
- Solid: Definite shape and volume
- Liquid: Definite volume, no fixed shape
- Gas: No fixed shape or volume

**Physical and Chemical Properties:**
- Physical: Observed without changing composition
- Chemical: Observed during chemical reaction

## Laws of Chemical Combination

**1. Law of Conservation of Mass:**
- Mass is neither created nor destroyed
- Total mass of reactants = Total mass of products

**2. Law of Definite Proportions:**
- A pure compound always contains same elements in same proportion by mass

**3. Law of Multiple Proportions:**
- When two elements combine in different ratios, masses of one element bear simple ratio

**4. Gay-Lussac's Law:**
- Gases combine in simple ratios by volume at same T and P

**5. Avogadro's Law:**
- Equal volumes of gases at same T and P contain equal number of molecules

## Dalton's Atomic Theory

**Postulates:**
1. Matter is made of indivisible atoms
2. Atoms of same element are identical
3. Atoms combine in simple whole number ratios
4. Atoms cannot be created or destroyed

## Atomic and Molecular Masses

**Atomic Mass:**
- Relative mass of atom compared to C-12
- Atomic mass of C-12 = 12 u exactly

**Molecular Mass:**
- Sum of atomic masses of all atoms in molecule
- M_r = Σ(atomic masses)

**Formula Mass:**
- For ionic compounds (no discrete molecules)

## Mole Concept

**Definition:**
- 1 mole = 6.022 × 10²³ particles (Avogadro's number)
- Amount of substance containing N_A entities

**Molar Mass:**
- Mass of 1 mole of substance
- Numerically equal to atomic/molecular mass
- Unit: g/mol

**Relationships:**
- n = m/M (moles = mass/molar mass)
- n = N/N_A (moles = number of particles/Avogadro's number)
- For gases: n = V/V_m (V_m = 22.4 L at STP)

## Percentage Composition

**Mass Percentage:**
- % of element = (mass of element/total mass) × 100

**Empirical and Molecular Formulas:**
- Empirical: Simplest whole number ratio
- Molecular: Actual number of atoms
- Molecular formula = n × Empirical formula

## Stoichiometry

**Balancing Equations:**
- Law of conservation of mass
- Atoms on both sides must be equal

**Stoichiometric Calculations:**
- Mole-mole relationships from balanced equation
- Mass-mass calculations
- Volume-volume for gases

**Limiting Reagent:**
- Reactant completely consumed first
- Determines amount of product formed

**Percentage Yield:**
- % Yield = (Actual yield/Theoretical yield) × 100`,
    keyConcepts: [
      "Laws of chemical combination",
      "Dalton's atomic theory",
      "Atomic and molecular masses",
      "Mole concept and Avogadro's number",
      "Empirical and molecular formulas",
      "Stoichiometry and limiting reagent",
    ],
    formulas: [
      "n = m/M (moles = mass/molar mass)",
      "n = N/N_A",
      "n = V/22.4 (at STP for gases)",
      "% composition = (mass of element/total mass) × 100",
      "% Yield = (Actual yield/Theoretical yield) × 100",
    ],
    importantTopics: [
      "Mole concept",
      "Stoichiometric calculations",
      "Empirical and molecular formulas",
      "Limiting reagent",
      "Percentage composition",
    ],
    learningObjectives: [
      "Understand laws of chemical combination",
      "Apply mole concept in calculations",
      "Determine empirical and molecular formulas",
      "Perform stoichiometric calculations",
      "Identify limiting reagent",
    ],
    prerequisites: [
      "Basic mathematics",
      "Atomic structure basics",
    ],
    ncertChapterRef: "Class 11 Chemistry - Chapter 1",
    visualizationsData: [
      {
        type: "atomic-structure",
        title: "Atomic Structure Model",
        description: "Visualize atoms and molecules at the particle level",
        config: {
          protons: 6,
          neutrons: 6,
          electrons: 6,
          showOrbits: true
        }
      },
    ],
    difficultyLevel: 2,
    estimatedStudyMinutes: 300,
    status: "published" as const,
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 2,
    chapterTitle: "Structure of Atom",
    introduction: "This chapter explores the internal structure of atoms, from Thomson's model to quantum mechanical model. We study atomic spectra, quantum numbers, and electronic configuration.",
    detailedNotes: `# Structure of Atom

## Discovery of Subatomic Particles

**Electron (J.J. Thomson):**
- Cathode ray experiments
- e/m ratio = 1.76 × 10¹¹ C/kg
- Charge = -1.6 × 10⁻¹⁹ C

**Proton (Rutherford):**
- Anode ray experiments
- Mass = 1.67 × 10⁻²⁷ kg
- Charge = +1.6 × 10⁻¹⁹ C

**Neutron (Chadwick):**
- Mass ≈ proton mass
- No charge

## Atomic Models

**Thomson's Plum Pudding Model:**
- Positive charge spread throughout
- Electrons embedded like plums

**Rutherford's Nuclear Model:**
- α-particle scattering experiment
- Nucleus contains protons
- Most of atom is empty space
- Electrons revolve around nucleus

**Limitations:**
- Cannot explain stability of atom
- Cannot explain atomic spectra

## Bohr's Model

**Postulates:**
1. Electrons revolve in fixed orbits
2. Angular momentum quantized: mvr = nh/2π
3. Energy emitted when electron jumps to lower orbit

**Energy Levels:**
- E_n = -13.6/n² eV (for hydrogen)
- r_n = 0.529n² Å

**Limitations:**
- Only for hydrogen-like atoms
- Cannot explain fine structure of spectra
- Violates Heisenberg's uncertainty principle

## Quantum Mechanical Model

**de Broglie's Wave-Particle Duality:**
- λ = h/mv

**Heisenberg's Uncertainty Principle:**
- Δx · Δp ≥ h/4π
- Cannot determine position and momentum simultaneously

**Schrödinger Wave Equation:**
- Ĥψ = Eψ
- ψ² represents probability density

## Quantum Numbers

**1. Principal (n):**
- Shell number (n = 1, 2, 3...)
- Determines energy and size

**2. Azimuthal (l):**
- Subshell (l = 0 to n-1)
- s(0), p(1), d(2), f(3)
- Determines shape

**3. Magnetic (m_l):**
- Orbital orientation (m_l = -l to +l)
- Number of orbitals = 2l + 1

**4. Spin (m_s):**
- Electron spin (+½ or -½)

## Shapes of Orbitals

**s-orbital:**
- Spherical
- 1 orbital per s-subshell

**p-orbital:**
- Dumbbell shaped
- 3 orbitals (p_x, p_y, p_z)

**d-orbital:**
- Complex shapes
- 5 orbitals

## Electronic Configuration

**Aufbau Principle:**
- Electrons fill lowest energy orbitals first
- Order: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p...

**Pauli's Exclusion Principle:**
- No two electrons can have same set of quantum numbers
- Maximum 2 electrons per orbital (opposite spins)

**Hund's Rule:**
- Maximum multiplicity
- Electrons prefer unpaired in degenerate orbitals

**Stability:**
- Half-filled and fully-filled subshells are stable
- Examples: Cr = [Ar] 3d⁵ 4s¹, Cu = [Ar] 3d¹⁰ 4s¹`,
    keyConcepts: [
      "Subatomic particles discovery",
      "Atomic models (Thomson, Rutherford, Bohr)",
      "Quantum mechanical model",
      "Quantum numbers",
      "Orbital shapes and orientations",
      "Electronic configuration rules",
    ],
    formulas: [
      "Angular momentum: mvr = nh/2π",
      "Energy: E_n = -13.6/n² eV",
      "de Broglie: λ = h/mv",
      "Uncertainty: Δx·Δp ≥ h/4π",
      "Number of orbitals in subshell = 2l + 1",
      "Maximum electrons in shell = 2n²",
    ],
    importantTopics: [
      "Bohr's atomic model",
      "Quantum numbers",
      "Electronic configuration",
      "Aufbau principle and Hund's rule",
      "Orbital shapes",
    ],
    learningObjectives: [
      "Understand evolution of atomic models",
      "Apply quantum numbers to describe electrons",
      "Write electronic configurations",
      "Understand orbital shapes",
    ],
    prerequisites: [
      "Basic atomic structure",
      "Energy concepts",
    ],
    ncertChapterRef: "Class 11 Chemistry - Chapter 2",
    visualizationsData: [
      {
        type: "atomic-structure",
        title: "Bohr's Atomic Model",
        description: "Visualize electron orbits and energy levels in atoms",
        config: {
          protons: 8,
          neutrons: 8,
          electrons: 8,
          showOrbits: true
        }
      },
    ],
    difficultyLevel: 4,
    estimatedStudyMinutes: 360,
    status: "published" as const,
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 3,
    chapterTitle: "Classification of Elements and Periodicity in Properties",
    introduction: "This chapter covers the periodic table, periodic trends, and classification of elements based on electronic configuration and chemical properties.",
    detailedNotes: `# Classification of Elements and Periodicity

## Development of Periodic Table

**Dobereiner's Triads:**
- Groups of 3 elements
- Middle element's atomic mass ≈ average of other two

**Newlands' Law of Octaves:**
- Every 8th element has similar properties

**Mendeleev's Periodic Law:**
- Properties are periodic function of atomic mass
- Predicted new elements
- Left gaps for undiscovered elements

**Modern Periodic Law:**
- Properties are periodic function of atomic number
- Moseley's contribution

## Modern Periodic Table

**Structure:**
- 18 groups (vertical columns)
- 7 periods (horizontal rows)
- s, p, d, f blocks

**Classification:**
- **s-block:** Group 1-2 (alkali and alkaline earth metals)
- **p-block:** Group 13-18 (metals, metalloids, non-metals)
- **d-block:** Group 3-12 (transition metals)
- **f-block:** Lanthanides and actinides

## Electronic Configuration and Periodic Table

**Period Number:**
- Number of shells = Period number

**Group Number:**
- s-block: Group = number of valence electrons
- p-block: Group = 10 + valence electrons
- d-block: Group = (n-1)d electrons + ns electrons

## Periodic Trends

**1. Atomic Radius:**
- **Along period:** Decreases (increasing nuclear charge)
- **Down group:** Increases (new shells added)

**2. Ionic Radius:**
- Cation < parent atom < anion
- Isoelectronic: radius decreases with increasing Z

**3. Ionization Energy (IE):**
- Energy to remove electron from gaseous atom
- **Along period:** Increases
- **Down group:** Decreases
- Successive IE: IE₁ < IE₂ < IE₃

**4. Electron Gain Enthalpy:**
- Energy change when electron added
- **Along period:** Becomes more negative
- **Down group:** Becomes less negative
- Halogens have highest electron affinity

**5. Electronegativity:**
- Tendency to attract shared electrons
- **Pauling scale:** F = 4.0 (highest)
- **Along period:** Increases
- **Down group:** Decreases

**6. Metallic Character:**
- **Along period:** Decreases
- **Down group:** Increases

**7. Valency:**
- s and p blocks: varies across period
- First increases then decreases

## Periodicity in Chemical Properties

**Oxidation States:**
- Maximum = group number (for representative elements)

**Acidic/Basic Nature:**
- Metal oxides: Basic
- Non-metal oxides: Acidic
- Amphoteric: Al₂O₃, ZnO

**Hydrides:**
- Ionic: s-block
- Covalent: p-block`,
    keyConcepts: [
      "Modern periodic table organization",
      "Electronic configuration and periodicity",
      "Periodic trends (atomic radius, IE, EA)",
      "Electronegativity",
      "Metallic and non-metallic character",
    ],
    formulas: [
      "Atomic radius: decreases across period",
      "Ionization energy: increases across period",
      "Electron affinity: becomes more negative across period",
      "Electronegativity: increases across period",
    ],
    importantTopics: [
      "Periodic table organization",
      "Atomic and ionic radii trends",
      "Ionization energy variations",
      "Electronegativity",
      "Periodicity in properties",
    ],
    learningObjectives: [
      "Understand periodic table structure",
      "Predict periodic trends",
      "Relate electronic configuration to position",
      "Compare properties using periodic trends",
    ],
    prerequisites: [
      "Electronic configuration",
      "Atomic structure",
    ],
    ncertChapterRef: "Class 11 Chemistry - Chapter 3",
    visualizationsData: [],
    difficultyLevel: 3,
    estimatedStudyMinutes: 300,
    status: "published" as const,
  },
];

async function seedChemistryChapters1to3() {
  console.log("🌱 Seeding Chemistry Class 11 chapters 1-3...");

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

  console.log("✅ Chemistry Class 11 chapters 1-3 seeding completed!");
}

seedChemistryChapters1to3()
  .then(() => {
    console.log("Seed completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
