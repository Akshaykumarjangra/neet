import { db } from "./server/db";
import { questions, contentTopics } from "./shared/schema";
import { eq } from "drizzle-orm";

/**
 * Generate Real Biology Questions for NEET
 * Covers Botany and Zoology topics
 */

const biologyQuestionTemplates = {
   cellBiology: [
      {
         text: "Which organelle is known as the 'powerhouse of the cell'?",
         options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
         correctAnswer: "B",
         explanation: "Mitochondria produce ATP through cellular respiration, providing energy for all cellular activities."
      },
      {
         text: "The cell wall of plant cells is primarily composed of:",
         options: ["Cellulose", "Chitin", "Peptidoglycan", "Protein"],
         correctAnswer: "A",
         explanation: "Plant cell walls are made of cellulose, a polysaccharide that provides structural support."
      },
      {
         text: "Which structure controls the entry and exit of materials in a cell?",
         options: ["Cell wall", "Plasma membrane", "Nuclear membrane", "Cytoplasm"],
         correctAnswer: "B",
         explanation: "The plasma membrane is selectively permeable and regulates what enters and exits the cell."
      },
      {
         text: "Ribosomes are the site of:",
         options: ["DNA replication", "Protein synthesis", "Lipid synthesis", "Photosynthesis"],
         correctAnswer: "B",
         explanation: "Ribosomes translate mRNA into proteins through the process of translation."
      },
      {
         text: "Which organelle contains digestive enzymes?",
         options: ["Mitochondria", "Chloroplast", "Lysosome", "Peroxisome"],
         correctAnswer: "C",
         explanation: "Lysosomes contain hydrolytic enzymes that break down cellular waste and foreign materials."
      }
   ],
   genetics: [
      {
         text: "The basic unit of heredity is:",
         options: ["Chromosome", "Gene", "DNA", "Allele"],
         correctAnswer: "B",
         explanation: "A gene is the basic physical and functional unit of heredity, consisting of DNA sequences."
      },
      {
         text: "In humans, the sex of a child is determined by:",
         options: ["Mother's X chromosome", "Father's X or Y chromosome", "Both parents equally", "Random chance"],
         correctAnswer: "B",
         explanation: "The father contributes either X or Y chromosome, determining the child's sex (XX=female, XY=male)."
      },
      {
         text: "A cross between two heterozygous individuals (Aa × Aa) produces offspring in the ratio:",
         options: ["1:1", "3:1", "1:2:1", "9:3:3:1"],
         correctAnswer: "C",
         explanation: "The genotypic ratio is 1 AA : 2 Aa : 1 aa, while phenotypic ratio is 3:1 (dominant:recessive)."
      },
      {
         text: "The process by which DNA makes a copy of itself is called:",
         options: ["Transcription", "Translation", "Replication", "Mutation"],
         correctAnswer: "C",
         explanation: "DNA replication is the process of producing two identical DNA molecules from one original DNA molecule."
      },
      {
         text: "Which of the following is a sex-linked disorder?",
         options: ["Sickle cell anemia", "Hemophilia", "Albinism", "Phenylketonuria"],
         correctAnswer: "B",
         explanation: "Hemophilia is a sex-linked recessive disorder carried on the X chromosome."
      }
   ],
   humanPhysiology: [
      {
         text: "The normal pH of human blood is:",
         options: ["6.8-7.0", "7.0-7.2", "7.35-7.45", "7.5-7.8"],
         correctAnswer: "C",
         explanation: "Normal blood pH is maintained between 7.35-7.45, slightly alkaline."
      },
      {
         text: "Which blood cells are responsible for blood clotting?",
         options: ["RBC", "WBC", "Platelets", "Plasma cells"],
         correctAnswer: "C",
         explanation: "Platelets (thrombocytes) play a crucial role in blood clotting and wound healing."
      },
      {
         text: "The functional unit of the kidney is:",
         options: ["Neuron", "Nephron", "Alveoli", "Villus"],
         correctAnswer: "B",
         explanation: "Nephron is the structural and functional unit of the kidney, responsible for filtration."
      },
      {
         text: "Which hormone regulates blood sugar levels?",
         options: ["Thyroxine", "Insulin", "Adrenaline", "Growth hormone"],
         correctAnswer: "B",
         explanation: "Insulin, produced by pancreatic beta cells, lowers blood glucose levels."
      },
      {
         text: "The pacemaker of the heart is:",
         options: ["SA node", "AV node", "Bundle of His", "Purkinje fibers"],
         correctAnswer: "A",
         explanation: "The sinoatrial (SA) node initiates the heartbeat and is called the natural pacemaker."
      }
   ],
   plantPhysiology: [
      {
         text: "Photosynthesis occurs in which organelle?",
         options: ["Mitochondria", "Chloroplast", "Nucleus", "Ribosome"],
         correctAnswer: "B",
         explanation: "Chloroplasts contain chlorophyll and are the site of photosynthesis in plant cells."
      },
      {
         text: "The raw materials for photosynthesis are:",
         options: ["CO₂ and H₂O", "O₂ and H₂O", "CO₂ and O₂", "Glucose and O₂"],
         correctAnswer: "A",
         explanation: "Plants use carbon dioxide and water in the presence of light to produce glucose and oxygen."
      },
      {
         text: "Stomata are mainly found on:",
         options: ["Roots", "Stems", "Leaves", "Flowers"],
         correctAnswer: "C",
         explanation: "Stomata are tiny pores mainly on the lower surface of leaves for gas exchange."
      },
      {
         text: "Transpiration is the loss of water through:",
         options: ["Roots", "Stomata", "Flowers", "Seeds"],
         correctAnswer: "B",
         explanation: "Transpiration is the evaporation of water from plant surfaces, mainly through stomata."
      },
      {
         text: "Which pigment is responsible for photosynthesis?",
         options: ["Carotene", "Xanthophyll", "Chlorophyll", "Anthocyanin"],
         correctAnswer: "C",
         explanation: "Chlorophyll (mainly chlorophyll a and b) is the primary pigment for photosynthesis."
      }
   ],
   ecology: [
      {
         text: "The study of interactions between organisms and their environment is called:",
         options: ["Genetics", "Ecology", "Taxonomy", "Morphology"],
         correctAnswer: "B",
         explanation: "Ecology is the branch of biology that studies the relationships between organisms and their environment."
      },
      {
         text: "Which of the following is a producer in an ecosystem?",
         options: ["Deer", "Lion", "Green plants", "Fungi"],
         correctAnswer: "C",
         explanation: "Green plants are producers (autotrophs) that make their own food through photosynthesis."
      },
      {
         text: "The flow of energy in an ecosystem is:",
         options: ["Cyclic", "Unidirectional", "Bidirectional", "Random"],
         correctAnswer: "B",
         explanation: "Energy flows in one direction from producers to consumers and is lost as heat at each level."
      },
      {
         text: "Which gas is primarily responsible for global warming?",
         options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
         correctAnswer: "C",
         explanation: "Carbon dioxide is the primary greenhouse gas contributing to global warming."
      },
      {
         text: "The maximum number of individuals that an environment can support is called:",
         options: ["Population density", "Carrying capacity", "Birth rate", "Growth rate"],
         correctAnswer: "B",
         explanation: "Carrying capacity is the maximum population size that an environment can sustain indefinitely."
      }
   ],
   evolution: [
      {
         text: "Who proposed the theory of natural selection?",
         options: ["Lamarck", "Darwin", "Mendel", "Watson"],
         correctAnswer: "B",
         explanation: "Charles Darwin proposed the theory of evolution by natural selection in 'On the Origin of Species'."
      },
      {
         text: "Homologous organs indicate:",
         options: ["Convergent evolution", "Divergent evolution", "Parallel evolution", "No evolution"],
         correctAnswer: "B",
         explanation: "Homologous organs have similar structure but different functions, indicating divergent evolution."
      },
      {
         text: "Vestigial organs in humans include:",
         options: ["Heart", "Appendix", "Liver", "Kidney"],
         correctAnswer: "B",
         explanation: "The appendix is a vestigial organ with no significant function in modern humans."
      },
      {
         text: "The process by which new species arise is called:",
         options: ["Mutation", "Speciation", "Adaptation", "Migration"],
         correctAnswer: "B",
         explanation: "Speciation is the evolutionary process by which populations evolve to become distinct species."
      },
      {
         text: "Fossils are evidence of:",
         options: ["Current biodiversity", "Evolution", "Extinction only", "Adaptation only"],
         correctAnswer: "B",
         explanation: "Fossils provide direct evidence of evolution and the history of life on Earth."
      }
   ]
};

