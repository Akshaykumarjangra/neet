import { Header } from '../Header'
import { ThemeProvider } from '../ThemeProvider'
import { useState } from 'react'

export default function HeaderExample() {
  const [activeSubject, setActiveSubject] = useState("Physics")

  return (
    <ThemeProvider>
      <Header 
        activeSubject={activeSubject}
        onSubjectChange={setActiveSubject}
        userPoints={2450}
        userLevel={12}
        studyStreak={7}
      />
    </ThemeProvider>
  )
}
