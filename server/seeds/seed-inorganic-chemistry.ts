import { db } from "../db";
import { chapterContent } from "@shared/schema";

const inorganicChemistryChapters = [
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 15,
    chapterTitle: "Classification of Elements and Periodicity in Properties",
    introduction: "The periodic table is like the 'map' of chemistry! This chapter explores how elements are organized based on their properties, why trends exist across periods and down groups, and how electron configuration determines an element's behavior.",
    detailedNotes: `# Classification of Elements and Periodicity in Properties

The periodic table is one of the most powerful tools in science! It organizes all 118 elements in a way that reveals patterns and helps predict properties.

## History of Periodic Classification

**Early Attempts:**
- **Döbereiner's Triads (1829)**: Groups of 3 elements where middle element's atomic mass was average of other two
- **Newlands' Octaves (1866)**: Every 8th element had similar properties (like musical notes!)
- **Mendeleev's Table (1869)**: Arranged by increasing atomic mass, left gaps for undiscovered elements

**💡 Did You Know?**
Mendeleev predicted properties of undiscovered elements so accurately that when gallium was discovered, its properties matched his predictions almost exactly!

## Modern Periodic Law

**Moseley (1913)**: Properties are periodic functions of atomic number, not atomic mass.

**Current periodic table:**
- 7 periods (horizontal rows)
- 18 groups (vertical columns)
- s, p, d, f blocks based on which orbital is being filled

## Periodic Table Structure

| Block | Groups | Valence Electrons |
|-------|--------|-------------------|
| s-block | 1-2 | s orbitals |
| p-block | 13-18 | p orbitals |
| d-block | 3-12 | d orbitals |
| f-block | Lanthanides/Actinides | f orbitals |

**🔑 Remember This!**
Group number = Number of valence electrons for main group elements!
Group 1 has 1 valence electron, Group 17 has 7.

## Periodic Trends

### 1. Atomic Radius
- **Decreases across period** (more protons pull electrons closer)
- **Increases down group** (more shells added)

### 2. Ionization Energy (IE)
Energy to remove electron from gaseous atom.
- **Increases across period** (stronger nuclear attraction)
- **Decreases down group** (electrons farther from nucleus)

**⚠️ Common Mistake Alert!**
IE doesn't always increase smoothly across a period! There are dips at Group 3 (s² to s²p¹) and Group 6 (half-filled to more than half-filled p orbitals).

### 3. Electron Affinity (EA)
Energy released when electron is added.
- Generally increases across period
- Halogens have highest EA (want one more electron!)
- Noble gases have ~0 or positive EA

### 4. Electronegativity
Tendency to attract shared electrons.
- Increases across period, decreases down group
- Fluorine is most electronegative (4.0)

### 5. Metallic Character
- Decreases across period
- Increases down group
- Metals lose electrons; non-metals gain

## Electronic Configuration Patterns

**Period number = Number of shells**
**Group number (main group) = Valence electrons**

General configurations:
- Group 1: ns¹
- Group 2: ns²
- Group 17: ns²np⁵
- Group 18: ns²np⁶

## Diagonal Relationship

Elements diagonally placed show similar properties:
- Li ~ Mg (both form covalent compounds)
- Be ~ Al (both amphoteric)
- B ~ Si (both form acidic oxides)

**💡 Did You Know?**
Lithium is stored in oil, not water like other alkali metals, because it reacts with nitrogen in air - similar to magnesium!`,
    keyConcepts: JSON.stringify([
      { title: "Modern Periodic Law", description: "Properties of elements are periodic functions of their atomic numbers. The table has 7 periods and 18 groups organized in s, p, d, f blocks." },
      { title: "Atomic Radius Trend", description: "Decreases across a period (more protons, stronger pull) and increases down a group (more electron shells)." },
      { title: "Ionization Energy", description: "Energy to remove an electron from gaseous atom. Increases across period, decreases down group. Higher IE = harder to lose electron." },
      { title: "Electronegativity", description: "Tendency to attract shared electrons in a bond. Fluorine is most electronegative. Increases across period, decreases down group." },
      { title: "Electron Affinity", description: "Energy change when electron is added to gaseous atom. Halogens have highest values (want to complete octet)." },
      { title: "Metallic vs Non-metallic Character", description: "Metallic character increases down group and decreases across period. Metals donate electrons; non-metals accept." },
      { title: "Diagonal Relationship", description: "Diagonal elements (Li-Mg, Be-Al, B-Si) show similar properties due to similar charge/size ratios." }
    ]),
    formulas: JSON.stringify([
      { name: "Ionization Energy", formula: "M(g) → M⁺(g) + e⁻; ΔH = IE", description: "Energy required to remove electron from isolated gaseous atom. Always positive (endothermic)." },
      { name: "Electron Affinity", formula: "X(g) + e⁻ → X⁻(g); ΔH = EA", description: "Energy released when electron is added. Usually negative (exothermic) for non-metals." },
      { name: "Successive IE", formula: "IE₁ < IE₂ < IE₃ < ...", description: "Each successive ionization requires more energy as positive charge increases." },
      { name: "Electronegativity Scale", formula: "χ = (IE + EA) / 2 (Mulliken)", description: "Average of ionization energy and electron affinity gives electronegativity." },
      { name: "Effective Nuclear Charge", formula: "Zeff = Z - σ (Slater's rules)", description: "Actual nuclear charge felt by valence electrons. σ is shielding constant." },
      { name: "Ionic Radius Trend", formula: "Cation < Atom < Anion", description: "Losing electrons decreases size; gaining electrons increases size." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 16,
    chapterTitle: "Chemical Bonding and Molecular Structure",
    introduction: "Why do atoms stick together? This chapter explores the different ways atoms bond - from sharing electrons to transferring them completely - and how molecular shapes are determined by electron arrangements!",
    detailedNotes: `# Chemical Bonding and Molecular Structure

Atoms rarely exist alone - they form bonds to achieve stability! Understanding chemical bonds helps explain everything from why water is liquid to why diamonds are so hard.

## Why Do Atoms Bond?

Atoms bond to achieve a stable electron configuration - usually the noble gas configuration with 8 valence electrons (Octet Rule) or 2 for hydrogen (Duet Rule).

**💡 Did You Know?**
The octet rule works because noble gases have completely filled outer shells, making them extremely stable and unreactive!

## Types of Chemical Bonds

### 1. Ionic Bonds
- Transfer of electrons from metal to non-metal
- Electrostatic attraction between ions
- High melting points, conduct electricity when molten
- Example: Na⁺Cl⁻ (NaCl)

**Lattice Energy**: Energy released when ions form solid crystal
Higher charge and smaller ions = stronger lattice = higher melting point

### 2. Covalent Bonds
- Sharing of electrons between non-metals
- Can be single, double, or triple bonds
- Sigma (σ) bonds: head-on overlap
- Pi (π) bonds: sideways overlap

**🔑 Remember This!**
Single bond = 1σ, Double bond = 1σ + 1π, Triple bond = 1σ + 2π

### 3. Coordinate (Dative) Bonds
- Both electrons from same atom
- Example: NH₄⁺ (N donates pair to H⁺)
- Example: H₃O⁺ (O donates pair to H⁺)

## Lewis Structures

Steps to draw:
1. Count total valence electrons
2. Draw skeleton structure
3. Add bonding pairs
4. Complete octets with lone pairs
5. Check formal charges

**⚠️ Common Mistake Alert!**
Don't forget to add or subtract electrons for ions! Anions have extra electrons, cations have fewer.

## VSEPR Theory

**Valence Shell Electron Pair Repulsion** - electron pairs repel each other and arrange to minimize repulsion.

| Electron Domains | Geometry | Example |
|-----------------|----------|---------|
| 2 | Linear | CO₂, BeCl₂ |
| 3 | Trigonal planar | BF₃, SO₃ |
| 4 | Tetrahedral | CH₄, NH₄⁺ |
| 5 | Trigonal bipyramidal | PCl₅ |
| 6 | Octahedral | SF₆ |

**Lone pairs take up more space than bonding pairs!**
- NH₃: 4 domains → tetrahedral arrangement, pyramidal shape
- H₂O: 4 domains → tetrahedral arrangement, bent shape

## Hybridization

Mixing of atomic orbitals to form new hybrid orbitals:

| Hybridization | Orbitals Mixed | Geometry | Angle |
|--------------|----------------|----------|-------|
| sp | s + p | Linear | 180° |
| sp² | s + 2p | Trigonal planar | 120° |
| sp³ | s + 3p | Tetrahedral | 109.5° |
| sp³d | s + 3p + d | Trigonal bipyramidal | 90°, 120° |
| sp³d² | s + 3p + 2d | Octahedral | 90° |

**🔑 Remember This!**
Number of hybrid orbitals = Number of electron domains (bonds + lone pairs)

## Molecular Orbital Theory (MOT)

Atomic orbitals combine to form molecular orbitals:
- **Bonding MO (σ, π)**: Lower energy, electrons stabilize molecule
- **Antibonding MO (σ*, π*)**: Higher energy, electrons destabilize

**Bond Order = (Bonding e⁻ - Antibonding e⁻) / 2**

Higher bond order = stronger, shorter bond

**For O₂:**
Configuration: σ₁s² σ*₁s² σ₂s² σ*₂s² σ₂p² π₂p⁴ π*₂p²
Bond order = (10-6)/2 = 2 (double bond)
Has 2 unpaired electrons → paramagnetic!

## Dipole Moment

**μ = q × d** (charge × distance)

Measured in Debye (D). Polar molecules have net dipole moment ≠ 0.

Symmetric molecules (CO₂, BF₃, CH₄) have μ = 0 even with polar bonds!`,
    keyConcepts: JSON.stringify([
      { title: "Ionic vs Covalent Bonds", description: "Ionic bonds involve electron transfer between metals and non-metals. Covalent bonds involve electron sharing between non-metals." },
      { title: "Lewis Structures", description: "Diagrams showing how valence electrons are arranged around atoms. Follow octet rule (or duet for H)." },
      { title: "VSEPR Theory", description: "Electron pairs repel and arrange to minimize repulsion. Predicts molecular geometry from electron domains." },
      { title: "Hybridization", description: "Mixing atomic orbitals to form equivalent hybrid orbitals. sp=linear, sp²=trigonal, sp³=tetrahedral." },
      { title: "Sigma and Pi Bonds", description: "Sigma bonds form from head-on overlap (stronger). Pi bonds form from sideways overlap (weaker, needs sigma first)." },
      { title: "Molecular Orbital Theory", description: "Atomic orbitals combine to form molecular orbitals. Bond order = (bonding - antibonding)/2." },
      { title: "Dipole Moment", description: "Measure of polarity. Vector sum of all bond dipoles. Symmetric molecules have zero net dipole." }
    ]),
    formulas: JSON.stringify([
      { name: "Bond Order (MOT)", formula: "B.O. = (Nb - Na) / 2", description: "Number of bonding minus antibonding electrons, divided by 2. Higher = stronger bond." },
      { name: "Dipole Moment", formula: "μ = q × d", description: "Charge times distance. Measured in Debye (D). 1 D = 3.33 × 10⁻³⁰ C·m." },
      { name: "Formal Charge", formula: "FC = V - L - B/2", description: "Valence electrons minus lone pair electrons minus half bonding electrons." },
      { name: "Lattice Energy", formula: "U ∝ (Z⁺ × Z⁻) / (r⁺ + r⁻)", description: "Proportional to product of charges, inversely to sum of radii." },
      { name: "Percent Ionic Character", formula: "% = (μobserved / μcalculated) × 100", description: "Compares actual dipole moment to theoretical 100% ionic value." },
      { name: "Bond Energy Relation", formula: "Triple > Double > Single", description: "Triple bonds are strongest and shortest; single bonds are weakest and longest." },
      { name: "Hybridization Formula", formula: "Hybrid orbitals = σ bonds + lone pairs", description: "Count electron domains to determine hybridization type." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 130
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 17,
    chapterTitle: "Hydrogen",
    introduction: "Hydrogen is the simplest and most abundant element in the universe! This chapter covers its unique properties, different isotopes, methods of preparation, and its important compounds like water and hydrogen peroxide.",
    detailedNotes: `# Hydrogen

Hydrogen is the lightest and most abundant element in the universe - it makes up about 75% of all matter! Yet on Earth, it rarely exists as a free gas.

## Position in Periodic Table

Hydrogen is unique - it doesn't fit perfectly in any group!

**Similarities with Group 1 (Alkali Metals):**
- 1 valence electron (1s¹)
- Forms +1 ion (H⁺)
- Forms halides like HCl

**Similarities with Group 17 (Halogens):**
- Needs 1 electron to fill shell
- Forms -1 ion (H⁻ - hydride)
- Exists as diatomic molecule (H₂)

**💡 Did You Know?**
The Sun converts 600 million tons of hydrogen to helium every second through nuclear fusion - that's the source of all sunlight!

## Isotopes of Hydrogen

| Isotope | Symbol | Mass Number | Nucleus |
|---------|--------|-------------|---------|
| Protium | ¹H | 1 | 1 proton |
| Deuterium | ²H or D | 2 | 1 proton + 1 neutron |
| Tritium | ³H or T | 3 | 1 proton + 2 neutrons |

- **Protium**: 99.98% of natural hydrogen
- **Deuterium**: Found in "heavy water" (D₂O)
- **Tritium**: Radioactive, half-life ~12 years

## Preparation of Dihydrogen

**1. Laboratory Methods:**
- Zn + H₂SO₄ → ZnSO₄ + H₂↑
- Active metals + dilute acids

**2. Industrial Methods:**
- Steam reforming: CH₄ + H₂O → CO + 3H₂ (at 1270K, Ni catalyst)
- Water gas shift: CO + H₂O → CO₂ + H₂
- Electrolysis of water: 2H₂O → 2H₂ + O₂

**🔑 Remember This!**
"Water gas" is a mixture of CO and H₂ - it was historically used as fuel!

## Properties of Hydrogen

**Physical Properties:**
- Colorless, odorless, tasteless gas
- Lightest gas (d = 0.089 g/L)
- Very low boiling point (-253°C)
- Low solubility in water

**Chemical Properties:**

**⚠️ Common Mistake Alert!**
H₂ is NOT very reactive at room temperature! Most reactions need heat or catalyst because of strong H-H bond (436 kJ/mol).

**With metals (forms hydrides):**
2Na + H₂ → 2NaH

**With oxygen (combustion):**
2H₂ + O₂ → 2H₂O (highly exothermic!)

**With halogens:**
H₂ + Cl₂ → 2HCl (light or heat needed)

**With nitrogen (Haber process):**
3H₂ + N₂ ⇌ 2NH₃ (450°C, 200 atm, Fe catalyst)

## Types of Hydrides

| Type | Examples | Properties |
|------|----------|------------|
| Ionic | NaH, CaH₂ | Formed by s-block metals, H is H⁻ |
| Covalent | H₂O, NH₃, CH₄ | Sharing of electrons |
| Metallic | TiH₂, PdH | H in metal lattice, non-stoichiometric |

## Water (H₂O)

**Structure:**
- Bent shape (104.5° angle)
- sp³ hybridized oxygen
- Highly polar (μ = 1.85 D)
- Strong hydrogen bonding

**Anomalous Properties:**
- Ice floats (density decreases below 4°C)
- High boiling point for its size
- High specific heat capacity
- Universal solvent

## Hydrogen Peroxide (H₂O₂)

**Structure:**
- H-O-O-H (open book structure)
- Dihedral angle: 111.5° (liquid)
- Weak O-O bond (easily broken)

**Properties:**
- Colorless, syrupy liquid
- Stronger acid than water (pKa = 11.6)
- Both oxidizing AND reducing agent

**Reactions:**
- Oxidizing: 2Fe²⁺ + H₂O₂ + 2H⁺ → 2Fe³⁺ + 2H₂O
- Reducing: 2KMnO₄ + 3H₂SO₄ + 5H₂O₂ → K₂SO₄ + 2MnSO₄ + 8H₂O + 5O₂

**Uses:**
- Bleaching (hair, textiles)
- Antiseptic (3% solution)
- Rocket propellant (90% solution)`,
    keyConcepts: JSON.stringify([
      { title: "Position of Hydrogen", description: "Unique element with properties of both Group 1 (alkali metals) and Group 17 (halogens). Has 1 valence electron." },
      { title: "Isotopes of Hydrogen", description: "Protium (¹H), Deuterium (²H/D), Tritium (³H/T). Tritium is radioactive. Deuterium found in heavy water." },
      { title: "Preparation Methods", description: "Lab: metals + acids. Industrial: steam reforming of methane, water-gas shift reaction, electrolysis." },
      { title: "Types of Hydrides", description: "Ionic (s-block metals, H⁻), Covalent (non-metals, shared electrons), Metallic (d-block, H in lattice)." },
      { title: "Water Properties", description: "Bent shape, 104.5° angle, strong hydrogen bonding causes high BP, ice floating, high specific heat." },
      { title: "Hydrogen Peroxide", description: "H₂O₂ is both oxidizing and reducing agent. Open book structure. Weak O-O bond. Used as bleach and antiseptic." }
    ]),
    formulas: JSON.stringify([
      { name: "Steam Reforming", formula: "CH₄ + H₂O → CO + 3H₂", description: "Industrial production at 1270K with nickel catalyst. Main source of hydrogen." },
      { name: "Water-Gas Shift", formula: "CO + H₂O → CO₂ + H₂", description: "Converts carbon monoxide to more hydrogen and carbon dioxide." },
      { name: "Haber Process", formula: "3H₂ + N₂ ⇌ 2NH₃", description: "Synthesis of ammonia at 450°C, 200 atm, iron catalyst." },
      { name: "Electrolysis of Water", formula: "2H₂O → 2H₂ + O₂", description: "Produces pure hydrogen and oxygen. Requires electrical energy." },
      { name: "H₂O₂ Decomposition", formula: "2H₂O₂ → 2H₂O + O₂", description: "Catalyzed by MnO₂, light, or heat. Releases oxygen gas." },
      { name: "H₂O₂ as Oxidizer", formula: "H₂O₂ + 2H⁺ + 2e⁻ → 2H₂O", description: "In acidic medium, H₂O₂ gains electrons (acts as oxidizing agent)." },
      { name: "H₂O₂ as Reducer", formula: "H₂O₂ → O₂ + 2H⁺ + 2e⁻", description: "Can lose electrons to strong oxidizers like KMnO₄." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 90
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 18,
    chapterTitle: "The s-Block Elements",
    introduction: "The s-block contains the most reactive metals on Earth! This chapter explores the alkali and alkaline earth metals - their properties, reactions, and important compounds like sodium hydroxide and calcium oxide.",
    detailedNotes: `# The s-Block Elements

The s-block elements (Groups 1 and 2) are the most reactive metals! They're so reactive that they're never found free in nature - always combined with other elements.

## Group 1: Alkali Metals

**Elements:** Li, Na, K, Rb, Cs, Fr
**Configuration:** ns¹
**Oxidation state:** +1 only

### Physical Properties
- Soft (can be cut with knife)
- Low melting points (decreasing down group)
- Low densities (Li, Na, K float on water!)
- Silvery white, shiny when fresh
- Good conductors of heat and electricity

**💡 Did You Know?**
Cesium melts at just 28.4°C - you could melt it in your hand (but DON'T - it would explode on contact with your skin's moisture!)

### Chemical Properties

**Reaction with water:**
2M + 2H₂O → 2MOH + H₂↑

Reactivity increases down the group:
- Li: reacts slowly
- Na: vigorous, may catch fire
- K: catches fire (purple flame)
- Rb, Cs: explosive!

**🔑 Remember This!**
Alkali metals are stored under kerosene oil to prevent reaction with air and moisture. Lithium is stored in paraffin wax.

**Reaction with oxygen:**
- Li forms normal oxide: 4Li + O₂ → 2Li₂O
- Na forms peroxide: 2Na + O₂ → Na₂O₂
- K, Rb, Cs form superoxide: K + O₂ → KO₂

**⚠️ Common Mistake Alert!**
Not all alkali metals form the same oxide! Li forms Li₂O, Na forms Na₂O₂, and K forms KO₂.

### Important Compounds

**Sodium hydroxide (NaOH) - "Caustic soda"**
- Made by electrolysis of brine (Chlor-alkali process)
- Strong base, very corrosive
- Used in soap, paper, textiles

**Sodium carbonate (Na₂CO₃) - "Washing soda"**
- Made by Solvay process
- Water softener
- Glass manufacturing

## Group 2: Alkaline Earth Metals

**Elements:** Be, Mg, Ca, Sr, Ba, Ra
**Configuration:** ns²
**Oxidation state:** +2

### Physical Properties
- Harder than alkali metals
- Higher melting points
- Higher densities
- Two valence electrons → stronger metallic bonding

### Chemical Properties

**Reaction with water:**
M + 2H₂O → M(OH)₂ + H₂↑

- Be: No reaction
- Mg: Slow with cold water, fast with steam
- Ca onwards: React with cold water

**Reaction with oxygen:**
2M + O₂ → 2MO (normal oxides only)

### Important Compounds

**Calcium oxide (CaO) - "Quicklime"**
- Made by heating limestone: CaCO₃ → CaO + CO₂
- Highly exothermic reaction with water
- Used in cement, steel, agriculture

**Calcium hydroxide (Ca(OH)₂) - "Slaked lime"**
- CaO + H₂O → Ca(OH)₂
- Mild base, whitewash
- "Milk of lime" suspension used in sugar refining

## Anomalous Behavior of Lithium and Beryllium

Li and Be are different from their group members due to:
1. Very small size
2. High polarizing power
3. Higher ionization energy

**Li differs from other alkali metals:**
- Forms covalent compounds (LiCl)
- Forms normal oxide only (Li₂O)
- Carbonate and nitrate decompose on heating
- Lithium nitrate gives NO₂ (others give NO + O₂)

**Li resembles Mg (Diagonal Relationship):**
- Both form nitrides (Li₃N, Mg₃N₂)
- Both carbonates decompose on heating
- Both chlorides are soluble in organic solvents

**Be resembles Al (Diagonal Relationship):**
- Both are amphoteric
- Both form covalent compounds
- Both chlorides are covalent, act as Lewis acids`,
    keyConcepts: JSON.stringify([
      { title: "Alkali Metals (Group 1)", description: "Li, Na, K, Rb, Cs have ns¹ configuration. Most reactive metals. Form +1 ions. Stored under kerosene." },
      { title: "Alkaline Earth Metals (Group 2)", description: "Be, Mg, Ca, Sr, Ba have ns² configuration. Less reactive than Group 1. Form +2 ions. Harder and higher MP." },
      { title: "Reaction with Water", description: "Alkali metals react vigorously (increasing down group). Alkaline earth metals react more slowly. Both produce hydroxides + H₂." },
      { title: "Oxide Formation", description: "Li forms oxide (Li₂O), Na forms peroxide (Na₂O₂), K forms superoxide (KO₂). Group 2 forms normal oxides only." },
      { title: "Diagonal Relationship", description: "Li resembles Mg; Be resembles Al. Due to similar charge/size ratios, these pairs show similar properties." },
      { title: "Anomalous Behavior", description: "Li and Be differ from other group members due to small size, high polarizing power, and high ionization energy." },
      { title: "Important Compounds", description: "NaOH (caustic soda), Na₂CO₃ (washing soda), CaO (quicklime), Ca(OH)₂ (slaked lime) are industrially important." }
    ]),
    formulas: JSON.stringify([
      { name: "Alkali Metal + Water", formula: "2M + 2H₂O → 2MOH + H₂↑", description: "Produces metal hydroxide and hydrogen gas. Increasingly violent down the group." },
      { name: "Calcium Carbonate Decomposition", formula: "CaCO₃ → CaO + CO₂", description: "Heating limestone produces quicklime. Industrial process for lime production." },
      { name: "Slaking of Lime", formula: "CaO + H₂O → Ca(OH)₂", description: "Highly exothermic reaction. Produces slaked lime (calcium hydroxide)." },
      { name: "Solvay Process", formula: "NaCl + NH₃ + CO₂ + H₂O → NaHCO₃ + NH₄Cl", description: "Industrial production of sodium carbonate via sodium bicarbonate." },
      { name: "Chlor-alkali Process", formula: "2NaCl + 2H₂O → 2NaOH + Cl₂ + H₂", description: "Electrolysis of brine produces sodium hydroxide, chlorine, and hydrogen." },
      { name: "Peroxide Reaction", formula: "Na₂O₂ + 2H₂O → 2NaOH + H₂O₂", description: "Sodium peroxide reacts with water to give sodium hydroxide and hydrogen peroxide." },
      { name: "Superoxide Reaction", formula: "4KO₂ + 2H₂O → 4KOH + 3O₂", description: "Potassium superoxide reacts with water/CO₂ releasing oxygen. Used in space suits!" }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 110
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 19,
    chapterTitle: "Some p-Block Elements (Groups 13 and 14)",
    introduction: "The p-block contains the most diverse elements! This chapter covers the Boron and Carbon families - from the metalloid boron to the versatile carbon, and their fascinating compounds.",
    detailedNotes: `# Some p-Block Elements (Groups 13 and 14)

The p-block elements show the most variation in properties - from metals to metalloids to non-metals! Let's explore the Boron and Carbon families.

## General Characteristics of p-Block

- Valence electrons in p-orbitals
- Shows variable oxidation states
- Forms covalent compounds mostly
- Contains metals, metalloids, and non-metals

## Group 13: The Boron Family

**Elements:** B, Al, Ga, In, Tl
**Configuration:** ns²np¹
**Oxidation states:** +3 (main), +1 (for Tl mainly)

### Boron (B)

**💡 Did You Know?**
Boron is the only non-metal in Group 13! It's actually a metalloid with fascinating chemistry.

**Properties:**
- Hard, black crystalline solid
- Very high melting point (2300°C)
- Semiconductor
- Forms covalent compounds

**Boron Compounds:**

**Borax (Na₂B₄O₇·10H₂O)**
- Naturally occurring mineral
- Used in glass, enamel, detergents
- When heated: Na₂B₄O₇ → 2NaBO₂ + B₂O₃ (glassy bead)

**Boric Acid (H₃BO₃)**
- Weak acid (doesn't donate H⁺ directly)
- Acts as Lewis acid: H₃BO₃ + H₂O ⇌ [B(OH)₄]⁻ + H⁺
- Used as antiseptic, insecticide

**Diborane (B₂H₆)**
- Electron deficient compound
- Banana bonds (3-center 2-electron bonds)
- B₂H₆ + 6H₂O → 2H₃BO₃ + 6H₂↑

### Aluminum (Al)

**🔑 Remember This!**
Aluminum is the most abundant metal in Earth's crust! But it's highly reactive - it's protected by a thin oxide layer (passivation).

**Properties:**
- Silvery white, lightweight metal
- Good conductor of heat and electricity
- Amphoteric (reacts with both acids and bases)

**Amphoteric nature:**
- Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O (with acid)
- Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O (with base)

**⚠️ Common Mistake Alert!**
Al doesn't react with concentrated nitric acid! The acid forms a protective oxide layer (passivation).

## Group 14: The Carbon Family

**Elements:** C, Si, Ge, Sn, Pb
**Configuration:** ns²np²
**Oxidation states:** +4 (common), +2 (increases down group)

**Inert Pair Effect:** Tendency of ns² electrons to remain non-bonded increases down the group. That's why Pb²⁺ is more stable than Pb⁴⁺!

### Carbon (C)

**Allotropes:**
- **Diamond**: sp³ hybridized, 3D network, hardest substance, insulator
- **Graphite**: sp² hybridized, layered structure, conductor, lubricant
- **Fullerenes**: C₆₀ "buckyballs", football shape
- **Graphene**: single layer of graphite, strongest material known!

**💡 Did You Know?**
Graphene is 200 times stronger than steel but only one atom thick! A hammock made of graphene could hold a cat while weighing less than one of the cat's whiskers!

### Silicon (Si)

**Properties:**
- Second most abundant element in Earth's crust
- Metalloid (semiconductor)
- Basis of computer chips

**Silicones:** (R₂SiO)n
- Polymers with Si-O backbone
- Water repellent
- Used in sealants, lubricants, implants

**Silicates:** SiO₄⁴⁻ tetrahedra
- Building blocks of rocks and minerals
- Can share corners to form chains, sheets, 3D networks

### Important Carbon Compounds

**Carbon Monoxide (CO)**
- Colorless, odorless, poisonous gas
- Binds to hemoglobin 200× stronger than O₂
- Neutral oxide
- Reducing agent in metallurgy

**Carbon Dioxide (CO₂)**
- Colorless gas, slightly acidic in water
- Greenhouse gas
- Solid CO₂ = "dry ice" (sublimes at -78°C)
- CO₂ + H₂O ⇌ H₂CO₃ (carbonic acid)

### Important Silicon Compounds

**Silicon Dioxide (SiO₂)**
- Quartz, sand
- 3D covalent network
- Very high melting point
- Used in glass manufacturing`,
    keyConcepts: JSON.stringify([
      { title: "Group 13 Overview", description: "Boron family: B, Al, Ga, In, Tl. Configuration ns²np¹. Shows +3 oxidation state mainly. Boron is the only non-metal." },
      { title: "Group 14 Overview", description: "Carbon family: C, Si, Ge, Sn, Pb. Configuration ns²np². Shows +4 and +2 states. Inert pair effect increases down group." },
      { title: "Electron Deficient Compounds", description: "Boron compounds like BF₃ and B₂H₆ have incomplete octet. B₂H₆ has banana bonds (3c-2e bonds)." },
      { title: "Amphoteric Nature of Al", description: "Aluminum and its oxide react with both acids and bases. Forms AlCl₃ with HCl, NaAlO₂ with NaOH." },
      { title: "Carbon Allotropes", description: "Diamond (sp³, hard), Graphite (sp², conductor), Fullerenes (C₆₀), Graphene (single layer, strongest)." },
      { title: "Inert Pair Effect", description: "ns² electrons become reluctant to participate in bonding down the group. Pb²⁺ more stable than Pb⁴⁺." },
      { title: "Silicates and Silicones", description: "Silicates (SiO₄⁴⁻ units) form rocks. Silicones (R₂SiO)n are synthetic polymers with Si-O backbone." }
    ]),
    formulas: JSON.stringify([
      { name: "Boric Acid as Lewis Acid", formula: "H₃BO₃ + H₂O ⇌ [B(OH)₄]⁻ + H⁺", description: "Boric acid accepts OH⁻ rather than donating H⁺. Acts as Lewis acid." },
      { name: "Diborane Hydrolysis", formula: "B₂H₆ + 6H₂O → 2H₃BO₃ + 6H₂", description: "Diborane reacts with water to give boric acid and hydrogen gas." },
      { name: "Aluminum with Acid", formula: "2Al + 6HCl → 2AlCl₃ + 3H₂", description: "Aluminum reacts with dilute acids to release hydrogen." },
      { name: "Aluminum with Base", formula: "2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂", description: "Aluminum reacts with bases forming aluminate and hydrogen." },
      { name: "CO as Reducing Agent", formula: "Fe₂O₃ + 3CO → 2Fe + 3CO₂", description: "Carbon monoxide reduces metal oxides in blast furnace." },
      { name: "CO₂ with Lime Water", formula: "CO₂ + Ca(OH)₂ → CaCO₃ + H₂O", description: "Test for CO₂: turns lime water milky. Excess CO₂ clears it again." },
      { name: "Borax Bead Test", formula: "Na₂B₄O₇ → 2NaBO₂ + B₂O₃", description: "Heated borax forms glassy bead that gives characteristic colors with metal ions." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 20,
    chapterTitle: "The p-Block Elements (Groups 15-18)",
    introduction: "From the air we breathe to the water we drink, p-block elements are everywhere! This chapter covers nitrogen and phosphorus families, oxygen and sulfur families, halogens, and the noble gases.",
    detailedNotes: `# The p-Block Elements (Groups 15-18)

The p-block elements from Groups 15-18 include some of the most important elements for life and industry. Let's explore them!

## Group 15: The Nitrogen Family

**Elements:** N, P, As, Sb, Bi
**Configuration:** ns²np³
**Oxidation states:** -3, +3, +5 (and others)

### Nitrogen (N₂)

**Properties:**
- Makes up 78% of atmosphere
- Very stable triple bond (N≡N, 945 kJ/mol)
- Unreactive at room temperature

**💡 Did You Know?**
Nitrogen is called "azote" in French, meaning "without life" - because animals die in pure nitrogen. But nitrogen compounds are essential for all life!

**Oxides of Nitrogen:**
- N₂O (nitrous oxide): "laughing gas", neutral
- NO (nitric oxide): colorless, turns brown in air
- NO₂ (nitrogen dioxide): brown gas, causes smog
- N₂O₄ ⇌ 2NO₂ (equilibrium)

**Ammonia (NH₃):**
- Pungent smell, lighter than air
- Basic: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻
- Made by Haber process
- Used in fertilizers, refrigeration

**Nitric Acid (HNO₃):**
- Strong acid, powerful oxidizer
- Made by Ostwald process:
  4NH₃ + 5O₂ → 4NO + 6H₂O
  2NO + O₂ → 2NO₂
  3NO₂ + H₂O → 2HNO₃ + NO

### Phosphorus

**Allotropes:**
- **White P**: P₄ tetrahedra, very reactive, glows in dark
- **Red P**: polymeric, less reactive, safe
- **Black P**: layered structure, most stable

**⚠️ Common Mistake Alert!**
White phosphorus is P₄ (tetrahedra), not just P atoms! It's stored under water because it catches fire in air.

## Group 16: The Oxygen Family

**Elements:** O, S, Se, Te, Po
**Configuration:** ns²np⁴
**Oxidation states:** -2 (common), +2, +4, +6

### Oxygen

**Allotropes:**
- O₂ (dioxygen): supports life and combustion
- O₃ (ozone): protects from UV, strong oxidizer

### Sulfur

**Allotropes:**
- Rhombic (S₈): stable below 96°C
- Monoclinic: stable 96-119°C
- Plastic: stretchy polymer

**Sulfuric Acid (H₂SO₄) - "King of Chemicals"**
- Contact process:
  S + O₂ → SO₂
  2SO₂ + O₂ ⇌ 2SO₃ (V₂O₅ catalyst, 450°C)
  SO₃ + H₂SO₄ → H₂S₂O₇ (oleum)
  H₂S₂O₇ + H₂O → 2H₂SO₄

**🔑 Remember This!**
Never add water to conc. H₂SO₄! Always add acid to water slowly (AAA - Always Add Acid to water).

## Group 17: The Halogens

**Elements:** F, Cl, Br, I, At
**Configuration:** ns²np⁵
**Oxidation states:** -1 (common), +1 to +7 (except F)

### Properties

- Most reactive non-metals
- Exist as diatomic molecules (X₂)
- Colors: F₂ (pale yellow), Cl₂ (greenish), Br₂ (red-brown), I₂ (purple)
- Reactivity: F > Cl > Br > I

**Anomalous behavior of Fluorine:**
- Highest electronegativity (4.0)
- No d-orbitals, so only -1 state
- Forms only OF₂ (not O₂F)
- HF is weak acid (due to strong H-F bond)

**Interhalogen Compounds:**
- XX' (ClF, BrCl), XX'₃ (ClF₃, ICl₃), XX'₅ (IF₅), XX'₇ (IF₇)
- More reactive than parent halogens

### Hydrogen Halides (HX)

**Acidic strength:** HI > HBr > HCl > HF
**Bond strength:** HF > HCl > HBr > HI
**Thermal stability:** HF > HCl > HBr > HI

## Group 18: Noble Gases

**Elements:** He, Ne, Ar, Kr, Xe, Rn
**Configuration:** ns²np⁶ (full octet)

### Why are they unreactive?
- Completely filled orbitals
- Very high ionization energy
- Zero electron affinity

**💡 Did You Know?**
Xenon can form compounds! XeF₂, XeF₄, XeF₆ were first made in 1962. Larger noble gases have lower ionization energies, making bonding possible.

**Xenon Compounds:**
- XeF₂: Linear, sp³d hybridization
- XeF₄: Square planar, sp³d² hybridization
- XeF₆: Distorted octahedral

**Uses:**
- He: balloons, diving (He-O₂ mix)
- Ne: advertising signs (red glow)
- Ar: welding, light bulbs
- Kr, Xe: special lighting`,
    keyConcepts: JSON.stringify([
      { title: "Group 15 Properties", description: "Nitrogen family shows -3 to +5 oxidation states. N₂ is very stable (triple bond). Phosphorus has white, red, and black allotropes." },
      { title: "Group 16 Properties", description: "Oxygen family shows -2, +4, +6 states. Oxygen has O₂ and O₃ allotropes. Sulfuric acid is 'king of chemicals'." },
      { title: "Halogens (Group 17)", description: "Most reactive non-metals. F is most electronegative. Reactivity decreases down group. Form interhalogen compounds." },
      { title: "Noble Gases (Group 18)", description: "Full valence shell, very stable. Larger ones (Xe, Kr) can form compounds. Used in lighting and welding." },
      { title: "Anomalous Behavior of First Element", description: "N, O, F differ from their groups due to small size, no d-orbitals, high electronegativity." },
      { title: "Oxoacids of Halogens", description: "Chlorine forms HClO, HClO₂, HClO₃, HClO₄. Acidic strength increases with oxidation state." },
      { title: "Industrial Processes", description: "Haber process (NH₃), Ostwald process (HNO₃), Contact process (H₂SO₄) are key industrial reactions." }
    ]),
    formulas: JSON.stringify([
      { name: "Haber Process", formula: "N₂ + 3H₂ ⇌ 2NH₃", description: "Ammonia synthesis at 450°C, 200 atm, Fe catalyst. Exothermic reaction." },
      { name: "Ostwald Process", formula: "4NH₃ + 5O₂ → 4NO + 6H₂O", description: "First step of nitric acid manufacture. Pt-Rh catalyst at 800°C." },
      { name: "Contact Process", formula: "2SO₂ + O₂ ⇌ 2SO₃", description: "Sulfur trioxide formation using V₂O₅ catalyst at 450°C." },
      { name: "Halogen Displacement", formula: "Cl₂ + 2KBr → 2KCl + Br₂", description: "More reactive halogen displaces less reactive one from its salt." },
      { name: "XeF₂ Formation", formula: "Xe + F₂ → XeF₂", description: "Xenon difluoride forms at high temperature and pressure or UV light." },
      { name: "Ammonia Fountain", formula: "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻", description: "Ammonia is very soluble in water, creating vacuum that draws water up." },
      { name: "Disproportionation of Halogens", formula: "Cl₂ + 2NaOH → NaCl + NaClO + H₂O", description: "Cold dilute alkali produces chloride and hypochlorite. Hot concentrated gives chlorate." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 140
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 21,
    chapterTitle: "The d and f Block Elements",
    introduction: "The transition metals and inner transition metals give us colorful compounds, powerful catalysts, and essential biological molecules! This chapter explores their unique properties and chemistry.",
    detailedNotes: `# The d and f Block Elements

The d-block and f-block elements are called transition elements because their properties transition between the highly reactive s-block and the diverse p-block.

## d-Block Elements (Transition Metals)

**Location:** Groups 3-12 (3d, 4d, 5d series)
**Configuration:** (n-1)d¹⁻¹⁰ ns¹⁻²

**💡 Did You Know?**
The term "transition" was first used because these elements form a bridge between electropositive s-block and electronegative p-block elements!

### General Properties

**1. Variable Oxidation States**
- Due to availability of both (n-1)d and ns electrons
- Common: +2, +3, +4, etc.
- Mn shows +2 to +7
- Highest: Ru, Os show +8

**🔑 Remember This!**
The most common oxidation state is +2 (loss of ns² electrons). Higher states involve d-electrons too.

**2. Formation of Colored Compounds**
- Due to d-d transitions (electron jumping between d-orbitals)
- Color depends on:
  - Nature of ligand
  - Oxidation state
  - Geometry

| Ion | Color |
|-----|-------|
| Cu²⁺ | Blue |
| Fe³⁺ | Yellow-brown |
| Cr³⁺ | Green |
| Mn²⁺ | Pink |
| Co²⁺ | Pink |

**⚠️ Common Mistake Alert!**
Zn²⁺ and Cu⁺ are colorless because they have d¹⁰ configuration - no d-d transitions possible!

**3. Catalytic Activity**
Transition metals are excellent catalysts because:
- Variable oxidation states
- Ability to form complexes
- Provide surface for reactions

Examples:
- Fe in Haber process
- V₂O₅ in Contact process
- Ni in hydrogenation

**4. Formation of Complexes**
- Have empty d-orbitals to accept electron pairs
- Form coordination compounds
- Example: [Cu(NH₃)₄]²⁺ - deep blue

**5. Magnetic Properties**
- Paramagnetic: has unpaired electrons (attracted by magnet)
- Diamagnetic: all electrons paired (slightly repelled)
- Ferromagnetic: Fe, Co, Ni (strongly attracted)

**Magnetic moment: μ = √[n(n+2)] BM**
Where n = number of unpaired electrons

**6. Formation of Alloys**
- Similar atomic sizes allow mixing
- Bronze (Cu + Sn), Brass (Cu + Zn), Steel (Fe + C)

### Important Compounds

**Potassium Dichromate (K₂Cr₂O₇)**
- Orange crystals
- Strong oxidizing agent in acidic medium
- Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O (orange to green)

**Potassium Permanganate (KMnO₄)**
- Purple crystals
- Versatile oxidizing agent
- Acidic: MnO₄⁻ → Mn²⁺ (colorless)
- Neutral: MnO₄⁻ → MnO₂ (brown)
- Basic: MnO₄⁻ → MnO₄²⁻ (green)

## f-Block Elements

**Lanthanides:** Ce to Lu (4f series)
**Actinides:** Th to Lr (5f series)

### Lanthanide Contraction

Progressive decrease in atomic/ionic radius across lanthanide series due to poor shielding by 4f electrons.

**Consequences:**
- 4d and 5d elements have similar sizes (Zr ≈ Hf)
- Post-lanthanide elements are denser
- Hard to separate lanthanides

### Properties of Lanthanides

- Mostly +3 oxidation state
- Ce⁴⁺ and Eu²⁺ are also stable
- Colored due to f-f transitions
- Paramagnetic (unpaired f-electrons)
- Used in magnets, alloys, catalysts

### Actinides

- Show +3 to +6 oxidation states
- All are radioactive
- U, Pu used as nuclear fuels
- More diverse chemistry than lanthanides

**💡 Did You Know?**
Uranium was named after the planet Uranus, which was discovered just 8 years before uranium itself!`,
    keyConcepts: JSON.stringify([
      { title: "Transition Metal Definition", description: "Elements with partially filled d-orbitals in any common oxidation state. Groups 3-12, but Zn, Cd, Hg are not true transition metals." },
      { title: "Variable Oxidation States", description: "Due to small energy difference between (n-1)d and ns orbitals. Both can participate in bonding." },
      { title: "Color in Transition Metals", description: "Due to d-d transitions when electron absorbs light and jumps between split d-orbitals. d¹⁰ and d⁰ are colorless." },
      { title: "Catalytic Properties", description: "Variable oxidation states and ability to form intermediates make transition metals excellent catalysts." },
      { title: "Lanthanide Contraction", description: "Gradual decrease in size across 4f series due to poor shielding by f-electrons. Makes 4d and 5d elements similar in size." },
      { title: "Magnetic Properties", description: "Paramagnetic if unpaired electrons present. μ = √[n(n+2)] BM. Fe, Co, Ni are ferromagnetic." },
      { title: "Important Compounds", description: "K₂Cr₂O₇ (orange, oxidizer), KMnO₄ (purple, oxidizer) are widely used in labs and industry." }
    ]),
    formulas: JSON.stringify([
      { name: "Magnetic Moment", formula: "μ = √[n(n+2)] BM", description: "n = number of unpaired electrons. BM = Bohr Magneton." },
      { name: "Dichromate Reduction", formula: "Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O", description: "In acidic medium, orange dichromate reduced to green Cr³⁺." },
      { name: "Permanganate in Acid", formula: "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O", description: "Purple permanganate reduced to colorless Mn²⁺ in acidic medium." },
      { name: "Permanganate in Base", formula: "MnO₄⁻ + e⁻ → MnO₄²⁻", description: "Purple permanganate reduced to green manganate in strongly basic medium." },
      { name: "Effective Atomic Number", formula: "EAN = Z - O.S. + 2×(Coordination Number)", description: "Total electrons including donated ones. Often equals nearest noble gas." },
      { name: "Crystal Field Splitting", formula: "Δₒ (octahedral) = 10Dq", description: "Energy difference between t₂g and eg sets in octahedral field." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 130
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 22,
    chapterTitle: "Coordination Compounds",
    introduction: "Coordination compounds are metal complexes that play vital roles in biology, industry, and medicine! From hemoglobin to anticancer drugs, this chapter explores their structure, naming, and bonding.",
    detailedNotes: `# Coordination Compounds

Coordination compounds (or complexes) contain a central metal atom/ion bonded to surrounding molecules or ions called ligands. They're essential for life (hemoglobin, chlorophyll) and technology!

## Basic Terminology

**Central Metal Atom/Ion:** Usually a transition metal
**Ligands:** Molecules or ions that donate electron pairs to metal
**Coordination Number (CN):** Number of ligand atoms directly bonded to metal
**Coordination Sphere:** Metal + ligands, written in square brackets

Example: [Cu(NH₃)₄]SO₄
- Central metal: Cu²⁺
- Ligands: 4 NH₃ molecules
- CN: 4
- Counter ion: SO₄²⁻

**💡 Did You Know?**
Hemoglobin is a coordination compound with iron at the center. It can bind oxygen (bright red) or carbon monoxide (cherry red) - that's why CO poisoning is dangerous!

## Werner's Coordination Theory (1893)

Alfred Werner proposed:
1. Metals have **primary valency** (oxidation state) and **secondary valency** (coordination number)
2. Secondary valency is fixed for a metal
3. Ligands satisfy secondary valency
4. Ligands are arranged in definite geometry

## Types of Ligands

| Type | Electrons Donated | Examples |
|------|-------------------|----------|
| Monodentate | 1 | NH₃, Cl⁻, H₂O |
| Bidentate | 2 | en (ethylenediamine), ox²⁻ (oxalate) |
| Polydentate | Many | EDTA⁴⁻ (hexadentate) |

**Chelating Ligands:** Polydentate ligands that form ring structures with metal
- More stable than monodentate complexes (chelate effect)
- EDTA is used to treat heavy metal poisoning

**🔑 Remember This!**
Chelate comes from Greek "chele" meaning claw - like a crab grabbing the metal!

## IUPAC Nomenclature

**Rules:**
1. Name cation before anion
2. Within coordination sphere:
   - Ligands before metal
   - Ligands in alphabetical order
   - Prefixes: di, tri, tetra, penta, hexa
   - For complex ligands: bis, tris, tetrakis
3. Oxidation state in Roman numerals
4. Anionic complex ends in "-ate"

**Examples:**
- [Co(NH₃)₆]Cl₃: Hexaamminecobalt(III) chloride
- K₃[Fe(CN)₆]: Potassium hexacyanoferrate(III)
- [Pt(NH₃)₂Cl₂]: Diamminedichloridoplatinum(II)

**⚠️ Common Mistake Alert!**
Don't forget: "ammine" (NH₃ ligand) has double 'm', while "amine" (organic compound) has single 'm'!

## Isomerism in Coordination Compounds

### Structural Isomerism

**1. Ionization Isomerism**
[Co(NH₃)₅Br]SO₄ vs [Co(NH₃)₅SO₄]Br
(Gives different ions in solution)

**2. Linkage Isomerism**
[Co(NH₃)₅NO₂]²⁺ (N-bonded) vs [Co(NH₃)₅ONO]²⁺ (O-bonded)

**3. Coordination Isomerism**
[Co(NH₃)₆][Cr(CN)₆] vs [Cr(NH₃)₆][Co(CN)₆]

### Stereoisomerism

**1. Geometrical (Cis-Trans) Isomerism**
- Cis: Same ligands on same side
- Trans: Same ligands on opposite sides
- Example: [Pt(NH₃)₂Cl₂]
  - cis-platin: anticancer drug!
  - trans-platin: inactive

**2. Optical Isomerism**
- Non-superimposable mirror images
- Rotate plane of polarized light
- d (dextro) and l (levo) forms
- Common in complexes with chelating ligands

## Bonding in Coordination Compounds

### Valence Bond Theory (VBT)

- Metal provides empty orbitals
- Ligands donate electron pairs
- Hybridization determines geometry

| CN | Hybridization | Geometry |
|----|--------------|----------|
| 4 | sp³ | Tetrahedral |
| 4 | dsp² | Square planar |
| 6 | sp³d² | Octahedral |
| 6 | d²sp³ | Octahedral (inner) |

### Crystal Field Theory (CFT)

**Key Concept:** Ligands are point charges that split d-orbital energies

**In Octahedral Field:**
- d-orbitals split into t₂g (lower) and eg (higher)
- Splitting energy = Δₒ = 10Dq
- Strong field ligands (CN⁻, CO): large Δₒ, pairing occurs
- Weak field ligands (Cl⁻, F⁻): small Δₒ, high spin

**Spectrochemical Series:**
I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < NO₂⁻ < CN⁻ < CO

**💡 Did You Know?**
The color of a complex depends on which wavelengths are absorbed. [Ti(H₂O)₆]³⁺ appears purple because it absorbs green light!`,
    keyConcepts: JSON.stringify([
      { title: "Coordination Compound Structure", description: "Central metal ion surrounded by ligands. Coordination number is the number of ligand atoms bonded to metal." },
      { title: "Werner's Theory", description: "Metals have primary (oxidation state) and secondary (coordination number) valencies. Secondary valency is directional." },
      { title: "Types of Ligands", description: "Monodentate (one donor atom), bidentate (two), polydentate (many). Chelating ligands form rings with metal." },
      { title: "IUPAC Naming", description: "Ligands alphabetically before metal, oxidation state in Roman numerals. Anionic complexes end in -ate." },
      { title: "Isomerism", description: "Structural (ionization, linkage) and stereoisomerism (geometrical, optical). Cis-platin is anticancer drug." },
      { title: "Crystal Field Theory", description: "Ligands split d-orbital energies. Strong field ligands cause large splitting and low spin complexes." },
      { title: "Spectrochemical Series", description: "Order of ligands by splitting ability. CN⁻, CO are strong field; Cl⁻, Br⁻ are weak field." }
    ]),
    formulas: JSON.stringify([
      { name: "Crystal Field Splitting", formula: "Δₒ = E(eg) - E(t₂g)", description: "Energy difference between higher and lower d-orbital sets in octahedral field." },
      { name: "CFSE (Octahedral)", formula: "CFSE = -0.4Δₒ × n(t₂g) + 0.6Δₒ × n(eg)", description: "Crystal Field Stabilization Energy based on electron distribution." },
      { name: "Tetrahedral vs Octahedral", formula: "Δt = (4/9)Δₒ", description: "Tetrahedral splitting is about 4/9 of octahedral splitting for same ligand." },
      { name: "Magnetic Moment", formula: "μ = √[n(n+2)] BM", description: "Used to determine number of unpaired electrons in complex." },
      { name: "Chelate Effect", formula: "ΔG = ΔH - TΔS", description: "Chelates are more stable due to favorable entropy (more particles released)." },
      { name: "Coordination Number", formula: "CN = Number of donor atoms bonded to metal", description: "Common values: 2, 4, 6. Determines geometry of complex." }
    ]),
    difficultyLevel: 4,
    estimatedStudyMinutes: 150
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 23,
    chapterTitle: "General Principles and Processes of Isolation of Elements (Metallurgy)",
    introduction: "How do we get metals from rocks? This chapter explores the fascinating science of extracting metals from their ores - from ancient techniques like smelting to modern electrochemical methods!",
    detailedNotes: `# General Principles and Processes of Isolation of Elements (Metallurgy)

Metallurgy is the science of extracting metals from their ores and preparing them for use. It's been practiced for thousands of years and continues to be essential for modern technology!

## Basic Terminology

**Mineral:** Naturally occurring substance containing metal compounds
**Ore:** Mineral from which metal can be extracted profitably
**Gangue:** Impurities in the ore (rock, sand, clay)

**💡 Did You Know?**
The Stone Age, Bronze Age, and Iron Age are named after the materials humans could extract! Each advancement in metallurgy changed civilization.

## Steps in Metal Extraction

**1. Concentration/Enrichment → 2. Extraction/Reduction → 3. Refining**

## 1. Concentration of Ore

### Physical Methods

**Gravity Separation (Hydraulic Washing)**
- Uses density difference
- Lighter gangue washed away
- For oxide ores (tin, iron)

**Magnetic Separation**
- Separates magnetic ores from non-magnetic gangue
- Or vice versa
- For iron, manganese ores

**Froth Flotation**
- For sulfide ores (copper, zinc, lead)
- Ore + water + oil + collector + frother
- Sulfide particles attach to bubbles, float
- Gangue sinks

**🔑 Remember This!**
Froth flotation works because sulfide ores are hydrophobic (water-hating) and prefer oil!

### Chemical Methods

**Leaching**
- Dissolving ore in suitable reagent
- Examples:
  - Bauxite (Al₂O₃): NaOH solution → NaAlO₂
  - Gold/Silver: NaCN solution (cyanide process)
  
**Bayer's Process (for Alumina):**
Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O
(Impurities don't dissolve)

## 2. Extraction of Metal

**⚠️ Common Mistake Alert!**
The extraction method depends on the metal's reactivity, not just its ore! More reactive metals need more powerful reduction methods.

### Based on Reactivity

| Metal Type | Examples | Method |
|------------|----------|--------|
| Highly reactive | Na, K, Mg, Al | Electrolytic reduction |
| Moderately reactive | Zn, Fe, Pb | Carbon reduction |
| Less reactive | Cu, Hg, Ag | Roasting alone |
| Noble metals | Au, Pt | Occur free or simple heating |

### Calcination and Roasting

**Calcination:** Heating in absence of air
- Removes moisture, CO₂
- Decomposes carbonates
- CaCO₃ → CaO + CO₂

**Roasting:** Heating in presence of air
- For sulfide ores
- Converts to oxide
- 2ZnS + 3O₂ → 2ZnO + 2SO₂

### Smelting (Carbon Reduction)

Reduction with carbon or carbon monoxide in blast furnace:
- ZnO + C → Zn + CO
- Fe₂O₃ + 3CO → 2Fe + 3CO₂

**Blast Furnace (Iron Extraction):**
Zones from top to bottom:
1. Reduction zone (250-700°C): Fe₂O₃ → Fe₃O₄ → FeO → Fe
2. Combustion zone (1500-2000°C): C + O₂ → CO₂ → CO
3. Slag formation: CaO + SiO₂ → CaSite (slag)

### Electrolytic Reduction

For highly reactive metals:
- Al from Al₂O₃ (Hall-Héroult process)
- Na from NaCl (Downs process)
- Mg from MgCl₂

**Hall-Héroult Process (Aluminum):**
- Electrolyte: Al₂O₃ dissolved in molten cryolite (Na₃AlF₆)
- Cathode: Carbon (molten Al deposited)
- Anode: Carbon (burns away as CO₂)
- Temperature: ~950°C

### Thermite Process

For metals lower than Al in reactivity series:
Fe₂O₃ + 2Al → 2Fe + Al₂O₃ + Heat

Used for welding railway tracks!

## 3. Refining of Metals

### Electrolytic Refining
- Impure metal = Anode
- Pure metal = Cathode
- Salt solution of metal = Electrolyte
- At cathode: M⁺ + e⁻ → M (pure)
- At anode: M → M⁺ + e⁻ (impure dissolves)

Used for: Cu, Ag, Au, Zn, Al

### Zone Refining
- For semiconductors (Si, Ge, Ga)
- Mobile heater melts metal zone
- Impurities more soluble in liquid
- Impurities move with liquid zone to one end

### Vapour Phase Refining

**Mond Process (Nickel):**
Ni + 4CO → Ni(CO)₄ → Ni + 4CO
(at 330-350K)  (at 450-470K)

**Van Arkel Method (Ti, Zr):**
Ti + 2I₂ → TiI₄ → Ti + 2I₂
(at 520K)  (at 1700K on tungsten)

**💡 Did You Know?**
Ultra-pure silicon for computer chips is refined to 99.9999999% purity using zone refining - that's 9 nines!`,
    keyConcepts: JSON.stringify([
      { title: "Ore vs Mineral", description: "Ore is a mineral from which metal can be profitably extracted. Gangue is the impurity in ore." },
      { title: "Concentration Methods", description: "Gravity separation (density), magnetic separation, froth flotation (sulfide ores), leaching (chemical dissolution)." },
      { title: "Froth Flotation", description: "Uses collectors and frothers. Sulfide ore attaches to air bubbles and floats. Gangue sinks." },
      { title: "Calcination vs Roasting", description: "Calcination: heating without air (for carbonates). Roasting: heating with air (for sulfides)." },
      { title: "Extraction Methods", description: "Electrolytic for reactive metals (Al, Na). Carbon reduction for moderate (Fe, Zn). Simple heating for less reactive (Hg)." },
      { title: "Electrolytic Refining", description: "Impure metal at anode, pure at cathode. Metal ions travel through electrolyte. Impurities fall as anode mud." },
      { title: "Special Refining Methods", description: "Zone refining for semiconductors. Mond process for Ni. Van Arkel for Ti, Zr." }
    ]),
    formulas: JSON.stringify([
      { name: "Roasting Reaction", formula: "2ZnS + 3O₂ → 2ZnO + 2SO₂", description: "Sulfide ore converted to oxide by heating in air." },
      { name: "Reduction by Carbon", formula: "ZnO + C → Zn + CO", description: "Metal oxide reduced by carbon at high temperature." },
      { name: "Thermite Reaction", formula: "Fe₂O₃ + 2Al → 2Fe + Al₂O₃", description: "Highly exothermic. Used for welding railway tracks." },
      { name: "Bayer's Process", formula: "Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O", description: "Bauxite dissolved in NaOH. Impurities (Fe₂O₃, SiO₂) don't dissolve." },
      { name: "Mond Process", formula: "Ni + 4CO ⇌ Ni(CO)₄", description: "Forward at 330K, reverse at 450K. Purifies nickel." },
      { name: "Cyanide Process", formula: "4Au + 8NaCN + 2H₂O + O₂ → 4Na[Au(CN)₂] + 4NaOH", description: "Gold dissolves in cyanide solution. Recovered by adding Zn." },
      { name: "Hall-Héroult Reaction", formula: "2Al₂O₃ + 3C → 4Al + 3CO₂", description: "Overall electrolysis reaction for aluminum extraction." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  }
];

export async function seedInorganicChemistry() {
  console.log("Seeding Inorganic Chemistry Class 11 and Class 12 chapters...");
  
  for (const chapter of inorganicChemistryChapters) {
    try {
      const existingChapter = await db.query.chapterContent.findFirst({
        where: (c, { and: andOp, eq: eqOp, ilike: ilikeOp }) => andOp(
          ilikeOp(c.subject, '%chemistry%'),
          eqOp(c.classLevel, chapter.classLevel),
          eqOp(c.chapterNumber, chapter.chapterNumber)
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
        console.log(`Updated: ${chapter.chapterTitle} (Class ${chapter.classLevel})`);
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
        console.log(`Created: ${chapter.chapterTitle} (Class ${chapter.classLevel})`);
      }
    } catch (error) {
      console.error(`Error with chapter ${chapter.chapterTitle}:`, error);
    }
  }
  
  console.log("Inorganic Chemistry seeding complete!");
}
