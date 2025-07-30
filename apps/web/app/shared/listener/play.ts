import { usePlayersStore } from "@/stores/players";
import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import { assertPliNumber } from "@/shared/utils/miscs";
import { deformatCarteToPlay } from '@/shared/utils/format';
import type { EventInsert } from "@/shared/types";

export default function translatePlay(event: EventInsert) {
  const storeGame = useGameStore();
  const def = deformatCarteToPlay(event.value as string);
  const card = def.card;
  const pli_number = def.pli_number;
  assertPliNumber(pli_number, storeGame.pli_number);
  const player_id = event.playerId;
  storeGame.addCardToPliAndRemove(card, player_id);
  return;
}
