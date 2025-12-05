import { db } from "../db";
import { chapterContent } from "@shared/schema";
import { eq } from "drizzle-orm";

const physicalChemistryClass12Chapters = [
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 1,
    chapterTitle: "Solutions",
    introduction: "From salt water to medicines, solutions are everywhere! This chapter explores how substances dissolve, the properties of solutions, and important concepts like colligative properties that depend only on the number of particles.",
    detailedNotes: `# Solutions

A solution is a homogeneous mixture of two or more substances. Understanding solutions is crucial for chemistry, biology, and everyday life!

## Types of Solutions

**Solute**: Substance dissolved (present in smaller amount)
**Solvent**: Substance that dissolves (present in larger amount)

| Solute | Solvent | Example |
|--------|---------|---------|
| Gas | Liquid | CO₂ in water (soda) |
| Liquid | Liquid | Alcohol in water |
| Solid | Liquid | Sugar in water |
| Gas | Gas | Air |
| Solid | Solid | Alloys (brass) |

**💡 Did You Know?**
Ocean water is a solution containing about 3.5% dissolved salts - that's about 35 grams per liter!

## Concentration Units

**1. Mass Percentage (w/w)**
= (Mass of solute / Mass of solution) × 100

**2. Volume Percentage (v/v)**
= (Volume of solute / Volume of solution) × 100

**3. Molarity (M)**
= Moles of solute / Liters of solution

**4. Molality (m)**
= Moles of solute / kg of solvent

**5. Mole Fraction (χ)**
= Moles of component / Total moles

**6. Parts per million (ppm)**
= (Mass of solute / Mass of solution) × 10⁶

**🔑 Remember This!**
Molality is temperature-independent (uses mass), while molarity changes with temperature (uses volume).

## Solubility

**Solubility** = Maximum amount that dissolves at a given temperature

**Factors affecting solubility:**
- Temperature (gases: decreases; solids: usually increases)
- Pressure (gases only: Henry's Law)
- Nature of solute and solvent ("like dissolves like")

## Henry's Law

For gases: **p = KH × x**

Where:
- p = partial pressure of gas
- KH = Henry's constant
- x = mole fraction in solution

**⚠️ Common Mistake Alert!**
Henry's Law applies only to ideal, dilute solutions of gases that don't react with solvent!

## Raoult's Law

For ideal solutions:
**p₁ = p₁° × x₁**

Vapor pressure of component = (pure vapor pressure) × (mole fraction)

**For two-component solution:**
P_total = p₁° × x₁ + p₂° × x₂

## Ideal vs Non-Ideal Solutions

**Ideal Solutions**:
- Obey Raoult's Law
- ΔH_mix = 0, ΔV_mix = 0
- Example: Benzene + Toluene

**Non-Ideal Solutions**:
- Positive deviation: P > expected (weaker A-B forces)
- Negative deviation: P < expected (stronger A-B forces)

## Colligative Properties

Properties that depend only on NUMBER of particles, not their nature:

**1. Relative Lowering of Vapor Pressure**
(p° - p)/p° = x_solute

**2. Elevation of Boiling Point**
ΔTb = Kb × m × i

**3. Depression of Freezing Point**
ΔTf = Kf × m × i

**4. Osmotic Pressure**
π = iCRT

Where i = van't Hoff factor (accounts for dissociation/association)

## Van't Hoff Factor

i = Observed colligative property / Calculated colligative property

For electrolytes:
- NaCl: i ≈ 2 (Na⁺ + Cl⁻)
- CaCl₂: i ≈ 3 (Ca²⁺ + 2Cl⁻)

## Osmosis

Movement of solvent through semipermeable membrane from dilute to concentrated solution.

**Osmotic Pressure (π) = iCRT = inRT/V**

Applications: Reverse osmosis for water purification, IV fluids in medicine`,
    keyConcepts: JSON.stringify([
      { title: "Solution Components", description: "Solute is dissolved substance (smaller amount). Solvent is dissolving medium (larger amount). Together they form homogeneous mixture." },
      { title: "Concentration Units", description: "Molarity (mol/L), Molality (mol/kg solvent), Mole fraction, Mass/Volume percentage, ppm. Molality is temperature-independent." },
      { title: "Henry's Law", description: "Solubility of gas is proportional to its partial pressure: p = KH × x. Applies to dilute, non-reacting gas solutions." },
      { title: "Raoult's Law", description: "Vapor pressure of component equals pure vapor pressure times mole fraction. Ideal solutions obey this perfectly." },
      { title: "Colligative Properties", description: "Depend only on number of solute particles: vapor pressure lowering, boiling point elevation, freezing point depression, osmotic pressure." },
      { title: "Van't Hoff Factor", description: "Ratio of observed to calculated colligative property. Accounts for dissociation (i > 1) or association (i < 1) of solutes." },
      { title: "Osmosis", description: "Solvent flow through semipermeable membrane from dilute to concentrated solution. Osmotic pressure π = iCRT." }
    ]),
    formulas: JSON.stringify([
      { name: "Molarity", formula: "M = n/V(L)", description: "Moles of solute per liter of solution. Changes with temperature." },
      { name: "Molality", formula: "m = n/W(kg)", description: "Moles of solute per kg of solvent. Temperature independent." },
      { name: "Raoult's Law", formula: "p = p° × x", description: "Vapor pressure of component = pure vapor pressure × mole fraction." },
      { name: "Henry's Law", formula: "p = KH × x", description: "Partial pressure of gas = Henry's constant × mole fraction in solution." },
      { name: "Boiling Point Elevation", formula: "ΔTb = Kb × m × i", description: "Kb is molal elevation constant. i is van't Hoff factor." },
      { name: "Freezing Point Depression", formula: "ΔTf = Kf × m × i", description: "Kf is molal depression constant. i is van't Hoff factor." },
      { name: "Osmotic Pressure", formula: "π = iCRT = inRT/V", description: "C is molarity, R is gas constant, T is temperature in Kelvin." },
      { name: "Van't Hoff Factor", formula: "i = 1 + (n-1)α", description: "n = ions per formula unit, α = degree of dissociation." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 2,
    chapterTitle: "Electrochemistry",
    introduction: "From batteries in your phone to the rusting of iron, electrochemistry is everywhere! This chapter explores how chemical energy converts to electrical energy and vice versa, covering cells, electrodes, and the Nernst equation.",
    detailedNotes: `# Electrochemistry

Electrochemistry studies the relationship between chemical energy and electrical energy. It's the science behind batteries, electroplating, and corrosion!

## Basic Concepts

**Electrolytes**: Substances that conduct electricity through ion movement
- Strong electrolytes: Completely dissociate (NaCl, HCl)
- Weak electrolytes: Partially dissociate (CH₃COOH, NH₃)

**Conductance**: Ability to conduct electricity
- Metallic: Through electron movement
- Electrolytic: Through ion movement

**💡 Did You Know?**
The first battery was invented by Alessandro Volta in 1800 using zinc and copper discs separated by cloth soaked in salt water!

## Conductance and Conductivity

**Specific Conductance (κ)**: Conductance of 1 cm³ of solution
**Molar Conductivity (Λm)**: κ × 1000 / C (in S cm² mol⁻¹)

**Kohlrausch's Law**:
Λ°m = λ°₊ + λ°₋

Molar conductivity at infinite dilution = sum of ionic conductivities

## Electrochemical Cells

**Galvanic (Voltaic) Cell**: Chemical → Electrical energy
**Electrolytic Cell**: Electrical → Chemical energy

**🔑 Remember This!**
In galvanic cells, oxidation occurs at anode (negative), reduction at cathode (positive). It's reversed in electrolytic cells!

## Cell Representation

Zn | Zn²⁺ (aq) || Cu²⁺ (aq) | Cu

- Single line: phase boundary
- Double line: salt bridge
- Anode (oxidation) on left
- Cathode (reduction) on right

## Standard Electrode Potential (E°)

Measured against Standard Hydrogen Electrode (SHE) at 25°C, 1M concentration, 1 atm.

**E°cell = E°cathode - E°anode**

**⚠️ Common Mistake Alert!**
When reversing a half-reaction, change the sign of E°. But when multiplying, do NOT multiply E°!

## Electrochemical Series

Metals arranged by their standard reduction potentials:
- More negative E° = stronger reducing agent
- More positive E° = stronger oxidizing agent

Higher metals reduce ions of lower metals.

## Nernst Equation

At non-standard conditions:

**Ecell = E°cell - (RT/nF) ln Q**

At 25°C:
**Ecell = E°cell - (0.0591/n) log Q**

Where:
- n = electrons transferred
- Q = reaction quotient
- F = Faraday constant = 96500 C/mol

At equilibrium: Ecell = 0, so E°cell = (0.0591/n) log K

## Gibbs Energy and EMF

**ΔG° = -nFE°cell**

Spontaneous reaction: ΔG < 0, so E > 0

## Electrolysis

Decomposition of electrolyte by passing electricity.

**Faraday's Laws:**

**First Law**: Mass deposited ∝ charge passed
**m = ZIt = ZQ**

**Second Law**: Mass deposited ∝ equivalent weight
**m = (M × I × t) / (n × F)**

## Batteries

**Primary Cells**: Cannot be recharged (dry cell, mercury cell)
**Secondary Cells**: Rechargeable (lead-acid, Li-ion)

**Lead-Acid Battery**:
Anode: Pb + SO₄²⁻ → PbSO₄ + 2e⁻
Cathode: PbO₂ + 4H⁺ + SO₄²⁻ + 2e⁻ → PbSO₄ + 2H₂O

## Fuel Cells

Convert fuel directly to electricity:
H₂ + ½O₂ → H₂O (E° = 1.23 V)

More efficient than combustion engines!

## Corrosion

Electrochemical oxidation of metals.

**Prevention methods:**
- Coating (paint, oil, grease)
- Galvanizing (Zn coating)
- Cathodic protection
- Using alloys`,
    keyConcepts: JSON.stringify([
      { title: "Galvanic vs Electrolytic Cells", description: "Galvanic cells convert chemical to electrical energy (spontaneous). Electrolytic cells use electrical energy for non-spontaneous reactions." },
      { title: "Standard Electrode Potential", description: "E° measured against SHE at standard conditions. Cell potential = E°cathode - E°anode." },
      { title: "Nernst Equation", description: "Ecell = E° - (0.0591/n)logQ at 25°C. Relates cell potential to concentration." },
      { title: "Faraday's Laws", description: "First: mass ∝ charge. Second: mass ∝ equivalent weight. m = (M×I×t)/(n×F)." },
      { title: "Molar Conductivity", description: "Λm = κ × 1000/C. Increases with dilution. At infinite dilution, Λ°m = λ°₊ + λ°₋." },
      { title: "Gibbs Energy and EMF", description: "ΔG° = -nFE°. Positive E° means spontaneous reaction (negative ΔG)." },
      { title: "Corrosion", description: "Electrochemical oxidation of metals. Prevented by coating, galvanizing, or cathodic protection." }
    ]),
    formulas: JSON.stringify([
      { name: "Cell Potential", formula: "E°cell = E°cathode - E°anode", description: "Standard cell potential from standard electrode potentials." },
      { name: "Nernst Equation", formula: "E = E° - (0.0591/n) log Q", description: "At 25°C, relates EMF to concentrations. Q is reaction quotient." },
      { name: "Gibbs Energy", formula: "ΔG° = -nFE°", description: "Relates free energy to cell potential. F = 96500 C/mol." },
      { name: "Equilibrium Constant", formula: "log K = nE°/0.0591", description: "At equilibrium, E = 0. Calculate K from E°." },
      { name: "Faraday's Law", formula: "m = (M × I × t)/(n × F)", description: "Mass deposited. M = molar mass, n = electrons, F = 96500." },
      { name: "Molar Conductivity", formula: "Λm = κ × 1000/C", description: "κ in S/cm, C in mol/L. Units: S cm² mol⁻¹." },
      { name: "Kohlrausch's Law", formula: "Λ°m = λ°₊ + λ°₋", description: "Limiting molar conductivity = sum of limiting ionic conductivities." },
      { name: "Charge Passed", formula: "Q = I × t", description: "Total charge in coulombs = current (A) × time (s)." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 130
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 3,
    chapterTitle: "Chemical Kinetics",
    introduction: "Building on Class 11 foundations, this chapter dives deeper into reaction mechanisms, rate laws, and the molecular basis of reaction rates. Master these concepts for solving complex NEET problems!",
    detailedNotes: `# Chemical Kinetics (Advanced)

This chapter extends our understanding of reaction rates, focusing on mechanisms, pseudo-first-order reactions, and temperature effects crucial for NEET.

## Rate Law - Revisited

For reaction: aA + bB → Products
**Rate = k[A]ᵐ[B]ⁿ**

**Method to Find Order:**
1. Initial rates method: Compare rates at different concentrations
2. Graphical method: Plot [A] vs t, ln[A] vs t, or 1/[A] vs t
3. Half-life method: Analyze how t₁/₂ changes with concentration

**💡 Did You Know?**
The famous iodine clock reaction changes color suddenly because it's autocatalytic - the products speed up the reaction!

## Integrated Rate Laws - Detailed

**Zero Order:**
- [A] = [A]₀ - kt
- Plot [A] vs t → straight line, slope = -k
- t₁/₂ = [A]₀/(2k)

**First Order:**
- [A] = [A]₀e⁻ᵏᵗ  or  ln[A] = ln[A]₀ - kt
- Plot ln[A] vs t → straight line, slope = -k
- t₁/₂ = 0.693/k (constant!)
- Examples: Radioactive decay, many organic reactions

**Second Order:**
- 1/[A] = 1/[A]₀ + kt
- Plot 1/[A] vs t → straight line, slope = k
- t₁/₂ = 1/(k[A]₀)

**🔑 Remember This!**
For first-order reactions, time for 75% completion = 2 × t₁/₂, time for 87.5% = 3 × t₁/₂

## Pseudo-First Order Reactions

When one reactant is in large excess:

A + B → Products (B in excess)

Rate = k[A][B] ≈ k'[A]
Where k' = k[B] = pseudo-first order rate constant

**Example**: Hydrolysis of ester in aqueous solution
CH₃COOC₂H₅ + H₂O → CH₃COOH + C₂H₅OH

## Collision Theory - Advanced

**Rate = Z × e^(-Ea/RT) × p**

Where:
- Z = collision frequency
- e^(-Ea/RT) = fraction with E ≥ Ea
- p = steric factor (orientation probability)

**⚠️ Common Mistake Alert!**
Not all collisions with sufficient energy lead to reaction - proper orientation is also required!

## Transition State Theory

Reactants → [Activated Complex]‡ → Products

- Activated complex is at energy maximum
- Exists momentarily at transition state
- ΔH‡ = activation enthalpy
- ΔS‡ = activation entropy

**Eyring Equation:**
k = (kBT/h) × e^(-ΔG‡/RT)

## Temperature Dependence

**Arrhenius Equation:**
k = Ae^(-Ea/RT)

**ln k = ln A - Ea/RT**

Plot ln k vs 1/T:
- Slope = -Ea/R
- Intercept = ln A

**Two-Temperature Form:**
log(k₂/k₁) = (Ea/2.303R)(T₂-T₁)/(T₁T₂)

## Reaction Mechanisms

**Elementary Steps**: Single step, molecularity defined
**Complex Reactions**: Multiple elementary steps

**Rate-Determining Step (RDS)**: Slowest step controls rate

**Steady-State Approximation:**
For intermediate I: d[I]/dt = 0

**Example Mechanism:**
Step 1: A → B (slow, RDS)
Step 2: B + C → D (fast)
Overall: A + C → D
Rate = k₁[A] (determined by slow step)

## Catalysis - Detailed

**How catalysts work:**
1. Provide alternative pathway
2. Lower activation energy
3. Form intermediate with reactant
4. Are regenerated

**Types:**
- Homogeneous (same phase): Acid catalysis
- Heterogeneous (different phase): Surface catalysis
- Enzyme catalysis: Biological, highly specific

**Enzyme Kinetics (Michaelis-Menten):**
Rate = Vmax[S]/(Km + [S])`,
    keyConcepts: JSON.stringify([
      { title: "Determining Order", description: "Use initial rates method, graphical method (which plot is linear), or half-life dependence on concentration." },
      { title: "Pseudo-First Order", description: "When one reactant is in large excess, bimolecular reaction appears first order. k' = k[excess reactant]." },
      { title: "Collision Theory", description: "Rate depends on collision frequency, fraction with energy ≥ Ea, and proper orientation (steric factor)." },
      { title: "Transition State Theory", description: "Reactants form activated complex at energy maximum. Activation energy is barrier height." },
      { title: "Arrhenius Parameters", description: "Plot ln k vs 1/T gives slope = -Ea/R. A (frequency factor) from intercept." },
      { title: "Rate-Determining Step", description: "Slowest step in mechanism controls overall rate. Other steps adjust to this rate." },
      { title: "Catalysis Mechanism", description: "Catalyst provides alternative pathway with lower Ea. Forms intermediate, then regenerates." }
    ]),
    formulas: JSON.stringify([
      { name: "First Order (% completion)", formula: "t = (2.303/k) log(100/(100-x))", description: "Time for x% completion. At 50%, t = 0.693/k." },
      { name: "Two-Temperature Form", formula: "log(k₂/k₁) = (Ea/2.303R)(T₂-T₁)/(T₁T₂)", description: "Calculate Ea or rate constant at another temperature." },
      { name: "Activation Energy", formula: "Ea = -R × slope (from ln k vs 1/T)", description: "From Arrhenius plot. R = 8.314 J/mol·K." },
      { name: "Pseudo-First Order", formula: "k' = k[B]₀ when B >> A", description: "Apparent first-order constant includes excess reactant concentration." },
      { name: "nth Order Half-Life", formula: "t₁/₂ ∝ [A]₀^(1-n)", description: "General relation. n=1: independent, n=2: inverse, n=0: direct proportion." },
      { name: "Time for completion", formula: "t₉₉% = 6.9/k (first order)", description: "For first order, 99% completion takes ~7 half-lives." },
      { name: "Eyring Equation", formula: "k = (kᵦT/h)e^(-ΔG‡/RT)", description: "Transition state theory. kᵦ = Boltzmann constant, h = Planck constant." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 4,
    chapterTitle: "Surface Chemistry",
    introduction: "Why does charcoal remove odors? How do catalytic converters work? This chapter explores adsorption, colloids, and catalysis - phenomena happening at surfaces that have huge industrial and biological importance.",
    detailedNotes: `# Surface Chemistry

Surface chemistry deals with phenomena occurring at surfaces and interfaces. It's crucial for catalysis, medicines, and many industrial processes!

## Adsorption

**Adsorption**: Accumulation of substance at a surface
**Adsorbate**: Substance that gets adsorbed
**Adsorbent**: Surface on which adsorption occurs

**💡 Did You Know?**
Just 1 gram of activated charcoal has a surface area of about 3000 m² - larger than a tennis court!

## Types of Adsorption

| Property | Physisorption | Chemisorption |
|----------|--------------|---------------|
| Forces | Van der Waals | Chemical bonds |
| Enthalpy | Low (20-40 kJ/mol) | High (80-240 kJ/mol) |
| Reversibility | Reversible | Usually irreversible |
| Specificity | Non-specific | Highly specific |
| Layers | Multilayer | Monolayer |
| Temperature | Decreases with T | Increases then decreases |

## Adsorption Isotherms

**Freundlich Isotherm** (empirical):
x/m = kP^(1/n)  or  log(x/m) = log k + (1/n)log P

**Langmuir Isotherm** (theoretical):
Assumes monolayer adsorption on uniform surface

**🔑 Remember This!**
In Freundlich isotherm, n > 1 always. If 1/n = 0, adsorption is independent of pressure. If 1/n = 1, it's linear.

## Catalysis

**Catalyst**: Changes reaction rate without being consumed

**Positive Catalyst**: Increases rate
**Negative Catalyst (Inhibitor)**: Decreases rate
**Promoter**: Enhances catalyst activity
**Poison**: Reduces catalyst activity

## Types of Catalysis

**1. Homogeneous Catalysis**
Catalyst in same phase as reactants
Example: Acid-catalyzed ester hydrolysis

**2. Heterogeneous Catalysis**
Catalyst in different phase (usually solid)
Example: Haber process (Fe catalyst for N₂ + H₂ → NH₃)

**Steps in heterogeneous catalysis:**
1. Diffusion to surface
2. Adsorption
3. Chemical reaction
4. Desorption
5. Diffusion away

**⚠️ Common Mistake Alert!**
Catalysts change the pathway and activation energy, but NOT the equilibrium position or ΔG of reaction!

## Enzyme Catalysis

Enzymes are biological catalysts (proteins).

**Characteristics:**
- Highly specific
- Work at optimal pH and temperature
- Very efficient (turnover ~10⁶/sec)
- Can be inhibited

**Lock and Key Model**: Enzyme active site fits substrate exactly
**Induced Fit Model**: Active site adjusts to fit substrate

## Colloids

**Colloid**: Heterogeneous system with particle size 1-1000 nm

**Dispersed Phase**: Scattered particles
**Dispersion Medium**: Continuous phase

| Type | Dispersed | Medium | Example |
|------|-----------|--------|---------|
| Sol | Solid | Liquid | Gold sol, paints |
| Gel | Liquid | Solid | Cheese, butter |
| Emulsion | Liquid | Liquid | Milk, mayonnaise |
| Foam | Gas | Liquid | Shaving cream |
| Aerosol | Liquid/Solid | Gas | Fog, smoke |

## Preparation of Colloids

**Dispersion Methods** (break large → small):
- Mechanical (colloid mill)
- Electrical (Bredig's arc)
- Peptization (adding electrolyte)

**Condensation Methods** (build small → large):
- Chemical reactions
- Oxidation/Reduction
- Hydrolysis

## Properties of Colloids

**Tyndall Effect**: Scattering of light by colloidal particles

**Brownian Motion**: Random zigzag movement due to collision with medium molecules

**Electrophoresis**: Movement of charged particles in electric field

**Coagulation**: Precipitation of colloid by adding electrolyte
- Hardy-Schulze Rule: Higher charge → greater coagulating power

## Emulsions

Liquid dispersed in liquid (immiscible)

**Types:**
- O/W (Oil in Water): Milk, vanishing cream
- W/O (Water in Oil): Butter, cold cream

**Emulsifiers**: Stabilize emulsions (soaps, proteins)

## Applications

- Water purification
- Photography
- Medicine (colloidal silver, gold)
- Rubber industry
- Smoke precipitation`,
    keyConcepts: JSON.stringify([
      { title: "Adsorption vs Absorption", description: "Adsorption is surface phenomenon. Absorption is bulk phenomenon. Adsorption increases surface concentration." },
      { title: "Physisorption vs Chemisorption", description: "Physisorption: weak van der Waals, reversible, multilayer. Chemisorption: strong bonds, irreversible, monolayer." },
      { title: "Adsorption Isotherms", description: "Freundlich: x/m = kP^(1/n), empirical. Langmuir: theoretical, assumes monolayer on uniform surface." },
      { title: "Heterogeneous Catalysis", description: "Steps: diffusion → adsorption → reaction → desorption → diffusion. Surface provides active sites." },
      { title: "Colloids", description: "Particle size 1-1000 nm. Examples: sols, gels, emulsions, foams, aerosols. Show Tyndall effect." },
      { title: "Colloidal Properties", description: "Tyndall effect (light scattering), Brownian motion (random), electrophoresis (charge-based movement)." },
      { title: "Coagulation", description: "Precipitation of colloids by electrolytes. Hardy-Schulze rule: higher charge ions are more effective." }
    ]),
    formulas: JSON.stringify([
      { name: "Freundlich Isotherm", formula: "x/m = kP^(1/n) or log(x/m) = log k + (1/n)log P", description: "x = mass adsorbed, m = mass of adsorbent, P = pressure, k and n are constants." },
      { name: "Langmuir Isotherm", formula: "P/(x/m) = 1/(aK) + P/a", description: "a = adsorption capacity, K = equilibrium constant. Linear plot gives a and K." },
      { name: "Gold Number", formula: "mg of protective colloid to prevent coagulation of 10 mL gold sol", description: "Lower gold number = better protective power. Gelatin has lowest." },
      { name: "Coagulation Value", formula: "Minimum mmol of electrolyte to coagulate 1L of sol", description: "Lower value = more effective coagulant. Higher charge = lower coagulation value." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 90
  },
  {
    subject: "Chemistry",
    classLevel: "12",
    chapterNumber: 5,
    chapterTitle: "Solid State",
    introduction: "From diamonds to table salt, solids have fascinating structures! This chapter explores crystal lattices, unit cells, and defects that determine the properties of solid materials.",
    detailedNotes: `# Solid State

Solids have fixed shape and volume. Understanding their internal structure helps explain their properties and design new materials!

## Classification of Solids

**Crystalline Solids**: Regular, ordered arrangement
- Sharp melting point
- Anisotropic (directional properties)
- Examples: NaCl, diamond, quartz

**Amorphous Solids**: Irregular arrangement
- Melt over a range
- Isotropic (same properties in all directions)
- Examples: Glass, rubber, plastics

**💡 Did You Know?**
Glass is sometimes called a "supercooled liquid" because it flows extremely slowly over centuries!

## Types of Crystalline Solids

| Type | Particles | Forces | Properties | Examples |
|------|-----------|--------|------------|----------|
| Ionic | Ions | Electrostatic | High MP, brittle, conduct when molten | NaCl, MgO |
| Covalent | Atoms | Covalent bonds | Very high MP, hard | Diamond, SiO₂ |
| Metallic | Metal ions + e⁻ | Metallic bond | Malleable, conduct | Fe, Cu, Ag |
| Molecular | Molecules | van der Waals, H-bonds | Low MP, soft | Ice, I₂ |

## Crystal Lattice and Unit Cell

**Lattice**: 3D arrangement of points representing positions of particles
**Unit Cell**: Smallest repeating unit of lattice

**Parameters**: a, b, c (lengths) and α, β, γ (angles)

## Seven Crystal Systems

| System | Axes | Angles | Example |
|--------|------|--------|---------|
| Cubic | a = b = c | α = β = γ = 90° | NaCl |
| Tetragonal | a = b ≠ c | α = β = γ = 90° | SnO₂ |
| Orthorhombic | a ≠ b ≠ c | α = β = γ = 90° | Rhombic sulfur |
| Monoclinic | a ≠ b ≠ c | α = γ = 90°, β ≠ 90° | Monoclinic sulfur |
| Hexagonal | a = b ≠ c | α = β = 90°, γ = 120° | Graphite |
| Rhombohedral | a = b = c | α = β = γ ≠ 90° | CaCO₃ |
| Triclinic | a ≠ b ≠ c | α ≠ β ≠ γ ≠ 90° | K₂Cr₂O₇ |

## Cubic Unit Cells

**🔑 Remember This!**
For cubic lattices, remember: Corner (1/8), Edge (1/4), Face (1/2), Body center (1)

**Simple Cubic (SC):**
- Atoms at corners only
- Z (atoms/unit cell) = 8 × (1/8) = 1
- Coordination number = 6
- Packing efficiency = 52.4%

**Body-Centered Cubic (BCC):**
- Corners + body center
- Z = 8 × (1/8) + 1 = 2
- Coordination number = 8
- Packing efficiency = 68%
- a = 4r/√3

**Face-Centered Cubic (FCC):**
- Corners + face centers
- Z = 8 × (1/8) + 6 × (1/2) = 4
- Coordination number = 12
- Packing efficiency = 74%
- a = 2√2r

## Close Packing

**Hexagonal Close Packing (HCP)**: ABAB... stacking
**Cubic Close Packing (CCP)**: ABCABC... stacking (same as FCC)

Both have 74% efficiency, coordination number 12.

## Voids in Close Packing

**Tetrahedral Voids**: 4 spheres, 2 per atom
**Octahedral Voids**: 6 spheres, 1 per atom

**⚠️ Common Mistake Alert!**
If N atoms in CCP, there are N octahedral voids and 2N tetrahedral voids!

## Density Calculation

**ρ = (Z × M) / (a³ × Nₐ)**

Where:
- Z = atoms per unit cell
- M = molar mass
- a = edge length
- Nₐ = Avogadro's number

## Crystal Defects

**Point Defects:**
1. **Vacancy (Schottky)**: Missing atom from lattice
   - Decreases density
   - Common in ionic crystals

2. **Interstitial (Frenkel)**: Atom in wrong position
   - Density unchanged
   - Common when size difference is large

**Impurity Defects:**
- Substitutional: Foreign atom replaces host
- Interstitial: Foreign atom in void

## Electrical Properties

**Conductors**: Metals, free electrons
**Insulators**: Large band gap
**Semiconductors**: Small band gap
- n-type: Excess electrons (Group 15 dopant)
- p-type: Electron holes (Group 13 dopant)`,
    keyConcepts: JSON.stringify([
      { title: "Crystalline vs Amorphous", description: "Crystalline: ordered, sharp MP, anisotropic. Amorphous: disordered, melts over range, isotropic." },
      { title: "Types of Crystalline Solids", description: "Ionic (ions), Covalent network (atoms), Metallic (metal ions + electrons), Molecular (molecules). Different bonding = different properties." },
      { title: "Unit Cell", description: "Smallest repeating unit. Cubic has 3 types: Simple (Z=1), BCC (Z=2), FCC (Z=4)." },
      { title: "Packing Efficiency", description: "Volume occupied by spheres / total volume. SC: 52.4%, BCC: 68%, FCC/HCP: 74%." },
      { title: "Voids in Close Packing", description: "Tetrahedral (4 spheres, 2N voids) and Octahedral (6 spheres, N voids) per N atoms." },
      { title: "Point Defects", description: "Schottky: missing atom (density decreases). Frenkel: atom in wrong position (density unchanged)." },
      { title: "Semiconductors", description: "n-type: Group 15 dopant adds electrons. p-type: Group 13 dopant creates holes." }
    ]),
    formulas: JSON.stringify([
      { name: "Density", formula: "ρ = ZM/(a³Nₐ)", description: "Z = atoms/unit cell, M = molar mass, a = edge length, Nₐ = 6.022×10²³." },
      { name: "FCC Edge-Radius", formula: "a = 2√2r", description: "For face-centered cubic. Face diagonal = 4r." },
      { name: "BCC Edge-Radius", formula: "a = 4r/√3", description: "For body-centered cubic. Body diagonal = 4r." },
      { name: "SC Edge-Radius", formula: "a = 2r", description: "For simple cubic. Atoms touch along edge." },
      { name: "Packing Efficiency", formula: "PE = (Z × 4/3 πr³)/a³ × 100%", description: "Volume of spheres / volume of unit cell." },
      { name: "Number of Voids", formula: "Oct = N, Tet = 2N", description: "For N atoms in CCP, N octahedral and 2N tetrahedral voids." },
      { name: "Coordination Number", formula: "SC: 6, BCC: 8, FCC: 12", description: "Number of nearest neighbors touching each atom." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 110
  }
];

export async function seedPhysicalChemistryClass12() {
  console.log("Seeding Physical Chemistry Class 12 chapters...");
  
  for (const chapter of physicalChemistryClass12Chapters) {
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
  
  console.log("Physical Chemistry Class 12 seeding complete!");
}
