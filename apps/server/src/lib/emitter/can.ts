import logger from "@/lib/logger";
import { genIdCuid } from '@coinche/shared';

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitCanPlay(playerId: string, gameId: string, publish: (payload: any) => void) {
  const event = {
    id: await genIdCuid(),
    type: "can_play",
    playerId: "controller",
    gameId: gameId,
    value: playerId,
    timestamp: new Date().toISOString(),
  };
  publish(event);
  logger.info(`${playerId} can play`);
}

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitCanBid(playerId: string, gameId: string, publish: (payload: any) => void) {
  const event = {
    id: await genIdCuid(),
    type: "can_bid",
    playerId: "controller",
    gameId: gameId,
    value: playerId,
    timestamp: new Date().toISOString(),
  };
  publish(event);
  logger.info(`${playerId} can bidding`);
}
