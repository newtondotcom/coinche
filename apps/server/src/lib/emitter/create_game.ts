import { genIdCuid } from '@coinche/shared';
import { formatPoints } from "@coinche/shared";
import type { EventInsert } from "@coinche/shared";
import { events } from "@/db/schema/coinche";
import { and, desc, eq} from "drizzle-orm";
import { db } from "@/db";
import controller from '@/lib/game';

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitGameCreation(gameId: string) {
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
      controller.getInstance(gameId).state.status = 'waiting';
      controller.getInstance(gameId).sendState();
    }
  }
}
