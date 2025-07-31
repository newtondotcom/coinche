import type { Ibidding, ICard, IPlayer, PlayerPosition } from '@coinche/shared';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePlayersStore = defineStore('players', () => {
    const players = ref<IPlayer[]>([]);
    const isLoadingPlayerList = ref<boolean>(true);

    function removeCard(card: ICard, playerId: string) {
        const player : IPlayer | undefined = players.value.find((player : IPlayer) => player.id === playerId);
        if (player) {
            player.hands = player.hands.filter(
                (c : ICard) =>
                    !(
                        c.suite === card.suite &&
                        c.value === card.value &&
                        c.valueNum === card.valueNum
                    ),
            );
        }
    }

    function addPlayer(player: IPlayer) {
        players.value.push(player);
    }

    function setPlayers(newPlayers: IPlayer[]) {
        players.value = newPlayers;
        isLoadingPlayerList.value = false;
    }

    function resetLoadingState() {
        isLoadingPlayerList.value = true;
    }

    function setLastbidding(bidding: Ibidding, playerId: string) {
        const player = players.value.find((player) => player.id === playerId);
        if (player) {
            player.last_bidding = bidding;
        }
    }

    function setPosition(position: PlayerPosition, playerId: string) {
        const player = players.value.find((player) => player.id === playerId);
        if (player) {
            player.position = position;
        }
    }

    const team1 = computed<IPlayer[]>(() =>
        players.value.filter((p) => p.position === 0 || p.position === 2),
    );
    const team2 = computed<IPlayer[]>(() =>
        players.value.filter((p) => p.position === 1 || p.position === 3),
    );

    return {
        players,
        isLoadingPlayerList,
        team1,
        team2,
        removeCard,
        setPosition,
        addPlayer,
        setPlayers,
        setLastbidding,
        resetLoadingState,
    };
});
