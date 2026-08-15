import { createEnv } from "@t3-oss/env-nuxt";
import { z } from "zod";

export const env = createEnv({
  client: {
    NUXT_PUBLIC_API_URL: z.url(),
    NUXT_PUBLIC_URL: z.url(),
  },
  emptyStringAsUndefined: true,
});
