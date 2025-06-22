import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";


// --- BetterAuth Tables ---
export const user = pgTable("User", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  banned: boolean("banned").notNull().default(false),
});

export const session = pgTable("Session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("Account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("Verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

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

// --- Type Exports ---
export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

export type Session = InferSelectModel<typeof session>;
export type NewSession = InferInsertModel<typeof session>;

export type Account = InferSelectModel<typeof account>;
export type NewAccount = InferInsertModel<typeof account>;

export type Verification = InferSelectModel<typeof verification>;
export type NewVerification = InferInsertModel<typeof verification>;

export type Game = InferSelectModel<typeof game>;
export type NewGame = InferInsertModel<typeof game>;

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;

export type PlayerStats = InferSelectModel<typeof playerStats>;
export type NewPlayerStats = InferInsertModel<typeof playerStats>;

export type GameTeam = InferSelectModel<typeof gameTeams>;
export type NewGameTeam = InferInsertModel<typeof gameTeams>;