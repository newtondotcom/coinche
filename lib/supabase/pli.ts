import { createClient } from '@supabase/supabase-js';

import { deformatCarteToDistribute, deformatCarteToPlay } from './distribution';
import genIdCuid from './gen';
import { emitPoints } from './points';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export async function closePli() {
    const storeAbout = useAboutStore();
    const storePlayers = usePlayersStore();
    const storeGame = useGameStore();
    // find the winner
    const pastPlis: IPlay[] = storeGame.current_pli;
    while (pastPlis.length < 4) {
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
    const winnerPlayerId = findWinner(pastPlis);
    const myIndex = storePlayers.players.findIndex(
        (player: IPlayer) => player.id === winnerPlayerId,
    );
    const teamMatePlayerId = storePlayers.players[(myIndex + 2) % 4].id;
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'win_pli',
            playerId: storeAbout.myId,
            gameId: storeAbout.gameId,
            value: formatTeam(winnerPlayerId, teamMatePlayerId),
        },
    ]);
    const score = pastPlis.reduce((acc, pli) => acc + pli.card.valueNum, 0);
    const scoreTeam1 = storePlayers.team1.some((player) => player.id === winnerPlayerId)
        ? score
        : 0;
    const scoreTeam2 = storePlayers.team2.some((player) => player.id === winnerPlayerId)
        ? score
        : 0;
    const oldScoreTeam1 = storeGame.team1_point_current_game;
    await emitPoints(scoreTeam1, scoreTeam2);
    while (oldScoreTeam1 === storeGame.team1_point_current_game) {
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (storeGame.deck.length === 32) {
        // end of the game
        if (
            storeGame.team1_point_current_game >= 1000 ||
            storeGame.team2_point_current_game >= 1000
        ) {
            await supabase.from('Events').insert([
                {
                    id: await genIdCuid(),
                    type: 'end_game',
                    playerId: storeAbout.myId,
                    gameId: storeAbout.gameId,
                    value: formatTeam(winnerPlayerId, teamMatePlayerId),
                },
            ]);
        }
    }
    return;
}

export async function startPli() {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    storeGame.setCurrentPlayerId(storeGame.player_starting_id);
    // launch pli
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'start_pli',
            playerId: storeAbout.myId,
            gameId: storeAbout.gameId,
            value: storeGame.player_starting_id, // value is the name of the player starting the pli
        },
    ]);
}

function findWinner(lastPliEvents: IPlay[]) {
    const storeAbout = useAboutStore();
    const atout = storeAbout.atout;
    if (lastPliEvents.some((pli) => pli.card.suite === atout)) {
        // atout is played
        const atoutCards = lastPliEvents.filter((pli) => pli.card.suite === atout);
        const highestAtout = atoutCards.reduce((acc, card) => {
            if (card.card.valueNum > acc.card.valueNum) {
                return card;
            }
            return acc;
        });
        return highestAtout.playerId;
    } else {
        // no atout played
        const firstSuite = lastPliEvents[0].card.suite;
        const sameSuite = lastPliEvents.filter((pli) => pli.card.suite === firstSuite);
        const highestSameSuite = sameSuite.reduce((acc, card) => {
            if (card.card.valueNum > acc.card.valueNum) {
                return card;
            }
            return acc;
        });
        return highestSameSuite.playerId;
    }
}

// first player id is the one starting the next pli
export function formatTeam(player1: string, player2: string): string {
    return `${player1}|${player2}`;
}

export function deformatTeam(team: string): [string, string] {
    const [player1, player2] = team.split('|');
    return [player1, player2];
}

export async function fetchLastPliEvents(): Promise<IPlay[]> {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    const { data: existingEvents, error: selectError } = await supabase
        .from('Events')
        .select('*')
        .eq('gameId', storeAbout.gameId)
        .eq('type', 'play');
    if (selectError) {
        console.error('Error fetching events', selectError);
        return [];
    }
    const lastPliId = storeGame.pli_number;
    const lastPliEvents = existingEvents.filter(
        (event) => deformatCarteToPlay(event.value).pli_number === lastPliId,
    );
    const pastPlis: IPlay[] = lastPliEvents.map((event) => ({
        card: deformatCarteToPlay(event.value).card,
        playerId: event.playerId,
    }));
    return pastPlis;
}

export function sumPointsPli(plays: IPlay[]) {
    return plays.reduce((acc, play) => acc + play.card.valueNum, 0);
}
