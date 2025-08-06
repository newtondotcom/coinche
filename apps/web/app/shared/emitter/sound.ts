import { sendWS } from '@/shared/utils/ws';
import { genIdCuid } from '@coinche/shared';
import { useStateStore } from '@/stores/state';

export async function emitSound(name: string) {
    const storeState = useStateStore();
    const gameId = storeState.gameId;
    sendWS({
        id: await genIdCuid(),
        type: 'sound',
        playerId: storeState.getMyId,
        gameId: gameId,
        value: name,
        timestamp: new Date().toISOString(),
    });
}
