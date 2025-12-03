import { SubjectCard } from '../SubjectCard'
import physicsIcon from '@assets/generated_images/Physics_subject_icon_5641b5eb.png'

export default function SubjectCardExample() {
  return (
    <div className="p-8 max-w-md">
      <SubjectCard
        subject="Physics"
        icon={physicsIcon}
        progress={68}
        totalQuestions={2500}
        solvedQuestions={1700}
        color="#3b82f6"
      />
    </div>
  )
}
