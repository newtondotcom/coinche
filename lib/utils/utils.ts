export function assertPliNumber(n1: number, n2: number) {
    if (n1 !== n2) {
        throw new Error(`Pli number mismatch: ${n1} !== ${n2}`);
    }
}
