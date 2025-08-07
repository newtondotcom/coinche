import { isDevEnv } from "@/shared/utils/miscs";

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const allowedPaths = ["/", "/login", "/404", "/regles"];
  const config = useRuntimeConfig();
  const devEnv = isDevEnv(config);

  const { $authClient } = useNuxtApp();
  const session = $authClient.useSession();
  console.log(session.value);

  if (!devEnv && !session.value.isPending || !session.value && !allowedPaths.includes(to.path)) {
    return navigateTo("/404")
  } else {
    console.log(session.value);
  }
});
