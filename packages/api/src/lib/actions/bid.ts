import type { Ibidding } from "@coinche-reborn/api";
import controller from "../game";

export async function addBidding(bid: Ibidding, gameId: string) {
  controller.getInstance(gameId).state.currentRound.biddings.push(bid);
  if (bid.bidding !== 0) {
    Object.assign(controller.getInstance(gameId).state.currentRound.biddingElected, bid);
  }
  controller.getInstance(gameId).sendState();
}
