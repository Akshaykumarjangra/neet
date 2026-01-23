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

Work is done when a force produces displacement in the direction of the force.

**Constant force:**
- W = F s cos theta
- Unit: Joule (J) = N m

**Variable force:**
- W = integral F . ds
- Area under the F-s graph gives work done

## Energy

**Kinetic energy:**
- KE = 0.5 m v^2
- Work-energy theorem: W_net = delta KE

**Potential energy:**
- Gravitational: PE = m g h (near Earth)
- Elastic: PE = 0.5 k x^2

### Conservation of Mechanical Energy

For conservative forces only:
- KE + PE = constant
- KE_i + PE_i = KE_f + PE_f

Conservative forces: gravitational, elastic, electrostatic
Non-conservative forces: friction, air resistance

## Power

Power is the rate of doing work.
- P = W/t
- P = dW/dt
- P = F v cos theta

## Collisions

**Momentum is always conserved** in an isolated system.

**Elastic collision:** momentum and KE conserved (e = 1)
**Inelastic collision:** momentum conserved, KE not conserved (0 < e < 1)
**Perfectly inelastic:** objects stick together (e = 0)` ,
    keyConcepts: [
      {
        title: "Work by Constant Force",
        description: "Work equals the component of force along displacement times distance.",
        formula: "W = F s cos theta",
      },
      {
        title: "Work-Energy Theorem",
        description: "Net work equals the change in kinetic energy.",
        formula: "W_net = delta KE",
      },
      {
        title: "Potential Energy",
        description: "Energy stored due to position or configuration.",
        formula: "PE = m g h, PE_spring = 0.5 k x^2",
      },
      {
        title: "Power",
        description: "Rate of doing work or transferring energy.",
        formula: "P = W/t = F v cos theta",
      },
      {
        title: "Collisions",
        description: "Momentum conservation applies to all collisions; energy depends on type.",
        formula: "m1 u1 + m2 u2 = m1 v1 + m2 v2",
      },
    ],
    formulas: [
      "W = F s cos theta",
      "W = integral F . ds",
      "KE = 0.5 m v^2",
      "W_net = delta KE",
      "PE = m g h",
      "PE_spring = 0.5 k x^2",
      "P = W/t = F v cos theta",
      "m1 u1 + m2 u2 = m1 v1 + m2 v2",
      "e = (speed of separation)/(speed of approach)",
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
        type: "concept",
        title: "Spring Energy Bar",
        description: "See energy conversion between kinetic and elastic potential energy.",
        config: {
          visualizationName: "spring-energy-bar",
        },
      },
      {
        type: "concept",
        title: "Collision Lab",
        description: "Test elastic and inelastic collisions and compare momentum/energy.",
        config: {
          visualizationName: "collision-lab",
        },
      },
      {
        type: "concept",
        title: "Work on an Incline",
        description: "Compare work done by gravity, normal force, and friction.",
        config: {
          visualizationName: "block-on-ramp",
        },
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

**Discrete particles:**
- r_cm = (sum m_i r_i) / (sum m_i)

**Motion of CM:**
- M a_cm = F_ext
- Internal forces cancel in a system

## Rotational Kinematics

Angular quantities:
- Angular displacement: theta (rad)
- Angular velocity: omega = d theta / dt
- Angular acceleration: alpha = d omega / dt

Relations with linear motion:
- v = r omega
- a_t = r alpha
- a_c = r omega^2

Rotational equations (constant alpha):
- omega = omega0 + alpha t
- theta = omega0 t + 0.5 alpha t^2
- omega^2 = omega0^2 + 2 alpha theta

## Torque and Angular Momentum

**Torque:**
- tau = r x F
- |tau| = r F sin theta

**Angular momentum:**
- L = r x p
- For rigid body: L = I omega

**Rotational form of Newton's second law:**
- tau_net = I alpha

## Moment of Inertia

- I = sum m_i r_i^2
- Larger I means more resistance to change in rotation

## Conservation of Angular Momentum

If net external torque is zero, angular momentum is conserved.

## Rolling Motion

For rolling without slipping:
- v = omega R` ,
    keyConcepts: [
      {
        title: "Center of Mass",
        description: "Point that represents average position of mass in a system.",
        formula: "r_cm = (sum m_i r_i) / (sum m_i)",
      },
      {
        title: "Torque",
        description: "Turning effect of a force about an axis.",
        formula: "tau = r x F",
      },
      {
        title: "Moment of Inertia",
        description: "Rotational analog of mass; depends on mass distribution.",
        formula: "I = sum m_i r_i^2",
      },
      {
        title: "Angular Momentum",
        description: "Rotational analog of linear momentum.",
        formula: "L = I omega",
      },
      {
        title: "Rotational Dynamics",
        description: "Net torque produces angular acceleration.",
        formula: "tau_net = I alpha",
      },
    ],
    formulas: [
      "r_cm = (sum m_i r_i) / (sum m_i)",
      "v = r omega",
      "a_t = r alpha",
      "a_c = r omega^2",
      "omega = omega0 + alpha t",
      "theta = omega0 t + 0.5 alpha t^2",
      "omega^2 = omega0^2 + 2 alpha theta",
      "tau = r x F",
      "L = I omega",
      "tau_net = I alpha",
      "v = omega R",
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
        type: "concept",
        title: "Angular Momentum Explorer",
        description: "See how torque and angular velocity change angular momentum.",
        config: {
          visualizationName: "angular-momentum",
        },
      },
      {
        type: "concept",
        title: "Torque and Lever Arm",
        description: "Observe how changing force and distance affects torque.",
        config: {
          visualizationName: "torque-wrench",
        },
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

Every particle attracts every other particle with a force proportional to the product of their masses and inversely proportional to the square of the distance between them.

**Formula:**
- F = G m1 m2 / r^2
- G = 6.67e-11 N m^2 / kg^2

## Gravitational Field

Gravitational field intensity at distance r from mass M:
- g = GM / r^2 (toward the mass)

At Earth's surface:
- g = GM / R^2

**Variation with height:**
- g_h = g (R/(R+h))^2

**Variation with depth (uniform density):**
- g_d = g (1 - d/R)

## Gravitational Potential Energy

- U = -GMm/r
- Zero at infinity, negative for bound systems
- delta U = GMm (1/r1 - 1/r2)

## Escape Velocity

Minimum speed to escape Earth's gravity (neglecting atmosphere):
- v_e = sqrt(2GM/R) = sqrt(2 g R)

## Orbital Motion

**Orbital speed (circular):**
- v_o = sqrt(GM/r)

**Time period:**
- T = 2 pi sqrt(r^3/GM)

**Relation:**
- v_e = sqrt(2) * v_o

## Kepler's Laws

1. Planets move in ellipses with the Sun at one focus.
2. Equal areas are swept in equal times (constant areal velocity).
3. T^2 is proportional to r^3 for planets around the same central mass.

## Satellites

**Geostationary orbit:**
- T = 24 h, orbit in equatorial plane, same direction as Earth` ,
    keyConcepts: [
      {
        title: "Universal Gravitation",
        description: "Gravitational force between two masses is proportional to m1 m2 and inversely proportional to r^2.",
        formula: "F = G m1 m2 / r^2",
      },
      {
        title: "Gravitational Field",
        description: "Field intensity due to a mass M at distance r.",
        formula: "g = GM / r^2",
      },
      {
        title: "Potential Energy",
        description: "Gravitational potential energy of a mass m at distance r.",
        formula: "U = -GMm/r",
      },
      {
        title: "Escape Velocity",
        description: "Minimum speed to escape a planet's gravity.",
        formula: "v_e = sqrt(2 g R)",
      },
      {
        title: "Orbital Motion",
        description: "Speed and period for circular orbit around mass M.",
        formula: "v_o = sqrt(GM/r), T = 2 pi sqrt(r^3/GM)",
      },
    ],
    formulas: [
      "F = G m1 m2 / r^2",
      "g = GM / r^2",
      "U = -GMm/r",
      "delta U = GMm (1/r1 - 1/r2)",
      "v_e = sqrt(2GM/R) = sqrt(2 g R)",
      "v_o = sqrt(GM/r)",
      "T = 2 pi sqrt(r^3/GM)",
      "g_h = g (R/(R+h))^2",
      "g_d = g (1 - d/R)",
      "T^2 = (4 pi^2 / GM) r^3",
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
        type: "concept",
        title: "Planetary Orbit Simulator",
        description: "Explore orbits and see how orbital speed changes with radius.",
        config: {
          visualizationName: "planetary-orbit",
        },
      },
      {
        type: "concept",
        title: "Angular Momentum in Orbits",
        description: "Equal areas in equal times from conservation of angular momentum.",
        config: {
          visualizationName: "angular-momentum",
        },
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

## Stress

Stress is the internal restoring force per unit area.
- Stress = F/A
- Unit: N/m^2 (Pa)

Types of stress:
- Tensile: stretching
- Compressive: squeezing
- Shear: tangential force

## Strain

Strain is the fractional change in dimension (dimensionless).
- Longitudinal strain = delta L / L
- Volumetric strain = delta V / V
- Shear strain = delta x / L (approx tan theta for small angles)

## Hooke's Law

Within elastic limit, stress is proportional to strain.
- stress = modulus * strain

## Elastic Moduli

**Young's modulus (Y):**
- Y = (normal stress)/(longitudinal strain)

**Bulk modulus (K):**
- K = - delta P / (delta V / V)

**Shear modulus (G):**
- G = (shear stress)/(shear strain)

**Poisson's ratio (nu):**
- nu = lateral strain / longitudinal strain

## Stress-Strain Curve

- Proportional limit: linear region
- Elastic limit: deformation still reversible
- Yield point: plastic deformation starts
- Ultimate strength and breaking point

## Elastic Energy

Energy stored per unit volume in a stretched wire:
- U = 0.5 * stress * strain` ,
    keyConcepts: [
      {
        title: "Stress",
        description: "Internal restoring force per unit area.",
        formula: "stress = F / A",
      },
      {
        title: "Strain",
        description: "Fractional change in dimension (dimensionless).",
        formula: "strain = delta L / L",
      },
      {
        title: "Young's Modulus",
        description: "Measures stiffness for longitudinal deformation.",
        formula: "Y = (stress)/(strain)",
      },
      {
        title: "Bulk Modulus",
        description: "Resistance to uniform compression.",
        formula: "K = - delta P / (delta V / V)",
      },
      {
        title: "Shear Modulus",
        description: "Resistance to shape change at constant volume.",
        formula: "G = (shear stress)/(shear strain)",
      },
    ],
    formulas: [
      "stress = F / A",
      "longitudinal strain = delta L / L",
      "volumetric strain = delta V / V",
      "shear strain = delta x / L",
      "Y = (stress)/(strain)",
      "K = - delta P / (delta V / V)",
      "G = (shear stress)/(shear strain)",
      "nu = lateral strain / longitudinal strain",
      "U = 0.5 * stress * strain",
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
    visualizationsData: [
      {
        type: "concept",
        title: "Stress-Strain Curve",
        description: "Elastic and plastic regions for a typical material.",
        config: {
          visualizationName: "stress-strain-curve",
        },
      },
      {
        type: "concept",
        title: "Elastic Energy Storage",
        description: "See how energy builds up as a solid is stretched or compressed.",
        config: {
          visualizationName: "spring-energy-bar",
        },
      },
    ],
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

- Pressure is force per unit area: P = F/A
- In a fluid at rest: P = rho g h

## Pascal's Law

Pressure applied to a confined fluid is transmitted equally in all directions.
- Hydraulic press: F2/F1 = A2/A1

## Archimedes' Principle

Buoyant force equals the weight of displaced fluid.
- F_b = rho_fluid V g
- Apparent weight: W_app = W - F_b

## Continuity Equation

For incompressible flow:
- A1 v1 = A2 v2

## Bernoulli's Equation

Along a streamline for ideal flow:
- P + 0.5 rho v^2 + rho g h = constant

## Viscosity

- Coefficient of viscosity: eta
- Reynolds number: Re = rho v D / eta
  - Re < 2000: laminar
  - Re > 3000: turbulent

**Stokes' law (small sphere):**
- F_viscous = 6 pi eta r v

**Terminal velocity:**
- v_t = 2 r^2 (rho_s - rho_f) g / (9 eta)

## Surface Tension and Capillarity

- Surface tension: T = F / L
- Capillary rise: h = 2 T cos theta / (rho g r)` ,
    keyConcepts: [
      {
        title: "Hydrostatic Pressure",
        description: "Pressure increases linearly with depth in a fluid at rest.",
        formula: "P = rho g h",
      },
      {
        title: "Buoyancy",
        description: "Upward force equals weight of displaced fluid.",
        formula: "F_b = rho_fluid V g",
      },
      {
        title: "Continuity",
        description: "For incompressible flow, area and speed are inversely related.",
        formula: "A1 v1 = A2 v2",
      },
      {
        title: "Bernoulli's Equation",
        description: "Pressure, kinetic, and potential terms sum to a constant along a streamline.",
        formula: "P + 0.5 rho v^2 + rho g h = constant",
      },
      {
        title: "Viscosity",
        description: "Fluid friction; determines laminar vs turbulent flow.",
        formula: "Re = rho v D / eta",
      },
    ],
    formulas: [
      "P = F / A",
      "P = rho g h",
      "F_b = rho_fluid V g",
      "A1 v1 = A2 v2",
      "P + 0.5 rho v^2 + rho g h = constant",
      "Re = rho v D / eta",
      "F_viscous = 6 pi eta r v",
      "v_t = 2 r^2 (rho_s - rho_f) g / (9 eta)",
      "T = F / L",
      "h = 2 T cos theta / (rho g r)",
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
    visualizationsData: [
      {
        type: "concept",
        title: "Pressure vs Depth",
        description: "Hydrostatic pressure increases linearly with depth.",
        config: {
          visualizationName: "pressure-depth-graph",
        },
      },
      {
        type: "concept",
        title: "Venturi Tube (Bernoulli)",
        description: "See how fluid speed and pressure change in a constricted pipe.",
        config: {
          visualizationName: "venturi-tube",
        },
      },
    ],
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
