import { emitCanBid } from "../actions/can";
import { startTrick } from "../actions/startTrick";
import controller from "../game";
import logger from "../logger";
import { getNextPlayerTurn } from "../utils";
import type { EventInsert } from "@coinche-reborn/api";
import { deformatBidding } from "@coinche-reborn/api";
import { addBidding } from "../actions/bid";
import { setValueAccordingToTrump } from "../utils/cardValues";

export default async function translateBidding(event: EventInsert) {
  const bid = deformatBidding(event.value as string, event.playerId);

  logger.info(
    `[translateBidding] Player ${event.playerId} bidding: ${bid.bidding} in game ${event.gameId}`,
  );

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

  addBidding(bid, event.gameId);

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
      logger.info("Starting trick because of 3 consecutive passes");
      // Ensure card values are calculated before starting the trick
      const controllerInstance = controller.getInstance(event.gameId);
      const trump = controllerInstance.getCurrentRound().biddingElected.suite;
      if (trump && trump !== "NA") {
        const players = Array.from(controllerInstance.getPlayers());
        players.forEach((player) => {
          if (player.hands && player.hands.length > 0) {
            player.hands = setValueAccordingToTrump([...player.hands], trump);
            logger.info(
              `Updated card values for player ${player.id} before starting trick (${player.hands.length} cards)`,
            );
          }
        });
        controllerInstance.sendState();
      }
      await startTrick(event.gameId);
      return;
    } else {
      logger.info(biddingsPassed.length.toString(), "passes");
    }
  }
}
