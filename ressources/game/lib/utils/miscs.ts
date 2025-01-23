export function assertPliNumber(n1: number, n2: number) {
    if (n1 !== n2) {
        console.error(`Pli number mismatch: ${n1} !== ${n2}`);
    }
}

export function isDevEnv(config) {
    return config.public.NODE_ENV !== 'production';
}
