import { findWinner } from '@/emitter/close_pli';
import controller from '@/game';
import logger from '@/logger';
import { emitPointsTrick } from './points_trick';

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitEndTrick(gameId: string, publish: (payload: any) => void) {
    const controllerInstance = controller.getInstance(gameId);
    const lastRound = controllerInstance.getLastRound();
    const pointMultiplier = lastRound.coinched ? 2 : lastRound.surcoinched ? 4 : 1;
    const seuilbidding = lastRound.last_bidding;
    const teamAnnounced = controllerInstance.isTeam1(seuilbidding.playerId) ? 1 : 2;

    const calculateCapotGeneraleScore = (bidding: string) => {
        const plis = lastRound.plis;
        let isSuccessful = true;

        plis.forEach((pli) => {
            const winnerPli = findWinner(pli.plays, gameId);
            if (
                (teamAnnounced === 1 && !controllerInstance.isTeam1(winnerPli)) ||
                (teamAnnounced === 2 && controllerInstance.isTeam1(winnerPli))
            ) {
                isSuccessful = false;
            }
        });

        if (isSuccessful) {
            return bidding === 'capot' ? 250 * pointMultiplier : 500 * pointMultiplier;
        }
        return 0;
    };

    const calculateDefaultScore = () => {
        const biddingValue =
            typeof seuilbidding.bidding === 'number'
                ? seuilbidding.bidding
                : parseInt(seuilbidding.bidding, 10);

        if (
            (teamAnnounced === 1 && lastRound.team1_point_current_game > biddingValue) ||
            (teamAnnounced === 2 && lastRound.team2_point_current_game > biddingValue)
        ) {
            // bidding validée
            return biddingValue * pointMultiplier;
        } else {
            // bidding chutée
            return -biddingValue * pointMultiplier;
        }
    };

    let scoreTeam1 = 0;
    let scoreTeam2 = 0;

    if (teamAnnounced === 1) {
        switch (seuilbidding.bidding) {
            case 'capot':
            case 'generale':
                scoreTeam1 = calculateCapotGeneraleScore(seuilbidding.bidding);
                break;
            default:
                scoreTeam1 = calculateDefaultScore();
                if (scoreTeam1 < 0) {
                    scoreTeam2 = -scoreTeam1;
                    scoreTeam1 = 0;
                }
                break;
        }
    } else {
        switch (seuilbidding.bidding) {
            case 'capot':
            case 'generale':
                scoreTeam2 = calculateCapotGeneraleScore(seuilbidding.bidding);
                break;
            default:
                scoreTeam2 = calculateDefaultScore();
                if (scoreTeam2 < 0) {
                    scoreTeam1 = -scoreTeam2;
                    scoreTeam2 = 0;
                }
                break;
        }
    }

    logger.info(`Score de ${scoreTeam1} à ${scoreTeam2}`);
    controllerInstance.game.team1_score += scoreTeam1;
    controllerInstance.game.team2_score += scoreTeam2;
    await emitPointsTrick(scoreTeam1, scoreTeam2, gameId, publish);
}
