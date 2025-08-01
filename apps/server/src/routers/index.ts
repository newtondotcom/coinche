import { leaderboardProcedure } from "@/procedures/leaderboard";
import { historiqueProcedure } from "@/procedures/historique";
import { checkGameExistsProcedure } from "@/procedures/checkGameExists";
import { protectedProcedure, publicProcedure } from "../lib/orpc";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: "This is private",
      user: context.session?.user,
    };
  }),
  leaderboard: leaderboardProcedure,
  historique: historiqueProcedure,
  checkGameExists: checkGameExistsProcedure,
};
export type AppRouter = typeof appRouter;
