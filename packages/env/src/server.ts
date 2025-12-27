import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    CORS_ORIGIN: z.url(),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    CHURROS_CLIENT_ID: z.string().min(1),
    CHURROS_CLIENT_SECRET: z.string().min(1),
    CHURROS_AUTHORIZATION_URL: z.url(),
    CHURROS_TOKEN_URL: z.url(),
    CHURROS_INFO_URL: z.url(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
