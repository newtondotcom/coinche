import { emitCanPlay } from '@/emitter/can';
import { closePli } from '@/emitter/close_pli';
import controller from '@/game';
import logger from '@/logger';
import { setNextPlayerTurn } from '@/utils';
import type { EventInsert } from '@coinche/shared';
import { deformatCarteToPlay } from '../../../game/shared/utils/format';
import genIdCuid from '../../../game/shared/utils/gen_id';

export default async function translatePlay(event: EventInsert, publish: (payload: any) => void) {
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
    publish(event2)
    // check if end of pli
    if (controller.getInstance(event.gameId).getLastPli().plays.length === 4) {
        logger.info('End of pli');
        await closePli(event.gameId, publish);
    } else {
        const nextPlayerId = setNextPlayerTurn(playerId, event.gameId);
        await emitCanPlay(nextPlayerId, event.gameId, publish);
    }
    return;
}
