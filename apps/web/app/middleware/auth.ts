export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;

  const allowedPaths = ["/", "/404", "/regles"];

  const { $authClient } = useNuxtApp();
  const session = $authClient.useSession();

  if (
    (import.meta.env.DEV && !session.value.isPending) ||
    (!session.value && !allowedPaths.includes(to.path))
  ) {
    return navigateTo("/404");
  } else {
    console.log(session.value.data);
  }
});
