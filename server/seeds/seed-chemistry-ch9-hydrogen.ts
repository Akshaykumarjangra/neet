import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedChemistryChapter9() {
  console.log('🧪 Seeding Chemistry Class 11 Chapter 9: Hydrogen...');

  const chapter = {
    subject: 'Chemistry',
    classLevel: '11',
    chapterNumber: 9,
    chapterTitle: 'Hydrogen',
    introduction: `Hydrogen is the simplest and most abundant element in the universe, constituting approximately 75% of the universe by mass. Despite being the lightest element, hydrogen plays a crucial role in chemistry, biology, and energy production. This chapter explores the unique properties of hydrogen, its isotopes, preparation methods, physical and chemical properties, uses, and the important class of compounds called hydrides. Hydrogen is also central to discussions about clean energy and the "hydrogen economy" as a potential solution to future energy needs. Understanding hydrogen chemistry is fundamental to comprehending water chemistry, acid-base reactions, and organic chemistry.`,

    detailedNotes: `## Position in the Periodic Table

Hydrogen has a unique position in the periodic table:

**Electronic Configuration:** 1s¹

**Resemblance to Alkali Metals (Group 1):**
- One electron in valence shell
- Forms H⁺ ions (like Na⁺, K⁺)
- Loses electron to form covalent bonds

**Resemblance to Halogens (Group 17):**
- Needs one electron to complete shell (like F, Cl)
- Forms H⁻ ions (like Cl⁻)
- Can gain electron to achieve stable configuration
- Exists as diatomic molecule (H₂, like F₂, Cl₂)

**Unique Properties:**
- Much smaller than both groups
- Can form only one bond
- Shows both metallic and non-metallic properties
- Often placed separately in periodic table

## Isotopes of Hydrogen

Hydrogen has three isotopes, all with 1 proton but different numbers of neutrons:

### 1. Protium (¹H)
- Most abundant (99.985%)
- 1 proton, 0 neutrons
- Symbol: H or ¹H
- Used as standard

### 2. Deuterium (²H or D)
- 1 proton, 1 neutron
- Abundance: 0.015%
- Symbol: D or ²H
- Called "heavy hydrogen"
- Used in nuclear reactions and NMR spectroscopy
- Deuterium oxide (D₂O) called "heavy water"

### 3. Tritium (³H or T)
- 1 proton, 2 neutrons
- Radioactive (half-life: 12.3 years)
- Symbol: T or ³H
- Extremely rare in nature
- Used in thermonuclear reactions and as tracer

**Properties Comparison:**
- Melting point: H₂ < D₂ < T₂
- Boiling point: H₂ < D₂ < T₂
- Bond dissociation energy: H₂ < D₂ < T₂

## Occurrence of Hydrogen

**In Free State:** Very rare on Earth (<1 ppm in atmosphere)
- Escapes gravity due to low molecular mass
- Found in volcanic gases and natural gas

**In Combined State:** Very abundant
- Water (H₂O): 11% by mass
- Hydrocarbons: Petroleum, natural gas
- Carbohydrates: Sugars, starch, cellulose
- Proteins: All contain hydrogen
- Acids, bases, and most organic compounds

**In Universe:** Most abundant element (~75% by mass, ~90% by number of atoms)

## Preparation of Hydrogen

### Laboratory Methods

**1. Reaction of Metals with Dilute Acids**
Zn + H₂SO₄ → ZnSO₄ + H₂↑
Zn + 2HCl → ZnCl₂ + H₂↑

**Metals Used:** Zn, Fe, Mg (not Cu, Ag, Au)
**Acids:** HCl, H₂SO₄ (not HNO₃ - oxidizing acid)

**2. Reaction of Metals with Alkalis**
2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂↑
Zn + 2NaOH → Na₂ZnO₂ + H₂↑

**Metals:** Al, Zn (amphoteric metals)

**3. Electrolysis of Water**
2H₂O(l) → 2H₂(g) + O₂(g)
(Adding dilute H₂SO₄ or NaOH to increase conductivity)

### Commercial/Industrial Methods

**1. Steam-Hydrocarbon Reforming (Most Common)**
CH₄(g) + H₂O(g) ⇌ CO(g) + 3H₂(g) (Ni catalyst, 1270 K)
CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g) (Fe/Cr oxide catalyst, 673 K)

**2. Coal Gasification**
C(s) + H₂O(g) → CO(g) + H₂(g) (1270 K)
CO(g) + H₂O(g) → CO₂(g) + H₂(g)

**3. Electrolysis of Water (Purest H₂)**
Very pure but expensive
Used for special purposes

**4. From Brine Electrolysis (Chlor-alkali Industry)**
By-product when producing NaOH and Cl₂

## Properties of Hydrogen

### Physical Properties
- Colorless, odorless, tasteless gas
- Lightest element (density = 0.09 g/L at STP)
- Slightly soluble in water
- Neutral to litmus
- Diatomic molecule (H₂)
- Low melting point (-259°C) and boiling point (-253°C)
- Highly diffusible and has high thermal conductivity

### Chemical Properties

**1. Combustion (Highly Flammable)**
2H₂(g) + O₂(g) → 2H₂O(l), ΔH = -286 kJ/mol
- Burns with pale blue flame
- Forms explosive mixture with air (4-74% H₂)
- Used in oxy-hydrogen torch (2800°C)

**2. Reaction with Halogens**
H₂(g) + X₂(g) → 2HX(g)
- With F₂: Explosive even in dark
- With Cl₂: Explosive in sunlight
- With Br₂: Slow reaction, needs heating
- With I₂: Reversible, needs heating
Reactivity order: F₂ > Cl₂ > Br₂ > I₂

**3. Reaction with Metals (Formation of Hydrides)**
2Na(s) + H₂(g) → 2NaH(s) (sodium hydride)
Ca(s) + H₂(g) → CaH₂(s) (calcium hydride)

**4. Reducing Action**
H₂ acts as reducing agent for heated metal oxides:
CuO(s) + H₂(g) → Cu(s) + H₂O(l)
Fe₃O₄(s) + 4H₂(g) → 3Fe(s) + 4H₂O(l)
ZnO(s) + H₂(g) → Zn(s) + H₂O(l)

**5. Reaction with Nitrogen**
N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (Haber Process)
- Fe catalyst, 200 atm, 450°C
- Ammonia production for fertilizers

**6. Hydrogenation Reactions**
C₂H₄(g) + H₂(g) → C₂H₆(g) (Ni catalyst)
Vegetable oils + H₂ → Vanaspati ghee (Ni catalyst)

## Hydrides

Compounds of hydrogen with other elements are called hydrides.

### Classification of Hydrides

**1. Ionic (Saline) Hydrides**
- Formed with s-block metals (except Be)
- Examples: NaH, CaH₂, LiH
- Crystalline, high melting points
- Conduct electricity in molten state
- H⁻ ion (hydride ion) present
- Strong reducing agents
- React with water: NaH + H₂O → NaOH + H₂↑

**2. Covalent (Molecular) Hydrides**
- Formed with p-block elements
- Examples: CH₄, NH₃, H₂O, HF, SiH₄, PH₃, H₂S, HCl
- Volatile, low melting and boiling points
- Poor conductors
- Weak or non-reducing

**Electron Deficient:** BH₃, B₂H₆ (less than 8 electrons around central atom)
**Electron Precise:** CH₄, SiH₄, GeH₄ (exactly 8 electrons)
**Electron Rich:** NH₃, H₂O, HF (lone pairs present)

**3. Metallic (Interstitial) Hydrides**
- Formed with d-block and f-block metals
- Examples: LaH₃, TiH₂, PdH
- Hydrogen occupies interstitial sites in metal lattice
- Non-stoichiometric (variable composition)
- Conduct electricity
- Hard and brittle
- Used for hydrogen storage

## Water (H₂O)

### Structure
- Bent structure (104.5° bond angle)
- O-H bond length: 95.7 pm
- Highly polar molecule
- Extensive hydrogen bonding

### Physical Properties
- Colorless, odorless, tasteless liquid
- Maximum density at 4°C (1 g/mL)
- Ice floats on water (hydrogen bonding creates open structure)
- High boiling point (100°C) due to H-bonding
- Universal solvent

### Hard and Soft Water
**Hard Water:** Contains Ca²⁺ and Mg²⁺ salts
- Temporary hardness: Due to bicarbonates, removed by boiling
- Permanent hardness: Due to chlorides/sulfates, removed by washing soda

**Soft Water:** Free from Ca²⁺ and Mg²⁺

### Hydrogen Peroxide (H₂O₂)

**Structure:** Non-planar, open book structure
O-O bond length: 148 pm
O-H bond length: 97 pm

**Properties:**
- Pale blue viscous liquid
- Miscible with water
- Weak acidic nature
- Unstable, decomposes to H₂O + O₂
- Stored in wax-lined glass/plastic containers

**Preparation:**
2H₂SO₄ + BaO₂ → BaSO₄↓ + H₂O₂ + H₂SO₄

**Dual Behavior (Oxidizing and Reducing Agent):**

*As Oxidizing Agent:*
PbS + 4H₂O₂ → PbSO₄ + 4H₂O
2Fe²⁺ + H₂O₂ + 2H⁺ → 2Fe³⁺ + 2H₂O

*As Reducing Agent:*
Cl₂ + H₂O₂ → 2HCl + O₂
Ag₂O + H₂O₂ → 2Ag + H₂O + O₂

**Uses:**
- Bleaching (wood pulp, silk, wool, hair)
- Antiseptic and disinfectant
- Pollution control (oxidizes harmful substances)
- Rocket fuel (concentrated solution)
- Manufacture of chemicals

**Strength:** Expressed as "volume strength"
- 10-volume H₂O₂: 1L releases 10L of O₂ at STP
- 20-volume H₂O₂: 1L releases 20L of O₂ at STP

## Uses of Hydrogen

1. **Haber Process:** Ammonia synthesis for fertilizers
2. **Hydrogenation:** Vegetable oils → fats
3. **Metallurgy:** Reduction of metal oxides
4. **Rocket Fuel:** Liquid hydrogen (cryogenic fuel)
5. **Fuel Cells:** Clean energy generation
6. **Oxy-hydrogen Torch:** Cutting and welding (2800°C)
7. **Weather Balloons:** Light gas for lifting
8. **Synthesis:** Methanol, HCl production
9. **Future Fuel:** "Hydrogen Economy" - clean, renewable energy source`,

    keyConcepts: [
      'Unique position of hydrogen in periodic table',
      'Three isotopes: Protium, Deuterium, Tritium',
      'Occurrence in free and combined states',
      'Laboratory preparation from metals and acids/alkalis',
      'Industrial preparation: steam reforming, coal gasification',
      'Physical and chemical properties of hydrogen',
      'Combustion, reaction with halogens, and reducing action',
      'Classification of hydrides: ionic, covalent, metallic',
      'Structure and properties of water',
      'Hard and soft water, temporary and permanent hardness',
      'Hydrogen peroxide: structure, properties, and dual behavior',
      'Uses in industry, metallurgy, and as future fuel'
    ],

    formulas: [
      'Zn + H₂SO₄ → ZnSO₄ + H₂',
      '2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂',
      'CH₄ + H₂O → CO + 3H₂',
      '2H₂ + O₂ → 2H₂O',
      'H₂ + X₂ → 2HX',
      'N₂ + 3H₂ ⇌ 2NH₃',
      'CuO + H₂ → Cu + H₂O',
      'NaH + H₂O → NaOH + H₂',
      'H₂O₂ → H₂O + ½O₂'
    ],

    learningObjectives: [
      'Explain the unique position of hydrogen in the periodic table',
      'Differentiate between the three isotopes of hydrogen',
      'Describe various methods of preparing hydrogen',
      'Explain physical and chemical properties of hydrogen',
      'Classify hydrides and explain their properties',
      'Understand the structure and properties of water',
      'Differentiate between hard and soft water',
      'Explain the structure and properties of hydrogen peroxide',
      'Describe the oxidizing and reducing behavior of H₂O₂',
      'Discuss important uses of hydrogen and its compounds'
    ],

    prerequisites: [
      'Periodic table and periodic properties (Chapter 3)',
      'Chemical bonding (Chapter 4)',
      'Redox reactions (Chapter 8)',
      'Basic stoichiometry and equation balancing',
      'Concept of isotopes and atomic structure',
      'Acid-base concepts'
    ],

    importantTopics: [
      'Dual nature of hydrogen (alkali metal and halogen resemblance)',
      'Isotopes and their properties',
      'Laboratory vs industrial preparation methods',
      'Reactivity with halogens (order: F₂ > Cl₂ > Br₂ > I₂)',
      'Classification of hydrides with examples',
      'Reducing action of hydrogen on metal oxides',
      'Hard water removal methods',
      'H₂O₂ structure and dual behavior',
      'Volume strength of hydrogen peroxide',
      'Hydrogen as clean fuel (future applications)'
    ],

    ncertChapterRef: 'Chapter 9, Pages 258-276',

    difficultyLevel: 3,
    estimatedStudyMinutes: 240,
    status: 'published' as const,

    visualizationsData: [
      {
        type: 'concept',
        title: 'Isotopes of Hydrogen',
        description: 'Visual comparison of Protium, Deuterium, and Tritium atomic structures'
      },
      {
        type: 'concept',
        title: 'Water Molecule Structure',
        description: '3D representation of H₂O showing bent geometry and hydrogen bonding'
      },
      {
        type: 'concept',
        title: 'Hydrogen Peroxide Structure',
        description: 'Open book structure of H₂O₂ molecule with bond angles'
      }
    ]
  };

  await db.insert(chapterContent)
    .values(chapter)
    .onConflictDoUpdate({
      target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
      set: chapter
    });

  console.log('✅ Chemistry Chapter 9: Hydrogen seeded successfully');
}

seedChemistryChapter9()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
