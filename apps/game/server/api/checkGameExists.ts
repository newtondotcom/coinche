import { defineEventHandler, getQuery } from 'h3';
import { db } from '@coinche/shared/db';
import { game } from '@coinche/shared/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { gameId } = getQuery(event);
  if (!gameId) {
    return { exists: false };
  }
  const result = await db.select().from(game).where(eq(game.id, String(gameId))).limit(1);
  return { exists: result.length > 0 };
}); 