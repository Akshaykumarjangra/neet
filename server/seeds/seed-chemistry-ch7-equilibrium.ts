import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedChemistryChapter7() {
  console.log('🧪 Seeding Chemistry Class 11 Chapter 7: Equilibrium...');

  const chapter = {
    subject: 'Chemistry',
    classLevel: '11',
    chapterNumber: 7,
    chapterTitle: 'Equilibrium',
    introduction: `Chemical equilibrium is a dynamic state in which the rate of forward reaction equals the rate of backward reaction, resulting in no net change in concentrations. This chapter explores reversible reactions, equilibrium constants, Le Chatelier's principle, and various applications of equilibrium concepts. Understanding equilibrium is fundamental to predicting the direction and extent of chemical reactions, optimizing industrial processes, and comprehending biological systems. Equilibrium principles apply to gaseous, aqueous, and heterogeneous systems, making them essential for both theoretical chemistry and practical applications.`,

    detailedNotes: `## Reversible Reactions and Equilibrium

A **reversible reaction** is one that can proceed in both forward and backward directions:
**A + B ⇌ C + D**

At **chemical equilibrium**:
- Forward rate = Backward rate
- Concentrations remain constant (not equal!)
- It's a dynamic equilibrium (reactions continue but with no net change)
- Can be approached from either direction

## Equilibrium Constant (Kc)

For the general reaction: **aA + bB ⇌ cC + dD**

The equilibrium constant expression is:
**Kc = [C]^c[D]^d / [A]^a[B]^b**

Where:
- [X] represents molar concentration at equilibrium
- Exponents are stoichiometric coefficients
- Kc is constant at a given temperature
- Units depend on the reaction

**Important Points:**
- Large Kc (> 10³): Products favored, reaction proceeds nearly to completion
- Small Kc (< 10⁻³): Reactants favored, very little product formation
- Kc ≈ 1: Significant amounts of both reactants and products

**Pure Solids and Liquids:**
Their concentrations are not included in Kc expressions as they remain constant.

## Equilibrium Constant (Kp) for Gases

For gaseous reactions, we use partial pressures:
**Kp = (Pc)^c(Pd)^d / (Pa)^a(Pb)^b**

**Relationship between Kp and Kc:**
**Kp = Kc(RT)^Δn**

Where:
- R = 0.0821 L atm K⁻¹ mol⁻¹
- T = Temperature in Kelvin
- Δn = (sum of moles of gaseous products) - (sum of moles of gaseous reactants)

**Special Cases:**
- If Δn = 0: Kp = Kc
- For reactions with no gaseous components: use Kc only

## Types of Equilibria

### 1. Homogeneous Equilibrium
All reactants and products in same phase.

**Example (gaseous):**
N₂(g) + 3H₂(g) ⇌ 2NH₃(g)
Kp = (PNH₃)² / (PN₂)(PH₂)³

**Example (aqueous):**
CH₃COOH(aq) + H₂O(l) ⇌ CH₃COO⁻(aq) + H₃O⁺(aq)
Kc = [CH₃COO⁻][H₃O⁺] / [CH₃COOH]

### 2. Heterogeneous Equilibrium
Reactants and products in different phases.

**Example:**
CaCO₃(s) ⇌ CaO(s) + CO₂(g)
Kp = PCO₂ (solids omitted)

## Reaction Quotient (Q)

The **reaction quotient (Q)** has the same form as K but uses current concentrations (not equilibrium values).

**Predicting Direction:**
- If Q < K: Reaction proceeds forward (→)
- If Q = K: System at equilibrium
- If Q > K: Reaction proceeds backward (←)

**Example:**
For H₂(g) + I₂(g) ⇌ 2HI(g), if Kc = 54.8 at 700 K
If [H₂] = 0.2 M, [I₂] = 0.3 M, [HI] = 0.8 M

Q = (0.8)² / (0.2)(0.3) = 10.67

Since Q < K, reaction moves forward to produce more HI.

## Le Chatelier's Principle

When a system at equilibrium is disturbed, it shifts to counteract the disturbance and establish a new equilibrium.

### Effect of Concentration Changes
- **Adding reactant or removing product**: Shifts forward →
- **Removing reactant or adding product**: Shifts backward ←
- **Inert gas addition (constant volume)**: No effect on equilibrium

### Effect of Pressure Changes (Gaseous Systems)
- **Increasing pressure**: Shifts to side with fewer moles of gas
- **Decreasing pressure**: Shifts to side with more moles of gas
- **If equal moles on both sides**: Pressure has no effect

**Example:**
N₂(g) + 3H₂(g) ⇌ 2NH₃(g)
Left: 4 moles gas, Right: 2 moles gas
Increasing pressure shifts right (favors NH₃ formation)

### Effect of Temperature Changes
- **Endothermic reaction (ΔH > 0)**: 
  - Increasing T shifts forward, K increases
  - Decreasing T shifts backward, K decreases
- **Exothermic reaction (ΔH < 0)**:
  - Increasing T shifts backward, K decreases
  - Decreasing T shifts forward, K increases

**Temperature is the ONLY factor that changes K value!**

### Effect of Catalyst
- Catalyst speeds up both forward and backward reactions equally
- Equilibrium reached faster but position unchanged
- K value unchanged

## Applications of Equilibrium

### 1. Haber Process (Ammonia Synthesis)
N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = -92.4 kJ

**Optimization:**
- High pressure (200 atm): Favors products (fewer moles)
- Moderate temperature (450°C): Balance between yield and rate
- Iron catalyst: Speeds up reaction
- Remove NH₃: Shifts equilibrium forward

### 2. Contact Process (Sulfuric Acid)
2SO₂(g) + O₂(g) ⇌ 2SO₃(g), ΔH = -197 kJ

**Optimization:**
- High pressure: Favors SO₃ (fewer moles)
- Moderate temperature (450°C): Balance yield and rate
- V₂O₅ catalyst: Increases rate

### 3. Dissolution of Salts
AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq)
Ksp = [Ag⁺][Cl⁻] = 1.8 × 10⁻¹⁰

Common ion effect reduces solubility.

## Ionic Equilibrium in Solutions

### 1. Acid-Base Equilibria
**Weak Acid:**
HA(aq) + H₂O(l) ⇌ H₃O⁺(aq) + A⁻(aq)
Ka = [H₃O⁺][A⁻] / [HA]

**Weak Base:**
B(aq) + H₂O(l) ⇌ BH⁺(aq) + OH⁻(aq)
Kb = [BH⁺][OH⁻] / [B]

**Relation:** Ka × Kb = Kw = 1.0 × 10⁻¹⁴ at 25°C

### 2. pH and pOH
**pH = -log[H⁺]**
**pOH = -log[OH⁻]**
**pH + pOH = 14 (at 25°C)**

**Henderson-Hasselbalch Equation (Buffer Solutions):**
**pH = pKa + log([A⁻]/[HA])**

### 3. Common Ion Effect
Addition of a common ion shifts equilibrium and reduces solubility.

**Example:**
AgCl dissolves less in NaCl solution than in pure water.

### 4. Buffer Solutions
Resist pH change when small amounts of acid or base are added.

**Composition:**
- Weak acid + its salt (CH₃COOH + CH₃COONa)
- Weak base + its salt (NH₄OH + NH₄Cl)

**Buffer Capacity:** Maximum amount of acid/base a buffer can neutralize.

## Solubility Equilibria

### Solubility Product (Ksp)
For sparingly soluble salt AxBy:
AxBy(s) ⇌ xA^n+(aq) + yB^m-(aq)
Ksp = [A^n+]^x[B^m-]^y

**Precipitation Criteria:**
- If ionic product > Ksp: Precipitation occurs
- If ionic product = Ksp: Saturated solution
- If ionic product < Ksp: Unsaturated, more can dissolve

**Example:**
For Ag₂CrO₄: Ksp = [Ag⁺]²[CrO₄²⁻] = 1.1 × 10⁻¹²

## Numerical Problem Solving

### Example 1: Calculating Kc
For H₂(g) + I₂(g) ⇌ 2HI(g)
At equilibrium: [H₂] = 0.08 M, [I₂] = 0.06 M, [HI] = 0.50 M

Kc = [HI]² / ([H₂][I₂]) = (0.50)² / (0.08)(0.06) = 52.1

### Example 2: Using ICE Table
For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), Kc = 0.5
Initial: [N₂] = 1.0 M, [H₂] = 3.0 M, [NH₃] = 0

|     | N₂  | H₂  | NH₃ |
|-----|-----|-----|-----|
| I   | 1.0 | 3.0 | 0   |
| C   | -x  | -3x | +2x |
| E   | 1-x | 3-3x| 2x  |

Kc = (2x)² / [(1-x)(3-3x)³] = 0.5
Solve for x to find equilibrium concentrations.

### Example 3: Le Chatelier Application
For 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), ΔH < 0

**Predict effects:**
- Add SO₂: Shifts right (more SO₃)
- Increase pressure: Shifts right (3 mol → 2 mol)
- Increase temperature: Shifts left (exothermic)
- Add catalyst: Equilibrium reached faster, no position change`,

    keyConcepts: [
      'Reversible reactions and dynamic equilibrium',
      'Equilibrium constant (Kc) expressions and calculations',
      'Kp for gaseous equilibria and relationship to Kc',
      'Reaction quotient (Q) for predicting reaction direction',
      'Le Chatelier\'s Principle and factors affecting equilibrium',
      'Effect of concentration, pressure, and temperature changes',
      'Catalysts affect rate but not equilibrium position',
      'Homogeneous vs heterogeneous equilibria',
      'Ionic equilibria: acids, bases, pH, buffers',
      'Solubility product (Ksp) and precipitation',
      'Common ion effect on solubility',
      'Industrial applications: Haber and Contact processes'
    ],

    formulas: [
      'Kc = [C]^c[D]^d / [A]^a[B]^b',
      'Kp = (Pc)^c(Pd)^d / (Pa)^a(Pb)^b',
      'Kp = Kc(RT)^Δn',
      'Q = [Products] / [Reactants] (not at equilibrium)',
      'Ka × Kb = Kw = 1.0 × 10⁻¹⁴',
      'pH = -log[H⁺]',
      'pOH = -log[OH⁻]',
      'pH + pOH = 14',
      'pH = pKa + log([A⁻]/[HA])',
      'Ksp = [A^n+]^x[B^m-]^y'
    ],

    learningObjectives: [
      'Define chemical equilibrium and identify reversible reactions',
      'Write equilibrium constant expressions (Kc and Kp)',
      'Calculate equilibrium constants from concentration/pressure data',
      'Use reaction quotient (Q) to predict reaction direction',
      'Apply Le Chatelier\'s Principle to predict equilibrium shifts',
      'Understand the effects of concentration, pressure, temperature, and catalysts',
      'Calculate pH and pOH of solutions',
      'Understand buffer action and Henderson-Hasselbalch equation',
      'Apply solubility equilibrium concepts and calculate Ksp',
      'Solve numerical problems using ICE tables'
    ],

    prerequisites: [
      'Basic concepts of chemistry (Chapter 1)',
      'Thermodynamics concepts (Chapter 6)',
      'Understanding of chemical reactions and stoichiometry',
      'Mole concept and concentration calculations',
      'Basic algebra for solving equilibrium problems',
      'Logarithm concepts for pH calculations'
    ],

    importantTopics: [
      'Writing correct Kc and Kp expressions',
      'Relationship between Kp and Kc (Δn calculation)',
      'Using Q to predict reaction direction',
      'Le Chatelier\'s Principle applications',
      'Temperature as the only factor changing K',
      'ICE table method for equilibrium calculations',
      'Henderson-Hasselbalch equation for buffers',
      'Solubility product and precipitation',
      'Industrial process optimization (Haber, Contact)'
    ],

    ncertChapterRef: 'Chapter 7, Pages 192-228',

    difficultyLevel: 4,
    estimatedStudyMinutes: 300,
    status: 'published' as const,

    visualizationsData: [
      {
        type: 'concept',
        title: 'Dynamic Equilibrium',
        description: 'Animation showing equal forward and backward reaction rates at equilibrium'
      },
      {
        type: 'concept',
        title: 'Le Chatelier Principle',
        description: 'Interactive demonstration of equilibrium shifts with various disturbances'
      },
      {
        type: 'concept',
        title: 'pH Scale and Indicators',
        description: 'Visual representation of pH scale with common substances'
      }
    ]
  };

  await db.insert(chapterContent)
    .values(chapter)
    .onConflictDoUpdate({
      target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
      set: chapter
    });

  console.log('✅ Chemistry Chapter 7: Equilibrium seeded successfully');
}

seedChemistryChapter7()
  .then(() => {
    console.log('🎉 Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
