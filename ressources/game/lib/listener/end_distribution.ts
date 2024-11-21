import type { EventShared } from '@coinche/shared';

export async function translateEndDistribution(event: EventShared) {
    console.log('end distribution', event);
    const storeAbout = useAboutStore();
    storeAbout.setTimeDistrib(false);
    storeAbout.setTimeToAnnonce(true);
}
