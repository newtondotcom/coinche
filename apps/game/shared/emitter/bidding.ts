import { sendWS } from '~/shared/utils/ws';
import { formatBid } from '~/shared/utils/format';
import genIdCuid from '~/shared/utils/gen_id';
import type { IBid } from '@coinche/shared';

export default async function emitBid(bid: IBid) {
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;
    sendWS({
        id: await genIdCuid(),
        type: 'bid',
        playerId: bid.playerId,
        gameId: gameId,
        value: formatBid(bid),
        timestamp: new Date().toISOString(),
    });
}

