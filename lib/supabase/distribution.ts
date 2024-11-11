import { createClient } from '@supabase/supabase-js';

import genIdCuid from './gen';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export default async function emitDistribution(id_player_starting: PlayerId) {
    const storePlayers = usePlayersStore();
    const storeAbout = useAboutStore();

    // distribute cards 3 per person, then 2, then 3
    const players = storePlayers.players;
    const startIndex = players.findIndex((player) => player.id === id_player_starting);
    if (startIndex === -1) {
        console.error('Player with the given id_player_starting not found');
    }
    const shiftedPlayers = [...players.slice(startIndex), ...players.slice(0, startIndex)];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < shiftedPlayers.length; j++) {
            await distributeCard(shiftedPlayers[j].id);
        }
    }
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < shiftedPlayers.length; j++) {
            await distributeCard(shiftedPlayers[j].id);
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < shiftedPlayers.length; j++) {
            await distributeCard(shiftedPlayers[j].id);
        }
    }
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'start_annonce',
            playerId: storeAbout.myId,
            gameId: storeAbout.gameId,
            value: '',
        },
    ]);
}

async function distributeCard(player_id: string) {
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    const deck = storeGame.deck;
    const card: ICard = deck.pop();
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'distribution',
            playerId: player_id,
            gameId: storeAbout.gameId,
            value: formatCarteToDistribute(card, storeGame.pli_number),
        },
    ]);
}

export function formatCarteToDistribute(card: ICard, pli_number: number): string {
    return `${pli_number}|${card.value}|${card.suite}`;
}
export function deformatCarteToDistribute(carte: string) {
    const [pli_number, value, suite] = carte.split('|');
    const card = {
        value: value as CardValue,
        suite: suite as CardSuite,
        valueNum: parseInt(value),
    };
    return {
        pli_number: parseInt(pli_number),
        card: card,
    };
}
