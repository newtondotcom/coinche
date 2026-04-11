import { sendWS } from "@/shared/utils/ws";
import { formatCarteToPlay} from "@coinche-reborn/api";
import type { ICardSuite, ICardValue, ICard } from "@coinche-reborn/api";
import { useStateStore } from "@/stores/state";

export async function emitCardPlay(card: ICard) {
  const storeState = useStateStore();

  // Check if trump is defined
  if (!storeState.trump || storeState.trump === "NA") {
    console.warn(`Trump not defined when playing card ${card.suite}-${card.value}`);
  }

  // Log the calculated valueNum for debugging
  console.log(`Playing card ${card.suite}-${card.value} with valueNum=${card.valueNum}`);

  sendWS({
    id: Bun.randomUUIDv7(),
    type: "play",
    playerId: storeState.getMyId,
    gameId: storeState.gameId,
    value: formatCarteToPlay(
      card,
      storeState.currentTrick?.number || 0,
      storeState.currentTrick?.plays.length || 0,
    ),
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
