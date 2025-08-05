import { sendWS } from '@/shared/utils/ws';
import { genIdCuid } from '@coinche/shared';
import { useStateStore } from '@/stores/state';
const storeState = useStateStore();

export async function join() {
    const gameId = storeState.gameId;
    // Just send join event via WebSocket
    sendWS({
        id: await genIdCuid(),
        type: 'join',
        playerId: storeState.myId,
        gameId: gameId,
        value: storeState.myId,
        timestamp: new Date().toISOString(),
    });
}

export async function leave() {
    const gameId = storeState.gameId;
    // Just send leave event via WebSocket
    sendWS({
        type: 'leave',
        playerId: storeState.myId,
        gameId: gameId,
        value: storeState.myId,
        timestamp: new Date().toISOString(),
    });
}
