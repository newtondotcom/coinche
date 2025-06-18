import { toast } from '@/lib/utils/listener';
import { deformatTeam } from '@coinche/shared';
import type { EventInsert } from '@coinche/shared';

export function translateEndRound(event: EventInsert) {
    console.log('end_round', event);
    const teamWinning: string[] = deformatTeam(event.value as string);
    toast({
        title: 'Fin de la partie',
        description: 'Le round est terminé : les gagnants sont ' + teamWinning.join(' et '),
    });
    return;
}
