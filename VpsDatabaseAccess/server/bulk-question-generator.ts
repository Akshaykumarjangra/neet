
import { db } from "./db";
import { contentTopics, questions, type InsertQuestion } from "@shared/schema";
import { eq } from "drizzle-orm";

interface QuestionTemplate {
  question: string;
  options: Array<{ id: string; text: string }>;
  correct: string;
  explanation: string;
  difficulty: number;
}

export class BulkQuestionGenerator {
  private readonly BATCH_SIZE = 20;
  private readonly TOTAL_TARGET = 50000;

  /**
   * Generate 50,000+ questions in batches of 20
   */
  async generateAllQuestions(): Promise<void> {
    console.log("🚀 Starting generation of 50,000+ NEET questions in sets of 20...\n");

    const subjects = [
      { name: "Physics", chapters: 24, targetQuestions: 12000 },
      { name: "Chemistry", chapters: 44, targetQuestions: 13000 },
      { name: "Botany", chapters: 37, targetQuestions: 12500 },
      { name: "Zoology", chapters: 37, targetQuestions: 12500 },
    ];

    let totalGenerated = 0;
    let setNumber = 1;

    for (const subject of subjects) {
      console.log(`\n📚 Generating ${subject.targetQuestions} questions for ${subject.name}...`);
      
      const questionsPerChapter = Math.ceil(subject.targetQuestions / subject.chapters);
      
      for (let chapter = 1; chapter <= subject.chapters; chapter++) {
        const topic = await this.getOrCreateTopic(subject.name, chapter);
        let chapterGenerated = 0;

        while (chapterGenerated < questionsPerChapter) {
          const batchSize = Math.min(this.BATCH_SIZE, questionsPerChapter - chapterGenerated);
          const batch = this.generateQuestionBatch(subject.name, chapter, topic.id, batchSize, setNumber);
          
          await this.saveBatch(batch);
          
          chapterGenerated += batchSize;
          totalGenerated += batchSize;
          
          console.log(`  ✅ Set ${setNumber}: ${batchSize} questions | ${subject.name} Ch.${chapter} | Total: ${totalGenerated.toLocaleString()}`);
          setNumber++;

          if (totalGenerated >= this.TOTAL_TARGET) {
            console.log(`\n🎉 Target reached! Generated ${totalGenerated.toLocaleString()} questions`);
            return;
          }
        }
      }
    }

    console.log(`\n✨ Generation complete! Total: ${totalGenerated.toLocaleString()} questions in ${setNumber - 1} sets`);
  }

  /**
   * Generate a batch of 20 questions
   */
  private generateQuestionBatch(
    subject: string,
    chapter: number,
    topicId: number,
    batchSize: number,
    setNumber: number
  ): InsertQuestion[] {
    const questions: InsertQuestion[] = [];
    
    // Difficulty distribution: 30% easy, 50% medium, 20% hard
    const easyCount = Math.floor(batchSize * 0.3);
    const mediumCount = Math.floor(batchSize * 0.5);
    const hardCount = batchSize - easyCount - mediumCount;

    for (let i = 0; i < easyCount; i++) {
      questions.push(this.generateQuestion(subject, chapter, topicId, 1, i, setNumber));
    }
    for (let i = 0; i < mediumCount; i++) {
      questions.push(this.generateQuestion(subject, chapter, topicId, 2, i, setNumber));
    }
    for (let i = 0; i < hardCount; i++) {
      questions.push(this.generateQuestion(subject, chapter, topicId, 3, i, setNumber));
    }

    return questions;
  }

