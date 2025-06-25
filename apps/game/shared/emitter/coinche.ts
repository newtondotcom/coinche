import { sendWS } from '@/lib/utils/ws';
import genIdCuid from '~/shared/utils/gen_id';

export async function emitCoinche() {
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;
    sendWS({
        id: await genIdCuid(),
        type: 'coinche',
        playerId: storeAbout.myId,
        gameId: gameId,
        value: '',
        timestamp: new Date().toISOString(),
    });
}

export async function emitSurcoinche() {
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;
    sendWS({
        id: await genIdCuid(),
        type: 'surcoinche',
        playerId: storeAbout.myId,
        gameId: gameId,
        value: '',
        timestamp: new Date().toISOString(),
    });
}