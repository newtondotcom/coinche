import { emitStartTrick } from "@/emitter/start_trick";
import genIdCuid from "../../../game/shared/utils/gen_id";

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitGameStarting(playerId: string, gameId: string, publish: (room: string, payload: any) => void) {
  const event = {
    id: await genIdCuid(),
    type: "start_game",
    playerId: "controller",
    gameId: gameId,
    value: playerId,
    timestamp: new Date().toISOString(),
  };
  publish(`game-${gameId}`, event);
  await emitStartTrick(gameId, playerId, publish);
}
