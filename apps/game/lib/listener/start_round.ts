import { toast } from 'vue-sonner';
import type { EventInsert } from '@coinche/shared';

export async function translateStartRound(event: EventInsert) {
    const playerId = event.value as string;
    const storeGame = useGameStore();
    storeGame.setNewRound();
    toast.message(`${playerId} commence le round`);
    return;
}
