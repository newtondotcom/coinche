export const usePlayersStore = defineStore('players', () => {
    const players = ref<IPlayer[]>([
        {
            id: '0',
            surname: 'player1',
            position: 0,
            score: 782,
            hands: [],
            classement: 223,
        },
        {
            id: '1',
            surname: 'player2',
            position: 1,
            score: 23,
            hands: [],
            classement: 11,
        },
        {
            id: '2',
            surname: 'player3',
            position: 2,
            score: 782,
            hands: [],
            classement: 36,
        },
        {
            id: '3',
            surname: 'player4',
            position: 3,
            score: 23,
            hands: [],
            classement: 40,
        },
    ]);

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
