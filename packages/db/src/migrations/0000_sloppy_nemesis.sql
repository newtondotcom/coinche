CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Events" (
	"id" text PRIMARY KEY NOT NULL,
	"game_id" text NOT NULL,
	"player_id" text NOT NULL,
	"type" text NOT NULL,
	"value" text,
	"metadata" text,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Game" (
	"id" text PRIMARY KEY NOT NULL,
	"player1_id" text NOT NULL,
	"player2_id" text NOT NULL,
	"player3_id" text NOT NULL,
	"player4_id" text NOT NULL,
	"team1_score" integer DEFAULT 0 NOT NULL,
	"team2_score" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'waiting' NOT NULL,
	"started_at" timestamp,
	"ended_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "GameTeams" (
	"id" text PRIMARY KEY NOT NULL,
	"game_id" text NOT NULL,
	"team_number" integer NOT NULL,
	"player1_id" text NOT NULL,
	"player2_id" text NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "PlayerStats" (
	"id" text PRIMARY KEY NOT NULL,
	"player_id" text NOT NULL,
	"total_points" integer DEFAULT 0 NOT NULL,
	"games_played" integer DEFAULT 0 NOT NULL,
	"games_won" integer DEFAULT 0 NOT NULL,
	"games_lost" integer DEFAULT 0 NOT NULL,
	"win_rate" integer DEFAULT 0,
	"last_game_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Events" ADD CONSTRAINT "Events_game_id_Game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."Game"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Events" ADD CONSTRAINT "Events_player_id_user_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Game" ADD CONSTRAINT "Game_player1_id_user_id_fk" FOREIGN KEY ("player1_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Game" ADD CONSTRAINT "Game_player2_id_user_id_fk" FOREIGN KEY ("player2_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Game" ADD CONSTRAINT "Game_player3_id_user_id_fk" FOREIGN KEY ("player3_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Game" ADD CONSTRAINT "Game_player4_id_user_id_fk" FOREIGN KEY ("player4_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "GameTeams" ADD CONSTRAINT "GameTeams_game_id_Game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."Game"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "GameTeams" ADD CONSTRAINT "GameTeams_player1_id_user_id_fk" FOREIGN KEY ("player1_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "GameTeams" ADD CONSTRAINT "GameTeams_player2_id_user_id_fk" FOREIGN KEY ("player2_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_player_id_user_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");
