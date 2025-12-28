import { findWinner } from "./closeTrick";
import controller from "../game";
import logger from "../logger";
import { emitPointsRound } from "./pointsRound";

export async function emitEndRound(gameId: string) {
  const controllerInstance = controller.getInstance(gameId);
  const lastRound = controllerInstance.getCurrentRound();
  const pointMultiplier = lastRound.coinched ? 2 : lastRound.surcoinched ? 4 : 1;
  const seuilbidding = lastRound.biddingElected;
  const teamAnnounced = controllerInstance.isTeam1(seuilbidding.playerId) ? 1 : 2;

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
    // Calculate total round points from all tricks
    const totalRoundPointsTeam1 = lastRound.tricks.reduce(
      (sum, trick) => sum + trick.team1Score,
      0,
    );
    const totalRoundPointsTeam2 = lastRound.tricks.reduce(
      (sum, trick) => sum + trick.team2Score,
      0,
    );

    const biddingValue =
      typeof seuilbidding.bidding === "number"
        ? seuilbidding.bidding
        : parseInt(seuilbidding.bidding, 10);

    if (
      (teamAnnounced === 1 && totalRoundPointsTeam1 >= biddingValue) ||
      (teamAnnounced === 2 && totalRoundPointsTeam2 >= biddingValue)
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
    if (typeof seuilbidding.bidding === "number" && seuilbidding.bidding >= 250) {
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
    if (typeof seuilbidding.bidding === "number" && seuilbidding.bidding >= 250) {
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
  await emitPointsRound(scoreTeam1, scoreTeam2, gameId);
}
