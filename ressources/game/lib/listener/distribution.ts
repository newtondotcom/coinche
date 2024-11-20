import { deformatCarteToDistribute } from '@/lib/emitter/distribution';

export function translateDistribution(event: EventShared) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const { pli_number, card } = deformatCarteToDistribute(event.value as string);
    if (pli_number !== storeGame.pli_number) {
        console.error('Pli number not matching');
        return;
    }
    const player_id = event.playerId;
    const player = storePlayers.players.find((p) => p.id === player_id);
    if (player) {
        player.hands.push(card);
    } else {
        console.error('Player not found');
    }
    return;
}
