import { db } from "../db";
import { testSessions, testSessionEvents, sessionParticipants, questions } from "../../shared/schema";
import { eq, and, desc } from "drizzle-orm";
import type { TestSessionState } from "../../shared/ws-types";

type TestSessionRow = typeof testSessions.$inferSelect;
type TestSessionInsert = typeof testSessions.$inferInsert;
type SessionParticipantInsert = typeof sessionParticipants.$inferInsert;

export class TestSessionManager {
  private activeSessions: Map<string, TestSessionState> = new Map();
  private timerIntervals: Map<string, NodeJS.Timeout> = new Map();
  private eventSequences: Map<string, number> = new Map();

  async createSession(
    userId: string,
    testType: string,
    questionsList: number[],
    durationMinutes: number
  ): Promise<TestSessionState> {
    const now = new Date();
    const endsAt = new Date(now.getTime() + durationMinutes * 60 * 1000);

    // Create session in database
    const sessionPayload = {
      userId,
      testType,
      totalQuestions: questionsList.length,
      startedAt: now,
    };

    const [session] = await db
      .insert(testSessions)
      .values(sessionPayload as any)
      .returning();

    // Create session participant record
    const participantPayload: SessionParticipantInsert = {
      sessionId: session.id,
      userId,
    };

    await db.insert(sessionParticipants).values(participantPayload);

    // Create in-memory session state
    const sessionState: TestSessionState = {
      sessionId: String(session.id),
      userId,
      testType,
      questionsList,
      currentQuestionIndex: 0,
      answers: {},
      startedAt: now,
      endsAt,
      status: "in_progress",
      participants: new Set([userId]),
      lastEventSequence: 0,
    };

    this.activeSessions.set(sessionState.sessionId, sessionState);
    this.eventSequences.set(sessionState.sessionId, 0);

    // Log session creation event
    await this.logEvent(sessionState.sessionId, userId, "test:start", {
      testType,
      questionsList,
      durationMinutes,
    });

    return sessionState;
  }

  async getSession(sessionId: string): Promise<TestSessionState | null> {
    if (this.activeSessions.has(sessionId)) {
      return this.activeSessions.get(sessionId)!;
    }
    return null;
  }

  async updateSessionAnswer(
    sessionId: string,
    userId: string,
    questionId: number,
    answer: string,
    timeSpent: number
  ): Promise<void> {
    const session = await this.getSession(sessionId);
    if (!session) throw new Error("Session not found");

    // Update answers
    session.answers[questionId] = answer;

    // Log event
    await this.logEvent(sessionId, userId, "test:answer", {
      questionId,
      answer,
      timeSpent,
    });
  }

  async updateQuestionIndex(
    sessionId: string,
    userId: string,
    questionIndex: number
  ): Promise<void> {
    const session = await this.getSession(sessionId);
    if (!session) throw new Error("Session not found");

    session.currentQuestionIndex = questionIndex;

    // Log event
    await this.logEvent(sessionId, userId, "test:question", {
      questionIndex,
    });
  }

  async completeSession(sessionId: string, userId: string): Promise<{ score: number; correctAnswers: number; totalQuestions: number }> {
    const session = await this.getSession(sessionId);
    if (!session) throw new Error("Session not found");

    // Calculate score
    const questionIds = session.questionsList;
    const questionDetails = await db
      .select()
      .from(questions)
      .where(
        eq(
          questions.id,
          questionIds[0] // This is a simplified version; you'd use IN clause in production
        )
      );

    let correctAnswers = 0;
    const totalQuestions = questionIds.length;

    // Check each answer
    for (const qId of questionIds) {
      const [question] = await db
        .select()
        .from(questions)
        .where(eq(questions.id, qId))
        .limit(1);

      if (question && session.answers[qId] === question.correctAnswer) {
        correctAnswers++;
      }
    }

    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Update session status and score
    session.status = "completed";
    const completionUpdate = {
      score,
      correctAnswers,
      completedAt: new Date(),
      timeTaken: Math.round((Date.now() - session.startedAt.getTime()) / 1000),
    } as Partial<TestSessionInsert>;

    await db
      .update(testSessions)
      .set(completionUpdate as any)
      .where(eq(testSessions.id, Number(sessionId)));

    // Log completion event
    await this.logEvent(sessionId, userId, "test:complete", {
      score,
      correctAnswers,
      totalQuestions,
    });

    // Clean up
    this.stopTimer(sessionId);
    this.activeSessions.delete(sessionId);

    return { score, correctAnswers, totalQuestions };
  }

