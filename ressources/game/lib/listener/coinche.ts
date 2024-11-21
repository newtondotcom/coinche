import { setNextPlayerTurn } from '@/lib/emitter/annonce';
import { toast } from '@/lib/utils/listener';
import type { EventShared, IAnnonce } from '@coinche/shared';

export function translateCoinche(event: EventShared) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const value = event.value as IAnnonce;
    storeGame.setCoinched(true);
    setNextPlayerTurn(event.playerId);
    const lastAnnoncePlayer = storePlayers.players.find(
        (player) => player.id === storeGame.last_annonce.playerId,
    );
    const playerCoinche = storePlayers.players.find((player) => player.id === event.playerId);
    toast({
        title: 'Coinche',
        description: `${playerCoinche?.surname} coinche ${lastAnnoncePlayer?.surname} à ${value.annonce} ${value.suite}`,
    });
    return;
}

export function translateSurcoinche(event: EventShared) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const value = event.value as IAnnonce;
    storeGame.setSurcoinched(true);
    setNextPlayerTurn(event.playerId);
    const lastAnnoncePlayer = storePlayers.players.find(
        (player) => player.id === storeGame.last_annonce.playerId,
    );
    const playerCoinche = storePlayers.players.find((player) => player.id === event.playerId);
    toast({
        title: 'Coinche',
        description: `${playerCoinche?.surname} coinche ${lastAnnoncePlayer?.surname} à ${value.annonce} ${value.suite}`,
    });
    storeGame.setSurcoinched(true);
    return;
}
