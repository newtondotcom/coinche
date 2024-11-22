import { startPli } from "../emitter/start_pli";
import Master from "../game";
import { deformatAnnonce, type EventShared } from "@coinche/shared";
import logger from "../logger";
import { setNextPlayerTurn } from "../utils";
import { emitCanAnnonce } from "../emitter/can";

export default async function translateAnnonce(event: EventShared) {
  const annonce = deformatAnnonce(event.value as string, event.playerId);
  Master.getInstance(event.gameId).addAnnonce(annonce);
  const nextPlayerId = setNextPlayerTurn(event.playerId, event.gameId);
  await emitCanAnnonce(nextPlayerId, event.gameId);

  if (annonce.annonce === 0) {
    // Get the last two annonces to check if they are both passes
    const lastTwoAnnonces = Master.getInstance(event.gameId)
      .getLastRound()
      .annonces.slice(-3);
    const annoncesPassed = lastTwoAnnonces.filter(
      (annonce) => annonce.annonce === 0,
    );

    // Include the current annonce in the check
    if (annoncesPassed.length === 3) {
      logger.info("Starting pli because of 3 consecutive passes");
      await startPli(event.gameId);
      return;
    } else {
      logger.info(annoncesPassed.length.toString(), "passes");
    }
  }
}
