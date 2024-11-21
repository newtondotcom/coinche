import { deformatCarteToPlay, type EventShared } from "@coinche/shared";
import Master from "../game";
import { setNextPlayerTurn } from "../utils";
import { closePli } from "../emitter/close_pli";

export default async function translatePlay(event: EventShared) {
  const def = deformatCarteToPlay(event.value as string);
  const card = def.card;
  const pli_number = def.pli_number;
  const playerId = event.playerId;
  Master.getInstance(event.gameId).addPlay(card, playerId);
  setNextPlayerTurn(playerId);

  // check if end of pli
  if (Master.getInstance(event.gameId).getLastRound().pli.length === 4) {
    await closePli(event.gameId);
  }
  return;
}
