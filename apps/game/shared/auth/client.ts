import { createAuthClient } from "better-auth/vue";
import { useRuntimeConfig } from "nuxt/app";
import { genericOAuthClient } from "better-auth/client/plugins";

const config = useRuntimeConfig();
export const authClient = createAuthClient({
  baseURL: config.app.baseURL,
  plugins: [genericOAuthClient()],
});
export const { signIn, signUp, useSession } = authClient;
