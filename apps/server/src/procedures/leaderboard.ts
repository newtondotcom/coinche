import { db } from "@/db";
import { protectedProcedure } from "../lib/orpc";
import { desc } from 'drizzle-orm';
import { playerStats } from "@/db/schema/coinche";

export const leaderboardProcedure = protectedProcedure.handler(async ({ context }) => {
    const leaderboard = await db.select().from(playerStats).orderBy(desc(playerStats.totalPoints)).limit(100);
    return {
        leaderboard,
        user: context.session?.user,
    };
});
