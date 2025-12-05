import { db } from "../db";
import { chapterContent } from "@shared/schema";
import { eq } from "drizzle-orm";

const organicChemistryClass12Chapters = [
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 6,
    chapterTitle: "Haloalkanes and Haloarenes",
    introduction: "From life-saving anesthetics to refrigerants, halogen compounds are everywhere! This chapter explores how halogens attach to carbon chains, their unique reactions, and the famous SN1, SN2, E1, E2 mechanisms that govern their transformations.",
    detailedNotes: `# Haloalkanes and Haloarenes

Haloalkanes (alkyl halides) and haloarenes (aryl halides) contain halogen atoms bonded to carbon. Understanding their chemistry is key to mastering organic reactions!

## Classification

**By Halogen Type:**
- Fluoro (F), Chloro (Cl), Bromo (Br), Iodo (I)

**By Carbon Type:**
- **Primary (1°)**: Halogen on carbon with 1 alkyl group
- **Secondary (2°)**: Halogen on carbon with 2 alkyl groups  
- **Tertiary (3°)**: Halogen on carbon with 3 alkyl groups

**💡 Did You Know?**
Chloroform (CHCl₃) was one of the first anesthetics used in surgery in 1847! It's made from methane and chlorine.

## Nomenclature

**IUPAC Names:**
- CH₃Cl → Chloromethane
- CH₃CH₂Br → Bromoethane
- CH₃CHClCH₃ → 2-Chloropropane

**Common Names:**
- CH₃X → Methyl halide
- C₂H₅X → Ethyl halide
- CHX₃ → Haloform
- CX₄ → Carbon tetrahalide

## Nature of C-X Bond

**Bond Polarity**: C is δ+, X is δ- (electronegative halogen)
**Bond Strength**: C-F > C-Cl > C-Br > C-I
**Bond Length**: C-I > C-Br > C-Cl > C-F

**🔑 Remember This!**
Reactivity order: R-I > R-Br > R-Cl > R-F (opposite to bond strength because C-I breaks easily)

## Preparation Methods

**1. From Alcohols:**
- ROH + HX → RX + H₂O (with ZnCl₂ for 1° alcohols)
- ROH + PCl₃ → 3RCl + H₃PO₃
- ROH + PCl₅ → RCl + POCl₃ + HCl
- ROH + SOCl₂ → RCl + SO₂ + HCl (Darzen's process - best method)

**2. Halogenation:**
- Alkane + X₂ → Alkyl halide (UV light, free radical)
- Alkene + HX → Alkyl halide (Markovnikov addition)
- Alkene + X₂ → Vic-dihalide

**3. Halogen Exchange (Finkelstein):**
R-Cl + NaI → R-I + NaCl (in acetone)

**4. Swarts Reaction:**
R-Cl + AgF → R-F + AgCl

## Nucleophilic Substitution Reactions

**⚠️ Common Mistake Alert!**
Don't confuse SN1 and SN2! SN1 goes through carbocation (2 steps), SN2 is direct backside attack (1 step).

### SN2 Mechanism (Bimolecular)

**Features:**
- One step, concerted
- Backside attack by nucleophile
- Inversion of configuration (Walden inversion)
- Rate = k[R-X][Nu⁻]
- Favored by: 1° halides, strong nucleophiles, polar aprotic solvents

**Reactivity Order**: CH₃X > 1° > 2° > 3° (steric hindrance)

### SN1 Mechanism (Unimolecular)

**Features:**
- Two steps (carbocation intermediate)
- Rate = k[R-X] (first order)
- Racemization (mixture of products)
- Favored by: 3° halides, weak nucleophiles, polar protic solvents

**Reactivity Order**: 3° > 2° > 1° > CH₃X (carbocation stability)

## Elimination Reactions

### E2 Mechanism
- Concerted, anti-periplanar geometry
- Strong base required
- Forms Zaitsev product (more substituted alkene)

### E1 Mechanism  
- Two steps via carbocation
- Weak base
- Also gives Zaitsev product

**🔑 Remember This!**
Zaitsev's Rule: The more substituted alkene is the major product in elimination reactions!

## Reactions of Haloalkanes

| Nucleophile | Product |
|-------------|---------|
| OH⁻ | Alcohol |
| OR⁻ | Ether (Williamson synthesis) |
| CN⁻ | Nitrile (carbon chain increases) |
| NH₃ | Amine |
| AgNO₂ | Nitroalkane |
| NaNO₂ | Alkyl nitrite |

## Grignard Reagent

**Formation**: R-X + Mg → R-MgX (in dry ether)

**Reactions:**
- R-MgX + H₂O → R-H + Mg(OH)X
- R-MgX + CO₂ → RCOOH (after hydrolysis)
- R-MgX + HCHO → 1° alcohol
- R-MgX + RCHO → 2° alcohol
- R-MgX + R₂CO → 3° alcohol

## Haloarenes (Aryl Halides)

**Less reactive than alkyl halides** due to:
- Resonance (C-X has partial double bond character)
- sp² carbon (shorter, stronger bond)
- Phenyl cation is unstable

**Reactions require harsh conditions:**
- NaOH at 623K, 300 atm (Dow's process)
- Cu powder at 473K (Ullmann reaction)

## Polyhalogen Compounds

**Dichloromethane (CH₂Cl₂)**: Solvent, paint remover
**Chloroform (CHCl₃)**: Anesthetic, solvent
**Iodoform (CHI₃)**: Antiseptic
**Carbon tetrachloride (CCl₄)**: Fire extinguisher, dry cleaning
**Freons (CFCs)**: Refrigerants (now banned - ozone depletion)
**DDT**: Insecticide (now banned - bioaccumulation)`,
    keyConcepts: JSON.stringify([
      { title: "SN1 vs SN2 Mechanism", description: "SN1: two-step via carbocation, racemization, favors 3° halides. SN2: one-step backside attack, inversion, favors 1° and CH₃X." },
      { title: "E1 vs E2 Elimination", description: "E2: concerted, strong base, anti-periplanar. E1: stepwise via carbocation, weak base. Both follow Zaitsev's rule." },
      { title: "Reactivity Order", description: "For SN2: CH₃X > 1° > 2° > 3°. For SN1/E1: 3° > 2° > 1° > CH₃X. Based on steric vs carbocation stability." },
      { title: "Grignard Reagent", description: "R-MgX formed from RX + Mg in dry ether. Reacts with carbonyl to form alcohols. Very nucleophilic and basic." },
      { title: "Haloarene Unreactivity", description: "Aryl halides are less reactive due to resonance stabilization, sp² carbon, and unstable phenyl cation." },
      { title: "Nucleophilic Substitution Products", description: "OH⁻ → alcohol, OR⁻ → ether, CN⁻ → nitrile, NH₃ → amine. CN increases carbon chain by one." },
      { title: "Important Polyhalogen Compounds", description: "CHCl₃ (chloroform), CCl₄ (fire extinguisher), CHI₃ (antiseptic), CFCs (refrigerants - banned for ozone depletion)." }
    ]),
    formulas: JSON.stringify([
      { name: "SN2 Rate Law", formula: "Rate = k[R-X][Nu⁻]", description: "Bimolecular, depends on both substrate and nucleophile concentration." },
      { name: "SN1 Rate Law", formula: "Rate = k[R-X]", description: "Unimolecular, depends only on substrate concentration (carbocation formation is RDS)." },
      { name: "Grignard Formation", formula: "R-X + Mg → R-MgX", description: "In dry ether. Mg inserts between C and X." },
      { name: "Williamson Synthesis", formula: "R-O⁻ + R'-X → R-O-R'", description: "Alkoxide attacks alkyl halide to form ether. SN2 mechanism." },
      { name: "Wurtz Reaction", formula: "2R-X + 2Na → R-R + 2NaX", description: "Coupling of two alkyl halides. Only works for similar R groups." },
      { name: "Finkelstein Reaction", formula: "R-Cl + NaI → R-I + NaCl", description: "In acetone. NaCl precipitates, driving equilibrium forward." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 7,
    chapterTitle: "Alcohols, Phenols and Ethers",
    introduction: "From the ethanol in beverages to the phenol in antiseptics, hydroxyl compounds are vital to life and industry! This chapter explores their preparation, properties, and the essential reactions that make them so versatile.",
    detailedNotes: `# Alcohols, Phenols and Ethers

These oxygen-containing compounds are among the most important in organic chemistry. The -OH group gives them unique properties!

## Classification of Alcohols

**By Carbon Type:**
- **Primary (1°)**: -OH on carbon with 1 alkyl group (CH₃CH₂OH)
- **Secondary (2°)**: -OH on carbon with 2 alkyl groups (CH₃CHOHCH₃)
- **Tertiary (3°)**: -OH on carbon with 3 alkyl groups ((CH₃)₃COH)

**By Number of -OH Groups:**
- Monohydric (1 -OH): Ethanol
- Dihydric (2 -OH): Ethylene glycol
- Trihydric (3 -OH): Glycerol

**💡 Did You Know?**
Glycerol (glycerin) is used in over 1500 products - from food to explosives (nitroglycerin)!

## Nomenclature

**Alcohols**: Replace -e of alkane with -ol
- CH₃OH → Methanol
- CH₃CH₂OH → Ethanol
- CH₃CHOHCH₃ → Propan-2-ol

**Phenols**: Name as hydroxy derivatives
- C₆H₅OH → Phenol
- CH₃-C₆H₄-OH → Cresol (o, m, p)

**Ethers**: Alkoxy + alkane OR Dialkyl ether
- CH₃OCH₃ → Methoxymethane (dimethyl ether)
- C₂H₅OC₂H₅ → Ethoxyethane (diethyl ether)

## Preparation of Alcohols

**1. From Alkenes (Hydration):**
- Acid-catalyzed: CH₂=CH₂ + H₂O → CH₃CH₂OH (Markovnikov)
- Hydroboration-oxidation: Anti-Markovnikov product

**2. From Carbonyl Compounds:**
- HCHO + H₂ → CH₃OH (reduction)
- Aldehydes + H₂ → 1° alcohols
- Ketones + H₂ → 2° alcohols

**3. From Grignard Reagents:**
- HCHO + RMgX → 1° alcohol
- RCHO + R'MgX → 2° alcohol
- R₂CO + R'MgX → 3° alcohol

**🔑 Remember This!**
Grignard + HCHO = 1° alcohol, Grignard + other aldehyde = 2° alcohol, Grignard + ketone = 3° alcohol!

## Physical Properties

**Hydrogen Bonding**: Alcohols form H-bonds
- Higher boiling points than alkanes
- Solubility in water decreases with chain length

**Boiling Point Order**: Alcohols > Ethers > Alkanes (of similar MW)

## Reactions of Alcohols

**1. With Active Metals:**
2ROH + 2Na → 2RONa + H₂
(Acidic nature: Alcohols < Water < Phenols)

**2. Dehydration:**
- 443K, Al₂O₃ → Alkenes (Zaitsev product)
- Concentrated H₂SO₄ at different temperatures

**⚠️ Common Mistake Alert!**
Reactivity for dehydration: 3° > 2° > 1° (more stable carbocation = easier dehydration)

**3. Oxidation:**
- 1° alcohol → Aldehyde → Carboxylic acid
- 2° alcohol → Ketone
- 3° alcohol → Resistant (requires strong conditions)

**Oxidizing Agents**: CrO₃, K₂Cr₂O₇/H₂SO₄, KMnO₄
**PCC (Pyridinium chlorochromate)**: Stops at aldehyde stage

**4. Esterification:**
ROH + R'COOH ⇌ R'COOR + H₂O (reversible, acid catalyst)

## Reactions of Phenols

**Acidic Nature**: Phenol is acidic (pKa ≈ 10) due to resonance stabilization of phenoxide ion.
Phenol > H₂CO₃ > Alcohols (acidity order)

**Electrophilic Substitution:**
- -OH is activating, ortho-para directing
- Bromination gives 2,4,6-tribromophenol
- Nitration gives mixture of o- and p-nitrophenol

**Special Reactions:**
- Kolbe's Reaction: Phenol + CO₂ + NaOH → Salicylic acid
- Reimer-Tiemann: Phenol + CHCl₃ + NaOH → Salicylaldehyde
- Coupling with diazonium salt → Azo dyes

## Williamson Ether Synthesis

**R-O⁻ + R'-X → R-O-R' + X⁻**

Best method for ether synthesis!
- Use 1° alkyl halide (SN2 mechanism)
- For mixed ethers, use less hindered halide

**Limitations:**
- 3° halides undergo elimination instead
- Aryl halides don't work

## Reactions of Ethers

**1. Cleavage by HI:**
- Excess HI, heat: R-O-R' → 2R-I + H₂O
- Limited HI: R-O-R' → R-OH + R'-I (smaller alkyl gives halide)

**2. Electrophilic Substitution (Anisole):**
- -OCH₃ is activating, o,p-directing
- Bromination, nitration, Friedel-Crafts work well

## Important Compounds

**Methanol**: Industrial solvent, fuel, "wood alcohol" (toxic!)
**Ethanol**: Beverages, fuel, solvent (fermentation: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂)
**Phenol**: Antiseptic, plastic manufacture (Bakelite)
**Diethyl ether**: Anesthetic, solvent (highly flammable!)
**Ethylene glycol**: Antifreeze, polyester manufacture`,
    keyConcepts: JSON.stringify([
      { title: "Alcohol Classification", description: "1° (RCH₂OH), 2° (R₂CHOH), 3° (R₃COH). Classification affects reactivity in oxidation and dehydration." },
      { title: "Hydrogen Bonding", description: "Alcohols form H-bonds, giving higher BP than alkanes/ethers. Water solubility decreases with increasing carbon chain." },
      { title: "Oxidation Patterns", description: "1° → aldehyde → acid, 2° → ketone, 3° → resistant. Use PCC for selective aldehyde formation." },
      { title: "Phenol Acidity", description: "More acidic than alcohols due to resonance-stabilized phenoxide ion. Reacts with NaOH but not NaHCO₃." },
      { title: "Williamson Synthesis", description: "Alkoxide + alkyl halide → ether (SN2). Use 1° halides to avoid elimination side reactions." },
      { title: "Electrophilic Substitution", description: "-OH (phenol) and -OR (ether) are activating, ortho-para directing groups in aromatic substitution." },
      { title: "Kolbe and Reimer-Tiemann", description: "Kolbe: phenol + CO₂ → salicylic acid. Reimer-Tiemann: phenol + CHCl₃ → salicylaldehyde." }
    ]),
    formulas: JSON.stringify([
      { name: "Dehydration", formula: "R-CH₂-CH₂-OH → R-CH=CH₂ + H₂O", description: "Acid catalyst, heat. Follows Zaitsev rule for product." },
      { name: "Williamson Synthesis", formula: "R-O⁻Na⁺ + R'-X → R-O-R' + NaX", description: "SN2 mechanism. Use 1° or CH₃ halides." },
      { name: "Esterification", formula: "ROH + R'COOH ⇌ R'COOR + H₂O", description: "Reversible, acid-catalyzed Fischer esterification." },
      { name: "Kolbe Reaction", formula: "C₆H₅O⁻Na⁺ + CO₂ → o-HOC₆H₄COO⁻Na⁺", description: "Carboxylation of phenol. Product is sodium salicylate." },
      { name: "Lucas Test", formula: "ROH + HCl(ZnCl₂) → RCl + H₂O", description: "3° instant, 2° in 5 min, 1° needs heat. Tests alcohol type." },
      { name: "Iodoform Test", formula: "CH₃CH(OH)R + I₂ + NaOH → CHI₃", description: "Yellow precipitate indicates -CH(OH)CH₃ or CH₃CO- group." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 110
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 8,
    chapterTitle: "Aldehydes, Ketones and Carboxylic Acids",
    introduction: "From the fragrance of vanilla (vanillin) to the sourness of vinegar (acetic acid), carbonyl compounds are everywhere! This chapter covers the chemistry of the C=O group - one of the most reactive and important functional groups.",
    detailedNotes: `# Aldehydes, Ketones and Carboxylic Acids

The carbonyl group (C=O) is the heart of organic chemistry. Its polarity and reactivity make these compounds essential building blocks!

## Structure of Carbonyl Group

**C=O is polar**: Carbon is δ+, Oxygen is δ-
- sp² hybridized carbon (trigonal planar)
- Nucleophiles attack carbon
- Electrophiles attack oxygen

## Nomenclature

**Aldehydes (-CHO)**: -e → -al
- HCHO → Methanal (formaldehyde)
- CH₃CHO → Ethanal (acetaldehyde)

**Ketones (-CO-)**: -e → -one
- CH₃COCH₃ → Propanone (acetone)
- CH₃COC₂H₅ → Butan-2-one

**Carboxylic Acids (-COOH)**: -e → -oic acid
- HCOOH → Methanoic acid (formic acid)
- CH₃COOH → Ethanoic acid (acetic acid)

**💡 Did You Know?**
Formic acid gets its name from "formica" (Latin for ant) - it's the acid that causes ant bites to sting!

## Preparation of Aldehydes & Ketones

**1. Oxidation of Alcohols:**
- 1° alcohol + PCC → Aldehyde
- 2° alcohol + oxidizer → Ketone

**2. Ozonolysis of Alkenes:**
Alkene + O₃, then Zn/H₂O → Aldehydes/Ketones

**3. From Acyl Chlorides:**
- RCOCl + H₂/Pd-BaSO₄ → Aldehyde (Rosenmund reduction)
- RCOCl + R₂Cd → Ketone

**4. From Nitriles:**
- RCN + SnCl₂/HCl → Aldehyde (Stephen reduction)
- RCN + R'MgX → Ketone (after hydrolysis)

**5. Friedel-Crafts Acylation:**
Benzene + RCOCl/AlCl₃ → Aromatic ketone

## Nucleophilic Addition Reactions

The C=O carbon is electrophilic - nucleophiles attack it!

**🔑 Remember This!**
Aldehydes are more reactive than ketones because: (1) less steric hindrance, (2) +I effect of alkyl groups stabilizes carbonyl in ketones.

**1. Addition of HCN:**
R₂C=O + HCN → R₂C(OH)CN (cyanohydrin)
- Basic catalyst needed
- Increases carbon chain

**2. Addition of NaHSO₃:**
Aldehydes and methyl ketones form bisulfite addition products (white crystalline)

**3. Addition of Alcohols:**
- Aldehyde + ROH → Hemiacetal → Acetal
- Ketone + ROH → Hemiketal → Ketal
- Acid catalyst, reversible

**4. Addition of NH₃ derivatives:**

| Reagent | Product | Use |
|---------|---------|-----|
| NH₂OH | Oxime | Characterization |
| NH₂NH₂ | Hydrazone | Characterization |
| C₆H₅NHNH₂ | Phenylhydrazone | Identification |
| 2,4-DNP | 2,4-DNP derivative | Orange ppt, test |
| NH₂CONHNH₂ | Semicarbazone | Characterization |

## α-Hydrogen Reactions

Hydrogen on carbon next to C=O is acidic (enolizable)!

**⚠️ Common Mistake Alert!**
Only aldehydes/ketones with α-H can undergo aldol condensation and show keto-enol tautomerism!

**Aldol Condensation:**
2 CH₃CHO → CH₃CH(OH)CH₂CHO (aldol)
Heat → CH₃CH=CHCHO + H₂O (crotonaldehyde)

**Cross-Aldol**: Different aldehydes/ketones can react

**Cannizzaro Reaction:**
2HCHO + conc. NaOH → HCOONa + CH₃OH
- Only for aldehydes WITHOUT α-H
- Disproportionation (one oxidized, one reduced)

## Oxidation Reactions

**Aldehydes → Carboxylic acids** (easy oxidation)

**Tests for Aldehydes:**
- Tollens' Test: Ag⁺ → Ag mirror (silver mirror test)
- Fehling's Test: Cu²⁺ → Cu₂O (red precipitate)
- Benedict's Test: Similar to Fehling's

Ketones don't reduce Tollens' or Fehling's!

## Reduction Reactions

**1. To Alcohols:**
- Aldehyde + H₂/Ni or NaBH₄ or LiAlH₄ → 1° alcohol
- Ketone + same → 2° alcohol

**2. To Hydrocarbons:**
- Clemmensen: Zn-Hg/HCl → CH₂ (acidic conditions)
- Wolff-Kishner: N₂H₄/KOH, heat → CH₂ (basic conditions)

## Carboxylic Acids

**Acidity**: Due to resonance-stabilized carboxylate ion
**Acidity Order**: Cl-CH₂COOH > CH₃COOH > HCOOH > C₆H₅COOH

**Effect of Substituents:**
- EWG (electron-withdrawing) → increases acidity
- EDG (electron-donating) → decreases acidity

**Reactions:**

**1. With Bases**: Neutralization (salt + water)

**2. Decarboxylation:**
RCOONa + NaOH/CaO → R-H + Na₂CO₃

**3. Hell-Volhard-Zelinsky (HVZ):**
RCOOH + X₂/P → RCH(X)COOH (α-halogenation)

**4. Esterification:**
RCOOH + R'OH ⇌ RCOOR' + H₂O

**5. Reduction:**
RCOOH + LiAlH₄ → RCH₂OH (1° alcohol)

## Named Reactions Summary

| Reaction | Substrate | Product |
|----------|-----------|---------|
| Aldol | Aldehyde with α-H | β-hydroxyaldehyde |
| Cannizzaro | Aldehyde without α-H | Alcohol + acid |
| Clemmensen | Carbonyl | Hydrocarbon (acidic) |
| Wolff-Kishner | Carbonyl | Hydrocarbon (basic) |
| Rosenmund | Acyl chloride | Aldehyde |`,
    keyConcepts: JSON.stringify([
      { title: "Carbonyl Reactivity", description: "C=O is polar (Cδ+, Oδ-). Aldehydes more reactive than ketones due to less steric hindrance and weaker +I effect." },
      { title: "Nucleophilic Addition", description: "Nu⁻ attacks carbonyl carbon. Products: cyanohydrins (HCN), acetals (ROH), oximes/hydrazones (NH₂-compounds)." },
      { title: "Aldol Condensation", description: "Aldehydes/ketones with α-H form β-hydroxy compounds. Dehydration gives α,β-unsaturated carbonyl." },
      { title: "Cannizzaro Reaction", description: "Aldehydes WITHOUT α-H undergo disproportionation with conc. NaOH. One molecule oxidized, one reduced." },
      { title: "Oxidation Tests", description: "Tollens' (silver mirror) and Fehling's (red Cu₂O) tests distinguish aldehydes from ketones." },
      { title: "Carboxylic Acid Acidity", description: "Acidity due to resonance-stabilized carboxylate ion. EWG increases, EDG decreases acidity." },
      { title: "Clemmensen vs Wolff-Kishner", description: "Both reduce C=O to CH₂. Clemmensen: Zn-Hg/HCl (acidic). Wolff-Kishner: N₂H₄/KOH (basic)." }
    ]),
    formulas: JSON.stringify([
      { name: "Aldol Product", formula: "2RCH₂CHO → RCH₂CH(OH)CH(R)CHO", description: "Base-catalyzed. Product is β-hydroxyaldehyde." },
      { name: "Cannizzaro", formula: "2RCHO + NaOH → RCH₂OH + RCOONa", description: "For aldehydes without α-H. Disproportionation reaction." },
      { name: "Cyanohydrin Formation", formula: "R₂C=O + HCN → R₂C(OH)CN", description: "Nucleophilic addition. Increases carbon chain by one." },
      { name: "2,4-DNP Test", formula: "R₂C=O + 2,4-DNP → R₂C=N-NH-C₆H₃(NO₂)₂", description: "Orange-yellow precipitate confirms aldehyde/ketone." },
      { name: "Fehling's Test", formula: "RCHO + 2Cu²⁺ + 4OH⁻ → RCOO⁻ + Cu₂O↓ + 2H₂O", description: "Red precipitate indicates aldehyde. Ketones negative." },
      { name: "HVZ Reaction", formula: "RCH₂COOH + X₂/P → RCH(X)COOH", description: "α-halogenation of carboxylic acids. Only works with -CH₂- next to COOH." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 9,
    chapterTitle: "Amines",
    introduction: "From the smell of rotting fish to life-saving drugs, amines are nitrogen-containing organic compounds found everywhere in nature! This chapter explores their basic nature, preparation, and the reactions that make them essential in pharmaceuticals.",
    detailedNotes: `# Amines

Amines are derivatives of ammonia with one or more hydrogen atoms replaced by alkyl or aryl groups. They're crucial for life - amino acids, neurotransmitters, and many drugs are amines!

## Classification

**By Number of Alkyl Groups on N:**
- **Primary (1°)**: R-NH₂ (one R group)
- **Secondary (2°)**: R₂NH (two R groups)
- **Tertiary (3°)**: R₃N (three R groups)

**By Nature of R:**
- Aliphatic amines: CH₃NH₂, (CH₃)₂NH
- Aromatic amines: C₆H₅NH₂ (aniline)

**💡 Did You Know?**
The smell of rotting fish is due to amines like trimethylamine! Fish sauce and fermented foods contain these compounds.

## Nomenclature

**IUPAC**: Alkanamine
- CH₃NH₂ → Methanamine
- C₂H₅NH₂ → Ethanamine
- C₆H₅NH₂ → Benzenamine (aniline)

**Common Names**: Alkylamine
- CH₃NH₂ → Methylamine
- (CH₃)₂NH → Dimethylamine
- (CH₃)₃N → Trimethylamine

## Structure

**Nitrogen in amines is sp³ hybridized**
- Pyramidal shape (like NH₃)
- Lone pair on nitrogen
- Bond angle ≈ 107°

**🔑 Remember This!**
The lone pair on nitrogen makes amines basic and nucleophilic - two key properties!

## Preparation of Amines

**1. Reduction of Nitro Compounds:**
R-NO₂ + 3H₂ (Ni/Pd) → R-NH₂ + 2H₂O
C₆H₅NO₂ + 6H → C₆H₅NH₂ + 2H₂O (aniline)

**2. Ammonolysis of Alkyl Halides:**
R-X + NH₃ → RNH₂ → R₂NH → R₃N → R₄N⁺X⁻
(Mixture of products - poor selectivity)

**3. Gabriel Phthalimide Synthesis:**
Potassium phthalimide + R-X → N-alkyl phthalimide
Hydrolysis → 1° amine (only 1°!)

**4. Hoffmann Bromamide Reaction:**
R-CO-NH₂ + Br₂ + 4NaOH → R-NH₂ + Na₂CO₃ + 2NaBr + 2H₂O
(Amine has one less carbon than amide!)

**5. Reduction of Nitriles and Amides:**
R-CN + 4H → R-CH₂-NH₂
R-CO-NH₂ + 4H → R-CH₂-NH₂

## Physical Properties

**Hydrogen Bonding:**
- 1° and 2° amines form H-bonds (N-H present)
- 3° amines cannot H-bond with themselves
- All amines can accept H-bonds

**Boiling Points**: 1° > 2° > 3° (for similar MW)

**Solubility**: Lower amines soluble in water due to H-bonding

## Basicity of Amines

**Order in Gas Phase**: 3° > 2° > 1° > NH₃
(More alkyl groups = more +I effect = more basic)

**Order in Aqueous Solution**: 2° > 1° > 3° > NH₃
(Solvation effects important!)

**⚠️ Common Mistake Alert!**
Aromatic amines (aniline) are weaker bases than aliphatic amines because the lone pair is delocalized into the benzene ring!

**Effect of Substituents on Aniline:**
- EWG (like -NO₂) → decrease basicity
- EDG (like -CH₃) → increase basicity

## Reactions of Amines

**1. Alkylation:**
R-NH₂ + R'-X → R-NH-R' → R-N(R')₂ → [R-N(R')₃]⁺

**2. Acylation:**
R-NH₂ + R'COCl → R-NH-CO-R' + HCl
(Amides less basic than amines)

**3. Benzoylation (Schotten-Baumann):**
Aniline + C₆H₅COCl + NaOH → Benzanilide

**4. Carbylamine Reaction (Isocyanide Test):**
R-NH₂ + CHCl₃ + 3KOH → R-N≡C + 3KCl + 3H₂O
(Foul-smelling isocyanide - test for 1° amine!)

**5. Reaction with Nitrous Acid (HNO₂):**

| Amine Type | Product |
|------------|---------|
| 1° Aliphatic | N₂ gas + mixture of products |
| 1° Aromatic | Diazonium salt (0-5°C) |
| 2° (all) | N-nitroso compound (yellow oil) |
| 3° Aliphatic | Nitrite salt (no visible change) |
| 3° Aromatic | p-Nitroso compound (green) |

## Diazonium Salts

**Formation:**
C₆H₅NH₂ + NaNO₂ + 2HCl → C₆H₅N₂⁺Cl⁻ + NaCl + 2H₂O
(Must be at 0-5°C to prevent decomposition!)

**Importance**: Gateway to many aromatic compounds!

**Reactions:**
| Reagent | Product | Named Reaction |
|---------|---------|----------------|
| H₃PO₂/H₂O | C₆H₆ | - |
| CuCl/HCl | C₆H₅Cl | Sandmeyer |
| CuBr/HBr | C₆H₅Br | Sandmeyer |
| CuCN/KCN | C₆H₅CN | Sandmeyer |
| KI | C₆H₅I | - |
| H₂O (warm) | C₆H₅OH | - |
| HBF₄, then heat | C₆H₅F | Balz-Schiemann |

**Coupling Reactions:**
Diazonium salt + Phenol/Amine → Azo dye (colored)
- Used in making dyes (Congo red, methyl orange)

## Distinction Tests

| Test | 1° Amine | 2° Amine | 3° Amine |
|------|----------|----------|----------|
| Carbylamine | Foul smell | No reaction | No reaction |
| Hinsberg | Soluble in NaOH | Insoluble | No reaction |
| HNO₂ | N₂ gas | Yellow oil | No change (aliph) |`,
    keyConcepts: JSON.stringify([
      { title: "Amine Classification", description: "1° (R-NH₂), 2° (R₂NH), 3° (R₃N). Classification affects basicity, reactions with HNO₂, and H-bonding ability." },
      { title: "Basicity Order", description: "In solution: 2° > 1° > 3° > NH₃. Aromatic amines weaker due to resonance. EWG decreases, EDG increases basicity." },
      { title: "Gabriel Synthesis", description: "Phthalimide + alkyl halide → 1° amine only. Cannot make 2° or 3° amines by this method." },
      { title: "Hoffmann Degradation", description: "Amide + Br₂/NaOH → amine with one less carbon. Useful for chain shortening." },
      { title: "Carbylamine Test", description: "CHCl₃ + KOH with 1° amine gives foul-smelling isocyanide. Only 1° amines give positive test." },
      { title: "Diazonium Salts", description: "Formed from 1° aromatic amines at 0-5°C. Gateway to substituted benzenes via Sandmeyer, coupling reactions." },
      { title: "HNO₂ Reactions", description: "Different amines give different products: 1° aromatic → diazonium, 2° → N-nitroso, 3° aromatic → p-nitroso." }
    ]),
    formulas: JSON.stringify([
      { name: "Gabriel Synthesis", formula: "Phthalimide-K⁺ + R-X → N-R-Phthalimide → R-NH₂", description: "Selective for 1° amines. Hydrolysis releases amine." },
      { name: "Hoffmann Bromamide", formula: "RCONH₂ + Br₂ + 4NaOH → RNH₂ + Na₂CO₃", description: "Product has one less carbon. Rearrangement reaction." },
      { name: "Diazotization", formula: "ArNH₂ + NaNO₂ + 2HCl → ArN₂⁺Cl⁻", description: "At 0-5°C. Diazonium salt is reactive intermediate." },
      { name: "Sandmeyer Reaction", formula: "ArN₂⁺ + CuX → ArX + N₂", description: "X = Cl, Br, or CN. Introduces halogen/CN to benzene ring." },
      { name: "Carbylamine Test", formula: "R-NH₂ + CHCl₃ + 3KOH → R-NC", description: "Foul smell of isocyanide confirms 1° amine." },
      { name: "Azo Coupling", formula: "ArN₂⁺ + ArOH → Ar-N=N-Ar-OH", description: "Makes colored azo dyes. Phenol or amine as coupling partner." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 10,
    chapterTitle: "Biomolecules",
    introduction: "Life is chemistry! From the glucose that powers your cells to the DNA that stores your genetic code, biomolecules are the building blocks of all living things. This chapter explores carbohydrates, proteins, nucleic acids, and vitamins.",
    detailedNotes: `# Biomolecules

Biomolecules are organic molecules essential for life. Understanding their structure and function is crucial for biology, medicine, and biotechnology!

## Carbohydrates

Also called saccharides or sugars. General formula: Cₓ(H₂O)ᵧ

**Classification:**

**1. Monosaccharides** (cannot be hydrolyzed)
- Trioses (3C): Glyceraldehyde
- Tetroses (4C): Erythrose
- Pentoses (5C): Ribose, Deoxyribose
- Hexoses (6C): Glucose, Fructose, Galactose

**2. Oligosaccharides** (2-10 monosaccharides)
- Disaccharides: Sucrose, Maltose, Lactose
- Trisaccharides: Raffinose

**3. Polysaccharides** (many monosaccharides)
- Starch, Cellulose, Glycogen

**💡 Did You Know?**
Cellulose is the most abundant organic compound on Earth! It makes up plant cell walls, and we can't digest it because we lack the enzyme cellulase.

## Glucose (C₆H₁₂O₆)

**Structure Evidence:**
- Molecular formula: C₆H₁₂O₆
- Reacts with HI → n-hexane (6 C chain)
- Reacts with NH₂OH → oxime (C=O present)
- Reacts with Br₂ water → gluconic acid (-CHO present)
- Acetylation → penta-acetate (5 -OH groups)

**Cyclic Structure:**
- Forms hemiacetal with -OH on C5
- α-D-glucose: -OH at C1 below ring
- β-D-glucose: -OH at C1 above ring
- Mutarotation: interconversion in solution

**🔑 Remember This!**
In Haworth projection: α means -OH down, β means -OH up (at C1). Think "α = axial = down"

## Important Disaccharides

| Disaccharide | Composition | Linkage | Reducing? |
|--------------|-------------|---------|-----------|
| Sucrose | Glucose + Fructose | α-1,2 | No |
| Maltose | Glucose + Glucose | α-1,4 | Yes |
| Lactose | Galactose + Glucose | β-1,4 | Yes |

**⚠️ Common Mistake Alert!**
Sucrose is non-reducing because both anomeric carbons are involved in the glycosidic bond!

## Polysaccharides

**Starch:**
- Storage in plants
- Amylose (linear, α-1,4) + Amylopectin (branched, α-1,4 and α-1,6)
- Gives blue color with iodine

**Cellulose:**
- Structural in plants
- Linear β-1,4 linkages
- Cannot be digested by humans

**Glycogen:**
- Storage in animals (liver, muscles)
- Like amylopectin but more branched

## Amino Acids

Building blocks of proteins. General structure: H₂N-CHR-COOH

**Classification by R group:**
- Non-polar: Glycine, Alanine, Valine, Leucine
- Polar: Serine, Threonine, Cysteine
- Acidic: Aspartic acid, Glutamic acid
- Basic: Lysine, Arginine, Histidine

**Zwitterion:** At neutral pH, amino acids exist as H₃N⁺-CHR-COO⁻
**Isoelectric point (pI):** pH where net charge = 0

**Essential Amino Acids** (must be obtained from diet):
Val, Leu, Ile, Met, Phe, Trp, Thr, Lys (+ His, Arg for children)

## Proteins

**Peptide Bond:** -CO-NH- (formed by condensation)
Dipeptide, Tripeptide... Polypeptide (>10 amino acids) → Protein (>50)

**Protein Structure:**

**1. Primary:** Sequence of amino acids
**2. Secondary:** Local folding (α-helix, β-pleated sheet)
- Stabilized by H-bonds between C=O and N-H
**3. Tertiary:** 3D shape of single polypeptide
- Stabilized by H-bonds, disulfide bridges, ionic bonds
**4. Quaternary:** Multiple polypeptide units
- Example: Hemoglobin (4 subunits)

**Denaturation:** Loss of 2°, 3°, 4° structure (by heat, pH, chemicals)

## Nucleic Acids

**Components:**
1. Nitrogenous base (purine or pyrimidine)
2. Pentose sugar (ribose or deoxyribose)
3. Phosphate group

**Bases:**
- Purines: Adenine (A), Guanine (G) - two rings
- Pyrimidines: Cytosine (C), Thymine (T), Uracil (U) - one ring

**DNA vs RNA:**

| Feature | DNA | RNA |
|---------|-----|-----|
| Sugar | Deoxyribose | Ribose |
| Bases | A, T, G, C | A, U, G, C |
| Structure | Double helix | Usually single strand |
| Function | Genetic storage | Protein synthesis |

**Base Pairing (Chargaff's Rule):**
- A = T (2 H-bonds)
- G ≡ C (3 H-bonds)

## Enzymes

Biological catalysts (proteins).

**Properties:**
- Highly specific
- Work at optimal pH and temperature
- Can be inhibited
- Increase reaction rate by 10⁶-10¹² times

**Naming:** Substrate + -ase (e.g., maltase, lipase)

## Vitamins

**Water-soluble:** B-complex, C (not stored, need daily)
**Fat-soluble:** A, D, E, K (stored in body)

| Vitamin | Function | Deficiency Disease |
|---------|----------|--------------------|
| A | Vision | Night blindness |
| B₁ | Carbohydrate metabolism | Beriberi |
| C | Collagen synthesis | Scurvy |
| D | Calcium absorption | Rickets |
| K | Blood clotting | Hemorrhage |`,
    keyConcepts: JSON.stringify([
      { title: "Carbohydrate Classification", description: "Monosaccharides (glucose, fructose), Disaccharides (sucrose, maltose), Polysaccharides (starch, cellulose). Based on hydrolysis products." },
      { title: "Glucose Structure", description: "Aldohexose with cyclic hemiacetal form. α and β anomers differ at C1. Shows mutarotation in solution." },
      { title: "Reducing vs Non-reducing Sugars", description: "Reducing sugars have free anomeric carbon. Maltose, lactose reduce Tollens'. Sucrose doesn't (both anomeric C used in bond)." },
      { title: "Amino Acid Structure", description: "H₂N-CHR-COOH. Exist as zwitterions at neutral pH. 20 standard amino acids, 8-10 essential." },
      { title: "Protein Structure Levels", description: "1° sequence, 2° local folding (helix/sheet), 3° overall 3D shape, 4° multiple chains. Denaturation disrupts 2°-4°." },
      { title: "DNA Base Pairing", description: "A pairs with T (2 H-bonds), G pairs with C (3 H-bonds). Chargaff's rule: A=T, G=C in double helix." },
      { title: "Vitamins Classification", description: "Water-soluble (B, C) need daily intake. Fat-soluble (A, D, E, K) stored in body. Each has specific functions and deficiency diseases." }
    ]),
    formulas: JSON.stringify([
      { name: "Glycosidic Bond", formula: "Sugar-OH + HO-Sugar → Sugar-O-Sugar + H₂O", description: "Links monosaccharides. α or β depending on configuration." },
      { name: "Peptide Bond", formula: "-COOH + H₂N- → -CO-NH- + H₂O", description: "Links amino acids. Partial double bond character, planar." },
      { name: "Isoelectric Point", formula: "pI = (pKa₁ + pKa₂)/2", description: "For simple amino acids. Net charge is zero at this pH." },
      { name: "Chargaff's Rule", formula: "[A] = [T], [G] = [C]", description: "In double-stranded DNA. A+G = T+C (purines = pyrimidines)." },
      { name: "DNA Helix Parameters", formula: "Pitch = 3.4 nm, 10 bp/turn", description: "B-form DNA. Each base pair separated by 0.34 nm." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 11,
    chapterTitle: "Polymers",
    introduction: "From the plastic bottles we use daily to the DNA in our cells, polymers are everywhere! This chapter explores how small molecules (monomers) join to form giant molecules with amazing properties used in countless applications.",
    detailedNotes: `# Polymers

Polymers are giant molecules made by joining many small repeating units (monomers). The word comes from Greek: poly (many) + meros (parts).

## Basic Concepts

**Monomer**: Small molecule that joins to form polymer
**Polymer**: Large molecule made of repeating units
**Degree of Polymerization**: Number of monomer units in polymer

**💡 Did You Know?**
Natural rubber from rubber trees is a polymer of isoprene. Ancient Mayans used it to make balls for games over 3000 years ago!

## Classification of Polymers

**1. Based on Source:**
- **Natural**: Proteins, Cellulose, Natural rubber, Starch
- **Semi-synthetic**: Cellulose acetate, Cellulose nitrate
- **Synthetic**: Polythene, Nylon, PVC, Bakelite

**2. Based on Structure:**
- **Linear**: Long chains (e.g., HDPE)
- **Branched**: Side chains (e.g., LDPE)
- **Cross-linked**: 3D network (e.g., Bakelite)

**3. Based on Polymerization:**
- **Addition polymers**: Monomers add without loss of atoms
- **Condensation polymers**: Small molecule (H₂O, HCl) eliminated

**🔑 Remember This!**
Addition polymers usually have C=C monomers. Condensation polymers have bifunctional monomers (-OH, -COOH, -NH₂).

## Addition Polymerization

**Mechanism**: Free radical, cationic, or anionic

**Free Radical Mechanism:**
1. **Initiation**: R• + CH₂=CHX → R-CH₂-ĊHX
2. **Propagation**: Chain growth
3. **Termination**: Two radicals combine

**Important Addition Polymers:**

| Polymer | Monomer | Uses |
|---------|---------|------|
| Polyethylene | CH₂=CH₂ | Bags, bottles, pipes |
| Polypropylene | CH₂=CHCH₃ | Ropes, carpets |
| PVC | CH₂=CHCl | Pipes, cables, flooring |
| Polystyrene | CH₂=CHC₆H₅ | Packaging, insulation |
| PTFE (Teflon) | CF₂=CF₂ | Non-stick coating |
| PAN | CH₂=CHCN | Acrylic fibers |
| PMMA | CH₂=C(CH₃)COOCH₃ | Plexiglass |

**LDPE vs HDPE:**
- LDPE: Low density, branched, soft, flexible
- HDPE: High density, linear, rigid, stronger

## Condensation Polymerization

**Requires bifunctional or polyfunctional monomers**

**⚠️ Common Mistake Alert!**
In condensation polymerization, the polymer mass is less than sum of monomer masses because small molecules are eliminated!

**Important Condensation Polymers:**

**1. Polyamides (Nylons):**

**Nylon-6,6:**
Hexamethylenediamine + Adipic acid
H₂N-(CH₂)₆-NH₂ + HOOC-(CH₂)₄-COOH
Uses: Fibers, ropes, tyre cords

**Nylon-6:**
Caprolactam (ring-opening polymerization)
Uses: Textiles, fishing nets

**2. Polyesters:**

**Terylene (PET):**
Ethylene glycol + Terephthalic acid
HO-CH₂-CH₂-OH + HOOC-C₆H₄-COOH
Uses: Fabrics, bottles, films

**3. Phenol-Formaldehyde (Bakelite):**
Phenol + Formaldehyde
- Novolac: Linear, thermoplastic (acid catalyst)
- Bakelite: Cross-linked, thermosetting (base catalyst)
Uses: Electrical switches, handles

**4. Melamine-Formaldehyde:**
Cross-linked structure
Uses: Unbreakable crockery

## Copolymers

Polymers from two or more different monomers.

**Types:**
- Alternating: -A-B-A-B-A-B-
- Random: -A-B-B-A-A-B-A-
- Block: -A-A-A-B-B-B-
- Graft: Side chains of B on A backbone

**Example**: Buna-S (Styrene-Butadiene Rubber)

## Natural Rubber

**Structure**: cis-1,4-polyisoprene
(CH₂-C(CH₃)=CH-CH₂)ₙ

**Properties**: Elastic but sticky, softens in heat

**Vulcanization**: Cross-linking with sulfur (3-5%)
- Increases strength and elasticity
- Reduces stickiness
- More sulfur → harder rubber

## Synthetic Rubbers

**Neoprene**: Polychloroprene
- Oil and heat resistant
- Uses: Gaskets, hoses

**Buna-N**: Butadiene + Acrylonitrile
- Oil resistant
- Uses: Fuel tanks, gaskets

**Buna-S**: Butadiene + Styrene
- Wear resistant
- Uses: Tyres

## Biodegradable Polymers

**PHBV**: Poly-β-hydroxybutyrate-co-β-hydroxyvalerate
- Degraded by bacteria
- Uses: Packaging, drug delivery

**Nylon-2-Nylon-6**: Polyamide from glycine + aminocaproic acid
- Biodegradable

## Polymer Properties

**Thermoplastics vs Thermosets:**

| Property | Thermoplastic | Thermosetting |
|----------|---------------|---------------|
| Structure | Linear/branched | Cross-linked |
| On heating | Softens | Does not soften |
| Recyclable | Yes | No |
| Examples | PVC, Polythene | Bakelite, Melamine |

**Elastomers**: Rubber-like, can stretch and return
**Fibers**: High tensile strength, crystalline`,
    keyConcepts: JSON.stringify([
      { title: "Polymer Classification", description: "By source (natural/synthetic), structure (linear/branched/cross-linked), or polymerization type (addition/condensation)." },
      { title: "Addition Polymerization", description: "Monomers with C=C add without losing atoms. Free radical mechanism with initiation, propagation, termination." },
      { title: "Condensation Polymerization", description: "Bifunctional monomers join with elimination of small molecule (H₂O). Examples: Nylon, Terylene." },
      { title: "Nylon Formation", description: "Nylon-6,6 from hexamethylenediamine + adipic acid. Nylon-6 from caprolactam ring opening." },
      { title: "Vulcanization", description: "Cross-linking rubber with sulfur. Improves strength, elasticity, heat resistance. More sulfur = harder rubber." },
      { title: "Thermoplastic vs Thermoset", description: "Thermoplastics soften on heating, recyclable (linear). Thermosets don't soften, not recyclable (cross-linked)." },
      { title: "Biodegradable Polymers", description: "PHBV and Nylon-2-Nylon-6 can be degraded by bacteria. Important for reducing plastic pollution." }
    ]),
    formulas: JSON.stringify([
      { name: "Addition Polymerization", formula: "n(CH₂=CHX) → (-CH₂-CHX-)ₙ", description: "No atoms lost. MW of polymer = n × MW of monomer." },
      { name: "Condensation Polymerization", formula: "n(HO-R-COOH) → (-O-R-CO-)ₙ + nH₂O", description: "Water eliminated. MW less than n × monomer MW." },
      { name: "Degree of Polymerization", formula: "DP = MW of polymer / MW of repeat unit", description: "Number of monomer units in polymer chain." },
      { name: "Nylon-6,6 Structure", formula: "(-NH-(CH₂)₆-NH-CO-(CH₂)₄-CO-)ₙ", description: "Polyamide from diamine + diacid. Numbers indicate carbons in each monomer." },
      { name: "PET Structure", formula: "(-O-CH₂-CH₂-O-CO-C₆H₄-CO-)ₙ", description: "Polyester from ethylene glycol + terephthalic acid." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 90
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 12,
    chapterTitle: "Chemistry in Everyday Life",
    introduction: "Chemistry is not just in labs - it's in every pill you take, every meal you eat, and every soap you use! This chapter explores how chemical knowledge creates drugs, food additives, and cleansing agents that improve our daily lives.",
    detailedNotes: `# Chemistry in Everyday Life

Understanding chemistry helps us appreciate the medicines, foods, and products we use daily. Let's explore the chemistry behind everyday items!

## Drugs and Pharmaceuticals

**Drug**: Chemical that affects biological processes for diagnosis, prevention, or treatment of disease.

**Classification by Pharmacological Effect:**
- Analgesics (pain relief)
- Antipyretics (reduce fever)
- Antibiotics (kill bacteria)
- Antiseptics (prevent infection)
- Antacids (neutralize stomach acid)

**💡 Did You Know?**
Aspirin (acetylsalicylic acid) was derived from willow bark, which has been used for pain relief for over 3500 years!

## Drug-Target Interaction

**1. Enzymes as Drug Targets:**
- Drugs can be enzyme inhibitors
- **Competitive inhibition**: Drug competes with substrate for active site
- **Non-competitive inhibition**: Drug binds elsewhere, changes enzyme shape

**2. Receptors as Drug Targets:**
- **Agonists**: Mimic natural messenger, activate receptor
- **Antagonists**: Block receptor, prevent activation

**🔑 Remember This!**
Lock and key analogy: Drug (key) fits receptor/enzyme (lock). Small changes in drug structure can dramatically change its action!

## Classification of Drugs

**1. Analgesics (Pain Relievers):**

**Non-narcotic (non-addictive):**
- Aspirin, Ibuprofen, Paracetamol
- Reduce fever and mild pain
- Work by inhibiting prostaglandin synthesis

**Narcotic (addictive):**
- Morphine, Codeine, Heroin
- For severe pain, act on CNS
- Can cause addiction

**2. Antipyretics (Fever Reducers):**
- Aspirin, Paracetamol
- Reset body's thermostat

**3. Antibiotics:**
Kill or inhibit bacteria

**Broad-spectrum**: Active against many bacteria (Ampicillin, Tetracycline)
**Narrow-spectrum**: Active against specific bacteria (Penicillin G)

**⚠️ Common Mistake Alert!**
Antibiotics don't work against viruses! Using them for viral infections contributes to antibiotic resistance.

**How Penicillin works:**
- Inhibits bacterial cell wall synthesis
- Bacteria burst due to osmotic pressure

**4. Antiseptics and Disinfectants:**

| Type | Used On | Examples |
|------|---------|----------|
| Antiseptic | Living tissue | Dettol, Iodine, Boric acid |
| Disinfectant | Non-living objects | Chlorine, SO₂, Phenol (1%) |

**Note**: Same compound at different concentrations can be either!

**5. Antifertility Drugs:**
- Synthetic hormones (estrogen + progesterone)
- Prevent ovulation
- Examples: Ethynylestradiol, Norethindrone

**6. Antacids:**
Neutralize excess stomach acid
- Mg(OH)₂, Al(OH)₃, NaHCO₃
- Some coat stomach lining

**7. Antihistamines:**
Block histamine receptors
- Reduce allergy symptoms
- Examples: Brompheniramine, Terfenadine

**8. Tranquilizers:**
Reduce anxiety and tension
- Act on CNS
- Examples: Equanil, Valium

## Chemicals in Food

**1. Artificial Sweeteners:**

| Sweetener | Sweetness vs Sugar | Notes |
|-----------|-------------------|-------|
| Saccharin | 550× | First artificial, no calories |
| Aspartame | 200× | Contains phenylalanine |
| Sucralose | 600× | Made from sucrose |
| Alitame | 2000× | Very stable |

**2. Food Preservatives:**
Prevent spoilage by microorganisms
- Salt, Sugar (traditional)
- Sodium benzoate (acidic foods)
- Sodium metabisulfite (dried fruits)
- Potassium sorbate (cheese, bread)

**3. Antioxidants:**
Prevent oxidation/rancidity
- BHA (Butylated hydroxyanisole)
- BHT (Butylated hydroxytoluene)
- Vitamin E (natural)

## Cleansing Agents

**1. Soaps:**
Sodium or potassium salts of fatty acids

**Preparation (Saponification):**
Fat/Oil + NaOH → Soap + Glycerol

**Structure:**
- Hydrophobic (water-hating) tail: Long hydrocarbon chain
- Hydrophilic (water-loving) head: -COONa group

**Cleansing Action:**
1. Soap molecules surround oil/grease
2. Hydrophobic tails dissolve in grease
3. Hydrophilic heads face water
4. Forms micelles
5. Micelles wash away with water

**Limitations:**
- Don't work in hard water (Ca²⁺, Mg²⁺ form scum)
- Not effective in acidic water

**2. Detergents (Synthetic):**
Work in hard water (no scum)

**Types:**

**Anionic Detergents:**
- Sodium alkylbenzenesulfonates
- Sodium alkylsulfates
- Examples: SDS (sodium dodecylsulfate)

**Cationic Detergents:**
- Quaternary ammonium salts
- Used in fabric softeners
- Have germicidal properties

**Non-ionic Detergents:**
- No ionic groups
- Gentler, used in liquid detergents
- Example: Polyethylene glycol esters

**Biodegradability:**
- Branched chain detergents: Non-biodegradable (environmental problem)
- Straight chain detergents: Biodegradable (preferred)

## Drug Resistance

**Antibiotic Resistance**: Bacteria evolve to survive antibiotics
- Major global health concern
- Caused by overuse/misuse of antibiotics
- Need new antibiotics, better use of existing ones`,
    keyConcepts: JSON.stringify([
      { title: "Drug-Target Interaction", description: "Drugs interact with enzymes (inhibition) or receptors (agonist/antagonist). Structure determines specificity and action." },
      { title: "Analgesics Types", description: "Non-narcotic (aspirin, paracetamol) for mild pain, non-addictive. Narcotic (morphine) for severe pain, addictive, CNS action." },
      { title: "Antibiotics vs Antiseptics", description: "Antibiotics kill bacteria (taken internally). Antiseptics prevent infection on living tissue. Disinfectants clean non-living surfaces." },
      { title: "Artificial Sweeteners", description: "Saccharin (550×), Aspartame (200×), Sucralose (600×), Alitame (2000×) compared to sugar. Low/no calories." },
      { title: "Soap Structure", description: "Fatty acid salt with hydrophobic tail (dissolves in grease) and hydrophilic head (faces water). Forms micelles." },
      { title: "Soap vs Detergent", description: "Soaps fail in hard water (form scum). Detergents work in hard water. Straight-chain detergents are biodegradable." },
      { title: "Food Preservatives", description: "Prevent microbial growth. Include salt, sugar, sodium benzoate, sorbates. Antioxidants prevent rancidity." }
    ]),
    formulas: JSON.stringify([
      { name: "Saponification", formula: "Fat + 3NaOH → 3R-COONa + Glycerol", description: "Hydrolysis of ester by base. Produces soap and glycerol." },
      { name: "Aspirin Structure", formula: "CH₃COOC₆H₄COOH", description: "Acetylsalicylic acid. Acetyl ester of salicylic acid." },
      { name: "Soap Structure", formula: "CH₃(CH₂)ₙCOONa", description: "n typically 14-18. Long chain = hydrophobic, COONa = hydrophilic." },
      { name: "Detergent Structure", formula: "CH₃(CH₂)ₙC₆H₄SO₃Na", description: "Alkylbenzenesulfonate. Sulfonate group instead of carboxylate." },
      { name: "Penicillin Core", formula: "β-lactam ring structure", description: "Four-membered ring crucial for activity. Inhibits cell wall synthesis." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 80
  }
];

export async function seedOrganicChemistryClass12() {
  console.log("Seeding Organic Chemistry Class 12 chapters...");
  
  for (const chapter of organicChemistryClass12Chapters) {
    try {
      const existingChapter = await db.query.chapterContent.findFirst({
        where: (c, { and, ilike, eq }) => and(
          ilike(c.subject, '%chemistry%'),
          eq(c.classLevel, chapter.classLevel),
          eq(c.chapterNumber, chapter.chapterNumber)
        )
      });

      if (existingChapter) {
        await db.update(chapterContent)
          .set({
            chapterTitle: chapter.chapterTitle,
            introduction: chapter.introduction,
            detailedNotes: chapter.detailedNotes,
            keyConcepts: chapter.keyConcepts,
            formulas: chapter.formulas,
            difficultyLevel: chapter.difficultyLevel,
            estimatedStudyMinutes: chapter.estimatedStudyMinutes,
            updatedAt: new Date()
          })
          .where(eq(chapterContent.id, existingChapter.id));
        console.log(`Updated: ${chapter.chapterTitle}`);
      } else {
        await db.insert(chapterContent).values({
          subject: chapter.subject,
          classLevel: chapter.classLevel,
          chapterNumber: chapter.chapterNumber,
          chapterTitle: chapter.chapterTitle,
          introduction: chapter.introduction,
          detailedNotes: chapter.detailedNotes,
          keyConcepts: chapter.keyConcepts,
          formulas: chapter.formulas,
          difficultyLevel: chapter.difficultyLevel,
          estimatedStudyMinutes: chapter.estimatedStudyMinutes,
          status: "published",
          approvalStatus: "approved"
        });
        console.log(`Created: ${chapter.chapterTitle}`);
      }
    } catch (error) {
      console.error(`Error with chapter ${chapter.chapterTitle}:`, error);
    }
  }
  
  console.log("Organic Chemistry Class 12 seeding complete!");
}
