import { db } from '../db';
import { contentTopics, questions } from '../../shared/schema';
import { and, eq, sql } from 'drizzle-orm';

type QuestionSeed = {
  questionText: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  solutionDetail: string;
  solutionSteps?: string[];
  difficultyLevel: number;
  sourceType: string;
  relatedTopics: string[];
  pyqYear?: number | null;
};

type ChapterSeed = {
  chapterNumber: number;
  topicName: string;
  questions: QuestionSeed[];
};

const makeOptions = (a: string, b: string, c: string, d: string) => ([
  { id: 'A', text: a },
  { id: 'B', text: b },
  { id: 'C', text: c },
  { id: 'D', text: d },
]);

const chapters: ChapterSeed[] = [
  {
    chapterNumber: 1,
    topicName: 'The Solid State',
    questions: [
      {
        questionText: 'Packing efficiency of an fcc unit cell is:',
        options: makeOptions('52.4%', '68%', '74%', '100%'),
        correctAnswer: 'C',
        solutionDetail: 'Face centered cubic and hcp have maximum packing efficiency of 74%.',
        solutionSteps: ['Recall close packing efficiency', 'Select 74%'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['The Solid State', 'Chapter 1'],
      },
      {
        questionText: 'Schottky defect in an ionic crystal leads to:',
        options: makeOptions('Increase in density', 'Decrease in density', 'Color change only', 'No change in density'),
        correctAnswer: 'B',
        solutionDetail: 'Schottky defect removes ions from lattice, decreasing density.',
        solutionSteps: ['Identify defect type', 'Removed ions reduce density'],
        difficultyLevel: 2,
        sourceType: 'custom',
        relatedTopics: ['The Solid State', 'Chapter 1'],
      },
    ],
  },
  {
    chapterNumber: 2,
    topicName: 'Solutions',
    questions: [
      {
        questionText: 'Osmotic pressure of a dilute solution is given by:',
        options: makeOptions('pi = C R T', 'pi = Kb m', 'pi = Kf m', 'pi = P0 Xsolute'),
        correctAnswer: 'A',
        solutionDetail: 'For dilute solutions, osmotic pressure is pi = C R T.',
        solutionSteps: ['Recall colligative property formula', 'Select pi = C R T'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Solutions', 'Chapter 2'],
      },
      {
        questionText: 'Which concentration unit is temperature independent?',
        options: makeOptions('Molarity', 'Molality', 'Normality', 'Formality'),
        correctAnswer: 'B',
        solutionDetail: 'Molality depends on mass of solvent and is temperature independent.',
        solutionSteps: ['Volume varies with temperature', 'Mass does not'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Solutions', 'Chapter 2'],
      },
    ],
  },
  {
    chapterNumber: 3,
    topicName: 'Electrochemistry',
    questions: [
      {
        questionText: 'Nernst equation at 25 C is:',
        options: makeOptions('E = E0 - (0.059/n) log Q', 'E = E0 + (0.059/n) log Q', 'E = E0 - 0.118 log Q', 'E = E0 - 2.303 RT log Q'),
        correctAnswer: 'A',
        solutionDetail: 'At 25 C, E = E0 - (0.059/n) log Q.',
        solutionSteps: ['Recall Nernst equation at 25 C'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Electrochemistry', 'Chapter 3'],
      },
      {
        questionText: 'In a galvanic cell, the anode is the site of:',
        options: makeOptions('Reduction and is positive', 'Oxidation and is negative', 'Reduction and is negative', 'Oxidation and is positive'),
        correctAnswer: 'B',
        solutionDetail: 'Oxidation occurs at the anode; in a galvanic cell it is negative.',
        solutionSteps: ['Recall anode definition', 'Select oxidation and negative'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Electrochemistry', 'Chapter 3'],
      },
    ],
  },
  {
    chapterNumber: 4,
    topicName: 'Chemical Kinetics',
    questions: [
      {
        questionText: 'Half life of a first order reaction is:',
        options: makeOptions('Proportional to initial concentration', 'Independent of initial concentration', 'Zero for all reactions', 'Inversely proportional to time'),
        correctAnswer: 'B',
        solutionDetail: 'For first order, t1/2 = 0.693/k and is independent of initial concentration.',
        solutionSteps: ['Recall first order half life formula'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Chemical Kinetics', 'Chapter 4'],
      },
      {
        questionText: 'Arrhenius equation is:',
        options: makeOptions('k = A e^(-Ea/RT)', 'k = A e^(Ea/RT)', 'k = RT/Ea', 'k = Ea/RT'),
        correctAnswer: 'A',
        solutionDetail: 'Arrhenius equation relates k to activation energy and temperature.',
        solutionSteps: ['Recall Arrhenius equation'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Chemical Kinetics', 'Chapter 4'],
      },
    ],
  },
  {
    chapterNumber: 5,
    topicName: 'Surface Chemistry',
    questions: [
      {
        questionText: 'Physisorption is favored by:',
        options: makeOptions('High temperature and low pressure', 'Low temperature and high pressure', 'High temperature and high pressure', 'Low temperature and low pressure'),
        correctAnswer: 'B',
        solutionDetail: 'Physisorption is exothermic and increases at low temperature and high pressure.',
        solutionSteps: ['Recall temperature effect on adsorption'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Surface Chemistry', 'Chapter 5'],
      },
      {
        questionText: 'Tyndall effect is observed in:',
        options: makeOptions('True solutions', 'Colloids', 'Suspensions only', 'Gases only'),
        correctAnswer: 'B',
        solutionDetail: 'Colloids scatter light and show Tyndall effect.',
        solutionSteps: ['Recall Tyndall effect definition'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Surface Chemistry', 'Chapter 5'],
      },
    ],
  },
  {
    chapterNumber: 6,
    topicName: 'General Principles and Processes of Isolation of Elements',
    questions: [
      {
        questionText: 'Roasting is heating an ore:',
        options: makeOptions('In limited air', 'In excess air', 'In vacuum', 'With water'),
        correctAnswer: 'B',
        solutionDetail: 'Roasting is carried out in excess air, typically for sulfide ores.',
        solutionSteps: ['Recall definition of roasting'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Isolation of Elements', 'Chapter 6'],
      },
      {
        questionText: 'Cryolite is used in extraction of aluminum to:',
        options: makeOptions('Increase density', 'Lower melting point of alumina', 'Oxidize impurities', 'Act as fuel'),
        correctAnswer: 'B',
        solutionDetail: 'Cryolite lowers the melting point and increases conductivity.',
        solutionSteps: ['Recall Hall-Heroult process'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Isolation of Elements', 'Chapter 6'],
      },
    ],
  },
  {
    chapterNumber: 7,
    topicName: 'The p-Block Elements',
    questions: [
      {
        questionText: 'Acid strength of hydrogen halides increases in the order:',
        options: makeOptions('HI < HBr < HCl < HF', 'HF < HCl < HBr < HI', 'HCl < HF < HBr < HI', 'HF < HI < HBr < HCl'),
        correctAnswer: 'B',
        solutionDetail: 'Acidity increases from HF to HI as H-X bond strength decreases.',
        solutionSteps: ['Recall bond strength trend'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['The p-Block Elements', 'Chapter 7'],
      },
      {
        questionText: 'Ozone is:',
        options: makeOptions('O2', 'O3', 'O4', 'O5'),
        correctAnswer: 'B',
        solutionDetail: 'Ozone is the triatomic form of oxygen, O3.',
        solutionSteps: ['Recall ozone formula'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['The p-Block Elements', 'Chapter 7'],
      },
    ],
  },
  {
    chapterNumber: 8,
    topicName: 'The d- and f-Block Elements',
    questions: [
      {
        questionText: 'Variable oxidation states in transition metals are due to:',
        options: makeOptions('Large atomic size', 'Similar energies of ns and (n-1)d orbitals', 'Low melting points', 'Non metallic character'),
        correctAnswer: 'B',
        solutionDetail: 'ns and (n-1)d orbitals are close in energy, enabling multiple oxidation states.',
        solutionSteps: ['Recall electronic configuration'],
        difficultyLevel: 2,
        sourceType: 'custom',
        relatedTopics: ['The d- and f-Block Elements', 'Chapter 8'],
      },
      {
        questionText: 'Lanthanoid contraction explains the similarity between:',
        options: makeOptions('Na and K', 'Zr and Hf', 'Mg and Ca', 'F and Cl'),
        correctAnswer: 'B',
        solutionDetail: 'Lanthanoid contraction makes Zr and Hf similar in size.',
        solutionSteps: ['Recall lanthanoid contraction effect'],
        difficultyLevel: 2,
        sourceType: 'custom',
        relatedTopics: ['The d- and f-Block Elements', 'Chapter 8'],
      },
    ],
  },
  {
    chapterNumber: 9,
    topicName: 'Coordination Compounds',
    questions: [
      {
        questionText: 'Coordination number of Co in [Co(NH3)6]3+ is:',
        options: makeOptions('3', '4', '6', '8'),
        correctAnswer: 'C',
        solutionDetail: 'Six ammonia ligands coordinate to cobalt, giving coordination number 6.',
        solutionSteps: ['Count ligands'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Coordination Compounds', 'Chapter 9'],
      },
      {
        questionText: 'Strong field ligands generally produce:',
        options: makeOptions('High spin complexes', 'Low spin complexes', 'No splitting', 'Paramagnetism always'),
        correctAnswer: 'B',
        solutionDetail: 'Strong field ligands cause large splitting and low spin pairing.',
        solutionSteps: ['Recall ligand field strength'],
        difficultyLevel: 2,
        sourceType: 'custom',
        relatedTopics: ['Coordination Compounds', 'Chapter 9'],
      },
    ],
  },
  {
    chapterNumber: 10,
    topicName: 'Haloalkanes and Haloarenes',
    questions: [
      {
        questionText: 'SN1 reactions are favored by:',
        options: makeOptions('Primary haloalkanes', 'Secondary haloalkanes', 'Tertiary haloalkanes', 'Methyl halides'),
        correctAnswer: 'C',
        solutionDetail: 'SN1 proceeds via carbocation, most stable for tertiary substrates.',
        solutionSteps: ['Recall carbocation stability'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Haloalkanes and Haloarenes', 'Chapter 10'],
      },
      {
        questionText: 'Leaving group ability follows the order:',
        options: makeOptions('F- > Cl- > Br- > I-', 'I- > Br- > Cl- > F-', 'Cl- > Br- > I- > F-', 'Br- > I- > Cl- > F-'),
        correctAnswer: 'B',
        solutionDetail: 'Iodide is best leaving group; fluoride is poorest.',
        solutionSteps: ['Recall bond strength trend'],
        difficultyLevel: 2,
        sourceType: 'custom',
        relatedTopics: ['Haloalkanes and Haloarenes', 'Chapter 10'],
      },
    ],
  },
  {
    chapterNumber: 11,
    topicName: 'Alcohols, Phenols and Ethers',
    questions: [
      {
        questionText: 'Phenol is more acidic than ethanol because:',
        options: makeOptions('Higher molecular mass', 'Phenoxide ion is resonance stabilized', 'More hydrogen bonds', 'Ethanol is aromatic'),
        correctAnswer: 'B',
        solutionDetail: 'Resonance stabilizes phenoxide, increasing acidity.',
        solutionSteps: ['Compare conjugate base stability'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Alcohols, Phenols and Ethers', 'Chapter 11'],
      },
      {
        questionText: 'Williamson synthesis is used to prepare:',
        options: makeOptions('Alcohols', 'Ethers', 'Aldehydes', 'Ketones'),
        correctAnswer: 'B',
        solutionDetail: 'Alkoxide reacts with primary haloalkane to give ether.',
        solutionSteps: ['Recall Williamson reaction'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Alcohols, Phenols and Ethers', 'Chapter 11'],
      },
    ],
  },
  {
    chapterNumber: 12,
    topicName: 'Aldehydes, Ketones and Carboxylic Acids',
    questions: [
      {
        questionText: 'Tollens reagent gives silver mirror with:',
        options: makeOptions('Ketones', 'Aldehydes', 'Carboxylic acids', 'Ethers'),
        correctAnswer: 'B',
        solutionDetail: 'Aldehydes reduce Tollens reagent to metallic silver.',
        solutionSteps: ['Recall Tollens test'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Aldehydes, Ketones and Carboxylic Acids', 'Chapter 12'],
      },
      {
        questionText: 'Aldol condensation occurs in compounds with:',
        options: makeOptions('No alpha hydrogen', 'At least one alpha hydrogen', 'Only aromatic rings', 'Only carboxylic acids'),
        correctAnswer: 'B',
        solutionDetail: 'Alpha hydrogen enables enolate formation for aldol condensation.',
        solutionSteps: ['Recall requirement for aldol'],
        difficultyLevel: 2,
        sourceType: 'custom',
        relatedTopics: ['Aldehydes, Ketones and Carboxylic Acids', 'Chapter 12'],
      },
    ],
  },
  {
    chapterNumber: 13,
    topicName: 'Amines',
    questions: [
      {
        questionText: 'Carbylamine test is given by:',
        options: makeOptions('Primary amines only', 'Secondary amines only', 'Tertiary amines only', 'All amines'),
        correctAnswer: 'A',
        solutionDetail: 'Only primary amines form isocyanides in carbylamine test.',
        solutionSteps: ['Recall carbylamine test'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Amines', 'Chapter 13'],
      },
      {
        questionText: 'Diazotization of aniline is carried out at:',
        options: makeOptions('0 to 5 C', '25 C', '50 C', '100 C'),
        correctAnswer: 'A',
        solutionDetail: 'Diazonium salts are stable only at low temperatures.',
        solutionSteps: ['Recall diazonium stability'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Amines', 'Chapter 13'],
      },
    ],
  },
  {
    chapterNumber: 14,
    topicName: 'Biomolecules',
    questions: [
      {
        questionText: 'Which of the following is a non reducing sugar?',
        options: makeOptions('Glucose', 'Sucrose', 'Maltose', 'Lactose'),
        correctAnswer: 'B',
        solutionDetail: 'Sucrose has no free anomeric carbon and is non reducing.',
        solutionSteps: ['Recall reducing sugar concept'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Biomolecules', 'Chapter 14'],
      },
      {
        questionText: 'A peptide bond is:',
        options: makeOptions('-CO-NH-', '-CO-O-', '-NH-NH-', '-CO-CO-'),
        correctAnswer: 'A',
        solutionDetail: 'Peptide bond is an amide linkage between amino acids.',
        solutionSteps: ['Recall peptide bond structure'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Biomolecules', 'Chapter 14'],
      },
    ],
  },
  {
    chapterNumber: 15,
    topicName: 'Polymers',
    questions: [
      {
        questionText: 'Addition polymerization is characterized by:',
        options: makeOptions('Loss of small molecules', 'No byproduct formation', 'Requirement of two functional groups', 'Always condensation'),
        correctAnswer: 'B',
        solutionDetail: 'Addition polymerization proceeds without elimination of small molecules.',
        solutionSteps: ['Recall addition polymerization'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Polymers', 'Chapter 15'],
      },
      {
        questionText: 'Thermosetting polymers:',
        options: makeOptions('Can be remolded on heating', 'Cannot be remolded once set', 'Are always elastomers', 'Have weak intermolecular forces'),
        correctAnswer: 'B',
        solutionDetail: 'Thermosetting polymers form cross links and cannot be remolded.',
        solutionSteps: ['Recall thermoset behavior'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Polymers', 'Chapter 15'],
      },
    ],
  },
  {
    chapterNumber: 16,
    topicName: 'Chemistry in Everyday Life',
    questions: [
      {
        questionText: 'Antiseptics are:',
        options: makeOptions('Safe for living tissues', 'Used only on floors', 'Stronger than disinfectants', 'Always acids'),
        correctAnswer: 'A',
        solutionDetail: 'Antiseptics are mild and safe for living tissues.',
        solutionSteps: ['Recall definition of antiseptic'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Chemistry in Everyday Life', 'Chapter 16'],
      },
      {
        questionText: 'Soaps are ineffective in hard water because:',
        options: makeOptions('They are insoluble in cold water', 'They form scum with Ca2+ and Mg2+', 'They are acidic', 'They decompose in water'),
        correctAnswer: 'B',
        solutionDetail: 'Hard water ions form insoluble scum with soaps.',
        solutionSteps: ['Recall hard water effect'],
        difficultyLevel: 1,
        sourceType: 'custom',
        relatedTopics: ['Chemistry in Everyday Life', 'Chapter 16'],
      },
    ],
  },
];

async function ensureTopicId(topicName: string, chapterNumber: number) {
  const existing = await db
    .select({ id: contentTopics.id })
    .from(contentTopics)
    .where(
      and(
        eq(contentTopics.subject, 'Chemistry'),
        eq(contentTopics.classLevel, '12'),
        eq(contentTopics.topicName, topicName)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    return existing[0].id;
  }

  const inserted = await db
    .insert(contentTopics)
    .values({
      subject: 'Chemistry',
      classLevel: '12',
      topicName,
      ncertChapter: `Chapter ${chapterNumber}`,
      referenceBooks: ['NCERT Chemistry'],
    })
    .returning({ id: contentTopics.id });

  return inserted[0].id;
}

async function seedChemistryClass12Questions() {
  console.log('Seeding Chemistry Class 12 practice questions...');

  for (const chapter of chapters) {
    const topicId = await ensureTopicId(chapter.topicName, chapter.chapterNumber);
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(questions)
      .where(eq(questions.topicId, topicId));
    const existingCount = Number(countResult[0]?.count ?? 0);

    if (existingCount >= chapter.questions.length) {
      console.log(`  Chapter ${chapter.chapterNumber}: already has ${existingCount} questions, skipping`);
      continue;
    }

    const payload = chapter.questions.map((question) => ({
      topicId,
      questionText: question.questionText,
      options: question.options,
      correctAnswer: question.correctAnswer,
      solutionDetail: question.solutionDetail,
      solutionSteps: question.solutionSteps ?? [],
      difficultyLevel: question.difficultyLevel,
      sourceType: question.sourceType,
      relatedTopics: question.relatedTopics,
      pyqYear: question.pyqYear ?? null,
    }));

    await db.insert(questions).values(payload);
    console.log(`  Chapter ${chapter.chapterNumber}: inserted ${payload.length} questions`);
  }

  console.log('Chemistry Class 12 practice questions seeding completed!');
}

seedChemistryClass12Questions().catch(console.error);
