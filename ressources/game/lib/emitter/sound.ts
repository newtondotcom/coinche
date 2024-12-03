import genIdCuid from '@coinche/shared/src/gen_id';

import { supabase } from '../utils/listener';

export async function emitSound(name: string): Promise<void> {
    const storeAbout = useAboutStore();
    const gameId = storeAbout.gameId;
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'sound',
            playerId: storeAbout.myId,
            gameId: gameId,
            value: name,
        },
    ]);
}
