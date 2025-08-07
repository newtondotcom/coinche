import type { bidding, ICardSuite, PlayerId } from "@coinche/shared";
import controller from "@/lib/game";
import logger from "@/lib/logger";

export default function addRound(gameId: string): void {
    const roundInit = {
        plis: [],
        biddings: [],
        biddingElected: { suite: 'NA' as ICardSuite, bidding: 0 as bidding, playerId: 'NA' as PlayerId },
        coinched: false,
        surcoinched: false,
    };
    Object.assign(controller.getInstance(gameId).state, { currentRound: roundInit });
    logger.info('New round created');
}