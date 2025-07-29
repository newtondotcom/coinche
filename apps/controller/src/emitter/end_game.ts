import logger from "@/logger";
import { formatTeam } from "../../../game/shared/utils/format";
import genIdCuid from "../../../game/shared/utils/gen_id";
import type { EventInsert, IPlayer } from "@coinche/shared";
import {events, game, playerStats} from "@coinche/shared/db/schema";
import { eq, or } from "drizzle-orm";

import { addPointsTo } from "../points";
import { db } from "@/db";

/**
 * Calculate expected score for a player against another team
 * @param playerRating The player's current rating
 * @param opponentTeamRating The average rating of the opponent team
 * @returns Expected score between 0 and 1
 */
function calculateExpectedScore(playerRating: number, opponentTeamRating: number): number {
  const ratingDifference = opponentTeamRating - playerRating;
  return 1 / (1 + Math.pow(10, ratingDifference / 400));
}

/**
 * Calculate new ELO rating for a player
 * @param currentRating The player's current rating
 * @param actualScore The actual score (1 for win, 0 for loss)
 * @param expectedScore The expected score calculated from ratings
 * @param kFactor The K-factor for rating adjustment (default 32)
 * @returns The new rating
 */
function calculateNewRating(
  currentRating: number, 
  actualScore: number, 
  expectedScore: number, 
  kFactor: number = 32
): number {
  return currentRating + kFactor * (actualScore - expectedScore);
}

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function emitEndGame(
  winnerPlayerId: string,
  teamMatePlayerId: string,
  gameId: string,
  publish: (payload: any) => void
) {
  const event: EventInsert = {
    id: await genIdCuid(),
    type: "end_game",
    playerId: "controller",
    gameId: gameId,
    value: formatTeam(winnerPlayerId, teamMatePlayerId),
  };
  publish(event);
}

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function distributeRankingPoints(
  players: IPlayer[],
  gameId: string,
  team1Score: number,
  team2Score: number,
  publish: (payload: any) => void
) {
  const playersIds = players.map((player) => player.id);
  
  // store in db the finished game
  await db.insert(game).values({
    id: gameId,
    player1Id: playersIds[0],
    player2Id: playersIds[1],
    player3Id: playersIds[2],
    player4Id: playersIds[3],
    team1Score: team1Score,
    team2Score: team2Score,
  });

  // fetch current ratings for all players using drizzle ORM
  const data = await db
    .select()
    .from(playerStats)
    .where(
      or(
        eq(playerStats.playerId, playersIds[0]),
        eq(playerStats.playerId, playersIds[1]),
        eq(playerStats.playerId, playersIds[2]),
        eq(playerStats.playerId, playersIds[3])
      )
    );

  if (!data || data.length !== players.length) {
    logger.error(
      "Error fetching points or missing points data for some players"
    );
    return;
  }

  // Mapping players to their points (MMR/ELO ratings)
  const playerRatings = playersIds.map((playerId) => {
    const playerData = data.find((d) => d.playerId === playerId);
    if (playerData) {
      return playerData.totalPoints;
    } else {
      return 1200; // Default starting rating
    }
  });

  // Team configurations: Team 1 = players 0,2 | Team 2 = players 1,3
  const team1Players = [0, 2];
  const team2Players = [1, 3];
  
  // Calculate team average ratings
  const team1AvgRating = (playerRatings[0] + playerRatings[2]) / 2;
  const team2AvgRating = (playerRatings[1] + playerRatings[3]) / 2;
  
  // Determine game outcome
  const team1Won = team1Score > team2Score;
  
  // K-factor for rating adjustment (you can adjust this value)
  // K=32 is standard, K=16 for experienced players, K=10 for masters
  const kFactor = 32;
  
  // Calculate new ratings for each player individually
  team1Players.forEach((playerIndex) => {
    const currentRating = playerRatings[playerIndex];
    const expectedScore = calculateExpectedScore(currentRating, team2AvgRating);
    const actualScore = team1Won ? 1 : 0;
    const newRating = calculateNewRating(currentRating, actualScore, expectedScore, kFactor);
    const ratingChange = newRating - currentRating;
    
    // Apply the rating change
    addPointsTo(ratingChange, playersIds[playerIndex]);
  });
  
  team2Players.forEach((playerIndex) => {
    const currentRating = playerRatings[playerIndex];
    const expectedScore = calculateExpectedScore(currentRating, team1AvgRating);
    const actualScore = team1Won ? 0 : 1;
    const newRating = calculateNewRating(currentRating, actualScore, expectedScore, kFactor);
    const ratingChange = newRating - currentRating;
    
    // Apply the rating change
    addPointsTo(ratingChange, playersIds[playerIndex]);
  });
}

/**
 * @param publish A function to publish to the WebSocket room (publish(room, payload))
 */
export async function deleteRows(gameId: string, publish: (payload: any) => void) {
  await db.delete(events).where(eq(game.id, gameId));
}
