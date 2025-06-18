import { supabase } from '@/lib/utils/listener';
import genIdCuid from '@coinche/shared/src/gen_id';

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
