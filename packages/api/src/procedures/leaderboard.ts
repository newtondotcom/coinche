import { db } from "@coinche-reborn/db";
import { protectedProcedure } from "../index";
import { desc } from "drizzle-orm";
import { playerStats } from "@coinche-reborn/db/schema/index";

export const leaderboardProcedure = protectedProcedure.handler(async ({ context }) => {
  const leaderboard = await db
    .select()
    .from(playerStats)
    .orderBy(desc(playerStats.totalPoints))
    .limit(100);
  return {
    leaderboard,
    user: context.session?.user,
  };
});
