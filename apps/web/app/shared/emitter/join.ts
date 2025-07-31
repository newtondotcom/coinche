import { useAboutStore } from "@/stores/about";
import { sendWS } from '@/shared/utils/ws';
import { genIdCuid } from '@coinche/shared';

export async function join() {
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
