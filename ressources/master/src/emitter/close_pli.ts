import { formatTeam, type IPlay, type IPlayer } from "@coinche/shared";
import Master from "../game";
import genIdCuid from "@coinche/shared/src/gen_id";
import supabase from "../supabase";

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
    console.log("Dernier pli donc +10");
  }
  const scoreTeam1 = storePlayers.team1.some(
    (player) => player.id === winnerPlayerId,
  )
    ? score
    : 0;
  const scoreTeam2 = storePlayers.team2.some(
    (player) => player.id === winnerPlayerId,
  )
    ? score
    : 0;
  const oldScoreTeam1 = storeGame.team1_point_current_game;
  await emitPoints(scoreTeam1, scoreTeam2);
  while (oldScoreTeam1 === storeGame.team1_point_current_game) {
    await delay(100);
  }
  if (storeGame.deck.length === 32) {
    // end of the game
    if (storeGame.team1_score >= 1000 || storeGame.team2_score >= 1000) {
      await supabase.from("Events").insert([
        {
          id: await genIdCuid(),
          type: "end_game",
          playerId: storeAbout.myId,
          gameId: storeAbout.gameId,
          value: formatTeam(winnerPlayerId, teamMatePlayerId),
        },
      ]);
    } else {
      // next game if not goal score is reached
      console.log("Next game");
      toast({
        title: "Launching New game",
        description: "New game is starting",
      });
      // update the ui
      storeGame.setNewGame();
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
  const storeAbout = useAboutStore();
  const atout = storeAbout.atout;
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
