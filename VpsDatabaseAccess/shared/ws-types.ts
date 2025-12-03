export type WSMessageType =
  | "test:start"
  | "test:question"
  | "test:answer"
  | "test:timer"
  | "test:complete"
  | "leaderboard:update"
  | "session:reconnect"
  | "session:state"
  | "achievements:unlocked"
  | "error";

export interface WSMessage<T = any> {
  type: WSMessageType;
  payload: T;
  sequence?: number;
  timestamp?: number;
}

export interface TestStartPayload {
  sessionId: string;
  testType: string;
  questionsList: number[];
  durationMinutes: number;
  startedAt: string;
  endsAt: string;
}

export interface TestQuestionPayload {
  sessionId: string;
  questionIndex: number;
  questionId: number;
  timeRemaining: number;
}

export interface TestAnswerPayload {
  sessionId: string;
  questionId: number;
  answer: string;
  timeSpent: number;
  clientTimestamp: number;
}

export interface TestTimerPayload {
  sessionId: string;
  timeRemaining: number;
  serverTime: number;
}

export interface TestCompletePayload {
  sessionId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  rank?: number;
  xpEarned: number;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  accuracy: number;
  completedAt: string;
  rank: number;
}

export interface LeaderboardUpdatePayload {
  testType: string;
  entries: LeaderboardEntry[];
  myRank?: number;
}

export interface SessionReconnectPayload {
  sessionId: string;
  lastSequence?: number;
}

export interface SessionStatePayload {
  sessionId: string;
  currentQuestionIndex: number;
  answers: Record<number, string>;
  timeRemaining: number;
  status: "in_progress" | "completed" | "expired";
  questionsList: number[];
}

export interface WSErrorPayload {
  code: string;
  message: string;
  details?: any;
}

export interface TestSessionState {
  sessionId: string;
  userId: string;
  testType: string;
  questionsList: number[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  startedAt: Date;
  endsAt: Date;
  status: "in_progress" | "completed" | "expired";
  participants: Set<string>;
  lastEventSequence: number;
}
