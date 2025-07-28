import { Howl } from 'howler';
import type { EventInsert } from '@coinche/shared';

export async function translateSound(event: EventInsert) {
    const soundName: string = event.value as string;
    triggerSound(soundName);
}

export function triggerSound(name: string): void {
    // Check if sound is muted before playing
    const storeAbout = useAboutStore();
    if (storeAbout.soundMuted) {
        return;
    }
    
    const sound = new Howl({
        src: `sounds/${name.toLowerCase()}.mp3`,
    });
    sound.play();
}
