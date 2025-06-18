import { deformatAnnonce } from '@coinche/shared';
import { toast } from 'vue-sonner';
import type { EventInsert } from '@coinche/shared';

export default async function translateAnnonce(event: EventInsert) {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const annonce = deformatAnnonce(event.value as string, event.playerId);
    const playerName = event.playerId;
    if (annonce.annonce === 0) {
        toast.message('Passe', {
            description: `${playerName} passe`,
        });
    } else {
        storeGame.setLastAnnonce(annonce);
    }
    storeGame.addAnnonceToPli(annonce);
    storePlayers.setLastAnnonce(annonce, event.playerId);
    return;
}
