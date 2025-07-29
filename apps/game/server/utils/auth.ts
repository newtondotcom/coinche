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

  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        defaultValue: "",
        input: false,
      }
    },
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "churros",
          clientId: config.CHURROS_CLIENT_ID,
          clientSecret: config.CHURROS_CLIENT_SECRET,
          authorizationUrl : config.CHURROS_AUTHORIZATION_URL,
          tokenUrl : config.CHURROS_TOKEN_URL,
          scopes : ['openid', 'profile', 'preferred_username',"email","churros:profile"],
          async getUserInfo(tokens) {
                const userInfoUrl = process.env.CHURROS_USER_INFO;
                if (!userInfoUrl) {
                  throw new Error("CHURROS_USER_INFO environment variable is not set");
                }

                const response = await fetch(userInfoUrl, {
                  headers: {
                    "Authorization": `Bearer ${tokens.accessToken}`,
                    "Content-Type": "application/json",
                  },
                });

                if (!response.ok) {
                  throw new Error(`Failed to fetch user info: ${response.status} ${response.statusText}`);
                }

                const userInfo = await response.json();

                console.info("User info received", { userInfo });

                const userId = userInfo.sub || "";

                return {
                  id: userId,
                  name: userInfo.fullName ||"",
                  username: userInfo.uid || userInfo.nickname || "",
                  image: userInfo.pictureURL || null,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  email : userInfo.email,
                  emailVerified : userInfo.email_verified,
                };
              },
        },
      ],
    }),
  ],
});
