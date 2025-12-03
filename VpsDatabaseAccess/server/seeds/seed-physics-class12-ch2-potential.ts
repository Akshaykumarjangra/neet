import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedPhysicsClass12Chapter2() {
  console.log('Seeding Physics Class 12 Chapter 2: Electrostatic Potential and Capacitance...');

  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 2,
    chapterTitle: 'Electrostatic Potential and Capacitance',
    introduction: `Electrostatic potential provides an energy-based description of electric fields, measuring the work done in bringing a charge from infinity to a point. This chapter explores the concept of electric potential and potential difference, the relationship between field and potential, equipotential surfaces, capacitors as charge storage devices, combinations of capacitors, and energy stored in electric fields. Understanding these concepts is essential for NEET as they apply to electronic circuits, energy storage devices, and biological membrane potentials in nerve and muscle cells.`,

    detailedNotes: `
# Electrostatic Potential and Capacitance

## Electrostatic Potential

**Definition**: Work done per unit positive charge in bringing a charge from infinity to that point (against electric field)

**V = W/q₀**

Where:
- **V** = Electric potential (Volt, V)
- **W** = Work done
- **q₀** = Test charge

**Unit**: **Volt (V)** = J/C (Joule per Coulomb)

### Potential Due to Point Charge

**V = kq/r**

Where:
- **k = 9 × 10⁹ N·m²/C²**
- **q** = Source charge
- **r** = Distance from charge

**Sign**:
- **Positive** for positive charge
- **Negative** for negative charge

**At infinity**: V = 0 (reference point)

### Potential Due to System of Charges

**Superposition Principle**: **V = V₁ + V₂ + V₃ + ...**

**V = k(q₁/r₁ + q₂/r₂ + q₃/r₃ + ...)**

Potential is a **scalar quantity** (easier to add than vector electric field)

### Potential Due to Electric Dipole

**On axial line**: **V = 2kp cos θ/r²** (for r >> a)

**On equatorial line**: **V = 0** (equidistant from both charges)

**General**: **V = kp cos θ/r²**
- **θ**: Angle from dipole axis

## Potential Difference

**Definition**: Work done per unit charge in moving a charge between two points

**V_AB = V_A - V_B = W_AB/q₀**

**Also**: **V_AB = -∫ E·dl** (line integral of electric field)

### Relation Between E and V

**E = -dV/dr** (for one dimension)

**Vector form**: **E = -∇V** (negative gradient of potential)

**Key points**:
- Electric field points from **higher to lower potential**
- **E ⊥** to equipotential surfaces
- If V constant → E = 0

## Equipotential Surfaces

**Definition**: Surfaces where potential is constant at all points

**Properties**:
1. **No work** done in moving charge along equipotential surface (W = qΔV = 0)
2. **Electric field ⊥** to equipotential surface
3. **Never intersect** each other
4. **Closer spacing** indicates stronger field

**Examples**:
- **Point charge**: Concentric spheres
- **Uniform field**: Parallel planes
- **Dipole**: Complex curved surfaces

**Conductor**: Surface is equipotential in electrostatic equilibrium

## Potential Energy of System of Charges

**Definition**: Work done in assembling charges from infinity

**For two charges**:
**U = kq₁q₂/r**

**For three charges**:
**U = k(q₁q₂/r₁₂ + q₂q₃/r₂₃ + q₃q₁/r₃₁)**

**General**: Sum of potential energies of all pairs

**Dipole in uniform field**:
**U = -pE cos θ = -p·E**

## Electrostatics of Conductors

**Properties in electrostatic equilibrium**:

1. **Electric field inside = 0**
   - Free charges redistribute to cancel internal field

2. **Charge resides on surface**
   - No charge in bulk

3. **Electric field at surface ⊥** to surface
   - Tangential component would cause charge movement

4. **Surface is equipotential**
   - Entire conductor at same potential

5. **Field just outside**: **E = σ/ε₀**
   - **σ**: Surface charge density

6. **Charge density higher** at sharper curvatures
   - **Corona discharge** at sharp points

## Capacitance

**Definition**: Ability to store electric charge

**C = Q/V**

Where:
- **C** = Capacitance (Farad, F)
- **Q** = Charge stored
- **V** = Potential difference

**Unit**: **Farad (F)** = C/V
- 1 F = 1 Coulomb/Volt
- Practical units: μF (10⁻⁶ F), nF (10⁻⁹ F), pF (10⁻¹² F)

**Capacitance depends on**:
- Geometry (size, shape)
- Medium between conductors
- **NOT on charge or voltage**

## Capacitors

**Definition**: Device designed to store electric charge and energy

**Basic capacitor**: Two conductors separated by insulator (dielectric)

### Parallel Plate Capacitor

**Structure**: Two parallel plates, area A, separation d

**Capacitance**: **C = ε₀A/d**

Where:
- **ε₀ = 8.85 × 10⁻¹² F/m** (permittivity of free space)
- **A**: Plate area
- **d**: Separation

**With dielectric** (material with dielectric constant K):
**C = Kε₀A/d = εA/d**

Where **ε = Kε₀** (permittivity of medium)

**Electric field between plates**: **E = V/d = σ/ε₀**

**Charge on each plate**: **Q = CV = (ε₀A/d)V**

### Spherical Capacitor

**Two concentric spheres**: Inner radius a, outer radius b

**C = 4πε₀(ab)/(b-a)**

**Isolated sphere** (b → ∞):
**C = 4πε₀a**

### Cylindrical Capacitor

**Two coaxial cylinders**: Inner radius a, outer radius b, length L

**C = (2πε₀L)/ln(b/a)**

## Combinations of Capacitors

### Series Combination

**Characteristics**:
- **Same charge Q** on all capacitors
- **Voltages add**: V = V₁ + V₂ + V₃
- **Equivalent capacitance**:

**1/C_eq = 1/C₁ + 1/C₂ + 1/C₃ + ...**

**C_eq < smallest individual capacitance**

**For two capacitors**: **C_eq = (C₁C₂)/(C₁ + C₂)**

### Parallel Combination

**Characteristics**:
- **Same voltage V** across all capacitors
- **Charges add**: Q = Q₁ + Q₂ + Q₃
- **Equivalent capacitance**:

**C_eq = C₁ + C₂ + C₃ + ...**

**C_eq > largest individual capacitance**

## Energy Stored in Capacitor

**Work done in charging**:

**U = ½QV = ½CV² = Q²/(2C)**

**Energy density** (energy per unit volume):
**u = ½ε₀E²**

**For parallel plate capacitor**:
- Volume = Ad
- **U = ½ε₀E²(Ad)**

## Dielectrics

**Definition**: Insulating materials placed between capacitor plates

**Dielectric constant (K)**:
- **K = C/C₀** (ratio of capacitance with and without dielectric)
- **K ≥ 1** (equals 1 for vacuum)

**Effect of dielectric**:
1. **Increases capacitance**: C = KC₀
2. **Decreases electric field**: E = E₀/K
3. **Decreases voltage**: V = V₀/K (if charge constant)
4. **Increases energy storage** (for same voltage)

**Common dielectrics**:
- Air: K ≈ 1
- Paper: K ≈ 3.7
- Glass: K ≈ 5-10
- Mica: K ≈ 6
- Water: K ≈ 80

**Mechanism**: **Polarization**
- Electric field aligns dipoles in dielectric
- Creates **internal field opposite** to applied field
- Net field reduced

### Dielectric Breakdown

**Definition**: Dielectric becomes conductor when field exceeds critical value

**Dielectric strength**: Maximum field dielectric can withstand

**Example**: Air breakdown ≈ 3 × 10⁶ V/m (sparking)

## Common Conductor Configurations

**Isolated conducting sphere** (radius R):
- **C = 4πε₀R**
- **For Earth** (R ≈ 6.4 × 10⁶ m): C ≈ 700 μF

**Van de Graaff Generator**:
- Produces high voltages (millions of volts)
- Uses hollow spherical conductor
- Charge accumulated on outer surface
- Applications: Particle accelerators, X-ray generation

## Charging and Discharging

**Charging through resistor**:
- **q(t) = Q₀(1 - e^(-t/RC))**
- **Time constant τ = RC**
- After time τ, charge reaches 63% of maximum

**Discharging**:
- **q(t) = Q₀e^(-t/RC)**
- After time τ, charge reduces to 37% of initial

## Summary Points

1. Electric potential V = kq/r is scalar quantity; work done per unit charge from infinity to point
2. Potential difference V_AB = -∫E·dl; electric field E = -dV/dr (negative gradient)
3. Equipotential surfaces are perpendicular to electric field; no work done moving charge along them
4. Conductors in equilibrium have E = 0 inside, charge on surface, entire body at same potential
5. Capacitance C = Q/V; parallel plate capacitor C = ε₀A/d increased by dielectric (C = Kε₀A/d)
6. Series capacitors: 1/C_eq = 1/C₁ + 1/C₂; Parallel: C_eq = C₁ + C₂
7. Energy in capacitor U = ½CV² = ½QV = Q²/(2C); energy density u = ½ε₀E²
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Electrostatic Potential and Capacitance',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  console.log('✓ Seeded Physics Class 12 Chapter 2');
}

seedPhysicsClass12Chapter2().catch(console.error);
