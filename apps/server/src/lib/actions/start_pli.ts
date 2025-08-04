import controller from "@/lib/game";
import logger from "@/lib/logger";
import { genIdCuid } from '@coinche/shared';
import { emitCanPlay } from "./can";

/**
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
  ////publish(event)
  logger.info(`Starting pli for ${playerIdStarting}`);
  await emitCanPlay(playerIdStarting, gameId);
}
