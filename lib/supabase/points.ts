import { createClient } from '@supabase/supabase-js';

import genIdCuid from './gen';

const config = useRuntimeConfig();
const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_ANON_KEY);

export function formatPoints(team1_score: number, team2_score: number): string {
    return `${team1_score} - ${team2_score}`;
}

export function unformatPoints(points: string): [number, number] {
    const [team1, team2] = points.split(' - ');
    return [parseInt(team1), parseInt(team2)];
}

export async function emitPoints(scoreTeam1: number, scoreTeam2: number) {
    const storeAbout = useAboutStore();
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'score',
            playerId: storeAbout.myId,
            gameId: storeAbout.gameId,
            value: formatPoints(scoreTeam1, scoreTeam2),
        },
    ]);
}

export async function emitPointsPli(teamWinning: number, score: number) {
    const storeAbout = useAboutStore();
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'score_pli',
            playerId: storeAbout.myId,
            gameId: storeAbout.gameId,
            value: formatPointsPli(teamWinning, score),
        },
    ]);
}

export function formatPointsPli(teamWinning: number, score: number) {
    return `${teamWinning} - ${score}`;
}

export function unformatPointsPli(points: string): [number, number] {
    const [teamWinning, score] = points.split(' - ');
    return [parseInt(teamWinning), parseInt(score)];
}
