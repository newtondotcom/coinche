import { setValueAccordingToAtout } from '@/lib/utils/deck';
import type { EventInsert } from '@coinche/shared';

export async function translateStartPli(event: EventInsert) {
    const storeAbout = useAboutStore();
    const storePlayers = usePlayersStore();
    console.log('start pli', event);
    storePlayers.players.forEach((player) => {
        player.hands = setValueAccordingToAtout(player.hands);
    });
    storeAbout.setTimeToAnnonce(false);
    return;
}
