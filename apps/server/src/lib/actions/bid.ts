import type { Ibidding } from '@coinche/shared';
import controller from '@/lib/game';

export async function addBidding(
  bid: Ibidding,
  gameId : string
) {
  controller.getInstance(gameId).state.currentRound.biddings.push(bid);
  if (bid.bidding !== 0) {
    Object.assign(controller.getInstance(gameId).state.currentRound.biddingElected, bid); 
  }
  controller.getInstance(gameId).sendState();
}