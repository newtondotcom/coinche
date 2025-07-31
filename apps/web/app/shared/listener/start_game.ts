import { useGameStore } from "@/stores/game";
import { toast } from 'vue-sonner';
import type { EventInsert } from '@coinche/shared';

export async function translateStart(event: EventInsert) {
    const storeGame = useGameStore();
    storeGame.setNewRound();
    console.log("game start")
    toast.message(`${event.value} commence le jeu`);
    return;
}
