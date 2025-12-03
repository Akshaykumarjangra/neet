import { db } from "./server/db";
import { questions, contentTopics } from "./shared/schema";
import { eq } from "drizzle-orm";

/**
 * Generate real questions for Physical World and Measurement topic
 */

const physicalWorldQuestions = [
   {
      text: "The SI unit of length is:",
      options: ["Meter", "Centimeter", "Kilometer", "Millimeter"],
      correctAnswer: "A",
      explanation: "The SI (International System of Units) base unit of length is the meter (m).",
      difficulty: 1
   },
   {
      text: "Which of the following is a fundamental quantity?",
      options: ["Force", "Velocity", "Mass", "Acceleration"],
      correctAnswer: "C",
      explanation: "Mass is a fundamental quantity. Force, velocity, and acceleration are derived quantities.",
      difficulty: 1
   },
   {
      text: "The dimensional formula of force is:",
      options: ["[MLT⁻²]", "[MLT⁻¹]", "[ML²T⁻²]", "[ML⁻¹T⁻²]"],
      correctAnswer: "A",
      explanation: "Force = mass × acceleration. Dimension of force = [M][LT⁻²] = [MLT⁻²]",
      difficulty: 2
   },
   {
      text: "1 light year is equal to:",
      options: ["9.46 × 10¹⁵ m", "9.46 × 10¹² m", "9.46 × 10¹⁸ m", "9.46 × 10⁹ m"],
      correctAnswer: "A",
      explanation: "1 light year = distance traveled by light in 1 year = 9.46 × 10¹⁵ meters",
      difficulty: 2
   },
   {
      text: "The least count of a vernier caliper is:",
      options: ["0.1 mm", "0.01 mm", "0.001 mm", "1 mm"],
      correctAnswer: "A",
      explanation: "Standard vernier caliper has a least count of 0.1 mm or 0.01 cm.",
      difficulty: 1
   },
   {
      text: "Parallax method is used to measure:",
      options: ["Very small distances", "Very large distances", "Medium distances", "Atomic distances"],
      correctAnswer: "B",
      explanation: "Parallax method is used to measure very large distances like distances to stars.",
      difficulty: 2
   },
   {
      text: "The number of significant figures in 0.00340 is:",
      options: ["2", "3", "4", "5"],
      correctAnswer: "B",
      explanation: "Leading zeros are not significant. The significant figures are 3, 4, and 0 = 3 figures.",
      difficulty: 2
   },
   {
      text: "Which of the following has the dimensions of energy?",
      options: ["Force × Distance", "Force × Time", "Force × Velocity", "Force × Acceleration"],
      correctAnswer: "A",
      explanation: "Energy = Work = Force × Distance. Dimension: [MLT⁻²][L] = [ML²T⁻²]",
      difficulty: 2
   },
   {
      text: "The SI unit of temperature is:",
      options: ["Celsius", "Fahrenheit", "Kelvin", "Rankine"],
      correctAnswer: "C",
      explanation: "Kelvin (K) is the SI unit of thermodynamic temperature.",
      difficulty: 1
   },
   {
      text: "1 parsec is equal to:",
      options: ["3.26 light years", "1 light year", "10 light years", "100 light years"],
      correctAnswer: "A",
      explanation: "1 parsec = 3.26 light years = 3.08 × 10¹⁶ meters",
      difficulty: 2
   },
   {
      text: "The dimensional formula of pressure is:",
      options: ["[ML⁻¹T⁻²]", "[MLT⁻²]", "[ML²T⁻²]", "[M⁻¹LT⁻²]"],
      correctAnswer: "A",
      explanation: "Pressure = Force/Area = [MLT⁻²]/[L²] = [ML⁻¹T⁻²]",
      difficulty: 2
   },
   {
      text: "Which instrument is used to measure very small lengths?",
      options: ["Meter scale", "Vernier caliper", "Screw gauge", "All of these"],
      correctAnswer: "C",
      explanation: "Screw gauge (micrometer) is used to measure very small lengths with least count 0.01 mm.",
      difficulty: 1
   },
   {
      text: "The order of magnitude of 4.7 × 10⁶ is:",
      options: ["6", "7", "5", "8"],
      correctAnswer: "B",
      explanation: "Since 4.7 > √10 (3.16), we round up. Order of magnitude = 7 (10⁷)",
      difficulty: 2
   },
   {
      text: "Which of the following is a vector quantity?",
      options: ["Mass", "Speed", "Displacement", "Temperature"],
      correctAnswer: "C",
      explanation: "Displacement has both magnitude and direction, making it a vector quantity.",
      difficulty: 1
   },
   {
      text: "The dimensional formula of angular momentum is:",
      options: ["[ML²T⁻¹]", "[MLT⁻¹]", "[ML²T⁻²]", "[MLT⁻²]"],
      correctAnswer: "A",
      explanation: "Angular momentum = mvr = [M][LT⁻¹][L] = [ML²T⁻¹]",
      difficulty: 2
   },
   {
      text: "1 astronomical unit (AU) is approximately:",
      options: ["1.5 × 10⁸ km", "1.5 × 10¹¹ m", "Both A and B", "None of these"],
      correctAnswer: "C",
      explanation: "1 AU = average Earth-Sun distance = 1.5 × 10⁸ km = 1.5 × 10¹¹ m",
      difficulty: 2
   },
   {
      text: "The principle of homogeneity of dimensions states that:",
      options: ["Dimensions of all terms must be same", "Dimensions can be different", "Only SI units are valid", "Dimensions are not important"],
      correctAnswer: "A",
      explanation: "In a valid equation, all terms must have the same dimensions (principle of homogeneity).",
      difficulty: 2
   },
   {
      text: "Which of the following is dimensionless?",
      options: ["Strain", "Stress", "Force", "Pressure"],
      correctAnswer: "A",
      explanation: "Strain = Change in length/Original length = [L]/[L] = dimensionless",
      difficulty: 2
   },
   {
      text: "The SI unit of electric current is:",
      options: ["Coulomb", "Ampere", "Volt", "Ohm"],
      correctAnswer: "B",
      explanation: "Ampere (A) is the SI base unit of electric current.",
      difficulty: 1
   },
   {
      text: "Accuracy of measurement depends on:",
      options: ["Least count of instrument", "Skill of observer", "Number of measurements", "All of these"],
      correctAnswer: "D",
      explanation: "Accuracy depends on instrument precision, observer skill, and multiple measurements.",
      difficulty: 2
   },
   {
      text: "The dimensional formula of power is:",
      options: ["[ML²T⁻³]", "[ML²T⁻²]", "[MLT⁻³]", "[ML²T⁻¹]"],
      correctAnswer: "A",
      explanation: "Power = Work/Time = [ML²T⁻²]/[T] = [ML²T⁻³]",
      difficulty: 2
   },
   {
      text: "Which of the following pairs has the same dimensions?",
      options: ["Work and Power", "Force and Pressure", "Momentum and Impulse", "Energy and Force"],
      correctAnswer: "C",
      explanation: "Momentum = mv and Impulse = Ft both have dimensions [MLT⁻¹]",
      difficulty: 2
   },
   {
      text: "The SI unit of amount of substance is:",
      options: ["Kilogram", "Mole", "Gram", "Molecule"],
      correctAnswer: "B",
      explanation: "Mole (mol) is the SI base unit for amount of substance.",
      difficulty: 1
   },
   {
      text: "Percentage error in measurement is:",
      options: ["(Error/True value) × 100", "(True value/Error) × 100", "Error × 100", "True value × 100"],
      correctAnswer: "A",
      explanation: "Percentage error = (Absolute error/True value) × 100%",
      difficulty: 2
   },
   {
      text: "The dimensional formula of frequency is:",
      options: ["[T⁻¹]", "[T]", "[LT⁻¹]", "[L⁻¹T]"],
      correctAnswer: "A",
      explanation: "Frequency = 1/Time period = [T⁻¹]",
      difficulty: 1
   },
   {
      text: "Which of the following is a scalar quantity?",
      options: ["Velocity", "Acceleration", "Force", "Energy"],
      correctAnswer: "D",
      explanation: "Energy has only magnitude, no direction, making it a scalar quantity.",
      difficulty: 1
   },
   {
      text: "The least count of a screw gauge is:",
      options: ["0.01 mm", "0.1 mm", "0.001 mm", "1 mm"],
      correctAnswer: "A",
      explanation: "Standard screw gauge has a least count of 0.01 mm.",
      difficulty: 1
   },
   {
      text: "Dimensional analysis can be used to:",
      options: ["Check correctness of equations", "Derive relations", "Convert units", "All of these"],
      correctAnswer: "D",
      explanation: "Dimensional analysis is used for checking equations, deriving relations, and unit conversion.",
      difficulty: 2
   },
   {
      text: "The SI unit of luminous intensity is:",
      options: ["Lumen", "Candela", "Lux", "Watt"],
      correctAnswer: "B",
      explanation: "Candela (cd) is the SI base unit of luminous intensity.",
      difficulty: 1
   },
   {
      text: "Random errors can be reduced by:",
      options: ["Taking multiple measurements", "Using better instruments", "Calibrating instruments", "All of these"],
      correctAnswer: "A",
      explanation: "Random errors are reduced by taking multiple measurements and finding the mean.",
      difficulty: 2
   },
   {
      text: "The dimensional formula of velocity is:",
      options: ["[LT⁻¹]", "[LT]", "[L²T⁻¹]", "[LT⁻²]"],
      correctAnswer: "A",
      explanation: "Velocity = Distance/Time = [L]/[T] = [LT⁻¹]",
      difficulty: 1
   },
   {
      text: "Which of the following has dimensions [ML⁻³]?",
      options: ["Density", "Pressure", "Force", "Energy"],
      correctAnswer: "A",
      explanation: "Density = Mass/Volume = [M]/[L³] = [ML⁻³]",
      difficulty: 2
   },
   {
      text: "The number of base units in SI system is:",
      options: ["5", "6", "7", "8"],
      correctAnswer: "C",
      explanation: "There are 7 base SI units: meter, kilogram, second, ampere, kelvin, mole, candela.",
      difficulty: 1
   },
   {
      text: "Systematic errors can be reduced by:",
      options: ["Taking more measurements", "Calibrating instruments", "Using different methods", "Both B and C"],
      correctAnswer: "D",
      explanation: "Systematic errors are reduced by proper calibration and using different measurement methods.",
      difficulty: 2
   },
   {
      text: "The dimensional formula of gravitational constant G is:",
      options: ["[M⁻¹L³T⁻²]", "[ML³T⁻²]", "[M⁻¹L²T⁻²]", "[ML²T⁻²]"],
      correctAnswer: "A",
      explanation: "From F = Gm₁m₂/r², G = Fr²/(m₁m₂) = [MLT⁻²][L²]/[M²] = [M⁻¹L³T⁻²]",
      difficulty: 3
   },
   {
      text: "Which of the following is not a fundamental unit?",
      options: ["Meter", "Newton", "Kilogram", "Second"],
      correctAnswer: "B",
      explanation: "Newton is a derived unit (kg⋅m/s²), not a fundamental unit.",
      difficulty: 1
   },
   {
      text: "The pitch of a screw gauge is:",
      options: ["Distance moved by screw in one rotation", "Least count", "Number of divisions on circular scale", "Zero error"],
      correctAnswer: "A",
      explanation: "Pitch is the distance moved by the screw along its axis in one complete rotation.",
      difficulty: 2
   },
   {
      text: "Relative error is defined as:",
      options: ["Absolute error/True value", "True value/Absolute error", "Absolute error × True value", "Absolute error + True value"],
      correctAnswer: "A",
      explanation: "Relative error = Absolute error/True value (dimensionless)",
      difficulty: 2
   },
   {
      text: "The dimensional formula of Planck's constant is:",
      options: ["[ML²T⁻¹]", "[ML²T⁻²]", "[MLT⁻¹]", "[ML²T⁻³]"],
      correctAnswer: "A",
      explanation: "From E = hν, h = E/ν = [ML²T⁻²]/[T⁻¹] = [ML²T⁻¹]",
      difficulty: 3
   },
   {
      text: "Which of the following is a supplementary unit?",
      options: ["Meter", "Radian", "Kilogram", "Second"],
      correctAnswer: "B",
      explanation: "Radian (for plane angle) and steradian (for solid angle) are supplementary units.",
      difficulty: 2
   },
   {
      text: "The zero error of an instrument is:",
      options: ["A systematic error", "A random error", "Not an error", "A gross error"],
      correctAnswer: "A",
      explanation: "Zero error is a systematic error that occurs when instrument doesn't read zero when it should.",
      difficulty: 2
   },
   {
      text: "1 fermi is equal to:",
      options: ["10⁻¹⁵ m", "10⁻¹² m", "10⁻⁹ m", "10⁻⁶ m"],
      correctAnswer: "A",
      explanation: "1 fermi = 10⁻¹⁵ m (used to measure nuclear dimensions)",
      difficulty: 2
   },
   {
      text: "The dimensional formula of torque is:",
      options: ["[ML²T⁻²]", "[MLT⁻²]", "[ML²T⁻¹]", "[MLT⁻¹]"],
      correctAnswer: "A",
      explanation: "Torque = Force × Distance = [MLT⁻²][L] = [ML²T⁻²] (same as energy)",
      difficulty: 2
   },
   {
      text: "Which of the following cannot be determined by dimensional analysis?",
      options: ["Numerical constants", "Dimensions of physical quantities", "Unit conversion", "Checking equation validity"],
      correctAnswer: "A",
      explanation: "Dimensional analysis cannot determine dimensionless numerical constants in equations.",
      difficulty: 2
   },
   {
      text: "The SI unit of plane angle is:",
      options: ["Degree", "Radian", "Steradian", "Revolution"],
      correctAnswer: "B",
      explanation: "Radian (rad) is the SI unit of plane angle.",
      difficulty: 1
   },
   {
      text: "Mean absolute error is:",
      options: ["Sum of absolute errors / Number of observations", "Sum of errors", "Average of measurements", "Standard deviation"],
      correctAnswer: "A",
      explanation: "Mean absolute error = (Σ|Δa|)/n where n is number of observations",
      difficulty: 2
   },
   {
      text: "1 angstrom is equal to:",
      options: ["10⁻¹⁰ m", "10⁻⁸ m", "10⁻⁹ m", "10⁻¹² m"],
      correctAnswer: "A",
      explanation: "1 angstrom (Å) = 10⁻¹⁰ m (used for atomic dimensions)",
      difficulty: 2
   },
   {
      text: "The dimensional formula of coefficient of viscosity is:",
      options: ["[ML⁻¹T⁻¹]", "[MLT⁻¹]", "[ML⁻¹T⁻²]", "[MLT⁻²]"],
      correctAnswer: "A",
      explanation: "Viscosity η = Force/(Area × velocity gradient) = [MLT⁻²]/([L²][T⁻¹]) = [ML⁻¹T⁻¹]",
      difficulty: 3
   },
   {
      text: "Which of the following has the same dimensions as impulse?",
      options: ["Force", "Momentum", "Energy", "Power"],
      correctAnswer: "B",
      explanation: "Impulse = Force × Time = [MLT⁻²][T] = [MLT⁻¹] = Momentum",
      difficulty: 2
   },
   {
      text: "The vernier constant of a vernier caliper is:",
      options: ["1 MSD - 1 VSD", "1 VSD - 1 MSD", "1 MSD + 1 VSD", "1 MSD / 1 VSD"],
      correctAnswer: "A",
      explanation: "Vernier constant (least count) = 1 Main Scale Division - 1 Vernier Scale Division",
      difficulty: 2
   }
];

