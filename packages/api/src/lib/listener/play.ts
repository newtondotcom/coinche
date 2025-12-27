import { emitCanPlay } from "../actions/can";
import { closePli } from "../actions/close_pli";
import controller from "../game";
import logger from "../logger";
import { getNextPlayerTurn } from "../utils";
import type { EventInsert } from "@coinche-reborn/api";
import { deformatCarteToPlay } from "@coinche-reborn/api";
import addPlay from "../actions/add_play";

export default async function translatePlay(event: EventInsert) {
  const gameId = event.gameId;
  const def = deformatCarteToPlay(event.value as string);
  const card = def.card;
  // const pli_number = def.pli_number;
  const playerId = event.playerId;
  addPlay(card, playerId, gameId);
  // check if end of pli
  if (controller.getInstance(event.gameId).getCurrentPli().plays.length === 4) {
    logger.info("End of pli");
    await closePli(event.gameId);
  } else {
    const nextPlayerId = getNextPlayerTurn(playerId, event.gameId);
    await emitCanPlay(nextPlayerId, event.gameId);
  }
  return;
}
