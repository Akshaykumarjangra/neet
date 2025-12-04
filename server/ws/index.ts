import { WebSocketServer, WebSocket } from "ws";
import type { Server as HTTPServer } from "http";
import type { IncomingMessage, ServerResponse } from "http";
import { TestSessionManager } from "./testSessionManager";
import { handleTestMessage } from "./handlers";
import type { WSMessage } from "../../shared/ws-types";
import type { Request } from "express";

interface AuthenticatedWebSocket extends WebSocket {
  userId?: string;
  sessionId?: string;
  isAlive?: boolean;
}

export class WSServer {
  private wss: WebSocketServer;
  private sessionManager: TestSessionManager;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private sessionMiddleware: any;

  constructor(httpServer: HTTPServer, sessionMiddleware: any) {
    this.wss = new WebSocketServer({ 
      server: httpServer,
      path: "/ws"
    });
    
    this.sessionManager = new TestSessionManager();
    this.sessionMiddleware = sessionMiddleware;
    this.setupWebSocketServer();
    this.startHeartbeat();
  }
  
  // Helper to extract userId from session during WebSocket upgrade
  private async extractUserIdFromSession(req: IncomingMessage): Promise<string | null> {
    return new Promise((resolve) => {
      // Create mock response object for session middleware
      const res = {
        getHeader: () => {},
        setHeader: () => {},
        writeHead: () => {},
        end: () => {},
      } as unknown as ServerResponse;
      
      // Run session middleware to populate session
      this.sessionMiddleware(req as any, res as any, () => {
        const expressReq = req as any as Request;
        const userId = expressReq.session?.userId;
        resolve(userId || null);
      });
    });
  }

  private setupWebSocketServer() {
    this.wss.on("connection", async (ws: AuthenticatedWebSocket, req: IncomingMessage) => {
      console.log("📡 New WebSocket connection attempt");
      
      // Extract userId from session
      const userId = await this.extractUserIdFromSession(req);
      
      if (!userId) {
        console.error("❌ WebSocket connection rejected: No valid session");
        ws.close(1008, "Authentication required");
        return;
      }
      
      ws.userId = userId;
      ws.isAlive = true;
      console.log(`📡 WebSocket connection established for user: ${userId}`);

      // Handle pong responses for heartbeat
      ws.on("pong", () => {
        ws.isAlive = true;
      });

      // Handle incoming messages
      ws.on("message", async (data: Buffer) => {
        try {
          const message: WSMessage = JSON.parse(data.toString());
          await this.handleMessage(ws, message);
        } catch (error) {
          console.error("Error handling WebSocket message:", error);
          this.sendError(ws, "INVALID_MESSAGE", "Failed to process message");
        }
      });

      // Handle disconnection
      ws.on("close", async () => {
        console.log(`📡 WebSocket disconnected: ${userId}`);
        if (ws.sessionId) {
          await this.sessionManager.handleDisconnect(ws.sessionId, userId);
        }
      });

      // Handle errors
      ws.on("error", (error) => {
        console.error("WebSocket error:", error);
      });

      // Send initial connection acknowledgement (not a session state)
      this.send(ws, {
        type: "session:state",
        payload: {
          sessionId: "",
          currentQuestionIndex: 0,
          answers: {},
          timeRemaining: 0,
          status: "disconnected" as const,
          questionsList: [],
          connected: true,
          userId
        }
      });
    });
  }

  private async handleMessage(ws: AuthenticatedWebSocket, message: WSMessage) {
    const { type } = message;

    // Handle different message types
    switch (type) {
      case "test:start":
      case "test:question":
      case "test:answer":
      case "test:complete":
      case "session:reconnect":
        await handleTestMessage(ws, message, this.sessionManager, this);
        break;
      
      default:
        this.sendError(ws, "UNKNOWN_MESSAGE_TYPE", `Unknown message type: ${type}`);
    }
  }

  private startHeartbeat() {
    // Send ping every 30 seconds to keep connections alive
    this.heartbeatInterval = setInterval(() => {
      this.wss.clients.forEach((ws: AuthenticatedWebSocket) => {
        if (ws.isAlive === false) {
          console.log("⚠️ Terminating inactive WebSocket connection");
          return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);
  }

  // Public methods for broadcasting
  public send(ws: WebSocket, message: WSMessage) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  public broadcast(sessionId: string, message: WSMessage) {
    const participants = this.sessionManager.getSessionParticipants(sessionId);
    this.wss.clients.forEach((client: AuthenticatedWebSocket) => {
      if (client.userId && participants.has(client.userId)) {
        this.send(client, message);
      }
    });
  }

  public sendError(ws: WebSocket, code: string, message: string, details?: any) {
    this.send(ws, {
      type: "error",
      payload: {
        code,
        message,
        details
      }
    });
  }

  public sendToUser(userId: string, message: WSMessage) {
    this.wss.clients.forEach((client: AuthenticatedWebSocket) => {
      if (client.userId === userId) {
        this.send(client, message);
      }
    });
  }

  public shutdown() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    this.wss.close();
    console.log("📡 WebSocket server shut down");
  }
}

let wsServer: WSServer | null = null;

export function initializeWebSocketServer(httpServer: HTTPServer, sessionMiddleware: any): WSServer {
  wsServer = new WSServer(httpServer, sessionMiddleware);
  return wsServer;
}

export function getWebSocketServer(): WSServer | null {
  return wsServer;
}
