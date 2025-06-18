import { deformatTeam } from '@coinche/shared';
import { toast } from 'vue-sonner';
import type { EventInsert } from '@coinche/shared';

export function translateEndRound(event: EventInsert) {
    console.log('end_round', event);
    const teamWinning: string[] = deformatTeam(event.value as string);
    toast.message('Fin de la partie', {
        description: 'Le round est terminé : les gagnants sont ' + teamWinning.join(' et '),
    });
    return;
}
