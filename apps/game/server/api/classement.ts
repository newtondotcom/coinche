import { defineEventHandler } from 'h3';
import { db } from '@coinche/shared/db';
import { playerStats } from '@coinche/shared/db/schema';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // Fetch top 100 players ordered by total_points descending
  const data = await db.select().from(playerStats).orderBy(desc(playerStats.totalPoints)).limit(100);
  return { data };
}); 