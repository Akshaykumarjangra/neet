import { db } from "../db";
import { chapterContent } from "@shared/schema";
import { eq } from "drizzle-orm";

const inorganicChemistryClass12Chapters = [
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 13,
    chapterTitle: "p-Block Elements - Groups 15 to 18",
    introduction: "From the nitrogen in our air to the noble gases that light up signs, p-block elements are everywhere! This chapter explores Groups 15-18, covering their unique properties, compounds, and the fascinating chemistry of halogens and noble gases.",
    detailedNotes: `# p-Block Elements - Groups 15 to 18

The p-block elements include Groups 13-18, but here we focus on Groups 15-18 which contain some of the most important elements in chemistry and daily life!

## Group 15: Nitrogen Family (Pnictogens)

**Elements**: N, P, As, Sb, Bi

**General Trends**:
- Metallic character increases down the group
- N₂ is very stable due to triple bond
- Oxidation states: -3, +3, +5 (inert pair effect for heavier elements)

| Element | Nature | Common Form |
|---------|--------|-------------|
| Nitrogen | Non-metal | N₂ gas |
| Phosphorus | Non-metal | White P₄, Red P |
| Arsenic | Metalloid | Grey arsenic |
| Antimony | Metalloid | Sb metal |
| Bismuth | Metal | Bi metal |

**💡 Did You Know?**
Nitrogen makes up 78% of Earth's atmosphere, but most organisms can't use it directly - they need "fixed" nitrogen from bacteria or lightning!

## Oxides of Nitrogen

| Formula | Name | Nature | Color |
|---------|------|--------|-------|
| N₂O | Nitrous oxide | Neutral | Colorless (laughing gas) |
| NO | Nitric oxide | Neutral | Colorless |
| N₂O₃ | Dinitrogen trioxide | Acidic | Blue |
| NO₂ | Nitrogen dioxide | Acidic | Brown |
| N₂O₅ | Dinitrogen pentoxide | Acidic | Colorless |

**🔑 Remember This!**
NO₂ is brown and dimerizes to colorless N₂O₄ at low temperatures. This equilibrium is temperature-dependent!

## Oxoacids of Nitrogen

**HNO₂ (Nitrous acid)**: Weak acid, unstable
**HNO₃ (Nitric acid)**: Strong acid, powerful oxidizer

**Nitric Acid Preparation (Ostwald Process)**:
4NH₃ + 5O₂ → 4NO + 6H₂O (Pt catalyst, 800°C)
2NO + O₂ → 2NO₂
3NO₂ + H₂O → 2HNO₃ + NO

## Phosphorus Allotropes

**White Phosphorus (P₄)**:
- Tetrahedral, waxy solid
- Stored under water
- Highly reactive, glows in dark

**Red Phosphorus**:
- Polymeric chain structure
- Less reactive, stable in air
- Used in match heads

**⚠️ Common Mistake Alert!**
White phosphorus is P₄ (molecular), not P! It's highly toxic and spontaneously ignites in air.

## Oxoacids of Phosphorus

| Acid | Formula | Basicity | P Oxidation State |
|------|---------|----------|-------------------|
| Hypophosphorous | H₃PO₂ | Monobasic | +1 |
| Phosphorous | H₃PO₃ | Dibasic | +3 |
| Orthophosphoric | H₃PO₄ | Tribasic | +5 |

**Basicity Rule**: Only P-OH bonds contribute to basicity, not P-H bonds!

## Group 16: Oxygen Family (Chalcogens)

**Elements**: O, S, Se, Te, Po

**Key Points**:
- Electronegativity decreases down the group
- Sulfur shows +2, +4, +6 oxidation states
- Oxygen shows only -2, -1 (rarely +2 in OF₂)

## Oxoacids of Sulfur

| Acid | Formula | S Oxidation State |
|------|---------|-------------------|
| Sulfurous acid | H₂SO₃ | +4 |
| Sulfuric acid | H₂SO₄ | +6 |
| Thiosulfuric acid | H₂S₂O₃ | +2 (avg) |
| Peroxodisulfuric acid | H₂S₂O₈ | +6 |

**Sulfuric Acid (Contact Process)**:
S + O₂ → SO₂
2SO₂ + O₂ ⇌ 2SO₃ (V₂O₅, 450°C)
SO₃ + H₂SO₄ → H₂S₂O₇ (oleum)
H₂S₂O₇ + H₂O → 2H₂SO₄

## Group 17: Halogens

**Elements**: F, Cl, Br, I, At

**General Trends**:
- Most reactive non-metals
- Oxidizing power: F > Cl > Br > I
- Electron affinity: Cl > F > Br > I (F is anomalous!)

**💡 Did You Know?**
Fluorine is so reactive that it can even react with noble gases like xenon and krypton at high temperatures!

## Interhalogen Compounds

| Type | Examples | Shape |
|------|----------|-------|
| XX' | ClF, BrCl, ICl | Linear |
| XX'₃ | ClF₃, BrF₃ | T-shaped |
| XX'₅ | BrF₅, IF₅ | Square pyramidal |
| XX'₇ | IF₇ | Pentagonal bipyramidal |

**Rules**:
- Larger halogen is central
- Number of atoms = odd (1, 3, 5, 7)
- IF₇ is the only XX'₇ compound

## Oxoacids of Chlorine

| Acid | Formula | Cl Oxidation | Strength |
|------|---------|--------------|----------|
| Hypochlorous | HOCl | +1 | Weakest |
| Chlorous | HClO₂ | +3 | Weak |
| Chloric | HClO₃ | +5 | Strong |
| Perchloric | HClO₄ | +7 | Strongest |

**🔑 Remember This!**
Acid strength increases with oxidation state: More oxygens = more stable conjugate base = stronger acid!

## Group 18: Noble Gases

**Elements**: He, Ne, Ar, Kr, Xe, Rn

**Properties**:
- Completely filled valence shell
- Monatomic, colorless, odorless
- Very low reactivity
- Used in lighting, welding, cryogenics

## Xenon Compounds

| Compound | Formula | Shape | Hybridization |
|----------|---------|-------|---------------|
| Xenon difluoride | XeF₂ | Linear | sp³d |
| Xenon tetrafluoride | XeF₄ | Square planar | sp³d² |
| Xenon hexafluoride | XeF₆ | Distorted octahedral | sp³d³ |
| Xenon trioxide | XeO₃ | Pyramidal | sp³ |

**Preparation**: Xe + F₂ → XeF₂ (at 400°C, in Ni vessel)

**⚠️ Common Mistake Alert!**
Only Kr, Xe, and Rn form compounds. He, Ne, and Ar have NO known stable compounds due to very high ionization energies!`,
    keyConcepts: JSON.stringify([
      { title: "Group 15 Elements", description: "Nitrogen family shows -3, +3, +5 oxidation states. Inert pair effect makes +3 more stable for heavier elements. N₂ has very strong triple bond." },
      { title: "Oxoacids of Phosphorus", description: "Basicity depends on P-OH bonds only. H₃PO₂ (monobasic), H₃PO₃ (dibasic), H₃PO₄ (tribasic). P-H bonds don't ionize." },
      { title: "Sulfuric Acid Production", description: "Contact process: SO₂ → SO₃ (V₂O₅ catalyst) → oleum → H₂SO₄. King of chemicals, used everywhere." },
      { title: "Halogen Reactivity", description: "Oxidizing power: F > Cl > Br > I. Fluorine is most reactive, can oxidize water. Electron affinity of Cl > F (anomaly)." },
      { title: "Interhalogen Compounds", description: "Formed between two different halogens. XX', XX'₃, XX'₅, XX'₇. Larger halogen is always central atom." },
      { title: "Noble Gas Compounds", description: "Only Kr, Xe, Rn form compounds. XeF₂ (linear), XeF₄ (square planar), XeF₆ (distorted octahedral). Xe also forms oxides." },
      { title: "Chlorine Oxoacids", description: "Acid strength: HClO < HClO₂ < HClO₃ < HClO₄. Higher oxidation state = stronger acid due to resonance stabilization." }
    ]),
    formulas: JSON.stringify([
      { name: "Ostwald Process", formula: "4NH₃ + 5O₂ → 4NO + 6H₂O (Pt, 800°C)", description: "Industrial preparation of nitric acid. NO is then oxidized to NO₂." },
      { name: "Contact Process", formula: "2SO₂ + O₂ ⇌ 2SO₃ (V₂O₅, 450°C)", description: "Key step in sulfuric acid manufacture. Reversible, exothermic reaction." },
      { name: "Interhalogen Formula", formula: "XX'ₙ where n = 1, 3, 5, 7", description: "X is larger halogen. Maximum n depends on size difference between halogens." },
      { name: "Xenon Fluorides", formula: "Xe + nF₂ → XeF₂ₙ (n = 1, 2, 3)", description: "Direct fluorination at different conditions gives XeF₂, XeF₄, or XeF₆." },
      { name: "Bleaching Powder", formula: "Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O", description: "Calcium hypochlorite. Bleaching agent and disinfectant." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 110
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 14,
    chapterTitle: "d and f Block Elements",
    introduction: "Transition metals give color to gemstones and power industrial catalysis! This chapter explores the d-block and f-block elements, their unique properties like variable oxidation states, and why they form colored compounds.",
    detailedNotes: `# d and f Block Elements

The d-block (transition metals) and f-block (inner transition metals) elements have unique electronic configurations that give them special properties like catalytic activity and colored compounds!

## Electronic Configuration

**d-Block**: Filling of (n-1)d orbitals
General: (n-1)d¹⁻¹⁰ ns¹⁻²

**Anomalous Configurations**:
- Cr: [Ar] 3d⁵ 4s¹ (half-filled d is stable)
- Cu: [Ar] 3d¹⁰ 4s¹ (filled d is stable)

**💡 Did You Know?**
The beautiful colors in gemstones like ruby (red) and emerald (green) come from d-d transitions of transition metal ions!

## Properties of Transition Metals

| Property | Reason |
|----------|--------|
| Variable oxidation states | Both ns and (n-1)d electrons participate in bonding |
| Colored compounds | d-d transitions absorb visible light |
| Catalytic activity | Variable oxidation states, surface area |
| Complex formation | Small size, high charge, vacant d orbitals |
| Magnetic properties | Unpaired d electrons |

**🔑 Remember This!**
Zn²⁺, Cu⁺, Sc³⁺ are colorless because they have either d⁰ or d¹⁰ configuration - no d-d transition possible!

## Oxidation States

| Element | Common Oxidation States | Most Stable |
|---------|------------------------|-------------|
| Sc | +3 | +3 |
| Ti | +2, +3, +4 | +4 |
| V | +2, +3, +4, +5 | +5 |
| Cr | +2, +3, +6 | +3 |
| Mn | +2, +3, +4, +6, +7 | +2 |
| Fe | +2, +3 | +3 |
| Co | +2, +3 | +2 |
| Ni | +2 | +2 |
| Cu | +1, +2 | +2 |
| Zn | +2 | +2 |

**Maximum Oxidation State**: Equals group number up to Mn
After Mn, ns electrons become less available for bonding.

## Color of Transition Metal Ions

| Ion | d-electrons | Color |
|-----|-------------|-------|
| Ti³⁺ | d¹ | Purple |
| V³⁺ | d² | Green |
| Cr³⁺ | d³ | Green |
| Mn²⁺ | d⁵ | Pink |
| Fe²⁺ | d⁶ | Green |
| Fe³⁺ | d⁵ | Yellow |
| Co²⁺ | d⁷ | Pink |
| Ni²⁺ | d⁸ | Green |
| Cu²⁺ | d⁹ | Blue |

**⚠️ Common Mistake Alert!**
Color depends on the ligand too! Cu²⁺ is blue in water but yellow in chloride solution.

## Important Compounds

**Potassium Dichromate (K₂Cr₂O₇)**:
- Orange crystalline solid
- Strong oxidizing agent in acidic medium
- Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O

**Potassium Permanganate (KMnO₄)**:
- Purple crystalline solid
- Powerful oxidizer, self-indicator
- In acidic: Mn⁷⁺ → Mn²⁺ (colorless)
- In neutral: Mn⁷⁺ → Mn⁴⁺ (brown MnO₂)
- In alkaline: Mn⁷⁺ → Mn⁶⁺ (green)

## Interstitial Compounds

Transition metals form compounds with small atoms (H, C, N, B) in interstitial spaces.

**Properties**:
- Very hard
- High melting point
- Chemically inert
- Examples: TiC, WC, VN (used in tools)

## Alloy Formation

Transition metals form alloys due to similar atomic sizes.

**Common Alloys**:
- Steel: Fe + C (+ other metals)
- Brass: Cu + Zn
- Bronze: Cu + Sn
- Stainless Steel: Fe + Cr + Ni

## f-Block Elements

**Lanthanides (4f)**: Ce (58) to Lu (71)
**Actinides (5f)**: Th (90) to Lr (103)

## Lanthanide Contraction

**Definition**: Gradual decrease in atomic/ionic radius across lanthanides

**Cause**: Poor shielding by 4f electrons
**Effect**: 
- Similar properties within lanthanides
- 5d elements have similar size to 4d elements
- Separation of lanthanides is difficult

## Properties of Lanthanides

| Property | Value/Trend |
|----------|-------------|
| Oxidation state | +3 is most common |
| Color | Pale colors (f-f transitions) |
| Magnetism | Paramagnetic (except La³⁺, Lu³⁺) |
| Reactivity | Electropositive, react with water |

**💡 Did You Know?**
Lanthanides aren't actually "rare earths" - cerium is more abundant than copper! They're just difficult to separate from each other.

## Actinides

**Properties**:
- Radioactive (all elements)
- Variable oxidation states (+3 to +6)
- Form colored ions
- 5f orbitals have greater spatial extension than 4f

**Uranium (U)**:
- Most important actinide
- Nuclear fuel (U-235)
- Oxidation states: +3, +4, +5, +6

**🔑 Remember This!**
Lanthanides primarily show +3, while actinides show multiple oxidation states (+3, +4, +5, +6) due to smaller energy gap between 5f, 6d, and 7s orbitals.

## Comparison: Lanthanides vs Actinides

| Property | Lanthanides | Actinides |
|----------|-------------|-----------|
| Orbitals filled | 4f | 5f |
| Oxidation states | Mainly +3 | +3, +4, +5, +6 |
| Radioactivity | Non-radioactive (mostly) | All radioactive |
| Contraction | Lanthanide contraction | Actinide contraction (more) |
| Color of ions | Pale | More intense |`,
    keyConcepts: JSON.stringify([
      { title: "d-Block Electronic Configuration", description: "General: (n-1)d¹⁻¹⁰ ns¹⁻². Cr and Cu are anomalous due to stability of half-filled and fully-filled d orbitals." },
      { title: "Variable Oxidation States", description: "Both ns and (n-1)d electrons participate in bonding. Maximum oxidation state equals group number up to Mn." },
      { title: "Color of Ions", description: "Due to d-d transitions. d⁰ and d¹⁰ ions are colorless. Color also depends on ligands (crystal field splitting)." },
      { title: "Catalytic Properties", description: "Due to variable oxidation states, ability to form intermediates, and large surface area. Examples: Fe, Ni, Pt, V₂O₅." },
      { title: "Lanthanide Contraction", description: "Decrease in size across lanthanides due to poor shielding by 4f electrons. Makes 4d and 5d elements similar in size." },
      { title: "f-Block Comparison", description: "Lanthanides mainly +3; actinides show +3 to +6. All actinides are radioactive. 5f has more spatial extension than 4f." }
    ]),
    formulas: JSON.stringify([
      { name: "Dichromate Reduction", formula: "Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O", description: "Orange to green. Strong oxidizer in acidic medium. E° = +1.33 V." },
      { name: "Permanganate (Acidic)", formula: "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O", description: "Purple to colorless. Self-indicator in titrations. E° = +1.51 V." },
      { name: "Permanganate (Neutral)", formula: "MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ + 4OH⁻", description: "Purple to brown precipitate. Used for oxidation of alkenes." },
      { name: "Magnetic Moment", formula: "μ = √(n(n+2)) BM", description: "n = number of unpaired electrons. BM = Bohr Magneton. For spin-only formula." },
      { name: "Crystal Field Splitting", formula: "Δ = Δₒ (octahedral) or Δₜ (tetrahedral)", description: "Energy difference between split d-orbitals. Determines color and magnetic properties." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 15,
    chapterTitle: "Coordination Compounds",
    introduction: "From hemoglobin in your blood to catalysts in industry, coordination compounds are essential to life and technology! This chapter covers Werner's theory, nomenclature, isomerism, and bonding theories that explain their properties.",
    detailedNotes: `# Coordination Compounds

Coordination compounds are formed when a central metal atom/ion is surrounded by molecules or ions called ligands. They're crucial in biological systems and industrial processes!

## Basic Terms

**Coordination Entity**: Central atom + ligands, written in [ ]
**Central Metal**: Usually a transition metal ion
**Ligands**: Species that donate electron pairs to metal
**Coordination Number**: Number of ligand atoms directly bonded to metal
**Coordination Sphere**: Central atom + ligands enclosed in [ ]

**💡 Did You Know?**
Hemoglobin contains Fe²⁺ coordinated to a porphyrin ring. The color of blood (red) is due to this coordination complex!

## Werner's Coordination Theory

Alfred Werner (1913 Nobel Prize) proposed:
1. Metals have two types of valency: primary and secondary
2. **Primary valency** = oxidation state (ionizable)
3. **Secondary valency** = coordination number (non-ionizable, fixed)
4. Ligands satisfy secondary valency in specific geometry

**Example**: [Co(NH₃)₆]Cl₃
- Primary valency: +3 (three Cl⁻ ions)
- Secondary valency: 6 (six NH₃ ligands)
- Geometry: Octahedral

## Types of Ligands

**By Denticity**:

| Type | Definition | Examples |
|------|------------|----------|
| Monodentate | 1 donor atom | Cl⁻, NH₃, H₂O, CN⁻ |
| Bidentate | 2 donor atoms | en, ox²⁻, bipy |
| Tridentate | 3 donor atoms | dien, terpyridine |
| Hexadentate | 6 donor atoms | EDTA |

**Abbreviations**:
- en = ethylenediamine (H₂N-CH₂-CH₂-NH₂)
- ox²⁻ = oxalate (C₂O₄²⁻)
- EDTA = ethylenediaminetetraacetic acid

**🔑 Remember This!**
Chelating ligands (bi/polydentate) form more stable complexes due to the chelate effect. EDTA binds at 6 points!

## Nomenclature (IUPAC)

**Rules**:
1. Cation before anion
2. In coordination sphere: ligands before metal
3. Ligands in alphabetical order
4. Anionic ligands end in -o (chlorido, sulfato)
5. Neutral ligands keep name (exceptions: aqua, ammine, carbonyl)
6. Metal oxidation state in Roman numerals

**Prefixes**: di, tri, tetra... (simple); bis, tris, tetrakis... (complex ligands)

**Examples**:
- [Cu(NH₃)₄]SO₄ → Tetraamminecopper(II) sulfate
- K₃[Fe(CN)₆] → Potassium hexacyanoferrate(III)
- [CoCl₂(en)₂]Cl → Dichlorobis(ethylenediamine)cobalt(III) chloride

## Isomerism in Coordination Compounds

### Structural Isomerism

**1. Ionization Isomerism**: Different ions inside/outside coordination sphere
[Co(NH₃)₅Br]SO₄ vs [Co(NH₃)₅SO₄]Br

**2. Hydrate Isomerism**: Different water molecules as ligand/free
[Cr(H₂O)₆]Cl₃ vs [Cr(H₂O)₅Cl]Cl₂·H₂O

**3. Linkage Isomerism**: Same ligand, different donor atom
[Co(NH₃)₅NO₂]²⁺ (nitro, N-bonded) vs [Co(NH₃)₅ONO]²⁺ (nitrito, O-bonded)

**4. Coordination Isomerism**: Exchange of ligands between cation and anion
[Co(NH₃)₆][Cr(CN)₆] vs [Cr(NH₃)₆][Co(CN)₆]

### Stereoisomerism

**1. Geometrical (cis-trans) Isomerism**:

For square planar MA₂B₂:
- cis: Same ligands adjacent
- trans: Same ligands opposite

For octahedral MA₂B₄:
- cis: A-ligands at 90°
- trans: A-ligands at 180°

**⚠️ Common Mistake Alert!**
Tetrahedral complexes don't show cis-trans isomerism because all positions are equivalent!

**2. Optical Isomerism**:
- Non-superimposable mirror images
- Optically active (rotate plane-polarized light)
- Common in octahedral complexes with bidentate ligands
- Example: [Co(en)₃]³⁺ has d and l forms

## Valence Bond Theory (VBT)

**Central idea**: Metal orbitals hybridize to accept electron pairs from ligands.

| Coordination Number | Geometry | Hybridization |
|---------------------|----------|---------------|
| 2 | Linear | sp |
| 4 | Tetrahedral | sp³ |
| 4 | Square planar | dsp² |
| 6 | Octahedral | sp³d² or d²sp³ |

**Inner vs Outer Orbital Complexes**:
- d²sp³ = inner orbital (uses inner d orbitals)
- sp³d² = outer orbital (uses outer d orbitals)

## Crystal Field Theory (CFT)

**Assumptions**:
1. Ligands are point charges
2. Metal-ligand interaction is electrostatic
3. d-orbitals split in energy due to ligand field

**💡 Did You Know?**
CFT explains why [Fe(CN)₆]⁴⁻ is yellow while [Fe(H₂O)₆]³⁺ is yellow-brown - different ligands cause different splitting!

### Crystal Field Splitting

**Octahedral Field**:
- d-orbitals split into t₂g (lower) and eg (higher)
- Splitting energy = Δₒ (or 10Dq)
- t₂g: dxy, dyz, dxz (lower by 0.4Δₒ)
- eg: dx²-y², dz² (higher by 0.6Δₒ)

**Tetrahedral Field**:
- e (lower) and t₂ (higher)
- Δₜ ≈ 4/9 Δₒ

### Spectrochemical Series

Ligands arranged by field strength:

I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < NO₂⁻ < CN⁻ < CO

**Weak field** → small Δ → high spin
**Strong field** → large Δ → low spin

**🔑 Remember This!**
CO and CN⁻ are strong field ligands (low spin). H₂O is moderate. Halides are weak field (high spin).

## CFSE (Crystal Field Stabilization Energy)

CFSE = (-0.4Δₒ × n_t₂g) + (0.6Δₒ × n_eg)

Where n = number of electrons in each set.

## High Spin vs Low Spin

| | High Spin | Low Spin |
|--|-----------|----------|
| Δ | Small (< P) | Large (> P) |
| Electron pairing | Avoided | Occurs |
| Ligands | Weak field | Strong field |
| Paramagnetism | Higher | Lower |

P = pairing energy (energy required to pair electrons)

## Magnetic Properties

**Paramagnetic**: Has unpaired electrons (attracted by magnetic field)
**Diamagnetic**: No unpaired electrons (repelled by magnetic field)

**Spin-only magnetic moment**: μ = √(n(n+2)) BM`,
    keyConcepts: JSON.stringify([
      { title: "Werner's Theory", description: "Metals have primary valency (oxidation state, ionizable) and secondary valency (coordination number, non-ionizable, fixed geometry)." },
      { title: "Ligands and Denticity", description: "Ligands donate electron pairs. Monodentate (1 site), bidentate (2 sites), hexadentate (6 sites like EDTA). Chelate effect increases stability." },
      { title: "IUPAC Nomenclature", description: "Ligands before metal, alphabetical order, anionic -o suffix, oxidation state in Roman numerals. Cation written before anion." },
      { title: "Isomerism Types", description: "Structural: ionization, hydrate, linkage, coordination. Stereo: geometrical (cis-trans), optical (non-superimposable mirror images)." },
      { title: "Crystal Field Theory", description: "Ligands split d-orbitals. Octahedral: t₂g (lower) and eg (higher), split by Δₒ. Tetrahedral: Δₜ ≈ 4/9 Δₒ." },
      { title: "Spectrochemical Series", description: "I⁻ < Br⁻ < Cl⁻ < H₂O < NH₃ < en < CN⁻ < CO. Strong field ligands cause large splitting and low spin." },
      { title: "High vs Low Spin", description: "If Δ > P, electrons pair (low spin). If Δ < P, electrons stay unpaired (high spin). P = pairing energy." }
    ]),
    formulas: JSON.stringify([
      { name: "CFSE (Octahedral)", formula: "CFSE = -0.4Δₒ(n_t₂g) + 0.6Δₒ(n_eg)", description: "Crystal Field Stabilization Energy. Negative value = stabilization." },
      { name: "Tetrahedral Splitting", formula: "Δₜ = (4/9)Δₒ", description: "Tetrahedral splitting is always smaller. No low spin tetrahedral complexes exist." },
      { name: "Magnetic Moment", formula: "μ = √(n(n+2)) BM", description: "Spin-only formula. n = unpaired electrons. BM = Bohr Magneton." },
      { name: "Effective Atomic Number", formula: "EAN = Z - oxidation state + 2 × coordination number", description: "Total electrons around metal. Noble gas EAN (36, 54, 86) is stable." },
      { name: "Stability Constant", formula: "K = [Complex]/[Metal][Ligand]ⁿ", description: "Higher K = more stable complex. Related to chelate effect and ligand field strength." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 16,
    chapterTitle: "General Principles of Metallurgy",
    introduction: "How do we get pure metals from rocky ores? This chapter explores the fascinating world of metallurgy - from concentration and reduction to refining, covering thermodynamic and electrochemical principles behind metal extraction!",
    detailedNotes: `# General Principles of Metallurgy

Metallurgy is the science of extracting metals from their ores and refining them for use. Understanding these principles helps us appreciate how the metals around us are produced!

## Occurrence of Metals

**Minerals**: Naturally occurring compounds of metals
**Ores**: Minerals from which metal can be extracted profitably
**Gangue**: Impurities in ore (sand, clay, rocks)

| Type | Definition | Examples |
|------|------------|----------|
| Native | Free metal | Au, Ag, Pt |
| Oxide | Metal oxide | Fe₂O₃, Al₂O₃, Cu₂O |
| Sulfide | Metal sulfide | ZnS, PbS, CuFeS₂ |
| Carbonate | Metal carbonate | CaCO₃, MgCO₃, ZnCO₃ |
| Halide | Metal halide | NaCl, KCl, CaF₂ |

**💡 Did You Know?**
Gold is one of the few metals found in its native state - that's why ancient civilizations discovered it first!

## Steps in Metallurgy

1. **Concentration** (Beneficiation)
2. **Extraction** (Reduction)
3. **Refining** (Purification)

## Concentration Methods

**1. Hydraulic Washing** (Gravity Separation)
- Based on density difference
- Used for heavy oxide ores
- Example: Tin ore (cassiterite)

**2. Magnetic Separation**
- Separates magnetic from non-magnetic
- Used for iron ore (magnetite)
- Electromagnetic separator rotates

**3. Froth Flotation**
- For sulfide ores
- Ore particles attach to froth (oil + pine oil)
- Gangue sinks in water

**🔑 Remember This!**
In froth flotation, collectors (xanthates) make ore hydrophobic, while frothers (pine oil) create stable froth. Depressants selectively prevent flotation.

**4. Leaching**
- Dissolving ore in suitable reagent
- Examples:
  - Bauxite in NaOH (Bayer's process)
  - Gold in NaCN solution

**Bayer's Process** (Aluminium):
Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O
NaAlO₂ + 2H₂O → Al(OH)₃ + NaOH
2Al(OH)₃ → Al₂O₃ + 3H₂O

## Thermodynamic Principles

**Ellingham Diagrams**: Plot of ΔG° vs Temperature for oxide formation

**Key Points**:
- Lower line = more stable oxide
- Metal with lower line can reduce oxide with higher line
- Slope changes at phase transitions
- Carbon line slopes downward (becomes better reducing agent at high T)

**⚠️ Common Mistake Alert!**
A metal can reduce another metal's oxide only if its oxide formation line lies BELOW the other on the Ellingham diagram!

## Reduction Methods

**1. Carbon Reduction** (For oxides above carbon line at high T)

ZnO + C → Zn + CO (at ~1100°C)
Fe₂O₃ + 3CO → 2Fe + 3CO₂ (Blast furnace)

**2. Self-Reduction** (For sulfide ores)

2Cu₂S + 3O₂ → 2Cu₂O + 2SO₂
Cu₂S + 2Cu₂O → 6Cu + SO₂

**3. Electrolytic Reduction** (For very reactive metals)

Used for: Na, K, Ca, Mg, Al
Example: Hall-Héroult process for Al

## Extraction of Iron (Blast Furnace)

**Ore**: Hematite (Fe₂O₃)
**Reducing agent**: Coke (C)
**Flux**: Limestone (CaCite)

**Zone Reactions**:

| Zone | Temperature | Reaction |
|------|-------------|----------|
| Top | 500-800K | Fe₂O₃ + CO → Fe₃O₄ + CO₂ |
| Middle | 900-1200K | Fe₃O₄ + CO → FeO + CO₂ |
| Lower | 1500-1900K | FeO + CO → Fe + CO₂ |
| Bottom | 1500-2000K | C + O₂ → CO₂; CO₂ + C → 2CO |

**Slag Formation**:
CaCO₃ → CaO + CO₂
CaO + SiO₂ → CaSite (slag)

**💡 Did You Know?**
A single blast furnace can produce up to 10,000 tons of iron per day and runs continuously for years without stopping!

## Extraction of Copper

**Ore**: Chalcopyrite (CuFeS₂)

**Steps**:
1. Concentration by froth flotation
2. Roasting: 2CuFeS₂ + O₂ → Cu₂S + 2FeS + SO₂
3. Smelting with silica flux: FeS + 3/2O₂ + SiO₂ → FeSiO₃ + SO₂
4. Bessemerization (self-reduction)
5. Electrolytic refining

**🔑 Remember This!**
Copper undergoes self-reduction because Cu₂O reacts with Cu₂S to give pure copper. No external reducing agent needed!

## Extraction of Aluminum (Hall-Héroult Process)

**Ore**: Bauxite (Al₂O₃·2H₂O)

**Purification**: Bayer's process
**Reduction**: Electrolysis of Al₂O₃ in molten cryolite (Na₃AlF₆)

**At Cathode**: Al³⁺ + 3e⁻ → Al
**At Anode**: C + O²⁻ → CO + 2e⁻ (carbon anode consumed)

**Why cryolite?**
- Lowers melting point (from 2050°C to 950°C)
- Increases conductivity
- Reduces cost

## Refining Methods

**1. Distillation**: For volatile metals (Zn, Hg)

**2. Liquation**: For low melting point metals (Sn, Pb, Bi)

**3. Electrolytic Refining**: Most common for Cu, Au, Ag, Zn
- Impure metal = anode
- Pure metal = cathode
- Metal salt solution = electrolyte
- Impurities form anode mud

**4. Zone Refining**: For ultra-pure semiconductors (Si, Ge, Ga)
- Based on difference in solubility in solid/liquid
- Impurities concentrate in molten zone
- Repeated passes increase purity

**5. Vapour Phase Refining**:
- Mond Process (Ni): Ni + 4CO ⇌ Ni(CO)₄
- Van Arkel Process (Ti, Zr): Ti + 2I₂ ⇌ TiI₄

## Electrochemical Principles

**Standard Electrode Potential (E°)** determines:
- More negative E° → More reactive metal → Harder to reduce
- Na, K, Al have very negative E° → Need electrolysis
- Cu, Ag, Au have positive E° → Easy to reduce

**Electrorefining**:
Impure metal at anode dissolves, pure metal deposits at cathode.
Metals with lower E° than the metal being refined don't deposit.

**⚠️ Common Mistake Alert!**
In electrorefining of copper, silver and gold don't deposit at cathode - they fall as "anode mud" and are recovered separately!`,
    keyConcepts: JSON.stringify([
      { title: "Ores vs Minerals", description: "Minerals are natural metal compounds. Ores are minerals from which metals can be extracted economically. Gangue is unwanted impurity." },
      { title: "Concentration Methods", description: "Gravity separation (density), magnetic separation, froth flotation (sulfide ores, hydrophobic), leaching (chemical dissolution)." },
      { title: "Ellingham Diagrams", description: "Plot ΔG° vs T for oxide formation. Lower line = more stable oxide. Metal can reduce oxide above its line. Carbon becomes stronger reducer at high T." },
      { title: "Reduction Methods", description: "Carbon reduction (Zn, Fe), self-reduction (Cu from sulfide), electrolytic reduction (Na, K, Al). Choice depends on metal reactivity." },
      { title: "Blast Furnace", description: "Iron extraction: Fe₂O₃ reduced by CO at different temperatures. Limestone flux removes silica impurity as slag." },
      { title: "Hall-Héroult Process", description: "Aluminum extraction by electrolysis of Al₂O₃ in molten cryolite (lowers MP to 950°C). Carbon anode is consumed." },
      { title: "Refining Methods", description: "Electrolytic (Cu, Au), zone refining (Si, Ge for semiconductors), vapour phase (Mond for Ni, Van Arkel for Ti)." }
    ]),
    formulas: JSON.stringify([
      { name: "Gibbs Energy of Reaction", formula: "ΔG° = ΔH° - TΔS°", description: "Negative ΔG° means spontaneous reduction. At high T, entropy term dominates." },
      { name: "Carbon Reduction", formula: "MO + C → M + CO (if ΔG° < 0)", description: "Works when metal oxide line is above carbon line on Ellingham diagram." },
      { name: "Iron Reduction", formula: "Fe₂O₃ + 3CO → 2Fe + 3CO₂", description: "Main reduction reaction in blast furnace. CO is the active reducing agent." },
      { name: "Aluminum Electrolysis", formula: "2Al₂O₃ + 3C → 4Al + 3CO₂", description: "Overall reaction in Hall-Héroult process. Very energy intensive." },
      { name: "Mond Process", formula: "Ni + 4CO ⇌ Ni(CO)₄ (volatile)", description: "Nickel carbonyl forms at 330-350K, decomposes at 450-470K to give pure Ni." },
      { name: "Van Arkel Process", formula: "M + 2I₂ → MI₄ → M + 2I₂", description: "Metal iodide forms and decomposes on hot filament. Used for Ti, Zr, Hf, V." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 90
  }
];

export async function seedInorganicChemistryClass12() {
  console.log("Seeding Inorganic Chemistry Class 12 chapters...");
  
  for (const chapter of inorganicChemistryClass12Chapters) {
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
  
  console.log("Inorganic Chemistry Class 12 seeding complete!");
}
