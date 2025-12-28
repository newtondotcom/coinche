import type { Ibidding } from "@coinche-reborn/api";
import controller from "../game";
import { setValueAccordingToTrump } from "../utils/cardValues";
import logger from "../logger";

export async function addBidding(bid: Ibidding, gameId: string) {
  const controllerInstance = controller.getInstance(gameId);
  controllerInstance.state.currentRound.biddings.push(bid);
  if (bid.bidding !== 0) {
    Object.assign(controllerInstance.state.currentRound.biddingElected, bid);
    // Update card values for all players' hands when trump is elected
    const trump = bid.suite;
    const players = Array.from(controllerInstance.getPlayers());
    players.forEach((player) => {
      if (player.hands && player.hands.length > 0) {
        player.hands = setValueAccordingToTrump([...player.hands], trump);
        logger.info(
          `Updated card values for player ${player.id} with trump ${trump} (${player.hands.length} cards)`,
        );
      }
    });
  }
  controllerInstance.sendState();
}
