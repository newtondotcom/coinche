import type { ICard } from "@coinche/shared";
import controller from "@/lib/game";
import logger from "@/lib/logger";

export default function  addPlay(card: ICard, playerId: string, gameId: string): void {
    const controllerInstance = controller.getInstance(gameId);
    const currentRound = controllerInstance.getCurrentRound();
    const currentPli = currentRound.plis[currentRound.plis.length - 1]; 
    currentPli.plays.push({ card, playerId });
    controllerInstance.state.deck.push(card);
    const player = controllerInstance.state.players.find((player) => player.id === playerId)!;
    const cardIndex = player.hands.findIndex((hand) => hand.suite === card.suite && hand.value === card.value);
    if (cardIndex !== -1) {
        player.hands.splice(cardIndex, 1);
    } else {
        logger.error(`Player ${playerId} does not have the card ${card.suite} of ${card.value}`);
    }
    logger.info(`Player ${playerId} played ${card.suite} of ${card.value}`);
    controllerInstance.sendState();
}