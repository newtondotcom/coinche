import { usePlayersStore } from "@/stores/players";
import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import { deformatTeam } from '@/shared/utils/format';
import { toast } from 'vue-sonner';
import type { EventInsert } from '@/shared/types';

export function translateEndRound(event: EventInsert) {
    console.log('end_trick', event);
    const teamWinning: string[] = deformatTeam(event.value as string);
    toast.message('Fin de la partie', {
        description: 'Le round est terminé : les gagnants sont ' + teamWinning.join(' et '),
    });
    return;
}
