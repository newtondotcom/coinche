import { toast } from 'vue-sonner';
import type { EventInsert, IAnnonce } from '@coinche/shared';

export function translateCoinche(event: EventInsert) {
    const storeGame = useGameStore();
    const value = event.value as unknown as IAnnonce;
    storeGame.setCoinched(true);
    toast.message('Coinche', {
        description: `${event.playerId} coinche ${storeGame.last_annonce.playerId} à ${value.annonce} ${value.suite}`,
    });
    return;
}

export function translateSurcoinche(event: EventInsert) {
    const storeGame = useGameStore();
    const value = event.value as unknown as IAnnonce;
    storeGame.setSurcoinched(true);
    toast.message('Surcoinche', {
        description: `${event.playerId} surcoinche ${storeGame.last_annonce.playerId} à ${value.annonce} ${value.suite}`,
    });
    storeGame.setSurcoinched(true);
    return;
}
