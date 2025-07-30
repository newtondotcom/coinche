import { usePlayersStore } from "@/stores/players";
import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import { deformatTeam } from '@/shared/utils/format';
import { toast } from 'vue-sonner';
import type { EventInsert } from '@/shared/types';

export function translateEndGame(event: EventInsert) {
    console.log('end_game', event);
    const teamWinning: string[] = deformatTeam(event.value as string);
    toast.message('Fin de la partie', {
        description: 'La partie est terminée : les gagnants sont ' + teamWinning.join(' et '),
    });

    /*
    setTimeout(()=>{
      navigateTo('/classement');
    },1000);
    */
    return;
}
