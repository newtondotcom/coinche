import controller from '@/lib/game';
import {  cardSuites, cardValues, type ICard, type IPlayer, type PlayerId } from '@coinche/shared';
import { playerStats } from '@/db/schema/coinche';
import { eq} from "drizzle-orm";
import { db } from '@/db';
import logger from '@/lib/logger';

export const dev = process.env.NODE_ENV !== 'production';

export function getNextPlayerTurn(playerId: string, gameId: string) {
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
    
    return nextPlayerId;
  }


function shuffle(array: ICard[]): ICard[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function generateDeckCards(): ICard[] {
    const cards: ICard[] = [];
    cardSuites.forEach((s) => {
        cardValues.forEach((i) => {
            cards.push({
                value: i,
                valueNum: 0,
                suite: s,
            });
        });
    });
    return shuffle(cards);
}

export async function addPointsTo(points: number, playerId: PlayerId) {
    // Fetch the current points for the player
    const data = await db
        .select()
        .from(playerStats)
        .where(eq(playerStats.playerId, playerId))
        .limit(1);

    // Calculate the new points
    const newPoints = data[0].totalPoints + points;

    // Update the points in the database
    await db
        .update(playerStats)
        .set({ totalPoints: newPoints })
        .where(eq(playerStats.playerId, playerId)); 
    
    logger.log({ level: 'info', message: 'Points updated successfully' });
}