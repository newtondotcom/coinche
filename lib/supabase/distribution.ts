import { createClient } from '@supabase/supabase-js';

import genIdCuid from './gen';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export default async function emitDistribution(id_player_starting: PlayerId) {
    const storePlayers = usePlayersStore();

    // distribute cards 3 per person, then 2, then 3
    const players = storePlayers.players;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < players.length; j++) {
            distributeCard(players[j].id);
        }
    }
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < players.length; j++) {
            distributeCard(players[j].id);
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < players.length; j++) {
            distributeCard(players[j].id);
        }
    }
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
            playerId: storeAbout.myId,
            gameId: storeAbout.gameId,
            value: formatCarteToDistribute(card, storeGame.pli_number),
        },
    ]);
    const player = storePlayers.players.find((p) => p.id === player_id);
    if (player) {
        player.hands.push(card);
    } else {
        console.error('Player not found');
    }
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
