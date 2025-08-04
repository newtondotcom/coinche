import { emitCanPlay } from '@/lib/emitter/can';
import { closePli } from '@/lib/emitter/close_pli';
import controller from '@/lib/game';
import logger from '@/lib/logger';
import { getNextPlayerTurn } from '@/lib/utils';
import type { EventInsert } from '@coinche/shared';
import { deformatCarteToPlay } from '@coinche/shared';
import { genIdCuid } from '@coinche/shared';

export default async function translatePlay(event: EventInsert) {
    const def = deformatCarteToPlay(event.value as string);
    const card = def.card;
    const pli_number = def.pli_number;
    const playerId = event.playerId;
    controller.getInstance(event.gameId).addPlay(card, playerId);
    const event2 = {
        id: await genIdCuid(),
        type: "play",
        playerId: event.playerId,
        gameId: event.gameId,
        value: event.value,
        timestamp : new Date().toISOString(),
      }
    // //publish(event2)
    // check if end of pli
    if (controller.getInstance(event.gameId).getLastPli().plays.length === 4) {
        logger.info('End of pli');
        await closePli(event.gameId);
    } else {
        const nextPlayerId = getNextPlayerTurn(playerId, event.gameId);
        await emitCanPlay(nextPlayerId, event.gameId);
    }
    return;
}
