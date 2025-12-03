import { useEffect, useRef, useState, useCallback } from "react";
import type {
  WSMessage,
  TestStartPayload,
  TestQuestionPayload,
  TestAnswerPayload,
  TestTimerPayload,
  TestCompletePayload,
  SessionStatePayload,
} from "../../../shared/ws-types";

interface UseTestSessionSocketOptions {
  userId: string;
  onTestStart?: (payload: TestStartPayload) => void;
  onQuestionReceived?: (payload: TestQuestionPayload) => void;
  onAnswerSaved?: (payload: any) => void;
  onTimerUpdate?: (payload: TestTimerPayload) => void;
  onTestComplete?: (payload: TestCompletePayload) => void;
  onSessionState?: (payload: SessionStatePayload) => void;
  onAchievementsUnlocked?: (achievements: any[]) => void;
  onError?: (error: any) => void;
}

export function useTestSessionSocket(options: UseTestSessionSocketOptions) {
  const {
    userId,
    onTestStart,
    onQuestionReceived,
    onAnswerSaved,
    onTimerUpdate,
    onTestComplete,
    onSessionState,
    onAchievementsUnlocked,
    onError,
  } = options;

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState<"connecting" | "connected" | "disconnected">("disconnected");

  // Connect to WebSocket server
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setConnectionState("connecting");

    // Determine WebSocket URL
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;
    const wsUrl = `${protocol}//${host}/ws?userId=${encodeURIComponent(userId)}`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("📡 WebSocket connected");
      setIsConnected(true);
      setConnectionState("connected");
    };

    ws.onmessage = (event) => {
      try {
        const message: WSMessage = JSON.parse(event.data);
        handleMessage(message);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionState("disconnected");
      onError?.(error);
    };

    ws.onclose = () => {
      console.log("📡 WebSocket disconnected");
      setIsConnected(false);
      setConnectionState("disconnected");
      
      // Attempt to reconnect after 3 seconds
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log("Attempting to reconnect...");
        connect();
      }, 3000);
    };

    wsRef.current = ws;
  }, [userId, onError]);

  // Handle incoming messages
  const handleMessage = (message: WSMessage) => {
    const { type, payload } = message;

    switch (type) {
      case "test:start":
        onTestStart?.(payload);
        break;

      case "test:question":
        onQuestionReceived?.(payload);
        break;

      case "test:answer":
        onAnswerSaved?.(payload);
        break;

      case "test:timer":
        onTimerUpdate?.(payload);
        break;

      case "test:complete":
        onTestComplete?.(payload);
        break;

      case "session:state":
        onSessionState?.(payload);
        break;

      case "achievements:unlocked":
        onAchievementsUnlocked?.(payload.achievements);
        break;

      case "error":
        console.error("WebSocket error:", payload);
        onError?.(payload);
        break;

      default:
        console.warn("Unknown message type:", type);
    }
  };

  // Send message to server
  const sendMessage = useCallback((message: WSMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not connected. Cannot send message.");
    }
  }, []);

  // Test session actions
  const startTest = useCallback(
    (testType: string, questionsList: number[], durationMinutes: number) => {
      sendMessage({
        type: "test:start",
        payload: {
          testType,
          questionsList,
          durationMinutes,
        },
      });
    },
    [sendMessage]
  );

  const navigateToQuestion = useCallback(
    (sessionId: string, questionIndex: number) => {
      sendMessage({
        type: "test:question",
        payload: {
          sessionId,
          questionIndex,
        },
      });
    },
    [sendMessage]
  );

  const submitAnswer = useCallback(
    (
      sessionId: string,
      questionId: number,
      answer: string,
      timeSpent: number
    ) => {
      sendMessage({
        type: "test:answer",
        payload: {
          sessionId,
          questionId,
          answer,
          timeSpent,
          clientTimestamp: Date.now(),
        },
      });
    },
    [sendMessage]
  );

  const completeTest = useCallback(
    (sessionId: string) => {
      sendMessage({
        type: "test:complete",
        payload: {
          sessionId,
        },
      });
    },
    [sendMessage]
  );

  const reconnectToSession = useCallback(
    (sessionId: string, lastSequence?: number) => {
      sendMessage({
        type: "session:reconnect",
        payload: {
          sessionId,
          lastSequence,
        },
      });
    },
    [sendMessage]
  );

  // Connect on mount
  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return {
    isConnected,
    connectionState,
    startTest,
    navigateToQuestion,
    submitAnswer,
    completeTest,
    reconnectToSession,
    sendMessage,
  };
}
