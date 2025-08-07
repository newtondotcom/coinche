import { leaderboardProcedure } from "@/procedures/leaderboard";
import { historiqueProcedure } from "@/procedures/historique";
import { checkGameExistsProcedure } from "@/procedures/checkGameExists";
import { publicProcedure } from "@/lib/orpc";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  leaderboard: leaderboardProcedure,
  historique: historiqueProcedure,
  checkGameExists: checkGameExistsProcedure,
};
export type AppRouter = typeof appRouter;
