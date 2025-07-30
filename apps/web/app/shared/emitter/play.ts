import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import { sendWS } from '@/shared/utils/ws';
import { formatCarteToPlay } from '@/shared/utils/format';
import genIdCuid from '@/shared/utils/gen_id';
import type { CardSuite, CardValue, ICard } from '@/shared/types';

export async function emitCardPlay(card: ICard) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    sendWS({
        id: await genIdCuid(),
        type: 'play',
        playerId: storeAbout.myId,
        gameId: storeAbout.gameId,
        value: formatCarteToPlay(card, storeGame.pli_number, storeGame.current_pli.length),
        timestamp: new Date().toISOString(),
    });
    storeAbout.setTurnToPlay(false);
}

export async function cardPressed(suite: CardSuite, value: CardValue) {
    const storeAbout = useAboutStore();
    const selectedCardIndex = storeAbout.hand.findIndex(
        (card) => card.suite === suite && card.value === value,
    );
    if (selectedCardIndex !== -1) {
        const [selectedCard] = storeAbout.hand.splice(selectedCardIndex, 1);
        await emitCardPlay(selectedCard);
    }
}
