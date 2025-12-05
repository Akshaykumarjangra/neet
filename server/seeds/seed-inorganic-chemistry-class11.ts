import { db } from "../db";
import { chapterContent } from "@shared/schema";

const inorganicChemistryClass11Chapters = [
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 3,
    chapterTitle: "Classification of Elements and Periodicity in Properties",
    introduction: "The Periodic Table is chemistry's greatest organizing tool! This chapter explores how elements are arranged based on their properties, and the fascinating patterns (periodic trends) that emerge when we look across periods and down groups.",
    detailedNotes: `# Classification of Elements and Periodicity in Properties

The Periodic Table is like a map of all known elements, arranged to reveal hidden patterns in their behavior. Understanding these patterns helps predict properties of elements!

## Historical Development

Scientists tried many ways to organize elements:

**Döbereiner's Triads (1829)**
Groups of 3 elements with similar properties where middle element's atomic mass was average of other two.
Example: Li (7), Na (23), K (39) → 23 ≈ (7+39)/2

**Newlands' Law of Octaves (1866)**
Every 8th element showed similar properties (like musical notes!). Worked only up to calcium.

**Mendeleev's Periodic Table (1869)**
Arranged by atomic mass, left gaps for undiscovered elements. He even predicted their properties!

**💡 Did You Know?**
Mendeleev left gaps in his table and predicted properties of undiscovered elements like Germanium (he called it eka-silicon). When discovered, his predictions were amazingly accurate!

## Modern Periodic Law

Elements arranged by **atomic number** (not mass) show periodic properties.

**Henry Moseley (1913)** discovered atomic number is more fundamental than atomic mass.

## Structure of Modern Periodic Table

| Feature | Description |
|---------|-------------|
| Periods | 7 horizontal rows (based on valence shell) |
| Groups | 18 vertical columns (similar properties) |
| s-block | Groups 1-2 (alkali & alkaline earth metals) |
| p-block | Groups 13-18 (includes non-metals) |
| d-block | Groups 3-12 (transition metals) |
| f-block | Lanthanides & Actinides (inner transition) |

**🔑 Remember This!**
Period number = Number of shells
Group number for main group = Valence electrons (for s and p block)

## Periodic Trends

### 1. Atomic Radius

**Across a period (left → right):** Decreases
- More protons pull electrons closer
- Same shell, more nuclear charge

**Down a group:** Increases
- New shells added
- Electrons farther from nucleus

**⚠️ Common Mistake Alert!**
Don't confuse atomic radius with ionic radius! When atoms form ions, their size changes significantly.

### 2. Ionization Enthalpy (IE)

Energy needed to remove an electron from gaseous atom.

**Across a period:** Generally increases
- Electrons held more tightly
- Exception: B < Be and O < N (due to orbital stability)

**Down a group:** Decreases
- Valence electrons farther from nucleus
- Easier to remove

**Successive IE:** IE₁ < IE₂ < IE₃...
Removing each electron becomes harder!

### 3. Electron Gain Enthalpy (EGE)

Energy change when electron is added to gaseous atom.

**Across a period:** Becomes more negative (generally)
- Atoms want to complete octet
- Halogens have most negative values

**Down a group:** Becomes less negative
- Exception: Cl has more negative EGE than F!
- F is so small, added electron faces repulsion

### 4. Electronegativity

Tendency to attract shared electrons in a bond.

**Across a period:** Increases
**Down a group:** Decreases

Most electronegative: Fluorine (4.0)
Least electronegative: Cesium (0.7)

**🔑 Remember This!**
Electronegativity difference determines bond type:
- ΔEN > 1.7 → Ionic bond
- ΔEN < 1.7 → Covalent bond

## Periodic Properties of Oxides

| Block | Oxide Nature | Examples |
|-------|--------------|----------|
| s-block metals | Basic | Na₂O, MgO |
| p-block left | Amphoteric | Al₂O₃, ZnO |
| p-block right | Acidic | CO₂, SO₃, P₂O₅ |

## Diagonal Relationship

Elements diagonally placed show similar properties:
- Li ~ Mg
- Be ~ Al
- B ~ Si

This happens because of similar charge/size ratio!`,
    keyConcepts: JSON.stringify([
      { title: "Modern Periodic Law", description: "Properties of elements are periodic functions of their atomic numbers. Elements arranged by increasing atomic number show recurring patterns." },
      { title: "Periodic Table Structure", description: "7 periods (horizontal), 18 groups (vertical). Divided into s, p, d, and f blocks based on electron configuration." },
      { title: "Atomic Radius Trend", description: "Decreases across a period (more nuclear charge), increases down a group (more shells added)." },
      { title: "Ionization Enthalpy", description: "Energy to remove electron from gaseous atom. Increases across period, decreases down group. Exceptions at half-filled and fully-filled orbitals." },
      { title: "Electron Gain Enthalpy", description: "Energy released when electron is added. Halogens have most negative values. Cl > F due to small size of F causing repulsion." },
      { title: "Electronegativity", description: "Tendency to attract shared electrons. Increases across period, decreases down group. Fluorine is most electronegative (4.0)." },
      { title: "Diagonal Relationship", description: "Diagonally placed elements (Li-Mg, Be-Al, B-Si) show similar properties due to similar charge-to-size ratio." }
    ]),
    formulas: JSON.stringify([
      { name: "Ionization Enthalpy Trend", formula: "IE₁ < IE₂ < IE₃ ...", description: "Successive ionization enthalpies increase as removing electrons from positive ion is harder." },
      { name: "Effective Nuclear Charge", formula: "Zeff = Z - σ", description: "Actual nuclear charge felt by valence electrons. Z is atomic number, σ is shielding constant." },
      { name: "Electronegativity (Mulliken)", formula: "χ = (IE + EA) / 2", description: "Average of ionization energy and electron affinity, expressed in eV." },
      { name: "Ionic Radius Relation", formula: "Cation < Atom < Anion", description: "Cations are smaller than parent atoms, anions are larger." },
      { name: "Pauling Electronegativity", formula: "χA - χB = 0.208√(D_AB - √(D_AA × D_BB))", description: "Electronegativity difference from bond dissociation energies." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 90
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 4,
    chapterTitle: "Chemical Bonding and Molecular Structure",
    introduction: "Why do atoms stick together? This chapter reveals the secrets of chemical bonding - from ionic and covalent bonds to the shapes of molecules predicted by VSEPR theory and explained by hybridization and molecular orbital theory.",
    detailedNotes: `# Chemical Bonding and Molecular Structure

Atoms bond to achieve stability - usually by getting 8 electrons in their outer shell (octet rule). But how exactly do they do this?

## Types of Chemical Bonds

**1. Ionic Bond**
- Transfer of electrons from metal to non-metal
- Electrostatic attraction between ions
- Example: NaCl (Na⁺ and Cl⁻)

**2. Covalent Bond**
- Sharing of electron pairs
- Between non-metals
- Example: H₂, Cl₂, H₂O

**3. Coordinate (Dative) Bond**
- Both shared electrons from one atom
- Example: NH₄⁺ (N donates pair to H⁺)

**💡 Did You Know?**
Diamond is so hard because every carbon atom forms 4 strong covalent bonds in a 3D network!

## Lewis Dot Structures

Show valence electrons as dots around atomic symbols.

**Steps to draw:**
1. Count total valence electrons
2. Identify central atom (usually least electronegative)
3. Connect atoms with single bonds
4. Complete octets of outer atoms
5. Place remaining electrons on central atom

**⚠️ Common Mistake Alert!**
Hydrogen never goes in the center - it can only form one bond! Also, H and He only need 2 electrons (duet rule).

## VSEPR Theory

**Valence Shell Electron Pair Repulsion** predicts molecular geometry.

**Key principle:** Electron pairs repel each other and arrange to minimize repulsion.

| Electron Pairs | Geometry | Bond Angle | Example |
|----------------|----------|------------|---------|
| 2 | Linear | 180° | BeCl₂, CO₂ |
| 3 | Trigonal planar | 120° | BF₃ |
| 4 | Tetrahedral | 109.5° | CH₄ |
| 5 | Trigonal bipyramidal | 90°, 120° | PCl₅ |
| 6 | Octahedral | 90° | SF₆ |

**🔑 Remember This!**
Lone pairs take more space than bonding pairs!
Order of repulsion: lp-lp > lp-bp > bp-bp

**Effect of Lone Pairs:**
- 4 pairs with 1 lone pair → Pyramidal (NH₃, 107°)
- 4 pairs with 2 lone pairs → Bent/Angular (H₂O, 104.5°)

## Hybridization

Mixing of atomic orbitals to form new hybrid orbitals.

| Hybridization | Orbitals Mixed | Geometry | Example |
|---------------|----------------|----------|---------|
| sp | s + p | Linear | BeCl₂, C₂H₂ |
| sp² | s + 2p | Trigonal planar | BF₃, C₂H₄ |
| sp³ | s + 3p | Tetrahedral | CH₄, NH₃ |
| sp³d | s + 3p + d | Trigonal bipyramidal | PCl₅ |
| sp³d² | s + 3p + 2d | Octahedral | SF₆ |

**Quick Formula:** Hybridization = ½[V + M - C + A]
Where: V = valence electrons of central atom, M = monovalent atoms, C = charge (+ is positive), A = charge (- is negative)

## Molecular Orbital Theory (MOT)

Electrons don't belong to individual atoms but to the molecule as a whole!

**Key points:**
1. Atomic orbitals combine to form molecular orbitals
2. Bonding MO (σ, π) - lower energy, stabilizing
3. Antibonding MO (σ*, π*) - higher energy, destabilizing

**Bond Order = (Nb - Na) / 2**
Where Nb = electrons in bonding MO, Na = electrons in antibonding MO

**💡 Did You Know?**
O₂ is paramagnetic (attracted to magnets) because it has 2 unpaired electrons. Lewis structures can't explain this, but MOT does!

**Filling Order for O₂, F₂:**
σ1s < σ*1s < σ2s < σ*2s < σ2pz < (π2px = π2py) < (π*2px = π*2py) < σ*2pz

**Filling Order for N₂, C₂:**
σ1s < σ*1s < σ2s < σ*2s < (π2px = π2py) < σ2pz < (π*2px = π*2py) < σ*2pz

## Hydrogen Bonding

Special strong intermolecular force when H is bonded to F, O, or N.

**Intramolecular:** Within same molecule (o-nitrophenol)
**Intermolecular:** Between different molecules (water, HF)

**Effects:**
- Higher boiling points
- Ice floats on water (H-bonding in ice creates open structure)
- DNA double helix held by H-bonds`,
    keyConcepts: JSON.stringify([
      { title: "Types of Bonds", description: "Ionic (electron transfer), Covalent (electron sharing), Coordinate (one-sided sharing). Bond type depends on electronegativity difference." },
      { title: "VSEPR Theory", description: "Electron pairs repel and arrange to minimize repulsion. Predicts molecular geometry from total electron pairs around central atom." },
      { title: "Effect of Lone Pairs", description: "Lone pairs occupy more space than bonding pairs, reducing bond angles. lp-lp > lp-bp > bp-bp repulsion." },
      { title: "Hybridization", description: "Mixing of atomic orbitals to form equivalent hybrid orbitals. sp (linear), sp² (trigonal), sp³ (tetrahedral), sp³d (TBP), sp³d² (octahedral)." },
      { title: "Molecular Orbital Theory", description: "Electrons belong to entire molecule. Bonding MOs stabilize, antibonding MOs destabilize. Bond order determines bond strength." },
      { title: "Bond Order", description: "(Bonding electrons - Antibonding electrons)/2. Higher bond order means stronger, shorter bond." },
      { title: "Hydrogen Bonding", description: "Strong intermolecular force between H (bonded to F, O, N) and another electronegative atom. Explains water's high boiling point." }
    ]),
    formulas: JSON.stringify([
      { name: "Bond Order", formula: "B.O. = (Nb - Na) / 2", description: "Nb = electrons in bonding MO, Na = electrons in antibonding MO. Zero or negative means molecule doesn't exist." },
      { name: "Hybridization Formula", formula: "H = ½[V + M - C + A]", description: "V = valence electrons, M = monovalent atoms attached, C = positive charge, A = negative charge." },
      { name: "Formal Charge", formula: "FC = V - L - B/2", description: "V = valence electrons, L = lone pair electrons, B = bonding electrons. Sum of formal charges equals molecular charge." },
      { name: "Dipole Moment", formula: "μ = q × d", description: "Product of charge and distance between charges. Measured in Debye (D). Vector quantity." },
      { name: "Percent Ionic Character", formula: "% = (μobserved / μtheoretical) × 100", description: "Measures how ionic a covalent bond is. μtheoretical assumes complete electron transfer." },
      { name: "Bond Energy Relation", formula: "Triple > Double > Single", description: "Bond strength increases with bond order. C≡C (839 kJ) > C=C (614 kJ) > C-C (348 kJ)." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 120
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 9,
    chapterTitle: "Hydrogen",
    introduction: "Hydrogen is the simplest and most abundant element in the universe! This chapter explores its unique position in the periodic table, its isotopes, various methods of preparation, and its fascinating chemistry including water and hydrogen peroxide.",
    detailedNotes: `# Hydrogen

Hydrogen is truly unique - it's the simplest atom with just one proton and one electron, yet it forms more compounds than any other element!

## Position of Hydrogen in Periodic Table

Hydrogen is special - it doesn't fit perfectly in any group!

**Similarities with Alkali Metals (Group 1):**
- 1 valence electron
- Forms H⁺ ion (like Na⁺, K⁺)
- Electropositive character

**Similarities with Halogens (Group 17):**
- 1 electron short of noble gas configuration
- Forms H⁻ ion (like Cl⁻, F⁻)
- Forms diatomic molecule (H₂ like Cl₂)

**💡 Did You Know?**
Hydrogen makes up about 75% of all matter in the universe! Stars like our Sun are mainly hydrogen undergoing fusion.

## Isotopes of Hydrogen

| Isotope | Symbol | Protons | Neutrons | Abundance |
|---------|--------|---------|----------|-----------|
| Protium | ¹H | 1 | 0 | 99.98% |
| Deuterium | ²H or D | 1 | 1 | 0.02% |
| Tritium | ³H or T | 1 | 2 | Trace (radioactive) |

**Heavy Water (D₂O):**
- Density: 1.1 g/cm³ (heavier than H₂O)
- Boiling point: 101.4°C
- Used as moderator in nuclear reactors

## Preparation of Dihydrogen

**Laboratory Methods:**

1. **Reaction with dilute acids:**
Zn + H₂SO₄ → ZnSO₄ + H₂↑

2. **Reaction with alkali (amphoteric metals):**
2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂↑

**⚠️ Common Mistake Alert!**
Not all metals react with acids to give hydrogen. Metals below hydrogen in reactivity series (Cu, Ag, Au) don't liberate H₂ from dilute acids!

**Industrial Methods:**

1. **Steam reforming (most common):**
CH₄ + H₂O → CO + 3H₂ (at 1270K, Ni catalyst)

2. **Water-gas shift reaction:**
CO + H₂O → CO₂ + H₂

3. **Electrolysis of water:**
2H₂O → 2H₂ + O₂ (electrolysis)

**🔑 Remember This!**
Syngas (synthesis gas) is mixture of CO + H₂, used to make methanol and synthetic petrol!

## Properties of Hydrogen

**Physical Properties:**
- Colorless, odorless, tasteless gas
- Lightest element
- Very low boiling point (-253°C)
- Slightly soluble in water

**Chemical Properties:**

1. **Reaction with metals (forms hydrides):**
2Na + H₂ → 2NaH (ionic hydride)

2. **Reaction with non-metals:**
H₂ + Cl₂ → 2HCl (explosive in light!)
3H₂ + N₂ ⇌ 2NH₃ (Haber process)

3. **Reaction with metal oxides:**
CuO + H₂ → Cu + H₂O (reducing agent)

## Types of Hydrides

| Type | Formation | Examples | Properties |
|------|-----------|----------|------------|
| Ionic (Saline) | s-block metals | NaH, CaH₂ | High melting, conduct when molten |
| Covalent | Non-metals | HCl, H₂O, NH₃ | Low melting, molecular |
| Metallic | d and f-block | TiH₂, PdH | Non-stoichiometric, conduct electricity |

## Water (H₂O)

**Structure:**
- Bent shape (104.5°)
- sp³ hybridized oxygen
- 2 lone pairs on oxygen

**Hydrogen bonding** makes water unique:
- High boiling point (100°C vs expected -80°C)
- Ice floats (density maximum at 4°C)
- High specific heat capacity
- Universal solvent

**Hard Water:** Contains Ca²⁺ and Mg²⁺ ions
- Temporary hardness: Ca(HCO₃)₂ - removed by boiling
- Permanent hardness: CaSO₄, MgCl₂ - removed by washing soda

## Hydrogen Peroxide (H₂O₂)

**Structure:**
- Open book structure
- O-O bond at center
- Dihedral angle: 111.5°

**Preparation:**
2-ethylanthraquinol + O₂ → 2-ethylanthraquinone + H₂O₂

**Properties:**
1. Decomposes: 2H₂O₂ → 2H₂O + O₂
2. Oxidizing agent: PbS + 4H₂O₂ → PbSO₄ + 4H₂O
3. Reducing agent: 2KMnO₄ + 5H₂O₂ + 3H₂SO₄ → 2MnSO₄ + K₂SO₄ + 8H₂O + 5O₂

**💡 Did You Know?**
Hydrogen peroxide is used as rocket fuel! When it decomposes rapidly, it releases enormous amounts of oxygen and heat.

**Uses:**
- Bleaching (hair, textiles, paper)
- Antiseptic (3% solution)
- Rocket propellant
- Pollution control`,
    keyConcepts: JSON.stringify([
      { title: "Unique Position of Hydrogen", description: "Hydrogen has properties of both alkali metals (1 valence electron, forms H⁺) and halogens (forms H⁻, diatomic molecule)." },
      { title: "Isotopes of Hydrogen", description: "Protium (¹H, no neutrons), Deuterium (²H, 1 neutron), Tritium (³H, 2 neutrons, radioactive). Heavy water is D₂O." },
      { title: "Preparation Methods", description: "Lab: metal + acid, Industrial: steam reforming of methane, electrolysis of water, water-gas shift reaction." },
      { title: "Types of Hydrides", description: "Ionic (s-block metals, like NaH), Covalent (non-metals, like HCl), Metallic (transition metals, non-stoichiometric)." },
      { title: "Hydrogen Bonding in Water", description: "H-bonding gives water high boiling point, makes ice less dense than liquid water, high specific heat." },
      { title: "Hard Water", description: "Contains Ca²⁺/Mg²⁺. Temporary hardness (bicarbonates) removed by boiling. Permanent hardness requires chemical treatment." },
      { title: "Hydrogen Peroxide", description: "H₂O₂ has open-book structure. Acts as both oxidizing and reducing agent. Used in bleaching and as rocket fuel." }
    ]),
    formulas: JSON.stringify([
      { name: "Electrolysis of Water", formula: "2H₂O → 2H₂ + O₂", description: "Electrical decomposition of water. H₂ at cathode, O₂ at anode. Volume ratio 2:1." },
      { name: "Steam Reforming", formula: "CH₄ + H₂O → CO + 3H₂", description: "Industrial production of hydrogen from methane at 1270K with Ni catalyst." },
      { name: "Water-Gas Shift", formula: "CO + H₂O → CO₂ + H₂", description: "Converts carbon monoxide and water to carbon dioxide and more hydrogen." },
      { name: "H₂O₂ Decomposition", formula: "2H₂O₂ → 2H₂O + O₂", description: "Catalyzed by MnO₂. Exothermic reaction releasing oxygen gas." },
      { name: "Volume Strength", formula: "Vol. strength = 11.2 × Normality", description: "Volume of O₂ (at STP) released by 1 L of H₂O₂ solution on decomposition." },
      { name: "Hard Water Softening", formula: "Ca(HCO₃)₂ → CaCO₃↓ + H₂O + CO₂", description: "Temporary hardness removed by boiling - precipitates calcium carbonate." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 85
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 10,
    chapterTitle: "The s-Block Elements",
    introduction: "The s-block elements include the highly reactive alkali metals (Group 1) and alkaline earth metals (Group 2). This chapter explores their unique properties, reactions, and important compounds that are essential in everyday life.",
    detailedNotes: `# The s-Block Elements

The s-block elements are the most reactive metals in the periodic table! They include the alkali metals (Group 1: Li, Na, K, Rb, Cs, Fr) and alkaline earth metals (Group 2: Be, Mg, Ca, Sr, Ba, Ra).

## General Characteristics

**Electronic Configuration:**
- Alkali metals: [Noble gas] ns¹
- Alkaline earth metals: [Noble gas] ns²

**Key Trends Down the Group:**

| Property | Alkali Metals | Alkaline Earth Metals |
|----------|---------------|----------------------|
| Atomic radius | Increases | Increases |
| Ionization energy | Decreases | Decreases |
| Electronegativity | Decreases | Decreases |
| Reactivity | Increases | Increases |
| Melting point | Decreases | Generally decreases |

**💡 Did You Know?**
Francium (Fr) is so rare and radioactive that at any moment, there are only about 30 grams of it in Earth's entire crust!

## Alkali Metals (Group 1)

**Physical Properties:**
- Soft (can be cut with knife)
- Low melting and boiling points
- Low densities (Li, Na, K float on water!)
- Silvery-white, lustrous

**Chemical Properties:**

**1. Reaction with Water:**
2Na + 2H₂O → 2NaOH + H₂↑ (violent, catches fire)

Reactivity order: Li < Na < K < Rb < Cs
(Cs explodes on contact with water!)

**⚠️ Common Mistake Alert!**
Alkali metals are stored under kerosene oil, not water! They react violently with water.

**2. Reaction with Oxygen:**
- Li forms normal oxide: 4Li + O₂ → 2Li₂O
- Na forms peroxide: 2Na + O₂ → Na₂O₂
- K, Rb, Cs form superoxide: K + O₂ → KO₂

**3. Flame Colors:**
| Metal | Flame Color |
|-------|-------------|
| Li | Crimson red |
| Na | Golden yellow |
| K | Violet |
| Rb | Red violet |
| Cs | Blue |

**🔑 Remember This!**
"LiNa Ki Rani Bali tha Ceshma" - Li (crimson), Na (yellow), K (violet), Rb (red), Cs (blue)!

## Alkaline Earth Metals (Group 2)

**Physical Properties:**
- Harder than alkali metals
- Higher melting points
- Higher densities

**Chemical Properties:**

**1. Reaction with Water:**
Ca + 2H₂O → Ca(OH)₂ + H₂↑
(Be and Mg don't react with cold water)

**2. Reaction with Oxygen:**
2Mg + O₂ → 2MgO (burns with brilliant white light!)

**3. Reducing Nature:**
Used to extract metals from their oxides.

## Diagonal Relationship

Elements diagonally adjacent show similar properties due to similar charge/size ratio.

**Li ~ Mg:**
- Both form normal oxides (Li₂O, MgO)
- Carbonates decompose on heating
- Nitrates give NO₂ on heating
- Form covalent compounds

**Be ~ Al:**
- Both amphoteric (react with acids and bases)
- Form covalent compounds
- Chlorides are covalent and soluble in organic solvents
- Form carbides that give methane with water

## Important Compounds

**Sodium Hydroxide (NaOH) - Caustic Soda:**
- Prepared by electrolysis of brine (Castner-Kellner cell)
- Strong base, used in soap making, paper industry

**Sodium Carbonate (Na₂CO₃) - Washing Soda:**
- Prepared by Solvay process
- Used for softening hard water, glass manufacture

**Calcium Oxide (CaO) - Quick Lime:**
CaCO₃ → CaO + CO₂ (at 1070K)
- Used in cement, steel industry

**Calcium Carbonate (CaCO₃):**
- Marble, limestone, chalk are forms
- Used in construction, as antacid

**Plaster of Paris (CaSO₄·½H₂O):**
2CaSO₄·2H₂O → 2CaSO₄·½H₂O + 3H₂O (at 393K)

When mixed with water, it sets:
CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O

**💡 Did You Know?**
Portland cement is made by heating limestone and clay. It's named after Portland stone, a limestone quarried in England!

## Biological Importance

**Na⁺ and K⁺:**
- Maintain osmotic balance
- Nerve impulse transmission
- Na⁺/K⁺ pump in cell membranes

**Ca²⁺:**
- Bones and teeth (99% of body's calcium!)
- Muscle contraction
- Blood clotting

**Mg²⁺:**
- Chlorophyll (plant's green pigment)
- Enzyme activator
- Present in bones`,
    keyConcepts: JSON.stringify([
      { title: "Alkali Metals Properties", description: "Group 1 elements: soft, low density, highly reactive. React vigorously with water to form hydroxides and hydrogen gas." },
      { title: "Alkaline Earth Metals", description: "Group 2 elements: harder, higher melting points than Group 1. Less reactive but still form ionic compounds readily." },
      { title: "Reactivity Trends", description: "Reactivity increases down both groups as ionization energy decreases and atomic size increases." },
      { title: "Flame Test Colors", description: "Li-crimson, Na-yellow, K-violet, Rb-red violet, Cs-blue. Used to identify these metals." },
      { title: "Diagonal Relationship", description: "Li resembles Mg, Be resembles Al due to similar charge-to-size ratios. Important for understanding anomalous behavior." },
      { title: "Important Compounds", description: "NaOH (caustic soda), Na₂CO₃ (washing soda), CaO (quicklime), CaSO₄·½H₂O (Plaster of Paris)." },
      { title: "Biological Importance", description: "Na⁺/K⁺ for nerve impulses, Ca²⁺ for bones and muscles, Mg²⁺ in chlorophyll and enzymes." }
    ]),
    formulas: JSON.stringify([
      { name: "Reaction with Water", formula: "2M + 2H₂O → 2MOH + H₂", description: "Alkali metals react with water to form hydroxide and hydrogen gas. Reaction becomes more vigorous down the group." },
      { name: "Solvay Process", formula: "NaCl + NH₃ + CO₂ + H₂O → NaHCO₃ + NH₄Cl", description: "Industrial preparation of sodium carbonate. NaHCO₃ is heated to get Na₂CO₃." },
      { name: "Quick Lime Production", formula: "CaCO₃ → CaO + CO₂", description: "Thermal decomposition of limestone at 1070K to produce calcium oxide." },
      { name: "Plaster Setting", formula: "CaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O", description: "Plaster of Paris absorbs water and sets into hard gypsum." },
      { name: "Slaking of Lime", formula: "CaO + H₂O → Ca(OH)₂", description: "Quick lime reacts with water to form slaked lime (calcium hydroxide). Highly exothermic." }
    ]),
    difficultyLevel: 2,
    estimatedStudyMinutes: 95
  },
  {
    subject: "Chemistry",
    classLevel: "11",
    chapterNumber: 11,
    chapterTitle: "The p-Block Elements",
    introduction: "The p-block contains a diverse range of elements including metals, non-metals, and metalloids. This chapter focuses on Groups 13 (Boron family) and 14 (Carbon family), exploring their unique properties, important compounds, and applications in everyday life.",
    detailedNotes: `# The p-Block Elements (Groups 13 and 14)

The p-block elements are fascinating because they show the transition from non-metals to metals as we go down the group. Groups 13 and 14 are particularly important for their industrial applications!

## Group 13: The Boron Family

**Members:** B, Al, Ga, In, Tl

**Electronic Configuration:** ns² np¹

**General Trends:**

| Property | Trend Down the Group |
|----------|---------------------|
| Atomic radius | Increases |
| Ionization energy | Decreases (exception: Tl > In) |
| Electronegativity | Decreases |
| Metallic character | Increases |
| Oxidation state | +3 common; +1 becomes stable (Tl) |

**💡 Did You Know?**
Gallium metal melts in your hand! Its melting point is only 29.8°C, just below body temperature.

## Boron: The Metalloid

**Properties:**
- Non-metallic character
- Forms covalent compounds
- Extremely hard (9.3 on Mohs scale)

**Important Compounds:**

**Borax (Na₂B₄O₇·10H₂O):**
- Used in glass and ceramics
- Borax bead test for metal detection

Na₂B₄O₇·10H₂O → Na₂B₄O₇ → 2NaBO₂ + B₂O₃
(On heating, loses water and forms glassy mass)

**Boric Acid (H₃BO₃):**
- Weak monobasic acid
- Planar structure with H-bonding
- Used as antiseptic

**⚠️ Common Mistake Alert!**
Boric acid is monobasic, not tribasic! It acts as Lewis acid, accepting OH⁻ from water rather than donating H⁺.

H₃BO₃ + H₂O → B(OH)₄⁻ + H⁺

## Aluminum: The Useful Metal

**Properties:**
- Lightweight, silvery metal
- Good conductor of heat and electricity
- Amphoteric (reacts with acids and bases)
- Protected by oxide layer (passivation)

**Reactions:**

With acids: 2Al + 6HCl → 2AlCl₃ + 3H₂
With alkali: 2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂

**Important Compounds:**

**Alumina (Al₂O₃):**
- Corundum (natural), very hard
- Ruby (with Cr) and Sapphire (with Fe, Ti)

**Alums:** M⁺M³⁺(SO₄)₂·12H₂O
Example: K₂SO₄·Al₂(SO₄)₃·24H₂O (Potash alum)
- Used in water purification, dyeing

**🔑 Remember This!**
Aluminum is extracted by electrolysis of Al₂O₃ dissolved in cryolite (Na₃AlF₆) to lower the melting point from 2072°C to about 1000°C!

## Group 14: The Carbon Family

**Members:** C, Si, Ge, Sn, Pb

**Electronic Configuration:** ns² np²

**General Trends:**

| Property | Trend Down the Group |
|----------|---------------------|
| Atomic radius | Increases |
| Ionization energy | Decreases |
| Metallic character | Increases (C, Si nonmetal; Ge metalloid; Sn, Pb metals) |
| Oxidation states | +4 and +2; +2 becomes stable (Pb) |

**Inert Pair Effect:** 
Down the group, ns² electrons become reluctant to participate in bonding. Hence Pb shows +2 state more commonly than +4.

## Carbon: The Unique Element

**Allotropes:**
- **Diamond:** sp³, tetrahedral, hardest, insulator
- **Graphite:** sp², layers, soft, good conductor
- **Fullerene (C₆₀):** soccer ball structure
- **Graphene:** single layer of graphite, wonder material!

**💡 Did You Know?**
Graphene is 200 times stronger than steel yet lighter than paper, and conducts electricity better than copper!

**Catenation:** Carbon's ability to form long chains and rings with C-C bonds.
Order of catenation: C >> Si > Ge > Sn > Pb

## Important Carbon Compounds

**Carbon Monoxide (CO):**
- Colorless, odorless, poisonous
- Binds to hemoglobin 200x more than O₂
- Neutral oxide, reducing agent

**Carbon Dioxide (CO₂):**
- Colorless, odorless gas
- Acidic oxide: CO₂ + H₂O → H₂CO₃
- Greenhouse gas

## Silicon: The Semiconductor

**Properties:**
- Metalloid, semiconductor
- Forms SiO₂ (silica) - main component of sand

**Silicones:**
- Polymers with Si-O-Si backbone
- Water repellent, heat resistant
- Used in lubricants, sealants

**Zeolites:**
- Aluminosilicates with porous structure
- Used as molecular sieves, catalysts

## Oxides of Carbon and Silicon

| Property | CO₂ | SiO₂ |
|----------|-----|------|
| Structure | Linear molecule | Giant covalent |
| State | Gas | Solid |
| Melting point | -78°C (sublimes) | 1710°C |
| Reason | Weak forces | Strong Si-O bonds |

**⚠️ Common Mistake Alert!**
Unlike CO₂ which is molecular, SiO₂ has a giant covalent structure because Si cannot form stable π bonds due to its larger size!

## Tin and Lead

**Tin (Sn):**
- Two allotropes: grey (α) and white (β)
- Tin pest: white → grey below 13°C
- Used in alloys, tin plating

**Lead (Pb):**
- Dense, soft metal
- Pb²⁺ is more stable than Pb⁴⁺ (inert pair effect)
- Storage batteries, radiation shielding`,
    keyConcepts: JSON.stringify([
      { title: "Group 13 Overview", description: "Boron family: B (metalloid), Al, Ga, In, Tl (metals). Shows +3 oxidation state mainly, +1 becomes stable for Tl due to inert pair effect." },
      { title: "Aluminum's Amphoteric Nature", description: "Aluminum reacts with both acids and bases. Protected by oxide layer. Extracted by Hall-Héroult process." },
      { title: "Boron Compounds", description: "Borax (glass making), Boric acid (weak Lewis acid, antiseptic). Boron is electron deficient, forms unusual compounds." },
      { title: "Group 14 Overview", description: "Carbon family shows transition from non-metal (C, Si) to metalloid (Ge) to metals (Sn, Pb). Both +4 and +2 states shown." },
      { title: "Catenation and Allotropy", description: "Carbon's unique ability to form long chains (catenation). Allotropes: diamond, graphite, fullerene, graphene." },
      { title: "Inert Pair Effect", description: "Down the group, ns² electrons become reluctant to participate in bonding. Hence Pb prefers +2 over +4 state." },
      { title: "CO₂ vs SiO₂ Structure", description: "CO₂ is molecular (gas), SiO₂ is giant covalent (solid). Si can't form π bonds effectively due to larger size." }
    ]),
    formulas: JSON.stringify([
      { name: "Borax Decomposition", formula: "Na₂B₄O₇·10H₂O → Na₂B₄O₇ → 2NaBO₂ + B₂O₃", description: "Borax loses water on heating, then decomposes to sodium metaborate and boron trioxide." },
      { name: "Aluminum with Alkali", formula: "2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂", description: "Aluminum dissolves in alkali to form sodium aluminate and hydrogen gas." },
      { name: "Boric Acid Action", formula: "H₃BO₃ + H₂O → [B(OH)₄]⁻ + H⁺", description: "Boric acid acts as Lewis acid, accepting OH⁻ from water rather than donating H⁺." },
      { name: "CO₂ with Water", formula: "CO₂ + H₂O ⇌ H₂CO₃", description: "Carbon dioxide dissolves in water to form weak carbonic acid, making the solution slightly acidic." },
      { name: "Silica Structure", formula: "(SiO₂)n - giant covalent", description: "Each Si bonded to 4 oxygen atoms, each O bonded to 2 Si atoms. 3D network of Si-O bonds." },
      { name: "Alum Formula", formula: "M⁺M³⁺(SO₄)₂·12H₂O", description: "General formula for alums. Potash alum: K₂SO₄·Al₂(SO₄)₃·24H₂O, used in water purification." }
    ]),
    difficultyLevel: 3,
    estimatedStudyMinutes: 110
  }
];

export async function seedInorganicChemistryClass11() {
  console.log("Seeding Inorganic Chemistry Class 11 chapters...");
  
  for (const chapter of inorganicChemistryClass11Chapters) {
    try {
      const existingChapter = await db.query.chapterContent.findFirst({
        where: (c, { and, eq, ilike }) => and(
          ilike(c.subject, '%chemistry%'),
          eq(c.classLevel, chapter.classLevel),
          eq(c.chapterNumber, chapter.chapterNumber)
        )
      });

      if (existingChapter) {
        await db.update(chapterContent)
          .set({
            chapterTitle: chapter.chapterTitle,
            introduction: chapter.introduction,
            detailedNotes: chapter.detailedNotes,
            keyConcepts: chapter.keyConcepts,
            formulas: chapter.formulas,
            difficultyLevel: chapter.difficultyLevel,
            estimatedStudyMinutes: chapter.estimatedStudyMinutes,
            updatedAt: new Date()
          })
          .where(eq => eq(chapterContent.id, existingChapter.id));
        console.log(`Updated: ${chapter.chapterTitle}`);
      } else {
        await db.insert(chapterContent).values({
          subject: chapter.subject,
          classLevel: chapter.classLevel,
          chapterNumber: chapter.chapterNumber,
          chapterTitle: chapter.chapterTitle,
          introduction: chapter.introduction,
          detailedNotes: chapter.detailedNotes,
          keyConcepts: chapter.keyConcepts,
          formulas: chapter.formulas,
          difficultyLevel: chapter.difficultyLevel,
          estimatedStudyMinutes: chapter.estimatedStudyMinutes,
          status: "published",
          approvalStatus: "approved"
        });
        console.log(`Created: ${chapter.chapterTitle}`);
      }
    } catch (error) {
      console.error(`Error with chapter ${chapter.chapterTitle}:`, error);
    }
  }
  
  console.log("Inorganic Chemistry Class 11 seeding complete!");
}
