import { createContext } from "@coinche-reborn/api/context";
import { appRouter } from "@coinche-reborn/api/routers/index";
import { auth } from "@coinche-reborn/auth";
import { env } from "@coinche-reborn/env/server";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { serve, type ServerWebSocket } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import controller from "@coinche-reborn/api/lib/game";
import type { EventInsert } from "@coinche-reborn/api/others/types";
import logger from "@coinche-reborn/api/lib/logger";
import { translateEvent } from "@coinche-reborn/api/lib/listener/index";
import { runMigrations } from "@coinche-reborn/db";

// --- Room Management ---
export const userRooms = new Map<any, Set<string>>(); // ws -> Set<room>
// --- In-memory player tracking for each game ---
export const gamePlayers = new Map<string, Set<string>>(); // gameId -> Set<playerId>

// --- In-memory gameId for the example ---
const gameId = "0";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: env.CORS_ORIGIN,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

export const apiHandler = new OpenAPIHandler(appRouter, {
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
    }),
  ],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

export const rpcHandler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

app.use("/*", async (c, next) => {
  const context = await createContext({ context: c });

  const rpcResult = await rpcHandler.handle(c.req.raw, {
    prefix: "/rpc",
    context: context,
  });

  if (rpcResult.matched) {
    return c.newResponse(rpcResult.response.body, rpcResult.response);
  }

  const apiResult = await apiHandler.handle(c.req.raw, {
    prefix: "/api-reference",
    context: context,
  });

  if (apiResult.matched) {
    return c.newResponse(apiResult.response.body, apiResult.response);
  }

  await next();
});

app.get("/", (c) => {
  return c.text("OK");
});

// Declare server variable before it's used
let server: ReturnType<typeof serve> | null = null;

app.get("/ws", async (c, next) => {
  console.log("ws2");
  const context = await createContext({ context: c });
  // get user
  const userId = context.session?.user.id;
  // Attach gameId and userId to ws.data
  if (!server) {
    return c.newResponse("Server not ready", 503);
  }
  const success = server.upgrade(c.req.raw, { data: { userId, gameId } });
  if (success) return c.newResponse("Hello world");
  await next();
});

const wsHandler = {
  open(ws: ServerWebSocket) {
    const data = ws.data as unknown as { userId: string; gameId: string };
    const gameId = data.gameId;
    // On connect, no room joined yet
    userRooms.set(ws, new Set());
    ws.subscribe(gameId);
    console.log("client suscribed to room");
  },
  async message(ws: ServerWebSocket, raw: string | ArrayBuffer | Uint8Array) {
    const data = ws.data as unknown as { userId: string; gameId: string };
    let msg: EventInsert;
    let rawStr: string = typeof raw === "string" ? raw : raw.toString();
    try {
      msg = JSON.parse(rawStr);
    } catch (e) {
      ws.send(JSON.stringify({ type: "system", message: "Invalid message format." }));
      return;
    }
    if (msg.type && msg.gameId) {
      if (msg.gameId !== gameId) {
        ws.send(JSON.stringify({ type: "system", message: "Invalid gameId." }));
        logger.error(`Invalid gameId: ${msg.gameId}, expected: ${gameId}`);
        return;
      }
      /*
      if (msg.playerId && msg.playerId !== data.userId) {
        ws.send(JSON.stringify({ type: "system", message: "Invalid playerId." }));
        logger.error(`Invalid playerId: ${msg.playerId}, expected: ${data.userId}`);
        return;
      }
      */
      logger.warn(msg);
      try {
        await translateEvent(msg);
      } catch (error) {
        console.error("Translate event error:", error);
        ws.send(JSON.stringify({ type: "system", message: "Event processing error." }));
      }
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

    // for now, we are cleaning everything
    userRooms.delete(ws);
    gamePlayers.delete(gameId);
    controller.clearGames();
  },
};

// Initialize server with migrations
async function initializeServer() {
  // Run database migrations before starting the server
  // This ensures the schema is up to date before accepting connections
  try {
    await runMigrations();
  } catch (error) {
    logger.error("Failed to run migrations:", error);
    // In production, you might want to exit here
    // For development, we continue so the server can start even if DB is not available
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }

  server = serve({
    port: 3000,
    fetch: app.fetch,
    websocket: wsHandler,
    development: true,
  });

  // Inject server instance into the game controller
  controller.setServer(server);

  return server;
}

// Start the server
initializeServer();

// Export server for external use
export { server };
