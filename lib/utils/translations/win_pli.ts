import { deformatTeam, fetchLastPliEvents, sumPointsPli } from '~/lib/supabase/pli';

import { toast } from '../listener';

export async function translateWinPli(event: EventShared) {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const teamWinning: string[] = deformatTeam(event.value as string);
    const pastPlis: IPlay[] = await fetchLastPliEvents();
    const points: number = sumPointsPli(pastPlis);
    const teamWinningNumber = storePlayers.team1.find(
        (player) => player.id === teamWinning[0] || player.id === teamWinning[1],
    )
        ? 1
        : 2;
    const scoreTeam1CurrentPli = teamWinningNumber === 1 ? points : 0;
    const scoreTeam2CurrentPli = teamWinningNumber === 2 ? points : 0;
    storeGame.setTeam1Score(storeGame.team1_score + scoreTeam1CurrentPli);
    storeGame.setTeam2Score(storeGame.team2_score + scoreTeam2CurrentPli);
    storeGame.setNewPli();
    toast({
        title: 'Fin du pli',
        description: `Equipe 1: ${storeGame.team1_point_current_pli} points\nEquipe 2: ${storeGame.team2_point_current_pli} points`,
    });
    return;
}
