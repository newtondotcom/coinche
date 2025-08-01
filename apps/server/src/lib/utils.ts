import controller from '@/lib/game';
import type { CardSuite, CardValue, ICard, IPlayer } from '@coinche/shared';
import logger from './logger';

export const dev = process.env.NODE_ENV !== 'production';

export function setNextPlayerTurn(playerId: string, gameId: string) {
    const gameController = controller.getInstance(gameId);
    
    // Get players from the controller, not the game object
    const players: IPlayer[] = Array.from(gameController.getPlayers());
    
    if (players.length === 0) {
      throw new Error('No players found in game');
    }
  
    const currentPlayerIndex = players.findIndex((player: IPlayer) => player.id === playerId);
    
    if (currentPlayerIndex === -1) {
      throw new Error('Current player not found');
    }
  
    // Calculate next player index (circular)
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    const nextPlayerId = players[nextPlayerIndex].id;
  
    // Update the current player in the last pli
    const lastPli = gameController.getLastPli();
    if (lastPli) {
      lastPli.currentPlayerId = nextPlayerId;
    }
  
    logger.info(`Turn changed from player ${playerId} to player ${nextPlayerId}`);
    
    return nextPlayerId;
  }


export function setNextPlayerPli(playerId: string, gameId: string) {
    controller.getInstance(gameId).getLastPli().currentPlayerId = playerId;
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
