import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedChemistryClass12Part3() {
  console.log('Seeding Chemistry Class 12 Chapters 9-12...');

  await db.insert(chapterContent).values([
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 9,
      chapterTitle: 'Coordination Compounds',
      introduction: `Coordination compounds contain central metal atoms bonded to ligands through coordinate bonds. This chapter explores Werner's theory explaining coordination, nomenclature of coordination compounds, isomerism including structural and stereoisomerism, bonding theories (VBT, CFT) explaining geometry and magnetic properties, stability of complexes measured by formation constants, and applications including catalysis and biological systems. Understanding coordination chemistry is crucial for NEET as hemoglobin, chlorophyll, vitamin B12, and many enzymes are coordination compounds essential for life.`,
      detailedNotes: `# Coordination Compounds
## Werner's Theory (1893): **Central metal** + **ligands** (donor atoms) → **Coordination sphere**
**Primary valence**: Oxidation state (ionizable); **Secondary valence**: Coordination number (non-ionizable)
**Example**: [Co(NH₃)₆]Cl₃ → Co³⁺ (primary = 3), 6 ligands (secondary = 6)
## Components:
**Central metal**: Transition metal (accepts lone pairs)
**Ligands**: Lewis bases (donate lone pairs)
**Monodentate**: One donor atom (Cl⁻, NH₃, H₂O)
**Bidentate**: Two donor atoms (en = ethylenediamine, ox = oxalate)
**Polydentate**: Multiple (EDTA⁴⁻ hexadentate)
**Ambidentate**: Can bind through different atoms (NO₂⁻/ONO⁻, SCN⁻/NCS⁻)
**Coordination number**: Number of donor atoms; Common: 4 (tetrahedral, square planar), 6 (octahedral)
**Charge**: [Metal + ligands]; Example: [Cr(NH₃)₆]³⁺ has charge +3; [Fe(CN)₆]⁴⁻ has charge -4
## Nomenclature:
**Cation first, anion second**; Ligands alphabetical (ignoring prefixes)
**Prefixes**: di-, tri-, tetra- (simple); bis-, tris-, tetrakis- (complex ligands like en)
**Ligand names**: Neutral (name as is: aqua=H₂O, ammine=NH₃, carbonyl=CO); Anionic (add -o: chloro, cyano, oxalato)
**Metal**: English (if cation), Latin ending -ate (if anion): ferrate (Fe), cuprate (Cu), argentate (Ag)
**Oxidation state**: Roman numerals after metal
**Examples**: [Co(NH₃)₆]Cl₃: Hexaamminecobalt(III) chloride; K₄[Fe(CN)₆]: Potassium hexacyanoferrate(II)
## Isomerism:
**Structural**:
**1. Ionization**: Different ions in solution ([Co(NH₃)₅Br]SO₄ vs [Co(NH₃)₅SO₄]Br)
**2. Linkage**: Ambidentate ligand bonds differently ([Co(NH₃)₅NO₂]²⁺ vs [Co(NH₃)₅ONO]²⁺)
**3. Coordination**: Ligands exchange between cation/anion ([Co(NH₃)₆][Cr(CN)₆] vs [Cr(NH₃)₆][Co(CN)₆])
**4. Hydrate**: Water inside/outside sphere ([Cr(H₂O)₆]Cl₃ vs [Cr(H₂O)₅Cl]Cl₂·H₂O)
**Stereoisomerism**:
**1. Geometrical**: **Cis** (same side), **Trans** (opposite); Square planar (Ma₂b₂, Ma₂bc), Octahedral (Ma₄b₂, Ma₃b₃)
**2. Optical**: Non-superimposable mirror images (d and l forms); Octahedral with bidentate (cis-[Co(en)₂Cl₂]⁺)
## Bonding - Valence Bond Theory:
**Hybridization** determines geometry:
**sp³**: Tetrahedral (4 ligands); **dsp²**: Square planar (4); **sp³d²**: Octahedral (6)
**Inner orbital** (d²sp³): Strong field ligands (CN⁻), low spin, paramagnetic less
**Outer orbital** (sp³d²): Weak field ligands (H₂O, F⁻), high spin, more paramagnetic
**Limitations**: Can't explain color, quantitative magnetic properties
## Crystal Field Theory:
**d-orbital splitting** in field:
**Octahedral**: t₂g (lower, dxy, dyz, dzx) and eg (higher, dz², dx²-y²); Δ₀ = splitting energy
**Tetrahedral**: Inverted, smaller Δt ≈ (4/9)Δ₀
**Square planar**: Large splitting
**Strong field**: Δ > Pairing energy (P) → **Low spin** (max pairing); **Weak field**: Δ < P → **High spin** (max unpaired)
**Spectrochemical series** (increasing Δ): I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < CN⁻ < CO
**CFSE** (Crystal Field Stabilization Energy): Energy lowering due to splitting
**Color**: d-d transitions; [Ti(H₂O)₆]³⁺ purple (d¹, absorbs green ~500 nm)
## Stability:
**Formation constant** (Kf or β): Higher Kf → more stable
**Chelate effect**: Polydentate ligands form more stable complexes (entropy favored)
**Example**: [Cu(en)₂]²⁺ more stable than [Cu(NH₃)₄]²⁺
## Applications:
**Analytical**: EDTA titrations (hardness of water)
**Metallurgy**: [Ag(CN)₂]⁻, [Au(CN)₂]⁻ in extraction
**Biological**: Hemoglobin (Fe²⁺), Chlorophyll (Mg²⁺), Vitamin B₁₂ (Co³⁺)
**Medicine**: Cisplatin (anticancer), Desferrioxamine (iron chelator)`,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 10,
      chapterTitle: 'Haloalkanes and Haloarenes',
      introduction: `Halogenated hydrocarbons contain carbon-halogen bonds with unique reactivity. This chapter explores nomenclature and classification of haloalkanes and haloarenes, methods of preparation including halogenation and halogen exchange, chemical properties emphasizing nucleophilic substitution (SN1, SN2) and elimination reactions, polyhalogen compounds like chloroform and iodoform, and environmental effects of chlorofluorocarbons. Understanding haloalkanes is important for NEET as many anesthetics, disinfectants, and pharmaceutical intermediates are halogenated compounds.`,
      detailedNotes: `# Haloalkanes and Haloarenes
## Classification:
**Haloalkane**: Halogen on sp³ C (aliphatic); **Haloarene**: Halogen on sp² C (aromatic benzene ring)
**By number of halogens**: Mono (CH₃Cl), Di (CH₂Cl₂), Tri (CHCl₃), Tetra (CCl₄)
**By C type**: **Primary** (1°): X on C with 1 C neighbor; **Secondary** (2°): 2 C neighbors; **Tertiary** (3°): 3 C neighbors
## Nomenclature: **Halo-** prefix + parent hydrocarbon; Alphabetical if multiple substituents
## Preparation of Haloalkanes:
**1. From alcohols**: ROH + HX → RX + H₂O (ZnCl₂ catalyst for HCl, Lucas reagent)
**Reactivity**: 3° > 2° > 1° (carbocation stability)
**2. Halogenation**: R-H + X₂ → R-X + HX (UV light, free radical)
**3. Addition to alkenes**: CH₂=CH₂ + HBr → CH₃CH₂Br (**Markovnikov**: H to more H-rich C)
**Anti-Markovnikov** (peroxide effect): CH₂=CH₂ + HBr (peroxide) → CH₂BrCH₃
**4. Hunsdiecker**: RCOOAg + Br₂ → RBr + CO₂ + AgBr
## Preparation of Haloarenes:
**1. Direct halogenation**: C₆H₆ + Cl₂ (FeCl₃) → C₆H₅Cl + HCl (electrophilic substitution)
**2. Sandmeyer**: C₆H₅N₂⁺Cl⁻ + CuCl → C₆H₅Cl + N₂
## Properties of Haloalkanes:
**Physical**: BP ↑ with size/mass; Insoluble in water (non-polar); Denser than water
**SN Reactions** (Nucleophilic Substitution):
**SN2**: Bimolecular, one-step, inversion (Walden), 1° > 2° > 3°
**SN1**: Unimolecular, two-step (carbocation), racemization, 3° > 2° > 1°
**Reactions**:
R-X + OH⁻ → R-OH (alcohol); R-X + OR'⁻ → R-OR' (ether, Williamson)
R-X + CN⁻ → R-CN (nitrile, +1 C); R-X + NH₃ → R-NH₂ (amine)
R-X + AgCN → R-NC (isocyanide); R-X + Mg (dry ether) → R-MgX (Grignard)
**Elimination (E2)**: R-CH₂-CH₂X + KOH (alc) → R-CH=CH₂ + KX + H₂O (**Saytzeff**: More substituted alkene major)
**Reduction**: R-X + Zn + HCl → R-H
## Properties of Haloarenes:
**C-X bond** stronger (sp² hybrid, resonance); **Less reactive** than haloalkanes to SN
**Electrophilic substitution**: **o/p-directing, deactivating** (electron-withdrawing by induction, donating by resonance)
C₆H₅Cl + Cl₂ (FeCl₃) → o-/p-dichlorobenzene
**Fittig**: C₆H₅Cl + Na (dry ether) → C₆H₅-C₆H₅ (biphenyl)
**Wurtz-Fittig**: C₆H₅Cl + R-Cl + Na → C₆H₅-R
## Polyhalogen Compounds:
**CHCl₃** (Chloroform): Sweet smell, anesthetic (outdated), solvent; **Preparation**: CH₃COCH₃ + 3Cl₂ + Ca(OH)₂ → CHCl₃ (haloform reaction)
**CCl₄** (Carbon tetrachloride): Fire extinguisher, solvent, CFCs preparation; **Toxic**, damages liver
**CHI₃** (Iodoform): Yellow ppt, antiseptic; **Test**: R-CO-CH₃ or R-CH(OH)-CH₃ + I₂ + NaOH → CHI₃ (yellow)
**DDT**: (ClC₆H₄)₂CHCCl₃; Insecticide, banned (non-biodegradable, bioaccumulation)
**CFCs**: CCl₂F₂ (Freon-12), refrigerants, aerosols; **Deplete ozone**: CCl₂F₂ → Cl· → Cl· + O₃ → ClO· + O₂ (chain)
**Montreal Protocol** (1987): Phase out CFCs`,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 11,
      chapterTitle: 'Alcohols, Phenols and Ethers',
      introduction: `Alcohols, phenols, and ethers are oxygen-containing organic compounds with diverse properties and uses. This chapter explores nomenclature and classification, preparation methods including hydration of alkenes and Williamson synthesis, chemical properties of alcohols (oxidation, dehydration, esterification), acidity of phenols and electrophilic substitution, properties of ethers, and commercially important compounds. Understanding these compounds is essential for NEET as alcohols and ethers are used in pharmaceuticals, antiseptics, and as metabolic intermediates.`,
      detailedNotes: `# Alcohols, Phenols and Ethers
## Alcohols (R-OH):
**Classification**: **1°** (RCH₂OH), **2°** (R₂CHOH), **3°** (R₃COH)
**Nomenclature**: -ol suffix; Number C with OH
**Preparation**:
**1. Hydration**: CH₂=CH₂ + H₂O (H⁺) → CH₃CH₂OH (Markovnikov)
**2. From haloalkanes**: R-X + OH⁻ → R-OH + X⁻
**3. Reduction**: RCHO → RCH₂OH (1°); R₂CO → R₂CHOH (2°); RCOOR' + LiAlH₄ → RCH₂OH + R'OH
**4. Grignard**: R-MgX + H₂C=O → RCH₂OH (1°); R-MgX + RCHO → R₂CHOH (2°); R-MgX + R₂CO → R₃COH (3°)
**Properties**:
**Physical**: H-bonding → high BP; Soluble in water (small); **Acidity**: R-OH weaker than H₂O (R is electron-donating)
**Reactions**:
**Oxidation**: **1°** → RCHO (aldehyde) → RCOOH (acid); **2°** → R₂CO (ketone); **3°** resistant
**Dehydration**: **180°C/H₂SO₄** → alkene (Saytzeff); **140°C** → ether (intermolecular)
**Esterification**: R-OH + R'COOH (H⁺) → R'COOR + H₂O
**HX reaction**: Reactivity 3° > 2° > 1° (Lucas test); ZnCl₂/conc. HCl: 3° instant cloudiness
## Phenols (Ar-OH):
**Acidic** (more than alcohol, less than carboxylic acid); **Resonance stabilizes** phenoxide (C₆H₅O⁻)
**Preparation**:
**1. Dow process**: C₆H₅Cl + NaOH (623 K, 300 atm) → C₆H₅ONa → C₆H₅OH
**2. From diazonium**: C₆H₅N₂⁺Cl⁻ + H₂O (warm) → C₆H₅OH + N₂ + HCl
**3. Cumene process**: C₆H₅CH(CH₃)₂ + O₂ → C₆H₅OH + CH₃COCH₃
**Properties**:
**Acidity**: C₆H₅OH + NaOH → C₆H₅ONa (sodium phenoxide); Liberates CO₂ from NaHCO₃? **No** (weaker than H₂CO₃)
**Electrophilic substitution**: **o/p-directing, activating** (OH donates electrons by resonance)
**Nitration**: C₆H₅OH + 3HNO₃ → 2,4,6-trinitrophenol (picric acid, explosive)
**Bromination**: C₆H₅OH + 3Br₂ → 2,4,6-tribromophenol (white ppt, phenol test)
**Friedel-Crafts**: Fails (phenol deactivates catalyst)
**Coupling**: C₆H₅OH + C₆H₅N₂⁺Cl⁻ (0-5°C) → C₆H₅-N=N-C₆H₄-OH (orange dye)
**FeCl₃ test**: Violet complex (identification)
## Ethers (R-O-R'):
**Nomenclature**: Alkoxy alkane or alkyl alkyl ether
**Preparation**:
**1. Williamson**: R-X + R'O⁻Na⁺ → R-O-R' (best for unsymmetrical; 1° halide preferred)
**2. Dehydration**: 2R-OH (140°C, H₂SO₄) → R-O-R
**Properties**:
**Physical**: Volatile, ether-like smell; Slightly polar; BP < alcohol (no H-bonding)
**Cleavage**: R-O-R' + HX (heat) → R-X + R'-OH (smaller group becomes halide)
**Order**: HI > HBr > HCl
## Important Compounds:
**Methanol**: Wood spirit, toxic (blindness); **Preparation**: CO + 2H₂ (200-300°C, ZnO-Cr₂O₃) → CH₃OH
**Ethanol**: Drinking alcohol; Fermentation, oxidation; **Absolute**: 100% (azeotrope with water at 95.6%)
**Denatured**: Ethanol + methanol/pyridine (unfit to drink)
**Glycerol**: Trihydric, sweet, hygroscopic; Nitroglycerin (explosive)
**Phenol**: Carbolic acid, antiseptic (Lister), Bakelite, dyes`,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 12,
      chapterTitle: 'Aldehydes, Ketones and Carboxylic Acids',
      introduction: `Carbonyl compounds contain the C=O functional group central to organic chemistry. This chapter explores nomenclature and structure of aldehydes (RCHO) and ketones (R₂CO), preparation methods including oxidation of alcohols, properties emphasizing nucleophilic addition to carbonyl, important reactions (aldol condensation, Cannizzaro, haloform), carboxylic acids (RCOOH) with their acidity, preparation and reactions, and derivatives. Understanding carbonyl chemistry is crucial for NEET as aldehydes and ketones are metabolic intermediates, and carboxylic acids form the basis of fatty acids, amino acids, and drug molecules.`,
      detailedNotes: `# Aldehydes, Ketones and Carboxylic Acids
## Nomenclature: **Aldehyde**: -al suffix (methanal, ethanal); **Ketone**: -one (propanone); **Carboxylic acid**: -oic acid
## Preparation:
**Aldehydes**:
**1. Oxidation of 1° alcohol**: RCH₂OH [O] → RCHO (PCC, mild)
**2. Rosenmund**: RCOCl + H₂ (Pd-BaSO₄) → RCHO + HCl (poisoned catalyst)
**3. Etard**: C₆H₅CH₃ + CrO₂Cl₂ → C₆H₅CHO (toluene → benzaldehyde)
**Ketones**:
**1. Oxidation of 2° alcohol**: R₂CHOH [O] → R₂CO
**2. From nitriles**: R-CN + R'-MgX → R-CO-R' (+ H₃O⁺)
**3. Friedel-Crafts acylation**: C₆H₆ + RCOCl (AlCl₃) → C₆H₅COR
## Properties:
**Physical**: Polar C=O; H-bonding with water (small); Lower BP than alcohols
**Nucleophilic addition**: C=O (electrophilic C, nucleophilic O) + Nu⁻ → C-OH (tetrahedral)
**Reactivity**: Aldehyde > Ketone (less steric hindrance, more electrophilic C)
**Reactions**:
**1. HCN**: RCHO + HCN → RCH(OH)CN (cyanohydrin)
**2. NaHSO₃**: RCHO + NaHSO₃ → RCH(OH)SO₃Na (white crystalline, purification)
**3. Grignard**: RCHO + R'MgX → RCH(OH)R' (2° alcohol); R₂CO + R'MgX → R₂C(OH)R' (3°)
**4. NH₃ derivatives**: RCHO + NH₂OH → RCH=NOH (oxime); RCHO + NH₂-NH-C₆H₅ → RCH=N-NH-C₆H₅ (phenylhydrazone)
**5. Reduction**: LiAlH₄/NaBH₄ → alcohol; **Clemmensen** (Zn-Hg/HCl) → RCH₃; **Wolff-Kishner** (NH₂NH₂, OH⁻, Δ) → RCH₃
**Oxidation**:
**Aldehyde**: Easily oxidized (RCHO → RCOOH); **Tollens' test** (Ag⁺ → Ag mirror); **Fehling's** (Cu²⁺ → Cu₂O red ppt)
**Ketone**: Resistant (no H on carbonyl C); **Iodoform test** (R-CO-CH₃ + I₂/OH⁻ → CHI₃ yellow)
**α-H reactions**:
**Aldol condensation**: 2CH₃CHO (dil. NaOH) → CH₃CH(OH)CH₂CHO (aldol) → CH₃CH=CHCHO (crotonaldehyde, -H₂O)
**Mechanism**: Enolate (α-H removal) attacks another carbonyl
**Crossed aldol**: One with no α-H (benzaldehyde) + one with α-H
**Cannizzaro**: HCHO (no α-H) + conc. NaOH → CH₃OH + HCOONa (disproportionation)
**Haloform**: CH₃COR + 3X₂ + 4OH⁻ → CHX₃ + RCOO⁻ (X = Cl, Br, I)
## Carboxylic Acids (R-COOH):
**Acidic**: Releases H⁺; pKa ~4-5; **Electron-withdrawing** groups ↑ acidity (stabilize COO⁻)
**Order**: Cl₃CCOOH > Cl₂CHCOOH > ClCH₂COOH > CH₃COOH
**Aromatic**: C₆H₅COOH > CH₃COOH (resonance); **p-NO₂** (electron-withdrawing) ↑ acidity; **p-CH₃** ↓ acidity
**Preparation**:
**1. Oxidation**: 1° alcohol/aldehyde → RCOOH (KMnO₄/K₂Cr₂O₇)
**2. Nitrile hydrolysis**: R-CN + H₂O (H⁺/OH⁻) → RCOOH + NH₃
**3. Grignard**: R-MgX + CO₂ → RCOOMgX → RCOOH
**Reactions**:
**Salt formation**: RCOOH + NaOH → RCOONa + H₂O; RCOOH + NaHCO₃ → RCOONa + H₂O + CO₂ (effervescence test)
**Decarboxylation**: RCOONa + NaOH (CaO, Δ) → RH + Na₂CO₃ (sodalime)
**Reduction**: RCOOH + LiAlH₄ → RCH₂OH (1° alcohol)
**Hell-Volhard-Zelinsky**: RCOOH + Cl₂/Br₂ (P) → R-CHCl-COOH (α-halogenation)
**Esterification**: RCOOH + R'OH (H⁺) ⇌ RCOOR' + H₂O (reversible)
**Acid chloride**: RCOOH + PCl₅ → RCOCl + POCl₃ + HCl; Or SOCl₂ (better, byproducts gas)
**Amide**: RCOCl + NH₃ → RCONH₂ + HCl
## Important Compounds:
**Formaldehyde** (HCHO): 40% solution = formalin (preservative); **Bakelite** (phenol-formaldehyde resin)
**Acetaldehyde** (CH₃CHO): Manufacture of acetic acid, perfumes
**Acetone** (CH₃COCH₃): Solvent, nail polish remover
**Acetic acid** (CH₃COOH): Vinegar (5-8%); **Glacial** (100%); Manufacture from methanol (Monsanto process)`,
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

  console.log('✓ Seeded Chemistry Class 12 Chapters 9-12');
}

seedChemistryClass12Part3().catch(console.error);
