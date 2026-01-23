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
    topicName: 'Reproduction in Organisms',
    questions: [
      {
        questionText: 'Binary fission is commonly seen in:',
        options: makeOptions('Amoeba', 'Hydra', 'Spirogyra', 'Yeast'),
        correctAnswer: 'A',
        solutionDetail: 'Amoeba reproduces by binary fission; Hydra and yeast mainly show budding.',
        solutionSteps: ['Identify organisms that show binary fission'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Reproduction in Organisms', 'Chapter 1'],
      },
      {
        questionText: 'Life span of an organism refers to:',
        options: makeOptions('Time from birth to natural death', 'Time from fertilization to birth', 'Time spent in juvenile stage only', 'Time spent in reproductive phase only'),
        correctAnswer: 'A',
        solutionDetail: 'Life span is the duration from birth to natural death of an organism.',
        solutionSteps: ['Recall definition of life span'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Reproduction in Organisms', 'Chapter 1'],
        pyqYear: 2019,
      },
    ],
  },
  {
    chapterNumber: 2,
    topicName: 'Sexual Reproduction in Flowering Plants',
    questions: [
      {
        questionText: 'Double fertilization is a characteristic feature of:',
        options: makeOptions('Gymnosperms', 'Angiosperms', 'Bryophytes', 'Pteridophytes'),
        correctAnswer: 'B',
        solutionDetail: 'Double fertilization occurs only in angiosperms.',
        solutionSteps: ['Recall unique feature of flowering plants'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Sexual Reproduction in Flowering Plants', 'Chapter 2'],
      },
      {
        questionText: 'A mature pollen grain of angiosperms is generally:',
        options: makeOptions('Single celled', 'Two celled', 'Three celled', 'Four celled'),
        correctAnswer: 'B',
        solutionDetail: 'A mature pollen grain typically has a vegetative cell and a generative cell.',
        solutionSteps: ['Recall pollen grain structure'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Sexual Reproduction in Flowering Plants', 'Chapter 2'],
        pyqYear: 2020,
      },
    ],
  },
  {
    chapterNumber: 3,
    topicName: 'Human Reproduction',
    questions: [
      {
        questionText: 'Site of fertilization in humans is the:',
        options: makeOptions('Uterus', 'Cervix', 'Ampulla of oviduct', 'Vagina'),
        correctAnswer: 'C',
        solutionDetail: 'Fertilization occurs in the ampullary region of the oviduct.',
        solutionSteps: ['Recall site of fertilization'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Human Reproduction', 'Chapter 3'],
      },
      {
        questionText: 'Hormone responsible for ovulation is:',
        options: makeOptions('FSH', 'LH', 'Progesterone', 'Prolactin'),
        correctAnswer: 'B',
        solutionDetail: 'LH surge triggers ovulation.',
        solutionSteps: ['Identify hormone with surge at mid cycle'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Human Reproduction', 'Chapter 3'],
        pyqYear: 2018,
      },
    ],
  },
  {
    chapterNumber: 4,
    topicName: 'Reproductive Health',
    questions: [
      {
        questionText: 'An example of an intrauterine device (IUD) is:',
        options: makeOptions('Copper T', 'Condom', 'Oral pill', 'Vasectomy'),
        correctAnswer: 'A',
        solutionDetail: 'Copper T is a common IUD used for contraception.',
        solutionSteps: ['Identify method classified as IUD'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Reproductive Health', 'Chapter 4'],
      },
      {
        questionText: 'AIDS is caused by:',
        options: makeOptions('Bacteria', 'Virus', 'Protozoa', 'Fungus'),
        correctAnswer: 'B',
        solutionDetail: 'AIDS is caused by Human Immunodeficiency Virus (HIV).',
        solutionSteps: ['Recall cause of AIDS'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Reproductive Health', 'Chapter 4'],
        pyqYear: 2021,
      },
    ],
  },
  {
    chapterNumber: 5,
    topicName: 'Principles of Inheritance and Variation',
    questions: [
      {
        questionText: 'Law of segregation states that:',
        options: makeOptions('Alleles mix permanently', 'Alleles separate during gamete formation', 'Only dominant allele is transmitted', 'Genes are on different chromosomes'),
        correctAnswer: 'B',
        solutionDetail: 'Alleles separate during gamete formation and reunite at fertilization.',
        solutionSteps: ['Recall Mendel laws'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Principles of Inheritance and Variation', 'Chapter 5'],
      },
      {
        questionText: 'One percent recombination frequency equals:',
        options: makeOptions('1 map unit', '10 map units', '0.1 map unit', '100 map units'),
        correctAnswer: 'A',
        solutionDetail: '1 percent recombination is defined as 1 map unit or 1 centimorgan.',
        solutionSteps: ['Recall recombination mapping'],
        difficultyLevel: 2,
        sourceType: 'pyq',
        relatedTopics: ['Principles of Inheritance and Variation', 'Chapter 5'],
        pyqYear: 2019,
      },
    ],
  },
  {
    chapterNumber: 6,
    topicName: 'Molecular Basis of Inheritance',
    questions: [
      {
        questionText: 'The enzyme responsible for DNA replication is:',
        options: makeOptions('DNA polymerase', 'RNA polymerase', 'Ligase only', 'Primase only'),
        correctAnswer: 'A',
        solutionDetail: 'DNA polymerase synthesizes new DNA strands during replication.',
        solutionSteps: ['Recall DNA replication enzyme'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Molecular Basis of Inheritance', 'Chapter 6'],
      },
      {
        questionText: 'Hershey and Chase proved that genetic material is:',
        options: makeOptions('Protein', 'DNA', 'RNA', 'Lipid'),
        correctAnswer: 'B',
        solutionDetail: 'Their bacteriophage experiment showed DNA is the genetic material.',
        solutionSteps: ['Recall Hershey and Chase experiment'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Molecular Basis of Inheritance', 'Chapter 6'],
        pyqYear: 2020,
      },
    ],
  },
  {
    chapterNumber: 7,
    topicName: 'Evolution',
    questions: [
      {
        questionText: 'Homologous organs indicate:',
        options: makeOptions('Similar function only', 'Common ancestry', 'Analogous evolution', 'No evolutionary relationship'),
        correctAnswer: 'B',
        solutionDetail: 'Homologous organs share origin and indicate common ancestry.',
        solutionSteps: ['Recall evidence of evolution'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Evolution', 'Chapter 7'],
      },
      {
        questionText: 'Hardy-Weinberg equilibrium is represented by:',
        options: makeOptions('p + q = 2', 'p^2 + q^2 = 1', 'p^2 + 2pq + q^2 = 1', 'p^2 - 2pq + q^2 = 1'),
        correctAnswer: 'C',
        solutionDetail: 'Hardy-Weinberg principle uses p^2 + 2pq + q^2 = 1.',
        solutionSteps: ['Recall Hardy-Weinberg equation'],
        difficultyLevel: 2,
        sourceType: 'pyq',
        relatedTopics: ['Evolution', 'Chapter 7'],
        pyqYear: 2018,
      },
    ],
  },
  {
    chapterNumber: 8,
    topicName: 'Human Health and Disease',
    questions: [
      {
        questionText: 'Humoral immunity is mediated by:',
        options: makeOptions('B lymphocytes', 'T lymphocytes', 'Macrophages', 'Neutrophils'),
        correctAnswer: 'A',
        solutionDetail: 'B cells produce antibodies and mediate humoral immunity.',
        solutionSteps: ['Recall immune cell roles'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Human Health and Disease', 'Chapter 8'],
      },
      {
        questionText: 'Secondary immune response is:',
        options: makeOptions('Slower and weaker', 'Faster and stronger', 'Same as primary', 'Absent'),
        correctAnswer: 'B',
        solutionDetail: 'Memory cells make secondary response faster and stronger.',
        solutionSteps: ['Recall primary vs secondary response'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Human Health and Disease', 'Chapter 8'],
        pyqYear: 2022,
      },
    ],
  },
  {
    chapterNumber: 9,
    topicName: 'Strategies for Enhancement in Food Production',
    questions: [
      {
        questionText: 'Hybrid vigor in plant breeding is called:',
        options: makeOptions('Mutation', 'Heterosis', 'Polyploidy', 'Segregation'),
        correctAnswer: 'B',
        solutionDetail: 'Hybrid vigor is known as heterosis.',
        solutionSteps: ['Recall term for hybrid vigor'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Strategies for Enhancement in Food Production', 'Chapter 9'],
      },
      {
        questionText: 'Single cell protein source used as food supplement is:',
        options: makeOptions('Spirulina', 'Rhizobium', 'Plasmodium', 'Trypanosoma'),
        correctAnswer: 'A',
        solutionDetail: 'Spirulina is a popular SCP source.',
        solutionSteps: ['Identify SCP example'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Strategies for Enhancement in Food Production', 'Chapter 9'],
        pyqYear: 2021,
      },
    ],
  },
  {
    chapterNumber: 10,
    topicName: 'Microbes in Human Welfare',
    questions: [
      {
        questionText: 'Secondary sewage treatment reduces:',
        options: makeOptions('BOD', 'pH', 'Temperature', 'Salinity'),
        correctAnswer: 'A',
        solutionDetail: 'Microbial activity reduces biological oxygen demand (BOD).',
        solutionSteps: ['Recall purpose of secondary treatment'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Microbes in Human Welfare', 'Chapter 10'],
      },
      {
        questionText: 'Penicillin is produced by:',
        options: makeOptions('Streptomyces', 'Penicillium', 'Rhizobium', 'Aspergillus'),
        correctAnswer: 'B',
        solutionDetail: 'Penicillin is produced by the fungus Penicillium.',
        solutionSteps: ['Recall source of penicillin'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Microbes in Human Welfare', 'Chapter 10'],
        pyqYear: 2017,
      },
    ],
  },
  {
    chapterNumber: 11,
    topicName: 'Biotechnology: Principles and Processes',
    questions: [
      {
        questionText: 'Restriction enzymes cut DNA at:',
        options: makeOptions('Random sites', 'Palindromic sequences', 'Only promoter regions', 'Only introns'),
        correctAnswer: 'B',
        solutionDetail: 'Restriction enzymes recognize specific palindromic sequences.',
        solutionSteps: ['Recall restriction enzyme specificity'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Biotechnology: Principles and Processes', 'Chapter 11'],
      },
      {
        questionText: 'PCR uses which enzyme for DNA synthesis?',
        options: makeOptions('DNA ligase', 'Taq polymerase', 'Reverse transcriptase', 'RNA polymerase'),
        correctAnswer: 'B',
        solutionDetail: 'Taq polymerase is heat stable and used in PCR.',
        solutionSteps: ['Recall PCR enzyme'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Biotechnology: Principles and Processes', 'Chapter 11'],
        pyqYear: 2019,
      },
    ],
  },
  {
    chapterNumber: 12,
    topicName: 'Biotechnology and Its Applications',
    questions: [
      {
        questionText: 'Bt cotton is resistant to insects because it has:',
        options: makeOptions('cry genes', 'nitrogenase genes', 'nif genes', 'lac genes'),
        correctAnswer: 'A',
        solutionDetail: 'cry genes from Bacillus thuringiensis produce insecticidal proteins.',
        solutionSteps: ['Recall gene used in Bt crops'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Biotechnology and Its Applications', 'Chapter 12'],
      },
      {
        questionText: 'ELISA is used for:',
        options: makeOptions('DNA sequencing', 'Protein separation', 'Detection of antigens or antibodies', 'Cloning genes'),
        correctAnswer: 'C',
        solutionDetail: 'ELISA detects antigen or antibody using enzyme linked reactions.',
        solutionSteps: ['Recall ELISA application'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Biotechnology and Its Applications', 'Chapter 12'],
        pyqYear: 2020,
      },
    ],
  },
  {
    chapterNumber: 13,
    topicName: 'Organisms and Populations',
    questions: [
      {
        questionText: 'The logistic growth equation is:',
        options: makeOptions('dN/dt = rN', 'dN/dt = rN(1 - N/K)', 'dN/dt = K - N', 'dN/dt = rK'),
        correctAnswer: 'B',
        solutionDetail: 'Logistic growth includes carrying capacity K.',
        solutionSteps: ['Recall logistic growth model'],
        difficultyLevel: 2,
        sourceType: 'ncert',
        relatedTopics: ['Organisms and Populations', 'Chapter 13'],
      },
      {
        questionText: 'Lichen represents which type of interaction?',
        options: makeOptions('Parasitism', 'Commensalism', 'Mutualism', 'Predation'),
        correctAnswer: 'C',
        solutionDetail: 'Lichen is a mutualistic association of alga and fungus.',
        solutionSteps: ['Recall ecological interactions'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Organisms and Populations', 'Chapter 13'],
        pyqYear: 2021,
      },
    ],
  },
  {
    chapterNumber: 14,
    topicName: 'Ecosystem',
    questions: [
      {
        questionText: 'Net primary productivity (NPP) is:',
        options: makeOptions('GPP + R', 'GPP - R', 'R - GPP', 'GPP only'),
        correctAnswer: 'B',
        solutionDetail: 'NPP equals GPP minus respiration losses.',
        solutionSteps: ['Recall NPP formula'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Ecosystem', 'Chapter 14'],
      },
      {
        questionText: 'Pyramid of energy in an ecosystem is:',
        options: makeOptions('Always inverted', 'Always upright', 'Either upright or inverted', 'Always rectangular'),
        correctAnswer: 'B',
        solutionDetail: 'Energy flow decreases at each trophic level, so energy pyramid is upright.',
        solutionSteps: ['Recall energy flow'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Ecosystem', 'Chapter 14'],
        pyqYear: 2018,
      },
    ],
  },
  {
    chapterNumber: 15,
    topicName: 'Biodiversity and Conservation',
    questions: [
      {
        questionText: 'Species area relationship is represented by:',
        options: makeOptions('S = C A^z', 'S = C / A', 'S = A / C', 'S = C + A'),
        correctAnswer: 'A',
        solutionDetail: 'Species richness increases with area as S = C A^z.',
        solutionSteps: ['Recall species area relationship'],
        difficultyLevel: 2,
        sourceType: 'ncert',
        relatedTopics: ['Biodiversity and Conservation', 'Chapter 15'],
      },
      {
        questionText: 'Biodiversity hotspots are regions with:',
        options: makeOptions('Low endemism', 'High endemism and high threat', 'No human impact', 'Only grasslands'),
        correctAnswer: 'B',
        solutionDetail: 'Hotspots have high endemism and are under threat.',
        solutionSteps: ['Recall definition of hotspot'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Biodiversity and Conservation', 'Chapter 15'],
        pyqYear: 2022,
      },
    ],
  },
  {
    chapterNumber: 16,
    topicName: 'Environmental Issues',
    questions: [
      {
        questionText: 'Ozone depletion is mainly caused by:',
        options: makeOptions('CO2', 'CFCs', 'SO2', 'NO2'),
        correctAnswer: 'B',
        solutionDetail: 'Chlorofluorocarbons release radicals that destroy ozone.',
        solutionSteps: ['Recall ozone depleting substances'],
        difficultyLevel: 1,
        sourceType: 'ncert',
        relatedTopics: ['Environmental Issues', 'Chapter 16'],
      },
      {
        questionText: 'Eutrophication is caused by:',
        options: makeOptions('Removal of nutrients', 'Excess nutrients in water bodies', 'Low oxygen demand', 'Reduction of algae'),
        correctAnswer: 'B',
        solutionDetail: 'Nutrient enrichment leads to algal blooms and eutrophication.',
        solutionSteps: ['Recall cause of eutrophication'],
        difficultyLevel: 1,
        sourceType: 'pyq',
        relatedTopics: ['Environmental Issues', 'Chapter 16'],
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
        eq(contentTopics.subject, 'Biology'),
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
      subject: 'Biology',
      classLevel: '12',
      topicName,
      ncertChapter: `Chapter ${chapterNumber}`,
      referenceBooks: ['NCERT Biology'],
    })
    .returning({ id: contentTopics.id });

  return inserted[0].id;
}

async function seedBiologyClass12Questions() {
  console.log('Seeding Biology Class 12 practice questions...');
  const targetPerChapter = 2;

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

  console.log('Biology Class 12 practice questions seeding completed!');
}

seedBiologyClass12Questions().catch(console.error);
