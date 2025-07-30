import "dotenv/config";
import { RPCHandler } from "@orpc/server/fetch";
import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";
import { auth } from "./lib/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger as honoLogger } from "hono/logger";
import logger from "./lib/logger";
import { serve, type ServerWebSocket } from "bun";
import type { EventInsert } from "./lib/types";
import { translateEvent } from "./lib/listener";

async function getUsernameFromCookies(cookie: string | null) {
  return "test";
}

// --- Room Management ---
export const userRooms = new Map<any, Set<string>>(); // ws -> Set<room>
// --- In-memory player tracking for each game ---
export const gamePlayers = new Map<string, Set<string>>(); // gameId -> Set<playerId>

// --- In-memory gameId for the example ---
const gameId = "0";

const app = new Hono();

app.use(honoLogger());
app.use("/*", cors({
  origin: process.env.CORS_ORIGIN || "",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

const handler = new RPCHandler(appRouter);
app.use("/rpc/*", async (c, next) => {
  const context = await createContext({ context: c });
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/rpc",
    context: context,
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }
  await next();
});

app.get("/", (c) => {
  return c.text("OK");
});

app.get("/ws", async (c) => {
  const context = await createContext({ context: c });
  // get user
  const username = "test";
  // Attach gameId and userId to ws.data
  const success = server.upgrade(c.req.raw, { data: { username, gameId } });
  if (success) return undefined;
  return new Response("Hello world");
});

const wsHandler = {
  open(ws: ServerWebSocket) {
    const data = ws.data as { username: string, gameId: string };
    const gameId = data.gameId;
    // On connect, no room joined yet
    userRooms.set(ws, new Set());
    ws.subscribe(gameId);
    console.log("cleint suscribed to room")
    // ws.data already contains username and gameId from upgrade
  },
  async message(ws: ServerWebSocket, raw : string | ArrayBuffer | Uint8Array) {
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
      const data = ws.data as { username: string, gameId: string };
      // Fill missing fields for EventInsert
      const event: EventInsert = {
        ...msg, // spread first so explicit fields below take precedence
        gameId: msg.gameId || data.gameId,
        id: (msg as any).id || crypto.randomUUID(),
        playerId: (msg as any
      // Use ws.data for userId and gameId).playerId || data.username,
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
  close(ws: ServerWebSocket) {
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
};

const server = serve({
  port: 3000,
  fetch: app.fetch,
  websocket: wsHandler,
});

console.log(`Listening on ${server.hostname}:${server.port}`);

