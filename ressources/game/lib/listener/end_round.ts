import { toast } from '@/lib/utils/listener';
import { deformatTeam } from '@coinche/shared';
import type { EventInsert } from '@coinche/shared';

export function translateEndRound(event: EventInsert) {
    const storePlayers = usePlayersStore();
    console.log('end_round', event);
    const teamWinning: string[] = deformatTeam(event.value as string);
    const teamWinningPlayers = storePlayers.players.filter((player) =>
        teamWinning.includes(player.id),
    );
    toast({
        title: 'Fin de la partie',
        description:
            'Le round est terminé : les gagnants sont ' +
            teamWinningPlayers.map((player) => player.surname).join(' et '),
    });
    return;
}
