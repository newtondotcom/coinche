import type { EventShared } from '@coinche/shared';

export async function translateCanPlay(event: EventShared) {
    const storeAbout = useAboutStore();
    if (event.value === storeAbout.myId) {
        console.log('can_play', event);
        storeAbout.setCanPlay(true);
    }
}
export async function translateCanAnnonce(event: EventShared) {
    const storeAbout = useAboutStore();
    if (event.value === storeAbout.myId) {
        console.log('can_annonce', event);
        storeAbout.setCanAnnonce(true);
    }
}
