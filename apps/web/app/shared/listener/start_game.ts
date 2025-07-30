import { usePlayersStore } from "@/stores/players";
import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import { toast } from 'vue-sonner';
import type { EventInsert } from '@/shared/types';

export async function translateStart(event: EventInsert) {
    const storeGame = useGameStore();
    storeGame.setNewRound();
    console.log("game start")
    toast.message(`${event.value} commence le jeu`);
    return;
}
