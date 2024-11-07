import { createClient } from '@supabase/supabase-js';

import genIdCuid from './gen';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export default async function emitAnnonce(annonce: IAnnonce) {
    const storeGame = useGameStore();
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

    // if pass
    if (annonce.annonce === 0) {
        // check if this is not the last pass possible
        const annoncesPassed = storeGame.annonces_pli.filter((annonce) => annonce.annonce === 0);
        if (annoncesPassed.length === 2) {
            // only 2 because the current annonce is passed
            storeGame.setNewPli();
            storeGame.setCurrentPlayerId(storeGame.player_starting_id);
            // launch game
            await supabase.from('Events').insert([
                {
                    id: await genIdCuid(),
                    type: 'start_pli',
                    playerId: storeAbout.myId,
                    gameId: storeAbout.gameId,
                    value: storeGame.player_starting_id, // value is the id of the player starting the pli
                },
            ]);
            console.log('Starting pli because of 3 passes');
            return 'Pli terminé';
        } else {
            console.log(annoncesPassed.length, 'passes');
        }
    }
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

export function setNextPlayerTurn(playerId: string) {
    const storePlayers = usePlayersStore();
    const currentPlayerIndex = storePlayers.players.findIndex(
        (player: IPlayer) => player.id === playerId,
    );
    const nextPlayerIndex = (currentPlayerIndex + 1) % storePlayers.players.length;
    const nextPlayerId = storePlayers.players[nextPlayerIndex].id;
    return nextPlayerId;
}
