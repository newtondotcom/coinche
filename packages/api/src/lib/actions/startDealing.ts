import emitDealing from "./dealing";
import controller from "../game";
import { generateDeckCards } from "../utils";
import logger from "../logger";
import { setPlayerIdToDistrib } from "./setIds";

export async function emitStartDealing(gameId: string) {
  setPlayerIdToDistrib("", gameId);
  if (controller.getInstance(gameId).state.deck.length !== 32) {
    Object.assign(controller.getInstance(gameId).state, { deck: generateDeckCards() });
    logger.error(
      "start_dealing - deck was not generated" +
        controller.getInstance(gameId).getCurrentPli().number,
    );
  } else {
    logger.info(
      "start_dealing - deck was already generated" +
        controller.getInstance(gameId).getCurrentPli().number,
    );
  }
  await emitDealing(controller.getInstance(gameId).getCurrentPli().playerStartingId, gameId);
}
