import logger from "../logger";
import { emitStartDealing } from "./startDealing";
import addRound from "./addRound";
import addTrick from "./addTrick";

/**
 * Emits a 'start_round' event to the game room, indicating which player starts the round.
 * @param gameId The game ID
 * @param playerId The player Id starting
 */
export async function emitStartRound(gameId: string, playerId: string) {
  logger.info(`[start_round] Starting round for player ${playerId} in game ${gameId}`);
  addRound(gameId);
  addTrick(playerId, gameId);
  await emitStartDealing(gameId);
}
