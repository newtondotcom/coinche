import { sendWS } from '~/shared/utils/ws';
import { formatAnnonce } from '~/shared/utils/format';
import genIdCuid from '~/shared/utils/gen_id';
import type { IAnnonce } from '@coinche/shared';

export default async function emitAnnonce(annonce: IAnnonce) {
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;
    sendWS({
        id: await genIdCuid(),
        type: 'annonce',
        playerId: annonce.playerId,
        gameId: gameId,
        value: formatAnnonce(annonce),
        timestamp: new Date().toISOString(),
    });
    storeAbout.setTimeToAnnonce(true);
    storeAbout.setTurnToAnnonce(false);
}

