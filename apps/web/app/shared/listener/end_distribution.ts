import { useAboutStore } from "@/stores/about";
import type { EventInsert } from '@coinche/shared';

export async function translateEndDistribution(event: EventInsert) {
    console.log('end distribution', event);
    const storeAbout = useAboutStore();
    storeAbout.setTimeDistrib(false);
    storeAbout.setTimeTobidding(true);
}
