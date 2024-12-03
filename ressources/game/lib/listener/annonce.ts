import { deformatAnnonce } from '@coinche/shared';
import type { EventInsert } from '@coinche/shared';

import { toast } from '../utils/listener';

export default async function translateAnnonce(event: EventInsert) {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const annonce = deformatAnnonce(event.value as string, event.playerId);
    const playerName = storePlayers.players.find((player) => player.id === event.playerId)?.surname;
    if (annonce.annonce === 0) {
        toast({
            title: 'Passe',
            description: `${playerName} passe`,
        });
    } else {
        storeGame.setLastAnnonce(annonce);
    }
    storeGame.addAnnonceToPli(annonce);
    storePlayers.setLastAnnonce(annonce, event.playerId);
    return;
}
