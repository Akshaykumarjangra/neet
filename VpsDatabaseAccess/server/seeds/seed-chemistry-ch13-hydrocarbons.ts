import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedChemistryChapter13() {
  console.log('🧪 Seeding Chemistry Class 11 Chapter 13: Hydrocarbons...');

  const chapter = {
    subject: 'Chemistry',
    classLevel: '11',
    chapterNumber: 13,
    chapterTitle: 'Hydrocarbons',
    introduction: `Hydrocarbons are organic compounds composed entirely of carbon and hydrogen atoms. They form the basis of organic chemistry and are the principal components of petroleum, natural gas, and coal. This chapter explores the classification, nomenclature, preparation, properties, and reactions of alkanes, alkenes, alkynes, and aromatic hydrocarbons. From fuels that power our vehicles to raw materials for plastics and pharmaceuticals, hydrocarbons are fundamental to modern civilization. Understanding hydrocarbon chemistry is crucial for energy science, petrochemicals, polymer synthesis, and drug design.`,

    detailedNotes: `## Classification of Hydrocarbons

**Based on Carbon Chain:**
1. **Aliphatic:** Open chain or cyclic (non-aromatic)
2. **Aromatic:** Contain benzene ring or similar structure

**Based on Saturation:**
1. **Saturated (Alkanes):** Only C-C single bonds
2. **Unsaturated:** 
   - **Alkenes:** C=C double bonds
   - **Alkynes:** C≡C triple bonds

## Alkanes (Paraffins)

**General Formula:** CₙH₂ₙ₊₂

**Homologous Series:** Differ by -CH₂- unit
- Methane (CH₄), Ethane (C₂H₆), Propane (C₃H₈), Butane (C₄H₁₀)

**Nomenclature:**
- Suffix: -ane
- Examples: Methane, ethane, propane, butane, pentane, hexane

### Preparation of Alkanes

**1. From Unsaturated Hydrocarbons (Hydrogenation)**
CH₂=CH₂ + H₂ → CH₃-CH₃ (Ni catalyst, heat)
HC≡CH + 2H₂ → CH₃-CH₃

**2. From Alkyl Halides (Wurtz Reaction)**
2CH₃-Cl + 2Na → CH₃-CH₃ + 2NaCl (dry ether)

**3. From Carboxylic Acids (Decarboxylation)**
CH₃-COONa + NaOH → CH₄ + Na₂CO₃ (CaO, heat)

**4. From Carbonyl Compounds (Reduction)**
CH₃-CHO + 4[H] → CH₃-CH₃ + H₂O (Zn-Hg/HCl or N₂H₄/KOH)

**5. Kolbe's Electrolysis**
2CH₃-COO⁻ → CH₃-CH₃ + 2CO₂ + 2e⁻ (electrolysis)

### Properties of Alkanes

**Physical Properties:**
- First four: gases (C₁-C₄)
- C₅-C₁₇: liquids
- C₁₈+: solids
- Non-polar, insoluble in water
- Soluble in non-polar solvents
- B.p. increases with molecular mass
- Branching decreases b.p.

**Chemical Properties:**

**1. Combustion (Oxidation)**
CH₄ + 2O₂ → CO₂ + 2H₂O (ΔH = -890 kJ/mol)
- Complete combustion: CO₂ + H₂O
- Incomplete combustion: CO + C (soot)

**2. Halogenation (Free Radical Substitution)**
CH₄ + Cl₂ → CH₃Cl + HCl (sunlight/UV)

**Mechanism:**
*Initiation:* Cl₂ → 2Cl• (UV light)
*Propagation:* 
- CH₄ + Cl• → •CH₃ + HCl
- •CH₃ + Cl₂ → CH₃Cl + Cl•
*Termination:*
- Cl• + Cl• → Cl₂
- •CH₃ + •CH₃ → C₂H₆

**Reactivity:** F₂ > Cl₂ > Br₂ > I₂

**3. Nitration (Vapor Phase)**
CH₃-CH₃ + HNO₃ → CH₃-CH₂-NO₂ + H₂O (675 K)

**4. Sulfonation**
CH₄ + H₂SO₄ → CH₃-SO₃H + H₂O

**5. Controlled Oxidation**
2CH₄ + O₂ → 2CH₃OH (Mo₂O₃ catalyst, 100 atm)

**6. Isomerization**
CH₃-CH₂-CH₂-CH₃ → CH₃-CH(CH₃)-CH₃ (AlCl₃, 573 K)

**7. Aromatization (Dehydrogenation)**
C₆H₁₄ → C₆H₆ + 4H₂ (Cr₂O₃/Al₂O₃, 773 K, 10 atm)

**8. Pyrolysis (Cracking)**
- Breaking of C-C bonds at high temperature
- C₁₀H₂₂ → C₅H₁₂ + C₅H₁₀ (heat)

### Conformations of Alkanes

**Ethane Conformations:**
- **Staggered:** Most stable (minimum repulsion)
- **Eclipsed:** Least stable (maximum repulsion)
- Energy difference: 12.5 kJ/mol
- Free rotation around C-C bond

**Cyclohexane:**
- **Chair:** Most stable
- **Boat:** Less stable (eclipsing, steric strain)
- **Twist-boat:** Intermediate stability

## Alkenes (Olefins)

**General Formula:** CₙH₂ₙ

**Nomenclature:**
- Suffix: -ene
- Number the chain to give double bond lowest number
- Examples: Ethene, propene, but-1-ene, but-2-ene

### Preparation of Alkenes

**1. From Alcohols (Dehydration)**
CH₃-CH₂-OH → CH₂=CH₂ + H₂O (conc. H₂SO₄, 443 K)

**2. From Alkyl Halides (Dehydrohalogenation)**
CH₃-CH₂-Br + KOH → CH₂=CH₂ + KBr + H₂O (alcoholic KOH)

**Saytzeff's Rule:** Major product has more substituted double bond
CH₃-CH₂-CHBr-CH₃ → CH₃-CH=CH-CH₃ (major, Saytzeff)

**3. From Vicinal Dihalides**
CH₂Br-CH₂Br + Zn → CH₂=CH₂ + ZnBr₂

**4. Catalytic Dehydrogenation**
CH₃-CH₃ → CH₂=CH₂ + H₂ (Ni, 900 K)

### Properties of Alkenes

**Physical Properties:**
- C₂-C₄: gases
- C₅-C₁₈: liquids
- C₁₉+: solids
- Non-polar, insoluble in water
- Less dense than water

**Chemical Properties:**

**1. Addition Reactions (Electrophilic Addition)**

**a) Hydrogenation:**
CH₂=CH₂ + H₂ → CH₃-CH₃ (Ni/Pt/Pd catalyst)

**b) Halogenation:**
CH₂=CH₂ + Br₂ → CH₂Br-CH₂Br
- Test for unsaturation (decolorizes Br₂ water)

**c) Hydrogen Halides (Markovnikov's Rule):**
CH₃-CH=CH₂ + HBr → CH₃-CHBr-CH₃
**Markovnikov's Rule:** H adds to C with more H atoms

**Anti-Markovnikov (Peroxide Effect):**
CH₃-CH=CH₂ + HBr → CH₃-CH₂-CH₂Br (peroxide present)
- Only for HBr, not HCl or HI

**d) Water (Hydration):**
CH₂=CH₂ + H₂O → CH₃-CH₂-OH (H₃PO₄ catalyst)

**e) Sulfuric Acid:**
CH₂=CH₂ + H₂SO₄ → CH₃-CH₂-OSO₃H (alkyl hydrogen sulfate)

**2. Oxidation Reactions**

**a) Combustion:**
C₂H₄ + 3O₂ → 2CO₂ + 2H₂O

**b) Baeyer's Test (Mild Oxidation):**
3CH₂=CH₂ + 2KMnO₄ + 4H₂O → 3CH₂(OH)-CH₂(OH) + 2MnO₂ + 2KOH
- Pink color of KMnO₄ disappears (test for unsaturation)

**c) Ozonolysis:**
CH₃-CH=CH-CH₃ + O₃ → 2CH₃-CHO (reductive workup)
- Used to determine position of double bond

**3. Polymerization**
nCH₂=CH₂ → -(CH₂-CH₂)ₙ- (polyethylene)

## Alkynes

**General Formula:** CₙH₂ₙ₋₂

**Nomenclature:**
- Suffix: -yne
- Examples: Ethyne, propyne, but-1-yne

### Preparation of Alkynes

**1. From Calcium Carbide**
CaC₂ + 2H₂O → HC≡CH + Ca(OH)₂

**2. From Vicinal Dihalides**
CH₂Br-CH₂Br + 2KOH → HC≡CH + 2KBr + 2H₂O (alcoholic KOH)

**3. From Alkyl Dihalides**
CHCl₂-CH₃ + 2NaNH₂ → HC≡CH + 2NaCl + 2NH₃

### Properties of Alkynes

**Physical Properties:**
- C₂-C₄: gases
- Higher: liquids/solids
- Slightly polar
- Higher b.p. than corresponding alkanes and alkenes

**Chemical Properties:**

**1. Addition Reactions**

**a) Hydrogenation:**
HC≡CH + H₂ → CH₂=CH₂ (Lindlar catalyst, partial)
HC≡CH + 2H₂ → CH₃-CH₃ (Ni, complete)

**b) Halogenation:**
HC≡CH + Br₂ → CHBr=CHBr → CHBr₂-CHBr₂

**c) Hydrogen Halides:**
HC≡CH + HBr → CH₂=CHBr → CH₃-CHBr₂
- Follows Markovnikov's rule

**d) Water (Hydration):**
HC≡CH + H₂O → CH₃-CHO (H₂SO₄/HgSO₄)
- Forms unstable enol → tautomerizes to aldehyde/ketone

**2. Acidic Character**
HC≡CH + NaNH₂ → HC≡C⁻Na⁺ + NH₃
- Terminal alkynes are weakly acidic (pKₐ ≈ 25)
- Forms metal acetylides

**3. Polymerization**
3HC≡CH → C₆H₆ (red hot iron tube, 873 K)

## Aromatic Hydrocarbons (Arenes)

**Benzene (C₆H₆):**

**Structure:**
- Planar hexagonal ring
- All C-C bonds equal (139 pm)
- sp² hybridized carbons
- 6 π electrons delocalized
- Aromatic (Hückel's rule: 4n+2 π electrons, n=1)

**Resonance:**
- Two Kekulé structures
- Actual structure is resonance hybrid
- Resonance energy: 150 kJ/mol

**Nomenclature:**
- Benzene, toluene (methylbenzene)
- Ortho (1,2-), meta (1,3-), para (1,4-)

### Preparation of Benzene

**1. Decarboxylation of Benzoic Acid**
C₆H₅-COOH + NaOH → C₆H₆ + Na₂CO₃ (CaO, heat)

**2. From Phenol**
C₆H₅-OH + Zn → C₆H₆ + ZnO

**3. Polymerization of Ethyne**
3HC≡CH → C₆H₆ (red hot iron tube)

### Properties of Benzene

**Physical Properties:**
- Colorless liquid
- Characteristic smell
- Immiscible with water
- Carcinogenic

**Chemical Properties:**

**Electrophilic Substitution Reactions:**

**1. Halogenation:**
C₆H₆ + Br₂ → C₆H₅-Br + HBr (FeBr₃ catalyst)

**2. Nitration:**
C₆H₆ + HNO₃ → C₆H₅-NO₂ + H₂O (conc. H₂SO₄)

**3. Sulfonation:**
C₆H₆ + H₂SO₄ → C₆H₅-SO₃H + H₂O (fuming H₂SO₄)

**4. Friedel-Crafts Alkylation:**
C₆H₆ + CH₃Cl → C₆H₅-CH₃ + HCl (AlCl₃)

**5. Friedel-Crafts Acylation:**
C₆H₆ + CH₃COCl → C₆H₅-CO-CH₃ + HCl (AlCl₃)

**Addition Reactions (Difficult):**

**1. Hydrogenation:**
C₆H₆ + 3H₂ → C₆H₁₂ (Ni, high pressure, 473 K)

**2. Chlorination:**
C₆H₆ + 3Cl₂ → C₆H₆Cl₆ (UV light)

**Combustion:**
C₆H₆ + 7½O₂ → 6CO₂ + 3H₂O (sooty flame)

## Directive Influence in Benzene

**Activating Groups (increase reactivity):**
- **ortho/para directors:** -OH, -OR, -NH₂, -R, -X
- Electron donating (+I, +M effect)

**Deactivating Groups (decrease reactivity):**
- **meta directors:** -NO₂, -CN, -CHO, -COOH, -SO₃H
- Electron withdrawing (-I, -M effect)

**Exception:** Halogens are deactivating but ortho/para directing`,

    keyConcepts: [
      'Hydrocarbons: compounds of C and H only',
      'Alkanes (CₙH₂ₙ₊₂): saturated, sp³, single bonds',
      'Alkenes (CₙH₂ₙ): unsaturated, sp², C=C double bond',
      'Alkynes (CₙH₂ₙ₋₂): unsaturated, sp, C≡C triple bond',
      'Aromatic hydrocarbons: benzene ring with delocalized π electrons',
      'Conformations: staggered (stable) vs eclipsed (unstable)',
      'Markovnikov\'s rule: H adds to C with more H atoms',
      'Anti-Markovnikov: peroxide effect with HBr',
      'Saytzeff\'s rule: more substituted alkene is major product',
      'Electrophilic substitution in benzene: halogenation, nitration, sulfonation',
      'Friedel-Crafts reactions: alkylation and acylation',
      'Directive influence: activating (o/p) vs deactivating (m) groups'
    ],

    formulas: [
      'Alkanes: CₙH₂ₙ₊₂',
      'Alkenes: CₙH₂ₙ',
      'Alkynes: CₙH₂ₙ₋₂',
      'Wurtz: 2R-X + 2Na → R-R + 2NaX',
      'Markovnikov: CH₃-CH=CH₂ + HBr → CH₃-CHBr-CH₃',
      'Hydrogenation: R-CH=CH-R + H₂ → R-CH₂-CH₂-R',
      'Ozonolysis: R-CH=CH-R + O₃ → 2R-CHO',
      'CaC₂ + 2H₂O → HC≡CH + Ca(OH)₂',
      'Benzene nitration: C₆H₆ + HNO₃ → C₆H₅-NO₂ + H₂O',
      'Hückel\'s rule: 4n+2 π electrons for aromaticity'
    ],

    learningObjectives: [
      'Classify hydrocarbons based on structure and saturation',
      'Apply IUPAC nomenclature to alkanes, alkenes, and alkynes',
      'Describe preparation methods for different hydrocarbons',
      'Explain conformational isomerism in alkanes',
      'Understand Markovnikov\'s and anti-Markovnikov addition',
      'Apply Saytzeff\'s rule for elimination reactions',
      'Describe electrophilic addition in alkenes and alkynes',
      'Explain aromatic stability and Hückel\'s rule',
      'Understand electrophilic substitution in benzene',
      'Explain directive influence of substituents on benzene'
    ],

    prerequisites: [
      'Organic chemistry basics (Chapter 12)',
      'IUPAC nomenclature',
      'Electronic effects: inductive and resonance',
      'Isomerism concepts',
      'Reaction mechanisms',
      'Understanding of hybridization'
    ],

    importantTopics: [
      'Alkane preparation: Wurtz, decarboxylation, reduction',
      'Free radical halogenation mechanism',
      'Markovnikov\'s rule and anti-Markovnikov addition',
      'Saytzeff\'s rule for elimination',
      'Tests for unsaturation: Br₂ water, Baeyer\'s test',
      'Ozonolysis for structure determination',
      'Acidic nature of terminal alkynes',
      'Benzene structure and resonance',
      'Electrophilic substitution: mechanism and examples',
      'Directive influence: activating vs deactivating groups'
    ],

    ncertChapterRef: 'Chapter 13, Pages 364-398',

    difficultyLevel: 4,
    estimatedStudyMinutes: 330,
    status: 'published' as const,

    visualizationsData: [
      {
        type: 'concept',
        title: 'Benzene Resonance',
        description: 'Animation showing electron delocalization in benzene with resonance hybrid'
      },
      {
        type: 'concept',
        title: 'Conformations of Ethane',
        description: '3D interactive model showing staggered and eclipsed conformations with energy diagram'
      },
      {
        type: 'concept',
        title: 'Electrophilic Addition Mechanism',
        description: 'Step-by-step visualization of carbocation formation and nucleophile attack in alkenes'
      }
    ]
  };

  await db.insert(chapterContent)
    .values(chapter)
    .onConflictDoUpdate({
      target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
      set: chapter
    });

  console.log('✅ Chemistry Chapter 13: Hydrocarbons seeded successfully');
}

seedChemistryChapter13()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
