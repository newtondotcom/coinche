import type { DehydratedState, VueQueryPluginOptions } from "@tanstack/vue-query";
import { toast } from 'vue-sonner';
import { dehydrate, hydrate, QueryCache, QueryClient, VueQueryPlugin } from "@tanstack/vue-query";

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>("vue-query");

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        console.log(error);
        toast.error("Error", {
          description: error?.message || "An unexpected error occurred.",
        });
      },
    }),
  });
  const options: VueQueryPluginOptions = { queryClient };

  nuxt.vueApp.use(VueQueryPlugin, options);

  if (import.meta.server) {
    nuxt.hooks.hook("app:rendered", () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }

  if (import.meta.client) {
    nuxt.hooks.hook("app:created", () => {
      hydrate(queryClient, vueQueryState.value);
    });
  }
});
