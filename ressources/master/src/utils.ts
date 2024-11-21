import type { CardSuite, CardValue, ICard, IPlayer } from "@coinche/shared";
import Master from "./game";

export function setNextPlayerTurn(playerId: string) {
  const currentPlayerIndex = Master.instance.game.players.findIndex(
    (player: IPlayer) => player.id === playerId,
  );
  const nextPlayerIndex =
    (currentPlayerIndex + 1) % Master.instance.game.players.length;
  const nextPlayerId = Master.instance.game.players[nextPlayerIndex].id;
  Master.instance.getLastRound().current_player_id = nextPlayerId;
}

export function setNextPlayerPli(playerId: string) {
  Master.instance.getLastRound().current_player_id = playerId;
}

const values: CardValue[] = ["7", "8", "9", "J", "Q", "K", "10", "A"];
const suites: CardSuite[] = ["diamonds", "clubs", "hearts", "spades"];

export function generateDeckCards(): ICard[] {
  const cards: ICard[] = [];
  suites.forEach((s) => {
    values.forEach((i) => {
      cards.push({
        value: i,
        valueNum: 0,
        suite: s,
      });
    });
  });
  return cards;
}
