import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedPhysicsClass12Chapter1() {
  console.log('Seeding Physics Class 12 Chapter 1: Electric Charges and Fields...');

  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 1,
    chapterTitle: 'Electric Charges and Fields',
    introduction: `Electric charges and the forces between them form the foundation of electrostatics and all electromagnetic phenomena. This chapter explores the quantization and conservation of electric charge, Coulomb's law describing forces between point charges, the electric field as a vector quantity representing force per unit charge, and applications including Gauss's law for calculating fields from symmetric charge distributions. Understanding these concepts is crucial for NEET as they underpin electronics, atomic structure, and biological electrical phenomena like nerve impulses.`,

    detailedNotes: `
# Electric Charges and Fields

## Electric Charge

**Definition**: Fundamental property of matter that causes it to experience electromagnetic force

**Discovery**: Known since ancient times (amber attracts light objects when rubbed)

### Properties of Electric Charge

**1. Two Types of Charges**:
- **Positive charge**: Protons carry positive charge
- **Negative charge**: Electrons carry negative charge

**Like charges repel, unlike charges attract**

**2. Quantization of Charge**:
- **Charge exists only in discrete packets** (multiples of elementary charge)
- **Elementary charge** (e): Charge on one electron/proton
  - **e = 1.6 × 10⁻¹⁹ C** (Coulomb)
- Any charge **q = ± ne** where n = 1, 2, 3, ... (integer)
- **No fractional charges** observed in isolation (quarks have fractional charges but don't exist freely)

**Discovered by**: Robert Millikan (Oil drop experiment, 1909)

**3. Conservation of Charge**:
- **Total charge in an isolated system remains constant**
- Charge can be **transferred** but **not created or destroyed**
- Example: When glass rod rubbed with silk
  - Glass becomes **positively charged**
  - Silk becomes **negatively charged**
  - Total charge = 0 (charge transferred, not created)

**4. Additive Nature**:
- Total charge = algebraic sum of individual charges
- **Q = q₁ + q₂ + q₃ + ...**

**5. Charge is Invariant**:
- Charge does **not depend on frame of reference**
- Same value for all observers (unlike mass in relativity)

### Methods of Charging

**1. Friction (Rubbing)**:
- Transfer of electrons through contact
- Example: Glass rod + silk → glass loses electrons (positive)
- Example: Ebonite rod + fur → ebonite gains electrons (negative)

**2. Conduction (Contact)**:
- Charged object touches neutral object
- Charge redistributes
- Both acquire same type of charge

**3. Induction**:
- Charging without direct contact
- Charged object brought near neutral conductor
- Charges in conductor redistribute
- Ground one end → permanent charge
- **Induced charge opposite to inducing charge**

## Coulomb's Law

**Statement**: Force between two point charges is directly proportional to product of charges and inversely proportional to square of distance between them

**Formula**: **F = k q₁q₂/r²**

Or: **F = (1/4πε₀) × (q₁q₂/r²)**

Where:
- **F** = Electrostatic force (N)
- **q₁, q₂** = Charges (C)
- **r** = Distance between charges (m)
- **k = 1/(4πε₀) = 9 × 10⁹ N·m²/C²** (Coulomb's constant)
- **ε₀ = 8.854 × 10⁻¹² C²/N·m²** (Permittivity of free space)

**Vector Form**: **F₁₂ = k(q₁q₂/r²) r̂₁₂**
- **r̂₁₂**: Unit vector from q₁ to q₂
- Force on q₂ due to q₁

### Characteristics of Coulomb Force

1. **Inverse square law**: F ∝ 1/r²
2. **Central force**: Acts along line joining charges
3. **Conservative force**: Work done is path-independent
4. **Long-range force**: Acts over large distances
5. **Much stronger than gravity**: 10³⁶ times stronger

**Comparison with Gravitational Force**:
- **Gravitational**: F = G m₁m₂/r² (always attractive)
- **Electric**: F = k q₁q₂/r² (attractive or repulsive)
- Electric force >> Gravitational force for atomic particles

### Principle of Superposition

For multiple charges, **net force on a charge** = vector sum of forces due to all other charges

**F_net = F₁ + F₂ + F₃ + ...**

Forces are calculated independently and added vectorially

## Electric Field

**Definition**: Region around a charge where another charge experiences electrostatic force

**Electric Field Intensity (E)**: Force per unit positive test charge

**E = F/q₀**

Where:
- **E** = Electric field (N/C or V/m)
- **F** = Force on test charge
- **q₀** = Test charge (very small, doesn't disturb field)

### Electric Field Due to Point Charge

**E = k q/r²** (magnitude)

**Vector form**: **E = k(q/r²) r̂**

**Direction**:
- **Away from positive charge** (radially outward)
- **Toward negative charge** (radially inward)

### Electric Field Lines

**Properties**:
1. **Start** from positive charge, **end** at negative charge
2. Never cross each other
3. **Density** indicates field strength (closer lines = stronger field)
4. Tangent at any point gives field direction
5. Always perpendicular to conductor surface
6. Never form closed loops (electrostatic field is conservative)

**Patterns**:
- **Point charge**: Radial lines
- **Dipole**: Lines from +ve to -ve charge
- **Uniform field**: Parallel, equally spaced lines

### Electric Field Due to System of Charges

**Superposition principle**: **E_net = E₁ + E₂ + E₃ + ...**

Vector sum of fields due to individual charges

## Electric Dipole

**Definition**: Pair of equal and opposite charges separated by small distance

**Dipole moment (p)**: **p = q × 2a**
- **q**: Magnitude of charge
- **2a**: Separation between charges
- **Direction**: From -ve to +ve charge (vector quantity)
- **Unit**: C·m (Coulomb-meter) or Debye (1 D = 3.33 × 10⁻³⁰ C·m)

### Electric Field Due to Dipole

**1. On Axial Line** (along dipole axis):

**E = (2kp)/(r² - a²)²**

For **r >> a** (far from dipole):
**E = 2kp/r³**

Direction: Along dipole moment (from -ve to +ve)

**2. On Equatorial Line** (perpendicular bisector):

**E = kp/√(r² + a²)³**

For **r >> a**:
**E = kp/r³**

Direction: Opposite to dipole moment

**Ratio**: E_axial/E_equatorial = 2 (for same distance)

### Torque on Dipole in Uniform Field

**τ = p × E** (vector product)

**Magnitude**: **τ = pE sin θ**

Where **θ** = angle between **p** and **E**

**Maximum torque**: θ = 90° → τ = pE
**Minimum torque**: θ = 0° or 180° → τ = 0 (equilibrium positions)

**Stable equilibrium**: θ = 0° (p parallel to E)
**Unstable equilibrium**: θ = 180° (p antiparallel to E)

**Work done in rotating dipole**: **W = pE(1 - cos θ)**

**Potential energy**: **U = -p·E = -pE cos θ**
- **Minimum** at θ = 0° (stable)
- **Maximum** at θ = 180° (unstable)

## Continuous Charge Distributions

For extended objects, replace discrete charges with continuous distribution:

**1. Linear Charge Density (λ)**:
- Charge per unit length
- **λ = dq/dl** (C/m)

**2. Surface Charge Density (σ)**:
- Charge per unit area
- **σ = dq/dA** (C/m²)

**3. Volume Charge Density (ρ)**:
- Charge per unit volume
- **ρ = dq/dV** (C/m³)

**Electric field**: **E = ∫ k(dq)/r² r̂**

## Gauss's Law

**Statement**: Total electric flux through a closed surface equals 1/ε₀ times charge enclosed

**Φ = ∮ E·dA = Q_enclosed/ε₀**

Where:
- **Φ** = Electric flux (N·m²/C or V·m)
- **E** = Electric field
- **dA** = Area element (outward normal)
- **Q_enclosed** = Net charge inside closed surface

### Electric Flux

**Definition**: Measure of electric field lines passing through a surface

**For uniform field and flat surface**: **Φ = E·A = EA cos θ**
- **θ** = angle between **E** and area normal

**General**: **Φ = ∫ E·dA**

**Unit**: N·m²/C or V·m

### Applications of Gauss's Law

**Only for symmetric charge distributions**:

**1. Infinitely Long Charged Wire** (linear charge density λ):

**E = λ/(2πε₀r)**

Direction: Radially outward (if positive)

**2. Infinite Plane Sheet** (surface charge density σ):

**E = σ/(2ε₀)**

**Independent of distance** (uniform field near sheet)

**3. Thin Spherical Shell** (charge Q, radius R):

**Outside** (r > R): **E = kQ/r²** (like point charge)
**Inside** (r < R): **E = 0**

**4. Solid Sphere** (uniform charge Q, radius R):

**Outside** (r > R): **E = kQ/r²**
**Inside** (r < R): **E = kQr/R³**

At center (r = 0): E = 0

**5. Between Two Parallel Plates** (equal and opposite charges):

**E = σ/ε₀**

Uniform field between plates, zero outside

## Summary Points

1. Electric charge is quantized (q = ± ne) and conserved in isolated systems
2. Coulomb's law: F = kq₁q₂/r² describes force between point charges (inverse square law)
3. Electric field E = F/q₀ represents force per unit charge; superposition applies for multiple charges
4. Electric dipole has moment p = q(2a); experiences torque τ = p × E in uniform field
5. Gauss's law ∮E·dA = Q/ε₀ relates flux through closed surface to enclosed charge
6. Field inside spherical shell is zero; outside it behaves like point charge at center
7. Infinite plane sheet creates uniform field E = σ/(2ε₀) independent of distance
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Electric Charges and Fields',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  console.log('✓ Seeded Physics Class 12 Chapter 1');
}

seedPhysicsClass12Chapter1().catch(console.error);
