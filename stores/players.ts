export const usePlayersStore = defineStore('players', () => {
    const players = ref<IPlayer[]>([]);

    function setHands(hands: ICard[], playerId: string) {
        const player = players.value.find((player) => player.id === playerId);
        if (player) {
            player.hands = hands;
        }
    }

    function setScore(score: number, playerId: string) {
        const player = players.value.find((player) => player.id === playerId);
        if (player) {
            player.score = score;
        }
    }

    function setPosition(position: PlayerPosition, playerId: string) {
        const player = players.value.find((player) => player.id === playerId);
        if (player) {
            player.position = position;
        }
    }

    return { players, setHands, setScore, setPosition };
});
