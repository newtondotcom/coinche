import type { Ibidding } from '@coinche/shared';
import controller from '@/lib/game';

export async function addBidding(
  bid: Ibidding,
  gameId : string
) {
  controller.getInstance(gameId).state.currentRound.biddings.push(bid);
  controller.getInstance(gameId).sendState();
}