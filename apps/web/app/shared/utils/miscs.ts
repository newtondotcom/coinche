export function assertTrickNumber(n1: number, n2: number) {
  if (n1 !== n2) {
    console.error(`Trick number mismatch: ${n1} !== ${n2}`);
  }
}

export const isDevEnv = import.meta.env.DEV;
