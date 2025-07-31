import { deformatTeam, type EventInsert } from '@coinche/shared';
import { toast } from 'vue-sonner';

export function translateEndRound(event: EventInsert) {
    console.log('end_trick', event);
    const teamWinning: string[] = deformatTeam(event.value as string);
    toast.message('Fin de la partie', {
        description: 'Le round est terminé : les gagnants sont ' + teamWinning.join(' et '),
    });
    return;
}
