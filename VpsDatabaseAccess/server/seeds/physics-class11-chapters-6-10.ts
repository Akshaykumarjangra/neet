import { db } from "../db";
import { chapterContent } from "../../shared/schema";

const chapters = [
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 6,
    chapterTitle: "Work, Energy and Power",
    introduction: "This chapter introduces the concepts of work, energy, and power - fundamental principles that connect force and motion. We explore different forms of energy, conservation laws, and their applications.",
    detailedNotes: `# Work, Energy and Power

## Work

**Definition:**
Work is done when a force causes displacement in the direction of the force.

**Mathematical Definition:**
- W = F · s = Fs cos θ
- Where θ is the angle between force and displacement
- SI Unit: Joule (J) = N·m

**Special Cases:**
- When θ = 0°: W = Fs (maximum positive work)
- When θ = 90°: W = 0 (no work done)
- When θ = 180°: W = -Fs (negative work)

### Work Done by Variable Force

For variable force:
- W = ∫F·ds
- Area under F-s graph gives work done

## Energy

**Kinetic Energy:**
- Energy possessed due to motion
- KE = ½mv²
- Work-Energy Theorem: W_net = ΔKE = KE_f - KE_i

**Potential Energy:**
Energy possessed due to position or configuration

**Gravitational PE:**
- PE = mgh (near Earth's surface)
- PE = -GMm/r (general form)

**Elastic PE:**
- PE = ½kx² (for spring with spring constant k)

### Conservation of Mechanical Energy

For conservative forces:
- Total ME = KE + PE = constant
- KE₁ + PE₁ = KE₂ + PE₂

**Conservative Forces:**
- Work done is path-independent
- Examples: Gravitational, elastic, electrostatic

**Non-Conservative Forces:**
- Work done depends on path
- Examples: Friction, air resistance

## Power

**Definition:**
Rate at which work is done or energy is transferred

**Formulas:**
- P = W/t (average power)
- P = dW/dt (instantaneous power)
- P = F·v = Fv cos θ
- SI Unit: Watt (W) = J/s

**Commercial Unit:**
- 1 kWh = 3.6 × 10⁶ J

### Collisions

**Elastic Collision:**
- Both momentum and KE are conserved
- e = 1 (coefficient of restitution)
- Relative velocity of separation = -Relative velocity of approach

**Inelastic Collision:**
- Momentum conserved, KE not conserved
- 0 < e < 1

**Perfectly Inelastic:**
- Objects stick together
- e = 0
- Maximum KE loss

## Applications

- Machines and efficiency
- Energy transformations
- Power calculations in real-world scenarios`,
    keyConcepts: [
      "Work done by constant and variable forces",
      "Kinetic energy and work-energy theorem",
      "Potential energy (gravitational and elastic)",
      "Conservation of mechanical energy",
      "Power and its applications",
      "Elastic and inelastic collisions",
    ],
    formulas: [
      "W = F·s cos θ",
      "KE = ½mv²",
      "PE_gravity = mgh",
      "PE_spring = ½kx²",
      "Work-Energy Theorem: W_net = ΔKE",
      "P = W/t = F·v",
      "Conservation: KE₁ + PE₁ = KE₂ + PE₂",
      "For elastic collision: v₁ - v₂ = -(u₁ - u₂)",
    ],
    importantTopics: [
      "Work done by constant and variable forces",
      "Kinetic and potential energy",
      "Work-energy theorem",
      "Conservation of mechanical energy",
      "Power and efficiency",
      "Elastic and inelastic collisions",
    ],
    learningObjectives: [
      "Calculate work done by constant and variable forces",
      "Apply work-energy theorem to solve problems",
      "Understand conservation of mechanical energy",
      "Calculate power in various situations",
      "Analyze collision problems using conservation laws",
    ],
    prerequisites: [
      "Newton's laws of motion",
      "Kinematics",
      "Vector dot product",
      "Basic calculus (for variable forces)",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 6",
    visualizationsData: [
      {
        type: "projectile-motion",
        title: "Energy Conservation in Projectile Motion",
        description: "Visualize how kinetic and potential energy transform during projectile motion",
        config: {
          initialVelocity: 25,
          launchAngle: 60
        }
      },
    ],
    difficultyLevel: 4,
    estimatedStudyMinutes: 360,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 7,
    chapterTitle: "System of Particles and Rotational Motion",
    introduction: "This chapter extends mechanics to systems of particles and introduces rotational motion. We study center of mass, moment of inertia, torque, and angular momentum.",
    detailedNotes: `# System of Particles and Rotational Motion

## Center of Mass

**Definition:**
Point where entire mass of system can be assumed to be concentrated

**For Discrete Particles:**
- x_cm = (Σm_ix_i)/(Σm_i)
- r_cm = (Σm_ir_i)/(Σm_i)

**For Continuous Bodies:**
- r_cm = (∫r dm)/(∫dm)

**Motion of Center of Mass:**
- M·a_cm = F_ext (internal forces cancel)
- v_cm = (Σm_iv_i)/M

## Rotational Kinematics

**Angular Quantities:**
- Angular displacement: θ (radians)
- Angular velocity: ω = dθ/dt
- Angular acceleration: α = dω/dt

**Relation with Linear Quantities:**
- v = rω (linear velocity)
- a_t = rα (tangential acceleration)
- a_c = rω² (centripetal acceleration)

**Equations of Rotational Motion:**
- ω = ω₀ + αt
- θ = ω₀t + ½αt²
- ω² = ω₀² + 2αθ

## Moment of Inertia

**Definition:**
Rotational analog of mass; resistance to rotational motion

**Formula:**
- I = Σm_ir_i² (discrete particles)
- I = ∫r² dm (continuous body)

**Parallel Axis Theorem:**
- I = I_cm + Md²

**Perpendicular Axis Theorem:**
- For planar bodies: I_z = I_x + I_y

**Common Moments of Inertia:**
- Ring: I = MR²
- Disc: I = ½MR²
- Sphere: I = (2/5)MR²
- Rod (center): I = ML²/12
- Rod (end): I = ML²/3

## Torque

**Definition:**
Rotational analog of force

**Formula:**
- τ = r × F = rF sin θ
- τ = Iα (rotational analog of F = ma)

**Couple:**
- Two equal and opposite forces with different lines of action
- Net force = 0, but torque ≠ 0

## Angular Momentum

**Definition:**
- L = r × p = mvr sin θ (for particle)
- L = Iω (for rigid body)

**Conservation:**
- If τ_ext = 0, then L = constant
- Applications: spinning ice skater, planetary motion

## Rotational Kinetic Energy

**Formula:**
- KE_rot = ½Iω²

**Total KE for Rolling:**
- KE_total = ½Mv_cm² + ½I_cmω²

**Rolling Without Slipping:**
- v_cm = Rω
- Condition: friction provides torque`,
    keyConcepts: [
      "Center of mass and its motion",
      "Rotational kinematics",
      "Moment of inertia and theorems",
      "Torque and angular momentum",
      "Conservation of angular momentum",
      "Rolling motion",
    ],
    formulas: [
      "r_cm = (Σm_ir_i)/M",
      "v = rω, a_t = rα",
      "I = Σm_ir_i² or ∫r² dm",
      "Parallel Axis: I = I_cm + Md²",
      "τ = r × F = Iα",
      "L = Iω",
      "KE_rot = ½Iω²",
      "For rolling: v_cm = Rω",
    ],
    importantTopics: [
      "Center of mass calculations",
      "Moment of inertia for different shapes",
      "Parallel and perpendicular axis theorems",
      "Torque and angular momentum",
      "Conservation of angular momentum",
      "Rolling motion without slipping",
    ],
    learningObjectives: [
      "Calculate center of mass for particle systems",
      "Determine moment of inertia using theorems",
      "Apply rotational dynamics equations",
      "Solve problems using conservation of angular momentum",
      "Analyze rolling motion",
    ],
    prerequisites: [
      "Newton's laws",
      "Circular motion",
      "Vector cross product",
      "Calculus basics",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 7",
    visualizationsData: [
      {
        type: "circular-motion",
        title: "Rotational Motion Demonstration",
        description: "Visualize angular velocity, centripetal acceleration, and rotational dynamics",
        config: {
          radius: 3,
          angularVelocity: 1.5
        }
      },
    ],
    difficultyLevel: 5,
    estimatedStudyMinutes: 420,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 8,
    chapterTitle: "Gravitation",
    introduction: "This chapter explores universal gravitation - one of the four fundamental forces. We study planetary motion, satellite orbits, and gravitational potential energy.",
    detailedNotes: `# Gravitation

## Newton's Law of Universal Gravitation

**Statement:**
Every particle attracts every other particle with a force proportional to product of masses and inversely proportional to square of distance

**Formula:**
- F = G(m₁m₂)/r²
- G = 6.67 × 10⁻¹¹ N·m²/kg²

**Vector Form:**
- F⃗₁₂ = -G(m₁m₂/r²)r̂₁₂

## Gravitational Field

**Field Intensity:**
- g⃗ = F⃗/m = -GM/r² r̂

**At Earth's Surface:**
- g = GM/R² ≈ 9.8 m/s²

**Variation with Height:**
- g_h = g(1 - 2h/R) for h << R
- g_h = g(R/(R+h))² (general)

**Variation with Depth:**
- g_d = g(1 - d/R)

## Gravitational Potential Energy

**Definition:**
- PE = -GMm/r
- Zero at infinity
- Always negative (attractive force)

**Change in PE:**
- ΔPE = GMm(1/r₁ - 1/r₂)

**At Earth's Surface:**
- PE = -GMm/R

## Escape Velocity

**Definition:**
Minimum velocity to escape Earth's gravitational field

**Formula:**
- v_e = √(2GM/R) = √(2gR)
- For Earth: v_e ≈ 11.2 km/s

## Orbital Motion

**Orbital Velocity:**
- v_o = √(GM/r) = √(gR²/r)

**Relation:**
- v_e = √2 × v_o

**Time Period:**
- T = 2π√(r³/GM)

**Kepler's Laws:**

1. **Law of Orbits:**
   - Planets move in elliptical orbits with Sun at one focus

2. **Law of Areas:**
   - Radius vector sweeps equal areas in equal times
   - L = constant (angular momentum conservation)

3. **Law of Periods:**
   - T² ∝ r³
   - T² = (4π²/GM)r³

## Satellite Motion

**Geostationary Satellite:**
- T = 24 hours
- Height ≈ 36,000 km
- Fixed position relative to Earth

**Polar Satellite:**
- Passes over poles
- Lower orbit (~500-800 km)
- Used for weather, surveillance

**Energy of Satellite:**
- KE = GMm/2r
- PE = -GMm/r
- Total E = -GMm/2r (negative, indicating bound state)

## Weightlessness

Occurs when:
- In free fall
- In orbiting satellite
- At null point between Earth and Moon`,
    keyConcepts: [
      "Newton's law of universal gravitation",
      "Gravitational field and potential",
      "Variation of g with height and depth",
      "Escape velocity and orbital velocity",
      "Kepler's laws of planetary motion",
      "Satellite orbits and energy",
    ],
    formulas: [
      "F = Gm₁m₂/r²",
      "g = GM/R²",
      "g_h = g(R/(R+h))²",
      "g_d = g(1 - d/R)",
      "PE = -GMm/r",
      "v_e = √(2GM/R)",
      "v_o = √(GM/r)",
      "T² = (4π²/GM)r³",
    ],
    importantTopics: [
      "Universal law of gravitation",
      "Gravitational field intensity",
      "Acceleration due to gravity variations",
      "Escape and orbital velocities",
      "Kepler's laws",
      "Satellite motion and energy",
    ],
    learningObjectives: [
      "Apply Newton's law of gravitation",
      "Calculate g at different heights and depths",
      "Derive and apply escape velocity",
      "Understand Kepler's laws",
      "Analyze satellite orbits",
    ],
    prerequisites: [
      "Newton's laws of motion",
      "Circular motion",
      "Energy and work",
      "Vector concepts",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 8",
    visualizationsData: [
      {
        type: "circular-motion",
        title: "Orbital Motion Simulation",
        description: "Visualize satellite orbits and understand orbital velocity",
        config: {
          radius: 4,
          angularVelocity: 0.8
        }
      },
    ],
    difficultyLevel: 4,
    estimatedStudyMinutes: 360,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 9,
    chapterTitle: "Mechanical Properties of Solids",
    introduction: "This chapter introduces elasticity, stress, strain, and deformation in solids. We study Hooke's law, elastic moduli, and stress-strain relationships.",
    detailedNotes: `# Mechanical Properties of Solids

## Elasticity

**Definition:**
Property of materials to regain original shape after deforming forces are removed

**Types of Materials:**
- **Elastic:** Return to original shape (rubber, steel)
- **Plastic:** Permanent deformation (clay, putty)
- **Brittle:** Break without much deformation (glass, chalk)

**Elastic Limit:**
Maximum stress within which material remains elastic

## Stress

**Definition:**
Internal restoring force per unit area

**Formula:**
- Stress = F/A
- SI Unit: N/m² or Pascal (Pa)

**Types:**

1. **Tensile Stress:**
   - Force perpendicular to area (stretching)
   - σ = F/A

2. **Compressive Stress:**
   - Force perpendicular to area (compression)

3. **Shearing Stress:**
   - Force parallel to area
   - τ = F_tangential/A

## Strain

**Definition:**
Fractional change in dimension

**Types:**

1. **Longitudinal Strain:**
   - ε = ΔL/L (change in length)

2. **Volumetric Strain:**
   - ε_v = ΔV/V (change in volume)

3. **Shearing Strain:**
   - φ = Δx/L = tan θ (angular deformation)

## Hooke's Law

**Statement:**
Within elastic limit, stress ∝ strain

**Formula:**
- Stress = E × Strain (for normal stress)
- E is the elastic modulus

## Elastic Moduli

**1. Young's Modulus (Y):**
- For longitudinal stress and strain
- Y = (F/A)/(ΔL/L) = Stress/Strain
- Units: N/m² or Pa

**2. Bulk Modulus (K):**
- For volumetric stress and strain
- K = -(ΔP)/(ΔV/V) = -V(ΔP/ΔV)
- Negative sign: volume decreases with pressure increase

**Compressibility:**
- C = 1/K

**3. Shear Modulus (G or η):**
- For shearing stress and strain
- G = (F/A)/(Δx/L) = τ/φ

**Relations:**
- Y = 2G(1 + σ) where σ is Poisson's ratio
- Y = 3K(1 - 2σ)

## Poisson's Ratio

**Definition:**
Ratio of lateral strain to longitudinal strain

**Formula:**
- σ = -(Lateral strain)/(Longitudinal strain)
- σ = -(ΔD/D)/(ΔL/L)

**Range:**
- For most materials: 0 < σ < 0.5
- Theoretical maximum: 0.5 (incompressible)

## Stress-Strain Curve

**Regions:**

1. **Proportional Limit:** Hooke's law valid
2. **Elastic Limit:** Maximum elastic deformation
3. **Yield Point:** Permanent deformation begins
4. **Plastic Region:** Large deformation
5. **Breaking Point:** Material fractures

**Ductile vs Brittle:**
- Ductile: Large plastic region (copper, aluminum)
- Brittle: Small plastic region (glass, cast iron)

## Elastic Potential Energy

**In stretched wire:**
- PE = ½ × Stress × Strain × Volume
- PE = ½(F·ΔL) = ½YA(ΔL)²/L

**Energy Density:**
- u = ½ × Stress × Strain = ½Y(Strain)²`,
    keyConcepts: [
      "Elasticity and Hooke's law",
      "Stress and strain (types)",
      "Young's modulus, bulk modulus, shear modulus",
      "Poisson's ratio",
      "Stress-strain curve",
      "Elastic potential energy",
    ],
    formulas: [
      "Stress = F/A",
      "Strain = ΔL/L (longitudinal)",
      "Young's Modulus: Y = Stress/Strain",
      "Bulk Modulus: K = -V(ΔP/ΔV)",
      "Shear Modulus: G = τ/φ",
      "Poisson's ratio: σ = -(Δr/r)/(ΔL/L)",
      "Elastic PE = ½(F·ΔL) = ½Y(ΔL²/L)A",
    ],
    importantTopics: [
      "Elastic behavior of materials",
      "Types of stress and strain",
      "Elastic moduli and their measurements",
      "Hooke's law applications",
      "Stress-strain curves",
      "Energy stored in stretched wires",
    ],
    learningObjectives: [
      "Distinguish between stress and strain",
      "Calculate elastic moduli",
      "Apply Hooke's law to problems",
      "Interpret stress-strain curves",
      "Calculate energy stored in deformed bodies",
    ],
    prerequisites: [
      "Force and pressure concepts",
      "Basic geometry",
      "Energy concepts",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 9",
    visualizationsData: [],
    difficultyLevel: 3,
    estimatedStudyMinutes: 300,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 10,
    chapterTitle: "Mechanical Properties of Fluids",
    introduction: "This chapter covers the behavior of fluids at rest and in motion. We study pressure, buoyancy, viscosity, and fluid flow.",
    detailedNotes: `# Mechanical Properties of Fluids

## Pressure in Fluids

**Definition:**
Force per unit area exerted by fluid

**Formula:**
- P = F/A
- For fluid column: P = ρgh

**Atmospheric Pressure:**
- P_atm ≈ 1.013 × 10⁵ Pa = 1 atm
- 1 atm = 76 cm Hg = 760 mm Hg

**Absolute and Gauge Pressure:**
- P_absolute = P_atmospheric + P_gauge
- P_gauge = ρgh

## Pascal's Law

**Statement:**
Pressure applied to enclosed fluid is transmitted equally in all directions

**Applications:**
- Hydraulic lift
- Hydraulic brakes
- Hydraulic press

**Mechanical Advantage:**
- F₂/F₁ = A₂/A₁

## Archimedes' Principle

**Statement:**
Upward buoyant force equals weight of displaced fluid

**Formula:**
- F_buoyant = ρ_fluid × V_displaced × g

**Apparent Weight:**
- W_apparent = W_actual - F_buoyant

**Floatation:**
- Object floats if ρ_object < ρ_fluid
- Fraction submerged: V_submerged/V_total = ρ_object/ρ_fluid

## Fluid Flow

**Types of Flow:**

1. **Streamline (Laminar) Flow:**
   - Smooth, orderly flow
   - Velocity at each point constant
   - No turbulence

2. **Turbulent Flow:**
   - Chaotic, irregular flow
   - Eddies and vortices form

**Reynolds Number:**
- R_e = ρvD/η
- R_e < 2000: Laminar
- R_e > 3000: Turbulent

## Equation of Continuity

**For incompressible fluid:**
- A₁v₁ = A₂v₂
- Volume flow rate is constant

**Mass Flow Rate:**
- dm/dt = ρAv = constant

## Bernoulli's Equation

**Statement:**
For streamline flow of ideal fluid

**Formula:**
- P + ½ρv² + ρgh = constant

**Forms:**
- P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂

**Applications:**

1. **Torricelli's Theorem:**
   - Velocity of efflux: v = √(2gh)

2. **Venturi Meter:**
   - Measures fluid flow rate

3. **Lift on Aircraft Wing:**
   - Faster flow over top creates lower pressure

## Viscosity

**Definition:**
Internal friction in fluids resisting flow

**Newton's Law of Viscosity:**
- F = -ηA(dv/dx)
- η is coefficient of viscosity

**Terminal Velocity:**
- v_t = (2r²(ρ - σ)g)/(9η)
- For sphere falling through fluid

**Stokes' Law:**
- F_viscous = 6πηrv

**Poiseuille's Formula:**
- Volume flow rate through pipe
- Q = (πPr⁴)/(8ηl)

## Surface Tension

**Definition:**
Force per unit length on liquid surface

**Formula:**
- T = F/L
- Unit: N/m

**Surface Energy:**
- E = T × A

**Pressure Difference:**
- Across spherical drop: ΔP = 2T/r
- Across bubble: ΔP = 4T/r

**Capillarity:**
- h = (2T cos θ)/(ρgr)
- Rise in capillary tube`,
    keyConcepts: [
      "Pressure in fluids and Pascal's law",
      "Archimedes' principle and buoyancy",
      "Streamline and turbulent flow",
      "Equation of continuity",
      "Bernoulli's equation and applications",
      "Viscosity and terminal velocity",
      "Surface tension and capillarity",
    ],
    formulas: [
      "P = ρgh",
      "F_buoyant = ρVg",
      "Continuity: A₁v₁ = A₂v₂",
      "Bernoulli: P + ½ρv² + ρgh = constant",
      "Torricelli: v = √(2gh)",
      "Terminal velocity: v_t = 2r²(ρ-σ)g/(9η)",
      "Stokes: F = 6πηrv",
      "Surface tension: ΔP = 2T/r (drop)",
    ],
    importantTopics: [
      "Pressure in fluids",
      "Pascal's law and hydraulic machines",
      "Archimedes' principle",
      "Bernoulli's theorem",
      "Viscosity and Stokes' law",
      "Surface tension",
    ],
    learningObjectives: [
      "Apply Pascal's law to hydraulic systems",
      "Solve buoyancy problems",
      "Use equation of continuity",
      "Apply Bernoulli's equation",
      "Calculate terminal velocity",
      "Understand surface tension phenomena",
    ],
    prerequisites: [
      "Pressure and density",
      "Energy conservation",
      "Forces and motion",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 10",
    visualizationsData: [],
    difficultyLevel: 4,
    estimatedStudyMinutes: 360,
    status: "published" as const,
  },
];

async function seedPhysicsChapters6to10() {
  console.log("🌱 Seeding Physics Class 11 chapters 6-10...");

  for (const chapter of chapters) {
    await db
      .insert(chapterContent)
      .values(chapter)
      .onConflictDoUpdate({
        target: [
          chapterContent.subject,
          chapterContent.classLevel,
          chapterContent.chapterNumber,
        ],
        set: {
          chapterTitle: chapter.chapterTitle,
          introduction: chapter.introduction,
          detailedNotes: chapter.detailedNotes,
          keyConcepts: chapter.keyConcepts,
          formulas: chapter.formulas,
          importantTopics: chapter.importantTopics,
          learningObjectives: chapter.learningObjectives,
          prerequisites: chapter.prerequisites,
          ncertChapterRef: chapter.ncertChapterRef,
          visualizationsData: chapter.visualizationsData,
          difficultyLevel: chapter.difficultyLevel,
          estimatedStudyMinutes: chapter.estimatedStudyMinutes,
          status: chapter.status,
        },
      });

    console.log(`  ✅ Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle} upserted`);
  }

  console.log("✅ Physics Class 11 chapters 6-10 seeding completed!");
}

seedPhysicsChapters6to10()
  .then(() => {
    console.log("Seed completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
