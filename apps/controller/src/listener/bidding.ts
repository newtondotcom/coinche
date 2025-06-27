import { emitCanBid } from '@/emitter/can';
import { startPli } from '@/emitter/start_pli';
import controller from '@/game';
import logger from '@/logger';
import { setNextPlayerTurn } from '@/utils';
import type { EventInsert } from '@coinche/shared';
import { deformatBidding } from '../../../game/shared/utils/format';
import { emitBid } from '@/emitter/bid';

export default async function translateBidding(event: EventInsert, publish: (payload: any) => void) {
    const bid = deformatBidding(event.value as string, event.playerId);
    controller.getInstance(event.gameId).addbidding(bid);
    await emitBid(bid,event.gameId,publish);
    const nextPlayerId = setNextPlayerTurn(event.playerId, event.gameId);
    await emitCanBid(nextPlayerId, event.gameId, publish);
    
    if (bid.bidding === 0) {
        // Get the last two biddings to check if they are both passes
        const lastTwobiddings = controller
            .getInstance(event.gameId)
            .getLastRound()
            .biddings.slice(-3);
        const biddingsPassed = lastTwobiddings.filter((bidding) => bidding.bidding === 0);

        // Include the current bidding in the check
        if (biddingsPassed.length === 3) {
            logger.info('Starting pli because of 3 consecutive passes');
            await startPli(event.gameId, publish);
            return;
        } else {
            logger.info(biddingsPassed.length.toString(), 'passes');
        }
    }
}
