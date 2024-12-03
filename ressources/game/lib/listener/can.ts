import type { EventInsert } from '@coinche/shared';

export async function translateCanPlay(event: EventInsert) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    if (event.value === storeAbout.myId) {
        console.log('can_play', event);
        storeAbout.setTurnToPlay(true);
    }
    storeGame.setCurrentPlayerId(event.value as string);
}
export async function translateCanAnnonce(event: EventInsert) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    if (event.value === storeAbout.myId) {
        console.log('can_annonce', event);
        storeAbout.setTurnToAnnonce(true);
    }
    storeGame.setCurrentPlayerId(event.value as string);
}