async function fixPhysicalWorldQuestions() {
   try {
      console.log('🎯 Generating real questions for Physical World and Measurement...\n');

      const topics = await db.select().from(contentTopics);
      const topic = topics.find(t =>
         t.subject === 'Physics' &&
         t.topicName.toLowerCase().includes('physical world')
      );

      if (!topic) {
         console.log('❌ Topic not found: Physical World and Measurement');
         process.exit(1);
      }

      console.log(`✅ Found topic: ${topic.topicName} (ID: ${topic.id})\n`);

      // Get all questions for this topic
      const topicQuestions = await db.select()
         .from(questions)
         .where(eq(questions.topicId, topic.id));

      console.log(`📊 Total questions in topic: ${topicQuestions.length}`);
      console.log(`📝 Real questions to add: ${physicalWorldQuestions.length}\n`);

      let updated = 0;
      for (let i = 0; i < Math.min(physicalWorldQuestions.length, topicQuestions.length); i++) {
         const q = physicalWorldQuestions[i];
         const targetQuestion = topicQuestions[i];

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
               difficultyLevel: q.difficulty,
            })
            .where(eq(questions.id, targetQuestion.id));

         updated++;
      }

      console.log(`✅ Updated ${updated} questions for Physical World and Measurement`);

   } catch (err: any) {
      console.error(`❌ Error: ${err.message}`);
      process.exit(1);
   }
}

fixPhysicalWorldQuestions().then(() => {
   console.log('\n✅ Complete!');
   process.exit(0);
});
