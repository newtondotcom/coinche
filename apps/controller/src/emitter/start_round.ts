import { emitCanPlay } from "@/emitter/can";
import controller from "@/game";
import logger from "@/logger";
import genIdCuid from "../../../game/shared/utils/gen_id";

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitStartRound(gameId: string, playerId: string, publish: (payload: any) => void) {
  // launch new round
  controller.getInstance(gameId).addRound(playerId);
  controller.getInstance(gameId).addTrick(playerId);
  const event = {
    id: await genIdCuid(),
    type: "start_round",
    playerId: "controller",
    gameId: gameId,
    value: playerId,
    timestamp : new Date().toISOString(),
  }
  publish(event)
  logger.info(`Starting new round for ${playerId}`);
  await emitCanPlay(playerId, gameId, publish);
}