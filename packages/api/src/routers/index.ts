import type { RouterClient } from "@orpc/server";

import { publicProcedure } from "../index";
import { checkGameExistsProcedure } from "../procedures/checkGameExists";
import { historiqueProcedure } from "../procedures/historique";
import { leaderboardProcedure } from "../procedures/leaderboard";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  checkGameExists: checkGameExistsProcedure,
  historique: historiqueProcedure,
  leaderboard: leaderboardProcedure,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
