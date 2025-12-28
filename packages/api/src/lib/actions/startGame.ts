import { emitStartTrick } from "./startTrick";
import controller from "../game";

export async function emitGameStarting(playerId: string, gameId: string) {
  Object.assign(controller.getInstance(gameId).state, { status: "playing" });
  controller.getInstance(gameId).sendState();
  await emitStartTrick(gameId, playerId);
}
