import logger from "@/logger";
import genIdCuid from "../../../game/shared/utils/gen_id";

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
export async function emitCanAnnonce(playerId: string, gameId: string, publish: (payload: any) => void) {
  const event = {
    id: await genIdCuid(),
    type: "can_annonce",
    playerId: "controller",
    gameId: gameId,
    value: playerId,
    timestamp: new Date().toISOString(),
  };
  publish(event);
  logger.info(`${playerId} can annonce`);
}
