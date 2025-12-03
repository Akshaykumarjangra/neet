import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedChemistryChapter11() {
  console.log('🧪 Seeding Chemistry Class 11 Chapter 11: The p-Block Elements...');

  const chapter = {
    subject: 'Chemistry',
    classLevel: '11',
    chapterNumber: 11,
    chapterTitle: 'The p-Block Elements',
    introduction: `The p-block elements occupy Groups 13-18 of the periodic table and display tremendous diversity in properties - from highly reactive halogens to inert noble gases, from metallic aluminum to non-metallic oxygen. These elements have their valence electrons in p-orbitals, showing a wide range of oxidation states, bonding patterns, and chemical behaviors. This chapter explores Group 13 (Boron family) and Group 14 (Carbon family) in detail, covering their trends, properties, and important compounds. Understanding p-block chemistry is essential for organic chemistry, environmental science, materials engineering, and biochemistry.`,

    detailedNotes: `## General Characteristics of p-Block Elements

**Position:** Groups 13-18 (except He in Group 18)

**Electronic Configuration:** ns² np¹⁻⁶

**Key Features:**
- Include metals, metalloids, and non-metals
- Show variable oxidation states
- Form covalent compounds (except some Group 13)
- Metallic character decreases across period, increases down group
- Noble gases (Group 18) have complete octet

## Group 13 Elements: The Boron Family

**Elements:** Boron (B), Aluminum (Al), Gallium (Ga), Indium (In), Thallium (Tl)

**Electronic Configuration:** ns² np¹

### Trends in Physical Properties

**1. Atomic and Ionic Radii**
- Increase down the group: B < Al < Ga < In < Tl
- Small increase from Al to Ga (presence of d-orbitals, poor shielding)

**2. Ionization Enthalpy**
- Decreases down the group (generally)
- Irregular trend due to d and f electrons

**3. Electronegativity**
- Decreases down the group: B > Al > Ga > In > Tl

**4. Physical State**
- Boron: Hard, black solid (metalloid)
- Al, Ga, In, Tl: Soft metals

**5. Oxidation States**
- Common: +3 (due to ns² np¹ configuration)
- +1 state becomes more stable down group (inert pair effect)
- Tl⁺ is more stable than Tl³⁺

### Inert Pair Effect

- Reluctance of s² electrons to participate in bonding
- Increases down the group
- Due to poor shielding by d and f electrons
- Results in stability of lower oxidation state
- Example: Tl⁺ more stable than Tl³⁺

### Chemical Properties

**1. Reaction with Oxygen**
4M + 3O₂ → 2M₂O₃
- Form oxides in +3 state
- B₂O₃ is acidic, Al₂O₃ is amphoteric
- Other oxides are basic

**2. Reaction with Halogens**
2M + 3X₂ → 2MX₃
- Form trihalides
- Lewis acids (electron deficient)

**3. Reaction with Acids**
- Boron does not react
- Al reacts: 2Al + 6HCl → 2AlCl₃ + 3H₂
- Passivated by conc. HNO₃ (protective oxide layer)

**4. Reaction with Alkalis**
2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂
- Boron and aluminum are amphoteric

### Anomalous Properties of Boron

**Reasons:**
- Very small size, high electronegativity
- High ionization energy
- Absence of d-orbitals

**Differences from other Group 13 elements:**
- Non-metal (others are metals)
- Forms only covalent compounds
- B₂O₃ is acidic (others basic/amphoteric)
- Does not form B³⁺ ion
- Shows diagonal relationship with silicon

### Important Compounds of Boron

**1. Borax (Na₂B₄O₇·10H₂O)**

**Properties:**
- White crystalline solid
- Dissolves in water to give alkaline solution

**Hydrolysis:**
B₄O₇²⁻ + 7H₂O → 2B(OH)₄⁻ + 2H₃BO₃

**Uses:**
- Glass and enamel manufacture
- Antiseptic, preservative
- Borax bead test (identifies metal ions)

**2. Boric Acid (H₃BO₃ or B(OH)₃)**

**Preparation:**
Na₂B₄O₇ + 2HCl + 5H₂O → 2NaCl + 4H₃BO₃

**Structure:**
- Layered structure with H-bonding
- Planar BO₃ units

**Acidic Nature:**
- Weak monobasic Lewis acid
- Accepts OH⁻ ions:
B(OH)₃ + 2H₂O → [B(OH)₄]⁻ + H₃O⁺

**Uses:**
- Mild antiseptic (eye wash)
- Manufacture of glass, pottery
- Flame retardant

**3. Diborane (B₂H₆)**

**Structure:**
- Electron-deficient molecule
- Two 3-center-2-electron bonds (banana bonds)
- 4 terminal B-H bonds, 2 bridging B-H-B bonds

**Preparation:**
3NaBH₄ + 4BF₃ → 2B₂H₆ + 3NaBF₄

**Properties:**
- Colorless gas
- Highly reactive
- Spontaneously flammable in air

**Uses:**
- Rocket fuel
- Reducing agent
- Hydroboration reactions in organic synthesis

### Aluminum

**Occurrence:**
- Most abundant metal in Earth's crust (8%)
- Bauxite (Al₂O₃·2H₂O) main ore
- Also in feldspar, mica, cryolite

**Extraction (Hall-Héroult Process):**

*Purification of bauxite (Baeyer's process):*
Al₂O₃·2H₂O + 2NaOH → 2NaAlO₂ + 3H₂O
NaAlO₂ + 2H₂O → Al(OH)₃ + NaOH
2Al(OH)₃ → Al₂O₃ + 3H₂O (heating)

*Electrolysis:*
- Molten Al₂O₃ + cryolite (Na₃AlF₆) at 1200 K
- Cathode: Al³⁺ + 3e⁻ → Al
- Anode: C + O²⁻ → CO, CO₂
- Anode needs periodic replacement

**Properties:**
- Silvery-white, light metal (density 2.7 g/cm³)
- Good conductor of heat and electricity
- Protective oxide layer (passivation)
- Malleable and ductile

**Uses:**
- Electrical cables, utensils
- Packaging (foils)
- Alloys (duralumin, magnalium)
- Thermite welding: Fe₂O₃ + 2Al → 2Fe + Al₂O₃

## Group 14 Elements: The Carbon Family

**Elements:** Carbon (C), Silicon (Si), Germanium (Ge), Tin (Sn), Lead (Pb)

**Electronic Configuration:** ns² np²

### Trends in Physical Properties

**1. Atomic and Ionic Radii**
- Increase down the group: C < Si < Ge < Sn < Pb
- Significant increase from C to Si

**2. Ionization Enthalpy**
- Decreases down the group
- First I.E. > Second I.E.

**3. Electronegativity**
- Decreases down the group: C > Si > Ge > Sn ≈ Pb

**4. Catenation**
- Ability to form chains with itself
- Order: C >> Si > Ge ≈ Sn
- Carbon shows maximum catenation (C-C strong bond)

**5. Physical State and Character**
- C, Si: Non-metals
- Ge: Metalloid
- Sn, Pb: Metals
- Metallic character increases down group

**6. Allotropy**
- Carbon: Diamond, graphite, fullerenes
- Silicon: Crystalline, amorphous
- Tin: White tin (metallic), grey tin (non-metallic)

**7. Oxidation States**
- Common: +4 and +2
- +4 more stable for C and Si
- +2 more stable for Sn and Pb (inert pair effect)
- Pb²⁺ more stable than Pb⁴⁺

### Chemical Properties

**1. Reaction with Oxygen**
M + O₂ → MO₂ (monoxides and dioxides possible)
- CO₂, SiO₂: Acidic
- GeO₂, SnO₂: Amphoteric
- PbO, PbO₂: Amphoteric/basic

**2. Reaction with Halogens**
M + 2X₂ → MX₄ (tetrachlorides generally covalent)
- CCl₄: Covalent, non-polar
- SiCl₄: Covalent, hydrolyzes readily
- SnCl₄, PbCl₄: Covalent
- SnCl₂, PbCl₂: Ionic

**3. Reaction with Acids**
- Carbon and silicon: Inert
- Sn and Pb: React with HCl, HNO₃

**4. Hydrides**
- General formula: MH₄
- Thermal stability: CH₄ > SiH₄ > GeH₄ > SnH₄ > PbH₄
- Reducing character increases down group

### Carbon

**Allotropes:**

**1. Diamond**
- 3D network of C atoms (sp³ hybridization)
- Each C bonded to 4 others tetrahedrally
- Hardest natural substance
- Non-conductor of electricity
- High refractive index

**2. Graphite**
- Layered structure (sp² hybridization)
- Hexagonal rings in layers
- Weak van der Waals forces between layers
- Good conductor (delocalized π electrons)
- Soft, slippery (lubricant)

**3. Fullerenes**
- C₆₀ (Buckminsterfullerene) - soccer ball shape
- sp² hybridized carbon
- Cage-like structures
- Applications in nanotechnology

**Oxides of Carbon:**

**Carbon Monoxide (CO):**
- Colorless, odorless gas
- Neutral oxide
- Highly toxic (binds to hemoglobin)
- Reducing agent: Fe₂O₃ + 3CO → 2Fe + 3CO₂

**Preparation:**
C + ½O₂ → CO (limited O₂)
HCOOH → CO + H₂O (dehydration by conc. H₂SO₄)

**Carbon Dioxide (CO₂):**
- Colorless, odorless gas
- Acidic oxide: CO₂ + H₂O → H₂CO₃
- Greenhouse gas
- Used in fire extinguishers, carbonated drinks

**Preparation:**
CaCO₃ → CaO + CO₂ (heating)
C + O₂ → CO₂ (excess O₂)

### Silicon

**Occurrence:**
- Second most abundant element in crust (27.7%)
- Never free in nature
- Silica (SiO₂), silicates major forms

**Preparation:**
SiO₂ + 2C → Si + 2CO (electric furnace)
(Ultra-pure Si: SiCl₄ → Si by reduction with H₂)

**Properties:**
- Grey crystalline solid (diamond structure)
- Semiconductor
- Unreactive at room temperature

**Silica (SiO₂):**
- Found as quartz, sand
- 3D network structure (unlike CO₂)
- High melting point (1713°C)
- Acidic oxide: SiO₂ + 2NaOH → Na₂SiO₃ + H₂O

**Silicates:**
- Major component of rocks, minerals
- Complex structures with SiO₄⁴⁻ units
- Glass: Mixture of silicates (Na₂SiO₃·CaSiO₃·SiO₂)

**Silicones:**
- Synthetic organosilicon polymers
- Structure: -O-Si(R)₂-O-
- Heat resistant, water repellent
- Used in oils, greases, sealants

### Uses of Group 14 Elements

**Carbon:**
- Fuel (coal, petroleum)
- Steel manufacturing
- Pencils (graphite)
- Diamonds (jewelry, cutting tools)

**Silicon:**
- Semiconductors, solar cells
- Silica (glass, ceramics)
- Silicones (lubricants, sealants)

**Germanium:**
- Semiconductors, transistors

**Tin:**
- Tin plating (food cans)
- Alloys (bronze, solder)

**Lead:**
- Lead-acid batteries
- Radiation shielding
- Alloys (solder, pewter)`,

    keyConcepts: [
      'p-block spans Groups 13-18 with valence electrons in p-orbitals',
      'Group 13: Boron family with ns² np¹ configuration and +3 oxidation state',
      'Inert pair effect: stability of lower oxidation state down the group',
      'Anomalous behavior of boron: non-metallic, covalent, acidic oxide',
      'Borax, boric acid, and diborane: structure and properties',
      'Aluminum extraction: Hall-Héroult process with cryolite',
      'Group 14: Carbon family with ns² np² and +4, +2 states',
      'Catenation: carbon shows maximum chain-forming ability',
      'Carbon allotropes: diamond (sp³), graphite (sp²), fullerenes',
      'CO vs CO₂: neutral vs acidic oxide, reducing agent vs greenhouse gas',
      'Silicon and silica: semiconductor vs 3D network structure',
      'Diagonal relationships: B-Si, Be-Al'
    ],

    formulas: [
      '4M + 3O₂ → 2M₂O₃ (Group 13)',
      '2M + 3X₂ → 2MX₃',
      '2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂',
      'Na₂B₄O₇ + 2HCl + 5H₂O → 2NaCl + 4H₃BO₃',
      'B(OH)₃ + 2H₂O → [B(OH)₄]⁻ + H₃O⁺',
      'Al³⁺ + 3e⁻ → Al (Hall-Héroult)',
      'Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (thermite)',
      'C + ½O₂ → CO',
      'C + O₂ → CO₂',
      'CaCO₃ → CaO + CO₂',
      'SiO₂ + 2C → Si + 2CO'
    ],

    learningObjectives: [
      'Describe general characteristics of p-block elements',
      'Explain trends in Group 13 and Group 14 properties',
      'Understand inert pair effect and its consequences',
      'Explain anomalous behavior of boron and carbon',
      'Describe structure and properties of borax, boric acid, diborane',
      'Understand aluminum extraction by Hall-Héroult process',
      'Compare allotropes of carbon: diamond, graphite, fullerenes',
      'Differentiate between CO and CO₂',
      'Explain catenation and its variation in Group 14',
      'Describe silicon and its important compounds'
    ],

    prerequisites: [
      'Periodic table and periodic trends (Chapter 3)',
      'Chemical bonding and hybridization (Chapter 4)',
      'Redox reactions and oxidation states (Chapter 8)',
      's-block elements for comparison (Chapter 10)',
      'Understanding of Lewis acids and bases',
      'Concept of metalloids and semiconductors'
    ],

    importantTopics: [
      'Inert pair effect (Tl⁺, Pb²⁺ more stable)',
      'Anomalous behavior of boron and carbon',
      'Diborane structure: 3-center-2-electron bonds',
      'Hall-Héroult process for aluminum extraction',
      'Thermite reaction: Fe₂O₃ + Al',
      'Carbon allotropes comparison (structure, properties, uses)',
      'CO vs CO₂: preparation, properties, uses',
      'Catenation order: C >> Si > Ge',
      'Silicon and semiconductors',
      'Diagonal relationships: B-Si, Be-Al'
    ],

    ncertChapterRef: 'Chapter 11, Pages 297-326',

    difficultyLevel: 4,
    estimatedStudyMinutes: 300,
    status: 'published' as const,

    visualizationsData: [
      {
        type: 'concept',
        title: 'Diamond vs Graphite Structure',
        description: '3D visualization comparing sp³ tetrahedral diamond with sp² layered graphite structure'
      },
      {
        type: 'concept',
        title: 'Diborane Bonding',
        description: 'Interactive model showing 3-center-2-electron banana bonds in B₂H₆'
      },
      {
        type: 'concept',
        title: 'Hall-Héroult Process',
        description: 'Industrial electrolysis cell for aluminum extraction from bauxite'
      }
    ]
  };

  await db.insert(chapterContent)
    .values(chapter)
    .onConflictDoUpdate({
      target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
      set: chapter
    });

  console.log('✅ Chemistry Chapter 11: The p-Block Elements seeded successfully');
}

seedChemistryChapter11()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
