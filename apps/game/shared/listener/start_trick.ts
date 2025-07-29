import { setValueAccordingToAtout } from "~/shared/utils/deck";
import type { EventInsert } from "@coinche/shared";

export async function translateStartTrick(event: EventInsert) {
  const storeAbout = useAboutStore();
  const storePlayers = usePlayersStore();
  storePlayers.getPlayers().forEach((player) => {
    player.hands = setValueAccordingToAtout(player.hands);
  });
  return;
} 