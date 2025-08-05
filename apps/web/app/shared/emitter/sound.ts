import { sendWS } from '@/shared/utils/ws';
import { genIdCuid } from '@coinche/shared';
import { useStateStore } from '@/stores/state';
const storeState = useStateStore();

export async function emitSound(name: string) {
    const gameId = storeState.gameId;
    sendWS({
        id: await genIdCuid(),
        type: 'sound',
        playerId: storeState.myId,
        gameId: gameId,
        value: name,
        timestamp: new Date().toISOString(),
    });
}
