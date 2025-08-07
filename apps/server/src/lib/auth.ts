import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as authSchema from "@/db/schema/auth";
import { genericOAuth } from "better-auth/plugins";
import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || "http://localhost:3001"],
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
          clientId: process.env.CHURROS_CLIENT_ID ?? "",
          clientSecret: process.env.CHURROS_CLIENT_SECRET ?? "",
          authorizationUrl: process.env.CHURROS_AUTHORIZATION_URL ?? "",
          tokenUrl: process.env.CHURROS_TOKEN_URL ?? "",
          scopes: ['openid', 'profile', 'preferred_username', "email", "churros:profile"],
          redirectURI: process.env.CORS_ORIGIN || "http://localhost:3001",
          async getUserInfo(tokens) {
                const userInfoUrl = process.env.CHURROS_INFO_URL;
                if (!userInfoUrl) {
                  throw new Error("CHURROS_INFO_URL environment variable is not set");
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