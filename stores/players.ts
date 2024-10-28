export const usePlayersStore = defineStore('players', () => {
    const players = ref<IPlayer[]>([]);

    function setHands(hands: ICard[], playerId: string) {
        const player = players.value.find((player) => player.id === playerId);
        if (player) {
            player.hands = hands;
        }
    }

    function addPlayer(player: IPlayer) {
        players.value.push(player);
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

    return { players, team1, team2, setHands, setPosition, addPlayer };
});
