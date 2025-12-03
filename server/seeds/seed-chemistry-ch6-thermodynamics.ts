import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedChemistryChapter6() {
  console.log('🧪 Seeding Chemistry Class 11 Chapter 6: Thermodynamics...');

  const chapter = {
    subject: 'Chemistry',
    classLevel: '11',
    chapterNumber: 6,
    chapterTitle: 'Thermodynamics',
    introduction: `Thermodynamics is the branch of science that deals with the study of different forms of energy and their interconversion. Chemical thermodynamics is the study of heat and energy changes accompanying chemical reactions and physical transformations. This chapter introduces fundamental concepts including system and surroundings, state functions, internal energy, enthalpy, entropy, and Gibbs free energy. Understanding thermodynamics is crucial for predicting whether a reaction will occur spontaneously and for calculating energy changes in chemical processes. The laws of thermodynamics govern all energy transformations in the universe, from simple phase changes to complex biochemical reactions.`,

    detailedNotes: `## System and Surroundings

In thermodynamics, we divide the universe into two parts: the **system** (the part we're studying) and the **surroundings** (everything else). Systems can be classified based on the exchange of matter and energy:

**Types of Systems:**
- **Open System**: Can exchange both energy and matter with surroundings (e.g., open beaker)
- **Closed System**: Can exchange energy but not matter (e.g., sealed flask)
- **Isolated System**: Cannot exchange energy or matter (e.g., perfect thermos flask)

## State Functions and Path Functions

**State Functions** depend only on the initial and final states, not on the path taken. Examples include:
- Internal energy (U)
- Enthalpy (H)
- Entropy (S)
- Gibbs free energy (G)
- Pressure (P)
- Temperature (T)
- Volume (V)

**Path Functions** depend on the path taken between states. Examples include:
- Heat (q)
- Work (w)

## Internal Energy (U)

Internal energy is the total energy contained within a system, including kinetic and potential energies of all particles. According to the **First Law of Thermodynamics**:

**ΔU = q + w**

Where:
- ΔU = change in internal energy
- q = heat absorbed by the system
- w = work done on the system

**Sign Conventions:**
- q is positive when heat is absorbed (endothermic)
- q is negative when heat is released (exothermic)
- w is positive when work is done on the system
- w is negative when work is done by the system

For expansion against constant external pressure:
**w = -PₑₓₜΔV**

## Enthalpy (H)

Enthalpy is a thermodynamic function defined as:
**H = U + PV**

For constant pressure processes (most common in chemistry):
**ΔH = qₚ** (heat absorbed at constant pressure)

**Types of Enthalpy Changes:**

1. **Enthalpy of Formation (ΔₜH°)**: Heat change when one mole of a compound is formed from its elements in standard states

2. **Enthalpy of Combustion (ΔcH°)**: Heat released when one mole of substance undergoes complete combustion

3. **Enthalpy of Neutralization (ΔneutH°)**: Heat change when one equivalent of acid neutralizes one equivalent of base

4. **Enthalpy of Solution (ΔsolH°)**: Heat change when one mole of solute dissolves in excess solvent

5. **Enthalpy of Atomization (ΔₐH°)**: Heat required to break one mole of substance into gaseous atoms

6. **Bond Enthalpy (ΔbondH°)**: Energy required to break one mole of bonds in gaseous state

## Hess's Law

**Hess's Law** states that the total enthalpy change for a reaction is independent of the pathway taken. This allows us to calculate enthalpy changes for reactions that are difficult to measure directly.

**Applications:**
- Calculate enthalpy of formation from combustion data
- Determine bond energies
- Find enthalpy changes for multi-step reactions

**Example Calculation:**
If we know: C(s) + O₂(g) → CO₂(g), ΔH = -393.5 kJ
And: 2CO(g) + O₂(g) → 2CO₂(g), ΔH = -566 kJ

We can calculate: C(s) + ½O₂(g) → CO(g)
By manipulating and combining equations: ΔH = -110.5 kJ

## Born-Haber Cycle

The **Born-Haber cycle** is an application of Hess's Law to determine lattice enthalpy of ionic compounds. It involves:
1. Sublimation of metal
2. Ionization of metal atoms
3. Dissociation of non-metal molecules
4. Electron affinity of non-metal
5. Lattice formation

## Entropy (S)

Entropy is a measure of randomness or disorder in a system. It is a state function with units of J K⁻¹ mol⁻¹.

**Second Law of Thermodynamics:**
For a spontaneous process, the total entropy of the universe increases:
**ΔSₜₒₜₐₗ = ΔSₛᵧₛₜₑₘ + ΔSₛᵤᵣᵣₒᵤₙ��ᵢₙ�� > 0**

**Entropy Changes:**
- Solid → Liquid → Gas: entropy increases
- Dissolution: usually increases entropy
- Increasing temperature: increases entropy
- Increasing number of particles: increases entropy

**Standard Molar Entropy (S°):**
Absolute entropy of one mole of substance at 298 K and 1 bar pressure.

**Entropy Change Calculation:**
ΔS° = Σ S°(products) - Σ S°(reactants)

## Gibbs Free Energy (G)

Gibbs free energy determines spontaneity of processes at constant temperature and pressure:
**G = H - TS**

**Gibbs Free Energy Change:**
**ΔG = ΔH - TΔS**

**Spontaneity Criteria:**
- ΔG < 0: Spontaneous (favorable)
- ΔG = 0: Equilibrium
- ΔG > 0: Non-spontaneous (unfavorable)

**Standard Free Energy Change:**
**ΔG° = ΔH° - TΔS°**

Also related to equilibrium constant:
**ΔG° = -RT ln K**

Where R = 8.314 J K⁻¹ mol⁻¹

## Thermodynamic Calculations

**Example 1: Predicting Spontaneity**
For the reaction: N₂(g) + 3H₂(g) → 2NH₃(g)
ΔH° = -92.4 kJ, ΔS° = -198.3 J/K

At 298 K:
ΔG° = ΔH° - TΔS° = -92,400 - (298)(-198.3) = -33,290 J = -33.3 kJ

Since ΔG° < 0, the reaction is spontaneous at 298 K.

**Example 2: Temperature Effects**
A reaction with ΔH° = +50 kJ and ΔS° = +150 J/K

At low T: ΔG > 0 (non-spontaneous)
At high T: ΔG < 0 (spontaneous)

Critical temperature: T = ΔH/ΔS = 50,000/150 = 333 K

**Example 3: Calculating Equilibrium Constant**
If ΔG° = -20 kJ at 298 K:
K = e^(-ΔG°/RT) = e^(20,000/(8.314×298)) = e^8.07 = 3200

## Third Law of Thermodynamics

The **Third Law** states that the entropy of a perfect crystal at absolute zero (0 K) is zero. This allows us to determine absolute entropies.

**Implications:**
- Provides reference point for entropy measurements
- Absolute zero is unattainable
- Helps calculate standard molar entropies

## Practical Applications

**Industrial Processes:**
- Haber process (ammonia synthesis): optimizing temperature and pressure
- Contact process (sulfuric acid): balancing yield and rate
- Metallurgy: predicting reduction reactions

**Biological Systems:**
- ATP hydrolysis (ΔG° = -30.5 kJ/mol) drives biochemical reactions
- Protein folding driven by entropy changes
- Photosynthesis: energy storage in glucose

**Environmental Chemistry:**
- Greenhouse effect: thermodynamics of atmospheric processes
- Pollution control: spontaneity of decomposition reactions
- Climate change: energy balance of Earth's atmosphere`,

    keyConcepts: [
      'System, surroundings, and types of thermodynamic systems',
      'State functions vs path functions',
      'First Law: ΔU = q + w (conservation of energy)',
      'Internal energy and work-heat relationship',
      'Enthalpy (H = U + PV) and various types of enthalpy changes',
      'Hess\'s Law and its applications',
      'Born-Haber cycle for lattice enthalpy',
      'Entropy as measure of disorder (Second Law)',
      'Gibbs free energy and spontaneity criteria',
      'Relationship between ΔG°, K, and temperature',
      'Third Law: S = 0 at absolute zero for perfect crystals'
    ],

    formulas: [
      'ΔU = q + w',
      'w = -PₑₓₜΔV',
      'H = U + PV',
      'ΔH = qₚ',
      'ΔS° = Σ S°(products) - Σ S°(reactants)',
      'G = H - TS',
      'ΔG = ΔH - TΔS',
      'ΔG° = -RT ln K',
      'ΔG° = ΔH° - TΔS°',
      'Cᵥ = (∂U/∂T)ᵥ',
      'Cₚ = (∂H/∂T)ₚ',
      'Cₚ - Cᵥ = R'
    ],

    learningObjectives: [
      'Understand the concepts of system, surroundings, and types of thermodynamic systems',
      'Distinguish between state functions and path functions',
      'Apply the First Law of Thermodynamics to calculate energy changes',
      'Define and calculate various types of enthalpy changes',
      'Apply Hess\'s Law to determine enthalpy changes for complex reactions',
      'Understand entropy as a measure of disorder and apply the Second Law',
      'Calculate Gibbs free energy changes and predict reaction spontaneity',
      'Relate free energy to equilibrium constant and temperature',
      'Solve numerical problems involving thermodynamic calculations'
    ],

    prerequisites: [
      'Basic concepts of chemistry (Chapter 1)',
      'Chemical bonding and molecular structure (Chapter 4)',
      'States of matter (Chapter 5)',
      'Understanding of energy, heat, and temperature',
      'Basic calculus for understanding derivatives (partial derivatives)',
      'Familiarity with logarithms and exponential functions'
    ],

    importantTopics: [
      'Sign conventions for heat and work',
      'Different types of enthalpy changes and their applications',
      'Hess\'s Law calculations and energy cycles',
      'Entropy changes in phase transitions',
      'Gibbs free energy and spontaneity prediction',
      'Temperature dependence of spontaneity',
      'Relationship between ΔG° and equilibrium constant',
      'Applications to industrial and biological processes'
    ],

    ncertChapterRef: 'Chapter 6, Pages 158-191',

    difficultyLevel: 5,
    estimatedStudyMinutes: 360,
    status: 'published' as const,

    visualizationsData: [
      {
        type: 'concept',
        title: 'Enthalpy Diagram',
        description: 'Energy level diagram showing enthalpy changes in exothermic and endothermic reactions'
      },
      {
        type: 'concept',
        title: 'Born-Haber Cycle',
        description: 'Cyclic energy diagram for calculating lattice enthalpy of ionic compounds'
      },
      {
        type: 'concept',
        title: 'Gibbs Free Energy vs Temperature',
        description: 'Graph showing how spontaneity changes with temperature for different ΔH and ΔS combinations'
      }
    ]
  };

  await db.insert(chapterContent)
    .values(chapter)
    .onConflictDoUpdate({
      target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
      set: chapter
    });

  console.log('✅ Chemistry Chapter 6: Thermodynamics seeded successfully');
}

seedChemistryChapter6()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
