import logger from "../logger";
import { maybeScheduleBotTurn } from "../botScheduler";
import { setPlayerIdToBid, setPlayerIdToPlay } from "./setIds";

export async function emitCanPlay(playerId: string, gameId: string) {
  // Update the current player
  setPlayerIdToPlay(playerId, gameId);
  logger.info(`${playerId} can play`);
  maybeScheduleBotTurn(gameId);
}

export async function emitCanBid(playerId: string, gameId: string) {
  setPlayerIdToBid(playerId, gameId);
  logger.info(`${playerId} can bidding`);
  maybeScheduleBotTurn(gameId);
}
