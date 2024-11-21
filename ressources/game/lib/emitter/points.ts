import genIdCuid from '@/lib/utils/gen_id';
import { createClient } from '@supabase/supabase-js';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export async function emitPoints(scoreTeam1: number, scoreTeam2: number) {
    const storeAbout = useAboutStore();
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'score',
            playerId: storeAbout.myId,
            gameId: storeAbout.gameId,
            value: formatPoints(scoreTeam1, scoreTeam2),
        },
    ]);
}
