import { usePlayersStore } from "@/stores/players";
import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import type { EventInsert } from '@/shared/types';

export async function translateCanPlay(event: EventInsert) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    if (event.value === storeAbout.myId) {
        console.log('can_play', event);
        storeAbout.setTurnToPlay(true);
    } else {
        console.log("not my time to play")
    }
    storeGame.setCurrentPlayerId(event.value as string);
}
export async function translateCanBid(event: EventInsert) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    if (event.value === storeAbout.myId) {
        console.log('can_bid', event);
        storeAbout.setTurnTobidding(true);
    }
    storeGame.setCurrentPlayerId(event.value as string);
}
