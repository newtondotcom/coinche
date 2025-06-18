import type { EventInsert } from '@coinche/shared';

export async function translateStartDistribution(event: EventInsert) {
    console.log('start distribution', event);
    const storeAbout = useAboutStore();
    storeAbout.setTimeDistrib(true);
}
