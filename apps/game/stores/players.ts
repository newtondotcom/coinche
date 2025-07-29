import type { IBid, ICard, IPlayer, PlayerPosition } from '@coinche/shared';

export const usePlayersStore = defineStore('players', () => {
    const players = ref<IPlayer[]>([]);

    function addPlayer(player: IPlayer) {
        players.value.push(player);
    }

    function removeCard(card: ICard, playerId: string) {
        const player = players.value.find((p) => p.id === playerId);
        if (player) {
            player.hands = player.hands.filter(
                (c) => !(c.suite === card.suite && c.value === card.value)
            );
        }
    }

    function setHands(hands: ICard[], playerId: string) {
        const player = players.value.find((p) => p.id === playerId);
        if (player) {
            player.hands = hands;
        }
    }

    function getPlayer(playerId: string): IPlayer | undefined {
        return players.value.find((p) => p.id === playerId);
    }

    function getPlayers() {
        return players.value;
    }

    function setLastBid(bid: IBid, playerId: string) {
        const player = players.value.find((p) => p.id === playerId);
        if (player) {
            player.last_bid = bid;
        }
    }

    function removePlayer(playerId: string) {
        players.value = players.value.filter((p) => p.id !== playerId);
    }

    function setPosition(playerId: string, position: PlayerPosition) {
        const player = players.value.find((p) => p.id === playerId);
        if (player) {
            player.position = position;
        }
    }

    function reset() {
        players.value = [];
    }

    return {
        players,
        addPlayer,
        removeCard,
        setHands,
        getPlayer,
        getPlayers,
        setLastBid,
        removePlayer,
        setPosition,
        reset,
    };
});
