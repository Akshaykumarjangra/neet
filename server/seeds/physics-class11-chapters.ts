import { db } from "../db";
import { chapterContent } from "@shared/schema";
import { eq, and } from "drizzle-orm";

const physicsClass11Chapters = [
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 1,
    chapterTitle: "Physical World",
    introduction: "The Physical World introduces the fundamental nature of physics as a science. It explores the scope and excitement of physics, the scientific method, and how physics connects with other sciences and technology.",
    detailedNotes: `# Physical World

## What is Physics?

Physics is the study of nature and natural phenomena. It deals with the fundamental constituents of the universe, the forces they exert on one another, and the results produced by these forces. The word "physics" comes from the Greek word "physikos" meaning "natural," emphasizing its role as the science of nature.

Physics aims to understand the universe at its most fundamental level - from the smallest subatomic particles to the largest structures in the cosmos. It seeks to discover the basic laws that govern all natural phenomena and express them in precise mathematical language.

### Historical Perspective

The development of physics has been a journey of human curiosity and ingenuity:

**Ancient Period (Before 1600):**
- Greek philosophers like Aristotle proposed theories about motion and matter
- Archimedes discovered principles of buoyancy and levers
- However, many ideas were based on logical reasoning rather than experimentation

**Classical Period (1600-1900):**
- **Galileo Galilei** - Father of modern physics, introduced experimental method
- **Isaac Newton** - Formulated laws of motion and universal gravitation
- **James Clerk Maxwell** - Unified electricity and magnetism
- **Lord Kelvin** and others developed thermodynamics

**Modern Period (1900-present):**
- **Max Planck** - Introduced quantum theory (1900)
- **Albert Einstein** - Theory of relativity (1905, 1916)
- **Niels Bohr, Heisenberg, Schrödinger** - Quantum mechanics
- **Current era** - Standard Model of particle physics, cosmology, quantum computing

### Scope and Excitement of Physics

Physics encompasses an extraordinary range of phenomena spanning over 40 orders of magnitude in size:

**Macroscopic Domain (Everyday scale):**
- Motion of objects (cars, projectiles, planets)
- Properties of materials (elasticity, conductivity, strength)
- Thermal phenomena (heat transfer, phase changes)
- Wave phenomena (sound, light, water waves)
- Working of machines and engines

**Microscopic Domain (Atomic and subatomic):**
- Atomic and molecular structure
- Quantum mechanical behavior of particles
- Nuclear structure and radioactivity
- Elementary particles and their interactions
- Quantum field theory

**Astronomical Domain (Cosmic scale):**
- Motion of celestial bodies
- Structure and evolution of stars
- Black holes and neutron stars
- Galaxies and large-scale structure of universe
- Dark matter and dark energy

### Physics and Technology

Physics has been the primary driver of technological revolution throughout human history. Every major technological advancement has its roots in fundamental physics discoveries:

**1. Mechanics and Engineering:**
- Newton's laws enabled the design of complex machines, bridges, and buildings
- Understanding of materials led to stronger alloys and composites
- Fluid dynamics enabled aircraft and ship design

**2. Thermodynamics and Energy:**
- Steam engines sparked the Industrial Revolution
- Internal combustion engines revolutionized transportation
- Refrigeration and air conditioning transformed living conditions
- Power plants convert various energy forms to electricity

**3. Electromagnetism:**
- Electric motors and generators
- Telegraph, telephone, and radio communication
- Television and broadcasting
- Power transmission over long distances

**4. Optics and Photonics:**
- Microscopes and telescopes expanded our vision
- Fiber optic communications
- Lasers in medicine, manufacturing, and data storage
- LED lighting and displays

**5. Quantum Mechanics:**
- Semiconductors and transistors → Computer revolution
- Integrated circuits → Smartphones and modern electronics
- Lasers → CD/DVD players, barcode scanners, surgery
- MRI and PET scans in medical imaging
- Quantum computing (emerging technology)

**6. Nuclear Physics:**
- Nuclear power plants
- Radiotherapy for cancer treatment
- Radioactive tracers in medicine
- Carbon dating and archaeological research
- Nuclear weapons (unfortunately)

### Fundamental Forces in Nature

All phenomena in the universe result from four fundamental forces. Understanding these forces is key to understanding all of physics:

**1. Gravitational Force:**
- Weakest of all forces but has infinite range
- Always attractive, never repulsive
- Acts between all objects with mass
- Governs planetary motion, tides, galaxy formation
- Described by Newton's law and Einstein's General Relativity
- Strength: 10⁻³⁹ (relative to strong force)

**2. Electromagnetic Force:**
- Acts between charged particles
- Can be attractive or repulsive
- Responsible for atomic structure and chemical bonds
- Causes friction, normal force, tension in everyday life
- Described by Maxwell's equations
- Strength: 10⁻² (relative to strong force)

**3. Strong Nuclear Force:**
- Strongest force in nature
- Very short range (~10⁻¹⁵ m, size of nucleus)
- Binds quarks into protons and neutrons
- Binds protons and neutrons in atomic nucleus
- Overcomes electromagnetic repulsion between protons
- Strength: 1 (reference)

**4. Weak Nuclear Force:**
- Responsible for radioactive beta decay
- Very short range (~10⁻¹⁸ m)
- Causes nuclear transmutations
- Essential for nuclear reactions in stars
- Strength: 10⁻⁶ (relative to strong force)

### Unification of Forces

One of physics' greatest achievements has been the unification of apparently different forces:

1. **Newton** unified terrestrial and celestial mechanics (same laws apply on Earth and in space)
2. **Maxwell** unified electricity and magnetism into electromagnetism
3. **Weinberg, Salam, Glashow** unified electromagnetic and weak forces into "electroweak" force
4. **Current goal**: Unify all four forces into a single "Theory of Everything"

### The Scientific Method in Physics

Physics is an empirical science - it relies on observations and experiments. The scientific method provides a systematic approach:

**1. Observation:**
- Careful, systematic examination of natural phenomena
- Use of instruments to extend human senses
- Recording of quantitative data

**2. Hypothesis Formation:**
- Proposed explanation based on observations
- Should be testable and falsifiable
- Often expressed mathematically

**3. Experimentation:**
- Controlled tests of the hypothesis
- Variables are isolated and measured
- Results must be reproducible

**4. Analysis:**
- Mathematical and statistical treatment of data
- Comparison with theoretical predictions
- Error analysis and uncertainty estimation

**5. Conclusion:**
- Support or rejection of hypothesis
- Modification of hypothesis if needed
- Peer review and publication

**6. Theory/Law Development:**
- Well-established principles that explain wide range of phenomena
- Laws: Mathematical relationships (e.g., F = ma)
- Theories: Comprehensive explanations (e.g., quantum theory)

### Conservation Laws - The Pillars of Physics

Conservation laws state that certain quantities remain constant in isolated systems. They are among the most powerful tools in physics:

**Conservation of Energy:**
- Total energy in isolated system remains constant
- Energy can transform between forms (kinetic ↔ potential)
- Led to the concept of energy itself
- Consequence of time translation symmetry (Noether's theorem)

**Conservation of Linear Momentum:**
- Total momentum in isolated system remains constant
- Crucial for analyzing collisions
- Consequence of space translation symmetry
- Basis for rocket propulsion

**Conservation of Angular Momentum:**
- Important in rotational motion
- Explains why planets orbit in same plane
- Why figure skaters spin faster when arms pulled in
- Consequence of rotational symmetry

**Conservation of Charge:**
- Electric charge can neither be created nor destroyed
- Net charge in isolated system remains constant
- Fundamental to all electromagnetic phenomena

### Physics and Society

Physics has profound impact on society beyond technology:

**Economic Impact:**
- High-tech industries employ millions worldwide
- Physics research drives innovation and economic growth
- Medical physics saves countless lives

**Environmental Applications:**
- Understanding climate change and global warming
- Renewable energy technologies (solar, wind, nuclear fusion)
- Monitoring and protecting Earth's environment

**Philosophical Impact:**
- Challenges our understanding of reality
- Questions about determinism vs. free will
- Nature of space, time, and causality

**Cultural Influence:**
- Popular science books and documentaries
- Science fiction inspired by physics discoveries
- Public fascination with cosmos and quantum mechanics

### Physics in Everyday Life

Physics is not just an academic subject - it explains countless everyday phenomena:

- **Walking**: Friction between shoes and ground
- **Drinking through straw**: Atmospheric pressure
- **Cooking**: Heat transfer and phase changes
- **Rainbows**: Refraction and dispersion of light
- **Mirrors and lenses**: Reflection and refraction
- **Musical instruments**: Wave phenomena and resonance
- **Sports**: Projectile motion, momentum, energy
- **Weather**: Thermodynamics and fluid dynamics

Understanding physics helps us appreciate the beauty and order in nature, make informed decisions about technology, and satisfy our innate curiosity about how the universe works.`,
    keyConcepts: [
      {
        title: "Fundamental Forces",
        description: "Four fundamental forces govern all interactions: gravitational, electromagnetic, strong nuclear, and weak nuclear forces",
      },
      {
        title: "Scientific Method",
        description: "Systematic approach: observation → hypothesis → experimentation → analysis → conclusion → theory",
      },
      {
        title: "Conservation Laws",
        description: "Fundamental principles stating that certain quantities (energy, momentum, charge) remain constant in isolated systems",
      },
      {
        title: "Scope of Physics",
        description: "Physics spans from subatomic particles to the cosmos, connecting microscopic and macroscopic phenomena",
      },
    ],
    formulas: [],
    importantTopics: [
      "Fundamental forces in nature",
      "Scientific method",
      "Scope and excitement of physics",
      "Conservation laws",
      "Physics and technology",
      "Unification of forces",
    ],
    learningObjectives: [
      "Understand the scope and nature of physics",
      "Learn about the four fundamental forces",
      "Appreciate the role of physics in technology",
      "Understand the scientific method",
      "Recognize conservation laws in physics",
    ],
    prerequisites: ["Basic scientific curiosity", "Elementary mathematics"],
    ncertChapterRef: "Class 11 Physics - Chapter 1",
    visualizationsData: [
      {
        type: "concept",
        title: "Timeline of Physics Discoveries",
        description: "Interactive timeline showing major physics breakthroughs from ancient Greece to modern quantum computing",
      },
      {
        type: "concept",
        title: "Fundamental Forces Comparison",
        description: "Visual comparison of the four fundamental forces showing their relative strengths and ranges",
      },
      {
        type: "atomic-structure",
        title: "Atomic Structure - Microscopic World",
        description: "3D visualization of atomic structure showing the microscopic domain of physics",
        config: {
          protons: 6,
          neutrons: 6,
          electrons: 6,
          showOrbits: true
        }
      },
      {
        type: "planetary-orbit-3d",
        title: "Planetary Motion - Astronomical Domain",
        description: "3D simulation of planetary orbits demonstrating the astronomical scale of physics",
      },
    ],
    difficultyLevel: 1,
    estimatedStudyMinutes: 180,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 2,
    chapterTitle: "Units and Measurement",
    introduction: "Measurement is fundamental to science. This chapter introduces the International System of Units (SI), measurement techniques, dimensional analysis, and the treatment of experimental errors.",
    detailedNotes: `# Units and Measurement

## The Importance of Measurement

Physics is a quantitative science - we measure physical quantities to describe and understand natural phenomena precisely.

### Physical Quantities

**Fundamental Quantities** (7 in SI system):
1. **Length** (meter, m) - Distance, size
2. **Mass** (kilogram, kg) - Amount of matter
3. **Time** (second, s) - Duration
4. **Electric Current** (ampere, A) - Flow of charge
5. **Temperature** (kelvin, K) - Thermal state
6. **Amount of Substance** (mole, mol) - Number of particles
7. **Luminous Intensity** (candela, cd) - Light intensity

**Derived Quantities** are combinations of fundamental quantities:
- Area = Length × Length (m²)
- Volume = Length³ (m³)
- Velocity = Length/Time (m/s)
- Force = Mass × Acceleration (kg⋅m/s² = N)

### Dimensional Analysis

Dimensions represent the nature of a physical quantity, expressed in terms of fundamental quantities.

**Principle of Homogeneity:** In a valid physical equation, dimensions on both sides must be the same.

**Uses of Dimensional Analysis:**
1. **Check validity** of physical equations
2. **Derive relationships** between physical quantities
3. **Convert units** from one system to another

**Limitations:**
- Cannot determine dimensionless constants
- Cannot be used for equations with multiple terms
- Not applicable to trigonometric, exponential functions

### Significant Figures

Rules for determining significant figures:
1. All non-zero digits are significant
2. Zeros between non-zero digits are significant
3. Trailing zeros after decimal point are significant
4. Leading zeros are NOT significant

**Rounding Rules:**
- If digit to be dropped < 5, leave the preceding digit unchanged
- If digit to be dropped ≥ 5, increase preceding digit by 1

### Errors in Measurement

**Types of Errors:**

1. **Systematic Errors** - Consistent, predictable errors
   - Instrumental errors (faulty equipment)
   - Personal errors (observer bias)
   - Environmental errors (temperature, pressure variations)

2. **Random Errors** - Unpredictable variations
   - Can be reduced by taking multiple measurements
   - Follow statistical laws

**Error Analysis:**

Absolute Error: Δa = |a_measured - a_true|
Relative Error: Δa/a
Percentage Error: (Δa/a) × 100%

### Precision vs Accuracy

- **Accuracy** - How close a measurement is to the true value
- **Precision** - How close measurements are to each other
- A measurement can be precise but not accurate, or vice versa`,
    keyConcepts: [
      {
        title: "SI Units",
        description: "Seven fundamental units: meter (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd)",
      },
      {
        title: "Dimensional Formula",
        description: "Expression showing how a physical quantity depends on fundamental quantities. Format: [M^a L^b T^c]",
        formula: "[Force] = [M L T^(-2)]",
      },
      {
        title: "Least Count",
        description: "Smallest measurement that can be made accurately with a measuring instrument",
      },
      {
        title: "Significant Figures",
        description: "Digits in a number that carry meaningful information about its precision",
      },
      {
        title: "Percentage Error",
        description: "Ratio of absolute error to true value, expressed as percentage",
        formula: "% Error = (Δa/a) × 100%",
      },
    ],
    formulas: [
      "Dimensional Formula: [Physical Quantity] = [M^a L^b T^c I^d Θ^e N^f J^g]",
      "Absolute Error: Δa = |a_measured - a_true|",
      "Mean Absolute Error: Δa_mean = (Δa₁ + Δa₂ + ... + Δaₙ)/n",
      "Relative Error: Δa/a",
      "Percentage Error: (Δa/a) × 100%",
    ],
    importantTopics: [
      "SI Units and their definitions",
      "Fundamental and derived quantities",
      "Dimensional analysis and its applications",
      "Significant figures and rounding",
      "Types of errors (systematic and random)",
      "Precision vs accuracy",
      "Least count of instruments",
    ],
    learningObjectives: [
      "Master SI units and conversions",
      "Apply dimensional analysis to check equations",
      "Determine significant figures correctly",
      "Calculate and minimize measurement errors",
      "Distinguish between precision and accuracy",
    ],
    prerequisites: ["Basic algebra", "Understanding of physical quantities"],
    ncertChapterRef: "Class 11 Physics - Chapter 2",
    visualizationsData: [
      {
        type: "concept",
        title: "SI Units and Measurement Scales",
        description: "Interactive visualization of SI units and their relationships",
      },
      {
        type: "concept",
        title: "Dimensional Analysis Examples",
        description: "Step-by-step demonstrations of dimensional analysis for verifying equations",
      },
    ],
    difficultyLevel: 2,
    estimatedStudyMinutes: 240,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 3,
    chapterTitle: "Motion in a Straight Line",
    introduction: "This chapter introduces kinematics - the description of motion without considering its causes. We study position, velocity, acceleration, and the mathematical relationships governing motion in one dimension.",
    detailedNotes: `# Motion in a Straight Line

## Introduction to Kinematics

Kinematics is the branch of mechanics that describes motion without considering the forces causing it.

### Key Concepts

**Position and Displacement:**
- **Position (x)** - Location of an object relative to a reference point
- **Displacement (Δx)** - Change in position, a vector quantity
- Displacement = Final position - Initial position = x₂ - x₁

**Distance vs Displacement:**
- Distance is scalar (magnitude only), always positive
- Displacement is vector (magnitude + direction), can be positive or negative

### Velocity

**Average Velocity:**
- Rate of change of displacement with time
- v_avg = Δx/Δt = (x₂ - x₁)/(t₂ - t₁)
- Vector quantity, can be positive or negative

**Instantaneous Velocity:**
- Velocity at a specific instant
- v = lim(Δt→0) Δx/Δt = dx/dt
- Slope of position-time graph at that point

**Speed vs Velocity:**
- Speed is magnitude of velocity (always positive)
- Average speed = Total distance/Total time

### Acceleration

**Average Acceleration:**
- Rate of change of velocity with time
- a_avg = Δv/Δt = (v₂ - v₁)/(t₂ - t₁)

**Instantaneous Acceleration:**
- a = lim(Δt→0) Δv/Δt = dv/dt = d²x/dt²
- Slope of velocity-time graph

### Equations of Motion (Uniform Acceleration)

For motion with constant acceleration a:

1. **First Equation:** v = u + at
   - Links velocity, initial velocity, acceleration, time

2. **Second Equation:** s = ut + ½at²
   - Links displacement, initial velocity, acceleration, time

3. **Third Equation:** v² = u² + 2as
   - Links velocities, acceleration, displacement (time-independent)

Where:
- u = initial velocity
- v = final velocity
- a = acceleration
- t = time
- s = displacement

### Graphical Analysis

**Position-Time Graph:**
- Slope = velocity
- Curved line indicates changing velocity (acceleration)
- Straight line indicates constant velocity

**Velocity-Time Graph:**
- Slope = acceleration
- Area under curve = displacement
- Horizontal line indicates constant velocity (zero acceleration)

**Acceleration-Time Graph:**
- Area under curve = change in velocity

### Free Fall

Motion under gravity (neglecting air resistance):
- Acceleration due to gravity: g = 9.8 m/s² (downward)
- For upward motion: a = -g
- For downward motion: a = +g

**At maximum height:**
- Final velocity v = 0
- Time to reach max height: t = u/g
- Maximum height: h = u²/2g

### Relative Motion

When two objects A and B are moving:
- Relative velocity of A with respect to B: v_AB = v_A - v_B
- If both moving in same direction: |v_AB| = |v_A - v_B|
- If moving in opposite directions: |v_AB| = |v_A + v_B|`,
    keyConcepts: [
      {
        title: "Displacement",
        description: "Change in position, a vector quantity with magnitude and direction",
        formula: "Δx = x₂ - x₁",
      },
      {
        title: "Average Velocity",
        description: "Rate of change of displacement with time",
        formula: "v_avg = Δx/Δt",
      },
      {
        title: "Instantaneous Velocity",
        description: "Velocity at a specific instant, derivative of position",
        formula: "v = dx/dt",
      },
      {
        title: "Acceleration",
        description: "Rate of change of velocity with time",
        formula: "a = dv/dt = d²x/dt²",
      },
      {
        title: "Equations of Motion",
        description: "Three fundamental equations for uniformly accelerated motion",
        formula: "v = u + at, s = ut + ½at², v² = u² + 2as",
      },
    ],
    formulas: [
      "v = u + at",
      "s = ut + ½at²",
      "v² = u² + 2as",
      "s = ½(u + v)t",
      "sₙₜₕ = u + ½a(2n - 1)",
      "Average velocity = (Initial velocity + Final velocity)/2 = (u + v)/2",
      "Distance in nth second: sₙ = u + a(n - ½)",
    ],
    importantTopics: [
      "Distance and displacement",
      "Speed and velocity",
      "Acceleration",
      "Equations of motion for uniform acceleration",
      "Graphical representation of motion",
      "Free fall under gravity",
      "Relative motion in one dimension",
    ],
    learningObjectives: [
      "Distinguish between distance and displacement",
      "Calculate velocity and acceleration",
      "Apply equations of motion to solve problems",
      "Interpret position-time and velocity-time graphs",
      "Analyze free fall motion",
      "Solve problems involving relative motion",
    ],
    prerequisites: [
      "Basic calculus (derivatives)",
      "Vector basics",
      "Graph interpretation",
      "Algebra",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 3",
    visualizationsData: [
      {
        type: "wave-motion",
        title: "Wave Motion Demonstration",
        description: "Interactive visualization of transverse and longitudinal waves showing motion principles",
        config: {
          waveType: "transverse",
          amplitude: 1.2,
          frequency: 1.5
        }
      },
    ],
    difficultyLevel: 3,
    estimatedStudyMinutes: 300,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 4,
    chapterTitle: "Motion in a Plane",
    introduction: "Motion in a plane extends kinematics to two dimensions. This chapter covers vector analysis, projectile motion, circular motion, and relative velocity in two dimensions.",
    detailedNotes: `# Motion in a Plane

## Two-Dimensional Motion

In plane motion, position, velocity, and acceleration are vector quantities with both x and y components.

### Vector Representation

**Position Vector:**
- r⃗ = x î + y ĵ
- Magnitude: |r⃗| = √(x² + y²)
- Direction: θ = tan⁻¹(y/x)

**Velocity Vector:**
- v⃗ = vₓ î + vᵧ ĵ
- v⃗ = dr⃗/dt
- Components: vₓ = dx/dt, vᵧ = dy/dt

**Acceleration Vector:**
- a⃗ = aₓ î + aᵧ ĵ
- a⃗ = dv⃗/dt

### Projectile Motion

Motion of an object thrown into the air, subject only to gravity and initial velocity.

**Key Assumptions:**
1. Air resistance is negligible
2. Acceleration due to gravity (g) is constant
3. Motion is in a vertical plane

**Horizontal Motion (x-direction):**
- No acceleration (aₓ = 0)
- Velocity is constant: vₓ = u cos θ
- Displacement: x = (u cos θ)t

**Vertical Motion (y-direction):**
- Acceleration = -g (downward)
- Initial velocity: vᵧ₀ = u sin θ
- Velocity: vᵧ = u sin θ - gt
- Displacement: y = (u sin θ)t - ½gt²

**Important Results:**

1. **Time of Flight:**
   T = (2u sin θ)/g

2. **Maximum Height:**
   H = (u² sin² θ)/(2g)

3. **Range:**
   R = (u² sin 2θ)/g
   - Maximum range when θ = 45°
   - Same range for complementary angles (θ and 90° - θ)

4. **Equation of Trajectory:**
   y = x tan θ - (gx²)/(2u² cos² θ)
   - Parabolic path

### Uniform Circular Motion

Motion along a circular path with constant speed.

**Characteristics:**
- Speed is constant, but velocity changes (direction changes)
- Acceleration is always directed toward center (centripetal)

**Centripetal Acceleration:**
- a_c = v²/r = ω²r
- Direction: Always toward center
- Magnitude constant, direction continuously changing

**Angular Quantities:**
- Angular displacement: θ (radians)
- Angular velocity: ω = dθ/dt = v/r
- Angular acceleration: α = dω/dt

**Relation between linear and angular quantities:**
- v = rω (linear velocity)
- a_t = rα (tangential acceleration)
- a_c = rω² (centripetal acceleration)

**Centripetal Force:**
- F_c = ma_c = mv²/r = mω²r
- Directed toward center
- Required to keep object moving in circle

### Non-Uniform Circular Motion

When speed changes along circular path:
- **Tangential acceleration (a_t)** - Changes speed
- **Centripetal acceleration (a_c)** - Changes direction
- **Net acceleration:** a = √(a_t² + a_c²)

### Relative Motion in a Plane

**Relative Velocity:**
- v⃗_AB = v⃗_A - v⃗_B
- Vector subtraction using components

**River-Boat Problems:**
- Velocity of boat relative to ground = v⃗_boat + v⃗_river
- To cross perpendicular: boat must aim upstream
- Shortest time: aim perpendicular to current
- Shortest path: aim at angle to compensate for current`,
    keyConcepts: [
      {
        title: "Projectile Motion",
        description: "2D motion under constant gravitational acceleration with independent horizontal and vertical components",
      },
      {
        title: "Range of Projectile",
        description: "Horizontal distance covered by projectile",
        formula: "R = (u² sin 2θ)/g",
      },
      {
        title: "Maximum Height",
        description: "Peak height reached by projectile",
        formula: "H = (u² sin² θ)/(2g)",
      },
      {
        title: "Centripetal Acceleration",
        description: "Acceleration directed toward center in circular motion",
        formula: "a_c = v²/r = ω²r",
      },
      {
        title: "Angular Velocity",
        description: "Rate of change of angular displacement",
        formula: "ω = dθ/dt = v/r",
      },
    ],
    formulas: [
      "Range: R = (u² sin 2θ)/g",
      "Maximum Height: H = (u² sin² θ)/(2g)",
      "Time of Flight: T = (2u sin θ)/g",
      "Trajectory: y = x tan θ - (gx²)/(2u² cos² θ)",
      "Centripetal acceleration: a_c = v²/r = ω²r",
      "Centripetal force: F_c = mv²/r = mω²r",
      "Angular velocity: ω = v/r",
      "Linear velocity: v = rω",
      "Period of circular motion: T = 2πr/v = 2π/ω",
    ],
    importantTopics: [
      "Vector addition and subtraction",
      "Projectile motion equations",
      "Trajectory of projectile",
      "Uniform circular motion",
      "Centripetal acceleration and force",
      "Angular quantities (ω, α, θ)",
      "Relative velocity in 2D",
      "River-boat problems",
    ],
    learningObjectives: [
      "Resolve vectors into components",
      "Analyze projectile motion problems",
      "Calculate range, height, and time of flight",
      "Understand circular motion dynamics",
      "Apply centripetal force concepts",
      "Solve relative motion problems in 2D",
    ],
    prerequisites: [
      "Vectors and their operations",
      "Trigonometry",
      "Motion in straight line",
      "Newton's laws of motion",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 4",
    visualizationsData: [
      {
        type: "projectile-motion",
        title: "Projectile Motion Simulator",
        description: "Interactive 3D visualization showing parabolic trajectory with adjustable angle and velocity",
        config: {
          initialVelocity: 20,
          launchAngle: 45,
          gravity: 9.8
        }
      },
      {
        type: "circular-motion",
        title: "Circular Motion",
        description: "Animated demonstration of centripetal force and velocity in circular motion",
        config: {
          radius: 3,
          angularVelocity: 1
        }
      },
      {
        type: "concept",
        title: "Range vs Angle",
        description: "Graph showing how range varies with projection angle",
      },
    ],
    difficultyLevel: 4,
    estimatedStudyMinutes: 360,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 5,
    chapterTitle: "Laws of Motion",
    introduction: "This chapter introduces Newton's three laws of motion, which form the foundation of classical mechanics. We study forces, inertia, momentum, and their applications in everyday phenomena.",
    detailedNotes: `# Laws of Motion

## Introduction to Dynamics

Dynamics is the study of motion and the forces that cause it. Newton's laws provide the fundamental framework.

### Aristotle's Fallacy

Aristotle believed that force is necessary to keep an object moving. This was proven wrong by Galileo and Newton, who showed that objects continue moving at constant velocity unless acted upon by a force.

### Newton's First Law (Law of Inertia)

**Statement:** An object at rest stays at rest, and an object in motion stays in motion with constant velocity, unless acted upon by a net external force.

**Key Concepts:**
- **Inertia** - Resistance to change in state of motion
- Directly proportional to mass
- Greater mass = greater inertia

**Inertial Frame of Reference:**
- Frame in which Newton's first law holds true
- Not accelerating relative to "fixed stars"
- Most frames on Earth are approximately inertial

### Newton's Second Law (Law of Acceleration)

**Statement:** The rate of change of momentum is proportional to the applied force and occurs in the direction of the force.

**Mathematical Form:**
- F⃗ = dp⃗/dt = d(mv⃗)/dt
- For constant mass: F⃗ = ma⃗
- SI Unit of Force: Newton (N) = kg⋅m/s²

**Important Points:**
1. Force and acceleration are in the same direction
2. Acceleration is proportional to force
3. Acceleration is inversely proportional to mass
4. Net force determines acceleration

**Momentum:**
- p⃗ = mv⃗
- Vector quantity
- SI unit: kg⋅m/s

### Newton's Third Law (Law of Action-Reaction)

**Statement:** For every action, there is an equal and opposite reaction.

**Characteristics:**
1. Action and reaction forces are equal in magnitude
2. Opposite in direction
3. Act on different bodies
4. Cannot cancel each other (different objects)
5. Same type of force

**Examples:**
- Rocket propulsion (exhaust gases push back, rocket moves forward)
- Walking (foot pushes ground backward, ground pushes foot forward)
- Swimming (hands push water back, water pushes swimmer forward)

### Conservation of Momentum

**Statement:** Total momentum of an isolated system remains constant.

**Mathematical Form:**
- p⃗_initial = p⃗_final
- m₁u⃗₁ + m₂u⃗₂ = m₁v⃗₁ + m₂v⃗₂

**Applications:**
- Collisions
- Explosions
- Rocket propulsion

### Types of Forces

**1. Contact Forces:**
- Normal force (N) - Perpendicular to surface
- Friction (f) - Opposes relative motion
- Tension (T) - Force in a string/rope
- Spring force - F = -kx (Hooke's law)

**2. Field Forces (Action at a distance):**
- Gravitational force
- Electromagnetic force
- Nuclear forces

### Friction

**Static Friction (f_s):**
- Acts when object is at rest
- Opposes tendency to move
- f_s ≤ μ_s N (maximum value)
- Self-adjusting force

**Kinetic Friction (f_k):**
- Acts when object is moving
- Opposes motion
- f_k = μ_k N (constant value)
- μ_k < μ_s (kinetic coefficient less than static)

**Advantages of Friction:**
- Walking, running possible
- Writing on paper
- Brakes in vehicles
- Holding objects

**Disadvantages:**
- Energy loss
- Wear and tear
- Heat generation

**Reducing Friction:**
- Lubrication
- Polishing surfaces
- Using ball bearings
- Streamlining (reduce air resistance)

### Equilibrium

**Conditions for Equilibrium:**
1. **Translational Equilibrium:** ΣF⃗ = 0 (no linear acceleration)
2. **Rotational Equilibrium:** Στ = 0 (no angular acceleration)

**Types:**
- **Static Equilibrium** - Object at rest
- **Dynamic Equilibrium** - Object moving with constant velocity

### Free Body Diagrams (FBD)

A diagram showing all forces acting on a single object:
1. Isolate the object
2. Draw all external forces
3. Choose coordinate system
4. Resolve forces if necessary
5. Apply Newton's laws

### Impulse

**Definition:** Change in momentum
- J⃗ = Δp⃗ = F⃗Δt
- Unit: N⋅s or kg⋅m/s

**Impulse-Momentum Theorem:**
- J⃗ = F⃗_avg Δt = Δp⃗

**Applications:**
- Airbags (increase time, reduce force)
- Following through in sports
- Bending knees when landing`,
    keyConcepts: [
      {
        title: "Newton's First Law",
        description: "An object continues in its state of rest or uniform motion unless acted upon by a net external force",
      },
      {
        title: "Newton's Second Law",
        description: "Rate of change of momentum equals applied force",
        formula: "F = ma or F = dp/dt",
      },
      {
        title: "Newton's Third Law",
        description: "For every action, there is an equal and opposite reaction",
        formula: "F_AB = -F_BA",
      },
      {
        title: "Conservation of Momentum",
        description: "Total momentum of isolated system remains constant",
        formula: "p_initial = p_final",
      },
      {
        title: "Friction",
        description: "Force that opposes relative motion between surfaces",
        formula: "f_s ≤ μ_s N, f_k = μ_k N",
      },
      {
        title: "Impulse",
        description: "Change in momentum, equal to force × time",
        formula: "J = FΔt = Δp",
      },
    ],
    formulas: [
      "F = ma",
      "F = dp/dt",
      "p = mv",
      "f_s ≤ μ_s N (static friction)",
      "f_k = μ_k N (kinetic friction)",
      "J = FΔt = Δp (impulse)",
      "Conservation of momentum: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂",
      "Weight: W = mg",
      "Hooke's law: F = -kx",
    ],
    importantTopics: [
      "Newton's three laws of motion",
      "Inertia and inertial frames",
      "Momentum and its conservation",
      "Types of forces (contact and field forces)",
      "Friction (static and kinetic)",
      "Free body diagrams",
      "Equilibrium conditions",
      "Impulse and impulse-momentum theorem",
      "Action-reaction pairs",
    ],
    learningObjectives: [
      "State and apply Newton's laws of motion",
      "Draw and analyze free body diagrams",
      "Solve problems involving multiple forces",
      "Understand and apply conservation of momentum",
      "Calculate friction forces",
      "Distinguish between action-reaction pairs",
      "Apply impulse-momentum theorem",
    ],
    prerequisites: [
      "Kinematics (motion in 1D and 2D)",
      "Vectors and vector operations",
      "Basic calculus",
      "Trigonometry",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 5",
    visualizationsData: [
      {
        type: "concept",
        title: "Newton's Laws Demonstrations",
        description: "Interactive animations showing each of Newton's three laws with real-world examples",
      },
      {
        type: "concept",
        title: "Free Body Diagram Builder",
        description: "Tool to practice drawing and analyzing free body diagrams",
      },
      {
        type: "concept",
        title: "Friction Forces",
        description: "Graph showing static and kinetic friction vs applied force",
      },
    ],
    difficultyLevel: 4,
    estimatedStudyMinutes: 420,
    status: "published" as const,
  },
];

export async function seedPhysicsClass11() {
  console.log("🌱 Seeding Physics Class 11 chapters...");

  try {
    for (const chapter of physicsClass11Chapters) {
      const result = await db
        .insert(chapterContent)
        .values(chapter)
        .onConflictDoUpdate({
          target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
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
            updatedAt: new Date(),
          },
        })
        .returning();

      if (result) {
        console.log(`  ✅ Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle} upserted`);
      }
    }

    console.log("✅ Physics Class 11 seeding completed!");
  } catch (error) {
    console.error("❌ Error seeding Physics chapters:", error);
    throw error;
  }
}

seedPhysicsClass11()
  .then(() => {
    console.log("Seed completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
