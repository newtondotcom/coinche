import { formatPoints } from '@coinche/shared';
import { genIdCuid } from '@coinche/shared';
import controller from '@/lib/game';

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitPoints(
  scoreTeam1: number,
  scoreTeam2: number,
  gameId: string
) {
  controller.getInstance(gameId).state.team1PointsCurrentGame +=
      scoreTeam1;
    controller.getInstance(gameId).state.team2PointsCurrentGame+=
      scoreTeam2;
  controller.getInstance(gameId).sendState();
}
