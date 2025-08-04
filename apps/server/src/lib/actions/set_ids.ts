import controller from "@/lib/game";
import logger from "@/lib/logger";


export function setPlayerIdToPlay(playerId: string,gameId: string) {
        const controllerInstance = controller.getInstance(gameId);
        controllerInstance.state.phases.timeToPlay = playerId;
        logger.info(`Player ${playerId} is set to play in game ${gameId}`);
        controllerInstance.sendState();
}

export function setPlayerIdToBid(playerId: string, gameId: string) {
        const controllerInstance = controller.getInstance(gameId);
        controllerInstance.state.phases.timeToBid = playerId;
        logger.info(`Player ${playerId} is set to bid in game ${gameId}`);
        controllerInstance.sendState();
}

export function setPlayerIdToDistrib(playerId: string, gameId: string) {
        const controllerInstance = controller.getInstance(gameId);
        controllerInstance.state.phases.timeDistrib = playerId;
        logger.info(`Player ${playerId} is set to distribute in game ${gameId}`);
        controllerInstance.sendState();
}