  async logEvent(
    sessionId: string,
    userId: string,
    eventType: string,
    eventData: any
  ): Promise<void> {
    const sequence = (this.eventSequences.get(sessionId) || 0) + 1;
    this.eventSequences.set(sessionId, sequence);

    await db.insert(testSessionEvents).values({
      sessionId: Number(sessionId),
      userId,
      eventType,
      eventData,
      sequence,
    });
  }

  getTimeRemaining(sessionId: string): number {
    const session = this.activeSessions.get(sessionId);
    if (!session) return 0;

    const now = new Date().getTime();
    const endsAt = session.endsAt.getTime();
    const remaining = Math.max(0, Math.floor((endsAt - now) / 1000));

    return remaining;
  }

  startTimer(sessionId: string, onTick: (timeRemaining: number) => void): void {
    // Stop existing timer if any
    this.stopTimer(sessionId);

    // Send updates every 500ms for smooth countdown
    const interval = setInterval(() => {
      const remaining = this.getTimeRemaining(sessionId);
      onTick(remaining);

      if (remaining <= 0) {
        this.stopTimer(sessionId);
        this.expireSession(sessionId);
      }
    }, 500);

    this.timerIntervals.set(sessionId, interval);
  }

  stopTimer(sessionId: string): void {
    const interval = this.timerIntervals.get(sessionId);
    if (interval) {
      clearInterval(interval);
      this.timerIntervals.delete(sessionId);
    }
  }

  async expireSession(sessionId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    session.status = "expired";
    const completionUpdate: any = {
      completedAt: new Date(),
      timeTaken: Math.round((Date.now() - session.startedAt.getTime()) / 1000),
    };

    await db
      .update(testSessions)
      .set(completionUpdate as any)
      .where(eq(testSessions.id, Number(sessionId)));

    this.activeSessions.delete(sessionId);
  }

  async handleDisconnect(sessionId: string, userId: string): Promise<void> {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      session.participants.delete(userId);

      // Update participant status in database
      const participantUpdate = {
        isActive: false,
        lastSeenAt: new Date(),
      } as Partial<SessionParticipantInsert>;

      await db
        .update(sessionParticipants)
        .set(participantUpdate)
        .where(
          and(
            eq(sessionParticipants.sessionId, Number(sessionId)),
            eq(sessionParticipants.userId, userId)
          )
        );

      // If no participants left, stop timer but keep session for reconnection
      if (session.participants.size === 0) {
        this.stopTimer(sessionId);
      }
    }
  }

  getSessionParticipants(sessionId: string): Set<string> {
    const session = this.activeSessions.get(sessionId);
    return session?.participants || new Set();
  }

  async reconnectToSession(sessionId: string, userId: string): Promise<TestSessionState | null> {
    const session = await this.getSession(sessionId);
    if (!session) return null;

    // Check if participant already exists
    const [existingParticipant] = await db
      .select()
      .from(sessionParticipants)
      .where(
        and(
          eq(sessionParticipants.sessionId, Number(sessionId)),
          eq(sessionParticipants.userId, userId)
        )
      )
      .limit(1);

    if (existingParticipant) {
      // Reactivate participant
      const reactivateUpdate = {
        isActive: true,
        lastSeenAt: new Date(),
      } as Partial<SessionParticipantInsert>;

      await db
        .update(sessionParticipants)
        .set(reactivateUpdate)
        .where(
          and(
            eq(sessionParticipants.sessionId, Number(sessionId)),
            eq(sessionParticipants.userId, userId)
          )
        );
    } else {
      // Create new participant record
      await db.insert(sessionParticipants).values({
        sessionId: Number(sessionId),
        userId,
        isActive: true,
      } as SessionParticipantInsert);
    }

    // Add user back to in-memory participants
    session.participants.add(userId);

    return session;
  }
}
