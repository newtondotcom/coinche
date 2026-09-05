import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "NUXT_PUBLIC_",
  client: {
    NUXT_PUBLIC_API_URL: z.url(),
    NUXT_PUBLIC_URL: z.url(),
  },
  runtimeEnv: {
    NUXT_PUBLIC_API_URL: import.meta.env.NUXT_PUBLIC_API_URL,
    NUXT_PUBLIC_URL: import.meta.env.NUXT_PUBLIC_URL,
  },
  emptyStringAsUndefined: true,
});
