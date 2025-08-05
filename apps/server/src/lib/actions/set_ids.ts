import controller from "@/lib/game";
import logger from "@/lib/logger";


export function setPlayerIdToPlay(playerId: string,gameId: string) {
        const controllerInstance = controller.getInstance(gameId);
        controllerInstance.state.phases.timeToPlay = playerId;
        controllerInstance.state.phases.timeToBid = "";
        controllerInstance.state.phases.timeDistrib = "";
        logger.info(`Player ${playerId} is set to play in game ${gameId}`);
        controllerInstance.sendState();
}

export function setPlayerIdToBid(playerId: string, gameId: string) {
        const controllerInstance = controller.getInstance(gameId);
        controllerInstance.state.phases.timeToBid = playerId;
        controllerInstance.state.phases.timeToPlay = "";
        controllerInstance.state.phases.timeDistrib = "";
        logger.info(`Player ${playerId} is set to bid in game ${gameId}`);
        controllerInstance.sendState();
}

export function setPlayerIdToDistrib(playerId: string, gameId: string) {
        const controllerInstance = controller.getInstance(gameId);
        controllerInstance.state.phases.timeDistrib = playerId;
        controllerInstance.state.phases.timeToBid = "";
        controllerInstance.state.phases.timeToPlay = "";
        logger.info(`Player ${playerId} is set to distribute in game ${gameId}`);
        controllerInstance.sendState();
}