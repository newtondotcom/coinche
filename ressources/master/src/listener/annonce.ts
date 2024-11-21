import { startPli } from "../emitter/start_pli";
import Master from "../game";
import { deformatAnnonce, type EventShared } from "@coinche/shared";

export default async function translateAnnonce(event: EventShared) {
  const annonce = deformatAnnonce(event.value as string, event.playerId);
  Master.getInstance(event.gameId).addAnnonce(annonce);
  if (annonce.annonce === 0) {
    // Get the last two annonces to check if they are both passes
    const lastTwoAnnonces = Master.getInstance(event.gameId).game.rounds[
      -1
    ].annonces.slice(-2);
    const annoncesPassed = lastTwoAnnonces.filter(
      (annonce) => annonce.annonce === 0,
    );

    // Include the current annonce in the check
    if (annoncesPassed.length === 3) {
      await startPli();
      console.log("Starting pli because of 3 consecutive passes");
      return;
    } else {
      console.log(annoncesPassed.length, "passes");
    }
  }
}
