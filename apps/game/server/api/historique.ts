import { defineEventHandler, getQuery } from 'h3';
import { db } from '@coinche/shared/db';
import { game } from '@coinche/shared/db/schema';
import { desc, or, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { playerId } = getQuery(event);
  if (!playerId) {
    return { exists: false };
  }
  const pid = String(playerId);
  // Fetch games where user is p1, p2, p3, or p4
  const data = await db
    .select()
    .from(game)
    .where(
      or(
        eq(game.player1Id, pid),
        eq(game.player2Id, pid),
        eq(game.player3Id, pid),
        eq(game.player4Id, pid)
      )
    )
    .orderBy(desc(game.createdAt))
    .limit(100);
  return { data };
});
