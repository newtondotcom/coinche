import { usePlayersStore } from "@/stores/players";
import { useAboutStore } from "@/stores/about";
import { setValueAccordingToAtout } from "@/shared/utils/deck";
import type { EventInsert } from "@coinche/shared";

export async function translateStartPli(event: EventInsert) {
  const storeAbout = useAboutStore();
  const storePlayers = usePlayersStore();
  storePlayers.players.forEach((player) => {
    player.hands = setValueAccordingToAtout(player.hands);
  });
  storeAbout.setTimeTobidding(false);
  return;
}
