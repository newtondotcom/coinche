import { formatPoints } from "../../../game/shared/utils/format";
import genIdCuid from "../../../game/shared/utils/gen_id";

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitPoints(
  scoreTeam1: number,
  scoreTeam2: number,
  gameId: string,
  publish: (payload: any) => void
) {
  const event = {
    id: await genIdCuid(),
    type: "score",
    playerId: "controller",
    gameId: gameId,
    value: formatPoints(scoreTeam1, scoreTeam2),
    timestamp: new Date().toISOString(),
  };
  publish(event);
}
