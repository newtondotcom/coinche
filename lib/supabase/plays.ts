import { createClient } from '@supabase/supabase-js';

import { formatCarteToDistribute } from './distribution';
import genIdCuid from './gen';
import { closePli, formatTeam } from './pli';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export async function emitCardPlay(card: ICard) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'score',
            playerId: storeAbout.myId,
            gameId: storeAbout.gameId,
            value: formatCarteToDistribute(card, storeGame.pli_number),
        },
    ]);
    // check if end of pli
    if (storeGame.current_pli.length == 4) {
        await closePli();
    }
}
