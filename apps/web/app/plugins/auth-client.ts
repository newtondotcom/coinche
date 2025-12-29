import { createAuthClient } from "better-auth/vue";
import { genericOAuthClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { Auth } from "@coinche-reborn/auth/type";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const authClient = createAuthClient({
    baseURL: config.public.serverUrl,
    plugins: [genericOAuthClient(), inferAdditionalFields<Auth>()],
  });

  return {
    provide: {
      authClient: authClient,
    },
  };
});
