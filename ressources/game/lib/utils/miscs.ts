import type {PlayerId } from "@coinche/shared";

export function assertPliNumber(n1: number, n2: number) {
    if (n1 !== n2) {
        console.error(`Pli number mismatch: ${n1} !== ${n2}`);
    }
}

export function findPlayerName(playerId: PlayerId) {
    const storePlayers = usePlayersStore();
    const players = storePlayers.players;
    return players.find((p) => p.id === playerId)?.surname;
}