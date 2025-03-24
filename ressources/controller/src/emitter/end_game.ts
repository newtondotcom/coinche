import { formatTeam } from '@coinche/shared';
import genIdCuid from '@coinche/shared/src/gen_id';
import type { IPlayer } from '@coinche/shared';

import logger from '@/logger';
import { addPointsTo } from '../points';
import supabase from '@/supabase';

export async function emitEndGame(
    winnerPlayerId: string,
    teamMatePlayerId: string,
    gameId: string,
) {
    await supabase.from('Events').insert([
        {
            id: await genIdCuid(),
            type: 'end_game',
            playerId: 'controller',
            gameId: gameId,
            value: formatTeam(winnerPlayerId, teamMatePlayerId),
        },
    ]);
}

export async function distributeRankingPoints(
    players: IPlayer[],
    gameId: string,
    team1Score: number,
    team2Score: number,
) {
    const playersIds = players.map((player) => player.id);
    console.log(players);
    // store in db the finished game
    await supabase.from('Game').insert([
        {
            gameId: gameId,
            p1: playersIds[0],
            p2: playersIds[1],
            p3: playersIds[2],
            p4: playersIds[3],
            team1_score: team1Score,
            team2_score: team2Score,
        },
    ]);

    // distribute points
    const { data, error } = await supabase.from('Points').select('*').in('playerId', players);
    if (error || !data || data.length !== players.length) {
        logger.error('Error fetching points or missing points data for some players', error);
        //return;
    }

    // Mapping players to their points
    const playerPoints = players.map((playerId) => {
        const playerData = data?.find((d) => d.playerId === playerId);
        if (playerData) {
            return playerData.points;
        } else {
            return 0;
        }
    });

    if (playerPoints.includes(undefined)) {
        console.error('Some players have missing points data.');
        return;
    }

    const mmrT1 = (playerPoints[0] + playerPoints[2]) / 2;
    const mmrT2 = (playerPoints[1] + playerPoints[3]) / 2;
    const diffMMR = Math.abs(mmrT1 - mmrT2);
    const team1Win = team1Score > team2Score;

    // Points adjustment based on game result
    const adjustPoints = (playerIdx: number, adjustment: number) =>
        addPointsTo(adjustment, playersIds[playerIdx]);

    if (team1Win) {
        if (mmrT1 < mmrT2) {
            // TEAM 1
            adjustPoints(0, 10 + diffMMR / 20);
            adjustPoints(2, 10 + diffMMR / 20);
            // TEAM 2
            adjustPoints(3, -10 - diffMMR / 20);
            adjustPoints(1, -10 - diffMMR / 20);
        } else {
            // TEAM 1
            adjustPoints(0, 10 - diffMMR / 20);
            adjustPoints(2, 10 - diffMMR / 20);
            // TEAM 2
            adjustPoints(3, -10 + diffMMR / 20);
            adjustPoints(1, -10 + diffMMR / 20);
        }
    } else {
        if (mmrT1 < mmrT2) {
            // TEAM 1
            adjustPoints(0, -10 + diffMMR / 20);
            adjustPoints(2, -10 + diffMMR / 20);
            // TEAM 2
            adjustPoints(3, 10 - diffMMR / 20);
            adjustPoints(1, 10 - diffMMR / 20);
        } else {
            // TEAM 1
            adjustPoints(0, -10 - diffMMR / 20);
            adjustPoints(2, -10 - diffMMR / 20);
            // TEAM 2
            adjustPoints(3, 10 + diffMMR / 20);
            adjustPoints(1, 10 + diffMMR / 20);
        }
    }
}

export async function deleteRows(gameId: string) {
    await supabase.from('Events').delete().match({ gameId: gameId });
}
