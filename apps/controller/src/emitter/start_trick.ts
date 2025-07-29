import { emitCanPlay } from "@/emitter/can";
import controller from "@/game";
import logger from "@/logger";
import genIdCuid from "../../../game/shared/utils/gen_id";

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function startTrick(gameId: string, publish: (payload: any) => void) {
  // launch trick
  const playerIdStarting = controller
    .getInstance(gameId)
    .getLastTrick().player_starting_id;
  const event = {
    id: await genIdCuid(),
    type: "start_trick",
    playerId: "controller",
    gameId: gameId,
    value: playerIdStarting,
    timestamp : new Date().toISOString(),
  }
  publish(event)
  logger.info(`Starting trick for ${playerIdStarting}`);
  await emitCanPlay(playerIdStarting, gameId, publish);
}
