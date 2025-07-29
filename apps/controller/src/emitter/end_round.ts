import { findWinner } from '@/emitter/close_trick';
import controller from '@/game';
import logger from '@/logger';
import { emitPointsRound } from './points_round';

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitEndRound(gameId: string, publish: (payload: any) => void) {
    const controllerInstance = controller.getInstance(gameId);
    const lastRound = controllerInstance.getLastRound();
    const pointMultiplier = lastRound.coinched ? 2 : lastRound.surcoinched ? 4 : 1;
    const seuilBid = lastRound.last_bid;
    const teamAnnounced = controllerInstance.isTeam1(seuilBid.playerId) ? 1 : 2;

    const calculateSpecialBidScore = (bidding: number) => {
        const tricks = lastRound.tricks;
        let isSuccessful = true;

        // For special bids (250+ or 500+), check if all tricks are won by the same team
        tricks.forEach((trick) => {
            const winnerTrick = findWinner(trick.plays, gameId);
            if (
                (teamAnnounced === 1 && !controllerInstance.isTeam1(winnerTrick)) ||
                (teamAnnounced === 2 && controllerInstance.isTeam1(winnerTrick))
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
        const biddingValue =
            typeof seuilBid.bidding === 'number'
                ? seuilBid.bidding
                : parseInt(seuilBid.bidding, 10);

        if (
            (teamAnnounced === 1 && lastRound.team1_point_current_game >= biddingValue) ||
            (teamAnnounced === 2 && lastRound.team2_point_current_game >= biddingValue)
        ) {
            // bid validée
            return biddingValue * pointMultiplier;
        } else {
            // bid chutée
            return -biddingValue * pointMultiplier;
        }
    };

    let scoreTeam1 = 0;
    let scoreTeam2 = 0;

    if (teamAnnounced === 1) {
        if (typeof seuilBid.bidding === 'number' && seuilBid.bidding >= 250) {
            // Special bid (250-252 for capot, 500-502 for générale) - use exact value
            scoreTeam1 = calculateSpecialBidScore(seuilBid.bidding);
        } else {
            // Regular bid (80-160) - use traditional multiplier
            scoreTeam1 = calculateDefaultScore();
            if (scoreTeam1 < 0) {
                scoreTeam2 = -scoreTeam1;
                scoreTeam1 = 0;
            }
        }
    } else {
        if (typeof seuilBid.bidding === 'number' && seuilBid.bidding >= 250) {
            // Special bid (250-252 for capot, 500-502 for générale) - use exact value
            scoreTeam2 = calculateSpecialBidScore(seuilBid.bidding);
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
    controllerInstance.game.team1_score += scoreTeam1;
    controllerInstance.game.team2_score += scoreTeam2;
    await emitPointsRound(scoreTeam1, scoreTeam2, gameId, publish);
}