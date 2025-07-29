import { distributeRankingPoints, emitEndGame } from "@/emitter/end_game";
import { emitPoints } from "@/emitter/points";
import { startTrick } from "@/emitter/start_trick";
import controller from "@/game";
import supabase from "@/supabase";
import { dev } from "@/utils";
import { formatTeam } from "../../../game/shared/utils/format";
import genIdCuid from "../../../game/shared/utils/gen_id";
import type { IPlay, IPlayer } from "@coinche/shared";
import { emitStartRound } from "./start_round";
import { emitEndRound } from "./end_round";

let scoreToReach: number;
if (dev) {
  scoreToReach = 100;
} else {
  scoreToReach = 1000;
}

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function closeTrick(gameId: string, publish: (payload: any) => void) {
  const game = controller.getInstance(gameId).game;
  const lastTrick = controller.getInstance(gameId).getLastTrick();
  // find the winner
  const pastTricks: IPlay[] = lastTrick.plays;
  const winnerPlayerId = findWinner(pastTricks, gameId);
  const players: IPlayer[] = Array.from(controller.getInstance(gameId).getPlayers());
  const myIndex = players.findIndex(
    (player: IPlayer) => player.id === winnerPlayerId,
  );
  const teamMatePlayerId = players[(myIndex + 2) % 4].id;
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "win_trick",
      playerId: "controller",
      gameId: gameId,
      value: formatTeam(winnerPlayerId, teamMatePlayerId),
    },
  ]);
  let score = pastTricks.reduce((acc, trick) => acc + trick.card.valueNum, 0);
  if (game.deck.length === 32) {
    score += 10;
  }
  const scoreTeam1 = controller.getInstance(gameId).isTeam1(winnerPlayerId)
    ? score
    : 0;
  const scoreTeam2 = scoreTeam1 === 0 ? score : 0;
  controller.getInstance(gameId).getLastRound().team1_point_current_game +=
    scoreTeam1;
  controller.getInstance(gameId).getLastRound().team2_point_current_game +=
    scoreTeam2;
  await emitPoints(scoreTeam1, scoreTeam2, gameId, publish);

  // end of the round
  if (game.deck.length === 32) {
    await emitEndRound(gameId, publish);
    // end of the game
    if (game.team1_score >= scoreToReach || game.team2_score >= scoreToReach) {
      await emitEndGame(winnerPlayerId, teamMatePlayerId, gameId, publish);
      await distributeRankingPoints(
        Array.from(controller.getInstance(gameId).getPlayers()),
        gameId,
        game.team1_score,
        game.team2_score,
        publish
      );
      controller.deleteInstance(gameId);
    } else {
      // next round if not goal score is reached
      // update the db :
      // fetch the last player starting id
      const playerId = await fetchLastTrickPlayerWinningId(gameId);
      // emit the game starting event
      await emitStartRound(gameId, playerId, publish);
    }
  } else {
    // next trick
    controller.getInstance(gameId).addTrick(winnerPlayerId);
    await startTrick(gameId, publish);
  }

  return;
}

export function findWinner(lastTrickEvents: IPlay[], gameId: string) {
  const atout = controller.getInstance(gameId).getLastRound()
    .last_bid.suite;
  if (lastTrickEvents.some((trick) => trick.card.suite === atout)) {
    // atout is played
    const atoutCards = lastTrickEvents.filter((trick) => trick.card.suite === atout);
    const highestAtout = atoutCards.reduce((acc, card) => {
      if (card.card.valueNum > acc.card.valueNum) {
        return card;
      }
      return acc;
    });
    return highestAtout.playerId;
  } else {
    // no atout played
    const firstSuite = lastTrickEvents[0].card.suite;
    const sameSuite = lastTrickEvents.filter(
      (trick) => trick.card.suite === firstSuite,
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

export async function fetchLastTrickPlayerWinningId(
  gameId: string,
): Promise<string> {
  const { data: events, error } = await supabase
    .from("Events")
    .select("value")
    .eq("type", "start_round")
    .eq("gameId", gameId);
  if (error) {
    console.error(error);
    return " ";
  }
  const playerStartedId = events[0].value;
  const players: { id: string }[] = (controller.getInstance(gameId).game as any).players;
  if (!players || !Array.isArray(players)) {
    throw new Error("Players array not found in game instance");
  }
  const playerStartedIndex = players.findIndex((player) => player.id === playerStartedId);
  if (playerStartedIndex === -1) {
    throw new Error("Starting player not found in players array");
  }
  const playerStartingIndex = (playerStartedIndex + 1) % players.length;
  const playerId = players[playerStartingIndex].id;
  return playerId;
}
