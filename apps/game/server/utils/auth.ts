import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/utils/db";
import * as schema from "@coinche/shared/db/schema";
import { genericOAuth } from "better-auth/plugins";

const config = useRuntimeConfig();
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  trustedOrigins: [config.VERCEL_URL!]
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "churros",
          clientId: config.CHURROS_CLIENT_ID,
          clientSecret: config.CHURROS_CLIENT_SECRET,
          authorizationUrl : config.CHURROS_AUTHORIZATION_URL,
          tokenUrl : config.CHURROS_TOKEN_URL
        },
      ],
    }),
  ],
});
