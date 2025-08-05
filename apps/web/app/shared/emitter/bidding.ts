import { sendWS } from '@/shared/utils/ws';
import { formatbidding, genIdCuid } from '@coinche/shared';
import type { Ibidding } from '@coinche/shared';
import { useStateStore } from '@/stores/state';
const storeState = useStateStore();

export default async function emitBid(bidding: Ibidding) {
    const gameId = storeState.gameId;
    sendWS({
        id: await genIdCuid(),
        type: 'bidding',
        playerId: bidding.playerId,
        gameId: gameId,
        value: formatbidding(bidding),
        timestamp: new Date().toISOString(),
    });
}

