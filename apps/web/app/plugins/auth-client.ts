import { createAuthClient } from "better-auth/vue";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { Auth } from "@coinche-reborn/auth/type";
import { env } from "@coinche-reborn/env/web";

export default defineNuxtPlugin(() => {
  const authClient = createAuthClient({
    baseURL: env.NUXT_PUBLIC_API_URL,
    plugins: [inferAdditionalFields<Auth>()],
  });

  return {
    provide: {
      authClient: authClient,
    },
  };
});