  /**
   * Generate individual NEET-style question
   */
  private generateQuestion(
    subject: string,
    chapter: number,
    topicId: number,
    difficulty: number,
    index: number,
    setNumber: number
  ): InsertQuestion {
    const template = this.getQuestionTemplate(subject, chapter, difficulty, index);

    return {
      topicId,
      questionText: template.question,
      options: template.options,
      correctAnswer: template.correct,
      solutionDetail: template.explanation,
      solutionSteps: this.generateSolutionSteps(template.explanation),
      difficultyLevel: difficulty,
      sourceType: `Generated Set ${setNumber}`,
      relatedTopics: [`${subject} - Chapter ${chapter}`],
    };
  }

  /**
   * Get NEET-style question templates
   */
  private getQuestionTemplate(subject: string, chapter: number, difficulty: number, index: number): QuestionTemplate {
    const templates = {
      Physics: this.getPhysicsTemplate(chapter, difficulty, index),
      Chemistry: this.getChemistryTemplate(chapter, difficulty, index),
      Botany: this.getBotanyTemplate(chapter, difficulty, index),
      Zoology: this.getZoologyTemplate(chapter, difficulty, index),
    };

    return templates[subject as keyof typeof templates] || this.getGenericTemplate(subject, chapter, difficulty, index);
  }

  private getPhysicsTemplate(chapter: number, difficulty: number, index: number): QuestionTemplate {
    const topics = [
      "Units and Measurement", "Kinematics", "Laws of Motion", "Work Energy Power",
      "Rotational Motion", "Gravitation", "Properties of Matter", "Thermodynamics",
      "Kinetic Theory", "Oscillations", "Waves", "Electrostatics",
      "Current Electricity", "Magnetic Effects", "Electromagnetic Induction", "AC Circuits",
      "EM Waves", "Ray Optics", "Wave Optics", "Dual Nature",
      "Atoms", "Nuclei", "Semiconductors", "Communication"
    ];
    
    const topic = topics[Math.min(chapter - 1, topics.length - 1)];
    
    // Generate varied question types
    const questionTypes = [
      {
        question: `A particle moving with ${difficulty === 1 ? 'constant' : difficulty === 2 ? 'uniformly varying' : 'non-uniform'} acceleration in ${topic}. What is the magnitude of displacement after time t?`,
        options: [
          { id: "A", text: `ut + (1/2)at²` },
          { id: "B", text: `ut - (1/2)at²` },
          { id: "C", text: `vt + (1/2)at²` },
          { id: "D", text: `(v² - u²)/2a` },
        ],
        correct: "A",
        explanation: `For ${topic}, displacement with initial velocity u and constant acceleration a is given by s = ut + (1/2)at². This is derived from kinematic equations.`,
      },
      {
        question: `In ${topic}, two ${difficulty === 1 ? 'equal' : 'unequal'} forces act on a body. The resultant force has magnitude R. What is the angle between the forces if their magnitudes are F₁ and F₂?`,
        options: [
          { id: "A", text: `θ = cos⁻¹[(R² - F₁² - F₂²)/(2F₁F₂)]` },
          { id: "B", text: `θ = cos⁻¹[(F₁² + F₂² - R²)/(2F₁F₂)]` },
          { id: "C", text: `θ = sin⁻¹[(R² - F₁² - F₂²)/(2F₁F₂)]` },
          { id: "D", text: `θ = tan⁻¹[(R² - F₁² - F₂²)/(2F₁F₂)]` },
        ],
        correct: "B",
        explanation: `Using the parallelogram law of vector addition: R² = F₁² + F₂² + 2F₁F₂cosθ. Rearranging gives θ = cos⁻¹[(F₁² + F₂² - R²)/(2F₁F₂)].`,
      },
      {
        question: `A ${difficulty === 3 ? 'non-uniform' : 'uniform'} ${topic} system has ${difficulty === 1 ? 'one' : difficulty === 2 ? 'two' : 'multiple'} degree(s) of freedom. What is the energy conservation principle applied?`,
        options: [
          { id: "A", text: `Total mechanical energy (KE + PE) remains constant in absence of non-conservative forces` },
          { id: "B", text: `Kinetic energy alone remains constant` },
          { id: "C", text: `Potential energy alone remains constant` },
          { id: "D", text: `Total energy increases linearly with time` },
        ],
        correct: "A",
        explanation: `In ${topic}, when only conservative forces act, total mechanical energy (KE + PE) is conserved. This is a fundamental principle in mechanics.`,
      },
      {
        question: `The dimensional formula of ${topic} related quantity is [M^a L^b T^c]. If the quantity represents ${difficulty === 1 ? 'velocity' : difficulty === 2 ? 'acceleration' : 'force'}, what are the values?`,
        options: [
          { id: "A", text: `a=0, b=1, c=-1 for velocity` },
          { id: "B", text: `a=0, b=1, c=-2 for acceleration` },
          { id: "C", text: `a=1, b=1, c=-2 for force` },
          { id: "D", text: `All of the above are correct` },
        ],
        correct: "D",
        explanation: `Dimensional analysis in ${topic}: Velocity [LT⁻¹], Acceleration [LT⁻²], Force [MLT⁻²]. Each follows from fundamental definitions.`,
      },
      {
        question: `In an experiment on ${topic}, ${difficulty === 1 ? 'systematic' : difficulty === 2 ? 'random' : 'both systematic and random'} errors are present. What is the best method to minimize total error?`,
        options: [
          { id: "A", text: `Take multiple readings and calculate mean to reduce random errors` },
          { id: "B", text: `Calibrate instruments properly to eliminate systematic errors` },
          { id: "C", text: `Use least count method for precision` },
          { id: "D", text: `Apply both calibration and statistical averaging` },
        ],
        correct: "D",
        explanation: `For ${topic} experiments: Systematic errors require calibration; random errors are reduced by averaging multiple measurements. Best practice uses both approaches.`,
      },
    ];
    
    const selectedQuestion = questionTypes[index % questionTypes.length];
    return {
      question: `[${topic}] ${selectedQuestion.question}`,
      options: selectedQuestion.options,
      correct: selectedQuestion.correct,
      explanation: selectedQuestion.explanation,
      difficulty,
    };
  }

