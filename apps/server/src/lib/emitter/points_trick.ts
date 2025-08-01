import { formatPoints } from '@coinche/shared';
import { genIdCuid } from '@coinche/shared';
import controller from '@/lib/game';

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitPointsTrick(
  scoreTeam1: number,
  scoreTeam2: number,
  gameId: string,
  publish: (payload: any) => void
) {
  const event = {
    id: await genIdCuid(),
    type: "score_trick",
    playerId: "controller",
    gameId: gameId,
    value: formatPoints(scoreTeam1, scoreTeam2),
    timestamp: new Date().toISOString(),
  };
  controller.getInstance(gameId).sendState();
}
