import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import { sendWS } from '@/shared/utils/ws';
import { formatbidding } from '@/shared/utils/format';
import genIdCuid from '@/shared/utils/gen_id';
import type { Ibidding } from '@/shared/types';

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

