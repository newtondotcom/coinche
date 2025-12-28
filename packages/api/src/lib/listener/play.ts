import { emitCanPlay } from "../actions/can";
import { closeTrick } from "../actions/closeTrick";
import controller from "../game";
import logger from "../logger";
import { getNextPlayerTurn } from "../utils";
import type { EventInsert } from "@coinche-reborn/api";
import { deformatCarteToPlay } from "@coinche-reborn/api";
import addPlay from "../actions/addPlay";

export default async function translatePlay(event: EventInsert) {
  const gameId = event.gameId;
  const def = deformatCarteToPlay(event.value as string);
  const card = def.card;
  // const trick_number = def.trick_number;
  const playerId = event.playerId;
  addPlay(card, playerId, gameId);
  // check if end of trick
  if (controller.getInstance(event.gameId).getCurrentTrick().plays.length === 4) {
    logger.info("End of trick");
    await closeTrick(event.gameId);
  } else {
    const nextPlayerId = getNextPlayerTurn(playerId, event.gameId);
    await emitCanPlay(nextPlayerId, event.gameId);
  }
  return;
}
