import type { Question } from "@shared/schema"

export type QuestionLike = {
  question?: string
  questionText?: string
}

export type OptionLike = string | { id?: string; text?: string }

const OPTION_CHAR_CODE_START = "A".charCodeAt(0)

export interface LegacyPracticeQuestion {
  id?: number
  question?: string
  questionText?: string
  q?: string
  options?: OptionLike[]
  correctAnswer: number | string
  solution?: string
  explanation?: string
  detail?: string
  topic?: string
  difficulty?: string
}

interface NormalizeOptions {
  sourceType?: string
  defaultDifficulty?: number
  topicId?: number
}

const difficultyMap: Record<string, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
}

export function getQuestionLabel(question: QuestionLike) {
  return question.questionText ?? question.question ?? ""
}

export function getOptionLabel(option: OptionLike) {
  if (typeof option === "string") {
    return option
  }
  if (option && typeof option.text === "string") {
    return option.text
  }
  return ""
}

const getOptionId = (index: number) =>
  String.fromCharCode(OPTION_CHAR_CODE_START + index)

export function normalizeLegacyQuestions(
  legacy: LegacyPracticeQuestion[],
  options: NormalizeOptions = {},
) {
  const sourceType = options.sourceType ?? "legacy_practice"
  const defaultDifficulty = options.defaultDifficulty ?? 2
  const fallbackTopicId = options.topicId ?? -1

  return legacy.map((item, index) => {
    const questionText =
      item.questionText ?? item.question ?? item.q ?? "Practice question"
    const normalizedOptions = (item.options ?? []).map((option, optionIndex) => {
      if (typeof option === "string") {
        return {
          id: getOptionId(optionIndex),
          text: option,
        }
      }

      return {
        id: option?.id ?? getOptionId(optionIndex),
        text: option?.text ?? "",
      }
    })

    const difficultyKey = (item.difficulty ?? "").toLowerCase()
    const difficultyLevel =
      difficultyKey.length > 0
        ? difficultyMap[difficultyKey] ?? defaultDifficulty
        : defaultDifficulty

    const correctAnswer =
      typeof item.correctAnswer === "number"
        ? getOptionId(item.correctAnswer)
        : item.correctAnswer ?? "A"

    return {
      id: item.id ?? index + 1,
      topicId: fallbackTopicId,
      questionText,
      options: normalizedOptions,
      correctAnswer,
      solutionDetail:
        item.solution ??
        item.explanation ??
        item.detail ??
        "Review the concept and try again.",
      difficultyLevel,
      sourceType,
      relatedTopics: item.topic ? [item.topic] : [],
    } as Question
  })
}

export function getDifficultyLabel(level?: number) {
  if (!level || level <= 1) return "Easy"
  if (level === 2) return "Medium"
  if (level >= 3) return "Hard"
  return `Level ${level}`
}

export function getPrimaryTopicLabel(question: Pick<Question, "relatedTopics">) {
  return question.relatedTopics?.[0] ?? "Mixed Practice"
}
