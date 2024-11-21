import { formatAnnonce } from '@coinche/shared';
import genIdCuid from '@coinche/shared/src/gen_id';
import { createClient } from '@supabase/supabase-js';
import type { IAnnonce, IPlayer } from '@coinche/shared';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export default async function emitAnnonce(annonce: IAnnonce) {
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
    storeAbout.setCanAnnonce(false);
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
