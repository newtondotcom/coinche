import { emitCanPlay } from '@/emitter/can';
import { closeTrick } from '@/emitter/close_trick';
import controller from '@/game';
import logger from '@/logger';
import { setNextPlayerTurn } from '@/utils';
import type { EventInsert } from '@coinche/shared';
import { deformatCarteToPlay } from '../../../game/shared/utils/format';
import genIdCuid from '../../../game/shared/utils/gen_id';

export default async function translatePlay(event: EventInsert, publish: (payload: any) => void) {
    const def = deformatCarteToPlay(event.value as string);
    const card = def.card;
    const trick_number = def.trick_number;
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
    // check if end of trick
    if (controller.getInstance(event.gameId).getLastTrick().plays.length === 4) {
        logger.info('End of trick');
        await closeTrick(event.gameId, publish);
    } else {
        const nextPlayerId = setNextPlayerTurn(playerId, event.gameId);
        await emitCanPlay(nextPlayerId, event.gameId, publish);
    }
    return;
}
