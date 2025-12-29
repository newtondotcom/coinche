import { createAuthClient } from "better-auth/vue";
import { genericOAuthClient, inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "@coinche-reborn/auth";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const authClient = createAuthClient({
    baseURL: config.public.serverUrl,
    plugins: [genericOAuthClient(), inferAdditionalFields<typeof auth>()],
  });

  return {
    provide: {
      authClient: authClient,
    },
  };
});
