import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { chapterContent } from "@shared/schema";

type Visualization = {
  type: string;
  title: string;
  description: string;
};

const visualsByChapter: Record<number, Visualization[]> = {
  1: [
    {
      type: "flowchart",
      title: "Mole Concept Map",
      description: "Moles <-> mass <-> particles using Avogadro number.",
    },
    {
      type: "table",
      title: "SI Units and Prefixes",
      description: "Common base units and metric prefixes used in chemistry.",
    },
    {
      type: "diagram",
      title: "Empirical to Molecular Formula",
      description: "Stepwise path from composition to molecular formula.",
    },
    {
      type: "graph",
      title: "Mass vs Moles",
      description: "Linear relationship between mass and moles for a compound.",
    },
    {
      type: "comparison",
      title: "Mixture vs Compound",
      description: "Key differences in composition and properties.",
    },
  ],
  2: [
    {
      type: "diagram",
      title: "Bohr Model Energy Levels",
      description: "Electrons in discrete orbits around the nucleus.",
    },
    {
      type: "flowchart",
      title: "Electron Configuration Rules",
      description: "Aufbau -> Pauli -> Hund for filling orbitals.",
    },
    {
      type: "table",
      title: "Quantum Numbers Summary",
      description: "n, l, m, s and their allowed values.",
    },
    {
      type: "diagram",
      title: "Orbital Shapes",
      description: "s, p, d orbital shapes and orientations.",
    },
    {
      type: "graph",
      title: "Photoelectric Effect Trend",
      description: "Kinetic energy vs frequency (threshold concept).",
    },
  ],
  3: [
    {
      type: "diagram",
      title: "Phase Diagram",
      description: "Solid-liquid-gas regions with critical and triple points.",
    },
    {
      type: "graph",
      title: "Maxwell-Boltzmann Distribution",
      description: "Molecular speed distribution at different temperatures.",
    },
    {
      type: "flowchart",
      title: "Gas Law Relationships",
      description: "Boyle, Charles, Gay-Lussac -> ideal gas law.",
    },
    {
      type: "table",
      title: "Ideal vs Real Gases",
      description: "Key differences and conditions for deviation.",
    },
    {
      type: "comparison",
      title: "Intermolecular Forces",
      description: "Dispersion, dipole-dipole, hydrogen bonding.",
    },
  ],
  4: [
    {
      type: "diagram",
      title: "Enthalpy Profile",
      description: "Endothermic vs exothermic energy diagrams.",
    },
    {
      type: "flowchart",
      title: "First Law of Thermodynamics",
      description: "Energy in -> system change -> energy out.",
    },
    {
      type: "graph",
      title: "Gibbs Free Energy vs Temperature",
      description: "Spontaneity trends for different reactions.",
    },
    {
      type: "table",
      title: "State vs Path Functions",
      description: "Internal energy, enthalpy vs heat, work.",
    },
    {
      type: "diagram",
      title: "Hess Law Cycle",
      description: "Energy cycle for calculating reaction enthalpy.",
    },
  ],
  5: [
    {
      type: "graph",
      title: "Equilibrium Concentration",
      description: "Concentration vs time showing equilibrium plateau.",
    },
    {
      type: "flowchart",
      title: "Le Chatelier Shifts",
      description: "Change in pressure, temperature, concentration -> shift.",
    },
    {
      type: "table",
      title: "Kc and Kp",
      description: "Relationship between Kc, Kp, and partial pressures.",
    },
    {
      type: "diagram",
      title: "Acid-Base pH Scale",
      description: "Strong acids to strong bases with pH range.",
    },
    {
      type: "comparison",
      title: "Homogeneous vs Heterogeneous",
      description: "Equilibrium in single vs multiple phases.",
    },
  ],
  6: [
    {
      type: "flowchart",
      title: "Oxidation Number Method",
      description: "Assign -> balance -> equalize -> finalize.",
    },
    {
      type: "table",
      title: "Oxidizing vs Reducing Agents",
      description: "Common agents and their roles in redox.",
    },
    {
      type: "diagram",
      title: "Electrochemical Cell",
      description: "Anode, cathode, salt bridge, and electron flow.",
    },
    {
      type: "graph",
      title: "Electrode Potential Scale",
      description: "Relative tendency to gain electrons.",
    },
    {
      type: "comparison",
      title: "Ionic vs Electron Transfer",
      description: "Redox in ionic reactions vs direct electron transfer.",
    },
  ],
  7: [
    {
      type: "graph",
      title: "Rate vs Concentration",
      description: "Orders of reaction from rate-concentration plots.",
    },
    {
      type: "diagram",
      title: "Activation Energy Profile",
      description: "Energy barrier and transition state.",
    },
    {
      type: "table",
      title: "Order vs Half-Life",
      description: "Zero, first, second order half-life formulas.",
    },
    {
      type: "flowchart",
      title: "Factors Affecting Rate",
      description: "Concentration -> temperature -> catalysts -> surface area.",
    },
    {
      type: "graph",
      title: "Arrhenius Plot",
      description: "ln(k) vs 1/T with slope -Ea/R.",
    },
  ],
  8: [
    {
      type: "table",
      title: "Periodic Trends",
      description: "Atomic radius, IE, EA, EN across period and group.",
    },
    {
      type: "graph",
      title: "Ionization Energy Trend",
      description: "IE vs atomic number with periodic peaks and dips.",
    },
    {
      type: "diagram",
      title: "Modern Periodic Table Blocks",
      description: "s, p, d, f blocks with group positions.",
    },
    {
      type: "comparison",
      title: "Block Properties",
      description: "General trends for s, p, d, f blocks.",
    },
    {
      type: "flowchart",
      title: "From Mendeleev to Modern",
      description: "Evolution from atomic mass to atomic number.",
    },
  ],
  12: [
    {
      type: "diagram",
      title: "Bond-Line vs Expanded",
      description: "Converting between skeletal and full structures.",
    },
    {
      type: "table",
      title: "Functional Groups",
      description: "Common groups with IUPAC suffix/prefix.",
    },
    {
      type: "flowchart",
      title: "IUPAC Naming Steps",
      description: "Parent chain -> numbering -> substituents -> suffix.",
    },
    {
      type: "comparison",
      title: "Inductive vs Resonance",
      description: "Electron-withdrawing and delocalization effects.",
    },
    {
      type: "diagram",
      title: "Hybridization Shapes",
      description: "sp, sp2, sp3 geometry and bond angles.",
    },
  ],
  13: [
    {
      type: "diagram",
      title: "Hydrocarbon Classes",
      description: "Alkanes, alkenes, alkynes, aromatics overview.",
    },
    {
      type: "flowchart",
      title: "Alkene Addition Reactions",
      description: "Hydrogenation, halogenation, hydration steps.",
    },
    {
      type: "table",
      title: "Physical Properties Trends",
      description: "Boiling points vs chain length and branching.",
    },
    {
      type: "comparison",
      title: "Aromatic vs Aliphatic",
      description: "Structure, stability, and reaction types.",
    },
    {
      type: "diagram",
      title: "Benzene Resonance",
      description: "Delocalized pi system representation.",
    },
  ],
  14: [
    {
      type: "diagram",
      title: "Atmospheric Layers",
      description: "Troposphere to stratosphere and beyond.",
    },
    {
      type: "graph",
      title: "CO2 Rise Over Time",
      description: "Increasing CO2 concentration trend.",
    },
    {
      type: "flowchart",
      title: "Ozone Depletion Cycle",
      description: "CFCs -> radicals -> ozone breakdown.",
    },
    {
      type: "table",
      title: "Major Pollutants",
      description: "Sources and effects of key air pollutants.",
    },
    {
      type: "comparison",
      title: "Biodegradable vs Non-biodegradable",
      description: "Decomposition behavior and impact.",
    },
  ],
  15: [
    {
      type: "flowchart",
      title: "Purification Steps",
      description: "Crystallization -> filtration -> drying -> testing.",
    },
    {
      type: "diagram",
      title: "Distillation Setup",
      description: "Simple and fractional distillation apparatus.",
    },
    {
      type: "table",
      title: "Chromatography Types",
      description: "Paper, TLC, column, GC, and HPLC overview.",
    },
    {
      type: "comparison",
      title: "Qualitative vs Quantitative",
      description: "Identification vs measurement methods.",
    },
    {
      type: "diagram",
      title: "Melting/Boiling Point Check",
      description: "Basic purity check using thermal constants.",
    },
  ],
  16: [
    {
      type: "diagram",
      title: "VSEPR Shapes",
      description: "Linear, trigonal planar, tetrahedral, trigonal bipyramidal.",
    },
    {
      type: "table",
      title: "Bond Types",
      description: "Ionic, covalent, metallic, hydrogen bonding summary.",
    },
    {
      type: "comparison",
      title: "Sigma vs Pi Bonds",
      description: "Overlap type and bond characteristics.",
    },
    {
      type: "diagram",
      title: "Hybridization Geometry",
      description: "sp, sp2, sp3 shapes and angles.",
    },
    {
      type: "graph",
      title: "Lattice Energy Trend",
      description: "Effect of ionic radius on lattice energy.",
    },
  ],
  17: [
    {
      type: "flowchart",
      title: "Hydrogen Preparation",
      description: "Lab and industrial methods overview.",
    },
    {
      type: "diagram",
      title: "Hydrogen Bonding in Water",
      description: "Network of hydrogen bonds and properties.",
    },
    {
      type: "table",
      title: "Isotopes of Hydrogen",
      description: "Protium, deuterium, tritium with properties.",
    },
    {
      type: "comparison",
      title: "Types of Hydrides",
      description: "Ionic, covalent, metallic hydrides comparison.",
    },
    {
      type: "diagram",
      title: "Fuel Cell Layout",
      description: "Basic hydrogen-oxygen fuel cell components.",
    },
  ],
  18: [
    {
      type: "table",
      title: "Group 1 vs Group 2 Trends",
      description: "Size, reactivity, ionization energy comparisons.",
    },
    {
      type: "graph",
      title: "Atomic Radius Trend",
      description: "Increase down the group for alkali metals.",
    },
    {
      type: "diagram",
      title: "Flame Test Colors",
      description: "Characteristic colors for common s-block elements.",
    },
    {
      type: "flowchart",
      title: "Metal Extraction Steps",
      description: "Key steps for Na or Mg production.",
    },
    {
      type: "comparison",
      title: "Alkali vs Alkaline Earth",
      description: "Valency and compound differences.",
    },
  ],
  19: [
    {
      type: "table",
      title: "Group 13/14 Oxidation States",
      description: "Common oxidation states and stability trends.",
    },
    {
      type: "diagram",
      title: "Allotropes Overview",
      description: "Carbon and silicon structural forms.",
    },
    {
      type: "comparison",
      title: "Boron vs Aluminum",
      description: "Anomalous behavior and bonding differences.",
    },
    {
      type: "graph",
      title: "Catenation Tendency",
      description: "Extent of catenation down the group.",
    },
    {
      type: "flowchart",
      title: "Key Compounds",
      description: "Borax -> boric acid -> silicates pathway.",
    },
  ],
};

export async function seedChemistryClass11Visualizations() {
  console.log("Seeding Chemistry Class 11 visualizations...");

  const entries = Object.entries(visualsByChapter);
  for (const [chapterKey, visuals] of entries) {
    const chapterNumber = Number(chapterKey);
    const updated = await db
      .update(chapterContent)
      .set({ visualizationsData: visuals })
      .where(
        and(
          eq(chapterContent.subject, "Chemistry"),
          eq(chapterContent.classLevel, "11"),
          eq(chapterContent.chapterNumber, chapterNumber)
        )
      )
      .returning({ id: chapterContent.id });

    if (updated.length === 0) {
      console.log(
        `No Chemistry Class 11 chapter found for ${chapterNumber}, skipping.`
      );
    } else {
      console.log(
        `Updated Chemistry Class 11 chapter ${chapterNumber} with ${visuals.length} visuals.`
      );
    }
  }

  console.log("Chemistry Class 11 visualization seeding complete.");
}

seedChemistryClass11Visualizations()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding Chemistry Class 11 visuals:", error);
    process.exit(1);
  });
