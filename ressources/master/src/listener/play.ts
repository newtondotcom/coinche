import { deformatCarteToPlay, type EventShared } from "@coinche/shared";
import Master from "../game";
import { setNextPlayerTurn } from "../utils";
import { closePli } from "../emitter/close_pli";
import logger from "../logger";
import { emitCanPlay } from "../emitter/can";

export default async function translatePlay(event: EventShared) {
  const def = deformatCarteToPlay(event.value as string);
  const card = def.card;
  const pli_number = def.pli_number;
  const playerId = event.playerId;
  Master.getInstance(event.gameId).addPlay(card, playerId);
  const nextPlayerId = setNextPlayerTurn(playerId, event.gameId);
  await emitCanPlay(playerId, nextPlayerId);
  // check if end of pli
  if (Master.getInstance(event.gameId).getLastPli().plays.length === 4) {
    logger.info("End of pli");
    await closePli(event.gameId);
  }
  return;
}
