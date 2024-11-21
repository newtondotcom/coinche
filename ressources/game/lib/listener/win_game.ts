import { unformatPoints } from '@/lib/emitter/points';
import { supabase, toast } from '@/lib/utils/listener';
import type { EventShared } from '@coinche/shared';

export async function translateWinGame(event: EventShared) {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    const storePlayers = usePlayersStore();
    const pointsMultiplier = storeGame.coinched ? 2 : storeGame.surcoinched ? 4 : 1;
    const { data, error } = await supabase
        .from('Events')
        .select('*')
        .eq('gameId', storeAbout.gameId)
        .eq('type', 'score_pli');
    if (error) {
        console.error('Game has not started:', error);
        return;
    }
    const scoreTeam1 = data.filter((event) => unformatPoints(event.value)[0] === 1);
    const pointsTeam1 = scoreTeam1.map((event) => unformatPoints(event.value)[1]);
    const sum1 = pointsTeam1.reduce((a, b) => a + b, 0);
    const scoreTeam2 = data.filter((event) => unformatPoints(event.value)[0] === 2);
    const pointsTeam2 = scoreTeam2.map((event) => unformatPoints(event.value)[1]);
    const sum2 = pointsTeam2.reduce((a, b) => a + b, 0);
    const annonceMade = storeGame.last_annonce;
    const playerId = annonceMade.playerId;
    const teamPlayerAnnounce = storePlayers.team1.find((player) => player.id === playerId) ? 1 : 2;
    if (annonceMade.annonce == 'capot') {
    }
    if (annonceMade.annonce == 'generale') {
    }
    if (teamPlayerAnnounce === 1) {
        if (sum1 > annonceMade.annonce) {
            // annonce validée
            // =+ points * pointsMultiplier
        } else {
            // annonce non validée
        }
    } else {
    }
    toast({
        title: 'Fin de partie',
        description: `Equipe 1: ${sum1} points marqués\nEquipe 2: ${sum2} points marqués`,
    });
    return;
}
