import { deformatTeam } from '~/lib/supabase/pli';

import { toast } from '../listener';

export function translateEnd(event: EventShared) {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    storeGame.setStatus('complete');
    console.log('end_game', event);
    const teamWinning: string[] = deformatTeam(event.value as string);
    const teamWinningPlayers = storePlayers.players.filter((player) =>
        teamWinning.includes(player.id),
    );
    toast({
        title: 'Fin de la partie',
        description:
            'La partie est terminée : les gagnants sont ' +
            teamWinningPlayers.map((player) => player.surname).join(' et '),
    });
    return;
}
