import { db } from "../db";
import { chapterContent } from "@shared/schema";

const physicalChemistryClass11Chapters = [
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 1,
    chapterTitle: "Some Basic Concepts of Chemistry",
    introduction: "Welcome to Chemistry! This chapter introduces you to the fundamental concepts that form the foundation of all chemistry. You'll learn about matter, atoms, molecules, and how scientists measure and calculate quantities in chemical reactions.",
    detailedNotes: `# Some Basic Concepts of Chemistry

Chemistry is the study of matter and the changes it undergoes. Everything around you - the air you breathe, the water you drink, the food you eat - is made of matter!

## What is Matter?

Matter is anything that has mass and takes up space. Your desk, your phone, even the air around you - all matter! Scientists classify matter based on its composition and properties.

**💡 Did You Know?**
The word "chemistry" comes from "alchemy," an ancient practice that tried to turn ordinary metals into gold!

## Classification of Matter

Matter can be classified as:

**1. Pure Substances**
- Elements: Made of only one type of atom (like gold, oxygen, carbon)
- Compounds: Made of two or more elements chemically combined (like water H₂O, salt NaCl)

**2. Mixtures**
- Homogeneous: Same composition throughout (like salt water)
- Heterogeneous: Different composition in different parts (like sand and water)

## The Mole Concept

The mole is chemistry's counting unit - like a "dozen" but for atoms!

**⚠️ Common Mistake Alert!**
Students often confuse molar mass with molecular mass. Molar mass has units (g/mol), molecular mass is just a number (amu).

**One mole = 6.022 × 10²³ particles** (Avogadro's number)

This enormous number helps us count atoms and molecules, which are incredibly tiny!

## Atomic and Molecular Mass

- **Atomic Mass**: The mass of one atom compared to carbon-12
- **Molecular Mass**: Sum of atomic masses of all atoms in a molecule
- **Molar Mass**: Mass of one mole of a substance in grams

For water (H₂O):
- Molecular mass = 2(1) + 16 = 18 amu
- Molar mass = 18 g/mol

## Percentage Composition

To find what percent of a compound is made of each element:

**% of element = (Mass of element in compound / Molar mass of compound) × 100**

## Stoichiometry

Stoichiometry is the calculation of quantities in chemical reactions. It's like a recipe - if you know the ingredients, you can figure out how much product you'll make!

**🔑 Remember This!**
In balanced equations, coefficients tell you the mole ratios. These ratios are your key to solving stoichiometry problems!

## Limiting Reagent

When two reactants are mixed, usually one runs out first - this is the **limiting reagent**. It determines how much product forms.

Think of making sandwiches: if you have 10 bread slices but only 3 cheese slices, cheese is your limiting reagent!

## Concentration Terms

**Molarity (M)** = moles of solute / liters of solution
**Molality (m)** = moles of solute / kg of solvent
**Mole Fraction (χ)** = moles of component / total moles

These help us describe how concentrated a solution is.`,
    keyConcepts: JSON.stringify([
      { title: "Matter and Its Classification", description: "Matter is anything with mass and volume. It's classified into pure substances (elements and compounds) and mixtures (homogeneous and heterogeneous)." },
      { title: "The Mole Concept", description: "A mole is 6.022 × 10²³ particles (Avogadro's number). It connects the microscopic world of atoms to measurable quantities." },
      { title: "Atomic and Molecular Mass", description: "Atomic mass is relative mass of an atom. Molecular mass is the sum of atomic masses. Molar mass is the mass of one mole in grams." },
      { title: "Stoichiometry", description: "The study of quantitative relationships in chemical reactions. Coefficients in balanced equations give mole ratios." },
      { title: "Limiting Reagent", description: "The reactant that gets completely consumed first, limiting the amount of product formed." },
      { title: "Concentration Terms", description: "Ways to express solution concentration: Molarity (mol/L), Molality (mol/kg solvent), Mole fraction, and percentage." },
      { title: "Empirical and Molecular Formula", description: "Empirical formula shows simplest whole number ratio of atoms. Molecular formula shows actual number of atoms." }
    ]),
    formulas: JSON.stringify([
      { name: "Number of Moles", formula: "n = Given mass / Molar mass", description: "Calculates moles from mass. Molar mass is atomic/molecular weight in grams." },
      { name: "Number of Particles", formula: "N = n × Nₐ", description: "Number of particles equals moles times Avogadro's number (6.022 × 10²³)." },
      { name: "Molarity", formula: "M = n / V(L)", description: "Moles of solute per liter of solution. Used for solution concentration." },
      { name: "Molality", formula: "m = n / W(kg)", description: "Moles of solute per kilogram of solvent. Temperature independent." },
      { name: "Mole Fraction", formula: "χₐ = nₐ / (nₐ + nᵦ)", description: "Ratio of moles of one component to total moles. Sum of all mole fractions = 1." },
      { name: "Percentage Composition", formula: "% = (Mass of element / Molar mass) × 100", description: "Mass percent of each element in a compound." },
      { name: "Dilution Formula", formula: "M₁V₁ = M₂V₂", description: "Moles remain constant during dilution. Use to calculate new concentration or volume." },
      { name: "Density Relation", formula: "d = M × Molar mass / 1000", description: "Relates density, molarity, and molar mass for pure substances." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 90
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 2,
    chapterTitle: "Structure of Atom",
    introduction: "Atoms are the building blocks of everything! This chapter takes you on a journey inside the atom, exploring its structure, the behavior of electrons, and the quantum mechanical model that explains how atoms really work.",
    detailedNotes: `# Structure of Atom

For centuries, people wondered: what is matter made of? The answer is atoms - incredibly tiny particles that make up everything in the universe!

## Discovery of Subatomic Particles

**1. Electron (J.J. Thomson, 1897)**
- Discovered through cathode ray experiments
- Negative charge: -1.6 × 10⁻¹⁹ C
- Mass: 9.1 × 10⁻³¹ kg

**💡 Did You Know?**
Thomson's "plum pudding model" imagined electrons scattered in a positive sphere like plums in a pudding!

**2. Proton (Goldstein, 1886 & Rutherford, 1919)**
- Positive charge equal in magnitude to electron
- Mass: 1.67 × 10⁻²⁷ kg (about 1836 times heavier than electron!)

**3. Neutron (Chadwick, 1932)**
- No charge (neutral)
- Mass slightly more than proton

## Atomic Models

**Thomson's Model (Plum Pudding)**
Electrons embedded in a positive sphere. Failed to explain scattering experiments.

**Rutherford's Nuclear Model**
- Most of atom is empty space
- Tiny, dense, positive nucleus at center
- Electrons orbit the nucleus

**⚠️ Common Mistake Alert!**
Rutherford's model couldn't explain why electrons don't spiral into the nucleus or why atoms emit specific colors of light.

## Bohr's Model

Niels Bohr improved Rutherford's model:
1. Electrons orbit in fixed circular paths called "orbits" or "shells"
2. Each orbit has fixed energy - electrons don't radiate energy in these orbits
3. Electrons can jump between orbits by absorbing or emitting energy

**🔑 Remember This!**
Energy is absorbed when electrons jump to higher orbits (excitation). Energy is released as light when they fall back (emission).

## Quantum Mechanical Model

The modern atomic model treats electrons as waves, not particles!

**Key Principles:**

**1. de Broglie Hypothesis**
All matter has wave properties: λ = h/mv

**2. Heisenberg's Uncertainty Principle**
You cannot know both position and momentum of an electron precisely at the same time: Δx × Δp ≥ h/4π

**3. Schrödinger's Wave Equation**
Describes electron behavior using wave functions (ψ). The probability of finding an electron is given by |ψ|².

## Quantum Numbers

Four numbers describe each electron:

**1. Principal Quantum Number (n)**
- Values: 1, 2, 3, 4...
- Determines shell and energy level

**2. Azimuthal Quantum Number (l)**
- Values: 0 to (n-1)
- Determines shape of orbital (s, p, d, f)

**3. Magnetic Quantum Number (mₗ)**
- Values: -l to +l
- Determines orientation of orbital

**4. Spin Quantum Number (mₛ)**
- Values: +½ or -½
- Determines spin direction

## Electronic Configuration

Rules for filling electrons:

**Aufbau Principle**: Fill lower energy orbitals first
**Pauli Exclusion Principle**: Maximum 2 electrons per orbital with opposite spins
**Hund's Rule**: Electrons occupy orbitals singly first before pairing

Order of filling: 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s...`,
    keyConcepts: JSON.stringify([
      { title: "Subatomic Particles", description: "Atoms contain electrons (negative, light), protons (positive, heavy), and neutrons (neutral, heavy). Protons and neutrons are in the nucleus." },
      { title: "Rutherford's Nuclear Model", description: "Atom has tiny, dense positive nucleus with electrons orbiting around it. Most of atom is empty space." },
      { title: "Bohr's Model", description: "Electrons orbit in fixed energy levels. They absorb/emit energy only when jumping between levels." },
      { title: "Quantum Mechanical Model", description: "Electrons behave as waves. Orbitals are regions of probability where electrons are likely to be found." },
      { title: "Quantum Numbers", description: "Four numbers (n, l, mₗ, mₛ) uniquely describe each electron's state, energy, shape, orientation, and spin." },
      { title: "Electronic Configuration", description: "The arrangement of electrons in orbitals following Aufbau, Pauli's exclusion, and Hund's rules." },
      { title: "Heisenberg's Uncertainty Principle", description: "It's impossible to simultaneously know exact position and momentum of an electron." }
    ]),
    formulas: JSON.stringify([
      { name: "de Broglie Wavelength", formula: "λ = h / mv", description: "All matter has wave nature. λ is wavelength, h is Planck's constant, m is mass, v is velocity." },
      { name: "Bohr's Radius", formula: "rₙ = 0.529 × n² / Z Å", description: "Radius of nth orbit. Increases with n², decreases with atomic number Z." },
      { name: "Energy of Orbit", formula: "Eₙ = -13.6 × Z² / n² eV", description: "Energy of electron in nth orbit. Negative sign indicates bound state." },
      { name: "Velocity in Orbit", formula: "vₙ = 2.18 × 10⁶ × Z / n m/s", description: "Speed of electron in nth Bohr orbit. Decreases as n increases." },
      { name: "Energy of Photon", formula: "E = hν = hc/λ", description: "Energy absorbed or emitted when electron jumps between levels." },
      { name: "Wave Number", formula: "ν̄ = R(1/n₁² - 1/n₂²)", description: "Rydberg formula for hydrogen spectrum. R = 1.097 × 10⁷ m⁻¹." },
      { name: "Uncertainty Principle", formula: "Δx × Δp ≥ h/4π", description: "Product of uncertainties in position and momentum has a minimum value." },
      { name: "Maximum Electrons", formula: "Max electrons in shell = 2n²", description: "Maximum electrons that can occupy the nth shell." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 3,
    chapterTitle: "States of Matter",
    introduction: "Why is ice solid, water liquid, and steam gas? This chapter explores the three states of matter, the forces between molecules, and the gas laws that help us predict how gases behave under different conditions.",
    detailedNotes: `# States of Matter

Matter exists in three main states: solid, liquid, and gas. The difference? How strongly the particles are held together!

## Intermolecular Forces

These are forces between molecules that determine physical properties:

**1. Dispersion Forces (London Forces)**
- Present in ALL molecules
- Caused by temporary dipoles
- Strength increases with molecular size

**2. Dipole-Dipole Forces**
- Between polar molecules
- Stronger than dispersion forces

**3. Hydrogen Bonding**
- Special strong dipole force
- H bonded to F, O, or N
- Explains why water has unusually high boiling point!

**💡 Did You Know?**
Without hydrogen bonding, water would boil at -80°C and life on Earth couldn't exist!

## The Gaseous State

Gases have unique properties:
- No fixed shape or volume
- Highly compressible
- Low density
- Particles move freely

## Gas Laws

**1. Boyle's Law** (constant T)
P₁V₁ = P₂V₂
Pressure and volume are inversely proportional

**2. Charles's Law** (constant P)
V₁/T₁ = V₂/T₂
Volume is directly proportional to temperature

**🔑 Remember This!**
Always use Kelvin temperature in gas law calculations! K = °C + 273

**3. Gay-Lussac's Law** (constant V)
P₁/T₁ = P₂/T₂
Pressure is directly proportional to temperature

**4. Avogadro's Law** (constant T, P)
V ∝ n
Equal volumes of gases contain equal moles

## Ideal Gas Equation

Combining all gas laws:
**PV = nRT**

Where R = 8.314 J/(mol·K) = 0.0821 L·atm/(mol·K)

**⚠️ Common Mistake Alert!**
Make sure your units match! Use R = 8.314 with SI units, R = 0.0821 with atm and liters.

## Real Gases

Real gases don't behave ideally because:
1. Molecules have actual volume
2. Molecules attract each other

**Van der Waals Equation** accounts for these:
(P + an²/V²)(V - nb) = nRT

- 'a' corrects for attractions
- 'b' corrects for molecular volume

## Kinetic Molecular Theory

Assumptions for ideal gases:
1. Gas molecules are point masses (no volume)
2. No intermolecular forces
3. Molecules in constant random motion
4. Collisions are perfectly elastic
5. Average kinetic energy ∝ Temperature

**Important Relations:**
- Average KE = (3/2)kT per molecule
- Root mean square velocity: u_rms = √(3RT/M)

## Critical Constants

At the **critical point**, liquid and gas become indistinguishable.
- Critical Temperature (Tc): Above this, gas can't be liquefied
- Critical Pressure (Pc): Pressure needed at Tc
- Critical Volume (Vc): Volume at critical point

## Liquid State

Properties between solids and gases:
- Fixed volume, no fixed shape
- Surface tension: Tendency to minimize surface area
- Viscosity: Resistance to flow
- Vapour pressure: Pressure of vapour in equilibrium with liquid`,
    keyConcepts: JSON.stringify([
      { title: "Intermolecular Forces", description: "Forces between molecules: dispersion (all molecules), dipole-dipole (polar molecules), and hydrogen bonding (H with F, O, N)." },
      { title: "Gas Laws", description: "Boyle's (P∝1/V), Charles's (V∝T), Gay-Lussac's (P∝T), and Avogadro's (V∝n) laws describe gas behavior." },
      { title: "Ideal Gas Equation", description: "PV = nRT combines all gas laws. R is the universal gas constant (8.314 J/mol·K)." },
      { title: "Real Gases", description: "Real gases deviate from ideal behavior due to molecular volume and attractions. Van der Waals equation corrects for these." },
      { title: "Kinetic Molecular Theory", description: "Gases consist of tiny particles in constant random motion. Average kinetic energy is proportional to temperature." },
      { title: "Critical Constants", description: "Critical temperature, pressure, and volume define the point where liquid and gas phases become identical." }
    ]),
    formulas: JSON.stringify([
      { name: "Ideal Gas Law", formula: "PV = nRT", description: "Relates pressure, volume, moles, and temperature. R = 8.314 J/(mol·K) or 0.0821 L·atm/(mol·K)." },
      { name: "Boyle's Law", formula: "P₁V₁ = P₂V₂", description: "At constant temperature, pressure and volume are inversely proportional." },
      { name: "Charles's Law", formula: "V₁/T₁ = V₂/T₂", description: "At constant pressure, volume is directly proportional to temperature (in Kelvin)." },
      { name: "Combined Gas Law", formula: "P₁V₁/T₁ = P₂V₂/T₂", description: "Combines Boyle's and Charles's laws for changing conditions." },
      { name: "Van der Waals Equation", formula: "(P + an²/V²)(V - nb) = nRT", description: "Modified gas law for real gases. 'a' corrects for attractions, 'b' for molecular volume." },
      { name: "RMS Velocity", formula: "u_rms = √(3RT/M)", description: "Root mean square velocity of gas molecules. M is molar mass in kg/mol." },
      { name: "Average Kinetic Energy", formula: "KE = (3/2)kT", description: "Average kinetic energy per molecule. k is Boltzmann constant (1.38 × 10⁻²³ J/K)." },
      { name: "Graham's Law", formula: "r₁/r₂ = √(M₂/M₁)", description: "Rate of diffusion/effusion is inversely proportional to square root of molar mass." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 100
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 4,
    chapterTitle: "Thermodynamics",
    introduction: "Energy makes the world go round! Thermodynamics studies energy changes in chemical reactions. You'll learn about heat, work, enthalpy, and whether reactions happen spontaneously or not.",
    detailedNotes: `# Thermodynamics

Thermodynamics is the study of energy transformations. It tells us about heat flow, work, and whether a reaction will happen spontaneously!

## Basic Concepts

**System**: The part of universe we're studying
**Surroundings**: Everything else
**Universe**: System + Surroundings

**Types of Systems:**
- **Open**: Exchanges both matter and energy
- **Closed**: Exchanges only energy
- **Isolated**: Exchanges neither

**💡 Did You Know?**
The term "thermodynamics" comes from Greek words meaning "heat" and "power"!

## State Functions vs Path Functions

**State Functions**: Depend only on initial and final states (U, H, S, G)
**Path Functions**: Depend on the path taken (q, w)

## First Law of Thermodynamics

Energy cannot be created or destroyed, only transformed!

**ΔU = q + w**

Where:
- ΔU = change in internal energy
- q = heat absorbed by system
- w = work done on system

**🔑 Remember This!**
Sign conventions: 
- Heat absorbed by system: q > 0
- Work done ON system: w > 0
- Work done BY system: w < 0 (w = -PΔV for expansion)

## Enthalpy (H)

Enthalpy is the heat content at constant pressure:
**H = U + PV**

At constant pressure: **ΔH = qₚ**

This is why we usually report ΔH for reactions - most happen at atmospheric pressure!

## Types of Reactions

**Exothermic**: Release heat (ΔH < 0)
- Products more stable than reactants
- Examples: combustion, neutralization

**Endothermic**: Absorb heat (ΔH > 0)
- Reactants more stable than products
- Examples: photosynthesis, melting ice

## Standard Enthalpy Changes

**ΔH°f** (Formation): Making 1 mole of compound from elements
**ΔH°c** (Combustion): Complete burning in O₂
**ΔH°atomization**: Breaking into gaseous atoms
**ΔH°solution**: Dissolving 1 mole of solute

## Hess's Law

**⚠️ Common Mistake Alert!**
Students often forget that if you reverse a reaction, you must change the sign of ΔH!

Enthalpy is a state function, so:
**ΔH_total = ΔH₁ + ΔH₂ + ΔH₃ + ...**

You can add reactions like algebra to find unknown ΔH values!

## Bond Enthalpy

Energy needed to break a bond:
**ΔH_reaction = Σ(Bond energies broken) - Σ(Bond energies formed)**

## Second Law & Entropy

**Entropy (S)**: Measure of disorder/randomness

For a spontaneous process in an isolated system:
**ΔS_universe > 0**

General trends:
- S(gas) > S(liquid) > S(solid)
- S increases with temperature
- S increases with number of particles

## Gibbs Free Energy

The ultimate criterion for spontaneity:
**ΔG = ΔH - TΔS**

- **ΔG < 0**: Spontaneous (feasible)
- **ΔG = 0**: At equilibrium
- **ΔG > 0**: Non-spontaneous

**🔑 Remember This!**
A reaction can be spontaneous even if it absorbs heat (endothermic) - as long as entropy increase is large enough!`,
    keyConcepts: JSON.stringify([
      { title: "System and Surroundings", description: "System is what we study; surroundings is everything else. Systems can be open, closed, or isolated." },
      { title: "First Law of Thermodynamics", description: "Energy is conserved. ΔU = q + w. Internal energy change equals heat plus work." },
      { title: "Enthalpy (H)", description: "Heat content at constant pressure. ΔH = qₚ. Negative for exothermic, positive for endothermic reactions." },
      { title: "Hess's Law", description: "Total enthalpy change is independent of path. We can add reactions to find unknown ΔH values." },
      { title: "Entropy (S)", description: "Measure of disorder. Natural processes tend toward increasing entropy of the universe." },
      { title: "Gibbs Free Energy", description: "ΔG = ΔH - TΔS determines spontaneity. Negative ΔG means spontaneous, positive means non-spontaneous." },
      { title: "Bond Enthalpy", description: "Energy to break bonds. Reaction ΔH = bonds broken - bonds formed." }
    ]),
    formulas: JSON.stringify([
      { name: "First Law", formula: "ΔU = q + w", description: "Internal energy change equals heat absorbed plus work done on system." },
      { name: "Enthalpy Definition", formula: "H = U + PV", description: "Enthalpy is internal energy plus pressure-volume work term." },
      { name: "Work (Expansion)", formula: "w = -PΔV", description: "Work done by gas during expansion against external pressure." },
      { name: "Gibbs Free Energy", formula: "ΔG = ΔH - TΔS", description: "Determines spontaneity. ΔG < 0 is spontaneous at temperature T." },
      { name: "Standard Free Energy", formula: "ΔG° = -RT ln K", description: "Relates standard free energy to equilibrium constant." },
      { name: "Hess's Law", formula: "ΔH_total = ΣΔH_steps", description: "Total enthalpy is sum of individual steps regardless of path." },
      { name: "Heat Capacity", formula: "q = mcΔT = CΔT", description: "Heat required to change temperature. c is specific heat, C is heat capacity." },
      { name: "Bond Enthalpy", formula: "ΔH = ΣBE(broken) - ΣBE(formed)", description: "Reaction enthalpy from bond energies." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 5,
    chapterTitle: "Equilibrium",
    introduction: "Reactions don't always go to completion - many reach a balance point called equilibrium. This chapter explores chemical equilibrium, Le Chatelier's principle, and acid-base chemistry including pH calculations.",
    detailedNotes: `# Equilibrium

Most reactions are reversible! At equilibrium, forward and reverse reactions occur at equal rates, so concentrations stay constant.

## Dynamic Equilibrium

At equilibrium:
- Both forward and reverse reactions continue
- Rate(forward) = Rate(reverse)
- Concentrations remain constant (not equal!)

**💡 Did You Know?**
Equilibrium is "dynamic" because reactions never stop - they just balance each other out!

## Equilibrium Constant (K)

For reaction: aA + bB ⇌ cC + dD

**Kc = [C]^c[D]^d / [A]^a[B]^b**

**Kp = (PC)^c(PD)^d / (PA)^a(PB)^b**

Relationship: **Kp = Kc(RT)^Δn**
Where Δn = (c + d) - (a + b)

**⚠️ Common Mistake Alert!**
Pure solids and liquids don't appear in equilibrium expressions - their concentrations are constant!

## Le Chatelier's Principle

When a system at equilibrium is disturbed, it shifts to minimize the disturbance.

**Effects of changes:**

| Change | Effect on Equilibrium |
|--------|----------------------|
| Add reactant | Shifts right |
| Add product | Shifts left |
| Increase pressure | Shifts to fewer moles of gas |
| Increase temp (exo) | Shifts left |
| Increase temp (endo) | Shifts right |

**🔑 Remember This!**
Catalyst speeds up both forward and reverse reactions equally - it doesn't change the equilibrium position!

## Reaction Quotient (Q)

Same formula as K, but for any point in reaction:
- Q < K: Reaction proceeds forward
- Q = K: At equilibrium
- Q > K: Reaction proceeds backward

## Ionic Equilibrium

When weak electrolytes dissolve, equilibrium is established.

**Weak Acids**: HA ⇌ H⁺ + A⁻
Ka = [H⁺][A⁻]/[HA]

**Weak Bases**: BOH ⇌ B⁺ + OH⁻
Kb = [B⁺][OH⁻]/[BOH]

**Water Ionization**: 
Kw = [H⁺][OH⁻] = 10⁻¹⁴ at 25°C

## pH Scale

pH = -log[H⁺]
pOH = -log[OH⁻]

**pH + pOH = 14** (at 25°C)

| pH | Nature |
|----|--------|
| < 7 | Acidic |
| = 7 | Neutral |
| > 7 | Basic |

## Buffer Solutions

Buffers resist pH changes when small amounts of acid or base are added.

**Acidic Buffer**: Weak acid + its salt (e.g., CH₃COOH + CH₃COONa)
**Henderson equation**: pH = pKa + log([salt]/[acid])

**Basic Buffer**: Weak base + its salt (e.g., NH₄OH + NH₄Cl)
**Henderson equation**: pOH = pKb + log([salt]/[base])

## Solubility Equilibrium

For sparingly soluble salts:
**Ksp = Solubility Product**

For AxBy: Ksp = [A⁺]^x[B⁻]^y

Precipitation occurs when: **Ionic Product > Ksp**

## Common Ion Effect

Adding a common ion decreases solubility of a salt.
Example: Adding NaCl decreases AgCl solubility because Cl⁻ is common.`,
    keyConcepts: JSON.stringify([
      { title: "Dynamic Equilibrium", description: "At equilibrium, forward and reverse reaction rates are equal. Concentrations remain constant but reactions continue." },
      { title: "Equilibrium Constant (K)", description: "Kc uses concentrations, Kp uses partial pressures. Large K means products favored, small K means reactants favored." },
      { title: "Le Chatelier's Principle", description: "A system at equilibrium will shift to counteract any applied stress (concentration, pressure, or temperature change)." },
      { title: "pH and pOH", description: "pH = -log[H⁺], pOH = -log[OH⁻]. At 25°C, pH + pOH = 14. pH < 7 is acidic, > 7 is basic." },
      { title: "Buffer Solutions", description: "Resist pH changes. Made from weak acid/conjugate base or weak base/conjugate acid pairs." },
      { title: "Solubility Product (Ksp)", description: "Equilibrium constant for dissolution of sparingly soluble salts. Used to predict precipitation." },
      { title: "Common Ion Effect", description: "Adding an ion already present in solution decreases solubility of related salts." }
    ]),
    formulas: JSON.stringify([
      { name: "Equilibrium Constant", formula: "Kc = [Products]^coefficients / [Reactants]^coefficients", description: "Ratio of product to reactant concentrations at equilibrium, each raised to its coefficient." },
      { name: "Kp and Kc Relation", formula: "Kp = Kc(RT)^Δn", description: "Relates Kp and Kc. Δn = moles of gaseous products - moles of gaseous reactants." },
      { name: "pH Calculation", formula: "pH = -log[H⁺]", description: "Measures hydrogen ion concentration. Lower pH = more acidic." },
      { name: "Henderson-Hasselbalch", formula: "pH = pKa + log([A⁻]/[HA])", description: "Calculates pH of buffer solutions from acid dissociation constant and concentrations." },
      { name: "Ionic Product of Water", formula: "Kw = [H⁺][OH⁻] = 10⁻¹⁴", description: "At 25°C, product of hydrogen and hydroxide ion concentrations is constant." },
      { name: "Degree of Dissociation", formula: "α = √(Ka/c) for weak acids", description: "Fraction of molecules that dissociate. Valid when α << 1." },
      { name: "Solubility Product", formula: "Ksp = [cation]^x[anion]^y", description: "For salt MₓAᵧ, product of ion concentrations at saturation." },
      { name: "pKa + pKb", formula: "pKa + pKb = pKw = 14", description: "For conjugate acid-base pair at 25°C." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 130
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 6,
    chapterTitle: "Redox Reactions",
    introduction: "Rusting, burning, and batteries all involve electron transfer! This chapter covers oxidation-reduction reactions, oxidation numbers, and how to balance complex redox equations.",
    detailedNotes: `# Redox Reactions

Redox reactions involve transfer of electrons between species. They're fundamental to batteries, corrosion, metabolism, and countless industrial processes!

## Basic Concepts

**Oxidation**: Loss of electrons (LEO - Lose Electrons = Oxidation)
**Reduction**: Gain of electrons (GER - Gain Electrons = Reduction)

**💡 Did You Know?**
The term "oxidation" originally meant combination with oxygen, but now it means any electron loss!

**Oxidizing Agent (Oxidant)**: Gets reduced, causes oxidation
**Reducing Agent (Reductant)**: Gets oxidized, causes reduction

**🔑 Remember This!**
"OIL RIG" - Oxidation Is Loss, Reduction Is Gain (of electrons)

## Oxidation Number (State)

Oxidation number is the hypothetical charge an atom would have if all bonds were ionic.

**Rules for assigning oxidation numbers:**
1. Free elements: 0 (Na, O₂, P₄)
2. Monoatomic ions: Same as charge
3. Hydrogen: Usually +1 (except metal hydrides: -1)
4. Oxygen: Usually -2 (except peroxides: -1, OF₂: +2)
5. Halogens: Usually -1 (except with O or more electronegative halogen)
6. Sum in neutral molecule = 0
7. Sum in ion = charge of ion

**⚠️ Common Mistake Alert!**
In H₂O₂, oxygen is -1, not -2! Watch for peroxides and superoxides.

## Types of Redox Reactions

**1. Combination Reactions**
A + B → AB
Example: 2Mg + O₂ → 2MgO

**2. Decomposition Reactions**
AB → A + B
Example: 2H₂O → 2H₂ + O₂

**3. Displacement Reactions**
A + BC → AC + B
Example: Zn + CuSO₄ → ZnSO₄ + Cu

**4. Disproportionation Reactions**
Same element is both oxidized and reduced
Example: 2H₂O₂ → 2H₂O + O₂
(O goes from -1 to both -2 and 0)

**5. Comproportionation**
Opposite of disproportionation
Example: 5S²⁻ + 2SO₄²⁻ + 12H⁺ → 8S + 6H₂O

## Balancing Redox Equations

**Ion-Electron Method (Half-Reaction Method):**

1. Identify oxidation and reduction half-reactions
2. Balance atoms other than O and H
3. Balance O by adding H₂O
4. Balance H by adding H⁺ (acidic) or OH⁻ (basic)
5. Balance charges by adding electrons
6. Multiply half-reactions to equalize electrons
7. Add half-reactions and simplify

**Example: In acidic solution**
MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺

Oxidation: Fe²⁺ → Fe³⁺ + e⁻ (×5)
Reduction: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O

Result: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O

## Electrochemical Series

Metals arranged by their tendency to lose electrons:
- K, Na, Mg, Al, Zn, Fe, Ni, Sn, Pb, H, Cu, Hg, Ag, Au
- More reactive metals at top can displace less reactive ones below

## Redox Titrations

Used to determine concentration of oxidizing/reducing agents.

Common examples:
- Permanganate titrations (KMnO₄)
- Dichromate titrations (K₂Cr₂O₇)
- Iodometric titrations

## n-factor

Number of electrons transferred per molecule in a redox reaction.
- For acids: Number of H⁺ donated
- For bases: Number of OH⁻ accepted
- For redox: Change in oxidation number × atoms`,
    keyConcepts: JSON.stringify([
      { title: "Oxidation and Reduction", description: "Oxidation is loss of electrons (increase in oxidation number). Reduction is gain of electrons (decrease in oxidation number)." },
      { title: "Oxidation Number Rules", description: "Systematic rules to assign hypothetical charges to atoms. Free elements are 0, H is usually +1, O is usually -2." },
      { title: "Oxidizing and Reducing Agents", description: "Oxidizing agent gets reduced (accepts electrons). Reducing agent gets oxidized (donates electrons)." },
      { title: "Types of Redox Reactions", description: "Combination, decomposition, displacement, disproportionation (same element oxidized and reduced), comproportionation." },
      { title: "Half-Reaction Method", description: "Balance redox equations by separating into oxidation and reduction half-reactions, then combining." },
      { title: "Electrochemical Series", description: "Ranking of elements by their tendency to lose electrons. More reactive metals displace less reactive ones." }
    ]),
    formulas: JSON.stringify([
      { name: "n-factor (Redox)", formula: "n = |Change in oxidation number| × atoms", description: "Equivalent factor for redox reactions based on electron transfer." },
      { name: "Equivalents", formula: "Equivalents = moles × n-factor", description: "Number of equivalents = moles multiplied by n-factor." },
      { name: "Normality", formula: "N = n × M", description: "Normality equals n-factor times molarity." },
      { name: "Titration Formula", formula: "N₁V₁ = N₂V₂", description: "At equivalence point, equivalents of oxidant equal equivalents of reductant." },
      { name: "Oxidation Number Change", formula: "Electrons transferred = Δ(oxidation number)", description: "Electrons lost/gained equals change in oxidation number." },
      { name: "Electron Balance", formula: "e⁻ lost = e⁻ gained", description: "In any redox reaction, total electrons lost equals total electrons gained." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 90
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 7,
    chapterTitle: "Chemical Kinetics",
    introduction: "Some reactions happen in a flash, others take years. Chemical kinetics studies how fast reactions occur, what factors affect the rate, and the step-by-step pathway reactions follow.",
    detailedNotes: `# Chemical Kinetics

Chemical kinetics is the study of reaction rates - how fast reactions happen and why. Understanding kinetics helps us control reactions in industry and understand processes in nature!

## Rate of Reaction

Rate measures how quickly reactants are consumed or products form.

**Average Rate** = Δ[concentration] / Δtime

For reaction: aA → bB
Rate = -(1/a)(Δ[A]/Δt) = (1/b)(Δ[B]/Δt)

**💡 Did You Know?**
The rusting of iron is a slow reaction taking months, while explosions happen in microseconds!

**Instantaneous Rate**: Rate at a specific moment (slope of tangent on concentration-time graph)

## Factors Affecting Rate

**1. Concentration**
- Higher concentration → more collisions → faster rate

**2. Temperature**
- Higher temperature → more energetic collisions
- Generally, rate doubles for every 10°C rise

**3. Surface Area**
- Greater surface area → more collisions → faster rate

**4. Catalyst**
- Lowers activation energy → faster rate
- Not consumed in reaction

**5. Nature of Reactants**
- Ionic reactions are usually fast
- Covalent reactions involving bond breaking are slower

## Rate Law and Order

**Rate Law**: Rate = k[A]^m[B]^n

Where:
- k = rate constant
- m, n = orders (found experimentally!)
- Overall order = m + n

**⚠️ Common Mistake Alert!**
Order is NOT the same as stoichiometric coefficient! Order must be determined experimentally.

**🔑 Remember This!**
Order can be 0, 1, 2, or even fractional. It tells us how the rate depends on concentration.

## Integrated Rate Equations

**Zero Order**: [A] = [A]₀ - kt
Half-life: t₁/₂ = [A]₀/2k

**First Order**: ln[A] = ln[A]₀ - kt
Half-life: t₁/₂ = 0.693/k (constant!)

**Second Order**: 1/[A] = 1/[A]₀ + kt
Half-life: t₁/₂ = 1/(k[A]₀)

## Collision Theory

For reaction to occur:
1. Molecules must collide
2. With sufficient energy (≥ activation energy)
3. With proper orientation

**Activation Energy (Ea)**: Minimum energy needed for reaction

## Arrhenius Equation

**k = Ae^(-Ea/RT)**

Or in logarithmic form:
**ln k = ln A - Ea/RT**

Where:
- A = pre-exponential factor (frequency factor)
- Ea = activation energy
- R = gas constant
- T = temperature (K)

**Finding Ea**: Plot ln k vs 1/T
Slope = -Ea/R

## Temperature Dependence

**Temperature Coefficient** = Rate at (T+10) / Rate at T ≈ 2-3

**Two-point form**:
ln(k₂/k₁) = (Ea/R)(1/T₁ - 1/T₂)

## Reaction Mechanism

Mechanism = sequence of elementary steps

**Molecularity**: Number of molecules in an elementary step
- Unimolecular: 1 molecule
- Bimolecular: 2 molecules
- Termolecular: 3 molecules (rare)

**Rate-Determining Step**: Slowest step controls overall rate

## Catalysis

**Homogeneous**: Catalyst in same phase as reactants
**Heterogeneous**: Catalyst in different phase

Catalysts:
- Lower activation energy
- Provide alternative pathway
- Are regenerated at the end
- Don't change equilibrium position`,
    keyConcepts: JSON.stringify([
      { title: "Rate of Reaction", description: "Change in concentration per unit time. Expressed as decrease of reactants or increase of products." },
      { title: "Factors Affecting Rate", description: "Concentration, temperature, surface area, catalyst, and nature of reactants all influence reaction speed." },
      { title: "Rate Law and Order", description: "Rate = k[A]^m[B]^n. Order is determined experimentally, not from coefficients. Overall order = sum of individual orders." },
      { title: "Integrated Rate Laws", description: "Zero order: linear [A] vs t. First order: linear ln[A] vs t. Second order: linear 1/[A] vs t." },
      { title: "Activation Energy", description: "Minimum energy needed for reaction. Collisions with E ≥ Ea lead to products." },
      { title: "Arrhenius Equation", description: "k = Ae^(-Ea/RT) relates rate constant to temperature. Higher T means larger k." },
      { title: "Reaction Mechanism", description: "Sequence of elementary steps. Slowest step is rate-determining. Molecularity is number of molecules in elementary step." }
    ]),
    formulas: JSON.stringify([
      { name: "Rate Law", formula: "Rate = k[A]^m[B]^n", description: "Rate depends on concentration raised to experimentally determined orders." },
      { name: "First Order Rate", formula: "ln[A] = ln[A]₀ - kt", description: "For first order, plot of ln[A] vs t is linear with slope -k." },
      { name: "First Order Half-Life", formula: "t₁/₂ = 0.693/k", description: "Half-life is constant for first order reactions, independent of initial concentration." },
      { name: "Arrhenius Equation", formula: "k = Ae^(-Ea/RT)", description: "Rate constant depends exponentially on temperature. A is frequency factor, Ea is activation energy." },
      { name: "Two-Point Form", formula: "ln(k₂/k₁) = (Ea/R)(1/T₁ - 1/T₂)", description: "Calculate Ea from rate constants at two temperatures." },
      { name: "Zero Order Half-Life", formula: "t₁/₂ = [A]₀/2k", description: "Half-life depends on initial concentration for zero order reactions." },
      { name: "Second Order Half-Life", formula: "t₁/₂ = 1/(k[A]₀)", description: "Half-life is inversely proportional to initial concentration for second order." },
      { name: "Temperature Coefficient", formula: "Rate ratio = k(T+10)/k(T) ≈ 2-3", description: "Rate approximately doubles for every 10°C temperature increase." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 110
  }
];

export async function seedPhysicalChemistryClass11() {
  console.log("Seeding Physical Chemistry Class 11 chapters...");
  
  for (const chapter of physicalChemistryClass11Chapters) {
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
  
  console.log("Physical Chemistry Class 11 seeding complete!");
}
