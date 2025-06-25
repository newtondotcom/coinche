import { translateEvent } from './src/listener';

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

type ClientMessage =
  | { type: "join_game"; gameId: string }
  | { type: "leave_game"; gameId: string }
  | Partial<EventInsert>; // fallback for custom events

// --- Room Management ---
const userRooms = new Map<any, Set<string>>(); // ws -> Set<room>
// --- In-memory player tracking for each game ---
const gamePlayers = new Map<string, Set<string>>(); // gameId -> Set<playerId>

// --- Helper to generate random id if missing ---
function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

// --- Bun WebSocket Server ---
const server = Bun.serve({
  port : 3001,
  fetch(req, server) {
    const cookies = req.headers.get("cookie");
    // Note: getUsernameFromCookies is async, but Bun.serve expects sync. Use a placeholder for now.
    const username = "test"; // await getUsernameFromCookies(cookies); // If you want to make this async, use a wrapper
    const success = server.upgrade(req, { data: { username } });
    if (success) return undefined;
    return new Response("Hello world");
  },
  websocket: {
    open(ws) {
      // On connect, no room joined yet
      userRooms.set(ws, new Set());
      const data = ws.data as { username: string };
      ws.send(JSON.stringify({ type: "system", message: `${data.username} connected.` }));
    },
    async message(ws, raw) {
      let msg: ClientMessage;
      // Ensure raw is a string
      let rawStr: string = typeof raw === "string" ? raw : raw.toString();
      try {
        msg = JSON.parse(rawStr);
      } catch (e) {
        ws.send(JSON.stringify({ type: "system", message: "Invalid message format." }));
        return;
      }
      // --- Handle join/leave game rooms ---
      if (msg.type === "join_game" && msg.gameId) {
        ws.subscribe(`game-${msg.gameId}`);
        userRooms.get(ws)?.add(`game-${msg.gameId}`);
        const data = ws.data as { username: string };
        ws.send(JSON.stringify({ type: "system", message: `Joined game ${msg.gameId}` }));
        return;
      }
      if (msg.type === "leave_game" && msg.gameId) {
        ws.unsubscribe(`game-${msg.gameId}`);
        userRooms.get(ws)?.delete(`game-${msg.gameId}`);
        const data = ws.data as { username: string };
        ws.send(JSON.stringify({ type: "system", message: `Left game ${msg.gameId}` }));
        return;
      }
      // --- Custom event routing (call game logic) ---
      if (msg.type && msg.gameId) {
        const data = ws.data as { username: string };
        // Call your game logic (translateEvent expects EventInsert)
        // Only call for non-join/leave events
        if (msg.type !== "join_game" && msg.type !== "leave_game") {
          // Fill missing fields for EventInsert
          const event: EventInsert = {
            gameId: msg.gameId!,
            id: (msg as any).id || randomId(),
            playerId: (msg as any).playerId || data.username,
            type: msg.type,
            value: (msg as any).value || '',
            timestamp: (msg as any).timestamp || new Date().toISOString(),
            ...msg
          };
          const result = await translateEvent(event);
          // --- Broadcast join/leave events to the room ---
          if (event.type === 'join') {
            // Track players in memory
            if (!gamePlayers.has(event.gameId)) gamePlayers.set(event.gameId, new Set());
            gamePlayers.get(event.gameId)!.add(event.playerId);

            // Send full player list to the joining client only
            ws.send(JSON.stringify({
              type: 'player_list',
              gameId: event.gameId,
              players: Array.from(gamePlayers.get(event.gameId)!)
            }));

            // Broadcast join event to all in the room
            server.publish(`game-${event.gameId}`, JSON.stringify({
              type: 'join',
              playerId: event.playerId,
              gameId: event.gameId,
              timestamp: event.timestamp,
              players: Array.from(gamePlayers.get(event.gameId)!)
            }));
          } else if (event.type === 'leave') {
            // Remove player from memory
            if (gamePlayers.has(event.gameId)) {
              gamePlayers.get(event.gameId)!.delete(event.playerId);
            }
            // Broadcast leave event to all in the room
            server.publish(`game-${event.gameId}`, JSON.stringify({
              type: 'leave',
              playerId: event.playerId,
              gameId: event.gameId,
              timestamp: event.timestamp,
              players: Array.from(gamePlayers.get(event.gameId) || [])
            }));
          } else if (result) {
            const payload = typeof result === 'string' ? { type: 'event_result', message: result } : result;
            server.publish(`game-${event.gameId}`, JSON.stringify(payload));
          }
        }
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

(`Listening on ${server.hostname}:${server.port}`);