import logger from "@/lib/logger";
import { setPlayerIdToBid, setPlayerIdToPlay } from "./set_ids";


export async function emitCanPlay(playerId: string, gameId: string) {    
  // Update the current player 
  setPlayerIdToPlay(playerId, gameId);
  logger.info(`${playerId} can play`);
}


export async function emitCanBid(playerId: string, gameId: string) {
  setPlayerIdToBid(playerId, gameId);
  logger.info(`${playerId} can bidding`);
}
