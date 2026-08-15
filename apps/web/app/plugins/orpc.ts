import type { AppRouterClient } from "@coinche-reborn/api/routers/index";

import { defineNuxtPlugin } from "#app";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { env } from "@coinche-reborn/env/web";

export default defineNuxtPlugin(() => {
  const rpcUrl = `${env.NUXT_PUBLIC_API_URL}/rpc`;

  const rpcLink = new RPCLink({
    url: rpcUrl,
    fetch(url, options) {
      return fetch(url, {
        ...options,
        credentials: "include",
      });
    },
  });

  const client: AppRouterClient = createORPCClient(rpcLink);
  const orpcUtils = createTanstackQueryUtils(client);

  return {
    provide: {
      orpc: orpcUtils,
    },
  };
});
