import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedPhysicsClass12Modern() {
  console.log('Seeding Physics Class 12 Chapters 10-12...');

  // Chapter 10
  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 10,
    chapterTitle: 'Wave Optics',
    introduction: `Light exhibits wave properties through interference and diffraction, phenomena inexplicable by ray optics. This chapter explores Huygens' principle explaining wave propagation, Young's double-slit experiment demonstrating interference, conditions for constructive and destructive interference, single-slit diffraction producing patterns, polarization proving light's transverse nature, and resolution limits of optical instruments. Understanding wave optics is important for NEET as it applies to advanced microscopy, holography, and understanding electromagnetic wave behavior in biological tissues.`,
    detailedNotes: `
# Wave Optics

## Huygens' Principle
**Statement**: Every point on a wavefront acts as source of secondary wavelets
**Application**: Explains reflection, refraction, diffraction

**Refraction derivation**: n₁ sin i = n₂ sin r (Snell's law)

## Coherent Sources
**Definition**: Sources with constant phase difference
**Requirements** for sustained interference:
1. Same frequency (wavelength)
2. Constant phase difference
3. Same amplitude (preferably)

**Methods to obtain**:
- Single source division (Young's double slit)
- Lloyd's mirror, Fresnel biprism

## Young's Double Slit Experiment
**Setup**: Monochromatic light → double slit → screen

**Path difference**: Δx = d sin θ ≈ dy/D
- d: Slit separation
- y: Distance from center
- D: Screen distance

**Bright fringe** (constructive): Δx = nλ (n = 0,1,2...)
**Dark fringe** (destructive): Δx = (2n-1)λ/2

**Fringe width**: β = λD/d
- All bright (or dark) fringes equally spaced

**Intensity**: I = 4I₀ cos²(φ/2)
- I₀: Intensity from one slit
- φ = 2πΔx/λ (phase difference)

**Central maximum**: Brightest (n=0)

**Effect of changes**:
- **Increase λ**: β increases (fringes wider)
- **Increase d**: β decreases (fringes closer)
- **White light**: Central white, colored fringes

## Diffraction
**Definition**: Bending of waves around obstacles/openings

**Fresnel diffraction**: Source/screen close
**Fraunhofer diffraction**: Source/screen at infinity (parallel rays)

**Single Slit Diffraction**:
**First minimum**: a sin θ = λ
- a: Slit width

**Width of central maximum**: 2λD/a
- Twice the width of secondary maxima

**Comparison with interference**:
- Interference: Equal width fringes
- Diffraction: Central maximum brightest and widest

## Resolving Power
**Rayleigh criterion**: Two images just resolved when central maximum of one coincides with first minimum of other

**Resolving power**:
**R = 1/dθ**

**Microscope**: R = 2n sin θ/λ
- n: Refractive index of medium
- θ: Semi-angle of cone

**Telescope**: R = a/(1.22λ)
- a: Aperture diameter

**Increase RP**: Larger aperture, smaller wavelength

## Polarization
**Unpolarized light**: Electric field vibrates in all perpendicular planes
**Polarized light**: Vibrations in single plane

**Proof of transverse nature**: Only transverse waves can be polarized

**Methods**:
1. **Polaroid**: Selective absorption
2. **Reflection**: At Brewster's angle (tan θ_B = n)
3. **Double refraction**: Calcite crystal
4. **Scattering**: Blue sky is polarized

**Malus' Law**: I = I₀ cos² θ
- θ: Angle between polarizer and analyzer
- Maximum: θ = 0° (parallel)
- Minimum: θ = 90° (crossed)

**Brewster's law**: tan θ_B = n₂/n₁
- At θ_B, reflected light completely polarized

**Applications**: Sunglasses, 3D movies, LCD displays, stress analysis

## Summary
1. Huygens' principle: Each wavefront point sources secondary wavelets
2. Young's double slit: Fringe width β = λD/d; bright at path difference nλ
3. Coherent sources needed for sustained interference (constant phase difference)
4. Single slit diffraction: First minimum at a sin θ = λ; central maximum widest
5. Resolving power: Telescope R = a/(1.22λ); microscope R = 2n sin θ/λ
6. Polarization proves transverse nature; Malus' law I = I₀ cos² θ
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Wave Optics',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  // Chapter 11
  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 11,
    chapterTitle: 'Dual Nature of Radiation and Matter',
    introduction: `Light and matter exhibit both wave and particle properties, a central concept of quantum mechanics. This chapter explores the photoelectric effect proving light's particle nature, Einstein's explanation using photons and energy quantization, de Broglie's hypothesis of matter waves, experimental verification through electron diffraction, and Davisson-Germer experiment. Understanding wave-particle duality is crucial for NEET as it underpins atomic structure, X-ray imaging, electron microscopy, and quantum biology.`,
    detailedNotes: `
# Dual Nature of Radiation and Matter

## Electron Emission
**Work function (φ₀)**: Minimum energy to remove electron from metal surface
**Threshold frequency (ν₀)**: Minimum frequency to cause emission
**φ₀ = hν₀**

**Methods**: Thermionic, field emission, photoelectric

## Photoelectric Effect
**Observation**: Light incident on metal → electrons emitted

**Experimental findings** (Lenard, Hallwachs):
1. **Instantaneous emission** (<10⁻⁹ s)
2. **Threshold frequency**: No emission below ν₀
3. **Maximum KE independent of intensity**
4. **Number of electrons ∝ intensity**

**Classical wave theory failures**:
- Predicts time lag (energy accumulation)
- No threshold frequency
- KE should depend on intensity

## Einstein's Photoelectric Equation
**Light as photons**: E = hν
- h = 6.63 × 10⁻³⁴ J·s (Planck's constant)

**Energy conservation**:
**hν = φ₀ + KE_max**
**hν = hν₀ + ½mv_max²**

**Stopping potential (V₀)**:
**eV₀ = KE_max = h(ν - ν₀)**

**Graph V₀ vs ν**: Straight line
- Slope = h/e
- Intercept = -φ₀/e = -ν₀

**Nobel Prize 1921**: Einstein for photoelectric effect explanation

## Particle Nature of Light
**Photon**:
- Energy: E = hν = hc/λ
- Momentum: p = E/c = h/λ
- Rest mass: 0
- Speed: c (in vacuum)

**Applications**:
- Photoelectric cells (burglar alarms, solar panels)
- Photomultiplier tubes
- Image sensors (cameras)

## Matter Waves (de Broglie Hypothesis)
**Hypothesis** (1924): All matter has wave nature
**λ = h/p = h/(mv)**
- λ: de Broglie wavelength
- p = mv: momentum

**For electron**:
**λ = h/√(2mE) = h/√(2meV)**
- At V = 100 V: λ ≈ 1.2 Å (comparable to atomic spacing)

**Macroscopic objects**: λ too small to observe
**Example**: 1 kg at 1 m/s → λ ~ 10⁻³⁴ m (negligible)

## Davisson-Germer Experiment
**Verification of matter waves** (1927)
**Method**: Electron beam on nickel crystal
**Result**: Diffraction pattern (like X-rays)
**Confirms**: Electrons have wave nature

**Bragg's law**: nλ = 2d sin θ
- Verified λ = h/p

**Nobel Prize 1937**: Davisson for electron diffraction

## Wave-Particle Duality
**Light**: Shows wave (interference) and particle (photoelectric) nature
**Matter**: Shows particle (trajectories) and wave (diffraction) nature

**Complementarity principle** (Bohr):
- Both aspects never observed simultaneously
- Experiment determines which aspect manifests

**Heisenberg Uncertainty Principle**:
**Δx · Δp ≥ h/(4π)**
- Cannot know position and momentum precisely simultaneously

## Summary
1. Photoelectric effect: hν = φ₀ + KE_max; instantaneous, threshold frequency exists
2. Einstein's equation: eV₀ = h(ν - ν₀) where V₀ is stopping potential
3. Photon energy E = hν, momentum p = h/λ; rest mass zero
4. de Broglie wavelength λ = h/p = h/(mv) for matter waves
5. Davisson-Germer experiment verified electron diffraction confirming wave nature
6. Wave-particle duality: Light and matter exhibit both properties depending on experiment
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Dual Nature of Radiation and Matter',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  // Chapter 12
  await db.insert(chapterContent).values({
    subject: 'Physics',
    classLevel: '12',
    chapterNumber: 12,
    chapterTitle: 'Atoms',
    introduction: `Atomic structure reveals how electrons occupy discrete energy levels around the nucleus, emitting or absorbing characteristic spectra. This chapter explores Thomson's and Rutherford's atomic models, Rutherford scattering experiments revealing the nuclear atom, Bohr's model explaining hydrogen spectrum through quantized orbits, energy levels and spectral series, de Broglie's explanation of quantization, and limitations leading to quantum mechanics. Understanding atomic structure is vital for NEET as it explains medical imaging techniques, laser therapy, and spectroscopic diagnostic methods.`,
    detailedNotes: `
# Atoms

## Early Models

**Thomson Model** (1898): Plum pudding
- Positive charge spread throughout
- Electrons embedded like plums
- **Drawback**: Couldn't explain scattering experiments

**Rutherford Model** (1911): Nuclear atom
- Tiny, dense, positive nucleus
- Electrons orbit nucleus
- **Drawbacks**: Unstable (accelerating charges radiate), no explanation of spectra

## Rutherford α-Scattering Experiment
**Setup**: α-particles (He²⁺) bombard thin gold foil

**Observations**:
1. Most pass through undeflected
2. Some deflected at small angles
3. Very few (~1 in 8000) reflected back

**Conclusions**:
- Atom mostly empty space
- Positive charge concentrated in tiny nucleus
- **Size**: Nucleus ~ 10⁻¹⁵ m, Atom ~ 10⁻¹⁰ m
- Nucleus ~10⁵ times smaller than atom

**Impact parameter (b)**: Distance of closest approach
**Distance of closest approach**: r_min = (2kZe²)/(mv²)

## Bohr's Model (1913)

**Postulates**:

**1. Stationary orbits**: Electrons in certain orbits don't radiate
**Quantization**: mvr = nh/(2π) where n = 1,2,3...
- n: Principal quantum number

**2. Energy radiation**: Only when electron jumps between orbits
**E = hν = E_i - E_f**

**Results for Hydrogen**:

**Radius**: **r_n = n²a₀**
- a₀ = 0.53 Å (Bohr radius, n=1)

**Velocity**: **v_n = (2.2 × 10⁶)/n** m/s

**Energy**: **E_n = -13.6/n²** eV
- **Negative**: Electron bound to nucleus
- **E₁ = -13.6 eV** (ground state)
- **E_∞ = 0** (ionization)

**Ionization energy**: 13.6 eV (energy to remove electron from ground state)

## Hydrogen Spectrum
**Emission**: Electron jumps to lower orbit → photon
**Absorption**: Photon absorbed → electron jumps to higher orbit

**Frequency**: **ν = (E_i - E_f)/h**
**Wavelength**: **1/λ = R(1/n_f² - 1/n_i²)**
- R = 1.097 × 10⁷ m⁻¹ (Rydberg constant)

**Spectral Series**:

**1. Lyman** (UV): n_f = 1, n_i = 2,3,4...
**2. Balmer** (Visible): n_f = 2, n_i = 3,4,5...
**3. Paschen** (IR): n_f = 3, n_i = 4,5,6...
**4. Brackett** (IR): n_f = 4, n_i = 5,6,7...
**5. Pfund** (IR): n_f = 5, n_i = 6,7,8...

**Line limit**: n_i → ∞
**Lyman limit**: λ = 91.2 nm
**Balmer limit**: λ = 364.6 nm

## de Broglie's Explanation
**Electron as standing wave**: 2πr = nλ
**λ = h/(mv)**
**Combining**: mvr = nh/(2π)
- Same as Bohr's quantization condition
- Explains why only certain orbits allowed

## Energy Levels
**Ground state** (n=1): E = -13.6 eV (most stable)
**Excited states** (n>1): Higher energy, less stable
**Ionization** (n=∞): E = 0

**Excitation**: Electron absorbs energy, jumps to higher level
**De-excitation**: Electron emits photon, drops to lower level

**Number of spectral lines**: n(n-1)/2 (for n levels)

## Limitations of Bohr Model
1. Works only for hydrogen-like atoms (one electron)
2. Doesn't explain:
   - Fine structure of spectral lines
   - Intensities of spectral lines
   - Zeeman effect (splitting in magnetic field)
   - Stark effect (splitting in electric field)
3. Incompatible with uncertainty principle
4. Treats electron as particle (no wave nature)

**Solution**: **Quantum mechanics** (Schrödinger equation)
- Orbitals instead of orbits
- Probability distributions
- Four quantum numbers

## Summary
1. Rutherford scattering showed nucleus is tiny (~10⁻¹⁵ m) and dense; atom mostly empty
2. Bohr model: mvr = nh/(2π); radius r_n = n²a₀; energy E_n = -13.6/n² eV
3. Hydrogen spectrum from transitions: 1/λ = R(1/n_f² - 1/n_i²)
4. Spectral series: Lyman (UV, n_f=1), Balmer (visible, n_f=2), Paschen (IR, n_f=3)
5. de Broglie explained quantization: 2πr = nλ where λ = h/(mv)
6. Bohr model limitations led to quantum mechanics with probability-based orbitals
`,
  }).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: 'Atoms',
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  console.log('✓ Seeded Physics Class 12 Chapters 10-12');
}

seedPhysicsClass12Modern().catch(console.error);
