import { unformatPoints } from '~/shared/utils/format';
import type { EventInsert } from '@coinche/shared';

export async function translatePointsRound(event: EventInsert) {
    console.log('points_round', event);
    const storeGame = useGameStore();
    const [scoreTeam1, scoreTeam2] = unformatPoints(event.value as string);
    storeGame.addGlobalScoreToTeam1(scoreTeam1);
    storeGame.addGlobalScoreToTeam2(scoreTeam2);
    return;
}
