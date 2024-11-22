import type { EventShared } from '@coinche/shared';

export async function translateCanPlay(event: EventShared) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    if (event.value === storeAbout.myId) {
        console.log('can_play', event);
    }
    storeGame.setCurrentPlayerId(event.value as string);
}
export async function translateCanAnnonce(event: EventShared) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    if (event.value === storeAbout.myId) {
        console.log('can_annonce', event);
    }
    storeGame.setCurrentPlayerId(event.value as string);
}
