import { toast } from '@/lib/utils/listener';
import type { EventShared } from '@coinche/shared';

export async function translateStartRound(event: EventShared) {
    const playerId = event.value as string;
    const storeGame = useGameStore();
    storeGame.setNewRound();
    toast({
        title: `${playerId} commence le round`,
    });
    return;
}
