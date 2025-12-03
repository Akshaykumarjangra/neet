import type { WebSocket } from "ws";
import type { TestSessionManager } from "./testSessionManager";
import type { WSServer } from "./index";
import type { 
  WSMessage, 
  TestStartPayload,
  TestQuestionPayload,
  TestAnswerPayload,
  SessionReconnectPayload,
  TestCompletePayload
} from "../../shared/ws-types";
import { GamificationService } from "../gamification";

interface AuthenticatedWebSocket extends WebSocket {
  userId?: string;
  sessionId?: string;
}

export async function handleTestMessage(
  ws: AuthenticatedWebSocket,
  message: WSMessage,
  sessionManager: TestSessionManager,
  wsServer: WSServer
): Promise<void> {
  const { type, payload } = message;

  try {
    switch (type) {
      case "test:start":
        await handleTestStart(ws, payload, sessionManager, wsServer);
        break;

      case "test:question":
        await handleTestQuestion(ws, payload, sessionManager, wsServer);
        break;

      case "test:answer":
        await handleTestAnswer(ws, payload, sessionManager, wsServer);
        break;

      case "test:complete":
        await handleTestComplete(ws, payload, sessionManager, wsServer);
        break;

      case "session:reconnect":
        await handleSessionReconnect(ws, payload, sessionManager, wsServer);
        break;

      default:
        wsServer.sendError(ws, "UNKNOWN_TYPE", `Unknown message type: ${type}`);
    }
  } catch (error: any) {
    console.error("Error handling test message:", error);
    wsServer.sendError(ws, "HANDLER_ERROR", error.message);
  }
}

async function handleTestStart(
  ws: AuthenticatedWebSocket,
  payload: any,
  sessionManager: TestSessionManager,
  wsServer: WSServer
): Promise<void> {
  const { testType, questionsList, durationMinutes } = payload;
  const userId = ws.userId!;

  // Create new test session
  const session = await sessionManager.createSession(
    userId,
    testType,
    questionsList,
    durationMinutes
  );

  ws.sessionId = session.sessionId;

  // Start server-side timer
  sessionManager.startTimer(session.sessionId, (timeRemaining) => {
    wsServer.broadcast(session.sessionId, {
      type: "test:timer",
      payload: {
        sessionId: session.sessionId,
        timeRemaining,
        serverTime: Date.now(),
      },
    });
  });

  // Send session start confirmation
  const startPayload: TestStartPayload = {
    sessionId: session.sessionId,
    testType: session.testType,
    questionsList: session.questionsList,
    durationMinutes,
    startedAt: session.startedAt.toISOString(),
    endsAt: session.endsAt.toISOString(),
  };

  wsServer.send(ws, {
    type: "test:start",
    payload: startPayload,
  });

  // Send first question
  if (session.questionsList.length > 0) {
    const questionPayload: TestQuestionPayload = {
      sessionId: session.sessionId,
      questionIndex: 0,
      questionId: session.questionsList[0],
      timeRemaining: sessionManager.getTimeRemaining(session.sessionId),
    };

    wsServer.send(ws, {
      type: "test:question",
      payload: questionPayload,
    });
  }
}

async function handleTestQuestion(
  ws: AuthenticatedWebSocket,
  payload: any,
  sessionManager: TestSessionManager,
  wsServer: WSServer
): Promise<void> {
  const { sessionId, questionIndex } = payload;
  const userId = ws.userId!;

  // Update current question index
  await sessionManager.updateQuestionIndex(sessionId, userId, questionIndex);

  const session = await sessionManager.getSession(sessionId);
  if (!session) {
    wsServer.sendError(ws, "SESSION_NOT_FOUND", "Test session not found");
    return;
  }

  // Send question data
  const questionPayload: TestQuestionPayload = {
    sessionId,
    questionIndex,
    questionId: session.questionsList[questionIndex],
    timeRemaining: sessionManager.getTimeRemaining(sessionId),
  };

  wsServer.send(ws, {
    type: "test:question",
    payload: questionPayload,
  });
}

