import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedChemistryClass12Final() {
  console.log('Seeding Chemistry Class 12 Chapters 13-16 (FINAL CHEMISTRY!)...');

  await db.insert(chapterContent).values([
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 13,
      chapterTitle: 'Amines',
      introduction: `Amines are nitrogen-containing organic compounds derived from ammonia with diverse biological and industrial importance. This chapter explores nomenclature and classification of primary, secondary, and tertiary amines, preparation methods including reduction of nitro compounds and ammonolysis, chemical properties emphasizing basicity and comparison with ammonia, electrophilic substitution in aromatic amines, diazonium salts and their coupling reactions forming azo dyes, and distinction between aliphatic and aromatic amines. Understanding amines is crucial for NEET as amino acids, neurotransmitters, alkaloids, and many drugs are amine derivatives.`,
      detailedNotes: `# Amines
## Classification: **1°** (RNH₂), **2°** (R₂NH), **3°** (R₃N)
**Aliphatic** (R = alkyl), **Aromatic** (R = aryl, e.g., C₆H₅NH₂ = aniline)
**Nomenclature**: Alkyl + amine; Or -amine suffix (methanamine)
## Preparation:
**1. Reduction of nitro compounds**: R-NO₂ + 6[H] (Sn/HCl or Fe/HCl) → R-NH₂ + 2H₂O
**2. Ammonolysis**: R-X + NH₃ → R-NH₂ (1°), R₂NH (2°), R₃N (3°), R₄N⁺X⁻ (mixture)
**3. Gabriel phthalimide**: C₆H₄(CO)₂NK + R-X → R-NH₂ (pure 1° amine)
**4. Hoffmann bromamide**: RCONH₂ + Br₂ + 4NaOH → R-NH₂ + Na₂CO₃ (degradation, one C less)
**5. Reduction of nitriles**: R-CN + 4[H] (LiAlH₄) → R-CH₂-NH₂ (adds C)
## Properties:
**Physical**: H-bonding (1°, 2° amines); BP: 1° > 2° > 3° (H-bonding decreases); Small amines soluble
**Basicity**: Lone pair on N accepts H⁺; **R-NH₂ + H₂O ⇌ R-NH₃⁺ + OH⁻**
**Order (aliphatic)**: 2° > 1° > 3° > NH₃ (electron-donating +I vs steric hindrance)
**Aromatic**: C₆H₅NH₂ < NH₃ (resonance delocalizes lone pair → less available)
**p-substituents**: **Electron-donating** (+R: -NH₂, -OH, -OCH₃) ↑ basicity; **Electron-withdrawing** (-NO₂, -CN) ↓ basicity
**Reactions**:
**Alkylation**: R-NH₂ + R'-X → R-NH-R' → R₂N-R' → R₃N⁺R'X⁻ (quaternary salt)
**Acylation**: R-NH₂ + CH₃COCl → R-NH-CO-CH₃ (acetamide) + HCl; Or (CH₃CO)₂O
**Benzoylation**: R-NH₂ + C₆H₅COCl → R-NH-CO-C₆H₅ (benzamide) **Hinsberg test**
**Carbylamine**: 1° amine + CHCl₃ + KOH → R-NC (isocyanide, foul smell) **Test for 1°**
**Nitrous acid**:
**1° aliphatic**: R-NH₂ + HNO₂ → R-OH + N₂ (bubbles)
**1° aromatic**: C₆H₅NH₂ + HNO₂ (0-5°C) → C₆H₅N₂⁺Cl⁻ (benzenediazonium chloride, stable at low T)
**2°**: R₂NH + HNO₂ → R₂N-N=O (N-nitrosoamine, yellow oil)
**3°**: No reaction (aliphatic); C₆H₅NR₂ + HNO₂ → p-nitroso compound
## Aromatic Amines (Aniline):
**Preparation**: C₆H₅NO₂ + 6[H] → C₆H₅NH₂ (Sn/HCl)
**Electrophilic substitution**: **o/p-directing, activating** (NH₂ donates by +R)
**Problem**: Oxidation by HNO₃/H₂SO₄; **Protect**: Acetylation first
**Bromination**: C₆H₅NH₂ + 3Br₂ (water) → 2,4,6-tribromoaniline (white ppt)
**Nitration**: Protect NH₂ → acetylate → nitrate → hydrolyze
**Sulfonation**: C₆H₅NH₂ + H₂SO₄ (heat) → p-aminobenzenesulfonic acid (sulfanilic acid, zwitterion)
## Diazonium Salts (C₆H₅N₂⁺X⁻):
**Preparation**: C₆H₅NH₂ + NaNO₂ + 2HCl (0-5°C) → C₆H₅N₂⁺Cl⁻ + NaCl + 2H₂O
**Unstable** above 5°C (N₂ gas evolves)
**Reactions**:
**Replacement by -X**: **Sandmeyer** (CuX, X = Cl, Br, CN); **Gattermann** (HX/Cu)
**Replacement by -OH**: Warm with water → C₆H₅OH
**Replacement by -H**: H₃PO₂ → C₆H₆ (reduction)
**Replacement by -I**: KI → C₆H₅I
**Replacement by -F**: HBF₄ → C₆H₅F (Balz-Schiemann)
**Coupling**: C₆H₅N₂⁺Cl⁻ + C₆H₅OH (or C₆H₅NH₂) → C₆H₅-N=N-C₆H₄-OH (azo dye, orange/red)
**Uses**: Dyes, indicators, synthesis intermediates
## Distinction Tests:
**Hinsberg**: 1° (soluble in alkali), 2° (insoluble), 3° (no reaction)
**Carbylamine**: 1° only (foul smell)
**Nitrous acid**: 1° (N₂ bubbles or diazonium), 2° (yellow oil), 3° (no reaction)`,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 14,
      chapterTitle: 'Biomolecules',
      introduction: `Biomolecules are organic compounds essential for life, including carbohydrates, proteins, nucleic acids, and vitamins. This chapter explores classification and structure of carbohydrates (monosaccharides, disaccharides, polysaccharides), reducing and non-reducing sugars, amino acids as building blocks of proteins, peptide bond formation, protein structure levels, enzymes as biological catalysts, nucleic acids (DNA, RNA) storing genetic information, and vitamins with their deficiency diseases. Understanding biomolecules is fundamental for NEET as they constitute all living organisms and are central to metabolism, genetics, and nutrition.`,
      detailedNotes: `# Biomolecules
## Carbohydrates: Polyhydroxy aldehydes/ketones or compounds hydrolyzing to them; **General formula**: Cₙ(H₂O)ₙ
**Classification**:
**Monosaccharides**: Cannot hydrolyze (glucose, fructose, ribose)
**Disaccharides**: Hydrolyze to 2 monosaccharides (sucrose, maltose, lactose)
**Polysaccharides**: Hydrolyze to many monosaccharides (starch, cellulose, glycogen)
**Monosaccharides**:
**Glucose** (C₆H₁₂O₆): Aldohexose; **Open chain**: CHO-(CHOH)₄-CH₂OH; **Cyclic**: Pyranose (6-membered ring); **α-glucose** (OH down at C1), **β-glucose** (OH up)
**Tests**: **Tollen's**, **Fehling's**, **Benedict's** (reducing sugar); Forms osazone with phenylhydrazine
**Fructose**: Ketohexose; Furanose (5-membered ring); Sweetest natural sugar
**Ribose** (C₅H₁₀O₅): In RNA; **Deoxyribose**: In DNA (lacks OH at C2)
**Disaccharides**:
**Sucrose** (glucose + fructose): α(1→2)β glycosidic; **Non-reducing** (no free CHO/CO); Inverted by acid/invertase → glucose + fructose
**Maltose** (glucose + glucose): α(1→4); **Reducing** (free C1 on second glucose)
**Lactose** (galactose + glucose): β(1→4); **Reducing**; Milk sugar
**Polysaccharides**:
**Starch**: (C₆H₁₀O₅)ₙ; **Amylose** (15-20%, helical, water-soluble) + **Amylopectin** (80-85%, branched); Storage in plants; **I₂ test** (blue)
**Cellulose**: β(1→4) glucose; Linear, H-bonding → fibrous; Structural (plant cell wall); Indigestible (no cellulase enzyme)
**Glycogen**: Highly branched; Animal starch (liver, muscle storage)
## Proteins: Polymers of α-amino acids; **Peptide bond**: -CO-NH-
**Amino acids**: NH₂-CHR-COOH; **20 standard**; **Essential**: Must be in diet (9: Leu, Ile, Val, Lys, Met, Phe, Trp, Thr, His)
**Zwitter ion**: ±NH₃-CHR-COO⁻ (at isoelectric point); Amphoteric
**Classification**: **Acidic** (Glu, Asp), **Basic** (Lys, Arg, His), **Neutral**
**Peptide bond**: Dehydration; Planar, rigid (partial double bond character)
**Structure**:
**1°**: Amino acid sequence (-Gly-Ala-Ser-)
**2°**: α-helix (H-bonds within chain) or β-pleated sheet (between chains)
**3°**: 3D folding (disulfide bridges, H-bonds, hydrophobic interactions)
**4°**: Multiple polypeptide subunits (hemoglobin: 4 subunits)
**Denaturation**: Loss of structure (heat, pH, chemicals); Loss of function
**Classification**: **Fibrous** (structural: collagen, keratin), **Globular** (functional: enzymes, hemoglobin)
**Tests**: **Biuret** (violet with peptide bond, CuSO₄/NaOH); **Ninhydrin** (blue-violet with amino acids); **Xanthoproteic** (yellow with aromatic amino acids, HNO₃)
## Enzymes: Biological catalysts (proteins); **Highly specific**; **Lock-and-key** model
**Active site**: Substrate binds; **Cofactors**: Non-protein helpers (metal ions, coenzymes)
**Factors**: pH, temperature (optimum ~37°C for human), substrate concentration
**Examples**: Amylase (starch → maltose), Pepsin (protein digestion, stomach), Lipase (fats)
## Nucleic Acids: Polymers of nucleotides; **DNA** (deoxyribonucleic acid), **RNA** (ribonucleic acid)
**Nucleotide**: **Pentose sugar** + **Nitrogenous base** + **Phosphate**
**Bases**: **Purines** (Adenine, Guanine - double ring); **Pyrimidines** (Cytosine, Thymine in DNA, Uracil in RNA - single ring)
**DNA**: **Double helix** (Watson-Crick); **A-T** (2 H-bonds), **G-C** (3 H-bonds); **Antiparallel** strands; **Genetic information** storage
**RNA**: **Single strand**; **U instead of T**; Types: **mRNA** (messenger), **tRNA** (transfer), **rRNA** (ribosomal)
**Chargaff's rule**: A = T, G = C (in DNA)
## Vitamins: Organic compounds, required in small amounts
**Fat-soluble** (A, D, E, K): Stored in liver
**Water-soluble** (B-complex, C): Not stored, daily requirement
**Vitamin A** (Retinol): Vision; **Deficiency**: Night blindness
**Vitamin B₁** (Thiamine): Carbohydrate metabolism; **Deficiency**: Beriberi
**Vitamin B₁₂** (Cobalamin): RBC formation; **Deficiency**: Pernicious anemia
**Vitamin C** (Ascorbic acid): Collagen synthesis; **Deficiency**: Scurvy
**Vitamin D** (Calciferol): Ca/P absorption; **Deficiency**: Rickets, osteomalacia
**Vitamin E** (Tocopherol): Antioxidant; **Deficiency**: Sterility
**Vitamin K**: Blood clotting; **Deficiency**: Hemorrhage`,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 15,
      chapterTitle: 'Polymers',
      introduction: `Polymers are large molecules formed by repeating structural units called monomers, with applications from plastics to biological macromolecules. This chapter explores classification of polymers by source (natural, synthetic, semi-synthetic), structure (linear, branched, cross-linked), and polymerization mechanism (addition, condensation), important polymers including polyethylene, PVC, nylon, and their properties, biodegradable polymers, and molecular mass determination. Understanding polymers is important for NEET as proteins, nucleic acids, and polysaccharides are natural polymers, and many medical devices use synthetic polymers.`,
      detailedNotes: `# Polymers
## Definition: **Polymer**: Large molecule (macromolecule) from repeating units; **Monomer**: Repeating unit
**Polymerization**: Process of forming polymer; **Degree of polymerization (n)**: Number of monomer units
## Classification:
**By Source**:
**Natural**: Starch, cellulose, proteins, nucleic acids, rubber
**Synthetic**: Polythene, nylon, PVC, Bakelite
**Semi-synthetic**: Cellulose acetate, vulcanized rubber
**By Structure**:
**Linear**: Monomers joined end-to-end (HDPE, PVC, nylon); **Properties**: High density, crystalline, high tensile strength
**Branched**: Side chains (LDPE, amylopectin); **Properties**: Low density, amorphous, low tensile strength
**Cross-linked/Network**: 3D network (Bakelite, vulcanized rubber); **Properties**: Rigid, hard, heat-resistant
**By Polymer-Monomer Relationship**:
**Homopolymer**: One type monomer (polythene from ethene)
**Copolymer**: Two+ types (Buna-S from butadiene + styrene)
**By Molecular Forces**:
**Elastomers**: Weak intermolecular forces, elastic (rubber, neoprene); Can stretch, return to shape
**Fibers**: Strong intermolecular forces (H-bonding), crystalline (nylon, polyester, silk); High tensile strength
**Thermoplastics**: Intermediate forces, can be remolded (polythene, PVC, polystyrene); Soften on heating, harden on cooling
**Thermosetting**: Strong cross-links, cannot remold (Bakelite, urea-formaldehyde); Degrade on heating
## Types of Polymerization:
**1. Addition (Chain Growth)**: Unsaturated monomers add without loss; **Mechanism**: Free radical
**Example**: nCH₂=CH₂ → -(CH₂-CH₂)ₙ- (polyethylene)
**Polymers**: Polythene, PVC, polystyrene, Teflon, polyacrylonitrile
**2. Condensation (Step Growth)**: Monomers with 2 functional groups, small molecule (H₂O, NH₃) eliminated
**Example**: nHOOC-R-COOH + nH₂N-R'-NH₂ → -[-CO-R-CO-NH-R'-NH-]ₙ- + 2nH₂O
**Polymers**: Nylon, polyester (Dacron), Bakelite
## Important Polymers:
**Polyethylene (Polythene)**:
**LDPE** (Low density): Branched, soft, flexible; **Uses**: Bags, bottles, insulation
**HDPE** (High density): Linear, tough, hard; **Uses**: Containers, pipes
**Polyvinyl chloride (PVC)**: -(CH₂-CHCl)ₙ-; Tough, resistant; **Uses**: Pipes, flooring, artificial leather
**Polystyrene**: -(CH₂-CH(C₆H₅))ₙ-; Hard, transparent; **Uses**: Toys, insulation (foam)
**Teflon (PTFE)**: -(CF₂-CF₂)ₙ-; Chemically inert, low friction; **Uses**: Non-stick coating, gaskets
**Nylon-6,6**: HOOC-(CH₂)₄-COOH + H₂N-(CH₂)₆-NH₂; Fiber; **Uses**: Textiles, ropes, parachutes
**Nylon-6**: ε-caprolactam polymerization; Same uses
**Terylene (Dacron)**: Ethylene glycol + terephthalic acid; Polyester fiber; **Uses**: Fabrics, bottles (PET)
**Bakelite**: Phenol + formaldehyde; Thermosetting; **Uses**: Electrical switches, handles
**Buna-S**: Butadiene + styrene (3:1); Synthetic rubber; **Uses**: Tires
**Buna-N**: Butadiene + acrylonitrile; Oil-resistant; **Uses**: Hoses, seals
**Natural Rubber**: Polyisoprene; Soft, sticky; **Vulcanization** (S, 373 K) → cross-links → stronger, elastic
## Biodegradable Polymers: **PHBV** (Poly-β-hydroxybutyrate-co-β-hydroxyvalerate); **Nylon-2-Nylon-6**
**Advantage**: Decompose by microorganisms; Eco-friendly
## Molecular Mass: **Number average**: M̄ₙ = ΣNᵢMᵢ/ΣNᵢ; **Weight average**: M̄ w = ΣNᵢMᵢ²/ΣNᵢMᵢ
**Polydispersity index (PDI)**: M̄ w/M̄ₙ; PDI > 1 (1 = monodisperse)`,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 16,
      chapterTitle: 'Chemistry in Everyday Life',
      introduction: `Chemistry pervades daily life through drugs, food additives, cleaning agents, and materials. This chapter explores drugs and their classification by therapeutic action and chemical structure, analgesics (aspirin, paracetamol), antibiotics killing bacteria, antiseptics and disinfectants preventing infection, tranquilizers and antacids, food preservatives and artificial sweeteners, soaps and synthetic detergents for cleaning, and environmental pollution. Understanding everyday chemistry is crucial for NEET as it connects chemical principles to healthcare, nutrition, hygiene, and public health applications.`,
      detailedNotes: `# Chemistry in Everyday Life
## Drugs: Chemicals that interact with biomolecules, altering physiological functions; **Drug targets**: Receptors, enzymes, nucleic acids, lipids
**Classification**:
**By therapeutic action**: Analgesics, antibiotics, antiseptics, tranquilizers, etc.
**By chemical structure**: Alkaloids, steroids, sulfonamides, etc.
## Analgesics: Pain relievers
**Narcotic**: Addictive, depress CNS (morphine, codeine, heroin); **Medical use** only
**Non-narcotic**: Non-addictive (aspirin, paracetamol, ibuprofen)
**Aspirin** (Acetylsalicylic acid): Analgesic, antipyretic, anti-inflammatory; **Side effect**: Gastric bleeding
**Paracetamol**: Safer for stomach; Analgesic, antipyretic; **Not** anti-inflammatory
## Antibiotics: Kill/inhibit bacteria; **Selective toxicity** (harm bacteria, not host)
**Penicillin**: β-lactam ring; Inhibits cell wall synthesis; **First antibiotic** (Fleming, 1929)
**Chloramphenicol**: Broad-spectrum; Inhibits protein synthesis; **Typhoid**
**Streptomycin**: **Tuberculosis**; Aminoglycoside
**Tetracycline**: Broad-spectrum
**Resistance**: Overuse → resistant strains; **Use full course**, avoid misuse
## Antiseptics vs Disinfectants:
**Antiseptics**: Safe on living tissue (wounds); **Examples**: Dettol (chloroxylenol), Bithionol (soaps), Iodoform
**Disinfectants**: Strong, for non-living (floors); **Examples**: Phenol (carbolic acid, 1%)
**Note**: Concentration matters; 0.2% phenol = antiseptic, 1% = disinfectant
## Antimicrobials:
**Sulfonamides** (Sulfa drugs): Synthetic; Bacteriostatic (prevent growth); **Example**: Sulfanilamide
**Mechanism**: Mimic PABA (needed for bacterial folic acid synthesis) → competitive inhibition
## Antacids: Neutralize excess stomach acid (HCl)
**Examples**: Mg(OH)₂, Al(OH)₃, NaHCO₃, CaCO₃
**Ranitidine** (Zantac): Reduces acid production (H₂ receptor antagonist)
**Omeprazole**: Proton pump inhibitor
## Tranquilizers: Reduce anxiety, stress; Act on CNS
**Minor**: Anxiety (Valium, Serotonin, Equanil)
**Major**: Mental disorders (Phenelzine)
**Sleep**: Barbiturates (derivatives of barbituric acid); **Luminal** (for epilepsy)
## Antihistamines: Allergies, hay fever; Block histamine receptors
**Examples**: Brompheniramine, Terfenadine, Seldane
## Food Additives:
**Preservatives**: Prevent spoilage
**Table salt** (NaCl), **Sugar** (concentrated solutions)
**Sodium benzoate** (C₆H₅COONa): Jams, pickles
**Sodium metabisulfite** (Na₂S₂O₅): Squashes
**Artificial Sweeteners**: No/low calories
**Saccharin**: 550× sweeter than sucrose; Stable (not metabolized); **Ortho-sulphobenzimide**
**Aspartame**: 100× sweeter; **Methyl ester** of dipeptide (Asp-Phe); Unstable at cooking T; **Phenylketonuria** patients avoid
**Alitame**: 2000× sweeter; Peptide-based; Stable
**Sucralose**: 600× sweeter; Trichloro derivative of sucrose; Stable
**Antioxidants**: Prevent oxidation (rancidity)
**BHA** (Butylated hydroxyanisole), **BHT** (Butylated hydroxytoluene)
## Soaps: Sodium/potassium salts of long-chain fatty acids
**Preparation**: **Saponification**: Fat/Oil + NaOH → Glycerol + Soap
C₁₇H₃₅COONa (Sodium stearate)
**Structure**: Hydrophilic head (COO⁻) + Hydrophobic tail (C₁₇H₃₅)
**Cleaning**: Forms **micelles** (dirt in center, heads out in water); Emulsifies oil
**Problem**: Hard water (Ca²⁺, Mg²⁺) → insoluble scum: 2C₁₇H₃₅COONa + Ca²⁺ → (C₁₇H₃₅COO)₂Ca↓
## Synthetic Detergents: Cleansing agents, work in hard water
**Types**:
**1. Anionic**: Sodium alkyl sulfate (R-OSO₃⁻Na⁺); Sodium alkylbenzenesulfonate (R-C₆H₄-SO₃⁻Na⁺)
**2. Cationic**: Quaternary ammonium salts (R₄N⁺Cl⁻); Germicidal (Cetyltrimethylammonium bromide)
**3. Non-ionic**: No charge; Polyethylene glycol stearate; Gentle
**Advantage over soap**: Work in hard water (no scum), stronger cleaning, biodegradable (linear chains)
**Disadvantage**: Some non-biodegradable (branched chains) → water pollution (foam)
## Environmental Pollution:
**Smog**: Smoke + fog; **Photochemical**: NO₂ + O₃ (eye irritation)
**Acid rain**: SO₂, NO₂ → H₂SO₄, HNO₃; pH < 5.6; Damages crops, buildings (marble), aquatic life
**Greenhouse effect**: CO₂, CH₄, CFCs trap heat → global warming
**Ozone depletion**: CFCs release Cl· → Cl· + O₃ → ClO· + O₂ (chain reaction); UV radiation ↑ → skin cancer
**Montreal Protocol**: Phase out CFCs`,
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

  console.log('✓ Seeded Chemistry Class 12 Chapters 13-16 (CHEMISTRY COMPLETE! ALL 98 CHAPTERS DONE!)');
}

seedChemistryClass12Final().catch(console.error);
