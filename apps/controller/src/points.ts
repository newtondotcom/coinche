import type { PlayerId } from '@coinche/shared';
import { playerStats } from '@coinche/shared/db/schema';
import { eq} from "drizzle-orm";
import { db } from './db';
import logger from './logger';

export async function addPointsTo(points: number, playerId: PlayerId): Promise<void> {
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
