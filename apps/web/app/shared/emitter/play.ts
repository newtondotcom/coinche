import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import { sendWS } from '@/shared/utils/ws';
import { formatCarteToPlay, genIdCuid } from '@coinche/shared';
import type { CardSuite, CardValue, ICard } from '@coinche/shared';

export async function emitCardPlay(card: ICard) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    sendWS({
        id: await genIdCuid(),
        type: 'play',
        playerId: storeAbout.myId,
        gameId: storeAbout.gameId,
        value: formatCarteToPlay(card, storeGame.pli_number, storeGame.currentPli.length),
        timestamp: new Date().toISOString(),
    });
}

export async function cardPressed(suite: CardSuite, value: CardValue) {
    const storeAbout = useAboutStore();
    const selectedCardIndex = storeAbout.hand.findIndex(
        (card) => card.suite === suite && card.value === value,
    );
    if (selectedCardIndex !== -1) {
        const [selectedCard] = storeAbout.hand.splice(selectedCardIndex, 1);
        await emitCardPlay(selectedCard);
    } else {
        console.warn(`Card with suite ${suite} and value ${value} not found in hand.`);
    }
}
