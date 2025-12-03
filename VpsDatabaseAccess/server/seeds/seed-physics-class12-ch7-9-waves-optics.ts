import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedPhysicsClass12WavesOptics() {
  console.log('Seeding Physics Class 12 Chapters 7-9...');

  // Chapter 7
  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 7,
    chapterTitle: 'Alternating Current',
    introduction: `Alternating current (AC) periodically reverses direction, powering most electrical grids and devices worldwide. This chapter explores AC voltage and current represented as sinusoidal functions, phasor diagrams for circuit analysis, behavior of resistors, inductors, and capacitors in AC circuits, impedance and resonance in LCR circuits, power in AC circuits distinguishing between average and apparent power, and transformers for voltage conversion. Understanding AC circuits is vital for NEET as medical equipment extensively uses AC power and signal processing.`,
    detailedNotes: `
# Alternating Current

## AC Voltage and Current
**V = V₀ sin ωt** (instantaneous voltage)
**I = I₀ sin(ωt ± φ)** (instantaneous current)
- V₀, I₀: Peak (amplitude) values
- ω = 2πf: Angular frequency
- φ: Phase difference

**RMS (Root Mean Square) values**:
**V_rms = V₀/√2**, **I_rms = I₀/√2**
- Used for power calculations
- AC meters show RMS values

## AC Circuit Elements

**1. Resistor (R)**:
- V and I in phase (φ = 0)
- **V_R = IR**
- Power dissipated: P = I²R

**2. Inductor (L)**:
- I lags V by 90° (φ = -90°)
- **Inductive reactance**: X_L = ωL = 2πfL
- **V_L = IX_L**
- No power dissipation (energy stored/released)

**3. Capacitor (C)**:
- I leads V by 90° (φ = +90°)
- **Capacitive reactance**: X_C = 1/(ωC) = 1/(2πfC)
- **V_C = IX_C**
- No power dissipation

## LCR Series Circuit
**Impedance**: Z = √(R² + (X_L - X_C)²)
**Current**: I = V/Z
**Phase angle**: tan φ = (X_L - X_C)/R

**Conditions**:
- X_L > X_C: Inductive (I lags V)
- X_C > X_L: Capacitive (I leads V)
- X_L = X_C: Resonance (I in phase with V)

## Resonance
**Resonant frequency**: **f₀ = 1/(2π√(LC))**
At resonance:
- X_L = X_C
- Z = R (minimum)
- I = V/R (maximum)
- φ = 0 (in phase)
- Power maximum

**Sharpness**: Q = ωL/R = 1/(ωCR)

## Power in AC Circuit
**Instantaneous**: p = vi = V₀I₀ sin ωt sin(ωt - φ)
**Average**: **P = V_rms I_rms cos φ**
- cos φ: **Power factor**
- φ: Phase angle between V and I

**Power factor**:
- **Resistive**: cos φ = 1 (φ = 0)
- **Purely inductive/capacitive**: cos φ = 0
- **LCR**: cos φ = R/Z

**Apparent power**: S = V_rms I_rms (VA)
**True power**: P = S cos φ (W)

## Wattless Current
**In pure L or C**: Average power = 0
Current flows but no energy consumed (stored/returned each cycle)

## LC Oscillations
**Frequency**: f = 1/(2π√(LC))
Energy oscillates between electric and magnetic

## Summary
1. AC: V = V₀ sin ωt; RMS values V_rms = V₀/√2, I_rms = I₀/√2
2. Inductive reactance X_L = ωL; capacitive X_C = 1/(ωC)
3. LCR impedance Z = √(R² + (X_L - X_C)²); current I = V/Z
4. Resonance at f₀ = 1/(2π√LC): Z minimum, I maximum
5. Power P = V_rms I_rms cos φ where cos φ is power factor
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Alternating Current',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  // Chapter 8
  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 8,
    chapterTitle: 'Electromagnetic Waves',
    introduction: `Electromagnetic waves are self-propagating oscillations of electric and magnetic fields carrying energy through space. This chapter explores Maxwell's equations unifying electricity and magnetism, electromagnetic wave generation from accelerating charges, properties including transverse nature and speed in vacuum, the electromagnetic spectrum from radio waves to gamma rays with their applications, and energy transport by EM waves. Understanding electromagnetic waves is essential for NEET as they include visible light, X-rays used in medical imaging, and ultraviolet radiation affecting biological tissues.`,
    detailedNotes: `
# Electromagnetic Waves

## Displacement Current
**Maxwell's correction to Ampere's law**:
**I_d = ε₀ dΦ_E/dt**
- Explains current through capacitor gap
- Changing electric flux acts like current

**Modified Ampere's law**:
**∮ B·dl = μ₀(I + I_d)**

## Maxwell's Equations
**Complete description of electromagnetism**:

**1. Gauss's law (electric)**: ∮ E·dA = Q/ε₀
**2. Gauss's law (magnetic)**: ∮ B·dA = 0 (no monopoles)
**3. Faraday's law**: ∮ E·dl = -dΦ_B/dt
**4. Ampere-Maxwell law**: ∮ B·dl = μ₀(I + ε₀ dΦ_E/dt)

**Prediction**: EM waves travel at **c = 1/√(μ₀ε₀) ≈ 3 × 10⁸ m/s**

## EM Wave Properties
1. **Transverse**: E ⊥ B ⊥ direction of propagation
2. **E and B in phase**: Peak together
3. **E₀/B₀ = c** (amplitude ratio)
4. **Speed in vacuum**: c = 3 × 10⁸ m/s
5. **No medium required**: Can travel through vacuum
6. **Carry energy and momentum**

**Wave equation**: E = E₀ sin(kx - ωt)
- k = 2π/λ (wave number)
- ω = 2πf (angular frequency)
- c = λf

## Energy and Intensity
**Energy density**: u = ½(ε₀E² + B²/μ₀)
**Intensity**: I = uc = ½ε₀E₀²c
**Radiation pressure**: p = I/c (for absorption)

## Electromagnetic Spectrum

**Radio waves** (>0.1 m):
- AM/FM broadcasting, TV, radar
- Produced by oscillating circuits

**Microwaves** (1 mm - 0.3 m):
- Radar, mobile phones, microwave ovens
- Molecular rotations

**Infrared** (700 nm - 1 mm):
- Heat radiation, night vision, remote controls
- Molecular vibrations

**Visible light** (400-700 nm):
- VIBGYOR (400-700 nm)
- Human eye sensitive
- Emitted by excited atoms

**Ultraviolet** (10-400 nm):
- Tanning, sterilization, fluorescence
- Damages DNA
- Absorbed by ozone layer

**X-rays** (0.01-10 nm):
- Medical imaging, crystallography
- Produced by electron bombardment
- Penetrate soft tissue, absorbed by bones

**Gamma rays** (<0.01 nm):
- Radioactive decay, nuclear reactions
- Cancer treatment, sterilization
- Most penetrating, most energetic

**Order (increasing frequency)**:
Radio < Micro < IR < Visible < UV < X-ray < Gamma

## Applications

**Communication**: Radio, TV, mobile phones
**Medicine**: X-ray imaging, radiation therapy
**Astronomy**: Radio telescopes, infrared astronomy
**Remote sensing**: Satellite imagery (IR, microwave)
**Spectroscopy**: Identify elements (visible, UV)

## Summary
1. Maxwell's equations predict EM waves traveling at c = 1/√(μ₀ε₀) ≈ 3 × 10⁸ m/s
2. EM waves are transverse with E ⊥ B ⊥ direction; E₀/B₀ = c
3. Displacement current I_d = ε₀ dΦ_E/dt explains current in capacitor charging
4. EM spectrum: Radio < Microwave < IR < Visible < UV < X-ray < Gamma
5. Energy density u = ½(ε₀E² + B²/μ₀); Intensity I = uc
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Electromagnetic Waves',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  // Chapter 9
  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 9,
    chapterTitle: 'Ray Optics and Optical Instruments',
    introduction: `Light behaves as rays traveling in straight lines, reflecting and refracting at surfaces to form images. This chapter explores reflection and refraction laws, image formation by plane and curved mirrors using mirror equation, refraction through lenses and lens maker's equation, optical instruments including microscopes and telescopes, defects of vision corrected by lenses, and dispersion of light into colors. Understanding ray optics is crucial for NEET as it applies to the human eye, corrective lenses, endoscopes, and microscopes used in medical diagnosis.`,
    detailedNotes: `
# Ray Optics and Optical Instruments

## Reflection
**Laws**:
1. Incident ray, reflected ray, normal lie in same plane
2. Angle of incidence = Angle of reflection (i = r)

**Plane mirror**: Virtual, erect, same size image at equal distance behind

## Spherical Mirrors
**Concave** (converging): Reflects inward
**Convex** (diverging): Reflects outward

**Terms**:
- **f**: Focal length
- **R**: Radius of curvature (R = 2f)
- **u**: Object distance (negative)
- **v**: Image distance
- **m**: Magnification = v/u = h'/h

**Mirror equation**: **1/f = 1/v + 1/u**
**m = -v/u**

**Sign convention** (Cartesian):
- Distances measured from pole
- Left of mirror: Negative
- Right of mirror: Positive

## Refraction
**n = c/v** (refractive index)
- c: Speed in vacuum
- v: Speed in medium

**Snell's law**: **n₁ sin i = n₂ sin r**

**Total internal reflection**:
- When light goes from denser to rarer (n₁ > n₂)
- **Critical angle**: sin i_c = n₂/n₁
- i > i_c: Total reflection

**Applications**: Optical fibers, prisms, diamonds

## Refraction Through Prism
**δ = i + e - A** (deviation)
- A: Prism angle
- i: Incident angle
- e: Emergent angle

**Minimum deviation**: i = e
**δ_min = 2i - A**
**n = sin((A + δ_min)/2) / sin(A/2)**

## Lenses
**Convex** (converging): Thicker at center
**Concave** (diverging): Thinner at center

**Lens equation**: **1/f = 1/v - 1/u**
**m = v/u = h'/h**

**Lens maker's equation**:
**1/f = (n - 1)(1/R₁ - 1/R₂)**
- n: Refractive index of lens material
- R₁, R₂: Radii of curvature

**Power**: P = 1/f (meter)
**Unit**: Diopter (D) = m⁻¹

**Combination**: P = P₁ + P₂ + P₃

## Human Eye
**Parts**: Cornea, pupil, lens, retina
**Accommodation**: Lens changes curvature
**Near point**: 25 cm (least distance of distinct vision)
**Far point**: Infinity

**Defects**:
**1. Myopia** (near-sightedness):
- Far point closer than infinity
- **Correction**: Concave lens

**2. Hypermetropia** (far-sightedness):
- Near point beyond 25 cm
- **Correction**: Convex lens

**3. Presbyopia**: Age-related loss of accommodation
- **Correction**: Bifocal lens

**4. Astigmatism**: Different curvatures
- **Correction**: Cylindrical lens

## Simple Microscope
**Magnifying glass**: Single convex lens
**Magnification**: m = 1 + D/f (image at near point)
- m = D/f (image at infinity, relaxed eye)
- D = 25 cm

## Compound Microscope
**Two lenses**: Objective (small f) + Eyepiece
**m = m_o × m_e = (v_o/u_o) × (D/f_e)**

**At relaxed eye**: m ≈ (L × D)/(f_o × f_e)
- L: Tube length

## Astronomical Telescope
**For distant objects**:
**m = f_o/f_e** (magnifying power)
- f_o: Objective focal length (large)
- f_e: Eyepiece focal length (small)

**Length**: L = f_o + f_e (normal adjustment)

## Terrestrial Telescope
**Erecting lens** to invert image (make it erect)
**L = f_o + 4f + f_e**

## Dispersion
**White light → spectrum** (VIBGYOR)
**n varies with λ**: Violet bent most, red least
**Cause**: Different speeds for different colors

**Angular dispersion**: δ_v - δ_r
**Dispersive power**: ω = (δ_v - δ_r)/δ_y

## Summary
1. Mirror equation 1/f = 1/v + 1/u; magnification m = -v/u
2. Snell's law n₁ sin i = n₂ sin r; total internal reflection when i > i_c
3. Lens equation 1/f = 1/v - 1/u; lens maker's formula 1/f = (n-1)(1/R₁ - 1/R₂)
4. Power P = 1/f in diopters; combined power P = P₁ + P₂
5. Myopia corrected by concave lens; hypermetropia by convex lens
6. Compound microscope m = (L×D)/(f_o×f_e); telescope m = f_o/f_e
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Ray Optics and Optical Instruments',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  console.log('✓ Seeded Physics Class 12 Chapters 7-9');
}

seedPhysicsClass12WavesOptics().catch(console.error);
