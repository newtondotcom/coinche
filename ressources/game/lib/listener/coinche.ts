import { toast } from '@/lib/utils/listener';
import type { EventInsert, IAnnonce } from '@coinche/shared';

export function translateCoinche(event: EventInsert) {
    const storeGame = useGameStore();
    const value = event.value as unknown as IAnnonce;
    storeGame.setCoinched(true);
    toast({
        title: 'Coinche',
        description: `${event.playerId} coinche ${storeGame.last_annonce.playerId} à ${value.annonce} ${value.suite}`,
    });
    return;
}

export function translateSurcoinche(event: EventInsert) {
    const storeGame = useGameStore();
    const value = event.value as unknown as IAnnonce;
    storeGame.setSurcoinched(true);
    toast({
        title: 'Coinche',
        description: `${event.playerId} coinche ${storeGame.last_annonce.playerId} à ${value.annonce} ${value.suite}`,
    });
    storeGame.setSurcoinched(true);
    return;
}
