import { emitCanPlay } from '@/emitter/can';
import controller from '@/game';
import logger from '@/logger';
import supabase from '@/supabase';
import genIdCuid from '@coinche/shared/src/gen_id';

export async function startPli(gameId: string) {
    // launch pli
    const playerIdStarting = controller.getInstance(gameId).getLastPli().player_starting_id;
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'start_pli',
            playerId: 'controller',
            gameId: gameId,
            value: playerIdStarting,
        },
    ]);
    logger.info(`Starting pli for ${playerIdStarting}`);
    await emitCanPlay(playerIdStarting, gameId);
}
