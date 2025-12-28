import { env } from "@coinche-reborn/env/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import * as schema from "./schema";

export const db = drizzle(env.DATABASE_URL, { schema });

/**
 * Applies database migrations if the schema is not up to date.
 * Drizzle automatically tracks applied migrations and only runs pending ones.
 * This function is idempotent - safe to call multiple times.
 */
export async function runMigrations(): Promise<void> {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Cannot run migrations.");
  }

  const migrationsFolder = `${import.meta.dir}/migrations`;

  try {
    console.log("Checking for pending migrations...");
    await migrate(db, { migrationsFolder });
    console.log("✓ Database migrations are up to date");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Check if it's a connection error (database not available)
    if (errorMessage.includes("connect") || errorMessage.includes("ECONNREFUSED")) {
      console.warn("⚠ Database connection failed. Migrations will be skipped.");
      console.warn("  This is normal during build/install. Migrations will run at server startup.");
      return;
    }

    // For other errors, log and rethrow
    console.error("✗ Migration failed:", errorMessage);
    throw error;
  }
}
