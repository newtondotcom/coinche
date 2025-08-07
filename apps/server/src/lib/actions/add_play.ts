import type { ICard } from "@coinche/shared";
import controller from "@/lib/game";
import logger from "@/lib/logger";

export default function  addPlay(card: ICard, playerId: string, gameId: string): void {
    const controllerInstance = controller.getInstance(gameId);
    const currentRound = controllerInstance.getCurrentRound();
    const currentPli = currentRound.plis[currentRound.plis.length - 1]; 
    currentPli.plays.push({ card, playerId });
    controllerInstance.state.deck.push(card);
    controllerInstance.state.players.find((player) => player.id === playerId)!.hands.splice(controllerInstance.state.players.find((player) => player.id === playerId)!.hands.indexOf(card), 1);
    logger.info(`Player ${playerId} played ${card.suite} of ${card.value}`);
    controllerInstance.sendState();
}