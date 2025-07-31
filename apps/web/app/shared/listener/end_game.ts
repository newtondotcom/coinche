import { deformatTeam, type EventInsert } from '@coinche/shared';
import { toast } from 'vue-sonner';

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
