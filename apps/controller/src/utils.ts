import controller from './game';
import type { CardSuite, CardValue, ICard, IPlayer } from '@coinche/shared';
import logger from './logger';

export const dev = process.env.NODE_ENV !== 'production';

export function getCurrentPlayerFromTrick(gameId: string): string {
  const gameController = controller.getInstance(gameId);
  const lastTrick = gameController.getLastTrick();
  const playerIndex = Array.from(gameController.getPlayers()).findIndex(
    (player) => player.id === lastTrick.player_starting_id
  );
  const numberOfCards = lastTrick.plays.length;
  const players = Array.from(gameController.getPlayers());
  return players[(playerIndex + numberOfCards) % players.length].id;
}

export function setNextPlayerTurn(playerId: string, gameId: string): string {
  const playerIndex = Array.from(
    controller.getInstance(gameId).getPlayers()
  ).findIndex((player) => player.id === playerId);
  const players = Array.from(controller.getInstance(gameId).getPlayers());
  const nextPlayerIndex = (playerIndex + 1) % players.length;
  const nextPlayerId = players[nextPlayerIndex].id;
  controller.getInstance(gameId).getLastTrick().current_player_id = nextPlayerId;
  return nextPlayerId;
}

export function setNextPlayerTrick(playerId: string, gameId: string) {
    controller.getInstance(gameId).getLastTrick().current_player_id = playerId;
}

const values: CardValue[] = ['7', '8', '9', 'J', 'Q', 'K', '10', 'A'];
const suites: CardSuite[] = ['diamonds', 'clubs', 'hearts', 'spades'];

function shuffle(array: ICard[]): ICard[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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
    return shuffle(cards);
}
