import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedPhysicsClass12Chapter3() {
  console.log('Seeding Physics Class 12 Chapter 3: Current Electricity...');

  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 3,
    chapterTitle: 'Current Electricity',
    introduction: `Electric current is the flow of electric charge through conductors, powering all electrical devices and circuits. This chapter explores the microscopic origin of current and resistance through drift velocity of electrons, Ohm's law relating voltage and current, electrical resistance and resistivity of materials, combinations of resistors in series and parallel, Kirchhoff's laws for circuit analysis, heating effects of current, and electrical power. Understanding current electricity is vital for NEET as it applies to medical devices, nerve impulse transmission, and electrocardiography.`,

    detailedNotes: `
# Current Electricity

## Electric Current

**Definition**: Rate of flow of electric charge through a cross-section

**I = Q/t** (average current)

**I = dQ/dt** (instantaneous current)

Where:
- **I** = Current (Ampere, A)
- **Q** = Charge (Coulomb, C)
- **t** = Time (s)

**Unit**: **Ampere (A)** = C/s
- 1 A = 1 Coulomb per second

**Direction**: By convention, **positive charges move** from higher to lower potential (opposite to electron flow)

### Current Density

**Definition**: Current per unit area perpendicular to flow

**J = I/A** (for uniform current)

**Vector form**: **J = nq v_d**

Where:
- **n** = Number density of charge carriers (electrons/m³)
- **q** = Charge of carrier (e for electron)
- **v_d** = Drift velocity

**Unit**: A/m²

## Drift Velocity

**Definition**: Average velocity of charge carriers in electric field

**Microscopic picture**:
1. **Random thermal motion**: Electrons move randomly (~10⁶ m/s)
   - Average velocity = 0 (no net motion)
2. **Applied electric field**: Superimposes slow drift (~10⁻⁴ m/s)
   - Net motion toward positive terminal

**Drift velocity**: **v_d = (eE/m)τ = (eE)/(m)τ**

Where:
- **e** = Electronic charge (1.6 × 10⁻¹⁹ C)
- **E** = Electric field
- **m** = Mass of electron
- **τ** = Relaxation time (average time between collisions)

**Relation to current**:
**I = neAv_d**

Where:
- **n** = Number density of electrons
- **A** = Cross-sectional area

**Key point**: Drift velocity << thermal velocity

## Resistance and Ohm's Law

### Ohm's Law

**Statement**: At constant temperature, current through conductor is proportional to voltage across it

**V = IR**

Or: **I = V/R**

Where:
- **V** = Potential difference (Volt)
- **I** = Current (Ampere)
- **R** = Resistance (Ohm, Ω)

**Graphically**: Straight line through origin (V-I graph)

**Ohmic materials**: Obey Ohm's law (most metals at constant temperature)
**Non-ohmic materials**: Don't obey Ohm's law (diodes, transistors, electrolytes)

### Resistance

**Definition**: Opposition to current flow

**R = V/I**

**Unit**: **Ohm (Ω)** = V/A

**Factors affecting resistance**:
1. **Length (L)**: R ∝ L (longer → more resistance)
2. **Area (A)**: R ∝ 1/A (thicker → less resistance)
3. **Material**: Different materials, different resistance
4. **Temperature**: Usually R increases with T

**Formula**: **R = ρL/A**

Where **ρ** = resistivity (material property)

### Resistivity and Conductivity

**Resistivity (ρ)**:
- **ρ = RA/L**
- Material property (intrinsic)
- **Unit**: Ω·m (Ohm-meter)
- **Depends on**: Material, temperature

**Conductivity (σ)**:
- **σ = 1/ρ**
- **Unit**: (Ω·m)⁻¹ or S/m (Siemens per meter)
- Measure of how well material conducts

**Classification**:
- **Conductors**: ρ ~ 10⁻⁸ Ω·m (silver, copper)
- **Semiconductors**: ρ ~ 10⁻⁵ to 10⁶ Ω·m (silicon, germanium)
- **Insulators**: ρ > 10⁸ Ω·m (rubber, glass)

**Relation to drift velocity**:
**ρ = m/(ne²τ)**

### Temperature Dependence

**For metals**: Resistance **increases** with temperature
**R_T = R₀(1 + αΔT)**

Where:
- **α** = Temperature coefficient of resistance (K⁻¹)
- **ΔT** = Change in temperature
- For copper: α ≈ 0.004 K⁻¹

**Reason**: Higher temperature → more lattice vibrations → more collisions → higher resistance

**For semiconductors**: Resistance **decreases** with temperature
- More charge carriers available at higher T

**Superconductors**: **R = 0** below critical temperature
- **Example**: Mercury below 4.2 K

## Combinations of Resistors

### Series Combination

**Characteristics**:
- **Same current I** through all resistors
- **Voltages add**: V = V₁ + V₂ + V₃
- **Equivalent resistance**:

**R_eq = R₁ + R₂ + R₃ + ...**

**R_eq > largest individual resistance**

**Voltage division**: **V_n = V(R_n/R_eq)**

### Parallel Combination

**Characteristics**:
- **Same voltage V** across all resistors
- **Currents add**: I = I₁ + I₂ + I₃
- **Equivalent resistance**:

**1/R_eq = 1/R₁ + 1/R₂ + 1/R₃ + ...**

**R_eq < smallest individual resistance**

**For two resistors**: **R_eq = (R₁R₂)/(R₁ + R₂)**

**Current division**: **I_n = I(R_eq/R_n)**

## Electromotive Force (EMF)

**Definition**: Work done per unit charge by source to move charge around complete circuit

**ε = W/Q**

**Unit**: Volt (V)

**Battery/Cell**: Device that maintains potential difference (provides EMF)

**Internal resistance (r)**: Resistance within cell
- **Terminal voltage**: **V = ε - Ir**
- When current flows, V < ε
- **Open circuit** (I = 0): V = ε

**Power delivered**: **P = VI = εI - I²r**

**Maximum power**: When external resistance R = internal resistance r

## Kirchhoff's Laws

### Kirchhoff's Current Law (KCL) - Junction Rule

**Statement**: Sum of currents entering a junction = Sum of currents leaving

**ΣI_in = ΣI_out**

Or: **ΣI = 0** (algebraic sum at junction)

**Based on**: Conservation of charge

### Kirchhoff's Voltage Law (KVL) - Loop Rule

**Statement**: Sum of voltage changes around any closed loop is zero

**ΣV = 0** (around loop)

**Sign convention**:
- **EMF**: Positive when traversed from - to +
- **Resistor**: Negative when traversed in direction of current (IR drop)

**Based on**: Conservation of energy

## Wheatstone Bridge

**Balanced condition**: **R₁/R₂ = R₃/R₄**

When balanced:
- **No current through galvanometer**
- Used to measure unknown resistance

**Application**: Meter bridge, potentiometer

## Heating Effect of Current

**Joule's Law**: Heat produced when current flows through resistance

**H = I²Rt = VIt = V²t/R**

Where:
- **H** = Heat energy (Joule)
- **I** = Current (A)
- **R** = Resistance (Ω)
- **t** = Time (s)
- **V** = Voltage (V)

**Power dissipated**: **P = I²R = VI = V²/R**

**Applications**:
- Electric heaters, toasters, electric iron
- Incandescent bulbs
- Fuses (safety devices)

## Electric Power

**Definition**: Rate of electrical energy consumption/production

**P = W/t = VI = I²R = V²/R**

**Unit**: **Watt (W)** = J/s

**Commercial unit**: **Kilowatt-hour (kWh)**
- 1 kWh = 3.6 × 10⁶ J
- Energy consumed by 1 kW device in 1 hour

**Electrical energy**: **E = Pt = VIt**

## Cells and Batteries

**Primary cells**: Cannot be recharged
- Examples: Dry cell, alkaline cell

**Secondary cells**: Can be recharged
- Examples: Lead-acid battery, Li-ion battery

### Combination of Cells

**Series combination**:
- **EMF**: ε_eq = ε₁ + ε₂ + ε₃
- **Internal resistance**: r_eq = r₁ + r₂ + r₃
- Used to **increase voltage**

**Parallel combination**:
- **EMF**: Same as individual (if identical cells)
- **Internal resistance**: 1/r_eq = 1/r₁ + 1/r₂ + 1/r₃
- Used to **increase current capacity**

## Meters

### Ammeter

**Measures**: Current
**Connection**: **In series** with circuit
**Ideal ammeter**: **Zero resistance** (no voltage drop)
**Actual ammeter**: Low resistance (shunt resistor in parallel)

**Shunt**: **R_s = (I_g R_g)/(I - I_g)**
- **I_g**: Galvanometer current
- **R_g**: Galvanometer resistance
- **I**: Total current to measure

### Voltmeter

**Measures**: Potential difference
**Connection**: **In parallel** with circuit element
**Ideal voltmeter**: **Infinite resistance** (no current drawn)
**Actual voltmeter**: High resistance (resistor in series)

**Multiplier**: **R_m = (V/I_g) - R_g**
- **V**: Voltage to measure
- **I_g**: Galvanometer current
- **R_g**: Galvanometer resistance

## Potentiometer

**Principle**: Compares EMF/potential differences without drawing current

**Construction**: Long uniform wire with steady current

**Potential gradient**: **k = V/L** (V/m)

**Applications**:
1. **Compare EMFs**: ε₁/ε₂ = L₁/L₂
2. **Measure internal resistance**: r = (L₁ - L₂)R/L₂
3. **Measure resistance** more accurately than Wheatstone bridge

**Advantage**: No current drawn from cell being measured (more accurate)

## Summary Points

1. Electric current I = nqAv_d where v_d is drift velocity of charge carriers
2. Ohm's law V = IR valid for ohmic materials at constant temperature; resistance R = ρL/A
3. Resistivity ρ increases with temperature for metals; conductivity σ = 1/ρ
4. Series resistors: R_eq = R₁ + R₂; Parallel: 1/R_eq = 1/R₁ + 1/R₂
5. Kirchhoff's current law (ΣI = 0 at junction) and voltage law (ΣV = 0 around loop) solve complex circuits
6. Joule heating H = I²Rt; electric power P = VI = I²R = V²/R
7. Wheatstone bridge balanced when R₁/R₂ = R₃/R₄; potentiometer measures EMF without drawing current
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Current Electricity',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  console.log('✓ Seeded Physics Class 12 Chapter 3');
}

seedPhysicsClass12Chapter3().catch(console.error);
