import controller from "../game";
import logger from "../logger";
import { emitCanPlay } from "./can";

export async function startTrick(gameId: string) {
  // launch trick
  const playerIdStarting = controller.getInstance(gameId).getCurrentTrick().playerStartingId;
  const event = {
    id: Bun.randomUUIDv7(),
    type: "start_trick",
    playerId: "controller",
    gameId: gameId,
    value: playerIdStarting,
    timestamp: new Date().toISOString(),
  };
  ////publish(event)
  logger.info(`Starting trick for ${playerIdStarting}`);
  await emitCanPlay(playerIdStarting, gameId);
}
