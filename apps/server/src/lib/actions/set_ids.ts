import controller from "@/lib/game";
import logger from "@/lib/logger";


export function setPlayerIdToPlay(playerId: string,gameId: string) {
    const controllerInstance = controller.getInstance(gameId);
    Object.assign(controllerInstance.state.phases, {
        timeToPlay: playerId,
        timeToBid: "",
        timeDistrib: ""
    });
    logger.info(`Player ${playerId} is set to play in game ${gameId}`);
    controllerInstance.sendState();
}

export function setPlayerIdToBid(playerId: string, gameId: string) {
    const controllerInstance = controller.getInstance(gameId);
    Object.assign(controllerInstance.state.phases, {
        timeToBid: playerId,
        timeToPlay: "",
        timeDistrib: ""
    });
    logger.info(`Player ${playerId} is set to bid in game ${gameId}`);
    controllerInstance.sendState();
}

export function setPlayerIdToDistrib(playerId: string, gameId: string) {
    const controllerInstance = controller.getInstance(gameId);
    Object.assign(controllerInstance.state.phases, {
        timeDistrib: playerId,
        timeToBid: "",
        timeToPlay: ""
    });
    logger.info(`Player ${playerId} is set to distribute in game ${gameId}`);
    controllerInstance.sendState();
}