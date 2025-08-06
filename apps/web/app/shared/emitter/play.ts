import { sendWS } from '@/shared/utils/ws';
import { formatCarteToPlay, genIdCuid } from '@coinche/shared';
import type { ICardSuite, ICardValue, ICard } from '@coinche/shared';
import { useStateStore } from '@/stores/state';


export async function emitCardPlay(card: ICard) {
    const storeState = useStateStore();
    sendWS({
        id: await genIdCuid(),
        type: 'play',
        playerId: storeState.getMyId,
        gameId: storeState.gameId,
        value: formatCarteToPlay(card, storeState.currentPli.number, storeState.currentPli.plays.length),
        timestamp: new Date().toISOString(),
    });
}

export async function cardPressed(suite: ICardSuite, value: ICardValue) {
    const storeState = useStateStore();
    const selectedCardIndex = storeState.hand.findIndex(
        (card) => card.suite === suite && card.value === value,
    );
    if (selectedCardIndex !== -1) {
        const [selectedCard] = storeState.hand.splice(selectedCardIndex, 1);
        if (selectedCard) {
            await emitCardPlay(selectedCard);
        } else {
            console.warn(`Selected card is undefined after splice.`);
        }
    } else {
        console.warn(`Card with suite ${suite} and value ${value} not found in hand.`);
    }
}
