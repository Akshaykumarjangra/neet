import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { chapterContent } from "@shared/schema";

type Metadata = {
  learningObjectives: string[];
  prerequisites: string[];
  importantTopics: string[];
};

const metadataByChapter: Record<number, Metadata> = {
  1: {
    learningObjectives: [
      "Explain the mole concept and Avogadro number.",
      "Calculate molar mass, percent composition, and empirical formula.",
      "Solve stoichiometry problems with limiting reagent.",
      "Use concentration units for solutions.",
    ],
    prerequisites: [
      "Basic arithmetic and unit conversions.",
      "Atoms, molecules, and chemical formulas.",
      "Simple algebra for ratio calculations.",
    ],
    importantTopics: [
      "Laws of chemical combination.",
      "Mole concept and molar mass.",
      "Empirical vs molecular formula.",
      "Limiting reagent and percent yield.",
      "Concentration units (M, m, %).",
    ],
  },
  2: {
    learningObjectives: [
      "Describe key atomic models and their evidence.",
      "Explain quantum numbers and orbital shapes.",
      "Write electronic configurations using rules.",
      "Relate spectra to energy levels.",
    ],
    prerequisites: [
      "Basic atomic structure.",
      "Waves and electromagnetic spectrum basics.",
      "Algebra and proportional reasoning.",
    ],
    importantTopics: [
      "Rutherford and Bohr models.",
      "Quantum numbers and orbitals.",
      "Aufbau, Pauli, and Hund rules.",
      "Electronic configuration.",
      "Hydrogen spectrum.",
    ],
  },
  3: {
    learningObjectives: [
      "Apply gas laws to solve numerical problems.",
      "Explain kinetic theory assumptions and results.",
      "Compare ideal and real gases.",
      "Relate intermolecular forces to properties.",
    ],
    prerequisites: [
      "Pressure, temperature, and density concepts.",
      "Unit conversions and algebra.",
      "Basic particle model of matter.",
    ],
    importantTopics: [
      "Boyle, Charles, and Avogadro laws.",
      "Ideal gas equation and RMS speed.",
      "Kinetic theory of gases.",
      "Intermolecular forces.",
      "Real gas behavior and van der Waals.",
    ],
  },
  4: {
    learningObjectives: [
      "Apply the first law of thermodynamics.",
      "Calculate enthalpy changes and use Hess law.",
      "Explain entropy and Gibbs free energy.",
      "Predict spontaneity from sign of delta G.",
    ],
    prerequisites: [
      "Heat, work, and energy concepts.",
      "Basic algebra and graphs.",
      "Logarithms for equilibrium relations.",
    ],
    importantTopics: [
      "System, surroundings, and state functions.",
      "Enthalpy and thermochemical equations.",
      "Hess law and bond enthalpy.",
      "Entropy and Gibbs free energy.",
      "Spontaneity criteria.",
    ],
  },
  5: {
    learningObjectives: [
      "Write equilibrium constant expressions.",
      "Use Le Chatelier principle for predictions.",
      "Calculate pH for acids, bases, and buffers.",
      "Apply solubility product in precipitation.",
    ],
    prerequisites: [
      "Stoichiometry and concentration calculations.",
      "Logarithms and pH scale basics.",
      "Acid-base concepts.",
    ],
    importantTopics: [
      "Kc, Kp, and reaction quotient.",
      "Le Chatelier principle.",
      "Acid-base equilibria and pH.",
      "Buffers and Henderson-Hasselbalch.",
      "Solubility product and common ion effect.",
    ],
  },
  6: {
    learningObjectives: [
      "Assign oxidation numbers correctly.",
      "Balance redox equations by oxidation number method.",
      "Identify oxidizing and reducing agents.",
      "Relate redox to electrochemical concepts.",
    ],
    prerequisites: [
      "Basic chemical reactions and balancing.",
      "Electron transfer concept.",
    ],
    importantTopics: [
      "Oxidation number rules.",
      "Redox balancing methods.",
      "Disproportionation and comproportionation.",
      "Oxidizing vs reducing agents.",
      "Electrochemical cell basics.",
    ],
  },
  7: {
    learningObjectives: [
      "Define rate law and order of reaction.",
      "Use integrated rate equations and half-life.",
      "Determine activation energy from Arrhenius equation.",
      "Explain effect of temperature and catalysts.",
    ],
    prerequisites: [
      "Concentration units.",
      "Logarithms and simple graphing.",
    ],
    importantTopics: [
      "Rate law and order.",
      "Integrated rate equations.",
      "Half-life relations.",
      "Arrhenius equation.",
      "Catalysis and activation energy.",
    ],
  },
  8: {
    learningObjectives: [
      "Explain modern periodic law and table structure.",
      "Predict periodic trends across periods and groups.",
      "Relate electron configuration to properties.",
      "Compare s, p, d, and f block characteristics.",
    ],
    prerequisites: [
      "Atomic structure and electron configuration.",
      "Basic chemical bonding ideas.",
    ],
    importantTopics: [
      "Periodic table structure.",
      "Atomic radius, IE, EA, EN trends.",
      "Valence electrons and reactivity.",
      "Block classification.",
      "Anomalous trends.",
    ],
  },
  12: {
    learningObjectives: [
      "Identify functional groups and write structures.",
      "Apply IUPAC naming rules.",
      "Explain hybridization and bond geometry.",
      "Use inductive and resonance effects.",
    ],
    prerequisites: [
      "Chemical bonding basics.",
      "Valency and Lewis structures.",
    ],
    importantTopics: [
      "Functional groups and classification.",
      "IUPAC nomenclature.",
      "Hybridization and geometry.",
      "Isomerism basics.",
      "Inductive and resonance effects.",
    ],
  },
  13: {
    learningObjectives: [
      "Classify hydrocarbons and write structures.",
      "Predict reactions of alkanes, alkenes, and alkynes.",
      "Explain aromaticity and benzene stability.",
      "Compare addition and substitution reactions.",
    ],
    prerequisites: [
      "Organic nomenclature and hybridization.",
      "Basic bonding and isomerism.",
    ],
    importantTopics: [
      "Alkanes, alkenes, alkynes.",
      "Addition and substitution reactions.",
      "Benzene structure and aromaticity.",
      "Physical property trends.",
      "Important reactions of hydrocarbons.",
    ],
  },
  14: {
    learningObjectives: [
      "Identify major air and water pollutants.",
      "Explain greenhouse effect and ozone depletion.",
      "Describe acid rain and its impacts.",
      "Apply green chemistry ideas.",
    ],
    prerequisites: [
      "Basic chemistry of gases and acids.",
      "Environmental awareness basics.",
    ],
    importantTopics: [
      "Air and water pollution sources.",
      "Greenhouse gases and global warming.",
      "Ozone layer and CFCs.",
      "Acid rain formation.",
      "Green chemistry principles.",
    ],
  },
  15: {
    learningObjectives: [
      "Choose appropriate purification methods.",
      "Explain distillation and crystallization.",
      "Use chromatography for separation.",
      "Apply basic tests for purity.",
    ],
    prerequisites: [
      "Physical properties and phase changes.",
      "Basic lab safety and procedures.",
    ],
    importantTopics: [
      "Sublimation and crystallization.",
      "Simple, fractional, and steam distillation.",
      "Chromatography methods.",
      "Melting and boiling point checks.",
      "Qualitative analysis basics.",
    ],
  },
  16: {
    learningObjectives: [
      "Explain ionic and covalent bond formation.",
      "Predict shapes using VSEPR theory.",
      "Use hybridization to describe geometry.",
      "Compare bond length, bond energy, and polarity.",
    ],
    prerequisites: [
      "Atomic structure and electron configuration.",
      "Basic valency and Lewis structures.",
    ],
    importantTopics: [
      "Ionic vs covalent bonding.",
      "VSEPR and molecular geometry.",
      "Hybridization and bond angles.",
      "Resonance and bond order.",
      "Polarity and dipole moment.",
    ],
  },
  17: {
    learningObjectives: [
      "Describe isotopes and position of hydrogen.",
      "Compare hydrides and hydrogen bonding.",
      "Explain preparation and uses of hydrogen.",
      "Relate hydrogen bonding to water properties.",
    ],
    prerequisites: [
      "Periodic trends and bonding.",
      "Basic chemical reactions.",
    ],
    importantTopics: [
      "Hydrogen isotopes.",
      "Hydrides and their classification.",
      "Hydrogen bonding.",
      "Preparation methods.",
      "Fuel cells and uses.",
    ],
  },
  18: {
    learningObjectives: [
      "Explain properties of alkali and alkaline earth metals.",
      "Describe important compounds and uses.",
      "Apply trends down the groups.",
      "Identify flame test colors.",
    ],
    prerequisites: [
      "Periodic trends.",
      "Basic ionic bonding.",
    ],
    importantTopics: [
      "Group 1 and Group 2 trends.",
      "Reactivity and oxidation states.",
      "Important compounds (Na2CO3, CaCO3).",
      "Flame test colors.",
      "Hardness and hydration trends.",
    ],
  },
  19: {
    learningObjectives: [
      "Compare group 13 and 14 trends.",
      "Describe key compounds and uses.",
      "Explain catenation and allotropy.",
      "Identify anomalous behavior of first elements.",
    ],
    prerequisites: [
      "Periodic trends and bonding basics.",
      "Oxidation states.",
    ],
    importantTopics: [
      "Group 13 and 14 properties.",
      "Boron and aluminum chemistry.",
      "Carbon and silicon allotropes.",
      "Catenation and oxidation states.",
      "Important compounds (borax, boric acid, silicates).",
    ],
  },
};

export async function seedChemistryClass11Metadata() {
  console.log("Seeding Chemistry Class 11 metadata...");

  for (const [chapterKey, metadata] of Object.entries(metadataByChapter)) {
    const chapterNumber = Number(chapterKey);
    const updated = await db
      .update(chapterContent)
      .set({
        learningObjectives: metadata.learningObjectives,
        prerequisites: metadata.prerequisites,
        importantTopics: metadata.importantTopics,
      })
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
        `Updated Chemistry Class 11 chapter ${chapterNumber} metadata.`
      );
    }
  }

  console.log("Chemistry Class 11 metadata seeding complete.");
}

seedChemistryClass11Metadata()
  .then(() => {
    console.log("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding Chemistry Class 11 metadata:", error);
    process.exit(1);
  });
