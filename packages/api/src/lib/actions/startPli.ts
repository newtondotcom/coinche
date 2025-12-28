import controller from "../game";
import logger from "../logger";
import { genIdCuid } from "@coinche-reborn/api";
import { emitCanPlay } from "./can";

export async function startPli(gameId: string) {
  // launch pli
  const playerIdStarting = controller.getInstance(gameId).getCurrentPli().playerStartingId;
  const event = {
    id: await genIdCuid(),
    type: "start_pli",
    playerId: "controller",
    gameId: gameId,
    value: playerIdStarting,
    timestamp: new Date().toISOString(),
  };
  ////publish(event)
  logger.info(`Starting pli for ${playerIdStarting}`);
  await emitCanPlay(playerIdStarting, gameId);
}
