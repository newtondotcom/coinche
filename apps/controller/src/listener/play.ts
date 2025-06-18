import { emitCanPlay } from '@/emitter/can';
import { closePli } from '@/emitter/close_pli';
import controller from '@/game';
import logger from '@/logger';
import { setNextPlayerTurn } from '@/utils';
import { deformatCarteToPlay } from '@coinche/shared';
import type { EventInsert } from '@coinche/shared';

export default async function translatePlay(event: EventInsert) {
    const def = deformatCarteToPlay(event.value as string);
    const card = def.card;
    const pli_number = def.pli_number;
    const playerId = event.playerId;
    controller.getInstance(event.gameId).addPlay(card, playerId);
    // check if end of pli
    if (controller.getInstance(event.gameId).getLastPli().plays.length === 4) {
        logger.info('End of pli');
        await closePli(event.gameId);
    } else {
        const nextPlayerId = setNextPlayerTurn(playerId, event.gameId);
        await emitCanPlay(nextPlayerId, event.gameId);
    }
    return;
}
