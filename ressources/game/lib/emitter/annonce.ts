import { startPli } from '@/lib/emitter/pli';
import genIdCuid from '@/lib/utils/gen_id';
import { createClient } from '@supabase/supabase-js';

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
        // Get the last two annonces to check if they are both passes
        const lastTwoAnnonces = storeGame.annonces_pli.slice(-2);
        const annoncesPassed = lastTwoAnnonces.filter((annonce) => annonce.annonce === 0);

        // Include the current annonce in the check
        if (annoncesPassed.length === 2) {
            await startPli();
            console.log('Starting pli because of 3 consecutive passes');
            return;
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
    const storeGame = useGameStore();
    const currentPlayerIndex = storePlayers.players.findIndex(
        (player: IPlayer) => player.id === playerId,
    );
    const nextPlayerIndex = (currentPlayerIndex + 1) % storePlayers.players.length;
    const nextPlayerId = storePlayers.players[nextPlayerIndex].id;
    storeGame.setCurrentPlayerId(nextPlayerId);
}

export function setNextPlayerPli(playerId: string) {
    const storeGame = useGameStore();
    storeGame.setCurrentPlayerId(playerId);
}

export function setNextPlayerGame() {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const playerId: string = storeGame.player_starting_id;
    const currentPlayerIndex = storePlayers.players.findIndex(
        (player: IPlayer) => player.id === playerId,
    );
    const nextPlayerIndex = (currentPlayerIndex + 1) % storePlayers.players.length;
    const nextPlayerId = storePlayers.players[nextPlayerIndex].id;
    storeGame.setPlayerStartingId(nextPlayerId);
}
