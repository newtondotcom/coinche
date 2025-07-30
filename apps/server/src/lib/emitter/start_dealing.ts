import emitDealing from "@/lib/emitter/dealing";
import controller from "@/lib/game";
import { generateDeckCards } from "@/lib/utils";
import genIdCuid from "@/lib/utils/gen_id";
import logger from "@/lib/logger";
import type { EventInsert } from "@/lib/types";

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitStartDealing(gameId: string, publish: (payload: any) => void) {
  const event: EventInsert = {
    id: await genIdCuid(),
    type: "start_distribution",
    playerId: "controller",
    gameId: gameId,
    value: "idPlayerStarting",
  };
  publish(event);
  if (controller.getInstance(gameId).game.rounds.length === 1) {
    controller.getInstance(gameId).game.deck = generateDeckCards();
  } else {
    logger.error("start_dealing - deck was not generated" + controller.getInstance(gameId).game.rounds.length)
  }
  await emitDealing(
    controller.getInstance(gameId).getLastPli().player_starting_id,
    gameId,
    publish
  );
}
