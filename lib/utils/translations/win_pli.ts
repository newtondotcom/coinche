import { deformatTeam, fetchLastPliEvents, sumPointsPli } from '~/lib/supabase/pli';

import { toast } from '../listener';

export async function translateWinPli(event: EventShared) {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const teamWinning: string[] = deformatTeam(event.value as string);
    const teamWinningPlayers = storePlayers.players.filter((player) =>
        teamWinning.includes(player.id),
    );
    storeGame.setNewPli();
    const text = `${teamWinningPlayers.map((player) => player.surname).join(' et ')} remportent le pli`;
    toast({
        title: 'Fin du pli',
        description: text,
    });
    return;
}
