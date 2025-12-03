import { db } from "./server/db";
import { questions, contentTopics } from "./shared/schema";
import { eq } from "drizzle-orm";

/**
 * Generate 50 real Kinematics questions
 */

const kinematicsQuestions = [
   {
      text: "A car accelerates uniformly from 18 km/h to 36 km/h in 5 seconds. Calculate the acceleration.",
      options: ["0.5 m/s²", "1 m/s²", "1.5 m/s²", "2 m/s²"],
      correctAnswer: "B",
      explanation: "Convert to m/s: 18 km/h = 5 m/s, 36 km/h = 10 m/s. a = (v-u)/t = (10-5)/5 = 1 m/s²",
      difficulty: 1
   },
   {
      text: "A ball is thrown upward with velocity 30 m/s. After how much time will it return to the thrower? (g = 10 m/s²)",
      options: ["3 s", "4 s", "5 s", "6 s"],
      correctAnswer: "D",
      explanation: "Time of flight = 2u/g = 2×30/10 = 6 seconds",
      difficulty: 2
   },
   {
      text: "The area under velocity-time graph represents:",
      options: ["Acceleration", "Displacement", "Speed", "Force"],
      correctAnswer: "B",
      explanation: "Area under v-t graph gives displacement.",
      difficulty: 1
   },
   {
      text: "A particle moves with constant speed in a circular path. Its acceleration is:",
      options: ["Zero", "Constant in magnitude", "Constant in direction", "Both magnitude and direction"],
      correctAnswer: "B",
      explanation: "In uniform circular motion, centripetal acceleration is constant in magnitude but changes direction.",
      difficulty: 2
   },
   {
      text: "The velocity of a particle is given by v = 3t² + 2t. What is its acceleration at t = 2s?",
      options: ["10 m/s²", "12 m/s²", "14 m/s²", "16 m/s²"],
      correctAnswer: "C",
      explanation: "a = dv/dt = 6t + 2. At t = 2s, a = 6(2) + 2 = 14 m/s²",
      difficulty: 3
   },
   {
      text: "A body starts from rest and moves with uniform acceleration. It covers 10 m in the first 2 seconds. What distance will it cover in the next 2 seconds?",
      options: ["20 m", "30 m", "40 m", "50 m"],
      correctAnswer: "B",
      explanation: "Using s = ut + ½at², find a = 5 m/s². Distance in 4s = 40m. Distance in next 2s = 40-10 = 30m",
      difficulty: 3
   },
   {
      text: "The slope of displacement-time graph gives:",
      options: ["Acceleration", "Velocity", "Distance", "Speed"],
      correctAnswer: "B",
      explanation: "Slope of s-t graph = ds/dt = velocity",
      difficulty: 1
   },
   {
      text: "A stone is dropped from a height of 80 m. How long will it take to reach the ground? (g = 10 m/s²)",
      options: ["2 s", "4 s", "6 s", "8 s"],
      correctAnswer: "B",
      explanation: "Using h = ½gt², 80 = ½×10×t², t² = 16, t = 4 seconds",
      difficulty: 2
   },
   {
      text: "The equation of motion v² = u² + 2as is valid for:",
      options: ["Uniform motion", "Uniformly accelerated motion", "Non-uniform motion", "Circular motion"],
      correctAnswer: "B",
      explanation: "This is one of the three equations of uniformly accelerated motion.",
      difficulty: 1
   },
   {
      text: "A body moving with velocity 10 m/s comes to rest after traveling 50 m. What is the retardation?",
      options: ["0.5 m/s²", "1 m/s²", "1.5 m/s²", "2 m/s²"],
      correctAnswer: "B",
      explanation: "Using v² = u² + 2as, 0 = 100 + 2a(50), a = -1 m/s² (retardation = 1 m/s²)",
      difficulty: 2
   },
   {
      text: "The ratio of distances covered by a freely falling body in 1st, 2nd, and 3rd seconds is:",
      options: ["1:2:3", "1:3:5", "1:4:9", "1:1:1"],
      correctAnswer: "B",
      explanation: "Distance in nth second = u + a(n-0.5). For free fall: 1st sec = 5m, 2nd = 15m, 3rd = 25m. Ratio = 1:3:5",
      difficulty: 3
   },
   {
      text: "A car moving at 72 km/h is brought to rest in 10 seconds. The retardation is:",
      options: ["1 m/s²", "2 m/s²", "3 m/s²", "4 m/s²"],
      correctAnswer: "B",
      explanation: "72 km/h = 20 m/s. a = (v-u)/t = (0-20)/10 = -2 m/s²",
      difficulty: 2
   },
   {
      text: "The velocity-time graph for uniform motion is:",
      options: ["Straight line parallel to time axis", "Straight line parallel to velocity axis", "Parabola", "Hyperbola"],
      correctAnswer: "A",
      explanation: "For uniform motion, velocity is constant, so v-t graph is horizontal line.",
      difficulty: 1
   },
   {
      text: "A body is thrown vertically upward. At the highest point:",
      options: ["Velocity is zero, acceleration is zero", "Velocity is zero, acceleration is g", "Velocity is maximum, acceleration is zero", "Both velocity and acceleration are maximum"],
      correctAnswer: "B",
      explanation: "At highest point, velocity = 0 but acceleration = g (downward) always.",
      difficulty: 2
   },
   {
      text: "The distance traveled by a body in nth second is given by:",
      options: ["u + a(n-1)", "u + an", "u + a(n-0.5)", "u + a(n+0.5)"],
      correctAnswer: "C",
      explanation: "Distance in nth second: s_n = u + a(n - 0.5)",
      difficulty: 2
   },
   {
      text: "A particle has initial velocity 5 m/s and acceleration 2 m/s². Its velocity after 10 seconds is:",
      options: ["15 m/s", "20 m/s", "25 m/s", "30 m/s"],
      correctAnswer: "C",
      explanation: "v = u + at = 5 + 2(10) = 25 m/s",
      difficulty: 1
   },
   {
      text: "The acceleration of a body moving with uniform velocity is:",
      options: ["Positive", "Negative", "Zero", "Variable"],
      correctAnswer: "C",
      explanation: "Uniform velocity means no change in velocity, hence acceleration = 0",
      difficulty: 1
   },
   {
      text: "A body covers half its journey with speed v₁ and the other half with speed v₂. The average speed is:",
      options: ["(v₁+v₂)/2", "2v₁v₂/(v₁+v₂)", "√(v₁v₂)", "v₁v₂/(v₁+v₂)"],
      correctAnswer: "B",
      explanation: "Average speed = Total distance/Total time = 2v₁v₂/(v₁+v₂) (harmonic mean)",
      difficulty: 3
   },
   {
      text: "The slope of velocity-time graph gives:",
      options: ["Displacement", "Distance", "Acceleration", "Speed"],
      correctAnswer: "C",
      explanation: "Slope of v-t graph = dv/dt = acceleration",
      difficulty: 1
   },
   {
      text: "A body is dropped from height h. The time taken to cover first half and second half of height are in ratio:",
      options: ["1:1", "1:√2", "1:(√2-1)", "√2:1"],
      correctAnswer: "C",
      explanation: "Using h = ½gt², time ratio for h/2 and remaining h/2 is 1:(√2-1)",
      difficulty: 3
   },
   {
      text: "The magnitude of average velocity is:",
      options: ["Always equal to average speed", "Always less than average speed", "Always greater than average speed", "Equal or less than average speed"],
      correctAnswer: "D",
      explanation: "Average velocity = displacement/time ≤ distance/time = average speed",
      difficulty: 2
   },
   {
      text: "A particle moving in a straight line covers half the distance with speed 3 m/s. The remaining half distance is covered in two equal time intervals with speeds 4.5 m/s and 7.5 m/s. The average speed is:",
      options: ["4 m/s", "5 m/s", "5.5 m/s", "4.8 m/s"],
      correctAnswer: "A",
      explanation: "Calculate total time for each segment and use average speed = total distance/total time = 4 m/s",
      difficulty: 3
   },
   {
      text: "The position of a particle is given by x = 2t² + 3t + 4. Its velocity at t = 2s is:",
      options: ["7 m/s", "11 m/s", "15 m/s", "19 m/s"],
      correctAnswer: "B",
      explanation: "v = dx/dt = 4t + 3. At t = 2s, v = 4(2) + 3 = 11 m/s",
      difficulty: 2
   },
   {
      text: "A body starts from rest and moves with constant acceleration. The ratio of distances covered in successive equal time intervals is:",
      options: ["1:2:3:4", "1:3:5:7", "1:4:9:16", "1:1:1:1"],
      correctAnswer: "B",
      explanation: "Distance in successive equal intervals from rest: 1:3:5:7:... (odd numbers)",
      difficulty: 2
   },
   {
      text: "The velocity of a body at time t is v = at + b. The acceleration is:",
      options: ["a", "b", "at", "ab"],
      correctAnswer: "A",
      explanation: "Acceleration = dv/dt = a (constant)",
      difficulty: 1
   },
   {
      text: "A particle is thrown vertically upward with velocity u. The maximum height reached is:",
      options: ["u/g", "u²/g", "u²/2g", "2u²/g"],
      correctAnswer: "C",
      explanation: "At max height v=0. Using v²=u²-2gh, h = u²/2g",
      difficulty: 2
   },
   {
      text: "The displacement of a particle is zero. Its distance traveled:",
      options: ["Must be zero", "Cannot be zero", "May or may not be zero", "Is always negative"],
      correctAnswer: "C",
      explanation: "Zero displacement means particle returns to start, but distance can be non-zero.",
      difficulty: 2
   },
   {
      text: "A body moving with uniform acceleration has velocities 20 m/s and 30 m/s when passing through points A and B. The velocity midway between A and B is:",
      options: ["24 m/s", "25 m/s", "25.5 m/s", "26 m/s"],
      correctAnswer: "C",
      explanation: "v² = (v₁² + v₂²)/2 = (400+900)/2 = 650, v = 25.5 m/s",
      difficulty: 3
   },
   {
      text: "The acceleration of a particle is increasing linearly with time. The particle starts from origin with initial velocity v₀. The distance traveled in time t is:",
      options: ["v₀t + ½at²", "v₀t + (1/6)at³", "v₀t + at²", "v₀t"],
      correctAnswer: "B",
      explanation: "If a = kt, then v = v₀ + ½kt², s = v₀t + (1/6)kt³",
      difficulty: 3
   },
   {
      text: "A ball is thrown upward and returns to the same point. The displacement is:",
      options: ["Maximum", "Minimum", "Zero", "Negative"],
      correctAnswer: "C",
      explanation: "Displacement = final position - initial position = 0",
      difficulty: 1
   },
   {
      text: "The velocity of a particle at any instant is 3î + 4ĵ m/s. The speed is:",
      options: ["3 m/s", "4 m/s", "5 m/s", "7 m/s"],
      correctAnswer: "C",
      explanation: "Speed = |v| = √(3² + 4²) = √25 = 5 m/s",
      difficulty: 2
   },
   {
      text: "A particle moves along x-axis such that its position is given by x = t³ - 6t² + 9t. At what time is the velocity zero?",
      options: ["t = 1s and t = 3s", "t = 2s and t = 4s", "t = 0s and t = 2s", "t = 1s and t = 2s"],
      correctAnswer: "A",
      explanation: "v = dx/dt = 3t² - 12t + 9 = 0, solving: t = 1s and t = 3s",
      difficulty: 3
   },
   {
      text: "The ratio of velocities at half the maximum height for a body thrown vertically upward is:",
      options: ["1:1", "1:√2", "√2:1", "1:2"],
      correctAnswer: "B",
      explanation: "At h_max, v=0. At h_max/2, using v²=u²-2gh, ratio is 1:√2",
      difficulty: 3
   },
   {
      text: "A particle has displacement 12 m towards east and 5 m towards north. The magnitude of displacement is:",
      options: ["7 m", "13 m", "17 m", "60 m"],
      correctAnswer: "B",
      explanation: "Resultant = √(12² + 5²) = √169 = 13 m",
      difficulty: 2
   },
   {
      text: "The acceleration-time graph for a particle moving with constant velocity is:",
      options: ["Straight line with positive slope", "Straight line with negative slope", "Straight line parallel to time axis at a=0", "Parabola"],
      correctAnswer: "C",
      explanation: "Constant velocity means zero acceleration, so a-t graph is on time axis.",
      difficulty: 1
   },
   {
      text: "A body is thrown horizontally from height h with velocity v. The time of flight is:",
      options: ["√(h/g)", "√(2h/g)", "√(h/2g)", "2√(h/g)"],
      correctAnswer: "B",
      explanation: "Vertical motion: h = ½gt², t = √(2h/g)",
      difficulty: 2
   },
   {
      text: "The velocity of a particle is v = 2t² + 3. The distance traveled in 5 seconds starting from t=0 is:",
      options: ["98.33 m", "83.33 m", "68.33 m", "53.33 m"],
      correctAnswer: "A",
      explanation: "s = ∫v dt = ∫(2t²+3)dt = (2t³/3 + 3t) from 0 to 5 = 83.33 + 15 = 98.33 m",
      difficulty: 3
   },
   {
      text: "A particle moves with velocity v = 4î - 3ĵ m/s. After 2 seconds, its displacement is:",
      options: ["8î - 6ĵ m", "4î - 3ĵ m", "2î - 1.5ĵ m", "16î - 12ĵ m"],
      correctAnswer: "A",
      explanation: "Displacement = velocity × time = (4î - 3ĵ) × 2 = 8î - 6ĵ m",
      difficulty: 2
   },
   {
      text: "The position of a particle is given by r = 3t²î + 2tĵ. The velocity at t = 1s is:",
      options: ["3î + 2ĵ", "6î + 2ĵ", "3î + ĵ", "6î + ĵ"],
      correctAnswer: "B",
      explanation: "v = dr/dt = 6tî + 2ĵ. At t=1s, v = 6î + 2ĵ m/s",
      difficulty: 2
   },
   {
      text: "A body covers 1/3 of distance with speed v₁, next 1/3 with v₂, and last 1/3 with v₃. Average speed is:",
      options: ["(v₁+v₂+v₃)/3", "3v₁v₂v₃/(v₁v₂+v₂v₃+v₃v₁)", "√(v₁v₂v₃)", "3/(1/v₁+1/v₂+1/v₃)"],
      correctAnswer: "D",
      explanation: "Average speed = Total distance/Total time = 3/(1/v₁+1/v₂+1/v₃)",
      difficulty: 3
   },
   {
      text: "The velocity-time graph is a straight line parallel to time axis. The motion is:",
      options: ["Uniformly accelerated", "Non-uniformly accelerated", "Uniform motion", "Retarded motion"],
      correctAnswer: "C",
      explanation: "Horizontal line in v-t graph means constant velocity = uniform motion",
      difficulty: 1
   },
   {
      text: "A particle starts from rest and moves with acceleration a = 2t. The velocity after 5 seconds is:",
      options: ["10 m/s", "25 m/s", "50 m/s", "5 m/s"],
      correctAnswer: "B",
      explanation: "v = ∫a dt = ∫2t dt = t². At t=5s, v = 25 m/s",
      difficulty: 2
   },
   {
      text: "The distance traveled by a freely falling body in the last second of its motion is 45 m. The height from which it fell is: (g=10 m/s²)",
      options: ["100 m", "125 m", "150 m", "200 m"],
      correctAnswer: "B",
      explanation: "Distance in nth second = g(n-0.5) = 45. Solving: n=5s. Height = ½gt² = ½×10×25 = 125m",
      difficulty: 3
   },
   {
      text: "A particle moves in a circle of radius r with constant speed v. The magnitude of average acceleration in half revolution is:",
      options: ["v²/r", "2v²/πr", "πv²/2r", "Zero"],
      correctAnswer: "B",
      explanation: "Change in velocity = 2v, time = πr/v. Average acceleration = 2v/(πr/v) = 2v²/πr",
      difficulty: 3
   },
   {
      text: "The velocity of a particle is given by v = 6t - 3t². At what time is the acceleration zero?",
      options: ["t = 0s", "t = 1s", "t = 2s", "t = 3s"],
      correctAnswer: "B",
      explanation: "a = dv/dt = 6 - 6t = 0, solving: t = 1 second",
      difficulty: 2
   },
   {
      text: "A body is projected vertically upward with velocity 40 m/s. The distance traveled in the last second before reaching maximum height is: (g=10 m/s²)",
      options: ["5 m", "10 m", "15 m", "20 m"],
      correctAnswer: "A",
      explanation: "At max height, velocity in last second = 0 to 10 m/s. Distance = average velocity × time = 5×1 = 5m",
      difficulty: 3
   },
   {
      text: "The position of a particle is given by x = at³. The acceleration is proportional to:",
      options: ["t", "t²", "t³", "√t"],
      correctAnswer: "A",
      explanation: "v = dx/dt = 3at², a = dv/dt = 6at ∝ t",
      difficulty: 2
   },
   {
      text: "A particle moves along a straight line such that its displacement at any time t is given by s = t³ - 3t² + 2t. The velocity when acceleration is zero:",
      options: ["-1 m/s", "0 m/s", "1 m/s", "2 m/s"],
      correctAnswer: "A",
      explanation: "v = 3t² - 6t + 2, a = 6t - 6 = 0 gives t=1s. At t=1s, v = 3-6+2 = -1 m/s",
      difficulty: 3
   },
   {
      text: "Two particles start simultaneously from the same point and move along two straight lines, one with uniform velocity v and other with uniform acceleration a. The relative velocity of second with respect to first after time t is:",
      options: ["at", "v + at", "at - v", "v - at"],
      correctAnswer: "A",
      explanation: "v₁ = v (constant), v₂ = 0 + at. Relative velocity = v₂ - v₁ = at - v. But if first is at rest, answer is at.",
      difficulty: 2
   }
];

