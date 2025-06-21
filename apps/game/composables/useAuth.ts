import { createAuthClient } from "better-auth/vue";
import { useRuntimeConfig } from "#app";
import { genericOAuthClient } from "better-auth/client/plugins";

let authClientInstance: ReturnType<typeof createAuthClient>;

function createSharedAuthClient() {
  const config = useRuntimeConfig();
  return createAuthClient({
    baseURL: config.public.BETTER_AUTH_URL,
    plugins: [genericOAuthClient()],
  });
}

export const useAuth = () => {
  if (!authClientInstance) {
    authClientInstance = createSharedAuthClient();
  }
  const { signIn, signUp, useSession } = authClientInstance;
  return { signIn, signUp, useSession };
}; 