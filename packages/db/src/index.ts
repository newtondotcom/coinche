import { env } from "@coinche-reborn/env/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import * as schema from "./schema";

export const db = drizzle(env.DATABASE_URL, { schema });

const migrationsFolder = `${import.meta.dir}/migrations`;

await migrate(db, { migrationsFolder });
console.log("Migrations applied successfully");
