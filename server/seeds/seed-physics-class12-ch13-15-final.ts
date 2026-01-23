import { db } from '../db';
import { chapterContent } from '../../shared/schema';

async function seedPhysicsClass12Final() {
  console.log('Seeding Physics Class 12 Chapters 13-15: Nuclei, Semiconductors, Communication...');

  const chapters = [
    {
      subject: 'Physics',
      classLevel: '12',
      chapterNumber: 13,
      chapterTitle: 'Nuclei',
      introduction: `This chapter studies the atomic nucleus: its size, composition, and stability. It explains mass defect, binding energy, radioactive decay, half-life, and the energy released in nuclear fission and fusion.`,
      detailedNotes: `# Nuclei

## Nuclear Composition and Size

- Atomic number Z = number of protons.
- Mass number A = Z + N (N = neutrons).
- Nuclear radius: R = R0 A^(1/3), R0 ~ 1.2e-15 m.
- Nuclear density is nearly constant for all nuclei.

## Mass-Energy and Binding Energy

- Mass defect: dm = (Z mp + N mn) - M.
- Binding energy: BE = dm c^2.
- Binding energy per nucleon peaks near A ~ 56 (iron), indicating maximum stability.

## Radioactivity

- Unstable nuclei emit alpha, beta, or gamma radiation.
- Alpha: helium nucleus, low penetration.
- Beta minus: electron + antineutrino.
- Beta plus: positron + neutrino.
- Gamma: photon, highest penetration.

## Radioactive Decay Law

- N = N0 e^(-lambda t).
- Activity A = lambda N.
- Half-life: T1/2 = ln 2 / lambda.
- Mean life: tau = 1 / lambda.

## Nuclear Fission and Fusion

- Fission: heavy nucleus splits and releases ~200 MeV (U-235).
- Chain reaction requires critical mass, moderators, and control rods.
- Fusion: light nuclei combine to release energy; requires very high temperature.
`,
      keyConcepts: [
        {
          title: 'Nuclear Radius',
          description: 'Nuclear size scales with mass number.',
          formula: 'R = R0 A^(1/3)',
        },
        {
          title: 'Binding Energy',
          description: 'Energy required to separate a nucleus into nucleons.',
          formula: 'BE = dm c^2',
        },
        {
          title: 'Decay Law',
          description: 'Number of nuclei decreases exponentially with time.',
          formula: 'N = N0 e^(-lambda t)',
        },
        {
          title: 'Half-Life',
          description: 'Time for half the nuclei to decay.',
          formula: 'T1/2 = ln 2 / lambda',
        },
        {
          title: 'Activity',
          description: 'Rate of radioactive decay.',
          formula: 'A = lambda N',
        },
      ],
      formulas: [
        'R = R0 A^(1/3)',
        'BE = dm c^2',
        'N = N0 e^(-lambda t)',
        'A = lambda N',
        'T1/2 = ln 2 / lambda',
      ],
      importantTopics: [
        'Nuclear size and density',
        'Binding energy curve',
        'Radioactive decay and half-life',
        'Fission and fusion basics',
        'Nuclear reactors and safety',
      ],
      learningObjectives: [
        'Compute binding energy using mass defect',
        'Apply decay law and half-life relations',
        'Compare fission and fusion energy release',
      ],
      prerequisites: [
        'Atomic structure basics',
        'Exponential functions',
      ],
      ncertChapterRef: 'Class 12 Physics - Chapter 13',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Radioactive Decay',
          description: 'Observe exponential decay of unstable nuclei.',
          config: {
            visualizationName: 'radioactive-decay',
          },
        },
        {
          type: 'concept',
          title: 'Nuclear Fission',
          description: 'Visualize how a heavy nucleus splits and releases energy.',
          config: {
            visualizationName: 'nuclear-fission',
          },
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 300,
      status: 'published' as const,
    },
    {
      subject: 'Physics',
      classLevel: '12',
      chapterNumber: 14,
      chapterTitle: 'Semiconductor Electronics: Materials, Devices and Simple Circuits',
      introduction: `Semiconductors connect physics to modern electronics. This chapter explains energy bands, intrinsic and extrinsic semiconductors, p-n junctions, diodes, transistors, logic gates, and integrated circuits.`,
      detailedNotes: `# Semiconductor Electronics

## Energy Bands and Semiconductors

- Conductors have overlapping bands; insulators have large band gaps.
- Semiconductors have small band gaps (Si ~ 1.1 eV, Ge ~ 0.7 eV).
- Intrinsic semiconductors have equal electron and hole concentrations.

## Doping and Extrinsic Semiconductors

- n-type: pentavalent dopants add electrons (majority carriers).
- p-type: trivalent dopants create holes (majority carriers).

## p-n Junction Diode

- Depletion region and barrier potential form at the junction.
- Forward bias reduces barrier, reverse bias increases barrier.
- Diode equation: I = I0 (e^(eV/kT) - 1).

## Rectifiers and Special Diodes

- Half-wave and full-wave rectifiers convert AC to DC.
- Zener diode provides voltage regulation.
- LED emits light; photodiode converts light to current.

## Transistors and Logic Gates

- Transistor currents: Ie = Ib + Ic, Ic = beta Ib.
- Transistor works as amplifier or switch.
- Logic gates implement Boolean operations; NAND and NOR are universal.

## Integrated Circuits

- Many electronic components on one silicon chip.
- ICs enable compact, reliable electronics.
`,
      keyConcepts: [
        {
          title: 'Band Gap',
          description: 'Energy gap between valence and conduction bands.',
          formula: 'Eg (Si) ~ 1.1 eV',
        },
        {
          title: 'Diode Equation',
          description: 'Current through an ideal diode.',
          formula: 'I = I0 (e^(eV/kT) - 1)',
        },
        {
          title: 'Transistor Current Gain',
          description: 'Collector current in terms of base current.',
          formula: 'Ic = beta Ib',
        },
        {
          title: 'Current Relation',
          description: 'Emitter current equals base plus collector current.',
          formula: 'Ie = Ib + Ic',
        },
        {
          title: 'Rectification',
          description: 'AC to DC conversion using diodes.',
          formula: 'half-wave and full-wave rectification',
        },
      ],
      formulas: [
        'I = I0 (e^(eV/kT) - 1)',
        'Ic = beta Ib',
        'Ie = Ib + Ic',
        'Eg (Si) ~ 1.1 eV',
        'Eg (Ge) ~ 0.7 eV',
      ],
      importantTopics: [
        'Energy bands and band gap',
        'Intrinsic and extrinsic semiconductors',
        'p-n junction diode and I-V curve',
        'Zener, LED, photodiode applications',
        'Transistors and logic gates',
      ],
      learningObjectives: [
        'Differentiate n-type and p-type semiconductors',
        'Explain diode biasing and rectification',
        'Apply transistor current relations',
        'Recognize basic logic gate functions',
      ],
      prerequisites: [
        'Electric current basics',
        'Simple circuit concepts',
      ],
      ncertChapterRef: 'Class 12 Physics - Chapter 14',
      visualizationsData: [
        {
          type: 'concept',
          title: 'PN Junction',
          description: 'Explore depletion region and diode biasing.',
          config: {
            visualizationName: 'pn-junction',
          },
        },
        {
          type: 'concept',
          title: 'Logic Gates',
          description: 'Test Boolean operations using logic gates.',
          config: {
            visualizationName: 'logic-gates',
          },
        },
      ],
      difficultyLevel: 4,
      estimatedStudyMinutes: 320,
      status: 'published' as const,
    },
    {
      subject: 'Physics',
      classLevel: '12',
      chapterNumber: 15,
      chapterTitle: 'Communication Systems',
      introduction: `Communication systems transmit information using electromagnetic waves. This chapter covers system blocks, bandwidth, modulation, propagation modes, antennas, satellite communication, and basics of digital communication.`,
      detailedNotes: `# Communication Systems

## Elements of Communication

- Transmitter converts message to a signal for transmission.
- Channel carries the signal; noise adds unwanted disturbances.
- Receiver extracts the original message.

## Bandwidth and Signals

- Bandwidth is the frequency range required by a signal.
- Audio signals need low bandwidth; video signals need high bandwidth.

## Modulation

- Modulation shifts a low-frequency message onto a high-frequency carrier.
- Carrier: c(t) = Ac sin(wc t).
- Message: m(t) = Am sin(wm t), with wm << wc.

### Amplitude Modulation (AM)

- Modulation index: mu = Am / Ac.
- Bandwidth: BW = 2 fm.
- AM is simple but noise-prone.

### Frequency Modulation (FM)

- Frequency varies with message amplitude.
- Bandwidth: BW ~ 2 (delta f + fm).
- FM has better noise immunity.

## Propagation of EM Waves

- Ground wave: below 2 MHz, follows Earth surface.
- Sky wave: 3 to 30 MHz, reflected by ionosphere.
- Space wave: above 30 MHz, line-of-sight.

## Antennas and Satellites

- Antenna length often relates to wavelength: L ~ lambda / 4.
- Geostationary satellites provide large coverage.

## Digital Communication

- Sampling, quantization, and encoding convert analog to digital.
- Digital signals support error correction and encryption.
`,
      keyConcepts: [
        {
          title: 'Modulation Index',
          description: 'Depth of amplitude modulation.',
          formula: 'mu = Am / Ac',
        },
        {
          title: 'AM Bandwidth',
          description: 'Bandwidth required for AM transmission.',
          formula: 'BW = 2 fm',
        },
        {
          title: 'FM Bandwidth',
          description: 'Approximate bandwidth for FM transmission.',
          formula: 'BW ~ 2 (delta f + fm)',
        },
        {
          title: 'Carrier Signal',
          description: 'High-frequency carrier for modulation.',
          formula: 'c(t) = Ac sin(wc t)',
        },
        {
          title: 'Antenna Length',
          description: 'A common quarter-wave antenna relation.',
          formula: 'L ~ lambda / 4',
        },
      ],
      formulas: [
        'mu = Am / Ac',
        'BW = 2 fm',
        'BW ~ 2 (delta f + fm)',
        'c(t) = Ac sin(wc t)',
        'L ~ lambda / 4',
      ],
      importantTopics: [
        'Communication system blocks',
        'Modulation and bandwidth',
        'AM and FM comparison',
        'Propagation modes',
        'Satellite communication basics',
      ],
      learningObjectives: [
        'Explain why modulation is necessary',
        'Compute AM bandwidth and modulation index',
        'Identify propagation modes for different bands',
      ],
      prerequisites: [
        'Wave properties',
        'Basic trigonometry',
      ],
      ncertChapterRef: 'Class 12 Physics - Chapter 15',
      visualizationsData: [
        {
          type: 'concept',
          title: 'Electromagnetic Wave',
          description: 'Visualize EM wave propagation.',
          config: {
            visualizationName: 'em-wave',
          },
        },
        {
          type: 'concept',
          title: 'Physics and Technology Map',
          description: 'See how communication technology uses physics principles.',
          config: {
            visualizationName: 'physics-technology-map',
          },
        },
      ],
      difficultyLevel: 3,
      estimatedStudyMinutes: 240,
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

  console.log('Physics Class 12 chapters 13-15 seeding completed!');
}

seedPhysicsClass12Final().catch(console.error);