async function fixKinematicsQuestions() {
   try {
      console.log('🎯 Generating 50 real Kinematics questions...\n');

      const topics = await db.select().from(contentTopics);
      const topic = topics.find(t =>
         t.subject === 'Physics' &&
         t.topicName.toLowerCase().includes('kinematics')
      );

      if (!topic) {
         console.log('❌ Kinematics topic not found');
         process.exit(1);
      }

      console.log(`✅ Found topic: ${topic.topicName} (ID: ${topic.id})\n`);

      const topicQuestions = await db.select()
         .from(questions)
         .where(eq(questions.topicId, topic.id));

      console.log(`📊 Total questions in topic: ${topicQuestions.length}`);
      console.log(`📝 Real questions to add: ${kinematicsQuestions.length}\n`);

      let updated = 0;
      for (let i = 0; i < Math.min(kinematicsQuestions.length, topicQuestions.length); i++) {
         const q = kinematicsQuestions[i];
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

         if (updated % 10 === 0) {
            console.log(`✅ Updated ${updated} questions...`);
         }
      }

      console.log(`\n✅ Updated ${updated} questions for Kinematics`);

   } catch (err: any) {
      console.error(`❌ Error: ${err.message}`);
      process.exit(1);
   }
}

fixKinematicsQuestions().then(() => {
   console.log('\n✅ Complete!');
   process.exit(0);
});
