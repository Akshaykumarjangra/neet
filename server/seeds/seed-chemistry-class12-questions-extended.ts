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
        questionText: 'Coordination number in a bcc lattice is:',
        options: makeOptions('4', '6', '8', '12'),
        correctAnswer: 'C',
        solutionDetail: 'Each atom in bcc touches 8 neighbors.',
        solutionSteps: ['Recall coordination numbers of lattices'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['The Solid State', 'Chapter 1'],
        pyqYear: 2020,
      },
      {
        questionText: 'Number of atoms per unit cell in fcc is:',
        options: makeOptions('1', '2', '4', '6'),
        correctAnswer: 'C',
        solutionDetail: 'fcc has 8 corner atoms (1 total) and 6 face atoms (3 total), giving 4.',
        solutionSteps: ['Count contribution from corners and faces'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['The Solid State', 'Chapter 1'],
      },
    ],
  },
  {
    chapterNumber: 2,
    topicName: 'Solutions',
    questions: [
      {
        questionText: 'For ideal NaCl solution, van t Hoff factor is approximately:',
        options: makeOptions('0.5', '1', '2', '3'),
        correctAnswer: 'C',
        solutionDetail: 'NaCl dissociates into Na+ and Cl-, giving i about 2.',
        solutionSteps: ['Count ions formed per formula unit'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Solutions', 'Chapter 2'],
        pyqYear: 2019,
      },
      {
        questionText: 'Henry\'s law is expressed as:',
        options: makeOptions('p = kH x', 'p = kH / x', 'p = kH T', 'p = kH + x'),
        correctAnswer: 'A',
        solutionDetail: 'Henry\'s law states partial pressure is proportional to mole fraction: p = kH x.',
        solutionSteps: ['Recall Henry\'s law form'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Solutions', 'Chapter 2'],
      },
    ],
  },
  {
    chapterNumber: 3,
    topicName: 'Electrochemistry',
    questions: [
      {
        questionText: 'A cell reaction is spontaneous when:',
        options: makeOptions('Ecell = 0', 'Ecell > 0', 'Ecell < 0', 'Ecell = 1'),
        correctAnswer: 'B',
        solutionDetail: 'Positive cell potential indicates spontaneity.',
        solutionSteps: ['Relate Ecell to spontaneity'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Electrochemistry', 'Chapter 3'],
      },
      {
        questionText: 'The Faraday constant is approximately:',
        options: makeOptions('9650 C mol^-1', '96500 C mol^-1', '96.5 C mol^-1', '9.65 C mol^-1'),
        correctAnswer: 'B',
        solutionDetail: 'Faraday constant is about 96500 C per mole of electrons.',
        solutionSteps: ['Recall value of Faraday constant'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Electrochemistry', 'Chapter 3'],
        pyqYear: 2021,
      },
    ],
  },
  {
    chapterNumber: 4,
    topicName: 'Chemical Kinetics',
    questions: [
      {
        questionText: 'Half life of a zero order reaction is:',
        options: makeOptions('Independent of initial concentration', 'Directly proportional to initial concentration', 'Inversely proportional to initial concentration', 'Always equal to 0.693/k'),
        correctAnswer: 'B',
        solutionDetail: 'For zero order, t1/2 = [A]0 / 2k, proportional to initial concentration.',
        solutionSteps: ['Recall zero order half life formula'],
        difficultyLevel: 2,
        sourceType: 'ncert',
        relatedTopics: ['Chemical Kinetics', 'Chapter 4'],
      },
      {
        questionText: 'Units of rate constant for a first order reaction are:',
        options: makeOptions('mol L^-1 s^-1', 'L mol^-1 s^-1', 's^-1', 'mol^2 L^-2 s^-1'),
        correctAnswer: 'C',
        solutionDetail: 'First order rate constant has units of s^-1.',
        solutionSteps: ['Use rate law dimensions'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Chemical Kinetics', 'Chapter 4'],
        pyqYear: 2018,
      },
    ],
  },
  {
    chapterNumber: 5,
    topicName: 'Surface Chemistry',
    questions: [
      {
        questionText: 'Langmuir adsorption isotherm assumes:',
        options: makeOptions('Multilayer adsorption', 'Monolayer adsorption', 'No adsorption', 'Only chemisorption'),
        correctAnswer: 'B',
        solutionDetail: 'Langmuir isotherm assumes monolayer adsorption on a uniform surface.',
        solutionSteps: ['Recall assumptions of Langmuir model'],
        difficultyLevel: 2,
        sourceType: 'ncert',
        relatedTopics: ['Surface Chemistry', 'Chapter 5'],
      },
      {
        questionText: 'Gold number is related to:',
        options: makeOptions('Coagulation value', 'Protective power of colloids', 'pH of sol', 'Rate of adsorption'),
        correctAnswer: 'B',
        solutionDetail: 'Gold number measures protective power of a lyophilic colloid.',
        solutionSteps: ['Recall definition of gold number'],
        difficultyLevel: 2,
        sourceType: 'pyq',
        relatedTopics: ['Surface Chemistry', 'Chapter 5'],
        pyqYear: 2017,
      },
    ],
  },
  {
    chapterNumber: 6,
    topicName: 'General Principles and Processes of Isolation of Elements',
    questions: [
      {
        questionText: 'Froth flotation is used to concentrate:',
        options: makeOptions('Oxide ores', 'Sulfide ores', 'Carbonate ores', 'Halide ores'),
        correctAnswer: 'B',
        solutionDetail: 'Froth flotation selectively concentrates sulfide ores.',
        solutionSteps: ['Recall ore concentration methods'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Isolation of Elements', 'Chapter 6'],
        pyqYear: 2022,
      },
      {
        questionText: 'Zone refining is used for obtaining:',
        options: makeOptions('Highly pure Si and Ge', 'Iron', 'Copper', 'Aluminum'),
        correctAnswer: 'A',
        solutionDetail: 'Zone refining gives ultra pure semiconductors like Si and Ge.',
        solutionSteps: ['Recall purification method for semiconductors'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Isolation of Elements', 'Chapter 6'],
      },
    ],
  },
  {
    chapterNumber: 7,
    topicName: 'The p-Block Elements',
    questions: [
      {
        questionText: 'Among oxoacids of chlorine, the strongest acid is:',
        options: makeOptions('HClO', 'HClO2', 'HClO3', 'HClO4'),
        correctAnswer: 'D',
        solutionDetail: 'Acid strength increases with oxidation state; HClO4 is strongest.',
        solutionSteps: ['Use oxidation state trend'],
        difficultyLevel: 2,
        sourceType: 'pyq',
        relatedTopics: ['The p-Block Elements', 'Chapter 7'],
        pyqYear: 2020,
      },
      {
        questionText: 'NH3 is more basic than PH3 because:',
        options: makeOptions('Nitrogen is larger', 'Lone pair in NH3 is more available', 'PH3 is aromatic', 'NH3 has pi bonds'),
        correctAnswer: 'B',
        solutionDetail: 'Smaller size and higher electronegativity make the lone pair in NH3 more available.',
        solutionSteps: ['Compare lone pair availability'],
        difficultyLevel: 2,
        sourceType: 'ncert',
        relatedTopics: ['The p-Block Elements', 'Chapter 7'],
      },
    ],
  },
  {
    chapterNumber: 8,
    topicName: 'The d- and f-Block Elements',
    questions: [
      {
        questionText: 'Color of transition metal compounds is due to:',
        options: makeOptions('s to p transitions', 'd to d transitions', 'n to p transitions', 'p to d transitions only'),
        correctAnswer: 'B',
        solutionDetail: 'Partially filled d orbitals allow d-d transitions giving color.',
        solutionSteps: ['Recall cause of color in transition metals'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['The d- and f-Block Elements', 'Chapter 8'],
      },
      {
        questionText: 'Scandium commonly shows which oxidation state?',
        options: makeOptions('+1', '+2', '+3', '+4'),
        correctAnswer: 'C',
        solutionDetail: 'Scandium typically exhibits +3 oxidation state.',
        solutionSteps: ['Recall common oxidation states'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['The d- and f-Block Elements', 'Chapter 8'],
        pyqYear: 2018,
      },
    ],
  },
  {
    chapterNumber: 9,
    topicName: 'Coordination Compounds',
    questions: [
      {
        questionText: 'IUPAC name of [Co(NH3)6]Cl3 is:',
        options: makeOptions('Hexaamminecobalt(III) chloride', 'Trichlorohexamminecobalt(III)', 'Cobalt(III) hexamine chloride', 'Hexaamminecobaltate(III) chloride'),
        correctAnswer: 'A',
        solutionDetail: 'The complex cation is hexaamminecobalt(III); chloride is counter ion.',
        solutionSteps: ['Name cation then anion'],
        difficultyLevel: 2,
        sourceType: 'ncert',
        relatedTopics: ['Coordination Compounds', 'Chapter 9'],
      },
      {
        questionText: 'CN- is classified as a:',
        options: makeOptions('Weak field ligand', 'Strong field ligand', 'Neutral ligand', 'Ambidentate ligand only'),
        correctAnswer: 'B',
        solutionDetail: 'CN- is a strong field ligand causing large splitting.',
        solutionSteps: ['Recall spectrochemical series'],
        difficultyLevel: 2,
        sourceType: 'pyq',
        relatedTopics: ['Coordination Compounds', 'Chapter 9'],
        pyqYear: 2022,
      },
    ],
  },
  {
    chapterNumber: 10,
    topicName: 'Haloalkanes and Haloarenes',
    questions: [
      {
        questionText: 'SN2 reactions are favored in:',
        options: makeOptions('Polar protic solvents', 'Polar aprotic solvents', 'Non polar solvents', 'No solvent'),
        correctAnswer: 'B',
        solutionDetail: 'Polar aprotic solvents enhance nucleophilicity and favor SN2.',
        solutionSteps: ['Recall solvent effect on SN2'],
        difficultyLevel: 2,
        sourceType: 'ncert',
        relatedTopics: ['Haloalkanes and Haloarenes', 'Chapter 10'],
      },
      {
        questionText: 'SN2 reaction leads to:',
        options: makeOptions('Retention of configuration', 'Inversion of configuration', 'Racemization only', 'No stereochemical change'),
        correctAnswer: 'B',
        solutionDetail: 'Backside attack causes Walden inversion in SN2.',
        solutionSteps: ['Recall SN2 mechanism'],
        difficultyLevel: 2,
        sourceType: 'pyq',
        relatedTopics: ['Haloalkanes and Haloarenes', 'Chapter 10'],
        pyqYear: 2019,
      },
    ],
  },
  {
    chapterNumber: 11,
    topicName: 'Alcohols, Phenols and Ethers',
    questions: [
      {
        questionText: 'Lucas test is used to distinguish:',
        options: makeOptions('Aldehydes and ketones', 'Primary, secondary, tertiary alcohols', 'Amines', 'Carboxylic acids'),
        correctAnswer: 'B',
        solutionDetail: 'Lucas test differentiates alcohols based on reactivity.',
        solutionSteps: ['Recall purpose of Lucas test'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Alcohols, Phenols and Ethers', 'Chapter 11'],
      },
      {
        questionText: 'Phenol is more reactive than benzene towards electrophilic substitution because:',
        options: makeOptions('It is less aromatic', 'Oxygen donates electron density to ring', 'It has higher molecular mass', 'It has no resonance'),
        correctAnswer: 'B',
        solutionDetail: 'The -OH group activates the ring by resonance donation.',
        solutionSteps: ['Recall activating groups'],
        difficultyLevel: 2,
        sourceType: 'pyq',
        relatedTopics: ['Alcohols, Phenols and Ethers', 'Chapter 11'],
        pyqYear: 2020,
      },
    ],
  },
  {
    chapterNumber: 12,
    topicName: 'Aldehydes, Ketones and Carboxylic Acids',
    questions: [
      {
        questionText: 'Fehling\'s solution gives a positive test with:',
        options: makeOptions('Aromatic aldehydes only', 'Aliphatic aldehydes', 'Ketones', 'Carboxylic acids'),
        correctAnswer: 'B',
        solutionDetail: 'Aliphatic aldehydes reduce Fehling\'s solution to red Cu2O.',
        solutionSteps: ['Recall Fehling test'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Aldehydes, Ketones and Carboxylic Acids', 'Chapter 12'],
      },
      {
        questionText: 'Acidity of carboxylic acids is due to:',
        options: makeOptions('Inductive effect only', 'Resonance stabilization of carboxylate ion', 'Presence of carbonyl only', 'Hydrogen bonding only'),
        correctAnswer: 'B',
        solutionDetail: 'Carboxylate ion is stabilized by resonance, increasing acidity.',
        solutionSteps: ['Recall carboxylate stability'],
        difficultyLevel: 2,
        sourceType: 'pyq',
        relatedTopics: ['Aldehydes, Ketones and Carboxylic Acids', 'Chapter 12'],
        pyqYear: 2021,
      },
    ],
  },
  {
    chapterNumber: 13,
    topicName: 'Amines',
    questions: [
      {
        questionText: 'Gabriel phthalimide synthesis gives:',
        options: makeOptions('Primary amines', 'Secondary amines', 'Tertiary amines', 'Quaternary ammonium salts only'),
        correctAnswer: 'A',
        solutionDetail: 'Gabriel synthesis is used for preparing primary amines.',
        solutionSteps: ['Recall Gabriel synthesis'],
        difficultyLevel: 2,
        sourceType: 'pyq',
        relatedTopics: ['Amines', 'Chapter 13'],
        pyqYear: 2018,
      },
      {
        questionText: 'Aniline undergoes diazotization at:',
        options: makeOptions('0 to 5 C', '25 C', '50 C', '100 C'),
        correctAnswer: 'A',
        solutionDetail: 'Diazonium salts are stable at low temperatures (0 to 5 C).',
        solutionSteps: ['Recall diazotization conditions'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Amines', 'Chapter 13'],
      },
    ],
  },
  {
    chapterNumber: 14,
    topicName: 'Biomolecules',
    questions: [
      {
        questionText: 'Starch and cellulose are polymers of:',
        options: makeOptions('Alpha glucose and beta glucose', 'Fructose', 'Ribose', 'Deoxyribose'),
        correctAnswer: 'A',
        solutionDetail: 'Starch uses alpha glucose, cellulose uses beta glucose units.',
        solutionSteps: ['Recall carbohydrate polymers'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Biomolecules', 'Chapter 14'],
      },
      {
        questionText: 'Vitamin C is also known as:',
        options: makeOptions('Retinol', 'Ascorbic acid', 'Calciferol', 'Tocopherol'),
        correctAnswer: 'B',
        solutionDetail: 'Vitamin C is ascorbic acid and is water soluble.',
        solutionSteps: ['Recall vitamin names'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Biomolecules', 'Chapter 14'],
        pyqYear: 2019,
      },
    ],
  },
  {
    chapterNumber: 15,
    topicName: 'Polymers',
    questions: [
      {
        questionText: 'Nylon-6 is classified as a:',
        options: makeOptions('Polyester', 'Polyamide', 'Polycarbonate', 'Polysulfide'),
        correctAnswer: 'B',
        solutionDetail: 'Nylon-6 is a polyamide formed from caprolactam.',
        solutionSteps: ['Recall polymer types'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Polymers', 'Chapter 15'],
      },
      {
        questionText: 'Buna-S is a copolymer of:',
        options: makeOptions('Butadiene and styrene', 'Butadiene and acrylonitrile', 'Isoprene and styrene', 'Chloroprene and styrene'),
        correctAnswer: 'A',
        solutionDetail: 'Buna-S is styrene-butadiene rubber.',
        solutionSteps: ['Recall common synthetic rubbers'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Polymers', 'Chapter 15'],
        pyqYear: 2022,
      },
    ],
  },
  {
    chapterNumber: 16,
    topicName: 'Chemistry in Everyday Life',
    questions: [
      {
        questionText: 'Detergents are preferred over soaps in hard water because:',
        options: makeOptions('They form scum', 'They are not affected by Ca2+ and Mg2+', 'They are acids', 'They are insoluble'),
        correctAnswer: 'B',
        solutionDetail: 'Detergents do not form insoluble salts with hard water ions.',
        solutionSteps: ['Recall hard water effect'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Chemistry in Everyday Life', 'Chapter 16'],
      },
      {
        questionText: 'An analgesic is a drug used to:',
        options: makeOptions('Reduce fever', 'Relieve pain', 'Treat infections', 'Induce sleep'),
        correctAnswer: 'B',
        solutionDetail: 'Analgesics relieve pain; antipyretics reduce fever.',
        solutionSteps: ['Recall drug classifications'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Chemistry in Everyday Life', 'Chapter 16'],
        pyqYear: 2023,
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

async function seedChemistryClass12QuestionsExtended() {
  console.log('Seeding Chemistry Class 12 extra practice questions...');
  const targetPerChapter = 4;

  for (const chapter of chapters) {
    const topicId = await ensureTopicId(chapter.topicName, chapter.chapterNumber);
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(questions)
      .where(eq(questions.topicId, topicId));
    const existingCount = Number(countResult[0]?.count ?? 0);

    if (existingCount >= targetPerChapter) {
      console.log(`  Chapter ${chapter.chapterNumber}: already has ${existingCount} questions, skipping`);
      continue;
    }

    const remaining = Math.max(targetPerChapter - existingCount, 0);
    if (remaining > chapter.questions.length) {
      console.warn(`  Chapter ${chapter.chapterNumber}: only ${chapter.questions.length} extra questions available for ${remaining} slots`);
    }

    const payload = chapter.questions.slice(0, remaining).map((question) => ({
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

    if (payload.length === 0) {
      console.log(`  Chapter ${chapter.chapterNumber}: no new questions to insert`);
      continue;
    }

    await db.insert(questions).values(payload);
    console.log(`  Chapter ${chapter.chapterNumber}: inserted ${payload.length} questions`);
  }

  console.log('Chemistry Class 12 extra questions seeding completed!');
}

seedChemistryClass12QuestionsExtended().catch(console.error);
