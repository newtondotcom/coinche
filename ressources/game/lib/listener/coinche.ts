import { toast } from '@/lib/utils/listener';
import type { EventInsert, IAnnonce } from '@coinche/shared';

export function translateCoinche(event: EventInsert) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const value = event.value as IAnnonce;
    storeGame.setCoinched(true);
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

export function translateSurcoinche(event: EventInsert) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const value = event.value as IAnnonce;
    storeGame.setSurcoinched(true);
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
