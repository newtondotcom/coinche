import type { IPlayer } from "@coinche/shared";
import controller from "@/lib/game";
import logger from "@/lib/logger";

export default function addPlayer(player: IPlayer, gameId: string) {
    const controllerInstance = controller.getInstance(gameId);
    if (controllerInstance.state.players.length >= 4) {
        throw new Error('Cannot add more than 4 players to the game');
    }
    controllerInstance.state.players.push(player);
    if (controllerInstance.state.team1.length < 2) {
        controllerInstance.state.team1.push(player.id);
    } else {
        controllerInstance.state.team2.push(player.id);
    }
    logger.info(`Player ${player.id} added to the game`);
    controllerInstance.sendState();
}