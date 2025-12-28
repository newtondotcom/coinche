import controller from "../game";
import logger from "../logger";

export default async function addPli(playerStartingId: string, gameId: string) {
  const controllerInstance = controller.getInstance(gameId);
  const currentRound = controllerInstance.getCurrentRound();
  const pliInit = {
    number: currentRound.plis.length + 1,
    plays: [],
    playerStartingId: playerStartingId,
    team1Score: 0,
    team2Score: 0,
  };
  controllerInstance.state.currentRound.plis.push(pliInit);
  logger.info("New pli created");
  controllerInstance.sendState();
}
