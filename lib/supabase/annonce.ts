import { createClient } from '@supabase/supabase-js';

import genIdCuid from './gen';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export default async function emitAnnonce(annonce: IAnnonce) {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
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
}

export function formatAnnonce(annonce: IAnnonce): string {
    return `${annonce.annonce}|${annonce.suite}`;
}

export function deformatAnnonce(annonce: string, playerId: string): IAnnonce {
    const [annonceValue, suite] = annonce.split('|');
    return {
        annonce: parseInt(annonceValue) as Annonce,
        suite: suite as CardSuite,
        playerId: playerId,
    };
}
