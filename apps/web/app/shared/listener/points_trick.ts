import { usePlayersStore } from "@/stores/players";
import { useGameStore } from "@/stores/game";
import { useAboutStore } from "@/stores/about";
import { unformatPoints } from '@/shared/utils/format';
import type { EventInsert } from '@/shared/types';

export async function translatePointsRound(event: EventInsert) {
    console.log('points_trick', event);
    const storeGame = useGameStore();
    const [scoreTeam1, scoreTeam2] = unformatPoints(event.value as string);
    storeGame.addGlobalScoreToTeam1(scoreTeam1);
    storeGame.addGlobalScoreToTeam2(scoreTeam2);
    return;
}
