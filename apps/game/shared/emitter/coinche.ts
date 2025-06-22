import { supabase } from '@/shared/utils/listener';
import genIdCuid from '~/shared/utils/gen_id';

export async function emitCoinche() {
        const storeAbout = useAboutStore();
        const gameId = storeAbout.gameId;
        await supabase.from('Events').insert([
            {
                id: await genIdCuid(),
                type: 'coinche',
                playerId: storeAbout.myId,
                gameId: gameId,
                value: '',
            },
        ]);
    }

    export async function emitSurcoinche() {
        const storeAbout = useAboutStore();
        const gameId = storeAbout.gameId;
        await supabase.from('Events').insert([
            {
                id: await genIdCuid(),
                type: 'surcoinche',
                playerId: storeAbout.myId,
                gameId: gameId,
                value: '',
            },
        ]);
    }