import { unformatPoints } from '@coinche/shared';
import type { EventShared } from '@coinche/shared';

export async function translatePoints(event: EventShared) {
    console.log('points', event);
    const storeGame = useGameStore();
    const [scoreTeam1, scoreTeam2] = unformatPoints(event.value as string);
    storeGame.addScoreToTeam1(scoreTeam1);
    storeGame.addScoreToTeam2(scoreTeam2);
    return;
}
