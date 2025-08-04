import logger from "@/lib/logger";
import controller from "@/lib/game";

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitCanPlay(playerId: string, gameId: string) {    
  // Update the current player 
  controller.getInstance(gameId).setPlayerIdToPlay(playerId);
  controller.getInstance(gameId).sendState();
  logger.info(`${playerId} can play`);
}

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitCanBid(playerId: string, gameId: string) {
  controller.getInstance(gameId).setPlayerIdToBid(playerId);
  controller.getInstance(gameId).sendState();
  logger.info(`${playerId} can bidding`);
}
