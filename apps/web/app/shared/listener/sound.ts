import { usePlayersStore } from "@/stores/players";
import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import { Howl } from 'howler';
import type { EventInsert } from '@/shared/types';

export async function translateSound(event: EventInsert) {
    const soundName: string = event.value as string;
    triggerSound(soundName);
}

export function triggerSound(name: string): void {
    // Check if sound is muted before playing
    const { soundMuted } = useSoundSettings();
    if (soundMuted.value) {
        return;
    }
    
    const sound = new Howl({
        src: `sounds/${name.toLowerCase()}.mp3`,
    });
    sound.play();
}
