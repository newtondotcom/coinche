import { formatTeam, type IPlay, type IPlayer } from "@coinche/shared";
import Master from "../game";
import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "../supabase";
import { emitPoints } from "./points";
import logger from "../logger";
import { emitGameStarting } from "./start_game";

export async function closePli() {
  // find the winner
  const pastPlis: IPlay[] = Master.instance.getLastRound().pli;
  const winnerPlayerId = findWinner(pastPlis);
  const myIndex = Master.instance.game.players.findIndex(
    (player: IPlayer) => player.id === winnerPlayerId,
  );
  const teamMatePlayerId = Master.instance.game.players[(myIndex + 2) % 4].id;
  await supabase.from("Events").insert([
    {
      id: await genIdCuid(),
      type: "win_pli",
      playerId: "master",
      gameId: Master.instance.game.gameId,
      value: formatTeam(winnerPlayerId, teamMatePlayerId),
    },
  ]);
  let score = pastPlis.reduce((acc, pli) => acc + pli.card.valueNum, 0);
  if (Master.instance.game.deck.length === 32) {
    score += 10;
    logger.info("Dernier pli donc +10");
  }
  const scoreTeam1 = Master.instance.isTeam1(winnerPlayerId) ? score : 0;
  const scoreTeam2 = scoreTeam1 === 0 ? score : 0;
  await emitPoints(scoreTeam1, scoreTeam2);
  if (Master.instance.game.deck.length === 32) {
    // end of the game
    if (
      Master.instance.game.team1_score >= 1000 ||
      Master.instance.game.team2_score >= 1000
    ) {
      await supabase.from("Events").insert([
        {
          id: await genIdCuid(),
          type: "end_game",
          playerId: "master",
          gameId: Master.instance.game.gameId,
          value: formatTeam(winnerPlayerId, teamMatePlayerId),
        },
      ]);
    } else {
      // next game if not goal score is reached
      logger.info("Next game");
      // update the db :
      // fetch the last player starting id
      const playerId = await fetchLastPliPlayerWinningId();
      // emit the game starting event
      await emitGameStarting(playerId);
    }
  }
  return;
}

function findWinner(lastPliEvents: IPlay[]) {
  const atout = Master.instance.getLastRound().last_annonce.suite;
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

export async function fetchLastPliPlayerWinningId(): Promise<string> {
  const { data: events, error } = await supabase
    .from("Events")
    .select("value")
    .eq("type", "start_pli")
    .eq("gameId", Master.instance.game.gameId);
  if (error) {
    console.error(error);
    return " ";
  }
  const playerStartedId = events[0].value;
  const playerStartedIndex = Master.instance.game.players.findIndex(
    (player) => player.id === playerStartedId,
  );
  const playerStartingIndex = (playerStartedIndex + 1) % 4;
  const playerId = Master.instance.game.players[playerStartingIndex].id;
  return playerId;
}
