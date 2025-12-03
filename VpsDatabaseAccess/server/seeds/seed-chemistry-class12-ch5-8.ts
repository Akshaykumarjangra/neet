import { db } from '../db';
import { chapterContent } from '../../shared/schema';
import { sql } from 'drizzle-orm';

async function seedChemistryClass12Part2() {
  console.log('Seeding Chemistry Class 12 Chapters 5-8...');

  await db.insert(chapterContent).values([
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 5,
      chapterTitle: 'Surface Chemistry',
      introduction: `Surface chemistry studies phenomena at interfaces between phases, crucial for catalysis and adsorption processes. This chapter explores adsorption of gases and solutions on solid surfaces, types of adsorption (physisorption vs chemisorption), Freundlich and Langmuir adsorption isotherms, catalysis including enzyme catalysis, colloids as dispersed systems with unique properties, preparation and properties of colloids, emulsions, and coagulation. Understanding surface chemistry is important for NEET as drug delivery, enzyme function, and lung surfactants all involve surface phenomena.`,
      detailedNotes: `# Surface Chemistry
## Adsorption: Accumulation of substance at surface (vs Absorption: throughout bulk)
**Adsorbent**: Surface (charcoal, silica gel); **Adsorbate**: Substance adsorbed
**Types**:
**Physisorption**: Weak van der Waals forces; Multilayer; Reversible; Low heat (~20-40 kJ/mol); Non-specific; ↑T → ↓adsorption
**Chemisorption**: Strong chemical bonds; Monolayer; Irreversible; High heat (~80-240 kJ/mol); Specific; ↑T → ↑initially (needs E_a)
**Factors**: ↑Surface area, ↑pressure → ↑adsorption; Temperature effect depends on type
## Adsorption Isotherms:
**Freundlich**: x/m = kP^(1/n) (empirical); log(x/m) = log k + (1/n)log P; n > 1
**Langmuir**: Theoretical, assumes monolayer, equivalent sites; θ = (bP)/(1+bP) where θ = fraction covered
Applications: Gas masks, dehumidifiers, chromatography
## Catalysis:
**Homogeneous**: Same phase (esterification with H₂SO₄, NO in lead chamber)
**Heterogeneous**: Different phase; **Haber**: N₂ + 3H₂ ⇌ 2NH₃ (Fe catalyst, 450°C, 200 atm)
**Mechanism**: Adsorption → activation → product formation → desorption
**Zeolites**: Microporous catalysts (shape-selective)
**Enzyme**: Biological catalyst; E + S ⇌ ES → E + P; **Michaelis-Menten**: v = (V_max[S])/(K_m + [S])
**Promoters**: Increase activity (Mo in Haber); **Poisons**: Decrease activity (CO on Pt)
## Colloids: **Dispersed phase** in **dispersion medium**; Particle size 1-1000 nm
**Classification by state**: Sol (solid in liquid), Aerosol (solid/liquid in gas), Emulsion (liquid in liquid), Foam (gas in liquid), Gel (liquid in solid)
**Hydrophilic** (water-loving, stable): Starch, gelatin; **Hydrophobic** (unstable): Metal sols
## Preparation:
**Dispersion**: Breaking large → small (mechanical, ultrasonic, Bredig's arc)
**Condensation**: Small → colloidal (chemical reactions, change of solvent)
**Peptization**: Precipitate → colloid by adding electrolyte
## Properties:
**Tyndall effect**: Scattering of light (distinguish from true solution)
**Brownian motion**: Random zigzag due to collisions
**Electrophoresis**: Charged particles move in electric field
**Coagulation/Flocculation**: Settle out by adding electrolyte; **Hardy-Schulze rule**: Higher charge ion more effective
**Protective colloids**: Prevent coagulation (gelatin protects Au sol); **Gold number**: Measure of protecting power
**Emulsions**: **O/W** (oil in water: milk) vs **W/O** (water in oil: butter); **Emulsifier** stabilizes (soap, gum)`,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 6,
      chapterTitle: 'General Principles and Processes of Isolation of Elements',
      introduction: `Extraction of metals from ores involves concentration, reduction, and refining processes. This chapter explores occurrence of metals in nature, concentration methods removing gangue (gravity separation, froth flotation, magnetic separation), reduction processes converting ores to metals (calcination, roasting, smelting), thermodynamic and electrochemical principles of metallurgy, refining methods for pure metals, and extraction of specific metals (Al, Cu, Zn, Fe). Understanding metallurgy helps in NEET for understanding metal toxicity, iron metabolism, and bioavailability of minerals.`,
      detailedNotes: `# Isolation of Elements
## Occurrence: **Native state** (Au, Ag, Pt), **Combined state** (most metals as oxides, sulfides, carbonates, silicates)
**Ore**: Mineral from which metal extracted profitably; **Gangue**: Unwanted material; **Flux**: Removes gangue as slag
## Concentration (Ore Enrichment):
**1. Gravity separation**: Density difference (oxide ores)
**2. Froth flotation**: Sulfide ores float with froth (pine oil), gangue settles; **Wetting agent** (NaEt xanthate)
**3. Magnetic separation**: Magnetic ores (magnetite Fe₃O₄) separated
**4. Leaching**: Chemical reaction; **Bauxite**: Al₂O₃·2H₂O + 2NaOH → 2NaAlO₂ + 3H₂O (Baeyer's process)
## Reduction:
**Calcination**: Heating ore in limited air (carbonates/hydrated oxides); ZnCO₃ → ZnO + CO₂
**Roasting**: Heating in excess air (sulfide ores); 2ZnS + 3O₂ → 2ZnO + 2SO₂
**Smelting**: Reduction with C/CO at high T; ZnO + C → Zn + CO; FeO + CO → Fe + CO₂
**Auto-reduction/Self-reduction**: No external reducing agent; Cu₂S + 2Cu₂O → 6Cu + SO₂
**Aluminothermy**: Very reactive metal oxide reduced by Al; 3Mn₃O₄ + 8Al → 9Mn + 4Al₂O₃ (Goldschmidt)
## Thermodynamic Principles:
**Ellingham diagram**: ΔG° vs T for MO formation; Lower line more stable oxide
**Spontaneous reduction**: ΔG < 0; Reducing agent's oxide should be more stable (lower on diagram)
**C reduces** most oxides above ~700°C; **CO** more effective at higher T
**Very reactive** (Na, Ca, Mg, Al): Electrolytic reduction (ΔG very negative)
## Electrochemical Principles:
**E° = -ΔG°/(nF)**; More negative E° → stronger reducing agent
**Electrolysis**: **Hall-Héroult process** for Al: Al₂O₃ (in cryolite) → Al at cathode (C); **Downs cell** for Na
## Refining:
**1. Liquation**: Low MP impurities melt first (Sn, Pb)
**2. Distillation**: Low BP metals (Zn, Hg)
**3. Electrolytic**: Impure metal anode, pure deposited at cathode (Cu, Ag, Au)
**4. Zone refining**: Ultra-pure (Ge, Si for semiconductors); Impurities concentrate in molten zone
**5. Mond process**: Ni + 4CO → Ni(CO)₄ (volatile) → Ni (pure)
**6. van Arkel**: Ti + 2I₂ → TiI₄ → Ti (pure, on hot W wire)
## Specific Extractions:
**Al**: Baeyer's (concentration) + Hall-Héroult (electrolysis); Anode: C (oxidized to CO₂)
**Cu**: Roasting → Auto-reduction → Electrolytic refining; **Blister copper** 98% pure
**Zn**: Roasting → Reduction with C; Zn vapor condenses
**Fe**: Blast furnace; Ore (Fe₂O₃), coke (C), limestone (CaCO₃); Hot air blast; **Pig iron** (4% C, brittle)`,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 7,
      chapterTitle: 'The p-Block Elements',
      introduction: `p-Block elements (Groups 13-18) show diverse properties from metals to non-metals. This chapter explores Group 15 (nitrogen family) including nitrogen, phosphorus and their compounds, allotropes, oxides, oxyacids, and applications, Group 16 (oxygen family) including oxygen, sulfur, ozone, sulfuric acid preparation and uses, Group 17 (halogens) showing high reactivity, interhalogen compounds, and Group 18 (noble gases) with low reactivity and specific uses. Understanding p-block chemistry is vital for NEET as these elements are essential in biological molecules, metabolism, and drug compounds.`,
      detailedNotes: `# p-Block Elements
## Group 15 (N, P, As, Sb, Bi): **Pnictogens**; ns² np³ configuration; Valence: 3, 5
**Trends**: Metallic character ↑; Ionization energy ↓; Electronegativity ↓ down group
**Nitrogen**: Diatomic (N≡N, very stable); Unreactive (high bond energy 946 kJ/mol)
**Allotropes of P**: **White** (P₄, reactive, poisonous, glows), **Red** (polymeric, stable), **Black** (least reactive)
**Ammonia (NH₃)**: Haber process; Pyramidal; Basic; **Fountain experiment**; H-bonding → high BP
**Uses**: Fertilizers (urea, ammonium salts), explosives, HNO₃, refrigerant
**Nitric acid**: Ostwald process (NH₃ oxidation); Strong oxidizing agent; Aqua regia (3HCl:1HNO₃) dissolves Au, Pt
**Oxides**: N₂O (neutral), NO (neutral), N₂O₃ (acidic), NO₂ (acidic), N₂O₅ (acidic); **NO₂** brown, toxic
**Phosphorus compounds**: PCl₃, PCl₅ (hydrolysis gives H₃PO₃, H₃PO₄); **H₃PO₄** tribasic, used in soft drinks
## Group 16 (O, S, Se, Te, Po): **Chalcogens**; ns² np⁴; Valence: 2, 4, 6
**Oxygen**: Dioxygen (O₂) paramagnetic; **Ozone (O₃)**: Bent, powerful oxidizer, absorbs UV
**Preparation**: Silent electric discharge in O₂; **Uses**: Water purification, bleaching
**Sulfur**: **Allotropes**: Rhombic (S₈, yellow), Monoclinic; **Vulcanization** of rubber
**H₂S**: Rotten egg smell; Reducing agent; Toxic; Qualitative analysis (precipitates metal sulfides)
**SO₂**: Pungent, acidic; Reducing/oxidizing; Bleaching (temporary); **Contact process** for H₂SO₄
**H₂SO₄**: King of chemicals; Dehydrating, oxidizing (conc.); **Oleum**: H₂S₂O₇
**Uses**: Fertilizers, petroleum refining, paints, detergents
## Group 17 (F, Cl, Br, I, At): **Halogens**; ns² np⁵; Most reactive non-metals
**Reactivity**: F > Cl > Br > I (electronegativity trend); **F₂** most reactive (attacks glass)
**HX acids**: HF weak (H-bonding), others strong; **Acidity**: HF < HCl < HBr < HI
**Cl₂**: Greenish-yellow, toxic; **Preparation**: Electrolysis of brine (Chlor-alkali); **Deacon's**: 4HCl + O₂ → 2Cl₂ + 2H₂O
**Uses**: Water purification, bleaching powder (CaOCl₂), PVC, pesticides
**Bleaching powder**: Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O; Releases Cl₂ in acid
**Interhalogen**: XYₙ where n = 1,3,5,7 (ClF, BrF₃, IF₇); More reactive than halogens
**Oxoacids of Cl**: HOCl (hypochlorous, +1), HClO₂ (chlorous, +3), HClO₃ (chloric, +5), HClO₄ (perchloric, +7)
**Acidity**: HClO₄ > HClO₃ > HClO₂ > HOCl
## Group 18 (He, Ne, Ar, Kr, Xe, Rn): **Noble gases**; ns² np⁶ (stable octet)
**Trends**: BP ↑ down group (van der Waals ↑); Ionization energy ↓
**Low reactivity**: Stable configuration; **Xe** forms compounds (XeF₂, XeF₄, XeF₆, XeO₃)
**Uses**: He (balloons, diving), Ne (signs), Ar (inert atmosphere, bulbs), **Radon** radioactive (health hazard)`,
    },
    {
      subject: 'Chemistry',
      classLevel: '12',
      chapterNumber: 8,
      chapterTitle: 'The d- and f-Block Elements',
      introduction: `Transition elements (d-block) and inner transition elements (f-block) show variable oxidation states and form colored complexes. This chapter explores electronic configurations of d-block elements, characteristic properties including variable oxidation states, color, catalytic activity, magnetic properties, formation of complexes and interstitial compounds, important compounds (K₂Cr₂O₇, KMnO₄), lanthanoids and actinoids with their properties and uses. Understanding d-block chemistry is crucial for NEET as iron in hemoglobin, copper enzymes, and metal-based drugs (cisplatin) are transition metal complexes.`,
      detailedNotes: `# d- and f-Block Elements
## d-Block (Transition Elements): (n-1)d¹⁻¹⁰ ns¹⁻²; Groups 3-12
**General properties**:
1. **Variable oxidation states**: Due to similar energies of (n-1)d and ns; **+2 common** (loss of ns²)
2. **Colored ions**: d-d transitions; **Sc³⁺, Zn²⁺** colorless (d⁰, d¹⁰)
3. **Paramagnetic**: Unpaired d electrons; **Magnetic moment**: μ = √(n(n+2)) BM where n = unpaired e⁻
4. **Catalytic activity**: Variable oxidation states, ability to form complexes; **Fe, Ni, V₂O₅, Pt**
5. **Complex formation**: Empty d orbitals accept lone pairs; **Coordination compounds**
6. **Interstitial compounds**: Small atoms (H, C, N) in lattice voids; Hard, high MP (steel)
7. **Alloy formation**: Similar atomic radii
**Trends**: **Atomic radius**: Irregular (lanthanoid contraction); **Ionization energy**: ↑ slowly; **Density**: High (close packing)
## Important Compounds:
**K₂Cr₂O₇ (Potassium dichromate)**: Orange, strong oxidizer
Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O; **Acidic medium**: Oxidizes I⁻, Fe²⁺, H₂S
**Chromyl chloride test**: K₂Cr₂O₇ + 4NaCl + 6H₂SO₄ → 2CrO₂Cl₂ (red fumes) + ...
**KMnO₄ (Potassium permanganate)**: Purple, powerful oxidizer
**Acidic**: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ (colorless) + 4H₂O
**Neutral/Alkaline**: MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ (brown ppt) + 4OH⁻
**Uses**: Disinfectant, water treatment, volumetric analysis (titrations)
**Preparation**: Fusion of MnO₂ with KOH + oxidizer (KNO₃) → K₂MnO₄ → electrolytic oxidation → KMnO₄
## Inner Transition (f-Block):
**Lanthanoids** (4f¹⁻¹⁴ 5d⁰⁻¹ 6s²): Ce to Lu; **Actinoids** (5f¹⁻¹⁴ 6d⁰⁻¹ 7s²): Th to Lr
**Lanthanoid contraction**: Gradual decrease in size (poor shielding by 4f); **Consequences**: Similar chemical properties, difficult separation; Increased density; Smaller radii of 5d elements
**Oxidation state**: **Lanthanoids** +3 (most common); **Actinoids** variable (+3 to +7); All radioactive
**Magnetic**: Paramagnetic (unpaired f electrons)
**Uses**: **Ce** (lighter flints), **Sm, Eu** (control rods), **U, Pu** (nuclear fuel)`,
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

  console.log('✓ Seeded Chemistry Class 12 Chapters 5-8');
}

seedChemistryClass12Part2().catch(console.error);