  private getChemistryTemplate(chapter: number, difficulty: number, index: number): QuestionTemplate {
    const topics = [
      "Mole Concept", "Atomic Structure", "Periodic Table", "Chemical Bonding",
      "States of Matter", "Thermodynamics", "Equilibrium", "Redox Reactions",
      "Hydrogen", "S-Block", "P-Block", "D-Block",
      "Organic Basics", "Hydrocarbons", "Haloalkanes", "Alcohols",
      "Aldehydes Ketones", "Carboxylic Acids", "Amines", "Biomolecules",
      "Polymers", "Chemistry in Everyday Life", "Surface Chemistry", "Electrochemistry"
    ];
    
    const topic = topics[Math.min(chapter - 1, topics.length - 1)];
    
    const questionTypes = [
      {
        question: `Calculate the number of moles in ${difficulty === 1 ? '22g' : difficulty === 2 ? '44g' : '88g'} of CO₂. (Atomic mass: C=12, O=16)`,
        options: [
          { id: "A", text: `0.5 mol` },
          { id: "B", text: `1.0 mol` },
          { id: "C", text: `2.0 mol` },
          { id: "D", text: `${difficulty === 1 ? '0.5' : difficulty === 2 ? '1.0' : '2.0'} mol` },
        ],
        correct: "D",
        explanation: `Molar mass of CO₂ = 12 + 2(16) = 44 g/mol. Number of moles = mass/molar mass. For ${difficulty === 1 ? '22g' : difficulty === 2 ? '44g' : '88g'}: n = ${difficulty === 1 ? '22/44 = 0.5' : difficulty === 2 ? '44/44 = 1.0' : '88/44 = 2.0'} mol.`,
      },
      {
        question: `Which electronic configuration represents ${difficulty === 1 ? 'a neutral atom' : difficulty === 2 ? 'a cation' : 'an anion'} in ground state for ${topic}?`,
        options: [
          { id: "A", text: `1s² 2s² 2p⁶ 3s² 3p⁶` },
          { id: "B", text: `1s² 2s² 2p⁶ 3s² 3p⁵` },
          { id: "C", text: `1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹` },
          { id: "D", text: `1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰` },
        ],
        correct: difficulty === 1 ? "A" : difficulty === 2 ? "B" : "C",
        explanation: `For ${topic}: ${difficulty === 1 ? 'Noble gas configuration (Ar) is most stable' : difficulty === 2 ? 'Chlorine has 17 electrons in neutral state' : 'K has 19 electrons with 4s¹ in ground state'}. Electronic configuration follows Aufbau principle and Hund's rule.`,
      },
      {
        question: `In ${topic}, the ${difficulty === 1 ? 'first' : difficulty === 2 ? 'second' : 'third'} ionization energy of an element is ${difficulty === 1 ? 'lowest' : difficulty === 2 ? 'moderate' : 'highest'}. This is because:`,
        options: [
          { id: "A", text: `Removing electron from neutral atom requires least energy` },
          { id: "B", text: `Nuclear charge increases after each ionization` },
          { id: "C", text: `Effective nuclear charge increases with successive ionization` },
          { id: "D", text: `Electron-electron repulsion decreases after each removal` },
        ],
        correct: "C",
        explanation: `Successive ionization energies increase because: (1) electrons are removed from increasingly positive ions, (2) remaining electrons experience greater effective nuclear charge, (3) electron shielding decreases. This is fundamental in ${topic}.`,
      },
      {
        question: `The ${difficulty === 1 ? 'Lewis structure' : difficulty === 2 ? 'VSEPR geometry' : 'hybridization'} of ${difficulty === 1 ? 'H₂O' : difficulty === 2 ? 'NH₃' : 'CH₄'} in ${topic} shows:`,
        options: [
          { id: "A", text: difficulty === 1 ? `Bent shape with 2 lone pairs on oxygen` : difficulty === 2 ? `Trigonal pyramidal with 1 lone pair` : `Tetrahedral with sp³ hybridization` },
          { id: "B", text: `Linear geometry with no lone pairs` },
          { id: "C", text: `Trigonal planar with sp² hybridization` },
          { id: "D", text: `Octahedral with sp³d² hybridization` },
        ],
        correct: "A",
        explanation: `For ${topic}: ${difficulty === 1 ? 'H₂O has bent shape (104.5°) due to 2 lone pairs on O' : difficulty === 2 ? 'NH₃ is trigonal pyramidal (107°) with 1 lone pair on N' : 'CH₄ is perfectly tetrahedral (109.5°) with sp³ hybridization'}. Lone pairs cause greater repulsion than bond pairs.`,
      },
      {
        question: `For the equilibrium reaction in ${topic}: N₂ + 3H₂ ⇌ 2NH₃, ΔH = -92 kJ. What happens when ${difficulty === 1 ? 'temperature is increased' : difficulty === 2 ? 'pressure is increased' : 'a catalyst is added'}?`,
        options: [
          { id: "A", text: difficulty === 1 ? `Equilibrium shifts backward (endothermic direction)` : difficulty === 2 ? `Equilibrium shifts forward (fewer moles side)` : `Equilibrium is reached faster but position unchanged` },
          { id: "B", text: `Equilibrium shifts forward` },
          { id: "C", text: `No change in equilibrium position` },
          { id: "D", text: `Kc value changes` },
        ],
        correct: "A",
        explanation: `Le Chatelier's Principle in ${topic}: ${difficulty === 1 ? 'Increasing T favors endothermic (backward) direction' : difficulty === 2 ? 'Increasing P favors side with fewer moles (forward, 2 vs 4 moles)' : 'Catalyst only affects rate, not equilibrium position'}. Understanding this is crucial for NEET.`,
      },
    ];
    
    const selectedQuestion = questionTypes[index % questionTypes.length];
    return {
      question: `[${topic}] ${selectedQuestion.question}`,
      options: selectedQuestion.options,
      correct: selectedQuestion.correct,
      explanation: selectedQuestion.explanation,
      difficulty,
    };
  }

