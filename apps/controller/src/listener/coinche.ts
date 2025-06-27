import { startPli } from '@/emitter/start_pli';
import controller from '@/game';
import logger from '@/logger';
import { setNextPlayerTurn } from '@/utils';
import type { EventInsert} from '@coinche/shared';
import genIdCuid from '../../../game/shared/utils/gen_id';

export async function translateCoinche(event: EventInsert, publish: (payload: any) => void) {
    controller.getInstance(event.gameId).getLastRound().coinched = true;
    setNextPlayerTurn(event.playerId, event.gameId);
    logger.info('Coinche');
    const event2 = {
        id: await genIdCuid(),
        type: "coinche",
        playerId: "controller",
        gameId: event.gameId,
        value: "",
        timestamp : new Date().toISOString(),
      }
    publish(event2)
    await startPli(event.gameId, publish);
    return;
}

export async function translateSurcoinche(event: EventInsert, publish: (payload: any) => void) {
    controller.getInstance(event.gameId).getLastRound().surcoinched = true;
    setNextPlayerTurn(event.playerId, event.gameId);
    logger.info('Surcoinche');
    const event2 = {
        id: await genIdCuid(),
        type: "surcoinche",
        playerId: "controller",
        gameId: event.gameId,
        value: "",
        timestamp : new Date().toISOString(),
      }
    publish(event2)
    await startPli(event.gameId, publish);
    return;
}
