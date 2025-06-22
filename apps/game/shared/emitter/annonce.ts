import { supabase } from '@/shared/utils/listener';
import { formatAnnonce } from '~/shared/utils/format';
import genIdCuid from '~/shared/utils/gen_id';
import type { IAnnonce } from '@coinche/shared';

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

