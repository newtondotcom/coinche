import { genIdCuid } from '@coinche/shared';
import { emitStartTrick } from "./start_trick";
import controller from '@/lib/game';

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitGameStarting(playerId: string, gameId: string) {
  const event = {
    id: await genIdCuid(),
    type: "start_game",
    playerId: "controller",
    gameId: gameId,
    value: playerId,
    timestamp: new Date().toISOString(),
  };
  controller.getInstance(gameId).state.status = 'playing';
  controller.getInstance(gameId).sendState();
  await emitStartTrick(gameId,playerId);
}
