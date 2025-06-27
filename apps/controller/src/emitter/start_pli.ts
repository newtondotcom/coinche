import { emitCanPlay } from "@/emitter/can";
import controller from "@/game";
import logger from "@/logger";
import genIdCuid from "../../../game/shared/utils/gen_id";

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function startPli(gameId: string, publish: (payload: any) => void) {
  // launch pli
  const playerIdStarting = controller
    .getInstance(gameId)
    .getLastPli().player_starting_id;
  const event = {
    id: await genIdCuid(),
    type: "start_pli",
    playerId: "controller",
    gameId: gameId,
    value: playerIdStarting,
    timestamp : new Date().toISOString(),
  }
  publish(event)
  logger.info(`Starting pli for ${playerIdStarting}`);
  await emitCanPlay(playerIdStarting, gameId, publish);
}