  private getBotanyTemplate(chapter: number, difficulty: number, index: number): QuestionTemplate {
    const topics = [
      "Biological Classification", "Plant Kingdom", "Morphology", "Anatomy",
      "Cell Structure", "Biomolecules", "Cell Division", "Transport",
      "Photosynthesis", "Respiration", "Plant Growth", "Reproduction",
      "Sexual Reproduction", "Genetics", "Molecular Basis", "Evolution",
      "Health and Disease", "Biodiversity", "Ecosystem", "Environmental Issues"
    ];
    
    const topic = topics[Math.min(chapter - 1, topics.length - 1)];
    
    const questionTypes = [
      {
        question: `In ${topic}, which characteristic distinguishes ${difficulty === 1 ? 'prokaryotes from eukaryotes' : difficulty === 2 ? 'bacteria from archaea' : 'monera from protista'}?`,
        options: [
          { id: "A", text: `Presence of membrane-bound nucleus` },
          { id: "B", text: `Peptidoglycan in cell wall` },
          { id: "C", text: `70S vs 80S ribosomes` },
          { id: "D", text: difficulty === 1 ? `Membrane-bound nucleus (absent in prokaryotes)` : difficulty === 2 ? `Cell wall composition (peptidoglycan vs pseudopeptidoglycan)` : `Nuclear membrane and complexity` },
        ],
        correct: "D",
        explanation: `${topic}: ${difficulty === 1 ? 'Prokaryotes lack membrane-bound nucleus and organelles' : difficulty === 2 ? 'Bacteria have peptidoglycan; Archaea have pseudopeptidoglycan' : 'Monera are prokaryotic; Protista are eukaryotic unicellular organisms'}. This is a fundamental distinction in classification.`,
      },
      {
        question: `The ${difficulty === 1 ? 'primary' : difficulty === 2 ? 'secondary' : 'tertiary'} structure of a protein in ${topic} is maintained by:`,
        options: [
          { id: "A", text: `Peptide bonds between amino acids` },
          { id: "B", text: `Hydrogen bonds, disulfide bridges, and ionic interactions` },
          { id: "C", text: `Hydrophobic interactions and van der Waals forces` },
          { id: "D", text: difficulty === 1 ? `Peptide bonds (covalent)` : difficulty === 2 ? `Hydrogen bonds (α-helix, β-sheet)` : `Multiple weak forces creating 3D shape` },
        ],
        correct: "D",
        explanation: `Protein structure in ${topic}: ${difficulty === 1 ? '1° structure is amino acid sequence (peptide bonds)' : difficulty === 2 ? '2° structure includes α-helix and β-sheets (H-bonds)' : '3° structure is overall 3D folding (multiple interactions)'}. Essential for NEET biochemistry.`,
      },
      {
        question: `During ${difficulty === 1 ? 'prophase' : difficulty === 2 ? 'metaphase' : 'anaphase'} of mitosis in ${topic}, which event occurs?`,
        options: [
          { id: "A", text: `Chromatin condenses into visible chromosomes` },
          { id: "B", text: `Chromosomes align at the equatorial plate` },
          { id: "C", text: `Sister chromatids separate and move to opposite poles` },
          { id: "D", text: difficulty === 1 ? `Chromatin condensation and nuclear envelope breakdown` : difficulty === 2 ? `Chromosome alignment at metaphase plate` : `Chromatid separation and poleward movement` },
        ],
        correct: "D",
        explanation: `Cell division in ${topic}: ${difficulty === 1 ? 'Prophase: chromatin condenses, centrioles migrate, nuclear envelope dissolves' : difficulty === 2 ? 'Metaphase: chromosomes align at equator, spindle fully formed' : 'Anaphase: centromeres divide, chromatids separate (2n→2n in mitosis)'}. Key for NEET cell biology.`,
      },
      {
        question: `In the ${difficulty === 1 ? 'light' : difficulty === 2 ? 'dark' : 'photorespiration'} reaction of photosynthesis (${topic}), what is the ${difficulty === 1 ? 'primary product' : difficulty === 2 ? 'carbon fixation enzyme' : 'competing reaction'}?`,
        options: [
          { id: "A", text: `ATP and NADPH are produced` },
          { id: "B", text: `RuBisCO catalyzes CO₂ fixation` },
          { id: "C", text: `O₂ competes with CO₂ for RuBisCO` },
          { id: "D", text: difficulty === 1 ? `ATP and NADPH from photolysis` : difficulty === 2 ? `RuBisCO fixes CO₂ to RuBP` : `O₂ binding to RuBisCO causes wasteful pathway` },
        ],
        correct: "D",
        explanation: `Photosynthesis in ${topic}: ${difficulty === 1 ? 'Light reactions produce ATP (photophosphorylation) and NADPH (photolysis of water)' : difficulty === 2 ? 'Calvin cycle: RuBisCO fixes CO₂ to ribulose bisphosphate forming 3-PGA' : 'Photorespiration: RuBisCO can bind O₂ instead of CO₂, reducing efficiency'}. Critical concept for NEET.`,
      },
      {
        question: `Mendel's ${difficulty === 1 ? 'Law of Segregation' : difficulty === 2 ? 'Law of Independent Assortment' : 'dihybrid cross ratio'} in ${topic} states that:`,
        options: [
          { id: "A", text: `Alleles separate during gamete formation` },
          { id: "B", text: `Different traits assort independently` },
          { id: "C", text: `F₂ ratio is 9:3:3:1 for two traits` },
          { id: "D", text: difficulty === 1 ? `Each gamete receives one allele per gene` : difficulty === 2 ? `Genes on different chromosomes assort independently` : `Dihybrid cross yields 9:3:3:1 phenotypic ratio` },
        ],
        correct: "D",
        explanation: `Genetics in ${topic}: ${difficulty === 1 ? 'Segregation: paired alleles separate so each gamete has one allele' : difficulty === 2 ? 'Independent assortment: genes on different chromosomes distribute independently to gametes' : 'Dihybrid cross (AaBb × AaBb) gives 9:3:3:1 ratio in F₂ generation'}. Fundamental for NEET genetics.`,
      },
    ];
    
    const selectedQuestion = questionTypes[index % questionTypes.length];
    return {
      question: `[${topic}] ${selectedQuestion.question}`,
      options: selectedQuestion.options,
      correct: selectedQuestion.correct,
      explanation: selectedQuestion.explanation,
      difficulty,
    };
  }

