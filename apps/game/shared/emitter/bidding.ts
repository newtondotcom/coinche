import { sendWS } from '~/shared/utils/ws';
import { formatbidding } from '~/shared/utils/format';
import genIdCuid from '~/shared/utils/gen_id';
import type { Ibidding } from '@coinche/shared';

export default async function emitbidding(bidding: Ibidding) {
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;
    sendWS({
        id: await genIdCuid(),
        type: 'bidding',
        playerId: bidding.playerId,
        gameId: gameId,
        value: formatbidding(bidding),
        timestamp: new Date().toISOString(),
    });
    storeAbout.setTimeTobidding(true);
    storeAbout.setTurnTobidding(false);
}

