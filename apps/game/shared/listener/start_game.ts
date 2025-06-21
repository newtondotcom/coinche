import { toast } from 'vue-sonner';
import type { EventInsert } from '@coinche/shared';

export async function translateStart(event: EventInsert) {
    const storeGame = useGameStore();
    storeGame.setNewRound();
    toast.message(`${event.value} commence le jeu`);
    return;
}
