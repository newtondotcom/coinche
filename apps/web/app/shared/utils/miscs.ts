import type { RuntimeConfig } from "nuxt/schema";

export function assertTrickNumber(n1: number, n2: number) {
  if (n1 !== n2) {
    console.error(`Trick number mismatch: ${n1} !== ${n2}`);
  }
}

export function isDevEnv(config: RuntimeConfig) {
  return config.public.NODE_ENV !== "production";
}
