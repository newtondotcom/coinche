import { deformatAnnonce } from '@coinche/shared';
import type { EventInsert } from '@coinche/shared';

import { emitCanAnnonce } from '@/emitter/can';
import { startPli } from '@/emitter/start_pli';
import controller from '@/game';
import logger from '@/logger';
import { setNextPlayerTurn } from '@/utils';

export default async function translateAnnonce(event: EventInsert) {
    const annonce = deformatAnnonce(event.value as string, event.playerId);
    controller.getInstance(event.gameId).addAnnonce(annonce);
    const nextPlayerId = setNextPlayerTurn(event.playerId, event.gameId);
    await emitCanAnnonce(nextPlayerId, event.gameId);

    if (annonce.annonce === 0) {
        // Get the last two annonces to check if they are both passes
        const lastTwoAnnonces = controller.getInstance(event.gameId).getLastRound().annonces.slice(-3);
        const annoncesPassed = lastTwoAnnonces.filter((annonce) => annonce.annonce === 0);

        // Include the current annonce in the check
        if (annoncesPassed.length === 3) {
            logger.info('Starting pli because of 3 consecutive passes');
            await startPli(event.gameId);
            return;
        } else {
            logger.info(annoncesPassed.length.toString(), 'passes');
        }
    }
}
