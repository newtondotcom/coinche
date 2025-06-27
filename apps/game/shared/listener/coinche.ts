import { toast } from 'vue-sonner';
import type { EventInsert, Ibidding } from '@coinche/shared';

export function translateCoinche(event: EventInsert) {
    const storeGame = useGameStore();
    const value = event.value as unknown as Ibidding;
    storeGame.setCoinched(true);
    toast.message('Coinche', {
        description: `${event.playerId} coinche ${storeGame.last_bidding.playerId} à ${value.bidding} ${value.suite}`,
    });
    return;
}

export function translateSurcoinche(event: EventInsert) {
    const storeGame = useGameStore();
    const value = event.value as unknown as Ibidding;
    storeGame.setSurcoinched(true);
    toast.message('Surcoinche', {
        description: `${event.playerId} surcoinche ${storeGame.last_bidding.playerId} à ${value.bidding} ${value.suite}`,
    });
    storeGame.setSurcoinched(true);
    return;
}
