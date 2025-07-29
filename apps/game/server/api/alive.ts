import { events } from "@coinche/shared/db/schema";
import { defineEventHandler } from "h3";

export default defineEventHandler(async () => {
  // Insert an event
  await db.insert(events).values({
    id: "dzzzzzzz",
    type: "alive",
    playerId: "dddddddd",
    gameId: "ddddddd",
    value: "alive",
  });

  // Delete all 'alive' events
  await db.delete(events).where(events.type.eq("alive"));

  return {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  };
});
