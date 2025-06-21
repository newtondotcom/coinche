import { supabase } from '@/shared/utils/listener';
import genIdCuid from '~/shared/utils/gen_id';

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
