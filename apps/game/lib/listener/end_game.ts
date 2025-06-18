import { deformatTeam } from '@coinche/shared';
import type { EventInsert } from '@coinche/shared';

export function translateEndGame(event: EventInsert) {
    console.log('end_game', event);
    const teamWinning: string[] = deformatTeam(event.value as string);
    toast({
        title: 'Fin de la partie',
        description: 'La partie est terminée : les gagnants sont ' + teamWinning.join(' et '),
    });

    /*
    setTimeout(()=>{
      navigateTo('/classement');
    },1000);
    */
    return;
}
