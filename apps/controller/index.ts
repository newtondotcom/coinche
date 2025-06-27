import logger from '@/logger';
import { translateEvent } from './src/listener';
import { serve } from 'bun';

async function getUsernameFromCookies(cookie: string | null) {
    return "test";
}

// --- WebSocket Message Types ---
// This should match the EventInsert type expected by translateEvent
// You may want to import EventInsert from '@coinche/shared' if available
// For now, we use a compatible shape
export type EventInsert = {
  gameId: string;
  id: string;
  playerId: string;
  type: string;
  value: string;
  timestamp?: string;
  [key: string]: any;
};

// --- Room Management ---
export const userRooms = new Map<any, Set<string>>(); // ws -> Set<room>
// --- In-memory player tracking for each game ---
export const gamePlayers = new Map<string, Set<string>>(); // gameId -> Set<playerId>

// --- Helper to generate random id if missing ---
function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

const gameId = "0";

// --- Bun WebSocket Server ---
const server = Bun.serve({
  port : 3001,
  fetch(req, server) {
    const cookies = req.headers.get("cookie");
    // Note: getUsernameFromCookies is async, but Bun.serve expects sync. Use a placeholder for now.
    const username = "test"; // await getUsernameFromCookies(cookies); // If you want to make this async, use a wrapper
    // Attach gameId and userId to ws.data
    const success = server.upgrade(req, { data: { username, gameId } });
    if (success) return undefined;
    return new Response("Hello world");
  },
  websocket: {
    open(ws) {
      const data = ws.data as { username: string, gameId: string };
      const gameId = data.gameId;
      // On connect, no room joined yet
      userRooms.set(ws, new Set());
      ws.subscribe(gameId);
      logger.info("cleint suscribed to room")
      // ws.data already contains username and gameId from upgrade
    },
    async message(ws, raw) {
      // ws.data is typed as unknown, so we need to assert its shape
      const data = ws.data as { username: string, gameId: string };
      const gameId = data.gameId;
      let msg: EventInsert;
      // Ensure raw is a string
      let rawStr: string = typeof raw === "string" ? raw : raw.toString();
      try {
        msg = JSON.parse(rawStr);
      } catch (e) {
        ws.send(JSON.stringify({ type: "system", message: "Invalid message format." }));
        return;
      }
      if (msg.type && msg.gameId) {
        // Use ws.data for userId and gameId
        const data = ws.data as { username: string, gameId: string };
        // Fill missing fields for EventInsert
        const event: EventInsert = {
          ...msg, // spread first so explicit fields below take precedence
          gameId: msg.gameId || data.gameId,
          id: (msg as any).id || randomId(),
          playerId: (msg as any).playerId || data.username,
          type: msg.type,
          value: (msg as any).value || '',
          timestamp: (msg as any).timestamp || new Date().toISOString(),
        };
        const publish = (payload: any) => {
          console.log("sending ws event", gameId, payload);
          server.publish(data.gameId,JSON.stringify(payload));
        };
        logger.info(event);
        await translateEvent(event, publish);
        return;
      }
      ws.send(JSON.stringify({ type: "system", message: "Unknown event type or missing gameId." }));
    },
    close(ws) {
      // Unsubscribe from all rooms on disconnect
      const rooms = userRooms.get(ws);
      if (rooms) {
        for (const room of rooms) {
          ws.unsubscribe(room);
        }
      }
      userRooms.delete(ws);
      // Optionally broadcast disconnect
    },
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);