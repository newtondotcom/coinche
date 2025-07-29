import { deformatCarteToDistribute } from '@/shared/utils/format';
import type { EventInsert } from '@coinche/shared';

export default async function translateDistribution(event: EventInsert) {
    const storeGame = useGameStore();
    const storePlayer = usePlayersStore();
    const { trick_number, card } = deformatCarteToDistribute(event.value as string);
    //assertTrickNumber(trick_number, storeGame.trick_number);
    storePlayer.setHands([...storePlayer.getPlayer(event.playerId)?.hands || [], card], event.playerId);
    return;
}

function assertTrickNumber(trick_number: number, expected: number) {
    if (trick_number !== expected) {
        throw new Error(`Trick number mismatch: expected ${expected}, got ${trick_number}`);
    }
}
