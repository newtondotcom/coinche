import { setNextPlayerTurn } from '@/lib/emitter/annonce';
import { toast } from '@/lib/utils/listener';
import { deformatAnnonce } from '@coinche/shared';
import type { EventShared } from '@coinche/shared';

export default async function translateAnnonce(event: EventShared) {
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    const annonce = deformatAnnonce(event.value as string, event.playerId);
    storePlayers.setLastAnnonce(annonce, event.playerId);
    setNextPlayerTurn(event.playerId);
    const playerName = storePlayers.players.find((player) => player.id === event.playerId)?.surname;
    if (annonce.annonce === 0) {
        const annonceValueFormatted =
            storeGame.last_annonce.annonce === 0
                ? 'passe'
                : `passe à ${storeGame.last_annonce.annonce} ${storeGame.last_annonce.suite}`;
        toast({
            title: 'Passe',
            description: `${playerName} ${annonceValueFormatted}`,
        });
    } else {
        storeGame.setLastAnnonce(annonce);
    }
    storeGame.addAnnonceToPli(annonce);
    return;
}
