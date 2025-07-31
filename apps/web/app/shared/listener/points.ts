import { useGameStore } from "@/stores/game";
import { unformatPoints, type EventInsert } from '@coinche/shared';

export async function translatePoints(event: EventInsert) {
    console.log('points', event);
    const storeGame = useGameStore();
    const [scoreTeam1, scoreTeam2] = unformatPoints(event.value as string);
    storeGame.addScoreToTeam1(scoreTeam1);
    storeGame.addScoreToTeam2(scoreTeam2);
    return;
}
