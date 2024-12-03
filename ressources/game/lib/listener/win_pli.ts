import { deformatTeam } from '@coinche/shared';
import type { EventInsert } from '@coinche/shared';

import { toast } from '../utils/listener';

export async function translateWinPli(event: EventInsert) {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const teamWinning: string[] = deformatTeam(event.value as string);
    const teamWinningPlayers = storePlayers.players.filter((player) =>
        teamWinning.includes(player.id),
    );
    storeGame.setNewPli();
    const text = `${teamWinningPlayers.map((player) => player.surname).join(' et ')} remportent le pli`;
    toast({
        title: 'Fin du pli',
        description: text,
    });
    return;
}
