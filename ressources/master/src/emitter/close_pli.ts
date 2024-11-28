import { formatTeam, type IPlay, type IPlayer } from "@coinche/shared";
import Master from "../game";
import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "../supabase";
import { emitPoints } from "./points";
import { emitEndRound } from "./end_round";
import { emitEndGame } from "./end_game";
import { startPli } from "./start_pli";
import { emitRoundStarting } from "./start_round";

export async function closePli(gameId: string) {
  const game = Master.getInstance(gameId).game;
  const lastPli = Master.getInstance(gameId).getLastPli();
  // find the winner
  const pastPlis: IPlay[] = lastPli.plays;
  const winnerPlayerId = findWinner(pastPlis, gameId);
  const myIndex = game.players.findIndex(
    (player: IPlayer) => player.id === winnerPlayerId,
  );
  const teamMatePlayerId = game.players[(myIndex + 2) % 4].id;
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "win_pli",
      playerId: "master",
      gameId: gameId,
      value: formatTeam(winnerPlayerId, teamMatePlayerId),
    },
  ]);
  let score = pastPlis.reduce((acc, pli) => acc + pli.card.valueNum, 0);
  if (game.deck.length === 32) {
    score += 10;
  }
  const scoreTeam1 = Master.getInstance(gameId).isTeam1(winnerPlayerId)
    ? score
    : 0;
  const scoreTeam2 = scoreTeam1 === 0 ? score : 0;
  Master.getInstance(gameId).getLastRound().team1_point_current_game +=
    scoreTeam1;
  Master.getInstance(gameId).getLastRound().team2_point_current_game +=
    scoreTeam2;
  await emitPoints(scoreTeam1, scoreTeam2, gameId);

  // end of the round
  if (game.deck.length === 32) {
    await emitEndRound(gameId);
    // end of the game
    const scoreToReach = 1000;
    if (game.team1_score >= scoreToReach || game.team2_score >= scoreToReach) {
      await emitEndGame(winnerPlayerId, teamMatePlayerId, gameId);
    } else {
      // next round if not goal score is reached
      // update the db :
      // fetch the last player starting id
      const playerId = await fetchLastPliPlayerWinningId(gameId);
      // emit the game starting event
      await emitRoundStarting(gameId, playerId);
    }
  } else {
    // next pli
    Master.getInstance(gameId).addPli(winnerPlayerId);
    await startPli(gameId);
  }

  return;
}

function findWinner(lastPliEvents: IPlay[], gameId: string) {
  const atout = Master.getInstance(gameId).getLastRound().last_annonce.suite;
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
  const playerStartedIndex = Master.getInstance(gameId).game.players.findIndex(
    (player) => player.id === playerStartedId,
  );
  const playerStartingIndex = (playerStartedIndex + 1) % 4;
  const playerId =
    Master.getInstance(gameId).game.players[playerStartingIndex].id;
  return playerId;
}
