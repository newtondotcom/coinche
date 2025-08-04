import { emitCanBid } from '@/lib/emitter/can';
import { startPli } from '@/lib/emitter/start_pli';
import controller from '@/lib/game';
import logger from '@/lib/logger';
import { getNextPlayerTurn } from '@/lib/utils';
import type { EventInsert } from '@coinche/shared';
import { deformatBidding } from '@coinche/shared';
import { emitBid } from '@/lib/emitter/bid';

export default async function translateBidding(event: EventInsert) {
    const bid = deformatBidding(event.value as string, event.playerId);
    
    // Update coinche/surcoinche state based on special bid values
    const controllerInstance = controller.getInstance(event.gameId);
    const lastRound = controllerInstance.getCurrentRound();
    
    if (bid.bidding === 251 || bid.bidding === 501) {
        // Coinché bid
        lastRound.coinched = true;
    } else if (bid.bidding === 252 || bid.bidding === 502) {
        // Surcoinché bid
        lastRound.surcoinched = true;
    }

    await emitBid(bid,event.gameId);

    const nextPlayerId = getNextPlayerTurn(event.playerId, event.gameId);
    await emitCanBid(nextPlayerId, event.gameId);
    
    if (bid.bidding === 0) {
        // Get the last two biddings to check if they are both passes
        const lastTwobiddings = controller
            .getInstance(event.gameId)
            .getCurrentRound()
            .biddings.slice(-3);
        const biddingsPassed = lastTwobiddings.filter((bidding) => bidding.bidding === 0);

        // Include the current bidding in the check
        if (biddingsPassed.length === 3) {
            logger.info('Starting pli because of 3 consecutive passes');
            await startPli(event.gameId);
            return;
        } else {
            logger.info(biddingsPassed.length.toString(), 'passes');
        }
    }
}
