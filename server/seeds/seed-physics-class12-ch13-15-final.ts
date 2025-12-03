import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedPhysicsClass12Final() {
  console.log('Seeding Physics Class 12 Chapters 13-15 (Final Physics)...');

  // Chapter 13
  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 13,
    chapterTitle: 'Nuclei',
    introduction: `The atomic nucleus contains protons and neutrons held together by the strongest force in nature. This chapter explores nuclear composition and size, mass-energy equivalence through Einstein's equation, binding energy explaining nuclear stability, radioactive decay processes (alpha, beta, gamma), decay law and half-life, nuclear fission releasing energy in reactors, nuclear fusion powering stars and future energy, and applications in medicine and industry. Understanding nuclear physics is crucial for NEET as it applies to radiation therapy, nuclear medicine imaging (PET, SPECT), and radiation safety.`,
    detailedNotes: `
# Nuclei

## Nuclear Composition
**Nucleus**: Protons (p) + Neutrons (n) = **Nucleons**
**Atomic number (Z)**: Number of protons
**Mass number (A)**: Total nucleons = Z + N (N = neutrons)
**Notation**: ᴬZ X

**Isotopes**: Same Z, different A (different neutrons)
**Isobars**: Same A, different Z
**Isotones**: Same N, different Z and A

## Nuclear Size
**Radius**: R = R₀A^(1/3)
- R₀ = 1.2 × 10⁻¹⁵ m (fm, fermi)
**Density**: ~10¹⁷ kg/m³ (constant for all nuclei)

## Mass-Energy Equivalence
**Einstein's equation**: **E = mc²**
**Mass defect (Δm)**: Difference between sum of nucleon masses and nuclear mass
**Binding energy (BE)**: Energy released when nucleus formed
**BE = Δm × c² = Δm × 931.5** MeV (1 u = 931.5 MeV/c²)

**BE per nucleon**: Most stable ~8.8 MeV (Fe-56)
- Low A: Increases (fusion possible)
- High A: Decreases (fission possible)

## Radioactivity
**Discovery**: Henri Becquerel (1896), Marie Curie
**Definition**: Spontaneous emission of radiation from unstable nuclei

**Types**:
**1. Alpha (α)**: He nucleus (₂⁴He)
- Mass 4 u, charge +2e
- Low penetration (~cm air, stopped by paper)
- Deflected by E/B fields
- ᴬZ X → ᴬ⁻⁴Z-2 Y + ₂⁴He

**2. Beta (β)**: Electrons (β⁻) or positrons (β⁺)
- Mass ~0, charge ±e
- Medium penetration (~m air, mm Al)
- Deflected more than α
- β⁻: ᴬZ X → ᴬZ+1 Y + ₋₁⁰e + ν̄ (antineutrino)
- β⁺: ᴬZ X → ᴬZ-1 Y + ₊₁⁰e + ν (neutrino)

**3. Gamma (γ)**: EM radiation
- No mass, no charge
- High penetration (cm Pb needed)
- Not deflected
- No change in A or Z (nucleus de-excites)

## Radioactive Decay Law
**N = N₀e^(-λt)**
- N: Nuclei at time t
- N₀: Initial nuclei
- λ: Decay constant

**Activity (A)**: Rate of decay
**A = λN = A₀e^(-λt)**
**Unit**: Becquerel (Bq) = 1 decay/s
- Curie (Ci) = 3.7 × 10¹⁰ Bq

**Half-life (T₁/₂)**: Time for N to become N₀/2
**T₁/₂ = 0.693/λ = ln 2/λ**

**Mean life (τ)**: Average lifetime
**τ = 1/λ = 1.44 T₁/₂**

**After n half-lives**: N = N₀/(2^n)

## Nuclear Fission
**Definition**: Heavy nucleus splits into lighter nuclei + neutrons + energy

**²³⁵U + n → ⁹²Kr + ¹⁴¹Ba + 3n + 200 MeV**

**Chain reaction**: Neutrons from one fission cause more fissions
**Critical mass**: Minimum mass for sustained chain reaction

**Nuclear reactor**:
- **Fuel**: ²³⁵U (enriched uranium)
- **Moderator**: Slow neutrons (heavy water, graphite)
- **Control rods**: Absorb excess neutrons (Cd, B)
- **Coolant**: Remove heat (water, liquid Na)

**Applications**: Power generation

## Nuclear Fusion
**Definition**: Light nuclei combine to form heavier nucleus + energy

**²H + ³H → ⁴He + n + 17.6 MeV**

**Conditions**: Very high T (~10⁷ K) and pressure
**Energy source**: Stars (Sun), hydrogen bomb
**Advantages**: Abundant fuel (deuterium from seawater), less radioactive waste
**Challenge**: Achieve controlled fusion (tokamak, stellarator)

## Comparison
**Fission**: Heavy → lighter (²³⁵U)
**Fusion**: Light → heavier (H → He)
**Fusion** releases more energy per nucleon

## Applications
**Medicine**:
- **Radiotherapy**: Cancer treatment (Co-60, Cs-137)
- **Diagnostic**: PET scan (F-18), bone scan (Tc-99m)
- **Tracers**: Study metabolism

**Industry**:
- **Radiography**: Detect flaws (γ-rays)
- **Thickness gauging**
- **Sterilization**: Medical equipment, food

**Agriculture**: Mutation breeding, pest control (sterile insects)

**Carbon dating**: ¹⁴C (T₁/₂ = 5730 yr) for age determination

## Summary
1. Nuclear radius R = R₀A^(1/3); binding energy BE = Δm × 931.5 MeV per u
2. Radioactive decay: α (He nucleus, +2, low penetration), β (electron/positron, ±1), γ (photon, 0)
3. Decay law N = N₀e^(-λt); half-life T₁/₂ = 0.693/λ
4. Fission: Heavy nucleus splits releasing ~200 MeV; chain reaction in reactor
5. Fusion: Light nuclei combine releasing energy; powers stars, needs high temperature
6. Applications: radiotherapy, PET scans, carbon dating, nuclear power
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Nuclei',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  // Chapter 14
  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 14,
    chapterTitle: 'Semiconductor Electronics: Materials, Devices and Simple Circuits',
    introduction: `Semiconductors bridge conductors and insulators, forming the basis of modern electronics. This chapter explores intrinsic and extrinsic semiconductors, energy band theory explaining conductivity, p-n junction diodes and their applications in rectification, special purpose diodes (Zener, LED, photodiode), transistors as amplifiers and switches, logic gates implementing Boolean operations, and integrated circuits. Understanding semiconductor physics is essential for NEET as medical devices extensively use electronic sensors, monitors, and diagnostic equipment.`,
    detailedNotes: `
# Semiconductor Electronics

## Classification of Materials
**By conductivity (σ)**:
**1. Conductors**: σ ~ 10⁷ (Ω·m)⁻¹ (metals)
**2. Semiconductors**: σ ~ 10⁻⁶ to 10⁴ (Si, Ge)
**3. Insulators**: σ < 10⁻¹⁰ (rubber, glass)

## Energy Bands
**Valence band**: Filled with electrons at 0 K
**Conduction band**: Empty at 0 K, conducting electrons
**Band gap (E_g)**: Energy difference

**Conductor**: Bands overlap or partially filled
**Insulator**: E_g > 3 eV (large gap)
**Semiconductor**: E_g ~ 1 eV (small gap)
- Si: 1.1 eV, Ge: 0.7 eV

## Intrinsic Semiconductors
**Pure** Si or Ge (no impurities)
**Carriers**: Electrons (n) and holes (p)
**n = p = n_i** (intrinsic carrier concentration)
**Conductivity**: Low, increases with temperature

**Hole**: Absence of electron, behaves as +ve charge

## Extrinsic Semiconductors
**Doped** with impurities (1 in 10⁶ atoms)

**1. n-type** (negative):
- **Dopant**: Group 15 (P, As, Sb) - pentavalent
- **Majority**: Electrons
- **Minority**: Holes
- **Donor** atoms (donate electrons)

**2. p-type** (positive):
- **Dopant**: Group 13 (B, Al, Ga, In) - trivalent
- **Majority**: Holes
- **Minority**: Electrons
- **Acceptor** atoms (accept electrons)

## p-n Junction
**Formation**: p-type and n-type joined
**Depletion region**: No free carriers, electric field
**Barrier potential**: ~0.7 V (Si), ~0.3 V (Ge)

**Forward bias** (p to +ve, n to -ve):
- Barrier reduced, current flows
- Resistance low (~Ω)
- Exponential I-V curve

**Reverse bias** (p to -ve, n to +ve):
- Barrier increased, negligible current
- Resistance high (~MΩ)
- Small reverse saturation current (μA)

**Diode equation**: I = I₀(e^(eV/kT) - 1)

## Diode as Rectifier
**Rectification**: AC → pulsating DC

**1. Half-wave rectifier**:
- Single diode
- Output: One half-cycle only
- Efficiency: 40.6%

**2. Full-wave rectifier**:
- Two diodes (center-tap) or four (bridge)
- Both half-cycles utilized
- Efficiency: 81.2%

**Filter**: Smooth pulsating DC (capacitor)

## Special Purpose Diodes

**1. Zener Diode**:
- Operates in reverse breakdown
- **Zener voltage (V_z)**: Constant voltage across diode
- **Application**: Voltage regulator

**2. LED** (Light Emitting Diode):
- Forward biased emits light
- Band gap energy → photon (E = hν)
- **Colors**: Red (~1.8 eV), Green (~2.4 eV), Blue (~3 eV)
- **Applications**: Displays, indicators, lighting

**3. Photodiode**:
- Reverse biased, light increases current
- **Photocurrent** proportional to light intensity
- **Applications**: Light sensors, optical communication

**4. Solar Cell**:
- p-n junction, converts light → electricity
- No external bias needed
- **Efficiency**: ~15-20%

## Transistor
**Types**: BJT (Bipolar Junction Transistor), FET

**BJT**: Two junctions (pnp or npn)
**Terminals**: Emitter (E), Base (B), Collector (C)

**npn**: n-p-n layers
**pnp**: p-n-p layers

**Biasing** (npn in active mode):
- **Emitter-base**: Forward biased
- **Collector-base**: Reverse biased

**Current relations**:
**I_E = I_B + I_C** (Kirchhoff)
**I_C = βI_B** (β = current gain, typically 50-200)
**α = I_C/I_E** (α < 1, typically 0.95-0.99)
**β = α/(1-α)**

**Configurations**:
**1. Common Emitter (CE)**: Most common
- Input: Base, Output: Collector
- High voltage and current gain
- Phase reversal (180°)

**2. Common Base (CB)**:
- High voltage gain, no current gain
- No phase reversal

**3. Common Collector (CC)**: Emitter follower
- Current gain, no voltage gain
- No phase reversal

## Transistor as Amplifier
**Small input signal** → amplified output
**Voltage gain (A_v)**: ΔV_out/ΔV_in
**Typical**: A_v ~ 100

**Applications**: Audio amplifiers, RF amplifiers

## Transistor as Switch
**Cut-off**: V_BE < 0.7 V → I_C ≈ 0 (OFF)
**Saturation**: V_BE > 0.7 V, high I_B → I_C maximum (ON)

**Applications**: Digital circuits, relays

## Logic Gates
**Boolean operations** on binary inputs (0, 1)

**1. NOT**: Output = Input̄
**2. AND**: Output = A · B (1 if both 1)
**3. OR**: Output = A + B (1 if any 1)
**4. NAND**: NOT-AND = (A · B)̄
**5. NOR**: NOT-OR = (A + B)̄
**6. XOR**: A ⊕ B (1 if different)
**7. XNOR**: (A ⊕ B)̄ (1 if same)

**Universal gates**: NAND, NOR (can make any gate)

## Integrated Circuits (IC)
**Monolithic**: Entire circuit on single Si chip
**Advantages**: Compact, reliable, low power, mass production

**Scale**:
**SSI**: <10 gates
**MSI**: 10-100 gates
**LSI**: 100-1000 gates
**VLSI**: >1000 gates

**Applications**: Microprocessors, memory chips

## Summary
1. Semiconductors: E_g ~ 1 eV; Si (1.1 eV), Ge (0.7 eV)
2. n-type: pentavalent dopant, electrons majority; p-type: trivalent, holes majority
3. p-n junction diode: forward bias (low R, conducts), reverse bias (high R, blocks)
4. Zener diode for voltage regulation; LED emits light when forward biased
5. Transistor: I_E = I_B + I_C, I_C = βI_B; operates as amplifier or switch
6. Logic gates: NOT, AND, OR, NAND, NOR; NAND and NOR are universal
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Semiconductor Electronics: Materials, Devices and Simple Circuits',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  // Chapter 15
  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 15,
    chapterTitle: 'Communication Systems',
    introduction: `Communication systems transmit information from source to destination using electromagnetic waves. This chapter explores elements of communication systems, modulation techniques (amplitude and frequency) for efficient transmission, bandwidth requirements, propagation of electromagnetic waves through ground, sky, and space waves, satellite communication, and basic concepts of digital communication. Understanding communication systems is important for NEET as medical telemetry, remote patient monitoring, and wireless medical devices rely on these principles.`,
    detailedNotes: `
# Communication Systems

## Elements of Communication System

**1. Transmitter**:
- Converts message to signal suitable for transmission
- **Transducer**: Message → electrical signal
- **Amplifier**: Boost signal power
- **Oscillator**: Generate carrier wave
- **Modulator**: Superimpose message on carrier
- **Transmitting antenna**: Radiate EM waves

**2. Communication Channel**:
- Medium for signal propagation
- **Types**: Wire, optical fiber, free space (EM waves)
- **Noise**: Unwanted signals interfering with message

**3. Receiver**:
- Extracts message from received signal
- **Receiving antenna**: Capture EM waves
- **Demodulator/Detector**: Extract message from carrier
- **Amplifier**: Boost weak signal
- **Transducer**: Electrical → message (speaker, display)

## Basic Terminology

**Signal**: Time-varying quantity carrying information
**Analog**: Continuous values (voice, music)
**Digital**: Discrete values (0, 1)

**Noise**: Unwanted signals
**Sources**: Thermal, atmospheric, industrial

**Attenuation**: Loss of signal strength with distance

**Bandwidth**: Range of frequencies in signal
**Voice**: ~3 kHz
**Video**: ~4 MHz

**Range**: Maximum distance for communication

## Need for Modulation
**Reasons**:
1. **Antenna size**: λ/4 (too large for audio)
   - 20 kHz → 3.75 km antenna!
2. **Effective radiation**: High frequency radiates better
3. **Multiplexing**: Multiple signals on different carriers
4. **Reduced noise**: Signal processing easier at high freq

## Modulation Techniques
**Modulation**: Superimpose message (baseband) on carrier (high freq)

**Carrier**: c(t) = A_c sin(ω_c t)
**Message**: m(t) = A_m sin(ω_m t)
- ω_m << ω_c

**Types**:

**1. Amplitude Modulation (AM)**:
- **Amplitude** of carrier varies with message
**C_m(t) = [A_c + A_m sin ω_m t] sin ω_c t**
**C_m(t) = A_c sin ω_c t + (A_m/2) cos(ω_c - ω_m)t - (A_m/2) cos(ω_c + ω_m)t**

**Components**:
- **Carrier**: f_c
- **Lower sideband (LSB)**: f_c - f_m
- **Upper sideband (USB)**: f_c + f_m

**Modulation index**: μ = A_m/A_c (≤ 1 for no distortion)

**Bandwidth**: BW = 2f_m (twice message frequency)

**Power**:
**P_t = P_c(1 + μ²/2)**
- Most power in carrier (wasted)
- Maximum efficiency: 33% (μ = 1)

**Advantages**: Simple, cheap receivers
**Disadvantages**: Noise, low efficiency, large BW

**Applications**: AM radio (530-1600 kHz)

**2. Frequency Modulation (FM)**:
- **Frequency** of carrier varies with message
- Amplitude constant

**Modulation index**: μ_f = Δf/f_m
- Δf: Maximum frequency deviation

**Bandwidth**: BW ≈ 2(Δf + f_m) = 2f_m(1 + μ_f)
- **Wider** than AM

**Advantages**: Less noise, better quality
**Disadvantages**: Complex, larger BW

**Applications**: FM radio (88-108 MHz), TV audio

**3. Phase Modulation (PM)**:
- **Phase** of carrier varies with message

**Comparison**:
- **AM**: Simple, narrow BW, noisy
- **FM/PM**: Better quality, wider BW, complex

## Wave Propagation

**1. Ground Wave** (Surface wave):
- Follows Earth's curvature
- **Frequency**: <2 MHz (long, medium waves)
- **Range**: ~1000 km
- **Attenuation**: Increases with frequency
- **Applications**: AM radio

**2. Sky Wave** (Ionospheric):
- Reflected by **ionosphere** (60-400 km altitude)
- **Frequency**: 3-30 MHz (short waves, HF)
- **Range**: Beyond horizon, global
- **Skip distance**: Minimum distance where sky wave returns
- **Critical frequency (f_c)**: Maximum frequency reflected at given angle
- **Applications**: HAM radio, international broadcasting

**Ionosphere layers**:
- **D layer** (~60-90 km): Absorbs HF (daytime only)
- **E layer** (~90-120 km)
- **F layer** (~150-400 km): Most reflecting (F1, F2)

**3. Space Wave** (Line of sight):
- Straight line, no reflection
- **Frequency**: >30 MHz (VHF, UHF, SHF)
- **Range**: Limited by horizon (~50 km)
**d = √(2R h_T) + √(2R h_R)**
- h_T, h_R: Transmitter, receiver heights
- R = 6400 km (Earth's radius)

**Applications**: FM, TV, radar, satellite

## Satellite Communication
**Geostationary orbit**: 36,000 km above equator
- **Period**: 24 hours (appears stationary)
- **Coverage**: ~1/3 Earth surface
- **Minimum satellites**: 3 for global coverage

**Uplink**: Earth → satellite (5-6 GHz)
**Downlink**: Satellite → Earth (3-4 GHz)

**Transponder**: Receives, amplifies, retransmits

**Applications**: TV broadcasting, telephone, internet, GPS, weather

**Advantages**: Large coverage, reliable
**Disadvantages**: Time delay (~0.25 s), expensive

## Digital Communication
**Analog → Digital**: Sampling, quantization, encoding

**Pulse Code Modulation (PCM)**:
1. **Sampling**: Sample analog at 2f_max (Nyquist rate)
2. **Quantization**: Round to discrete levels
3. **Encoding**: Binary code

**Advantages**: Noise immune, error correction, encryption
**Disadvantages**: Larger BW

**Internet**: Packet switching, TCP/IP
**Mobile**: GSM, CDMA, 4G, 5G

## Summary
1. Communication system: Transmitter → Channel → Receiver; modulation needed for efficient transmission
2. AM: Amplitude varies, BW = 2f_m, simple but noisy; FM: frequency varies, wider BW, better quality
3. Modulation index: AM μ = A_m/A_c; power P_t = P_c(1 + μ²/2)
4. Ground wave (<2 MHz, ~1000 km), sky wave (3-30 MHz, ionosphere reflection), space wave (>30 MHz, line of sight)
5. Satellite communication: geostationary orbit at 36,000 km, 24-hour period, 3 satellites for global coverage
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Communication Systems',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  console.log('✓ Seeded Physics Class 12 Chapters 13-15 (PHYSICS COMPLETE!)');
}

seedPhysicsClass12Final().catch(console.error);
