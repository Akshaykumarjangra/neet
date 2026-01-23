import { QuestionCard } from '../QuestionCard'
import { useState } from 'react'

export default function QuestionCardExample() {
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <div className="p-8">
      <QuestionCard
        questionNumber={42}
        difficulty="Medium"
        subject="Physics"
        topic="Kinematics"
        question="A particle moves in a straight line with constant acceleration. If it covers 100 m in the first 10 seconds and 150 m in the next 10 seconds, what is its acceleration?"
        options={[
          { id: "A", text: "0.5 m/s²" },
          { id: "B", text: "1.0 m/s²" },
          { id: "C", text: "1.5 m/s²" },
          { id: "D", text: "2.0 m/s²" },
        ]}
        isBookmarked={isBookmarked}
        onToggleBookmark={() => setIsBookmarked(!isBookmarked)}
        onSubmit={() => {}}
      />
    </div>
  )
}
