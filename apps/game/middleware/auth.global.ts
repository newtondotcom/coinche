import { isDevEnv } from "~/shared/utils/miscs";
import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  const allowedPaths = ["/", "/login", "/404", "/regles", "/api/alive"];
  const config = useRuntimeConfig();
  const devEnv = isDevEnv(config);
  const { useSession } = useAuth();
  const session = await useSession();
  if (!devEnv && !allowedPaths.includes(to.path) && !session) {
    return navigateTo("/404");
  }
});
