import { toast } from '@/lib/utils/listener';
import type { EventShared } from '@coinche/shared';

export async function translateStart(event: EventShared) {
    const playerId = event.value as string;
    startGame(playerId);
    return;
}

export async function startGame(playerId: string) {
    const storeGame = useGameStore();
    storeGame.setStatus('active');
    storeGame.setNewGame();
    toast({
        title: 'Game has started',
    });
}
