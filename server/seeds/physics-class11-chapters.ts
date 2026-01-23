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
        title: "Scale of the Physical World",
        description: "From subatomic particles to galaxies and beyond",
        config: {
          visualizationName: "physics-scale-overview"
        }
      },
      {
        type: "concept",
        title: "Fundamental Forces Comparison",
        description: "Relative strength and range of gravitational, electromagnetic, strong, and weak forces",
        config: {
          visualizationName: "fundamental-forces-comparison"
        }
      },
      {
        type: "concept",
        title: "Scientific Method Flow",
        description: "Observation to conclusion: the cycle used to build scientific laws",
        config: {
          visualizationName: "scientific-method-flow"
        }
      },
      {
        type: "concept",
        title: "Conservation Laws Snapshot",
        description: "Energy, momentum, angular momentum, and charge in one view",
        config: {
          visualizationName: "conservation-laws-summary"
        }
      },
      {
        type: "concept",
        title: "Unification Ladder",
        description: "Major milestones in unifying physical laws and forces",
        config: {
          visualizationName: "physics-unification-ladder"
        }
      },
      {
        type: "concept",
        title: "Physics and Technology Map",
        description: "How physics powers real-world tools, medicine, and communication",
        config: {
          visualizationName: "physics-technology-map"
        }
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
    chapterTitle: "Units and Measurements",
    introduction: "Measurement is the backbone of physics. This chapter covers SI units, measurement of length/time/mass, significant figures, dimensional analysis, and error propagation.",
    detailedNotes: `# Units and Measurements

## Why Measurement Matters

Physics is a quantitative science. Every law connects measurable quantities, so careful measurement is the starting point of good science.

## Physical Quantities and SI Units

**Fundamental Quantities (SI base):**
1. **Length** (meter, m)
2. **Mass** (kilogram, kg)
3. **Time** (second, s)
4. **Electric Current** (ampere, A)
5. **Temperature** (kelvin, K)
6. **Amount of Substance** (mole, mol)
7. **Luminous Intensity** (candela, cd)

**Derived Quantities:**
- Area = length x length (m^2)
- Volume = length^3 (m^3)
- Velocity = length/time (m/s)
- Force = mass x acceleration (kg*m/s^2 = N)
- Pressure = force/area (N/m^2 = Pa)

## Measurement of Length

**Parallax error:** occurs when the eye is not in line with the pointer/scale. Minimize by viewing perpendicular to the scale.

**Vernier Caliper:**
- Measures internal/external diameter and depth.
- Least count = 1 MSD - 1 VSD.
- Zero error correction: subtract positive error, add negative error.

**Screw Gauge (Micrometer):**
- Measures very small diameters (wire, sheet thickness).
- Pitch = linear distance moved in one full rotation.
- Least count = pitch / number of circular scale divisions.
- Zero error correction: subtract positive error, add negative error.

## Measurement of Time and Mass

- **Time:** The SI second is defined by the Cs-133 atomic clock.
- **Mass:** Measured using a beam balance; mass is independent of gravity.

## Dimensional Analysis

Dimensions show how a quantity depends on base quantities.

**Principle of Homogeneity:** Dimensions on both sides of a valid equation must match.

**Uses:**
1. Check equation validity
2. Convert units
3. Derive relations (up to a constant)

**Limitations:**
- Cannot determine numerical constants
- Not suitable for multi-term equations
- Not valid for trigonometric or exponential functions

## Significant Figures

Rules:
1. All non-zero digits are significant.
2. Zeros between non-zero digits are significant.
3. Trailing zeros after a decimal point are significant.
4. Leading zeros are not significant.

Rounding:
- If the next digit < 5, keep the digit.
- If the next digit >= 5, increase the digit by 1.

## Errors and Uncertainty

**Types of errors:**
- Systematic (instrumental, personal, environmental)
- Random (statistical fluctuations)

**Basic definitions:**
Absolute error = |a_measured - a_true|
Relative error = absolute error / true value
Percentage error = (absolute error / true value) x 100%

**Error propagation (products/powers):**
If Q = a^p b^q / c^r, then percentage error in Q = p%a + q%b + r%c.

## Accuracy vs Precision

- **Accuracy:** closeness to the true value.
- **Precision:** closeness of repeated measurements to each other.
- A set can be precise but inaccurate.`,
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
        title: "Least Count and Zero Error",
        description: "Instrument resolution and the correction needed for vernier caliper and screw gauge readings",
      },
      {
        title: "Parallax Error",
        description: "Reading error due to incorrect eye position relative to the scale",
      },
      {
        title: "Significant Figures",
        description: "Digits in a number that carry meaningful information about its precision",
      },
      {
        title: "Error Propagation",
        description: "Percentage errors add with powers for products and quotients",
        formula: "If Q = a^p b^q / c^r, then %Q = p%a + q%b + r%c",
      },
    ],
    formulas: [
      "Dimensional Formula: [Quantity] = [M^a L^b T^c I^d Theta^e N^f J^g]",
      "Least Count (Vernier) = 1 MSD - 1 VSD",
      "Least Count (Screw Gauge) = Pitch / Number of divisions",
      "Absolute Error = |a_measured - a_true|",
      "Mean Absolute Error = (sum of absolute errors)/n",
      "Relative Error = absolute error / true value",
      "Percentage Error = (absolute error / true value) x 100%",
      "If Q = a^p b^q / c^r, percentage error = p%a + q%b + r%c",
    ],
    importantTopics: [
      "SI units and their definitions",
      "Fundamental and derived quantities",
      "Measurement of length (parallax, vernier, screw gauge)",
      "Measurement of time and mass",
      "Dimensional analysis and its applications",
      "Significant figures and rounding",
      "Types of errors and error propagation",
      "Precision vs accuracy",
    ],
    learningObjectives: [
      "Master SI units and conversions",
      "Apply dimensional analysis to check equations",
      "Use vernier caliper and screw gauge readings correctly",
      "Determine significant figures and rounding",
      "Calculate and minimize measurement errors",
      "Distinguish between precision and accuracy",
    ],
    prerequisites: ["Basic algebra", "Understanding of physical quantities and ratios"],
    ncertChapterRef: "Class 11 Physics - Chapter 2",
    visualizationsData: [
      {
        type: "concept",
        title: "SI Base Units Map",
        description: "Seven base quantities, their SI units, and common use cases",
        config: {
          visualizationName: "si-units-map"
        }
      },
      {
        type: "concept",
        title: "Metric Prefix Scale",
        description: "Power-of-ten prefixes from pico to tera with quick conversions",
        config: {
          visualizationName: "metric-prefix-scale"
        }
      },
      {
        type: "concept",
        title: "Dimensional Analysis Checker",
        description: "Validate equations using dimensional consistency",
        config: {
          visualizationName: "dimensional-analysis-checker"
        }
      },
      {
        type: "concept",
        title: "Vernier Caliper Simulator",
        description: "Least count and reading practice with a vernier caliper",
        config: {
          visualizationName: "vernier-caliper"
        }
      },
      {
        type: "concept",
        title: "Screw Gauge Simulator",
        description: "Pitch, least count, and accurate thickness measurements",
        config: {
          visualizationName: "screw-gauge"
        }
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
- **Displacement (delta x)** - Change in position, a vector quantity
- Displacement = x2 - x1

**Distance vs Displacement:**
- Distance is scalar (magnitude only), always positive
- Displacement is vector (magnitude + direction), can be positive, negative, or zero

### Velocity

**Average Velocity:**
- Rate of change of displacement with time
- v_avg = delta x / delta t = (x2 - x1)/(t2 - t1)
- Vector quantity, can be positive or negative

**Instantaneous Velocity:**
- Velocity at a specific instant
- v = dx/dt
- Slope of position-time graph at that point

**Speed vs Velocity:**
- Speed is magnitude of velocity (always positive)
- Average speed = total distance/total time

### Acceleration

**Average Acceleration:**
- Rate of change of velocity with time
- a_avg = delta v / delta t = (v2 - v1)/(t2 - t1)

**Instantaneous Acceleration:**
- a = dv/dt = d2x/dt2
- Slope of velocity-time graph

### Equations of Motion (Uniform Acceleration)

For motion with constant acceleration a:

1. **First Equation:** v = u + a t
   - Links velocity, initial velocity, acceleration, time

2. **Second Equation:** s = u t + 0.5 a t^2
   - Links displacement, initial velocity, acceleration, time

3. **Third Equation:** v^2 = u^2 + 2 a s
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
- Acceleration due to gravity: g = 9.8 m/s^2 (downward)
- For upward motion: a = -g
- For downward motion: a = +g

**At maximum height:**
- Final velocity v = 0
- Time to reach max height: t = u/g
- Maximum height: h = u^2/(2g)

### Relative Motion

When two objects A and B are moving:
- Relative velocity of A with respect to B: v_AB = v_A - v_B
- If both moving in same direction: |v_AB| = |v_A - v_B|
- If moving in opposite directions: |v_AB| = |v_A + v_B|`,
    keyConcepts: [
      {
        title: "Displacement",
        description: "Change in position, a vector quantity with magnitude and direction",
        formula: "delta x = x2 - x1",
      },
      {
        title: "Average Velocity",
        description: "Rate of change of displacement with time",
        formula: "v_avg = delta x / delta t",
      },
      {
        title: "Instantaneous Velocity",
        description: "Velocity at a specific instant, derivative of position",
        formula: "v = dx/dt",
      },
      {
        title: "Acceleration",
        description: "Rate of change of velocity with time",
        formula: "a = dv/dt = d2x/dt2",
      },
      {
        title: "Equations of Motion",
        description: "Three fundamental equations for uniformly accelerated motion",
        formula: "v = u + a t, s = u t + 0.5 a t^2, v^2 = u^2 + 2 a s",
      },
    ],
    formulas: [
      "v = u + a t",
      "s = u t + 0.5 a t^2",
      "v^2 = u^2 + 2 a s",
      "s = 0.5 (u + v) t",
      "v_avg = (u + v) / 2",
      "s_n = u + a (n - 0.5)",
      "g = 9.8 m/s^2",
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
        type: "concept",
        title: "Motion Graphs (s-t and v-t)",
        description: "Interactive position-time and velocity-time graphs for uniform acceleration",
        config: {
          visualizationName: "motion-graphs",
        },
      },
      {
        type: "concept",
        title: "Position-Velocity-Time Graphs",
        description: "Link slopes and areas to velocity, acceleration, and displacement",
        config: {
          visualizationName: "position-velocity-graph",
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
    chapterNumber: 4,
    chapterTitle: "Motion in a Plane",
    introduction: "Motion in a plane extends kinematics to two dimensions. This chapter covers vector analysis, projectile motion, circular motion, and relative velocity in two dimensions.",
    detailedNotes: `# Motion in a Plane

## Two-Dimensional Motion

In plane motion, position, velocity, and acceleration are vector quantities with both x and y components.

### Vector Representation

**Position Vector:**
- r = x i + y j
- Magnitude: |r| = sqrt(x^2 + y^2)
- Direction: theta = tan^-1(y/x)

**Velocity Vector:**
- v = v_x i + v_y j
- v = dr/dt
- Components: v_x = dx/dt, v_y = dy/dt

**Acceleration Vector:**
- a = a_x i + a_y j
- a = dv/dt
- Components: a_x = dv_x/dt, a_y = dv_y/dt

### Projectile Motion

Motion of an object thrown into the air, subject only to gravity and initial velocity.

**Key Assumptions:**
1. Air resistance is negligible
2. Acceleration due to gravity (g) is constant
3. Motion is in a vertical plane

**Horizontal Motion (x-direction):**
- No acceleration (a_x = 0)
- Velocity is constant: v_x = u cos theta
- Displacement: x = (u cos theta) t

**Vertical Motion (y-direction):**
- Acceleration = -g (downward)
- Initial velocity: v_y0 = u sin theta
- Velocity: v_y = u sin theta - g t
- Displacement: y = (u sin theta) t - 0.5 g t^2

**Important Results:**

1. **Time of Flight:**
   T = (2 u sin theta)/g

2. **Maximum Height:**
   H = (u^2 sin^2 theta)/(2 g)

3. **Range:**
   R = (u^2 sin 2 theta)/g
   - Maximum range when theta = 45 deg
   - Same range for complementary angles (theta and 90 - theta)

4. **Equation of Trajectory:**
   y = x tan theta - (g x^2)/(2 u^2 cos^2 theta)
   - Parabolic path

### Uniform Circular Motion

Motion along a circular path with constant speed.

**Characteristics:**
- Speed is constant, but velocity changes (direction changes)
- Acceleration is always directed toward center (centripetal)

**Centripetal Acceleration:**
- a_c = v^2/r = omega^2 r
- Direction: Always toward center
- Magnitude constant, direction continuously changing

**Angular Quantities:**
- Angular displacement: theta (radians)
- Angular velocity: omega = dtheta/dt = v/r
- Angular acceleration: alpha = d omega/dt

**Relation between linear and angular quantities:**
- v = r omega (linear velocity)
- a_t = r alpha (tangential acceleration)
- a_c = r omega^2 (centripetal acceleration)

**Centripetal Force:**
- F_c = m a_c = m v^2/r = m omega^2 r
- Directed toward center
- Required to keep object moving in circle

### Non-Uniform Circular Motion

When speed changes along circular path:
- **Tangential acceleration (a_t)** - Changes speed
- **Centripetal acceleration (a_c)** - Changes direction
- **Net acceleration magnitude:** a = sqrt(a_t^2 + a_c^2)

### Relative Motion in a Plane

**Relative Velocity:**
- v_AB = v_A - v_B
- Vector subtraction using components

**River-Boat Problems:**
- Velocity of boat relative to ground = v_boat + v_river
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
        formula: "R = (u^2 sin 2 theta)/g",
      },
      {
        title: "Maximum Height",
        description: "Peak height reached by projectile",
        formula: "H = (u^2 sin^2 theta)/(2 g)",
      },
      {
        title: "Centripetal Acceleration",
        description: "Acceleration directed toward center in circular motion",
        formula: "a_c = v^2/r = omega^2 r",
      },
      {
        title: "Angular Velocity",
        description: "Rate of change of angular displacement",
        formula: "omega = dtheta/dt = v/r",
      },
    ],
    formulas: [
      "Range: R = (u^2 sin 2 theta)/g",
      "Maximum Height: H = (u^2 sin^2 theta)/(2 g)",
      "Time of Flight: T = (2 u sin theta)/g",
      "Trajectory: y = x tan theta - (g x^2)/(2 u^2 cos^2 theta)",
      "Centripetal acceleration: a_c = v^2/r = omega^2 r",
      "Centripetal force: F_c = m v^2/r = m omega^2 r",
      "Angular velocity: omega = v/r",
      "Linear velocity: v = r omega",
      "Period of circular motion: T = 2 pi r / v = 2 pi / omega",
    ],
    importantTopics: [
      "Vector addition and subtraction",
      "Projectile motion equations",
      "Trajectory of projectile",
      "Uniform circular motion",
      "Centripetal acceleration and force",
      "Angular quantities (theta, omega, alpha)",
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
        type: "concept",
        title: "Circular Motion and Centripetal Acceleration",
        description: "See how rotation relates to angular velocity and centripetal force",
        config: {
          visualizationName: "angular-momentum",
        },
      },
      {
        type: "concept",
        title: "Range vs Angle",
        description: "Range depends on sin(2 theta) and peaks at 45 deg",
        config: {
          visualizationName: "range-angle-graph",
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
    chapterNumber: 5,
    chapterTitle: "Laws of Motion",
    introduction: "This chapter introduces Newton's three laws of motion, which form the foundation of classical mechanics. We study forces, inertia, momentum, and their applications in everyday phenomena.",
    detailedNotes: `# Laws of Motion

## Introduction to Dynamics

Dynamics studies motion along with the forces that cause it. Newton's laws provide the core framework.

### Newton's First Law (Inertia)

**Statement:** An object at rest stays at rest and an object in uniform motion continues in that state unless acted upon by a net external force.

**Key points:**
- In an inertial frame, if sum F = 0, velocity is constant.
- Inertia is proportional to mass.

### Newton's Second Law

**Statement:** The rate of change of momentum is proportional to the net force and occurs in the direction of the force.

**Mathematical form:**
- F = dp/dt
- For constant mass: F = m a
- Momentum: p = m v

### Newton's Third Law

**Statement:** For every action, there is an equal and opposite reaction.

**Action-reaction pairs:**
- Equal in magnitude, opposite in direction
- Act on different bodies

### Common Forces

- Weight: W = m g (downward)
- Normal reaction: N (perpendicular to surface)
- Tension: T (along a string or rope)
- Spring force: F = -k x
- Friction: resists relative motion

### Friction

**Static friction:**
- f_s <= mu_s N
- f_s(max) = mu_s N

**Kinetic friction:**
- f_k = mu_k N
- mu_k < mu_s

### Free Body Diagrams (FBD)

Steps:
1. Isolate the object
2. Draw all external forces
3. Choose coordinate axes
4. Resolve forces into components
5. Apply sum F = m a

### Impulse and Momentum

- Impulse: J = F_avg * delta t
- J = delta p

### Conservation of Momentum

If net external force is zero, total momentum remains constant.

### Equilibrium

- Translational equilibrium: sum F = 0
- Rotational equilibrium: sum tau = 0`,
    keyConcepts: [
      {
        title: "Newton's First Law",
        description: "If net force is zero, velocity remains constant in an inertial frame.",
        formula: "sum F = 0 => v = constant",
      },
      {
        title: "Newton's Second Law",
        description: "Net force equals mass times acceleration (or rate of change of momentum).",
        formula: "F = m a = dp/dt",
      },
      {
        title: "Newton's Third Law",
        description: "Action and reaction forces are equal in magnitude and opposite in direction.",
        formula: "F_AB = -F_BA",
      },
      {
        title: "Friction",
        description: "Force that opposes relative motion between surfaces.",
        formula: "f_s <= mu_s N, f_k = mu_k N",
      },
      {
        title: "Impulse-Momentum",
        description: "Impulse changes momentum; useful in collisions and time-varying forces.",
        formula: "J = F_avg * delta t = delta p",
      },
    ],
    formulas: [
      "F = m a",
      "F = dp/dt",
      "p = m v",
      "f_s <= mu_s N",
      "f_k = mu_k N",
      "J = F_avg * delta t = delta p",
      "m1 u1 + m2 u2 = m1 v1 + m2 v2",
      "W = m g",
      "F = -k x",
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
        title: "Newton's Laws (Force & Motion)",
        description: "Explore how net force changes acceleration on an incline.",
        config: {
          visualizationName: "block-on-ramp",
        },
      },
      {
        type: "concept",
        title: "Action-Reaction and Momentum",
        description: "See equal and opposite forces during collisions.",
        config: {
          visualizationName: "collision-lab",
        },
      },
      {
        type: "concept",
        title: "Friction on an Incline",
        description: "Compare static and kinetic friction while changing the angle.",
        config: {
          visualizationName: "block-on-ramp",
        },
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

