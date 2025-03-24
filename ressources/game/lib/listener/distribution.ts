import { deformatCarteToDistribute } from '@coinche/shared';
import type { EventInsert } from '@coinche/shared';

import { assertPliNumber } from '@/utils/miscs';

export function translateDistribution(event: EventInsert) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const { pli_number, card } = deformatCarteToDistribute(event.value as string);
    assertPliNumber(pli_number, storeGame.pli_number);
    const player_id = event.playerId;
    const player = storePlayers.players.find((p) => p.id === player_id);
    if (player) {
        player.hands.push(card);
    } else {
        console.error('Player not found');
    }
    return;
}
