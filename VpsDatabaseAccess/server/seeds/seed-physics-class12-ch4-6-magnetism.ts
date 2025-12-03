import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedPhysicsClass12Magnetism() {
  console.log('Seeding Physics Class 12 Chapters 4-6: Magnetism...');

  // Chapter 4
  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 4,
    chapterTitle: 'Moving Charges and Magnetism',
    introduction: `Moving electric charges create magnetic fields and experience forces in external magnetic fields, unifying electricity and magnetism. This chapter explores the magnetic force on moving charges (Lorentz force), motion of charged particles in magnetic fields, Biot-Savart law for magnetic fields from current elements, Ampere's circuital law, and force between current-carrying conductors. Understanding these concepts is essential for NEET as they apply to medical imaging (MRI), particle accelerators, and biological effects of magnetic fields.`,
    detailedNotes: `
# Moving Charges and Magnetism

## Magnetic Field
**Definition**: Region where magnetic force acts on moving charges or current
**Symbol**: B (magnetic field vector)
**Unit**: Tesla (T) or Weber/m² (Wb/m²)

## Lorentz Force
**Force on charge q moving with velocity v in fields E and B**:
**F = q(E + v × B)**
**Magnetic force**: F_B = q(v × B) = qvB sin θ
- Perpendicular to both v and B
- Zero when v parallel to B

## Cyclotron Motion
**Charged particle in uniform B**: Circular path
**Radius**: r = mv/(qB)
**Period**: T = 2πm/(qB) (independent of v)
**Frequency**: f = qB/(2πm) (cyclotron frequency)

## Biot-Savart Law
**dB = (μ₀/4π) × (I dl × r̂)/r²**
- μ₀ = 4π × 10⁻⁷ T·m/A (permeability of free space)

**Straight wire**: B = (μ₀I)/(2πr)
**Circular loop center**: B = (μ₀I)/(2R)
**Solenoid**: B = μ₀nI (inside, uniform)

## Ampere's Law
**∮ B·dl = μ₀I_enclosed**
**Applications**: Straight wire, solenoid, toroid

## Force Between Parallel Wires
**F/L = (μ₀I₁I₂)/(2πd)**
- Same direction: Attractive
- Opposite direction: Repulsive

## Torque on Current Loop
**τ = NIAB sin θ = m × B**
- m = NIA (magnetic moment)
- Maximum when θ = 90°

## Moving Coil Galvanometer
**Deflection**: θ = (NAB/k)I
- Converts to ammeter (shunt) or voltmeter (series R)

## Summary
1. Lorentz force F = q(v × B); charged particle moves in circle with r = mv/(qB)
2. Biot-Savart law gives dB from current element; straight wire B = μ₀I/(2πr)
3. Ampere's law ∮B·dl = μ₀I; solenoid B = μ₀nI inside
4. Parallel wires attract if currents same direction: F/L = μ₀I₁I₂/(2πd)
5. Torque on loop τ = NIAB sin θ = m × B where m = NIA
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Moving Charges and Magnetism',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  // Chapter 5
  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 5,
    chapterTitle: 'Magnetism and Matter',
    introduction: `Magnetic properties of materials arise from atomic magnetic moments and their interactions. This chapter explores the magnetic moment of current loops and bar magnets, Earth's magnetic field and magnetic elements, classification of materials as diamagnetic, paramagnetic, and ferromagnetic based on their response to magnetic fields, and applications including electromagnets. Understanding magnetic materials is important for NEET as it relates to medical imaging technology and biological magnetism.`,
    detailedNotes: `
# Magnetism and Matter

## Bar Magnet
**Magnetic dipole**: North and South poles (inseparable)
**Magnetic moment**: m = pole strength × length
**Dipole in field B**: Torque τ = m × B
**Potential energy**: U = -m·B = -mB cos θ

## Magnetic Field Lines
- Start from North, end at South (outside)
- Continuous loops (inside magnet too)
- Never intersect
- Density indicates strength

## Earth's Magnetism
**Magnetic elements**:
- **Declination**: Angle between geographic and magnetic meridians
- **Inclination (Dip)**: Angle of field with horizontal
- **Horizontal component**: B_H = B cos δ
- **Vertical component**: B_V = B sin δ
- **Total field**: B = √(B_H² + B_V²)

**Magnetic equator**: δ = 0°
**Magnetic poles**: δ = 90°

## Magnetization
**M = Magnetic moment per unit volume**
**Intensity of magnetization**: M = χ_m H
- χ_m: Magnetic susceptibility
- H: Magnetizing field

## Classification of Materials

**1. Diamagnetic** (χ_m < 0, small):
- Weakly repelled by magnet
- Examples: Bi, Cu, Au, water
- No permanent magnetic moment

**2. Paramagnetic** (χ_m > 0, small):
- Weakly attracted
- Examples: Al, Pt, O₂
- Random atomic moments → aligned by field

**3. Ferromagnetic** (χ_m >> 0, large):
- Strongly attracted
- Examples: Fe, Co, Ni
- Permanent domains aligned
- **Hysteresis loop**
- **Curie temperature**: Loses ferromagnetism above T_c

## Hysteresis
**B-H curve for ferromagnets**:
- **Retentivity**: Residual magnetism when H = 0
- **Coercivity**: H needed to demagnetize
- **Area**: Energy loss per cycle

## Electromagnet
**Soft iron core**: High permeability, low retentivity
**Applications**: Motors, generators, transformers, MRI

## Summary
1. Bar magnet has magnetic moment m; experiences torque τ = m × B in field
2. Earth's field has declination (horizontal angle) and inclination (dip angle)
3. Diamagnetic materials (χ < 0) weakly repel; paramagnetic (χ > 0) weakly attract
4. Ferromagnetic materials (Fe, Ni, Co) strongly attract; show hysteresis
5. Curie temperature: ferromagnets become paramagnetic above T_c
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Magnetism and Matter',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  // Chapter 6
  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 6,
    chapterTitle: 'Electromagnetic Induction',
    introduction: `Changing magnetic flux through a circuit induces an electromotive force, the principle behind electric generators and transformers. This chapter explores Faraday's laws of electromagnetic induction, Lenz's law determining induced current direction, motional EMF in moving conductors, self-induction and mutual induction, inductors as circuit elements, and energy stored in magnetic fields. Understanding electromagnetic induction is crucial for NEET as it underlies power generation, medical equipment, and nerve stimulation therapies.`,
    detailedNotes: `
# Electromagnetic Induction

## Magnetic Flux
**Φ = B·A = BA cos θ**
- Φ: Magnetic flux (Weber, Wb)
- B: Magnetic field (T)
- A: Area (m²)
- θ: Angle between B and normal

**Unit**: Weber (Wb) = T·m²

## Faraday's Laws

**First Law**: Changing magnetic flux induces EMF

**Second Law**: **ε = -dΦ/dt**
- Magnitude of induced EMF = rate of change of flux

**For N turns**: **ε = -N dΦ/dt**

## Lenz's Law
**Direction**: Induced current opposes the change causing it
**Conservation of energy**: Otherwise perpetual motion possible

**Applications**:
- Magnet approaching coil: Induced current repels
- Magnet receding: Induced current attracts

## Motional EMF
**Conductor moving in B**: **ε = Blv**
- l: Length of conductor
- v: Velocity perpendicular to B
- Charge separation creates potential difference

**Rotating coil**: **ε = NABω sin ωt** (AC generator)

## Eddy Currents
**Definition**: Circular currents induced in bulk conductors
**Effects**:
- Heating (loss in transformers)
- Electromagnetic braking
- Induction furnace

**Reduction**: Laminated cores (thin insulated sheets)

## Self-Induction
**Definition**: Change in current induces EMF in same circuit
**Self-inductance (L)**: **ε = -L dI/dt**

**Unit**: Henry (H) = Wb/A

**Solenoid**: **L = μ₀n²Al**
- n: Turns per unit length
- A: Cross-sectional area
- l: Length

**Energy stored**: **U = ½LI²**

## Mutual Induction
**Definition**: Change in current in one coil induces EMF in nearby coil
**M₁₂ = M₂₁ = M** (mutual inductance)

**ε₂ = -M dI₁/dt**

**Coupled coils**: **M = k√(L₁L₂)**
- k: Coupling coefficient (0 ≤ k ≤ 1)

## AC Generator
**Principle**: Rotating coil in B field
**EMF**: ε = ε₀ sin ωt where ε₀ = NABω

**Components**:
- Armature (rotating coil)
- Field magnets
- Slip rings and brushes

## Transformers
**Principle**: Mutual induction
**Step-up**: V_s > V_p (N_s > N_p)
**Step-down**: V_s < V_p (N_s < N_p)

**V_s/V_p = N_s/N_p = I_p/I_s**

**Efficiency**: η = (V_s I_s)/(V_p I_p) × 100%

**Power loss**: Core loss (eddy + hysteresis), copper loss (I²R)

## LC Oscillations
**L-C circuit**: Oscillates at **f = 1/(2π√(LC))**
**Energy**: Oscillates between magnetic (½LI²) and electric (½Q²/C)

## Summary
1. Faraday's law ε = -dΦ/dt; Lenz's law: induced current opposes flux change
2. Motional EMF ε = Blv for conductor moving perpendicular to B
3. Self-inductance L relates induced EMF to rate of current change: ε = -L dI/dt
4. Mutual inductance M: ε₂ = -M dI₁/dt; transformer uses mutual induction
5. Transformer: V_s/V_p = N_s/N_p; ideal power in = power out
6. Energy in inductor U = ½LI²; LC circuit oscillates at f = 1/(2π√LC)
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Electromagnetic Induction',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  console.log('✓ Seeded Physics Class 12 Chapters 4-6');
}

seedPhysicsClass12Magnetism().catch(console.error);
