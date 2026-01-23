import { db } from "../db";
import { contentTopics, questions } from "../../shared/schema";
import { eq } from "drizzle-orm";

interface SeedPayload {
  id: number;
  name: string;
  chapter: string;
  reference: string;
  questions: Array<{
    text: string;
    options: Array<{ id: string; text: string }>;
    correctAnswer: string;
    solution: string;
    difficulty: number;
    relatedTopics?: string[];
  }>;
}

const TOPIC_SEEDS: SeedPayload[] = [
  {
    id: 2103,
    name: "Hydrocarbons Mastery",
    chapter: "Hydrocarbons",
    reference: "NCERT Class 11 Chemistry - Chapter 13",
    questions: [
      {
        text: "Which statement about alkanes is correct?",
        options: [
          { id: "A", text: "They contain at least one double bond" },
          { id: "B", text: "General formula is CnH2n+2" },
          { id: "C", text: "They undergo electrophilic substitution easily" },
          { id: "D", text: "They are planar molecules" },
        ],
        correctAnswer: "B",
        solution:
          "Alkanes are saturated hydrocarbons with general formula CnH2n+2 and tetrahedral geometry at carbon.",
        difficulty: 1,
      },
      {
        text: "Which reagent pair is best suited for converting an alkene to an alcohol via hydroboration-oxidation?",
        options: [
          { id: "A", text: "HBr, ROOR" },
          { id: "B", text: "BH3/THF followed by H2O2, OH-" },
          { id: "C", text: "KMnO4 (conc.) + H2SO4" },
          { id: "D", text: "NaNH2, NH3 (liq.)" },
        ],
        correctAnswer: "B",
        solution:
          "Hydroboration-oxidation with BH3/THF then alkaline H2O2 gives anti-Markovnikov alcohols from alkenes.",
        difficulty: 2,
      },
      {
        text: "Benzene reacts with Cl2 in presence of AlCl3 to give chlorobenzene. The reaction type is:",
        options: [
          { id: "A", text: "Nucleophilic substitution" },
          { id: "B", text: "Electrophilic substitution" },
          { id: "C", text: "Free radical substitution" },
          { id: "D", text: "Addition" },
        ],
        correctAnswer: "B",
        solution:
          "Aromatic halogenation proceeds via electrophilic substitution with Lewis acid catalysts such as AlCl3.",
        difficulty: 1,
      },
      {
        text: "Which of the following reagents is best for oxidative cleavage of an alkyne to carboxylic acids?",
        options: [
          { id: "A", text: "O3 followed by Zn/H2O" },
          { id: "B", text: "KMnO4 (hot, acidic)" },
          { id: "C", text: "NaBH4" },
          { id: "D", text: "H2/Pd" },
        ],
        correctAnswer: "B",
        solution:
          "Hot, acidic KMnO4 cleaves alkynes to carboxylic acids (terminal alkyne yields CO2 + acid).",
        difficulty: 2,
      },
      {
        text: "Which conformation of butane has the highest potential energy?",
        options: [
          { id: "A", text: "Anti" },
          { id: "B", text: "Gauche" },
          { id: "C", text: "Eclipsed (methyl-methyl overlap)" },
          { id: "D", text: "Eclipsed (methyl-hydrogen overlap)" },
        ],
        correctAnswer: "C",
        solution:
          "The eclipsed conformation where methyl groups overlap suffers maximum torsional strain and is highest in energy.",
        difficulty: 2,
      },
    ],
  },
  {
    id: 2104,
    name: "Classification of Elements",
    chapter: "Classification of Elements and Periodicity",
    reference: "NCERT Class 11 Chemistry - Chapter 3",
    questions: [
      {
        text: "Modern periodic law states that the properties of elements are periodic functions of their:",
        options: [
          { id: "A", text: "Atomic masses" },
          { id: "B", text: "Atomic numbers" },
          { id: "C", text: "Valence electrons only" },
          { id: "D", text: "Densities" },
        ],
        correctAnswer: "B",
        solution:
          "Modern periodic law correlates chemical properties with atomic number, not mass.",
        difficulty: 1,
      },
      {
        text: "Which block contains elements with general outer configuration ns2 np1-6?",
        options: [
          { id: "A", text: "s-block" },
          { id: "B", text: "p-block" },
          { id: "C", text: "d-block" },
          { id: "D", text: "f-block" },
        ],
        correctAnswer: "B",
        solution:
          "p-block elements have valence shell ns2 np1-6 and show great variability in properties.",
        difficulty: 1,
      },
      {
        text: "Lanthanide contraction is responsible for:",
        options: [
          { id: "A", text: "High atomic masses of lanthanides" },
          { id: "B", text: "Similar radii of Zr and Hf" },
          { id: "C", text: "Allotropy in phosphorus" },
          { id: "D", text: "Magnetism in d-block elements" },
        ],
        correctAnswer: "B",
        solution:
          "Poor shielding by 4f electrons contracts lanthanide radii causing 4d and 5d elements to have comparable sizes (e.g., Zr & Hf).",
        difficulty: 2,
      },
      {
        text: "Electronegativity generally increases across a period because:",
        options: [
          { id: "A", text: "Atomic radius decreases and effective nuclear charge increases" },
          { id: "B", text: "Atomic radius increases" },
          { id: "C", text: "Shielding effect increases" },
          { id: "D", text: "Valence electrons decrease" },
        ],
        correctAnswer: "A",
        solution:
          "Higher effective nuclear charge and smaller radii cause atoms to attract bonding electrons more strongly across a period.",
        difficulty: 1,
      },
      {
        text: "Which element has the highest first ionization enthalpy among the following?",
        options: [
          { id: "A", text: "Li" },
          { id: "B", text: "Na" },
          { id: "C", text: "K" },
          { id: "D", text: "Rb" },
        ],
        correctAnswer: "A",
        solution:
          "Ionization enthalpy decreases down the alkali metal group due to increasing size; Li has the highest value.",
        difficulty: 1,
      },
    ],
  },
  {
    id: 2105,
    name: "Coordination Compounds Essentials",
    chapter: "Coordination Compounds",
    reference: "NCERT Class 12 Chemistry - Chapter 9",
    questions: [
      {
        text: "The coordination number of Co in [Co(NH3)6]Cl3 is:",
        options: [
          { id: "A", text: "3" },
          { id: "B", text: "4" },
          { id: "C", text: "6" },
          { id: "D", text: "8" },
        ],
        correctAnswer: "C",
        solution:
          "Six ammonia ligands coordinate to cobalt giving coordination number 6.",
        difficulty: 1,
      },
      {
        text: "Which ligand is bidentate?",
        options: [
          { id: "A", text: "Cl-" },
          { id: "B", text: "NH3" },
          { id: "C", text: "en (ethane-1,2-diamine)" },
          { id: "D", text: "CN-" },
        ],
        correctAnswer: "C",
        solution:
          "Ethane-1,2-diamine (en) has two donor nitrogen atoms and chelates metal centers.",
        difficulty: 1,
      },
      {
        text: "The IUPAC name of [Fe(CN)6]4- is:",
        options: [
          { id: "A", text: "Hexacyanoferrate(I)" },
          { id: "B", text: "Hexacyanoferrate(II)" },
          { id: "C", text: "Hexacyanoferrate(III)" },
          { id: "D", text: "Hexacyanoferrate(IV)" },
        ],
        correctAnswer: "B",
        solution:
          "The complex carries a 4- charge; CN- is -1 so Fe is in +2 state, giving hexacyanoferrate(II).",
        difficulty: 2,
      },
      {
        text: "Crystal field splitting in octahedral complexes (Delta o) depends on:",
        options: [
          { id: "A", text: "Only metal oxidation state" },
          { id: "B", text: "Only ligand size" },
          { id: "C", text: "Nature of metal and ligand field strength" },
          { id: "D", text: "Temperature alone" },
        ],
        correctAnswer: "C",
        solution:
          "Both the metal ion (charge, period) and ligand position in the spectrochemical series influence Delta o.",
        difficulty: 2,
      },
      {
        text: "Which complex shows linkage isomerism?",
        options: [
          { id: "A", text: "[Co(NH3)6]Cl3" },
          { id: "B", text: "[Co(NO2)(NH3)5]2+" },
          { id: "C", text: "[Fe(CN)6]4-" },
          { id: "D", text: "[Ni(CO)4]" },
        ],
        correctAnswer: "B",
        solution:
          "The NO2- ligand can bind through N (nitro) or O (nitrito), giving linkage isomers.",
        difficulty: 2,
      },
    ],
  },
  {
    id: 2106,
    name: "Alcohols, Phenols and Ethers Core",
    chapter: "Alcohols, Phenols and Ethers",
    reference: "NCERT Class 12 Chemistry - Chapter 11",
    questions: [
      {
        text: "Which alcohol shows immediate turbidity with Lucas reagent (ZnCl2/HCl) at room temperature?",
        options: [
          { id: "A", text: "Primary alcohol" },
          { id: "B", text: "Secondary alcohol" },
          { id: "C", text: "Tertiary alcohol" },
          { id: "D", text: "Phenol" },
        ],
        correctAnswer: "C",
        solution:
          "Tertiary carbocations form fastest; therefore tertiary alcohols give instantaneous turbidity in the Lucas test.",
        difficulty: 1,
      },
      {
        text: "Reimer–Tiemann reaction of phenol with chloroform and NaOH produces:",
        options: [
          { id: "A", text: "Salicylic acid" },
          { id: "B", text: "Salicylaldehyde" },
          { id: "C", text: "2,4,6-tribromophenol" },
          { id: "D", text: "Benzoquinone" },
        ],
        correctAnswer: "B",
        solution:
          "The Reimer–Tiemann reaction introduces an –CHO group ortho to the hydroxyl group, forming salicylaldehyde.",
        difficulty: 2,
      },
      {
        text: "Which combination is best suited for synthesising an unsymmetrical ether using Williamson synthesis?",
        options: [
          { id: "A", text: "t-BuBr + sodium t-butoxide" },
          { id: "B", text: "CH3Br + sodium phenoxide" },
          { id: "C", text: "Benzyl chloride + sodium tert-butoxide" },
          { id: "D", text: "2-bromopropane + sodium methoxide" },
        ],
        correctAnswer: "B",
        solution:
          "Williamson synthesis proceeds via SN2, so a primary alkyl halide (CH3Br) with a strong alkoxide (phenoxide) works efficiently.",
        difficulty: 2,
      },
      {
        text: "Which of the following gives a positive iodoform test?",
        options: [
          { id: "A", text: "Methanol" },
          { id: "B", text: "2-propanol" },
          { id: "C", text: "tert-butanol" },
          { id: "D", text: "Phenol" },
        ],
        correctAnswer: "B",
        solution:
          "Iodoform test is given by methyl carbinols (CH3–CH(OH)–R). 2-propanol fits this requirement and yields yellow CHI3.",
        difficulty: 1,
      },
      {
        text: "Which option correctly lists the decreasing order of acidity?",
        options: [
          { id: "A", text: "Phenol > p-nitrophenol > ethanol" },
          { id: "B", text: "p-Nitrophenol > phenol > ethanol" },
          { id: "C", text: "Ethanol > phenol > p-nitrophenol" },
          { id: "D", text: "Phenol > ethanol > water" },
        ],
        correctAnswer: "B",
        solution:
          "Electron withdrawing nitro group increases acidity; thus p-nitrophenol is stronger than phenol, which is more acidic than ethanol.",
        difficulty: 1,
      },
    ],
  },
  {
    id: 2107,
    name: "Advanced Problem Solving Drill",
    chapter: "Advanced Problem Solving",
    reference: "ZeroPage Chemistry Chapter 31",
    questions: [
      {
        text: "A buffer contains 0.20 M NH3 and 0.20 M NH4Cl (pKa = 9.25). If 0.010 mol of HCl is added to 1 L of the buffer, what is the new pH?",
        options: [
          { id: "A", text: "9.04" },
          { id: "B", text: "9.21" },
          { id: "C", text: "9.40" },
          { id: "D", text: "9.55" },
        ],
        correctAnswer: "B",
        solution:
          "After adding HCl, [NH3] becomes 0.19 M and [NH4+] becomes 0.21 M. pH = pKa + log([base]/[acid]) = 9.25 + log(0.19/0.21) ≈ 9.21.",
        difficulty: 3,
      },
      {
        text: "For the equilibrium 2 SO2(g) + O2(g) ⇌ 2 SO3(g) at 700 K with Kp = 64, what does the reaction do if PSO2 = 2 atm, PO2 = 1 atm and PSO3 = 4 atm?",
        options: [
          { id: "A", text: "Remains at equilibrium" },
          { id: "B", text: "Shifts forward (toward SO3)" },
          { id: "C", text: "Shifts backward (toward SO2)" },
          { id: "D", text: "Cannot be predicted" },
        ],
        correctAnswer: "B",
        solution:
          "Reaction quotient Qp = (4^2)/(2^2 × 1) = 4, which is less than Kp (64). The system will reduce Qp by forming more SO3.",
        difficulty: 2,
      },
      {
        text: "Calculate Ecell at 298 K for Zn|Zn2+(0.010 M)||Cu2+(1.0 M)|Cu. (E°Zn2+/Zn = -0.76 V, E°Cu2+/Cu = +0.34 V)",
        options: [
          { id: "A", text: "1.04 V" },
          { id: "B", text: "1.10 V" },
          { id: "C", text: "1.16 V" },
          { id: "D", text: "1.22 V" },
        ],
        correctAnswer: "C",
        solution:
          "E°cell = 1.10 V. Apply Nernst: E = E° − (0.059/n) log([Zn2+]/[Cu2+]) = 1.10 − 0.0295 log(0.01) = 1.10 + 0.059 ≈ 1.16 V.",
        difficulty: 2,
      },
      {
        text: "A 0.50 mol sample of CaCO3 is heated strongly. What volume of CO2 (at STP) is released and what mass of CaO remains?",
        options: [
          { id: "A", text: "11.2 L CO2 and 28 g CaO" },
          { id: "B", text: "22.4 L CO2 and 28 g CaO" },
          { id: "C", text: "11.2 L CO2 and 56 g CaO" },
          { id: "D", text: "22.4 L CO2 and 56 g CaO" },
        ],
        correctAnswer: "A",
        solution:
          "0.50 mol CaCO3 → 0.50 mol CO2 (11.2 L) and 0.50 mol CaO (28 g). Stoichiometry is 1:1.",
        difficulty: 1,
      },
      {
        text: "In an SN1 solvolysis of tert-butyl chloride, which change increases the rate most significantly?",
        options: [
          { id: "A", text: "Using a stronger nucleophile" },
          { id: "B", text: "Increasing [H2O]" },
          { id: "C", text: "Using a more polar protic solvent" },
          { id: "D", text: "Cooling the reaction" },
        ],
        correctAnswer: "C",
        solution:
          "SN1 rate depends on carbocation formation; more polar protic solvents stabilize ions and accelerate ionization.",
        difficulty: 2,
      },
    ],
  },
  {
    id: 2108,
    name: "Full-Length Mock Simulation",
    chapter: "Full-Length Mock Test",
    reference: "ZeroPage Chemistry Chapter 32",
    questions: [
      {
        text: "Which reagent selectively oxidises primary alcohols to aldehydes without over oxidation?",
        options: [
          { id: "A", text: "KMnO4 / H+" },
          { id: "B", text: "PCC (pyridinium chlorochromate)" },
          { id: "C", text: "Conc. HNO3" },
          { id: "D", text: "O3 / Zn" },
        ],
        correctAnswer: "B",
        solution:
          "PCC is a mild oxidising agent that stops at the aldehyde stage, unlike KMnO4 or HNO3.",
        difficulty: 2,
      },
      {
        text: "Which process increases the entropy of the system?",
        options: [
          { id: "A", text: "Condensation of steam" },
          { id: "B", text: "Crystallisation of NaCl" },
          { id: "C", text: "Melting of ice" },
          { id: "D", text: "Formation of NH4Cl(s) from NH3 and HCl gases" },
        ],
        correctAnswer: "C",
        solution:
          "Melting involves conversion of an ordered solid into a less ordered liquid, so entropy increases.",
        difficulty: 1,
      },
      {
        text: "The major product of chlorination of methane in presence of UV light is CH3Cl. The step in which chlorine radicals are regenerated is called:",
        options: [
          { id: "A", text: "Initiation" },
          { id: "B", text: "Propagation" },
          { id: "C", text: "Termination" },
          { id: "D", text: "Chain inhibition" },
        ],
        correctAnswer: "B",
        solution:
          "Propagation steps consume and regenerate radicals, sustaining the chain (Cl· + CH4 → HCl + CH3· followed by CH3· + Cl2 → CH3Cl + Cl·).",
        difficulty: 2,
      },
      {
        text: "Which pair of solutions will form a precipitate when mixed?",
        options: [
          { id: "A", text: "AgNO3 and NaCl" },
          { id: "B", text: "Na2SO4 and Ba(NO3)2" },
          { id: "C", text: "NaCl and KNO3" },
          { id: "D", text: "NH4NO3 and Na2CO3" },
        ],
        correctAnswer: "A",
        solution:
          "AgCl is insoluble (Ksp ≈ 10^-10), so a white AgCl precipitate forms immediately.",
        difficulty: 1,
      },
      {
        text: "For the reaction A → products, a plot of ln[A] vs. time is linear. Which statement is correct?",
        options: [
          { id: "A", text: "The reaction is zero order with rate = k" },
          { id: "B", text: "The reaction is first order with t1/2 = 0.693/k" },
          { id: "C", text: "The reaction is second order with rate = k[A]^2" },
          { id: "D", text: "The reaction must be third order" },
        ],
        correctAnswer: "B",
        solution:
          "A linear ln[A] vs. time plot indicates first-order kinetics. The half-life is constant and equals 0.693/k.",
        difficulty: 2,
      },
    ],
  },
  {
    id: 2109,
    name: "Topic-Wise Mastery Tests",
    chapter: "Topic-Wise Mastery",
    reference: "ZeroPage Chemistry Chapter 33",
    questions: [
      {
        text: "0.25 mol of CaCO3 contains how many oxygen atoms?",
        options: [
          { id: "A", text: "1.5 × 10^23" },
          { id: "B", text: "3.0 × 10^23" },
          { id: "C", text: "4.5 × 10^23" },
          { id: "D", text: "6.0 × 10^23" },
        ],
        correctAnswer: "C",
        solution:
          "Each CaCO3 unit has three oxygen atoms. 0.25 mol × 3 gives 0.75 mol of O atoms, i.e., 0.75 × 6.022 × 10^23 ≈ 4.5 × 10^23 atoms.",
        difficulty: 2,
        relatedTopics: ["Physical Chemistry - Part 1"],
      },
      {
        text: "A first-order reaction has k = 3.0 × 10^-3 s^-1. What is its half-life?",
        options: [
          { id: "A", text: "77 s" },
          { id: "B", text: "110 s" },
          { id: "C", text: "231 s" },
          { id: "D", text: "333 s" },
        ],
        correctAnswer: "C",
        solution:
          "For first-order kinetics t1/2 = 0.693/k = 0.693 / (3.0 × 10^-3) ≈ 231 s.",
        difficulty: 2,
        relatedTopics: ["Physical Chemistry - Part 2"],
      },
      {
        text: "Which element shows the highest electronegativity?",
        options: [
          { id: "A", text: "Phosphorus" },
          { id: "B", text: "Arsenic" },
          { id: "C", text: "Antimony" },
          { id: "D", text: "Bismuth" },
        ],
        correctAnswer: "A",
        solution:
          "Electronegativity decreases down a group. Among group 15 members listed, phosphorus sits highest and is therefore most electronegative.",
        difficulty: 1,
        relatedTopics: ["Inorganic Chemistry - Part 1"],
      },
      {
        text: "Which complex shows the largest crystal field splitting?",
        options: [
          { id: "A", text: "[FeF6]3-" },
          { id: "B", text: "[Fe(H2O)6]3+" },
          { id: "C", text: "[Fe(CN)6]3-" },
          { id: "D", text: "[FeCl6]3-" },
        ],
        correctAnswer: "C",
        solution:
          "CN- is a strong-field ligand, giving large Δo, whereas halides and water are weak-field ligands.",
        difficulty: 3,
        relatedTopics: ["Inorganic Chemistry - Part 2"],
      },
      {
        text: "Which change increases the rate of an SN2 reaction the most?",
        options: [
          { id: "A", text: "Use a bulky tertiary halide" },
          { id: "B", text: "Use a stronger nucleophile in polar aprotic solvent" },
          { id: "C", text: "Increase the leaving group strength only" },
          { id: "D", text: "Add a Lewis acid catalyst" },
        ],
        correctAnswer: "B",
        solution:
          "SN2 reactions require strong nucleophiles and minimal steric hindrance; polar aprotic solvents enhance nucleophile reactivity.",
        difficulty: 2,
        relatedTopics: ["Organic Chemistry - Part 1"],
      },
      {
        text: "Benedict's solution gives a positive test with which compound?",
        options: [
          { id: "A", text: "Acetone" },
          { id: "B", text: "Acetaldehyde" },
          { id: "C", text: "Acetophenone" },
          { id: "D", text: "Diethyl ether" },
        ],
        correctAnswer: "B",
        solution:
          "Benedict's (or Fehling's) test detects aldehydes with an α-hydrogen; acetaldehyde reduces Cu2+ to Cu2O.",
        difficulty: 1,
        relatedTopics: ["Organic Chemistry - Part 2"],
      },
    ],
  },
  {
    id: 2110,
    name: "Final Mock Simulation",
    chapter: "Final Mock Test",
    reference: "ZeroPage Chemistry Chapter 42",
    questions: [
      {
        text: "What volume will 0.25 mol of CO2 occupy at STP?",
        options: [
          { id: "A", text: "5.6 L" },
          { id: "B", text: "11.2 L" },
          { id: "C", text: "22.4 L" },
          { id: "D", text: "44.8 L" },
        ],
        correctAnswer: "A",
        solution: "One mole of gas occupies 22.4 L at STP, so 0.25 mol occupies 22.4/4 = 5.6 L.",
        difficulty: 1,
        relatedTopics: ["Physical Chemistry"],
      },
      {
        text: "Which statement about the contact process catalyst is correct?",
        options: [
          { id: "A", text: "A platinum catalyst is used" },
          { id: "B", text: "V2O5 on silica is the active catalyst" },
          { id: "C", text: "Catalyst is unnecessary" },
          { id: "D", text: "Zinc oxide is used to remove oxygen" },
        ],
        correctAnswer: "B",
        solution: "Vanadium(V) oxide supported on silica catalyses SO2 oxidation during the contact process.",
        difficulty: 2,
        relatedTopics: ["Inorganic Chemistry"],
      },
      {
        text: "Which alcohol will react fastest with Lucas reagent?",
        options: ["1-Propanol", "2-Propanol", "2-Methyl-2-propanol", "Methanol"],
        correctAnswer: "C",
        solution: "The tertiary alcohol forms a carbocation rapidly, giving immediate turbidity in the Lucas test.",
        difficulty: 1,
        relatedTopics: ["Organic Chemistry"],
      },
      {
        text: "In the complex [Fe(CN)6]4-, the oxidation state of iron and magnetic behaviour are:",
        options: [
          { id: "A", text: "+2 and diamagnetic" },
          { id: "B", text: "+3 and diamagnetic" },
          { id: "C", text: "+2 and paramagnetic" },
          { id: "D", text: "+3 and paramagnetic" },
        ],
        correctAnswer: "A",
        solution:
          "Each CN- carries -1 charge, so Fe is +2. CN- is strong-field leading to all electrons paired and diamagnetism.",
        difficulty: 2,
        relatedTopics: ["Coordination Compounds"],
      },
      {
        text: "Which kinetic plot is linear for a zero-order reaction?",
        options: [
          { id: "A", text: "[A] vs. t" },
          { id: "B", text: "ln[A] vs. t" },
          { id: "C", text: "1/[A] vs. t" },
          { id: "D", text: "[A]^2 vs. t" },
        ],
        correctAnswer: "A",
        solution: "Zero-order reactions show a linear decrease of concentration with time: [A] = [A]0 - kt.",
        difficulty: 2,
        relatedTopics: ["Chemical Kinetics"],
      },
    ],
  },
  {
    id: 2111,
    name: "Solid State Practice Pack",
    chapter: "The Solid State",
    reference: "ZeroPage Chemistry Chapter 45",
    questions: [
      {
        text: "Which statement best describes a crystalline solid?",
        options: [
          { id: "A", text: "Isotropic with gradual softening" },
          { id: "B", text: "Long-range order with a sharp melting point" },
          { id: "C", text: "Never conducts electricity in any state" },
          { id: "D", text: "Unit cells lack periodicity" },
        ],
        correctAnswer: "B",
        solution: "Crystalline solids show long-range order, are anisotropic, and melt sharply.",
        difficulty: 1,
        relatedTopics: ["Solid State Basics"],
      },
      {
        text: "For an fcc lattice with atomic radius r, the edge length a is given by:",
        options: [
          { id: "A", text: "a = 2r" },
          { id: "B", text: "a = 2√2 r" },
          { id: "C", text: "a = 4r" },
          { id: "D", text: "a = √3 r" },
        ],
        correctAnswer: "B",
        solution:
          "Face diagonal = 4r = √2 a for an fcc cell; hence a = 4r/√2 = 2√2 r.",
        difficulty: 2,
        relatedTopics: ["Unit Cells"],
      },
      {
        text: "A Schottky defect in NaCl leads to which consequence?",
        options: [
          { id: "A", text: "Cation occupies interstitial site" },
          { id: "B", text: "Equal number of cation and anion vacancies, lowering density" },
          { id: "C", text: "Electrons trapped in anion vacancy producing colour" },
          { id: "D", text: "Only anion vacancies formed" },
        ],
        correctAnswer: "B",
        solution:
          "Schottky defects remove one cation and one anion from the lattice, reducing density.",
        difficulty: 2,
        relatedTopics: ["Crystal Defects"],
      },
      {
        text: "An n-type semiconductor is formed by:",
        options: [
          { id: "A", text: "Doping silicon with aluminium" },
          { id: "B", text: "Doping with group 15 elements providing donor electrons" },
          { id: "C", text: "Introducing acceptor impurities" },
          { id: "D", text: "Lowering temperature to decrease conductivity" },
        ],
        correctAnswer: "B",
        solution:
          "Group 15 dopants (P, As) provide extra electrons, making electrons the majority carriers in n-type materials.",
        difficulty: 1,
        relatedTopics: ["Semiconductors"],
      },
      {
        text: "The number of tetrahedral voids present in a close-packed arrangement of N spheres is:",
        options: [
          { id: "A", text: "N/2" },
          { id: "B", text: "N" },
          { id: "C", text: "2N" },
          { id: "D", text: "N^2" },
        ],
        correctAnswer: "C",
        solution:
          "Each sphere contributes two tetrahedral voids in ccp/hcp arrangements; thus total tetrahedral voids = 2N.",
        difficulty: 2,
        relatedTopics: ["Packing Efficiency"],
      },
    ],
  },
  {
    id: 2112,
    name: "Comprehensive Mixed Revision",
    chapter: "Chapter 28 Mixed Revision",
    reference: "ZeroPage Chemistry Chapter 28",
    questions: [
      {
        text: "How many atoms are present in 0.5 mol of glucose (C6H12O6)?",
        options: [
          { id: "A", text: "3.01 × 10^23" },
          { id: "B", text: "6.02 × 10^23" },
          { id: "C", text: "1.81 × 10^24" },
          { id: "D", text: "7.23 × 10^24" },
        ],
        correctAnswer: "D",
        solution:
          "0.5 mol corresponds to 0.5 × 6.022 × 10^23 = 3.011 × 10^23 molecules. Each molecule has 24 atoms, giving 7.23 × 10^24 atoms in total.",
        difficulty: 2,
        relatedTopics: ["Mole Concept"],
      },
      {
        text: "Which statement is correct for a spontaneous process at constant temperature and pressure?",
        options: [
          { id: "A", text: "ΔG > 0 and ΔH < 0" },
          { id: "B", text: "ΔG < 0 and ΔH > 0" },
          { id: "C", text: "ΔG < 0" },
          { id: "D", text: "ΔG = 0" },
        ],
        correctAnswer: "C",
        solution:
          "The Gibbs free energy change must be negative (ΔG < 0) for a spontaneous process under constant temperature and pressure.",
        difficulty: 1,
        relatedTopics: ["Thermodynamics"],
      },
      {
        text: "According to VSEPR theory, ammonia (NH3) has which molecular geometry?",
        options: [
          { id: "A", text: "Tetrahedral" },
          { id: "B", text: "Trigonal planar" },
          { id: "C", text: "Trigonal pyramidal" },
          { id: "D", text: "Bent" },
        ],
        correctAnswer: "C",
        solution:
          "NH3 has three bond pairs and one lone pair leading to a trigonal pyramidal geometry (sp3 hybridisation).",
        difficulty: 1,
        relatedTopics: ["Chemical Bonding"],
      },
      {
        text: "For PCl5(g) ⇌ PCl3(g) + Cl2(g) at 400 K, KP = 0.04 atm. What is KC? (R = 0.082 L atm mol^-1 K^-1)",
        options: [
          { id: "A", text: "0.04 M" },
          { id: "B", text: "1.2 × 10^-3 M" },
          { id: "C", text: "1.32 M" },
          { id: "D", text: "0.0012 M" },
        ],
        correctAnswer: "B",
        solution:
          "KP = KC(RT)^Δn with Δn = 1. KC = KP/(RT) = 0.04 ÷ (0.082 × 400) ≈ 1.2 × 10^-3 M.",
        difficulty: 2,
        relatedTopics: ["Chemical Equilibrium"],
      },
      {
        text: "Which alcohol gives immediate turbidity with Lucas reagent (ZnCl2/HCl) at room temperature?",
        options: [
          { id: "A", text: "1-Butanol" },
          { id: "B", text: "2-Propanol" },
          { id: "C", text: "2-Methyl-2-propanol" },
          { id: "D", text: "Methanol" },
        ],
        correctAnswer: "C",
        solution:
          "Tertiary alcohols form carbocations rapidly; tert-butanol therefore responds instantly to the Lucas test.",
        difficulty: 2,
        relatedTopics: ["Alcohols, Phenols and Ethers"],
      },
    ],
  },
];

async function seedTopics() {
  for (const topic of TOPIC_SEEDS) {
    console.log(`📘 Seeding topic ${topic.id} (${topic.name})`);

    await db
      .insert(contentTopics)
      .values({
        id: topic.id,
        subject: "Chemistry",
        classLevel: "11/12",
        topicName: topic.name,
        ncertChapter: topic.chapter,
        referenceBooks: [topic.reference],
      })
      .onConflictDoUpdate({
        target: contentTopics.id,
        set: {
          subject: "Chemistry",
          classLevel: "11/12",
          topicName: topic.name,
          ncertChapter: topic.chapter,
          referenceBooks: [topic.reference],
        },
      });

    await db.delete(questions).where(eq(questions.topicId, topic.id));

    await db.insert(questions).values(
      topic.questions.map((q, index) => ({
        topicId: topic.id,
        questionText: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer,
        solutionDetail: q.solution,
        difficultyLevel: q.difficulty,
        sourceType: "chemistry_topic_fix",
        relatedTopics: q.relatedTopics ?? [],
        questionTextFormat: "text",
        id: undefined,
      })),
    );
  }

  console.log("✅ Completed chemistry topic realignment seeds.");
}

seedTopics()
  .then(() => {
    console.log("Seeding finished.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
