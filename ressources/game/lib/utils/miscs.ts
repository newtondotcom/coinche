export function assertPliNumber(n1: number, n2: number) {
    if (n1 !== n2) {
        console.error(`Pli number mismatch: ${n1} !== ${n2}`);
    }
}

const config = useRuntimeConfig();
export const devEnv = config.public.NODE_ENV !== 'production';
