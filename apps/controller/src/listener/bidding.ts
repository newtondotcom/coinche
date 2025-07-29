import { emitCanBid } from '@/emitter/can';
import { startTrick } from '@/emitter/start_trick';
import controller from '@/game';
import logger from '@/logger';
import { setNextPlayerTurn } from '@/utils';
import type { EventInsert } from '@coinche/shared';
import { deformatBid } from '../../../game/shared/utils/format';
import { emitBid } from '@/emitter/bid';

export default async function translateBid(event: EventInsert, publish: (payload: any) => void) {
    const bid = deformatBid(event.value as string, event.playerId);
    
    // Update coinche/surcoinche state based on special bid values
    const controllerInstance = controller.getInstance(event.gameId);
    const lastRound = controllerInstance.getLastRound();
    
    if (bid.bidding === 251 || bid.bidding === 501) {
        // Coinché bid
        lastRound.coinched = true;
    } else if (bid.bidding === 252 || bid.bidding === 502) {
        // Surcoinché bid
        lastRound.surcoinched = true;
    }
    
    controller.getInstance(event.gameId).addBid(bid);
    await emitBid(bid,event.gameId,publish);
    const nextPlayerId = setNextPlayerTurn(event.playerId, event.gameId);
    await emitCanBid(nextPlayerId, event.gameId, publish);
    
    if (bid.bidding === 0) {
        // Get the last two bids to check if they are both passes
        const lastTwoBids = controller
            .getInstance(event.gameId)
            .getLastRound()
            .bids.slice(-3);
        const bidsPassed = lastTwoBids.filter((bid) => bid.bidding === 0);

        // Include the current bid in the check
        if (bidsPassed.length === 3) {
            logger.info('Starting trick because of 3 consecutive passes');
            await startTrick(event.gameId, publish);
            return;
        } else {
            logger.info(bidsPassed.length.toString(), 'passes');
        }
    }
}
