import controller from "@/lib/game";
import logger from "@/lib/logger";

export default function removePlayer(playerId: string, gameId: string) {
    const controllerInstance = controller.getInstance(gameId);
    Object.assign(controllerInstance.state, {
        players: controllerInstance.state.players.filter(p => p.id !== playerId),
        team1: controllerInstance.state.team1.filter(id => id !== playerId),
        team2: controllerInstance.state.team2.filter(id => id !== playerId),
    });
    logger.info(`Player ${playerId} removed from the game`);
    controllerInstance.sendState();
}