import { protectedProcedure } from "../lib/orpc";
import { getLeaderboard } from '../lib/leaderboard';

export const leaderboardProcedure = protectedProcedure.handler(({ context }) => {
    const leaderboard = getLeaderboard();
    return {
        leaderboard,
        user: context.session?.user,
    };
});
