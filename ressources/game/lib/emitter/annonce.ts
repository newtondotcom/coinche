import { formatAnnonce } from '@coinche/shared';
import genIdCuid from '@coinche/shared/src/gen_id';
import type { IAnnonce, IPlayer } from '@coinche/shared';

import { supabase } from '../utils/listener';

export default async function emitAnnonce(annonce: IAnnonce) {
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'annonce',
            playerId: annonce.playerId,
            gameId: gameId,
            value: formatAnnonce(annonce),
        },
    ]);
    storeAbout.setTurnToAnnonce(false);
}
