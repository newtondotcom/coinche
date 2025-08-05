import { findWinner } from '@/lib/actions/close_pli';
import controller from '@/lib/game';
import logger from '@/lib/logger';
import { emitPointsTrick } from './points_trick';


export async function emitEndTrick(gameId: string) {
    const controllerInstance = controller.getInstance(gameId);
    const lastRound = controllerInstance.getCurrentRound();
    const pointMultiplier = lastRound.coinched ? 2 : lastRound.surcoinched ? 4 : 1;
    const seuilbidding = lastRound.biddingElected;
    const teamAnnounced = controllerInstance.isTeam1(seuilbidding.playerId) ? 1 : 2;

    const calculateSpecialBidScore = (bidding: number) => {
        const plis = lastRound.plis;
        let isSuccessful = true;

        // For special bids (250+ or 500+), check if all tricks are won by the same team
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
            // Return the exact bid value since coinche status is already included for special bids
            return bidding;
        }
        return 0;
    };

    const calculateDefaultScore = () => {
        const lastPli = lastRound.plis[lastRound.plis.length - 1];
        const biddingValue =
            typeof seuilbidding.bidding === 'number'
                ? seuilbidding.bidding
                : parseInt(seuilbidding.bidding, 10);

        if (
            (teamAnnounced === 1 && lastPli.team1Score >= biddingValue) ||
            (teamAnnounced === 2 && lastPli.team2Score >= biddingValue)
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
        if (typeof seuilbidding.bidding === 'number' && seuilbidding.bidding >= 250) {
            // Special bid (250-252 for capot, 500-502 for générale) - use exact value
            scoreTeam1 = calculateSpecialBidScore(seuilbidding.bidding);
        } else {
            // Regular bid (80-160) - use traditional multiplier
            scoreTeam1 = calculateDefaultScore();
            if (scoreTeam1 < 0) {
                scoreTeam2 = -scoreTeam1;
                scoreTeam1 = 0;
            }
        }
    } else {
        if (typeof seuilbidding.bidding === 'number' && seuilbidding.bidding >= 250) {
            // Special bid (250-252 for capot, 500-502 for générale) - use exact value
            scoreTeam2 = calculateSpecialBidScore(seuilbidding.bidding);
        } else {
            // Regular bid (80-160) - use traditional multiplier
            scoreTeam2 = calculateDefaultScore();
            if (scoreTeam2 < 0) {
                scoreTeam1 = -scoreTeam2;
                scoreTeam2 = 0;
            }
        }
    }

    logger.info(`Score de ${scoreTeam1} à ${scoreTeam2}`);
    controllerInstance.state.team1PointsCurrentGame += scoreTeam1;
    controllerInstance.state.team2PointsCurrentGame += scoreTeam2;
    await emitPointsTrick(scoreTeam1, scoreTeam2, gameId);
}
