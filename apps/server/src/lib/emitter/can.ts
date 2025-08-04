import logger from "@/lib/logger";
import { genIdCuid } from '@coinche/shared';
import controller from "../game";

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitCanPlay(playerId: string, gameId: string) {
  controller.getInstance(gameId).sendState();
  logger.info(`${playerId} can play`);
}

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitCanBid(playerId: string, gameId: string) {
  controller.getInstance(gameId).sendState();
  logger.info(`${playerId} can bidding`);
}
