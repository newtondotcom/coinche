import { protectedProcedure } from "../lib/orpc";
import { db } from "@/db";
import { game } from "@/db/schema/coinche";
import { or, desc, eq } from 'drizzle-orm';

export const historiqueProcedure = protectedProcedure.handler(async ({ context }) => {
    const playerId = context.session?.user?.id;
  if (!playerId) {
    return { exists: false };
  }
  const pid = String(playerId);
  // Fetch games where user is p1, p2, p3, or p4
  const historique = await db
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
    return {
        historique,
        user: context.session?.user,
    };
});
