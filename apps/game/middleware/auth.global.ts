import { isDevEnv } from "~/shared/utils/miscs";
import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  const allowedPaths = ["/", "/login", "/404", "/regles", "/api/alive"];
  const config = useRuntimeConfig();
  const devEnv = isDevEnv(config);
  const { loggedIn, fetchSession } = useAuth();
    // If client-side, fetch session between each navigation
    if (import.meta.client) {
      await fetchSession()
    }
    // If not authenticated, redirect to 404
    if (!devEnv && !loggedIn.value && !allowedPaths.includes(to.path)) {
      return navigateTo("/404")
    }
});
