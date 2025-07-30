import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

// --- Game Tables ---
export const game = pgTable("Game", {
    id: text("id").primaryKey(),
    player1Id: text("player1_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    player2Id: text("player2_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    player3Id: text("player3_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    player4Id: text("player4_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    team1Score: integer("team1_score").notNull().default(0),
    team2Score: integer("team2_score").notNull().default(0),
    status: text("status").notNull().default("waiting"),
    startedAt: timestamp("started_at"),
    endedAt: timestamp("ended_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  });
  
  export const events = pgTable("Events", {
    id: text("id").primaryKey(),
    gameId: text("game_id")
      .notNull()
      .references(() => game.id, { onDelete: "cascade" }),
    playerId: text("player_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    value: text("value"), // Optionnel car certains événements n'ont pas de valeur
    metadata: text("metadata"), // Pour des données additionnelles en JSON
    timestamp: timestamp("timestamp").notNull().defaultNow(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  });
  
  export const playerStats = pgTable("PlayerStats", {
    id: text("id").primaryKey(),
    playerId: text("player_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    totalPoints: integer("total_points").notNull().default(0),
    gamesPlayed: integer("games_played").notNull().default(0),
    gamesWon: integer("games_won").notNull().default(0),
    gamesLost: integer("games_lost").notNull().default(0),
    winRate: integer("win_rate").default(0), // Pourcentage * 100 pour éviter les décimaux
    lastGameAt: timestamp("last_game_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  });
  
  // Table de liaison pour les équipes (plus flexible)
  export const gameTeams = pgTable("GameTeams", {
    id: text("id").primaryKey(),
    gameId: text("game_id")
      .notNull()
      .references(() => game.id, { onDelete: "cascade" }),
    teamNumber: integer("team_number").notNull(), // 1 ou 2
    player1Id: text("player1_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    player2Id: text("player2_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    score: integer("score").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  });



export type Game = InferSelectModel<typeof game>;
export type NewGame = InferInsertModel<typeof game>;

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;

export type PlayerStats = InferSelectModel<typeof playerStats>;
export type NewPlayerStats = InferInsertModel<typeof playerStats>;

export type GameTeam = InferSelectModel<typeof gameTeams>;
export type NewGameTeam = InferInsertModel<typeof gameTeams>;