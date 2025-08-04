import emitDealing from "@/lib/emitter/dealing";
import controller from "@/lib/game";
import { generateDeckCards } from "@/lib/utils";
import { genIdCuid } from '@coinche/shared';
import logger from "@/lib/logger";
import type { EventInsert } from "@coinche/shared";

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitStartDealing(gameId: string) {
  const event: EventInsert = {
    id: await genIdCuid(),
    type: "start_distribution",
    playerId: "controller",
    gameId: gameId,
    value: "idPlayerStarting",
  };
  if (controller.getInstance(gameId).getCurrentRound().plis.length === 0) {
    controller.getInstance(gameId).state.deck = generateDeckCards();
  } else {
    logger.error("start_dealing - deck was not generated" + controller.getInstance(gameId).getLastPli().number )
  }
  await emitDealing(
    controller.getInstance(gameId).getLastPli().playerStartingId,
    gameId
  );
}
