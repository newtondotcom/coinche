import { unformatPoints } from '@/lib/emitter/points';

export async function translatePoints(event: EventShared) {
    console.log('points', event);
    const storeGame = useGameStore();
    const [scoreTeam1, scoreTeam2] = unformatPoints(event.value as string);
    storeGame.addScoreToTeam1(scoreTeam1);
    storeGame.addScoreToTeam2(scoreTeam2);
    storeGame.addGlobalScoreToTeam1(scoreTeam1);
    storeGame.addGlobalScoreToTeam2(scoreTeam2);
    return;
}
