import { deformatCarteToPlay } from '@/shared/utils/format';
import type { EventInsert } from '@coinche/shared';

export default async function translatePlay(event: EventInsert) {
    const storeGame = useGameStore();
    const def = deformatCarteToPlay(event.value as string);
    const card = def.card;
    const trick_number = def.trick_number;
    assertTrickNumber(trick_number, storeGame.trick_number);
    const playerId = event.playerId;
    storeGame.addCardToTrickAndRemove(card, playerId);
    return;
}

function assertTrickNumber(trick_number: number, expected: number) {
    if (trick_number !== expected) {
        throw new Error(`Trick number mismatch: expected ${expected}, got ${trick_number}`);
    }
}
