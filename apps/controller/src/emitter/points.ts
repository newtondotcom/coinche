import supabase from '@/supabase';
import { formatPoints } from '@coinche/shared';
import genIdCuid from '@coinche/shared/src/gen_id';

export async function emitPoints(scoreTeam1: number, scoreTeam2: number, gameId: string) {
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'score',
            playerId: 'controller',
            gameId: gameId,
            value: formatPoints(scoreTeam1, scoreTeam2),
        },
    ]);
}
