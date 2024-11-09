import { createClient } from '@supabase/supabase-js';

import { deformatCarteToDistribute } from './distribution';
import genIdCuid from './gen';
import { emitPoints } from './points';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export async function closePli() {
    const storeAbout = useAboutStore();
    const storeGame = useGameStore();
    const storePlayers = usePlayersStore();

    // find the winner
    const pastPlis: IPlay[] = await fetchLastPliEvents();
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
            value: formatTeam(storeAbout.myId, teamMatePlayerId),
        },
    ]);

    // update scores
    const scoreTeam1 = storeGame.team1_score + storeGame.team1_point_current_pli;
    const scoreTeam2 = storeGame.team2_score + storeGame.team2_point_current_pli;
    emitPoints(scoreTeam1, scoreTeam2);
    return;
}

export async function startPli() {
    const storeGame = useGameStore();
    const storeAbout = useAboutStore();
    storeGame.setNewPli();
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

export function formatTeam(player1: string, player2: string): string {
    return [player1, player2].sort().join('-');
}

export function deformatTeam(team: string): string[] {
    return team.split('-');
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
        (event) => deformatCarteToDistribute(event.value).pli_number === lastPliId,
    );
    const pastPlis: IPlay[] = lastPliEvents.map((event) => ({
        card: deformatCarteToDistribute(event.value).card,
        playerId: event.playerId,
    }));
    return pastPlis;
}

export function sumPointsPli(plays: IPlay[]) {
    return plays.reduce((acc, play) => acc + play.card.valueNum, 0);
}
