import emitDistribution from '~/lib/supabase/distribution';
import genIdCuid from '~/lib/supabase/gen';

import { generateDeckCards } from '../deck';
import { supabase, toast } from '../listener';

export async function translateStart(event: EventShared) {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    // same logic applied in the io.ts file - to duplicate / refactor
    storeGame.setStatus('active');
    storeGame.setPlayerStartingId(event.value as string);
    storeGame.setCurrentPlayerId(event.value as string);
    if (storeAbout.isCreator) {
        await supabase.from('Events').insert([
            {
                id: await genIdCuid(),
                type: 'start_distribution',
                playerId: storeAbout.myId,
                gameId: storeAbout.gameId,
                value: 'idPlayerStarting',
            },
        ]);
        storeGame.setDeck(generateDeckCards());
        await emitDistribution(storeAbout.myId);
    }
    toast({
        title: 'Game has started',
    });
    return;
}
