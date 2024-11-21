import type { EventShared, IAnnonce } from "@coinche/shared";
import Master from "../game";
import { setNextPlayerTurn } from "../utils";
import { startPli } from "../emitter/start_pli";
import logger from "../logger";

export async function translateCoinche(event: EventShared) {
  Master.getInstance(event.gameId).getLastRound().coinched = true;
  setNextPlayerTurn(event.playerId, event.gameId);
  logger.info("Coinche");
  await startPli(event.gameId);
  return;
}

export async function translateSurcoinche(event: EventShared) {
  Master.getInstance(event.gameId).getLastRound().surcoinched = true;
  setNextPlayerTurn(event.playerId, event.gameId);
  logger.info("Surcoinche");
  await startPli(event.gameId);
  return;
}
