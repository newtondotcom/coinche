import { sendWS } from '~/shared/utils/ws';
import { formatCarteToPlay } from '~/shared/utils/format';
import genIdCuid from '~/shared/utils/gen_id';
import type { ICard } from '@coinche/shared';

export default async function emitPlay(card: ICard) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    const gameId = storeAbout.gameId;
    sendWS({
        id: await genIdCuid(),
        type: 'play',
        playerId: storeAbout.myId,
        gameId: gameId,
        value: formatCarteToPlay(card, storeGame.trick_number, storeGame.current_trick.length),
        timestamp: new Date().toISOString(),
    });
}
