import type { EventInsert, IAnnonce } from '@coinche/shared';

import { startPli } from '@/emitter/start_pli';
import controller from '@/game';
import logger from '@/logger';
import { setNextPlayerTurn } from '@/utils';

export async function translateCoinche(event: EventInsert) {
    controller.getInstance(event.gameId).getLastRound().coinched = true;
    setNextPlayerTurn(event.playerId, event.gameId);
    logger.info('Coinche');
    await startPli(event.gameId);
    return;
}

export async function translateSurcoinche(event: EventInsert) {
    controller.getInstance(event.gameId).getLastRound().surcoinched = true;
    setNextPlayerTurn(event.playerId, event.gameId);
    logger.info('Surcoinche');
    await startPli(event.gameId);
    return;
}
