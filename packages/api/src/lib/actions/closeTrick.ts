import { distributeRankingPoints, emitEndGame } from "./endGame";
import { startTrick } from "./startTrick";
import controller from "../game";
import { dev } from "../utils";
import logger from "../logger";
import type { IPlay, IPlayer } from "@coinche-reborn/api";
import { emitStartRound } from "./startRound";
import { emitEndRound } from "./endRound";
import addTrick from "./addTrick";

let scoreToReach: number;
if (dev) {
  scoreToReach = 100;
} else {
  scoreToReach = 1000;
}

export async function closeTrick(gameId: string) {
  const controllerInstance = controller.getInstance(gameId);
  const game = controllerInstance.state;
  const currentRound = controllerInstance.getCurrentRound();
  const currentTrick = controllerInstance.getCurrentTrick();
  if (!currentTrick) {
    throw new Error("No current trick found");
  }
  // find the winner
  const pastPlays: IPlay[] = currentTrick.plays;
  const winnerPlayerId = findWinner(pastPlays, gameId);
  const players: IPlayer[] = Array.from(controllerInstance.getPlayers());
  const myIndex = players.findIndex((player: IPlayer) => player.id === winnerPlayerId);
  if (myIndex === -1) {
    throw new Error("Winner player not found");
  }
  const teamMatePlayerId = players[(myIndex + 2) % 4]?.id;
  if (!teamMatePlayerId) {
    throw new Error("Teammate player not found");
  }
  // Calculate score from cards played in this trick
  logger.info(
    `[closeTrick] Cards played: ${pastPlays.map((p) => `${p.card.suite}-${p.card.value} (${p.card.valueNum})`).join(", ")}`,
  );
  let score = pastPlays.reduce((acc, play) => acc + play.card.valueNum, 0);
  logger.info(`[closeTrick] Total score from cards: ${score}`);
  if (game.deck.length === 32) {
    score += 10; // Last trick bonus
    logger.info(`[closeTrick] Last trick bonus added, total score: ${score}`);
  }
  // Accumulate points in the current trick (round points)
  // Modify directly in the state to ensure persistence
  const trickIndex = currentRound.tricks.length - 1;
  if (trickIndex < 0) {
    throw new Error(`Invalid trick index: ${trickIndex}`);
  }
  const trick = controllerInstance.state.currentRound.tricks[trickIndex];
  if (!trick) {
    throw new Error(`Trick at index ${trickIndex} not found`);
  }
  const scoreTeam1 = controllerInstance.isTeam1(winnerPlayerId) ? score : 0;
  const scoreTeam2 = scoreTeam1 === 0 ? score : 0;

  logger.info(
    `[closeTrick] Trick ${trickIndex + 1}: score=${score}, winner=${winnerPlayerId}, team1=${scoreTeam1}, team2=${scoreTeam2}`,
  );

  trick.team1Score += scoreTeam1;
  trick.team2Score += scoreTeam2;

  logger.info(
    `[closeTrick] After update: trick.team1Score=${trick.team1Score}, trick.team2Score=${trick.team2Score}`,
  );

  // Send state update so clients can see the updated round points
  controllerInstance.sendState();

  // end of the round
  if (game.deck.length === 32) {
    await emitEndRound(gameId);
    // end of the game
    if (
      game.team1PointsCurrentGame >= scoreToReach ||
      game.team2PointsCurrentGame >= scoreToReach
    ) {
      await emitEndGame(winnerPlayerId, teamMatePlayerId, gameId);
      await distributeRankingPoints(
        Array.from(controller.getInstance(gameId).getPlayers()),
        gameId,
        game.team1PointsCurrentGame,
        game.team2PointsCurrentGame,
      );
      controller.deleteInstance(gameId);
    } else {
      // next round if not goal score is reached
      // update the db :
      // fetch the last player starting id
      const playerId = await fetchCurrentTrickPlayerWinningId(gameId);
      // emit the game starting event
      await emitStartRound(gameId, playerId);
    }
  } else {
    console.log(game.deck.length);
    // next trick
    addTrick(winnerPlayerId, gameId);
    await startTrick(gameId);
  }

  return;
}

export function findWinner(currentTrickPlays: IPlay[], gameId: string) {
  if (currentTrickPlays.length === 0) {
    throw new Error("No plays found in trick");
  }
  const trump = controller.getInstance(gameId).getCurrentRound().biddingElected.suite;
  if (currentTrickPlays.some((play) => play.card.suite === trump)) {
    // trump is played
    const trumpCards = currentTrickPlays.filter((play) => play.card.suite === trump);
    if (trumpCards.length === 0) {
      throw new Error("No trump cards found");
    }
    const highestTrump = trumpCards.reduce((acc, card) => {
      if (card.card.valueNum > acc.card.valueNum) {
        return card;
      }
      return acc;
    });
    return highestTrump.playerId;
  } else {
    // no trump played
    const firstPlay = currentTrickPlays[0];
    if (!firstPlay) {
      throw new Error("No plays found in trick");
    }
    const firstSuite = firstPlay.card.suite;
    const sameSuite = currentTrickPlays.filter((play) => play.card.suite === firstSuite);
    if (sameSuite.length === 0) {
      throw new Error("No cards of same suite found");
    }
    const highestSameSuite = sameSuite.reduce((acc, card) => {
      if (card.card.valueNum > acc.card.valueNum) {
        return card;
      }
      return acc;
    });
    return highestSameSuite.playerId;
  }
}

export async function fetchCurrentTrickPlayerWinningId(gameId: string): Promise<string> {
  const players: IPlayer[] = Array.from(controller.getInstance(gameId).getPlayers());
  const currentTrick = controller.getInstance(gameId).getCurrentTrick();
  if (!currentTrick) {
    throw new Error("No current trick found");
  }
  const oldPlayerStartedId = currentTrick.playerStartingId;
  const playerStartedIndex = players.findIndex((player) => player.id === oldPlayerStartedId);
  if (playerStartedIndex === -1) {
    throw new Error("Starting player not found in players array");
  }
  const playerStartingIndex = (playerStartedIndex + 1) % players.length;
  const playerId = players[playerStartingIndex]?.id;
  if (!playerId) {
    throw new Error("Next player not found");
  }
  return playerId;
}
