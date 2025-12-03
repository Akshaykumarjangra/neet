import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedChemistryChapter8() {
  console.log('🧪 Seeding Chemistry Class 11 Chapter 8: Redox Reactions...');

  const chapter = {
    subject: 'Chemistry',
    classLevel: '11',
    chapterNumber: 8,
    chapterTitle: 'Redox Reactions',
    introduction: `Redox reactions are among the most important and widespread types of chemical reactions, involving the transfer of electrons between species. The term "redox" combines reduction and oxidation - two complementary processes that occur simultaneously. This chapter explores oxidation numbers, methods for balancing redox equations, the electrochemical series, and applications of redox reactions in batteries, corrosion, and industrial processes. Understanding redox chemistry is crucial for comprehending energy generation, metabolism, environmental processes, and modern technology including fuel cells and batteries.`,

    detailedNotes: `## Classical Definitions

### Oxidation
**Classical definition:** Addition of oxygen or removal of hydrogen

**Examples:**
- 2Mg + O₂ → 2MgO (addition of oxygen)
- H₂S → S + H₂ (removal of hydrogen)

### Reduction
**Classical definition:** Removal of oxygen or addition of hydrogen

**Examples:**
- CuO + H₂ → Cu + H₂O (removal of oxygen)
- Cl₂ + H₂ → 2HCl (addition of hydrogen)

## Electronic Concept of Redox

### Modern Definitions

**Oxidation:** Loss of electrons (LEO)
**Reduction:** Gain of electrons (GER)

**Remember:** LEO the lion says GER (Loss of Electrons = Oxidation, Gain of Electrons = Reduction)

**Example:**
Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)

- Zn → Zn²⁺ + 2e⁻ (oxidation, Zn loses electrons)
- Cu²⁺ + 2e⁻ → Cu (reduction, Cu²⁺ gains electrons)

### Key Terms

**Oxidizing Agent (Oxidant):** 
- Species that gets reduced
- Accepts electrons
- Example: Cu²⁺ in above reaction

**Reducing Agent (Reductant):**
- Species that gets oxidized
- Donates electrons
- Example: Zn in above reaction

## Oxidation Number (Oxidation State)

The **oxidation number** is the charge an atom would have if all bonds were completely ionic.

### Rules for Assigning Oxidation Numbers

1. **Elemental form:** O.N. = 0 (e.g., O₂, H₂, Na, Fe)

2. **Monatomic ions:** O.N. = charge (e.g., Na⁺ = +1, Cl⁻ = -1)

3. **Hydrogen:** Usually +1 (except in metal hydrides like NaH where it's -1)

4. **Oxygen:** Usually -2 (except in peroxides like H₂O₂ where it's -1, and in OF₂ where it's +2)

5. **Halogens:** Usually -1 (when combined with metals or less electronegative elements)

6. **Sum rule:** 
   - For neutral molecules: Σ(O.N.) = 0
   - For polyatomic ions: Σ(O.N.) = charge on ion

7. **Alkali metals (Group 1):** Always +1

8. **Alkaline earth metals (Group 2):** Always +2

### Examples of Calculating Oxidation Numbers

**Example 1: H₂SO₄**
Let O.N. of S = x
2(+1) + x + 4(-2) = 0
x = +6

**Example 2: Cr₂O₇²⁻**
Let O.N. of Cr = x
2x + 7(-2) = -2
x = +6

**Example 3: NH₄⁺**
Let O.N. of N = x
x + 4(+1) = +1
x = -3

## Types of Redox Reactions

### 1. Combination Reactions
Two or more substances combine to form one product.
**Example:** 2Mg(s) + O₂(g) → 2MgO(s)
- Mg: 0 → +2 (oxidation)
- O: 0 → -2 (reduction)

### 2. Decomposition Reactions
One substance breaks down into two or more products.
**Example:** 2H₂O(l) → 2H₂(g) + O₂(g)
- H: +1 → 0 (reduction)
- O: -2 → 0 (oxidation)

### 3. Displacement Reactions
More reactive element displaces less reactive element.

**a) Metal Displacement:**
Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)
- Zn: 0 → +2 (oxidation)
- Cu: +2 → 0 (reduction)

**b) Non-metal Displacement:**
Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(l)
- Cl: 0 → -1 (reduction)
- Br: -1 → 0 (oxidation)

### 4. Disproportionation Reactions
Same element undergoes both oxidation and reduction.

**Example:** 2H₂O₂(l) → 2H₂O(l) + O₂(g)
In H₂O₂, O.N. of O = -1
- O: -1 → -2 (reduction, in H₂O)
- O: -1 → 0 (oxidation, in O₂)

**Another Example:** Cl₂(g) + 2OH⁻(aq) → Cl⁻(aq) + OCl⁻(aq) + H₂O(l)
- Cl: 0 → -1 (reduction)
- Cl: 0 → +1 (oxidation)

## Balancing Redox Equations

### Method 1: Oxidation Number Method

**Steps:**
1. Assign oxidation numbers to all atoms
2. Identify which atoms are oxidized and reduced
3. Calculate total increase and decrease in O.N.
4. Multiply by appropriate coefficients to equalize
5. Balance other atoms (usually O, then H)
6. Check that charge is balanced

**Example:** Balance MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺ (acidic medium)

Step 1: O.N. changes
- Mn: +7 → +2 (decrease of 5, reduction)
- Fe: +2 → +3 (increase of 1, oxidation)

Step 2: Multiply to equalize
- MnO₄⁻ × 1, Fe²⁺ × 5

Step 3: Add H⁺ and H₂O
MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O

### Method 2: Half-Reaction (Ion-Electron) Method

**Steps:**
1. Write separate half-reactions for oxidation and reduction
2. Balance each half-reaction:
   - Balance atoms other than O and H
   - Balance O by adding H₂O
   - Balance H by adding H⁺ (acidic) or OH⁻ (basic)
   - Balance charge by adding electrons
3. Multiply half-reactions to equalize electrons
4. Add half-reactions and cancel common terms

**Example:** Balance Cr₂O₇²⁻ + Fe²⁺ → Cr³⁺ + Fe³⁺ (acidic medium)

**Oxidation half:** Fe²⁺ → Fe³⁺ + e⁻

**Reduction half:** 
Cr₂O₇²⁻ → 2Cr³⁺
Cr₂O₇²⁻ → 2Cr³⁺ + 7H₂O (balance O)
14H⁺ + Cr₂O₇²⁻ → 2Cr³⁺ + 7H₂O (balance H)
6e⁻ + 14H⁺ + Cr₂O₇²⁻ → 2Cr³⁺ + 7H₂O (balance charge)

**Multiply oxidation by 6:**
6Fe²⁺ → 6Fe³⁺ + 6e⁻

**Add:**
Cr₂O₇²⁻ + 6Fe²⁺ + 14H⁺ → 2Cr³⁺ + 6Fe³⁺ + 7H₂O

### Balancing in Basic Medium

After balancing in acidic medium:
- Add OH⁻ equal to H⁺ on both sides
- Combine H⁺ and OH⁻ to form H₂O
- Cancel excess H₂O

## Electrochemical Series

The **activity series** or **electrochemical series** ranks metals by their reducing power:

**Strong Reducing Agents (easily oxidized):**
Li > K > Ca > Na > Mg > Al > Zn > Fe > Ni > Pb > H > Cu > Ag > Au

**Properties:**
- Metals above H displace H₂ from acids
- More reactive metal displaces less reactive metal from its salt solution
- Used to predict spontaneity of redox reactions

## Redox Reactions and Electrode Potentials

### Standard Electrode Potential (E°)
Measure of tendency of an electrode to lose or gain electrons.

**Standard Hydrogen Electrode (SHE):** Reference electrode with E° = 0.00 V

**Oxidation potential:** Tendency to lose electrons
**Reduction potential:** Tendency to gain electrons

**Relationship:** E°ₒₓ = -E°ᵣₑ�� for same half-reaction

### Cell Potential
**E°cell = E°cathode - E°anode**

- If E°cell > 0: Reaction is spontaneous
- If E°cell < 0: Reaction is non-spontaneous

**Nernst Equation:**
E = E° - (RT/nF) ln Q

At 298 K:
**E = E° - (0.0591/n) log Q**

## Applications of Redox Reactions

### 1. Batteries and Fuel Cells
**Primary cells:** Non-rechargeable (e.g., dry cell, alkaline battery)
**Secondary cells:** Rechargeable (e.g., lead-acid battery, Li-ion battery)
**Fuel cells:** Continuous supply of reactants (H₂/O₂ fuel cell)

### 2. Corrosion
Oxidative deterioration of metals.

**Rusting of iron:**
Anode: 2Fe(s) → 2Fe²⁺(aq) + 4e⁻
Cathode: O₂(g) + 4H⁺(aq) + 4e⁻ → 2H₂O(l)
Overall: 2Fe(s) + O₂(g) + 4H⁺(aq) → 2Fe²⁺(aq) + 2H₂O(l)

**Prevention:**
- Coating (paint, grease, electroplating)
- Galvanization (coating with zinc)
- Cathodic protection (sacrificial anode)

### 3. Metallurgy
Extraction of metals from ores involves reduction.

**Example:** Iron from Fe₂O₃
Fe₂O₃ + 3CO → 2Fe + 3CO₂

### 4. Quantitative Analysis
**Redox titrations:** Determine concentration using redox reactions
- Permanganometry (KMnO₄)
- Dichromometry (K₂Cr₂O₇)
- Iodometry and Iodimetry

### 5. Bleaching and Disinfection
**Chlorine:** Cl₂ + H₂O → HCl + HOCl
HOCl acts as oxidizing agent

**Hydrogen peroxide:** H₂O₂ → H₂O + [O]
Nascent oxygen bleaches and disinfects

### 6. Biological Systems
**Cellular respiration:** Oxidation of glucose releases energy
C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O

**Photosynthesis:** Reduction of CO₂ stores energy
6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂

## Important Redox Reactions

### 1. Acidified Permanganate
5Fe²⁺ + MnO₄⁻ + 8H⁺ → 5Fe³⁺ + Mn²⁺ + 4H₂O

### 2. Acidified Dichromate
6Fe²⁺ + Cr₂O₇²⁻ + 14H⁺ → 6Fe³⁺ + 2Cr³⁺ + 7H₂O

### 3. Reaction of Metals with Acids
Zn + 2HCl → ZnCl₂ + H₂
Zn + H₂SO₄ → ZnSO₄ + H₂

### 4. Reaction with Aqua Regia
Au + HNO₃ + 3HCl → AuCl₃ + NO + 2H₂O

### 5. Thermite Reaction
Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (highly exothermic)`,

    keyConcepts: [
      'Oxidation and reduction: classical and electronic concepts',
      'Oxidizing and reducing agents',
      'Oxidation number rules and calculations',
      'Types of redox reactions: combination, decomposition, displacement, disproportionation',
      'Balancing redox equations: oxidation number and half-reaction methods',
      'Balancing in acidic and basic media',
      'Electrochemical series and activity of metals',
      'Standard electrode potentials and cell potential',
      'Nernst equation for non-standard conditions',
      'Applications: batteries, corrosion, metallurgy, titrations',
      'Biological redox processes: respiration and photosynthesis'
    ],

    formulas: [
      'LEO (Loss of Electrons = Oxidation)',
      'GER (Gain of Electrons = Reduction)',
      'For neutral: Σ(O.N.) = 0',
      'For ions: Σ(O.N.) = charge',
      'E°cell = E°cathode - E°anode',
      'E = E° - (RT/nF) ln Q',
      'E = E° - (0.0591/n) log Q (at 298 K)',
      'ΔG° = -nFE°cell'
    ],

    learningObjectives: [
      'Understand classical and electronic concepts of oxidation and reduction',
      'Identify oxidizing and reducing agents in reactions',
      'Apply rules to calculate oxidation numbers',
      'Classify redox reactions into different types',
      'Balance redox equations using oxidation number method',
      'Balance redox equations using half-reaction method',
      'Balance equations in acidic and basic media',
      'Use electrochemical series to predict reaction spontaneity',
      'Calculate standard cell potentials',
      'Apply Nernst equation for concentration cells',
      'Understand applications in batteries, corrosion, and industry'
    ],

    prerequisites: [
      'Basic concepts of chemistry (Chapter 1)',
      'Chemical bonding and structure (Chapter 4)',
      'Understanding of ions and ionic compounds',
      'Basic stoichiometry and balancing equations',
      'Concept of electronegativity',
      'Basic algebra for oxidation number calculations'
    ],

    importantTopics: [
      'Oxidation number rules (especially for O, H, and exceptions)',
      'Identifying oxidized and reduced species',
      'Disproportionation reactions',
      'Half-reaction method for balancing',
      'Converting acidic to basic medium',
      'Electrochemical series applications',
      'Standard electrode potentials',
      'Nernst equation calculations',
      'Corrosion mechanism and prevention',
      'Important redox titration reactions'
    ],

    ncertChapterRef: 'Chapter 8, Pages 229-257',

    difficultyLevel: 4,
    estimatedStudyMinutes: 270,
    status: 'published' as const,

    visualizationsData: [
      {
        type: 'concept',
        title: 'Electron Transfer in Redox',
        description: 'Animation showing electron transfer between oxidizing and reducing agents'
      },
      {
        type: 'concept',
        title: 'Electrochemical Cell',
        description: 'Interactive diagram of galvanic cell with electron flow and ion movement'
      },
      {
        type: 'concept',
        title: 'Corrosion Mechanism',
        description: 'Visual representation of iron rusting process at molecular level'
      }
    ]
  };

  await db.insert(chapterContent)
    .values(chapter)
    .onConflictDoUpdate({
      target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
      set: chapter
    });

  console.log('✅ Chemistry Chapter 8: Redox Reactions seeded successfully');
}

seedChemistryChapter8()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
