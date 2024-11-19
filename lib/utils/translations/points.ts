import { unformatPoints } from '~/lib/supabase/points';

export async function translatePoints(event: EventShared) {
    console.log('points', event);
    const storeGame = useGameStore();
    const [scoreTeam1, scoreTeam2] = unformatPoints(event.value as string);
    console.log('score', scoreTeam1, scoreTeam2);
    storeGame.addScoreToTeam1(scoreTeam1);
    storeGame.addScoreToTeam2(scoreTeam2);
    console.log('score', storeGame.team1_score, storeGame.team2_score);
    return;
}
