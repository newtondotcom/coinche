import emitDealing from "@/lib/actions/dealing";
import controller from "@/lib/game";
import { generateDeckCards } from "@/lib/utils";
import logger from "@/lib/logger";
import { setPlayerIdToDistrib } from './set_ids';


export async function emitStartDealing(gameId: string) {
  setPlayerIdToDistrib("", gameId);
  if (controller.getInstance(gameId).state.deck.length !== 32) {
    controller.getInstance(gameId).state.deck = generateDeckCards();
    logger.error("start_dealing - deck was not generated" + controller.getInstance(gameId).getCurrentPli().number )
  } else {
    logger.info("start_dealing - deck was already generated" + controller.getInstance(gameId).getCurrentPli().number )
  }
  await emitDealing(
    controller.getInstance(gameId).getCurrentPli().playerStartingId,
    gameId
  );
}
