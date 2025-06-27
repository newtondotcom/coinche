import controller from "@/game";
import genIdCuid from "../../../game/shared/utils/gen_id";
import { emitStartDealing } from "./start_dealing";

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitGameStarting(playerId: string, gameId: string, publish: (payload: any) => void) {
  const event = {
    id: await genIdCuid(),
    type: "start_game",
    playerId: "controller",
    gameId: gameId,
    value: playerId,
    timestamp: new Date().toISOString(),
  };
  publish(event);
  controller.getInstance(gameId).addRound(playerId);
  //await emitStartTrick(gameId, playerId, publish);
  //await emitCanAnnonce(playerId,gameId,publish)
  await emitStartDealing(gameId,publish);
}
