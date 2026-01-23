import { db } from "../db";
import { contentTopics, questions } from "../../shared/schema";
import { eq } from "drizzle-orm";

const SURFACE_TOPIC_ID = 2102;

async function seedSurfaceChemistryQuestions() {
  console.log("🌐 Seeding Surface Chemistry questions...");

  await db
    .insert(contentTopics)
    .values({
      id: SURFACE_TOPIC_ID,
      subject: "Chemistry",
      classLevel: "12",
      topicName: "Surface Chemistry Mastery",
      ncertChapter: "Surface Chemistry",
      referenceBooks: ["NCERT Class 12 Chemistry - Chapter 5"],
    })
    .onConflictDoUpdate({
      target: contentTopics.id,
      set: {
        subject: "Chemistry",
        classLevel: "12",
        topicName: "Surface Chemistry Mastery",
        ncertChapter: "Surface Chemistry",
        referenceBooks: ["NCERT Class 12 Chemistry - Chapter 5"],
      },
    });

  const questionData = [
    {
      topicId: SURFACE_TOPIC_ID,
      questionText:
        "Physisorption is generally exothermic. Which combination correctly lists its characteristics?",
      options: [
        { id: "A", text: "Low enthalpy change, multilayer, reversible" },
        { id: "B", text: "High enthalpy change, monolayer, irreversible" },
        { id: "C", text: "Requires activation energy, specific to adsorbate" },
        { id: "D", text: "Occurs best at high temperature and low pressure" },
      ],
      correctAnswer: "A",
      solutionDetail:
        "Physisorption involves weak van der Waals forces, releases small heat (20-40 kJ mol^-1), forms multilayers and is easily reversible.",
      difficultyLevel: 1,
      sourceType: "surface_chemistry_seed",
    },
    {
      topicId: SURFACE_TOPIC_ID,
      questionText:
        "In the Langmuir adsorption isotherm, what does theta = (bP)/(1 + bP) represent?",
      options: [
        { id: "A", text: "Rate of adsorption" },
        { id: "B", text: "Fraction of surface covered" },
        { id: "C", text: "Adsorption coefficient" },
        { id: "D", text: "Number of layers formed" },
      ],
      correctAnswer: "B",
      solutionDetail:
        "Theta denotes the fraction of available surface occupied by adsorbed molecules for monolayer adsorption on identical sites.",
      difficultyLevel: 2,
      sourceType: "surface_chemistry_seed",
    },
    {
      topicId: SURFACE_TOPIC_ID,
      questionText:
        "Which statement about heterogeneous catalysis during the Haber process is correct?",
      options: [
        {
          id: "A",
          text: "Nitrogen and hydrogen remain in the gas phase, so adsorption is unnecessary",
        },
        {
          id: "B",
          text: "Reactant molecules are temporarily held on the iron surface where bonds weaken",
        },
        {
          id: "C",
          text: "Products leave the surface only when a poison is added",
        },
        { id: "D", text: "Catalytic activity is independent of surface area" },
      ],
      correctAnswer: "B",
      solutionDetail:
        "In heterogeneous catalysis the reactants adsorb on active sites of the solid catalyst, become activated, react and desorb as products.",
      difficultyLevel: 2,
      sourceType: "surface_chemistry_seed",
    },
    {
      topicId: SURFACE_TOPIC_ID,
      questionText:
        "A gold sol is protected from coagulation by gelatin. This illustrates the concept of:",
      options: [
        { id: "A", text: "Electrophoresis" },
        { id: "B", text: "Protective colloids and gold number" },
        { id: "C", text: "Tyndall effect" },
        { id: "D", text: "Dialysis" },
      ],
      correctAnswer: "B",
      solutionDetail:
        "Gelatin adsorbs on the particle surface, preventing aggregation even when electrolytes are added. Protective colloids are quantified by gold number.",
      difficultyLevel: 1,
      sourceType: "surface_chemistry_seed",
    },
    {
      topicId: SURFACE_TOPIC_ID,
      questionText:
        "Hardy–Schulze rule states that the ability of an electrolyte to coagulate a lyophobic sol depends mainly on:",
      options: [
        { id: "A", text: "Size of dispersed particles" },
        { id: "B", text: "Valence of the counter-ions supplied by the electrolyte" },
        { id: "C", text: "Colour of the sol" },
        { id: "D", text: "Viscosity of the dispersion medium" },
      ],
      correctAnswer: "B",
      solutionDetail:
        "Higher valence counter-ions neutralise the charge on colloidal particles more efficiently, causing rapid coagulation.",
      difficultyLevel: 1,
      sourceType: "surface_chemistry_seed",
    },
  ];

  await db.delete(questions).where(eq(questions.topicId, SURFACE_TOPIC_ID));
  await db.insert(questions).values(questionData);

  console.log(
    `✅ Surface Chemistry topic ${SURFACE_TOPIC_ID} seeded with ${questionData.length} questions.`,
  );
}

seedSurfaceChemistryQuestions()
  .then(() => {
    console.log("Surface Chemistry question seeding complete.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Surface Chemistry seeding failed:", error);
    process.exit(1);
  });
