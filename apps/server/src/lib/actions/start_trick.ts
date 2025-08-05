import logger from '@/lib/logger';
import { emitStartDealing } from './start_dealing';
import addRound from './add_round';
import addPli from './add_pli';

/**
 * Emits a 'start_trick' event to the game room, indicating which player starts the trick.
 * @param gameId The game ID
 * @param playerId The player Id starting
 */
export async function emitStartTrick(gameId: string,playerId :string) {
  logger.info(`[start_trick] Starting trick for player ${playerId} in game ${gameId}`);
  addRound(gameId);
  addPli(playerId, gameId);
  await emitStartDealing(gameId);
} 