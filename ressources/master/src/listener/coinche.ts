import type { EventShared, IAnnonce } from "@coinche/shared";
import Master from "../game";
import { setNextPlayerTurn } from "../utils";

export function translateCoinche(event: EventShared) {
  Master.getInstance(event.gameId).getLastRound().coinched = true;
  setNextPlayerTurn(event.playerId);
  return;
}

export function translateSurcoinche(event: EventShared) {
  Master.getInstance(event.gameId).getLastRound().surcoinched = true;
  setNextPlayerTurn(event.playerId);
  return;
}
