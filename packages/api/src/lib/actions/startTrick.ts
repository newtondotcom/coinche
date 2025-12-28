import logger from "../logger";
import { emitStartDealing } from "./startDealing";
import addRound from "./addRound";
import addPli from "./addPli";

/**
 * Emits a 'start_trick' event to the game room, indicating which player starts the trick.
 * @param gameId The game ID
 * @param playerId The player Id starting
 */
export async function emitStartTrick(gameId: string, playerId: string) {
  logger.info(`[start_trick] Starting trick for player ${playerId} in game ${gameId}`);
  addRound(gameId);
  addPli(playerId, gameId);
  await emitStartDealing(gameId);
}
