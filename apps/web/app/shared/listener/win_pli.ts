import { usePlayersStore } from "@/stores/players";
import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import { deformatTeam } from '@/shared/utils/format';
import { toast } from 'vue-sonner';
import type { EventInsert } from '@/shared/types';

export async function translateWinPli(event: EventInsert) {
    const storeGame = useGameStore();
    const teamWinning: string[] = deformatTeam(event.value as string);
    storeGame.setNewPli();
    const text = `${teamWinning.join(' et ')} remportent le pli`;
    toast.message('Fin du pli', {
        description: text,
    });
    return;
}
