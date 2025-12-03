import { db } from "../db";
import { chapterContent } from "../../shared/schema";

const chapters = [
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 4,
    chapterTitle: "Chemical Bonding and Molecular Structure",
    introduction: "This chapter explores how atoms combine to form molecules through chemical bonds. We study ionic, covalent, and metallic bonding, along with molecular geometry and hybridization.",
    detailedNotes: `# Chemical Bonding and Molecular Structure

## Kossel-Lewis Approach

**Octet Rule:**
- Atoms tend to achieve 8 electrons in valence shell
- Noble gas configuration (stable)
- Exceptions: H (2 electrons), Li, Be, B

**Lewis Symbols:**
- Valence electrons shown as dots around element symbol

## Types of Chemical Bonds

**1. Ionic Bond:**
- Transfer of electrons from metal to non-metal
- Electrostatic attraction between ions
- High melting point, conduct in molten/aqueous state
- Example: NaCl, MgO, CaF₂

**Lattice Energy:**
- Energy released when gaseous ions form ionic solid
- Higher charge, smaller size → higher lattice energy

**2. Covalent Bond:**
- Sharing of electron pairs
- Non-metal + Non-metal
- Directional bond
- Lower melting point than ionic

**Types of Covalent Bonds:**
- Single bond: 1 shared pair (C-C in ethane)
- Double bond: 2 shared pairs (C=C in ethene)
- Triple bond: 3 shared pairs (C≡C in ethyne)

**3. Coordinate/Dative Bond:**
- Both electrons from same atom
- Donor → Acceptor
- Example: NH₃-BF₃, H₃N→BF₃

## Lewis Structures

**Steps to Draw:**
1. Count total valence electrons
2. Write skeletal structure (least electronegative in center)
3. Complete octets (duets for H)
4. Calculate formal charge to check stability

**Formal Charge:**
- FC = V - N - B/2
- V = valence electrons in free atom
- N = non-bonding electrons
- B = bonding electrons
- Most stable structure has minimal formal charges

**Resonance:**
- Multiple Lewis structures possible
- Actual structure is resonance hybrid
- Example: CO₃²⁻ (3 resonance structures), benzene

## VSEPR Theory

**Valence Shell Electron Pair Repulsion:**
- Electron pairs repel each other
- Arrange to minimize repulsion
- Determines molecular geometry

**Common Geometries:**

**Linear:** 2 bp, 180° angle
- Example: BeF₂, CO₂

**Trigonal planar:** 3 bp, 120° angle
- Example: BF₃, BCl₃

**Tetrahedral:** 4 bp, 109.5° angle
- Example: CH₄, CCl₄

**Trigonal bipyramidal:** 5 bp
- 3 equatorial (120°), 2 axial (90°)
- Example: PCl₅

**Octahedral:** 6 bp, 90° angles
- Example: SF₆

**Effect of Lone Pairs:**
- Lone pair-lone pair > lone pair-bond pair > bond pair-bond pair repulsion
- H₂O: Bent (104.5°) - 2 bp, 2 lp
- NH₃: Pyramidal (107°) - 3 bp, 1 lp

## Valence Bond Theory

**Postulates:**
1. Bond formed by overlap of atomic orbitals
2. Orbitals must have unpaired electrons
3. Greater overlap → stronger bond
4. Electron spins must be opposite

**Types of Overlap:**
- σ (sigma) bond: Head-on/axial overlap (stronger)
- π (pi) bond: Lateral/sideways overlap (weaker)

**Bond Characteristics:**
- Bond length: Distance between nuclei
- Bond energy: Energy required to break bond
- Bond angle: Angle between two bonds

## Hybridization

**Definition:**
Mixing of atomic orbitals to form new equivalent hybrid orbitals

**Types and Geometry:**

**sp Hybridization:**
- 1s + 1p → 2 sp orbitals
- Linear geometry (180°)
- Example: BeF₂, C₂H₂ (acetylene)
- 1 sigma bond from sp, pi bonds from unhybridized p

**sp² Hybridization:**
- 1s + 2p → 3 sp² orbitals
- Trigonal planar (120°)
- Example: BF₃, C₂H₄ (ethene)
- Sigma bonds from sp², pi bond from unhybridized p

**sp³ Hybridization:**
- 1s + 3p → 4 sp³ orbitals
- Tetrahedral (109.5°)
- Example: CH₄, NH₃, H₂O
- All single bonds

**sp³d Hybridization:**
- Trigonal bipyramidal
- Example: PCl₅

**sp³d² Hybridization:**
- Octahedral geometry
- Example: SF₆

## Molecular Orbital Theory

**Key Concepts:**
- Atomic orbitals combine to form molecular orbitals (MOs)
- Number of MOs = Number of combining AOs
- Electrons fill MOs following Aufbau, Pauli, Hund's rules

**Types of Molecular Orbitals:**
- Bonding (σ, π): Lower energy, electron density between nuclei
- Antibonding (σ*, π*): Higher energy, nodes between nuclei

**Bond Order:**
- BO = (Nb - Na)/2
- Nb = electrons in bonding MOs
- Na = electrons in antibonding MOs
- Higher bond order → stronger, shorter bond
- BO = 0 means molecule doesn't exist

**Magnetic Properties:**
- Paramagnetic: Unpaired electrons (attracted to magnetic field)
- Diamagnetic: All electrons paired (repelled by magnetic field)

**MO Diagrams for Diatomic Molecules:**
- H₂: (σ1s)², BO = 1, diamagnetic
- O₂: Has 2 unpaired electrons, BO = 2, paramagnetic
- N₂: BO = 3, very stable

## Hydrogen Bonding

**Definition:**
Electrostatic attraction between H atom bonded to highly electronegative atom (F, O, N) and another electronegative atom

**Types:**
- Intermolecular: Between different molecules (H₂O, HF, NH₃)
- Intramolecular: Within same molecule (o-nitrophenol, salicylaldehyde)

**Effects of Hydrogen Bonding:**
- Increases boiling point significantly
- Explains unusual properties of water (high bp, density anomaly)
- Ice has open structure (lower density than water)
- Important in biological molecules (proteins, DNA)

**Strength:**
- Weaker than covalent but stronger than van der Waals forces
- Typically 10-40 kJ/mol`,
    keyConcepts: [
      "Octet rule and Lewis structures",
      "Ionic, covalent, and coordinate bonds",
      "VSEPR theory and molecular shapes",
      "Valence bond theory and orbital overlap",
      "Hybridization (sp, sp², sp³, sp³d, sp³d²)",
      "Molecular orbital theory and bond order",
      "Hydrogen bonding and its effects",
    ],
    formulas: [
      "Formal charge: FC = V - N - B/2",
      "Bond order: BO = (Nb - Na)/2",
    ],
    importantTopics: [
      "Drawing Lewis structures",
      "Predicting molecular geometry",
      "Determining hybridization",
      "MO diagrams and bond order",
      "Hydrogen bonding effects",
    ],
    learningObjectives: [
      "Draw and interpret Lewis structures",
      "Predict molecular geometry using VSEPR",
      "Identify hybridization from structure",
      "Calculate bond order using MO theory",
      "Understand hydrogen bonding importance",
    ],
    prerequisites: [
      "Atomic structure",
      "Electronic configuration",
      "Periodic trends",
    ],
    ncertChapterRef: "Class 11 Chemistry - Chapter 4",
    visualizationsData: [],
    difficultyLevel: 4,
    estimatedStudyMinutes: 420,
    status: "published" as const,
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 5,
    chapterTitle: "States of Matter",
    introduction: "This chapter examines the three states of matter with emphasis on gases. We study gas laws, kinetic theory, and the behavior of real gases.",
    detailedNotes: `# States of Matter

## Three States of Matter

**Solid:**
- Definite shape and volume
- Strong intermolecular forces
- Particles vibrate in fixed positions
- Incompressible
- High density

**Liquid:**
- Definite volume, takes shape of container
- Moderate intermolecular forces
- Particles can move past each other
- Nearly incompressible
- Moderate density

**Gas:**
- No fixed shape or volume
- Weak intermolecular forces
- Particles move freely and randomly
- Highly compressible
- Low density

## Gaseous State - Measurable Properties

**Pressure (P):**
- Force per unit area exerted by gas
- Due to collision of gas molecules with walls
- Units: atm, Pa, bar, mmHg, torr
- 1 atm = 101325 Pa = 760 mmHg = 1.01325 bar

**Volume (V):**
- Space occupied by gas
- Units: L, mL, m³, cm³

**Temperature (T):**
- Measure of average kinetic energy
- Must use Kelvin scale in calculations
- K = °C + 273.15

**Amount (n):**
- Number of moles
- n = mass/molar mass

## Gas Laws

**1. Boyle's Law (T and n constant):**
- At constant temperature, pressure inversely proportional to volume
- P ∝ 1/V
- PV = constant
- P₁V₁ = P₂V₂
- Isothermal process

**2. Charles's Law (P and n constant):**
- At constant pressure, volume directly proportional to temperature
- V ∝ T
- V/T = constant
- V₁/T₁ = V₂/T₂
- Isobaric process
- Absolute zero: -273.15°C

**3. Gay-Lussac's Law (V and n constant):**
- At constant volume, pressure directly proportional to temperature
- P ∝ T
- P/T = constant
- P₁/T₁ = P₂/T₂
- Isochoric process

**4. Avogadro's Law (P and T constant):**
- At constant temperature and pressure, volume proportional to moles
- V ∝ n
- V/n = constant
- Equal volumes of gases at same T and P contain equal number of molecules
- 1 mole of any gas at STP occupies 22.4 L

## Ideal Gas Equation

**Derivation:**
Combining all gas laws gives:
- PV ∝ nT
- PV = nRT

**Ideal Gas Equation:**
- PV = nRT
- R = universal gas constant = 8.314 J/(mol·K) = 0.0821 L·atm/(mol·K)

**Applications:**

**Density of gas:**
- PV = nRT = (m/M)RT
- PM = (m/V)RT = dRT
- d = PM/RT

**Molar mass:**
- M = dRT/P

**Combined Gas Law:**
- P₁V₁/T₁ = P₂V₂/T₂

**STP (Standard Temperature and Pressure):**
- T = 273.15 K (0°C)
- P = 1 atm
- Molar volume = 22.4 L

## Dalton's Law of Partial Pressures

**Statement:**
Total pressure of mixture of non-reacting gases = sum of partial pressures of individual gases

**Formula:**
- P_total = P₁ + P₂ + P₃ + ...
- Partial pressure: P_i = X_i × P_total
- Mole fraction: X_i = n_i/n_total

**Partial Pressure and Ideal Gas:**
- P_i = (n_i RT)/V
- Each gas behaves independently

**Applications:**
- Collecting gases over water
- Gas mixtures in atmosphere

## Graham's Law of Diffusion and Effusion

**Diffusion:**
Spontaneous mixing of gases due to random molecular motion

**Effusion:**
Escape of gas molecules through tiny hole into vacuum

**Graham's Law:**
- Rate of diffusion/effusion ∝ 1/√(Molar mass)
- r₁/r₂ = √(M₂/M₁) = √(d₂/d₁)
- Lighter gases diffuse/effuse faster

**Applications:**
- Separation of isotopes (U-235 and U-238)
- Gas leaks detection

## Kinetic Molecular Theory of Gases

**Postulates:**
1. Gases consist of large number of tiny particles (molecules/atoms)
2. Volume of gas molecules negligible compared to container volume
3. Particles in continuous random motion, colliding with walls
4. No intermolecular forces (except during collisions)
5. Collisions are perfectly elastic (no energy loss)
6. Average kinetic energy proportional to absolute temperature

**Kinetic Gas Equation:**
- PV = (1/3)mnc²
- m = mass of one molecule
- n = number of molecules
- c = root mean square speed

**From Kinetic Theory:**
- PV = (1/3)Nmc²
- Comparing with PV = NkT gives:
- (1/2)mc² = (3/2)kT
- Average KE per molecule = (3/2)kT

**Molecular Speeds:**

**Root mean square speed:**
- c_rms = √(c²) = √(3RT/M) = √(3kT/m)

**Average speed:**
- c_avg = √(8RT/πM)

**Most probable speed:**
- c_mp = √(2RT/M)

**Relation:**
- c_rms > c_avg > c_mp

## Behaviour of Real Gases

**Deviations from Ideal Behavior:**
- At high pressure: Molecular volume becomes significant
- At low temperature: Intermolecular forces become significant

**Compressibility Factor:**
- Z = PV/nRT
- For ideal gas: Z = 1
- For real gas: Z ≠ 1
- Z > 1: Repulsive forces dominant
- Z < 1: Attractive forces dominant

**van der Waals Equation:**
- For real gases
- (P + an²/V²)(V - nb) = nRT
- a: accounts for intermolecular attraction
- b: accounts for volume occupied by molecules
- Correction terms make real gas behave more ideally

**Critical Temperature (T_c):**
- Temperature above which gas cannot be liquefied
- Each gas has characteristic T_c
- CO₂: 31.1°C, O₂: -118°C

**Liquefaction of Gases:**
- Cool below critical temperature
- Apply high pressure
- Joule-Thomson effect
- Applications: Liquid N₂, O₂, He for various uses`,
    keyConcepts: [
      "States of matter characteristics",
      "Gas laws (Boyle's, Charles's, Gay-Lussac's, Avogadro's)",
      "Ideal gas equation and applications",
      "Dalton's law of partial pressures",
      "Graham's law of diffusion/effusion",
      "Kinetic molecular theory",
      "Real gases and van der Waals equation",
    ],
    formulas: [
      "Boyle's: P₁V₁ = P₂V₂",
      "Charles's: V₁/T₁ = V₂/T₂",
      "Ideal gas: PV = nRT",
      "Density: d = PM/RT",
      "Dalton's: P_total = ΣP_i",
      "Graham's: r₁/r₂ = √(M₂/M₁)",
      "RMS speed: c_rms = √(3RT/M)",
      "van der Waals: (P+an²/V²)(V-nb) = nRT",
      "Compressibility: Z = PV/nRT",
    ],
    importantTopics: [
      "Gas law calculations",
      "Ideal gas equation applications",
      "Partial pressure problems",
      "Diffusion and effusion",
      "Kinetic theory postulates",
      "Real gas behavior",
    ],
    learningObjectives: [
      "Apply gas laws to solve problems",
      "Use ideal gas equation for calculations",
      "Calculate partial pressures in mixtures",
      "Solve diffusion/effusion problems",
      "Understand deviations from ideal behavior",
    ],
    prerequisites: [
      "Mole concept",
      "Basic algebra",
      "Temperature scales",
    ],
    ncertChapterRef: "Class 11 Chemistry - Chapter 5",
    visualizationsData: [],
    difficultyLevel: 3,
    estimatedStudyMinutes: 360,
    status: "published" as const,
  },
];

async function seedChemistryChapters4to5() {
  console.log("🌱 Seeding Chemistry Class 11 chapters 4-5...");

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

  console.log("✅ Chemistry Class 11 chapters 4-5 seeding completed!");
}

seedChemistryChapters4to5()
  .then(() => {
    console.log("Seed completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
