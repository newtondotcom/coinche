import type { EventInsert } from "@coinche-reborn/api";

let audioContext: AudioContext | undefined;
const soundBuffers = new Map<string, Promise<AudioBuffer>>();

function getAudioContext(): AudioContext {
  audioContext ??= new AudioContext();
  return audioContext;
}

function loadSound(context: AudioContext, url: string): Promise<AudioBuffer> {
  const cachedBuffer = soundBuffers.get(url);
  if (cachedBuffer) {
    return cachedBuffer;
  }

  const buffer = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load sound: ${response.status} ${response.statusText}`);
      }
      return response.arrayBuffer();
    })
    .then((data) => context.decodeAudioData(data))
    .catch((error) => {
      soundBuffers.delete(url);
      throw error;
    });

  soundBuffers.set(url, buffer);
  return buffer;
}

async function playSound(name: string): Promise<void> {
  const context = getAudioContext();
  if (context.state === "suspended") {
    await context.resume();
  }

  const url = `/sounds/${name.toLowerCase()}.mp3`;
  const source = context.createBufferSource();
  source.buffer = await loadSound(context, url);
  source.connect(context.destination);
  source.start();
}

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

  void playSound(name).catch((error) => {
    console.warn(`Could not play sound "${name}":`, error);
  });
}
