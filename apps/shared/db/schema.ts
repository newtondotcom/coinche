import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  varchar,
  text,
  integer,
  timestamp,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

// --- BettterAuth ---
export const user = pgTable("user", {
  id: uuid().defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  banned: boolean("banned").notNull().default(false),
});

export const session = pgTable("session", {
  id: uuid().defaultRandom().primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: uuid().defaultRandom().primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: uuid().defaultRandom().primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

// --- Table: Events ---
export const events = pgTable("Events", {
  id: varchar("id", { length: 36 }).primaryKey(),
  gameId: varchar("gameId", { length: 36 }).notNull(),
  playerId: varchar("playerId", { length: 36 }).notNull(),
  timestamp: timestamp("timestamp", { withTimezone: false })
    .notNull()
    .defaultNow(),
  type: text("type").notNull(),
  value: text("value").notNull(),
});

// --- Table: Game ---
export const game = pgTable("Game", {
  gameId: varchar("gameId", { length: 36 }).primaryKey(),
  p1: varchar("p1", { length: 36 }).notNull(),
  p2: varchar("p2", { length: 36 }).notNull(),
  p3: varchar("p3", { length: 36 }).notNull(),
  p4: varchar("p4", { length: 36 }).notNull(),
  team1_score: integer("team1_score").notNull(),
  team2_score: integer("team2_score").notNull(),
});

// --- Table: Points ---
export const points = pgTable("Points", {
  playerId: varchar("playerId", { length: 36 }).primaryKey(),
  points: integer("points").notNull(),
});

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;

export type Game = InferSelectModel<typeof game>;
export type NewGame = InferInsertModel<typeof game>;

export type Points = InferSelectModel<typeof points>;
export type NewPoints = InferInsertModel<typeof points>;
