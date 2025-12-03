import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedChemistryClass12Part1() {
  console.log('Seeding Chemistry Class 12 Chapters 1-4...');

  await db.insert(chapterContent).values([
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 1,
      chapterTitle: 'The Solid State',
      introduction: `Solids have definite shape and volume with particles arranged in ordered patterns. This chapter explores classification of solids as crystalline and amorphous, crystal lattices and unit cells, types of crystalline solids (ionic, covalent, molecular, metallic), packing efficiency in close-packed structures, defects in crystals affecting properties, and magnetic and electrical properties. Understanding solid state chemistry is essential for NEET as it applies to bone structure, drug formulations, and biomineralization.`,
      detailedNotes: `# The Solid State
## Classification: **Crystalline** (ordered, sharp melting point, anisotropic) vs **Amorphous** (random, softens over range, isotropic)
## Crystal Lattice: 3D arrangement of points; **Unit cell**: Smallest repeating unit
**7 crystal systems**: Cubic, tetragonal, orthorhombic, monoclinic, triclinic, hexagonal, rhombohedral
**14 Bravais lattices**: Primitive (P), body-centered (I), face-centered (F), base-centered (C)
## Cubic Unit Cells:
**Simple cubic** (sc): Atoms at corners, Z=1, 52.4% packing
**Body-centered cubic** (bcc): Corners + center, Z=2, 68% packing
**Face-centered cubic** (fcc): Corners + face centers, Z=4, 74% packing (most efficient)
**Close packing**: hcp and ccp (fcc) both 74% efficient; **Tetrahedral voids** 2n, **Octahedral voids** n
## Types of Solids:
**1. Ionic**: Strong electrostatic (NaCl, CsCl); high MP, hard, brittle, conduct when molten
**2. Covalent/Network**: Covalent bonds throughout (diamond, SiO₂); very hard, high MP, poor conductor
**3. Molecular**: Weak intermolecular forces (ice, I₂); low MP, soft
**4. Metallic**: Delocalized electrons; malleable, ductile, lustrous, conduct electricity
## Defects:
**Point defects**: **Schottky** (cation-anion pair missing, density↓), **Frenkel** (ion moves to interstitial, no density change)
**Interstitial**: Extra atom in void
**F-center**: Anion vacancy with trapped electron (color centers)
## Properties: **Ferromagnetic** (Fe, Co, Ni: permanent magnetization), **Paramagnetic** (unpaired e⁻, weak attraction), **Diamagnetic** (no unpaired, weak repulsion)
**n-type semiconductor**: Excess electrons; **p-type**: Electron deficiency (holes)`,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 2,
      chapterTitle: 'Solutions',
      introduction: `Solutions are homogeneous mixtures of solute and solvent with composition-dependent properties. This chapter explores methods of expressing concentration (molarity, molality, mole fraction), Raoult's law relating vapor pressure to composition, colligative properties depending only on particle number (vapor pressure lowering, boiling point elevation, freezing point depression, osmotic pressure), ideal and non-ideal solutions, and applications in determining molar mass. Understanding solutions is crucial for NEET as biological fluids, IV solutions, and drug formulations are all aqueous solutions with specific concentrations.`,
      detailedNotes: `# Solutions
## Concentration:
**Molarity** (M) = moles/L solution; **Molality** (m) = moles/kg solvent (T-independent)
**Mole fraction**: X_A = n_A/(n_A + n_B); **Mass %** = (mass solute/mass solution) × 100
**ppm** = (mass solute/mass solution) × 10⁶
## Solubility: **Henry's law**: P = K_H × X (gas solubility ∝ pressure)
**Temperature**: Usually solubility↑ with T for solids; ↓ for gases
## Raoult's Law:
**P_A = P_A⁰ × X_A** (vapor pressure of component ∝ mole fraction)
**Total pressure**: P = P_A + P_B = P_A⁰X_A + P_B⁰X_B
**Ideal solution**: Obeys Raoult's law (benzene-toluene); ΔH_mix = 0, ΔV_mix = 0
**Non-ideal**: **+ve deviation** (A-B weaker than A-A, B-B): P > Raoult; ΔH_mix > 0 (ethanol-acetone)
**-ve deviation** (A-B stronger): P < Raoult; ΔH_mix < 0 (chloroform-acetone)
## Colligative Properties (depend on # particles, not nature):
**1. Vapor pressure lowering**: ΔP = P⁰ × X_solute = (P⁰ × n)/(n + N)
**2. Boiling point elevation**: ΔT_b = K_b × m; K_b = molal elevation constant (0.52 K kg/mol for water)
**3. Freezing point depression**: ΔT_f = K_f × m; K_f = molal depression constant (1.86 K kg/mol for water)
**4. Osmotic pressure**: π = CRT = (n/V)RT; **Isotonic**: same π; **Hypertonic**: higher π (cells shrink); **Hypotonic**: lower π (cells swell)
**van't Hoff factor** (i): Ratio of actual to expected particles
i = 1 (non-electrolyte); i > 1 (electrolyte); i = 2 (NaCl complete dissociation)
**Modified**: ΔT_f = i × K_f × m, π = iCRT
**Abnormal molar mass**: Association (i < 1, M_obs > M_calc), Dissociation (i > 1, M_obs < M_calc)`,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 3,
      chapterTitle: 'Electrochemistry',
      introduction: `Electrochemistry studies interconversion of chemical and electrical energy through redox reactions. This chapter explores conductance in electrolytic solutions, electrochemical cells converting chemical energy to electricity (galvanic cells), electrode potentials and EMF, Nernst equation relating potential to concentration, commercial cells (dry cell, lead storage battery, fuel cells), electrolysis and Faraday's laws for quantitative electrolysis, and corrosion prevention. Understanding electrochemistry is vital for NEET as nerve impulses, ECG, pacemakers, and defibrillators all involve electrochemical processes.`,
      detailedNotes: `# Electrochemistry
## Conductance:
**Conductance** (G) = 1/R; Unit: Siemens (S) = Ω⁻¹
**Conductivity** (κ) = G × (l/A); Unit: S/m or S/cm; **Molar conductivity**: Λ_m = κ/C (C in mol/L)
**Λ_m** increases with dilution; **Strong electrolyte**: Λ_m → Λ_m⁰ (limiting value); **Weak**: Sharp increase on dilution
**Kohlrausch's law**: Λ_m⁰ = λ_+⁰ + λ_-⁰ (sum of ionic conductances)
**Application**: Calculate Λ_m⁰ for weak electrolyte from strong electrolytes
## Electrochemical Cells:
**Galvanic** (spontaneous, ΔG < 0, E⁰ > 0): Chemical → Electrical (battery)
**Electrolytic** (non-spontaneous, ΔG > 0, E⁰ < 0): Electrical → Chemical (electrolysis)
**Daniell cell**: Zn|Zn²⁺||Cu²⁺|Cu; E⁰_cell = 1.1 V
**Anode** (oxidation, -ve in galvanic), **Cathode** (reduction, +ve)
**Salt bridge**: Maintains electrical neutrality, completes circuit
## EMF and Electrode Potential:
**E⁰_cell = E⁰_cathode - E⁰_anode** (reduction potentials)
**Standard hydrogen electrode** (SHE): 2H⁺ + 2e⁻ → H₂; E⁰ = 0 V (reference)
**Higher E⁰**: Better oxidizing agent (gains e⁻); **Lower E⁰**: Better reducing agent (loses e⁻)
**Nernst equation**: E_cell = E⁰_cell - (0.059/n) log Q (at 25°C)
**At equilibrium**: E_cell = 0, E⁰ = (0.059/n) log K
**ΔG⁰ = -nFE⁰** (F = 96500 C/mol)
## Commercial Cells:
**1. Dry cell** (Leclanché): Zn anode, MnO₂/C cathode, NH₄Cl electrolyte; 1.5 V, non-rechargeable
**2. Lead storage battery**: Pb anode, PbO₂ cathode, H₂SO₄ electrolyte; 2 V/cell, rechargeable
Discharge: Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄ + 2H₂O
**3. Fuel cell** (H₂-O₂): 2H₂ + O₂ → 2H₂O; 1.23 V, efficient (~70%), continuous operation
## Electrolysis:
**Faraday's laws**:
**I**: Mass deposited ∝ charge (m ∝ Q = It)
**II**: m ∝ E (equivalent weight); **m = (E × I × t) / F** or **m = (M × I × t) / (n × F)**
**Applications**: Electroplating, extraction of Al/Na, electrolytic refining
## Corrosion:
**Rusting**: Fe oxidized to Fe²⁺ (anodic area), O₂ reduced (cathodic); Fe(OH)₃ forms rust
**Prevention**: Painting, galvanizing (Zn coating), sacrificial anode, alloying`,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 4,
      chapterTitle: 'Chemical Kinetics',
      introduction: `Chemical kinetics studies reaction rates and mechanisms, explaining how fast reactants convert to products. This chapter explores rate of reaction and factors affecting it (concentration, temperature, catalyst), rate laws relating rate to concentration, order and molecularity of reactions, integrated rate equations for zero, first, and second order reactions with half-life calculations, collision theory and activation energy, and catalysis accelerating reactions. Understanding kinetics is crucial for NEET as enzyme kinetics, drug metabolism rates, and physiological reaction rates all follow these principles.`,
      detailedNotes: `# Chemical Kinetics
## Rate of Reaction:
**Rate = -(1/a)(Δ[A]/Δt) = -(1/b)(Δ[B]/Δt) = (1/c)(Δ[C]/Δt)** for aA + bB → cC
**Units**: mol L⁻¹ s⁻¹ or M/s
**Average rate**: Over time interval; **Instantaneous rate**: At specific time (slope of tangent)
## Factors Affecting Rate:
1. **Concentration**: Rate ↑ (more collisions)
2. **Temperature**: Rate ↑ (more energetic collisions); Rule: Rate doubles per 10°C rise
3. **Catalyst**: Rate ↑ (lowers E_a)
4. **Surface area**: Rate ↑ for heterogeneous reactions
## Rate Law: **Rate = k[A]^x[B]^y**
- k: Rate constant (depends on T, not concentration)
- x, y: Order w.r.t. A, B (from experiment, NOT stoichiometry)
**Overall order** = x + y; Can be 0, 1, 2, fractional, negative
**Units of k**: [M^(1-n) s⁻¹] where n = overall order
**Order 0**: k in M/s; **Order 1**: s⁻¹; **Order 2**: M⁻¹ s⁻¹
## Molecularity: Number of molecules in elementary step (1, 2, 3); Always integer, always positive
**Order ≠ Molecularity** (order from experiment, molecularity from mechanism)
## Integrated Rate Equations:
**Zero order**: [A] = [A]₀ - kt; **t₁/₂ = [A]₀/(2k)**; Linear: [A] vs t
**First order**: ln[A] = ln[A]₀ - kt; **t₁/₂ = 0.693/k** (independent of [A]₀); Linear: ln[A] vs t
**Second order**: 1/[A] = 1/[A]₀ + kt; **t₁/₂ = 1/(k[A]₀)**; Linear: 1/[A] vs t
## Pseudo First Order: One reactant in large excess (CH₃COOC₂H₅ + H₂O → CH₃COOH + C₂H₅OH)
Appears first order w.r.t. ester though actually second order
## Temperature Dependence:
**Arrhenius equation**: **k = Ae^(-E_a/RT)**
**ln k = ln A - E_a/(RT)**; Plot ln k vs 1/T gives slope = -E_a/R
**Two temperatures**: **log(k₂/k₁) = (E_a/2.303R) × [(T₂-T₁)/(T₁T₂)]**
E_a: Activation energy (minimum energy for reaction); A: Frequency factor
## Collision Theory:
Rate ∝ collision frequency × fraction with E ≥ E_a × steric factor
Not all collisions effective: Need proper orientation + sufficient energy
## Catalysis:
**Catalyst**: Speeds up reaction without being consumed; Lowers E_a (alternate pathway)
**Homogeneous**: Same phase (esterification with H₂SO₄)
**Heterogeneous**: Different phase (Haber process with Fe); **Adsorption** on surface
**Enzyme**: Biological catalyst; Highly specific, work at body T, pH; **Lock-and-key** model
**Positive**: Increases rate; **Negative**: Decreases rate (inhibitor)`,
    }
  ]).onConflictDoUpdate({
    target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
    set: {
      chapterTitle: sql`EXCLUDED.chapter_title`,
      introduction: sql`EXCLUDED.introduction`,
      detailedNotes: sql`EXCLUDED.detailed_notes`,
      updatedAt: sql`CURRENT_TIMESTAMP`
    }
  });

  console.log('✓ Seeded Chemistry Class 12 Chapters 1-4');
}

seedChemistryClass12Part1().catch(console.error);