  private getZoologyTemplate(chapter: number, difficulty: number, index: number): QuestionTemplate {
    const topics = [
      "Animal Kingdom", "Structural Organization", "Biomolecules", "Digestion",
      "Breathing", "Body Fluids", "Excretion", "Locomotion",
      "Neural Control", "Chemical Coordination", "Reproduction", "Development",
      "Genetics", "Evolution", "Human Health", "Microbes",
      "Biotechnology Principles", "Biotechnology Applications", "Organisms and Population", "Ecosystem"
    ];
    
    const topic = topics[Math.min(chapter - 1, topics.length - 1)];
    
    const questionTypes = [
      {
        question: `Which phylum in ${topic} exhibits ${difficulty === 1 ? 'radial symmetry' : difficulty === 2 ? 'bilateral symmetry with triploblastic organization' : 'segmentation (metameric)'} ?`,
        options: [
          { id: "A", text: `Porifera` },
          { id: "B", text: `Cnidaria` },
          { id: "C", text: `Platyhelminthes` },
          { id: "D", text: difficulty === 1 ? `Cnidaria (radially symmetrical)` : difficulty === 2 ? `Platyhelminthes (bilateral, 3 germ layers)` : `Annelida (metamerically segmented)` },
        ],
        correct: "D",
        explanation: `Animal classification in ${topic}: ${difficulty === 1 ? 'Cnidaria (jellyfish, hydra) show radial symmetry, diploblastic' : difficulty === 2 ? 'Platyhelminthes (flatworms) are bilaterally symmetrical, triploblastic, acoelomate' : 'Annelida (earthworm) show true segmentation with repeated body units'}. Key for NEET taxonomy.`,
      },
      {
        question: `In ${topic}, the ${difficulty === 1 ? 'enzyme pepsin' : difficulty === 2 ? 'hormone gastrin' : 'intrinsic factor'} in gastric digestion:`,
        options: [
          { id: "A", text: `Breaks down proteins in acidic pH` },
          { id: "B", text: `Stimulates HCl secretion by parietal cells` },
          { id: "C", text: `Required for vitamin B12 absorption` },
          { id: "D", text: difficulty === 1 ? `Pepsin digests proteins at pH 1.5-2` : difficulty === 2 ? `Gastrin stimulates gastric acid secretion` : `Intrinsic factor binds B12 for ileal absorption` },
        ],
        correct: "D",
        explanation: `Digestive physiology in ${topic}: ${difficulty === 1 ? 'Pepsin (from pepsinogen) digests proteins in acidic stomach pH' : difficulty === 2 ? 'Gastrin hormone stimulates HCl and pepsinogen secretion' : 'Intrinsic factor from parietal cells essential for B12 absorption in ileum'}. Important for NEET physiology.`,
      },
      {
        question: `The ${difficulty === 1 ? 'conducting zone' : difficulty === 2 ? 'respiratory zone' : 'alveolar-capillary'} of the respiratory system in ${topic}:`,
        options: [
          { id: "A", text: `Includes trachea, bronchi, bronchioles (no gas exchange)` },
          { id: "B", text: `Includes respiratory bronchioles and alveoli (gas exchange)` },
          { id: "C", text: `Membrane where O₂ and CO₂ are exchanged via diffusion` },
          { id: "D", text: difficulty === 1 ? `Conducting zone warms, filters air (anatomical dead space)` : difficulty === 2 ? `Respiratory zone where gas exchange occurs (alveoli)` : `Thin membrane (0.5 μm) for efficient gas diffusion` },
        ],
        correct: "D",
        explanation: `Respiratory system in ${topic}: ${difficulty === 1 ? 'Conducting zone: nasal cavity to terminal bronchioles, no gas exchange (150ml dead space)' : difficulty === 2 ? 'Respiratory zone: respiratory bronchioles to alveoli, actual gas exchange site' : 'Alveolar-capillary membrane extremely thin for rapid O₂/CO₂ diffusion'}. Critical NEET concept.`,
      },
      {
        question: `During ${difficulty === 1 ? 'depolarization' : difficulty === 2 ? 'repolarization' : 'hyperpolarization'} of a neuron in ${topic}:`,
        options: [
          { id: "A", text: `Na⁺ channels open, membrane potential becomes positive` },
          { id: "B", text: `K⁺ channels open, membrane potential returns to negative` },
          { id: "C", text: `Membrane potential becomes more negative than resting potential` },
          { id: "D", text: difficulty === 1 ? `Voltage-gated Na⁺ influx (+30 mV)` : difficulty === 2 ? `K⁺ efflux restores negative charge (-70 mV)` : `Excessive K⁺ efflux (-80 to -90 mV briefly)` },
        ],
        correct: "D",
        explanation: `Action potential in ${topic}: ${difficulty === 1 ? 'Depolarization: Na⁺ rushes in, membrane goes from -70mV to +30mV' : difficulty === 2 ? 'Repolarization: K⁺ moves out, membrane returns toward -70mV' : 'Hyperpolarization: undershoot to -80/-90mV before Na⁺-K⁺ pump restores -70mV'}. Essential for NEET neurophysiology.`,
      },
      {
        question: `In human ${difficulty === 1 ? 'spermatogenesis' : difficulty === 2 ? 'oogenesis' : 'fertilization'} (${topic}), the significant feature is:`,
        options: [
          { id: "A", text: `Continuous process from puberty producing millions of sperm daily` },
          { id: "B", text: `Discontinuous with meiosis I completed at ovulation, meiosis II after fertilization` },
          { id: "C", text: `Fusion of sperm and ovum occurs in ampullary-isthmic junction of fallopian tube` },
          { id: "D", text: difficulty === 1 ? `Spermatogenesis: continuous, ~74 days, millions of sperm` : difficulty === 2 ? `Oogenesis: arrested in prophase I, completed only if fertilized` : `Fertilization in ampulla; acrosome reaction, cortical reaction prevent polyspermy` },
        ],
        correct: "D",
        explanation: `Reproductive biology in ${topic}: ${difficulty === 1 ? 'Spermatogenesis continuous from puberty (Sertoli cells support), produces ~200M sperm/day' : difficulty === 2 ? 'Oogenesis: primary oocyte arrests in prophase I until ovulation, secondary oocyte arrests in metaphase II until fertilization' : 'Fertilization: sperm capacitation, acrosome reaction, zona reaction and cortical reaction prevent multiple sperm entry'}. Key NEET reproductive concept.`,
      },
    ];
    
    const selectedQuestion = questionTypes[index % questionTypes.length];
    return {
      question: `[${topic}] ${selectedQuestion.question}`,
      options: selectedQuestion.options,
      correct: selectedQuestion.correct,
      explanation: selectedQuestion.explanation,
      difficulty,
    };
  }

