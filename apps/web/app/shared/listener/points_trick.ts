import { useGameStore } from "@/stores/game";
import { unformatPoints, type EventInsert } from '@coinche/shared';

export async function translatePointsRound(event: EventInsert) {
    console.log('points_trick', event);
    const storeGame = useGameStore();
    const [scoreTeam1, scoreTeam2] = unformatPoints(event.value as string);
    storeGame.addGlobalScoreToTeam1(scoreTeam1);
    storeGame.addGlobalScoreToTeam2(scoreTeam2);
    return;
}
