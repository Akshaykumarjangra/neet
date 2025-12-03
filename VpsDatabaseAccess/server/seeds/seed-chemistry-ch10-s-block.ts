import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedChemistryChapter10() {
  console.log('🧪 Seeding Chemistry Class 11 Chapter 10: The s-Block Elements...');

  const chapter = {
    subject: 'Chemistry',
    classLevel: '11',
    chapterNumber: 10,
    chapterTitle: 'The s-Block Elements',
    introduction: `The s-block elements comprise Groups 1 and 2 of the periodic table - the alkali metals and alkaline earth metals. These elements have their outermost electrons in the s-orbital, making them highly reactive metals with distinct chemical properties. This chapter explores the periodic trends, physical and chemical properties, important compounds, and biological significance of these fundamental elements. From sodium in our bodies to calcium in our bones, from lithium batteries to magnesium in chlorophyll, s-block elements are essential to life and modern technology. Understanding their chemistry is crucial for comprehending reactivity patterns and industrial applications.`,

    detailedNotes: `## Group 1 Elements: Alkali Metals

**Elements:** Lithium (Li), Sodium (Na), Potassium (K), Rubidium (Rb), Cesium (Cs), Francium (Fr)

**General Electronic Configuration:** [Noble gas] ns¹

**Name Origin:** Called "alkali" because they form alkaline (basic) hydroxides

### Physical Properties

**1. Atomic and Ionic Radii**
- Largest atomic radii in their respective periods
- Increase down the group: Li < Na < K < Rb < Cs
- Reason: Addition of new electron shells

**2. Ionization Enthalpy**
- Very low (easiest to lose outer electron)
- Decreases down the group: Li > Na > K > Rb > Cs
- Reason: Increasing atomic size, decreasing nuclear attraction

**3. Hydration Enthalpy**
- Decreases down the group: Li⁺ > Na⁺ > K⁺ > Rb⁺ > Cs⁺
- Smaller ions have higher charge density
- Li⁺ is most heavily hydrated despite being smallest metal

**4. Physical State and Appearance**
- Soft, silvery-white metals
- Can be cut with a knife
- Softness increases down the group

**5. Density**
- Generally increases down the group
- Exception: K is less dense than Na (irregularity in crystal structure)
- Trend: Li < Na > K < Rb < Cs

**6. Melting and Boiling Points**
- Low compared to other metals (weak metallic bonding)
- Decrease down the group: Li > Na > K > Rb > Cs
- Reason: Increasing atomic size, weaker metallic bonds

**7. Flame Colors**
- Li: Crimson red
- Na: Golden yellow
- K: Lilac/violet
- Rb: Red-violet
- Cs: Blue
- Used in flame tests for identification

**8. Electropositive Character**
- Most electropositive elements
- Increases down the group
- Cesium is most electropositive element

### Chemical Properties

**1. Reaction with Air/Oxygen**
- Tarnish rapidly in air
- Must be stored under kerosene/paraffin oil
- Form different oxides:

4Li + O₂ → 2Li₂O (normal oxide)
2Na + O₂ → Na₂O₂ (peroxide)
K + O₂ → KO₂ (superoxide)

**Trend:** As size increases, larger anions (O₂²⁻, O₂⁻) are stabilized

**2. Reaction with Water**
- Extremely vigorous, release H₂ gas
- Reactivity increases down the group

2Li + 2H₂O → 2LiOH + H₂↑ (slow)
2Na + 2H₂O → 2NaOH + H₂↑ (vigorous)
2K + 2H₂O → 2KOH + H₂↑ (violent, H₂ catches fire)

**3. Reaction with Halogens**
2M + X₂ → 2MX (violent reactions)
- Form ionic halides (MF, MCl, MBr, MI)
- All are stable, white crystalline solids

**4. Reaction with Hydrogen**
2M + H₂ → 2MH (at high temperature)
- Form ionic hydrides (saline hydrides)
- NaH, KH used as reducing agents

**5. Reducing Nature**
- Strong reducing agents (readily lose electron)
- Reducing power increases down group: Li < Na < K < Rb < Cs
- Exception: Lithium is strongest in aqueous solution (due to high hydration energy)

**6. Solubility in Liquid Ammonia**
- Dissolve to give blue solutions (due to solvated electrons)
- M + (x+y)NH₃ → [M(NH₃)ₓ]⁺ + [e(NH₃)ᵧ]⁻
- Concentrated solutions are bronze-colored

### Important Compounds of Sodium

**1. Sodium Carbonate (Na₂CO₃) - Washing Soda**

**Solvay Process (Ammonia-Soda Process):**
NaCl + NH₃ + CO₂ + H₂O → NaHCO₃ + NH₄Cl
2NaHCO₃ → Na₂CO₃ + H₂O + CO₂

**Properties:**
- White crystalline solid
- Decahydrate: Na₂CO₃·10H₂O (washing soda)
- Loses water on heating (efflorescence)

**Uses:**
- Water softening, glass manufacturing
- Soap and detergent production
- Paper industry

**2. Sodium Chloride (NaCl) - Common Salt**
- Most abundant sodium compound
- Source of Na, Cl₂, NaOH, Na₂CO₃
- Essential for life (electrolyte balance)

**3. Sodium Hydroxide (NaOH) - Caustic Soda**

**Preparation (Chlor-alkali process):**
2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂ (electrolysis)

**Properties:**
- White, deliquescent solid
- Highly corrosive, soluble in water
- Strong base

**Uses:**
- Soap, paper, textiles
- Petroleum refining
- Drain cleaners

**4. Sodium Bicarbonate (NaHCO₃) - Baking Soda**
NaCl + H₂O + CO₂ + NH₃ → NaHCO₃ + NH₄Cl

**Properties:**
- White crystalline powder
- Mild alkali
- Decomposes on heating: 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂

**Uses:**
- Baking powder (with tartaric acid)
- Fire extinguishers
- Antacid medicine

### Biological Importance of Sodium and Potassium

- Maintain fluid balance and osmotic pressure
- Nerve impulse transmission
- Muscle contraction
- Na⁺/K⁺ pump in cell membranes
- Blood pressure regulation

## Group 2 Elements: Alkaline Earth Metals

**Elements:** Beryllium (Be), Magnesium (Mg), Calcium (Ca), Strontium (Sr), Barium (Ba), Radium (Ra)

**General Electronic Configuration:** [Noble gas] ns²

**Name Origin:** "Earth" refers to oxides, which are basic (alkaline)

### Physical Properties

**1. Atomic and Ionic Radii**
- Smaller than alkali metals (higher nuclear charge)
- Increase down the group: Be < Mg < Ca < Sr < Ba

**2. Ionization Enthalpy**
- Higher than alkali metals (2 electrons to remove)
- First I.E. > Second I.E. always
- Decreases down the group

**3. Hydration Enthalpy**
- Higher than alkali metals (2+ charge)
- Decreases down the group: Be²⁺ > Mg²⁺ > Ca²⁺ > Sr²⁺ > Ba²⁺

**4. Physical Appearance**
- Silvery-white, harder than alkali metals
- Beryllium is steel-grey

**5. Density**
- Lower than d-block metals
- Generally increases down group

**6. Melting and Boiling Points**
- Higher than alkali metals (stronger metallic bonding due to 2 valence electrons)
- Generally decrease down group

**7. Flame Colors**
- Ca: Brick red
- Sr: Crimson red
- Ba: Apple green
- Be and Mg: No distinctive color

**8. Electropositive Character**
- Less electropositive than alkali metals
- Increases down the group

### Chemical Properties

**1. Reaction with Oxygen**
2M + O₂ → 2MO (normal oxides only)
- Beryllium and magnesium form protective oxide layer

**2. Reaction with Water**
- Be: Does not react
- Mg: Reacts with hot water, steam
- Ca, Sr, Ba: React with cold water

Mg + H₂O → MgO + H₂ (hot water)
Mg + 2H₂O → Mg(OH)₂ + H₂ (steam)
Ca + 2H₂O → Ca(OH)₂ + H₂↑

**3. Reaction with Halogens**
M + X₂ → MX₂
- Form ionic halides
- Beryllium halides are covalent (except BeF₂)

**4. Reaction with Hydrogen**
M + H₂ → MH₂ (high temperature)
- Form ionic hydrides (except Be)

**5. Reducing Nature**
- Good reducing agents (less than alkali metals)
- Reducing power generally increases down group

**6. Solubility of Hydroxides and Sulfates**

**Hydroxides:** Be(OH)₂ < Mg(OH)₂ < Ca(OH)₂ < Sr(OH)₂ < Ba(OH)₂
- Solubility and basic strength increase down group
- Ca(OH)₂ is sparingly soluble (lime water)

**Sulfates:** BeSO₄ > MgSO₄ > CaSO₄ > SrSO₄ > BaSO₄
- Solubility decreases down group
- BaSO₄ is almost insoluble (used in X-rays)

### Anomalous Behavior of Beryllium

**Reasons:**
- Small size, high electronegativity
- High ionization energy
- Absence of d-orbitals

**Diagonal Relationship with Aluminum:**
- Both form covalent compounds
- Both are amphoteric: Be(OH)₂ and Al(OH)₃
- Both form polymeric hydrides
- Both chlorides are Lewis acids

### Important Compounds of Calcium

**1. Calcium Oxide (CaO) - Quick Lime**

**Preparation:**
CaCO₃ → CaO + CO₂ (heating above 1070 K)

**Properties:**
- White, caustic solid
- Refractory material (high m.p. 2870 K)
- Reacts vigorously with water: CaO + H₂O → Ca(OH)₂ (slaking)

**Uses:**
- Manufacture of cement, mortar
- Purification of sugar
- Drying agent

**2. Calcium Hydroxide (Ca(OH)₂) - Slaked Lime**
CaO + H₂O → Ca(OH)₂

**Properties:**
- White powder
- Sparingly soluble (lime water)
- Strong base

**Uses:**
- Whitewashing (absorbs CO₂ to form CaCO₃)
- Neutralizing acidic soils
- Manufacture of bleaching powder

**3. Calcium Carbonate (CaCO₃) - Limestone, Marble, Chalk**
- Most abundant form of calcium
- Decomposes on heating: CaCO₃ → CaO + CO₂
- Used in cement, glass, iron extraction

**4. Calcium Sulfate (CaSO₄)**

**Forms:**
- Gypsum: CaSO₄·2H₂O
- Plaster of Paris: CaSO₄·½H₂O

**Plaster of Paris:**
CaSO₄·2H₂O → CaSO₄·½H₂O + 1½H₂O (heat at 393 K)

**Setting:** CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O (hardens)

**Uses:**
- Surgical bandages, casts
- Making statues, models
- Fireproofing materials

**5. Calcium Chloride (CaCl₂)**
- Highly deliquescent
- Used as drying agent
- De-icing roads

### Importance of Calcium and Magnesium

**Calcium:**
- Bones and teeth (calcium phosphate)
- Blood clotting
- Muscle contraction
- Nerve function

**Magnesium:**
- Chlorophyll (photosynthesis center)
- Enzyme activation
- ATP reactions
- Bones and teeth

### Cement

**Composition:** Complex mixture of calcium silicates and aluminates

**Manufacturing (Rotary Kiln Method):**
1. Limestone + Clay → Grinding → Slurry
2. Heating in rotary kiln (1500-1600 K)
3. Clinker formed
4. Gypsum added (2-3%) and ground → Cement

**Setting:**
- Hydration of compounds forms calcium silicate hydrate gel
- Hardens over time (exothermic process)

### Biological Significance

**Magnesium:**
- Center of chlorophyll molecule
- Cofactor for many enzymes
- DNA and RNA synthesis

**Calcium:**
- Structural component of bones (hydroxyapatite)
- Nerve impulse transmission
- Blood clotting cascade
- Muscle contraction (troponin binding)`,

    keyConcepts: [
      'Electronic configuration of s-block elements: ns¹ (Group 1), ns² (Group 2)',
      'Trends in atomic radius, ionization energy, hydration enthalpy',
      'Alkali metals: extreme reactivity, stored under oil',
      'Flame colors for identification of alkali and alkaline earth metals',
      'Oxides of alkali metals: normal oxide (Li), peroxide (Na), superoxide (K)',
      'Alkaline earth metals: harder, less reactive than alkali metals',
      'Solubility trends: hydroxides increase, sulfates decrease down Group 2',
      'Anomalous behavior of beryllium and diagonal relationship with Al',
      'Important compounds: NaOH, Na₂CO₃, NaHCO₃, CaO, Ca(OH)₂, CaCO₃',
      'Industrial processes: Solvay process, chlor-alkali process',
      'Plaster of Paris and cement chemistry',
      'Biological roles of Na, K, Ca, Mg in human body'
    ],

    formulas: [
      '2M + 2H₂O → 2MOH + H₂ (alkali metals)',
      'M + 2H₂O → M(OH)₂ + H₂ (alkaline earth metals)',
      '4Li + O₂ → 2Li₂O',
      '2Na + O₂ → Na₂O₂',
      'K + O₂ → KO₂',
      'CaCO₃ → CaO + CO₂',
      'CaO + H₂O → Ca(OH)₂',
      'NaCl + NH₃ + CO₂ + H₂O → NaHCO₃ + NH₄Cl (Solvay)',
      '2NaHCO₃ → Na₂CO₃ + H₂O + CO₂',
      'CaSO₄·2H₂O → CaSO₄·½H₂O + 1½H₂O (Plaster of Paris)'
    ],

    learningObjectives: [
      'Explain electronic configuration and position of s-block elements',
      'Describe periodic trends in physical properties',
      'Compare reactivity of alkali and alkaline earth metals',
      'Explain formation of different types of oxides',
      'Understand solubility trends of hydroxides and sulfates',
      'Explain anomalous behavior of beryllium and lithium',
      'Describe preparation and properties of important compounds',
      'Understand industrial processes: Solvay and chlor-alkali',
      'Explain chemistry of cement and Plaster of Paris',
      'Discuss biological importance of Na, K, Ca, and Mg'
    ],

    prerequisites: [
      'Periodic table organization (Chapter 3)',
      'Chemical bonding (Chapter 4)',
      'Oxidation-reduction concepts (Chapter 8)',
      'Basic stoichiometry and equation balancing',
      'Concept of hydration and solvation',
      'Understanding of ionic and covalent compounds'
    ],

    importantTopics: [
      'Flame test colors for identification',
      'Trends: atomic radius, ionization energy, reactivity',
      'Oxides: Li₂O (normal), Na₂O₂ (peroxide), KO₂ (superoxide)',
      'Solubility trends in Group 2 hydroxides and sulfates',
      'Anomalous properties of Be (diagonal with Al)',
      'Solvay process for Na₂CO₃',
      'Chlor-alkali process for NaOH',
      'CaO, Ca(OH)₂, CaCO₃ interconversions',
      'Plaster of Paris preparation and setting',
      'Biological roles: bones (Ca), chlorophyll (Mg), nerve function (Na, K)'
    ],

    ncertChapterRef: 'Chapter 10, Pages 277-296',

    difficultyLevel: 3,
    estimatedStudyMinutes: 270,
    status: 'published' as const,

    visualizationsData: [
      {
        type: 'concept',
        title: 'Flame Test Colors',
        description: 'Interactive visualization of characteristic flame colors for alkali and alkaline earth metals'
      },
      {
        type: 'concept',
        title: 'Reactivity with Water',
        description: 'Animation showing increasing reactivity of alkali metals with water down the group'
      },
      {
        type: 'concept',
        title: 'Solvay Process Flow',
        description: 'Industrial process diagram for sodium carbonate manufacture'
      }
    ]
  };

  await db.insert(chapterContent)
    .values(chapter)
    .onConflictDoUpdate({
      target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
      set: chapter
    });

  console.log('✅ Chemistry Chapter 10: The s-Block Elements seeded successfully');
}

seedChemistryChapter10()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
