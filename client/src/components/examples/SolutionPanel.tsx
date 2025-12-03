import { SolutionPanel } from '../SolutionPanel'

export default function SolutionPanelExample() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <SolutionPanel
        isCorrect={false}
        correctAnswer="A"
        userAnswer="B"
        explanation="The particle's motion can be analyzed using equations of motion. Since the distance covered in successive equal time intervals is different, the particle must have constant acceleration."
        steps={[
          "Using s = ut + (1/2)at², for first 10 seconds: 100 = 10u + 50a",
          "For next 10 seconds (total 20s): 250 = 20u + 200a",
          "Solving these simultaneous equations: From equation 1: u = (100 - 50a)/10",
          "Substituting in equation 2 and solving: a = 0.5 m/s²",
        ]}
        relatedTopics={["Equations of Motion", "Uniformly Accelerated Motion", "Kinematics"]}
      />
    </div>
  )
}
