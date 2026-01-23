import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedBiologyClass12Part1() {
  console.log('Seeding Biology Class 12 Chapters 1-4...');

  const chapters = [
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 1,
      chapterTitle: 'Reproduction in Organisms',
      introduction: `Reproduction ensures continuity of species. This chapter covers asexual and sexual reproduction, key events like gametogenesis and fertilization, and life span variations.`,
      detailedNotes: `# Reproduction in Organisms

## Asexual Reproduction

- Single parent, no gamete fusion, offspring are clones.
- Common modes: binary fission, budding, fragmentation, spore formation.
- Vegetative propagation in plants: runners, rhizomes, tubers, bulbs, grafting.

## Sexual Reproduction

- Two parents, gamete formation (meiosis) and fertilization.
- Produces variation and supports evolution.
- Events: gametogenesis, fertilization, post-fertilization development.

## Fertilization and Development

- Fusion of gametes forms diploid zygote.
- Cleavage, differentiation, and organ formation follow.
- External vs internal fertilization depends on habitat.

## Life Span

- Life span varies widely among organisms.
- Phases: juvenile, reproductive, senescent.
`,
      keyConcepts: [
        {
          title: 'Asexual Reproduction',
          description: 'Single parent reproduction producing genetically identical offspring.',
        },
        {
          title: 'Sexual Reproduction',
          description: 'Gamete formation and fusion leading to variation.',
        },
        {
          title: 'Gametogenesis',
          description: 'Meiosis produces haploid gametes.',
        },
        {
          title: 'Fertilization',
          description: 'Fusion of gametes restores diploid chromosome number.',
          formula: 'n + n -> 2n',
        },
        {
          title: 'Life Span',
          description: 'Species-specific duration from birth to natural death.',
        },
      ],
      formulas: [
        'n + n -> 2n (zygote formation)',
      ],
      importantTopics: [
        'Asexual reproduction modes',
        'Sexual reproduction events',
        'External vs internal fertilization',
        'Life span phases',
      ],
      learningObjectives: [
        'Differentiate asexual and sexual reproduction',
        'Describe key events in sexual reproduction',
        'Explain variation and its importance',
      ],
      prerequisites: [
        'Cell division basics',
        'Haploid vs diploid concept',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 1',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Asexual Reproduction Modes',
          description: 'Binary fission, budding, fragmentation, and spores.',
        },
        {
          type: 'flowchart',
          title: 'Events in Sexual Reproduction',
          description: 'Gametogenesis -> fertilization -> development.',
        },
        {
          type: 'comparison',
          title: 'Asexual vs Sexual Reproduction',
          description: 'Compare speed, variation, and examples.',
        },
      ],
      difficultyLevel: 2,
      estimatedStudyMinutes: 220,
      status: 'published' as const,
    },
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 2,
      chapterTitle: 'Sexual Reproduction in Flowering Plants',
      introduction: `This chapter explains floral structure, gamete formation, pollination, double fertilization, and seed and fruit development in angiosperms.`,
      detailedNotes: `# Sexual Reproduction in Flowering Plants

## Flower Structure

- Androecium produces pollen; gynoecium contains ovules.
- Stamen: anther + filament; pistil: stigma, style, ovary.

## Microsporogenesis and Megasporogenesis

- Pollen grains form in anther; embryo sac forms in ovule.
- Functional megaspore develops into embryo sac.

## Pollination

- Transfer of pollen to stigma.
- Self vs cross pollination; agents include wind and insects.

## Double Fertilization

- One sperm + egg -> zygote (2n).
- One sperm + polar nuclei -> endosperm (3n).

## Seed and Fruit Development

- Zygote becomes embryo, endosperm nourishes.
- Ovule becomes seed; ovary becomes fruit.
`,
      keyConcepts: [
        {
          title: 'Microsporogenesis',
          description: 'Pollen formation by meiosis in anthers.',
        },
        {
          title: 'Megasporogenesis',
          description: 'Embryo sac formation from functional megaspore.',
        },
        {
          title: 'Pollination',
          description: 'Transfer of pollen to stigma for fertilization.',
        },
        {
          title: 'Double Fertilization',
          description: 'Unique angiosperm process forming zygote and endosperm.',
          formula: 'Sperm + egg -> zygote; sperm + polar nuclei -> endosperm',
        },
      ],
      formulas: [
        'Sperm + egg -> zygote (2n)',
        'Sperm + polar nuclei -> endosperm (3n)',
      ],
      importantTopics: [
        'Flower structure',
        'Pollen and embryo sac formation',
        'Pollination types',
        'Double fertilization',
        'Seed and fruit formation',
      ],
      learningObjectives: [
        'Identify male and female parts of a flower',
        'Explain pollination and fertilization steps',
        'Describe seed and fruit development',
      ],
      prerequisites: [
        'Basic plant anatomy',
        'Cell division basics',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 2',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Flower Structure',
          description: 'Key parts of a typical angiosperm flower.',
        },
        {
          type: 'flowchart',
          title: 'Double Fertilization Steps',
          description: 'Pollen tube -> two fusions -> embryo and endosperm.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 240,
      status: 'published' as const,
    },
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 3,
      chapterTitle: 'Human Reproduction',
      introduction: `Human reproduction covers male and female reproductive systems, gametogenesis, menstrual cycle, fertilization, pregnancy, and parturition.`,
      detailedNotes: `# Human Reproduction

## Male Reproductive System

- Testes produce sperm and testosterone.
- Accessory ducts and glands support sperm transport and nourishment.

## Female Reproductive System

- Ovaries produce ova and hormones.
- Oviduct, uterus, cervix, and vagina support fertilization and development.

## Gametogenesis

- Spermatogenesis: spermatogonia -> spermatozoa.
- Oogenesis: primary oocyte -> secondary oocyte -> ovum.

## Menstrual Cycle

- Follicular phase, ovulation, luteal phase.
- Controlled by FSH, LH, estrogen, progesterone.

## Fertilization and Pregnancy

- Fertilization in ampulla of oviduct.
- Implantation in uterus; placenta supports embryo.
`,
      keyConcepts: [
        {
          title: 'Spermatogenesis',
          description: 'Formation of sperm in testes.',
        },
        {
          title: 'Oogenesis',
          description: 'Formation of ovum in ovaries.',
        },
        {
          title: 'Menstrual Cycle',
          description: 'Cyclic changes in ovary and uterus.',
        },
        {
          title: 'Fertilization and Implantation',
          description: 'Fusion of gametes and attachment in uterus.',
        },
      ],
      formulas: [
        'LH surge -> ovulation',
      ],
      importantTopics: [
        'Male and female reproductive systems',
        'Gametogenesis steps',
        'Menstrual cycle phases',
        'Pregnancy and placenta',
      ],
      learningObjectives: [
        'Describe reproductive system structures',
        'Explain hormonal control of menstrual cycle',
        'Outline fertilization and implantation',
      ],
      prerequisites: [
        'Endocrine basics',
        'Cell division basics',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 3',
      visualizationsData: [
        {
          type: 'diagram',
          title: 'Human Reproductive Systems',
          description: 'Overview of male and female organs.',
        },
        {
          type: 'table',
          title: 'Hormones and Functions',
          description: 'FSH, LH, estrogen, progesterone roles.',
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 250,
      status: 'published' as const,
    },
    {
      subject: 'Biology',
      classLevel: '12',
      chapterNumber: 4,
      chapterTitle: 'Reproductive Health',
      introduction: `Reproductive health includes contraception, population control, sexually transmitted diseases, and assisted reproductive technologies.`,
      detailedNotes: `# Reproductive Health

## Contraception

- Natural: periodic abstinence, lactational amenorrhea.
- Barrier: condoms, diaphragms.
- Hormonal: pills, injectables, implants.
- IUDs: copper T, hormone releasing.

## Medical Termination of Pregnancy

- Safe and legal within prescribed limits.
- Prevents unwanted pregnancies.

## Sexually Transmitted Diseases

- Examples: HIV/AIDS, gonorrhea, syphilis, chlamydia.
- Prevention: safe sex, awareness, early diagnosis.

## Assisted Reproductive Technologies

- IVF, IUI, GIFT, ZIFT.
- Used for infertility management.
`,
      keyConcepts: [
        {
          title: 'Contraception',
          description: 'Methods to prevent unwanted pregnancy.',
        },
        {
          title: 'STDs',
          description: 'Infections transmitted through sexual contact.',
        },
        {
          title: 'ART',
          description: 'Assisted reproductive technologies for infertility.',
        },
        {
          title: 'Reproductive Health Awareness',
          description: 'Education and hygiene improve reproductive outcomes.',
        },
      ],
      formulas: [
        'Safe sex + awareness -> lower STD risk',
      ],
      importantTopics: [
        'Contraceptive methods',
        'STD prevention',
        'ART techniques',
        'Population control measures',
      ],
      learningObjectives: [
        'Classify contraception methods',
        'Identify major STDs and prevention',
        'Explain ART options',
      ],
      prerequisites: [
        'Basic human reproduction',
        'Health and hygiene concepts',
      ],
      ncertChapterRef: 'Class 12 Biology - Chapter 4',
      visualizationsData: [
        {
          type: 'comparison',
          title: 'Contraception Methods',
          description: 'Compare natural, barrier, hormonal, and IUD methods.',
        },
        {
          type: 'flowchart',
          title: 'ART Options',
          description: 'IVF, IUI, GIFT, ZIFT and related steps.',
        },
      ],
      difficultyLevel: 2,
      estimatedStudyMinutes: 200,
      status: 'published' as const,
    },
  ];

  for (const chapter of chapters) {
    await db
      .insert(chapterContent)
      .values(chapter)
      .onConflictDoUpdate({
        target: [chapterContent.subject, chapterContent.classLevel, chapterContent.chapterNumber],
        set: {
          chapterTitle: chapter.chapterTitle,
          introduction: chapter.introduction,
          detailedNotes: chapter.detailedNotes,
          keyConcepts: chapter.keyConcepts,
          formulas: chapter.formulas,
          importantTopics: chapter.importantTopics,
          learningObjectives: chapter.learningObjectives,
          prerequisites: chapter.prerequisites,
          ncertChapterRef: chapter.ncertChapterRef,
          visualizationsData: chapter.visualizationsData,
          difficultyLevel: chapter.difficultyLevel,
          estimatedStudyMinutes: chapter.estimatedStudyMinutes,
          status: chapter.status,
          updatedAt: new Date(),
        },
      });

    console.log(`  Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle} upserted`);
  }

  console.log('Biology Class 12 chapters 1-4 seeding completed!');
}

seedBiologyClass12Part1().catch(console.error);
