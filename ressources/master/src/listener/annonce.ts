import { startPli } from "@/lib/emitter/pli";
import Master from "../game";

export default async function translateAnnonce(event: EventShared) {
  const annonce = deformatAnnonce(event.value as string, event.playerId);
  Master.instance.addAnnonce(annonce);
  if (annonce.annonce === 0) {
    // Get the last two annonces to check if they are both passes
    const lastTwoAnnonces = Master.instance.game.rounds[-1].annonces.slice(-2);
    const annoncesPassed = lastTwoAnnonces.filter(
      (annonce) => annonce.annonce === 0,
    );

    // Include the current annonce in the check
    if (annoncesPassed.length === 2) {
      await startPli();
      console.log("Starting pli because of 3 consecutive passes");
      return;
    } else {
      console.log(annoncesPassed.length, "passes");
    }
  }
}

export function formatAnnonce(annonce: IAnnonce): string {
  return `${annonce.annonce}|${annonce.suite}`;
}

export function deformatAnnonce(annonce: string, playerId: string): IAnnonce {
  const [annonceValue, suite] = annonce.split("|");
  return {
    annonce: parseInt(annonceValue) as Annonce,
    suite: suite as CardSuite,
    playerId: playerId,
  };
}
