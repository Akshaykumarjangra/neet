import { db } from "../db";
import { chapterContent } from "@shared/schema";
import { eq, and } from "drizzle-orm";

interface KeyConcept {
  title: string;
  description: string;
}

interface Formula {
  name: string;
  formula: string;
  description: string;
}

interface ChapterData {
  chapterNumber: number;
  keyConcepts: KeyConcept[];
  formulas: Formula[];
}

const class12PhysicsData: ChapterData[] = [
  {
    chapterNumber: 1,
    keyConcepts: [
      { title: "Electric Charge", description: "Electric charge is a fundamental property of matter. It comes in two types: positive and negative. Like charges repel, unlike charges attract. The SI unit is Coulomb (C)." },
      { title: "Coulomb's Law", description: "The force between two point charges is directly proportional to the product of charges and inversely proportional to the square of distance between them." },
      { title: "Electric Field", description: "The region around a charged particle where another charge experiences a force. Field lines originate from positive charges and terminate on negative charges." },
      { title: "Electric Dipole", description: "A pair of equal and opposite charges separated by a small distance. The dipole moment p = q × 2a, pointing from negative to positive charge." },
      { title: "Gauss's Law", description: "The total electric flux through a closed surface equals 1/ε₀ times the total charge enclosed. Useful for finding fields with symmetric charge distributions." },
      { title: "Superposition Principle", description: "The net electric field at a point due to multiple charges is the vector sum of fields due to individual charges." }
    ],
    formulas: [
      { name: "Coulomb's Law", formula: "F = k(q₁q₂)/r²", description: "Force between two point charges, where k = 9 × 10⁹ Nm²/C²" },
      { name: "Electric Field", formula: "E = F/q₀ = kQ/r²", description: "Electric field due to a point charge Q at distance r" },
      { name: "Electric Dipole Moment", formula: "p = q × 2a", description: "Dipole moment, where 2a is the separation between charges" },
      { name: "Field on Dipole Axis", formula: "E = 2kp/r³", description: "Electric field on the axis of a dipole at large distance r" },
      { name: "Gauss's Law", formula: "∮E·dA = Q/ε₀", description: "Electric flux through a closed surface equals enclosed charge divided by ε₀" },
      { name: "Field due to Infinite Line Charge", formula: "E = λ/(2πε₀r)", description: "Field at distance r from an infinite line charge with linear density λ" }
    ]
  },
  {
    chapterNumber: 2,
    keyConcepts: [
      { title: "Electrostatic Potential", description: "Work done per unit charge in bringing a positive test charge from infinity to a point. It's a scalar quantity measured in Volts (V)." },
      { title: "Potential Difference", description: "Work done per unit charge in moving a charge between two points. Current flows from higher to lower potential." },
      { title: "Equipotential Surfaces", description: "Surfaces where all points have the same potential. No work is done moving a charge along an equipotential surface." },
      { title: "Capacitance", description: "The ability of a conductor to store charge. C = Q/V, measured in Farads (F). A capacitor stores electrical energy." },
      { title: "Parallel Plate Capacitor", description: "Two parallel conducting plates separated by a dielectric. Capacitance depends on plate area, separation, and dielectric constant." },
      { title: "Energy Stored in Capacitor", description: "A charged capacitor stores electrostatic energy in the electric field between its plates." }
    ],
    formulas: [
      { name: "Electric Potential", formula: "V = kQ/r", description: "Potential at distance r from a point charge Q" },
      { name: "Potential Energy", formula: "U = kq₁q₂/r", description: "Potential energy of a system of two charges" },
      { name: "Capacitance", formula: "C = Q/V", description: "Capacitance equals charge stored per unit voltage" },
      { name: "Parallel Plate Capacitor", formula: "C = ε₀εᵣA/d", description: "Capacitance of parallel plate capacitor with area A and separation d" },
      { name: "Energy in Capacitor", formula: "U = ½CV² = ½QV = Q²/2C", description: "Energy stored in a charged capacitor" },
      { name: "Capacitors in Series", formula: "1/C = 1/C₁ + 1/C₂ + ...", description: "Equivalent capacitance for capacitors in series" },
      { name: "Capacitors in Parallel", formula: "C = C₁ + C₂ + ...", description: "Equivalent capacitance for capacitors in parallel" }
    ]
  },
  {
    chapterNumber: 3,
    keyConcepts: [
      { title: "Electric Current", description: "The rate of flow of electric charge through a conductor. I = Q/t, measured in Amperes (A). Conventional current flows from positive to negative." },
      { title: "Ohm's Law", description: "The current through a conductor is directly proportional to the voltage across it, at constant temperature. V = IR." },
      { title: "Resistance", description: "Opposition to flow of current. Depends on length, cross-sectional area, material, and temperature of the conductor." },
      { title: "Electrical Power", description: "Rate of electrical energy consumption or generation. P = VI = I²R = V²/R, measured in Watts." },
      { title: "Kirchhoff's Laws", description: "Junction rule: sum of currents at a junction is zero. Loop rule: sum of potential differences around a closed loop is zero." },
      { title: "Internal Resistance", description: "Resistance offered by the electrolyte and electrodes inside a cell. It causes the terminal voltage to be less than EMF." },
      { title: "Wheatstone Bridge", description: "A circuit used to measure unknown resistance precisely. At balance: P/Q = R/S." }
    ],
    formulas: [
      { name: "Current", formula: "I = Q/t = neAvₐ", description: "Current as charge flow rate, or in terms of drift velocity" },
      { name: "Ohm's Law", formula: "V = IR", description: "Voltage equals current times resistance" },
      { name: "Resistance", formula: "R = ρL/A", description: "Resistance in terms of resistivity ρ, length L, and area A" },
      { name: "Power", formula: "P = VI = I²R = V²/R", description: "Electrical power formulas" },
      { name: "Resistors in Series", formula: "R = R₁ + R₂ + ...", description: "Equivalent resistance for series combination" },
      { name: "Resistors in Parallel", formula: "1/R = 1/R₁ + 1/R₂ + ...", description: "Equivalent resistance for parallel combination" },
      { name: "EMF and Internal Resistance", formula: "V = E - Ir", description: "Terminal voltage V, EMF E, internal resistance r" },
      { name: "Wheatstone Bridge Balance", formula: "P/Q = R/S", description: "Condition for balanced Wheatstone bridge" }
    ]
  },
  {
    chapterNumber: 4,
    keyConcepts: [
      { title: "Magnetic Force on Moving Charge", description: "A charge moving in a magnetic field experiences a force perpendicular to both velocity and field. F = qv × B." },
      { title: "Lorentz Force", description: "The total electromagnetic force on a charged particle: F = q(E + v × B), combining electric and magnetic forces." },
      { title: "Biot-Savart Law", description: "Gives the magnetic field produced by a current-carrying conductor. The field is perpendicular to both current element and position vector." },
      { title: "Ampere's Circuital Law", description: "The line integral of magnetic field around a closed path equals μ₀ times the current enclosed." },
      { title: "Force Between Current-Carrying Wires", description: "Parallel currents attract, antiparallel currents repel. This defines the Ampere unit." },
      { title: "Cyclotron", description: "A device to accelerate charged particles using magnetic field for circular motion and electric field for acceleration." }
    ],
    formulas: [
      { name: "Magnetic Force on Charge", formula: "F = qvB sin θ", description: "Force on a charge q moving with velocity v in field B" },
      { name: "Lorentz Force", formula: "F = q(E + v × B)", description: "Total electromagnetic force on a moving charge" },
      { name: "Biot-Savart Law", formula: "dB = (μ₀/4π)(Idl × r̂)/r²", description: "Magnetic field due to a current element" },
      { name: "Field at Center of Circular Loop", formula: "B = μ₀I/2r", description: "Magnetic field at center of a circular loop of radius r" },
      { name: "Field of Long Straight Wire", formula: "B = μ₀I/2πr", description: "Magnetic field at distance r from a long straight wire" },
      { name: "Field Inside Solenoid", formula: "B = μ₀nI", description: "Magnetic field inside a solenoid with n turns per unit length" },
      { name: "Cyclotron Frequency", formula: "f = qB/2πm", description: "Frequency of revolution in a cyclotron" }
    ]
  },
  {
    chapterNumber: 5,
    keyConcepts: [
      { title: "Magnetic Dipole", description: "A current loop behaves like a magnetic dipole with moment M = IA. It experiences torque in a magnetic field." },
      { title: "Earth's Magnetism", description: "Earth acts as a giant magnet with geographic and magnetic poles. Elements include declination, dip, and horizontal component." },
      { title: "Diamagnetism", description: "Materials weakly repelled by magnets. Electrons create opposing fields. Examples: bismuth, copper, water." },
      { title: "Paramagnetism", description: "Materials weakly attracted by magnets due to unpaired electrons. Susceptibility is positive. Examples: aluminum, oxygen." },
      { title: "Ferromagnetism", description: "Materials strongly attracted by magnets. Have domains that align in external fields. Examples: iron, cobalt, nickel." },
      { title: "Hysteresis", description: "The lag between magnetization and applied field in ferromagnets. The area of hysteresis loop represents energy loss per cycle." }
    ],
    formulas: [
      { name: "Magnetic Dipole Moment", formula: "M = IA = NIA", description: "Dipole moment of a coil with N turns, area A, carrying current I" },
      { name: "Torque on Dipole", formula: "τ = MB sin θ", description: "Torque on a magnetic dipole in field B at angle θ" },
      { name: "Potential Energy of Dipole", formula: "U = -MB cos θ", description: "Potential energy of dipole in magnetic field" },
      { name: "Horizontal Component", formula: "Bₕ = B cos δ", description: "Horizontal component of Earth's field, δ is angle of dip" },
      { name: "Magnetic Susceptibility", formula: "χ = M/H", description: "Ratio of magnetization to magnetic field intensity" },
      { name: "Relative Permeability", formula: "μᵣ = 1 + χ", description: "Relative permeability in terms of susceptibility" }
    ]
  },
  {
    chapterNumber: 6,
    keyConcepts: [
      { title: "Electromagnetic Induction", description: "When magnetic flux through a circuit changes, an EMF is induced. This is the basis of generators and transformers." },
      { title: "Faraday's Law", description: "The induced EMF equals the negative rate of change of magnetic flux through the circuit." },
      { title: "Lenz's Law", description: "The direction of induced current opposes the change in flux that caused it. This ensures conservation of energy." },
      { title: "Motional EMF", description: "EMF induced when a conductor moves through a magnetic field. E = Blv for a rod of length l moving with velocity v." },
      { title: "Self-Induction", description: "EMF induced in a coil due to change in its own current. The inductance L opposes changes in current." },
      { title: "Mutual Induction", description: "EMF induced in one coil due to changing current in a nearby coil. Basis of transformers." }
    ],
    formulas: [
      { name: "Magnetic Flux", formula: "Φ = BA cos θ", description: "Flux through area A in field B at angle θ to normal" },
      { name: "Faraday's Law", formula: "E = -dΦ/dt", description: "Induced EMF equals negative rate of change of flux" },
      { name: "Motional EMF", formula: "E = Blv", description: "EMF in a rod of length l moving with velocity v in field B" },
      { name: "Self-Inductance", formula: "E = -L(dI/dt)", description: "Self-induced EMF in terms of inductance L" },
      { name: "Mutual Inductance", formula: "E₂ = -M(dI₁/dt)", description: "EMF induced in coil 2 due to changing current in coil 1" },
      { name: "Energy in Inductor", formula: "U = ½LI²", description: "Energy stored in an inductor carrying current I" },
      { name: "Inductance of Solenoid", formula: "L = μ₀n²Al", description: "Inductance of solenoid with n turns/length, area A, length l" }
    ]
  },
  {
    chapterNumber: 7,
    keyConcepts: [
      { title: "Alternating Current", description: "Current that reverses direction periodically. Described by I = I₀ sin(ωt), with frequency f = ω/2π." },
      { title: "RMS Values", description: "Root mean square values represent the DC equivalent for power. Vᵣₘₛ = V₀/√2, Iᵣₘₛ = I₀/√2." },
      { title: "Impedance", description: "Total opposition to AC flow, combining resistance and reactance. Z = √(R² + (XL - XC)²)." },
      { title: "Phase Difference", description: "In pure inductor, current lags voltage by 90°. In pure capacitor, current leads voltage by 90°." },
      { title: "Resonance", description: "When XL = XC, impedance is minimum and current is maximum. Resonant frequency fᵣ = 1/(2π√LC)." },
      { title: "Transformer", description: "Device to change AC voltage levels. Uses mutual induction. Vₛ/Vₚ = Nₛ/Nₚ." }
    ],
    formulas: [
      { name: "AC Voltage/Current", formula: "V = V₀ sin(ωt), I = I₀ sin(ωt ± φ)", description: "Instantaneous values of AC voltage and current" },
      { name: "RMS Values", formula: "Vᵣₘₛ = V₀/√2, Iᵣₘₛ = I₀/√2", description: "RMS values in terms of peak values" },
      { name: "Inductive Reactance", formula: "XL = ωL = 2πfL", description: "Opposition to AC by an inductor" },
      { name: "Capacitive Reactance", formula: "XC = 1/ωC = 1/2πfC", description: "Opposition to AC by a capacitor" },
      { name: "Impedance", formula: "Z = √(R² + (XL - XC)²)", description: "Total impedance in an LCR circuit" },
      { name: "Resonant Frequency", formula: "fᵣ = 1/(2π√LC)", description: "Frequency at which XL = XC" },
      { name: "Power in AC", formula: "P = VᵣₘₛIᵣₘₛ cos φ", description: "Average power, where cos φ is the power factor" },
      { name: "Transformer Ratio", formula: "Vₛ/Vₚ = Nₛ/Nₚ = Iₚ/Iₛ", description: "Voltage and current ratios in ideal transformer" }
    ]
  },
  {
    chapterNumber: 8,
    keyConcepts: [
      { title: "Electromagnetic Waves", description: "Waves of oscillating electric and magnetic fields that propagate through space at speed of light. No medium required." },
      { title: "Maxwell's Equations", description: "Four equations unifying electricity and magnetism. Predict EM waves with speed c = 1/√(ε₀μ₀)." },
      { title: "Displacement Current", description: "Maxwell's addition to Ampere's law. A changing electric field produces a magnetic field, enabling EM wave propagation." },
      { title: "EM Spectrum", description: "Range of EM waves from radio waves to gamma rays, all traveling at c but differing in frequency and wavelength." },
      { title: "Properties of EM Waves", description: "Transverse waves with E and B perpendicular to each other and to propagation direction. Carry energy and momentum." },
      { title: "Applications", description: "Radio waves for communication, microwaves for cooking/radar, infrared for heating, UV for sterilization, X-rays for imaging." }
    ],
    formulas: [
      { name: "Speed of EM Waves", formula: "c = 1/√(ε₀μ₀) = 3 × 10⁸ m/s", description: "Speed of light in vacuum" },
      { name: "Wave Equation", formula: "c = fλ", description: "Relation between speed, frequency, and wavelength" },
      { name: "E and B Relation", formula: "E₀/B₀ = c", description: "Ratio of electric to magnetic field amplitudes" },
      { name: "Energy Density", formula: "u = ε₀E² = B²/μ₀", description: "Energy per unit volume in EM wave" },
      { name: "Intensity", formula: "I = ½ε₀cE₀²", description: "Power per unit area carried by EM wave" },
      { name: "Momentum", formula: "p = U/c", description: "Momentum carried by EM wave with energy U" }
    ]
  },
  {
    chapterNumber: 9,
    keyConcepts: [
      { title: "Reflection of Light", description: "Light bounces off surfaces. Angle of incidence equals angle of reflection. Used in mirrors." },
      { title: "Refraction of Light", description: "Light bends when passing between media with different optical densities. Governed by Snell's law." },
      { title: "Total Internal Reflection", description: "When light travels from denser to rarer medium at angle greater than critical angle, it reflects completely. Basis of optical fibers." },
      { title: "Lenses", description: "Converging (convex) lenses focus light, diverging (concave) lenses spread it. Power P = 1/f measured in diopters." },
      { title: "Optical Instruments", description: "Microscopes magnify small objects, telescopes magnify distant objects. Use combinations of lenses/mirrors." },
      { title: "Dispersion", description: "Separation of white light into colors by a prism due to wavelength-dependent refractive index." }
    ],
    formulas: [
      { name: "Mirror Formula", formula: "1/f = 1/v + 1/u", description: "Relation between focal length f, image distance v, object distance u" },
      { name: "Magnification (Mirror)", formula: "m = -v/u = h'/h", description: "Linear magnification for mirrors" },
      { name: "Snell's Law", formula: "n₁ sin θ₁ = n₂ sin θ₂", description: "Law of refraction" },
      { name: "Critical Angle", formula: "sin θc = n₂/n₁", description: "Critical angle for total internal reflection" },
      { name: "Lens Formula", formula: "1/f = 1/v - 1/u", description: "Thin lens equation" },
      { name: "Lens Power", formula: "P = 1/f (in meters)", description: "Power of lens in diopters" },
      { name: "Lensmaker's Equation", formula: "1/f = (n-1)(1/R₁ - 1/R₂)", description: "Focal length in terms of radii of curvature" },
      { name: "Microscope Magnification", formula: "M = L/fₒ × D/fₑ", description: "Magnification of compound microscope" }
    ]
  },
  {
    chapterNumber: 10,
    keyConcepts: [
      { title: "Wave Nature of Light", description: "Light exhibits wave properties like interference and diffraction. Wavelength determines color." },
      { title: "Huygens' Principle", description: "Every point on a wavefront acts as a source of secondary wavelets. The envelope of these wavelets forms the new wavefront." },
      { title: "Interference", description: "When two coherent waves superpose, they create bright (constructive) and dark (destructive) fringes. Young's double slit demonstrates this." },
      { title: "Diffraction", description: "Bending of light around obstacles or through apertures. Single slit produces a central bright band with fainter side bands." },
      { title: "Polarization", description: "Light waves vibrating in a single plane. Proves light is transverse. Used in LCD screens and sunglasses." },
      { title: "Resolving Power", description: "Ability to distinguish nearby objects. Limited by diffraction. Larger apertures give better resolution." }
    ],
    formulas: [
      { name: "Path Difference for Maxima", formula: "Δx = nλ", description: "Condition for constructive interference (n = 0, 1, 2...)" },
      { name: "Path Difference for Minima", formula: "Δx = (n + ½)λ", description: "Condition for destructive interference" },
      { name: "Fringe Width", formula: "β = λD/d", description: "Fringe width in Young's double slit, D is screen distance, d is slit separation" },
      { name: "Single Slit Minima", formula: "a sin θ = nλ", description: "Condition for minima in single slit diffraction" },
      { name: "Rayleigh Criterion", formula: "θ = 1.22λ/D", description: "Angular resolution limit for circular aperture of diameter D" },
      { name: "Malus's Law", formula: "I = I₀ cos² θ", description: "Intensity of polarized light through analyzer at angle θ" },
      { name: "Brewster's Law", formula: "tan θB = n", description: "Polarizing angle in terms of refractive index" }
    ]
  },
  {
    chapterNumber: 11,
    keyConcepts: [
      { title: "Photoelectric Effect", description: "Electrons are ejected from metals when light above threshold frequency shines on them. Proves particle nature of light." },
      { title: "Photon", description: "A quantum of light energy. E = hf. Light behaves as particles (photons) in photoelectric effect." },
      { title: "Work Function", description: "Minimum energy needed to remove an electron from a metal surface. Different for different metals." },
      { title: "de Broglie Hypothesis", description: "All matter has wave properties. Wavelength λ = h/p. Verified by electron diffraction experiments." },
      { title: "Wave-Particle Duality", description: "Light and matter exhibit both wave and particle properties. Which property dominates depends on the experiment." },
      { title: "Davisson-Germer Experiment", description: "Demonstrated electron diffraction, confirming de Broglie's hypothesis about matter waves." }
    ],
    formulas: [
      { name: "Photon Energy", formula: "E = hf = hc/λ", description: "Energy of a photon, where h = 6.63 × 10⁻³⁴ Js" },
      { name: "Photoelectric Equation", formula: "hf = φ + KEmax", description: "Energy balance: photon energy = work function + max kinetic energy" },
      { name: "Threshold Frequency", formula: "f₀ = φ/h", description: "Minimum frequency for photoelectric emission" },
      { name: "Stopping Potential", formula: "eV₀ = KEmax", description: "Potential to stop fastest photoelectrons" },
      { name: "de Broglie Wavelength", formula: "λ = h/p = h/mv", description: "Wavelength associated with moving particle" },
      { name: "de Broglie for Electron", formula: "λ = h/√(2meV)", description: "Wavelength of electron accelerated through potential V" }
    ]
  },
  {
    chapterNumber: 12,
    keyConcepts: [
      { title: "Rutherford's Model", description: "Atom has a tiny, dense, positive nucleus with electrons orbiting around it. Most of atom is empty space." },
      { title: "Bohr's Model", description: "Electrons orbit in specific energy levels. They can jump between levels by absorbing or emitting photons." },
      { title: "Energy Levels", description: "Electrons in atoms have quantized energy. Ground state is lowest energy. Higher levels are excited states." },
      { title: "Hydrogen Spectrum", description: "Discrete spectral lines from electron transitions. Lyman (UV), Balmer (visible), Paschen (IR) series." },
      { title: "Atomic Number", description: "Number of protons in nucleus. Determines the element and its chemical properties." },
      { title: "Limitations of Bohr Model", description: "Works only for hydrogen. Cannot explain fine structure, Zeeman effect, or multi-electron atoms." }
    ],
    formulas: [
      { name: "Bohr Radius", formula: "rₙ = n²a₀ = n² × 0.529 Å", description: "Radius of nth orbit in hydrogen atom" },
      { name: "Energy Levels (Hydrogen)", formula: "Eₙ = -13.6/n² eV", description: "Energy of nth level in hydrogen" },
      { name: "Velocity in Orbit", formula: "vₙ = v₁/n", description: "Velocity in nth orbit, v₁ = 2.2 × 10⁶ m/s" },
      { name: "Rydberg Formula", formula: "1/λ = R(1/n₁² - 1/n₂²)", description: "Wavelength of spectral lines, R = 1.097 × 10⁷ m⁻¹" },
      { name: "Photon Emission", formula: "hf = E₂ - E₁", description: "Energy of photon emitted in transition" },
      { name: "Angular Momentum", formula: "L = nh/2π = nℏ", description: "Quantized angular momentum in Bohr model" }
    ]
  },
  {
    chapterNumber: 13,
    keyConcepts: [
      { title: "Nuclear Structure", description: "Nucleus contains protons and neutrons (nucleons). Atomic number Z = protons, Mass number A = protons + neutrons." },
      { title: "Nuclear Forces", description: "Strong nuclear force holds nucleons together. Short-range, attractive, and much stronger than electromagnetic force." },
      { title: "Binding Energy", description: "Energy needed to break nucleus into individual nucleons. Higher binding energy per nucleon means more stable nucleus." },
      { title: "Radioactivity", description: "Spontaneous emission of radiation from unstable nuclei. Three types: alpha (helium nuclei), beta (electrons), gamma (photons)." },
      { title: "Nuclear Fission", description: "Heavy nucleus splits into lighter nuclei, releasing energy. Used in nuclear power plants and atomic bombs." },
      { title: "Nuclear Fusion", description: "Light nuclei combine to form heavier nucleus, releasing enormous energy. Powers the sun and stars." }
    ],
    formulas: [
      { name: "Mass Defect", formula: "Δm = Zm_p + Nm_n - M", description: "Difference between sum of nucleon masses and nuclear mass" },
      { name: "Binding Energy", formula: "BE = Δmc²", description: "Energy equivalent of mass defect" },
      { name: "Radioactive Decay", formula: "N = N₀e^(-λt)", description: "Number of nuclei remaining after time t" },
      { name: "Half-Life", formula: "T₁/₂ = 0.693/λ = ln2/λ", description: "Time for half the nuclei to decay" },
      { name: "Activity", formula: "A = λN = A₀e^(-λt)", description: "Rate of decay, measured in Becquerel" },
      { name: "Q-Value", formula: "Q = (m_initial - m_final)c²", description: "Energy released in nuclear reaction" }
    ]
  },
  {
    chapterNumber: 14,
    keyConcepts: [
      { title: "Semiconductors", description: "Materials with conductivity between conductors and insulators. Silicon and germanium are common examples. Conductivity increases with temperature." },
      { title: "Energy Bands", description: "In solids, atomic energy levels split into bands. Valence band (filled), conduction band (empty), and band gap determine properties." },
      { title: "p-n Junction", description: "Junction between p-type and n-type semiconductors. Forms a depletion region. Basis of diodes and transistors." },
      { title: "Diode", description: "Allows current in one direction (forward bias) and blocks in reverse. Used for rectification." },
      { title: "Transistor", description: "Three-terminal device (BJT: emitter, base, collector). Used for amplification and switching. Foundation of modern electronics." },
      { title: "Logic Gates", description: "Basic digital circuits: AND, OR, NOT, NAND, NOR. Combine to perform complex operations in computers." }
    ],
    formulas: [
      { name: "Conductivity", formula: "σ = neμₑ + peμₕ", description: "Conductivity in terms of electron and hole concentrations and mobilities" },
      { name: "Mass Action Law", formula: "np = nᵢ²", description: "Product of electron and hole concentrations equals intrinsic concentration squared" },
      { name: "Diode Current", formula: "I = I₀(e^(eV/kT) - 1)", description: "Current-voltage characteristic of p-n junction" },
      { name: "Current Gain (CE)", formula: "β = Ic/Ib", description: "Common emitter current gain" },
      { name: "Voltage Gain", formula: "Aᵥ = Vout/Vin = βRc/Rᵦ", description: "Voltage amplification in CE amplifier" },
      { name: "Power Gain", formula: "Aₚ = β²Rc/Rᵦ", description: "Power amplification in transistor" }
    ]
  },
  {
    chapterNumber: 15,
    keyConcepts: [
      { title: "Communication System", description: "Consists of transmitter, channel, and receiver. Converts information into signals, transmits, and recovers original information." },
      { title: "Modulation", description: "Process of superimposing information signal on a carrier wave. Types: AM (amplitude), FM (frequency), PM (phase)." },
      { title: "Bandwidth", description: "Range of frequencies needed to transmit a signal. Audio needs ~20 kHz, video needs ~4.2 MHz." },
      { title: "Antenna", description: "Device to transmit or receive EM waves. Size related to wavelength. Different types for different applications." },
      { title: "Signal Propagation", description: "Ground wave (low frequency), sky wave (medium frequency using ionosphere), space wave (high frequency, line of sight)." },
      { title: "Internet and Mobile Communication", description: "Digital communication using modulation techniques. Cellular networks divide areas into cells for efficient spectrum use." }
    ],
    formulas: [
      { name: "AM Signal", formula: "s(t) = Ac[1 + μm(t)]cos(ωct)", description: "Amplitude modulated wave, μ is modulation index" },
      { name: "Modulation Index", formula: "μ = Am/Ac", description: "Ratio of message amplitude to carrier amplitude" },
      { name: "AM Bandwidth", formula: "BW = 2fm", description: "Bandwidth equals twice the message frequency" },
      { name: "Range of Space Wave", formula: "d = √(2Rh)", description: "Line of sight range for antenna height h, R is Earth's radius" },
      { name: "Maximum Range (Two Antennas)", formula: "d = √(2RhT) + √(2RhR)", description: "Range between transmitter and receiver antennas" },
      { name: "Channel Capacity", formula: "C = B log₂(1 + S/N)", description: "Shannon's theorem: capacity depends on bandwidth and signal-to-noise ratio" }
    ]
  }
];

async function seedClass12PhysicsConcepts() {
  console.log("Starting to seed Class 12 Physics key concepts and formulas...\n");
  
  for (const chapter of class12PhysicsData) {
    try {
      const result = await db
        .update(chapterContent)
        .set({
          keyConcepts: chapter.keyConcepts,
          formulas: chapter.formulas
        })
        .where(
          and(
            eq(chapterContent.subject, "Physics"),
            eq(chapterContent.classLevel, "12"),
            eq(chapterContent.chapterNumber, chapter.chapterNumber)
          )
        );
      
      console.log(`✓ Chapter ${chapter.chapterNumber}: Added ${chapter.keyConcepts.length} concepts and ${chapter.formulas.length} formulas`);
    } catch (error) {
      console.error(`✗ Chapter ${chapter.chapterNumber}: Error -`, error);
    }
  }
  
  console.log("\n✅ Class 12 Physics seeding complete!");
}

seedClass12PhysicsConcepts()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
