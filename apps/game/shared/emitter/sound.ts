import { sendWS } from '~/shared/utils/ws';
import genIdCuid from '~/shared/utils/gen_id';

export async function emitSound(name: string): Promise<void> {
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;
    sendWS({
        id: await genIdCuid(),
        type: 'sound',
        playerId: storeAbout.myId,
        gameId: gameId,
        value: name,
        timestamp: new Date().toISOString(),
    });
}
