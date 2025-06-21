import { isDevEnv } from "~/shared/utils/miscs";
import { authClient } from "~/shared/auth/client";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const allowedPaths = ["/", "/login", "/404", "/regles", "/api/alive"];
  const config = useRuntimeConfig();
  const devEnv = isDevEnv(config);
  const { data: session } = await authClient.useSession(useFetch);
  if (!devEnv && !allowedPaths.includes(to.path) && !session.value) {
    return navigateTo("/404");
  }
});