async function handleTestAnswer(
  ws: AuthenticatedWebSocket,
  payload: TestAnswerPayload,
  sessionManager: TestSessionManager,
  wsServer: WSServer
): Promise<void> {
  const { sessionId, questionId, answer, timeSpent, clientTimestamp } = payload;
  const userId = ws.userId!;

  // Validate server time vs client time (anti-cheat)
  const serverTime = Date.now();
  const timeDrift = Math.abs(serverTime - clientTimestamp);
  
  if (timeDrift > 5000) { // More than 5 seconds drift
    console.warn(`⚠️ Time drift detected for user ${userId}: ${timeDrift}ms`);
  }

  // Update answer
  await sessionManager.updateSessionAnswer(
    sessionId,
    userId,
    questionId,
    answer,
    timeSpent
  );

  // Send confirmation
  wsServer.send(ws, {
    type: "test:answer",
    payload: {
      sessionId,
      questionId,
      saved: true,
      serverTime,
    },
  });
}

async function handleTestComplete(
  ws: AuthenticatedWebSocket,
  payload: any,
  sessionManager: TestSessionManager,
  wsServer: WSServer
): Promise<void> {
  const { sessionId } = payload;
  const userId = ws.userId!;

  // Complete session and calculate score
  const result = await sessionManager.completeSession(sessionId, userId);

  // Award XP based on performance
  const xpAmount = Math.floor(
    result.score * 2 + // Base XP from score
    result.correctAnswers * 10 // Bonus XP per correct answer
  );

  const xpResult = await GamificationService.awardXp(userId, xpAmount, {
    type: "test",
    sourceId: sessionId,
    description: `Completed test with ${result.score}% accuracy`,
  });

  // Check for new achievements
  const newAchievements = await GamificationService.checkAchievements(userId);

  // Send completion data
  const completePayload: TestCompletePayload = {
    sessionId,
    score: result.score,
    totalQuestions: result.totalQuestions,
    correctAnswers: result.correctAnswers,
    accuracy: result.score,
    xpEarned: xpAmount,
  };

  wsServer.send(ws, {
    type: "test:complete",
    payload: completePayload,
  });

  // Send achievement notifications if any
  if (newAchievements.length > 0) {
    wsServer.send(ws, {
      type: "achievements:unlocked",
      payload: {
        achievements: newAchievements,
      },
    });
  }

  // Clear session ID from WebSocket
  ws.sessionId = undefined;
}

async function handleSessionReconnect(
  ws: AuthenticatedWebSocket,
  payload: SessionReconnectPayload,
  sessionManager: TestSessionManager,
  wsServer: WSServer
): Promise<void> {
  const { sessionId } = payload;
  const userId = ws.userId!;

  // Try to reconnect to session
  const session = await sessionManager.reconnectToSession(sessionId, userId);

  if (!session) {
    wsServer.sendError(ws, "SESSION_NOT_FOUND", "Session not found or expired");
    return;
  }

  // Check if session is still valid
  const timeRemaining = sessionManager.getTimeRemaining(sessionId);
  if (timeRemaining <= 0) {
    wsServer.sendError(ws, "SESSION_EXPIRED", "Test session has expired");
    return;
  }

  ws.sessionId = sessionId;

  // Send current session state
  wsServer.send(ws, {
    type: "session:state",
    payload: {
      sessionId: session.sessionId,
      currentQuestionIndex: session.currentQuestionIndex,
      answers: session.answers,
      timeRemaining,
      status: session.status,
      questionsList: session.questionsList,
    },
  });

  // Resume timer
  if (!sessionManager.getSessionParticipants(sessionId).size) {
    sessionManager.startTimer(sessionId, (remaining) => {
      wsServer.broadcast(sessionId, {
        type: "test:timer",
        payload: {
          sessionId,
          timeRemaining: remaining,
          serverTime: Date.now(),
        },
      });
    });
  }
}
