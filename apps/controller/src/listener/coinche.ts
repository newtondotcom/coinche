import { startPli } from '@/emitter/start_pli';
import controller from '@/game';
import logger from '@/logger';
import { setNextPlayerTurn } from '@/utils';
import type { EventInsert} from '@coinche/shared';

export async function translateCoinche(event: EventInsert, publish: (room: string, payload: any) => void) {
    controller.getInstance(event.gameId).getLastRound().coinched = true;
    setNextPlayerTurn(event.playerId, event.gameId);
    logger.info('Coinche');
    await startPli(event.gameId, publish);
    return;
}

export async function translateSurcoinche(event: EventInsert, publish: (room: string, payload: any) => void) {
    controller.getInstance(event.gameId).getLastRound().surcoinched = true;
    setNextPlayerTurn(event.playerId, event.gameId);
    logger.info('Surcoinche');
    await startPli(event.gameId, publish);
    return;
}
