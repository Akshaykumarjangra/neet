import { db } from "../db";
import { chapterContent } from "@shared/schema";

const organicChemistryClass11Chapters = [
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 8,
    chapterTitle: "Some Basic Principles and Techniques",
    introduction: "Welcome to Organic Chemistry! This chapter introduces you to the fascinating world of carbon compounds. You'll learn how to name organic compounds using IUPAC rules, understand isomerism, and explore the techniques used to purify and analyze organic substances.",
    detailedNotes: `# Some Basic Principles and Techniques

Organic chemistry is the study of carbon compounds! Carbon is special because it can form four bonds and create long chains, rings, and complex structures. Almost everything in living organisms is made of organic compounds!

## Why Carbon is Unique

**💡 Did You Know?**
Carbon forms the backbone of over 10 million known compounds! That's more than all other elements combined!

Carbon's special properties:
- **Catenation**: Carbon atoms can bond to each other to form long chains
- **Tetravalency**: Carbon forms exactly 4 bonds
- Forms strong bonds with C, H, O, N, S, and halogens

## Classification of Organic Compounds

**1. Acyclic (Open Chain/Aliphatic)**
Straight or branched chains without rings

**2. Cyclic**
- Homocyclic: Ring contains only carbon (like benzene)
- Heterocyclic: Ring contains other atoms like N, O, S (like pyridine)

## Functional Groups

A functional group is an atom or group of atoms that determines a compound's chemical properties:

| Functional Group | Name | Example |
|-----------------|------|---------|
| -OH | Hydroxyl (Alcohol) | Ethanol |
| -CHO | Aldehyde | Formaldehyde |
| >C=O | Ketone | Acetone |
| -COOH | Carboxylic acid | Acetic acid |
| -NH₂ | Amino | Methylamine |

## IUPAC Nomenclature

**🔑 Remember This!**
IUPAC naming follows: Prefix + Root + Suffix
- Prefix: Substituents and their positions
- Root: Number of carbons in longest chain
- Suffix: Functional group

**Root Words:**
- 1C = Meth, 2C = Eth, 3C = Prop, 4C = But
- 5C = Pent, 6C = Hex, 7C = Hept, 8C = Oct

**Steps for Naming:**
1. Find the longest carbon chain
2. Number carbons to give substituents lowest numbers
3. Name and locate substituents
4. Combine with proper punctuation

Example: 2-methylpropane (not 3-methylpropane!)

**⚠️ Common Mistake Alert!**
Always number the chain so that substituents get the LOWEST possible numbers, not the highest!

## Isomerism

Isomers are compounds with same molecular formula but different structures!

**1. Structural Isomerism**
- Chain isomerism: Different carbon skeletons
- Position isomerism: Different position of functional group
- Functional group isomerism: Different functional groups (e.g., alcohol vs ether)
- Metamerism: Different alkyl groups around functional group

**2. Stereoisomerism**
- Geometrical (cis-trans): Different arrangement around double bond
- Optical: Mirror image isomers (like left and right hands)

## Electron Displacement Effects

**Inductive Effect (I effect)**
Electron displacement through sigma bonds
- -I effect: Electron withdrawing (halogens, -NO₂)
- +I effect: Electron donating (alkyl groups)

**Resonance (Mesomeric) Effect**
Electron delocalization through pi bonds
- Explains stability of benzene, carboxylate ions

**Hyperconjugation**
Interaction between C-H sigma bonds and adjacent pi system
Explains stability order of carbocations: 3° > 2° > 1° > CH₃⁺

## Reaction Intermediates

**Carbocations**: Carbon with positive charge (electron deficient)
**Carbanions**: Carbon with negative charge (electron rich)  
**Free Radicals**: Carbon with unpaired electron

## Types of Organic Reactions

1. **Substitution**: One group replaces another
2. **Addition**: Two molecules combine
3. **Elimination**: Removal of atoms to form double bond
4. **Rearrangement**: Atoms rearrange within molecule`,
    keyConcepts: JSON.stringify([
      { title: "Catenation and Tetravalency", description: "Carbon's ability to form 4 bonds and create long chains makes it unique. This is why millions of organic compounds exist." },
      { title: "Functional Groups", description: "Specific atom groups (-OH, -CHO, -COOH, etc.) that determine chemical properties. The functional group is the reactive part of a molecule." },
      { title: "IUPAC Nomenclature", description: "Systematic naming using Prefix + Root + Suffix. Root indicates chain length, suffix indicates functional group." },
      { title: "Structural Isomerism", description: "Same molecular formula, different connectivity. Types include chain, position, functional group, and metamerism." },
      { title: "Stereoisomerism", description: "Same connectivity but different spatial arrangement. Includes geometrical (cis-trans) and optical isomers." },
      { title: "Inductive and Resonance Effects", description: "Electron displacement effects that influence reactivity. Inductive through sigma bonds, resonance through pi bonds." },
      { title: "Reaction Intermediates", description: "Unstable species like carbocations (C⁺), carbanions (C⁻), and free radicals formed during reactions." }
    ]),
    formulas: JSON.stringify([
      { name: "Degree of Unsaturation", formula: "DBE = (2C + 2 + N - H - X) / 2", description: "Calculates double bond equivalents. Each ring or double bond adds 1, triple bond adds 2." },
      { name: "Molecular Formula", formula: "CₙH₂ₙ₊₂ (alkanes)", description: "General formula for saturated hydrocarbons. Alkenes: CₙH₂ₙ, Alkynes: CₙH₂ₙ₋₂." },
      { name: "Stability Order Carbocations", formula: "3° > 2° > 1° > CH₃⁺", description: "More substituted carbocations are more stable due to hyperconjugation and +I effect." },
      { name: "Bond Dissociation Energy", formula: "ΔH = Σ(D bonds broken) - Σ(D bonds formed)", description: "Energy change in reactions based on bond energies." },
      { name: "Percentage Composition", formula: "% C = (12 × n / Molar mass) × 100", description: "Mass percentage of carbon in organic compound. Similar for H, N, O." },
      { name: "Empirical to Molecular", formula: "Molecular formula = n × Empirical formula", description: "n = Molar mass / Empirical formula mass." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 9,
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
CH₄ + 2O₂ → CO₂ + 2H₂O + Heat

**2. Substitution (Halogenation)**
CH₄ + Cl₂ → CH₃Cl + HCl (UV light needed)

**🔑 Remember This!**
Free radical mechanism: Initiation → Propagation → Termination
Reactivity: F₂ > Cl₂ > Br₂ > I₂

**Conformations of Ethane:**
- Staggered: Most stable (H atoms far apart)
- Eclipsed: Least stable (H atoms close together)

## ALKENES (Olefins)

General formula: **CₙH₂ₙ**

Contain at least one C=C double bond. Much more reactive than alkanes!

**⚠️ Common Mistake Alert!**
The double bond in alkenes consists of one sigma (σ) bond and one pi (π) bond. The π bond is weaker and breaks during addition reactions.

**Geometrical Isomerism:**
When there are different groups on each carbon of the double bond:
- **cis**: Same groups on same side
- **trans**: Same groups on opposite sides

**Chemical Reactions:**

**1. Addition of H₂ (Hydrogenation)**
CH₂=CH₂ + H₂ → CH₃-CH₃ (Ni catalyst)

**2. Addition of Halogens**
CH₂=CH₂ + Br₂ → CH₂Br-CH₂Br (brown color disappears - test for unsaturation!)

**3. Addition of HX (Markovnikov's Rule)**
**🔑 Remember This!**
"The rich get richer" - Hydrogen adds to carbon with MORE hydrogens!
CH₃-CH=CH₂ + HBr → CH₃-CHBr-CH₃ (not CH₃-CH₂-CH₂Br)

**4. Ozonolysis**
Breaks double bond to form aldehydes/ketones. Used to locate double bond position.

**5. Polymerization**
nCH₂=CH₂ → (-CH₂-CH₂-)ₙ (Polyethylene - plastic bags!)

## ALKYNES

General formula: **CₙH₂ₙ₋₂**

Contain C≡C triple bond. Even more unsaturated than alkenes!

**Preparation of Ethyne (Acetylene):**
CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂

**Acidic Nature:**
Alkynes with terminal triple bond are weakly acidic:
HC≡CH + Na → HC≡CNa + ½H₂

**Reactions similar to alkenes but can add twice!**

## AROMATIC HYDROCARBONS

Benzene (C₆H₆) is the parent aromatic compound.

**Structure of Benzene:**
- 6 carbon hexagonal ring
- All C-C bonds equal length (1.39 Å)
- Planar structure
- Highly stable due to resonance (delocalized π electrons)

**💡 Did You Know?**
The hexagonal structure of benzene was discovered by Kekulé after he dreamed of a snake biting its own tail!

**Aromatic Character (Hückel's Rule):**
Compound is aromatic if it has (4n + 2) π electrons
Benzene: 6 π electrons (n = 1) ✓

**Reactions of Benzene:**

Benzene prefers **substitution** over addition to preserve aromaticity!

**Electrophilic Substitution Reactions:**

1. **Nitration**: C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O (conc. H₂SO₄)

2. **Halogenation**: C₆H₆ + Cl₂ → C₆H₅Cl + HCl (FeCl₃ catalyst)

3. **Friedel-Crafts Alkylation**: 
C₆H₆ + CH₃Cl → C₆H₅CH₃ + HCl (AlCl₃ catalyst)

4. **Friedel-Crafts Acylation**:
C₆H₆ + CH₃COCl → C₆H₅COCH₃ + HCl (AlCl₃ catalyst)

**Directive Effects:**
- Ortho-para directing: -OH, -NH₂, -CH₃, -OCH₃ (activating)
- Meta directing: -NO₂, -CHO, -COOH, -CN (deactivating)`,
    keyConcepts: JSON.stringify([
      { title: "Classification of Hydrocarbons", description: "Alkanes (single bonds), alkenes (double bonds), alkynes (triple bonds), and aromatics (benzene ring). Each has unique properties and reactions." },
      { title: "Alkane Reactions", description: "Alkanes undergo substitution reactions like halogenation via free radical mechanism. They burn completely in excess oxygen." },
      { title: "Markovnikov's Rule", description: "In addition of HX to unsymmetrical alkenes, H adds to carbon with more hydrogens, X to carbon with fewer hydrogens." },
      { title: "Geometrical Isomerism", description: "Cis-trans isomers in alkenes due to restricted rotation around double bond. Cis has same groups on same side." },
      { title: "Benzene Structure", description: "Hexagonal ring with delocalized π electrons. All C-C bonds are equal. Very stable due to resonance." },
      { title: "Electrophilic Substitution", description: "Benzene's characteristic reaction. Includes nitration, halogenation, and Friedel-Crafts reactions. Preserves aromaticity." },
      { title: "Directive Effects", description: "Existing substituents direct incoming groups. Activating groups are ortho-para directing, deactivating are meta directing." }
    ]),
    formulas: JSON.stringify([
      { name: "Alkane Formula", formula: "CₙH₂ₙ₊₂", description: "General formula for alkanes. Each carbon has 4 bonds, all single bonds." },
      { name: "Alkene Formula", formula: "CₙH₂ₙ", description: "General formula for alkenes with one double bond. Each double bond reduces H by 2." },
      { name: "Alkyne Formula", formula: "CₙH₂ₙ₋₂", description: "General formula for alkynes with one triple bond. Each triple bond reduces H by 4." },
      { name: "Complete Combustion", formula: "CₙH₂ₙ₊₂ + (3n+1)/2 O₂ → nCO₂ + (n+1)H₂O", description: "Alkane combustion produces CO₂ and water. Releases large amount of energy." },
      { name: "Heat of Hydrogenation", formula: "ΔH = -120 kJ/mol per C=C", description: "Energy released when double bonds are hydrogenated. Used to measure stability." },
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

## Environmental Pollution

Pollution is the introduction of harmful substances into the environment. Major types:
- Air pollution
- Water pollution  
- Soil pollution

## Atmospheric Pollution

The atmosphere has different layers, each with unique chemistry:
- **Troposphere** (0-10 km): Where weather happens, where we live
- **Stratosphere** (10-50 km): Contains protective ozone layer

### Tropospheric Pollution

**Major Air Pollutants:**

**1. Gaseous Pollutants:**

| Pollutant | Source | Effect |
|-----------|--------|--------|
| CO | Incomplete combustion | Binds to hemoglobin, reduces O₂ transport |
| CO₂ | Burning fossil fuels | Greenhouse effect |
| SO₂ | Burning coal with sulfur | Acid rain, respiratory issues |
| NOₓ | Vehicle engines | Smog, acid rain |
| O₃ (ground level) | Photochemical smog | Respiratory irritant |

**🔑 Remember This!**
Carbon monoxide is called the "silent killer" because it's colorless and odorless but deadly! It binds to hemoglobin 200 times more strongly than oxygen.

**2. Particulate Pollutants:**
- Dust, smoke, mist, fumes
- SPM (Suspended Particulate Matter)
- PM₂.₅ and PM₁₀ are most dangerous (small enough to enter lungs)

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
SO₂ + H₂O → H₂SO₃ (sulfurous acid)
2SO₂ + O₂ + 2H₂O → 2H₂SO₄ (sulfuric acid)

NOₓ + H₂O → HNO₃ (nitric acid)

**Effects of Acid Rain:**
- Damages buildings and monuments (especially marble/limestone)
- Kills fish and aquatic life
- Damages forests and crops
- Leaches nutrients from soil

### Greenhouse Effect & Global Warming

**Greenhouse Gases:** CO₂, CH₄, N₂O, CFCs, O₃

These gases trap infrared radiation from Earth, warming the atmosphere like a greenhouse!

**Global Warming Potential (GWP):** Relative to CO₂ = 1
- CH₄: 25
- N₂O: 298
- CFCs: 5000-10000!

**Consequences:**
- Rising sea levels
- Extreme weather events
- Melting glaciers
- Ecosystem disruption

## Stratospheric Pollution

### Ozone Layer Depletion

Ozone (O₃) in the stratosphere absorbs harmful UV radiation.

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
Severe depletion over Antarctica discovered in 1985. Montreal Protocol (1987) banned CFCs.

## Water Pollution

**Sources:**
- Industrial effluents
- Agricultural runoff (fertilizers, pesticides)
- Sewage discharge
- Oil spills

**Important Parameters:**

**1. BOD (Biochemical Oxygen Demand)**
Measures organic pollution. Clean water: BOD < 5 ppm
Higher BOD = more pollution

**2. COD (Chemical Oxygen Demand)**
Total oxygen needed to oxidize all organic matter

**3. DO (Dissolved Oxygen)**
Healthy water: DO > 6 ppm
Fish die if DO < 4 ppm

**Eutrophication:**
Excess nutrients (N, P) → Algal bloom → Oxygen depletion → Dead zones

## Soil Pollution

**Sources:**
- Pesticides and herbicides
- Industrial waste
- Improper solid waste disposal
- Mining activities

**Bioaccumulation and Biomagnification:**
Toxins concentrate as they move up the food chain!

**💡 Did You Know?**
DDT was banned because it accumulated in eagles and other birds, making their eggshells too thin to survive!

## Green Chemistry

Designing chemical processes to reduce pollution:
1. Prevent waste rather than treat it
2. Use renewable feedstocks
3. Design safer chemicals
4. Use catalysts instead of reagents
5. Avoid solvents when possible`,
    keyConcepts: JSON.stringify([
      { title: "Atmospheric Pollution", description: "Air pollutants include CO, CO₂, SO₂, NOₓ, and particulates. They cause health problems, acid rain, and global warming." },
      { title: "Smog", description: "Classical smog forms in cold, humid conditions (reducing). Photochemical smog forms in warm, sunny conditions (oxidizing)." },
      { title: "Acid Rain", description: "Rain with pH < 5.6 due to dissolved SO₂ and NOₓ. Damages buildings, kills aquatic life, and harms forests." },
      { title: "Greenhouse Effect", description: "CO₂, CH₄, and other gases trap infrared radiation, warming Earth. Leads to climate change and rising sea levels." },
      { title: "Ozone Layer Depletion", description: "CFCs release chlorine atoms that catalytically destroy ozone. One Cl can destroy 100,000 O₃ molecules." },
      { title: "Water Pollution Parameters", description: "BOD measures organic pollution, DO indicates water health. Eutrophication causes oxygen depletion." },
      { title: "Green Chemistry", description: "Designing chemical processes to minimize pollution and environmental impact. Prevention over treatment." }
    ]),
    formulas: JSON.stringify([
      { name: "Ozone Formation", formula: "O₂ + O → O₃", description: "Ozone forms when oxygen atoms combine with oxygen molecules in the stratosphere." },
      { name: "Ozone Destruction", formula: "Cl + O₃ → ClO + O₂", description: "CFCs release chlorine that catalytically destroys ozone. Chlorine is regenerated." },
      { name: "Acid Rain (Sulfuric)", formula: "SO₂ + H₂O + ½O₂ → H₂SO₄", description: "Sulfur dioxide oxidizes to form sulfuric acid in rain droplets." },
      { name: "Acid Rain (Nitric)", formula: "2NO₂ + H₂O → HNO₃ + HNO₂", description: "Nitrogen oxides react with water to form nitric acid." },
      { name: "CO Toxicity", formula: "Hb + CO → HbCO", description: "Carbon monoxide binds to hemoglobin 200× more strongly than oxygen, causing oxygen deprivation." },
      { name: "Photochemical Smog", formula: "NO₂ + UV → NO + O; O + O₂ → O₃", description: "Sunlight breaks NO₂ to form ground-level ozone, a respiratory irritant." },
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

**Used for:** Camphor, naphthalene, iodine, benzoic acid

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
Uses fractionating column for better separation

**⚠️ Common Mistake Alert!**
Never heat a distillation flask to dryness - it's dangerous! Always leave some residue.

**Steam Distillation:**
For compounds that:
- Don't mix with water
- Have high boiling points
- Would decompose at high temperatures

Used for essential oils, aniline

**Distillation Under Reduced Pressure (Vacuum Distillation):**
For compounds with very high boiling points or that decompose before boiling
Reduced pressure = lower boiling point!

### 4. Differential Extraction

Uses different solubility in two immiscible solvents (like water and ether).

**Principle:** "Like dissolves like"
- Polar compounds → water layer
- Non-polar compounds → organic layer

**Multiple extractions with smaller volumes are MORE EFFECTIVE than one large extraction!**

### 5. Chromatography

Separates compounds based on different rates of movement through a medium.

**Types:**

**Column Chromatography:**
- Stationary phase: Silica gel or alumina packed in column
- Mobile phase: Solvent flows down
- Components separate based on adsorption differences

**Paper Chromatography:**
- Stationary phase: Water adsorbed on paper
- Mobile phase: Organic solvent
- Rf = Distance moved by compound / Distance moved by solvent

**Thin Layer Chromatography (TLC):**
- Similar to paper but uses glass plate coated with silica/alumina
- Faster and more sensitive
- Used to monitor reaction progress

## Qualitative Analysis

### Detection of Elements (Lassaigne's Test)

Organic compound is fused with sodium metal to convert elements to ionic form.

**Sodium Fusion Extract (SFE) Tests:**

**Nitrogen:**
Na + C + N → NaCN
NaCN + FeSO₄ → Na₄[Fe(CN)₆]
Na₄[Fe(CN)₆] + FeCl₃ → Prussian Blue precipitate

**🔑 Remember This!**
Blue color = Nitrogen present!

**Sulfur:**
Na + S → Na₂S
Na₂S + (CH₃COO)₂Pb → Black PbS precipitate

**Halogens:**
Na + X → NaX
NaX + AgNO₃ → AgX precipitate
- AgCl: White, soluble in NH₄OH
- AgBr: Pale yellow, sparingly soluble
- AgI: Yellow, insoluble in NH₄OH

### Quantitative Analysis

**Estimation of Carbon and Hydrogen (Liebig's Method):**
Compound → CO₂ (absorbed by KOH) + H₂O (absorbed by CaCl₂)

% C = (12 × mass of CO₂) / (44 × mass of compound) × 100
% H = (2 × mass of H₂O) / (18 × mass of compound) × 100

**Estimation of Nitrogen:**
Dumas Method: Convert to N₂ gas, measure volume
Kjeldahl Method: Convert to NH₃, titrate with acid

**Estimation of Halogens (Carius Method):**
Convert to AgX, weigh precipitate

**Estimation of Sulfur:**
Convert to BaSO₄, weigh precipitate

## Determination of Molecular Mass

### 1. Victor Meyer Method (Volatile liquids)

Based on ideal gas equation: M = mRT/PV

### 2. Elevation of Boiling Point

ΔTb = Kb × m (molality)
Molecular mass = Kb × 1000 × w / (ΔTb × W)

### 3. Depression of Freezing Point

ΔTf = Kf × m
Molecular mass = Kf × 1000 × w / (ΔTf × W)

**💡 Did You Know?**
This is why we add salt to icy roads - it lowers the freezing point of water!

## Molecular Formula Determination

**Steps:**
1. Find percentage composition
2. Calculate empirical formula
3. Determine molecular mass
4. Molecular formula = n × Empirical formula
   where n = Molecular mass / Empirical formula mass`,
    keyConcepts: JSON.stringify([
      { title: "Crystallization", description: "Most common purification for solids. Uses difference in solubility at different temperatures. Hot solution dissolves compound, cooling precipitates pure crystals." },
      { title: "Distillation Types", description: "Simple (bp difference >25°C), fractional (close bp), steam (immiscible, high bp), vacuum (decomposes at high temp)." },
      { title: "Chromatography", description: "Separation based on different rates of movement. Types include column, paper, and TLC. Rf value identifies compounds." },
      { title: "Lassaigne's Test", description: "Detects N, S, and halogens by sodium fusion. N gives Prussian blue, S gives black PbS, halogens give AgX precipitates." },
      { title: "Quantitative Analysis", description: "Liebig's method for C and H (measure CO₂ and H₂O). Dumas/Kjeldahl for N. Carius for halogens and S." },
      { title: "Molecular Mass Determination", description: "Using colligative properties (boiling point elevation, freezing point depression) or Victor Meyer method for volatiles." },
      { title: "Empirical to Molecular Formula", description: "From percentage composition, calculate simplest ratio (empirical), then multiply by n to get molecular formula." }
    ]),
    formulas: JSON.stringify([
      { name: "Rf Value", formula: "Rf = Distance by compound / Distance by solvent", description: "Retention factor in chromatography. Characteristic value for each compound under specific conditions." },
      { name: "Percent Carbon", formula: "% C = (12 × mass CO₂) / (44 × mass compound) × 100", description: "From Liebig's method. CO₂ absorbed gives carbon content." },
      { name: "Percent Hydrogen", formula: "% H = (2 × mass H₂O) / (18 × mass compound) × 100", description: "From Liebig's method. Water absorbed gives hydrogen content." },
      { name: "Boiling Point Elevation", formula: "ΔTb = Kb × m", description: "Boiling point rises with solute concentration. Kb is ebullioscopic constant." },
      { name: "Freezing Point Depression", formula: "ΔTf = Kf × m", description: "Freezing point falls with solute concentration. Kf is cryoscopic constant." },
      { name: "Molecular Mass (Colligative)", formula: "M = Kb × 1000 × w / (ΔTb × W)", description: "Calculate molecular mass from boiling point elevation. w = solute mass, W = solvent mass." },
      { name: "Ideal Gas (Victor Meyer)", formula: "M = mRT/PV", description: "Molecular mass of volatile liquids from vapor density measurement." },
      { name: "Percent Nitrogen (Kjeldahl)", formula: "% N = (1.4 × V × M) / mass of compound", description: "V = volume of acid, M = molarity. For compounds containing N but not N-N or N-O bonds." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 100
  }
];

export async function seedOrganicChemistryClass11() {
  console.log("Seeding Organic Chemistry Class 11 chapters...");
  
  for (const chapter of organicChemistryClass11Chapters) {
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
          .where(eq => eq(chapterContent.id, existingChapter.id));
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
  
  console.log("Organic Chemistry Class 11 seeding complete!");
}
