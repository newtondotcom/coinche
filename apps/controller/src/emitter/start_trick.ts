import logger from '@/logger';
import genIdCuid from '../../../game/shared/utils/gen_id';
import controller from '@/game';
import { emitStartDealing } from './start_dealing';

/**
 * Emits a 'start_trick' event to the game room, indicating which player starts the trick.
 * @param gameId The game ID
 * @param playerId The player Id starting
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitStartTrick(gameId: string,playerId :string, publish: (payload: any) => void) {
  const event = {
    id: await genIdCuid(),
    type: 'start_trick',
    playerId: playerId,
    gameId: gameId,
    value: playerId,
    timestamp: new Date().toISOString(),
  };
  logger.info(`[start_trick] Starting trick for player ${playerId} in game ${gameId}`);
  publish(event);
  controller.getInstance(gameId).addRound(playerId);
  controller.getInstance(gameId).addPli(playerId);
  await emitStartDealing(gameId,publish);
} 