  private getGenericTemplate(subject: string, chapter: number, difficulty: number, index: number): QuestionTemplate {
    return {
      question: `${subject} Chapter ${chapter} - NEET Level Question ${index + 1} (Difficulty: ${difficulty})`,
      options: [
        { id: "A", text: "Option A - First possibility" },
        { id: "B", text: "Option B - Second possibility" },
        { id: "C", text: "Option C - Third possibility" },
        { id: "D", text: "Option D - Fourth possibility" },
      ],
      correct: ["A", "B", "C", "D"][index % 4],
      explanation: `Detailed explanation for ${subject} chapter ${chapter} question.`,
      difficulty,
    };
  }

  private generateSolutionSteps(explanation: string): string[] {
    return [
      "Step 1: Identify the given information and what needs to be found",
      "Step 2: Apply relevant formulas or concepts",
      "Step 3: Perform calculations or logical deductions",
      "Step 4: Verify the answer with the given options",
    ];
  }

  private async getOrCreateTopic(subject: string, chapter: number) {
    const topicName = `Chapter ${chapter}`;
    
    const existing = await db
      .select()
      .from(contentTopics)
      .where(eq(contentTopics.topicName, topicName))
      .limit(1);

    if (existing.length > 0 && existing[0].subject === subject) {
      return existing[0];
    }

    const [newTopic] = await db.insert(contentTopics).values({
      subject,
      classLevel: "Class XI-XII",
      topicName,
      ncertChapter: `Chapter ${chapter}`,
      referenceBooks: ["NCERT", "Reference Books"],
    }).returning();

    return newTopic;
  }

  private async saveBatch(batch: InsertQuestion[]): Promise<void> {
    try {
      await db.insert(questions).values(batch);
    } catch (error) {
      console.error("Error saving batch:", error);
      throw error;
    }
  }
}

export const bulkQuestionGenerator = new BulkQuestionGenerator();
