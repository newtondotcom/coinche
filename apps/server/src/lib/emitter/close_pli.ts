import { distributeRankingPoints, emitEndGame } from "@/lib/emitter/end_game";
import { emitPoints } from "@/lib/emitter/points";
import { startPli } from "@/lib/emitter/start_pli";
import controller from "@/lib/game";
import { dev } from "@/lib/utils";
import { formatTeam } from "@coinche/shared";
import { genIdCuid } from '@coinche/shared';
import type { EventInsert, IPlay, IPlayer, PlayerId } from "@coinche/shared";
import { emitStartTrick } from "./start_trick";
import { emitEndTrick } from "./end_trick";

let scoreToReach: number;
if (dev) {
  scoreToReach = 100;
} else {
  scoreToReach = 1000;
}

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function closePli(gameId: string, publish: (payload: any) => void) {
  const game = controller.getInstance(gameId).state;
  const currentPli = controller.getInstance(gameId).getLastPli();
  // find the winner
  const pastPlis: IPlay[] = currentPli.plays;
  const winnerPlayerId = findWinner(pastPlis, gameId);
  const players: IPlayer[] = Array.from(controller.getInstance(gameId).getPlayers());
  const myIndex = players.findIndex(
    (player: IPlayer) => player.id === winnerPlayerId,
  );
  const teamMatePlayerId = players[(myIndex + 2) % 4].id;
  const event: EventInsert = {
      id: await genIdCuid(),
      type: "win_pli",
      playerId: "controller",
      gameId: gameId,
      value: formatTeam(winnerPlayerId, teamMatePlayerId),
  }
  controller.getInstance(gameId).sendState();
  let score = pastPlis.reduce((acc, pli) => acc + pli.card.valueNum, 0);
  if (controller.getInstance(gameId).state.deck.length === 32) {
    score += 10;
  }
  const scoreTeam1 = controller.getInstance(gameId).isTeam1(winnerPlayerId)
    ? score
    : 0;
  const scoreTeam2 = scoreTeam1 === 0 ? score : 0;
  controller.getInstance(gameId).state.team1PointsCurrentGame +=
    scoreTeam1;
  controller.getInstance(gameId).state.team2PointsCurrentGame+=
    scoreTeam2;
  await emitPoints(scoreTeam1, scoreTeam2, gameId, publish);

  // end of the round
  if (game.deck.length === 32) {
    await emitEndTrick(gameId, publish);
    // end of the game
    if (game.team1PointsCurrentGame >= scoreToReach || game.team2PointsCurrentGame >= scoreToReach) {
      await emitEndGame(winnerPlayerId, teamMatePlayerId, gameId, publish);
      await distributeRankingPoints(
        Array.from(controller.getInstance(gameId).getPlayers()),
        gameId,
        game.team1PointsCurrentGame,
        game.team2PointsCurrentGame,
        publish
      );
      controller.deleteInstance(gameId);
    } else {
      // next round if not goal score is reached
      // update the db :
      // fetch the last player starting id
      const playerId = await fetchcurrentPliPlayerWinningId(gameId);
      // emit the game starting event
      await emitStartTrick(gameId, playerId, publish);
    }
  } else {
    console.log(game.deck.length);  
    // next pli
    controller.getInstance(gameId).addPli(winnerPlayerId);
    await startPli(gameId, publish);
  }

  return;
}

export function findWinner(currentPliEvents: IPlay[], gameId: string) {
  const atout = controller.getInstance(gameId).getCurrentRound()
    .biddingElected.suite;
  if (currentPliEvents.some((pli) => pli.card.suite === atout)) {
    // atout is played
    const atoutCards = currentPliEvents.filter((pli) => pli.card.suite === atout);
    const highestAtout = atoutCards.reduce((acc, card) => {
      if (card.card.valueNum > acc.card.valueNum) {
        return card;
      }
      return acc;
    });
    return highestAtout.playerId;
  } else {
    // no atout played
    const firstSuite = currentPliEvents[0].card.suite;
    const sameSuite = currentPliEvents.filter(
      (pli) => pli.card.suite === firstSuite,
    );
    const highestSameSuite = sameSuite.reduce((acc, card) => {
      if (card.card.valueNum > acc.card.valueNum) {
        return card;
      }
      return acc;
    });
    return highestSameSuite.playerId;
  }
}

export async function fetchcurrentPliPlayerWinningId(
  gameId: string,
): Promise<string> {
  const players: IPlayer[] = Array.from(controller.getInstance(gameId).getPlayers());
  const oldPlayerStartedId = controller.getInstance(gameId).getLastPli().playerStartingId;
  const playerStartedIndex = players.findIndex((player) => player.id === oldPlayerStartedId);
  if (playerStartedIndex === -1) {
    throw new Error("Starting player not found in players array");
  }
  const playerStartingIndex = (playerStartedIndex + 1) % players.length;
  const playerId = players[playerStartingIndex].id;
  return playerId;
}
