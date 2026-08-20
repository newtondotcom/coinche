import controller from "../game";
import logger from "../logger";
import { emitCanPlay } from "./can";

export async function startTrick(gameId: string) {
  // launch trick
  const playerIdStarting = controller.getInstance(gameId).getCurrentTrick().playerStartingId;
  logger.info(`Starting trick for ${playerIdStarting}`);
  await emitCanPlay(playerIdStarting, gameId);
}
