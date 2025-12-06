import { db } from "../db";
import { chapterContent } from "@shared/schema";
import { eq } from "drizzle-orm";

const organicChemistryChapters = [
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 12,
    chapterTitle: "Some Basic Principles of Organic Chemistry",
    introduction: "Welcome to Organic Chemistry! This chapter introduces you to the fascinating world of carbon compounds. You'll learn about hybridization, isomerism, IUPAC naming, and the reaction mechanisms that govern organic transformations.",
    detailedNotes: `# Some Basic Principles of Organic Chemistry

Organic chemistry is the study of carbon compounds! Carbon is special because it can form four bonds and create long chains, rings, and complex structures. Almost everything in living organisms is made of organic compounds!

## Why Carbon is Unique

**💡 Did You Know?**
Carbon forms the backbone of over 10 million known compounds! That's more than all other elements combined!

Carbon's special properties:
- **Catenation**: Carbon atoms can bond to each other to form long chains, branches, and rings
- **Tetravalency**: Carbon always forms exactly 4 bonds
- Forms strong bonds with C, H, O, N, S, and halogens
- Small atomic size allows strong, stable bonds

## Hybridization

When carbon forms bonds, its orbitals mix to create new hybrid orbitals:

**sp³ Hybridization** (4 single bonds)
- Tetrahedral geometry, 109.5° bond angle
- Example: Methane (CH₄), Ethane

**sp² Hybridization** (1 double bond + 2 single bonds)
- Trigonal planar, 120° bond angle
- Example: Ethene (C₂H₄), Benzene

**sp Hybridization** (1 triple bond or 2 double bonds)
- Linear geometry, 180° bond angle
- Example: Ethyne (C₂H₂), CO₂

**🔑 Remember This!**
Count the number of sigma bonds + lone pairs to find hybridization:
4 = sp³, 3 = sp², 2 = sp

## IUPAC Nomenclature

**Prefix + Root + Suffix**
- Prefix: Substituents and their positions
- Root: Number of carbons in longest chain
- Suffix: Functional group

**Root Words:**
- 1C = Meth, 2C = Eth, 3C = Prop, 4C = But
- 5C = Pent, 6C = Hex, 7C = Hept, 8C = Oct

**⚠️ Common Mistake Alert!**
Always number the chain so that substituents get the LOWEST possible numbers, not the highest!

**Steps for Naming:**
1. Find the longest carbon chain containing the functional group
2. Number carbons to give lowest locants to substituents
3. Name and locate substituents alphabetically
4. Combine with proper punctuation

## Isomerism

Isomers are compounds with same molecular formula but different structures!

**1. Structural Isomerism**
- Chain isomerism: Different carbon skeletons
- Position isomerism: Different position of functional group
- Functional group isomerism: Different functional groups (e.g., alcohol vs ether)
- Metamerism: Different alkyl groups around functional group
- Tautomerism: Rapid interconversion (keto-enol)

**2. Stereoisomerism**
- Geometrical (cis-trans): Different arrangement around double bond or ring
- Optical: Non-superimposable mirror images (chirality)

## Electron Displacement Effects

**Inductive Effect (I effect)**
Electron displacement through sigma bonds
- -I effect: Electron withdrawing (halogens, -NO₂, -CN)
- +I effect: Electron donating (alkyl groups)

**Resonance (Mesomeric) Effect**
Electron delocalization through pi bonds
- Explains stability of benzene, carboxylate ions, enolate ions

**Hyperconjugation**
Interaction between C-H sigma bonds and adjacent empty p-orbital or pi system
Explains stability order of carbocations: 3° > 2° > 1° > CH₃⁺

## Reaction Intermediates

**Carbocations**: Carbon with positive charge (electron deficient)
- Stability: 3° > 2° > 1° > CH₃⁺
- sp² hybridized, planar

**Carbanions**: Carbon with negative charge (electron rich)
- Stability: CH₃⁻ > 1° > 2° > 3°
- sp³ hybridized, pyramidal

**Free Radicals**: Carbon with unpaired electron
- Stability: 3° > 2° > 1° > CH₃•

## Types of Organic Reactions

1. **Substitution**: One group replaces another (SN1, SN2)
2. **Addition**: Two molecules combine (electrophilic, nucleophilic, free radical)
3. **Elimination**: Removal of atoms to form multiple bond (E1, E2)
4. **Rearrangement**: Atoms rearrange within molecule`,
    keyConcepts: JSON.stringify([
      { title: "Catenation and Tetravalency", description: "Carbon's ability to form 4 bonds and create long chains makes it unique. This is why millions of organic compounds exist." },
      { title: "Hybridization", description: "sp³ (tetrahedral, 109.5°), sp² (trigonal planar, 120°), sp (linear, 180°). Determines geometry and bond angles." },
      { title: "IUPAC Nomenclature", description: "Systematic naming using Prefix + Root + Suffix. Root indicates chain length, suffix indicates functional group." },
      { title: "Structural Isomerism", description: "Same molecular formula, different connectivity. Types include chain, position, functional group, metamerism, and tautomerism." },
      { title: "Stereoisomerism", description: "Same connectivity but different spatial arrangement. Includes geometrical (cis-trans) and optical isomers." },
      { title: "Electron Displacement Effects", description: "Inductive effect (through sigma bonds) and resonance effect (through pi bonds) determine reactivity and stability." },
      { title: "Reaction Intermediates", description: "Unstable species like carbocations (C⁺), carbanions (C⁻), and free radicals formed during reactions." }
    ]),
    formulas: JSON.stringify([
      { name: "Degree of Unsaturation", formula: "DBE = (2C + 2 + N - H - X) / 2", description: "Calculates double bond equivalents. Each ring or double bond adds 1, triple bond adds 2." },
      { name: "Hybridization Formula", formula: "H = ½(V + M - C + A)", description: "V = valence electrons, M = monovalent atoms, C = cation charge, A = anion charge." },
      { name: "Stability Order Carbocations", formula: "3° > 2° > 1° > CH₃⁺", description: "More substituted carbocations are more stable due to hyperconjugation and +I effect." },
      { name: "Stability Order Carbanions", formula: "CH₃⁻ > 1° > 2° > 3°", description: "Less substituted carbanions are more stable (opposite to carbocations)." },
      { name: "Bond Dissociation Energy", formula: "ΔH = Σ(D bonds broken) - Σ(D bonds formed)", description: "Energy change in reactions based on bond energies." },
      { name: "Empirical to Molecular", formula: "Molecular formula = n × Empirical formula", description: "n = Molar mass / Empirical formula mass." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 13,
    chapterTitle: "Hydrocarbons",
    introduction: "Hydrocarbons are the simplest organic compounds containing only carbon and hydrogen. This chapter covers alkanes, alkenes, alkynes, and aromatic hydrocarbons, their properties, reactions, and real-world applications from fuels to plastics.",
    detailedNotes: `# Hydrocarbons

Hydrocarbons are organic compounds made of only carbon and hydrogen. They're the foundation of organic chemistry and the main component of fossil fuels!

**💡 Did You Know?**
Natural gas (mostly methane) and petroleum are mixtures of hydrocarbons that took millions of years to form from ancient organisms!

## Classification of Hydrocarbons

**1. Saturated (Alkanes)**: Only single bonds - CₙH₂ₙ₊₂
**2. Unsaturated**: 
   - Alkenes (double bonds) - CₙH₂ₙ
   - Alkynes (triple bonds) - CₙH₂ₙ₋₂
**3. Aromatic**: Contains benzene ring

## ALKANES (Paraffins)

General formula: **CₙH₂ₙ₊₂**

Saturated hydrocarbons with only C-C single bonds. Called "paraffins" meaning "little affinity" because they're relatively unreactive!

**Physical Properties:**
- First 4 members (C₁-C₄): Gases
- C₅-C₁₇: Liquids
- C₁₈+: Solids
- Insoluble in water, soluble in organic solvents
- Boiling point increases with molecular mass

**Chemical Reactions:**

**1. Combustion** (Most important!)
CH₄ + 2O₂ → CO₂ + 2H₂O + Heat (Complete)
2CH₄ + 3O₂ → 2CO + 4H₂O (Incomplete - dangerous!)

**2. Substitution (Halogenation)**
CH₄ + Cl₂ → CH₃Cl + HCl (UV light needed)
Free radical mechanism: Initiation → Propagation → Termination

**🔑 Remember This!**
Reactivity of halogens: F₂ > Cl₂ > Br₂ > I₂

**Conformations of Ethane:**
- Staggered: Most stable (H atoms far apart, lower energy)
- Eclipsed: Least stable (H atoms close, torsional strain)

## ALKENES (Olefins)

General formula: **CₙH₂ₙ**

Contain at least one C=C double bond. Much more reactive than alkanes!

**⚠️ Common Mistake Alert!**
The double bond in alkenes consists of one sigma (σ) bond and one pi (π) bond. The π bond is weaker and breaks during addition reactions.

**Geometrical Isomerism:**
When there are different groups on each carbon of the double bond:
- **cis**: Same groups on same side
- **trans**: Same groups on opposite sides

**Chemical Reactions (Addition):**

**1. Hydrogenation**
CH₂=CH₂ + H₂ → CH₃-CH₃ (Ni/Pt catalyst)

**2. Halogenation**
CH₂=CH₂ + Br₂ → CH₂Br-CH₂Br (Brown color disappears - test!)

**3. Markovnikov's Rule (HX Addition)**
"The rich get richer" - Hydrogen adds to carbon with MORE hydrogens!
CH₃-CH=CH₂ + HBr → CH₃-CHBr-CH₃ (major product)

**4. Anti-Markovnikov (Peroxide effect)**
With peroxide: H adds to less substituted carbon
CH₃-CH=CH₂ + HBr → CH₃-CH₂-CH₂Br

**5. Ozonolysis**
Breaks double bond to form aldehydes/ketones. Used to locate double bond position.

## ALKYNES

General formula: **CₙH₂ₙ₋₂**

Contain C≡C triple bond. Even more unsaturated than alkenes!

**Preparation of Ethyne (Acetylene):**
CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂

**Acidic Nature:**
Alkynes with terminal triple bond are weakly acidic:
HC≡CH + Na → HC≡CNa + ½H₂
(Forms sodium acetylide)

## AROMATIC HYDROCARBONS

Benzene (C₆H₆) is the parent aromatic compound.

**Structure of Benzene:**
- 6 carbon hexagonal ring, all C-C bonds equal (1.39 Å)
- Planar structure, highly stable due to resonance
- 6 delocalized π electrons

**💡 Did You Know?**
The hexagonal structure of benzene was discovered by Kekulé after he dreamed of a snake biting its own tail!

**Hückel's Rule:**
Compound is aromatic if it has (4n + 2) π electrons
Benzene: 6 π electrons (n = 1) ✓

**Electrophilic Substitution Reactions:**
Benzene prefers substitution over addition to preserve aromaticity!

1. **Nitration**: C₆H₆ + HNO₃ → C₆H₅NO₂ (conc. H₂SO₄ catalyst)
2. **Halogenation**: C₆H₆ + Cl₂ → C₆H₅Cl (FeCl₃ catalyst)
3. **Friedel-Crafts Alkylation**: C₆H₆ + RCl → C₆H₅R (AlCl₃ catalyst)
4. **Friedel-Crafts Acylation**: C₆H₆ + RCOCl → C₆H₅COR (AlCl₃ catalyst)

**Directive Effects:**
- Ortho-para directing: -OH, -NH₂, -CH₃, -OCH₃ (activating)
- Meta directing: -NO₂, -CHO, -COOH, -CN (deactivating)`,
    keyConcepts: JSON.stringify([
      { title: "Alkanes (Paraffins)", description: "Saturated hydrocarbons with CₙH₂ₙ₊₂ formula. Undergo substitution reactions via free radical mechanism." },
      { title: "Markovnikov's Rule", description: "In addition of HX to unsymmetrical alkenes, H adds to carbon with more hydrogens, X to carbon with fewer hydrogens." },
      { title: "Geometrical Isomerism", description: "Cis-trans isomers in alkenes due to restricted rotation around double bond. Cis has same groups on same side." },
      { title: "Benzene Structure", description: "Hexagonal ring with delocalized π electrons. All C-C bonds are equal. Very stable due to resonance." },
      { title: "Hückel's Rule", description: "Aromatic compounds have (4n + 2) π electrons, are planar, and cyclic. Benzene has 6 π electrons (n=1)." },
      { title: "Electrophilic Substitution", description: "Benzene's characteristic reaction. Includes nitration, halogenation, and Friedel-Crafts reactions. Preserves aromaticity." },
      { title: "Directive Effects", description: "Existing substituents direct incoming groups. Activating groups are ortho-para directing, deactivating are meta directing." }
    ]),
    formulas: JSON.stringify([
      { name: "Alkane Formula", formula: "CₙH₂ₙ₊₂", description: "General formula for alkanes. Each carbon has 4 bonds, all single bonds." },
      { name: "Alkene Formula", formula: "CₙH₂ₙ", description: "General formula for alkenes with one double bond. Each double bond reduces H by 2." },
      { name: "Alkyne Formula", formula: "CₙH₂ₙ₋₂", description: "General formula for alkynes with one triple bond. Each triple bond reduces H by 4." },
      { name: "Complete Combustion", formula: "CₙH₂ₙ₊₂ + (3n+1)/2 O₂ → nCO₂ + (n+1)H₂O", description: "Alkane combustion produces CO₂ and water. Releases large amount of energy." },
      { name: "Hückel's Rule", formula: "(4n + 2) π electrons", description: "Compound is aromatic if planar, cyclic, and has 4n+2 π electrons (n = 0, 1, 2...)." },
      { name: "Benzene Resonance Energy", formula: "~150 kJ/mol", description: "Extra stability of benzene compared to hypothetical cyclohexatriene." },
      { name: "Acetylene Preparation", formula: "CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂", description: "Calcium carbide reacts with water to produce acetylene gas." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 110
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 14,
    chapterTitle: "Environmental Chemistry",
    introduction: "Our environment is like a giant chemistry lab! This chapter explores how chemical processes affect our air, water, and soil. You'll learn about pollution, the greenhouse effect, ozone depletion, and what we can do to protect our planet.",
    detailedNotes: `# Environmental Chemistry

Environmental chemistry studies chemical processes occurring in the environment and how human activities affect them. Understanding these helps us protect our planet!

**💡 Did You Know?**
Every year, humans release about 40 billion tonnes of CO₂ into the atmosphere - that's like adding 5 tonnes per person on Earth!

## Atmospheric Pollution

The atmosphere has different layers, each with unique chemistry:
- **Troposphere** (0-10 km): Where weather happens, where we live
- **Stratosphere** (10-50 km): Contains protective ozone layer

### Tropospheric Pollutants

**Gaseous Pollutants:**

| Pollutant | Source | Effect |
|-----------|--------|--------|
| CO | Incomplete combustion | Binds to hemoglobin, reduces O₂ transport |
| CO₂ | Burning fossil fuels | Greenhouse effect, global warming |
| SO₂ | Burning coal with sulfur | Acid rain, respiratory issues |
| NOₓ | Vehicle engines, industry | Smog, acid rain |
| O₃ (ground level) | Photochemical smog | Respiratory irritant |

**🔑 Remember This!**
Carbon monoxide is called the "silent killer" because it's colorless and odorless but deadly! It binds to hemoglobin 200 times more strongly than oxygen.

**Particulate Pollutants:**
- Dust, smoke, mist, fumes
- PM₂.₅ and PM₁₀ are most dangerous (small enough to enter lungs)
- Cause respiratory and cardiovascular diseases

### Smog

**Classical Smog (London type):**
- Smoke + Fog
- Forms in cold, humid conditions
- Contains SO₂ and particulates
- Reducing in nature

**Photochemical Smog (Los Angeles type):**
- Forms in warm, sunny conditions
- Involves NOₓ and hydrocarbons
- Produces ground-level ozone
- Oxidizing in nature

**⚠️ Common Mistake Alert!**
Ground-level ozone is a pollutant (causes respiratory problems), while stratospheric ozone is beneficial (protects from UV)!

### Acid Rain

Normal rain pH ≈ 5.6 (slightly acidic due to dissolved CO₂)
Acid rain pH < 5.6

**Formation:**
SO₂ + H₂O + ½O₂ → H₂SO₄ (sulfuric acid)
2NO₂ + H₂O → HNO₃ + HNO₂ (nitric acid)

**Effects of Acid Rain:**
- Damages buildings (especially marble/limestone: CaCO₃)
- Kills fish and aquatic life (low pH)
- Damages forests and crops
- Leaches nutrients from soil

### Greenhouse Effect & Global Warming

**Greenhouse Gases:** CO₂, CH₄, N₂O, CFCs, O₃

These gases trap infrared radiation from Earth, warming the atmosphere like a greenhouse!

**Global Warming Potential (GWP):** Relative to CO₂ = 1
- CH₄: 25 times
- N₂O: 298 times
- CFCs: 5000-10000 times!

**Consequences:**
- Rising sea levels (melting glaciers)
- Extreme weather events
- Ecosystem disruption
- Coral bleaching

## Stratospheric Pollution - Ozone Layer Depletion

Ozone (O₃) in the stratosphere absorbs harmful UV-B and UV-C radiation.

**Ozone Formation:**
O₂ + UV → 2O (oxygen atoms)
O₂ + O → O₃ (ozone)

**Ozone-Depleting Substances:**
CFCs (Chlorofluorocarbons) are the main culprits!

**🔑 Remember This!**
One chlorine atom can destroy 100,000 ozone molecules! The catalytic cycle:
Cl + O₃ → ClO + O₂
ClO + O → Cl + O₂ (Cl regenerated!)

**Ozone Hole:**
Severe depletion over Antarctica discovered in 1985.
Montreal Protocol (1987) banned CFCs - a success story!

## Water Pollution

**Sources:**
- Industrial effluents (heavy metals, chemicals)
- Agricultural runoff (fertilizers, pesticides)
- Sewage discharge (pathogens, organic matter)
- Oil spills

**Important Parameters:**

**BOD (Biochemical Oxygen Demand)**
- Measures organic pollution
- Clean water: BOD < 5 ppm
- Higher BOD = more pollution

**COD (Chemical Oxygen Demand)**
- Total oxygen needed to oxidize all organic matter
- Always higher than BOD

**DO (Dissolved Oxygen)**
- Healthy water: DO > 6 ppm
- Fish die if DO < 4 ppm

**Eutrophication:**
Excess nutrients (N, P) → Algal bloom → Oxygen depletion → Dead zones

## Green Chemistry

Designing chemical processes to reduce pollution:
1. Prevent waste rather than treat it
2. Use renewable feedstocks
3. Design safer chemicals and solvents
4. Use catalysts instead of stoichiometric reagents
5. Reduce energy requirements`,
    keyConcepts: JSON.stringify([
      { title: "Atmospheric Pollutants", description: "CO, CO₂, SO₂, NOₓ, and particulates cause health problems, acid rain, and global warming. Sources include combustion and industry." },
      { title: "Smog Types", description: "Classical smog forms in cold, humid conditions (reducing). Photochemical smog forms in warm, sunny conditions (oxidizing)." },
      { title: "Acid Rain", description: "Rain with pH < 5.6 due to dissolved SO₂ and NOₓ. Damages buildings, kills aquatic life, and harms forests." },
      { title: "Greenhouse Effect", description: "CO₂, CH₄, and other gases trap infrared radiation, warming Earth. Leads to climate change and rising sea levels." },
      { title: "Ozone Layer Depletion", description: "CFCs release chlorine atoms that catalytically destroy ozone. One Cl can destroy 100,000 O₃ molecules." },
      { title: "Water Pollution Parameters", description: "BOD measures organic pollution, DO indicates water health. Eutrophication causes oxygen depletion in water bodies." },
      { title: "Green Chemistry", description: "Designing chemical processes to minimize pollution and environmental impact. Prevention over treatment." }
    ]),
    formulas: JSON.stringify([
      { name: "Ozone Formation", formula: "O₂ + UV → 2O; O₂ + O → O₃", description: "Ozone forms when UV splits O₂ and oxygen atoms combine with O₂ in stratosphere." },
      { name: "Ozone Destruction", formula: "Cl + O₃ → ClO + O₂; ClO + O → Cl + O₂", description: "CFCs release chlorine that catalytically destroys ozone. Chlorine is regenerated." },
      { name: "Acid Rain (Sulfuric)", formula: "SO₂ + H₂O + ½O₂ → H₂SO₄", description: "Sulfur dioxide oxidizes to form sulfuric acid in rain droplets." },
      { name: "Acid Rain (Nitric)", formula: "2NO₂ + H₂O → HNO₃ + HNO₂", description: "Nitrogen oxides react with water to form nitric acid." },
      { name: "CO Toxicity", formula: "Hb + CO → HbCO (Kf = 200 × Hb-O₂)", description: "Carbon monoxide binds to hemoglobin 200× more strongly than oxygen." },
      { name: "GWP Comparison", formula: "CO₂ = 1, CH₄ = 25, N₂O = 298", description: "Global Warming Potential relative to CO₂. CFCs can be 5000-10000!" },
      { name: "BOD Standard", formula: "Clean water: BOD < 5 ppm", description: "Biochemical Oxygen Demand indicates organic pollution level." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 90
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 15,
    chapterTitle: "Purification and Characterization of Organic Compounds",
    introduction: "Before studying an organic compound, we need to purify it and identify what it is! This chapter teaches you the laboratory techniques used to separate, purify, and characterize organic compounds, from simple distillation to advanced spectroscopy.",
    detailedNotes: `# Purification and Characterization of Organic Compounds

Organic compounds rarely occur pure in nature. Scientists use various techniques to separate and purify them, then identify their structure. Think of it as being a chemical detective!

**💡 Did You Know?**
The perfume industry uses steam distillation to extract essential oils from flowers - the same technique you'll learn here!

## Purification Methods

Different compounds require different purification methods based on their properties.

### 1. Sublimation

For solids that directly convert to vapor without melting.

**Used for:** Camphor, naphthalene, iodine, benzoic acid, anthracene

**Principle:** The impure solid is heated. Pure compound sublimes and condenses on a cold surface, leaving impurities behind.

### 2. Crystallization

Most common purification technique for solids.

**🔑 Remember This!**
A good solvent for crystallization:
- Dissolves compound when HOT
- Doesn't dissolve compound when COLD
- Doesn't react with compound

**Steps:**
1. Dissolve impure compound in minimum hot solvent
2. Filter hot solution (removes insoluble impurities)
3. Cool slowly (pure crystals form)
4. Filter and wash crystals
5. Dry

### 3. Distillation

Separates liquids based on boiling point differences.

**Simple Distillation:**
For liquids with boiling points differing by >25°C
Used to separate liquid from non-volatile impurities

**Fractional Distillation:**
For liquids with close boiling points
Uses fractionating column for better separation (more theoretical plates)

**⚠️ Common Mistake Alert!**
Never heat a distillation flask to dryness - it's dangerous! Always leave some residue.

**Steam Distillation:**
For compounds that:
- Don't mix with water
- Have high boiling points
- Would decompose at high temperatures

Used for: Essential oils, aniline, nitrobenzene

**Vacuum Distillation:**
For compounds that decompose before boiling at atmospheric pressure
Reduced pressure lowers boiling point

### 4. Chromatography

Separates mixtures based on differential migration.

**Types:**

**Column Chromatography:**
- Stationary phase: Silica gel or alumina in column
- Mobile phase: Solvent
- Components separate based on adsorption

**Thin Layer Chromatography (TLC):**
- Quick analysis technique
- Stationary phase: Silica on glass/plastic plate
- Rf value = Distance moved by solute / Distance moved by solvent

**Paper Chromatography:**
- Stationary phase: Water in paper fibers
- Mobile phase: Organic solvent
- Separation by partition

**🔑 Remember This!**
Rf (Retardation factor) is characteristic for each compound under specific conditions. It's used for identification!

## Qualitative Analysis

### Detection of Elements (Lassaigne's Test)

Organic compound fused with sodium metal:
- C, N → NaCN (detected with Fe²⁺/Fe³⁺ - Prussian blue)
- S → Na₂S (detected with lead acetate - black ppt)
- Halogens → NaX (detected with AgNO₃ - colored ppt)

### Quantitative Analysis

**Carbon and Hydrogen:**
Organic compound + CuO → CO₂ + H₂O
- CO₂ absorbed in KOH (weighed)
- H₂O absorbed in CaCl₂ (weighed)

**Nitrogen (Dumas Method):**
Compound heated with CuO, N₂ collected over KOH

**Nitrogen (Kjeldahl's Method):**
For compounds with N in amino form
Compound + H₂SO₄ → (NH₄)₂SO₄
NH₃ released and titrated

**Halogens (Carius Method):**
Compound + HNO₃ + AgNO₃ → AgX (weighed)

## Spectroscopic Methods

### Mass Spectrometry (MS)
Determines molecular mass and structure
- Molecular ion peak (M⁺) gives molar mass
- Fragmentation pattern helps identify structure

### Infrared Spectroscopy (IR)
Identifies functional groups
- O-H stretch: ~3300 cm⁻¹ (broad)
- N-H stretch: ~3400 cm⁻¹
- C=O stretch: ~1700 cm⁻¹
- C-H stretch: ~3000 cm⁻¹

**💡 Did You Know?**
IR spectroscopy is like a fingerprint for molecules! The region below 1500 cm⁻¹ is called the "fingerprint region" because it's unique for each compound.

### NMR Spectroscopy
Identifies carbon-hydrogen framework
- Number of signals = number of different H environments
- Integration = relative number of H atoms
- Splitting pattern = neighboring H atoms (n+1 rule)

### UV-Visible Spectroscopy
Detects conjugated systems and chromophores
- λmax depends on extent of conjugation`,
    keyConcepts: JSON.stringify([
      { title: "Sublimation", description: "Purification of solids that directly vaporize (camphor, iodine, naphthalene). Impurities remain behind." },
      { title: "Crystallization", description: "Most common solid purification. Uses temperature-dependent solubility difference between compound and impurities." },
      { title: "Distillation Types", description: "Simple (large BP difference), Fractional (close BP), Steam (high BP, immiscible), Vacuum (decompose before boiling)." },
      { title: "Chromatography", description: "Separation based on differential adsorption/partition. Column, TLC, Paper types. Rf value identifies compounds." },
      { title: "Lassaigne's Test", description: "Detects N, S, halogens by fusion with Na. Forms NaCN, Na₂S, NaX which are detected by specific reagents." },
      { title: "Quantitative Analysis", description: "Determine % composition. Liebig (C,H), Dumas/Kjeldahl (N), Carius (halogens, S, P)." },
      { title: "Spectroscopy Basics", description: "MS (molecular mass), IR (functional groups), NMR (H environment), UV-Vis (conjugation). Each gives unique structural information." }
    ]),
    formulas: JSON.stringify([
      { name: "Rf Value", formula: "Rf = Distance by solute / Distance by solvent", description: "Retardation factor in chromatography. Characteristic for each compound under specific conditions." },
      { name: "Percent Carbon", formula: "% C = (12 × mass CO₂) / (44 × mass sample) × 100", description: "From Liebig method. CO₂ absorbed in KOH solution." },
      { name: "Percent Hydrogen", formula: "% H = (2 × mass H₂O) / (18 × mass sample) × 100", description: "From Liebig method. H₂O absorbed in CaCl₂." },
      { name: "Percent Nitrogen (Dumas)", formula: "% N = (28 × V × P) / (22400 × mass × 760) × 100", description: "V = volume of N₂ at STP, P = pressure in mmHg." },
      { name: "Molecular Formula", formula: "MF = (EF)ₙ where n = Molar mass / EF mass", description: "Molecular formula is multiple of empirical formula." },
      { name: "Beer-Lambert Law", formula: "A = εcl", description: "Absorbance = molar absorptivity × concentration × path length. Used in UV-Vis spectroscopy." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 95
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 10,
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

## Nature of C-X Bond

**Bond Polarity**: C is δ+, X is δ- (electronegative halogen)
**Bond Strength**: C-F > C-Cl > C-Br > C-I
**Bond Length**: C-I > C-Br > C-Cl > C-F

**🔑 Remember This!**
Reactivity order: R-I > R-Br > R-Cl > R-F (opposite to bond strength because C-I bond breaks easily!)

## Preparation Methods

**1. From Alcohols:**
- ROH + HX → RX + H₂O (ZnCl₂ for 1° alcohols)
- ROH + SOCl₂ → RCl + SO₂ + HCl (Darzen's process - best!)
- ROH + PCl₅ → RCl + POCl₃ + HCl

**2. Halogenation:**
- Alkane + X₂ → Alkyl halide (UV light, free radical)
- Alkene + HX → Alkyl halide (Markovnikov)
- Alkene + X₂ → Vic-dihalide

**3. Halogen Exchange:**
- Finkelstein: R-Cl + NaI → R-I + NaCl (in acetone)
- Swarts: R-Cl + AgF → R-F + AgCl

## Nucleophilic Substitution Reactions

**⚠️ Common Mistake Alert!**
Don't confuse SN1 and SN2! SN1 goes through carbocation (2 steps), SN2 is direct backside attack (1 step).

### SN2 Mechanism (Bimolecular)

**Features:**
- One step, concerted mechanism
- Backside attack by nucleophile
- Inversion of configuration (Walden inversion)
- Rate = k[R-X][Nu⁻]
- Favored by: 1° halides, strong nucleophiles, polar aprotic solvents

**Reactivity Order**: CH₃X > 1° > 2° > 3° (steric hindrance matters!)

### SN1 Mechanism (Unimolecular)

**Features:**
- Two steps (carbocation intermediate)
- Step 1: R-X → R⁺ + X⁻ (slow, rate-determining)
- Step 2: R⁺ + Nu⁻ → R-Nu (fast)
- Rate = k[R-X] (first order)
- Racemization (attack from both sides)
- Favored by: 3° halides, weak nucleophiles, polar protic solvents

**Reactivity Order**: 3° > 2° > 1° > CH₃X (carbocation stability)

## Elimination Reactions

### E2 Mechanism
- Concerted, anti-periplanar geometry
- Strong base required
- Forms Zaitsev product (more substituted alkene)
- Competes with SN2

### E1 Mechanism  
- Two steps via carbocation
- Weak base, high temperature
- Also gives Zaitsev product
- Competes with SN1

**🔑 Remember This!**
Zaitsev's Rule: The more substituted alkene (more stable) is the major product in elimination reactions!

## Reactions with Different Nucleophiles

| Nucleophile | Product |
|-------------|---------|
| OH⁻ | Alcohol |
| OR⁻ | Ether (Williamson synthesis) |
| CN⁻ | Nitrile (carbon chain increases by 1) |
| NH₃ | Amine |
| AgNO₂ | Nitroalkane |
| NaNO₂ | Alkyl nitrite |

## Grignard Reagent (Organomagnesium Compound)

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
- Phenyl cation is highly unstable

**Reactions require harsh conditions:**
- NaOH at 623K, 300 atm (Dow's process)
- Cu at 473K (Ullmann reaction)

## Polyhalogen Compounds

**Dichloromethane (CH₂Cl₂)**: Solvent, paint remover
**Chloroform (CHCl₃)**: Anesthetic, solvent
**Iodoform (CHI₃)**: Antiseptic
**Carbon tetrachloride (CCl₄)**: Fire extinguisher, dry cleaning
**Freons (CFCs)**: Refrigerants (now banned - ozone depletion)
**DDT**: Insecticide (now banned - bioaccumulation)`,
    keyConcepts: JSON.stringify([
      { title: "SN1 vs SN2 Mechanism", description: "SN2: one-step, backside attack, inversion, favors 1° and CH₃X. SN1: two-step via carbocation, racemization, favors 3° halides." },
      { title: "E1 vs E2 Elimination", description: "E2: concerted, strong base, anti-periplanar. E1: stepwise via carbocation, weak base. Both follow Zaitsev's rule." },
      { title: "Reactivity Order", description: "For SN2: CH₃X > 1° > 2° > 3° (steric). For SN1/E1: 3° > 2° > 1° > CH₃X (carbocation stability)." },
      { title: "Grignard Reagent", description: "R-MgX formed from RX + Mg in dry ether. Reacts with carbonyl compounds to form alcohols. Highly reactive." },
      { title: "Haloarene Unreactivity", description: "Aryl halides are less reactive due to resonance stabilization, sp² carbon, and unstable phenyl cation." },
      { title: "Nucleophilic Substitution Products", description: "OH⁻ → alcohol, OR⁻ → ether, CN⁻ → nitrile (chain extended), NH₃ → amine." },
      { title: "Important Polyhalogen Compounds", description: "CHCl₃ (chloroform), CCl₄, CHI₃ (antiseptic), CFCs (refrigerants - banned for ozone depletion)." }
    ]),
    formulas: JSON.stringify([
      { name: "SN2 Rate Law", formula: "Rate = k[R-X][Nu⁻]", description: "Bimolecular, depends on both substrate and nucleophile concentration." },
      { name: "SN1 Rate Law", formula: "Rate = k[R-X]", description: "Unimolecular, depends only on substrate concentration. Carbocation formation is RDS." },
      { name: "Grignard Formation", formula: "R-X + Mg → R-MgX (dry ether)", description: "Mg inserts between C and X. Requires anhydrous conditions." },
      { name: "Williamson Synthesis", formula: "R-O⁻ + R'-X → R-O-R' + X⁻", description: "Alkoxide attacks alkyl halide to form ether. SN2 mechanism." },
      { name: "Wurtz Reaction", formula: "2R-X + 2Na → R-R + 2NaX", description: "Coupling of two alkyl halides. Only works well for similar R groups." },
      { name: "Finkelstein Reaction", formula: "R-Cl + NaI → R-I + NaCl", description: "In acetone, NaCl precipitates, driving equilibrium forward." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 11,
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

## Preparation of Alcohols

**1. From Alkenes (Hydration):**
- Acid-catalyzed: CH₂=CH₂ + H₂O → CH₃CH₂OH (Markovnikov)
- Hydroboration-oxidation: Anti-Markovnikov product

**2. From Carbonyl Compounds:**
- Aldehydes + H₂/Ni or NaBH₄ → 1° alcohols
- Ketones + reducing agent → 2° alcohols

**3. From Grignard Reagents:**
- HCHO + RMgX → 1° alcohol
- RCHO + R'MgX → 2° alcohol
- R₂CO + R'MgX → 3° alcohol

**🔑 Remember This!**
Grignard + HCHO = 1° alcohol, Grignard + other aldehyde = 2° alcohol, Grignard + ketone = 3° alcohol!

## Physical Properties

**Hydrogen Bonding**: Alcohols form H-bonds
- Higher boiling points than alkanes of similar MW
- Solubility in water decreases with chain length

**Boiling Point Order**: Alcohols > Ethers > Alkanes (similar MW)

## Reactions of Alcohols

**1. With Active Metals:**
2ROH + 2Na → 2RONa + H₂
Acidity order: Water > Alcohols (1° > 2° > 3°)

**2. Dehydration:**
ROH → Alkene + H₂O (conc. H₂SO₄ or Al₂O₃, heat)

**⚠️ Common Mistake Alert!**
Reactivity for dehydration: 3° > 2° > 1° (more stable carbocation = easier dehydration)

**3. Oxidation:**
- 1° alcohol → Aldehyde → Carboxylic acid
- 2° alcohol → Ketone
- 3° alcohol → Resistant (requires strong conditions, C-C cleavage)

**Oxidizing Agents**: CrO₃, K₂Cr₂O₇/H₂SO₄, KMnO₄
**PCC**: Stops at aldehyde stage

**4. Esterification:**
ROH + R'COOH ⇌ R'COOR + H₂O (reversible, acid catalyst)

**5. Lucas Test (Distinguishing alcohols):**
ROH + HCl (ZnCl₂) → RCl + H₂O
- 3°: Immediate cloudiness
- 2°: 5-10 minutes
- 1°: Needs heating

## Phenols

**Acidic Nature**: Phenol is more acidic (pKa ≈ 10) than alcohols due to resonance stabilization of phenoxide ion.
Acidity order: Phenol > H₂CO₃ > Alcohols

**Electrophilic Substitution:**
-OH is activating, ortho-para directing
- Bromination: Phenol + Br₂ → 2,4,6-tribromophenol (white ppt)
- Nitration: Mixture of o- and p-nitrophenol

**Special Reactions:**
- **Kolbe's Reaction**: Phenol + CO₂ + NaOH → Salicylic acid
- **Reimer-Tiemann**: Phenol + CHCl₃ + NaOH → Salicylaldehyde
- **Azo coupling**: With diazonium salts → Azo dyes (colored)

## Ethers

### Williamson Ether Synthesis

**R-O⁻ + R'-X → R-O-R' + X⁻**

Best method for ether synthesis!
- Use 1° alkyl halide (SN2 mechanism)
- For mixed ethers, use less hindered halide

**Limitations:**
- 3° halides undergo elimination instead
- Aryl halides don't work (unreactive)

### Reactions of Ethers

**1. Cleavage by HI:**
- Excess HI, heat: R-O-R' → 2R-I + H₂O
- Limited HI: R-O-R' → R-OH + R'-I (smaller group gives iodide)

**2. Electrophilic Substitution (Anisole):**
-OCH₃ is activating, o,p-directing
Bromination, nitration, Friedel-Crafts work well

## Important Compounds

**Methanol**: Industrial solvent, fuel, "wood alcohol" (toxic! causes blindness)
**Ethanol**: Beverages, fuel, solvent
- Fermentation: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂
**Phenol**: Antiseptic, Bakelite manufacture
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
      { name: "Dehydration", formula: "R-CH₂-CH₂-OH → R-CH=CH₂ + H₂O", description: "Acid catalyst, heat. Follows Zaitsev rule for major product." },
      { name: "Williamson Synthesis", formula: "R-O⁻Na⁺ + R'-X → R-O-R' + NaX", description: "SN2 mechanism. Use 1° or CH₃ halides for best yield." },
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
    chapterNumber: 12,
    chapterTitle: "Aldehydes, Ketones and Carboxylic Acids",
    introduction: "From the fragrance of vanilla (vanillin) to the sourness of vinegar (acetic acid), carbonyl compounds are everywhere! This chapter covers the chemistry of the C=O group - one of the most reactive and important functional groups in organic chemistry.",
    detailedNotes: `# Aldehydes, Ketones and Carboxylic Acids

The carbonyl group (C=O) is the heart of organic chemistry. Its polarity and reactivity make these compounds essential building blocks!

## Structure of Carbonyl Group

**C=O is polar**: Carbon is δ+, Oxygen is δ-
- sp² hybridized carbon (trigonal planar, ~120°)
- Nucleophiles attack the electron-deficient carbon
- Electrophiles/acids attack oxygen

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
Formic acid gets its name from "formica" (Latin for ant) - it's the acid that makes ant bites sting!

## Preparation

**Aldehydes:**
- 1° alcohol + PCC → Aldehyde (selective oxidation)
- Rosenmund reduction: RCOCl + H₂/Pd-BaSO₄ → RCHO
- Stephen reduction: RCN + SnCl₂/HCl → RCHO

**Ketones:**
- 2° alcohol + oxidizing agent → Ketone
- Friedel-Crafts Acylation: ArH + RCOCl/AlCl₃ → ArCOR
- From acyl chloride: RCOCl + R₂Cd → RCOR'

## Nucleophilic Addition Reactions

The C=O carbon is electrophilic - nucleophiles attack it!

**🔑 Remember This!**
Aldehydes are more reactive than ketones because: 
(1) Less steric hindrance (one H vs two R groups)
(2) +I effect of alkyl groups stabilizes carbonyl in ketones

**1. Addition of HCN (Cyanohydrin formation):**
R₂C=O + HCN → R₂C(OH)CN
- Base catalyst needed
- Increases carbon chain by one!

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
| NH₂NH₂ | Hydrazone | Reduction |
| C₆H₅NHNH₂ | Phenylhydrazone | Identification |
| 2,4-DNP | 2,4-DNP derivative | Orange ppt test |
| NH₂CONHNH₂ | Semicarbazone | Characterization |

## α-Hydrogen Reactions

Hydrogen on carbon adjacent to C=O is acidic (enolizable)!

**⚠️ Common Mistake Alert!**
Only aldehydes/ketones with α-H can undergo aldol condensation and keto-enol tautomerism!

**Aldol Condensation:**
2 CH₃CHO → CH₃CH(OH)CH₂CHO (β-hydroxyaldehyde)
Heat → CH₃CH=CHCHO + H₂O (α,β-unsaturated aldehyde)

**Cannizzaro Reaction:**
2HCHO + conc. NaOH → HCOONa + CH₃OH
- Only for aldehydes WITHOUT α-H (HCHO, C₆H₅CHO)
- Disproportionation: one oxidized, one reduced

## Oxidation Reactions

**Aldehydes → Carboxylic acids** (easy oxidation)

**Tests for Aldehydes:**
- **Tollens' Test**: Ag⁺ → Ag mirror (silver mirror test)
- **Fehling's Test**: Cu²⁺ → Cu₂O (brick-red precipitate)
- **Benedict's Test**: Similar to Fehling's

**Note**: Ketones don't reduce Tollens' or Fehling's reagent!

## Reduction Reactions

**1. To Alcohols:**
- Aldehyde + H₂/Ni or NaBH₄ or LiAlH₄ → 1° alcohol
- Ketone + same → 2° alcohol

**2. To Hydrocarbons (Remove C=O entirely):**
- **Clemmensen**: Zn-Hg/HCl → -CH₂- (acidic conditions)
- **Wolff-Kishner**: N₂H₄/KOH, heat → -CH₂- (basic conditions)

## Carboxylic Acids

**Acidity**: Due to resonance-stabilized carboxylate ion

**Effect of Substituents on Acidity:**
- EWG (electron-withdrawing): Increases acidity
- EDG (electron-donating): Decreases acidity

**Acidity Order**: Cl-CH₂COOH > CH₃COOH > HCOOH

**Important Reactions:**

**1. Esterification:**
RCOOH + R'OH ⇌ RCOOR' + H₂O (acid catalyst)

**2. Decarboxylation:**
RCOONa + NaOH/CaO → R-H + Na₂CO₃

**3. Hell-Volhard-Zelinsky (HVZ):**
RCOOH + X₂/P → RCH(X)COOH (α-halogenation)

**4. Reduction:**
RCOOH + LiAlH₄ → RCH₂OH (1° alcohol)`,
    keyConcepts: JSON.stringify([
      { title: "Carbonyl Reactivity", description: "C=O is polar (Cδ+, Oδ-). Aldehydes more reactive than ketones due to less steric hindrance and weaker +I effect." },
      { title: "Nucleophilic Addition", description: "Nu⁻ attacks carbonyl carbon. Products: cyanohydrins (HCN), acetals (ROH), oximes/hydrazones (NH₂ derivatives)." },
      { title: "Aldol Condensation", description: "Aldehydes/ketones with α-H form β-hydroxy compounds. Dehydration gives α,β-unsaturated carbonyl." },
      { title: "Cannizzaro Reaction", description: "Aldehydes WITHOUT α-H undergo disproportionation with conc. NaOH. One molecule oxidized, one reduced." },
      { title: "Oxidation Tests", description: "Tollens' (silver mirror) and Fehling's (red Cu₂O) tests distinguish aldehydes from ketones." },
      { title: "Carboxylic Acid Acidity", description: "Acidity due to resonance-stabilized carboxylate ion. EWG increases, EDG decreases acidity." },
      { title: "Clemmensen vs Wolff-Kishner", description: "Both reduce C=O to CH₂. Clemmensen: Zn-Hg/HCl (acidic). Wolff-Kishner: N₂H₄/KOH (basic)." }
    ]),
    formulas: JSON.stringify([
      { name: "Aldol Product", formula: "2RCH₂CHO → RCH₂CH(OH)CH(R)CHO", description: "Base-catalyzed. Product is β-hydroxyaldehyde." },
      { name: "Cannizzaro Reaction", formula: "2RCHO + NaOH → RCH₂OH + RCOONa", description: "For aldehydes without α-H. Disproportionation reaction." },
      { name: "Cyanohydrin Formation", formula: "R₂C=O + HCN → R₂C(OH)CN", description: "Nucleophilic addition. Increases carbon chain by one." },
      { name: "2,4-DNP Test", formula: "R₂C=O + 2,4-DNP → R₂C=N-NH-C₆H₃(NO₂)₂", description: "Orange-yellow precipitate confirms aldehyde/ketone." },
      { name: "Fehling's Test", formula: "RCHO + 2Cu²⁺ + 4OH⁻ → RCOO⁻ + Cu₂O↓", description: "Brick-red precipitate indicates aldehyde. Ketones don't react." },
      { name: "HVZ Reaction", formula: "RCH₂COOH + X₂/P → RCH(X)COOH", description: "α-halogenation of carboxylic acids. Only works with CH₂ adjacent to COOH." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 13,
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

## Structure

**Nitrogen in amines is sp³ hybridized**
- Pyramidal shape (like NH₃)
- Lone pair on nitrogen
- Bond angle ≈ 107°

**🔑 Remember This!**
The lone pair on nitrogen makes amines basic and nucleophilic - these are their two key properties!

## Preparation of Amines

**1. Reduction of Nitro Compounds:**
R-NO₂ + 3H₂ (Ni/Pd) → R-NH₂ + 2H₂O
C₆H₅NO₂ + 6[H] → C₆H₅NH₂ + 2H₂O (aniline)

**2. Ammonolysis of Alkyl Halides:**
R-X + NH₃ → RNH₂ → R₂NH → R₃N → R₄N⁺X⁻
(Mixture of products - poor selectivity)

**3. Gabriel Phthalimide Synthesis:**
Potassium phthalimide + R-X → N-alkyl phthalimide → 1° amine only!

**4. Hoffmann Bromamide Reaction:**
R-CO-NH₂ + Br₂ + 4NaOH → R-NH₂ + Na₂CO₃ + 2NaBr + 2H₂O
(Amine has one LESS carbon than amide! Useful for chain shortening)

**5. Reduction of Nitriles and Amides:**
R-CN + 4[H] → R-CH₂-NH₂
R-CO-NH₂ + 4[H] → R-CH₂-NH₂ + H₂O

## Basicity of Amines

**In aqueous solution:**
Basicity order: (C₂H₅)₂NH > C₂H₅NH₂ > (C₂H₅)₃N > NH₃

**⚠️ Common Mistake Alert!**
In aqueous solution, 2° > 1° > 3° due to solvation effects. In gas phase, 3° > 2° > 1° based purely on +I effect!

**Effect of Substituents:**
- +I groups (alkyl): Increase basicity
- -I groups (halogens, NO₂): Decrease basicity
- Resonance with benzene ring: Decreases basicity (aniline < alkylamines)

**Basicity Order:**
(CH₃)₂NH > CH₃NH₂ > C₆H₅NH₂ > (C₆H₅)₂NH

## Chemical Reactions

**1. Salt Formation (Basic nature):**
R-NH₂ + HCl → R-NH₃⁺Cl⁻

**2. Acylation:**
R-NH₂ + CH₃COCl → R-NHCOCH₃ + HCl (amide formation)

**3. Carbylamine Test (Only 1° amines):**
R-NH₂ + CHCl₃ + 3KOH → R-NC + 3KCl + 3H₂O
(Foul-smelling isocyanide formed!)

**4. Reaction with HNO₂ (Nitrous acid):**

| Amine Type | Product |
|------------|---------|
| 1° Aliphatic | N₂ gas + mixture of products |
| 1° Aromatic | Diazonium salt (at 0-5°C) |
| 2° (any) | N-Nitroso compound (yellow oil) |
| 3° Aliphatic | No reaction or nitrite salt |
| 3° Aromatic | C-Nitroso compound (p-position) |

## Diazonium Salts

Formed from 1° aromatic amines:
C₆H₅NH₂ + NaNO₂ + 2HCl → C₆H₅N₂⁺Cl⁻ + NaCl + 2H₂O
(Must be at 0-5°C to prevent decomposition!)

**🔑 Remember This!**
Diazonium salts are the gateway to many aromatic compounds!

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
| Hinsberg | Soluble in NaOH | Insoluble ppt | No reaction |
| HNO₂ (aliphatic) | N₂ gas | Yellow oil | No change |`,
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
      { name: "Diazotization", formula: "ArNH₂ + NaNO₂ + 2HCl → ArN₂⁺Cl⁻ (0-5°C)", description: "Diazonium salt is reactive intermediate for many reactions." },
      { name: "Sandmeyer Reaction", formula: "ArN₂⁺ + CuX → ArX + N₂", description: "X = Cl, Br, or CN. Introduces halogen/CN to benzene ring." },
      { name: "Carbylamine Test", formula: "R-NH₂ + CHCl₃ + 3KOH → R-NC + 3KCl", description: "Foul smell of isocyanide confirms 1° amine." },
      { name: "Azo Coupling", formula: "ArN₂⁺ + ArOH → Ar-N=N-Ar-OH", description: "Makes colored azo dyes. Phenol or amine as coupling partner." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 14,
    chapterTitle: "Biomolecules",
    introduction: "Life is chemistry! From the glucose that powers your cells to the DNA that stores your genetic code, biomolecules are the building blocks of all living things. This chapter explores carbohydrates, proteins, nucleic acids, and vitamins.",
    detailedNotes: `# Biomolecules

Biomolecules are organic molecules essential for life. Understanding their structure and function is crucial for biology, medicine, and biotechnology!

## Carbohydrates

Also called saccharides or sugars. General formula: Cₓ(H₂O)ᵧ

**Classification:**

**1. Monosaccharides** (cannot be hydrolyzed further)
- Trioses (3C): Glyceraldehyde
- Pentoses (5C): Ribose, Deoxyribose
- Hexoses (6C): Glucose, Fructose, Galactose

**2. Oligosaccharides** (2-10 monosaccharides)
- Disaccharides: Sucrose, Maltose, Lactose

**3. Polysaccharides** (many monosaccharides)
- Starch, Cellulose, Glycogen

**💡 Did You Know?**
Cellulose is the most abundant organic compound on Earth! It makes up plant cell walls, and we can't digest it because we lack the enzyme cellulase.

## Glucose (C₆H₁₂O₆)

**Structure Evidence:**
- Reacts with HI → n-hexane (6 C chain)
- Reacts with NH₂OH → oxime (C=O present)
- Reacts with Br₂ water → gluconic acid (-CHO present)
- Acetylation → penta-acetate (5 -OH groups)

**Cyclic Structure:**
- Forms hemiacetal between -CHO and -OH on C5
- α-D-glucose: -OH at C1 below ring (axial)
- β-D-glucose: -OH at C1 above ring (equatorial)
- Mutarotation: interconversion in solution

**🔑 Remember This!**
In Haworth projection: α means -OH down, β means -OH up (at C1). Think "α = axial = down"

## Important Disaccharides

| Disaccharide | Components | Linkage | Reducing? |
|--------------|------------|---------|-----------|
| Sucrose | Glucose + Fructose | α-1,2 | No |
| Maltose | Glucose + Glucose | α-1,4 | Yes |
| Lactose | Galactose + Glucose | β-1,4 | Yes |

**⚠️ Common Mistake Alert!**
Sucrose is non-reducing because BOTH anomeric carbons are involved in the glycosidic bond - no free anomeric carbon!

## Polysaccharides

**Starch** (Storage in plants):
- Amylose: Linear, α-1,4 linkages (gives blue with iodine)
- Amylopectin: Branched, α-1,4 and α-1,6 linkages

**Cellulose** (Structural in plants):
- Linear, β-1,4 linkages
- Cannot be digested by humans (no β-glucosidase)

**Glycogen** (Storage in animals):
- Like amylopectin but MORE branched
- Stored in liver and muscles

## Amino Acids

Building blocks of proteins. General structure: H₂N-CHR-COOH

**Classification by R group:**
- Non-polar: Glycine, Alanine, Valine, Leucine
- Polar neutral: Serine, Cysteine, Asparagine
- Acidic: Aspartic acid, Glutamic acid
- Basic: Lysine, Arginine, Histidine

**Zwitterion:** At neutral pH: H₃N⁺-CHR-COO⁻
**Isoelectric point (pI):** pH where net charge = 0

**Essential Amino Acids** (must be obtained from diet):
Val, Leu, Ile, Met, Phe, Trp, Thr, Lys (+ His, Arg for children)
Mnemonic: "PVT TIM HALL" (Private Tim Hall)

## Proteins

**Peptide Bond:** -CO-NH- formed by condensation
- Partial double bond character (planar)
- Trans configuration preferred

**Protein Structure Levels:**

**1. Primary:** Sequence of amino acids (backbone)
**2. Secondary:** Local folding
- α-helix: Right-handed coil, H-bonds within chain
- β-sheet: Parallel/antiparallel chains, H-bonds between chains
**3. Tertiary:** Overall 3D shape of one polypeptide
- H-bonds, disulfide bridges, ionic bonds, hydrophobic interactions
**4. Quaternary:** Multiple polypeptide chains together
- Example: Hemoglobin (4 subunits)

**Denaturation:** Loss of 2°, 3°, 4° structure (by heat, pH, chemicals)
- Primary structure remains intact

## Nucleic Acids

**Components:**
1. Nitrogenous base (purine or pyrimidine)
2. Pentose sugar (ribose or deoxyribose)
3. Phosphate group

**Bases:**
- **Purines** (2 rings): Adenine (A), Guanine (G)
- **Pyrimidines** (1 ring): Cytosine (C), Thymine (T), Uracil (U)

**DNA vs RNA:**

| Feature | DNA | RNA |
|---------|-----|-----|
| Sugar | Deoxyribose | Ribose |
| Bases | A, T, G, C | A, U, G, C |
| Structure | Double helix | Usually single strand |
| Function | Genetic storage | Protein synthesis |

**Base Pairing (Chargaff's Rule):**
- A pairs with T (or U in RNA): 2 H-bonds
- G pairs with C: 3 H-bonds

## Vitamins

**Water-soluble:** B-complex, C (not stored, need daily intake)
**Fat-soluble:** A, D, E, K (stored in body fat)

| Vitamin | Function | Deficiency Disease |
|---------|----------|--------------------|
| A | Vision, skin | Night blindness, Xerophthalmia |
| B₁ | Carbohydrate metabolism | Beriberi |
| C | Collagen synthesis, antioxidant | Scurvy |
| D | Calcium absorption | Rickets, Osteomalacia |
| E | Antioxidant | Sterility |
| K | Blood clotting | Hemorrhage |`,
    keyConcepts: JSON.stringify([
      { title: "Carbohydrate Classification", description: "Monosaccharides (glucose, fructose), Disaccharides (sucrose, maltose), Polysaccharides (starch, cellulose). Based on hydrolysis products." },
      { title: "Glucose Structure", description: "Aldohexose with cyclic hemiacetal form. α and β anomers differ at C1. Shows mutarotation in solution." },
      { title: "Reducing vs Non-reducing Sugars", description: "Reducing sugars have free anomeric carbon. Maltose, lactose reduce Tollens'. Sucrose doesn't (both anomeric C used in bond)." },
      { title: "Amino Acid Structure", description: "H₂N-CHR-COOH. Exist as zwitterions at neutral pH. 20 standard amino acids, 8-10 essential." },
      { title: "Protein Structure Levels", description: "1° sequence, 2° local folding (helix/sheet), 3° overall 3D shape, 4° multiple chains. Denaturation disrupts 2°-4°." },
      { title: "DNA Base Pairing", description: "A pairs with T (2 H-bonds), G pairs with C (3 H-bonds). Chargaff's rule: A=T, G=C in double helix." },
      { title: "Vitamins Classification", description: "Water-soluble (B, C) need daily intake. Fat-soluble (A, D, E, K) stored in body. Each has specific deficiency disease." }
    ]),
    formulas: JSON.stringify([
      { name: "Glycosidic Bond", formula: "Sugar-OH + HO-Sugar → Sugar-O-Sugar + H₂O", description: "Links monosaccharides. α or β depending on configuration at anomeric carbon." },
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
    chapterNumber: 15,
    chapterTitle: "Polymers",
    introduction: "From the plastic bottles we use daily to the DNA in our cells, polymers are everywhere! This chapter explores how small molecules (monomers) join to form giant molecules with amazing properties used in countless applications.",
    detailedNotes: `# Polymers

Polymers are giant molecules made by joining many small repeating units (monomers). The word comes from Greek: poly (many) + meros (parts).

## Basic Concepts

**Monomer**: Small molecule that joins to form polymer
**Polymer**: Large molecule made of repeating units
**Degree of Polymerization (DP)**: Number of monomer units in polymer chain

**💡 Did You Know?**
Natural rubber from rubber trees is a polymer of isoprene. Ancient Mayans used it to make balls for games over 3000 years ago!

## Classification of Polymers

**1. Based on Source:**
- **Natural**: Proteins, Cellulose, Natural rubber, DNA
- **Semi-synthetic**: Cellulose acetate, Cellulose nitrate (gun cotton)
- **Synthetic**: Polythene, Nylon, PVC, Bakelite

**2. Based on Structure:**
- **Linear**: Long straight chains (HDPE)
- **Branched**: Side chains attached (LDPE)
- **Cross-linked**: 3D network (Bakelite, vulcanized rubber)

**3. Based on Polymerization:**
- **Addition polymers**: Monomers add without loss of atoms
- **Condensation polymers**: Small molecule (H₂O) eliminated

**🔑 Remember This!**
Addition polymers usually have C=C monomers. Condensation polymers have bifunctional monomers (-OH, -COOH, -NH₂).

## Addition Polymerization

**Mechanism**: Free radical, cationic, or anionic

**Free Radical Mechanism:**
1. **Initiation**: R• (from peroxide) attacks monomer
2. **Propagation**: Chain grows as radicals add monomers
3. **Termination**: Two radicals combine

**Important Addition Polymers:**

| Polymer | Monomer | Uses |
|---------|---------|------|
| Polyethylene (PE) | CH₂=CH₂ | Bags, bottles, pipes |
| Polypropylene (PP) | CH₂=CHCH₃ | Ropes, carpets, containers |
| PVC | CH₂=CHCl | Pipes, cables, flooring |
| Polystyrene | CH₂=CHC₆H₅ | Packaging, insulation |
| PTFE (Teflon) | CF₂=CF₂ | Non-stick coating |
| PMMA (Plexiglass) | CH₂=C(CH₃)COOCH₃ | Transparent sheets |

**LDPE vs HDPE:**
- LDPE: Low density, branched, soft, flexible (bags)
- HDPE: High density, linear, rigid, stronger (bottles)

## Condensation Polymerization

Requires bifunctional or polyfunctional monomers.

**⚠️ Common Mistake Alert!**
In condensation polymerization, polymer mass is less than sum of monomer masses because small molecules (H₂O, HCl) are eliminated!

**Important Condensation Polymers:**

**1. Nylon (Polyamides):**

**Nylon-6,6:**
- Hexamethylenediamine + Adipic acid
- H₂N-(CH₂)₆-NH₂ + HOOC-(CH₂)₄-COOH
- Uses: Fibers, ropes, tyre cords

**Nylon-6:**
- Caprolactam (ring-opening polymerization)
- Uses: Textiles, fishing nets

**2. Polyesters:**

**Terylene (PET):**
- Ethylene glycol + Terephthalic acid
- Uses: Fabrics, bottles, films

**3. Phenol-Formaldehyde (Bakelite):**
- Phenol + Formaldehyde
- **Novolac**: Linear, thermoplastic (acid catalyst)
- **Bakelite**: Cross-linked, thermosetting (base catalyst + heat)
- Uses: Electrical switches, handles

**4. Melamine-Formaldehyde:**
- Cross-linked structure
- Uses: Unbreakable crockery, laminates

## Copolymers

Polymers from two or more different monomers.

**Types:**
- Alternating: -A-B-A-B-A-B-
- Random: -A-B-B-A-A-B-A-
- Block: -A-A-A-B-B-B-
- Graft: Side chains of B on A backbone

## Natural and Synthetic Rubber

**Natural Rubber**: cis-1,4-polyisoprene
- Elastic but sticky, softens in heat

**Vulcanization**: Cross-linking with sulfur (3-5%)
- Increases strength, elasticity
- Reduces stickiness
- More sulfur → harder rubber (ebonite at 30%)

**Synthetic Rubbers:**

**Neoprene**: Polychloroprene (oil and heat resistant)
**Buna-N**: Butadiene + Acrylonitrile (oil resistant)
**Buna-S (SBR)**: Butadiene + Styrene (tyres)

## Biodegradable Polymers

**PHBV**: Poly-β-hydroxybutyrate-co-β-hydroxyvalerate
- Degraded by bacteria
- Uses: Packaging, drug delivery

**Nylon-2-Nylon-6**: From glycine + aminocaproic acid
- Biodegradable polyamide

## Polymer Properties

**Thermoplastics vs Thermosets:**

| Property | Thermoplastic | Thermosetting |
|----------|---------------|---------------|
| Structure | Linear/branched | Cross-linked |
| On heating | Softens, melts | Does not soften |
| Recyclable | Yes | No |
| Examples | PVC, PE, PP | Bakelite, Melamine |

**Elastomers**: Rubber-like, can stretch and return (cross-linked but flexible)
**Fibers**: High tensile strength, crystalline arrangement`,
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
      { name: "PET Structure", formula: "(-O-CH₂-CH₂-O-CO-C₆H₄-CO-)ₙ", description: "Polyester from ethylene glycol + terephthalic acid." },
      { name: "Natural Rubber", formula: "(CH₂-C(CH₃)=CH-CH₂)ₙ", description: "cis-1,4-polyisoprene. Vulcanized with S for better properties." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 90
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 16,
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

**2. Antipyretics:** Aspirin, Paracetamol (reset body's thermostat)

**3. Antibiotics:**

**Broad-spectrum**: Active against many bacteria (Ampicillin, Tetracycline)
**Narrow-spectrum**: Specific bacteria (Penicillin G)

**⚠️ Common Mistake Alert!**
Antibiotics don't work against viruses! Using them for viral infections contributes to antibiotic resistance.

**How Penicillin works:**
- Inhibits bacterial cell wall synthesis
- Bacteria burst due to osmotic pressure

**4. Antiseptics and Disinfectants:**

| Type | Used On | Examples |
|------|---------|----------|
| Antiseptic | Living tissue | Dettol, Iodine, Boric acid |
| Disinfectant | Non-living objects | Chlorine, Phenol (1%) |

**Note**: Same compound at different concentrations can be either!

**5. Antifertility Drugs:**
- Synthetic hormones (estrogen + progesterone)
- Prevent ovulation
- Examples: Ethynylestradiol, Norethindrone

**6. Antacids:**
- Neutralize excess stomach acid
- Mg(OH)₂, Al(OH)₃, NaHCO₃

**7. Antihistamines:**
- Block histamine receptors
- Reduce allergy symptoms
- Examples: Brompheniramine, Terfenadine

**8. Tranquilizers:**
- Reduce anxiety and tension
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
- Salt, Sugar (traditional)
- Sodium benzoate (acidic foods)
- Sodium metabisulfite (dried fruits)
- Potassium sorbate (cheese, bread)

**3. Antioxidants:**
- BHA (Butylated hydroxyanisole)
- BHT (Butylated hydroxytoluene)
- Vitamin E (natural)
- Prevent oxidation/rancidity

## Cleansing Agents

**1. Soaps:**
Sodium or potassium salts of long-chain fatty acids

**Saponification:**
Fat/Oil + NaOH → Soap + Glycerol

**Structure:**
- Hydrophobic tail: Long hydrocarbon chain (dissolves in grease)
- Hydrophilic head: -COO⁻Na⁺ (faces water)

**Cleansing Action:**
1. Soap molecules surround oil/grease
2. Hydrophobic tails dissolve in grease
3. Hydrophilic heads face water
4. Forms micelles
5. Micelles wash away with water

**Limitations:**
- Don't work in hard water (Ca²⁺, Mg²⁺ form scum)
- Not effective in acidic water

**2. Synthetic Detergents:**
Work in hard water (no scum)!

**Types:**

**Anionic Detergents:**
- Sodium alkylbenzenesulfonates
- Sodium alkylsulfates (SDS)

**Cationic Detergents:**
- Quaternary ammonium salts
- Used in fabric softeners
- Have germicidal properties

**Non-ionic Detergents:**
- No ionic groups
- Gentler, used in liquid detergents

**Biodegradability:**
- Branched chain: Non-biodegradable (problem!)
- Straight chain: Biodegradable (preferred)

## Drug Resistance

**Antibiotic Resistance**: Bacteria evolve to survive antibiotics
- Major global health concern
- Caused by overuse/misuse
- Need new antibiotics, better stewardship`,
    keyConcepts: JSON.stringify([
      { title: "Drug-Target Interaction", description: "Drugs interact with enzymes (inhibition) or receptors (agonist/antagonist). Structure determines specificity and action." },
      { title: "Analgesics Types", description: "Non-narcotic (aspirin, paracetamol) for mild pain, non-addictive. Narcotic (morphine) for severe pain, addictive, CNS action." },
      { title: "Antibiotics vs Antiseptics", description: "Antibiotics kill bacteria (taken internally). Antiseptics prevent infection on living tissue. Disinfectants for non-living surfaces." },
      { title: "Artificial Sweeteners", description: "Saccharin (550×), Aspartame (200×), Sucralose (600×), Alitame (2000×) compared to sugar. Low/no calories." },
      { title: "Soap Structure", description: "Fatty acid salt with hydrophobic tail (dissolves in grease) and hydrophilic head (faces water). Forms micelles." },
      { title: "Soap vs Detergent", description: "Soaps fail in hard water (form scum). Detergents work in hard water. Straight-chain detergents are biodegradable." },
      { title: "Food Preservatives", description: "Prevent microbial growth. Include salt, sugar, sodium benzoate, sorbates. Antioxidants prevent rancidity (BHA, BHT)." }
    ]),
    formulas: JSON.stringify([
      { name: "Saponification", formula: "Fat + 3NaOH → 3R-COONa + Glycerol", description: "Hydrolysis of ester (fat) by base. Produces soap and glycerol." },
      { name: "Aspirin Structure", formula: "CH₃COOC₆H₄COOH", description: "Acetylsalicylic acid. Acetyl ester of salicylic acid." },
      { name: "Soap Structure", formula: "CH₃(CH₂)ₙCOONa (n = 14-18)", description: "Long chain = hydrophobic, -COONa = hydrophilic." },
      { name: "Detergent Structure", formula: "CH₃(CH₂)ₙC₆H₄SO₃Na", description: "Alkylbenzenesulfonate. Sulfonate group instead of carboxylate." },
      { name: "Penicillin Core", formula: "β-lactam ring", description: "Four-membered ring crucial for antibacterial activity. Inhibits cell wall synthesis." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 80
  }
];

export async function seedOrganicChemistry() {
  console.log("Seeding Organic Chemistry chapters (Class 11 & 12)...");
  
  for (const chapter of organicChemistryChapters) {
    try {
      const existingChapter = await db.query.chapterContent.findFirst({
        where: (c, { and, eq, ilike }) => and(
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
        console.log(`Updated: Class ${chapter.classLevel} - ${chapter.chapterTitle}`);
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
        console.log(`Created: Class ${chapter.classLevel} - ${chapter.chapterTitle}`);
      }
    } catch (error) {
      console.error(`Error with chapter ${chapter.chapterTitle}:`, error);
    }
  }
  
  console.log("Organic Chemistry seeding complete! (4 Class 11 + 7 Class 12 chapters)");
}
