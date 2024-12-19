import { supabase } from '~/lib/utils/listener';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
    await supabase.from('Events').insert([
        {
            id: 'dzzzzzzz',
            type: 'alive',
            playerId: 'dddddddd',
            gameId: 'ddddddd',
            value: 'alive',
        },
    ]);
    await supabase.from('Events').delete().eq('type', 'alive');
    return {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
        },
    };
});
