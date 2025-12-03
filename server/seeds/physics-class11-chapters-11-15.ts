import { db } from "../db";
import { chapterContent } from "../../shared/schema";

const chapters = [
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 11,
    chapterTitle: "Thermal Properties of Matter",
    introduction: "This chapter explores how matter responds to heat and temperature changes. We study temperature scales, thermal expansion, specific heat, calorimetry, and heat transfer mechanisms.",
    detailedNotes: `# Thermal Properties of Matter

## Temperature and Heat

**Temperature:**
- Measure of hotness or coldness
- Average kinetic energy of molecules
- SI Unit: Kelvin (K)

**Temperature Scales:**
- Celsius: t°C = (T_K - 273.15)
- Fahrenheit: t°F = (9/5)t°C + 32
- Kelvin: Absolute temperature scale
- Relation: K = °C + 273.15

**Heat:**
- Energy transferred due to temperature difference
- SI Unit: Joule (J)
- Flows from hot to cold body
- Calorie: 1 cal = 4.186 J

## Thermal Expansion

**Linear Expansion:**
- ΔL = αL₀ΔT
- α = coefficient of linear expansion (K⁻¹)
- L = L₀(1 + αΔT)

**Area Expansion:**
- ΔA = βA₀ΔT
- β = 2α (for isotropic solids)
- A = A₀(1 + βΔT)

**Volume Expansion:**
- ΔV = γV₀ΔT
- γ = 3α (for isotropic solids)
- V = V₀(1 + γΔT)

**Anomalous Expansion of Water:**
- Water contracts from 0°C to 4°C
- Maximum density at 4°C
- Expands above and below 4°C
- Ice floats on water

## Specific Heat and Calorimetry

**Specific Heat Capacity:**
- Q = mcΔT
- c = Q/(mΔT)
- Unit: J/(kg·K)
- Water: c = 4186 J/(kg·K)

**Molar Heat Capacity:**
- C = Mc (M is molar mass)
- Unit: J/(mol·K)

**Water Equivalent:**
- W = mc (mass × specific heat)
- Thermal capacity of calorimeter

**Principle of Calorimetry:**
- Heat lost = Heat gained
- Σ(mcΔT)_lost = Σ(mcΔT)_gained
- Assumes no heat loss to surroundings

## Change of State

**Latent Heat:**
- Energy required for phase change at constant temperature
- Q = mL
- No temperature change during phase transition

**Latent Heat of Fusion:**
- L_f: Solid ↔ Liquid
- For ice: L_f = 334 kJ/kg
- Ice at 0°C → Water at 0°C

**Latent Heat of Vaporization:**
- L_v: Liquid ↔ Gas
- For water: L_v = 2260 kJ/kg
- Water at 100°C → Steam at 100°C

**Sublimation:**
- Direct Solid → Gas transition
- Examples: Dry ice, camphor, iodine

## Heat Transfer

**1. Conduction:**
- Heat transfer through material without bulk motion
- Fourier's Law: Q/t = kA(T₁ - T₂)/x
- k = thermal conductivity (W/(m·K))
- Metals: high k, Insulators: low k

**Thermal Resistance:**
- R_th = x/(kA)
- Analogous to electrical resistance

**Series/Parallel Combination:**
- Series: R_total = R₁ + R₂ + ...
- Parallel: 1/R_total = 1/R₁ + 1/R₂ + ...

**2. Convection:**
- Heat transfer through bulk motion of fluid
- Natural: Due to density differences
- Forced: Using fans, pumps

**3. Radiation:**
- Energy transfer via electromagnetic waves
- No medium required
- Stefan-Boltzmann Law: E = σεAT⁴
- σ = 5.67 × 10⁻⁸ W/(m²·K⁴)
- ε = emissivity (0 to 1)

**Wien's Displacement Law:**
- λ_max × T = constant = 2.9 × 10⁻³ m·K

**Newton's Law of Cooling:**
- dT/dt = -k(T - T_s)
- Rate of cooling ∝ Temperature difference
- Valid for small temperature differences`,
    keyConcepts: [
      "Temperature scales and thermal equilibrium",
      "Thermal expansion (linear, area, volume)",
      "Specific heat and heat capacity",
      "Calorimetry principle",
      "Latent heat and phase changes",
      "Heat transfer: conduction, convection, radiation",
      "Anomalous expansion of water",
    ],
    formulas: [
      "Linear expansion: ΔL = αL₀ΔT",
      "Area expansion: β = 2α",
      "Volume expansion: γ = 3α",
      "Heat transfer: Q = mcΔT",
      "Latent heat: Q = mL",
      "Conduction: Q/t = kA(T₁-T₂)/x",
      "Stefan-Boltzmann: E = σεAT⁴",
      "Wien's law: λ_max·T = 2.9×10⁻³ m·K",
    ],
    importantTopics: [
      "Temperature scales conversion",
      "Thermal expansion calculations",
      "Calorimetry problems",
      "Phase changes and latent heat",
      "Heat transfer mechanisms",
      "Newton's law of cooling",
    ],
    learningObjectives: [
      "Convert between temperature scales",
      "Calculate thermal expansion",
      "Solve calorimetry problems",
      "Apply latent heat in phase change calculations",
      "Understand heat transfer mechanisms",
      "Apply Newton's law of cooling",
    ],
    prerequisites: [
      "Heat and temperature concepts",
      "Energy conservation",
      "Basic algebra",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 11",
    visualizationsData: [],
    difficultyLevel: 3,
    estimatedStudyMinutes: 300,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 12,
    chapterTitle: "Thermodynamics",
    introduction: "Thermodynamics deals with heat, work, and energy transformations. We study the laws governing energy conversion, heat engines, refrigerators, and entropy.",
    detailedNotes: `# Thermodynamics

## Thermodynamic System

**Types of Systems:**
1. **Open System:** Exchanges matter and energy
2. **Closed System:** Exchanges energy only
3. **Isolated System:** No exchange of matter or energy

**State Variables:**
- Pressure (P), Volume (V), Temperature (T)
- Internal energy (U), Entropy (S)
- Extensive: depend on amount (V, U, S)
- Intensive: independent of amount (P, T)

**Equilibrium:**
- Thermal: Same temperature throughout
- Mechanical: Same pressure throughout
- Chemical: No chemical reactions

## Zeroth Law of Thermodynamics

**Statement:**
If A is in thermal equilibrium with C, and B is in thermal equilibrium with C, then A and B are in thermal equilibrium with each other

**Significance:**
- Basis for temperature measurement
- Defines temperature scale
- Allows thermometer calibration

## First Law of Thermodynamics

**Statement:**
Energy is conserved in thermodynamic processes

**Mathematical Form:**
- ΔQ = ΔU + ΔW
- Heat supplied = Change in internal energy + Work done by system

**Sign Conventions:**
- ΔQ > 0: Heat absorbed by system
- ΔW > 0: Work done by system
- ΔU > 0: Internal energy increases

**Special Processes:**

**1. Isothermal (T = constant):**
- ΔU = 0 (for ideal gas)
- Q = W = nRT ln(V₂/V₁) = nRT ln(P₁/P₂)
- PV = constant
- Slow process (heat exchange with surroundings)

**2. Adiabatic (Q = 0):**
- ΔU = -W
- No heat exchange with surroundings
- PVᵞ = constant
- TVᵞ⁻¹ = constant
- TᵞP^(1-γ) = constant
- Fast/insulated process

**3. Isochoric (V = constant):**
- W = 0 (no volume change)
- Q = ΔU = nCᵥΔT
- Heating at constant volume

**4. Isobaric (P = constant):**
- W = PΔV = nRΔT
- Q = nCₚΔT
- ΔU = nCᵥΔT

**5. Cyclic Process:**
- ΔU = 0 (returns to initial state)
- Q = W (heat absorbed = work done)

## Heat Capacities of Gases

**Molar Heat Capacities:**
- Cᵥ = (f/2)R (at constant volume)
- Cₚ = ((f+2)/2)R (at constant pressure)
- f = degrees of freedom

**Degrees of Freedom:**
- Monatomic: f = 3 (translational only)
- Diatomic: f = 5 (3 translational + 2 rotational)
- Polyatomic: f = 6 (3 trans + 3 rot)

**Relations:**
- Cₚ - Cᵥ = R (Mayer's equation)
- γ = Cₚ/Cᵥ
- Monatomic: γ = 5/3 = 1.67
- Diatomic: γ = 7/5 = 1.4

**Internal Energy:**
- U = nCᵥT = (f/2)nRT

## Second Law of Thermodynamics

**Kelvin-Planck Statement:**
No heat engine can convert all heat absorbed into work (η < 100%)

**Clausius Statement:**
Heat cannot spontaneously flow from cold to hot body without external work

**Entropy (S):**
- dS = dQ/T (reversible process)
- Measure of disorder/randomness
- For isolated system: ΔS ≥ 0
- Increases in irreversible processes

**Reversible vs Irreversible:**
- Reversible: Quasi-static, no entropy increase
- Irreversible: Real processes, entropy increases

## Heat Engines

**Efficiency:**
- η = W/Q₁ = (Q₁ - Q₂)/Q₁
- η = 1 - Q₂/Q₁
- η = 1 - T₂/T₁ (Carnot engine)
- Always η < 1 (< 100%)

**Carnot Engine:**
- Most efficient reversible heat engine
- Four processes: 2 isothermal + 2 adiabatic
- η_Carnot = 1 - T_cold/T_hot
- Maximum theoretical efficiency

**Carnot Cycle:**
1. Isothermal expansion (absorb Q₁ at T₁)
2. Adiabatic expansion
3. Isothermal compression (reject Q₂ at T₂)
4. Adiabatic compression

## Refrigerator and Heat Pump

**Refrigerator:**
- Removes heat from cold reservoir
- Coefficient of Performance: COP = Q₂/W = Q₂/(Q₁ - Q₂)
- COP_Carnot = T₂/(T₁ - T₂)
- Higher COP is better

**Heat Pump:**
- Delivers heat to hot reservoir
- COP_HP = Q₁/W = Q₁/(Q₁ - Q₂)
- COP_HP = T₁/(T₁ - T₂)
- COP_HP = COP_refrigerator + 1`,
    keyConcepts: [
      "Thermodynamic systems and state variables",
      "First law of thermodynamics",
      "Thermodynamic processes (isothermal, adiabatic, etc.)",
      "Heat capacities and Mayer's equation",
      "Second law and entropy",
      "Heat engines and Carnot cycle",
      "Refrigerators and heat pumps",
    ],
    formulas: [
      "First Law: ΔQ = ΔU + ΔW",
      "Isothermal: W = nRT ln(V₂/V₁)",
      "Adiabatic: PVᵞ = constant, TVᵞ⁻¹ = constant, TᵞP^(1-γ) = constant",
      "Mayer's equation: Cₚ - Cᵥ = R",
      "γ = Cₚ/Cᵥ",
      "Carnot efficiency: η = 1 - T₂/T₁",
      "COP_refrigerator = Q₂/W",
    ],
    importantTopics: [
      "Laws of thermodynamics",
      "Thermodynamic processes and PV diagrams",
      "Heat engine efficiency",
      "Carnot cycle",
      "Entropy and second law",
      "Refrigerator performance",
    ],
    learningObjectives: [
      "Apply first law to various processes",
      "Calculate work done in thermodynamic processes",
      "Determine efficiency of heat engines",
      "Understand entropy and irreversibility",
      "Solve Carnot cycle problems",
    ],
    prerequisites: [
      "Kinetic theory basics",
      "Energy conservation",
      "Ideal gas equation",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 12",
    visualizationsData: [],
    difficultyLevel: 5,
    estimatedStudyMinutes: 420,
    status: "draft" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 13,
    chapterTitle: "Kinetic Theory",
    introduction: "This chapter connects macroscopic thermodynamic properties to microscopic molecular motion. We study ideal gas behavior, kinetic interpretation of temperature, and mean free path.",
    detailedNotes: `# Kinetic Theory

## Molecular Nature of Matter

**Assumptions:**
- Matter made of tiny particles (atoms/molecules)
- Continuous random motion
- Attractive forces between particles
- Average separation >> molecular size

**States of Matter:**
- Solid: Strong forces, fixed positions
- Liquid: Moderate forces, can flow
- Gas: Weak forces, free motion

## Kinetic Theory of Ideal Gas

**Postulates:**
1. Large number of molecules in random motion
2. Volume of molecules << container volume
3. Obey Newton's laws
4. No intermolecular forces (except during collision)
5. Collisions perfectly elastic
6. Time of collision << time between collisions

**Pressure from Kinetic Theory:**
- P = (1/3)ρv̄² = (1/3)nmv̄²/V
- P = (1/3)(Nm/V)v̄²
- ρ = density, v̄² = mean square speed

**Kinetic Interpretation of Temperature:**
- Average KE per molecule = (3/2)kT
- (1/2)mv̄² = (3/2)kT
- k = Boltzmann constant = 1.38 × 10⁻²³ J/K

**Internal Energy:**
- U = (f/2)NkT = (f/2)nRT
- For ideal gas, U depends only on T
- f = degrees of freedom

## Molecular Speeds

**Root Mean Square Speed:**
- v_rms = √(v̄²) = √(3kT/m) = √(3RT/M)

**Average Speed:**
- v_avg = √(8kT/πm) = √(8RT/πM)

**Most Probable Speed:**
- v_mp = √(2kT/m) = √(2RT/M)

**Relation:**
- v_rms : v_avg : v_mp = √3 : √(8/π) : √2
- v_rms > v_avg > v_mp

## Degrees of Freedom

**Definition:**
Number of independent ways molecule can have energy

**Types:**
- Translational: 3 (x, y, z directions)
- Rotational: 2 (diatomic), 3 (polyatomic)
- Vibrational: (activated at high T)

**Monatomic Gas:** f = 3
- Only translational motion
- Examples: He, Ne, Ar

**Diatomic Gas:** f = 5 (at moderate T)
- 3 translational + 2 rotational
- Examples: H₂, N₂, O₂

**Polyatomic Gas:** f = 6
- 3 translational + 3 rotational
- Examples: CO₂, CH₄

## Law of Equipartition of Energy

**Statement:**
Energy associated with each degree of freedom = (1/2)kT per molecule

**Applications:**
- Average energy per molecule = (f/2)kT
- Internal energy: U = (f/2)NkT = (f/2)nRT

**Specific Heat Predictions:**
- Cᵥ = (f/2)R
- Cₚ = ((f+2)/2)R
- γ = (f+2)/f

## Mean Free Path

**Definition:**
Average distance traveled between successive collisions

**Formula:**
- λ = 1/(√2πd²n)
- d = molecular diameter
- n = number density (N/V)

**Properties:**
- λ ∝ T (at constant P)
- λ ∝ 1/P (at constant T)
- λ ∝ 1/d² (molecular size)

**Collision Frequency:**
- f = v_avg/λ
- Number of collisions per second`,
    keyConcepts: [
      "Kinetic theory postulates",
      "Pressure and kinetic energy",
      "Kinetic interpretation of temperature",
      "Molecular speeds (rms, average, most probable)",
      "Degrees of freedom",
      "Law of equipartition of energy",
      "Mean free path",
    ],
    formulas: [
      "Pressure: P = (1/3)ρv̄²",
      "KE-Temperature: (1/2)mv̄² = (3/2)kT",
      "v_rms = √(3RT/M)",
      "v_avg = √(8RT/πM)",
      "v_mp = √(2RT/M)",
      "Internal energy: U = (f/2)nRT",
      "Mean free path: λ = 1/(√2πd²n)",
    ],
    importantTopics: [
      "Kinetic theory assumptions",
      "Derivation of pressure formula",
      "Molecular speed calculations",
      "Degrees of freedom",
      "Equipartition theorem",
      "Mean free path",
    ],
    learningObjectives: [
      "Derive pressure from kinetic theory",
      "Calculate molecular speeds",
      "Apply equipartition theorem",
      "Determine degrees of freedom",
      "Calculate mean free path",
    ],
    prerequisites: [
      "Newton's laws",
      "Ideal gas equation",
      "Basic statistics",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 13",
    visualizationsData: [],
    difficultyLevel: 4,
    estimatedStudyMinutes: 360,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 14,
    chapterTitle: "Oscillations",
    introduction: "This chapter studies periodic motion, focusing on simple harmonic motion (SHM). We explore oscillations in springs, pendulums, and energy in SHM.",
    detailedNotes: `# Oscillations

## Periodic Motion

**Definition:**
Motion that repeats after equal intervals of time

**Period (T):**
- Time for one complete oscillation
- Unit: seconds (s)

**Frequency (ν or f):**
- Number of oscillations per unit time
- ν = 1/T
- Unit: Hertz (Hz) = s⁻¹

**Examples:**
- Pendulum, vibrating string, AC current, planetary motion

## Simple Harmonic Motion (SHM)

**Definition:**
Periodic motion where restoring force is proportional to displacement from equilibrium

**Condition for SHM:**
- F = -kx (Hooke's law)
- a = -ω²x
- Restoring force ∝ displacement

**Displacement:**
- x = A sin(ωt + φ)
- or x = A cos(ωt + φ)
- A = amplitude, ω = angular frequency, φ = phase constant

**Velocity:**
- v = dx/dt = Aω cos(ωt + φ)
- v = ±ω√(A² - x²)
- Maximum at equilibrium: v_max = Aω

**Acceleration:**
- a = -ω²x
- a = -ω²A sin(ωt + φ)
- Maximum at extremes: a_max = ω²A

**Angular Frequency:**
- ω = 2πν = 2π/T
- Unit: rad/s

## Energy in SHM

**Potential Energy:**
- PE = (1/2)kx² = (1/2)mω²x²
- PE = (1/2)kA²sin²(ωt + φ)
- Maximum at extremes

**Kinetic Energy:**
- KE = (1/2)mv² = (1/2)mω²(A² - x²)
- KE = (1/2)kA²cos²(ωt + φ)
- Maximum at equilibrium

**Total Energy:**
- E = KE + PE = (1/2)kA² = constant
- E = (1/2)mω²A²
- Independent of time (conserved)

**Energy Distribution:**
- At x = 0: KE = max, PE = 0
- At x = ±A: KE = 0, PE = max
- At x = ±A/√2: KE = PE

## Spring-Mass System

**Horizontal Spring:**
- F = -kx
- ω = √(k/m)
- T = 2π√(m/k)

**Vertical Spring:**
- Same formula as horizontal
- Equilibrium at extension x₀ = mg/k
- Oscillates about new equilibrium

**Series Combination:**
- 1/k_eq = 1/k₁ + 1/k₂

**Parallel Combination:**
- k_eq = k₁ + k₂

## Simple Pendulum

**For small angles (θ < 10°):**
- Restoring force: F = -mg sin θ ≈ -mgθ
- ω = √(g/L)
- T = 2π√(L/g)
- Independent of mass and amplitude

**Factors Affecting Period:**
- T ∝ √L (increases with length)
- T ∝ 1/√g (decreases with gravity)
- Independent of mass, amplitude

**Effective Length:**
- Distance from point of suspension to center of gravity

## Damped Oscillations

**Definition:**
Oscillations with decreasing amplitude due to dissipative forces

**Equation:**
- x = A₀e^(-bt/2m) cos(ωt + φ)
- b = damping constant

**Types:**
- Underdamped: Oscillates with decreasing amplitude
- Critically damped: Returns to equilibrium fastest
- Overdamped: Slow return, no oscillation

**Energy Loss:**
- E = E₀e^(-bt/m)
- Exponential decay

## Forced Oscillations and Resonance

**Forced Oscillations:**
- External periodic force applied
- System oscillates at driving frequency

**Resonance:**
- Maximum amplitude when driving frequency = natural frequency
- ω_driving = ω_natural
- Amplitude depends on damping

**Applications:**
- Musical instruments
- Earthquake resistance
- Radio tuning`,
    keyConcepts: [
      "Periodic motion and SHM definition",
      "Displacement, velocity, acceleration in SHM",
      "Energy conservation in SHM",
      "Spring-mass system",
      "Simple pendulum",
      "Damped oscillations",
      "Forced oscillations and resonance",
    ],
    formulas: [
      "SHM: x = A sin(ωt + φ)",
      "v = ±ω√(A² - x²)",
      "a = -ω²x",
      "Spring: T = 2π√(m/k)",
      "Pendulum: T = 2π√(L/g)",
      "Total energy: E = (1/2)kA²",
      "Damped: x = A₀e^(-bt/2m)cos(ωt)",
    ],
    importantTopics: [
      "SHM equations and graphs",
      "Energy in SHM",
      "Spring-mass oscillations",
      "Simple pendulum motion",
      "Damping and resonance",
    ],
    learningObjectives: [
      "Identify SHM conditions",
      "Derive and apply SHM equations",
      "Calculate energy in oscillating systems",
      "Analyze spring and pendulum systems",
      "Understand damping and resonance",
    ],
    prerequisites: [
      "Newton's laws",
      "Energy conservation",
      "Trigonometry",
      "Calculus basics",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 14",
    visualizationsData: [],
    difficultyLevel: 4,
    estimatedStudyMinutes: 360,
    status: "published" as const,
  },
  {
    subject: "Physics",
    classLevel: "11",
    chapterNumber: 15,
    chapterTitle: "Waves",
    introduction: "This chapter explores wave motion, types of waves, wave properties, and phenomena like interference, diffraction, and beats. We study sound waves and their characteristics.",
    detailedNotes: `# Waves

## Wave Motion

**Definition:**
Transfer of energy and momentum without transfer of matter

**Characteristics:**
- Periodic disturbance
- Propagates through medium
- Energy transfer
- Speed depends on medium properties

**Types of Waves:**

**1. Mechanical Waves:**
- Require medium
- Examples: Sound, water waves, seismic waves

**2. Electromagnetic Waves:**
- No medium required
- Examples: Light, radio, X-rays

**Based on Particle Motion:**

**Transverse Waves:**
- Particle motion ⊥ wave direction
- Crests and troughs
- Examples: Light, string vibrations
- Cannot travel in fluids (gases/liquids)

**Longitudinal Waves:**
- Particle motion ∥ wave direction
- Compressions and rarefactions
- Examples: Sound waves
- Can travel in all media

## Wave Equation

**General Form:**
- y(x,t) = A sin(kx - ωt + φ)
- y = displacement
- A = amplitude
- k = wave number = 2π/λ
- ω = angular frequency = 2πν
- φ = initial phase

**Wave Speed:**
- v = λν = ω/k
- v = √(T/μ) (for string, T=tension, μ=mass/length)
- v = √(E/ρ) (for solid rod)
- v = √(B/ρ) (for fluid, B=bulk modulus)

**Relations:**
- λ = v/ν = vT
- k = 2π/λ
- ω = 2πν

## Properties of Waves

**Wavelength (λ):**
- Distance between consecutive crests/troughs
- Unit: meter (m)

**Amplitude (A):**
- Maximum displacement from equilibrium
- Determines intensity

**Frequency (ν):**
- Number of oscillations per second
- Unit: Hz

**Phase:**
- State of oscillation at given time
- φ = kx - ωt

## Superposition of Waves

**Principle:**
Net displacement = algebraic sum of individual displacements

**Interference:**

**Constructive:**
- Waves in phase (Δφ = 2nπ)
- Amplitude: A = A₁ + A₂
- Maximum intensity

**Destructive:**
- Waves out of phase (Δφ = (2n+1)π)
- Amplitude: A = |A₁ - A₂|
- Minimum intensity

## Standing Waves

**Formation:**
- Superposition of two identical waves traveling in opposite directions
- y = 2A sin(kx) cos(ωt)

**Nodes:**
- Points of zero amplitude
- Distance between nodes = λ/2

**Antinodes:**
- Points of maximum amplitude
- Distance between antinodes = λ/2

**String Fixed at Both Ends:**
- L = nλ/2 (n = 1, 2, 3...)
- ν_n = nv/(2L)
- Fundamental: n = 1, ν₁ = v/(2L)
- Harmonics: ν_n = nν₁

## Sound Waves

**Nature:**
- Longitudinal mechanical waves
- Compressions and rarefactions
- Require medium

**Speed of Sound:**
- In air: v ≈ 343 m/s (at 20°C)
- v = √(γRT/M) (in gases)
- v ∝ √T (temperature dependence)
- Faster in solids > liquids > gases

**Characteristics:**

**1. Pitch:**
- Related to frequency
- High frequency = high pitch

**2. Loudness:**
- Related to amplitude/intensity
- I = P/A (W/m²)
- Loudness ∝ log(I)

**3. Quality (Timbre):**
- Distinguishes sources
- Depends on harmonics

**Intensity Level:**
- β = 10 log₁₀(I/I₀) dB
- I₀ = 10⁻¹² W/m² (threshold)

## Beats

**Definition:**
Periodic variation in amplitude due to interference of two waves of slightly different frequencies

**Beat Frequency:**
- ν_beat = |ν₁ - ν₂|
- Number of beats per second

**Condition:**
- Frequencies very close
- Usually ν₁ - ν₂ < 10 Hz

## Doppler Effect

**Definition:**
Apparent change in frequency due to relative motion between source and observer

**Formulas:**
- ν' = ν[(v ± v₀)/(v ∓ v_s)]
- v = speed of sound
- v₀ = observer speed
- v_s = source speed

**Sign Convention:**
- Approaching: + for observer, - for source
- Receding: - for observer, + for source

**Applications:**
- Speed measurement (radar)
- Astronomy (redshift/blueshift)
- Medical ultrasound`,
    keyConcepts: [
      "Wave motion and types",
      "Transverse and longitudinal waves",
      "Wave equation and parameters",
      "Superposition and interference",
      "Standing waves and harmonics",
      "Sound wave properties",
      "Beats and Doppler effect",
    ],
    formulas: [
      "Wave equation: y = A sin(kx - ωt)",
      "Wave speed: v = λν",
      "String: v = √(T/μ)",
      "Sound in gas: v = √(γRT/M)",
      "Standing wave: L = nλ/2",
      "Beat frequency: ν_beat = |ν₁ - ν₂|",
      "Doppler: ν' = ν[(v±v₀)/(v∓v_s)]",
    ],
    importantTopics: [
      "Wave types and motion",
      "Wave equation",
      "Interference patterns",
      "Standing waves",
      "Sound characteristics",
      "Beats",
      "Doppler effect",
    ],
    learningObjectives: [
      "Distinguish wave types",
      "Apply wave equations",
      "Analyze interference patterns",
      "Calculate standing wave frequencies",
      "Understand sound properties",
      "Solve Doppler effect problems",
    ],
    prerequisites: [
      "SHM concepts",
      "Trigonometry",
      "Wave basics",
    ],
    ncertChapterRef: "Class 11 Physics - Chapter 15",
    visualizationsData: [
      {
        type: "wave-motion",
        title: "Wave Motion Visualization",
        description: "Interactive visualization of transverse and longitudinal waves",
        config: {
          waveType: "transverse",
          amplitude: 1,
          frequency: 1,
          wavelength: 2
        }
      },
    ],
    difficultyLevel: 4,
    estimatedStudyMinutes: 360,
    status: "published" as const,
  },
];

async function seedPhysicsChapters11to15() {
  console.log("🌱 Seeding Physics Class 11 chapters 11-15...");

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

  console.log("✅ Physics Class 11 chapters 11-15 seeding completed!");
}

seedPhysicsChapters11to15()
  .then(() => {
    console.log("Seed completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
