import { emitCanPlay } from "@/lib/actions/can";
import controller from "@/lib/game";
import logger from "@/lib/logger";
import { genIdCuid } from '@coinche/shared';

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function startPli(gameId: string) {
  // launch pli
  const playerIdStarting = controller
    .getInstance(gameId)
    .getLastPli().playerStartingId;
  const event = {
    id: await genIdCuid(),
    type: "start_pli",
    playerId: "controller",
    gameId: gameId,
    value: playerIdStarting,
    timestamp : new Date().toISOString(),
  }
  await new Promise(resolve => setTimeout(resolve, 500));
  ////publish(event)
  logger.info(`Starting pli for ${playerIdStarting}`);
  await emitCanPlay(playerIdStarting, gameId);
}