async function generateBiologyQuestions() {
   try {
      console.log('🧬 Generating real Biology questions...\n');

      const topics = await db.select().from(contentTopics);
      const bioTopics = topics.filter(t =>
         t.subject === 'Botany' || t.subject === 'Zoology'
      );

      console.log(`📊 Found ${bioTopics.length} Biology topics\n`);

      let totalUpdated = 0;

      for (const topic of bioTopics) {
         // Get placeholder questions for this topic
         const topicQuestions = await db.select()
            .from(questions)
            .where(eq(questions.topicId, topic.id));

         const placeholders = topicQuestions.filter(q =>
            q.questionText.includes('Which of the following statements is correct') ||
            q.questionText.includes('In which scenario would this principle') ||
            q.questionText.includes('What is the primary characteristic')
         );

         if (placeholders.length === 0) continue;

         // Select appropriate question template based on topic name
         let questionSet = biologyQuestionTemplates.cellBiology;
         const topicLower = topic.topicName.toLowerCase();

         if (topicLower.includes('cell') || topicLower.includes('structure')) {
            questionSet = biologyQuestionTemplates.cellBiology;
         } else if (topicLower.includes('genetic') || topicLower.includes('inheritance') || topicLower.includes('dna')) {
            questionSet = biologyQuestionTemplates.genetics;
         } else if (topicLower.includes('physiology') || topicLower.includes('human') || topicLower.includes('circulation') || topicLower.includes('respiration')) {
            questionSet = biologyQuestionTemplates.humanPhysiology;
         } else if (topicLower.includes('plant') || topicLower.includes('photosynthesis') || topicLower.includes('transpiration')) {
            questionSet = biologyQuestionTemplates.plantPhysiology;
         } else if (topicLower.includes('ecology') || topicLower.includes('ecosystem') || topicLower.includes('environment')) {
            questionSet = biologyQuestionTemplates.ecology;
         } else if (topicLower.includes('evolution') || topicLower.includes('origin')) {
            questionSet = biologyQuestionTemplates.evolution;
         }

         // Update questions
         const updateCount = Math.min(placeholders.length, questionSet.length * 3);

         for (let i = 0; i < updateCount; i++) {
            const q = questionSet[i % questionSet.length];
            const placeholder = placeholders[i];

            const formattedOptions = q.options.map((opt, idx) => ({
               id: String.fromCharCode(65 + idx),
               text: opt
            }));

            await db.update(questions)
               .set({
                  questionText: q.text,
                  options: formattedOptions,
                  correctAnswer: q.correctAnswer,
                  solutionDetail: q.explanation,
                  solutionSteps: [q.explanation],
                  difficultyLevel: Math.floor(Math.random() * 3) + 1,
               })
               .where(eq(questions.id, placeholder.id));

            totalUpdated++;
         }

         console.log(`✅ ${topic.topicName}: ${updateCount} questions updated`);
      }

      console.log(`\n📊 Summary:`);
      console.log(`   Total Biology questions updated: ${totalUpdated}`);

   } catch (err: any) {
      console.error(`❌ Error: ${err.message}`);
      process.exit(1);
   }
}

generateBiologyQuestions().then(() => {
   console.log('\n✅ Biology questions generation complete!');
   process.exit(0);
});
