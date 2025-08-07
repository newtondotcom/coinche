import { sendWS } from '@/shared/utils/ws';
import { genIdCuid } from '@coinche/shared';
import { useStateStore } from '@/stores/state';

export async function join() {
    const storeState = useStateStore();
    const gameId = storeState.gameId;
    // Just send join event via WebSocket
    sendWS({
        id: await genIdCuid(),
        type: 'join',
        playerId: storeState.getMyId,
        gameId: gameId,
        value: storeState.getMyId,
        timestamp: new Date().toISOString(),
    });
}

export async function leave() {
    const storeState = useStateStore();
    const gameId = storeState.gameId;
    // Just send leave event via WebSocket
    sendWS({
        type: 'leave',
        playerId: storeState.getMyId,
        gameId: gameId,
        value: storeState.getMyId,
        timestamp: new Date().toISOString(),
    });
}
