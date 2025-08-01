import { protectedProcedure } from "../lib/orpc";
import controller from '../lib/game';
import { z } from 'zod';

export const checkGameExistsProcedure = protectedProcedure
  .input(z.object({ gameId: z.string() }))
  .handler(({ input }) => {
    return controller.gameExists(input.gameId);
  });
