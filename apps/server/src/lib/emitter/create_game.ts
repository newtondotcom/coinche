import genIdCuid from "@/lib/utils/gen_id";
import { formatPoints } from "@/lib/utils/format";
import type { EventInsert } from "@/lib/types";
import { events } from "@/db/schema/coinche";
import { and, desc, eq} from "drizzle-orm";
import { db } from "@/db";

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitGameCreation(gameId: string, publish: (payload: any) => void) {
  // Check if there are any events for this gameId
  const datas = await db
    .select()
    .from(events)
    .where(
      and(
        eq(events.type, "join"),
        eq(events.gameId, gameId)
      ) 
    )
    .orderBy(desc(events.createdAt))
    .limit(1);

  if (datas?.length === 0) {
    // create or update the score record
    const datas = await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.type, "score"),
          eq(events.gameId, gameId)
        )
      )
      .orderBy(desc(events.createdAt))
      .limit(1);
    if (datas?.length === 0) {
      const event: EventInsert = {
        id: await genIdCuid(),
        type: "bidding",
        playerId: "controller",
        gameId: gameId,
        value: formatPoints(0, 0),
      };
      publish(event);
    }
  }
}
