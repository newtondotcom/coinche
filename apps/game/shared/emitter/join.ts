import { sendWS } from '@/lib/utils/ws';
import genIdCuid from '~/shared/utils/gen_id';
import type { IPlayer, PlayerPosition } from '@coinche/shared';

export async function join() {
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;
    // Just send join event via WebSocket
    sendWS({
        id: await genIdCuid(),
        type: 'join',
        playerId: storeAbout.myId,
        gameId: gameId,
        value: storeAbout.myId,
        timestamp: new Date().toISOString(),
    });
}

export async function leave() {
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;
    // Just send leave event via WebSocket
    sendWS({
        type: 'leave',
        playerId: storeAbout.myId,
        gameId: gameId,
        value: storeAbout.myId,
        timestamp: new Date().toISOString(),
    });
}
