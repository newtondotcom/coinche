import controller from '@/game';
import type { CardSuite, CardValue, ICard, IPlayer } from '@coinche/shared';

export const dev = process.env.NODE_ENV !== 'production';

export function setNextPlayerTurn(playerId: string, gameId: string) {
    const game = controller.getInstance(gameId).game;
    const currentPlayerIndex = game.players.findIndex((player: IPlayer) => player.id === playerId);
    const nextPlayerIndex = (currentPlayerIndex + 1) % game.players.length;
    const nextPlayerId = game.players[nextPlayerIndex].id;
    controller.getInstance(gameId).getLastPli().current_player_id = nextPlayerId;
    return nextPlayerId;
}

export function setNextPlayerPli(playerId: string, gameId: string) {
    controller.getInstance(gameId).getLastPli().current_player_id = playerId;
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
