import { distributeRankingPoints, emitEndGame } from "@/emitter/end_game";
import { emitPoints } from "@/emitter/points";
import { startPli } from "@/emitter/start_pli";
import controller from "@/game";
import { dev } from "@/utils";
import { formatTeam } from "../../../game/shared/utils/format";
import genIdCuid from "../../../game/shared/utils/gen_id";
import type { EventInsert, IPlay, IPlayer } from "@coinche/shared";
import { emitStartTrick } from "./start_trick";
import { emitEndTrick } from "./end_trick";
import { eq, or, and, desc} from "drizzle-orm";
import { db } from "@/db";
import { events } from "@coinche/shared/db/schema";

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
  const game = controller.getInstance(gameId).game;
  const lastPli = controller.getInstance(gameId).getLastPli();
  // find the winner
  const pastPlis: IPlay[] = lastPli.plays;
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
  publish(event);
  let score = pastPlis.reduce((acc, pli) => acc + pli.card.valueNum, 0);
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
    await emitEndTrick(gameId, publish);
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
      const playerId = await fetchLastPliPlayerWinningId(gameId);
      // emit the game starting event
      await emitStartTrick(gameId, playerId, publish);
    }
  } else {
    // next pli
    controller.getInstance(gameId).addPli(winnerPlayerId);
    await startPli(gameId, publish);
  }

  return;
}

export function findWinner(lastPliEvents: IPlay[], gameId: string) {
  const atout = controller.getInstance(gameId).getLastRound()
    .last_bidding.suite;
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
    const sameSuite = lastPliEvents.filter(
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

export async function fetchLastPliPlayerWinningId(
  gameId: string,
): Promise<string> {
  const data  = await db
    .select()
    .from(events)
    .where(
      and(
        eq(events.type, "start_trick"),
        eq(events.gameId, gameId)
      )
    )
    .orderBy(desc(events.createdAt))
    .limit(1);
  const playerStartedId = data[0].value;
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
